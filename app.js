const STORAGE_KEY = "kktk-weekly-challenges-v3";
const STORAGE_VERSION = 5;
const DAY_MS = 86400000;

const GAME_MASTER_CREDENTIALS = {
  username: "gamemaster",
  password: "MCGIkktk"
};

const PALETTE = {
  genders: [
    { id: "female", label: "Female" },
    { id: "male", label: "Male" }
  ],
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
    { id: "sunrise", label: "Sunrise", primary: "#f6a35d", secondary: "#db6d5b" },
    { id: "river", label: "River", primary: "#87d0e0", secondary: "#548ca2" },
    { id: "grove", label: "Grove", primary: "#8fd798", secondary: "#4fa06c" },
    { id: "royal", label: "Royal", primary: "#b784db", secondary: "#7d5ca1" }
  ],
  hairStyles: [
    { id: "short", label: "Short" },
    { id: "bob", label: "Bob" },
    { id: "curly", label: "Curly" },
    { id: "braids", label: "Braids" }
  ],
  accessories: [
    { id: "bible", label: "Bible" },
    { id: "scroll", label: "Scroll" },
    { id: "staff", label: "Staff" },
    { id: "dove", label: "Dove" },
    { id: "halo", label: "Halo" },
    { id: "crown", label: "Crown" }
  ],
  expressions: [
    { id: "smile", label: "Smile" },
    { id: "grin", label: "Grin" },
    { id: "calm", label: "Calm" },
    { id: "joy", label: "Joy" }
  ]
};

const LEVELS = [
  { name: "Mustard Seed", min: 0, note: "Starting your journey" },
  { name: "Shepherd Scout", min: 180, note: "Learning the weekly path" },
  { name: "Psalm Seeker", min: 420, note: "Growing in Bible knowledge" },
  { name: "Disciple Builder", min: 760, note: "Completing harder challenge sets" },
  { name: "Covenant Climber", min: 1120, note: "Holding steady through tougher rounds" },
  { name: "Gospel Guardian", min: 1520, note: "Strong scripture and puzzle mastery" },
  { name: "Revival Ranger", min: 1980, note: "Clearing advanced weekly schedules" },
  { name: "Kingdom Champion", min: 2500, note: "Leading the highest-difficulty board" },
  { name: "Temple Torchbearer", min: 3150, note: "Thriving through expert challenge weeks" },
  { name: "Crowned Witness", min: 3900, note: "Conquering the full master-level rotation" }
];

const CHALLENGE_TEMPLATES = {
  "scripture-quiz": {
    id: "scripture-quiz",
    kind: "quiz",
    title: "Scripture Sprint Quiz",
    subtitle: "Answer five Bible questions from well-known stories.",
    typeLabel: "Quiz",
    levelLabel: "Tier 1 | Beginner",
    maxScore: 500,
    questions: [
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
    ]
  },
  "covenant-crossword": {
    id: "covenant-crossword",
    kind: "crossword",
    title: "Covenant Crossword",
    subtitle: "Fill an 8x8 Bible crossword from familiar words and clues.",
    typeLabel: "Crossword",
    levelLabel: "Tier 2 | Explorer",
    maxScore: 450,
    size: 8,
    words: [
      { clueNumber: 1, label: "1 Across", direction: "across", answer: "GENESIS", clue: "The first book of the Bible.", start: { row: 3, col: 0 } },
      { clueNumber: 1, label: "1 Down", direction: "down", answer: "GRACE", clue: "God's loving favor we do not earn.", start: { row: 3, col: 0 } },
      { clueNumber: 2, label: "2 Down", direction: "down", answer: "EDEN", clue: "The garden where Adam and Eve first lived.", start: { row: 3, col: 1 } },
      { clueNumber: 3, label: "3 Down", direction: "down", answer: "NOAH", clue: "The ark builder.", start: { row: 3, col: 2 } },
      { clueNumber: 4, label: "4 Down", direction: "down", answer: "SIN", clue: "What separates people from God.", start: { row: 3, col: 4 } },
      { clueNumber: 5, label: "5 Down", direction: "down", answer: "ISAAC", clue: "Abraham's promised son.", start: { row: 3, col: 5 } }
    ]
  },
  "faith-word-search": {
    id: "faith-word-search",
    kind: "wordsearch",
    title: "Faith Word Search",
    subtitle: "Find hidden Bible words in a straight line across the grid.",
    typeLabel: "Word Search",
    levelLabel: "Tier 2 | Explorer",
    maxScore: 400,
    words: ["NOAH", "GRACE", "FAITH", "JONAH", "PSALM"]
  },
  "parables-quiz": {
    id: "parables-quiz",
    kind: "quiz",
    title: "Parables Deep Dive",
    subtitle: "A harder quiz focused on Jesus' parables and their meaning.",
    typeLabel: "Quiz",
    levelLabel: "Tier 3 | Advanced",
    maxScore: 720,
    questions: [
      {
        prompt: "In the Parable of the Sower, what happened to the seed that fell on good soil?",
        choices: ["Birds ate it", "It withered quickly", "It produced a crop", "It was choked by thorns"],
        answer: "It produced a crop"
      },
      {
        prompt: "In the Parable of the Lost Sheep, how many sheep did the shepherd leave to find the one that was lost?",
        choices: ["12", "40", "70", "99"],
        answer: "99"
      },
      {
        prompt: "Who helped the injured man in the Parable of the Good Samaritan?",
        choices: ["A priest", "A Levite", "A Samaritan", "A tax collector"],
        answer: "A Samaritan"
      },
      {
        prompt: "In the Parable of the Prodigal Son, what did the father do when the son returned?",
        choices: ["Sent him away", "Welcomed him and celebrated", "Told him to work first", "Ignored him"],
        answer: "Welcomed him and celebrated"
      },
      {
        prompt: "In the Parable of the Ten Virgins, what important item did the wise virgins bring?",
        choices: ["Bread", "Extra oil", "A cloak", "Coins"],
        answer: "Extra oil"
      },
      {
        prompt: "In the Parable of the Talents, what was the servant who buried his talent called?",
        choices: ["Faithful", "Wise", "Wicked and lazy", "Generous"],
        answer: "Wicked and lazy"
      }
    ]
  },
  "bible-heroes-crossword": {
    id: "bible-heroes-crossword",
    kind: "crossword",
    title: "Bible Heroes Crossword",
    subtitle: "A bigger crossword with hero names and faith words.",
    typeLabel: "Crossword",
    levelLabel: "Tier 3 | Advanced",
    maxScore: 680,
    size: 11,
    words: [
      { clueNumber: 1, label: "1 Across", direction: "across", answer: "DISCIPLE", clue: "A follower of Jesus.", start: { row: 3, col: 1 } },
      { clueNumber: 1, label: "1 Down", direction: "down", answer: "DAVID", clue: "The shepherd who became king.", start: { row: 3, col: 1 } },
      { clueNumber: 2, label: "2 Down", direction: "down", answer: "ISAIAH", clue: "A major prophet in the Old Testament.", start: { row: 3, col: 2 } },
      { clueNumber: 3, label: "3 Down", direction: "down", answer: "SAMSON", clue: "Judge known for great strength.", start: { row: 3, col: 3 } },
      { clueNumber: 4, label: "4 Down", direction: "down", answer: "CROSS", clue: "The symbol of Jesus' sacrifice.", start: { row: 3, col: 4 } },
      { clueNumber: 5, label: "5 Down", direction: "down", answer: "ISRAEL", clue: "The nation chosen by God.", start: { row: 3, col: 5 } },
      { clueNumber: 6, label: "6 Down", direction: "down", answer: "PRAYER", clue: "Talking to God.", start: { row: 3, col: 6 } },
      { clueNumber: 7, label: "7 Down", direction: "down", answer: "LIGHT", clue: "Jesus said, 'I am the ___ of the world.'", start: { row: 3, col: 7 } },
      { clueNumber: 8, label: "8 Down", direction: "down", answer: "ESTHER", clue: "Queen who saved her people.", start: { row: 3, col: 8 } }
    ]
  },
  "prophets-word-search": {
    id: "prophets-word-search",
    kind: "wordsearch",
    title: "Prophets Word Search",
    subtitle: "Find a harder set of prophet names hidden in the grid.",
    typeLabel: "Word Search",
    levelLabel: "Tier 4 | Hard",
    maxScore: 760,
    size: 12,
    words: ["ISAIAH", "JEREMIAH", "EZEKIEL", "DANIEL", "HOSEA", "AMOS", "MICAH"]
  },
  "miracles-quiz": {
    id: "miracles-quiz",
    kind: "quiz",
    title: "Miracles Master Quiz",
    subtitle: "A challenging quiz focused on miracles from the Gospels and Acts.",
    typeLabel: "Quiz",
    levelLabel: "Tier 5 | Expert",
    maxScore: 900,
    questions: [
      {
        prompt: "At the wedding in Cana, what did Jesus turn into wine?",
        choices: ["Oil", "Water", "Milk", "Juice"],
        answer: "Water"
      },
      {
        prompt: "How many baskets of leftovers were gathered after Jesus fed the five thousand?",
        choices: ["5", "7", "12", "40"],
        answer: "12"
      },
      {
        prompt: "Which disciple walked on water toward Jesus before becoming afraid?",
        choices: ["John", "James", "Peter", "Andrew"],
        answer: "Peter"
      },
      {
        prompt: "Whom did Jesus raise after saying, 'Lazarus, come out'?",
        choices: ["Jairus", "Lazarus", "Bartimaeus", "Nicodemus"],
        answer: "Lazarus"
      },
      {
        prompt: "What happened when Paul and Silas were praying in prison?",
        choices: ["Rain fell", "An earthquake opened the doors", "A fire began", "A crowd gathered"],
        answer: "An earthquake opened the doors"
      },
      {
        prompt: "Who was healed after touching the edge of Jesus' cloak?",
        choices: ["A woman who had been bleeding", "Mary Magdalene", "Martha", "A servant girl"],
        answer: "A woman who had been bleeding"
      },
      {
        prompt: "When Jesus healed the blind man in John 9, what did he put on the man's eyes?",
        choices: ["Oil", "Mud", "Water only", "Dust"],
        answer: "Mud"
      }
    ]
  },
  "acts-mission-quiz": {
    id: "acts-mission-quiz",
    kind: "quiz",
    title: "Acts Mission Quiz",
    subtitle: "A hard quiz on the early church, journeys, and bold faith in Acts.",
    typeLabel: "Quiz",
    levelLabel: "Tier 4 | Hard",
    maxScore: 820,
    questions: [
      {
        prompt: "Who was chosen to replace Judas among the twelve apostles in Acts 1?",
        choices: ["Barnabas", "Silas", "Matthias", "Stephen"],
        answer: "Matthias"
      },
      {
        prompt: "What visible sign appeared when the Holy Spirit came at Pentecost?",
        choices: ["A rainbow", "Tongues of fire", "A bright star", "An earthquake"],
        answer: "Tongues of fire"
      },
      {
        prompt: "Who was struck blind on the road to Damascus before becoming Paul?",
        choices: ["Stephen", "Saul", "Apollos", "Philip"],
        answer: "Saul"
      },
      {
        prompt: "Which disciple was told by an angel to meet the Ethiopian official on the desert road?",
        choices: ["Philip", "Peter", "John", "James"],
        answer: "Philip"
      },
      {
        prompt: "In Acts 16, what was Lydia known for selling?",
        choices: ["Oil", "Purple cloth", "Scrolls", "Spices"],
        answer: "Purple cloth"
      },
      {
        prompt: "What happened when Eutychus fell from the window while Paul was speaking late into the night?",
        choices: ["He ran away", "He was healed and revived", "He went home", "He started preaching"],
        answer: "He was healed and revived"
      }
    ]
  },
  "revelation-word-search": {
    id: "revelation-word-search",
    kind: "wordsearch",
    title: "Revelation Word Search",
    subtitle: "Find the prophecy-themed words hidden in a larger master-level grid.",
    typeLabel: "Word Search",
    levelLabel: "Tier 6 | Master",
    maxScore: 980,
    size: 14,
    words: ["ALPHA", "OMEGA", "THRONE", "TRUMPET", "DRAGON", "SEALS", "LAMB", "BABYLON"]
  }
};

