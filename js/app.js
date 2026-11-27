function savePosFilter() {
  try { localStorage.setItem(LS_POSFILTER, posFilter); } catch {}
}


function getWordStats(id) {
  const s = stats[id] || { c: 0, w: 0 };
  const total = s.c + s.w;
  const rate = total > 0 ? Math.round(s.c / total * 100) : null;
  return { c: s.c, w: s.w, total, rate };
}
function recordResult(id, correct) {
  if (!stats[id]) stats[id] = { c: 0, w: 0 };
  if (correct) stats[id].c++;
  else stats[id].w++;
  saveStats();
}
function rateColor(rate) {
  if (rate === null || rate === undefined) return 'var(--muted)';
  if (rate >= 80) return 'var(--olive)';
  if (rate >= 50) return 'var(--accent2)';
  return 'var(--danger)';
}


let voices = [];
let heVoice = null;
let ruVoice = null;
let enVoice = null;
let anyVoice = null;
let currentUtterance = null; 
let pendingSpeak = null;

function findVoice(langRe, nameRe) {
  return voices.find(function (v) { return langRe.test(v.lang || ''); }) ||
         voices.find(function (v) { return nameRe.test(v.name || ''); }) || null;
}
function refreshVoices() {
  if (!('speechSynthesis' in window)) return;
  try { voices = speechSynthesis.getVoices() || []; }
  catch (e) { voices = []; }
  heVoice = findVoice(/^he([-_]|$)/i, /hebrew/i);
  ruVoice = findVoice(/^ru([-_]|$)/i, /russian/i);
  enVoice = findVoice(/^en[-_]?us/i, /english/i) || findVoice(/^en([-_]|$)/i, /english/i);
  anyVoice = voices.find(function (v) { return v.default; }) || voices[0] || null;
}
if ('speechSynthesis' in window) {
  refreshVoices();
  if (typeof speechSynthesis.addEventListener === 'function') {
    speechSynthesis.addEventListener('voiceschanged', refreshVoices);
  } else {
    speechSynthesis.onvoiceschanged = refreshVoices;
  }
  
  const unlockTTS = function () {
    try { speechSynthesis.resume(); } catch (e) {}
    refreshVoices();
    document.removeEventListener('pointerdown', unlockTTS);
    document.removeEventListener('touchstart', unlockTTS);
    document.removeEventListener('keydown', unlockTTS);
  };
  document.addEventListener('pointerdown', unlockTTS, { passive: true });
  document.addEventListener('touchstart', unlockTTS, { passive: true });
  document.addEventListener('keydown', unlockTTS);
}

function showToast(text) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove('show'); }, 1900);
}

function speakText(text, lang, voice, rate) {
  if (!('speechSynthesis' in window)) return false;
  try {
    speechSynthesis.cancel();
    if (speechSynthesis.paused) speechSynthesis.resume();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    if (voice) u.voice = voice;
    u.rate = rate;
    u.pitch = 1;
    currentUtterance = u;
    speechSynthesis.speak(u);
    return true;
  } catch (e) { return false; }
}

function speakWord(word, slow, isRetry) {
  if (!word) return;
  if (!('speechSynthesis' in window)) {
    showToast(t('ttsUnavailable'));
    return;
  }
  refreshVoices();
  if (!voices.length) {
    if (isRetry) { showToast(t('ttsUnavailable')); return; }
    pendingSpeak = { word: word, slow: slow };
    setTimeout(function () {
      const p = pendingSpeak;
      pendingSpeak = null;
      if (p) speakWord(p.word, p.slow, true);
    }, 350);
    return;
  }

  const rate = slow ? 0.75 : 1;
  let text, lang, voice;
  if (heVoice) {
    text = word.hebrew;
    lang = 'he-IL';
    voice = heVoice;
  } else if (currentLang === 'ru' && ruVoice) {
    text = word.translit;
    lang = 'ru-RU';
    voice = ruVoice;
  } else if (enVoice) {
    text = word.translitEn;
    lang = 'en-US';
    voice = enVoice;
  } else if (ruVoice) {
    text = word.translit;
    lang = 'ru-RU';
    voice = ruVoice;
  } else {
    text = word.translitEn;
    lang = (anyVoice && anyVoice.lang) ? anyVoice.lang : 'en-US';
    voice = anyVoice;
  }
  speakText(text, lang, voice, rate);
}


function updateProgress() {
  const total = VOCABULARY.length;
  const learnedCount = learned.size;
  document.getElementById('progress-fill').style.width = (learnedCount / total * 100) + '%';
  document.getElementById('progress-text').textContent = `${learnedCount} / ${total}`;
  document.getElementById('review-count').textContent = learnedCount;
  document.getElementById('dict-count').textContent = learnedCount;
  renderPosFilters();
}

function switchTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('main').forEach(m => m.classList.remove('active'));
  if (name === 'learn') {
    document.getElementById('tab-learn').classList.add('active');
    document.getElementById('screen-learn').classList.add('active');
    renderLearnCard();
  } else {
    document.getElementById('tab-review').classList.add('active');
    document.getElementById('screen-review').classList.add('active');
    switchSubTab(currentSubTab);
  }
  syncKeyboard();
}
function switchSubTab(name) {
  currentSubTab = name;
  document.querySelectorAll('.subtab').forEach(t => t.classList.remove('active'));
  document.getElementById('subtab-' + name).classList.add('active');
  if (name === 'train') {
    document.getElementById('review-train').style.display = '';
    document.getElementById('review-dict').style.display = 'none';
    renderReview();
  } else {
    document.getElementById('review-train').style.display = 'none';
    document.getElementById('review-dict').style.display = 'flex';
    renderDictionary();
  }
  syncKeyboard();
}

document.getElementById('tab-learn').addEventListener('click', () => switchTab('learn'));
document.getElementById('tab-review').addEventListener('click', () => switchTab('review'));
document.getElementById('subtab-train').addEventListener('click', () => switchSubTab('train'));
document.getElementById('subtab-dict').addEventListener('click', () => switchSubTab('dict'));

document.querySelectorAll('.flag-btn').forEach(function (b) {
  b.addEventListener('click', function () { setLang(b.dataset.lang); });
});
document.getElementById('btn-theme').addEventListener('click', toggleTheme);
document.getElementById('btn-keyboard').addEventListener('click', onKeyboardToggle);
document.getElementById('btn-emoji').addEventListener('click', toggleEmoji);
document.getElementById('btn-keyboard-close').addEventListener('click', function () {
  setKeyboardOpen(false);
});


function renderLearnCard() {
  const pool = VOCABULARY.filter(posMatches);
  let next = null;
  for (let i = 0; i < pool.length; i++) {
    if (!learned.has(pool[i].id)) { next = pool[i]; break; }
  }

  const card = document.getElementById('learn-card');
  const empty = document.getElementById('learn-empty');
  const hint = document.getElementById('learn-hint');

  if (!next) {
    currentLearnWord = null;
    correctionMode = false;
    card.style.display = 'none';
    empty.style.display = 'flex';
    hint.textContent = '';
    const title = empty.querySelector('.empty-title');
    const text = empty.querySelector('.empty-text');
    const reset = document.getElementById('btn-learn-reset-filter');
    if (posFilter === 'all') {
      setI18nText(title, 'allLearned');
      setI18nText(text, 'allLearnedText');
      reset.style.display = 'none';
      showToast(t('allLearned'));
    } else {
      setI18nText(title, 'allCategoryTitle');
      setI18nText(text, 'allCategoryText');
      reset.style.display = '';
      showToast(t('allCategoryLearned'));
    }
    updateProgress();
    return;
  }

  card.style.display = '';
  empty.style.display = 'none';
  currentLearnWord = next;
  correctionMode = false;

  card.classList.remove('correct', 'wrong');
  document.getElementById('learn-emoji').textContent = currentLearnWord.emoji;
  document.getElementById('learn-en').textContent = currentLearnWord.en;
  hint.textContent = '';

  buildCells(currentLearnWord.hebrew);
  updateProgress();
}

function buildCells(hebrew) {
  const container = document.getElementById('learn-cells');
  container.innerHTML = '';
  currentCells = [];
  const letters = [...hebrew];
  letters.forEach((letter, i) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'text';
    input.lang = 'he';
    input.dir = 'rtl';
    input.maxLength = 1;
    input.className = 'cell';
    input.dataset.index = i;
    input.dataset.expected = letter;
    input.autocomplete = 'off';
    container.appendChild(input);
    currentCells.push(input);
    attachCellHandler(input, i);
  });
  applyKbInputGuard();
  setTimeout(function () {
    if (currentCells[0]) focusNoScroll(currentCells[0]);
  }, 150);
}

