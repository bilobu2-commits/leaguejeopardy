const BOARD_ID = "board1";
const BOARD_DATA = {
  categories: [
    {
      name: "Esports",
      clues: [
        { value: 100, tag: null, q: "Wo (Stadt/Land) fand 2011 das allererste Worlds-Finale statt?", a: "Jönköping, Schweden (DreamHack)" },
        { value: 200, tag: null, q: "Welches europäische Team verlor das Worlds-2018-Finale mit 0:3 gegen Invictus Gaming?", a: "Fnatic" },
        { value: 300, tag: null, q: "Welches europäische Team gewann 2019 als bislang einziges EU-Team ein Mid-Season Invitational (MSI)?", a: "G2 Esports" },
        { value: 400, tag: null, q: "Welcher dänische Midlaner hält mit die meisten LCS-Titel (NA) aller Zeiten und spielte über viele Jahre für TSM?", a: "Bjergsen (Søren Bjerg)" },
        { value: 500, tag: null, q: "Welcher schwedische ADC-Spieler spielte über ein Jahrzehnt für Fnatic und gilt als einer der besten europäischen Spieler aller Zeiten?", a: "Rekkles (Martin Larsson)" }
      ]
    },
    {
      name: "Champions",
      clues: [
        { value: 100, tag: null, q: "Welcher Champion erhielt 2020 als bislang letztes komplettes klassisches VGU und wurde dabei vom Speerkämpfer zum „Ur-Aspekt des Krieges“?", a: "Pantheon" },
        { value: 200, tag: "BILD", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ambessa_0.jpg", q: "Welcher Champion ist auf diesem Bild zu sehen?", a: "Ambessa" },
        { value: 300, tag: null, q: "Welcher Champion kann sich mit seiner Ultimate zwischen zwei Formen entscheiden — „Rhaast“ oder „Shadow Assassin“?", a: "Kayn" },
        { value: 400, tag: null, q: "Welcher Champion war der 100. veröffentlichte Champion im Spiel?", a: "Jayce" },
        { value: 500, tag: null, q: "Welche Items baut man klassischerweise im berühmten „Blue Ezreal“-Build?", a: "Blade of the Ruined King, Muramana, Iceborn Gauntlet" }
      ]
    },
    {
      name: "Items",
      clues: [
        { value: 100, tag: null, q: "Welches Boots-Upgrade erhöht die Widerstandsfähigkeit gegen Crowd Control (Tenacity) und wird gerne gegen CC-lastige Gegner gebaut?", a: "Mercury's Treads" },
        { value: 200, tag: "SCHÄTZ", q: "Wie lange ist der Cooldown der aktiven Fähigkeit (Stasis) von Zhonya's Hourglass?", a: "120 Sekunden (Toleranz ±20)" },
        { value: 300, tag: "BILD", q: "Wie heißt dieses inzwischen aus dem regulären Spiel entfernte Item?", a: "Deathfire Grasp" },
        { value: 400, tag: null, q: "Was macht das Item Runaan's Hurricane? Erkläre kurz die Fähigkeit.", a: "Feuert bei normalen Angriffen zusätzliche Pfeile auf bis zu 2 weitere nahe Gegner ab (inkl. On-Hit-Effekten) — ideal für Wellenclear und Teamfights" },
        { value: 500, tag: null, q: "Womit skaliert der Bonus-Angriffsschaden (AD) des klassischen Items „Atma's Impaler“ (Atmas Pfähler)?", a: "Mit dem maximalen Leben (Health) des Trägers (1,5 % des Max-HP als Bonus-AD)" }
      ]
    },
    {
      name: "Allgemein",
      clues: [
        { value: 100, tag: null, q: "In welchem Jahr wurde League of Legends offiziell veröffentlicht?", a: "2009" },
        { value: 200, tag: null, q: "Wie hieß die Ingame-Währung, die man durchs Spielen verdient hat, bevor sie in „Blue Essence“ umbenannt wurde?", a: "Influence Points (IP)" },
        { value: 300, tag: null, q: "Wie heißt das eigenständige Kartenspiel im LoL-Universum, das 2020 veröffentlicht wurde?", a: "Legends of Runeterra (LoR)" },
        { value: 400, tag: "SCHÄTZ", q: "Wie viele monatlich aktive Spieler hat League of Legends laut aktuellen Schätzungen (2026), ungefähr in Millionen?", a: "Ca. 120–135 Millionen (Toleranz 100–150 Mio.)" },
        { value: 500, tag: null, q: "Wie heißt das übergeordnete Fantasy-Universum, in dem League of Legends, Arcane und TFT spielen?", a: "Runeterra" }
      ]
    },
    {
      name: "Lore & Story",
      clues: [
        { value: 100, tag: null, q: "In welcher Doppelstadt-Region spielt die Geschichte rund um Jinx, Vi und die Chem-Barone (bekannt aus „Arcane“)?", a: "Piltover & Zaun" },
        { value: 200, tag: null, q: "Kayle und Morgana sind ein geflügeltes Zwillingspaar aus Demacia. Welche der beiden gilt als der „gefallene Engel“?", a: "Morgana" },
        { value: 300, tag: null, q: "Wie heißt die Region/Heimat der Void-Monster wie Kha'Zix, Cho'Gath und Kog'Maw?", a: "Icathia" },
        { value: 400, tag: null, q: "In der ursprünglichen (mittlerweile überarbeiteten) Lore war „die Liga der Legenden“ selbst eine Institution mit welchem Zweck zwischen den Nationen Valorans?", a: "Konfliktschlichtung zwischen den Nationen (friedliche/politische Alternative zu offenen Kriegen)" },
        { value: 500, tag: null, q: "Welcher Champion reitet auf dem urzeitlichen Reittier Bristle?", a: "Sejuani" }
      ]
    }
  ]
};