const DEFAULT_TEMPLATE_IDS = [
  "scripture-quiz",
  "covenant-crossword",
  "faith-word-search",
  "parables-quiz",
  "bible-heroes-crossword",
  "acts-mission-quiz",
  "prophets-word-search",
  "miracles-quiz",
  "revelation-word-search"
];

const now = new Date();
const currentWeekId = getWeekId(now);
const nextWeekId = getWeekId(new Date(now.getTime() + 7 * DAY_MS));

const appState = loadState();

const elements = {
  authView: document.getElementById("authView"),
  appShell: document.getElementById("appShell"),
  weekLabel: document.getElementById("weekLabel"),
  playerBadge: document.getElementById("playerBadge"),
  logoutPlayerButton: document.getElementById("logoutPlayerButton"),
  editAvatarButton: document.getElementById("editAvatarButton"),
  gameMasterButton: document.getElementById("gameMasterButton"),
  authAvatarStage: document.getElementById("authAvatarStage"),
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
  authMessage: document.getElementById("authMessage"),
  loginForm: document.getElementById("loginForm"),
  registerForm: document.getElementById("registerForm"),
  startChallengeButton: document.getElementById("startChallengeButton"),
  viewLeaderboardButton: document.getElementById("viewLeaderboardButton"),
  profileModal: document.getElementById("profileModal"),
  profileForm: document.getElementById("profileForm"),
  heroNameInput: document.getElementById("heroNameInput"),
  cancelProfileButton: document.getElementById("cancelProfileButton"),
  resetBuilderButton: document.getElementById("resetBuilderButton"),
  builderSummary: document.getElementById("builderSummary"),
  drawerBackdrop: document.getElementById("drawerBackdrop"),
  gameDrawer: document.getElementById("gameDrawer"),
  gmDrawer: document.getElementById("gmDrawer"),
  drawerBody: document.getElementById("drawerBody"),
  drawerTitle: document.getElementById("drawerTitle"),
  gmBody: document.getElementById("gmBody"),
  closeGameDrawer: document.getElementById("closeGameDrawer"),
  closeGmDrawer: document.getElementById("closeGmDrawer"),
  genderOptions: document.getElementById("genderOptions"),
  skinToneOptions: document.getElementById("skinToneOptions"),
  hairStyleOptions: document.getElementById("hairStyleOptions"),
  hairColorOptions: document.getElementById("hairColorOptions"),
  outfitOptions: document.getElementById("outfitOptions"),
  accessoryOptions: document.getElementById("accessoryOptions"),
  expressionOptions: document.getElementById("expressionOptions")
};

const builderProfile = createProfileDraft(null);

let activeGameContext = null;
let activeCrossword = null;
let activeWordSearch = null;
let remoteLeaderboard = [];
let firebaseBridgeBound = false;
let leaderboardUnsubscribe = null;

ensureScheduleWeek(currentWeekId);
ensureScheduleWeek(nextWeekId);
syncBuilderFromCurrentUser();
bindEvents();
renderApp();
setupFirebaseIntegration();

