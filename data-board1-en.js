const BOARD_ID = "board1";
const UI_LANG = "en";
const BOARD_DATA = {
  categories: [
    {
      name: "Esports",
      clues: [
        { value: 100, tag: null, q: "Where (city/country) was the very first Worlds final held in 2011?", a: "Jönköping, Sweden (DreamHack)" },
        { value: 200, tag: null, q: "Which European team lost the 2018 Worlds final 0–3 against Invictus Gaming?", a: "Fnatic" },
        { value: 300, tag: null, q: "Which European team won a Mid-Season Invitational (MSI) in 2019, the only EU team to do so so far?", a: "G2 Esports" },
        { value: 400, tag: null, q: "Which Danish mid laner holds the most LCS (NA) titles of all time and played for TSM for many years?", a: "Bjergsen (Søren Bjerg)" },
        { value: 500, tag: null, q: "Which Swedish ADC player spent over a decade with Fnatic and is considered one of the best European players ever?", a: "Rekkles (Martin Larsson)" }
      ]
    },
    {
      name: "Champions",
      clues: [
        { value: 100, tag: null, q: "Which champion got the most recent full classic VGU (visual & gameplay update) in 2020, reworked from a spear-wielder into the \"Aspect of War\"?", a: "Pantheon" },
        { value: 200, tag: "PICTURE", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ambessa_0.jpg", q: "Which champion is shown in this picture?", a: "Ambessa" },
        { value: 300, tag: null, q: "Which champion can choose between two forms with his ultimate — \"Rhaast\" or \"Shadow Assassin\"?", a: "Kayn" },
        { value: 400, tag: null, q: "Which champion was the 100th champion released in the game?", a: "Jayce" },
        { value: 500, tag: null, q: "Which items are classically built in the famous \"Blue Ezreal\" build?", a: "Blade of the Ruined King, Muramana, Iceborn Gauntlet" }
      ]
    },
    {
      name: "Items",
      clues: [
        { value: 100, tag: null, q: "Which boots upgrade increases Tenacity and is typically built against CC-heavy enemies?", a: "Mercury's Treads" },
        { value: 200, tag: "ESTIMATE", q: "How long is the cooldown of Zhonya's Hourglass's active ability (Stasis)?", a: "120 seconds (tolerance ±20)" },
        { value: 300, tag: "PICTURE", q: "What's the name of this item, since removed from the regular game?", a: "Deathfire Grasp" },
        { value: 400, tag: null, q: "What does the item Runaan's Hurricane do? Briefly explain the effect.", a: "Fires extra bolts at up to 2 additional nearby enemies on basic attacks (including on-hit effects) — great for wave clear and teamfights" },
        { value: 500, tag: null, q: "What does the bonus attack damage (AD) of the classic item \"Atma's Impaler\" scale with?", a: "The wearer's maximum health (1.5% of max HP as bonus AD)" }
      ]
    },
    {
      name: "General",
      clues: [
        { value: 100, tag: null, q: "In what year was League of Legends officially released?", a: "2009" },
        { value: 200, tag: null, q: "What was the in-game currency earned by playing called before it was renamed \"Blue Essence\"?", a: "Influence Points (IP)" },
        { value: 300, tag: null, q: "What's the standalone card game in the LoL universe released in 2020 called?", a: "Legends of Runeterra (LoR)" },
        { value: 400, tag: "ESTIMATE", q: "Roughly how many monthly active players does League of Legends have per current estimates (2026), in millions?", a: "Approx. 120–135 million (tolerance 100–150 million)" },
        { value: 500, tag: null, q: "What's the overarching fantasy universe called in which League of Legends, Arcane, and TFT take place?", a: "Runeterra" }
      ]
    },
    {
      name: "Lore & Story",
      clues: [
        { value: 100, tag: null, q: "In which twin-city region does the story of Jinx, Vi, and the chem-barons (from \"Arcane\") take place?", a: "Piltover & Zaun" },
        { value: 200, tag: null, q: "Kayle and Morgana are a winged twin pair from Demacia. Which one is known as the \"fallen angel\"?", a: "Morgana" },
        { value: 300, tag: null, q: "What's the home region of the Void monsters like Kha'Zix, Cho'Gath, and Kog'Maw called?", a: "Icathia" },
        { value: 400, tag: null, q: "In the original (since reworked) lore, what was the purpose of the \"League of Legends\" itself among the nations of Valoran?", a: "Conflict resolution between nations (a peaceful/political alternative to open war)" },
        { value: 500, tag: null, q: "Which champion rides the primal beast Bristle?", a: "Sejuani" }
      ]
    }
  ]
};
