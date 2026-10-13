// ===== DUNIA HURUF: DATA =====
// Edit here to change letters, animals, or words. All games read from this file.

// --- Biomes: unlocked as he progresses (used in the Map later) ---
const BIOMES = [
  { id: 'padang', name: 'Padang Rumput', emoji: '🌱', color: '#7ec850', letters: 'ABCDE' },
  { id: 'hutan',  name: 'Hutan',         emoji: '🌳', color: '#3f8f3f', letters: 'FGHIJ' },
  { id: 'gurun',  name: 'Gurun',         emoji: '🏜️', color: '#e8c872', letters: 'KLMNO' },
  { id: 'salji',  name: 'Salji',         emoji: '❄️', color: '#cfe8f5', letters: 'PQRST' },
  { id: 'laut',   name: 'Laut',          emoji: '🌊', color: '#3a8fd9', letters: 'UVWXYZ' }
];

// --- Level 1: Letters + animals ---
// say    = how the letter name is pronounced in Malay
// accept = what speech recognition might hear (lenient checking in Part 4)
// type   = 'haiwan' (animal) or 'benda' (object, for hard letters)
const LETTERS = [
  { letter:'A', say:'a',        word:'Ayam',     emoji:'🐔', syl:['a','yam'],           type:'haiwan', accept:['a','ah','ayam'] },
  { letter:'B', say:'bi',       word:'Beruang',  emoji:'🐻', syl:['be','ru','ang'],     type:'haiwan', accept:['b','bi','be','bee','beruang'] },
  { letter:'C', say:'si',       word:'Cicak',    emoji:'🦎', syl:['ci','cak'],          type:'haiwan', accept:['c','si','see','sea','cicak'] },
  { letter:'D', say:'di',       word:'Dinosaur', emoji:'🦖', syl:['di','no','sa','ur'], type:'haiwan', accept:['d','di','dee','dinosaur'] },
  { letter:'E', say:'i',        word:'Emak',     emoji:'👩', syl:['e','mak'],           type:'orang',  accept:['e','i','ee','emak','mak'] },
  { letter:'F', say:'ef',       word:'Flamingo', emoji:'🦩', syl:['fla','min','go'],    type:'haiwan', accept:['f','ef','eff','flamingo'] },
  { letter:'G', say:'ji',       word:'Gajah',    emoji:'🐘', syl:['ga','jah'],          type:'haiwan', accept:['g','ji','jee','gajah'] },
  { letter:'H', say:'eic',      word:'Harimau',  emoji:'🐯', syl:['ha','ri','mau'],     type:'haiwan', accept:['h','eic','eich','harimau'] },
  { letter:'I', say:'ai',       word:'Ikan',     emoji:'🐟', syl:['i','kan'],           type:'haiwan', accept:['i','ai','eye','ikan'] },
  { letter:'J', say:'je',       word:'Jerung',   emoji:'🦈', syl:['je','rung'],         type:'haiwan', accept:['j','je','jay','jerung'] },
  { letter:'K', say:'ke',       word:'Kucing',   emoji:'🐱', syl:['ku','cing'],         type:'haiwan', accept:['k','ke','kay','kucing'] },
  { letter:'L', say:'el',       word:'Lembu',    emoji:'🐄', syl:['lem','bu'],          type:'haiwan', accept:['l','el','elle','lembu'] },
  { letter:'M', say:'em',       word:'Monyet',   emoji:'🐒', syl:['mo','nyet'],         type:'haiwan', accept:['m','em','monyet'] },
  { letter:'N', say:'en',       word:'Naga',     emoji:'🐉', syl:['na','ga'],           type:'haiwan', accept:['n','en','naga'] },
  { letter:'O', say:'o',        word:'Orang Utan', emoji:'🦧', syl:['o','rang','u','tan'], type:'haiwan', accept:['o','oh','orang utan'] },
  { letter:'P', say:'pi',       word:'Penguin',  emoji:'🐧', syl:['pe','ngu','in'],     type:'haiwan', accept:['p','pi','pee','penguin'] },
  { letter:'Q', say:'kiu',      word:'Queen Ant', emoji:'🐜', syl:['queen','ant'],      type:'haiwan', accept:['q','kiu','queue','cue','queen','queen ant'] },
  { letter:'R', say:'ar',       word:'Rusa',     emoji:'🦌', syl:['ru','sa'],           type:'haiwan', accept:['r','ar','are','rusa'] },
  { letter:'S', say:'es',       word:'Serigala', emoji:'🐺', syl:['se','ri','ga','la'], type:'haiwan', accept:['s','es','ess','serigala'] },
  { letter:'T', say:'ti',       word:'Tikus',    emoji:'🐭', syl:['ti','kus'],          type:'haiwan', accept:['t','ti','tea','tee','tikus'] },
  { letter:'U', say:'yu',       word:'Ular',     emoji:'🐍', syl:['u','lar'],           type:'haiwan', accept:['u','yu','you','ular'] },
  { letter:'V', say:'vi',       word:'Van',      emoji:'🚐', syl:['van'],               type:'benda',  accept:['v','vi','vee','van'] },
  { letter:'W', say:'dabel yu', word:'Walrus',   emoji:'🦭', syl:['wal','rus'],         type:'haiwan', accept:['w','dabel yu','double you','walrus'] },
  { letter:'X', say:'eks',      word:'X-ray',    emoji:'🩻', syl:['eks','rei'],         type:'benda',  accept:['x','eks','ex','x-ray','xray','eks rei'] },
  { letter:'Y', say:'wai',      word:'Yak',      emoji:'🐂', syl:['yak'],               type:'haiwan', accept:['y','wai','why','yak'] },
  { letter:'Z', say:'zed',      word:'Zirafah',  emoji:'🦒', syl:['zi','ra','fah'],     type:'haiwan', accept:['z','zed','zee','zirafah'] }
];

