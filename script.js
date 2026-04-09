const STORAGE_KEY = "kktk-weekly-challenges-v1";
const STORAGE_VERSION = 2;
const GAME_MASTER_CREDENTIALS = {
  username: "gamemaster",
  password: "MCGIkktk"
};

const PALETTE = {
  skinTones: [
    { id: "fair", label: "Fair", color: "#f6d7bd" },
    { id: "warm", label: "Warm", color: "#efc49b" },
    { id: "golden", label: "Golden", color: "#dca779" },
    { id: "deep", label: "Deep", color: "#9a6745" }
  ],
  hairColors: [
    { id: "espresso", label: "Espresso", color: "#3a261d" },
    { id: "auburn", label: "Auburn", color: "#8f4e34" },
    { id: "honey", label: "Honey", color: "#c48a46" },
    { id: "midnight", label: "Midnight", color: "#1d2034" }
  ],
  outfits: [
    { id: "sunrise", label: "Sunrise", light: "#f6a35d", dark: "#db6d5b" },
    { id: "river", label: "River", light: "#87d0e0", dark: "#548ca2" },
    { id: "grove", label: "Grove", light: "#8fd798", dark: "#4fa06c" },
    { id: "royal", label: "Royal", light: "#b784db", dark: "#7d5ca1" }
  ],
  hairStyles: [
    { id: "classic", label: "Classic" },
    { id: "curly", label: "Curly" },
    { id: "bun", label: "Bun" },
    { id: "puffs", label: "Puffs" }
  ],
  accessories: [
    { id: "halo", label: "Halo" },
    { id: "crown", label: "Crown" },
    { id: "star", label: "Star" },
    { id: "book", label: "Bible" }
  ],
  expressions: [
    { id: "smile", label: "Smile" },
    { id: "grin", label: "Grin" },
    { id: "joyful", label: "Joyful" },
    { id: "focused", label: "Focused" }
  ]
};

const LEVELS = [
  { name: "Mustard Seed", min: 0, note: "Starting your journey" },
  { name: "Shepherd Scout", min: 220, note: "Finding your footing" },
  { name: "Psalm Seeker", min: 430, note: "Building Bible wisdom" },
  { name: "Covenant Climber", min: 700, note: "Playing with confidence" },
  { name: "Kingdom Champion", min: 980, note: "Leading the weekly board" }
];

const GAME_META = {
  quiz: {
    id: "quiz",
    title: "Scripture Sprint Quiz",
    subtitle: "Answer five Bible questions before time runs out in your mind.",
    typeLabel: "Quiz",
    levelLabel: "Tier 1",
    maxScore: 500
  },
  crossword: {
    id: "crossword",
    title: "Mini Bible Crossword",
    subtitle: "Fill the grid with Bible words and clues from familiar stories.",
    typeLabel: "Crossword",
    levelLabel: "Tier 2",
    maxScore: 450
  },
  wordsearch: {
    id: "wordsearch",
    title: "Faith Word Search",
    subtitle: "Find hidden Bible words by selecting straight lines in the grid.",
    typeLabel: "Word Search",
    levelLabel: "Tier 2",
    maxScore: 400
  }
};

const QUIZ_QUESTIONS = [
  {
    prompt: "Who built the ark to survive the great flood?",
    choices: ["Moses", "Noah", "David", "Jonah"],
    answer: "Noah"
  },
  {
    prompt: "Which boy defeated Goliath with a sling and a stone?",
    choices: ["Samuel", "Joseph", "David", "Daniel"],
    answer: "David"
  },
  {
    prompt: "How many days did God take to create the world before resting?",
    choices: ["Three", "Six", "Seven", "Ten"],
    answer: "Six"
  },
  {
    prompt: "Who was swallowed by a great fish after running away?",
    choices: ["Jonah", "Paul", "Peter", "Elijah"],
    answer: "Jonah"
  },
  {
    prompt: "What is the first book of the Bible?",
    choices: ["Exodus", "Psalms", "Genesis", "Matthew"],
    answer: "Genesis"
  }
];

const CROSSWORD_CONFIG = {
  size: 8,
  words: [
    { clueNumber: 1, label: "1 Across", direction: "across", answer: "GENESIS", clue: "The first book of the Bible.", start: { row: 3, col: 0 } },
    { clueNumber: 1, label: "1 Down", direction: "down", answer: "GRACE", clue: "God's loving favor that we do not earn.", start: { row: 3, col: 0 } },
    { clueNumber: 2, label: "2 Down", direction: "down", answer: "EDEN", clue: "The garden where Adam and Eve first lived.", start: { row: 3, col: 1 } },
    { clueNumber: 3, label: "3 Down", direction: "down", answer: "NOAH", clue: "The ark builder.", start: { row: 3, col: 2 } },
    { clueNumber: 4, label: "4 Down", direction: "down", answer: "SIN", clue: "What separates people from God.", start: { row: 3, col: 4 } },
    { clueNumber: 5, label: "5 Down", direction: "down", answer: "ISAAC", clue: "Abraham's promised son.", start: { row: 3, col: 5 } }
  ]
};

const WORDSEARCH_WORDS = ["NOAH", "GRACE", "FAITH", "JONAH", "PSALM"];

const appState = loadState();
const currentWeekId = getWeekId(new Date());

