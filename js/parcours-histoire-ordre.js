/* Ordre final des chapitres d'histoire (chargé en dernier parmi les parcours) :
   rappels → modules chronologiques (Préhistoire… Grandes découvertes) → Belgique (1830) → modules suivants → ancien exemple « hist-1 » à la fin.
   Le module Belgique est fermé, comme les autres, tant que le test des rappels n'est pas réussi. */
(function () {
  "use strict";
  const P = window.PARCOURS;
  const prendre = id => { const i = P.chapitres.findIndex(c => c.id === id); return i < 0 ? null : P.chapitres.splice(i, 1)[0]; };
  const be = prendre("hist-belgique");
  if (be) {
    be.verrou = be.verrou || { test: "bilan-pr-histoire", min: 0.5 };
    const t = be.titre;
    if (t && !/^6\./.test(t.fr)) be.titre = { fr: "6. " + t.fr, uk: "6. " + t.uk, pl: "6. " + t.pl, es: "6. " + t.es, rn: t.rn ? "6. " + t.rn : null };
    const i = P.chapitres.findIndex(c => c.id === "hist-decouvertes");
    P.chapitres.splice(i + 1, 0, be);
  }
  const ex = prendre("hist-1");
  if (ex) P.chapitres.push(ex);
})();
