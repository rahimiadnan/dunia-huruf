// ===== DUNIA HURUF: LISTEN (mic + lenient checking) =====

const Listen = {
  // Returns a Promise with a list of what it heard (up to 5 guesses), or [] if nothing
  hear(lang = 'ms') {
    return new Promise(resolve => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) return resolve([]);
      const rec = new SR();
      rec.lang = lang === 'en' ? 'en-US' : 'ms-MY';
      rec.maxAlternatives = 5;
      let done = false;
      const finish = (list) => { if (!done) { done = true; resolve(list); } };
      rec.onresult = (e) => finish([...e.results[0]].map(r => r.transcript));
      rec.onerror = () => finish([]);
      rec.onend = () => finish([]);
      setTimeout(() => { try { rec.stop(); } catch (e) {} finish([]); }, 6000);   // max 6 seconds
      rec.start();
    });
  }
};

// Clean text: "Bola!" becomes "bola"
const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, '');

// How many letters are different between two words
function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  return d[a.length][b.length];
}

const LENIENT = 1;   // letters allowed to be wrong (for words with 4+ letters). Set 0 for strict.

// true if any guess matches any accepted answer
function isMatch(heardList, targets) {
  const goals = targets.map(norm);
  return heardList.some(h => {
    const whole = norm(h);                                   // "bo la" becomes "bola"
    const words = h.toLowerCase().split(/\s+/).map(norm);    // "bola bola" becomes ["bola","bola"]
    return goals.some(g =>
      whole === g || words.includes(g) ||
      [whole, ...words].some(w => g.length >= 4 && editDistance(w, g) <= LENIENT));
  });
}