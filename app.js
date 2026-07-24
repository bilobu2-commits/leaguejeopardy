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
      buzzerWinner: (name) => name + " war zuerst! 🔔",
      noteEntered: "✎ Antwort eingegeben"
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
      buzzerWinner: (name) => name + " buzzed first! 🔔",
      noteEntered: "✎ Answer entered"
    }
  };
  const STR = STRINGS[LANG] || STRINGS.de;

  const MASTER_KEY = "lolquiz_master_unlocked";

  const DEFAULT_SCORES = {
    team1: { name: "Team 1", score: 0, note: "", noteRevealed: false },
    team2: { name: "Team 2", score: 0, note: "", noteRevealed: false },
    team3: { name: "Team 3", score: 0, note: "", noteRevealed: false }
  };

  const db = firebase.database();
  const scoresRef = db.ref("scores");
  const usedRef = db.ref("boards/" + BOARD_ID + "/used");
  const openClueRef = db.ref("openClue");
  const buzzerRef = db.ref("buzzer/team");

  let scores = {};
  let used = {};
  let openClueState = null;
  let buzzedTeam = null;
  let buzzerReady = false;

  function mergedScores() {
    const out = {};
    Object.keys(DEFAULT_SCORES).forEach((key) => {
      out[key] = Object.assign({}, DEFAULT_SCORES[key], scores[key] || {});
    });
    return out;
  }

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
    document.body.classList.toggle("master-locked", !unlocked);
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

  // ---------- Board ----------
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
        cell.className = "clue" + (used[id] ? " used" : "");
        cell.dataset.id = id;

        if (clue.tag) {
          const badge = document.createElement("span");
          badge.className = "clue-tag tag-" + clue.tag;
          badge.textContent = clue.tag;
          cell.appendChild(badge);
        }

        const valSpan = document.createElement("span");
        valSpan.textContent = used[id] ? "✓" : clue.value;
        cell.appendChild(valSpan);

        cell.addEventListener("click", () => {
          if (used[id]) return;
          requireMaster(() => {
            openClueRef.set({ board: BOARD_ID, cat: catIdx, row: row, answerShown: false });
            buzzerRef.set(null);
          });
        });
        boardEl.appendChild(cell);
      });
    }
  }

  // ---------- Modal (driven by shared openClue state) ----------
  function renderModal() {
    if (!openClueState || openClueState.board !== BOARD_ID) {
      overlay.classList.remove("open");
      return;
    }

    const cat = BOARD_DATA.categories[openClueState.cat];
    const clue = cat.clues[openClueState.row];

    modalCat.textContent = cat.name;
    modalVal.textContent = clue.value;
    modalQuestion.textContent = clue.q;
    modalAnswer.textContent = clue.a;
    modalAnswer.classList.toggle("shown", !!openClueState.answerShown);

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

    renderScoreRow(clue.value);
    overlay.classList.add("open");
  }

  function renderScoreRow(value) {
    scoreRow.innerHTML = "";
    const s = mergedScores();
    Object.keys(s).forEach((key) => {
      const team = s[key];
      const block = document.createElement("div");
      block.className = "team-score-block";

      const label = document.createElement("span");
      label.textContent = team.name;
      block.appendChild(label);

      const plusBtn = document.createElement("button");
      plusBtn.className = "btn master-only";
      plusBtn.textContent = "+" + value;
      plusBtn.addEventListener("click", () => requireMaster(() => {
        scoresRef.child(key).child("score").transaction((cur) => (cur || 0) + value);
      }));
      block.appendChild(plusBtn);

      const minusBtn = document.createElement("button");
      minusBtn.className = "btn master-only";
      minusBtn.textContent = "−" + value;
      minusBtn.addEventListener("click", () => requireMaster(() => {
        scoresRef.child(key).child("score").transaction((cur) => (cur || 0) - value);
      }));
      block.appendChild(minusBtn);

      scoreRow.appendChild(block);
    });
  }

  function closeClue() {
    requireMaster(() => {
      if (!openClueState || openClueState.board !== BOARD_ID) return;
      const id = openClueState.cat + "_" + openClueState.row;
      usedRef.child(id).set(true);
      openClueRef.set(null);
      buzzerRef.set(null);
    });
  }

  showAnswerBtn.addEventListener("click", () => requireMaster(() => {
    if (openClueState) openClueRef.child("answerShown").set(true);
  }));

  closeBtn.addEventListener("click", closeClue);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeClue();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeClue();
  });

  // ---------- Scoreboard ----------
  const scoreboardEl = document.getElementById("scoreboard");

  function renderScoreboard() {
    scoreboardEl.innerHTML = "";
    const focused = document.activeElement;
    let focusInfo = null;
    if (focused && scoreboardEl.contains(focused) && focused.dataset.team) {
      focusInfo = {
        team: focused.dataset.team,
        field: focused.dataset.field,
        selStart: focused.selectionStart,
        selEnd: focused.selectionEnd
      };
    }

    const s = mergedScores();
    Object.keys(s).forEach((key) => {
      const team = s[key];
      const card = document.createElement("div");
      card.className = "team-card";

      const nameInput = document.createElement("input");
      nameInput.className = "team-name";
      nameInput.value = team.name;
      nameInput.dataset.team = key;
      nameInput.dataset.field = "name";
      nameInput.addEventListener("change", () => {
        scoresRef.child(key).child("name").set(nameInput.value || key);
      });
      card.appendChild(nameInput);

      const scoreDiv = document.createElement("div");
      scoreDiv.className = "team-score";
      scoreDiv.textContent = team.score;
      card.appendChild(scoreDiv);

      const btnRow = document.createElement("div");
      btnRow.className = "team-buttons";

      const minus = document.createElement("button");
      minus.className = "master-only";
      minus.textContent = "−100";
      minus.addEventListener("click", () => requireMaster(() => {
        scoresRef.child(key).child("score").transaction((cur) => (cur || 0) - 100);
      }));

      const plus = document.createElement("button");
      plus.className = "master-only";
      plus.textContent = "+100";
      plus.addEventListener("click", () => requireMaster(() => {
        scoresRef.child(key).child("score").transaction((cur) => (cur || 0) + 100);
      }));

      btnRow.appendChild(minus);
      btnRow.appendChild(plus);
      card.appendChild(btnRow);

      const noteWrap = document.createElement("div");
      noteWrap.className = "team-note";

      const noteInput = document.createElement("input");
      noteInput.type = team.noteRevealed ? "text" : "password";
      noteInput.placeholder = STR.notePlaceholder;
      noteInput.value = team.note || "";
      noteInput.dataset.team = key;
      noteInput.dataset.field = "note";
      noteInput.addEventListener("input", () => {
        scoresRef.child(key).update({ note: noteInput.value, noteRevealed: false });
      });
      noteWrap.appendChild(noteInput);

      if (!team.noteRevealed && team.note) {
        const hint = document.createElement("span");
        hint.className = "note-hint";
        hint.textContent = STR.noteEntered;
        noteWrap.appendChild(hint);
      }

      const revealBtn = document.createElement("button");
      revealBtn.className = "master-only";
      revealBtn.textContent = team.noteRevealed ? STR.noteHide : STR.noteReveal;
      revealBtn.addEventListener("click", () => requireMaster(() => {
        scoresRef.child(key).child("noteRevealed").transaction((cur) => !cur);
      }));
      noteWrap.appendChild(revealBtn);

      card.appendChild(noteWrap);

      scoreboardEl.appendChild(card);
    });

    if (focusInfo) {
      const el = scoreboardEl.querySelector(
        '[data-team="' + focusInfo.team + '"][data-field="' + focusInfo.field + '"]'
      );
      if (el) {
        el.focus();
        if (typeof el.setSelectionRange === "function" && focusInfo.selStart != null) {
          el.setSelectionRange(focusInfo.selStart, focusInfo.selEnd);
        }
      }
    }
  }

  document.getElementById("reset-board-btn").addEventListener("click", () => requireMaster(() => {
    if (confirm(STR.resetBoardConfirm)) usedRef.set(null);
  }));

  document.getElementById("reset-scores-btn").addEventListener("click", () => requireMaster(() => {
    if (confirm(STR.resetScoresConfirm)) {
      const updates = {};
      Object.keys(DEFAULT_SCORES).forEach((k) => (updates[k + "/score"] = 0));
      scoresRef.update(updates);
    }
  }));

  // ---------- Buzzer ----------
  const buzzerGrid = document.getElementById("buzzer-grid");
  const buzzerResult = document.getElementById("buzzer-result");
  const buzzerResetBtn = document.getElementById("buzzer-reset-btn");
  const buzzerSound = new Audio("Sounds/missing.mp3");

  function renderBuzzer() {
    buzzerGrid.innerHTML = "";
    const s = mergedScores();
    Object.keys(s).forEach((key) => {
      const team = s[key];
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
        buzzerRef.transaction((cur) => (cur === null || cur === undefined ? key : cur));
      });

      buzzerGrid.appendChild(btn);
    });

    const s2 = mergedScores();
    buzzerResult.textContent = buzzedTeam !== null && s2[buzzedTeam]
      ? STR.buzzerWinner(s2[buzzedTeam].name)
      : STR.buzzerReady;
  }

  buzzerResetBtn.addEventListener("click", () => requireMaster(() => {
    buzzerRef.set(null);
  }));

  // ---------- Firebase live listeners ----------
  scoresRef.on("value", (snap) => {
    scores = snap.val() || {};
    renderScoreboard();
    renderBuzzer();
    if (openClueState) renderScoreRow(BOARD_DATA.categories[openClueState.cat].clues[openClueState.row].value);
  });

  usedRef.on("value", (snap) => {
    used = snap.val() || {};
    renderBoard();
  });

  openClueRef.on("value", (snap) => {
    openClueState = snap.val();
    renderModal();
  });

  buzzerRef.on("value", (snap) => {
    const newVal = snap.val() || null;
    if (buzzerReady && newVal && !buzzedTeam) {
      buzzerSound.currentTime = 0;
      buzzerSound.play().catch(() => {});
    }
    buzzedTeam = newVal;
    buzzerReady = true;
    renderBuzzer();
  });

  renderBoard();
  renderScoreboard();
  renderBuzzer();
})();
