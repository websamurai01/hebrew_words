

const VOCABULARY = [
  { id: 1, emoji: "👋", en: "hello / peace", hebrew: "שלום", hebrewNikud: "שָׁלוֹם", translit: "шалом" },
  { id: 2, emoji: "🙏", en: "thank you", hebrew: "תודה", hebrewNikud: "תּוֹדָה", translit: "тода" },
  { id: 3, emoji: "🤲", en: "please / welcome", hebrew: "בבקשה", hebrewNikud: "בְּבַקָּשָׁה", translit: "бевакаша" },
  { id: 4, emoji: "🙇", en: "sorry / excuse me", hebrew: "סליחה", hebrewNikud: "סְלִיחָה", translit: "слиха" },
  { id: 5, emoji: "👌", en: "okay / fine", hebrew: "בסדר", hebrewNikud: "בְּסֵדֶר", translit: "беседер" },
  { id: 6, emoji: "✅", en: "yes", hebrew: "כן", hebrewNikud: "כֵּן", translit: "кен" },
  { id: 7, emoji: "❌", en: "no / not", hebrew: "לא", hebrewNikud: "לֹא", translit: "ло" },
  { id: 8, emoji: "🤷", en: "maybe", hebrew: "אולי", hebrewNikud: "אוּלַי", translit: "улай" },
  { id: 9, emoji: "📦", en: "there is / have", hebrew: "יש", hebrewNikud: "יֵשׁ", translit: "еш" },
  { id: 10, emoji: "🕳️", en: "there isn't / none", hebrew: "אין", hebrewNikud: "אֵין", translit: "эйн" },
  { id: 11, emoji: "➕", en: "also / too", hebrew: "גם", hebrewNikud: "גַּם", translit: "гам" },
  { id: 12, emoji: "👈", en: "I / me", hebrew: "אני", hebrewNikud: "אֲנִי", translit: "ани" },
  { id: 13, emoji: "👉👨", en: "you (m)", hebrew: "אתה", hebrewNikud: "אַתָּה", translit: "ата" },
  { id: 14, emoji: "👉👩", en: "you (f)", hebrew: "את", hebrewNikud: "אַתְּ", translit: "ат" },
  { id: 15, emoji: "👨", en: "he", hebrew: "הוא", hebrewNikud: "הוּא", translit: "ху" },
  { id: 16, emoji: "👩", en: "she", hebrew: "היא", hebrewNikud: "הִיא", translit: "хи" },
  { id: 17, emoji: "👥", en: "we", hebrew: "אנחנו", hebrewNikud: "אֲנַחְנוּ", translit: "анахну" },
  { id: 18, emoji: "👉👥", en: "you (plural)", hebrew: "אתם", hebrewNikud: "אַתֶּם", translit: "атем" },
  { id: 19, emoji: "👥👥", en: "they", hebrew: "הם", hebrewNikud: "הֵם", translit: "хем" },
  { id: 20, emoji: "❓", en: "what", hebrew: "מה", hebrewNikud: "מָה", translit: "ма" },
  { id: 21, emoji: "🕵️", en: "who", hebrew: "מי", hebrewNikud: "מִי", translit: "ми" },
  { id: 22, emoji: "📍❓", en: "where", hebrew: "איפה", hebrewNikud: "אֵיפֹה", translit: "эйфо" },
  { id: 23, emoji: "⏰❓", en: "when", hebrew: "מתי", hebrewNikud: "מָתַי", translit: "матай" },
  { id: 24, emoji: "🤔❓", en: "why", hebrew: "למה", hebrewNikud: "לָמָה", translit: "лама" },
  { id: 25, emoji: "⚙️❓", en: "how", hebrew: "איך", hebrewNikud: "אֵיךְ", translit: "эйх" },
  { id: 26, emoji: "🔢❓", en: "how much / many", hebrew: "כמה", hebrewNikud: "כַּמָּה", translit: "кама" },
  { id: 27, emoji: "⏱️", en: "now", hebrew: "עכשיו", hebrewNikud: "עַכְשָׁיו", translit: "ахшав" },
  { id: 28, emoji: "📅", en: "today", hebrew: "היום", hebrewNikud: "הַיּוֹם", translit: "хайом" },
  { id: 29, emoji: "🌅", en: "tomorrow", hebrew: "מחר", hebrewNikud: "מָחָר", translit: "махар" },
  { id: 30, emoji: "🌇", en: "yesterday", hebrew: "אתמול", hebrewNikud: "אֶתְמוֹל", translit: "этмоль" },
  { id: 31, emoji: "☀️", en: "day", hebrew: "יום", hebrewNikud: "יוֹם", translit: "йом" },
  { id: 32, emoji: "🌙", en: "night", hebrew: "לילה", hebrewNikud: "לַיְלָה", translit: "лайла" },
  { id: 33, emoji: "☕🌅", en: "morning", hebrew: "בוקר", hebrewNikud: "בֹּקֶר", translit: "бокер" },
  { id: 34, emoji: "🌆", en: "evening", hebrew: "ערב", hebrewNikud: "עֶרֶב", translit: "эрев" },
  { id: 35, emoji: "⏳", en: "time", hebrew: "זמן", hebrewNikud: "זְמַן", translit: "зман" },
  { id: 36, emoji: "💭", en: "want (m)", hebrew: "רוצה", hebrewNikud: "רוֹצֶה", translit: "роце" },
  { id: 37, emoji: "❤️", en: "love / like (m)", hebrew: "אוהב", hebrewNikud: "אוֹהֵב", translit: "охев" },
  { id: 38, emoji: "💡", en: "know (m)", hebrew: "יודע", hebrewNikud: "יוֹדֵעַ", translit: "йодеа" },
  { id: 39, emoji: "🔨", en: "do / make (m)", hebrew: "עושה", hebrewNikud: "עוֹשֶׂה", translit: "осе" },
  { id: 40, emoji: "🚶", en: "go / walk (m)", hebrew: "הולך", hebrewNikud: "הוֹלֵךְ", translit: "холех" },
  { id: 41, emoji: "🏃‍♂️", en: "come (m)", hebrew: "בא", hebrewNikud: "בָּא", translit: "ба" },
  { id: 42, emoji: "👁️", en: "see (m)", hebrew: "רואה", hebrewNikud: "רוֹאֶה", translit: "роэ" },
  { id: 43, emoji: "👂", en: "hear (m)", hebrew: "שומע", hebrewNikud: "שׁוֹמֵעַ", translit: "шомеа" },
  { id: 44, emoji: "🗣️", en: "say / speak (m)", hebrew: "אומר", hebrewNikud: "אוֹמֵר", translit: "омер" },
  { id: 45, emoji: "🍽️", en: "eat (m)", hebrew: "אוכל", hebrewNikud: "אוֹכֵל", translit: "охель" },
  { id: 46, emoji: "🥤", en: "drink (m)", hebrew: "שותה", hebrewNikud: "שׁוֹתֶה", translit: "шоте" },
  { id: 47, emoji: "💼", en: "work (m)", hebrew: "עובד", hebrewNikud: "עוֹבֵד", translit: "овед" },
  { id: 48, emoji: "🧠", en: "think (m)", hebrew: "חושב", hebrewNikud: "חוֹשֵׁב", translit: "хошев" },
  { id: 49, emoji: "🤝", en: "understand (m)", hebrew: "מבין", hebrewNikud: "מֵבִין", translit: "мевин" },
  { id: 50, emoji: "⚠️", en: "need / must (m)", hebrew: "צריך", hebrewNikud: "צָרִיךְ", translit: "царих" },
  { id: 51, emoji: "💪", en: "can / able to (m)", hebrew: "יכול", hebrewNikud: "יָכוֹל", translit: "яхоль" },
  { id: 52, emoji: "💧", en: "water", hebrew: "מים", hebrewNikud: "מַיִם", translit: "маим" },
  { id: 53, emoji: "🍞", en: "bread", hebrew: "לחם", hebrewNikud: "לֶחֶם", translit: "лехем" },
  { id: 54, emoji: "☕", en: "coffee", hebrew: "קפה", hebrewNikud: "קָפֶה", translit: "кафе" },
  { id: 55, emoji: "🫖", en: "tea", hebrew: "תה", hebrewNikud: "תֵּה", translit: "те" },
  { id: 56, emoji: "🥛", en: "milk", hebrew: "חלב", hebrewNikud: "חָלָב", translit: "халав" },
  { id: 57, emoji: "🧀", en: "cheese", hebrew: "גבינה", hebrewNikud: "גְּבִינָה", translit: "гвина" },
  { id: 58, emoji: "🍎", en: "apple", hebrew: "תפוח", hebrewNikud: "תַּפּוּחַ", translit: "тапуах" },
  { id: 59, emoji: "🧔", en: "man", hebrew: "איש", hebrewNikud: "אִישׁ", translit: "иш" },
  { id: 60, emoji: "👱‍♀️", en: "woman", hebrew: "אישה", hebrewNikud: "אִשָּׁה", translit: "иша" },
  { id: 61, emoji: "👦", en: "boy / kid (m)", hebrew: "ילד", hebrewNikud: "יֶלֶד", translit: "елед" },
  { id: 62, emoji: "👧", en: "girl / kid (f)", hebrew: "ילדה", hebrewNikud: "יַלְדָּה", translit: "яльда" },
  { id: 63, emoji: "👨‍👧", en: "dad / father", hebrew: "אבא", hebrewNikud: "אַבָּא", translit: "аба" },
  { id: 64, emoji: "👩‍👧", en: "mom / mother", hebrew: "אמא", hebrewNikud: "אִמָּא", translit: "има" },
  { id: 65, emoji: "🧑‍🤝‍🧑", en: "friend", hebrew: "חבר", hebrewNikud: "חָבֵר", translit: "хавер" },
  { id: 66, emoji: "👨‍👩‍👧‍👦", en: "family", hebrew: "משפחה", hebrewNikud: "מִשְׁפָּחָה", translit: "мишпаха" },
  { id: 67, emoji: "🏠", en: "house / home", hebrew: "בית", hebrewNikud: "בַּיִת", translit: "баит" },
  { id: 68, emoji: "🏙️", en: "city", hebrew: "עיר", hebrewNikud: "עִיר", translit: "ир" },
  { id: 69, emoji: "🛣️", en: "street", hebrew: "רחוב", hebrewNikud: "רְחוֹב", translit: "рехов" },
  { id: 70, emoji: "🚪", en: "room", hebrew: "חדר", hebrewNikud: "חֶדֶר", translit: "хедер" },
  { id: 71, emoji: "🏪", en: "shop / store", hebrew: "חנות", hebrewNikud: "חֲנוּת", translit: "ханут" },
  { id: 72, emoji: "🏢", en: "work / job", hebrew: "עבודה", hebrewNikud: "עֲבוֹדָה", translit: "авода" },
  { id: 73, emoji: "📍", en: "place", hebrew: "מקום", hebrewNikud: "מָקוֹם", translit: "маком" },
  { id: 74, emoji: "🚻", en: "restroom", hebrew: "שירותים", hebrewNikud: "שֵׁרוּתִים", translit: "шерутим" },
  { id: 75, emoji: "💵", en: "money", hebrew: "כסף", hebrewNikud: "כֶּסֶף", translit: "кесеф" },
  { id: 76, emoji: "📖", en: "book", hebrew: "ספר", hebrewNikud: "סֵפֶר", translit: "сефер" },
  { id: 77, emoji: "📱", en: "phone", hebrew: "טלפון", hebrewNikud: "טֶלֶפוֹן", translit: "телефон" },
  { id: 78, emoji: "🪑", en: "table", hebrew: "שולחן", hebrewNikud: "שֻׁלְחָן", translit: "шульхан" },
  { id: 79, emoji: "🚗", en: "car", hebrew: "אוטו", hebrewNikud: "אוֹטוֹ", translit: "ото" },
  { id: 80, emoji: "📦", en: "thing", hebrew: "דבר", hebrewNikud: "דָּבָר", translit: "давар" },
  { id: 81, emoji: "🌱", en: "life", hebrew: "חיים", hebrewNikud: "חַיִּים", translit: "хаим" },
  { id: 82, emoji: "🌍", en: "world", hebrew: "עולם", hebrewNikud: "עוֹלָם", translit: "олам" },
  { id: 83, emoji: "👍", en: "good", hebrew: "טוב", hebrewNikud: "טוֹב", translit: "тов" },
  { id: 84, emoji: "👎", en: "bad", hebrew: "רע", hebrewNikud: "רַע", translit: "ра" },
  { id: 85, emoji: "🐘", en: "big", hebrew: "גדול", hebrewNikud: "גָּדוֹל", translit: "гадоль" },
  { id: 86, emoji: "🐁", en: "small", hebrew: "קטן", hebrewNikud: "קָטָן", translit: "катан" },
  { id: 87, emoji: "🌸", en: "beautiful", hebrew: "יפה", hebrewNikud: "יָפֶה", translit: "яфе" },
  { id: 88, emoji: "🆕", en: "new", hebrew: "חדש", hebrewNikud: "חָדָשׁ", translit: "хадаш" },
  { id: 89, emoji: "🏺", en: "old (objects)", hebrew: "ישן", hebrewNikud: "יָשָׁן", translit: "яшан" },
  { id: 90, emoji: "🔥", en: "hot", hebrew: "חם", hebrewNikud: "חַם", translit: "хам" },
  { id: 91, emoji: "❄️", en: "cold", hebrew: "קר", hebrewNikud: "קַר", translit: "кар" },
  { id: 92, emoji: "🪶", en: "easy / light", hebrew: "קל", hebrewNikud: "קַל", translit: "каль" },
  { id: 93, emoji: "📈", en: "a lot / many", hebrew: "הרבה", hebrewNikud: "הַרְבֵּה", translit: "харбе" },
  { id: 94, emoji: "🤏", en: "a little / few", hebrew: "קצת", hebrewNikud: "קְצָת", translit: "кцат" },
  { id: 95, emoji: "💥", en: "very", hebrew: "מאוד", hebrewNikud: "מְאֹד", translit: "меод" },
  { id: 96, emoji: "🔁", en: "more / again", hebrew: "עוד", hebrewNikud: "עוֹד", translit: "од" },
  { id: 97, emoji: "👇", en: "here", hebrew: "פה", hebrewNikud: "פֹּה", translit: "по" },
  { id: 98, emoji: "👉", en: "there", hebrew: "שם", hebrewNikud: "שָׁם", translit: "шам" },
  { id: 99, emoji: "➡️", en: "right (dir)", hebrew: "ימינה", hebrewNikud: "יָמִינָה", translit: "ямина" },
  { id: 100, emoji: "⬅️", en: "left (dir)", hebrew: "שמאלה", hebrewNikud: "שְׂמֹאלָה", translit: "смола" }
];


