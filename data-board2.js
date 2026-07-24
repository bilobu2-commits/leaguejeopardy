const BOARD_ID = "board2";
const UI_LANG = "de";
const BOARD_DATA = {
  categories: [
    {
      name: "Streamer & Content",
      clues: [
        { value: 100, tag: null, q: "Welcher berüchtigte NA-Streamer schaffte es 2019 als Erster, in jeder einzelnen Rolle Rang 1 (Challenger) zu erreichen, nachdem er zuvor von Riot gebannt worden war?", a: "Tyler1" },
        { value: 200, tag: null, q: "Für welchen Champion war der legendäre koreanische Support-Spieler „Madlife“ vor allem berühmt (Stichwort: Hooks)?", a: "Blitzcrank (auch bekannt für Thresh)" },
        { value: 300, tag: null, q: "Welcher europäische Streamer und ehemalige Caster wurde vor allem durch seine mitreißenden Worlds-Analysen extrem populär und moderiert/kommentiert mittlerweile bei großen Events?", a: "Caedrel" },
        { value: 400, tag: null, q: "Wie lautet der bekannte Ingame-/Szene-Name von Carlos Rodríguez Santiago?", a: "Ocelote (Gründer & CEO von G2 Esports)" },
        { value: 500, tag: null, q: "Wie hieß der TSM-Toplaner in Season 2, bekannt für Riven und Shen?", a: "Dyrus" }
      ]
    },
    {
      name: "Voicelines & Zitate",
      clues: [
        { value: 100, tag: "ZITAT", q: "„The heart is the biggest muscle. Train it.“ – Welcher Champion sagt das?", a: "Braum" },
        { value: 200, tag: "ZITAT", q: "Welcher Champion ruft bei Killing-Sprees immer wieder begeistert seinen eigenen Namen?", a: "Draven" },
        { value: 300, tag: "ZITAT", q: "„Come here, little soul.“ – bekannte Voiceline welches Champions?", a: "Thresh" },
        { value: 400, tag: "ZITAT", q: "Welches Sound-/Ansage-Event markiert im Spiel den allerersten Champion-Kill einer Partie?", a: "First Blood" },
        { value: 500, tag: "ZITAT", q: "„Draven… out.“ – In welcher Situation sagt Draven diesen Satz?", a: "Wenn er im Champion Select gebannt wird (Ban-Voiceline)" }
      ]
    },
    {
      name: "Karte & Objectives",
      clues: [
        { value: 100, tag: null, q: "Wie heißt der Buff/die Einheit, die man nach dem Töten des Rift Herald erhält und mit der man anschließend Türme angreifen kann?", a: "Auge des Herolds (Eye of the Herald)" },
        { value: 200, tag: null, q: "Seit welchem Patch/welcher Season wurde der frühe Rift-Herald-Encounter um mehrere kleinere Kreaturen namens „Void Grubs“ ergänzt?", a: "Season 2024, Patch 14.1" },
        { value: 300, tag: null, q: "Wie heißt das neutrale Fluss-Monster, das beim Töten Gold, eine Heilung und temporäre Sicht auf nahe Gegner gibt?", a: "Scuttle Crab (Scuttler)" },
        { value: 400, tag: "SCHÄTZ", q: "Wie lange dauert es, bis ein zerstörter Inhibitor wieder hochkommt (respawnt)?", a: "5 Minuten" },
        { value: 500, tag: null, q: "Wie heißen die kleinen Bonus-Plattformen an äußeren Türmen, die seit Season 2019 beim Beschuss abfallen und dauerhaften Zusatzschaden gewähren?", a: "Turmplatten (Turret Plates)" }
      ]
    },
    {
      name: "Meta & Statistiken I",
      clues: [
        { value: 100, tag: "SCHÄTZ", q: "Wie viele spielbare Champions gibt es aktuell (Stand Sommer 2026) ungefähr?", a: "Ca. 173 Champions (Toleranz ±10)" },
        { value: 200, tag: "SCHÄTZ", q: "Wie hoch ist die Basis-Bewegungsgeschwindigkeit der meisten Champions (in Units)?", a: "325 Units (Toleranz ±15)" },
        { value: 300, tag: "SCHÄTZ", q: "Wie lange dauert eine durchschnittliche Ranked-Solo/Duo-Partie ungefähr (in Minuten)?", a: "Ca. 28–32 Minuten (Toleranz 25–35)" },
        { value: 400, tag: "BILD", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg", q: "Welcher Champion ist hier zu sehen, und in welchem Jahr kam er ursprünglich ins Spiel?", a: "Ahri, 2009" },
        { value: 500, tag: null, q: "Nenne die drei höchsten Ranked-Tiers oberhalb von Diamond (in aufsteigender Reihenfolge).", a: "Master, Grandmaster, Challenger" }
      ]
    },
    {
      name: "Meta & Statistiken II",
      clues: [
        { value: 100, tag: "SCHÄTZ", q: "Von den bisher 15 ausgetragenen Worlds (2011–2025) — wie oft ging der Titel ungefähr an ein südkoreanisches (LCK) Team?", a: "Ca. 10 von 15 (Toleranz ±2)" },
        { value: 200, tag: null, q: "Wie heißt das System, das einem Champion mit einer Killserie zusätzliches Bonusgold für seine Besieger verleiht?", a: "Bounty-System (Champion Bounty)" },
        { value: 300, tag: null, q: "Wie heißt die höchste Killstreak-Bezeichnung, wenn ein Champion besonders viele gegnerische Champions ohne eigenen Tod tötet (ab 8 Kills in Folge)?", a: "Legendary" },
        { value: 400, tag: "SCHÄTZ", q: "Bis zu wie viel Prozent Verlangsamung (Slow) kann ein einzelner Debuff laut Riots festem „Slow Cap“ maximal verursachen, egal wie viele Slows gestackt werden?", a: "90 % (Toleranz ±10)" },
        { value: 500, tag: null, q: "Wie heißt der Debuff, der verhindert, dass ein Champion geheilt wird oder Schilde erhält (ausgelöst z. B. durch Executioner's Calling oder Morellonomicon)?", a: "Grievous Wounds (Schwere Wunden)" }
      ]
    }
  ]
};
