/* Serveur de la classe DASPA (Cloudflare Worker + Durable Object, zone UE).
   1. Discussion : les messages restent UNIQUEMENT en mémoire, jamais écrits sur disque. Ils disparaissent
      quand le prof vide la discussion ou quand le serveur se met en veille. Traduction par Microsoft Translator.
   2. Suivi : chaque tablette envoie son bilan (avancement par matière, résultats aux tests). Le prof le voit
      et envoie des feedbacks. Ces données SONT enregistrées (stockage du Durable Object, zone UE) jusqu'à ce
      que le prof les efface. Le cahier de cotes reste sur la tablette du prof : il n'est jamais envoyé ici.
   - Pas de nom de famille, pas d'adresse e-mail : prénom + numéro de tablette seulement. */

const LANGUES = { fr: "fr", uk: "uk", pl: "pl", es: "es", rn: "run" }; // code app -> code Microsoft
const MAX_CARACTERES = 300;
const MAX_HISTORIQUE = 80;
const PAUSE_ENTRE_MESSAGES_MS = 1500;
const GROUPES = ["classe", "g1", "g2", "g3", "g4", "g5", "g6"];
const MAX_BILAN_OCTETS = 20000;
const MAX_FEEDBACKS = 20;
const TYPES_FEEDBACK = ["bravo", "info", "attention"];
const TABLETTE_OK = t => typeof t === "string" && /^[\w-]{1,4}$/.test(t);