const RU_LAT = {
  'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ё':'yo', 'ж':'zh',
  'з':'z', 'и':'i', 'й':'y', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o',
  'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f', 'х':'kh', 'ц':'ts',
  'ч':'ch', 'ш':'sh', 'щ':'shch', 'ъ':'', 'ы':'y', 'ь':'', 'э':'e',
  'ю':'yu', 'я':'ya'
};
function romanize(text) {
  return Array.from(String(text).toLowerCase()).map(function (ch) {
    return RU_LAT[ch] !== undefined ? RU_LAT[ch] : ch;
  }).join('');
}
VOCABULARY.forEach(function (w) { w.translitEn = romanize(w.translit); });

const POS_BY_ID = {};
for (let i = 1; i <= 100; i++) {
  if (i >= 36 && i <= 51) POS_BY_ID[i] = 'verb';
  else if ((i >= 31 && i <= 35) || (i >= 52 && i <= 82)) POS_BY_ID[i] = 'noun';
  else if (i >= 83 && i <= 92) POS_BY_ID[i] = 'adj';
  else POS_BY_ID[i] = 'other';
}
VOCABULARY.forEach(function (w) { w.pos = POS_BY_ID[w.id] || 'other'; });


const SOFIYOT = { 'מ':'ם','כ':'ך','פ':'ף','נ':'ן','צ':'ץ' };