function attachCellHandler(input, idx) {
  input.addEventListener('input', (e) => {
    let val = input.value;
    if (!val) return;
    let ch = [...val].pop();
    if (idx === currentCells.length - 1 && SOFIYOT[ch]) {
      ch = SOFIYOT[ch];
    }
    input.value = ch;
    input.classList.remove('wrong-cell', 'shake');

    if (idx + 1 < currentCells.length) {
      const next = currentCells[idx + 1];
      if (correctionMode && next.value) {
        next.value = '';
        next.classList.remove('wrong-cell', 'shake');
      }
      focusNoScroll(next);
    } else {
      input.blur();
      checkLearnAnswer();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      if (input.value === '') {
        if (idx - 1 >= 0) {
          const prev = currentCells[idx - 1];
          focusNoScroll(prev);
          prev.value = '';
          prev.classList.remove('wrong-cell', 'shake');
          e.preventDefault();
        }
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      checkLearnAnswer();
    }
  });

  input.addEventListener('focus', () => {
    setTimeout(function () {
      if (document.activeElement === input) input.select();
    }, 0);
  });
}

function checkLearnAnswer() {
  if (!currentLearnWord) return;
  const expected = [...currentLearnWord.hebrew];
  let allFilled = currentCells.every(c => c.value && c.value.length > 0);
  if (!allFilled) {
    for (let i = 0; i < currentCells.length; i++) {
      if (!currentCells[i].value) { currentCells[i].focus(); return; }
    }
  }
  let wrongIndices = [];
  for (let i = 0; i < currentCells.length; i++) {
    let val = currentCells[i].value;
    if (i === currentCells.length - 1 && SOFIYOT[val]) val = SOFIYOT[val];
    if (val !== expected[i]) wrongIndices.push(i);
  }

  if (wrongIndices.length === 0) {
    const card = document.getElementById('learn-card');
    card.classList.add('correct');
    if (navigator.vibrate) try { navigator.vibrate(50); } catch {}
    learned.add(currentLearnWord.id);
    saveLearned();
    updateProgress();
    correctionMode = false;
    setTimeout(() => {
      if (learned.size >= VOCABULARY.length) {
        showModal('🎉', t('allLearned'), translitFor(currentLearnWord), currentLearnWord.hebrew);
        setTimeout(() => { renderLearnCard(); }, 2500);
      } else {
        renderLearnCard();
      }
    }, 1200);
  } else {
    correctionMode = true;
    wrongIndices.forEach(i => {
      currentCells[i].classList.add('wrong-cell', 'shake');
    });
    const card = document.getElementById('learn-card');
    card.classList.add('wrong');
    if (navigator.vibrate) try { navigator.vibrate(30); } catch {}
    document.getElementById('learn-hint').textContent = t('learnError');

    const firstWrong = Math.min(...wrongIndices);
    setTimeout(() => {
      currentCells.forEach(c => c.classList.remove('shake'));
      focusNoScroll(currentCells[0]);
      try { currentCells[0].select(); } catch (e) {}
    }, 450);
  }
}


document.getElementById('btn-audio-1').addEventListener('click', () => {
  if (currentLearnWord) speakWord(currentLearnWord, false);
});
document.getElementById('btn-audio-slow').addEventListener('click', () => {
  if (currentLearnWord) speakWord(currentLearnWord, true);
});


function buildReviewQueue() {
  let pool = filteredLearnedWords();
  if (selected.size > 0) {
    pool = pool.filter(w => selected.has(w.id));
  }
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

function updateReverseUI() {
  const normalBtn = document.getElementById('btn-dir-normal');
  const reverseBtn = document.getElementById('btn-dir-reverse');
  if (normalBtn) normalBtn.classList.toggle('active', !reverseMode);
  if (reverseBtn) reverseBtn.classList.toggle('active', reverseMode);
  const scriptBar = document.getElementById('rev-script-bar');
  if (scriptBar) scriptBar.style.display = reverseMode ? '' : 'none';
  ['plain', 'nikud', 'cursive'].forEach(function (s) {
    const b = document.getElementById('btn-script-' + s);
    if (b) b.classList.toggle('active', reverseScript === s);
  });
}
function setReverseMode(on) {
  reverseMode = !!on;
  saveReverseMode();
  reviewQueue = [];
  updateReverseUI();
  syncKeyboard();
  renderReview();
}
function setReverseScript(script) {
  if (script !== 'plain' && script !== 'nikud' && script !== 'cursive') script = 'plain';
  reverseScript = script;
  saveReverseScript();
  updateReverseUI();
  renderReview();
}

function renderReview() {
  updateProgress();
  const emptyBox = document.getElementById('review-empty');
  const emptyTitle = emptyBox.querySelector('.empty-title');
  const emptyText = emptyBox.querySelector('.empty-text');
  const resetFilterBtn = document.getElementById('btn-train-reset-filter');
  const content = document.getElementById('review-content');

  if (learned.size === 0) {
    emptyBox.style.display = 'flex';
    setI18nText(emptyTitle, 'emptyReviewTitle');
    setI18nText(emptyText, 'emptyReviewText');
    resetFilterBtn.style.display = 'none';
    content.style.display = 'none';
    return;
  }

  const filtered = filteredLearnedWords();
  if (filtered.length === 0) {
    emptyBox.style.display = 'flex';
    setI18nText(emptyTitle, 'emptyFilterTitle');
    setI18nText(emptyText, 'emptyFilterText');
    resetFilterBtn.style.display = posFilter !== 'all' ? '' : 'none';
    content.style.display = 'none';
    return;
  }

  emptyBox.style.display = 'none';
  content.style.display = 'block';

  updateTrainInfo();

  if (reviewQueue.length === 0) reviewQueue = buildReviewQueue();
  if (reviewQueue.length === 0) {
    emptyBox.style.display = 'flex';
    setI18nText(emptyTitle, 'noSelectedTitle');
    setI18nText(emptyText, 'noSelectedText');
    resetFilterBtn.style.display = posFilter !== 'all' ? '' : 'none';
    content.style.display = 'none';
    return;
  }
  currentReviewWord = reviewQueue.shift();
  reviewLocked = false;
  const card = document.getElementById('review-card');
  card.classList.remove('correct', 'wrong');
  const emojiEl = document.getElementById('review-emoji');
  const enEl = document.getElementById('review-en');
  const prompt = document.getElementById('review-hebrew-prompt');
  const showBtn = document.getElementById('btn-review-show');
  const answerEl = document.getElementById('review-answer');
  const input = document.getElementById('review-input');
  emojiEl.textContent = currentReviewWord.emoji;
  input.value = '';
  input.classList.remove('shake');
  answerEl.textContent = '';
  if (reverseMode) {
    enEl.style.display = 'none';
    showBtn.style.display = '';
    prompt.style.display = '';
    prompt.textContent = reverseScript === 'nikud'
      ? (currentReviewWord.hebrewNikud || currentReviewWord.hebrew)
      : currentReviewWord.hebrew;
    prompt.classList.toggle('is-cursive', reverseScript === 'cursive');
    prompt.classList.toggle('is-nikud', reverseScript === 'nikud');
    input.lang = 'en';
    input.dir = 'ltr';
    input.style.direction = 'ltr';
    input.placeholder = t('reversePlaceholder');
    answerEl.style.direction = 'ltr';
  } else {
    enEl.style.display = '';
    enEl.textContent = currentReviewWord.en;
    showBtn.style.display = 'none';
    prompt.style.display = 'none';
    prompt.textContent = '';
    prompt.classList.remove('is-cursive', 'is-nikud');
    input.lang = 'he';
    input.dir = 'rtl';
    input.style.direction = 'rtl';
    input.placeholder = '…';
    answerEl.style.direction = 'rtl';
  }
  applyKbInputGuard();
  setTimeout(function () { focusNoScroll(input); }, 200);
}

function normalizeEnglish(s) {
  return String(s)
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function acceptedEnglishAnswers(enText) {
  const out = [];
  const add = function (s) {
    const n = normalizeEnglish(s);
    if (n && out.indexOf(n) === -1) out.push(n);
    if (n.indexOf('to ') === 0) {
      const w = n.slice(3).trim();
      if (w && out.indexOf(w) === -1) out.push(w);
    }
  };
  add(enText);
  String(enText).split('/').forEach(function (part) { add(part); });
  return out;
}

function checkReviewAnswer() {
  if (!currentReviewWord || reviewLocked) return;
  const input = document.getElementById('review-input');
  const ans = (input.value || '').trim();
  if (!ans) { focusNoScroll(input); return; }

  if (reverseMode) {
    const norm = normalizeEnglish(ans);
    const accepted = acceptedEnglishAnswers(currentReviewWord.en);
    if (accepted.indexOf(norm) !== -1) {
      reviewLocked = true;
      recordResult(currentReviewWord.id, true);
      speakWord(currentReviewWord, false);
      const card = document.getElementById('review-card');
      card.classList.add('correct');
      if (navigator.vibrate) try { navigator.vibrate(50); } catch {}
      showModal('🎉', currentReviewWord.en, translitFor(currentReviewWord), currentReviewWord.hebrew);
      setTimeout(() => { hideModal(); renderReview(); }, 1500);
    } else {
      recordResult(currentReviewWord.id, false);
      input.classList.add('shake');
      const card = document.getElementById('review-card');
      card.classList.add('wrong');
      if (navigator.vibrate) try { navigator.vibrate(40); } catch {}
      document.getElementById('review-answer').textContent = '✓ ' + currentReviewWord.en + ' · ' + translitFor(currentReviewWord);
      reviewQueue.push(currentReviewWord);
      setTimeout(() => {
        input.classList.remove('shake');
        card.classList.remove('wrong');
      }, 600);
    }
    return;
  }

  let normalized = [...ans].join('');
  if (normalized.length) {
    const last = normalized.length - 1;
    const lastChar = normalized[last];
    if (SOFIYOT[lastChar]) {
      normalized = normalized.slice(0, last) + SOFIYOT[lastChar];
    }
  }
  if (normalized === currentReviewWord.hebrew) {
    reviewLocked = true;
    recordResult(currentReviewWord.id, true);
    speakWord(currentReviewWord, false);
    const card = document.getElementById('review-card');
    card.classList.add('correct');
    if (navigator.vibrate) try { navigator.vibrate(50); } catch {}
    showModal('🎉', t('greatRepeat'), translitFor(currentReviewWord), currentReviewWord.hebrew);
    setTimeout(() => { hideModal(); renderReview(); }, 1500);
  } else {
    recordResult(currentReviewWord.id, false);
    input.classList.add('shake');
    const card = document.getElementById('review-card');
    card.classList.add('wrong');
    if (navigator.vibrate) try { navigator.vibrate(40); } catch {}
    document.getElementById('review-answer').textContent = '✓ ' + currentReviewWord.hebrew;
    reviewQueue.push(currentReviewWord);
    setTimeout(() => {
      input.classList.remove('shake');
      card.classList.remove('wrong');
    }, 600);
  }
}
document.getElementById('btn-check').addEventListener('click', checkReviewAnswer);
document.getElementById('btn-review-show').addEventListener('click', function () {
  if (!currentReviewWord || !reverseMode || reviewLocked) return;
  reviewLocked = true;
  recordResult(currentReviewWord.id, false);
  document.getElementById('review-answer').textContent = '✓ ' + currentReviewWord.en + ' · ' + translitFor(currentReviewWord);
  reviewQueue.push(currentReviewWord);
  const card = document.getElementById('review-card');
  card.classList.add('wrong');
  setTimeout(function () {
    card.classList.remove('wrong');
    renderReview();
  }, 1200);
});
document.getElementById('btn-dir-normal').addEventListener('click', function () { setReverseMode(false); });
document.getElementById('btn-dir-reverse').addEventListener('click', function () { setReverseMode(true); });
document.getElementById('btn-script-plain').addEventListener('click', function () { setReverseScript('plain'); });
document.getElementById('btn-script-nikud').addEventListener('click', function () { setReverseScript('nikud'); });
document.getElementById('btn-script-cursive').addEventListener('click', function () { setReverseScript('cursive'); });
document.getElementById('review-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); checkReviewAnswer(); }
});


function renderDictionary() {
  updateProgress();
  const learnedList = filteredLearnedWords();
  const emptyBox = document.getElementById('dict-empty');
  const emptyTitle = emptyBox.querySelector('.empty-title');
  const emptyText = emptyBox.querySelector('.empty-text');
  const resetFilterBtn = document.getElementById('btn-dict-reset-filter');

  if (learnedList.length === 0) {
    emptyBox.style.display = 'flex';
    document.getElementById('dict-list').style.display = 'none';
    document.getElementById('dict-selected-info').style.display = 'none';
    document.querySelector('.dict-controls').style.display = 'none';
    if (learned.size === 0) {
      setI18nText(emptyTitle, 'emptyDictTitle');
      setI18nText(emptyText, 'emptyDictText');
      resetFilterBtn.style.display = 'none';
    } else {
      setI18nText(emptyTitle, 'emptyFilterTitle');
      setI18nText(emptyText, 'emptyFilterText');
      resetFilterBtn.style.display = posFilter !== 'all' ? '' : 'none';
    }
    return;
  }
  emptyBox.style.display = 'none';
  document.getElementById('dict-list').style.display = 'flex';
  document.getElementById('dict-selected-info').style.display = '';
  document.querySelector('.dict-controls').style.display = '';

  
  updateDictSelectedInfo();

  
  const sorted = [...learnedList];
  if (dictSort === 'worst') {
    sorted.sort((a, b) => {
      const ra = getWordStats(a.id).rate;
      const rb = getWordStats(b.id).rate;
      if (ra === null && rb === null) return a.id - b.id;
      if (ra === null) return -1;  
      if (rb === null) return 1;
      return ra - rb;  
    });
  } else if (dictSort === 'best') {
    sorted.sort((a, b) => {
      const ra = getWordStats(a.id).rate;
      const rb = getWordStats(b.id).rate;
      if (ra === null && rb === null) return a.id - b.id;
      if (ra === null) return 1;   
      if (rb === null) return -1;
      return rb - ra;  
    });
  }

  const list = document.getElementById('dict-list');
  list.innerHTML = '';
  sorted.forEach(word => {
    list.appendChild(createDictItem(word));
  });

  updateSortButton();
}

function createDictItem(word) {
  const s = getWordStats(word.id);
  const isChecked = selected.has(word.id);
  const rateText = s.rate === null ? '—' : s.rate + '%';
  const color = rateColor(s.rate);
  const fillWidth = s.rate === null ? 0 : s.rate;
  const detailText = s.total > 0 ? `${s.c}/${s.total}` : '';

  const item = document.createElement('div');
  item.className = 'dict-item' + (isChecked ? ' selected' : '');

  const checkLabel = document.createElement('label');
  checkLabel.className = 'dict-check';
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.checked = isChecked;
  const box = document.createElement('span');
  box.className = 'box';
  checkLabel.appendChild(cb);
  checkLabel.appendChild(box);

  const emojiEl = document.createElement('div');
  emojiEl.className = 'dict-emoji';
  emojiEl.textContent = word.emoji;

  const infoEl = document.createElement('div');
  infoEl.className = 'dict-info';
  const hebrewEl = document.createElement('div');
  hebrewEl.className = 'dict-hebrew';
  hebrewEl.textContent = word.hebrew;
  const translitEl = document.createElement('div');
  translitEl.className = 'dict-translit';
  translitEl.innerHTML = `${translitFor(word)} <span class="dict-speak">🔊</span>`;
  translitEl.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    speakWord(word, false);
  });
  const enEl = document.createElement('div');
  enEl.className = 'dict-en';
  enEl.textContent = word.en;
  infoEl.appendChild(hebrewEl);
  infoEl.appendChild(translitEl);
  infoEl.appendChild(enEl);

  const rateEl = document.createElement('div');
  rateEl.className = 'dict-rate';
  const rateNum = document.createElement('div');
  rateNum.className = 'dict-rate-num';
  rateNum.style.color = color;
  rateNum.textContent = rateText;
  const rateBar = document.createElement('div');
  rateBar.className = 'dict-rate-bar';
  const rateFill = document.createElement('div');
  rateFill.className = 'dict-rate-fill';
  rateFill.style.width = fillWidth + '%';
  rateFill.style.background = color;
  rateBar.appendChild(rateFill);
  rateEl.appendChild(rateNum);
  rateEl.appendChild(rateBar);
  if (detailText) {
    const detail = document.createElement('div');
    detail.className = 'dict-rate-detail';
    detail.textContent = detailText;
    rateEl.appendChild(detail);
  }

  cb.addEventListener('change', () => {
    if (cb.checked) selected.add(word.id);
    else selected.delete(word.id);
    saveSelected();
    item.classList.toggle('selected', cb.checked);
    reviewQueue = []; 
    updateDictSelectedInfo();
  });

  item.appendChild(checkLabel);
  item.appendChild(emojiEl);
  item.appendChild(infoEl);
  item.appendChild(rateEl);
  return item;
}

