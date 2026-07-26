// Client-side GitHub Bible fetcher and parser
// This retrieves translation files directly from raw.githubusercontent.com
// to support offline/local execution with zero proprietary APIs.

const TRANSLATION_URLS: Record<string, string> = {
  "WEB": "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_web.json",
  "KJV": "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json",
  "ASV": "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_asv.json",
  "Reina-Valera (ES)": "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/es_rvr.json",
  "Almeida (PT)": "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/pt_ara.json",
  "Louis Segond (FR)": "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/fr_lsg.json"
};

// In-memory cache to avoid redownloading 2-4MB files multiple times in the same session
const translationCache: Record<string, any[]> = {};

// Detailed abbreviation mapping for all 66 books of the Bible to map input terms
const BOOK_ABBREVIATIONS: Record<string, string> = {
  "gen": "Genesis", "gn": "Genesis", "ge": "Genesis", "genesis": "Genesis",
  "ex": "Exodus", "exo": "Exodus", "exodus": "Exodus",
  "lev": "Leviticus", "lv": "Leviticus", "leviticus": "Leviticus",
  "num": "Numbers", "nm": "Numbers", "nu": "Numbers", "numbers": "Numbers",
  "deut": "Deuteronomy", "dt": "Deuteronomy", "de": "Deuteronomy", "deuteronomy": "Deuteronomy",
  "josh": "Joshua", "jos": "Joshua", "jsh": "Joshua", "joshua": "Joshua",
  "judg": "Judges", "jdg": "Judges", "judges": "Judges",
  "ruth": "Ruth", "rut": "Ruth", "ru": "Ruth",
  "1sam": "1 Samuel", "1 sam": "1 Samuel", "1sa": "1 Samuel", "1s": "1 Samuel", "1 sm": "1 Samuel", "1samuel": "1 Samuel",
  "2sam": "2 Samuel", "2 sam": "2 Samuel", "2sa": "2 Samuel", "2s": "2 Samuel", "2 sm": "2 Samuel", "2samuel": "2 Samuel",
  "1kgs": "1 Kings", "1 kgs": "1 Kings", "1ki": "1 Kings", "1 kin": "1 Kings", "1 kings": "1 Kings", "1kings": "1 Kings",
  "2kgs": "2 Kings", "2 kgs": "2 Kings", "2ki": "2 Kings", "2 kin": "2 Kings", "2 kings": "2 Kings", "2kings": "2 Kings",
  "1chr": "1 Chronicles", "1 chr": "1 Chronicles", "1ch": "1 Chronicles", "1 chron": "1 Chronicles", "1chronicles": "1 Chronicles",
  "2chr": "2 Chronicles", "2 chr": "2 Chronicles", "2ch": "2 Chronicles", "2 chron": "2 Chronicles", "2chronicles": "2 Chronicles",
  "ezr": "Ezra", "ez": "Ezra", "ezra": "Ezra",
  "neh": "Nehemiah", "ne": "Nehemiah", "nehemiah": "Nehemiah",
  "esth": "Esther", "est": "Esther", "es": "Esther", "esther": "Esther",
  "job": "Job", "jb": "Job",
  "psa": "Psalms", "ps": "Psalms", "psm": "Psalms", "pss": "Psalms", "psalm": "Psalms", "psalms": "Psalms",
  "prov": "Proverbs", "pr": "Proverbs", "pro": "Proverbs", "proverbs": "Proverbs",
  "eccl": "Ecclesiastes", "ecc": "Ecclesiastes", "ec": "Ecclesiastes", "ecclesiastes": "Ecclesiastes",
  "song": "Song of Solomon", "so": "Song of Solomon", "canticle": "Song of Solomon", "canticles": "Song of Solomon", "song of solomon": "Song of Solomon",
  "isa": "Isaiah", "is": "Isaiah", "isaiah": "Isaiah",
  "jer": "Jeremiah", "je": "Jeremiah", "jr": "Jeremiah", "jeremiah": "Jeremiah",
  "lam": "Lamentations", "la": "Lamentations", "lamentations": "Lamentations",
  "ezek": "Ezekiel", "eze": "Ezekiel", "ezk": "Ezekiel", "ezekiel": "Ezekiel",
  "dan": "Daniel", "da": "Daniel", "dn": "Daniel", "daniel": "Daniel",
  "hos": "Hosea", "ho": "Hosea", "hosea": "Hosea",
  "joel": "Joel", "jl": "Joel",
  "amos": "Amos", "am": "Amos",
  "obad": "Obadiah", "ob": "Obadiah", "obadiah": "Obadiah",
  "jonah": "Jonah", "jon": "Jonah", "jo": "Jonah",
  "mic": "Micah", "mi": "Micah", "micah": "Micah",
  "nah": "Nahum", "na": "Nahum", "nahum": "Nahum",
  "hab": "Habakkuk", "ha": "Habakkuk", "hb": "Habakkuk", "habakkuk": "Habakkuk",
  "zeph": "Zephaniah", "zep": "Zephaniah", "zp": "Zephaniah", "zephaniah": "Zephaniah",
  "hag": "Haggai", "hg": "Haggai", "haggai": "Haggai",
  "zech": "Zechariah", "zec": "Zechariah", "zc": "Zechariah", "zechariah": "Zechariah",
  "mal": "Malachi", "ma": "Malachi", "ml": "Malachi", "malachi": "Malachi",
  "matt": "Matthew", "mat": "Matthew", "mt": "Matthew", "matthew": "Matthew",
  "mark": "Mark", "mrk": "Mark", "mk": "Mark", "mr": "Mark",
  "luke": "Luke", "luk": "Luke", "lk": "Luke",
  "john": "John", "joh": "John", "jn": "John",
  "acts": "Acts", "act": "Acts", "ac": "Acts",
  "rom": "Romans", "ro": "Romans", "rm": "Romans", "romans": "Romans",
  "1cor": "1 Corinthians", "1 cor": "1 Corinthians", "1co": "1 Corinthians", "1corinthians": "1 Corinthians",
  "2cor": "2 Corinthians", "2 cor": "2 Corinthians", "2co": "2 Corinthians", "2corinthians": "2 Corinthians",
  "gal": "Galatians", "ga": "Galatians", "gl": "Galatians", "galatians": "Galatians",
  "eph": "Ephesians", "ep": "Ephesians", "ephesians": "Ephesians",
  "phil": "Philippians", "phi": "Philippians", "ph": "Philippians", "philippians": "Philippians",
  "col": "Colossians", "co": "Colossians", "cl": "Colossians", "colossians": "Colossians",
  "1thess": "1 Thessalonians", "1 thess": "1 Thessalonians", "1th": "1 Thessalonians", "1 ts": "1 Thessalonians", "1thessalonians": "1 Thessalonians",
  "2thess": "2 Thessalonians", "2 thess": "2 Thessalonians", "2th": "2 Thessalonians", "2 ts": "2 Thessalonians", "2thessalonians": "2 Thessalonians",
  "1tim": "1 Timothy", "1 tim": "1 Timothy", "1ti": "1 Timothy", "1 tm": "1 Timothy", "1timothy": "1 Timothy",
  "2tim": "2 Timothy", "2 tim": "2 Timothy", "2ti": "2 Timothy", "2 tm": "2 Timothy", "2timothy": "2 Timothy",
  "tit": "Titus", "ti": "Titus", "tt": "Titus", "titus": "Titus",
  "philem": "Philemon", "phm": "Philemon", "pm": "Philemon", "philemon": "Philemon",
  "heb": "Hebrews", "he": "Hebrews", "hebrews": "Hebrews",
  "jas": "James", "jam": "James", "jm": "James", "ja": "James", "james": "James",
  "1pet": "1 Peter", "1 pet": "1 Peter", "1pe": "1 Peter", "1 pt": "1 Peter", "1peter": "1 Peter",
  "2pet": "2 Peter", "2 pet": "2 Peter", "2pe": "2 Peter", "2 pt": "2 Peter", "2peter": "2 Peter",
  "1john": "1 John", "1 john": "1 John", "1jn": "1 John", "1 jo": "1 John",
  "2john": "2 John", "2 john": "2 John", "2jn": "2 John", "2 jo": "2 John",
  "3john": "3 John", "3 john": "3 John", "3jn": "3 John", "3 jo": "3 John",
  "jude": "Jude", "jud": "Jude", "jd": "Jude",
  "rev": "Revelation", "re": "Revelation", "rv": "Revelation", "revelation": "Revelation"
};