const LS_KEY      = 'hebrew100_learned_v2';
const LS_STATS    = 'hebrew100_stats_v2';
const LS_SELECTED = 'hebrew100_selected_v2';
const LS_SORT     = 'hebrew100_sort_v2';
const LS_POSFILTER = 'hebrew100_posfilter_v1';
const LS_LANG     = 'hebrew100_lang_v1';
const LS_KB       = 'hebrew100_keyboard_v1';
const LS_THEME    = 'hebrew_theme_v1';
const LS_EMOJI    = 'hebrew100_emoji_v1';
const LS_REV_MODE = 'hebrew100_reverse_v1';
const LS_REV_SCRIPT = 'hebrew100_rev_script_v1';


let learned = new Set(loadLearned());
let stats = loadStats();
let selected = new Set(loadSelected().filter(id => learned.has(id)));
let dictSort = loadSort();
let posFilter = loadPosFilter();
let currentLang = loadLang();
let currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
let currentSubTab = 'train';
let keyboardOpen = loadKeyboard();
let toastTimer = null;
let showEmoji = loadShowEmoji();
let reverseMode = loadReverseMode();
let reverseScript = loadReverseScript();
let reviewLocked = false;

let currentLearnWord = null;
let currentCells = [];
let correctionMode = false;
let reviewQueue = [];
let currentReviewWord = null;

