// ===== DUNIA HURUF: AUDIO (voice + sound effects) =====

const Voice = {
  ms: null, en: null,
  load() {
    const v = speechSynthesis.getVoices();
    this.ms = v.find(x => x.lang.toLowerCase().startsWith('ms'))
           || v.find(x => x.name.toLowerCase().includes('malay'))
           || v.find(x => x.lang.toLowerCase().startsWith('id'));
    this.en = v.find(x => x.lang === 'en-US') || v.find(x => x.lang.startsWith('en'));
  },
  // Returns a Promise, so the game can wait until speaking is finished
  speak(text, lang = 'ms') {
    return new Promise(resolve => {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (lang === 'en') { u.lang = 'en-US'; if (this.en) u.voice = this.en; }
      else               { u.lang = 'ms-MY'; if (this.ms) u.voice = this.ms; }
      u.rate = 0.8; u.pitch = 1.2;
      u.onend = resolve; u.onerror = resolve;
      setTimeout(resolve, 2000 + text.length * 90);   // safety net if onend never fires
      speechSynthesis.speak(u);
    });
  }
};
speechSynthesis.onvoiceschanged = () => Voice.load();
Voice.load();

// Retro 8-bit sound effects, generated in code (no sound files needed)
const SFX = {
  ctx: null,
  beep(freq, dur, type = 'square', vol = 0.15) {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(t); o.stop(t + dur);
  },
  hit() { this.beep(120 + Math.random() * 40, 0.08); },
  pop() { this.beep(600, 0.1, 'triangle'); setTimeout(() => this.beep(900, 0.15, 'triangle'), 80); },
  win() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.beep(f, 0.25, 'triangle'), i * 130)); }
};