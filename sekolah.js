// ===== DUNIA HURUF: SEKOLAH (school vocab) =====
// One unit = one week/topic from his school book.
// word   = the word (lowercase)
// syl    = syllables, split the way his book/teacher splits them
// emoji  = optional (📖 is used if empty)
// accept = optional: what Chrome might hear instead

const SCHOOL_UNITS = [
  { id:'contoh', title:'Contoh: Keluarga', week:'Minggu 1',
    words:[
      { word:'ibu',    syl:['i','bu'],       emoji:'👩', accept:['ibu'] },
      { word:'ayah',   syl:['a','yah'],      emoji:'👨', accept:['ayah','ayat'] },
      { word:'adik',   syl:['a','dik'],      emoji:'👶', accept:['adik','adek'] },
      { word:'rumah',  syl:['ru','mah'],     emoji:'🏠', accept:['rumah'] },
      { word:'kereta', syl:['ke','re','ta'], emoji:'🚗', accept:['kereta','kreta'] }
    ] }
];