function updateTrainInfo() {
  const infoEl = document.getElementById('train-info');
  if (!infoEl) return;
  if (learned.size === 0) { infoEl.textContent = ''; return; }
  const filtered = filteredLearnedWords();
  if (selected.size > 0) {
    const sel = filtered.filter(function (w) { return selected.has(w.id); }).length;
    infoEl.textContent = t('trainSelected', { n: sel, m: filtered.length });
  } else {
    infoEl.textContent = t('trainAll', { n: filtered.length });
  }
}

function updateDictSelectedInfo() {
  const learnedList = filteredLearnedWords();
  if (learnedList.length === 0) return;
  const infoEl = document.getElementById('dict-selected-info');
  const sel = learnedList.filter(function (w) { return selected.has(w.id); }).length;
  if (sel === 0) {
    infoEl.textContent = t('dictAll', { n: learnedList.length });
  } else {
    infoEl.textContent = t('dictSelected', { n: sel, m: learnedList.length });
  }
}


document.getElementById('btn-select-all').addEventListener('click', () => {
  VOCABULARY.forEach(w => {
    if (learned.has(w.id) && posMatches(w)) selected.add(w.id);
  });
  saveSelected();
  reviewQueue = [];
  renderDictionary();
});

document.getElementById('btn-select-none').addEventListener('click', () => {
  VOCABULARY.forEach(w => {
    if (learned.has(w.id) && posMatches(w)) selected.delete(w.id);
  });
  saveSelected();
  reviewQueue = [];
  renderDictionary();
});