const elements = {
  weekLabel: document.getElementById("weekLabel"),
  heroAvatarStage: document.getElementById("heroAvatarStage"),
  builderAvatarStage: document.getElementById("builderAvatarStage"),
  heroName: document.getElementById("heroName"),
  heroTagline: document.getElementById("heroTagline"),
  currentLevel: document.getElementById("currentLevel"),
  weeklyGrade: document.getElementById("weeklyGrade"),
  completedCount: document.getElementById("completedCount"),
  weeklyScore: document.getElementById("weeklyScore"),
  bestGrade: document.getElementById("bestGrade"),
  leaderboardRank: document.getElementById("leaderboardRank"),
  challengeGrid: document.getElementById("challengeGrid"),
  levelTrack: document.getElementById("levelTrack"),
  leaderboardList: document.getElementById("leaderboardList"),
  profileModal: document.getElementById("profileModal"),
  profileForm: document.getElementById("profileForm"),
  playerNameInput: document.getElementById("playerNameInput"),
  drawerBackdrop: document.getElementById("drawerBackdrop"),
  gameDrawer: document.getElementById("gameDrawer"),
  gmDrawer: document.getElementById("gmDrawer"),
  drawerBody: document.getElementById("drawerBody"),
  drawerTitle: document.getElementById("drawerTitle"),
  gmBody: document.getElementById("gmBody"),
  startChallengeButton: document.getElementById("startChallengeButton"),
  viewLeaderboardButton: document.getElementById("viewLeaderboardButton"),
  editAvatarButton: document.getElementById("editAvatarButton"),
  gameMasterButton: document.getElementById("gameMasterButton"),
  cancelProfileButton: document.getElementById("cancelProfileButton"),
  resetBuilderButton: document.getElementById("resetBuilderButton"),
  builderSummary: document.getElementById("builderSummary"),
  closeGameDrawer: document.getElementById("closeGameDrawer"),
  closeGmDrawer: document.getElementById("closeGmDrawer"),
  skinToneOptions: document.getElementById("skinToneOptions"),
  hairStyleOptions: document.getElementById("hairStyleOptions"),
  hairColorOptions: document.getElementById("hairColorOptions"),
  outfitOptions: document.getElementById("outfitOptions"),
  accessoryOptions: document.getElementById("accessoryOptions"),
  expressionOptions: document.getElementById("expressionOptions")
};

const builderProfile = createProfileDraft(appState.profile);

let activeWordSearch = null;
let crosswordGrid = buildCrosswordGrid();

ensureWeekState();
renderBuilderControls();
bindEvents();
renderApp();

function bindEvents() {
  elements.startChallengeButton.addEventListener("click", handleStartChallenge);
  elements.viewLeaderboardButton.addEventListener("click", () => {
    document.getElementById("leaderboardSection").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  elements.editAvatarButton.addEventListener("click", () => openProfileModal(true));
  elements.gameMasterButton.addEventListener("click", openGameMaster);
  elements.cancelProfileButton.addEventListener("click", handleCancelProfile);
  elements.resetBuilderButton.addEventListener("click", resetBuilderDraft);
  elements.profileForm.addEventListener("submit", handleProfileSubmit);
  elements.closeGameDrawer.addEventListener("click", closeDrawers);
  elements.closeGmDrawer.addEventListener("click", closeDrawers);
  elements.drawerBackdrop.addEventListener("click", closeDrawers);
}

function renderApp() {
  const weekState = ensureWeekState();
  elements.weekLabel.textContent = getWeekLabel(new Date());

  if (appState.profile) {
    elements.heroAvatarStage.innerHTML = renderAvatar(appState.profile);
    elements.heroName.textContent = appState.profile.name;
    elements.heroTagline.textContent = buildHeroTagline(appState.profile);
  } else {
    elements.heroAvatarStage.innerHTML = renderAvatar(builderProfile);
    elements.heroName.textContent = "Create your Bible hero";
    elements.heroTagline.textContent = "Choose a name, style, and expression to begin the weekly quest.";
  }

  syncBuilderUI();

  const totalScore = getTotalScore(weekState);
  const level = getLevelForScore(totalScore);
  const overallGrade = getOverallGrade(weekState);
  const completedGames = getCompletedGames(weekState).length;
  const board = buildLeaderboard(weekState);
  const myRank = board.findIndex((entry) => entry.isPlayer) + 1;
  const grades = Object.values(weekState.results).map((result) => result.grade).filter(Boolean);

  elements.currentLevel.textContent = level.name;
  elements.weeklyGrade.textContent = overallGrade;
  elements.completedCount.textContent = `${completedGames} / 3`;
  elements.weeklyScore.textContent = totalScore.toString();
  elements.bestGrade.textContent = grades.length ? grades.sort(compareGrades)[0] : "Starter";
  elements.leaderboardRank.textContent = myRank ? `#${myRank}` : "#--";

  renderChallengeCards(weekState);
  renderLevelTrack(totalScore);
  renderLeaderboard(board);
  if (appState.admin.authenticated) {
    renderGameMasterPanel();
  } else {
    renderGameMasterLogin();
  }

  if (!appState.profile) {
    openProfileModal(false);
  } else {
    closeProfileModal();
  }
}

function renderBuilderControls() {
  renderSwatchOptions(elements.skinToneOptions, PALETTE.skinTones, "skinTone", builderProfile.skinTone, true, false);
  renderChoiceOptions(elements.hairStyleOptions, PALETTE.hairStyles, "hairStyle", builderProfile.hairStyle);
  renderSwatchOptions(elements.hairColorOptions, PALETTE.hairColors, "hairColor", builderProfile.hairColor, true, false);
  renderSwatchOptions(elements.outfitOptions, PALETTE.outfits, "outfit", builderProfile.outfit, false, true);
  renderChoiceOptions(elements.accessoryOptions, PALETTE.accessories, "accessory", builderProfile.accessory);
  renderChoiceOptions(elements.expressionOptions, PALETTE.expressions, "expression", builderProfile.expression);
}

function syncBuilderUI() {
  elements.builderAvatarStage.innerHTML = renderAvatar(builderProfile);
  renderBuilderControls();
  renderBuilderSummary();
}

function renderBuilderSummary() {
  const skin = findById(PALETTE.skinTones, builderProfile.skinTone);
  const hairStyle = findById(PALETTE.hairStyles, builderProfile.hairStyle);
  const hairColor = findById(PALETTE.hairColors, builderProfile.hairColor);
  const outfit = findById(PALETTE.outfits, builderProfile.outfit);
  const accessory = findById(PALETTE.accessories, builderProfile.accessory);
  const expression = findById(PALETTE.expressions, builderProfile.expression);

  elements.builderSummary.innerHTML = `
    <strong>Current hero style</strong>
    <span>${skin.label} skin, ${hairColor.label.toLowerCase()} ${hairStyle.label.toLowerCase()} hair, ${outfit.label.toLowerCase()} outfit, ${accessory.label.toLowerCase()} accessory, ${expression.label.toLowerCase()} expression.</span>
  `;
}

function renderSwatchOptions(container, options, key, selectedId, iconOnly, useGradient) {
  container.innerHTML = options.map((option) => {
    const isSelected = option.id === selectedId ? "is-selected" : "";
    const swatch = useGradient ? `linear-gradient(135deg, ${option.light}, ${option.dark})` : option.color;
    const label = iconOnly ? "" : option.label;
    return `
      <button class="swatch-button ${isSelected}" data-key="${key}" data-value="${option.id}" data-color="true" style="--swatch:${swatch};" title="${option.label}" type="button">
        ${label}
      </button>
    `;
  }).join("");

  container.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => updateBuilder(button.dataset.key, button.dataset.value));
  });
}

