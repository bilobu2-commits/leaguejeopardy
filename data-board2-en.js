const BOARD_ID = "board2";
const UI_LANG = "en";
const BOARD_DATA = {
  categories: [
    {
      name: "Streamers & Content",
      clues: [
        { value: 100, tag: null, q: "Which notorious NA streamer was the first to hit Rank 1 (Challenger) in every single role in 2019, after previously being banned by Riot?", a: "Tyler1" },
        { value: 200, tag: null, q: "Which champion was legendary Korean support player \"Madlife\" especially famous for (keyword: hooks)?", a: "Blitzcrank (also known for Thresh)" },
        { value: 300, tag: null, q: "What was the name of the infamous streamer known for his Singed and Nasus mains?", a: "Sirchez" },
        { value: 400, tag: null, q: "What's the well-known in-game/scene name of Carlos Rodríguez Santiago?", a: "Ocelote (founder & CEO of G2 Esports)" },
        { value: 500, tag: null, q: "Who was TSM's top laner in Season 2, known for Riven and Shen?", a: "Dyrus" }
      ]
    },
    {
      name: "Voicelines & Quotes",
      clues: [
        { value: 100, tag: "QUOTE", q: "\"The heart is the biggest muscle. Train it.\" — Which champion says this?", a: "Braum" },
        { value: 200, tag: "QUOTE", q: "Which champion excitedly shouts his own name over and over during killing sprees?", a: "Draven" },
        { value: 300, tag: "QUOTE", q: "\"Come here, little soul.\" — a famous voiceline of which champion?", a: "Thresh" },
        { value: 400, tag: "QUOTE", q: "Which sound/announcer event marks the very first champion kill of a match?", a: "First Blood" },
        { value: 500, tag: "QUOTE", q: "\"Draven… out.\" — In what situation does Draven say this?", a: "When he gets banned during Champion Select (ban voiceline)" }
      ]
    },
    {
      name: "Map & Objectives",
      clues: [
        { value: 100, tag: null, q: "What do you pick up after killing the Rift Herald?", a: "The Eye of the Herald" },
        { value: 200, tag: null, q: "Since which patch/season was the early Rift Herald encounter supplemented with smaller creatures called \"Void Grubs\"?", a: "Season 2024, Patch 14.1" },
        { value: 300, tag: null, q: "What's the neutral river monster called that grants gold, healing, and brief vision of nearby enemies when killed?", a: "Scuttle Crab (Scuttler)" },
        { value: 400, tag: null, q: "Name one of the two forms of Atakhan.", a: "Voracious Form or Ruinous Form" },
        { value: 500, tag: "PICTURE", image: "https://i3.wp.com/streamie.com.br/wp-content/uploads/2016/11/img-pedra-filosofal-2.png?resize=700%2C483&ssl=1", q: "What item can you see at this spot on the map?", a: "Philosopher's Stone" }
      ]
    },
    {
      name: "Meta & Statistics I",
      clues: [
        { value: 100, tag: "ESTIMATE", q: "Roughly how many playable champions are there currently (as of summer 2026)?", a: "Approx. 173 champions (tolerance ±10)" },
        { value: 200, tag: "ESTIMATE", q: "What's the base movement speed of most champions (in units)?", a: "325 units (tolerance ±15)" },
        { value: 300, tag: "ESTIMATE", q: "Roughly how long does an average ranked solo/duo game last (in minutes)?", a: "Approx. 28–32 minutes (tolerance 25–35)" },
        { value: 400, tag: "PICTURE", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg", q: "Which champion is shown here, and what year did she originally come out?", a: "Ahri, 2009" },
        { value: 500, tag: null, q: "When were role queues (guaranteed primary/secondary role) added to ranked?", a: "With the start of the 2019 ranked season (January 2019)" }
      ]
    },
    {
      name: "Meta & Statistics II",
      clues: [
        { value: 100, tag: "ESTIMATE", q: "Of the 15 Worlds tournaments so far (2011–2025) — roughly how many times did the title go to a South Korean (LCK) team?", a: "Approx. 10 of 15 (tolerance ±2)" },
        { value: 200, tag: null, q: "What's the system called that grants extra bonus gold to whoever kills a champion on a kill streak?", a: "Bounty system (Champion Bounty)" },
        { value: 300, tag: null, q: "What's the highest kill-streak title called, when a champion kills a large number of enemy champions without dying (from 8 kills in a row)?", a: "Legendary" },
        { value: 400, tag: "ESTIMATE", q: "Up to what percentage slow can a single debuff cause at most, per Riot's fixed \"slow cap,\" no matter how many slows are stacked?", a: "90% (tolerance ±10)" },
        { value: 500, tag: null, q: "What's the debuff called that prevents a champion from being healed or shielded (triggered e.g. by Executioner's Calling or Morellonomicon)?", a: "Grievous Wounds" }
      ]
    }
  ]
};
