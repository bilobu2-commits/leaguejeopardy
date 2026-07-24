(function () {
  const LANG = typeof UI_LANG !== "undefined" ? UI_LANG : "de";
  const MASTER_CODE = "8526";

  const STRINGS = {
    de: {
      notePlaceholder: "Antwort eingeben…",
      noteReveal: "Aufdecken",
      noteHide: "Verbergen",
      resetBoardConfirm: "Alle Fragen dieses Boards wieder freigeben?",
      resetScoresConfirm: "Punktestände aller Teams zurücksetzen?",
      masterLocked: "🔒 Gesperrt",
      masterUnlocked: "🔓 Freigeschaltet",
      masterWrong: "Falscher Code!",
      buzzerReset: "Buzzer zurücksetzen",
      buzzerReady: "Bereit zum Buzzern",
      buzzerWinner: (name) => name + " war zuerst! 🔔"
    },
    en: {
      notePlaceholder: "Enter answer…",
      noteReveal: "Reveal",
      noteHide: "Hide",
      resetBoardConfirm: "Reset all questions on this board?",
      resetScoresConfirm: "Reset all teams' scores?",
      masterLocked: "🔒 Locked",
      masterUnlocked: "🔓 Unlocked",
      masterWrong: "Wrong code!",
      buzzerReset: "Reset buzzer",
      buzzerReady: "Ready to buzz",
      buzzerWinner: (name) => name + " buzzed first! 🔔"
    }
  };
  const STR = STRINGS[LANG] || STRINGS.de;

  const SCORES_KEY = "lolquiz_scores";
  const usedKey = "lolquiz_used_" + BOARD_ID;
  const MASTER_KEY = "lolquiz_master_unlocked";

  function loadScores() {
    try {
      const raw = localStorage.getItem(SCORES_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      team1: { name: "Team 1", score: 0 },
      team2: { name: "Team 2", score: 0 },
      team3: { name: "Team 3", score: 0 }
    };
  }

  function saveScores(scores) {
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  }

  function loadUsed() {
    try {
      const raw = localStorage.getItem(usedKey);
      if (raw) return new Set(JSON.parse(raw));
    } catch (e) {}
    return new Set();
  }

  function saveUsed(used) {
    localStorage.setItem(usedKey, JSON.stringify(Array.from(used)));
  }

  let scores = loadScores();
  let used = loadUsed();

  const boardEl = document.getElementById("board");
  const overlay = document.getElementById("overlay");
  const modalCat = document.getElementById("modal-cat");
  const modalVal = document.getElementById("modal-val");
  const modalTag = document.getElementById("modal-tag");
  const modalQuestion = document.getElementById("modal-question");
  const modalAnswer = document.getElementById("modal-answer");
  const showAnswerBtn = document.getElementById("show-answer-btn");
  const closeBtn = document.getElementById("close-btn");
  const scoreRow = document.getElementById("score-row");
  const modalImage = document.getElementById("modal-image");

  let currentClueId = null;
  let currentValue = 0;

  // ---------- Gamemaster unlock ----------
  const masterInput = document.getElementById("master-code-input");
  const masterBtn = document.getElementById("master-code-btn");
  const masterStatus = document.getElementById("master-status");
  const masterBar = document.getElementById("master-bar");

  function isMasterUnlocked() {
    return sessionStorage.getItem(MASTER_KEY) === "1";
  }

  function updateMasterUI() {
    const unlocked = isMasterUnlocked();
    masterStatus.textContent = unlocked ? STR.masterUnlocked : STR.masterLocked;
    masterBar.classList.toggle("unlocked", unlocked);
    masterInput.style.display = unlocked ? "none" : "inline-block";
    masterBtn.style.display = unlocked ? "none" : "inline-block";
  }

  function tryUnlock() {
    if (masterInput.value === MASTER_CODE) {
      sessionStorage.setItem(MASTER_KEY, "1");
      updateMasterUI();
    } else {
      alert(STR.masterWrong);
    }
    masterInput.value = "";
  }

  masterBtn.addEventListener("click", tryUnlock);
  masterInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryUnlock();
  });

  function requireMaster(action) {
    if (isMasterUnlocked()) {
      action();
      return;
    }
    masterBar.classList.remove("attention");
    void masterBar.offsetWidth;
    masterBar.classList.add("attention");
    masterBar.scrollIntoView({ behavior: "smooth", block: "center" });
    masterInput.focus();
  }

  updateMasterUI();

  function renderBoard() {
    boardEl.innerHTML = "";
    const cats = BOARD_DATA.categories;

    cats.forEach((cat) => {
      const header = document.createElement("div");
      header.className = "cat-header";
      header.textContent = cat.name;
      boardEl.appendChild(header);
    });

    for (let row = 0; row < 5; row++) {
      cats.forEach((cat, catIdx) => {
        const clue = cat.clues[row];
        const id = catIdx + "_" + row;
        const cell = document.createElement("div");
        cell.className = "clue" + (used.has(id) ? " used" : "");
        cell.dataset.id = id;

        if (clue.tag) {
          const badge = document.createElement("span");
          badge.className = "clue-tag tag-" + clue.tag;
          badge.textContent = clue.tag;
          cell.appendChild(badge);
        }

        const valSpan = document.createElement("span");
        valSpan.textContent = used.has(id) ? "✓" : clue.value;
        cell.appendChild(valSpan);

        cell.addEventListener("click", () => openClue(catIdx, row, id));
        boardEl.appendChild(cell);
      });
    }
  }

  function openClue(catIdx, row, id) {
    const cat = BOARD_DATA.categories[catIdx];
    const clue = cat.clues[row];
    currentClueId = id;
    currentValue = clue.value;

    modalCat.textContent = cat.name;
    modalVal.textContent = clue.value;
    modalQuestion.textContent = clue.q;
    modalAnswer.textContent = clue.a;
    modalAnswer.classList.remove("shown");
    showAnswerBtn.style.display = "inline-block";

    if (clue.tag) {
      modalTag.textContent = clue.tag;
      modalTag.className = "modal-tag tag-" + clue.tag;
      modalTag.style.display = "inline-block";
    } else {
      modalTag.style.display = "none";
    }

    if (clue.image) {
      modalImage.src = clue.image;
      modalImage.style.display = "block";
    } else {
      modalImage.removeAttribute("src");
      modalImage.style.display = "none";
    }

    renderScoreRow();
    overlay.classList.add("open");
  }

  function renderScoreRow() {
    scoreRow.innerHTML = "";
    Object.keys(scores).forEach((key) => {
      const team = scores[key];
      const block = document.createElement("div");
      block.className = "team-score-block";

      const label = document.createElement("span");
      label.textContent = team.name;
      block.appendChild(label);

      const plusBtn = document.createElement("button");
      plusBtn.className = "btn";
      plusBtn.textContent = "+" + currentValue;
      plusBtn.addEventListener("click", () => requireMaster(() => adjustScore(key, currentValue)));
      block.appendChild(plusBtn);

      const minusBtn = document.createElement("button");
      minusBtn.className = "btn";
      minusBtn.textContent = "−" + currentValue;
      minusBtn.addEventListener("click", () => requireMaster(() => adjustScore(key, -currentValue)));
      block.appendChild(minusBtn);

      scoreRow.appendChild(block);
    });
  }

  function adjustScore(teamKey, delta) {
    scores[teamKey].score += delta;
    saveScores(scores);
    renderScoreboard();
  }

  function closeModal() {
    overlay.classList.remove("open");
    if (currentClueId !== null) {
      used.add(currentClueId);
      saveUsed(used);
      renderBoard();
    }
    currentClueId = null;
  }

  showAnswerBtn.addEventListener("click", () => {
    requireMaster(() => modalAnswer.classList.add("shown"));
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });

  // ---------- Scoreboard ----------
  const scoreboardEl = document.getElementById("scoreboard");

  function renderScoreboard() {
    scoreboardEl.innerHTML = "";
    Object.keys(scores).forEach((key) => {
      const team = scores[key];
      const card = document.createElement("div");
      card.className = "team-card";

      const nameInput = document.createElement("input");
      nameInput.className = "team-name";
      nameInput.value = team.name;
      nameInput.addEventListener("change", () => {
        scores[key].name = nameInput.value || key;
        saveScores(scores);
        renderBuzzer();
      });
      card.appendChild(nameInput);

      const scoreDiv = document.createElement("div");
      scoreDiv.className = "team-score";
      scoreDiv.textContent = team.score;
      card.appendChild(scoreDiv);

      const btnRow = document.createElement("div");
      btnRow.className = "team-buttons";

      const minus = document.createElement("button");
      minus.textContent = "−100";
      minus.addEventListener("click", () => requireMaster(() => {
        scores[key].score -= 100;
        saveScores(scores);
        renderScoreboard();
      }));

      const plus = document.createElement("button");
      plus.textContent = "+100";
      plus.addEventListener("click", () => requireMaster(() => {
        scores[key].score += 100;
        saveScores(scores);
        renderScoreboard();
      }));

      btnRow.appendChild(minus);
      btnRow.appendChild(plus);
      card.appendChild(btnRow);

      const noteWrap = document.createElement("div");
      noteWrap.className = "team-note";

      const noteInput = document.createElement("input");
      noteInput.type = "password";
      noteInput.placeholder = STR.notePlaceholder;
      noteInput.value = team.note || "";
      noteInput.addEventListener("input", () => {
        scores[key].note = noteInput.value;
        saveScores(scores);
      });
      noteWrap.appendChild(noteInput);

      const revealBtn = document.createElement("button");
      revealBtn.textContent = STR.noteReveal;
      revealBtn.addEventListener("click", () => requireMaster(() => {
        const revealing = noteInput.type === "password";
        noteInput.type = revealing ? "text" : "password";
        revealBtn.textContent = revealing ? STR.noteHide : STR.noteReveal;
      }));
      noteWrap.appendChild(revealBtn);

      card.appendChild(noteWrap);

      scoreboardEl.appendChild(card);
    });
  }

  document.getElementById("reset-board-btn").addEventListener("click", () => {
    if (confirm(STR.resetBoardConfirm)) {
      used = new Set();
      saveUsed(used);
      renderBoard();
    }
  });

  document.getElementById("reset-scores-btn").addEventListener("click", () => {
    if (confirm(STR.resetScoresConfirm)) {
      Object.keys(scores).forEach((k) => (scores[k].score = 0));
      saveScores(scores);
      renderScoreboard();
    }
  });

  // ---------- Buzzer ----------
  const buzzerGrid = document.getElementById("buzzer-grid");
  const buzzerResult = document.getElementById("buzzer-result");
  const buzzerResetBtn = document.getElementById("buzzer-reset-btn");
  const buzzerSound = new Audio("Sounds/missing.mp3");
  let buzzedTeam = null;

  function renderBuzzer() {
    buzzerGrid.innerHTML = "";
    Object.keys(scores).forEach((key) => {
      const team = scores[key];
      const btn = document.createElement("button");
      btn.className = "buzzer-btn";
      btn.textContent = team.name;

      if (buzzedTeam === key) {
        btn.classList.add("buzzed");
      } else if (buzzedTeam !== null) {
        btn.classList.add("disabled");
        btn.disabled = true;
      }

      btn.addEventListener("click", () => {
        if (buzzedTeam !== null) return;
        buzzedTeam = key;
        buzzerSound.currentTime = 0;
        buzzerSound.play();
        renderBuzzer();
      });

      buzzerGrid.appendChild(btn);
    });

    buzzerResult.textContent = buzzedTeam !== null ? STR.buzzerWinner(scores[buzzedTeam].name) : STR.buzzerReady;
  }

  buzzerResetBtn.addEventListener("click", () => requireMaster(() => {
    buzzedTeam = null;
    renderBuzzer();
  }));

  renderBoard();
  renderScoreboard();
  renderBuzzer();
})();
