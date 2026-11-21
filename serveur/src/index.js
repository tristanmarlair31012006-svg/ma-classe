/* Serveur de discussion de la classe DASPA (Cloudflare Worker + Durable Object, zone UE).
   - Les messages restent UNIQUEMENT en mémoire, jamais écrits sur disque. Ils disparaissent
     quand le prof vide la discussion ou quand le serveur se met en veille.
   - Chaque message est traduit par Microsoft Translator dans les langues de la classe.
   - Pas de nom de famille, pas d'adresse e-mail : prénom + numéro de tablette seulement. */

const LANGUES = { fr: "fr", uk: "uk", pl: "pl", es: "es", rn: "run" }; // code app -> code Microsoft
const MAX_CARACTERES = 300;
const MAX_HISTORIQUE = 80;
const PAUSE_ENTRE_MESSAGES_MS = 1500;
const GROUPES = ["classe", "g1", "g2", "g3", "g4", "g5", "g6"];

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/") return new Response("Serveur de discussion DASPA : en ligne.", { headers: { "content-type": "text/plain; charset=utf-8" } });
    if (url.pathname !== "/ws") return new Response("Introuvable", { status: 404 });
    if (req.headers.get("Upgrade") !== "websocket") return new Response("WebSocket attendu", { status: 426 });

    // Seule l'adresse de l'app (GitHub Pages) peut se connecter.
    const origine = req.headers.get("Origin") || "";
    const autorisees = (env.ORIGINES || "").split(",").map(s => s.trim()).filter(Boolean);
    if (env.DEBUG) console.log("connexion", origine, autorisees, url.searchParams.get("classe"));
    if (autorisees.length && !autorisees.includes(origine)) return new Response("Origine refusée", { status: 403 });

    // Le code de la classe est demandé à chaque connexion.
    if (url.searchParams.get("classe") !== env.CODE_CLASSE) return new Response("Code de classe incorrect", { status: 403 });

    try {
      // Zone UE en ligne. En test local (wrangler dev) la zone n'existe pas : on la saute.
      const ns = env.TEST_LOCAL ? env.CLASSE : env.CLASSE.jurisdiction("eu");
      const stub = ns.get(ns.idFromName("daspa"));
      return await stub.fetch(req);
    } catch (e) {
      if (env.DEBUG) console.log("erreur", e && e.stack || e);
      return new Response("Erreur serveur", { status: 500 });
    }
  }
};