function renderChoiceOptions(container, options, key, selectedId) {
  container.innerHTML = options.map((option) => `
    <button class="choice-chip ${option.id === selectedId ? "is-selected" : ""}" data-key="${key}" data-value="${option.id}" type="button">
      ${option.label}
    </button>
  `).join("");

  container.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => updateBuilder(button.dataset.key, button.dataset.value));
  });
}

function updateBuilder(key, value) {
  builderProfile[key] = value;
  syncBuilderUI();
}

function resetBuilderDraft() {
  const resetProfile = createProfileDraft(appState.profile);
  Object.assign(builderProfile, resetProfile);

  if (appState.profile) {
    elements.playerNameInput.value = appState.profile.name;
  }

  syncBuilderUI();
}

function handleProfileSubmit(event) {
  event.preventDefault();

  const name = sanitizePlayerName(elements.playerNameInput.value);
  if (!name) {
    elements.playerNameInput.focus();
    return;
  }

  elements.playerNameInput.value = name;
  appState.profile = {
    name,
    skinTone: builderProfile.skinTone,
    hairStyle: builderProfile.hairStyle,
    hairColor: builderProfile.hairColor,
    outfit: builderProfile.outfit,
    accessory: builderProfile.accessory,
    expression: builderProfile.expression
  };

  saveState();
  closeProfileModal();
  renderApp();
}

function handleCancelProfile() {
  if (!appState.profile) {
    return;
  }

  Object.assign(builderProfile, appState.profile);
  elements.playerNameInput.value = appState.profile.name;
  syncBuilderUI();
  closeProfileModal();
}

function openProfileModal(isEditing) {
  if (appState.profile) {
    Object.assign(builderProfile, appState.profile);
    elements.playerNameInput.value = appState.profile.name;
  } else if (!elements.playerNameInput.value.trim()) {
    Object.assign(builderProfile, createProfileDraft(null));
  }

  syncBuilderUI();
  elements.profileModal.classList.remove("hidden");
  elements.cancelProfileButton.classList.toggle("hidden", !isEditing && !appState.profile);
}

function closeProfileModal() {
  elements.profileModal.classList.add("hidden");
}

function handleStartChallenge() {
  if (!appState.profile) {
    openProfileModal(false);
    return;
  }

  const weekState = ensureWeekState();
  const firstIncomplete = ["quiz", "crossword", "wordsearch"].find((gameId) => !weekState.results[gameId].completed) || "quiz";
  openGame(firstIncomplete);
}

function renderChallengeCards(weekState) {
  elements.challengeGrid.innerHTML = Object.values(GAME_META).map((game) => {
    const result = weekState.results[game.id];
    return `
      <article class="challenge-card ${game.id}">
        <div class="challenge-header">
          <div>
            <p class="section-kicker">${game.typeLabel}</p>
            <h4 class="challenge-title">${game.title}</h4>
          </div>
          <span class="grade-pill">${result.grade || "Not Started"}</span>
        </div>

        <p class="game-copy">${game.subtitle}</p>

        <div class="challenge-meta">
          <span class="meta-pill">${game.levelLabel}</span>
          <span class="meta-pill">Max ${game.maxScore} pts</span>
          <span class="meta-pill">${result.completed ? "Completed" : "Open"}</span>
        </div>

        <div class="challenge-stats">
          <span class="level-badge">Score ${result.score}</span>
          <span class="level-badge">Stars ${result.stars || 0}</span>
        </div>

        <button class="challenge-action" data-open-game="${game.id}" type="button">
          ${result.completed ? "Replay Challenge" : "Play Challenge"}
        </button>
      </article>
    `;
  }).join("");

  elements.challengeGrid.querySelectorAll("[data-open-game]").forEach((button) => {
    button.addEventListener("click", () => openGame(button.dataset.openGame));
  });
}