function entetesCors(origine) {
  return { "Access-Control-Allow-Origin": origine || "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "content-type", "Access-Control-Max-Age": "86400", "Vary": "Origin" };
}
function json(objet, statut, origine) {
  return new Response(JSON.stringify(objet), { status: statut || 200, headers: { "content-type": "application/json; charset=utf-8", ...entetesCors(origine) } });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/") return new Response("Serveur de la classe DASPA : en ligne.", { headers: { "content-type": "text/plain; charset=utf-8" } });
    const http = url.pathname === "/suivi" || url.pathname.startsWith("/prof/");
    if (url.pathname !== "/ws" && !http) return new Response("Introuvable", { status: 404 });

    // Seule l'adresse de l'app (GitHub Pages) peut se connecter.
    const origine = req.headers.get("Origin") || "";
    const autorisees = (env.ORIGINES || "").split(",").map(s => s.trim()).filter(Boolean);
    if (env.DEBUG) console.log("connexion", url.pathname, origine, autorisees);
    if (autorisees.length && !autorisees.includes(origine)) return new Response("Origine refusée", { status: 403 });
    if (http && req.method === "OPTIONS") return new Response(null, { status: 204, headers: entetesCors(origine) });
    if (!http && req.headers.get("Upgrade") !== "websocket") return new Response("WebSocket attendu", { status: 426 });

    // Le code de la classe est demandé à chaque connexion.
    if (!env.CODE_CLASSE || url.searchParams.get("classe") !== env.CODE_CLASSE) return http ? json({ erreur: "code-classe" }, 403, origine) : new Response("Code de classe incorrect", { status: 403 });
    // Routes du prof : clé prof obligatoire.
    if (url.pathname.startsWith("/prof/") && (!env.CLE_PROF || url.searchParams.get("cleprof") !== env.CLE_PROF)) return json({ erreur: "cle-prof" }, 403, origine);

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
    const url = new URL(req.url);
    if (url.pathname !== "/ws") {
      try { return await this.http(req, url); }
      catch (e) { if (this.env.DEBUG) console.log("erreur http", e && e.stack || e); return json({ erreur: "serveur" }, 500, req.headers.get("Origin")); }
    }
    const p = url.searchParams;
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
    if (!this.env.AZURE_CLE) throw new Error("pas de clé de traduction");
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

  /* ---------- Suivi des élèves et feedbacks (HTTP) ---------- */
  async lireCorps(req) {
    const t = await req.text();
    if (t.length > MAX_BILAN_OCTETS) throw new Error("trop gros");
    return t ? JSON.parse(t) : {};
  }

  async http(req, url) {
    const origine = req.headers.get("Origin");
    const S = this.ctx.storage;

    // Élève : envoie son bilan, reçoit les feedbacks pas encore lus.
    if (url.pathname === "/suivi" && req.method === "POST") {
      const b = await this.lireCorps(req);
      if (!TABLETTE_OK(b.tablette)) return json({ erreur: "tablette" }, 400, origine);
      const cle = "e:" + b.tablette;
      const fiche = {
        tablette: b.tablette,
        prenom: String(b.prenom || "?").slice(0, 24),
        langue: LANGUES[b.langue] ? b.langue : "fr",
        bilan: b.bilan && typeof b.bilan === "object" ? b.bilan : null,
        vu: Date.now()
      };
      await S.put(cle, fiche);
      const fb = (await S.get("f:" + b.tablette)) || [];
      const lus = Array.isArray(b.lus) ? b.lus : [];
      let change = false;
      fb.forEach(f => { if (lus.includes(f.id) && !f.lu) { f.lu = Date.now(); change = true; } });
      if (change) await S.put("f:" + b.tablette, fb);
      return json({ ok: true, feedbacks: fb.filter(f => !f.lu) }, 200, origine);
    }

    // Prof : toute la classe.
    if (url.pathname === "/prof/suivi" && req.method === "GET") {
      const fiches = await S.list({ prefix: "e:" });
      const fbs = await S.list({ prefix: "f:" });
      const eleves = [...fiches.values()].map(f => ({ ...f, feedbacks: fbs.get("f:" + f.tablette) || [] }));
      return json({ eleves, maintenant: Date.now() }, 200, origine);
    }

    // Prof : envoyer un feedback à une tablette.
    if (url.pathname === "/prof/feedback" && req.method === "POST") {
      const b = await this.lireCorps(req);
      if (!TABLETTE_OK(b.tablette)) return json({ erreur: "tablette" }, 400, origine);
      const texte = {};
      for (const k of Object.keys(LANGUES)) if (b.texte && typeof b.texte[k] === "string" && b.texte[k].trim()) texte[k] = b.texte[k].trim().slice(0, MAX_CARACTERES);
      if (!texte.fr) return json({ erreur: "texte" }, 400, origine);
      const fb = (await S.get("f:" + b.tablette)) || [];
      fb.push({ id: crypto.randomUUID(), texte, type: TYPES_FEEDBACK.includes(b.type) ? b.type : "info", date: Date.now(), lu: null });
      while (fb.length > MAX_FEEDBACKS) fb.shift();
      await S.put("f:" + b.tablette, fb);
      return json({ ok: true }, 200, origine);
    }

    // Prof : retirer un feedback.
    if (url.pathname === "/prof/supprimer-feedback" && req.method === "POST") {
      const b = await this.lireCorps(req);
      if (!TABLETTE_OK(b.tablette)) return json({ erreur: "tablette" }, 400, origine);
      const fb = ((await S.get("f:" + b.tablette)) || []).filter(f => f.id !== b.id);
      await S.put("f:" + b.tablette, fb);
      return json({ ok: true }, 200, origine);
    }

    // Prof : effacer une tablette (élève parti, nouvelle année…).
    if (url.pathname === "/prof/oublier" && req.method === "POST") {
      const b = await this.lireCorps(req);
      if (!TABLETTE_OK(b.tablette)) return json({ erreur: "tablette" }, 400, origine);
      await S.delete(["e:" + b.tablette, "f:" + b.tablette]);
      return json({ ok: true }, 200, origine);
    }

    return json({ erreur: "introuvable" }, 404, origine);
  }

  webSocketClose(ws) { try { ws.close(); } catch (e) {} this.presence(); }
  webSocketError() { this.presence(); }
}
