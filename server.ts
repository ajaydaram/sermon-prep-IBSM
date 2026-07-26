import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Helper function to call Gemini
async function getGeminiFeedback(systemInstruction: string, prompt: string, responseSchema?: any) {
  try {
    const config: any = {
      systemInstruction,
      temperature: 0.2,
    };

    if (responseSchema) {
      config.responseMimeType = "application/json";
      config.responseSchema = responseSchema;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config,
    });

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to communicate with AI");
  }
}

// 1. Analyze Observations Endpoint
// Conforms to Bite 03, 05, and Syllabus LT B02 (e.g. Acts 1:8)
app.post("/api/gemini/analyze-observations", async (req, res) => {
  const { verseText, observations } = req.body;

  if (!verseText || !Array.isArray(observations)) {
    return res.status(400).json({ error: "Missing verseText or observations array." });
  }

  const systemInstruction = `You are a strict but encouraging professor (Dr. Keith A. Shubert) for the BS510 Inductive Bible Study Method course.
Your goal is to evaluate student observations on a specific verse of Scripture.
Strict Rules for IBSM Observations (Bite 02, 03, 05):
1. An observation must be a factual STATEMENT of what is directly visible in the text.
2. It must NOT be a question (e.g., "What does power mean?" is an interpretation question, not an observation).
3. It must NOT contain interpretation (e.g., explaining symbolic meanings, theology, or commenting on what something means).
4. It must NOT contain application (e.g., using personal pronouns like "us", "we", "I", "you", or stating how it applies to our lives today).
5. It should identify terms, grammatical structures, literary forms, atmosphere, repetitions, contrasts, comparisons, etc., directly present in the text.
6. Example of a good observation: "'Shall receive' is future tense." or "'Jerusalem', 'Judea', 'Samaria' represent geographical progression."
7. Example of a bad observation (contains interpretation): "Holy Spirit gives power because God wants us to be strong."

Provide an evaluation for each observation.
For each observation, determine:
- isValid: boolean (true if it strictly observes the text without questions, interpretations, or applications)
- category: string ("Observation", "Interpretation Question", "Theological Interpretation", "Personal Application", "Other")
- explanation: string (why it is valid or invalid, with specific constructive guidance)
- feedback: string (encouraging comment on how to make it a better IBSM observation if invalid, or praise if valid)
- score: number (1 if valid, 0 if invalid)
- correctedForm: string (how they can rephrase it as a pure observation statement)`;

  const prompt = `Verse Text: "${verseText}"
Student Observations:
${observations.map((obs: string, idx: number) => `${idx + 1}. "${obs}"`).join("\n")}

Evaluate these observations and return a structured JSON array matching the request schema.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      evaluations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            index: { type: Type.INTEGER },
            studentText: { type: Type.STRING },
            isValid: { type: Type.BOOLEAN },
            category: { type: Type.STRING },
            explanation: { type: Type.STRING },
            feedback: { type: Type.STRING },
            score: { type: Type.INTEGER },
            correctedForm: { type: Type.STRING },
          },
          required: ["index", "studentText", "isValid", "category", "explanation", "feedback", "score", "correctedForm"],
        },
      },
      totalScore: { type: Type.INTEGER },
      overallComment: { type: Type.STRING },
    },
    required: ["evaluations", "totalScore", "overallComment"],
  };

  try {
    const feedbackText = await getGeminiFeedback(systemInstruction, prompt, responseSchema);
    if (!feedbackText) {
      throw new Error("No response received from Gemini");
    }
    res.json(JSON.parse(feedbackText));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Analyze Big Idea Statement Endpoint
// Conforms to "THE BIG IDEA" document (Subject + Complement = Idea Statement)
app.post("/api/gemini/analyze-big-idea", async (req, res) => {
  const { passageReference, subject, complement } = req.body;

  if (!passageReference || !subject || !complement) {
    return res.status(400).json({ error: "Missing passageReference, subject, or complement." });
  }

  const systemInstruction = `You are an expert tutor for the BS510 Inductive Bible Study Method course.
You must critique a student's proposed "Big Idea" statement for a passage.
According to the course guidelines (Bite 19, "THE BIG IDEA"):
- A "Big Idea" or "Idea Statement" is a single sentence representing the main point of the text.
- It MUST have exactly two parts: Subject + Complement.
- The SUBJECT represents "What is the author talking about?". It is usually a short phrase, never one word (e.g. "The reason for our forgiveness is..."). Behind every Subject is an implied question (e.g. "What is the reason for our forgiveness?").
- The COMPLEMENT represents "What is the author saying about the subject?". It specifically answers the implied question (e.g., "...the grace of a merciful God.").
- Putting them together forms the complete sentence: "The reason for our forgiveness is the grace of a merciful God."

Critique the student's input.
Determine:
- subjectAnalysis: string (is it a short phrase? is it complete? does it describe "what" is talked about?)
- impliedQuestion: string (what is the implied question behind their Subject?)
- complementAnalysis: string (does it directly answer the implied question? is it grammatically aligned?)
- sentenceForm: string (the fully compiled Subject + Complement sentence)
- isValidBigIdea: boolean (does it form a proper, single-sentence Subject + Complement matching the passage?)
- score: number (out of 100)
- critiqueAndSuggestions: string (specific, encouraging, and detailed critique on how to perfect the Big Idea statement, following Dr. Keith A. Shubert's rubric)`;

  const prompt = `Passage: ${passageReference}
Proposed Subject: "${subject}"
Proposed Complement: "${complement}"

Analyze this against the IBSM formula and return JSON matching the schema.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      subjectAnalysis: { type: Type.STRING },
      impliedQuestion: { type: Type.STRING },
      complementAnalysis: { type: Type.STRING },
      compiledSentence: { type: Type.STRING },
      isValidBigIdea: { type: Type.BOOLEAN },
      score: { type: Type.INTEGER },
      critiqueAndSuggestions: { type: Type.STRING },
    },
    required: ["subjectAnalysis", "impliedQuestion", "complementAnalysis", "compiledSentence", "isValidBigIdea", "score", "critiqueAndSuggestions"],
  };

  try {
    const feedbackText = await getGeminiFeedback(systemInstruction, prompt, responseSchema);
    if (!feedbackText) {
      throw new Error("No response received from Gemini");
    }
    res.json(JSON.parse(feedbackText));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Consultation Insights Endpoint
// Conforms to Bite 10-13, 19, and the Course Syllabus
app.post("/api/gemini/consultation-insights", async (req, res) => {
  const { bookName } = req.body;

  if (!bookName) {
    return res.status(400).json({ error: "Missing bookName." });
  }

  const systemInstruction = `You are a scholarly Bible Dictionary and Commentary consultation service tailored for the EAST IBSM course.
Provide highly accurate, brief, and educational introductory details for the specified biblical book.
Limit each section to 2-3 sentences.
Include:
- author: Who wrote it? Mention internal and external evidence briefly.
- dateOfWriting: When was it written? (e.g. 67 AD for 2 Timothy, 520 BC for Haggai, 605-536 BC for Daniel).
- historicalSetting: Brief summary of the local/regional/international setting (e.g., Roman cell for 2 Timothy, postexilic Yehud for Haggai).
- recipients: Who were they? (e.g., Timothy at Ephesus, Zerubbabel and Joshua for Haggai).
- occasionAndPurpose: Why was it written? What did the author hope to accomplish?
- genre: The primary genre (e.g., Epistle, OT Prophecy, Apocalyptic, Narrative, Hebrew Poetry).
- keyThemes: The central theological theme or message statement.`;

  const prompt = `Provide IBSM Consultation Insights for the biblical book: "${bookName}"`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      bookName: { type: Type.STRING },
      author: { type: Type.STRING },
      dateOfWriting: { type: Type.STRING },
      historicalSetting: { type: Type.STRING },
      recipients: { type: Type.STRING },
      occasionAndPurpose: { type: Type.STRING },
      genre: { type: Type.STRING },
      keyThemes: { type: Type.STRING },
    },
    required: ["bookName", "author", "dateOfWriting", "historicalSetting", "recipients", "occasionAndPurpose", "genre", "keyThemes"],
  };

  try {
    const feedbackText = await getGeminiFeedback(systemInstruction, prompt, responseSchema);
    if (!feedbackText) {
      throw new Error("No response received from Gemini");
    }
    res.json(JSON.parse(feedbackText));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Analyze Structural Laws Endpoint
// Conforms to Bite 08 (Cruciality of Structure)
app.post("/api/gemini/analyze-structural-laws", async (req, res) => {
  const { passageReference, passageText } = req.body;

  if (!passageReference || !passageText) {
    return res.status(400).json({ error: "Missing passageReference or passageText." });
  }

  const systemInstruction = `You are an expert in structural analysis for the BS510 Inductive Bible Study Method course.
Your task is to identify and explain the primary "Laws of Structure" operating in a biblical passage, as defined by Dr. Robert A. Traina and Dr. Keith A. Shubert.
The laws of structure to look for:
- Law of Comparison (association of like things, e.g. "so also")
- Law of Contrast (association of opposites, e.g. "but", "nevertheless")
- Law of Repetition (reiteration of same terms, phrases, clauses, e.g. "faith" in Hebrews 11)
- Law of Continuity (repeated use of similar terms/themes)
- Law of Continuation (extended treatment of a particular aspect without recurrence)
- Law of Climax (progressing from lesser to greater and ultimately to greatest)
- Law of Cruciality (utilization of a pivot or turning point)
- Law of Interchange (exchanging/alteration of elements, e.g. Luke 1-2)
- Law of Particularization (general to specific, e.g. Matthew 6:1-18)
- Law of Generalization (specific to general, e.g. James 2)
- Law of Causation (cause to effect, e.g. Romans 1:18-32)
- Law of Substantiation (effect to cause, e.g. Romans 8:18-30)
- Law of Instrumentation (setting forth means to an end, purpose)
- Law of Explanation or Analysis (presentation of an idea followed by its interpretation, e.g. Mark 4)
- Law of Preparation or Introduction (background setting preceding events, e.g. Genesis 2:4-25 preceding Genesis 3)
- Law of Summarization (abridgement of compendium preceding or following)
- Law of Interrogation (question followed by its answer, e.g. Romans 6-7)
- Law of Harmony (effecting unity by agreement)
- Law of Proportions (emphasis related to space given, e.g. Luke 9:51-19:27)

Analyze the provided passage. Identify 2-4 major structural laws that are clearly operating in this specific text.
For each law, provide:
- lawName: string
- keyVerses: string (which verses illustrate this law)
- evidenceText: string (quote the words or connectives illustrating it, e.g., highlighting "but", "therefore", or repeated terms)
- explanation: string (detailed explanation of how this law organizes the author's thought in the passage)`;

  const prompt = `Passage Reference: ${passageReference}
Passage Text: "${passageText}"

Identify and explain the operating Laws of Structure. Return matching JSON.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      passageReference: { type: Type.STRING },
      detectedLaws: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            lawName: { type: Type.STRING },
            keyVerses: { type: Type.STRING },
            evidenceText: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          required: ["lawName", "keyVerses", "evidenceText", "explanation"],
        },
      },
      summaryOfStructure: { type: Type.STRING },
    },
    required: ["passageReference", "detectedLaws", "summaryOfStructure"],
  };

  try {
    const feedbackText = await getGeminiFeedback(systemInstruction, prompt, responseSchema);
    if (!feedbackText) {
      throw new Error("No response received from Gemini");
    }
    res.json(JSON.parse(feedbackText));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Lexicon & Concordance Lookup Endpoint
// Provides Strong's Numbers, Lemma, Parsing, Semantic Range, and Canon Occurrences
app.post("/api/lexicon/lookup", async (req, res) => {
  const { term, contextPassage } = req.body;

  if (!term) {
    return res.status(400).json({ error: "Missing search term." });
  }

  const systemInstruction = `You are an expert biblical linguist and lexicon assistant (embedded Strong's Concordance and Greek/Hebrew Dictionary like Mounce and Brown-Driver-Briggs).
Provide a complete, scholarly lexicon and concordance entry for the given English word or Strong's Number in the context of biblical literature.

Instructions:
- strongsNumber: e.g. "G1411" or "H0430"
- lemma: original Greek/Hebrew script (e.g. "δύναμις" or "אֱלֹהִים")
- transliteration: e.g. "dynamis"
- pronunciation: phonetic pronunciation guide (e.g. "doo'-nam-is")
- language: "Greek" or "Hebrew" or "Aramaic"
- partOfSpeech: e.g. "Noun, Feminine" or "Verb, Aorist Active Indicative"
- gloss: concise 1-sentence definition
- semanticRange: array of 2-3 definitions/nuances with sample references
- canonFrequency: total occurrences across the Old or New Testament canon
- frequencyBreakdown: array of 3-4 sections with counts (e.g. Gospels: 35, Paul: 48, etc.)
- concordanceEntries: array of 4-6 key verse occurrences across the Bible with text and highlighted term`;

  const prompt = `Term to Lookup: "${term}" ${contextPassage ? `(In passage context: ${contextPassage})` : ""}`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      strongsNumber: { type: Type.STRING },
      lemma: { type: Type.STRING },
      transliteration: { type: Type.STRING },
      pronunciation: { type: Type.STRING },
      language: { type: Type.STRING },
      partOfSpeech: { type: Type.STRING },
      gloss: { type: Type.STRING },
      semanticRange: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            definition: { type: Type.STRING },
            nuance: { type: Type.STRING },
            sampleReferences: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["definition", "nuance", "sampleReferences"],
        },
      },
      canonFrequency: { type: Type.INTEGER },
      frequencyBreakdown: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            section: { type: Type.STRING },
            count: { type: Type.INTEGER },
          },
          required: ["section", "count"],
        },
      },
      concordanceEntries: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            reference: { type: Type.STRING },
            text: { type: Type.STRING },
            highlightedTerm: { type: Type.STRING },
          },
          required: ["reference", "text", "highlightedTerm"],
        },
      },
    },
    required: ["strongsNumber", "lemma", "transliteration", "pronunciation", "language", "partOfSpeech", "gloss", "semanticRange", "canonFrequency", "frequencyBreakdown", "concordanceEntries"],
  };

  try {
    const feedbackText = await getGeminiFeedback(systemInstruction, prompt, responseSchema);
    if (!feedbackText) {
      throw new Error("No response received from Gemini");
    }
    res.json(JSON.parse(feedbackText));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Advanced Exegetical Auditing (Syntactical & Theological Linter) Endpoint
app.post("/api/linter/audit", async (req, res) => {
  const {
    bookTitle,
    passageRef,
    author,
    date,
    historicalSetting,
    occasionPurpose,
    theme,
    simpleOutline,
    sentenceOutline,
    argumentProse,
  } = req.body;

  const systemInstruction = `You are the Master Exegetical Linter and Senior Academic Audit Professor for the BS510 Inductive Bible Study Method course.
Your objective is to perform a rigorous 4-pillar Syntactical and Theological Audit on a student's exegesis draft:

1. Verb Tense Accuracy Audit:
   - Rule: Strict past tense MUST be used when referring to historical biblical events and actions of ancient biblical authors/figures (e.g. "Paul wrote", "Haggai declared", "The temple lay ruined").
   - Flag any present or future tense verbs used inappropriately for past historical events (e.g. "Paul is writing", "Haggai says", "Jesus preaches").

2. Structural Outlining Compliance:
   - Rule: Every heading/line in a Sentence Outline MUST conform strictly to the formula: "Subject + Complement = Complete Sentence".
   - Flag any incomplete sentence fragments (e.g. "I. The importance of rebuilding"), missing subjects, or missing complements. Provide rewritten compliant sentences for every non-compliant heading.

3. Harmonization Audit (Logical & Theological Consistency):
   - Rule: The Historical Occasion/Purpose, Central Theme (Message Statement), Outline Divisions, and Argument Prose must be logically aligned without contradictory statements or focus shifts.
   - Analyze whether the theme reflects the occasion, whether the sentence outline matches the theme, and whether the argument prose supports the outline.

4. Citation & Punctuation Validation:
   - Rule: Biblically standard abbreviations inside parentheses MUST NOT contain dotted abbreviations (e.g., "1 Chron 11:1" NOT "1 Chron. 11:1", "2 Tim 2:15" NOT "2 Tim. 2:15").
   - Rule: Within paragraph prose, book names should be written out (e.g., "First Chronicles 11:1" or "Second Timothy 2:15") or properly parenthesized as abbreviations e.g. "(1 Chron 11:1)".

Provide a comprehensive JSON report including scores, specific flagged items with explanations and fixes, and a complete auto-corrected draft text ready for one-click application.`;

  const prompt = `Student Exegesis Draft to Audit:
Book Title: ${bookTitle || "N/A"}
Passage Reference: ${passageRef || "N/A"}
Author & Place: ${author || "N/A"}
Date of Writing: ${date || "N/A"}
Historical Setting: ${historicalSetting || "N/A"}
Occasion & Purpose: ${occasionPurpose || "N/A"}
Central Theme (Message Statement): ${theme || "N/A"}

Simple Outline:
${simpleOutline || "N/A"}

Sentence Outline:
${sentenceOutline || "N/A"}

Exegesis Argument Prose:
${argumentProse || "N/A"}`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      overallScore: { type: Type.INTEGER },
      summaryStatus: { type: Type.STRING },
      verbTenseAudit: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          passed: { type: Type.BOOLEAN },
          issuesCount: { type: Type.INTEGER },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                location: { type: Type.STRING },
                originalText: { type: Type.STRING },
                flaggedVerb: { type: Type.STRING },
                issueExplanation: { type: Type.STRING },
                suggestedCorrection: { type: Type.STRING },
                correctedSentence: { type: Type.STRING },
              },
              required: ["location", "originalText", "flaggedVerb", "issueExplanation", "suggestedCorrection", "correctedSentence"],
            },
          },
        },
        required: ["score", "passed", "issuesCount", "items"],
      },
      structuralOutlineAudit: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          passed: { type: Type.BOOLEAN },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                lineIdentifier: { type: Type.STRING },
                originalHeading: { type: Type.STRING },
                isCompleteSentence: { type: Type.BOOLEAN },
                subjectFound: { type: Type.STRING },
                complementFound: { type: Type.STRING },
                issueExplanation: { type: Type.STRING },
                suggestedSentence: { type: Type.STRING },
              },
              required: ["lineIdentifier", "originalHeading", "isCompleteSentence", "subjectFound", "complementFound", "issueExplanation", "suggestedSentence"],
            },
          },
        },
        required: ["score", "passed", "items"],
      },
      harmonizationAudit: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          passed: { type: Type.BOOLEAN },
          overallAlignmentRating: { type: Type.STRING },
          findings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                status: { type: Type.STRING },
                analysis: { type: Type.STRING },
                recommendation: { type: Type.STRING },
              },
              required: ["category", "status", "analysis", "recommendation"],
            },
          },
        },
        required: ["score", "passed", "overallAlignmentRating", "findings"],
      },
      citationAudit: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          passed: { type: Type.BOOLEAN },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                location: { type: Type.STRING },
                originalCitation: { type: Type.STRING },
                ruleViolated: { type: Type.STRING },
                explanation: { type: Type.STRING },
                correctedCitation: { type: Type.STRING },
              },
              required: ["location", "originalCitation", "ruleViolated", "explanation", "correctedCitation"],
            },
          },
        },
        required: ["score", "passed", "items"],
      },
      autoCorrectedDraft: {
        type: Type.OBJECT,
        properties: {
          theme: { type: Type.STRING },
          sentenceOutline: { type: Type.STRING },
          argumentProse: { type: Type.STRING },
          summaryOfChanges: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["theme", "sentenceOutline", "argumentProse", "summaryOfChanges"],
      },
    },
    required: ["overallScore", "summaryStatus", "verbTenseAudit", "structuralOutlineAudit", "harmonizationAudit", "citationAudit", "autoCorrectedDraft"],
  };

  try {
    const feedbackText = await getGeminiFeedback(systemInstruction, prompt, responseSchema);
    if (!feedbackText) {
      throw new Error("No response received from Gemini AI Linter");
    }
    res.json(JSON.parse(feedbackText));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Real-Time Collaboration Workshop Memory Store & API Endpoints
interface RoomStore {
  roomId: string;
  roomName: string;
  studyProject: any;
  collaborators: {
    id: string;
    name: string;
    role: "Professor" | "Pastor" | "Group Member" | "Student";
    color: string;
    activeTab: string;
    lastActive: string;
  }[];
  activityLogs: {
    id: string;
    timestamp: string;
    user: string;
    userColor: string;
    action: string;
    details: string;
  }[];
  sharedNotes: string;
}

const activeRooms: Record<string, RoomStore> = {};

// Get or poll room state
app.get("/api/collaboration/room/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = activeRooms[roomId.toUpperCase()];
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  res.json(room);
});

// Join or create collaboration room
app.post("/api/collaboration/room/join", (req, res) => {
  const { roomId, userName, userRole, initialStudyProject } = req.body;
  const cleanRoomId = (roomId || "EZRA-7701").toUpperCase().trim();

  if (!activeRooms[cleanRoomId]) {
    activeRooms[cleanRoomId] = {
      roomId: cleanRoomId,
      roomName: `${initialStudyProject?.bookTitle || "Exegesis"} Group Workshop`,
      studyProject: initialStudyProject || {
        id: "proj_default",
        title: "Haggai Exegesis Study",
        bookTitle: "HAGGAI",
        passageRef: "Haggai 1:1-15",
        tags: ["Sermon Series: Haggai", "Small Group: Haggai"],
        author: "Haggai",
        date: "520 BC",
        historicalSetting: "Post-exilic Jerusalem rebuilding phase",
        occasionPurpose: "To rouse the Jewish remnant to rebuild the temple",
        theme: "Israel can have present hope through rebuilding the temple.",
        simpleOutline: "I. FIRST MESSAGE (1:1-14)\n  A. Building Ceased (1:1-4)\n  B. Blessings Ceased (1:5-11)\n  C. Building Commenced (1:12-15)",
        sentenceOutline: "I. Israel and its leadership should rise from their lethargy and thus build the temple. (1:1-14)",
        argumentProse: "Haggai immediately referred to the temple...",
        observations: [
          "The passage begins with the adversative connective 'but'.",
          "Darius king of Persia is specified as historical anchor.",
        ],
        createdDate: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        status: "Draft",
      },
      collaborators: [],
      activityLogs: [
        {
          id: `log_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          user: "System",
          userColor: "#141414",
          action: "Room Created",
          details: `Collaborative Workshop room ${cleanRoomId} initialized.`
        }
      ],
      sharedNotes: "Welcome to the Scribe Ezra Group Study Room. Collaboratively construct observations, outlines, and charts here.",
    };
  }

  const room = activeRooms[cleanRoomId];
  const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const colors = ["#0284c7", "#d97706", "#059669", "#7c3aed", "#e11d48", "#0891b2"];
  const assignedColor = colors[room.collaborators.length % colors.length];

  const newCollaborator = {
    id: userId,
    name: userName || "Scholar",
    role: userRole || "Group Member",
    color: assignedColor,
    activeTab: "observation",
    lastActive: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  // Remove stale duplicate names or keep updated
  room.collaborators = room.collaborators.filter(c => c.name !== newCollaborator.name);
  room.collaborators.push(newCollaborator);

  room.activityLogs.unshift({
    id: `log_${Date.now()}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    user: newCollaborator.name,
    userColor: newCollaborator.color,
    action: "Joined Room",
    details: `${newCollaborator.name} (${newCollaborator.role}) joined the collaborative session.`
  });

  res.json({ room, currentUserId: userId });
});

// Update room state (live broadcasting of edits)
app.post("/api/collaboration/room/update", (req, res) => {
  const { roomId, userId, userName, userColor, actionType, details, studyProject, sharedNotes, activeTab } = req.body;
  const cleanRoomId = (roomId || "").toUpperCase().trim();

  const room = activeRooms[cleanRoomId];
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  if (studyProject) {
    room.studyProject = {
      ...room.studyProject,
      ...studyProject,
      lastModified: new Date().toISOString(),
    };
  }

  if (sharedNotes !== undefined) {
    room.sharedNotes = sharedNotes;
  }

  // Update collaborator presence timestamp and tab
  const collab = room.collaborators.find(c => c.id === userId || c.name === userName);
  if (collab) {
    collab.lastActive = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (activeTab) collab.activeTab = activeTab;
  }

  if (actionType) {
    room.activityLogs.unshift({
      id: `log_${Date.now()}_${Math.random()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: userName || "Scholar",
      userColor: userColor || "#141414",
      action: actionType,
      details: details || "Updated collaborative whiteboard.",
    });
    // Keep max 50 log entries
    if (room.activityLogs.length > 50) {
      room.activityLogs = room.activityLogs.slice(0, 50);
    }
  }

  res.json({ success: true, room });
});

// Vite server or static serving setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const startListening = (port: number) => {
    const server = app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
    server.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${port} in use, trying ${port + 1}...`);
        startListening(port + 1);
      } else {
        console.error("Server error:", err);
      }
    });
  };
  startListening(PORT);
}

startServer();