function bindEvents() {
  elements.loginForm.addEventListener("submit", handlePlayerLogin);
  elements.registerForm.addEventListener("submit", handlePlayerRegister);
  elements.logoutPlayerButton.addEventListener("click", logoutPlayer);
  elements.editAvatarButton.addEventListener("click", () => openProfileModal(true));
  elements.gameMasterButton.addEventListener("click", openGameMaster);
  elements.startChallengeButton.addEventListener("click", handleStartChallenge);
  elements.viewLeaderboardButton.addEventListener("click", () => {
    document.getElementById("leaderboardSection").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  elements.profileForm.addEventListener("submit", handleProfileSubmit);
  elements.cancelProfileButton.addEventListener("click", handleCancelProfile);
  elements.resetBuilderButton.addEventListener("click", resetBuilderDraft);
  elements.heroNameInput.addEventListener("input", renderBuilderSummary);
  elements.closeGameDrawer.addEventListener("click", closeDrawers);
  elements.closeGmDrawer.addEventListener("click", closeDrawers);
  elements.drawerBackdrop.addEventListener("click", closeDrawers);
}

function renderApp() {
  const user = getCurrentUser();
  elements.weekLabel.textContent = getWeekLabel(now);
  renderAvatarStage(elements.authAvatarStage, user && user.profile ? user.profile : null);

  if (!user) {
    elements.authView.classList.remove("hidden");
    elements.appShell.classList.add("hidden");
    elements.playerBadge.classList.add("hidden");
    elements.editAvatarButton.classList.add("hidden");
    elements.logoutPlayerButton.classList.add("hidden");
    closeProfileModal();
    return;
  }

  ensureScheduleWeek(currentWeekId);
  ensureScheduleWeek(nextWeekId);

  elements.authView.classList.add("hidden");
  elements.appShell.classList.remove("hidden");
  elements.playerBadge.classList.remove("hidden");
  elements.editAvatarButton.classList.remove("hidden");
  elements.logoutPlayerButton.classList.remove("hidden");
  elements.playerBadge.textContent = `${user.profile ? user.profile.heroName : "No Hero"} | @${user.username}`;

  syncBuilderFromCurrentUser();

  const schedule = getWeekSchedule(currentWeekId);
  const board = getDisplayedLeaderboard(currentWeekId);
  const totalScore = getPlayerWeekScore(user, currentWeekId);
  const completed = getCompletedCount(user, currentWeekId, schedule);
  const level = getLevelForScore(totalScore);
  const rank = board.findIndex((entry) => entry.userId === user.id) + 1;
  const savedProfile = user.profile ? createProfileDraft(user.profile) : null;

  renderAvatarStage(elements.heroAvatarStage, savedProfile || builderProfile);
  elements.heroName.textContent = savedProfile ? savedProfile.heroName : "Create your pixel hero";
  elements.heroTagline.textContent = savedProfile
    ? `${savedProfile.heroName} and @${user.username} are ready for this week's challenge path as a ${level.name.toLowerCase()}.`
    : "Finish your first hero build to unlock the weekly challenge path.";
  elements.currentLevel.textContent = level.name;
  elements.weeklyGrade.textContent = getOverallGrade(user, currentWeekId, schedule);
  elements.completedCount.textContent = `${completed} / ${schedule.length}`;
  elements.weeklyScore.textContent = String(totalScore);
  elements.bestGrade.textContent = getBestGrade(user, currentWeekId, schedule);
  elements.leaderboardRank.textContent = rank ? `#${rank}` : "#--";

  renderChallengeCards(user, schedule);
  renderLevelTrack(totalScore);
  renderLeaderboard(board, schedule.length);

  const hasOpenChallenge = schedule.some((challenge) => !getChallengeResult(user, currentWeekId, challenge.instanceId).completed);
  elements.startChallengeButton.disabled = !user.profile || !hasOpenChallenge;
  if (!user.profile) {
    elements.startChallengeButton.textContent = "Create Your Hero";
  } else if (!schedule.length) {
    elements.startChallengeButton.textContent = "No Games Scheduled";
  } else if (!hasOpenChallenge) {
    elements.startChallengeButton.textContent = "All Challenges Locked";
  } else {
    elements.startChallengeButton.textContent = "Start The Challenge";
  }

  if (appState.admin.authenticated) {
    renderGameMasterPanel();
  }

  if (!user.profile) {
    openProfileModal(false);
  } else {
    closeProfileModal();
  }
}

async function handlePlayerLogin(event) {
  event.preventDefault();

  const firebase = requireFirebaseAPI();
  if (!firebase) {
    return;
  }

  const username = sanitizeUsername(document.getElementById("loginUsernameInput").value);
  const password = document.getElementById("loginPasswordInput").value;

  if (!username || !password) {
    setAuthMessage("Enter both a username and password to log in.");
    return;
  }

  try {
    const email = `${username}@kktk.com`;
    await firebase.signInWithEmailAndPassword(firebase.auth, email, password);
  } catch (error) {
    setAuthMessage(getFirebaseAuthMessage(error, "Player login failed. Check the username and password."));
  }
}

async function handlePlayerRegister(event) {
  event.preventDefault();

  const firebase = requireFirebaseAPI();
  if (!firebase) {
    return;
  }

  const username = sanitizeUsername(document.getElementById("registerUsernameInput").value);
  const password = document.getElementById("registerPasswordInput").value;

  if (!username || username.length < 3) {
    setAuthMessage("Choose a player username with at least 3 letters or numbers.");
    return;
  }

  if (password.length < 6) {
    setAuthMessage("Choose a password with at least 6 characters.");
    return;
  }

  try {
    const email = `${username}@kktk.com`;
    await firebase.createUserWithEmailAndPassword(firebase.auth, email, password);
    setAuthMessage("Player account created. Build your hero to continue.");
  } catch (error) {
    setAuthMessage(getFirebaseAuthMessage(error, "That username is already in use."));
  }
}

async function logoutPlayer() {
  closeDrawers();
  closeProfileModal();

  const firebase = getFirebaseAPI();
  if (firebase && firebase.auth.currentUser) {
    try {
      await firebase.signOut(firebase.auth);
      return;
    } catch (error) {
      console.error("Firebase logout failed", error);
    }
  }

  appState.currentUserId = null;
  saveState();
  syncBuilderFromCurrentUser();
  renderApp();
}

function setAuthMessage(message) {
  if (!message) {
    elements.authMessage.innerHTML = "";
    return;
  }

  elements.authMessage.innerHTML = `
    <article class="empty-state message-card">
      <strong>Player portal</strong>
      <span>${escapeHtml(message)}</span>
    </article>
  `;
}

function clearAuthForms() {
  elements.loginForm.reset();
  elements.registerForm.reset();
}

function syncBuilderFromCurrentUser() {
  const user = getCurrentUser();
  Object.assign(builderProfile, createProfileDraft(user ? user.profile : null));
  elements.heroNameInput.value = builderProfile.heroName || "";
  syncBuilderUI();
}

function syncBuilderUI() {
  renderAvatarStage(elements.builderAvatarStage, builderProfile);
  renderBuilderControls();
  renderBuilderSummary();
}

function renderBuilderControls() {
  renderChoiceOptions(elements.genderOptions, PALETTE.genders, "gender", builderProfile.gender);
  renderSwatchOptions(elements.skinToneOptions, PALETTE.skinTones, "skinTone", builderProfile.skinTone, true, false);
  renderChoiceOptions(elements.hairStyleOptions, PALETTE.hairStyles, "hairStyle", builderProfile.hairStyle);
  renderSwatchOptions(elements.hairColorOptions, PALETTE.hairColors, "hairColor", builderProfile.hairColor, true, false);
  renderSwatchOptions(elements.outfitOptions, PALETTE.outfits, "outfit", builderProfile.outfit, false, true);
  renderChoiceOptions(elements.accessoryOptions, PALETTE.accessories, "accessory", builderProfile.accessory);
  renderChoiceOptions(elements.expressionOptions, PALETTE.expressions, "expression", builderProfile.expression);
}

function renderSwatchOptions(container, options, key, selectedId, iconOnly, useGradient) {
  container.innerHTML = options.map((option) => {
    const isSelected = option.id === selectedId ? "is-selected" : "";
    const swatch = useGradient ? `linear-gradient(135deg, ${option.primary}, ${option.secondary})` : option.color;
    return `
      <button class="swatch-button ${isSelected}" data-key="${key}" data-value="${option.id}" data-color="true" style="--swatch:${swatch};" title="${escapeHtml(option.label)}" type="button">
        ${iconOnly ? "" : escapeHtml(option.label)}
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
      ${escapeHtml(option.label)}
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

function renderBuilderSummary() {
  const gender = findById(PALETTE.genders, builderProfile.gender);
  const skin = findById(PALETTE.skinTones, builderProfile.skinTone);
  const hairStyle = findById(PALETTE.hairStyles, builderProfile.hairStyle);
  const hairColor = findById(PALETTE.hairColors, builderProfile.hairColor);
  const outfit = findById(PALETTE.outfits, builderProfile.outfit);
  const accessory = findById(PALETTE.accessories, builderProfile.accessory);
  const expression = findById(PALETTE.expressions, builderProfile.expression);
  const heroName = sanitizeHeroName(elements.heroNameInput.value) || "Faith Spark";

  elements.builderSummary.innerHTML = `
    <strong>${escapeHtml(heroName)}</strong>
    <span>${escapeHtml(gender.label)} frame, ${escapeHtml(skin.label.toLowerCase())} skin, ${escapeHtml(hairColor.label.toLowerCase())} ${escapeHtml(hairStyle.label.toLowerCase())} hair, ${escapeHtml(outfit.label.toLowerCase())} outfit, ${escapeHtml(accessory.label.toLowerCase())} accessory, ${escapeHtml(expression.label.toLowerCase())} expression.</span>
  `;
}

function resetBuilderDraft() {
  syncBuilderFromCurrentUser();
}

function openProfileModal(isEditing) {
  const user = getCurrentUser();
  if (!user) {
    return;
  }

  syncBuilderFromCurrentUser();
  elements.profileModal.classList.remove("hidden");
  elements.cancelProfileButton.classList.toggle("hidden", !isEditing && !user.profile);
}

function closeProfileModal() {
  elements.profileModal.classList.add("hidden");
}

function handleCancelProfile() {
  const user = getCurrentUser();
  if (!user || !user.profile) {
    return;
  }

  syncBuilderFromCurrentUser();
  closeProfileModal();
}

async function handleProfileSubmit(event) {
  event.preventDefault();

  const user = getCurrentUser();
  if (!user) {
    return;
  }

  const heroName = sanitizeHeroName(elements.heroNameInput.value);
  if (!heroName) {
    elements.heroNameInput.focus();
    return;
  }

  user.profile = {
    heroName,
    gender: builderProfile.gender,
    skinTone: builderProfile.skinTone,
    hairStyle: builderProfile.hairStyle,
    hairColor: builderProfile.hairColor,
    outfit: builderProfile.outfit,
    accessory: builderProfile.accessory,
    expression: builderProfile.expression
  };

  saveState();
  await saveRemoteProfile(user);
  closeProfileModal();
  renderApp();
}

function handleStartChallenge() {
  const user = getCurrentUser();
  if (!user) {
    return;
  }

  if (!user.profile) {
    openProfileModal(false);
    return;
  }

  const schedule = getWeekSchedule(currentWeekId);
  const nextChallenge = schedule.find((challenge) => !getChallengeResult(user, currentWeekId, challenge.instanceId).completed);
  if (!nextChallenge) {
    return;
  }

  openGame(nextChallenge.instanceId, currentWeekId);
}

function renderChallengeCards(user, schedule) {
  if (!schedule.length) {
    elements.challengeGrid.innerHTML = `
      <article class="empty-state">
        <strong>No games scheduled</strong>
        <span>The Game Master has not scheduled any challenges for this week yet.</span>
      </article>
    `;
    return;
  }

  elements.challengeGrid.innerHTML = schedule.map((challenge) => {
    const template = getTemplateById(challenge.templateId);
    const result = getChallengeResult(user, currentWeekId, challenge.instanceId);
    const locked = result.completed;

    return `
      <article class="challenge-card ${template.kind}">
        <div class="challenge-header">
          <div>
            <p class="section-kicker">${escapeHtml(template.typeLabel)}</p>
            <h4 class="challenge-title">${escapeHtml(challenge.title)}</h4>
          </div>
          <span class="grade-pill">${escapeHtml(result.grade || "Not Started")}</span>
        </div>

        <p class="game-copy">${escapeHtml(challenge.subtitle)}</p>

        <div class="challenge-meta">
          <span class="meta-pill">${escapeHtml(template.levelLabel)}</span>
          <span class="meta-pill">Max ${template.maxScore} pts</span>
          <span class="meta-pill">${locked ? "Locked" : "Ready"}</span>
        </div>

        <div class="challenge-stats">
          <span class="level-badge">Score ${result.score}</span>
          <span class="level-badge">Stars ${result.stars || 0}</span>
        </div>

        <button class="challenge-action" data-open-game="${challenge.instanceId}" ${locked ? "disabled" : ""} type="button">
          ${locked ? "Completed" : "Play Challenge"}
        </button>
      </article>
    `;
  }).join("");

  elements.challengeGrid.querySelectorAll("[data-open-game]").forEach((button) => {
    button.addEventListener("click", () => openGame(button.dataset.openGame, currentWeekId));
  });
}

function renderLevelTrack(score) {
  const currentLevel = getLevelForScore(score);
  elements.levelTrack.innerHTML = LEVELS.map((level) => `
    <article class="level-pill ${level.name === currentLevel.name ? "current" : ""}">
      <strong>${escapeHtml(level.name)}</strong>
      <span class="summary-label">Starts at ${level.min} pts</span>
      <p class="summary-copy">${escapeHtml(level.note)}</p>
    </article>
  `).join("");
}

function renderLeaderboard(board, challengeCount) {
  if (!board.length) {
    elements.leaderboardList.innerHTML = `
      <article class="empty-state">
        <strong>Leaderboard is clear</strong>
        <span>No player has completed a scheduled game yet. Scores appear here after the first submission.</span>
      </article>
    `;
    return;
  }

  elements.leaderboardList.innerHTML = board.map((entry, index) => `
    <article class="leaderboard-item ${entry.isCurrent ? "me" : ""}">
      <div class="leaderboard-left">
        <div class="leaderboard-rank">#${index + 1}</div>
        <div>
          <p class="leaderboard-name">${escapeHtml(entry.name)}</p>
          <div class="leaderboard-note">${escapeHtml(entry.note || `${entry.completedCount}/${challengeCount} cleared`)}</div>
        </div>
      </div>
      <div class="leaderboard-score">${entry.score}</div>
    </article>
  `).join("");
}

function openGame(instanceId, weekId) {
  const user = getCurrentUser();
  if (!user) {
    return;
  }

  const challenge = getWeekSchedule(weekId).find((entry) => entry.instanceId === instanceId);
  if (!challenge) {
    return;
  }

  const template = getTemplateById(challenge.templateId);
  const result = getChallengeResult(user, weekId, instanceId);

  activeGameContext = {
    weekId,
    challenge,
    template,
    userId: user.id
  };

  elements.drawerTitle.textContent = challenge.title;
  elements.drawerBackdrop.classList.remove("hidden");
  elements.gameDrawer.classList.remove("hidden");
  elements.gmDrawer.classList.add("hidden");

  if (result.completed) {
    renderLockedChallenge(result);
    return;
  }

  if (template.kind === "quiz") {
    renderQuizGame();
    return;
  }

  if (template.kind === "crossword") {
    renderCrosswordGame();
    return;
  }

  renderWordSearchGame();
}

function renderLockedChallenge(result) {
  const template = activeGameContext.template;
  elements.drawerBody.innerHTML = `
    <div class="game-shell">
      <section class="game-card">
        <h4>${escapeHtml(activeGameContext.challenge.title)} is locked</h4>
        <p class="game-copy">This scheduled ${escapeHtml(template.typeLabel.toLowerCase())} has already been completed for your account and cannot be played again.</p>
      </section>

      <section class="game-result">
        <span class="result-pill">${escapeHtml(result.grade || "Completed")}</span>
        <strong class="result-score">${result.score} pts</strong>
        <span class="leaderboard-copy">${escapeHtml(result.detail || "Challenge completed.")}</span>
        <span class="hint-text">One completed run is kept as your final result for this scheduled game.</span>
      </section>
    </div>
  `;
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
  activeGameContext = null;
}

function renderGameMasterLogin(errorMessage = "") {
  elements.gmBody.innerHTML = `
    <section class="gm-card">
      <div class="gm-head">
        <div>
          <h4>Game Master login</h4>
          <p class="gm-copy">Sign in to manage schedules, see answer keys, and control the weekly challenge board.</p>
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
  loginForm.addEventListener("submit", handleGameMasterLogin);
}

function handleGameMasterLogin(event) {
  event.preventDefault();

  const username = sanitizeUsername(document.getElementById("gmUsernameInput").value);
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

function renderGameMasterPanel() {
  const currentSchedule = getWeekSchedule(currentWeekId);
  const nextSchedule = getWeekSchedule(nextWeekId);
  const board = getDisplayedLeaderboard(currentWeekId);
  const playerCount = Object.keys(appState.users).length;
  const customTemplateCount = Object.keys(appState.customTemplates).length;

  elements.gmBody.innerHTML = `
    <div class="gm-stack">
      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Weekly overview</h4>
            <p class="gm-copy">Manage players, schedule games, and review the current answer keys.</p>
          </div>
          <span class="gm-pill">${escapeHtml(getWeekLabel(now))}</span>
        </div>

        <div class="gm-metrics">
          <span class="meta-pill">Players ${playerCount}</span>
          <span class="meta-pill">Current games ${currentSchedule.length}</span>
          <span class="meta-pill">Next week ${nextSchedule.length}</span>
          <span class="meta-pill">Custom templates ${customTemplateCount}</span>
          <span class="meta-pill">Board entries ${board.length}</span>
        </div>

        <div class="gm-actions">
          <button class="secondary-button" id="resetWeekButton" type="button">Reset Current Week Results</button>
          <button class="leaderboard-refresh" id="logoutGameMasterButton" type="button">Log Out</button>
        </div>
      </section>

      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Schedule a game</h4>
            <p class="gm-copy">Add a scheduled challenge for this week or next week from the built-in or custom templates.</p>
          </div>
        </div>

        <form class="gm-login-form" id="scheduleForm">
          <label class="field-block">
            <span>Game Template</span>
            <select id="scheduleTemplateSelect">
              ${getAllTemplates().map((template) => `<option value="${template.id}">${escapeHtml(template.title)} (${escapeHtml(template.typeLabel)})</option>`).join("")}
            </select>
          </label>

          <label class="field-block">
            <span>Week</span>
            <select id="scheduleWeekSelect">
              <option value="${currentWeekId}">${escapeHtml(getWeekLabel(now))}</option>
              <option value="${nextWeekId}">${escapeHtml(getWeekLabel(new Date(now.getTime() + 7 * DAY_MS)))}</option>
            </select>
          </label>

          <label class="field-block">
            <span>Custom Title (optional)</span>
            <input id="scheduleTitleInput" maxlength="42" placeholder="Use the template title or add your own name" type="text">
          </label>

          <button class="primary-button" type="submit">Add Game To Schedule</button>
        </form>
      </section>

      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Custom challenge lab</h4>
            <p class="gm-copy">Create your own quiz, crossword, or word search and save it as a reusable template.</p>
          </div>
        </div>

        <form class="gm-login-form" id="customChallengeForm">
          <label class="field-block">
            <span>Challenge Type</span>
            <select id="customKindSelect">
              <option value="quiz">Quiz</option>
              <option value="crossword">Crossword</option>
              <option value="wordsearch">Word Search</option>
            </select>
          </label>

          <label class="field-block">
            <span>Title</span>
            <input id="customTitleInput" maxlength="42" placeholder="Example: Acts Adventure Quiz" required type="text">
          </label>

          <label class="field-block">
            <span>Subtitle</span>
            <input id="customSubtitleInput" maxlength="90" placeholder="Short description for players" required type="text">
          </label>

          <div class="schedule-grid">
            <label class="field-block">
              <span>Difficulty Label</span>
              <input id="customLevelInput" maxlength="28" placeholder="Tier 4 | Hard" type="text">
            </label>

            <label class="field-block">
              <span>Max Score</span>
              <input id="customMaxScoreInput" max="1500" min="100" step="10" type="number" value="600">
            </label>
          </div>

          <div class="schedule-grid">
            <label class="field-block">
              <span id="customSizeLabel">Puzzle Grid Size</span>
              <input id="customCrosswordSizeInput" max="16" min="6" step="1" type="number" value="8">
            </label>

            <label class="field-block">
              <span>Add Straight To</span>
              <select id="customWeekSelect">
                <option value="">Template Only</option>
                <option value="${currentWeekId}">${escapeHtml(getWeekLabel(now))}</option>
                <option value="${nextWeekId}">${escapeHtml(getWeekLabel(new Date(now.getTime() + 7 * DAY_MS)))}</option>
              </select>
            </label>
          </div>

          <label class="field-block">
            <span>Challenge Content</span>
            <textarea id="customContentInput" rows="8"></textarea>
          </label>

          <article class="empty-state" id="customChallengeHelp"></article>

          <button class="primary-button" type="submit">Save Custom Challenge</button>
        </form>
      </section>

      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Import challenge JSON</h4>
            <p class="gm-copy">Upload one JSON file containing a challenge template or a list of templates.</p>
          </div>
        </div>

        <form class="gm-login-form" id="importChallengeForm">
          <label class="field-block">
            <span>Challenge JSON File</span>
            <input id="challengeImportInput" accept=".json,application/json" type="file">
          </label>

          <article class="empty-state">
            <strong>JSON schema</strong>
            <span>Use a single object or {"templates":[...]} with fields like kind, title, subtitle, levelLabel, maxScore, and either questions, words, or crossword words data.</span>
          </article>

          <button class="secondary-button" type="submit">Import Challenge File</button>
        </form>
      </section>

      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Custom templates</h4>
            <p class="gm-copy">These saved templates can be scheduled like the built-in games.</p>
          </div>
        </div>
        <div class="schedule-grid">${renderCustomTemplateList()}</div>
      </section>

      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Current week schedule</h4>
            <p class="gm-copy">Remove a scheduled game at any time. Removing it also clears saved results for that game.</p>
          </div>
        </div>
        <div class="schedule-grid">${renderScheduleList(currentSchedule, currentWeekId)}</div>
      </section>

      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Next week schedule</h4>
            <p class="gm-copy">Use next week scheduling to prepare the next Bible challenge set in advance.</p>
          </div>
        </div>
        <div class="schedule-grid">${renderScheduleList(nextSchedule, nextWeekId)}</div>
      </section>

      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Answer keys</h4>
            <p class="gm-copy">Review the correct answers for each scheduled game.</p>
          </div>
        </div>
        <div class="answer-grid">
          ${renderAnswerKeyCards(currentSchedule, "Current Week")}
          ${renderAnswerKeyCards(nextSchedule, "Next Week")}
        </div>
      </section>

      <section class="gm-card">
        <div class="gm-head">
          <div>
            <h4>Current player standings</h4>
            <p class="gm-copy">Standings update as players finish their one-time challenge runs.</p>
          </div>
        </div>
        <div class="gm-player-list">${renderGameMasterBoard(board)}</div>
      </section>
    </div>
  `;

  document.getElementById("scheduleForm").addEventListener("submit", handleScheduleAdd);
  document.getElementById("customChallengeForm").addEventListener("submit", handleCustomChallengeCreate);
  document.getElementById("importChallengeForm").addEventListener("submit", handleChallengeImport);
  document.getElementById("customKindSelect").addEventListener("change", updateCustomChallengeHelp);
  document.getElementById("resetWeekButton").addEventListener("click", resetCurrentWeekResults);
  document.getElementById("logoutGameMasterButton").addEventListener("click", logoutGameMaster);
  updateCustomChallengeHelp();

  elements.gmBody.querySelectorAll("[data-remove-challenge]").forEach((button) => {
    button.addEventListener("click", () => removeScheduledChallenge(button.dataset.weekId, button.dataset.removeChallenge));
  });

  elements.gmBody.querySelectorAll("[data-delete-template]").forEach((button) => {
    button.addEventListener("click", () => deleteCustomTemplate(button.dataset.deleteTemplate));
  });
}

function renderScheduleList(schedule, weekId) {
  if (!schedule.length) {
    return `
      <article class="empty-state">
        <strong>No games scheduled</strong>
        <span>Add a Bible challenge from the schedule form to build this week's lineup.</span>
      </article>
    `;
  }

  return schedule.map((challenge) => {
    const template = getTemplateById(challenge.templateId);
    return `
      <article class="schedule-item">
        <h5>${escapeHtml(challenge.title)}</h5>
        <p class="summary-copy">${escapeHtml(challenge.subtitle)}</p>
        <div class="schedule-meta">
          <span class="meta-pill">${escapeHtml(template.typeLabel)}</span>
          <span class="meta-pill">${escapeHtml(template.levelLabel || "Custom")}</span>
          <span class="meta-pill">${template.maxScore} pts</span>
          ${isCustomTemplate(template.id) ? '<span class="meta-pill">Custom</span>' : ""}
        </div>
        <div class="gm-actions">
          <button class="secondary-button" data-remove-challenge="${challenge.instanceId}" data-week-id="${weekId}" type="button">Remove Game</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderCustomTemplateList() {
  const templates = getAllTemplates().filter((template) => isCustomTemplate(template.id));
  if (!templates.length) {
    return `
      <article class="empty-state">
        <strong>No custom templates yet</strong>
        <span>Create one in the custom challenge lab or import one from a JSON file.</span>
      </article>
    `;
  }

  return templates.map((template) => `
    <article class="schedule-item">
      <h5>${escapeHtml(template.title)}</h5>
      <p class="summary-copy">${escapeHtml(template.subtitle)}</p>
      <div class="schedule-meta">
        <span class="meta-pill">${escapeHtml(template.typeLabel)}</span>
        <span class="meta-pill">${escapeHtml(template.levelLabel || "Custom")}</span>
        <span class="meta-pill">${template.maxScore} pts</span>
      </div>
      <div class="gm-actions">
        <button class="secondary-button" data-delete-template="${template.id}" type="button">Delete Template</button>
      </div>
    </article>
  `).join("");
}

function renderAnswerKeyCards(schedule, label) {
  if (!schedule.length) {
    return `
      <article class="answer-key">
        <h5>${escapeHtml(label)}</h5>
        <p class="summary-copy">No scheduled games to show answer keys for yet.</p>
      </article>
    `;
  }

  return schedule.map((challenge) => renderAnswerKeyCard(challenge, label)).join("");
}

function renderAnswerKeyCard(challenge, label) {
  const template = getTemplateById(challenge.templateId);

  if (template.kind === "quiz") {
    return `
      <article class="answer-key">
        <h5>${escapeHtml(challenge.title)} (${escapeHtml(label)})</h5>
        <ol class="answer-list">
          ${template.questions.map((question) => `<li>${escapeHtml(question.answer)}</li>`).join("")}
        </ol>
      </article>
    `;
  }

  if (template.kind === "crossword") {
    return `
      <article class="answer-key">
        <h5>${escapeHtml(challenge.title)} (${escapeHtml(label)})</h5>
        <ol class="answer-list">
          ${template.words.map((word) => `<li>${escapeHtml(word.label)}: ${escapeHtml(word.answer)}</li>`).join("")}
        </ol>
      </article>
    `;
  }

  return `
    <article class="answer-key">
      <h5>${escapeHtml(challenge.title)} (${escapeHtml(label)})</h5>
      <ol class="answer-list">
        ${template.words.map((word) => `<li>${escapeHtml(word)}</li>`).join("")}
      </ol>
    </article>
  `;
}

function renderGameMasterBoard(board) {
  if (!board.length) {
    return `
      <article class="empty-state">
        <strong>No player scores yet</strong>
        <span>The board will fill as players finish the current schedule.</span>
      </article>
    `;
  }

  return board.map((entry, index) => `
    <article class="gm-player-item">
      <div class="leaderboard-item ${entry.isCurrent ? "me" : ""}">
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
}

function handleScheduleAdd(event) {
  event.preventDefault();

  const templateId = document.getElementById("scheduleTemplateSelect").value;
  const weekId = document.getElementById("scheduleWeekSelect").value;
  const customTitle = sanitizeScheduleTitle(document.getElementById("scheduleTitleInput").value);

  addScheduledChallenge(templateId, weekId, customTitle);
}

function updateCustomChallengeHelp() {
  const help = document.getElementById("customChallengeHelp");
  const kind = document.getElementById("customKindSelect").value;
  const crosswordField = document.getElementById("customCrosswordSizeInput");
  const sizeLabel = document.getElementById("customSizeLabel");
  const contentInput = document.getElementById("customContentInput");

  if (kind === "quiz") {
    crosswordField.disabled = true;
    sizeLabel.textContent = "Puzzle Grid Size";
    contentInput.placeholder = "Who led the Israelites out of Egypt? | Moses | David | Elijah | Peter | Moses";
    help.innerHTML = `
      <strong>Quiz format</strong>
      <span>Use one question per line in this format: Question | Choice A | Choice B | Choice C | Choice D | Correct Answer</span>
    `;
    return;
  }

  if (kind === "crossword") {
    crosswordField.disabled = false;
    sizeLabel.textContent = "Crossword Grid Size";
    contentInput.placeholder = "1 Across | across | MOSES | Led Israel out of Egypt | 2 | 1";
    help.innerHTML = `
      <strong>Crossword format</strong>
      <span>Use one clue per line in this format: 1 Across | across | ANSWER | Clue text | row | col. Row and col start at 0.</span>
    `;
    return;
  }

  crosswordField.disabled = false;
  sizeLabel.textContent = "Word Search Grid Size";
  contentInput.placeholder = "GENESIS\nPSALM\nFAITH\nJERUSALEM";
  help.innerHTML = `
    <strong>Word search format</strong>
    <span>Enter one word per line or separate words with commas. Use letters only and keep each word at least 3 letters long. The size field becomes the grid size.</span>
  `;
}

function handleCustomChallengeCreate(event) {
  event.preventDefault();

  try {
    const kind = document.getElementById("customKindSelect").value;
    const title = sanitizeScheduleTitle(document.getElementById("customTitleInput").value);
    const subtitle = sanitizeSubtitle(document.getElementById("customSubtitleInput").value);
    const levelLabel = sanitizeLevelLabel(document.getElementById("customLevelInput").value) || defaultLevelLabel(kind);
    const maxScore = sanitizeMaxScore(document.getElementById("customMaxScoreInput").value, kind);
    const crosswordSize = Number(document.getElementById("customCrosswordSizeInput").value);
    const content = document.getElementById("customContentInput").value;
    const weekId = document.getElementById("customWeekSelect").value;

    const template = normalizeTemplate({
      id: createCustomTemplateId(title),
      kind,
      title,
      subtitle,
      typeLabel: kind === "wordsearch" ? "Word Search" : capitalize(kind),
      levelLabel,
      maxScore,
      size: crosswordSize,
      rawContent: content
    }, true);

    appState.customTemplates[template.id] = template;
    saveState();

    if (weekId) {
      addScheduledChallenge(template.id, weekId, template.title, true);
      return;
    }

    renderApp();
    openGameMaster();
  } catch (error) {
    showGameMasterMessage(error.message);
  }
}

function handleChallengeImport(event) {
  event.preventDefault();

  const input = document.getElementById("challengeImportInput");
  const file = input.files && input.files[0];
  if (!file) {
    showGameMasterMessage("Choose a JSON file to import.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const rawTemplates = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.templates) ? parsed.templates : [parsed]);

      if (!rawTemplates.length) {
        throw new Error("No templates were found in that file.");
      }

      rawTemplates.forEach((rawTemplate) => {
        const template = normalizeImportedTemplate(rawTemplate);
        appState.customTemplates[template.id] = template;
      });

      saveState();
      renderApp();
      openGameMaster();
    } catch (error) {
      showGameMasterMessage(error.message);
    }
  };

  reader.readAsText(file);
}

function addScheduledChallenge(templateId, weekId, customTitle, reopenPanel = false) {
  const template = getTemplateById(templateId);
  if (!template) {
    return;
  }

  ensureScheduleWeek(weekId);
  const schedule = appState.schedule[weekId];
  schedule.push({
    instanceId: `${weekId}-${templateId}-${Date.now().toString(36)}`,
    templateId,
    title: customTitle || template.title,
    subtitle: template.subtitle,
    order: schedule.length + 1
  });

  saveState();
  renderApp();
  if (reopenPanel) {
    openGameMaster();
  }
}

function removeScheduledChallenge(weekId, instanceId) {
  ensureScheduleWeek(weekId);
  appState.schedule[weekId] = appState.schedule[weekId]
    .filter((challenge) => challenge.instanceId !== instanceId)
    .map((challenge, index) => ({ ...challenge, order: index + 1 }));

  Object.values(appState.users).forEach((user) => {
    const week = user.weeks && user.weeks[weekId];
    if (week && week.results && week.results[instanceId]) {
      delete week.results[instanceId];
    }
  });

  saveState();
  renderApp();
  openGameMaster();
}

function deleteCustomTemplate(templateId) {
  if (!isCustomTemplate(templateId)) {
    return;
  }

  delete appState.customTemplates[templateId];

  Object.keys(appState.schedule).forEach((weekId) => {
    appState.schedule[weekId] = appState.schedule[weekId]
      .filter((challenge) => challenge.templateId !== templateId)
      .map((challenge, index) => ({ ...challenge, order: index + 1 }));
  });

  Object.values(appState.users).forEach((user) => {
    Object.values(user.weeks || {}).forEach((week) => {
      Object.keys(week.results || {}).forEach((instanceId) => {
        const exists = Object.values(appState.schedule).some((schedule) => schedule.some((entry) => entry.instanceId === instanceId));
        if (!exists) {
          delete week.results[instanceId];
        }
      });
    });
  });

  saveState();
  renderApp();
  openGameMaster();
}

function resetCurrentWeekResults() {
  Object.values(appState.users).forEach((user) => {
    if (user.weeks && user.weeks[currentWeekId]) {
      user.weeks[currentWeekId].results = {};
    }
  });

  saveState();
  renderApp();
  openGameMaster();
}

function renderQuizGame() {
  const template = activeGameContext.template;
  elements.drawerBody.innerHTML = `
    <div class="game-shell">
      <section class="game-card">
        <h4>${escapeHtml(activeGameContext.challenge.title)}</h4>
        <p class="game-copy">${escapeHtml(template.subtitle)}</p>
        <div class="challenge-meta">
          <span class="meta-pill">Single attempt</span>
          <span class="meta-pill">Perfect run bonus +100</span>
        </div>
      </section>

      <form class="game-shell" id="quizForm">
        ${template.questions.map((question, index) => `
          <section class="quiz-question">
            <h5>${index + 1}. ${escapeHtml(question.prompt)}</h5>
            ${question.choices.map((choice) => `
              <label class="answer-option">
                <input name="quiz-${index}" type="radio" value="${escapeHtml(choice)}">
                <span>${escapeHtml(choice)}</span>
              </label>
            `).join("")}
          </section>
        `).join("")}

        <button class="primary-button" type="submit">Submit Quiz</button>
      </form>
    </div>
  `;

  document.getElementById("quizForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const user = getCurrentUser();
    if (!user) {
      return;
    }

    const existing = getChallengeResult(user, activeGameContext.weekId, activeGameContext.challenge.instanceId);
    if (existing.completed) {
      renderLockedChallenge(existing);
      return;
    }

    const answers = new FormData(event.target);
    let correct = 0;

    template.questions.forEach((question, index) => {
      if (answers.get(`quiz-${index}`) === question.answer) {
        correct += 1;
      }
    });

    const perQuestion = Math.round((template.maxScore - 100) / template.questions.length);
    const score = Math.min(template.maxScore, correct * perQuestion + (correct === template.questions.length ? 100 : 0));
    void saveGameResult(activeGameContext.challenge.instanceId, activeGameContext.weekId, {
      completed: true,
      score,
      stars: getStars(score, template.maxScore),
      grade: getGrade(score, template.maxScore),
      detail: `${correct} of ${template.questions.length} correct`
    });
  });
}

function renderCrosswordGame() {
  activeCrossword = buildCrosswordGrid(activeGameContext.template);
  const template = activeGameContext.template;

  elements.drawerBody.innerHTML = `
    <div class="game-shell">
      <section class="game-card">
        <h4>${escapeHtml(activeGameContext.challenge.title)}</h4>
        <p class="game-copy">${escapeHtml(template.subtitle)}</p>
        <div class="challenge-meta">
          <span class="meta-pill">Single attempt</span>
          <span class="meta-pill">Accuracy scoring</span>
        </div>
      </section>

      <section class="crossword-layout">
        <div class="crossword-grid" id="crosswordGrid"></div>
        <aside class="crossword-clues">
          <h5>Clues</h5>
          <div class="clue-list">
            ${template.words.map((word) => `<span><strong>${escapeHtml(word.label)}:</strong> ${escapeHtml(word.clue)}</span>`).join("")}
          </div>
        </aside>
      </section>

      <button class="primary-button" id="checkCrosswordButton" type="button">Lock In Crossword</button>
    </div>
  `;

  const grid = document.getElementById("crosswordGrid");
  grid.style.gridTemplateColumns = `repeat(${template.size}, 1fr)`;
  grid.innerHTML = activeCrossword.cells.map((cell) => renderCrosswordCell(cell)).join("");

  grid.querySelectorAll(".crossword-input").forEach((input) => {
    input.addEventListener("input", handleCrosswordInput);
  });

  document.getElementById("checkCrosswordButton").addEventListener("click", () => {
    const user = getCurrentUser();
    if (!user) {
      return;
    }

    const existing = getChallengeResult(user, activeGameContext.weekId, activeGameContext.challenge.instanceId);
    if (existing.completed) {
      renderLockedChallenge(existing);
      return;
    }

    const activeCells = activeCrossword.cells.filter((cell) => cell.active);
    const correctCount = activeCells.filter((cell) => cell.value === cell.answer).length;
    const score = Math.round((correctCount / activeCells.length) * template.maxScore);

    void saveGameResult(activeGameContext.challenge.instanceId, activeGameContext.weekId, {
      completed: true,
      score,
      stars: getStars(score, template.maxScore),
      grade: getGrade(score, template.maxScore),
      detail: `${correctCount} of ${activeCells.length} letters correct`
    });
  });
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
  const cell = activeCrossword.lookup[`${input.dataset.row}-${input.dataset.col}`];
  if (cell) {
    cell.value = input.value;
  }
}

function renderWordSearchGame() {
  activeWordSearch = createWordSearchData(
    activeGameContext.challenge.instanceId,
    activeGameContext.template.words,
    activeGameContext.template.size || 10
  );

  elements.drawerBody.innerHTML = `
    <div class="game-shell">
      <section class="game-card">
        <h4>${escapeHtml(activeGameContext.challenge.title)}</h4>
        <p class="game-copy">${escapeHtml(activeGameContext.template.subtitle)}</p>
        <div class="challenge-meta">
          <span class="meta-pill">Single attempt</span>
          <span class="meta-pill">${activeWordSearch.words.length} hidden words</span>
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

      <button class="primary-button" id="scoreWordsearchButton" type="button">Lock In Word Search</button>
    </div>
  `;

  renderWordSearchBoard();
  document.getElementById("scoreWordsearchButton").addEventListener("click", () => {
    const user = getCurrentUser();
    if (!user) {
      return;
    }

    const existing = getChallengeResult(user, activeGameContext.weekId, activeGameContext.challenge.instanceId);
    if (existing.completed) {
      renderLockedChallenge(existing);
      return;
    }

    const score = Math.round((activeWordSearch.foundWords.size / activeWordSearch.words.length) * activeGameContext.template.maxScore);
    void saveGameResult(activeGameContext.challenge.instanceId, activeGameContext.weekId, {
      completed: true,
      score,
      stars: getStars(score, activeGameContext.template.maxScore),
      grade: getGrade(score, activeGameContext.template.maxScore),
      detail: `${activeWordSearch.foundWords.size} of ${activeWordSearch.words.length} words found`
    });
  });
}

function renderWordSearchBoard() {
  const gridElement = document.getElementById("wordsearchGrid");
  const bankElement = document.getElementById("wordBankList");
  const statusElement = document.getElementById("selectionStatus");

  statusElement.textContent = activeWordSearch.anchor
    ? `Anchor set at ${activeWordSearch.anchor.row + 1}, ${activeWordSearch.anchor.col + 1}. Pick the end of a word.`
    : "Pick the start of a word.";

  gridElement.style.gridTemplateColumns = `repeat(${activeWordSearch.size}, 1fr)`;

  gridElement.innerHTML = activeWordSearch.grid.map((row, rowIndex) => row.map((letter, colIndex) => {
    const key = `${rowIndex}-${colIndex}`;
    const isAnchor = activeWordSearch.anchor && activeWordSearch.anchor.row === rowIndex && activeWordSearch.anchor.col === colIndex;
    const isSelected = activeWordSearch.selectedPath.some((cell) => cell.row === rowIndex && cell.col === colIndex);
    const isFound = activeWordSearch.foundCells.has(key);

    return `
      <button class="cell-button ${isAnchor ? "anchor" : ""} ${isSelected ? "selected" : ""} ${isFound ? "found" : ""}" data-row="${rowIndex}" data-col="${colIndex}" type="button">
        ${letter}
      </button>
    `;
  }).join("")).join("");

  bankElement.innerHTML = activeWordSearch.words.map((word) => `
    <span class="word-pill ${activeWordSearch.foundWords.has(word.word) ? "found" : ""}">${escapeHtml(word.word)}</span>
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

async function saveGameResult(instanceId, weekId, result) {
  const user = getCurrentUser();
  if (!user) {
    return;
  }

  const week = ensureUserWeek(user, weekId);
  if (week.results[instanceId] && week.results[instanceId].completed) {
    renderLockedChallenge(week.results[instanceId]);
    return;
  }

  week.results[instanceId] = result;
  saveState();
  await saveRemoteWeekProgress(user, weekId);
  await saveRemoteLeaderboardScore(user, weekId);
  renderApp();
  renderLockedChallenge(result);
}

function buildCrosswordGrid(template) {
  const cells = [];
  const lookup = {};
  const activeMap = {};

  template.words.forEach((word) => {
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
      }
    });
  });

  for (let row = 0; row < template.size; row += 1) {
    for (let col = 0; col < template.size; col += 1) {
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

function createWordSearchData(seedKey, words, size = 10) {
  const rng = createSeededRandom(hashSeed(seedKey));
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
  const directions = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: -1, col: 1 }
  ];

  const placements = words.map((word) => placeWord(word, grid, directions, rng));

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (!grid[row][col]) {
        grid[row][col] = String.fromCharCode(65 + Math.floor(rng() * 26));
      }
    }
  }

  return {
    size,
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
      if (grid[row][col] && grid[row][col] !== word[index]) {
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

function getCurrentUser() {
  return appState.currentUserId ? appState.users[appState.currentUserId] || null : null;
}

function ensureScheduleWeek(weekId) {
  if (!Object.prototype.hasOwnProperty.call(appState.schedule, weekId)) {
    appState.schedule[weekId] = createDefaultSchedule(weekId);
  }
}

function createDefaultSchedule(weekId) {
  return DEFAULT_TEMPLATE_IDS.map((templateId, index) => {
    const template = getTemplateById(templateId);
    return {
      instanceId: `${weekId}-${templateId}-${index + 1}`,
      templateId,
      title: template.title,
      subtitle: template.subtitle,
      order: index + 1
    };
  });
}

function getWeekSchedule(weekId) {
  ensureScheduleWeek(weekId);
  return [...appState.schedule[weekId]].sort((a, b) => a.order - b.order);
}

function ensureUserWeek(user, weekId) {
  if (!user.weeks[weekId]) {
    user.weeks[weekId] = { results: {} };
  }

  if (!user.weeks[weekId].results) {
    user.weeks[weekId].results = {};
  }

  return user.weeks[weekId];
}

function getChallengeResult(user, weekId, instanceId) {
  const week = ensureUserWeek(user, weekId);
  return week.results[instanceId] || createBlankResult();
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

function getPlayerWeekScore(user, weekId) {
  const schedule = getWeekSchedule(weekId);
  return schedule.reduce((sum, challenge) => sum + getChallengeResult(user, weekId, challenge.instanceId).score, 0);
}

function getCompletedCount(user, weekId, schedule) {
  return schedule.filter((challenge) => getChallengeResult(user, weekId, challenge.instanceId).completed).length;
}

function getBestGrade(user, weekId, schedule) {
  const grades = schedule
    .map((challenge) => getChallengeResult(user, weekId, challenge.instanceId).grade)
    .filter(Boolean);

  if (!grades.length) {
    return "Starter";
  }

  const order = ["S", "A", "B", "C", "D", "E"];
  return grades.sort((left, right) => order.indexOf(left) - order.indexOf(right))[0];
}

function getOverallGrade(user, weekId, schedule) {
  const completed = getCompletedCount(user, weekId, schedule);
  if (!completed) {
    return "Not Graded";
  }

  const score = getPlayerWeekScore(user, weekId);
  const max = schedule.reduce((sum, challenge) => sum + getTemplateById(challenge.templateId).maxScore, 0);
  return getGrade(score, max || 1);
}

function buildLeaderboard(weekId) {
  const schedule = getWeekSchedule(weekId);

  return Object.values(appState.users).map((user) => {
    if (!user.profile) {
      return null;
    }

    const score = getPlayerWeekScore(user, weekId);
    const completedCount = getCompletedCount(user, weekId, schedule);
    if (!score && !completedCount) {
      return null;
    }

    return {
      userId: user.id,
      name: user.profile.heroName,
      score,
      completedCount,
      note: `@${user.username} | ${completedCount}/${schedule.length} cleared`,
      isCurrent: user.id === appState.currentUserId
    };
  }).filter(Boolean).sort((left, right) => right.score - left.score || right.completedCount - left.completedCount || left.name.localeCompare(right.name));
}

function setupFirebaseIntegration() {
  if (window.firebaseAPI) {
    bindFirebaseBridge(window.firebaseAPI);
  }

  window.addEventListener("firebase-ready", () => {
    bindFirebaseBridge(window.firebaseAPI);
  }, { once: true });
}

function bindFirebaseBridge(firebase) {
  if (firebaseBridgeBound || !firebase) {
    return;
  }

  firebaseBridgeBound = true;
  if (!firebase.ready) {
    console.warn(firebase.error || "Firebase is not configured yet.");
    return;
  }

  firebase.onAuthStateChanged(firebase.auth, async (authUser) => {
    await handleFirebaseAuthState(authUser);
  });

  listenToLeaderboard();
}

async function handleFirebaseAuthState(authUser) {
  if (!authUser) {
    appState.currentUserId = null;
    saveState();
    closeDrawers();
    closeProfileModal();
    syncBuilderFromCurrentUser();
    renderApp();
    return;
  }

  const username = getAuthUsername(authUser);
  if (!appState.users[authUser.uid]) {
    appState.users[authUser.uid] = {
      id: authUser.uid,
      username,
      password: "",
      profile: null,
      weeks: {}
    };
  }

  appState.users[authUser.uid].username = username;
  appState.currentUserId = authUser.uid;

  await loadRemoteProfile(authUser.uid);
  await loadRemoteWeekProgress(authUser.uid, currentWeekId);

  saveState();
  clearAuthForms();
  setAuthMessage("");
  syncBuilderFromCurrentUser();
  renderApp();
}

function getFirebaseAPI() {
  return window.firebaseAPI && window.firebaseAPI.ready ? window.firebaseAPI : null;
}

function requireFirebaseAPI() {
  const firebase = getFirebaseAPI();
  if (firebase) {
    return firebase;
  }

  setAuthMessage(window.firebaseAPI?.error || "Add your Firebase project config in index.html to enable online login.");
  return null;
}

function getAuthUsername(authUser) {
  const localPart = String(authUser?.email || "")
    .split("@")[0]
    .trim();

  return sanitizeUsername(localPart || String(authUser?.uid || "").slice(0, 12));
}

function getDisplayedLeaderboard(weekId) {
  if (getFirebaseAPI()) {
    return remoteLeaderboard;
  }

  return buildLeaderboard(weekId);
}

function listenToLeaderboard() {
  const firebase = getFirebaseAPI();
  if (!firebase) {
    return;
  }

  if (leaderboardUnsubscribe) {
    leaderboardUnsubscribe();
  }

  const leaderboardQuery = firebase.query(
    firebase.collection(firebase.db, "leaderboards", currentWeekId, "scores"),
    firebase.orderBy("score", "desc")
  );

  leaderboardUnsubscribe = firebase.onSnapshot(leaderboardQuery, (snapshot) => {
    remoteLeaderboard = snapshot.docs.map((entry) => {
      const data = entry.data();
      return {
        userId: data.playerId,
        name: data.playerName,
        score: data.score || 0,
        completedCount: data.completedCount || 0,
        note: data.note || "Online player",
        isCurrent: data.playerId === firebase.auth.currentUser?.uid
      };
    });

    renderApp();
  }, (error) => {
    console.error("Leaderboard listener failed", error);
  });
}

async function loadRemoteProfile(userId) {
  const firebase = getFirebaseAPI();
  const user = appState.users[userId];
  if (!firebase || !user) {
    return;
  }

  try {
    const snapshot = await firebase.getDoc(firebase.doc(firebase.db, "profiles", userId));
    if (!snapshot.exists()) {
      return;
    }

    const data = snapshot.data();
    if (data.profile) {
      user.profile = createProfileDraft(data.profile);
    }

    if (data.username) {
      user.username = sanitizeUsername(data.username) || user.username;
    }
  } catch (error) {
    console.error("Profile sync failed", error);
  }
}

async function saveRemoteProfile(user) {
  const firebase = getFirebaseAPI();
  if (!firebase || !user || firebase.auth.currentUser?.uid !== user.id || !user.profile) {
    return;
  }

  try {
    await firebase.setDoc(firebase.doc(firebase.db, "profiles", user.id), {
      username: user.username,
      profile: user.profile
    }, { merge: true });
  } catch (error) {
    console.error("Profile save failed", error);
  }
}

async function loadRemoteWeekProgress(userId, weekId) {
  const firebase = getFirebaseAPI();
  const user = appState.users[userId];
  if (!firebase || !user) {
    return;
  }

  try {
    const snapshot = await firebase.getDoc(firebase.doc(firebase.db, "progress", `${userId}_${weekId}`));
    if (!snapshot.exists()) {
      return;
    }

    const data = snapshot.data();
    const week = ensureUserWeek(user, weekId);
    week.results = data.results || {};
  } catch (error) {
    console.error("Progress sync failed", error);
  }
}

async function saveRemoteWeekProgress(user, weekId) {
  const firebase = getFirebaseAPI();
  if (!firebase || !user || firebase.auth.currentUser?.uid !== user.id) {
    return;
  }

  try {
    await firebase.setDoc(firebase.doc(firebase.db, "progress", `${user.id}_${weekId}`), {
      userId: user.id,
      weekId,
      results: ensureUserWeek(user, weekId).results
    }, { merge: true });
  } catch (error) {
    console.error("Progress save failed", error);
  }
}

async function saveRemoteLeaderboardScore(user, weekId) {
  const firebase = getFirebaseAPI();
  if (!firebase || !user || firebase.auth.currentUser?.uid !== user.id) {
    return;
  }

  const schedule = getWeekSchedule(weekId);
  const completedCount = getCompletedCount(user, weekId, schedule);
  const totalScore = getPlayerWeekScore(user, weekId);

  try {
    await firebase.setDoc(firebase.doc(firebase.db, "leaderboards", weekId, "scores", user.id), {
      playerId: user.id,
      playerName: user.profile?.heroName || user.username,
      score: totalScore,
      completedCount,
      note: `@${user.username} | ${completedCount}/${schedule.length} cleared`
    }, { merge: true });
  } catch (error) {
    console.error("Leaderboard save failed", error);
  }
}

function getFirebaseAuthMessage(error, fallback) {
  const code = String(error?.code || "");

  if (code === "auth/email-already-in-use") {
    return "That username is already registered online.";
  }
  if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
    return "Player login failed. Check the username and password.";
  }
  if (code === "auth/weak-password") {
    return "Choose a stronger password with at least 6 characters.";
  }
  if (code === "auth/network-request-failed") {
    return "Firebase could not be reached. Check your internet connection and try again.";
  }

  return fallback;
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

function createProfileDraft(existingProfile) {
  return {
    heroName: existingProfile?.heroName || "",
    gender: existingProfile?.gender || PALETTE.genders[0].id,
    skinTone: existingProfile?.skinTone || PALETTE.skinTones[1].id,
    hairStyle: existingProfile?.hairStyle || PALETTE.hairStyles[0].id,
    hairColor: existingProfile?.hairColor || PALETTE.hairColors[0].id,
    outfit: existingProfile?.outfit || PALETTE.outfits[0].id,
    accessory: existingProfile?.accessory || PALETTE.accessories[0].id,
    expression: existingProfile?.expression || PALETTE.expressions[0].id
  };
}

function renderAvatarStage(element, profile) {
  const resolvedProfile = createProfileDraft(profile || null);
  element.innerHTML = `
    <div class="pixel-avatar-wrap">
      <canvas class="pixel-avatar-canvas" width="128" height="160"></canvas>
    </div>
  `;

  drawPixelAvatar(element.querySelector("canvas"), resolvedProfile);
}

function drawPixelAvatar(canvas, profile) {
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = 4;
  const skin = findById(PALETTE.skinTones, profile.skinTone).color;
  const hair = findById(PALETTE.hairColors, profile.hairColor).color;
  const outfit = findById(PALETTE.outfits, profile.outfit);
  const outline = "#5a3f2d";
  const skinShade = adjustHexColor(skin, -24);
  const skinGlow = adjustHexColor(skin, 16);
  const hairShade = adjustHexColor(hair, -24);
  const hairHighlight = adjustHexColor(hair, 24);
  const outfitShadow = adjustHexColor(outfit.primary, -24);
  const outfitLight = adjustHexColor(outfit.primary, 18);
  const trim = adjustHexColor(outfit.secondary, 12);
  const bootColor = "#4f3628";
  const blush = adjustHexColor(skin, 22);

  function block(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * scale, y * scale, width * scale, height * scale);
  }

  function pixel(x, y, color) {
    block(x, y, 1, 1, color);
  }

  block(9, 37, 14, 2, "rgba(85, 58, 36, 0.18)");
  block(11, 36, 10, 1, "rgba(85, 58, 36, 0.1)");

  block(11, 7, 10, 8, skin);
  block(10, 9, 1, 4, skin);
  block(21, 9, 1, 4, skin);
  block(12, 7, 8, 1, skinGlow);
  pixel(11, 8, skinGlow);
  pixel(20, 8, skinGlow);
  block(12, 14, 8, 1, skinShade);
  pixel(10, 12, skinShade);
  pixel(21, 12, skinShade);
  block(14, 15, 4, 2, skin);
  pixel(14, 16, skinShade);
  pixel(17, 16, skinShade);

  drawPixelBody(block, pixel, profile.gender, outfit, skin, skinShade, outfitShadow, outfitLight, trim, bootColor);
  drawPixelHair(block, pixel, hair, hairShade, hairHighlight, profile.hairStyle);
  drawPixelFace(pixel, profile.expression, outline, blush, skinShade);
  drawPixelAccessory(block, pixel, profile.accessory);
}

function drawPixelBody(block, pixel, gender, outfit, skin, skinShade, outfitShadow, outfitLight, trim, bootColor) {
  block(13, 17, 6, 1, trim);
  pixel(15, 18, trim);
  pixel(16, 18, trim);

  if (gender === "male") {
    block(11, 18, 10, 2, outfitLight);
    block(10, 20, 12, 6, outfit.primary);
    block(11, 26, 10, 2, trim);
    block(12, 28, 8, 4, outfit.primary);
    block(13, 32, 3, 5, outfit.secondary);
    block(16, 32, 3, 5, outfit.secondary);
    block(12, 20, 1, 10, outfitShadow);
    block(19, 20, 1, 10, outfitShadow);
    block(14, 21, 4, 1, outfitLight);
    block(9, 20, 2, 2, trim);
    block(21, 20, 2, 2, trim);
    block(9, 22, 2, 5, skin);
    block(21, 22, 2, 5, skin);
    block(9, 27, 2, 2, skinShade);
    block(21, 27, 2, 2, skinShade);
    block(13, 37, 3, 1, bootColor);
    block(16, 37, 3, 1, bootColor);
    pixel(15, 26, trim);
    pixel(16, 26, trim);
    return;
  }

  block(12, 18, 8, 2, outfitLight);
  block(11, 20, 10, 5, outfit.primary);
  block(12, 25, 8, 2, trim);
  block(10, 27, 12, 3, outfit.primary);
  block(9, 30, 14, 4, outfit.secondary);
  block(10, 34, 4, 1, outfit.primary);
  block(18, 34, 4, 1, outfit.primary);
  block(12, 35, 2, 2, skinShade);
  block(18, 35, 2, 2, skinShade);
  block(12, 37, 3, 1, bootColor);
  block(17, 37, 3, 1, bootColor);
  block(9, 20, 2, 2, trim);
  block(21, 20, 2, 2, trim);
  block(9, 22, 2, 5, skin);
  block(21, 22, 2, 5, skin);
  block(9, 27, 2, 2, skinShade);
  block(21, 27, 2, 2, skinShade);
  block(12, 20, 1, 8, outfitShadow);
  block(19, 20, 1, 8, outfitShadow);
  pixel(15, 26, trim);
  pixel(16, 26, trim);
}

function drawPixelHair(block, pixel, hair, hairShade, hairHighlight, hairStyle) {
  if (hairStyle === "short") {
    block(10, 5, 12, 3, hair);
    block(11, 8, 10, 1, hair);
    block(10, 9, 2, 1, hair);
    block(20, 9, 2, 1, hairShade);
    block(12, 5, 4, 1, hairHighlight);
    pixel(17, 6, hairHighlight);
    return;
  }

  if (hairStyle === "bob") {
    block(10, 5, 12, 3, hair);
    block(10, 8, 2, 7, hair);
    block(20, 8, 2, 7, hairShade);
    block(12, 12, 8, 2, hair);
    block(13, 5, 4, 1, hairHighlight);
    pixel(18, 7, hairHighlight);
    return;
  }

  if (hairStyle === "curly") {
    block(10, 5, 12, 3, hair);
    block(9, 7, 2, 3, hair);
    block(21, 7, 2, 3, hairShade);
    block(11, 8, 10, 1, hair);
    pixel(10, 10, hair);
    pixel(12, 11, hairHighlight);
    pixel(20, 10, hairShade);
    pixel(21, 11, hairShade);
    return;
  }

  block(10, 5, 12, 3, hair);
  block(11, 8, 10, 1, hair);
  block(10, 8, 2, 5, hair);
  block(20, 8, 2, 5, hairShade);
  block(10, 13, 1, 7, hair);
  block(21, 13, 1, 7, hairShade);
  pixel(11, 20, hairHighlight);
  pixel(20, 20, hairShade);
}

function drawPixelFace(pixel, expression, outline, blush, skinShade) {
  pixel(14, 9, outline);
  pixel(18, 9, outline);
  pixel(14, 10, "rgba(255, 255, 255, 0.82)");
  pixel(18, 10, "rgba(255, 255, 255, 0.82)");
  pixel(15, 8, outline);
  pixel(18, 8, outline);
  pixel(16, 12, skinShade);
  pixel(13, 12, blush);
  pixel(19, 12, blush);

  if (expression === "grin") {
    pixel(15, 13, "#6d4538");
    pixel(16, 14, "#6d4538");
    pixel(17, 14, "#6d4538");
    pixel(18, 13, "#6d4538");
    return;
  }

  if (expression === "joy") {
    pixel(15, 13, "#6d4538");
    pixel(16, 13, "#6d4538");
    pixel(17, 13, "#6d4538");
    pixel(16, 14, "#d95d65");
    pixel(17, 14, "#d95d65");
    return;
  }

  if (expression === "calm") {
    pixel(15, 13, "#6d4538");
    pixel(16, 13, "#6d4538");
    pixel(17, 13, "#6d4538");
    return;
  }

  pixel(15, 13, "#6d4538");
  pixel(16, 14, "#6d4538");
}

function drawPixelAccessory(block, pixel, accessory) {
  if (accessory === "bible") {
    block(22, 23, 4, 6, "#6f4730");
    block(23, 23, 1, 6, "#cfb465");
    pixel(24, 25, "#cfb465");
    pixel(24, 26, "#cfb465");
    return;
  }

  if (accessory === "scroll") {
    block(5, 24, 5, 3, "#f1dfb7");
    pixel(5, 23, "#c09354");
    pixel(9, 23, "#c09354");
    pixel(5, 27, "#c09354");
    pixel(9, 27, "#c09354");
    return;
  }

  if (accessory === "staff") {
    block(25, 12, 1, 20, "#8a5a2f");
    pixel(24, 12, "#d1b46d");
    pixel(25, 11, "#d1b46d");
    pixel(26, 11, "#d1b46d");
    return;
  }

  if (accessory === "dove") {
    block(22, 6, 4, 2, "#ffffff");
    block(21, 7, 2, 2, "#ffffff");
    pixel(24, 5, "#ffffff");
    pixel(25, 8, "#d4ecf7");
    return;
  }

  if (accessory === "halo") {
    block(12, 3, 8, 1, "#f0b554");
    pixel(11, 4, "#f0b554");
    pixel(20, 4, "#f0b554");
    return;
  }

  block(12, 4, 8, 1, "#f0b554");
  block(13, 3, 6, 1, "#f8d16e");
  pixel(12, 5, "#c9933e");
  pixel(19, 5, "#c9933e");
}

function adjustHexColor(color, amount) {
  const value = String(color || "").replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    return color;
  }

  const shifted = value.match(/.{2}/g).map((chunk) => clampColor(Number.parseInt(chunk, 16) + amount));
  return `#${shifted.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function clampColor(value) {
  return Math.max(0, Math.min(255, value));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultState();
    }

    const parsed = JSON.parse(raw);
    if (!parsed.version || parsed.version < 3) {
      return createDefaultState();
    }

    return {
      version: STORAGE_VERSION,
      currentUserId: parsed.currentUserId || null,
      users: parsed.users || {},
      schedule: parsed.version < STORAGE_VERSION ? {} : (parsed.schedule || {}),
      customTemplates: parsed.customTemplates || {},
      admin: { authenticated: false }
    };
  } catch (error) {
    return createDefaultState();
  }
}

function createDefaultState() {
  return {
    version: STORAGE_VERSION,
    currentUserId: null,
    users: {},
    schedule: {},
    customTemplates: {},
    admin: { authenticated: false }
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    version: STORAGE_VERSION,
    currentUserId: appState.currentUserId,
    users: appState.users,
    schedule: appState.schedule,
    customTemplates: appState.customTemplates
  }));
}

function normalizeImportedTemplate(rawTemplate) {
  const templateId = rawTemplate.id && !CHALLENGE_TEMPLATES[rawTemplate.id]
    ? sanitizeTemplateId(rawTemplate.id)
    : createCustomTemplateId(rawTemplate.title || "custom-challenge");

  return normalizeTemplate({
    ...rawTemplate,
    id: templateId,
    typeLabel: rawTemplate.kind === "wordsearch" ? "Word Search" : capitalize(rawTemplate.kind || "quiz"),
    rawContent: rawTemplate.rawContent || ""
  }, false);
}

function normalizeTemplate(rawTemplate, parseFromRawContent) {
  const kind = rawTemplate.kind;
  if (!["quiz", "crossword", "wordsearch"].includes(kind)) {
    throw new Error("Challenge type must be quiz, crossword, or wordsearch.");
  }

  const title = sanitizeScheduleTitle(rawTemplate.title || "");
  const subtitle = sanitizeSubtitle(rawTemplate.subtitle || "");
  if (!title || !subtitle) {
    throw new Error("Custom challenges need both a title and subtitle.");
  }

  const template = {
    id: sanitizeTemplateId(rawTemplate.id || createCustomTemplateId(title)),
    kind,
    title,
    subtitle,
    typeLabel: rawTemplate.typeLabel || (kind === "wordsearch" ? "Word Search" : capitalize(kind)),
    levelLabel: sanitizeLevelLabel(rawTemplate.levelLabel || defaultLevelLabel(kind)),
    maxScore: sanitizeMaxScore(rawTemplate.maxScore, kind)
  };

  if (kind === "quiz") {
    const questions = parseFromRawContent ? parseQuizContent(rawTemplate.rawContent || "") : normalizeQuizQuestions(rawTemplate.questions);
    template.questions = questions;
    return template;
  }

  if (kind === "crossword") {
    const size = Number(rawTemplate.size);
    if (!Number.isInteger(size) || size < 6 || size > 16) {
      throw new Error("Crossword size must be a number between 6 and 16.");
    }

    const words = parseFromRawContent ? parseCrosswordContent(rawTemplate.rawContent || "") : normalizeCrosswordWords(rawTemplate.words);
    validateCrosswordWords(words, size);
    template.size = size;
    template.words = words;
    return template;
  }

  const words = parseFromRawContent ? parseWordSearchContent(rawTemplate.rawContent || "") : normalizeWordSearchWords(rawTemplate.words);
  if (words.length < 4) {
    throw new Error("Word search challenges need at least 4 words.");
  }
  const size = Number(rawTemplate.size) || 10;
  if (!Number.isInteger(size) || size < 8 || size > 16) {
    throw new Error("Word search grid size must be a number between 8 and 16.");
  }
  template.size = size;
  template.words = words;
  return template;
}

function normalizeQuizQuestions(questions) {
  if (!Array.isArray(questions) || !questions.length) {
    throw new Error("Quiz challenges need a list of questions.");
  }

  return questions.map((question) => {
    const prompt = sanitizeLongText(question.prompt || "");
    const choices = (question.choices || []).map((choice) => sanitizeLongText(choice)).filter(Boolean);
    const answer = sanitizeLongText(question.answer || "");
    if (!prompt || choices.length < 2 || !choices.includes(answer)) {
      throw new Error("Each quiz question needs a prompt, choices, and an answer that matches one of the choices.");
    }

    return { prompt, choices, answer };
  });
}

function normalizeCrosswordWords(words) {
  if (!Array.isArray(words) || !words.length) {
    throw new Error("Crossword challenges need a list of words.");
  }

  return words.map((word, index) => {
    const label = sanitizeLongText(word.label || `${index + 1} Across`);
    const direction = String(word.direction || "").toLowerCase();
    const answer = sanitizeLetters(word.answer || "");
    const clue = sanitizeLongText(word.clue || "");
    const row = Number(word.start && word.start.row);
    const col = Number(word.start && word.start.col);
    const clueNumber = Number(word.clueNumber || Number.parseInt(label, 10) || index + 1);

    if (!["across", "down"].includes(direction) || !answer || !clue || !Number.isInteger(row) || !Number.isInteger(col)) {
      throw new Error("Each crossword word needs a label, direction, answer, clue, and numeric start row/col.");
    }

    return { clueNumber, label, direction, answer, clue, start: { row, col } };
  });
}

function normalizeWordSearchWords(words) {
  if (!Array.isArray(words) || !words.length) {
    throw new Error("Word search challenges need a list of words.");
  }

  return words.map((word) => sanitizeLetters(word)).filter((word) => word.length >= 3);
}

function parseQuizContent(content) {
  const lines = splitNonEmptyLines(content);
  if (!lines.length) {
    throw new Error("Add at least one quiz question to the content field.");
  }

  return lines.map((line) => {
    const parts = line.split("|").map((part) => sanitizeLongText(part));
    if (parts.length < 6) {
      throw new Error("Quiz lines must use: Question | Choice A | Choice B | Choice C | Choice D | Correct Answer");
    }

    const prompt = parts[0];
    const choices = parts.slice(1, -1).filter(Boolean);
    const answer = parts[parts.length - 1];
    if (!choices.includes(answer)) {
      throw new Error(`Quiz answer "${answer}" must match one of the listed choices.`);
    }

    return { prompt, choices, answer };
  });
}

function parseCrosswordContent(content) {
  const lines = splitNonEmptyLines(content);
  if (!lines.length) {
    throw new Error("Add crossword lines to the content field.");
  }

  return lines.map((line, index) => {
    const parts = line.split("|").map((part) => sanitizeLongText(part));
    if (parts.length < 6) {
      throw new Error("Crossword lines must use: 1 Across | across | ANSWER | Clue text | row | col");
    }

    const label = parts[0];
    const direction = parts[1].toLowerCase();
    const answer = sanitizeLetters(parts[2]);
    const clue = parts[3];
    const row = Number(parts[4]);
    const col = Number(parts[5]);
    const clueNumber = Number.parseInt(label, 10) || index + 1;

    if (!["across", "down"].includes(direction) || !answer || !clue || !Number.isInteger(row) || !Number.isInteger(col)) {
      throw new Error("Each crossword line must include a valid direction, answer, clue, row, and col.");
    }

    return { clueNumber, label, direction, answer, clue, start: { row, col } };
  });
}

function parseWordSearchContent(content) {
  const words = content
    .split(/[\n,]+/g)
    .map((word) => sanitizeLetters(word))
    .filter((word) => word.length >= 3);

  if (words.length < 4) {
    throw new Error("Word search content needs at least 4 words of 3 letters or more.");
  }

  return [...new Set(words)];
}

function validateCrosswordWords(words, size) {
  const occupied = {};
  words.forEach((word) => {
    word.answer.split("").forEach((letter, index) => {
      const row = word.start.row + (word.direction === "down" ? index : 0);
      const col = word.start.col + (word.direction === "across" ? index : 0);
      if (row < 0 || row >= size || col < 0 || col >= size) {
        throw new Error(`Crossword word "${word.answer}" does not fit inside a ${size}x${size} grid.`);
      }

      const key = `${row}-${col}`;
      if (occupied[key] && occupied[key] !== letter) {
        throw new Error(`Crossword words overlap with conflicting letters at row ${row}, col ${col}.`);
      }

      occupied[key] = letter;
    });
  });
}

function defaultLevelLabel(kind) {
  if (kind === "quiz") {
    return "Tier 3 | Custom";
  }
  if (kind === "crossword") {
    return "Tier 3 | Custom";
  }
  return "Tier 3 | Custom";
}

function createCustomTemplateId(title) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 28) || "custom-challenge";
  return `custom-${slug}-${Date.now().toString(36)}`;
}

function sanitizeTemplateId(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9_-]/g, "-").slice(0, 48);
}