function cycleSort() {
  if (dictSort === 'default') dictSort = 'worst';
  else if (dictSort === 'worst') dictSort = 'best';
  else dictSort = 'default';
  saveSort(dictSort);
  renderDictionary();
}
function updateSortButton() {
  const btn = document.getElementById('btn-sort');
  const labels = {
    'default': t('sortDefault'),
    'worst':   t('sortWorst'),
    'best':    t('sortBest')
  };
  btn.textContent = labels[dictSort];
  btn.classList.toggle('active-sort', dictSort !== 'default');
}
document.getElementById('btn-sort').addEventListener('click', cycleSort);

document.getElementById('btn-learn-reset-filter').addEventListener('click', function () {
  setPosFilter('all');
});
document.getElementById('btn-train-reset-filter').addEventListener('click', function () {
  setPosFilter('all');
});
document.getElementById('btn-dict-reset-filter').addEventListener('click', function () {
  setPosFilter('all');
});


function updateThemeButton() {
  const btn = document.getElementById('btn-theme');
  if (!btn) return;
  const dark = currentTheme === 'dark';
  btn.textContent = dark ? '☀️' : '🌙';
  const label = t(dark ? 'themeLight' : 'themeDark');
  btn.title = label;
  btn.setAttribute('aria-label', label);
}

