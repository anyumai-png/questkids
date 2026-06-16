const STORE_KEY = "questkids.mvp.v4";

const todayKey = () => {
  return dateKeyFor(new Date());
};

function dateKeyFor(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function dateKeyOffset(offsetDays) {
  return dateKeyFor(new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000));
}

function weekdayLabel(date) {
  return new Intl.DateTimeFormat("zh-Hant-HK", {
    timeZone: "Asia/Hong_Kong",
    weekday: "short",
  }).format(date);
}
const uid = (prefix) => `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const moods = [
  { id: "happy", label: "好有精神", icon: "sun-smile", tint: "gold", note: "可以試一個小挑戰。" },
  { id: "ok", label: "還可以", icon: "mint-smile", tint: "mint", note: "慢慢開始就好。" },
  { id: "flat", label: "一般般", icon: "cloud-neutral", tint: "sky", note: "先做最小一步。" },
  { id: "worry", label: "有點擔心", icon: "raindrop-worry", tint: "blue", note: "大人先陪你拆細。" },
  { id: "resist", label: "不太想做", icon: "storm-grump", tint: "rose", note: "只做 60 秒也算開始。" },
];

const delayTypes = [
  {
    id: "activation",
    icon: "swirl",
    title: "不知道如何開始型",
    summary: "目標不是做完，而是先找到第一步。",
    parentScript: "我們先不要求全部完成，先做第一步：{firstStep} 就可以。",
    strategy: "任務拆解",
    risk: "容易站著發呆、找東西、來回走動。",
  },
  {
    id: "anxiety",
    icon: "cloud",
    title: "怕難怕失敗型",
    summary: "降低心理成本，容許試做和改正。",
    parentScript: "這次不求完美，我陪你試做 3 分鐘，做錯了也可以修改。",
    strategy: "情緒確認",
    risk: "容易說不會、害怕做錯、想由大人代做。",
  },
  {
    id: "temptation",
    icon: "spark",
    title: "想玩即時誘惑型",
    summary: "短衝刺加清楚交換，先做後玩。",
    parentScript: "先完成一個短衝刺，之後就有一段清楚的玩樂時間。",
    strategy: "限時挑戰",
    risk: "容易被手機、玩具或影片拉走。",
  },
];

const zoneCatalog = [
  {
    id: "morning",
    name: "晨光碼頭",
    short: "早晨",
    areas: ["早晨例行", "早晨區", "出門準備"],
    icon: "boat",
    theme: "gold",
    copy: "把出門前的小事排好，今天會順一點。",
  },
  {
    id: "study",
    name: "學習樹林",
    short: "學習",
    areas: ["學習任務", "學習區", "功課"],
    icon: "leaf",
    theme: "green",
    copy: "先做一題或一行，讓腦袋慢慢進入狀態。",
  },
  {
    id: "home",
    name: "家務港灣",
    short: "家務",
    areas: ["家務任務", "家務區", "生活自理"],
    icon: "home",
    theme: "coral",
    copy: "生活小事也可以拆成很容易開始的一步。",
  },
  {
    id: "calm",
    name: "平靜海灣",
    short: "平靜",
    areas: ["晚間例行", "晚間區", "休息", "情緒調節"],
    icon: "water",
    theme: "blue",
    copy: "休息、放鬆和回來繼續，都是練習的一部分。",
  },
];

const badgeCatalog = [
  { id: "first_step", name: "勇於開始", rule: "完成第一個小任務", icon: "sprout" },
  { id: "three_tasks", name: "持續一步", rule: "累積完成 3 個任務", icon: "star" },
  { id: "calm_start", name: "先看心情", rule: "記錄心情後開始任務", icon: "heart" },
  { id: "weekly_try", name: "回來繼續", rule: "連續 7 天有完成任務", icon: "lighthouse" },
];

const cardCatalog = [
  {
    id: "pet_lumo",
    type: "pet",
    name: "Lumo 光點",
    rarity: "starter",
    icon: "lumo",
    zone: "calm",
    story: "當你願意開始第一步，Lumo 會在旁邊亮一點點光。",
    fact: "螢火蟲會用身體發光來互相溝通，這種光通常不會燙。",
  },
  {
    id: "pet_sprout",
    type: "pet",
    name: "Sprout 樹苗",
    rarity: "gentle",
    icon: "sprout",
    zone: "study",
    story: "每次慢慢試，Sprout 都會長出一片新葉。",
    fact: "植物會朝著光的方向生長，這叫向光性。",
  },
  {
    id: "pet_skipper",
    type: "pet",
    name: "Skipper 小船",
    rarity: "gentle",
    icon: "boat",
    zone: "morning",
    story: "出發前有好多小事，Skipper 會幫你一件件排好。",
    fact: "帆船可以利用風力前進，船帆角度會影響速度和方向。",
  },
  {
    id: "pet_pebble",
    type: "pet",
    name: "Pebble 小石",
    rarity: "rare",
    icon: "pebble",
    zone: "home",
    story: "看起來慢慢的 Pebble，其實最懂得一步一步完成。",
    fact: "河邊圓滑的小石頭，很多是被流水長時間磨圓的。",
  },
  {
    id: "pet_mochi",
    type: "pet",
    name: "Mochi 糯米貓",
    rarity: "gentle",
    icon: "cat",
    zone: "calm",
    story: "Mochi 會提醒你：慢慢拉一拉、伸一伸，身體舒服一點再開始。",
    fact: "貓伸懶腰可以活動肌肉，也有助牠們準備下一個動作。",
  },
  {
    id: "pet_bubble_turtle",
    type: "pet",
    name: "泡泡龜",
    rarity: "rare",
    icon: "turtle",
    zone: "calm",
    story: "泡泡龜不急，但每次都會往前一點點。",
    fact: "很多龜可以把頭和腳縮入殼內，用硬殼保護自己。",
  },
  {
    id: "pet_worry_beast",
    type: "pet",
    name: "緊張獸",
    rarity: "gentle",
    icon: "worrybeast",
    zone: "calm",
    story: "牠不是來嚇你，而是提醒你：緊張時可以先停一停。",
    fact: "緊張時深呼吸可以幫身體慢慢回到比較平靜的狀態。",
  },
  {
    id: "animal_dino_card",
    type: "item",
    name: "恐龍卡",
    rarity: "shine",
    icon: "dino",
    zone: "study",
    story: "這張卡會把一隻小恐龍加入動物圖鑑。",
    fact: "恐龍曾經在地球上生活了很長時間，牠們有很多不同大小和形狀。",
  },
  {
    id: "item_focus_lantern",
    type: "item",
    name: "專心小燈",
    rarity: "gentle",
    icon: "lantern",
    zone: "study",
    story: "點亮它，就提醒自己只看下一小步。",
    fact: "以前沒有電燈時，人們會用油燈、蠟燭或燈籠照明。",
  },
  {
    id: "item_cozy_backpack",
    type: "item",
    name: "整理背包",
    rarity: "gentle",
    icon: "bag",
    zone: "morning",
    story: "把需要的東西放好，開始會輕鬆很多。",
    fact: "背包兩邊肩帶一起使用，通常比單肩背更容易分散重量。",
  },
  {
    id: "item_compass_leaf",
    type: "item",
    name: "葉子指南針",
    rarity: "rare",
    icon: "compass",
    zone: "study",
    story: "當任務太大，它會幫你問：下一步在哪裡？",
    fact: "指南針的磁針會受地球磁場影響，通常指向南北方向。",
  },
  {
    id: "deco_calm_fountain",
    type: "deco",
    name: "平靜小泉",
    rarity: "rare",
    icon: "water",
    zone: "calm",
    story: "提醒你可以停一停，呼吸一下，再回來繼續。",
    fact: "水聲常被用在放鬆環境中，因為穩定的聲音有助人安定下來。",
  },
  {
    id: "deco_sunny_flag",
    type: "deco",
    name: "今日小旗",
    rarity: "shine",
    icon: "flag",
    zone: "morning",
    story: "不是勝利旗，是「我今天有試過」的小記號。",
    fact: "旗幟除了代表地方，也常用來在遠處傳遞訊息。",
  },
  {
    id: "place_fuji",
    type: "place",
    name: "富士山",
    rarity: "shine",
    icon: "mountain",
    zone: "calm",
    story: "這張地圖卡會在平靜海灣遠處加上一座雪帽山。",
    fact: "富士山是日本最高的山，也是很有名的火山。",
  },
  {
    id: "place_eiffel",
    type: "place",
    name: "艾菲爾鐵塔",
    rarity: "shine",
    icon: "tower",
    zone: "study",
    story: "它像一座高高的觀察塔，提醒你可以站高一點看任務。",
    fact: "艾菲爾鐵塔位於巴黎，主要以鐵製成，1889 年開放。",
  },
  {
    id: "place_pyramids",
    type: "place",
    name: "吉薩金字塔",
    rarity: "rare",
    icon: "pyramid",
    zone: "study",
    story: "一塊一塊石頭堆起來，就像任務一步一步完成。",
    fact: "埃及吉薩金字塔已有數千年歷史，是古代工程的代表。",
  },
  {
    id: "place_great_wall",
    type: "place",
    name: "萬里長城",
    rarity: "rare",
    icon: "wall",
    zone: "home",
    story: "長長的城牆提醒你：再大的工程，也是一段一段完成。",
    fact: "長城由許多不同年代修建的城牆和關口組成。",
  },
  {
    id: "skill_shoelace",
    type: "skill",
    name: "綁鞋帶能力卡",
    rarity: "gentle",
    icon: "shoe",
    zone: "morning",
    story: "抽到後會解鎖一個鞋帶練習任務。",
    fact: "綁鞋帶需要手指協調和步驟記憶，慢慢練會越來越順。",
    skillMission: {
      title: "學會綁鞋帶",
      minutes: 5,
      steps: ["把兩條鞋帶交叉拉緊", "做一個小圈圈", "另一條鞋帶繞圈再穿過洞"],
    },
  },
  {
    id: "food_rice_ball",
    type: "food",
    name: "飯糰",
    rarity: "gentle",
    icon: "rice",
    zone: "morning",
    story: "小小一個飯糰，像把能量握在手心。",
    fact: "飯糰在日本和很多亞洲地方都很常見，方便帶著外出吃。",
  },
  {
    id: "skill_paper_boat",
    type: "skill",
    name: "摺紙小船",
    rarity: "gentle",
    icon: "paper",
    zone: "calm",
    story: "抽到後會解鎖一個摺紙練習任務。",
    fact: "摺紙可以練習空間感和按步驟完成任務的能力。",
    skillMission: {
      title: "摺一隻紙船",
      minutes: 8,
      steps: ["把紙對摺成長方形", "把兩邊角摺向中線", "打開底部，慢慢拉成小船"],
    },
  },
  {
    id: "skill_stretch",
    type: "skill",
    name: "晨光伸展",
    rarity: "gentle",
    icon: "stretch",
    zone: "morning",
    story: "抽到後會解鎖一個簡單體操任務。",
    fact: "簡單伸展可以讓身體準備好活動，但不用拉到痛。",
    skillMission: {
      title: "做 3 個晨光伸展",
      minutes: 4,
      steps: ["雙手向上伸 5 秒", "左右各側彎一次", "慢慢轉肩膀 5 圈"],
    },
  },
  {
    id: "skill_knot",
    type: "skill",
    name: "繩結小秘技",
    rarity: "rare",
    icon: "knot",
    zone: "home",
    story: "抽到後會解鎖一個繩結練習任務。",
    fact: "繩結在露營、航海和日常整理中都很常用。",
    skillMission: {
      title: "學一個基本繩結",
      minutes: 6,
      steps: ["把繩子繞成一個圈", "把短的一端穿過圈", "慢慢拉緊，觀察形狀"],
    },
  },
  {
    id: "pet_cloud_sheep",
    type: "pet",
    name: "雲朵羊 Mimo",
    rarity: "gentle",
    icon: "sheep",
    zone: "calm",
    story: "Mimo 喜歡慢慢數呼吸，牠會把急急的心情變成軟軟的雲。",
    fact: "羊毛可以用來製成衣物，因為它保暖又柔軟。",
  },
  {
    id: "pet_gear_crab",
    type: "pet",
    name: "齒輪蟹 Kiko",
    rarity: "rare",
    icon: "crab",
    zone: "home",
    story: "Kiko 會把大任務拆成一格一格，鉗子一夾就完成一小步。",
    fact: "蟹通常橫著走，因為牠們的腿關節比較適合側向移動。",
  },
  {
    id: "item_time_shell",
    type: "item",
    name: "滴答貝殼",
    rarity: "gentle",
    icon: "shell",
    zone: "calm",
    story: "把它放在桌上，就提醒自己：只做一個很短的開始。",
    fact: "很多貝殼的螺旋形狀，是動物身體慢慢長大時形成的。",
  },
  {
    id: "item_brave_sticker",
    type: "item",
    name: "勇氣貼紙",
    rarity: "shine",
    icon: "sticker",
    zone: "study",
    story: "不是做得完美才貼，而是願意試一下就可以亮起來。",
    fact: "貼紙的背面有黏膠，壓在平滑表面時會黏得更牢。",
  },
  {
    id: "place_machu_picchu",
    type: "place",
    name: "馬丘比丘",
    rarity: "shine",
    icon: "ruins",
    zone: "morning",
    story: "山上的古城提醒你：高高的目標，也可以一步一步走上去。",
    fact: "馬丘比丘位於秘魯安第斯山脈，是著名的印加古城遺址。",
  },
  {
    id: "place_reef",
    type: "place",
    name: "大堡礁",
    rarity: "rare",
    icon: "reef",
    zone: "calm",
    story: "它會在海灣加上彩色珊瑚，提醒你休息也可以很有生命力。",
    fact: "大堡礁位於澳洲附近，由大量珊瑚礁和海洋生物組成。",
  },
  {
    id: "skill_breathing",
    type: "skill",
    name: "泡泡呼吸法",
    rarity: "gentle",
    icon: "bubble",
    zone: "calm",
    story: "抽到後會解鎖一個安定呼吸練習。",
    fact: "慢慢呼氣可以幫助身體放鬆，像把泡泡輕輕吹出去。",
    skillMission: {
      title: "練習泡泡呼吸",
      minutes: 3,
      steps: ["吸氣時心裏數 1、2、3", "像吹泡泡一樣慢慢呼氣", "重複 3 次，再說出下一小步"],
    },
  },
  {
    id: "skill_towel_fold",
    type: "skill",
    name: "毛巾摺疊術",
    rarity: "gentle",
    icon: "towel",
    zone: "home",
    story: "抽到後會解鎖一個整理小練習。",
    fact: "把毛巾摺成相同大小，放進櫃子時會更整齊，也更容易找到。",
    skillMission: {
      title: "摺好一條毛巾",
      minutes: 4,
      steps: ["把毛巾攤平", "左右對摺一次", "再對摺成小方塊並放回位置"],
    },
  },
];

const demoState = () => {
  const childId = uid("child");
  return {
    selectedChildId: childId,
    route: "home",
    kidTab: "island",
    parentTab: "overview",
    activeTaskId: null,
    activeDelayType: null,
    pendingConfirm: null,
    cardReveal: null,
    taskCelebration: null,
    pauseEncouragement: null,
    kidZoneFocus: null,
    kidTaskExpanded: false,
    onboardingStep: "profile",
    narratorTab: "guide",
    narratorCollapsed: true,
    narratorFabX: null,
    narratorFabY: null,
    narratorAutoCollapseAt: 0,
    mapZoom: 1,
    timer: { running: false, secondsLeft: 0, totalSeconds: 0, intervalId: null },
    children: [
      {
        id: childId,
        name: "小晴",
        age: 7,
        avatar: "explorer",
        companion: "Lumo",
        note: "開始前容易覺得任務太大，需要大人先陪她拆成一小步。",
        xp: 40,
        stars: 3,
        candies: 0,
        streak: 0,
        createdAt: todayKey(),
      },
    ],
    tasks: [
      {
        id: uid("task"),
        childId,
        title: "準備書包",
        area: "早晨例行",
        minutes: 8,
        xp: 20,
        icon: "bag",
        steps: ["把書包放到桌上", "按明天時間表拿書本", "把水壺和功課袋放進書包"],
        active: true,
      },
      {
        id: uid("task"),
        childId,
        title: "做功課",
        area: "學習任務",
        minutes: 15,
        xp: 40,
        icon: "book",
        steps: ["坐到書桌前", "拿出今天第一份功課", "只做第一題或第一行"],
        active: true,
      },
      {
        id: uid("task"),
        childId,
        title: "整理房間",
        area: "家務任務",
        minutes: 10,
        xp: 30,
        icon: "home",
        steps: ["先拿起地上的衣物", "把玩具放回同一個盒", "清出桌面一小角"],
        active: true,
      },
      {
        id: uid("task"),
        childId,
        title: "睡前放鬆",
        area: "晚間例行",
        minutes: 5,
        xp: 20,
        icon: "water",
        steps: ["把燈光調暗", "選一件舒服睡衣", "做三次慢慢呼吸"],
        active: true,
      },
    ],
    completions: [],
    collection: [
      { childId, cardId: "pet_lumo", count: 1, level: 1, unlockedAt: todayKey() },
    ],
    skillMissions: [],
    moodLog: [],
    rewards: [
      { id: uid("reward"), title: "親子桌遊 15 分鐘", cost: 80 },
      { id: uid("reward"), title: "選一本睡前故事", cost: 40 },
    ],
    settings: {
      demoMode: true,
      onboardingComplete: false,
      parentPin: "1234",
      parentVerified: false,
      parentPinInput: "",
      cloudSync: false,
      dataRetention: "local-only",
    },
  };
};

const STORE_VERSION = 7;
let state = loadState();
let liveClockIntervalId = null;
let narratorAutoTimerId = null;

function loadState() {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) return migrateState(JSON.parse(saved));
  } catch (error) {
    console.warn("Failed to load state", error);
  }
  return demoState();
}

function migrateState(saved) {
  if (!saved || typeof saved !== "object") return demoState();
  const base = demoState();
  const merged = {
    ...base,
    ...saved,
    settings: { ...base.settings, ...(saved.settings || {}) },
    timer: { running: false, secondsLeft: 0, totalSeconds: 0, intervalId: null },
  };
  if (merged.pauseEncouragement == null) merged.pauseEncouragement = null;
  if (!merged.onboardingStep) merged.onboardingStep = "profile";
  if (typeof merged.narratorCollapsed !== "boolean") merged.narratorCollapsed = true;
  if (typeof merged.mapZoom !== "number") merged.mapZoom = 1;
  if (typeof merged.narratorAutoCollapseAt !== "number") merged.narratorAutoCollapseAt = 0;
  if (typeof merged.settings.onboardingComplete !== "boolean") merged.settings.onboardingComplete = Boolean(saved.children?.length);
  if (!merged.settings.parentPin) merged.settings.parentPin = "1234";
  if (typeof merged.settings.parentVerified !== "boolean") merged.settings.parentVerified = false;
  if (typeof merged.settings.parentPinInput !== "string") merged.settings.parentPinInput = "";
  for (const key of ["children", "tasks", "completions", "collection", "skillMissions", "moodLog", "rewards"]) {
    if (!Array.isArray(merged[key])) merged[key] = base[key];
  }
  if (!merged.children.length) return demoState();
  if (!merged.children.some((child) => child.id === merged.selectedChildId)) {
    merged.selectedChildId = merged.children[0].id;
  }
  merged.version = STORE_VERSION;
  return merged;
}

function saveState() {
  const clean = { ...state, timer: { running: false, secondsLeft: 0, totalSeconds: 0, intervalId: null } };
  localStorage.setItem(STORE_KEY, JSON.stringify(clean));
}

function setState(patch) {
  state = { ...state, ...patch };
  saveState();
  render();
}

function selectedChild() {
  return state.children.find((child) => child.id === state.selectedChildId) || state.children[0];
}

function childTasks(childId = selectedChild()?.id) {
  return state.tasks.filter((task) => task.childId === childId && task.active);
}

function completionsFor(childId = selectedChild()?.id) {
  const taskIds = new Set(childTasks(childId).map((task) => task.id));
  return state.completions.filter((item) => taskIds.has(item.taskId));
}

function isDoneToday(taskId) {
  return state.completions.some((item) => item.taskId === taskId && item.date === todayKey());
}

function todayCompletionRate(childId = selectedChild()?.id) {
  const tasks = childTasks(childId);
  if (!tasks.length) return 0;
  const done = tasks.filter((task) => isDoneToday(task.id)).length;
  return Math.round((done / tasks.length) * 100);
}

function totalCompleted(childId = selectedChild()?.id) {
  return completionsFor(childId).length;
}

function earnedBadges(childId = selectedChild()?.id) {
  const completed = totalCompleted(childId);
  const moodStarted = state.moodLog.some((entry) => entry.childId === childId);
  return badgeCatalog.filter((badge) => {
    if (badge.id === "first_step") return completed >= 1;
    if (badge.id === "three_tasks") return completed >= 3;
    if (badge.id === "calm_start") return moodStarted && completed >= 1;
    if (badge.id === "weekly_try") return calculateStreak(childId) >= 7;
    return false;
  });
}

function collectionFor(childId = selectedChild()?.id) {
  return state.collection.filter((item) => item.childId === childId);
}

function ownedCardIds(childId = selectedChild()?.id) {
  return new Set(collectionFor(childId).map((item) => item.cardId));
}

function collectionCards(childId = selectedChild()?.id) {
  const items = collectionFor(childId);
  return cardCatalog.map((card) => ({
    ...card,
    owned: items.find((item) => item.cardId === card.id) || null,
  }));
}

function openCardPack() {
  const child = selectedChild();
  if (!child || (child.stars || 0) < 3) return;
  child.stars -= 3;
  const owned = ownedCardIds(child.id);
  const unowned = cardCatalog.filter((card) => !owned.has(card.id));
  const source = unowned.length ? unowned : cardCatalog;
  const card = source[Math.floor(Math.random() * source.length)];
  let entry = state.collection.find((item) => item.childId === child.id && item.cardId === card.id);
  let duplicate = false;
  if (entry) {
    duplicate = true;
    entry.count += 1;
    entry.level = Math.min(5, (entry.level || 1) + 1);
    child.candies = (child.candies || 0) + 1;
  } else {
    entry = { childId: child.id, cardId: card.id, count: 1, level: 1, unlockedAt: todayKey() };
    state.collection.push(entry);
    if (card.type === "skill" && card.skillMission) createSkillMission(child.id, card);
  }
  state.cardReveal = { cardId: card.id, duplicate, level: entry.level };
  saveState();
  render();
}

function createSkillMission(childId, card) {
  const exists = state.skillMissions.some((mission) => mission.childId === childId && mission.cardId === card.id);
  if (exists) return;
  state.skillMissions.push({
    id: uid("skill"),
    childId,
    cardId: card.id,
    title: card.skillMission.title,
    minutes: card.skillMission.minutes,
    steps: card.skillMission.steps,
    status: "locked",
    createdAt: todayKey(),
  });
}

function skillMissionsFor(childId = selectedChild()?.id) {
  return state.skillMissions.filter((mission) => mission.childId === childId);
}

function finalizeSkillMission(missionId) {
  const mission = state.skillMissions.find((item) => item.id === missionId);
  const child = selectedChild();
  if (!mission || !child) return;
  mission.status = "unlocked";
  mission.completedAt = todayKey();
  child.xp = (child.xp || 0) + 25;
  child.stars = (child.stars || 0) + 1;
  saveState();
  render();
}

function completeSkillMission(missionId) {
  state.pendingConfirm = {
    action: "skill-complete",
    missionId,
    title: "完成練習了嗎？",
    body: "請先和孩子一起做完練習步驟，再按確認解鎖能力。",
  };
  render();
}

function typeLabel(type) {
  return { pet: "情緒小夥伴", item: "動物圖鑑", deco: "地圖裝飾", place: "名勝", skill: "能力卡", food: "美食" }[type] || "收藏";
}

function rarityLabel(rarity) {
  return { starter: "起點", gentle: "溫柔", rare: "少見", shine: "閃亮" }[rarity] || "收藏";
}

function moodFace(mood, size = "large") {
  if (!mood) return `<div class="mood-face ${size} sky"><span class="mood-orb"></span><span class="mood-mouth neutral"></span></div>`;
  return `
    <div class="mood-face ${size} ${mood.tint || "sky"}">
      <span class="mood-eye left"></span>
      <span class="mood-eye right"></span>
      <span class="mood-mouth ${mood.id}"></span>
      <span class="mood-orb ${mood.icon}"></span>
    </div>
  `;
}

function cardZoneLabel(card) {
  return zoneCatalog.find((zone) => zone.id === card.zone)?.name || "小任務島";
}

function cardTypeNudge(card) {
  const copy = {
    pet: "新夥伴會陪你在島上繼續探索。",
    item: "新物件會成為你開始任務的小提示。",
    deco: "新裝飾會慢慢把島變成你的世界。",
    place: "世界名勝卡會把真實地方帶進探索地圖。",
    skill: "能力卡會解鎖一個生活小秘技任務。",
    food: "美食卡會收藏不同地方的小知識。",
  };
  return copy[card.type] || "新的收藏已加入圖鑑。";
}

function icon(name) {
  const icons = {
    bag: "🎒",
    book: "📘",
    home: "🏠",
    moon: "🌙",
    explorer: "🧭",
    fox: "🧭",
    star: "⭐",
    timer: "⏱",
    spark: "✨",
    cloud: "☁️",
    swirl: "🌀",
    shield: "🛡",
    boat: "⛵",
    leaf: "🌿",
    water: "💧",
    heart: "💛",
    sprout: "🌱",
    lighthouse: "🗼",
    lumo: "✦",
    pebble: "🪨",
    lantern: "🏮",
    flag: "🚩",
    card: "🃏",
    candy: "🍬",
    cat: "🐱",
    turtle: "🐢",
    worrybeast: "😟",
    dino: "🦖",
    compass: "🧭",
    mountain: "🗻",
    tower: "🗼",
    pyramid: "🔺",
    wall: "🧱",
    shoe: "👟",
    paper: "📄",
    stretch: "🙆",
    knot: "🪢",
    sheep: "🐑",
    crab: "🦀",
    shell: "🐚",
    sticker: "🏅",
    ruins: "⛰️",
    reef: "🪸",
    bubble: "🫧",
    towel: "🧺",
    rice: "🍙",
  };
  return icons[name] || name?.slice(0, 1)?.toUpperCase() || "*";
}

function childAvatarMarkup(size = "chip") {
  return `
    <span class="child-avatar-figure ${size}">
      <span class="child-avatar-hat"></span>
      <span class="child-avatar-hair"></span>
      <span class="child-avatar-face">
        <span class="child-avatar-eye left"></span>
        <span class="child-avatar-eye right"></span>
        <span class="child-avatar-smile"></span>
      </span>
      <span class="child-avatar-neck"></span>
      <span class="child-avatar-shirt"></span>
    </span>
  `;
}

function appNav() {
  const items = [
    ["onboarding", "建立人物"],
    ["home", "首頁"],
    ["kid", "孩子端"],
    ["parent", "家長端"],
  ];
  return `
    <header class="topbar">
      <button class="brand" onclick="go('home')" aria-label="返回首頁">
        <span class="brand-mark">${icon("sprout")}</span>
        QuestKids 小任務島
      </button>
      <nav class="nav" aria-label="主要導覽">
        ${items
          .map(
            ([route, label]) =>
              `<button class="${state.route === route ? "active" : ""}" onclick="go('${route}')">${label}</button>`,
          )
          .join("")}
        ${state.settings?.demoMode ? `<span class="pill active">示範資料</span>` : ""}
        <button onclick="resetDemo()">重置 demo</button>
      </nav>
    </header>
    ${
      ["kid", "detect", "quest"].includes(state.route)
        ? `<nav class="bottom-tabbar" aria-label="孩子端底部導覽">
            <button class="${state.route === "kid" && state.kidTab === "island" ? "active" : ""}" onclick="setKidTab('island')">${icon("sprout")}<span>小任務島</span></button>
            <button class="${state.route === "kid" && state.kidTab === "achievements" ? "active" : ""}" onclick="setKidTab('achievements')">${icon("star")}<span>成就</span></button>
            <button class="${state.route === "kid" && state.kidTab === "collection" ? "active" : ""}" onclick="setKidTab('collection')">${icon("book")}<span>圖鑑</span></button>
            <button onclick="go('parent')">${icon("shield")}<span>家長</span></button>
          </nav>`
        : ""
    }
  `;
}

function render() {
  const app = document.querySelector("#app");
  const route = state.route || "home";
  app.innerHTML = `
    <div class="shell route-${route}">
      ${appNav()}
      <main class="main">
        ${route === "onboarding" ? onboardingView() : ""}
        ${route === "home" ? homeView() : ""}
        ${route === "kid" ? kidView() : ""}
        ${route === "detect" ? detectView() : ""}
        ${route === "quest" ? questView() : ""}
      ${route === "parent" ? parentView() : ""}
      </main>
      ${floatingNarratorWidget(route)}
      ${route === "kid" && shouldShowMoodModal() ? moodModal() : ""}
      ${state.pendingConfirm ? confirmModal() : ""}
      ${state.taskCelebration ? taskCelebrationModal() : ""}
      ${state.cardReveal ? cardRevealModal() : ""}
      ${state.pauseEncouragement ? pauseEncouragementModal() : ""}
    </div>
  `;
  initMapInteractions();
  initFloatingWidgets();
  initLiveClock();
  initMagicPreview();
}

function cardRevealModal() {
  const reveal = state.cardReveal;
  const card = cardCatalog.find((item) => item.id === reveal.cardId);
  return `
    <div class="modal-backdrop card-reveal-backdrop" role="dialog" aria-modal="true" aria-labelledby="card-title">
      <div class="modal card-modal pack-modal">
        <div class="pack-burst" aria-hidden="true"></div>
        <span class="tag">${reveal.duplicate ? "卡片升級" : "新收藏發現"}</span>
        <div class="collectible-card reveal ${card.rarity}">
          <div class="shine-line" aria-hidden="true"></div>
          <div class="card-rarity">${rarityLabel(card.rarity)} · ${typeLabel(card.type)}</div>
          <div class="card-portrait">
            <div class="card-icon">${icon(card.icon)}</div>
          </div>
          <h2 id="card-title">${card.name}</h2>
          <p class="card-story">${card.story}</p>
          <div class="card-meta-row">
            <span>${icon(zoneCatalog.find((zone) => zone.id === card.zone)?.icon || "sprout")} ${cardZoneLabel(card)}</span>
            <span>Lv.${reveal.level}</span>
          </div>
          <p class="fact-box">小知識：${card.fact}</p>
          <p class="card-nudge">${cardTypeNudge(card)}</p>
          ${card.type === "skill" && !reveal.duplicate ? `<p class="notice">已加入「能力任務」。完成練習後，這張能力卡就會真正解鎖。</p>` : ""}
        </div>
        <div class="row">
          <button class="button primary" onclick="viewRevealedCard()">去圖鑑看看</button>
          <button class="button" onclick="closeCardReveal()">收好</button>
        </div>
      </div>
    </div>
  `;
}

function closeCardReveal() {
  state.cardReveal = null;
  saveState();
  render();
}

function viewRevealedCard() {
  state.cardReveal = null;
  state.route = "kid";
  state.kidTab = "collection";
  saveState();
  render();
}

function go(route) {
  if (route === "parent") state.settings.parentVerified = false;
  state.route = route;
  if (route === "kid" && !state.kidTab) state.kidTab = "island";
  if (route === "kid") wakeNarrator("guide");
  if (route !== "kid") state.kidZoneFocus = null;
  if (route !== "kid") state.kidTaskExpanded = false;
  saveState();
  render();
}

function setKidTab(tab) {
  state.route = "kid";
  state.kidTab = tab;
  if (tab !== "island") state.kidZoneFocus = null;
  if (tab !== "island") state.kidTaskExpanded = false;
  saveState();
  render();
}

function selectMapZone(zoneId) {
  state.kidZoneFocus = state.kidZoneFocus === zoneId ? null : zoneId;
  state.kidTaskExpanded = false;
  if (state.kidZoneFocus) wakeNarrator("guide");
  saveState();
  render();
}

function setMapZoom(nextZoom) {
  state.mapZoom = Math.max(0.92, Math.min(1.22, Number(nextZoom) || 1));
  saveState();
  render();
}

function toggleKidTaskExpanded() {
  state.kidTaskExpanded = !state.kidTaskExpanded;
  saveState();
  render();
}

function setNarratorTab(tab) {
  state.narratorTab = tab;
  saveState();
  render();
}

function setNarratorCollapsed(collapsed) {
  state.narratorCollapsed = collapsed;
  if (collapsed) state.narratorAutoCollapseAt = 0;
  saveState();
  render();
}

function wakeNarrator(tab = "guide") {
  state.narratorTab = tab;
  state.narratorCollapsed = false;
  state.narratorAutoCollapseAt = Date.now() + 6500;
}

function setNarratorFabPosition(x, y) {
  state.narratorFabX = x;
  state.narratorFabY = y;
  saveState();
}

function initLiveClock() {
  clearInterval(liveClockIntervalId);
  const update = () => {
    const clock = document.querySelector("[data-live-clock]");
    const date = document.querySelector("[data-live-date]");
    if (!clock || !date) return;
    const parts = clockParts();
    clock.textContent = parts.time;
    date.textContent = parts.day;
  };
  update();
  if (document.querySelector("[data-live-clock]")) {
    liveClockIntervalId = setInterval(update, 30000);
  }
}

function onboardingView() {
  const child = selectedChild() || state.children[0];
  const children = state.children || [];
  return `
    <section class="onboarding-board">
      <div class="onboarding-art">
        <div class="shore-card">
          <span class="tag">建立人物檔案</span>
          <h1>歡迎來到小任務島！</h1>
          <div class="big-avatar child-avatar-shell">${childAvatarMarkup("map")}</div>
          <div class="lumo-choice">${icon("lumo")} 夥伴：Lumo</div>
          <p class="muted">選好人物後，任務時間會按年齡自動變得剛剛好。</p>
        </div>
      </div>
      <form class="onboarding-form panel" onsubmit="saveOnboarding(event)">
        <div class="section-title">
          <div>
            <span class="tag">0</span>
            <h2>建立人物檔案</h2>
          </div>
        </div>
        <label>
          <span>名字</span>
          <input name="name" value="${esc(child?.name || "小明")}" maxlength="12" />
        </label>
        <label>
          <span>年齡</span>
          <select name="age">
            ${[5, 6, 7, 8, 9, 10]
              .map((age) => `<option value="${age}" ${Number(child?.age || 7) === age ? "selected" : ""}>${age} 歲</option>`)
              .join("")}
          </select>
        </label>
        <div class="avatar-picker" aria-label="選擇角色">
          ${["explorer", "brave", "calm"]
            .map((avatar, index) => `<button type="button" class="${(child?.avatar || "explorer") === avatar ? "active" : ""}" onclick="setOnboardingAvatar('${avatar}')">${childAvatarMarkup(index === 0 ? "chip" : "narrator")}</button>`)
            .join("")}
        </div>
        <div class="profile-switcher">
          <span class="muted">選擇孩子</span>
          ${children
            .map(
              (item) => `
                <button type="button" class="${item.id === state.selectedChildId ? "active" : ""}" onclick="selectChild('${item.id}')">
                  ${esc(item.name)}
                </button>
              `,
            )
            .join("")}
        </div>
        <div class="timer-default-note">
          <strong>${formatSeconds(timerSecondsForAge(Number(child?.age || 7)))}</strong>
          <span>預設專注時間</span>
        </div>
        <button class="button primary large" type="submit">開始冒險吧！</button>
      </form>
    </section>
  `;
}

function setOnboardingAvatar(avatar) {
  const child = selectedChild();
  if (!child) return;
  child.avatar = avatar;
  saveState();
  render();
}

function saveOnboarding(event) {
  event.preventDefault();
  const child = selectedChild();
  if (!child) return;
  const data = new FormData(event.target);
  child.name = (data.get("name") || child.name || "小明").toString().trim().slice(0, 12);
  child.age = Number(data.get("age") || child.age || 7);
  child.companion = "Lumo";
  state.settings.onboardingComplete = true;
  state.route = "kid";
  state.kidTab = "island";
  saveState();
  render();
}

function homeView() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <span class="tag">5-10 歲親子任務練習</span>
        <h1>把「拖延」變成一個可以開始的小任務。</h1>
        <p>
          QuestKids 用心情確認、任務拆解和視覺化計時，幫家長陪孩子建立開始的能力。
          重點不是催促，而是把第一步變得夠細、夠清楚、夠容易。
        </p>
        <div class="hero-actions">
          <button class="button large primary" onclick="go('kid')">開始孩子端</button>
          <button class="button large" onclick="go('parent')">進入家長端</button>
        </div>
        <div class="badge-row">
          <span class="small-tag">情緒先行</span>
          <span class="small-tag">短衝刺</span>
          <span class="small-tag">本地保存</span>
          <span class="small-tag">Demo mode</span>
        </div>
      </div>
      <div class="hero-art" aria-label="小任務島插圖">
        ${islandMap({ compact: true })}
      </div>
    </section>
    <section class="grid cols-3">
      ${featureCard("心情確認", "先了解孩子狀態，再選擇合適的開始方式。")}
      ${featureCard("拖延類型", "分辨是不知從何開始、怕失敗，還是被即時誘惑拉走。")}
      ${featureCard("家長話術", "提供短句，幫家長由催促轉成陪伴和引導。")}
    </section>
  `;
}

