(function () {
  const SCORES_KEY = "lolquiz_scores";
  const usedKey = "lolquiz_used_" + BOARD_ID;

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
      plusBtn.addEventListener("click", () => adjustScore(key, currentValue));
      block.appendChild(plusBtn);

      const minusBtn = document.createElement("button");
      minusBtn.className = "btn";
      minusBtn.textContent = "−" + currentValue;
      minusBtn.addEventListener("click", () => adjustScore(key, -currentValue));
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
    modalAnswer.classList.add("shown");
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
      minus.addEventListener("click", () => {
        scores[key].score -= 100;
        saveScores(scores);
        renderScoreboard();
      });

      const plus = document.createElement("button");
      plus.textContent = "+100";
      plus.addEventListener("click", () => {
        scores[key].score += 100;
        saveScores(scores);
        renderScoreboard();
      });

      btnRow.appendChild(minus);
      btnRow.appendChild(plus);
      card.appendChild(btnRow);

      const noteWrap = document.createElement("div");
      noteWrap.className = "team-note";

      const noteInput = document.createElement("input");
      noteInput.type = "password";
      noteInput.placeholder = "Antwort eingeben…";
      noteInput.value = team.note || "";
      noteInput.addEventListener("input", () => {
        scores[key].note = noteInput.value;
        saveScores(scores);
      });
      noteWrap.appendChild(noteInput);

      const revealBtn = document.createElement("button");
      revealBtn.textContent = "Aufdecken";
      revealBtn.addEventListener("click", () => {
        const revealing = noteInput.type === "password";
        noteInput.type = revealing ? "text" : "password";
        revealBtn.textContent = revealing ? "Verbergen" : "Aufdecken";
      });
      noteWrap.appendChild(revealBtn);

      card.appendChild(noteWrap);

      scoreboardEl.appendChild(card);
    });
  }

  document.getElementById("reset-board-btn").addEventListener("click", () => {
    if (confirm("Alle Fragen dieses Boards wieder freigeben?")) {
      used = new Set();
      saveUsed(used);
      renderBoard();
    }
  });

  document.getElementById("reset-scores-btn").addEventListener("click", () => {
    if (confirm("Punktestände aller Teams zurücksetzen?")) {
      Object.keys(scores).forEach((k) => (scores[k].score = 0));
      saveScores(scores);
      renderScoreboard();
    }
  });

  renderBoard();
  renderScoreboard();
})();