function renderLevelTrack(score) {
  const currentLevel = getLevelForScore(score);
  elements.levelTrack.innerHTML = LEVELS.map((level) => `
    <article class="level-pill ${level.name === currentLevel.name ? "current" : ""}">
      <strong>${level.name}</strong>
      <span class="summary-label">Starts at ${level.min} pts</span>
      <p class="summary-copy">${level.note}</p>
    </article>
  `).join("");
}

function renderLeaderboard(board) {
  if (!board.length) {
    elements.leaderboardList.innerHTML = `
      <article class="empty-state">
        <strong>Leaderboard is clear</strong>
        <span>No players have posted a score yet. Once a challenge is completed, standings will appear here.</span>
      </article>
    `;
    return;
  }

  elements.leaderboardList.innerHTML = board.map((entry, index) => `
    <article class="leaderboard-item ${entry.isPlayer ? "me" : ""}">
      <div class="leaderboard-left">
        <div class="leaderboard-rank">#${index + 1}</div>
        <div>
          <p class="leaderboard-name">${escapeHtml(entry.name)}</p>
          <div class="leaderboard-note">${escapeHtml(entry.note)}</div>
        </div>
      </div>
      <div class="leaderboard-score">${entry.score}</div>
    </article>
  `).join("");
}

function renderGameMasterPanel() {
  const weekState = ensureWeekState();
  const board = buildLeaderboard(weekState);
  const overviewCards = Object.values(GAME_META).map((game) => {
    const result = weekState.results[game.id];
    return `
      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>${game.title}</h4>
            <p class="gm-copy">${game.subtitle}</p>
          </div>
          <span class="gm-pill">${result.grade || "Waiting"}</span>
        </div>
        <div class="gm-metrics">
          <span class="meta-pill">Score ${result.score}</span>
          <span class="meta-pill">Stars ${result.stars || 0}</span>
          <span class="meta-pill">${result.completed ? "Completed" : "Not Cleared"}</span>
        </div>
        <div class="gm-actions">
          <button class="secondary-button" data-open-game="${game.id}" type="button">Open ${game.typeLabel}</button>
        </div>
      </section>
    `;
  }).join("");

  const playerList = board.map((entry, index) => `
    <article class="gm-player-item">
      <div class="leaderboard-item ${entry.isPlayer ? "me" : ""}">
        <div class="leaderboard-left">
          <div class="leaderboard-rank">#${index + 1}</div>
          <div>
            <p class="leaderboard-name">${escapeHtml(entry.name)}</p>
            <div class="leaderboard-note">${escapeHtml(entry.note)}</div>
          </div>
        </div>
        <div class="leaderboard-score">${entry.score}</div>
      </div>
    </article>
  `).join("");

  const totalScore = getTotalScore(weekState);
  elements.gmBody.innerHTML = `
    <div class="gm-stack">
      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Weekly overview</h4>
            <p class="gm-copy">Manage the Bible games, review scores, and control this week’s progress.</p>
          </div>
          <span class="gm-pill">${getWeekLabel(new Date())}</span>
        </div>
        <div class="gm-metrics">
          <span class="meta-pill">Player ${escapeHtml(appState.profile ? appState.profile.name : "Not created")}</span>
          <span class="meta-pill">Weekly score ${totalScore}</span>
          <span class="meta-pill">Board entries ${board.length}</span>
          <span class="meta-pill">Overall grade ${getOverallGrade(weekState)}</span>
        </div>
        <div class="gm-actions">
          <button class="secondary-button" id="resetWeekButton" type="button">Reset Weekly Progress</button>
          <button class="leaderboard-refresh" id="logoutGameMasterButton" type="button">Log Out</button>
        </div>
      </section>

      ${overviewCards}

      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Leaderboard roster</h4>
            <p class="gm-copy">This shows the current player standings for the active week.</p>
          </div>
        </div>
        <div class="gm-player-list">${playerList}</div>
      </section>
    </div>
  `;

  if (!board.length) {
    elements.gmBody.querySelector(".gm-player-list").innerHTML = `
      <article class="empty-state">
        <strong>No player scores yet</strong>
        <span>The leaderboard is intentionally clear for new players. Entries appear after a challenge is completed.</span>
      </article>
    `;
  }

  elements.gmBody.querySelectorAll("[data-open-game]").forEach((button) => {
    button.addEventListener("click", () => {
      closeDrawers();
      openGame(button.dataset.openGame);
    });
  });

  const resetButton = document.getElementById("resetWeekButton");
  const logoutButton = document.getElementById("logoutGameMasterButton");

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      resetWeeklyProgress();
      renderApp();
      openGameMaster();
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", logoutGameMaster);
  }
}

function renderGameMasterLogin(errorMessage = "") {
  elements.gmBody.innerHTML = `
    <section class="gm-card">
      <div class="gm-head">
        <div>
          <h4>Game Master login</h4>
          <p class="gm-copy">Sign in to access weekly progress controls and the player board.</p>
        </div>
      </div>

      <form class="gm-login-form" id="gmLoginForm">
        <label class="field-block">
          <span>Username</span>
          <input id="gmUsernameInput" autocomplete="username" placeholder="gamemaster" required type="text">
        </label>

        <label class="field-block">
          <span>Password</span>
          <input id="gmPasswordInput" autocomplete="current-password" placeholder="Password" required type="password">
        </label>

        ${errorMessage ? `<article class="empty-state"><strong>Login failed</strong><span>${escapeHtml(errorMessage)}</span></article>` : ""}

        <button class="primary-button" type="submit">Open Game Master Console</button>
      </form>
    </section>
  `;

  const loginForm = document.getElementById("gmLoginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleGameMasterLogin);
  }
}