function applyTheme(theme, persist) {
  currentTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', currentTheme === 'dark' ? '#16120f' : '#f5ede0');
  if (persist) {
    try { localStorage.setItem(LS_THEME, currentTheme); } catch (e) {}
  }
  updateThemeButton();
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
}

function applyEmojiSetting() {
  document.documentElement.classList.toggle('hide-emoji', !showEmoji);
  const btn = document.getElementById('btn-emoji');
  if (btn) {
    btn.classList.toggle('active', showEmoji);
    const label = t('emojiToggle');
    btn.title = label;
    btn.setAttribute('aria-label', label);
  }
}
function toggleEmoji() {
  showEmoji = !showEmoji;
  saveShowEmoji();
  applyEmojiSetting();
}

function updateFlags() {
  document.querySelectorAll('.flag-btn').forEach(function (b) {
    const active = b.dataset.lang === currentLang;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.title = t('appTitle');
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    el.textContent = t(el.dataset.i18n);
  });
  updateFlags();
  updateThemeButton();
  applyEmojiSetting();
  updateReverseUI();
  updateProgress();
  updateSortButton();
  updateTrainInfo();
  updateDictSelectedInfo();

  const kbBtn = document.getElementById('btn-keyboard');
  if (kbBtn) {
    kbBtn.title = t('keyboardTitle');
    kbBtn.setAttribute('aria-label', t('keyboardTitle'));
  }
  const kbClose = document.getElementById('btn-keyboard-close');
  if (kbClose) kbClose.setAttribute('aria-label', t('keyboardHide'));

  const hint = document.getElementById('learn-hint');
  if (hint) hint.textContent = '';

  if (document.getElementById('screen-learn').classList.contains('active')) {
    renderLearnCard();
  } else if (document.getElementById('screen-review').classList.contains('active')) {
    switchSubTab(currentSubTab);
  }
}