// --- Level 2: Syllables (suku kata), like how Malaysian schools teach ---
const VOWELS = ['a', 'i', 'u', 'e', 'o'];
const SYLLABLE_CONSONANTS = ['b','c','d','g','k','l','m','n','p','r','s','t'];

function makeSyllables(consonant) {
  return VOWELS.map(v => consonant + v);   // 'b' gives ba, bi, bu, be, bo
}

// --- Level 3: Simple 2-syllable words ---
const WORDS = [
  { word:'bola', syl:['bo','la'], emoji:'⚽' },
  { word:'batu', syl:['ba','tu'], emoji:'🪨' },
  { word:'buku', syl:['bu','ku'], emoji:'📘' },
  { word:'mata', syl:['ma','ta'], emoji:'👁️' },
  { word:'kaki', syl:['ka','ki'], emoji:'🦶' },
  { word:'susu', syl:['su','su'], emoji:'🥛' },
  { word:'roti', syl:['ro','ti'], emoji:'🍞' },
  { word:'topi', syl:['to','pi'], emoji:'🧢' },
  { word:'nasi', syl:['na','si'], emoji:'🍚' },
  { word:'gigi', syl:['gi','gi'], emoji:'🦷' },
  { word:'ibu',  syl:['i','bu'],  emoji:'👩' },
  { word:'bapa', syl:['ba','pa'], emoji:'👨' }
];

// --- Gentle feedback phrases (used in Part 4) ---
const PHRASES = {
  correct: ['Bagus!', 'Pandai!', 'Hebat!', 'Syabas!', 'Betul!'],
  try1:    ['Hmm, hampir betul! Dengar sekali lagi ya...'],
  try2:    ['Tak apa, cuba lagi. Tengok gambar ini...'],
  together:['Jom sebut sama-sama!']
};

// --- Helper: pick a random item from a list ---
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
// --- Special section: Minecraft Alphabet (ENGLISH) ---
// lang 'en' tells the game to speak/listen in English for this section
const MINECRAFT_SECTION = { id:'minecraft', name:'Minecraft Alphabet', emoji:'⛏️', color:'#8b8b8b', lang:'en' };

const MINECRAFT_ABC = [
  { letter:'A', word:'Axe',        emoji:'🪓', accept:['a','axe','ax'] },
  { letter:'B', word:'Bee',        emoji:'🐝', accept:['b','bee','be'] },
  { letter:'C', word:'Creeper',    emoji:'🟩', accept:['c','see','creeper'] },
  { letter:'D', word:'Diamond',    emoji:'💎', accept:['d','dee','diamond'] },
  { letter:'E', word:'Enderman',   emoji:'⬛', accept:['e','ee','enderman','ender man'] },
  { letter:'F', word:'Fox',        emoji:'🦊', accept:['f','ef','fox'] },
  { letter:'G', word:'Ghast',      emoji:'👻', accept:['g','gee','ghast','gast'] },
  { letter:'H', word:'Horse',      emoji:'🐴', accept:['h','aitch','horse'] },
  { letter:'I', word:'Iron Golem', emoji:'🤖', accept:['i','eye','iron golem','golem'] },
  { letter:'J', word:'Jellyfish',  emoji:'🪼', accept:['j','jay','jellyfish','jelly fish'] },
  { letter:'K', word:'Kangaroo',   emoji:'🦘', accept:['k','kay','kangaroo'] },
  { letter:'L', word:'Llama',      emoji:'🦙', accept:['l','el','llama','lama'] },
  { letter:'M', word:'Monkey',     emoji:'🐒', accept:['m','em','monkey'] },
  { letter:'N', word:'Ninja',      emoji:'🥷', accept:['n','en','ninja'] },
  { letter:'O', word:'Ocelot',     emoji:'🐆', accept:['o','oh','ocelot'] },
  { letter:'P', word:'Pig',        emoji:'🐷', accept:['p','pee','pig'] },
  { letter:'Q', word:'Quartz',     emoji:'⬜', accept:['q','queue','cue','quartz'] },
  { letter:'R', word:'Rabbit',     emoji:'🐰', accept:['r','are','rabbit'] },
  { letter:'S', word:'Skeleton',   emoji:'💀', accept:['s','ess','skeleton'] },
  { letter:'T', word:'Tiger',      emoji:'🐯', accept:['t','tee','tea','tiger'] },
  { letter:'U', word:'Unicorn',    emoji:'🦄', accept:['u','you','unicorn'] },
  { letter:'V', word:'Villager',   emoji:'🧑‍🌾', accept:['v','vee','villager'] },
  { letter:'W', word:'Wolf',       emoji:'🐺', accept:['w','double you','wolf'] },
  { letter:'X', word:'Xbox',       emoji:'🎮', accept:['x','ex','xbox','x box'] },
  { letter:'Y', word:'Yak',        emoji:'🐂', accept:['y','why','yak'] },
  { letter:'Z', word:'Zombie',     emoji:'🧟', accept:['z','zee','zed','zombie'] }
];