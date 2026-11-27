# Hebrew · 100 Words — Word Trainer

[Open the app](https://websamurai01.github.io/hebrewcommonwords/) · [Русская версия](README_RU.md)

An offline app for learning 100 common Hebrew words: letter-by-letter learning, memory checks, a dictionary with statistics, speech synthesis, and a built-in Hebrew keyboard.

---

## Quick start

1. [Open the app](https://websamurai01.github.io/hebrewcommonwords/)
2. In the **Learn** tab, type the displayed word letter by letter, right to left.
3. A correctly typed word is marked as learned and the progress increases.
4. Open the **Review** tab to practise learned words.
5. Use the **Dictionary** section to choose words for practice and inspect statistics.
6. On devices without a Hebrew layout, use the built-in on-screen keyboard (⌨️ button).

The app needs no installation and works offline. The interface starts in Russian; switch to English with the 🇺🇸 flag.

---

## Learn screen

The card shows:

- an emoji hint;
- the English meaning;
- audio buttons **🔊 1.0x** and **🐢 0.75x**;
- letter cells for typing.

### Typing a word

- Type one letter per cell, right to left.
- Focus advances automatically after each letter.
- Backspace moves back to the previous cell.
- In the last cell, a regular letter is automatically converted to its final form (for example, מ → ם).
- The answer is checked automatically when all cells are filled.
- On mistakes, the wrong cells are highlighted and shake. Retype the whole word, including the letters that were already correct.
- A correct word is added to the learned set, then the next unlearned word appears.
- When all 100 words are learned, a congratulation dialog appears.

---

## Review screen

### Practice

- The app shows an emoji and the English meaning.
- Type the entire Hebrew word.
- Press **Check** or Enter.
- On a correct answer:
  - the word is recorded;
  - a dialog shows its transliteration and Hebrew spelling;
  - the word is spoken if a voice is available.
- On a mistake:
  - the input shakes;
  - the correct spelling is displayed;
  - the word is re-queued and will appear again.
- A line above the card explains whether all learned words or only the selected words are being practised.

### Dictionary

- Contains learned words only.
- Each row shows:
  - Hebrew;
  - transliteration (Cyrillic or Latin depending on the interface language);
  - the English meaning;
  - accuracy and attempt count.
- Tap the transliteration to hear the word.
- Checkboxes let you select a subset of words for practice.
- Controls:
  - **Select all**;
  - **Clear all**;
  - sorting: standard order → hardest first → easiest first.
- If nothing is selected, all learned words are practised.
- Selection and sorting are saved.

---

## On-screen keyboard

The ⌨️ button in the header opens and closes a Hebrew key panel.

- 28 keys: 22 basic letters, 5 final forms, and Backspace.
- The keyboard is open by default on desktop and closed by default on touch devices, unless you changed the setting.
- Its state is saved in `localStorage`.
- In Learn mode, a letter goes into the current/next cell and focus advances.
- In Practice mode, a letter is appended to the review input.
- Backspace removes the last letter or clears the current cell.
- While the built-in keyboard is open on a phone, the native soft keyboard is suppressed to avoid focus conflicts.
- To use the phone’s normal keyboard, close the built-in panel with ⌨️ or ✕.
- The panel hides in the Dictionary; pressing ⌨️ there switches back to Practice and opens the keyboard.
- A physical Hebrew keyboard also works.

---

## Speech synthesis (TTS)

Audio buttons are on the Learn card; transliteration in the Dictionary is also tappable.

Voice priority:

1. Hebrew voice — speaks the actual Hebrew word.
2. Interface-language voice — speaks the transliteration (Russian or English).
3. English voice — speaks the Latin transliteration.
4. Any available voice with the Latin transliteration.

Details:

- Voices come from the browser and operating system.
- The voice list refreshes on `voiceschanged` and before every utterance.
- If voices load late, one retry is attempted.
- If no voices exist at all, a “Speech is not available in this browser” toast is shown.
- On iOS, playback starts only from a user action (audio button, Check, or Dictionary tap). Autoplay on card display is intentionally disabled.
- On Android, a system TTS engine with the required voices must be installed.
- Some Linux Chromium builds without `speech-dispatcher` have no voices; this is a system limitation, not an app bug.

---

## Interface language

Flags in the header:

- 🇷🇺 — Russian interface and Cyrillic transliteration;
- 🇺🇸 — English interface and Latin transliteration.

Switching changes:

- all labels, buttons, empty states, and the reset confirmation;
- transliteration in the dictionary and dialogs;
- the fallback TTS language;
- theme and keyboard labels.

The choice is saved in `localStorage`. The English meaning on cards and in the dictionary stays in English in both modes.

---

## Dark theme

The 🌙 / ☀️ button in the header:

- 🌙 — enable dark mode;
- ☀️ — return to light mode.

The theme:

- is saved in `localStorage` under the shared key `hebrew_theme_v1`;
- is also used by the “Hebrew · Alphabet” app when storage is shared;
- follows the system theme on first launch if no preference is saved;
- is applied before styles load, so there is no light flash;
- also updates the mobile browser theme colour.

---

## Saving and reset

Saved data:

- learned words;
- correct/incorrect statistics;
- selected words for practice;
- dictionary sorting;
- language, keyboard state, and theme.

The **Reset progress** button at the bottom:

- clears learned words, selection, and statistics;
- keeps the language, keyboard, theme, and sorting.

A confirmation is requested before resetting.

### `localStorage` keys

| Key | Purpose |
|---|---|
| `hebrew100_learned_v2` | learned words |
| `hebrew100_stats_v2` | answer statistics |
| `hebrew100_selected_v2` | words selected for practice |
| `hebrew100_sort_v2` | dictionary sort mode |
| `hebrew100_lang_v1` | interface language |
| `hebrew100_keyboard_v1` | on-screen keyboard state |
| `hebrew_theme_v1` | theme (shared with the alphabet trainer) |

---

## Tips

- Learn a few words in Learn first, otherwise Review will be empty.
- Use Dictionary checkboxes to focus on difficult words.
- “Hardest first” sorting quickly surfaces problematic words.
- If a word cannot be typed, check the Hebrew layout or use the on-screen keyboard.
- On a phone, the native keyboard is intentionally blocked while the built-in keyboard is open for stable input.

---

## FAQ

**Why is there no speech on desktop?**
The browser or system has no available voices. Install an OS voice package or try Chrome/Edge/Safari. On Linux, `speech-dispatcher` is often required.

**Why doesn’t audio start automatically on iOS?**
iOS allows speech synthesis only after user interaction. The app never autoplays; press an audio button, Check, or a Dictionary transliteration.

**The phone keyboard opens together with the built-in one.**
Make sure the in-app keyboard is open: in that state, input fields suppress the native keyboard. If you want the native keyboard, close the built-in one.

**Why is the last letter rejected?**
Final forms are used at the end of a word. In Learn mode they are inserted automatically; in Review the last letter is normalized. Check that the correct form is used.

**Does progress disappear in private browsing?**
Yes, if `localStorage` is blocked or in a private window, progress may not survive after closing the tab.

**Does it work offline?**
Yes. All code and data are contained in files next to `index.html`.

---

## Technical notes

- No dependencies, no build step: `index.html`, `css/style.css`, `js/data.js`, `js/app.js`.
- Vanilla JavaScript.
- Supported in modern Chrome, Edge, Firefox, Safari, and mobile browsers.
- Speech output depends on voices installed in the browser/OS.