function openGame(gameId) {
  elements.drawerTitle.textContent = GAME_META[gameId].title;
  elements.drawerBackdrop.classList.remove("hidden");
  elements.gameDrawer.classList.remove("hidden");
  elements.gmDrawer.classList.add("hidden");
  renderGameDrawer(gameId);
}

function openGameMaster() {
  elements.drawerBackdrop.classList.remove("hidden");
  elements.gmDrawer.classList.remove("hidden");
  elements.gameDrawer.classList.add("hidden");
  if (appState.admin.authenticated) {
    renderGameMasterPanel();
  } else {
    renderGameMasterLogin();
  }
}

function closeDrawers() {
  elements.drawerBackdrop.classList.add("hidden");
  elements.gameDrawer.classList.add("hidden");
  elements.gmDrawer.classList.add("hidden");
}

function handleGameMasterLogin(event) {
  event.preventDefault();

  const username = document.getElementById("gmUsernameInput").value.trim();
  const password = document.getElementById("gmPasswordInput").value;

  if (username === GAME_MASTER_CREDENTIALS.username && password === GAME_MASTER_CREDENTIALS.password) {
    appState.admin.authenticated = true;
    saveState();
    renderGameMasterPanel();
    return;
  }

  renderGameMasterLogin("Incorrect username or password.");
}

function logoutGameMaster() {
  appState.admin.authenticated = false;
  saveState();
  renderGameMasterLogin();
}

function renderGameDrawer(gameId) {
  if (gameId === "quiz") {
    renderQuizGame();
    return;
  }

  if (gameId === "crossword") {
    renderCrosswordGame();
    return;
  }

  renderWordSearchGame();
}

function renderQuizGame() {
  const weekState = ensureWeekState();
  const previous = weekState.results.quiz;

  elements.drawerBody.innerHTML = `
    <div class="game-shell">
      <section class="game-card">
        <h4>Scripture Sprint rules</h4>
        <p class="game-copy">Answer each Bible question. Your score is based on how many you get right, and a perfect run earns bonus points.</p>
        <div class="challenge-meta">
          <span class="meta-pill">Perfect run bonus +100</span>
          <span class="meta-pill">Current best ${previous.score}</span>
        </div>
      </section>

      <form class="game-shell" id="quizForm">
        ${QUIZ_QUESTIONS.map((question, index) => `
          <section class="quiz-question">
            <h5>${index + 1}. ${question.prompt}</h5>
            ${question.choices.map((choice) => `
              <label class="answer-option">
                <input name="quiz-${index}" type="radio" value="${choice}">
                <span>${choice}</span>
              </label>
            `).join("")}
          </section>
        `).join("")}

        <button class="primary-button" type="submit">Submit Quiz</button>
      </form>

      ${renderStoredResult(previous, "Keep practicing to improve your grade.")}
    </div>
  `;

  const quizForm = document.getElementById("quizForm");
  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const answers = new FormData(quizForm);
    let correct = 0;

    QUIZ_QUESTIONS.forEach((question, index) => {
      if (answers.get(`quiz-${index}`) === question.answer) {
        correct += 1;
      }
    });

    const baseScore = correct * 80;
    const bonus = correct === QUIZ_QUESTIONS.length ? 100 : 0;
    const score = Math.min(GAME_META.quiz.maxScore, baseScore + bonus);
    const stars = getStars(score, GAME_META.quiz.maxScore);
    const grade = getGrade(score, GAME_META.quiz.maxScore);

    saveGameResult("quiz", {
      completed: true,
      score,
      stars,
      grade,
      detail: `${correct} of ${QUIZ_QUESTIONS.length} correct`
    });

    renderApp();
    renderQuizGame();
  });
}

function renderCrosswordGame() {
  crosswordGrid = buildCrosswordGrid();
  const weekState = ensureWeekState();
  const previous = weekState.results.crossword;

  elements.drawerBody.innerHTML = `
    <div class="game-shell">
      <section class="game-card">
        <h4>Mini Bible Crossword</h4>
        <p class="game-copy">Fill each open square with one letter. When you are ready, check the puzzle to receive your score and grade.</p>
        <div class="challenge-meta">
          <span class="meta-pill">Accuracy based scoring</span>
          <span class="meta-pill">Current best ${previous.score}</span>
        </div>
      </section>

      <section class="crossword-layout">
        <div class="crossword-grid" id="crosswordGrid"></div>
        <aside class="crossword-clues">
          <h5>Clues</h5>
          <div class="clue-list">
            ${CROSSWORD_CONFIG.words.map((word) => `<span><strong>${word.label}:</strong> ${word.clue}</span>`).join("")}
          </div>
        </aside>
      </section>

      <button class="primary-button" id="checkCrosswordButton" type="button">Check Crossword</button>
      ${renderStoredResult(previous, "Replaying the puzzle can help players climb to a better grade.")}
    </div>
  `;

  const grid = document.getElementById("crosswordGrid");
  grid.innerHTML = crosswordGrid.cells.map((cell) => renderCrosswordCell(cell)).join("");

  grid.querySelectorAll(".crossword-input").forEach((input) => {
    input.addEventListener("input", handleCrosswordInput);
  });

  document.getElementById("checkCrosswordButton").addEventListener("click", checkCrossword);
}

function renderCrosswordCell(cell) {
  if (!cell.active) {
    return `<div class="crossword-cell blocked"></div>`;
  }

  return `
    <label class="crossword-cell">
      ${cell.clueNumber ? `<span class="cell-number">${cell.clueNumber}</span>` : ""}
      <input class="crossword-input" data-row="${cell.row}" data-col="${cell.col}" maxlength="1" value="${cell.value}">
    </label>
  `;
}