function loadLang() {
  try { return localStorage.getItem(LS_LANG) === 'en' ? 'en' : 'ru'; }
  catch (e) { return 'ru'; }
}
function saveLang() {
  try { localStorage.setItem(LS_LANG, currentLang); } catch (e) {}
}
function loadKeyboard() {
  try {
    const raw = localStorage.getItem(LS_KB);
    if (raw === '1') return true;
    if (raw === '0') return false;
  } catch (e) {}
  return !!(window.matchMedia && window.matchMedia('(pointer: fine)').matches);
}
function loadShowEmoji() {
  try {
    const raw = localStorage.getItem(LS_EMOJI);
    if (raw === '0') return false;
    if (raw === '1') return true;
  } catch (e) {}
  return true;
}
function saveShowEmoji() {
  try { localStorage.setItem(LS_EMOJI, showEmoji ? '1' : '0'); } catch (e) {}
}
function loadReverseMode() {
  try { return localStorage.getItem(LS_REV_MODE) === '1'; } catch (e) { return false; }
}
function saveReverseMode() {
  try { localStorage.setItem(LS_REV_MODE, reverseMode ? '1' : '0'); } catch (e) {}
}
function loadReverseScript() {
  try {
    const v = localStorage.getItem(LS_REV_SCRIPT);
    return (v === 'nikud' || v === 'cursive') ? v : 'plain';
  } catch (e) { return 'plain'; }
}
function saveReverseScript() {
  try { localStorage.setItem(LS_REV_SCRIPT, reverseScript); } catch (e) {}
}