function setLang(code) {
  if (currentLang === code) return;
  currentLang = code;
  saveLang();
  hideModal();
  applyLanguage();
}

const HE_KEYS = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י',
                 'כ','ך','ל','מ','ם','נ','ן','ס','ע','פ',
                 'ף','צ','ץ','ק','ר','ש','ת'];

function isCoarsePointer() {
  return !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
}

function focusNoScroll(el) {
  if (!el) return;
  try { el.focus({ preventScroll: true }); }
  catch (e) { el.focus(); }
}


function applyKbInputGuard() {
  const active = keyboardOpen && kbContextOK();
  const blockNative = active && isCoarsePointer();
  const inputs = document.querySelectorAll('.cell, #review-input');
  Array.prototype.forEach.call(inputs, function (inp) {
    if (active) inp.setAttribute('inputmode', 'none');
    else inp.removeAttribute('inputmode');
    inp.readOnly = blockNative;
  });
}

function bindKeyAction(el, action) {
  if (window.PointerEvent) {
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      action();
    });
  } else {
    el.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      action();
    });
    el.addEventListener('touchstart', function (e) {
      e.preventDefault();
      action();
    }, { passive: false });
  }
  el.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  });
}

function buildKeyboard() {
  const grid = document.getElementById('keyboard-grid');
  if (!grid) return;
  grid.innerHTML = '';
  HE_KEYS.forEach(function (ch) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'key-btn';
    b.textContent = ch;
    b.setAttribute('aria-label', ch);
    bindKeyAction(b, function () { kbInsert(ch); });
    grid.appendChild(b);
  });
  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'key-btn key-back';
  back.textContent = '⌫';
  back.setAttribute('aria-label', 'Backspace');
  bindKeyAction(back, kbBackspace);
  grid.appendChild(back);
}