function sanitizeSubtitle(rawValue) {
  return rawValue.replace(/\s+/g, " ").replace(/[<>]/g, "").trim().slice(0, 90);
}

function sanitizeLevelLabel(rawValue) {
  return rawValue.replace(/\s+/g, " ").replace(/[<>]/g, "").trim().slice(0, 28);
}

function sanitizeMaxScore(rawValue, kind) {
  const parsed = Number(rawValue);
  const fallback = kind === "quiz" ? 700 : kind === "crossword" ? 650 : 600;
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(100, Math.min(1500, Math.round(parsed / 10) * 10));
}

function sanitizeLongText(rawValue) {
  return String(rawValue).replace(/\s+/g, " ").replace(/[<>]/g, "").trim().slice(0, 180);
}

function sanitizeLetters(rawValue) {
  return String(rawValue).toUpperCase().replace(/[^A-Z]/g, "");
}

function splitNonEmptyLines(content) {
  return String(content)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function showGameMasterMessage(message) {
  const scheduleForm = document.getElementById("scheduleForm");
  if (!scheduleForm) {
    return;
  }

  scheduleForm.parentElement.querySelectorAll(".message-card").forEach((card) => card.remove());

  const card = document.createElement("article");
  card.className = "empty-state message-card";
  card.innerHTML = `<strong>Game Master notice</strong><span>${escapeHtml(message)}</span>`;
  scheduleForm.parentElement.insertBefore(card, scheduleForm);
}

function capitalize(value) {
  const text = String(value || "");
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}

function sanitizeUsername(rawValue) {
  return rawValue.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 18);
}

function sanitizeHeroName(rawValue) {
  return rawValue.replace(/\s+/g, " ").replace(/[<>]/g, "").trim().slice(0, 18);
}

function sanitizeScheduleTitle(rawValue) {
  return rawValue.replace(/\s+/g, " ").replace(/[<>]/g, "").trim().slice(0, 42);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function findById(items, id) {
  return items.find((item) => item.id === id) || items[0];
}

function getAllTemplates() {
  const merged = { ...CHALLENGE_TEMPLATES, ...appState.customTemplates };
  return Object.values(merged).sort((left, right) => left.title.localeCompare(right.title));
}

function getTemplateById(templateId) {
  return appState.customTemplates[templateId] || CHALLENGE_TEMPLATES[templateId] || null;
}

function isCustomTemplate(templateId) {
  return Object.prototype.hasOwnProperty.call(appState.customTemplates, templateId);
}

function getWeekId(date) {
  const year = date.getFullYear();
  const firstDay = new Date(year, 0, 1);
  const diff = Math.floor((date - firstDay) / DAY_MS);
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