const I18N = {
  ru: {
    appTitle: 'Иврит · 100 слов',
    tabLearn: 'Обучение',
    tabReview: 'Проверка',
    subtabTrain: 'Тренировка',
    dictionary: 'Словарь',
    learnSubtitle: 'Введи слово по буквам справа налево',
    check: 'Проверить',
    emptyReviewTitle: 'Пока нечего проверять',
    emptyReviewText: 'Сначала выучи хотя бы одно слово в режиме «Обучение». Затем здесь можно будет проверить свою память.',
    emptyDictTitle: 'Словарь пуст',
    emptyDictText: 'Выучите слова в разделе «Обучение» — и они появятся здесь с статистикой ответов.',
    selectAll: '✓ Выбрать все',
    clearAll: '✕ Снять все',
    sortDefault: '↕️ По порядку',
    sortWorst: '📉 Сложные ↑',
    sortBest: '📈 Лёгкие ↑',
    reset: 'Сбросить прогресс',
    resetConfirm: 'Сбросить весь прогресс? Выученные слова и статистика будут удалены.',
    learnError: 'Есть ошибки — перепиши слово целиком, правильные буквы тоже',
    trainSelected: 'Тренируем выбранные: {n} из {m} слов',
    trainAll: 'Тренируем все выученные: {n} слов',
    dictAll: '🎯 Для тренировки: все ({n})',
    dictSelected: '🎯 Для тренировки выбрано: {n} из {m}',
    noSelectedTitle: 'Нет выбранных слов',
    noSelectedText: 'Открой «Словарь» и выбери слова для тренировки.',
    allLearned: 'Все 100 слов выучены!',
    greatRepeat: 'Отлично! Повтори вслух:',
    ttsUnavailable: 'Озвучка недоступна в этом браузере',
    keyboardTitle: 'Клавиатура',
    keyboardHide: 'Скрыть клавиатуру',
    themeDark: 'Тёмная тема',
    themeLight: 'Светлая тема',
    posAll: 'Все',
    posNoun: 'Существительные',
    posVerb: 'Глаголы',
    resetFilter: 'Сбросить фильтр',
    emptyFilterTitle: 'В этой категории пока нет слов',
    emptyFilterText: 'Выучите слова этой категории или сбросьте фильтр.',
    allCategoryTitle: 'Категория выучена',
    allCategoryText: 'Все слова этой категории выучены. Смените фильтр или сбросьте его.',
    allCategoryLearned: 'Все слова этой категории выучены',
    allLearnedText: 'Отличная работа! Можно повторить слова в разделе «Проверка» или сбросить прогресс.',
    emojiToggle: 'Эмодзи',
    dirNormal: 'Перевод → Иврит',
    dirReverse: 'Иврит → Перевод',
    scriptPlain: 'Обычный',
    scriptNikud: 'Никуд',
    scriptCursive: 'Прописной',
    reversePlaceholder: 'значение по-английски…',
    showAnswer: 'Показать ответ'
  },
  en: {
    appTitle: 'Hebrew · 100 words',
    tabLearn: 'Learn',
    tabReview: 'Review',
    subtabTrain: 'Practice',
    dictionary: 'Dictionary',
    learnSubtitle: 'Type the word letter by letter from right to left',
    check: 'Check',
    emptyReviewTitle: 'Nothing to review yet',
    emptyReviewText: 'Learn at least one word in the “Learn” section first, then come back to test your memory.',
    emptyDictTitle: 'Dictionary is empty',
    emptyDictText: 'Learn words in the “Learn” section — they will appear here with answer statistics.',
    selectAll: '✓ Select all',
    clearAll: '✕ Clear all',
    sortDefault: '↕️ In order',
    sortWorst: '📉 Hardest ↑',
    sortBest: '📈 Easiest ↑',
    reset: 'Reset progress',
    resetConfirm: 'Reset all progress? Learned words and statistics will be deleted.',
    learnError: 'There are mistakes — retype the whole word, including the correct letters',
    trainSelected: 'Practicing selected: {n} of {m} words',
    trainAll: 'Practicing all learned words: {n}',
    dictAll: '🎯 All words for practice ({n})',
    dictSelected: '🎯 Selected for practice: {n} of {m}',
    noSelectedTitle: 'No selected words',
    noSelectedText: 'Open “Dictionary” and choose words to practice.',
    allLearned: 'All 100 words learned!',
    greatRepeat: 'Correct! Say it out loud:',
    ttsUnavailable: 'Speech is not available in this browser',
    keyboardTitle: 'Keyboard',
    keyboardHide: 'Hide keyboard',
    themeDark: 'Dark theme',
    themeLight: 'Light theme',
    posAll: 'All',
    posNoun: 'Nouns',
    posVerb: 'Verbs',
    resetFilter: 'Reset filter',
    emptyFilterTitle: 'No words in this category yet',
    emptyFilterText: 'Learn words in this category or reset the filter.',
    allCategoryTitle: 'Category complete',
    allCategoryText: 'All words in this category are learned. Change or reset the filter.',
    allCategoryLearned: 'All words in this category are learned',
    allLearnedText: 'Great job! Review the words in the “Review” section or reset your progress.',
    emojiToggle: 'Emoji',
    dirNormal: 'Translation → Hebrew',
    dirReverse: 'Hebrew → Translation',
    scriptPlain: 'Print',
    scriptNikud: 'Niqqud',
    scriptCursive: 'Cursive',
    reversePlaceholder: 'English meaning…',
    showAnswer: 'Show answer'
  }
};