export class Classe {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.historique = []; // en mémoire seulement
    this.enPause = false;
  }

  async fetch(req) {
    const p = new URL(req.url).searchParams;
    const langue = LANGUES[p.get("langue")] ? p.get("langue") : "fr";
    const groupe = GROUPES.includes(p.get("groupe")) ? p.get("groupe") : "classe";
    const prof = !!this.env.CLE_PROF && p.get("cleprof") === this.env.CLE_PROF;
    const info = {
      prenom: (p.get("prenom") || "?").slice(0, 24),
      tablette: (p.get("tablette") || "?").slice(0, 4),
      langue, groupe, prof, dernier: 0
    };
    const [client, serveur] = Object.values(new WebSocketPair());
    this.ctx.acceptWebSocket(serveur);
    serveur.serializeAttachment(info);
    serveur.send(JSON.stringify({
      type: "bienvenue",
      pause: this.enPause,
      prof,
      historique: this.historique.filter(m => prof || m.groupe === groupe)
    }));
    this.presence();
    return new Response(null, { status: 101, webSocket: client });
  }

  sockets() { return this.ctx.getWebSockets().map(ws => ({ ws, info: ws.deserializeAttachment() })); }

  envoyer(filtre, objet) {
    const txt = JSON.stringify(objet);
    for (const { ws, info } of this.sockets()) if (filtre(info)) { try { ws.send(txt); } catch (e) {} }
  }

  presence() {
    const liste = this.sockets().map(({ info }) => ({ prenom: info.prenom, tablette: info.tablette, langue: info.langue, groupe: info.groupe, prof: info.prof }));
    this.envoyer(() => true, { type: "presence", liste });
  }

  async webSocketMessage(ws, data) {
    let m;
    try { m = JSON.parse(data); } catch (e) { return; }
    const info = ws.deserializeAttachment();

    // Actions réservées au prof
    if (info.prof && m.type === "supprimer") {
      this.historique = this.historique.filter(x => x.id !== m.id);
      return this.envoyer(() => true, { type: "supprime", id: m.id });
    }
    if (info.prof && m.type === "vider") {
      this.historique = [];
      return this.envoyer(() => true, { type: "vide" });
    }
    if (info.prof && m.type === "pause") {
      this.enPause = !!m.valeur;
      return this.envoyer(() => true, { type: "pause", valeur: this.enPause });
    }
    if (m.type === "groupe" && GROUPES.includes(m.groupe)) {
      info.groupe = m.groupe;
      ws.serializeAttachment(info);
      ws.send(JSON.stringify({ type: "bienvenue", pause: this.enPause, prof: info.prof, historique: this.historique.filter(x => info.prof || x.groupe === info.groupe) }));
      return this.presence();
    }
    if (m.type !== "message") return;

    const texte = String(m.texte || "").trim().slice(0, MAX_CARACTERES);
    if (!texte) return;
    if (this.enPause && !info.prof) return ws.send(JSON.stringify({ type: "refus", raison: "pause" }));
    const maintenant = Date.now();
    if (maintenant - info.dernier < PAUSE_ENTRE_MESSAGES_MS) return ws.send(JSON.stringify({ type: "refus", raison: "trop-vite" }));
    info.dernier = maintenant;
    ws.serializeAttachment(info);

    // Langues à produire : français (toujours, pour apprendre) + langues des élèves du groupe.
    const cibles = new Set(["fr"]);
    for (const { info: i } of this.sockets()) if (i.prof || i.groupe === info.groupe) cibles.add(i.langue);
    cibles.delete(info.langue);

    const traductions = { [info.langue]: texte };
    let erreurTraduction = false;
    if (cibles.size) {
      try { Object.assign(traductions, await this.traduire(texte, info.langue, [...cibles])); }
      catch (e) { erreurTraduction = true; }
    }

    const msg = {
      type: "message",
      id: crypto.randomUUID(),
      de: info.prenom, tablette: info.tablette, prof: info.prof,
      langue: info.langue, groupe: info.groupe,
      traductions, erreurTraduction, heure: maintenant
    };
    this.historique.push(msg);
    if (this.historique.length > MAX_HISTORIQUE) this.historique.shift();
    this.envoyer(i => i.prof || i.groupe === msg.groupe, msg);
  }

  async traduire(texte, de, vers) {
    // Mode test local : pas d'appel à Microsoft.
    if (this.env.TRADUCTION_FACTICE) return Object.fromEntries(vers.map(v => [v, `[${v}] ${texte}`]));
    const qs = new URLSearchParams({ "api-version": "3.0", from: LANGUES[de] });
    vers.forEach(v => qs.append("to", LANGUES[v]));
    const r = await fetch("https://api.cognitive.microsofttranslator.com/translate?" + qs, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": this.env.AZURE_CLE,
        "Ocp-Apim-Subscription-Region": this.env.AZURE_REGION,
        "Content-Type": "application/json"
      },
      body: JSON.stringify([{ Text: texte }])
    });
    if (!r.ok) throw new Error("traduction " + r.status);
    const json = await r.json();
    const inverse = Object.fromEntries(Object.entries(LANGUES).map(([a, b]) => [b, a]));
    const out = {};
    for (const t of json[0].translations) out[inverse[t.to] || t.to] = t.text;
    return out;
  }

  webSocketClose(ws) { try { ws.close(); } catch (e) {} this.presence(); }
  webSocketError() { this.presence(); }
}