function featureCard(title, body) {
  return `<article class="card"><h3>${title}</h3><p class="muted">${body}</p></article>`;
}

function zoneForTask(task) {
  return (
    zoneCatalog.find((zone) => zone.areas.some((area) => task.area.includes(area) || area.includes(task.area))) ||
    zoneCatalog[1]
  );
}

function zoneStats(childId = selectedChild()?.id) {
  return zoneCatalog.map((zone) => {
    const tasks = childTasks(childId).filter((task) => zoneForTask(task).id === zone.id);
    const done = tasks.filter((task) => isDoneToday(task.id)).length;
    return {
      ...zone,
      total: tasks.length,
      done,
      progress: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
    };
  });
}

function nextTaskForZone(zoneId, childId = selectedChild()?.id) {
  return childTasks(childId).find((task) => zoneForTask(task).id === zoneId && !isDoneToday(task.id));
}

function islandMap(options = {}) {
  const child = selectedChild();
  const zones = child ? zoneStats(child.id) : zoneCatalog.map((zone) => ({ ...zone, total: 0, done: 0, progress: 0 }));
  const overall = child ? todayCompletionRate(child.id) : 0;
  const zoom = Number(state.mapZoom || 1);
  const canvasWidth = Math.round(760 * zoom);
  const canvasHeight = Math.round(560 * zoom);
  const focusedZone = state.kidZoneFocus ? zones.find((zone) => zone.id === state.kidZoneFocus) : null;
  const zoneTask = focusedZone ? nextTaskForZone(focusedZone.id, child?.id) : null;
  return `
    <div class="map-card illustrated ${options.compact ? "compact" : ""}">
      <div class="map-toolbar" aria-label="地圖操作">
        <span>${icon("spark")} 拖動地圖探索</span>
        <div class="map-zoom">
          <button type="button" onclick="setMapZoom(${(zoom - 0.1).toFixed(2)})" aria-label="縮小地圖">−</button>
          <button type="button" onclick="setMapZoom(1)" aria-label="重設地圖">1x</button>
          <button type="button" onclick="setMapZoom(${(zoom + 0.1).toFixed(2)})" aria-label="放大地圖">+</button>
        </div>
      </div>
      <div class="map-scroll" data-map-scroll>
        <div class="map-canvas" style="width:${canvasWidth}px; height:${canvasHeight}px;">
          <div class="map-sky"></div>
          <div class="island-shape"></div>
          <div class="island-path"></div>
          <div class="companion" title="Lumo 光點夥伴">${icon("lumo")}</div>
          <div class="explorer" title="小任務探索員">${childAvatarMarkup("map")}</div>
          ${zones
            .map(
              (zone, index) => `
                <button class="zone zone-${index + 1} ${zone.theme} ${state.kidZoneFocus === zone.id ? "active" : ""}" type="button" aria-label="${zone.name}，本區任務 ${zone.done}/${zone.total || 0}，完成 ${zone.progress}%" onclick="selectMapZone('${zone.id}')">
                  <span class="zone-pin">${icon(zone.icon)}</span>
                  <span class="zone-label">
                    <strong class="zone-title">${zone.name}</strong>
                    <small class="zone-meta">${zone.progress}%</small>
                  </span>
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
      ${
        focusedZone
          ? `
            <div class="map-zone-dock ${focusedZone.theme}">
              <div>
                <span>${icon(focusedZone.icon)} ${focusedZone.name}</span>
                <strong>${focusedZone.done}/${focusedZone.total || 0}</strong>
              </div>
              <p>${zoneTask ? esc(firstStepForTask(zoneTask)) : "這一區今天已經亮起來了。"}</p>
              ${
                zoneTask
                  ? `<button class="button primary" onclick="startTask('${zoneTask.id}')">開始第一步</button>`
                  : `<button class="button ghost" onclick="selectMapZone('${focusedZone.id}')">返回地圖</button>`
              }
            </div>
          `
          : ""
      }
      <div class="map-progress">
        <span>今日島嶼進度</span>
        <strong>${overall}%</strong>
        <div class="progress"><span style="--value:${overall}%"></span></div>
      </div>
    </div>
  `;
}

function shouldShowMoodModal() {
  const child = selectedChild();
  if (!child) return false;
  if (state.route !== "kid") return false;
  return !state.moodLog.some((entry) => entry.childId === child.id && entry.date === todayKey());
}

function moodModal() {
  return `
    <div class="modal-backdrop mood-backdrop" role="dialog" aria-modal="true" aria-labelledby="mood-title">
      <div class="modal">
        <h2 id="mood-title">今天開始前，先看看心情</h2>
        <p class="muted">選一個最接近現在的感覺。心情會同步到家長儀表板，幫大人用更合適的方法陪你開始。</p>
        <div class="mood-grid">
          ${moods
            .map(
              (mood) => `
                <button class="mood-button" onclick="recordMood('${mood.id}')">
                  ${moodFace(mood, "small")}
                  <strong>${mood.label}</strong>
                  <small>${mood.note}</small>
                </button>
              `,
            )
            .join("")}
        </div>
        <button class="button ghost" onclick="skipMood()">跳過</button>
      </div>
    </div>
  `;
}

function recordMood(moodId) {
  const child = selectedChild();
  state.moodLog.push({ id: uid("mood"), childId: child.id, moodId, date: todayKey(), createdAt: new Date().toISOString() });
  if (moodId === "worry" || moodId === "resist") {
    state.kidZoneFocus = "calm";
    state.kidTaskExpanded = true;
  }
  saveState();
  render();
}

function skipMood() {
  const child = selectedChild();
  if (!child) return;
  state.moodLog.push({ id: uid("mood"), childId: child.id, moodId: "skipped", date: todayKey(), skipped: true, createdAt: new Date().toISOString() });
  saveState();
  render();
}

function kidView() {
  const child = selectedChild();
  if (!child) return `<div class="empty">請先在家長端新增孩子。</div>`;
  const tasks = childTasks(child.id);
  const rate = todayCompletionRate(child.id);
  const badges = earnedBadges(child.id);
  const streak = calculateStreak(child.id);
  const ownedCards = collectionCards(child.id).filter((card) => card.owned);
  const skillMissions = skillMissionsFor(child.id);
  const latestMood = state.moodLog
    .filter((entry) => entry.childId === child.id)
    .slice(-1)[0];
  const mood = moods.find((item) => item.id === latestMood?.moodId);
  return `
    <section class="kid-app">
      ${kidLandscapeView({ child, tasks, rate, mood })}
      <div class="kid-homebar">
        <div class="profile-chip">
          <div class="avatar child-avatar-shell">${childAvatarMarkup("chip")}</div>
          <div>
          <strong>${esc(child.name)}</strong>
          <span>${child.age} 歲 · ${esc(child.companion || "Lumo")}</span>
          </div>
        </div>
        <div class="coin-chip">${icon("star")} ${child.xp || 0}</div>
      </div>
      ${(state.kidTab || "island") === "island" ? `<div class="daily-nudge">${icon("star")} <span>你今天已經做得很好，繼續一步一步來！</span></div>` : ""}
      ${state.kidTab === "achievements" ? kidAchievementsView({ child, badges, skillMissions, streak }) : ""}
      ${state.kidTab === "collection" ? kidCollectionView({ child, ownedCards }) : ""}
      ${(state.kidTab || "island") === "island" ? kidIslandView({ child, tasks, rate, mood }) : ""}
    </section>
  `;
}

function clockParts(date = new Date()) {
  const time = new Intl.DateTimeFormat("zh-Hant-HK", {
    timeZone: "Asia/Hong_Kong",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  const day = new Intl.DateTimeFormat("zh-Hant-HK", {
    timeZone: "Asia/Hong_Kong",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
  return { time, day };
}

function landscapeMessage(rate, remaining) {
  if (!remaining) return "今日任務已全部完成，小島已經亮起來了。";
  if (rate >= 50) return `還有 ${remaining} 個小任務，慢慢做就可以。`;
  return "先選一個最容易開始的小任務。";
}

function kidLandscapeView({ child, tasks, rate, mood }) {
  const { time, day } = clockParts();
  const orderedTasks = [...tasks].sort((a, b) => Number(isDoneToday(a.id)) - Number(isDoneToday(b.id)));
  const remaining = orderedTasks.filter((task) => !isDoneToday(task.id)).length;
  return `
    <section class="landscape-dock" aria-label="橫向小任務鐘">
      <div class="landscape-clock-panel">
        <div class="clock-companion" aria-hidden="true">
          <span class="clock-face">${icon(child.companion ? "lumo" : "star")}</span>
          <span class="clock-spark spark-one">${icon("star")}</span>
          <span class="clock-spark spark-two">${icon("sprout")}</span>
        </div>
        <div>
          <span class="landscape-tag">小任務鐘</span>
          <strong class="live-clock" data-live-clock>${time}</strong>
          <span class="live-date" data-live-date>${day}</span>
        </div>
        <p>${landscapeMessage(rate, remaining)}</p>
      </div>

      <div class="landscape-task-panel">
        <div class="landscape-task-head">
          <div>
            <span class="landscape-tag">${esc(child.name)} 今日</span>
            <h2>任務 ${tasks.length - remaining}/${tasks.length || 0}</h2>
          </div>
          <div class="landscape-ring" style="--value:${rate}%"><strong>${rate}%</strong></div>
        </div>
        <div class="landscape-task-list">
          ${
            orderedTasks.length
              ? orderedTasks.map(landscapeTaskItem).join("")
              : `<div class="empty">今日未有任務。</div>`
          }
        </div>
        <div class="landscape-footer">
          ${moodFace(mood, "small")}
          <span>${mood ? mood.label : "未選擇心情"}</span>
        </div>
      </div>
    </section>
  `;
}

function landscapeTaskItem(task) {
  const done = isDoneToday(task.id);
  return `
    <button class="landscape-task-item ${done ? "done" : ""}" type="button" onclick="${done ? "setKidTab('island')" : `startTask('${task.id}')`}">
      <span class="landscape-task-icon">${done ? "✓" : icon(task.icon)}</span>
      <span>
        <strong>${esc(task.title)}</strong>
        <small>${task.minutes} 分鐘</small>
      </span>
    </button>
  `;
}

function kidIslandView({ child, tasks, rate, mood }) {
  const focusedZone = state.kidZoneFocus ? zoneCatalog.find((zone) => zone.id === state.kidZoneFocus) : null;
  const filteredTasks = focusedZone ? tasks.filter((task) => zoneForTask(task).id === focusedZone.id) : tasks;
  const orderedTasks = [...filteredTasks].sort((a, b) => Number(isDoneToday(a.id)) - Number(isDoneToday(b.id)));
  const allDone = orderedTasks.length > 0 && orderedTasks.every((task) => isDoneToday(task.id));
  const visibleTasks = state.kidTaskExpanded || allDone ? orderedTasks : orderedTasks.slice(0, 3);
  const stars = child.stars || 0;
  const packProgress = Math.min(100, Math.round((stars / 3) * 100));
  const starsNeeded = Math.max(0, 3 - stars);
  const focusMission = skillMissionsFor(child.id).find((mission) => mission.status !== "unlocked");
  const focusTask = orderedTasks.find((task) => !isDoneToday(task.id));
  const focusZone = focusTask ? zoneForTask(focusTask) : null;
  return `
    <section class="island-hero">
      <div class="section-title island-title">
        <div>
          <span class="tag">今天 ${todayKey()}</span>
          <h1>小任務島</h1>
        </div>
        <strong>${rate}%</strong>
      </div>
      ${islandMap()}
    </section>

    ${
      focusedZone?.id === "calm"
        ? `
          <section class="panel warmup-panel">
            <div>
              <span class="tag">${icon("water")} 平靜海灣暖身任務</span>
              <h2>冇問題，休息一下！</h2>
              <p class="muted">先做一個很輕的小暖身，Lumo 會等你慢慢回來。</p>
            </div>
            <div class="warmup-steps">
              <span>深呼吸三次</span>
              <span>情緒小日記</span>
              <span>伸展小運動</span>
            </div>
          </section>
        `
        : ""
    }

    ${
      focusTask
        ? `
          <section class="panel first-step-panel">
            <div>
              <span class="tag">${icon("spark")} 第一步魔法卡</span>
              <h2>${esc(focusTask.title)}</h2>
              <p class="muted">${focusZone ? `${focusZone.name} · ` : ""}先開始這一步就可以，未需要想完整個任務。</p>
            </div>
            <div class="first-step-card">
              <strong>${esc(firstStepForTask(focusTask))}</strong>
              <p>做完第一步，再決定要不要繼續下一步。</p>
            </div>
            <div class="row">
              <button class="button primary" onclick="startTask('${focusTask.id}')">先做這一步</button>
              <span class="small-tag">${focusTask.minutes} 分鐘任務</span>
            </div>
          </section>
        `
        : `
          <section class="panel first-step-panel done">
            <div>
              <span class="tag">${icon("star")} 第一步魔法卡</span>
              <h2>今天已經全部開始過了</h2>
              <p class="muted">你不是一下子做完全部，而是一小步一小步完成的。</p>
            </div>
          </section>
        `
    }

    <section class="task-dashboard">
      <div class="panel today-card">
        <div class="section-title">
          <div>
            <h2>${focusedZone ? `${focusedZone.name} 任務` : "今日任務"}</h2>
            ${focusedZone ? `<p class="muted zone-focus-copy">已按地圖聚焦這一區的小任務。</p>` : ""}
          </div>
          <span class="small-tag">${filteredTasks.filter((task) => isDoneToday(task.id)).length}/${filteredTasks.length || 0}</span>
        </div>
        ${
          focusedZone
            ? `<div class="zone-filter-row"><span class="small-tag">${icon(focusedZone.icon)} ${focusedZone.name}</span><button class="button ghost" onclick="selectMapZone('${focusedZone.id}')">顯示全部</button></div>`
            : ""
        }
        <div class="mini-task-list">
          ${
            visibleTasks.length
              ? visibleTasks.map(taskMiniCard).join("")
              : `<div class="empty">${focusedZone ? "這一區暫時未有任務。試試按其他地方。" : "今日未有任務。請到家長端新增。"}</div>`
          }
          ${
            orderedTasks.length > visibleTasks.length
              ? `<button class="button ghost more-tasks-note" onclick="toggleKidTaskExpanded()">顯示餘下 ${filteredTasks.length - visibleTasks.length} 個小任務</button>`
              : state.kidTaskExpanded && orderedTasks.length > 3 && !allDone
                ? `<button class="button ghost more-tasks-note" onclick="toggleKidTaskExpanded()">收起額外任務</button>`
                : allDone && orderedTasks.length > 3
                  ? `<div class="more-tasks-note complete">今日任務已全部完成</div>`
                : ""
          }
        </div>
      </div>

      <div class="dashboard-side">
        <article class="mini-widget mood-widget">
          <span class="muted">心情</span>
          ${moodFace(mood, "large")}
          <p>${mood ? mood.label : "未選擇"}</p>
        </article>
        <article class="mini-widget progress-widget">
          <span class="muted">我的進度</span>
          <strong>${totalCompleted(child.id)}</strong>
          <p>小任務完成</p>
        </article>
      </div>
    </section>

    <section class="panel collection-hero">
      <div>
        <span class="tag">${icon("card")} 任務卡包</span>
        <h2>收集夥伴、物件和地圖裝飾</h2>
        <p class="muted">${starsNeeded ? `再完成 ${starsNeeded} 個小任務就可以開一包。` : "探索星已集齊，可以開一包。"}</p>
        <div class="pack-teasers">
          <span>${icon("cat")} 夥伴</span>
          <span>${icon("tower")} 名勝</span>
          <span>${icon("shoe")} 能力</span>
        </div>
      </div>
      <div class="pack-box">
        <div class="pack-art">${icon("card")}</div>
        <strong>${stars}/3 探索星</strong>
        <div class="pack-progress"><span style="--value:${packProgress}%"></span></div>
        <button class="button primary" ${stars >= 3 ? "" : "disabled"} onclick="openCardPack()">開卡包</button>
      </div>
    </section>

    ${
      focusMission
        ? `
          <section class="panel mission-spotlight">
            <div>
              <span class="tag">${icon("sprout")} 能力任務焦點</span>
              <h2>${esc(focusMission.title)}</h2>
              <p class="muted">抽到的能力卡已經變成實際小任務，完成後就會真正解鎖。</p>
            </div>
            <button class="button primary" onclick="setKidTab('achievements')">去完成</button>
          </section>
        `
        : ""
    }
  `;
}

function kidAchievementsView({ child, badges, skillMissions, streak }) {
  return `
    <section class="kid-page-head">
      <span class="tag">${icon("star")} 成就</span>
      <h1>今天學到的能力</h1>
      <p class="muted">徽章、生活小秘技和連續練習都放在這裡。</p>
    </section>
    <section class="stats">
      ${statCard("連續日數", `${streak} 天`)}
      ${statCard("探索星", child.stars || 0)}
      ${statCard("糖果", child.candies || 0)}
      ${statCard("徽章", badges.length)}
    </section>
    <section class="panel">
      <div class="section-title">
        <div>
          <h2>能力任務</h2>
          <p class="muted">抽到生活小秘技後，完成練習才會真正解鎖能力。</p>
        </div>
      </div>
      <div class="grid">
        ${
          skillMissions.length
            ? skillMissions.map(skillMissionCard).join("")
            : `<div class="empty">還未抽到能力卡。完成任務開卡包，可能會遇到生活小秘技。</div>`
        }
      </div>
    </section>
    <section class="panel">
      <div class="section-title">
        <h2>我的徽章</h2>
        <span class="muted">${badges.length}/${badgeCatalog.length}</span>
      </div>
      <div class="grid cols-4">
        ${badgeCatalog
          .map((badge) => {
            const earned = badges.some((item) => item.id === badge.id);
            return `<article class="card ${earned ? "" : "muted"}"><div class="avatar">${icon(badge.icon)}</div><h3>${badge.name}</h3><p class="muted">${badge.rule}</p></article>`;
          })
          .join("")}
      </div>
    </section>
  `;
}

function kidCollectionView({ child, ownedCards }) {
  const stars = child.stars || 0;
  const packProgress = Math.min(100, Math.round((stars / 3) * 100));
  const dinosaurOwned = ownedCards.filter((card) => /恐龍|龍|dino/i.test(`${card.name} ${card.story}`)).length;
  return `
    <section class="kid-page-head">
      <span class="tag">${icon("book")} 探索圖鑑</span>
      <h1>夥伴、物件和世界名勝</h1>
      <p class="muted">每張卡都有一個小知識，慢慢把小任務島變成自己的世界。</p>
    </section>
    <section class="panel collection-hero">
      <div>
        <span class="tag">${icon("card")} 任務卡包</span>
        <h2>${ownedCards.length}/${cardCatalog.length} 已發現</h2>
        <p class="muted">探索星：${child.stars || 0} · 成長糖果：${child.candies || 0}</p>
      </div>
      <div class="pack-box">
        <div class="pack-art">${icon("card")}</div>
        <strong>${stars}/3 探索星</strong>
        <div class="pack-progress"><span style="--value:${packProgress}%"></span></div>
        <button class="button primary" ${stars >= 3 ? "" : "disabled"} onclick="openCardPack()">開卡包</button>
      </div>
    </section>
    <section class="panel">
      <div class="section-title">
        <h2>圖鑑</h2>
        <span class="muted">${ownedCards.length}/${cardCatalog.length}</span>
      </div>
      <div class="collection-tabs">
        <span>情緒小夥伴</span>
        <span>動物圖鑑</span>
        <span>能力卡</span>
        <span>名勝</span>
        <span>美食</span>
      </div>
      <div class="series-progress">
        <strong>恐龍系列 12/25</strong>
        <span class="muted">已發現 ${Math.max(1, dinosaurOwned)} 張</span>
      </div>
      <div class="collection-grid">
        ${collectionCards(child.id).map((card) => collectibleCard(card)).join("")}
      </div>
    </section>
  `;
}

function collectibleCard(card) {
  const owned = card.owned;
  const mission = card.type === "skill" ? state.skillMissions.find((item) => item.childId === selectedChild()?.id && item.cardId === card.id) : null;
  return `
    <article class="collectible-card ${owned ? card.rarity : "locked"}">
      <div class="card-rarity">${owned ? rarityLabel(card.rarity) : "未發現"}</div>
      <div class="card-icon">${owned ? icon(card.icon) : "?"}</div>
      <h3>${owned ? card.name : "神秘收藏"}</h3>
      <p class="muted">${owned ? card.story : "完成任務、打開卡包後會慢慢遇到。"}</p>
      ${owned ? `<p class="fact-box">小知識：${card.fact}</p>` : ""}
      <span class="small-tag">${owned ? `${typeLabel(card.type)} · ${mission?.status === "unlocked" ? "已解鎖" : `Lv.${owned.level || 1}`}` : "等待發現"}</span>
    </article>
  `;
}

function skillMissionCard(mission) {
  const card = cardCatalog.find((item) => item.id === mission.cardId);
  return `
    <article class="skill-card ${mission.status === "unlocked" ? "done" : ""}">
      <div class="task-icon">${icon(card.icon)}</div>
      <div>
        <h3>${esc(mission.title)}</h3>
        <p class="muted">${card.story}</p>
        <p class="notice">完成練習後解鎖能力</p>
        <ol class="skill-steps">
          ${mission.steps.map((step) => `<li>${esc(step)}</li>`).join("")}
        </ol>
        <span class="small-tag">${mission.minutes} 分鐘 · ${mission.status === "unlocked" ? "已解鎖" : "練習後解鎖"}</span>
      </div>
      ${
        mission.status === "unlocked"
          ? `<span class="tag">已學會</span>`
          : `<button class="button primary" onclick="completeSkillMission('${mission.id}')">完成練習</button>`
      }
    </article>
  `;
}

function statCard(label, value) {
  return `<div class="stat"><span class="muted">${label}</span><strong>${value}</strong></div>`;
}

function taskCard(task) {
  const done = isDoneToday(task.id);
  const zone = zoneForTask(task);
  return `
    <article class="task-card ${done ? "done" : ""}">
      <div class="task-icon">${done ? "OK" : icon(task.icon)}</div>
      <div>
        <h3>${esc(task.title)}</h3>
        <div class="task-meta">
          <span>${icon(zone.icon)} ${zone.name}</span>
          <span>${esc(task.area)}</span>
          <span>${task.minutes} 分鐘</span>
          <span>+${task.xp} XP</span>
        </div>
      </div>
      ${
        done
          ? `<span class="tag">已完成</span>`
          : `<button class="button primary" onclick="startTask('${task.id}')">開始</button>`
      }
    </article>
  `;
}

function taskMiniCard(task) {
  const done = isDoneToday(task.id);
  const zone = zoneForTask(task);
  return `
    <article class="mini-task ${done ? "done" : ""}">
      <div class="task-icon">${done ? "OK" : icon(task.icon)}</div>
      <div>
        <h3>${esc(task.title)}</h3>
        <div class="mini-progress-row">
          <div class="progress"><span style="--value:${done ? 100 : 35}%"></span></div>
          <small>${task.minutes} 分鐘</small>
        </div>
      </div>
      ${
        done
          ? `<span class="mini-check">✓</span>`
          : `<button class="button primary" onclick="startTask('${task.id}')">開始</button>`
      }
    </article>
  `;
}

function startTask(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  state.activeTaskId = taskId;
  state.activeDelayType = null;
  state.route = "detect";
  wakeNarrator("guide");
  if (task) resetTimerForTask(task);
  saveState();
  render();
}

function enterQuest() {
  const task = state.tasks.find((item) => item.id === state.activeTaskId);
  if (task) resetTimerForTask(task);
  state.route = "quest";
  saveState();
  render();
}

function detectView() {
  const task = state.tasks.find((item) => item.id === state.activeTaskId);
  if (!task) return `<div class="empty">找不到任務。<button class="button" onclick="go('kid')">返回孩子端</button></div>`;
  return `
    <section class="grid">
      <button class="button" onclick="go('kid')">返回</button>
      <div class="section-title">
        <div>
          <span class="tag">${esc(task.title)}</span>
          <h1>今日比較像哪一種卡住？</h1>
          <p class="muted">選一個最接近的狀態，我們會用不同方法拆細任務。</p>
        </div>
      </div>
      <div class="type-grid">
        ${delayTypes
          .map(
            (type) => `
              <button class="type-button ${state.activeDelayType === type.id ? "selected" : ""}" onclick="selectDelayType('${type.id}')">
                <span class="emoji">${icon(type.icon)}</span>
                <h3>${type.title}</h3>
                <p>${type.summary}</p>
                <span class="small-tag">${type.strategy}</span>
                <p class="muted">${type.risk}</p>
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="row">
        <button class="button large primary" ${state.activeDelayType ? "" : "disabled"} onclick="enterQuest()">進入小任務</button>
        <button class="button ghost" onclick="skipDelayType()">跳過</button>
      </div>
    </section>
  `;
}

function selectDelayType(typeId) {
  state.activeDelayType = typeId;
  saveState();
  render();
}

function skipDelayType() {
  state.activeDelayType = "activation";
  enterQuest();
}

function questView() {
  const task = state.tasks.find((item) => item.id === state.activeTaskId);
  const child = selectedChild();
  const type = delayTypes.find((item) => item.id === state.activeDelayType) || delayTypes[0];
  if (!task || !child) return `<div class="empty">沒有進行中的任務。</div>`;
  const steps = buildSteps(task, type.id);
  const completedSteps = getQuestSteps(task.id);
  const script = type.parentScript.replace("{firstStep}", steps[0]);
  return `
    <section class="grid">
      <button class="button" onclick="go('kid')">返回孩子端</button>
      <div class="quest-layout">
        <aside class="panel">
          <span class="tag">${type.title}</span>
          <h1>${esc(task.title)}</h1>
          <p class="muted">${type.summary}</p>
          <div class="script-box">
            家長可以這樣說：<br />「${esc(script)}」
          </div>
        </aside>
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>只做下一小步</h2>
              <p class="muted">點一張小卡，完成一步就會亮起。</p>
            </div>
            <span class="tag">+${task.xp} XP</span>
          </div>
          <div class="quest-step-map" aria-label="小任務步驟">
            ${steps
              .map(
                (step, index) => `
                  <button class="step-item ${completedSteps.includes(index) ? "done" : ""}" onclick="toggleStep('${task.id}', ${index})">
                    <span class="step-badge">${index + 1}</span>
                    <span class="step-picture">${stepPicture(task, step, index)}</span>
                    <span class="step-copy">
                      <strong>${esc(shortStepLabel(step))}</strong>
                      <small>${stepHint(type.id, index)}</small>
                    </span>
                    <span class="step-state">${completedSteps.includes(index) ? "✓" : "點一下"}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
          ${timerPanel(task, child)}
          <div class="row">
            <button class="button primary large" onclick="completeTask('${task.id}')">完成任務</button>
            <button class="button" onclick="changeQuestMethod()">換一種方法</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function changeQuestMethod() {
  const task = state.tasks.find((item) => item.id === state.activeTaskId);
  if (task) resetTimerForTask(task);
  state.activeDelayType = null;
  state.route = "detect";
  saveState();
  render();
}

function buildSteps(task, typeId) {
  if (task.steps?.length) return resolvedTaskSteps(task.title, task.area, task.steps);
  if (typeId === "anxiety") return [`先看一眼「${task.title}」`, "圈出一個你會做的地方", "試做 3 分鐘，不求完美"];
  if (typeId === "temptation") return ["把玩具/手機放到看不見的位置", "設定短計時", "完成後再拿回玩樂時間"];
  return resolvedTaskSteps(task.title, task.area, [`把「${task.title}」需要的東西拿出來`, "坐好或站好", "只做第一個 60 秒動作"]);
}

function stepHint(typeId, index) {
  const hints = {
    activation: ["先到位", "準備好", "做一下"],
    anxiety: ["先看看", "找容易", "試 3 分鐘"],
    temptation: ["先收起", "開計時", "再玩"],
  };
  return hints[typeId]?.[index] || "慢慢來";
}

function shortStepLabel(step) {
  const text = String(step || "").replace(/^先/, "").replace(/^把/, "").trim();
  if (text.length <= 8) return text;
  return `${text.slice(0, 8)}…`;
}

function stepPicture(task, step, index) {
  const text = `${task?.title || ""} ${task?.area || ""} ${step || ""}`;
  if (/書包|功課袋|水壺|backpack|bag/.test(text)) return ["🎒", "📚", "💧"][index] || "🎒";
  if (/功課|作業|溫習|默書|數學|中文|英文|課本|書/.test(text)) return ["📖", "✏️", "⭐"][index] || "📘";
  if (/房間|收拾|整理|玩具|衣物/.test(text)) return ["🧺", "🧸", "✨"][index] || "🏠";
  if (/睡前|放鬆|刷牙|洗澡|休息|呼吸/.test(text)) return ["🌙", "🫧", "💤"][index] || "💧";
  if (/玩具|手機|影片/.test(text)) return ["📦", "⏱", "🎮"][index] || "✨";
  return ["👀", "🖐", "⭐"][index] || "🌱";
}

function getQuestSteps(taskId) {
  const raw = sessionStorage.getItem(`quest.steps.${taskId}`);
  return raw ? JSON.parse(raw) : [];
}

function toggleStep(taskId, index) {
  const steps = new Set(getQuestSteps(taskId));
  if (steps.has(index)) steps.delete(index);
  else steps.add(index);
  sessionStorage.setItem(`quest.steps.${taskId}`, JSON.stringify([...steps]));
  render();
}

function timerPanel(task, child) {
  const suggestedSeconds = timerSecondsForTask(task, child);
  const total = state.timer.totalSeconds || suggestedSeconds;
  const left = state.timer.secondsLeft || total;
  const pct = total ? Math.round(((total - left) / total) * 100) : 0;
  return `
    <div class="panel" style="margin:16px 0 0">
      <div class="timer" data-timer-ring style="--timer:${pct}%">
        <strong data-timer-display>${formatSeconds(left)}</strong>
      </div>
      <div class="row" style="justify-content:center">
        <button class="button primary" onclick="startTimer(${suggestedSeconds})">開始計時</button>
        <button class="button" onclick="pauseTimer()">暫停</button>
        <button class="button" onclick="resetTimer(${suggestedSeconds})">重設</button>
      </div>
    </div>
  `;
}

function ageMinutes(age) {
  if (age <= 7) return 15;
  if (age <= 10) return 20;
  return 25;
}

function timerSecondsForAge(age) {
  return ageMinutes(age) * 60;
}

function timerSecondsForTask(task, child = selectedChild()) {
  const parentOverride = Number(child?.timerMinutes || 0);
  const minutes = parentOverride || ageMinutes(child?.age || 7);
  return minutes * 60;
}

function uniqueSteps(steps) {
  return [...new Set(steps.map((step) => step.trim()).filter(Boolean))];
}

function generatedTaskSteps(title = "", area = "") {
  const text = `${title} ${area}`.toLowerCase();
  if (/書包|backpack|bag/.test(text)) {
    return ["把書包放上桌", "按手冊或時間表找要帶的東西", "先把第一樣東西放進書包"];
  }
  if (/功課|作業|homework|溫習|默書|數學|中文|英文/.test(text)) {
    return ["打開書包", "拿出今天要做的那一份", "先做第一題或第一行"];
  }
  if (/房間|整理|收拾|玩具|衣物|桌面/.test(text)) {
    return ["先拿起眼前 3 件東西", "把同類物件放回同一個位置", "清出一小塊空位"];
  }
  if (/刷牙|洗面|洗澡|睡前|休息|放鬆/.test(text)) {
    return ["先走到洗手間或休息位置", "準備今天要用的用品", "只做第一個動作 30 秒"];
  }
  if (/早餐|食飯|茶點|午餐/.test(text)) {
    return ["先坐到位置", "把第一樣餐具或食物放好", "先吃第一口或做第一個準備動作"];
  }
  const zone = zoneForTask({ area });
  if (zone.id === "morning") return ["先站到出門位置", "拿出第一樣要帶的東西", "完成最容易的一小步"];
  if (zone.id === "study") return ["打開書包或課本", "找到今天要做的部分", "先試第一題或第一行"];
  if (zone.id === "home") return ["先看眼前最亂的一小角", "拿起第一件物品", "把它放回正確位置"];
  return ["先走到要開始的地方", "把需要的東西放好", "只做第一個 60 秒動作"];
}

function resolvedTaskSteps(title = "", area = "", manualSteps = []) {
  const combined = uniqueSteps([...manualSteps, ...generatedTaskSteps(title, area)]);
  return combined.slice(0, 3);
}

function firstStepForTask(task) {
  return resolvedTaskSteps(task.title, task.area, task.steps || [])[0] || "先開始最容易的一小步";
}

function magicPreviewMarkup(title = "", area = "", stepsText = "") {
  const manualSteps = stepsText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const steps = resolvedTaskSteps(title || "做今天的小任務", area || zoneCatalog[1].areas[0], manualSteps);
  return `
    <div class="magic-preview-stack">
      <strong>系統會先拆成這樣：</strong>
      <ol class="magic-step-list">
        ${steps.map((step) => `<li>${esc(step)}</li>`).join("")}
      </ol>
      <p class="muted">孩子端會先突出第一步，讓任務看起來沒有那麼大。</p>
    </div>
  `;
}

function updateMagicPreview(form) {
  if (!form) return;
  const preview = form.querySelector("[data-magic-preview]");
  if (!preview) return;
  const title = form.querySelector('[name="title"]')?.value || "";
  const area = form.querySelector('[name="area"]')?.value || "";
  const stepsText = form.querySelector('[name="steps"]')?.value || "";
  preview.innerHTML = magicPreviewMarkup(esc(title), esc(area), stepsText);
}

function initMagicPreview() {
  document.querySelectorAll("[data-magic-preview-form]").forEach((form) => updateMagicPreview(form));
}

function updateTimerDisplay() {
  const display = document.querySelector("[data-timer-display]");
  if (!display) return;
  display.textContent = formatSeconds(state.timer.secondsLeft);
  const ring = document.querySelector("[data-timer-ring]");
  if (ring) {
    const total = state.timer.totalSeconds || 1;
    const pct = Math.round(((total - state.timer.secondsLeft) / total) * 100);
    ring.style.setProperty("--timer", `${pct}%`);
  }
}

function resetTimerForTask(task) {
  clearInterval(state.timer.intervalId);
  const seconds = timerSecondsForTask(task);
  state.timer = { running: false, secondsLeft: seconds, totalSeconds: seconds, intervalId: null };
}

function startTimer(seconds) {
  clearInterval(state.timer.intervalId);
  state.timer.totalSeconds = state.timer.totalSeconds || seconds;
  state.timer.secondsLeft = state.timer.secondsLeft || seconds;
  state.timer.running = true;
  state.timer.intervalId = setInterval(() => {
    if (!state.timer.running) return;
    state.timer.secondsLeft = Math.max(0, state.timer.secondsLeft - 1);
    if (state.timer.secondsLeft === 0) {
      state.timer.running = false;
      saveState();
      render();
      return;
    }
    updateTimerDisplay();
  }, 1000);
  render();
}

function pauseTimer(showEncouragement = true) {
  const task = state.tasks.find((item) => item.id === state.activeTaskId);
  const total = state.timer.totalSeconds || 0;
  const elapsed = total - (state.timer.secondsLeft || total);
  state.timer.running = false;
  clearInterval(state.timer.intervalId);
  if (showEncouragement && state.route === "quest" && task && elapsed > 0) {
    state.pauseEncouragement = {
      taskId: task.id,
      taskTitle: task.title,
      progress: total ? Math.max(8, Math.round((elapsed / total) * 100)) : 20,
    };
  }
  saveState();
  render();
}

function resetTimer(seconds) {
  clearInterval(state.timer.intervalId);
  state.timer = { running: false, secondsLeft: seconds, totalSeconds: seconds, intervalId: null };
  saveState();
  render();
}

function formatSeconds(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function finalizeTask(taskId) {
  if (!isDoneToday(taskId)) {
    const task = state.tasks.find((item) => item.id === taskId);
    const child = selectedChild();
    state.completions.push({ id: uid("done"), taskId, date: todayKey(), delayType: state.activeDelayType, createdAt: new Date().toISOString() });
    child.xp = (child.xp || 0) + (task?.xp || 0);
    child.stars = (child.stars || 0) + 1;
    child.streak = calculateStreak(child.id);
    state.taskCelebration = {
      taskTitle: task?.title || "小任務",
      xp: task?.xp || 0,
      stars: child.stars || 0,
      streak: child.streak || 0,
      canOpenPack: (child.stars || 0) >= 3,
      hasSkillMission: activeSkillMissionCount(child.id) > 0,
    };
  }
  pauseTimer(false);
  sessionStorage.removeItem(`quest.steps.${taskId}`);
  state.route = "kid";
  state.activeTaskId = null;
  state.activeDelayType = null;
  saveState();
  render();
}

function completeTask(taskId) {
  const stepsDone = getQuestSteps(taskId).length;
  const elapsed = (state.timer.totalSeconds || 0) - (state.timer.secondsLeft || 0);
  if (!isDoneToday(taskId) && stepsDone === 0 && elapsed < 30) {
    state.pendingConfirm = {
      action: "force-complete",
      taskId,
      title: "真的完成了嗎？",
      body: "還沒有做過任何小步驟。建議先試做第一步，或請家長一起確認。",
    };
    render();
    return;
  }
  finalizeTask(taskId);
}

function taskCelebrationModal() {
  const celebration = state.taskCelebration;
  return `
    <div class="modal-backdrop celebration-backdrop" role="dialog" aria-modal="true" aria-labelledby="celebration-title">
      <div class="modal celebration-modal">
        <div class="celebration-burst" aria-hidden="true"></div>
        <span class="tag">${icon("star")} 任務完成</span>
        <h2 id="celebration-title">${esc(celebration.taskTitle)} 做到了</h2>
        <p class="muted">每一次願意開始，都是在替自己的小島加一點光。</p>
        <div class="celebration-metrics">
          <article>
            <strong>+${celebration.xp}</strong>
            <span>XP</span>
          </article>
          <article>
            <strong>${celebration.stars}/3</strong>
            <span>探索星</span>
          </article>
          <article>
            <strong>${celebration.streak}</strong>
            <span>連續日數</span>
          </article>
        </div>
        <div class="celebration-actions">
          ${celebration.canOpenPack ? `<button class="button primary" onclick="openPackFromCelebration()">立即開卡包</button>` : ""}
          ${celebration.hasSkillMission ? `<button class="button" onclick="viewSkillMissionFromCelebration()">看看能力任務</button>` : ""}
          <button class="button" onclick="closeTaskCelebration()">回到小任務島</button>
        </div>
      </div>
    </div>
  `;
}

function closeTaskCelebration() {
  state.taskCelebration = null;
  saveState();
  render();
}

function openPackFromCelebration() {
  state.taskCelebration = null;
  saveState();
  openCardPack();
}

function viewSkillMissionFromCelebration() {
  state.taskCelebration = null;
  state.route = "kid";
  state.kidTab = "achievements";
  saveState();
  render();
}

function pauseEncouragementModal() {
  const pause = state.pauseEncouragement;
  return `
    <div class="modal-backdrop pause-backdrop" role="dialog" aria-modal="true" aria-labelledby="pause-title">
      <div class="modal pause-modal">
        <div class="pause-companion">${icon("lumo")}</div>
        <span class="tag">${esc(pause.taskTitle || "小任務")}</span>
        <h2 id="pause-title">冇問題，休息一下！</h2>
        <p class="muted">下次再試，Lumo 會等你</p>
        <div class="pause-ring" style="--timer:${pause.progress || 20}%">
          <strong>${pause.progress || 20}%</strong>
        </div>
        <div class="row">
          <button class="button primary" onclick="retryPausedTask()">再試一次</button>
          <button class="button" onclick="returnIslandFromPause()">返回小島</button>
        </div>
      </div>
    </div>
  `;
}

function retryPausedTask() {
  const taskId = state.pauseEncouragement?.taskId;
  state.pauseEncouragement = null;
  state.route = "quest";
  if (taskId) state.activeTaskId = taskId;
  saveState();
  render();
}

function returnIslandFromPause() {
  state.pauseEncouragement = null;
  state.route = "kid";
  state.kidTab = "island";
  saveState();
  render();
}

function initMapInteractions() {
  document.querySelectorAll("[data-map-scroll]").forEach((viewport) => {
    if (viewport.dataset.bound === "true") return;
    viewport.dataset.bound = "true";
    let active = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const centerMap = () => {
      if (viewport.dataset.centered === "true") return;
      viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
      viewport.scrollTop = Math.max(0, (viewport.scrollHeight - viewport.clientHeight) / 2);
      viewport.dataset.centered = "true";
    };

    requestAnimationFrame(centerMap);

    viewport.addEventListener("pointerdown", (event) => {
      active = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = viewport.scrollLeft;
      startTop = viewport.scrollTop;
      viewport.classList.add("drag-ready");
    });

    viewport.addEventListener("pointermove", (event) => {
      if (!active) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        moved = true;
        viewport.classList.add("dragging");
        viewport.scrollLeft = startLeft - dx;
        viewport.scrollTop = startTop - dy;
        event.preventDefault();
      }
    });

    const endDrag = () => {
      active = false;
      viewport.classList.remove("drag-ready");
      setTimeout(() => viewport.classList.remove("dragging"), 0);
    };

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("pointerleave", endDrag);
    viewport.addEventListener(
      "click",
      (event) => {
        if (!moved) return;
        event.preventDefault();
        event.stopPropagation();
        moved = false;
      },
      true,
    );
  });
}

function initFloatingWidgets() {
  clearTimeout(narratorAutoTimerId);
  document.querySelectorAll("[data-narrator-auto]").forEach((widget) => {
    const collapseAt = Number(widget.dataset.narratorAuto || 0);
    const delay = collapseAt - Date.now();
    if (delay > 0) {
      narratorAutoTimerId = setTimeout(() => {
        if (state.narratorAutoCollapseAt === collapseAt) setNarratorCollapsed(true);
      }, delay);
    }
  });

  document.querySelectorAll("[data-narrator-fab]").forEach((fab) => {
    if (fab.dataset.bound === "true") return;
    fab.dataset.bound = "true";
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let originX = 0;
    let originY = 0;

    fab.addEventListener("pointerdown", (event) => {
      dragging = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      const rect = fab.getBoundingClientRect();
      originX = rect.left;
      originY = rect.top;
      fab.setPointerCapture?.(event.pointerId);
    });

    fab.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved = true;
      if (!moved) return;
      const maxX = window.innerWidth - fab.offsetWidth - 10;
      const maxY = window.innerHeight - fab.offsetHeight - 10;
      const nextX = Math.max(10, Math.min(maxX, originX + dx));
      const nextY = Math.max(10, Math.min(maxY, originY + dy));
      fab.style.left = `${nextX}px`;
      fab.style.top = `${nextY}px`;
      fab.style.right = "auto";
      fab.style.bottom = "auto";
    });

    fab.addEventListener("pointerup", () => {
      if (moved) {
        const rect = fab.getBoundingClientRect();
        setNarratorFabPosition(Math.round(rect.left), Math.round(rect.top));
      }
      dragging = false;
    });

    fab.addEventListener(
      "click",
      (event) => {
        if (!moved) return;
        event.preventDefault();
        event.stopPropagation();
        moved = false;
      },
      true,
    );
  });
}

function calculateStreak(childId) {
  const dates = new Set(completionsFor(childId).map((entry) => entry.date));
  let streak = 0;
  while (dates.has(dateKeyOffset(-streak))) {
    streak += 1;
  }
  return streak;
}

function parentView() {
  if (!state.settings.parentVerified) return parentGateView();
  const tabs = [
    ["overview", "總覽"],
    ["children", "孩子檔案"],
    ["tasks", "任務管理"],
    ["analysis", "拖延分析"],
    ["rewards", "獎勵"],
    ["privacy", "安全私隱"],
  ];
  return `
    <section class="parent-page">
      <div class="parent-hero">
        <div>
          <span class="tag">${icon("shield")} 家長中心</span>
          <h1>把每天的開始，變成看得見的成長節奏</h1>
          <p class="muted">這裡集中看任務完成、心情、能力任務和收藏進度，幫家長調整陪伴方式，而不是只看有沒有聽話。</p>
        </div>
        <button class="button primary" onclick="go('kid')">切換到孩子端</button>
      </div>
      <div class="parent-tabs">
        ${tabs.map(([id, label]) => `<button class="${state.parentTab === id ? "active" : ""}" onclick="setParentTab('${id}')">${label}</button>`).join("")}
      </div>
      ${parentTabView()}
    </section>
  `;
}

function parentGateView() {
  const input = state.settings.parentPinInput || "";
  return `
    <section class="parent-gate">
      <div class="pin-card panel">
        <span class="tag">${icon("shield")} 家長</span>
        <h1>家長驗證</h1>
        <p class="muted">請輸入家長 PIN 碼</p>
        <div class="pin-dots" aria-label="PIN">
          ${[0, 1, 2, 3].map((index) => `<span class="${input.length > index ? "filled" : ""}"></span>`).join("")}
        </div>
        <div class="pin-pad">
          ${["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
            .map((digit) => `<button class="button" onclick="enterParentPin('${digit}')">${digit}</button>`)
            .join("")}
          <button class="button" onclick="deleteParentPin()">←</button>
        </div>
        <p class="muted small">Demo PIN：1234</p>
      </div>
    </section>
  `;
}

function enterParentPin(digit) {
  const next = `${state.settings.parentPinInput || ""}${digit}`.slice(0, 4);
  state.settings.parentPinInput = next;
  if (next.length === 4) {
    if (next === (state.settings.parentPin || "1234")) {
      state.settings.parentVerified = true;
      state.settings.parentPinInput = "";
    } else {
      state.settings.parentPinInput = "";
      state.pendingConfirm = {
        action: "noop",
        title: "PIN 碼不正確",
        body: "請再試一次。",
      };
    }
  }
  saveState();
  render();
}

function deleteParentPin() {
  state.settings.parentPinInput = (state.settings.parentPinInput || "").slice(0, -1);
  saveState();
  render();
}

function setParentTab(tab) {
  state.parentTab = tab;
  state.route = "parent";
  saveState();
  render();
}

function parentTabView() {
  const tab = state.parentTab || "overview";
  if (tab === "children") return childrenTab();
  if (tab === "tasks") return tasksTab();
  if (tab === "analysis") return analysisTab();
  if (tab === "rewards") return rewardsTab();
  if (tab === "privacy") return privacyTab();
  return overviewTab();
}

function overviewTab() {
  const child = selectedChild();
  if (!child) return `<div class="empty">請先新增孩子。</div>`;
  const rate = todayCompletionRate(child.id);
  const tasks = childTasks(child.id);
  const week = weeklyStats(child.id);
  const insight = buildInsight(child.id);
  const mood = latestMoodFor(child.id);
  const openSkillMissions = activeSkillMissionCount(child.id);
  const latestCards = latestUnlockedCards(child.id);
  const doneToday = tasks.filter((task) => isDoneToday(task.id)).length;
  return `
    <div class="parent-shell">
      <section class="parent-summary-card">
        <div class="parent-summary-copy">
          <div>
            <span class="tag">${icon("heart")} 今日焦點</span>
            <h2>${esc(child.name)} 今天已完成 ${doneToday}/${tasks.length} 個任務</h2>
            <p>${insight}</p>
          </div>
          <div class="profile-chip-row">
            <span class="small-tag">${icon("water")} ${mood ? mood.label : "未記錄今日心情"}</span>
            <span class="small-tag">${icon("sprout")} ${openSkillMissions} 個能力任務進行中</span>
            <span class="small-tag">${icon("card")} ${collectionFor(child.id).length} 張收藏</span>
          </div>
        </div>
        <div class="parent-summary-actions">
          <button class="button primary" onclick="setParentTab('tasks')">調整今日任務</button>
          <button class="button" onclick="setParentTab('analysis')">查看分析</button>
        </div>
      </section>

      <section class="parent-metrics-grid">
        ${parentMetricCard("今日完成率", `${rate}%`, `${doneToday}/${tasks.length} 個任務完成`, "gold")}
        ${parentMetricCard("本週完成", week.total, "過去 7 天的總完成次數", "mint")}
        ${parentMetricCard("累積 XP", child.xp || 0, "孩子已累積的成長分數", "sky")}
        ${parentMetricCard("探索星", child.stars || 0, "再集滿 3 粒可再開卡包", "rose")}
      </section>

      <section class="parent-grid-main">
        <div class="parent-panel">
          <div class="section-title">
            <div>
              <span class="tag">${icon("star")} 本週節奏</span>
              <h2>最近 7 天任務完成</h2>
            </div>
          </div>
          <div class="week-bars">
            ${week.days.map(weeklyBar).join("")}
          </div>
        </div>

        <div class="parent-panel">
          <div class="section-title">
            <div>
              <span class="tag">${icon("card")} 最新收藏</span>
              <h2>最近帶回島上的卡片</h2>
            </div>
          </div>
          <div class="mini-collection-list">
            ${
              latestCards.length
                ? latestCards
                    .map(
                      (card) => `
                        <article class="mini-collection-card ${card.rarity}">
                          <div class="card-icon">${icon(card.icon)}</div>
                          <div>
                            <h3>${card.name}</h3>
                            <p class="muted">${typeLabel(card.type)} · ${card.fact}</p>
                          </div>
                        </article>
                      `,
                    )
                    .join("")
                : `<div class="empty">完成第一個任務後，這裡會出現第一張收藏卡。</div>`
            }
          </div>
        </div>
      </section>

      <section class="parent-panel">
        <div class="section-title">
          <div>
            <span class="tag">${icon("leaf")} 地圖區域進度</span>
            <h2>哪一類任務最容易開始</h2>
            <p class="muted">讓家長快速看到哪些區域已熟習，哪些區域需要再拆細。</p>
          </div>
        </div>
        <div class="parent-zone-grid">
          ${zoneStats(child.id).map(parentZoneCard).join("")}
        </div>
      </section>
    </div>
  `;
}

function weeklyStats(childId) {
  const taskIds = new Set(childTasks(childId).map((task) => task.id));
  const days = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(Date.now() - offset * 24 * 60 * 60 * 1000);
    const key = dateKeyFor(date);
    const count = state.completions.filter((entry) => entry.date === key && taskIds.has(entry.taskId)).length;
    days.push({ date: key, label: weekdayLabel(date), count });
  }
  return { days, total: days.reduce((sum, day) => sum + day.count, 0) };
}