function handleCrosswordInput(event) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 1);
  const row = Number(input.dataset.row);
  const col = Number(input.dataset.col);
  const cell = crosswordGrid.lookup[`${row}-${col}`];
  if (cell) {
    cell.value = input.value;
  }
}

function checkCrossword() {
  const activeCells = crosswordGrid.cells.filter((cell) => cell.active);
  const correctCount = activeCells.filter((cell) => cell.value === cell.answer).length;
  const accuracy = correctCount / activeCells.length;
  const score = Math.round(accuracy * GAME_META.crossword.maxScore);
  const stars = getStars(score, GAME_META.crossword.maxScore);
  const grade = getGrade(score, GAME_META.crossword.maxScore);

  saveGameResult("crossword", {
    completed: true,
    score,
    stars,
    grade,
    detail: `${correctCount} of ${activeCells.length} letters correct`
  });

  renderApp();
  renderCrosswordGame();
}

function renderWordSearchGame() {
  const weekState = ensureWeekState();
  const previous = weekState.results.wordsearch;
  activeWordSearch = createWordSearchData(currentWeekId);

  elements.drawerBody.innerHTML = `
    <div class="game-shell">
      <section class="game-card">
        <h4>Faith Word Search</h4>
        <p class="game-copy">Select the first and last letters of a hidden word. Straight lines only: across, down, or diagonal.</p>
        <div class="challenge-meta">
          <span class="meta-pill">Words hidden ${activeWordSearch.words.length}</span>
          <span class="meta-pill">Current best ${previous.score}</span>
        </div>
      </section>

      <div class="selection-pill" id="selectionStatus">Pick the start of a word.</div>

      <section class="wordsearch-layout">
        <div class="wordsearch-grid" id="wordsearchGrid"></div>
        <aside class="word-bank">
          <h5>Find these words</h5>
          <div class="word-bank-list" id="wordBankList"></div>
        </aside>
      </section>

      <button class="primary-button" id="scoreWordsearchButton" type="button">Score Word Search</button>
      ${renderStoredResult(previous, "Find all words to get the strongest result.")}
    </div>
  `;

  renderWordSearchBoard();
  document.getElementById("scoreWordsearchButton").addEventListener("click", scoreWordSearch);
}

function renderWordSearchBoard() {
  const gridElement = document.getElementById("wordsearchGrid");
  const bankElement = document.getElementById("wordBankList");
  const statusElement = document.getElementById("selectionStatus");

  statusElement.textContent = activeWordSearch.anchor
    ? `Anchor set at ${activeWordSearch.anchor.row + 1}, ${activeWordSearch.anchor.col + 1}. Choose an end cell.`
    : "Pick the start of a word.";

  gridElement.innerHTML = activeWordSearch.grid.map((row, rowIndex) => row.map((letter, colIndex) => {
    const key = `${rowIndex}-${colIndex}`;
    const isAnchor = activeWordSearch.anchor && activeWordSearch.anchor.row === rowIndex && activeWordSearch.anchor.col === colIndex;
    const isSelected = activeWordSearch.selectedPath.some((cell) => cell.row === rowIndex && cell.col === colIndex);
    const isFound = activeWordSearch.foundCells.has(key);

    return `
      <button class="cell-button ${isAnchor ? "anchor" : ""} ${isSelected ? "selected" : ""} ${isFound ? "found" : ""}"
              data-row="${rowIndex}"
              data-col="${colIndex}"
              type="button">
        ${letter}
      </button>
    `;
  }).join("")).join("");

  bankElement.innerHTML = activeWordSearch.words.map((word) => `
    <span class="word-pill ${activeWordSearch.foundWords.has(word.word) ? "found" : ""}">
      ${word.word}
    </span>
  `).join("");

  gridElement.querySelectorAll(".cell-button").forEach((button) => {
    button.addEventListener("click", () => handleWordSearchClick(Number(button.dataset.row), Number(button.dataset.col)));
  });
}

function handleWordSearchClick(row, col) {
  if (!activeWordSearch.anchor) {
    activeWordSearch.anchor = { row, col };
    activeWordSearch.selectedPath = [{ row, col }];
    renderWordSearchBoard();
    return;
  }

  const path = getLineBetween(activeWordSearch.anchor, { row, col });
  if (!path.length) {
    activeWordSearch.anchor = null;
    activeWordSearch.selectedPath = [];
    renderWordSearchBoard();
    return;
  }

  activeWordSearch.selectedPath = path;

  const letters = path.map((cell) => activeWordSearch.grid[cell.row][cell.col]).join("");
  const reversed = letters.split("").reverse().join("");
  const match = activeWordSearch.words.find((word) => !activeWordSearch.foundWords.has(word.word) && (word.word === letters || word.word === reversed));

  if (match) {
    activeWordSearch.foundWords.add(match.word);
    path.forEach((cell) => activeWordSearch.foundCells.add(`${cell.row}-${cell.col}`));
  }

  activeWordSearch.anchor = null;
  activeWordSearch.selectedPath = [];
  renderWordSearchBoard();
}

function scoreWordSearch() {
  const found = activeWordSearch.foundWords.size;
  const score = Math.round((found / activeWordSearch.words.length) * GAME_META.wordsearch.maxScore);
  const stars = getStars(score, GAME_META.wordsearch.maxScore);
  const grade = getGrade(score, GAME_META.wordsearch.maxScore);

  saveGameResult("wordsearch", {
    completed: true,
    score,
    stars,
    grade,
    detail: `${found} of ${activeWordSearch.words.length} words found`
  });

  renderApp();
  renderWordSearchGame();
}

