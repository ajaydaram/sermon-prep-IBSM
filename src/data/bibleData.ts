export interface BiblePassage {
  id: string;
  reference: string;
  book: string;
  chapter: number;
  verses: string;
  translations: {
    [key: string]: {
      text: string;
      words: string[];
    };
  };
}

export const PRELOADED_PASSAGES: BiblePassage[] = [
  {
    id: "acts-1-8",
    reference: "Acts 1:8",
    book: "Acts",
    chapter: 1,
    verses: "8",
    translations: {
      "NASB 2020": {
        text: "but you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem and in all Judea, and Samaria, and as far as the remotest part of the earth.",
        words: ["but", "you", "will", "receive", "power", "when", "the", "Holy", "Spirit", "has", "come", "upon", "you;", "and", "you", "shall", "be", "My", "witnesses", "both", "in", "Jerusalem", "and", "in", "all", "Judea,", "and", "Samaria,", "and", "as", "far", "as", "the", "remotest", "part", "of", "the", "earth."]
      },
      "ESV": {
        text: "But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth.",
        words: ["But", "you", "will", "receive", "power", "when", "the", "Holy", "Spirit", "has", "come", "upon", "you,", "and", "you", "will", "be", "my", "witnesses", "in", "Jerusalem", "and", "in", "all", "Judea", "and", "Samaria,", "and", "to", "the", "end", "of", "the", "earth."]
      },
      "NET": {
        text: "But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the farthest parts of the earth.",
        words: ["But", "you", "will", "receive", "power", "when", "the", "Holy", "Spirit", "has", "come", "upon", "you,", "and", "you", "will", "be", "my", "witnesses", "in", "Jerusalem,", "and", "in", "all", "Judea", "and", "Samaria,", "and", "to", "the", "farthest", "parts", "of", "the", "earth."]
      },
      "Greek (SBLGNT)": {
        text: "ἀλλὰ λήμψεσθε δύναμιν ἐπελθόντος τοῦ ἁγίου πνεύματος ἐφ’ ὑμᾶς, καὶ ἔσεσθέ μου μάρτυρες ἔν τε Ἰερουσαλὴμ καὶ ἐν πάσῃ τῇ Ἰουδαίᾳ καὶ Σαμαρείᾳ καὶ ἕως ἐσχάτου τῆς γῆς.",
        words: ["ἀλλὰ", "λήμψεσθε", "δύναμιν", "ἐπελθόντος", "τοῦ", "ἁγίου", "πνεύματος", "ἐφ’", "ὑμᾶς,", "καὶ", "ἔσεσθέ", "μου", "μάρτυρες", "ἔν", "τε", "Ἰερουσαλὴμ", "καὶ", "ἐν", "πάσῃ", "τῇ", "Ἰουδαίᾳ", "καὶ", "Σαμαρείᾳ", "καὶ", "ἕως", "ἐσχάτου", "τῆς", "γῆς."]
      }
    }
  },
  {
    id: "john-14-1-3",
    reference: "John 14:1-3",
    book: "John",
    chapter: 14,
    verses: "1-3",
    translations: {
      "NASB 2020": {
        text: "Let not your heart be troubled; believe in God, believe also in Me. In My Father's house are many dwelling places; if it were not so, I would have told you; for I go to prepare a place for you. And if I go and prepare a place for you, I will come again, and receive you to Myself; that where I am, there you may be also.",
        words: ["Let", "not", "your", "heart", "be", "troubled;", "believe", "in", "God,", "believe", "also", "in", "Me.", "In", "My", "Father's", "house", "are", "many", "dwelling", "places;", "if", "it", "were", "not", "so,", "I", "would", "have", "told", "you;", "for", "I", "go", "to", "prepare", "a", "place", "for", "you.", "And", "if", "I", "go", "and", "prepare", "a", "place", "for", "you,", "I", "will", "come", "again,", "and", "receive", "you", "to", "Myself;", "that", "where", "I", "am,", "there", "you", "may", "be", "also."]
      },
      "ESV": {
        text: "Let not your hearts be troubled. Believe in God; believe also in me. In my Father's house are many rooms. If it were not so, would I have told you that I go to prepare a place for you? And if I go and prepare a place for you, I will come again and will take you to myself, that where I am you may be also.",
        words: ["Let", "not", "your", "hearts", "be", "troubled.", "Believe", "in", "God;", "believe", "also", "in", "me.", "In", "my", "Father's", "house", "are", "many", "rooms.", "If", "it", "were", "not", "so,", "would", "I", "have", "told", "you", "that", "I", "go", "to", "prepare", "a", "place", "for", "you?", "And", "if", "I", "go", "and", "prepare", "a", "place", "for", "you,", "I", "will", "come", "again", "and", "will", "take", "you", "to", "myself,", "that", "where", "I", "am", "you", "may", "be", "also."]
      },
      "Greek (SBLGNT)": {
        text: "Μὴ ταρασσέσθω ὑμῶν ἡ καρδία· πιστεύετε εἰς τὸν θεόν, καὶ εἰς ἐμὲ πιστεύετε. ἐν τῇ οἰκίᾳ τοῦ πατρός μου μοναὶ πολλαί εἰσιν· εἰ δὲ μή, εἶπον ἂν ὑμῖν ὅτι πορεύομαι ἑτοιμάσαι τόπον ὑμῖν; καὶ ἐὰν πορευθῶ καὶ ἑτοιμάσω τόπον ὑμῖν, πάλιν ἔρχομαι καὶ παραλήμψομαι ὑμᾶς πρὸς ἐμαυτόν, ἵνα ὅπου εἰμὶ ἐγὼ καὶ ὑμεῖς ἦτε.",
        words: ["Μὴ", "ταρασσέσθω", "ὑμῶν", "ἡ", "καρδία·", "πιστεύετε", "εἰς", "τὸν", "θεόν,", "καὶ", "εἰς", "ἐμὲ", "πιστεύετε.", "ἐν", "τῇ", "οἰκίᾳ", "τοῦ", "πατρός", "μου", "μοναὶ", "πολλαί", "εἰσιν·", "εἰ", "δὲ", "μή,", "εἶπον", "ἂν", "ὑμῖν", "ὅτι", "πορεύομαι", "ἑτοιμάσαι", "τόπον", "ὑμῖν;", "καὶ", "ἐὰν", "πορευθῶ", "καὶ", "ἑτοιμάσω", "τόπον", "ὑμῖν,", "πάλιν", "ἔρχομαι", "καὶ", "παραλήμψομαι", "ὑμᾶς", "πρὸς", "ἐμαυτόν,", "ἵνα", "ὅπου", "εἰμὶ", "ἐγὼ", "καὶ", "ὑμεῖς", "ἦτε."]
      }
    }
  },
  {
    id: "titus-1-1-4",
    reference: "Titus 1:1-4",
    book: "Titus",
    chapter: 1,
    verses: "1-4",
    translations: {
      "NASB 2020": {
        text: "Paul, a bond-servant of God and an apostle of Jesus Christ, for the faith of those chosen of God and the knowledge of the truth which is according to godliness, in the hope of eternal life, which God, who cannot lie, promised before times eternal, but at the proper time revealed His word in the proclamation with which I was entrusted according to the commandment of God our Savior, To Titus, my true child in a common faith: Grace and peace from God the Father and Christ Jesus our Savior.",
        words: ["Paul,", "a", "bond-servant", "of", "God", "and", "an", "apostle", "of", "Jesus", "Christ,", "for", "the", "faith", "of", "those", "chosen", "of", "God", "and", "the", "knowledge", "of", "the", "truth", "which", "is", "according", "to", "godliness,", "in", "the", "hope", "of", "eternal", "life,", "which", "God,", "who", "cannot", "lie,", "promised", "before", "times", "eternal,", "but", "at", "the", "proper", "time", "revealed", "His", "word", "in", "the", "proclamation", "with", "which", "I", "was", "entrusted", "according", "to", "the", "commandment", "of", "God", "our", "Savior,", "To", "Titus,", "my", "true", "child", "in", "a", "common", "faith:", "Grace", "and", "peace", "from", "God", "the", "Father", "and", "Christ", "Jesus", "our", "Savior."]
      },
      "ESV": {
        text: "Paul, a servant of God and an apostle of Jesus Christ, for the sake of the faith of God's elect and their knowledge of the truth, which accords with godliness, in hope of eternal life, which God, who never lies, promised before the ages began and at the proper time manifested in his word through the preaching with which I have been entrusted by the command of God our Savior, To Titus, my true child in a common faith: Grace and peace from God the Father and Christ Jesus our Savior.",
        words: ["Paul,", "a", "servant", "of", "God", "and", "an", "apostle", "of", "Jesus", "Christ,", "for", "the", "sake", "of", "the", "faith", "of", "God's", "elect", "and", "their", "knowledge", "of", "the", "truth,", "which", "accords", "with", "godliness,", "in", "hope", "of", "eternal", "life,", "which", "God,", "who", "never", "lies,", "promised", "before", "the", "ages", "began", "and", "at", "the", "proper", "time", "manifested", "in", "his", "word", "through", "the", "preaching", "with", "which", "I", "have", "been", "entrusted", "by", "the", "command", "of", "God", "our", "Savior,", "To", "Titus,", "my", "true", "child", "in", "a", "common", "faith:", "Grace", "and", "peace", "from", "God", "the", "Father", "and", "Christ", "Jesus", "our", "Savior."]
      },
      "Greek (SBLGNT)": {
        text: "Παῦλος δοῦλος θεοῦ, ἀπόστολος δὲ Ἰησοῦ Χριστοῦ κατὰ πίστιν ἐκλεκτῶν θεοῦ καὶ ἐπίγνωσιν ἀληθείας τῆς κατ’ εὐσέβειαν ἐπ’ ἐλπίδι ζωῆς αἰωνίου, ἣν ἐπηγγείλατο ὁ ἀψευδὴς θεὸς πρὸ χρόνων αἰωνίων, ἐφανέρωσεν δὲ καιροῖς ἰδίοις τὸν λόγον αὐτοῦ ἐν κηρύγματι ὃ ἐπιστεύθην ἐγὼ κατ’ ἐπιταγὴν τοῦ σωτῆρος ἡμῶν θεοῦ, Τίτῳ γνησίῳ τέκνῳ κατὰ κοινὴν πίστιν· χάρις καὶ εἰρήνη ἀπὸ θεοῦ πατρὸς καὶ Χριστοῦ Ἰησοῦ τοῦ σωτῆρος ἡμῶν.",
        words: ["Παῦλος", "δοῦλος", "θεοῦ,", "ἀπόστολος", "δὲ", "Ἰησοῦ", "Χριστοῦ", "κατὰ", "πίστιν", "ἐκλεκτῶν", "θεοῦ", "καὶ", "ἐπίγνωσιν", "ἀληθείας", "τῆς", "κατ’", "εὐσέβειαν", "ἐπ’", "ἐλπίδι", "ζωῆς", "αἰωνίου,", "ἣν", "ἐπηγγείλατο", "ὁ", "ἀψευδὴς", "θεὸς", "πρὸ", "χρόνων", "αἰωνίων,", "ἐφανέρωσεν", "δὲ", "καιροῖς", "ἰδίοις", "τὸν", "λόγον", "αὐτοῦ", "ἐν", "κηρύγματι", "ὃ", "ἐπιστεύθην", "ἐγὼ", "κατ’", "ἐπιταγὴν", "τοῦ", "σωτῆρος", "ἡμῶν", "θεοῦ,", "Τίτῳ", "γνησίῳ", "τέκνῳ", "κατὰ", "κοινὴν", "πίστιν·", "χάρις", "καὶ", "εἰρήνη", "ἀπὸ", "θεοῦ", "πατρὸς", "καὶ", "Χριστοῦ", "Ἰησοῦ", "τοῦ", "σωτῆρος", "ἡμῶν."]
      }
    }
  },
  {
    id: "jonah-1-1-3",
    reference: "Jonah 1:1-3",
    book: "Jonah",
    chapter: 1,
    verses: "1-3",
    translations: {
      "NASB 2020": {
        text: "The word of the Lord came to Jonah the son of Amittai, saying, 'Arise, go to Nineveh, the great city, and cry out against it, because their wickedness has come up before Me.' But Jonah arose to flee to Tarshish from the presence of the Lord. So he went down to Joppa, found a ship which was going to Tarshish, paid the fare, and went down into it to go with them to Tarshish from the presence of the Lord.",
        words: ["The", "word", "of", "the", "Lord", "came", "to", "Jonah", "the", "son", "of", "Amittai,", "saying,", "'Arise,", "go", "to", "Nineveh,", "the", "great", "city,", "and", "cry", "out", "against", "it,", "because", "their", "wickedness", "has", "come", "up", "before", "Me.'", "But", "Jonah", "arose", "to", "flee", "to", "Tarshish", "from", "the", "presence", "of", "the", "Lord.", "So", "he", "went", "down", "to", "Joppa,", "found", "a", "ship", "which", "was", "going", "to", "Tarshish,", "paid", "the", "fare,", "and", "went", "down", "into", "it", "to", "go", "with", "them", "to", "Tarshish", "from", "the", "presence", "of", "the", "Lord."]
      },
      "ESV": {
        text: "Now the word of the Lord came to Jonah the son of Amittai, saying, 'Arise, go to Nineveh, that great city, and call out against it, for their evil has come up before me.' But Jonah rose to flee to Tarshish from the presence of the Lord. He went down to Joppa and found a ship going to Tarshish. So he paid the fare and went on board, to go with them to Tarshish, away from the presence of the Lord.",
        words: ["Now", "the", "word", "of", "the", "Lord", "came", "to", "Jonah", "the", "son", "of", "Amittai,", "saying,", "'Arise,", "go", "to", "Nineveh,", "that", "great", "city,", "and", "call", "out", "against", "it,", "for", "their", "evil", "has", "come", "up", "before", "me.'", "But", "Jonah", "rose", "to", "flee", "to", "Tarshish", "from", "the", "presence", "of", "the", "Lord.", "He", "went", "down", "to", "Joppa", "and", "found", "a", "ship", "going", "to", "Tarshish.", "So", "he", "paid", "the", "fare", "and", "went", "on", "board,", "to", "go", "with", "them", "to", "Tarshish,", "away", "from", "the", "presence", "of", "the", "Lord."]
      },
      "Hebrew (BHS)": {
        text: "וַיְהִי דְּבַר־יְהוָה אֶל־יוֹנָה בֶן־אֲמִתַּי לֵאמֹר׃ קוּם לֵךְ אֶל־נִינְוֵה הָעִיר הַגְּדוֹלָה וּקְרָא עָלֶיהָ כִּי־עָלְתָה רָעָתָם לְפָנָי׃ וַיָּקָם יוֹנָה לִבְרֹחַ תַּרְשִׁישָׁה מִלִּפְנֵי יְהוָה וַיֵּרֶד יָפוֹ וַיִּמְצָא אֳנִיָּה בָּאָה תַרְשִׁישׁ וַיִּתֵּן שְׂכָרָהּ וַיֵּרֶד בָּהּ לָבוֹא עִמָּהֶם תַּרְשִׁישָׁה מִלִּפְנֵי יְהוָה׃",
        words: ["וַיְהִי", "דְּבַר־יְהוָה", "אֶל־יוֹנָה", "בֶן־אֲמִתַּי", "לֵאמֹר׃", "קוּם", "לֵךְ", "אֶל־נִינְוֵה", "הָעִיר", "הַגְּדוֹלָה", "וּקְרָא", "עָלֶיהָ", "כִּי־עָלְתָה", "רָעָתָם", "לְפָנָי׃", "וַיָּקָם", "יוֹנָה", "לִבְרֹחַ", "תַּרְשִׁישָׁה", "מִלִּפְנֵי", "יְהוָה", "וַיֵּרֶד", "יָפוֹ", "וַיִּמְצָא", "אֳנִיָּה", "בָּאָה", "תַרְשִׁישׁ", "וַיִּתֵּן", "שְׂכָרָהּ", "וַיֵּרֶד", "בָּהּ", "לָבוֹא", "עִמָּהֶם", "תַּרְשִׁישָׁה", "מִלִּפְנֵי", "יְהוָה׃"]
      }
    }
  },
  {
    id: "hebrews-7-1-3",
    reference: "Hebrews 7:1-3",
    book: "Hebrews",
    chapter: 7,
    verses: "1-3",
    translations: {
      "NASB 2020": {
        text: "For this Melchizedek, king of Salem, priest of the Most High God, who met Abraham as he was returning from the slaughter of the kings and blessed him, to whom also Abraham apportioned a tenth part of all the spoils, was first of all, by the translation of his name, king of righteousness, and then also king of Salem, which is king of peace. Without father, without mother, without genealogy, having neither beginning of days nor end of life, but made like the Son of God, he remains a priest perpetually.",
        words: ["For", "this", "Melchizedek,", "king", "of", "Salem,", "priest", "of", "the", "Most", "High", "God,", "who", "met", "Abraham", "as", "he", "was", "returning", "from", "the", "slaughter", "of", "the", "kings", "and", "blessed", "him,", "to", "whom", "also", "Abraham", "apportioned", "a", "tenth", "part", "of", "all", "the", "spoils,", "was", "first", "of", "all,", "by", "the", "translation", "of", "his", "name,", "king", "of", "righteousness,", "and", "then", "also", "king", "of", "Salem,", "which", "is", "king", "of", "peace.", "Without", "father,", "without", "mother,", "without", "genealogy,", "having", "neither", "beginning", "of", "days", "nor", "end", "of", "life,", "but", "made", "like", "the", "Son", "of", "God,", "he", "remains", "a", "priest", "perpetually."]
      },
      "ESV": {
        text: "For this Melchizedek, king of Salem, priest of the Most High God, met Abraham returning from the slaughter of the kings and blessed him, and to him Abraham apportioned a tenth part of everything. He is first, by translation of his name, king of righteousness, and then he is also king of Salem, that is, king of peace. He is without father or mother or genealogy, having neither beginning of days nor end of life, but resembling the Son of God he continues a priest forever.",
        words: ["For", "this", "Melchizedek,", "king", "of", "Salem,", "priest", "of", "the", "Most", "High", "God,", "met", "Abraham", "returning", "from", "the", "slaughter", "of", "the", "kings", "and", "blessed", "him,", "and", "to", "him", "Abraham", "apportioned", "a", "tenth", "part", "of", "everything.", "He", "is", "first,", "by", "translation", "of", "his", "name,", "king", "of", "righteousness,", "and", "then", "he", "is", "also", "king", "of", "Salem,", "that", "is,", "king", "of", "peace.", "He", "is", "without", "father", "or", "mother", "or", "genealogy,", "having", "neither", "beginning", "of", "days", "nor", "end", "of", "life,", "but", "resembling", "the", "Son", "of", "God", "he", "continues", "a", "priest", "forever."]
      },
      "Greek (SBLGNT)": {
        text: "Οὗτος γὰρ ὁ Μελχισεδέκ, βασιλεὺς Σαλήμ, ἱερεὺς τοῦ θεοῦ τοῦ ὑψίστου, ὁ συναντήσας Ἀβραὰμ ὑποστρέφοντι ἀπὸ τῆς κοπῆς τῶν βασιλέων καὶ εὐλογήσας αὐτόν, ᾧ καὶ δεκάτην ἀπὸ πάντων ἐμέρισεν Ἀβραάμ, πρῶτον μὲν ἑρμηνευόμενος Βασιλεὺς Δικαιοσύνης ἔπειτα δὲ καὶ Βασιλεὺς Σαλήμ, ὅ ἐστιν Βασιλεὺς Εἰρήνης, ἀπάτωρ, ἀμήτωρ, ἀγενεαλόγητος, μήτε ἀρχὴν ἡμερῶν μήτε ζωῆς τέλος ἔχων, ἀφωμοιωμένος δὲ τῷ υἱῷ τοῦ θεοῦ, μένει ἱερεὺς εἰς τὸ διηνεκές.",
        words: ["Οὗτος", "γὰρ", "ὁ", "Μελχισεδέκ,", "βασιλεὺς", "Σαλήμ,", "ἱερεὺς", "τοῦ", "θεοῦ", "τοῦ", "ὑψίστου,", "ὁ", "συναντήσας", "Ἀβραὰμ", "ὑποστρέφοντι", "ἀπὸ", "τῆς", "κοπῆς", "τῶν", "βασιλέων", "καὶ", "εὐλογήσας", "αὐτόν,", "ᾧ", "καὶ", "δεκάτην", "ἀπὸ", "πάντων", "ἐμέρισεν", "Ἀβραάμ,", "πρῶτον", "μὲν", "ἑρμηνευόμενος", "Βασιλεὺς", "Δικαιοσύνης", "ἔπειτα", "δὲ", "καὶ", "Βασιλεὺς", "Σαλήμ,", "ὅ", "ἐστιν", "Βασιλεὺς", "Εἰρήνης,", "ἀπάτωρ,", "ἀμήτωρ,", "ἀγενεαλόγητος,", "μήτε", "ἀρχὴν", "ἡμερῶν", "μήτε", "ζωῆς", "τέλος", "ἔχων,", "ἀφωμοιωμένος", "δὲ", "τῷ", "υἱῷ", "τοῦ", "θεοῦ,", "μένει", "ἱερεὺς", "εἰς", "τὸ", "διηνεκές."]
      }
    }
  }
];