function buildInsight(childId) {
  const child = state.children.find((item) => item.id === childId);
  const completions = completionsFor(childId);
  if (!completions.length) return `${esc(child.name)} 今天尚未有完成紀錄。建議先選一個 3 到 5 分鐘任務，目標只放在「開始」。`;
  const byType = completions.reduce((acc, item) => {
    const key = item.delayType || "activation";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const topType = Object.entries(byType).sort((a, b) => b[1] - a[1])[0]?.[0] || "activation";
  const type = delayTypes.find((item) => item.id === topType);
  return `${esc(child.name)} 最近較常使用「${type.title}」策略。下一步可以固定在任務前先說一句家長話術，再開一個短計時。`;
}

function latestMoodFor(childId = selectedChild()?.id) {
  const entries = state.moodLog.filter((entry) => entry.childId === childId);
  const latest = entries[entries.length - 1];
  return moods.find((item) => item.id === latest?.moodId) || null;
}

function narratorGuideLine(child, route = state.route) {
  const tasks = childTasks(child?.id);
  const done = tasks.filter((task) => isDoneToday(task.id)).length;
  const focusMission = skillMissionsFor(child?.id).find((mission) => mission.status !== "unlocked");
  const activeTask = state.tasks.find((task) => task.id === state.activeTaskId);
  if (state.taskCelebration) return `你剛剛完成了「${esc(state.taskCelebration.taskTitle)}」，小島又亮了一點。`;
  if (route === "quest" && activeTask) return `現在只要陪 ${esc(child.name)} 做好「${esc(activeTask.title)}」的下一小步就可以。`;
  if (route === "detect" && activeTask) return `先找出卡住的原因，再開始，通常會比直接催促更順。`;
  if (focusMission) return `${esc(focusMission.title)} 已經解鎖成能力任務，做完就會真正變成你的新技能。`;
  if (!tasks.length) return `今天島上還未放任務，家長可以先放一個 3 到 5 分鐘的小任務。`;
  if (done === tasks.length) return `今天的島嶼任務已經完成，可以去開卡包，或者慢慢休息一下。`;
  return `${esc(child.name)} 今天已完成 ${done}/${tasks.length} 個任務，下一步只要再開始一個就很棒。`;
}

function narratorParentLine(child) {
  const mood = latestMoodFor(child?.id);
  const activeTask = state.tasks.find((task) => task.id === state.activeTaskId);
  const type = delayTypes.find((item) => item.id === state.activeDelayType) || delayTypes[0];
  if (state.taskCelebration) return `家長心聲：我看到你剛剛真的有努力，不是只想趕你做完。`;
  if (activeTask && state.route === "quest") {
    return `家長心聲：${esc(type.parentScript.replace("{firstStep}", activeTask.steps?.[0] || "把第一樣東西拿出來"))}`;
  }
  if (mood?.id === "worry" || mood?.id === "resist") {
    return `家長心聲：你現在感覺${mood.label}也可以，我先陪你做最小一步，不急。`;
  }
  return `家長心聲：我不是想催你，我想知道怎樣陪你開始會比較容易。`;
}

function narratorInteractionLine(child) {
  const activeTask = state.tasks.find((task) => task.id === state.activeTaskId);
  const focusMission = skillMissionsFor(child?.id).find((mission) => mission.status !== "unlocked");
  if (state.taskCelebration) return `${esc(child.name)}：我做到了。 家長：是的，你真的自己開始了。`;
  if (activeTask && state.route === "quest") return `${esc(child.name)}：我先試做第一步。 家長：好，我陪你做 3 分鐘就夠。`;
  if (focusMission) return `${esc(child.name)}：我想學會這個。 家長：好，我們把它當成一次小冒險。`;
  return `${esc(child.name)}：可不可以先做一下下？ 家長：可以，先開始就算成功。`;
}

function floatingNarratorWidget(route = state.route) {
  if (!["kid", "detect", "quest", "parent"].includes(route)) return "";
  const child = selectedChild();
  if (!child) return "";
  const tabs = [
    ["guide", "旁白", narratorGuideLine(child, route)],
    ["parent", "家長", narratorParentLine(child)],
    ["story", "互動", narratorInteractionLine(child)],
  ];
  const activeTab = tabs.find(([id]) => id === (state.narratorTab || "guide")) || tabs[0];
  const fabStyle =
    state.narratorFabX != null && state.narratorFabY != null
      ? `style="left:${state.narratorFabX}px; top:${state.narratorFabY}px; right:auto; bottom:auto;"`
      : "";
  if (state.narratorCollapsed) {
    return `
      <button class="narrator-fab route-${route}" data-narrator-fab ${fabStyle} onclick="setNarratorCollapsed(false)" aria-label="打開任務小旁白">
        <span class="narrator-fab-core">${icon("lumo")}</span>
        <span class="narrator-fab-pulse" aria-hidden="true"></span>
      </button>
    `;
  }
  return `
    <aside class="narrator-widget route-${route}" data-narrator-auto="${state.narratorAutoCollapseAt || 0}">
      <div class="narrator-head">
        <div class="narrator-cast">
          <div class="narrator-avatar guide">${icon("lumo")}</div>
          <div class="narrator-avatar parent">${icon("heart")}</div>
          <div class="narrator-avatar child child-avatar-shell">${childAvatarMarkup("narrator")}</div>
        </div>
        <div>
          <strong>任務小旁白</strong>
          <p class="muted">${esc(child.name)} 和家長的陪伴小劇場</p>
        </div>
        <button class="narrator-close" onclick="setNarratorCollapsed(true)" aria-label="收起任務小旁白">×</button>
      </div>
      <div class="narrator-tabs">
        ${tabs
          .map(
            ([id, label]) =>
              `<button class="${(state.narratorTab || "guide") === id ? "active" : ""}" onclick="setNarratorTab('${id}')">${label}</button>`,
          )
          .join("")}
      </div>
      <div class="narrator-body">
        <p>${activeTab[2]}</p>
      </div>
    </aside>
  `;
}

function activeSkillMissionCount(childId = selectedChild()?.id) {
  return skillMissionsFor(childId).filter((mission) => mission.status !== "unlocked").length;
}

function latestUnlockedCards(childId = selectedChild()?.id, limit = 3) {
  return collectionCards(childId)
    .filter((card) => card.owned)
    .sort((a, b) => (b.owned?.unlockedAt || "").localeCompare(a.owned?.unlockedAt || ""))
    .slice(0, limit);
}

function parentMetricCard(label, value, note, tone = "mint") {
  return `
    <article class="parent-metric ${tone}">
      <span class="parent-metric-label">${label}</span>
      <strong>${value}</strong>
      <p>${note}</p>
    </article>
  `;
}

function parentZoneCard(zone) {
  return `
    <article class="parent-zone-card ${zone.theme}">
      <div class="avatar">${icon(zone.icon)}</div>
      <div>
        <h3>${zone.name}</h3>
        <p class="muted">${zone.copy}</p>
      </div>
      <strong>本區 ${zone.done}/${zone.total || 0}</strong>
      <div class="progress"><span style="--value:${zone.progress}%"></span></div>
    </article>
  `;
}

function parentTaskRow(task) {
  const done = isDoneToday(task.id);
  return `
    <article class="parent-task-row ${done ? "done" : ""}">
      <div class="task-icon">${done ? "OK" : icon(task.icon)}</div>
      <div>
        <h3>${esc(task.title)}</h3>
        <p class="muted">${esc(task.area)} · ${task.minutes} 分鐘 · ${task.steps?.length || 3} 個小步驟</p>
      </div>
      <span class="small-tag">${done ? "今天已完成" : `+${task.xp} XP`}</span>
    </article>
  `;
}

function weeklyBar(day) {
  const height = Math.max(18, day.count * 22 + 10);
  return `
    <article class="week-bar-card">
      <div class="week-bar-track">
        <span class="week-bar-fill" style="height:${height}px"></span>
      </div>
      <strong>${day.count}</strong>
      <small>${day.label}</small>
    </article>
  `;
}

function strategyHighlight(type) {
  return `
    <article class="strategy-card ${type.id}">
      <div class="avatar">${icon(type.icon)}</div>
      <div>
        <h3>${type.title}</h3>
        <p class="muted">${type.summary}</p>
      </div>
      <strong>${type.count} 次</strong>
      <p>${type.count ? `最近常見風險：${type.risk}` : "這一類型目前未出現明顯紀錄。"}</p>
      <span class="small-tag">${type.strategy}</span>
    </article>
  `;
}

function rewardCard(reward, child) {
  const affordable = (child.xp || 0) >= reward.cost;
  return `
    <article class="reward-card ${affordable ? "ready" : ""}">
      <div>
        <h3>${esc(reward.title)}</h3>
        <p class="muted">${reward.cost} XP 可兌換</p>
      </div>
      <strong>${affordable ? "可兌換" : `尚差 ${reward.cost - (child.xp || 0)} XP`}</strong>
      <div class="progress"><span style="--value:${Math.min(100, Math.round(((child.xp || 0) / reward.cost) * 100))}%"></span></div>
    </article>
  `;
}

function privacyCard(title, body) {
  return `
    <article class="privacy-card">
      <h3>${title}</h3>
      <p class="muted">${body}</p>
    </article>
  `;
}

function childrenTab() {
  const current = selectedChild();
  return `
    <div class="parent-shell">
      <section class="parent-panel child-roster-panel">
        <div class="section-title">
          <div>
            <span class="tag">${icon("sprout")} 孩子檔案</span>
            <h2>每個孩子都有自己的節奏</h2>
          </div>
          <span class="small-tag">${state.children.length} 位孩子</span>
        </div>
        <div class="child-roster">
          ${state.children
            .map(
              (child) => `
                <article class="child-profile-card ${state.selectedChildId === child.id ? "active" : ""}">
                  <div class="row" style="justify-content:space-between; align-items:flex-start">
                    <div>
                      <div class="avatar child-avatar-shell">${childAvatarMarkup("chip")}</div>
                      <h3>${esc(child.name)}</h3>
                      <p class="muted">${child.age} 歲 · 專注時間 ${child.timerMinutes || ageMinutes(child.age)} 分鐘</p>
                    </div>
                    <button class="button ${state.selectedChildId === child.id ? "primary" : ""}" onclick="selectChild('${child.id}')">${state.selectedChildId === child.id ? "使用中" : "切換"}</button>
                  </div>
                  <p>${esc(child.note || "未有觀察備註。")}</p>
                  <div class="profile-chip-row">
                    <span class="small-tag">${icon("star")} ${child.xp || 0} XP</span>
                    <span class="small-tag">${icon("card")} ${collectionFor(child.id).length} 收藏</span>
                    <span class="small-tag">${icon("water")} ${latestMoodFor(child.id)?.label || "未記錄心情"}</span>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="parent-grid-2">
        <form class="parent-panel form" onsubmit="addChild(event)">
        <div class="section-title">
          <div>
            <span class="tag">${icon("heart")} 新增孩子</span>
            <h2>建立新的任務小島</h2>
          </div>
        </div>
        <label class="field">名字<input name="name" required placeholder="例如：小晴" /></label>
        <label class="field">年齡<input name="age" type="number" min="3" max="12" value="7" required /></label>
        <label class="field">任務夥伴
          <select name="companion">
            <option value="Lumo">Lumo 光點夥伴</option>
            <option value="Sprout">Sprout 樹苗夥伴</option>
            <option value="Skipper">Skipper 小船夥伴</option>
          </select>
        </label>
        <label class="field">觀察備註<textarea name="note" placeholder="例如：開始前容易擔心做錯"></textarea></label>
        <button class="button primary">新增孩子</button>
        </form>
        <section class="parent-panel selected-child-panel">
          <div class="section-title">
            <div>
              <span class="tag">${icon("shield")} 目前重點</span>
              <h2>${esc(current.name)} 的支持設定</h2>
            </div>
          </div>
          <div class="selected-child-copy">
            <p>${buildInsight(current.id)}</p>
            <div class="profile-chip-row">
              <span class="small-tag">${icon("star")} ${current.stars || 0} 探索星</span>
              <span class="small-tag">${icon("candy")} ${current.candies || 0} 糖果</span>
              <span class="small-tag">${icon("sprout")} ${activeSkillMissionCount(current.id)} 個能力任務進行中</span>
            </div>
          </div>
          <form class="timer-settings" onsubmit="updateChildTimer(event)">
            <label class="field">專注時間
              <input name="timerMinutes" type="number" min="10" max="25" value="${current.timerMinutes || ageMinutes(current.age)}" />
            </label>
            <button class="button primary">儲存</button>
          </form>
        </section>
      </section>
    </div>
  `;
}

function selectChild(childId) {
  state.selectedChildId = childId;
  saveState();
  render();
}

function addChild(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const child = {
    id: uid("child"),
    name: data.get("name").trim(),
    age: Number(data.get("age")),
    avatar: "explorer",
    companion: data.get("companion"),
    timerMinutes: ageMinutes(Number(data.get("age"))),
    note: data.get("note").trim(),
    xp: 0,
    streak: 0,
    createdAt: todayKey(),
  };
  state.children.push(child);
  state.selectedChildId = child.id;
  saveState();
  render();
}

function updateChildTimer(event) {
  event.preventDefault();
  const child = selectedChild();
  if (!child) return;
  child.timerMinutes = Math.max(10, Math.min(25, Number(new FormData(event.target).get("timerMinutes") || ageMinutes(child.age))));
  saveState();
  render();
}

function tasksTab() {
  const child = selectedChild();
  return `
    <div class="parent-shell">
      <section class="parent-grid-2">
        <div class="parent-panel">
          <div class="section-title">
            <div>
              <span class="tag">${icon("book")} 任務管理</span>
              <h2>${esc(child.name)} 的任務節奏</h2>
            </div>
            <span class="small-tag">${childTasks(child.id).length} 個任務</span>
          </div>
          <div class="parent-task-list">
            ${childTasks(child.id).map(parentTaskRow).join("") || `<div class="empty">未有任務。</div>`}
          </div>
        </div>
      <form class="parent-panel form" data-magic-preview-form onsubmit="addTask(event)">
        <div class="section-title">
          <div>
            <span class="tag">${icon("leaf")} 新增任務</span>
            <h2>把任務設計成容易開始</h2>
          </div>
        </div>
        <label class="field">任務名稱<input name="title" required placeholder="例如：溫習默書" oninput="updateMagicPreview(this.form)" /></label>
        <label class="field">地圖區域
          <select name="area" required onchange="updateMagicPreview(this.form)">
            ${zoneCatalog.map((zone) => `<option value="${zone.areas[0]}">${zone.name} · ${zone.areas[0]}</option>`).join("")}
          </select>
        </label>
        <div class="grid cols-2">
          <label class="field">分鐘<input name="minutes" type="number" min="1" max="60" value="10" required /></label>
          <label class="field">XP<input name="xp" type="number" min="5" max="100" value="25" required /></label>
        </div>
        <label class="field">三個小步驟<textarea name="steps" placeholder="每行一個小步驟" oninput="updateMagicPreview(this.form)"></textarea></label>
        <div class="magic-preview-card">
          <span class="tag">${icon("spark")} 第一步魔法卡預覽</span>
          <div data-magic-preview>${magicPreviewMarkup("", zoneCatalog[1].areas[0], "")}</div>
        </div>
        <div class="notice">建議把每個步驟寫到孩子可以 30-60 秒內開始的程度，例如「把書包放上桌」而不是「整理好書包」。</div>
        <button class="button primary">新增任務</button>
      </form>
      </section>
    </div>
  `;
}

function addTask(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const child = selectedChild();
  const title = data.get("title").trim();
  const area = data.get("area").trim();
  const manualSteps = data
    .get("steps")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  state.tasks.push({
    id: uid("task"),
    childId: child.id,
    title,
    area,
    minutes: Number(data.get("minutes")),
    xp: Number(data.get("xp")),
    icon: zoneForTask({ area: data.get("area") }).icon,
    steps: resolvedTaskSteps(title, area, manualSteps),
    active: true,
  });
  saveState();
  render();
}

function analysisTab() {
  const child = selectedChild();
  const entries = completionsFor(child.id);
  const typeCounts = delayTypes.map((type) => ({
    ...type,
    count: entries.filter((entry) => entry.delayType === type.id).length,
  }));
  const totalRuns = typeCounts.reduce((sum, type) => sum + type.count, 0);
  const topType = [...typeCounts].sort((a, b) => b.count - a.count)[0];
  return `
    <div class="parent-shell">
      <section class="parent-summary-card analysis-summary">
        <div class="parent-summary-copy">
          <div>
            <span class="tag">${icon("swirl")} 拖延分析</span>
            <h2>${esc(child.name)} 最近最常卡在「${topType?.title || "未有資料"}」</h2>
            <p>${buildInsight(child.id)}</p>
          </div>
          <div class="profile-chip-row">
            <span class="small-tag">${icon("star")} 共記錄 ${totalRuns} 次任務完成</span>
            <span class="small-tag">${icon("water")} 今日心情：${latestMoodFor(child.id)?.label || "未記錄"}</span>
          </div>
        </div>
      </section>
      <section class="strategy-grid">
        ${typeCounts.map(strategyHighlight).join("")}
      </section>
      <section class="parent-grid-2">
        <div class="parent-panel">
          <div class="section-title">
            <div>
              <span class="tag">${icon("heart")} 家長建議</span>
              <h2>下一步陪伴方式</h2>
            </div>
          </div>
          <div class="guidance-stack">
            <div class="guidance-card">
              <strong>先說的話</strong>
              <p>${esc(topType?.parentScript?.replace("{firstStep}", "把第一樣東西拿出來") || "先陪孩子找到第一步。")}</p>
            </div>
            <div class="guidance-card">
              <strong>先做的事</strong>
              <p>${buildInsight(child.id)}</p>
            </div>
            <div class="guidance-card">
              <strong>需要留意</strong>
              <p class="muted">如孩子持續焦慮、睡眠受影響或親子衝突加劇，應諮詢兒童心理或教育專業人士。</p>
            </div>
          </div>
        </div>
        <div class="parent-panel">
          <div class="section-title">
            <div>
              <span class="tag">${icon("shield")} 遊戲化界線</span>
              <h2>保留吸引力，不變成壓力</h2>
            </div>
          </div>
          <div class="guidance-stack">
            <div class="guidance-card">
              <strong>不設付費抽卡</strong>
              <p class="muted">卡包只可由完成任務得到探索星開啟，不接付費入口，不加入倒數或逼迫文案。</p>
            </div>
            <div class="guidance-card">
              <strong>收藏不是控制包裝</strong>
              <p class="muted">目標是讓孩子建立自己的小世界，從夥伴、名勝和能力卡感受探索，而不是只感受到被管理。</p>
            </div>
            <div class="guidance-card">
              <strong>能力卡需要練習</strong>
              <p class="muted">生活小秘技只有完成實際練習才會真正解鎖，避免變成空泛的收集數字。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function rewardsTab() {
  const child = selectedChild();
  return `
    <div class="parent-shell">
      <section class="parent-summary-card rewards-summary">
        <div class="parent-summary-copy">
          <div>
            <span class="tag">${icon("candy")} 獎勵設定</span>
            <h2>${esc(child.name)} 現在有 ${child.xp || 0} XP</h2>
            <p>建議把獎勵設計成親子時間、選擇權和休息，而不是單純物質交換。這樣比較能支持長期動機。</p>
          </div>
          <div class="profile-chip-row">
            <span class="small-tag">${icon("star")} ${child.stars || 0} 探索星</span>
            <span class="small-tag">${icon("card")} ${collectionFor(child.id).length} 張收藏</span>
          </div>
        </div>
      </section>
      <section class="parent-grid-2">
        <div class="parent-panel">
          <div class="section-title">
            <div>
              <span class="tag">${icon("heart")} 可兌換獎勵</span>
              <h2>用努力換來有意義的選擇</h2>
            </div>
          </div>
          <div class="reward-grid">
            ${state.rewards.map((reward) => rewardCard(reward, child)).join("")}
          </div>
        </div>
      <form class="parent-panel form" onsubmit="addReward(event)">
        <div class="section-title">
          <div>
            <span class="tag">${icon("leaf")} 新增獎勵</span>
            <h2>保持溫和，但有吸引力</h2>
          </div>
        </div>
        <label class="field">獎勵名稱<input name="title" required placeholder="例如：一起去公園" /></label>
        <label class="field">需要 XP<input name="cost" type="number" value="50" min="1" required /></label>
        <div class="notice">例子：一起去公園、選晚餐、選一本睡前故事、親子桌遊時間。這些通常比買玩具更可持續。</div>
        <button class="button primary">新增獎勵</button>
      </form>
      </section>
    </div>
  `;
}

function addReward(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  state.rewards.push({ id: uid("reward"), title: data.get("title").trim(), cost: Number(data.get("cost")) });
  saveState();
  render();
}

function privacyTab() {
  return `
    <div class="parent-shell">
      <section class="parent-summary-card privacy-summary">
        <div class="parent-summary-copy">
          <div>
            <span class="tag">${icon("shield")} 安全與私隱</span>
            <h2>目前資料只保存在這部瀏覽器</h2>
            <p>這個 MVP 還未上雲。正式商業化前，需要把家長同意、最小化收集、刪除權和抽卡安全做成產品原則，而不是事後補上。</p>
          </div>
        </div>
      </section>
      <section class="parent-grid-2">
      <div class="parent-panel">
        <div class="section-title">
          <div>
            <span class="tag">${icon("heart")} 核心原則</span>
            <h2>孩子 app 需要守住的界線</h2>
          </div>
        </div>
        <div class="privacy-grid">
          ${privacyCard("家長同意", "正式版加入相片、錄音、通知或雲端同步前，必須先取得家長明確同意。")}
          ${privacyCard("資料最小化", "只保存完成任務、心情選項和家長備註，不保存不必要的敏感資料。")}
          ${privacyCard("抽卡安全", "收藏系統不應接入付費抽卡或廣告獎勵。孩子端只顯示努力換來的探索星和收藏。")}
          ${privacyCard("刪除權", "家長可以一鍵清除本機資料，正式版也應加入完整匯出與刪除流程。")}
        </div>
      </div>
      <div class="parent-panel">
        <div class="section-title">
          <div>
            <span class="tag">${icon("book")} 資料工具</span>
            <h2>匯出與清除</h2>
          </div>
        </div>
        <div class="row">
          <button class="button" onclick="exportData()">匯出 JSON</button>
          <button class="button danger" onclick="clearData()">清除本機資料</button>
        </div>
        <div class="notice" style="margin-top:14px">匯出內容只供你在本機檢查目前 demo 狀態。正式版應該提供更容易理解的下載格式和清楚的刪除說明。</div>
        <pre id="export-output" class="export-box" style="white-space:pre-wrap; margin-top:14px; max-height:320px; overflow:auto;"></pre>
      </div>
      </section>
    </div>
  `;
}

function exportData() {
  document.querySelector("#export-output").textContent = JSON.stringify({ ...state, timer: undefined }, null, 2);
}

function clearData() {
  state.pendingConfirm = {
    action: "clear",
    title: "清除本機資料？",
    body: "這會移除目前瀏覽器內保存的孩子、任務和完成紀錄，並重新載入示範資料。",
  };
  render();
}

function resetDemo() {
  state.pendingConfirm = {
    action: "reset",
    title: "重置示範資料？",
    body: "這會覆蓋目前本機資料，回到乾淨的 QuestKids demo 狀態。",
  };
  render();
}

function confirmModal() {
  const pending = state.pendingConfirm;
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div class="modal">
        <h2 id="confirm-title">${pending.title}</h2>
        <p class="muted">${pending.body}</p>
        <div class="row">
          <button class="button danger" onclick="runConfirmedAction()">確認</button>
          <button class="button" onclick="cancelConfirm()">取消</button>
        </div>
      </div>
    </div>
  `;
}

function cancelConfirm() {
  state.pendingConfirm = null;
  render();
}

function runConfirmedAction() {
  const pending = state.pendingConfirm;
  state.pendingConfirm = null;
  if (pending?.action === "force-complete") {
    finalizeTask(pending.taskId);
    return;
  }
  if (pending?.action === "skill-complete") {
    finalizeSkillMission(pending.missionId);
    return;
  }
  if (pending?.action === "noop") {
    saveState();
    render();
    return;
  }
  if (pending?.action === "clear") localStorage.removeItem(STORE_KEY);
  state = demoState();
  saveState();
  render();
}

render();