function kbContextOK() {
  const learnActive = document.getElementById('screen-learn').classList.contains('active');
  const reviewActive = document.getElementById('screen-review').classList.contains('active');
  const trainBox = document.getElementById('review-train');
  const trainVisible = trainBox && trainBox.style.display !== 'none';
  return learnActive || (reviewActive && currentSubTab === 'train' && trainVisible && !reverseMode);
}

function kbTarget() {
  const active = document.activeElement;
  const learnActive = document.getElementById('screen-learn').classList.contains('active');
  if (active && active.classList && active.classList.contains('cell') && learnActive) {
    return active;
  }

  const reviewInputEl = document.getElementById('review-input');
  const reviewContent = document.getElementById('review-content');
  if (document.getElementById('screen-review').classList.contains('active') &&
      currentSubTab === 'train' &&
      !reverseMode &&
      reviewContent && reviewContent.style.display !== 'none') {
    return reviewInputEl;
  }

  if (document.getElementById('screen-learn').classList.contains('active')) {
    if (currentCells.length) {
      return currentCells.find(function (c) { return !c.value; }) || null;
    }
  }
  return null;
}

function focusEnd(input) {
  if (document.activeElement !== input) focusNoScroll(input);
  const len = input.value.length;
  try { input.setSelectionRange(len, len); } catch (e) {}
}

function kbInsert(ch) {
  const target = kbTarget();
  if (!target) return;
  if (target.classList.contains('cell')) {
    if (document.activeElement !== target) focusNoScroll(target);
    target.value = ch;
    target.dispatchEvent(new Event('input', { bubbles: true }));
  } else {
    target.value = (target.value || '') + ch;
    focusEnd(target);
  }
}

function kbBackspace() {
  const target = kbTarget();
  if (!target) return;
  if (target.classList.contains('cell')) {
    if (document.activeElement !== target) focusNoScroll(target);
    if (target.value) {
      target.value = '';
      target.classList.remove('wrong-cell', 'shake');
    } else {
      const idx = currentCells.indexOf(target);
      if (idx > 0) {
        const prev = currentCells[idx - 1];
        prev.value = '';
        prev.classList.remove('wrong-cell', 'shake');
        focusNoScroll(prev);
      }
    }
  } else {
    target.value = Array.from(target.value || '').slice(0, -1).join('');
    focusEnd(target);
  }
}

function syncKeyboard() {
  const show = keyboardOpen && kbContextOK();
  document.body.classList.toggle('kb-open', show);
  const kb = document.getElementById('keyboard');
  if (kb) kb.setAttribute('aria-hidden', show ? 'false' : 'true');
  const btn = document.getElementById('btn-keyboard');
  if (btn) btn.classList.toggle('active', show);
  applyKbInputGuard();
}

function setKeyboardOpen(open) {
  keyboardOpen = open;
  try { localStorage.setItem(LS_KB, open ? '1' : '0'); } catch (e) {}
  if (open && isCoarsePointer()) {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
      try { active.blur(); } catch (e) {}
    }
  }
  syncKeyboard();
  if (open && !isCoarsePointer()) {
    const target = kbTarget();
    if (target) focusNoScroll(target);
  }
}

function onKeyboardToggle() {
  if (!kbContextOK()) {
    if (document.getElementById('screen-review').classList.contains('active')) {
      switchSubTab('train');
    } else {
      switchTab('learn');
    }
    setKeyboardOpen(true);
    return;
  }
  setKeyboardOpen(!keyboardOpen);
}


function showModal(emoji, title, translit, hebrew) {
  document.getElementById('modal-emoji').textContent = emoji;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-translit').textContent = translit || '';
  document.getElementById('modal-hebrew').textContent = hebrew || '';
  document.getElementById('modal').classList.add('show');
}
function hideModal() { document.getElementById('modal').classList.remove('show'); }


document.getElementById('btn-reset').addEventListener('click', () => {
  if (confirm(t('resetConfirm'))) {
    learned = new Set();
    stats = {};
    selected = new Set();
    saveLearned();
    saveStats();
    saveSelected();
    reviewQueue = [];
    updateProgress();
    renderLearnCard();
    if (document.getElementById('screen-review').classList.contains('active')) {
      switchSubTab(currentSubTab);
    }
  }
});


applyTheme(currentTheme, false);
buildKeyboard();
applyLanguage();
updateProgress();
renderLearnCard();
syncKeyboard();

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) e.preventDefault();
  lastTouchEnd = now;
}, { passive: false });