function renderStoredResult(result, note) {
  if (!result.completed) {
    return "";
  }

  return `
    <section class="game-result">
      <span class="result-pill">${result.grade}</span>
      <strong class="result-score">${result.score} pts</strong>
      <span class="leaderboard-copy">${result.detail || ""}</span>
      <span class="hint-text">${note}</span>
    </section>
  `;
}

function saveGameResult(gameId, nextResult) {
  const weekState = ensureWeekState();
  const existing = weekState.results[gameId];

  if (nextResult.score >= existing.score) {
    weekState.results[gameId] = nextResult;
  } else {
    weekState.results[gameId].completed = true;
  }

  saveState();
}

function ensureWeekState() {
  if (!appState.weekly[currentWeekId]) {
    appState.weekly[currentWeekId] = {
      results: {
        quiz: createBlankResult(),
        crossword: createBlankResult(),
        wordsearch: createBlankResult()
      }
    };
  }

  if (!appState.weekly[currentWeekId].results) {
    appState.weekly[currentWeekId].results = {};
  }

  Object.keys(GAME_META).forEach((gameId) => {
    if (!appState.weekly[currentWeekId].results[gameId]) {
      appState.weekly[currentWeekId].results[gameId] = createBlankResult();
    }
  });

  delete appState.weekly[currentWeekId].rivals;
  delete appState.weekly[currentWeekId].refreshTick;

  return appState.weekly[currentWeekId];
}

function resetWeeklyProgress() {
  appState.weekly[currentWeekId] = {
    results: {
      quiz: createBlankResult(),
      crossword: createBlankResult(),
      wordsearch: createBlankResult()
    }
  };

  saveState();
}

function createBlankResult() {
  return {
    completed: false,
    score: 0,
    stars: 0,
    grade: "",
    detail: ""
  };
}

function buildLeaderboardLegacy(weekState) {
  const playerScore = getTotalScore(weekState);
  const playerEntry = {
    name: appState.profile ? appState.profile.name : "Your Hero",
    score: playerScore,
    note: `${getLevelForScore(playerScore).name} • ${getCompletedGames(weekState).length}/3 cleared`,
    isPlayer: true
  };

  return [...weekState.rivals, playerEntry].sort((a, b) => b.score - a.score);
}

function getTotalScore(weekState) {
  return Object.values(weekState.results).reduce((sum, result) => sum + result.score, 0);
}

function getCompletedGames(weekState) {
  return Object.values(weekState.results).filter((result) => result.completed);
}

function getOverallGrade(weekState) {
  const total = getTotalScore(weekState);
  const max = Object.values(GAME_META).reduce((sum, game) => sum + game.maxScore, 0);

  if (!getCompletedGames(weekState).length) {
    return "Not Graded";
  }

  return getGrade(total, max);
}

function getGrade(score, maxScore) {
  const ratio = score / maxScore;

  if (ratio >= 0.95) {
    return "S";
  }
  if (ratio >= 0.85) {
    return "A";
  }
  if (ratio >= 0.7) {
    return "B";
  }
  if (ratio >= 0.55) {
    return "C";
  }
  if (ratio >= 0.35) {
    return "D";
  }

  return "E";
}

function compareGrades(a, b) {
  const order = ["S", "A", "B", "C", "D", "E"];
  return order.indexOf(a) - order.indexOf(b);
}

function getStars(score, maxScore) {
  const ratio = score / maxScore;

  if (ratio >= 0.9) {
    return 3;
  }
  if (ratio >= 0.65) {
    return 2;
  }
  if (ratio > 0) {
    return 1;
  }

  return 0;
}

function getLevelForScore(score) {
  return [...LEVELS].reverse().find((level) => score >= level.min) || LEVELS[0];
}

function buildHeroTagline(profile) {
  const level = getLevelForScore(getTotalScore(ensureWeekState()));
  return `${profile.name} is ready for this week's Bible quest as a ${level.name.toLowerCase()}.`;
}

function createProfileDraft(existingProfile) {
  return {
    name: existingProfile ? existingProfile.name : "",
    skinTone: existingProfile ? existingProfile.skinTone : PALETTE.skinTones[1].id,
    hairStyle: existingProfile ? existingProfile.hairStyle : PALETTE.hairStyles[0].id,
    hairColor: existingProfile ? existingProfile.hairColor : PALETTE.hairColors[0].id,
    outfit: existingProfile ? existingProfile.outfit : PALETTE.outfits[0].id,
    accessory: existingProfile ? existingProfile.accessory : PALETTE.accessories[0].id,
    expression: existingProfile ? existingProfile.expression : PALETTE.expressions[0].id
  };
}

function renderAvatar(profile) {
  const skin = findById(PALETTE.skinTones, profile.skinTone).color;
  const hair = findById(PALETTE.hairColors, profile.hairColor).color;
  const outfit = findById(PALETTE.outfits, profile.outfit);

  return `
    <div class="avatar-shell">
      <div class="avatar-figure style-${profile.hairStyle}" style="--skin:${skin}; --hair:${hair}; --outfit-light:${outfit.light}; --outfit-dark:${outfit.dark};">
        <div class="avatar-shadow"></div>
        <div class="avatar-body-wrap">
          <div class="avatar-cape"></div>
          <div class="avatar-head">
            <div class="avatar-hair-back"></div>
            <div class="avatar-puffs"></div>
            <div class="avatar-bun"></div>
            <div class="avatar-face">
              <span class="avatar-eye left"></span>
              <span class="avatar-eye right"></span>
              <span class="avatar-blush left"></span>
              <span class="avatar-blush right"></span>
              <span class="avatar-mouth ${profile.expression}"></span>
            </div>
            <div class="avatar-hair-front"></div>
            <div class="avatar-accessory ${profile.accessory}"></div>
          </div>
          <div class="avatar-collar"></div>
          <div class="avatar-arm left"></div>
          <div class="avatar-arm right"></div>
          <div class="avatar-body"></div>
        </div>
      </div>
    </div>
  `;
}