export interface FetchedPassage {
  reference: string;
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  text: string;
  words: string[];
}

/**
 * Normalizes a Bible book name or abbreviation into its official full English name.
 */
export function normalizeBookName(input: string): string {
  const cleaned = input.trim().toLowerCase().replace(/\s+/g, " ");
  // Try direct abbreviation match
  if (BOOK_ABBREVIATIONS[cleaned]) {
    return BOOK_ABBREVIATIONS[cleaned];
  }
  // Fallback to capitalizing first letter of words
  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Downloads a Bible translation JSON from GitHub (cached in-memory).
 */
export async function downloadTranslation(translation: string): Promise<any[]> {
  const url = TRANSLATION_URLS[translation] || TRANSLATION_URLS["WEB"];
  
  if (translationCache[url]) {
    return translationCache[url];
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load the ${translation} Bible database from GitHub.`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid Bible database format received from GitHub.");
  }

  translationCache[url] = data;
  return data;
}

/**
 * Parses and fetches a scripture reference from raw GitHub JSON.
 * Matches formats: "John 3:16", "1 John 1:9", "Jonah 1:1-3", "Titus 1 : 1 - 4"
 */
export async function fetchScriptureFromGitHub(
  reference: string,
  translation: string = "WEB"
): Promise<FetchedPassage> {
  const regex = /^(\d?\s*[a-zA-Z\s]+)\s+(\d+)\s*:\s*(\d+)(?:\s*-\s*(\d+))?$/;
  const match = reference.trim().match(regex);

  if (!match) {
    throw new Error(
      "Invalid reference format. Please use 'Book Chapter:Verse' or 'Book Chapter:Verse-Verse' (e.g. 'John 3:16', '1 John 1:9', or 'Jonah 1:1-3')."
    );
  }

  const rawBook = match[1];
  const chapterNum = parseInt(match[2]);
  const startVerse = parseInt(match[3]);
  const endVerse = match[4] ? parseInt(match[4]) : startVerse;

  if (startVerse > endVerse) {
    throw new Error("Start verse cannot be greater than end verse.");
  }

  const officialBookName = normalizeBookName(rawBook);
  const bibleJson = await downloadTranslation(translation);

  // Search by official book name (or abbrev case-insensitive)
  const bookData = bibleJson.find(
    (b: any) =>
      b.name?.toLowerCase() === officialBookName.toLowerCase() ||
      b.name?.toLowerCase() === rawBook.trim().toLowerCase() ||
      b.abbrev?.toLowerCase() === rawBook.trim().toLowerCase()
  );

  if (!bookData) {
    throw new Error(`Could not find the book "${rawBook}" in the ${translation} translation.`);
  }

  const chapterIndex = chapterNum - 1;
  if (chapterIndex < 0 || chapterIndex >= bookData.chapters.length) {
    throw new Error(`Chapter ${chapterNum} does not exist in ${bookData.name}.`);
  }

  const chapterVerses: string[] = bookData.chapters[chapterIndex];
  
  if (startVerse < 1 || startVerse > chapterVerses.length) {
    throw new Error(`Verse ${startVerse} is out of range for ${bookData.name} chapter ${chapterNum} (max: ${chapterVerses.length}).`);
  }
  if (endVerse < 1 || endVerse > chapterVerses.length) {
    throw new Error(`Verse ${endVerse} is out of range for ${bookData.name} chapter ${chapterNum} (max: ${chapterVerses.length}).`);
  }

  // Get selected verses (1-indexed, slice is 0-indexed)
  const selectedVerses = chapterVerses.slice(startVerse - 1, endVerse);
  const joinedText = selectedVerses.join(" ").trim();
  const words = joinedText.split(/\s+/).filter(Boolean);

  const parsedRef = `${bookData.name} ${chapterNum}:${startVerse}${endVerse !== startVerse ? `-${endVerse}` : ""}`;

  return {
    reference: parsedRef,
    book: bookData.name,
    chapter: chapterNum,
    startVerse,
    endVerse,
    text: joinedText,
    words
  };
}
