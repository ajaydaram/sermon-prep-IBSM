import { LexiconEntry } from "../types";

export const PRELOADED_LEXICON: Record<string, LexiconEntry> = {
  // Strong's G1411 - Power (dunamis)
  "power": {
    strongsNumber: "G1411",
    lemma: "δύναμις",
    transliteration: "dynamis",
    pronunciation: "doo'-nam-is",
    language: "Greek",
    partOfSpeech: "Noun, Feminine",
    gloss: "inherent power, force, ability, miracle, miraculous strength",
    semanticRange: [
      {
        definition: "Inherent strength or ability residing in a person or nature",
        nuance: "Divine capacity imparted by the Holy Spirit (e.g., Acts 1:8)",
        sampleReferences: ["Acts 1:8", "Luke 24:49", "Romans 1:16"]
      },
      {
        definition: "Miraculous work or deed of power",
        nuance: "Manifestation of God's supernatural activity in history",
        sampleReferences: ["Mark 6:2", "Acts 2:22", "2 Corinthians 12:12"]
      },
      {
        definition: "Moral authority or spiritual energy",
        nuance: "Resisting evil and empowering apostolic testimony",
        sampleReferences: ["2 Timothy 1:7", "Ephesians 3:16", "Colossians 1:11"]
      }
    ],
    canonFrequency: 120,
    frequencyBreakdown: [
      { section: "Synoptic Gospels", count: 38 },
      { section: "Acts of the Apostles", count: 10 },
      { section: "Pauline Epistles", count: 48 },
      { section: "General Epistles & Revelation", count: 24 }
    ],
    concordanceEntries: [
      { reference: "Acts 1:8", text: "but you will receive power (G1411) when the Holy Spirit has come upon you...", highlightedTerm: "power" },
      { reference: "Romans 1:16", text: "For I am not ashamed of the gospel, for it is the power (G1411) of God for salvation...", highlightedTerm: "power" },
      { reference: "2 Timothy 1:7", text: "For God has not given us a spirit of timidity, but of power (G1411) and love and discipline.", highlightedTerm: "power" },
      { reference: "Ephesians 3:20", text: "Now to Him who is able to do far more abundantly according to the power (G1411) that works within us...", highlightedTerm: "power" },
      { reference: "Luke 24:49", text: "And behold, I am sending the promise of My Father upon you; but stay in the city until you are clothed with power (G1411) from on high.", highlightedTerm: "power" }
    ]
  },

  // Strong's G4151 - Spirit (pneuma)
  "spirit": {
    strongsNumber: "G4151",
    lemma: "πνεῦμα",
    transliteration: "pneuma",
    pronunciation: "pnyoo'-mah",
    language: "Greek",
    partOfSpeech: "Noun, Neuter",
    gloss: "breath, wind, spirit, the Holy Spirit, human spirit",
    semanticRange: [
      {
        definition: "The Third Person of the Trinity (The Holy Spirit)",
        nuance: "Personal divine agent who convicts, empowers, and indwells believers",
        sampleReferences: ["Acts 1:8", "John 14:26", "Romans 8:9"]
      },
      {
        definition: "The immaterial part of man",
        nuance: "Human consciousness or spiritual faculty responsive to God",
        sampleReferences: ["Romans 8:16", "1 Corinthians 2:11"]
      },
      {
        definition: "Wind or moving air",
        nuance: "Invisible yet perceptible physical force",
        sampleReferences: ["John 3:8", "Hebrews 1:7"]
      }
    ],
    canonFrequency: 379,
    frequencyBreakdown: [
      { section: "Gospels", count: 105 },
      { section: "Acts", count: 70 },
      { section: "Pauline Epistles", count: 146 },
      { section: "General & Revelation", count: 58 }
    ],
    concordanceEntries: [
      { reference: "Acts 1:8", text: "...when the Holy Spirit (G4151) has come upon you...", highlightedTerm: "Spirit" },
      { reference: "John 14:26", text: "But the Helper, the Holy Spirit (G4151), whom the Father will send in My name...", highlightedTerm: "Spirit" },
      { reference: "Romans 8:16", text: "The Spirit (G4151) Himself testifies with our spirit that we are children of God...", highlightedTerm: "Spirit" },
      { reference: "Galatians 5:22", text: "But the fruit of the Spirit (G4151) is love, joy, peace, patience, kindness...", highlightedTerm: "Spirit" }
    ]
  },

  // Strong's G3144 - Witness / Martyr (martys)
  "witness": {
    strongsNumber: "G3144",
    lemma: "μάρτυς",
    transliteration: "martys",
    pronunciation: "mar'-toos",
    language: "Greek",
    partOfSpeech: "Noun, Masculine",
    gloss: "witness, spectator, one who testifies or bears witness (root of 'martyr')",
    semanticRange: [
      {
        definition: "One who testifies to facts experienced firsthand",
        nuance: "Eye-witness testifying to the resurrection of Jesus Christ",
        sampleReferences: ["Acts 1:8", "Acts 2:32", "1 Peter 5:1"]
      },
      {
        definition: "One who seals testimony with their blood (Martyr)",
        nuance: "Faithfulness unto death under persecution",
        sampleReferences: ["Acts 22:20", "Revelation 2:13", "Revelation 17:6"]
      }
    ],
    canonFrequency: 35,
    frequencyBreakdown: [
      { section: "Acts of the Apostles", count: 13 },
      { section: "Pauline Epistles", count: 8 },
      { section: "General Epistles & Revelation", count: 14 }
    ],
    concordanceEntries: [
      { reference: "Acts 1:8", text: "...and you shall be My witnesses (G3144) both in Jerusalem...", highlightedTerm: "witnesses" },
      { reference: "Acts 22:20", text: "And when the blood of Your witness (G3144) Stephen was being shed...", highlightedTerm: "witness" },
      { reference: "Revelation 2:13", text: "...Antipas, My witness (G3144), My faithful one, who was killed among you...", highlightedTerm: "witness" },
      { reference: "1 Peter 5:1", text: "...a fellow elder and witness (G3144) of the sufferings of Christ...", highlightedTerm: "witness" }
    ]
  },

  // Strong's G4102 - Faith (pistis)
  "faith": {
    strongsNumber: "G4102",
    lemma: "πίστις",
    transliteration: "pistis",
    pronunciation: "pis'-tis",
    language: "Greek",
    partOfSpeech: "Noun, Feminine",
    gloss: "faith, trust, conviction, fidelity, body of Christian doctrine",
    semanticRange: [
      {
        definition: "Personal trust and reliance upon God / Jesus Christ",
        nuance: "Active confidence yielding obedience",
        sampleReferences: ["Titus 1:1", "Romans 1:17", "Ephesians 2:8"]
      },
      {
        definition: "Fidelity or faithfulness",
        nuance: "Trustworthiness of God or loyalty of believers",
        sampleReferences: ["Romans 3:3", "Galatians 5:22", "Titus 2:10"]
      },
      {
        definition: "The Christian faith (body of teaching)",
        nuance: "Objective truth entrusted to the saints",
        sampleReferences: ["Jude 1:3", "Titus 1:4", "Galatians 1:23"]
      }
    ],
    canonFrequency: 243,
    frequencyBreakdown: [
      { section: "Gospels & Acts", count: 52 },
      { section: "Pauline Epistles", count: 142 },
      { section: "Hebrews & General Epistles", count: 49 }
    ],
    concordanceEntries: [
      { reference: "Titus 1:1", text: "...for the faith (G4102) of those chosen of God and the knowledge of the truth...", highlightedTerm: "faith" },
      { reference: "Ephesians 2:8", text: "For by grace you have been saved through faith (G4102); and that not of yourselves...", highlightedTerm: "faith" },
      { reference: "Hebrews 11:1", text: "Now faith (G4102) is the assurance of things hoped for, the conviction of things not seen.", highlightedTerm: "faith" },
      { reference: "Romans 5:1", text: "Therefore, having been justified by faith (G4102), we have peace with God...", highlightedTerm: "faith" }
    ]
  },

  // Strong's H0430 - God (Elohim)
  "god": {
    strongsNumber: "H0430",
    lemma: "אֱלֹהִים",
    transliteration: "Elohim",
    pronunciation: "el-o-heem'",
    language: "Hebrew",
    partOfSpeech: "Noun, Masculine Plural",
    gloss: "God, supreme Deity, ruler, divine judge",
    semanticRange: [
      {
        definition: "The One True God, Creator of Heaven and Earth",
        nuance: "Plural of majesty emphasizing fullness of power and authority",
        sampleReferences: ["Genesis 1:1", "Jonah 1:1", "Psalm 19:1"]
      },
      {
        definition: "Divine beings or judges",
        nuance: "Human magistrates or heavenly council (in specific OT contexts)",
        sampleReferences: ["Exodus 22:8", "Psalm 82:6"]
      }
    ],
    canonFrequency: 2600,
    frequencyBreakdown: [
      { section: "Torah / Pentateuch", count: 980 },
      { section: "Historical Books", count: 520 },
      { section: "Poetic & Wisdom", count: 450 },
      { section: "Prophets", count: 650 }
    ],
    concordanceEntries: [
      { reference: "Genesis 1:1", text: "In the beginning God (H0430) created the heavens and the earth.", highlightedTerm: "God" },
      { reference: "Jonah 1:1", text: "Now the word of the Lord came to Jonah... but Jonah fled from God (H0430)...", highlightedTerm: "God" },
      { reference: "Psalm 46:1", text: "God (H0430) is our refuge and strength, a very present help in trouble.", highlightedTerm: "God" }
    ]
  },

  // Strong's H7307 - Spirit / Wind (Ruach)
  "wind": {
    strongsNumber: "H7307",
    lemma: "רוּחַ",
    transliteration: "ruach",
    pronunciation: "roo'-akh",
    language: "Hebrew",
    partOfSpeech: "Noun, Feminine",
    gloss: "wind, breath, spirit, mind, the Spirit of God",
    semanticRange: [
      {
        definition: "The Spirit of God (Ruach Elohim)",
        nuance: "Divine life-giving presence hovering over creation or empowering prophets",
        sampleReferences: ["Genesis 1:2", "Ezekiel 37:9", "Isaiah 61:1"]
      },
      {
        definition: "Wind / rushing blast of air",
        nuance: "Natural element controlled by Yahweh",
        sampleReferences: ["Exodus 14:21", "Jonah 1:4"]
      }
    ],
    canonFrequency: 378,
    frequencyBreakdown: [
      { section: "Pentateuch", count: 42 },
      { section: "Prophets", count: 180 },
      { section: "Psalms & Wisdom", count: 156 }
    ],
    concordanceEntries: [
      { reference: "Jonah 1:4", text: "The Lord hurled a great wind (H7307) on the sea and there was a great storm...", highlightedTerm: "wind" },
      { reference: "Genesis 1:2", text: "And the Spirit (H7307) of God was moving over the surface of the waters.", highlightedTerm: "Spirit" }
    ]
  },

  // Strong's G3056 - Word / Message (logos)
  "word": {
    strongsNumber: "G3056",
    lemma: "λόγος",
    transliteration: "logos",
    pronunciation: "log'-os",
    language: "Greek",
    partOfSpeech: "Noun, Masculine",
    gloss: "word, speech, divine divine utterance, reason, revelation, Jesus Christ as the Word",
    semanticRange: [
      {
        definition: "Divine communication or Gospel message",
        nuance: "The proclaimed truth of God entrusted to ministers",
        sampleReferences: ["Titus 1:3", "2 Timothy 4:2", "Colossians 1:25"]
      },
      {
        definition: "The Eternal Son of God (The Incarnate Logos)",
        nuance: "Second Person of the Trinity (John 1:1, 14)",
        sampleReferences: ["John 1:1", "John 1:14", "1 John 1:1"]
      }
    ],
    canonFrequency: 330,
    frequencyBreakdown: [
      { section: "Gospels", count: 102 },
      { section: "Acts", count: 65 },
      { section: "Pauline Epistles", count: 98 },
      { section: "General & Revelation", count: 65 }
    ],
    concordanceEntries: [
      { reference: "Titus 1:3", text: "...manifested in His word (G3056) through preaching with which I was entrusted...", highlightedTerm: "word" },
      { reference: "John 1:1", text: "In the beginning was the Word (G3056), and the Word was with God, and the Word was God.", highlightedTerm: "Word" },
      { reference: "2 Timothy 4:2", text: "Preach the word (G3056); be ready in season and out of season...", highlightedTerm: "word" }
    ]
  },

  // Strong's G5485 - Grace (charis)
  "grace": {
    strongsNumber: "G5485",
    lemma: "χάρις",
    transliteration: "charis",
    pronunciation: "khar'-ece",
    language: "Greek",
    partOfSpeech: "Noun, Feminine",
    gloss: "grace, unmerited favor, divine influence upon the heart, gratitude",
    semanticRange: [
      {
        definition: "Unmerited favor and loving-kindness of God",
        nuance: "Free gift of salvation apart from works",
        sampleReferences: ["Ephesians 2:8", "Titus 1:4", "Romans 3:24"]
      },
      {
        definition: "Sustaining power for ministry and suffering",
        nuance: "Apostolic enablement in hardships",
        sampleReferences: ["2 Corinthians 12:9", "1 Corinthians 15:10"]
      }
    ],
    canonFrequency: 155,
    frequencyBreakdown: [
      { section: "Gospels & Acts", count: 22 },
      { section: "Pauline Epistles", count: 100 },
      { section: "General Epistles & Revelation", count: 33 }
    ],
    concordanceEntries: [
      { reference: "Titus 1:4", text: "Grace (G5485) and peace from God the Father and Christ Jesus our Savior.", highlightedTerm: "Grace" },
      { reference: "Ephesians 2:8", text: "For by grace (G5485) you have been saved through faith...", highlightedTerm: "grace" },
      { reference: "2 Corinthians 12:9", text: "My grace (G5485) is sufficient for you, for My power is perfected in weakness.", highlightedTerm: "grace" }
    ]
  }
};
