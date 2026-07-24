const BOARD_ID = "board2";
const UI_LANG = "en";
const BOARD_DATA = {
  categories: [
    {
      name: "Streamers & Content",
      clues: [
        { value: 100, tag: null, q: "Which notorious NA streamer was the first to hit Rank 1 (Challenger) in every single role in 2019, after previously being banned by Riot?", a: "Tyler1" },
        { value: 200, tag: null, q: "Which champion was legendary Korean support player \"Madlife\" especially famous for (keyword: hooks)?", a: "Blitzcrank (also known for Thresh)" },
        { value: 300, tag: null, q: "Which European streamer and former caster became hugely popular for his thrilling Worlds analysis and now hosts/casts major events?", a: "Caedrel" },
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
        { value: 100, tag: null, q: "What's the buff/unit called that you get after killing the Rift Herald, letting you attack towers with it?", a: "Eye of the Herald" },
        { value: 200, tag: null, q: "Since which patch/season was the early Rift Herald encounter supplemented with smaller creatures called \"Void Grubs\"?", a: "Season 2024, Patch 14.1" },
        { value: 300, tag: null, q: "What's the neutral river monster called that grants gold, healing, and brief vision of nearby enemies when killed?", a: "Scuttle Crab (Scuttler)" },
        { value: 400, tag: "ESTIMATE", q: "How long does a destroyed inhibitor take to respawn?", a: "5 minutes" },
        { value: 500, tag: null, q: "What are the small bonus platforms on outer towers called, which grant permanent bonus damage when they break off (since Season 2019)?", a: "Turret Plates" }
      ]
    },
    {
      name: "Meta & Statistics I",
      clues: [
        { value: 100, tag: "ESTIMATE", q: "Roughly how many playable champions are there currently (as of summer 2026)?", a: "Approx. 173 champions (tolerance ±10)" },
        { value: 200, tag: "ESTIMATE", q: "What's the base movement speed of most champions (in units)?", a: "325 units (tolerance ±15)" },
        { value: 300, tag: "ESTIMATE", q: "Roughly how long does an average ranked solo/duo game last (in minutes)?", a: "Approx. 28–32 minutes (tolerance 25–35)" },
        { value: 400, tag: "PICTURE", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg", q: "Which champion is shown here, and what year did she originally come out?", a: "Ahri, 2009" },
        { value: 500, tag: null, q: "Name the three highest ranked tiers above Diamond (ascending order).", a: "Master, Grandmaster, Challenger" }
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