function buildCrosswordGrid() {
  const cells = [];
  const lookup = {};
  const activeMap = {};

  CROSSWORD_CONFIG.words.forEach((word) => {
    word.answer.split("").forEach((letter, index) => {
      const row = word.start.row + (word.direction === "down" ? index : 0);
      const col = word.start.col + (word.direction === "across" ? index : 0);
      const key = `${row}-${col}`;

      if (!activeMap[key]) {
        activeMap[key] = {
          row,
          col,
          answer: letter,
          value: "",
          active: true,
          clueNumber: index === 0 ? word.clueNumber : ""
        };
      } else {
        activeMap[key].answer = letter;
        if (index === 0 && !activeMap[key].clueNumber) {
          activeMap[key].clueNumber = word.clueNumber;
        }
      }
    });
  });

  for (let row = 0; row < CROSSWORD_CONFIG.size; row += 1) {
    for (let col = 0; col < CROSSWORD_CONFIG.size; col += 1) {
      const key = `${row}-${col}`;
      const cell = activeMap[key] || { row, col, active: false };
      cells.push(cell);
      if (cell.active) {
        lookup[key] = cell;
      }
    }
  }

  return { cells, lookup };
}

function createWordSearchData(seedKey) {
  const size = 10;
  const rng = createSeededRandom(hashSeed(seedKey));
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
  const directions = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: -1, col: 1 }
  ];

  const placements = WORDSEARCH_WORDS.map((word) => placeWord(word, grid, directions, rng));

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (!grid[row][col]) {
        grid[row][col] = String.fromCharCode(65 + Math.floor(rng() * 26));
      }
    }
  }

  return {
    grid,
    words: placements,
    anchor: null,
    selectedPath: [],
    foundWords: new Set(),
    foundCells: new Set()
  };
}

function placeWord(word, grid, directions, rng) {
  const size = grid.length;

  for (let attempt = 0; attempt < 300; attempt += 1) {
    const direction = directions[Math.floor(rng() * directions.length)];
    const startRow = Math.floor(rng() * size);
    const startCol = Math.floor(rng() * size);
    const endRow = startRow + direction.row * (word.length - 1);
    const endCol = startCol + direction.col * (word.length - 1);

    if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) {
      continue;
    }

    let fits = true;
    for (let index = 0; index < word.length; index += 1) {
      const row = startRow + direction.row * index;
      const col = startCol + direction.col * index;
      const current = grid[row][col];
      if (current && current !== word[index]) {
        fits = false;
        break;
      }
    }

    if (!fits) {
      continue;
    }

    const cells = [];
    for (let index = 0; index < word.length; index += 1) {
      const row = startRow + direction.row * index;
      const col = startCol + direction.col * index;
      grid[row][col] = word[index];
      cells.push({ row, col });
    }

    return { word, cells };
  }

  throw new Error(`Unable to place word ${word}`);
}

function getLineBetween(start, end) {
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;
  const rowStep = Math.sign(rowDiff);
  const colStep = Math.sign(colDiff);

  if (!(rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff))) {
    return [];
  }

  const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
  const line = [];

  for (let step = 0; step <= steps; step += 1) {
    line.push({
      row: start.row + rowStep * step,
      col: start.col + colStep * step
    });
  }

  return line;
}

function generateRivals(weekId, extraTick) {
  return [];
}

function getWeekId(date) {
  const year = date.getFullYear();
  const firstDay = new Date(year, 0, 1);
  const diff = Math.floor((date - firstDay) / 86400000);
  const week = Math.ceil((diff + firstDay.getDay() + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

function getWeekLabel(date) {
  const formatter = new Intl.DateTimeFormat("en-AU", { month: "short", day: "numeric", year: "numeric" });
  return `Week of ${formatter.format(date)}`;
}

function hashSeed(input) {
  return Array.from(input).reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 2166136261);
}

function createSeededRandom(seed) {
  let value = seed || 1;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function findById(items, id) {
  return items.find((item) => item.id === id) || items[0];
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        version: STORAGE_VERSION,
        profile: null,
        weekly: {},
        admin: { authenticated: false }
      };
    }

    const parsed = JSON.parse(raw);
    const state = {
      version: STORAGE_VERSION,
      profile: parsed.profile || null,
      weekly: parsed.version >= STORAGE_VERSION ? (parsed.weekly || {}) : {},
      admin: { authenticated: false }
    };

    return state;
  } catch (error) {
    return {
      version: STORAGE_VERSION,
      profile: null,
      weekly: {},
      admin: { authenticated: false }
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function buildLeaderboard(weekState) {
  const playerScore = getTotalScore(weekState);
  const completedCount = getCompletedGames(weekState).length;

  if (!appState.profile || (!completedCount && playerScore === 0)) {
    return [];
  }

  return [{
    name: appState.profile.name,
    score: playerScore,
    note: `${getLevelForScore(playerScore).name} | ${completedCount}/3 cleared`,
    isPlayer: true
  }];
}

function sanitizePlayerName(rawName) {
  return rawName
    .replace(/\s+/g, " ")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 18);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
