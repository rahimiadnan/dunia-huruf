// ===== DUNIA HURUF: MEMORY (Portion 4d) =====
// Remembers what he knows and brings back what he missed.
// Saved in the browser (localStorage), separately on each device.

const Memory = (() => {
  const KEY = 'duniaHuruf.memory.v1';
  const OFFSET_KEY = 'duniaHuruf.dayOffset';   // for testing only
  const GAPS = [1, 1, 2, 4, 7];                // days until review, per box
  const MASTER = GAPS.length - 1;              // box 4 = mastered

  // ---- Dates (local time, 'YYYY-MM-DD') ----
  const fmt = d => d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
  const dayOffset = () => Number(sessionStorage.getItem(OFFSET_KEY) || 0);
  const today = () => { const d = new Date(); d.setDate(d.getDate() + dayOffset()); return fmt(d); };
  const addDays = (str, n) => { const [y, m, d] = str.split('-').map(Number); return fmt(new Date(y, m - 1, d + n)); };

  // ---- Storage ----
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(db) {
    try { localStorage.setItem(KEY, JSON.stringify(db)); }
    catch (e) { console.warn('Memory: cannot save', e); }
  }
  const keyOf = (type, id) => type + ':' + String(id).toLowerCase();

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---- Record a result ----
  // 'correct' = first try | 'parent' = Parent OK | 'help' = after retries | 'wrong' = skipped / gave up
  function record(type, id, result) {
    const db = load();
    const k = keyOf(type, id);
    const t = today();
    const it = db[k] || { box: 0, seen: 0, correct: 0, help: 0, wrong: 0, parentOk: 0, last: null, promoted: null, due: t };

    it.seen++;
    it.last = t;

    if (result === 'correct' || result === 'parent') {
      if (result === 'parent') it.parentOk++; else it.correct++;
      if (it.promoted !== t) { it.box = Math.min(it.box + 1, MASTER); it.promoted = t; } // max 1 step per day
      it.due = addDays(t, GAPS[it.box]);
    } else if (result === 'help') {
      it.help++;
      it.due = addDays(t, 1);            // same box, again tomorrow
    } else {
      it.wrong++;
      it.box = 0;
      it.due = addDays(t, 1);            // back to start, again tomorrow
    }

    db[k] = it;
    save(db);
    return it;
  }

  // ---- Choose items for a session ----
  function pickItems(type, ids, n = 3) {
    const db = load();
    const t = today();
    const info = id => db[keyOf(type, id)];

    const due   = shuffle(ids.filter(id => info(id) && info(id).due <= t))
                    .sort((a, b) => info(a).box - info(b).box);   // weakest first
    const fresh = shuffle(ids.filter(id => !info(id)));
    const later = shuffle(ids.filter(id => info(id) && info(id).due > t));

    const picked = [];
    const add = list => {
      for (const id of list) {
        if (picked.length >= n) break;
        if (!picked.includes(id)) picked.push(id);
      }
    };

    add(due.slice(0, n - 1));   // reviews, leaving room for 1 new/easy word
    add(fresh);                 // new items
    add(due);                   // more reviews if nothing new is left
    add(later);                 // fill up with not-yet-due items
    return shuffle(picked);
  }

  // ---- Progress numbers (for the win screen / parent view) ----
  function stats(type, ids) {
    const db = load();
    const t = today();
    const s = { mastered: 0, learning: 0, fresh: 0, dueToday: 0 };
    ids.forEach(id => {
      const it = db[keyOf(type, id)];
      if (!it) { s.fresh++; return; }
      it.box >= MASTER ? s.mastered++ : s.learning++;
      if (it.due <= t) s.dueToday++;
    });
    return s;
  }

  // ---- Parent / debug tools (use in Console) ----
  function report() {
    const rows = Object.entries(load()).map(([k, it]) => ({
      item: k, box: it.box, correct: it.correct, parentOk: it.parentOk,
      help: it.help, wrong: it.wrong, due: it.due
    })).sort((a, b) => a.box - b.box);
    console.table(rows);
    return rows.length + ' items tracked';
  }
  // Words the mic keeps failing on (Parent OK used 2+ times), so add them to 'accept'
  const micTrouble = () => Object.entries(load()).filter(([, it]) => it.parentOk >= 2).map(([k]) => k);
  const exportData = () => localStorage.getItem(KEY) || '{}';
  const importData = str => { save(JSON.parse(str)); return 'Imported ✅'; };
  const reset = () => { if (confirm('Padam semua progress?')) { localStorage.removeItem(KEY); return 'Reset ✅'; } };
  const timeTravel = days => { sessionStorage.setItem(OFFSET_KEY, days); return 'Today is now ' + today(); };

  return { record, pickItems, stats, report, micTrouble, exportData, importData, reset, timeTravel, today };
})();