function t(key, vars) {
  const dict = I18N[currentLang] || I18N.ru;
  let out = dict[key] !== undefined ? dict[key] : I18N.ru[key];
  if (out === undefined) out = key;
  if (vars) {
    Object.keys(vars).forEach(function (k) {
      out = out.split('{' + k + '}').join(String(vars[k]));
    });
  }
  return out;
}
function translitFor(word) {
  return currentLang === 'en' ? word.translitEn : word.translit;
}

function posMatches(word) {
  return posFilter === 'all' || word.pos === posFilter;
}
function filteredLearnedWords() {
  return VOCABULARY.filter(function (w) { return learned.has(w.id) && posMatches(w); });
}
function setI18nText(el, key) {
  if (!el) return;
  el.dataset.i18n = key;
  el.textContent = t(key);
}
function renderPosFilters() {
  const containers = ['pos-filter-learn', 'pos-filter-train', 'pos-filter-dict'];
  const cats = [
    { key: 'all', label: t('posAll') },
    { key: 'noun', label: t('posNoun') },
    { key: 'verb', label: t('posVerb') }
  ];
  containers.forEach(function (id) {
    const box = document.getElementById(id);
    if (!box) return;
    box.innerHTML = '';
    cats.forEach(function (cat) {
      const total = cat.key === 'all'
        ? VOCABULARY.length
        : VOCABULARY.filter(function (w) { return w.pos === cat.key; }).length;
      const done = cat.key === 'all'
        ? learned.size
        : VOCABULARY.filter(function (w) { return w.pos === cat.key && learned.has(w.id); }).length;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pos-chip' + (posFilter === cat.key ? ' active' : '');
      btn.textContent = cat.label + ' ' + done + '/' + total;
      btn.addEventListener('click', function () { setPosFilter(cat.key); });
      box.appendChild(btn);
    });
  });
}
function setPosFilter(filter) {
  if (filter !== 'all' && filter !== 'noun' && filter !== 'verb') filter = 'all';
  if (posFilter === filter) return;
  posFilter = filter;
  savePosFilter();
  reviewQueue = [];
  updateProgress();
  if (document.getElementById('screen-learn').classList.contains('active')) {
    renderLearnCard();
  } else if (document.getElementById('screen-review').classList.contains('active')) {
    switchSubTab(currentSubTab);
  }
}


function loadLearned() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}
function saveLearned() {
  try { localStorage.setItem(LS_KEY, JSON.stringify([...learned])); } catch {}
}

function loadStats() {
  try {
    const raw = localStorage.getItem(LS_STATS);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return obj && typeof obj === 'object' ? obj : {};
  } catch { return {}; }
}
function saveStats() {
  try { localStorage.setItem(LS_STATS, JSON.stringify(stats)); } catch {}
}

function loadSelected() {
  try {
    const raw = localStorage.getItem(LS_SELECTED);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}
function saveSelected() {
  try { localStorage.setItem(LS_SELECTED, JSON.stringify([...selected])); } catch {}
}

function loadSort() {
  try { return localStorage.getItem(LS_SORT) || 'default'; } catch { return 'default'; }
}
function saveSort(v) {
  try { localStorage.setItem(LS_SORT, v); } catch {}
}

function loadPosFilter() {
  try {
    const v = localStorage.getItem(LS_POSFILTER);
    return (v === 'noun' || v === 'verb') ? v : 'all';
  } catch { return 'all'; }
}
