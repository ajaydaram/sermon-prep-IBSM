import React, { useState, useEffect, useRef } from "react";
import {
  AlertCircle,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Send,
  HelpCircle,
  FileText,
  Info,
  Layers,
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  Sparkle,
  Bookmark,
  Delete,
  PenTool,
  Check,
  BookMarked,
  Lock,
  Unlock,
  Eye
} from "lucide-react";
import { motion } from "motion/react";
import { ObservationEvaluation } from "../types";
import { PRELOADED_PASSAGES, BiblePassage } from "../data/bibleData";
import { fetchScriptureFromGitHub } from "../utils/bibleFetcher";
import { useObservations } from "../context/ObservationContext";
import LexiconConcordanceModal from "./LexiconConcordanceModal";

// Observation categories
type ObservationCategory = "Terms" | "Structure" | "Genre" | "Atmosphere";

// Highlight tags available
type HighlightType = "Verb" | "Connective" | "Preposition" | "Pronoun" | "Key Term" | "Lexicon Inspector" | "None";

interface HighlightedWord {
  index: number;
  word: string;
  type: HighlightType;
}

interface WordConnection {
  id: string;
  fromIndex: number;
  fromWord: string;
  toIndex: number;
  toWord: string;
  relationshipType: "Causation" | "Substantiation" | "Condition" | "Comparison" | "Contrast" | "Progression" | "Instrumentation";
}

export default function ObservationWorkshop() {
  // Shared Observation Context
  const {
    observations,
    addObservation,
    removeObservation,
    setObservations,
    minRequiredObservations,
    isConsultationUnlocked,
  } = useObservations();

  // Lexicon Modal state
  const [isLexiconOpen, setIsLexiconOpen] = useState<boolean>(false);
  const [lexiconTerm, setLexiconTerm] = useState<string>("power");

  // Current passage state
  const [selectedPassageId, setSelectedPassageId] = useState<string>("acts-1-8");
  const [activeTranslation, setActiveTranslation] = useState<string>("NASB 2020");
  const [passageText, setPassageText] = useState<string>(PRELOADED_PASSAGES[0].translations["NASB 2020"].text);
  const [passageRef, setPassageRef] = useState<string>(PRELOADED_PASSAGES[0].reference);
  const [words, setWords] = useState<string[]>(PRELOADED_PASSAGES[0].translations["NASB 2020"].words);

  // Custom Bible lookup
  const [customRef, setCustomRef] = useState<string>("");
  const [customLoading, setCustomLoading] = useState<boolean>(false);
  const [customError, setCustomError] = useState<string | null>(null);
  const [customTranslation, setCustomTranslation] = useState<string>("WEB");

  // Interactive annotation markup state
  const [activeHighlightTool, setActiveHighlightTool] = useState<HighlightType>("Verb");
  const [wordHighlights, setWordHighlights] = useState<Record<number, HighlightType>>({});
  
  // Connections mode state
  const [connectionMode, setConnectionMode] = useState<boolean>(false);
  const [sourceWordIndex, setSourceWordIndex] = useState<number | null>(null);
  const [connections, setConnections] = useState<WordConnection[]>([]);
  const [activeRelationType, setActiveRelationType] = useState<WordConnection["relationshipType"]>("Condition");

  // Manual observation editor
  const [obsText, setObsText] = useState<string>("");
  const [obsCategory, setObsCategory] = useState<ObservationCategory>("Terms");
  
  // API evaluation
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluations, setEvaluations] = useState<ObservationEvaluation[]>([]);
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [overallComment, setOverallComment] = useState<string>("");

  // Coordinate tracking for SVG arrows
  const [resizeTrigger, setResizeTrigger] = useState<number>(0);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Trigger Arrow redraws on events
  useEffect(() => {
    const handleResize = () => setResizeTrigger((prev) => prev + 1);
    window.addEventListener("resize", handleResize);
    
    // Auto-update after font or layout shifts
    const timer = setTimeout(handleResize, 500);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [selectedPassageId, activeTranslation, wordHighlights, connections]);

  // Load a pre-loaded passage
  const handleSelectPreloaded = (id: string, trans?: string) => {
    const passage = PRELOADED_PASSAGES.find((p) => p.id === id);
    if (!passage) return;

    setSelectedPassageId(id);
    const availableTranslations = Object.keys(passage.translations);
    const newTrans = trans && availableTranslations.includes(trans) ? trans : availableTranslations[0];
    
    setActiveTranslation(newTrans);
    setPassageRef(`${passage.reference} (${newTrans})`);
    setPassageText(passage.translations[newTrans].text);
    setWords(passage.translations[newTrans].words);
    
    // Clear markings for clean state
    setWordHighlights({});
    setConnections([]);
    setSourceWordIndex(null);
    setConnectionMode(false);
  };

  // Change translation of current passage
  const handleChangeTranslation = (trans: string) => {
    handleSelectPreloaded(selectedPassageId, trans);
  };

  // Fetch custom passage from raw GitHub Bible databases (No APIs)
  const handleFetchCustomBible = async () => {
    const trimmed = customRef.trim();
    if (!trimmed) return;

    setCustomLoading(true);
    setCustomError(null);

    try {
      const data = await fetchScriptureFromGitHub(trimmed, customTranslation);

      setSelectedPassageId("custom");
      setActiveTranslation(customTranslation);
      setPassageRef(`${data.reference} (${customTranslation} / GitHub)`);
      setPassageText(data.text);
      setWords(data.words);

      // Reset markup
      setWordHighlights({});
      setConnections([]);
      setSourceWordIndex(null);
      setConnectionMode(false);
      setCustomRef("");
    } catch (err: any) {
      console.error(err);
      setCustomError(err.message || "Could not load scripture from GitHub. Check format (e.g. 'Jonah 1:1-3' or 'Romans 8:28').");
    } finally {
      setCustomLoading(false);
    }
  };

  // Click on individual words
  const handleWordClick = (index: number) => {
    if (connectionMode) {
      // Connective flow
      if (sourceWordIndex === null) {
        setSourceWordIndex(index);
      } else {
        // Double check they aren't connecting the same word
        if (sourceWordIndex === index) {
          setSourceWordIndex(null);
          return;
        }

        const newConnection: WordConnection = {
          id: `conn-${Date.now()}`,
          fromIndex: sourceWordIndex,
          fromWord: words[sourceWordIndex].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""),
          toIndex: index,
          toWord: words[index].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""),
          relationshipType: activeRelationType,
        };

        setConnections([...connections, newConnection]);
        setSourceWordIndex(null); // Reset
      }
    } else {
      // Highlighting flow
      const current = wordHighlights[index];
      if (current === activeHighlightTool) {
        // Toggle off
        const updated = { ...wordHighlights };
        delete updated[index];
        setWordHighlights(updated);
      } else if (activeHighlightTool === "None") {
        // Clear highlight
        const updated = { ...wordHighlights };
        delete updated[index];
        setWordHighlights(updated);
      } else if (activeHighlightTool === "Lexicon Inspector") {
        // Open Lexicon Modal for this clicked word
        const clickedWord = words[index].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        setLexiconTerm(clickedWord);
        setIsLexiconOpen(true);
      } else {
        // Set highlight
        setWordHighlights({
          ...wordHighlights,
          [index]: activeHighlightTool,
        });
      }
    }
  };

  // Add individual connection manually or from panel
  const handleRemoveConnection = (id: string) => {
    setConnections(connections.filter((c) => c.id !== id));
  };

  // Clear all annotations
  const handleClearAnnotations = () => {
    setWordHighlights({});
    setConnections([]);
    setSourceWordIndex(null);
    setConnectionMode(false);
  };

  // Compile visual annotation canvas into factual academic statements
  const handleCompileObservations = () => {
    const compiledList: string[] = [];

    // 1. Process highlighted words
    const typeLabelMap: Record<HighlightType, string> = {
      Verb: "verb",
      Connective: "connective",
      Preposition: "preposition",
      Pronoun: "pronoun",
      "Key Term": "key term",
      "Lexicon Inspector": "lexicon inspected term",
      None: "",
    };

    const highlightsByCategory: Record<HighlightType, string[]> = {
      Verb: [],
      Connective: [],
      Preposition: [],
      Pronoun: [],
      "Key Term": [],
      "Lexicon Inspector": [],
      None: [],
    };

    Object.entries(wordHighlights).forEach(([idxStr, typeVal]) => {
      const idx = parseInt(idxStr);
      const type = typeVal as HighlightType;
      const rawWord = words[idx];
      const cleaned = rawWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      highlightsByCategory[type].push(`"${cleaned}"`);
    });

    // Add highlighted terms as factual exegesis sentences
    if (highlightsByCategory["Verb"].length > 0) {
      compiledList.push(
        `The passage contains the following highlighted verbs: ${highlightsByCategory["Verb"].join(", ")}.`
      );
    }
    if (highlightsByCategory["Connective"].length > 0) {
      compiledList.push(
        `The passage incorporates structural connectives including: ${highlightsByCategory["Connective"].join(", ")}.`
      );
    }
    if (highlightsByCategory["Preposition"].length > 0) {
      compiledList.push(
        `Specific prepositional relationships are established by: ${highlightsByCategory["Preposition"].join(", ")}.`
      );
    }
    if (highlightsByCategory["Pronoun"].length > 0) {
      compiledList.push(
        `The personal or possessive pronouns include: ${highlightsByCategory["Pronoun"].join(", ")}.`
      );
    }
    if (highlightsByCategory["Key Term"].length > 0) {
      compiledList.push(
        `Key terms identified in the exegesis text: ${highlightsByCategory["Key Term"].join(", ")}.`
      );
    }

    // 2. Process structural lines
    connections.forEach((conn) => {
      compiledList.push(
        `A structural link of ${conn.relationshipType} is established connecting the term "${conn.fromWord}" to "${conn.toWord}".`
      );
    });

    // Append to our active logger observations without duplicate
    const uniqueNew = compiledList.filter((item) => !observations.includes(item));
    if (uniqueNew.length > 0) {
      setObservations([...observations, ...uniqueNew]);
    }
  };

  // Add observation manually
  const handleAddManualObservation = () => {
    const trimmed = obsText.trim();
    if (!trimmed) return;
    if (observations.includes(trimmed)) return;
    setObservations([...observations, trimmed]);
    setObsText("");
  };

  // Remove individual observation
  const handleRemoveObservation = (idx: number) => {
    setObservations(observations.filter((_, i) => i !== idx));
    setEvaluations([]);
    setTotalScore(null);
  };

  // Core API analyzer
  const handleAnalyzeObservations = async () => {
    if (observations.length === 0) return;
    setLoading(true);
    setEvaluations([]);
    setTotalScore(null);

    try {
      const res = await fetch("/api/gemini/analyze-observations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verseText: passageText, observations }),
      });

      if (!res.ok) {
        throw new Error("Failed to evaluate observations against Professor's rubric.");
      }

      const data = await res.json();
      setEvaluations(data.evaluations || []);
      setTotalScore(data.totalScore ?? 0);
      setOverallComment(data.overallComment || "");
    } catch (err: any) {
      console.error(err);
      alert("Error calling feedback assistant: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Clear overall state
  const handleResetWorkspace = () => {
    setObservations([]);
    setWordHighlights({});
    setConnections([]);
    setSourceWordIndex(null);
    setConnectionMode(false);
    setEvaluations([]);
    setTotalScore(null);
    setOverallComment("");
  };

  // Automatic Observation Generator Engine
  const handleAutoGenerateObservations = () => {
    const text = passageText.trim();
    if (!text) return;

    const generated: string[] = [];

    // 1. Structural Connectives & Contrast Words
    const connectivesMatch = text.match(/\b(but|for|and|so|therefore|since|because|when|if|without|also|first|then|so that)\b/gi) || [];
    const uniqueConnectives = Array.from(new Set(connectivesMatch.map(w => w.toLowerCase())));
    if (uniqueConnectives.length > 0) {
      generated.push(
        `The passage incorporates key structural connectives and transition markers: ${uniqueConnectives.map(c => `"${c}"`).join(", ")}.`
      );
    }

    // 2. Primary Action Verbs
    const verbMatches = text.match(/\b(received|receive|come|met|returning|blessed|apportioned|remains|continues|lives|make|save|held|holds|sworn|passed|arose|flee|paid|built|cease)\b/gi) || [];
    const uniqueVerbs = Array.from(new Set(verbMatches.map(v => v.toLowerCase())));
    if (uniqueVerbs.length > 0) {
      generated.push(
        `The primary action verbs driving the passage narrative include: ${uniqueVerbs.map(v => `"${v}"`).join(", ")}.`
      );
    }

    // 3. Key Names, Proper Nouns & Titles
    const titlesMatches = text.match(/\b(Melchizedek|Salem|Abraham|Abram|Levi|Levitical|God|Holy Spirit|Jesus|Lord|Christ|Jerusalem|Judea|Samaria|Darius|Zerubbabel|Joshua|Paul|Timothy)\b/g) || [];
    const uniqueTitles = Array.from(new Set(titlesMatches));
    if (uniqueTitles.length > 0) {
      generated.push(
        `The main historical figures and theological titles identified in the text are: ${uniqueTitles.join(", ")}.`
      );
    }

    // 4. Staccato Prepositional & Office Patterns
    if (/\bwithout\b/i.test(text)) {
      const withoutMatches = text.match(/\bwithout\s+\w+/gi) || [];
      if (withoutMatches.length > 0) {
        generated.push(
          `Staccato negative prepositional pattern detected: ${withoutMatches.map(m => `"${m}"`).join(", ")}.`
        );
      }
    }

    if (/\b(king|priest)\b/i.test(text)) {
      generated.push(
        `The passage highlights dual offices combining Kingly authority with Priestly mediation.`
      );
    }

    // 5. Atmosphere & Tone Analysis
    let tone = "Sober and Reverent";
    if (/\b(blessed|peace|righteousness|glory|power|save|perpetually|forever)\b/i.test(text)) {
      tone = "Exalted and Triumphant";
    } else if (/\b(flee|slaughter|enemies|wickedness|chastisement|ruined)\b/i.test(text)) {
      tone = "Urgent and Warning";
    }
    generated.push(
      `Atmosphere & Tone: The literary atmosphere of this passage is ${tone}, focusing on divine authority.`
    );

    // Merge generated observations into active state without duplicates
    const uniqueNew = generated.filter((item) => !observations.includes(item));
    if (uniqueNew.length > 0) {
      setObservations([...observations, ...uniqueNew]);
    }
  };

  // Quick pre-load helper
  const handlePreloadActs = () => {
    handleSelectPreloaded("acts-1-8");
    const preloadedObs = [
      "The passage begins with the adversative connective \"but\".",
      "\"Shall receive\" is a future active indicative verb denoting future experience.",
      "The recipient of power is explicitly identified by the plural pronoun \"you\".",
      "The coming of the Holy Spirit has a condition: \"when\" it has come.",
      "The geographical boundaries show a structured expansion: Jerusalem, Judea, Samaria, and the end of the earth.",
      "\"Witnesses\" is coupled with the personal pronoun \"My\", denoting ownership."
    ];
    setObservations(preloadedObs);
    setEvaluations([]);
    setTotalScore(null);
  };

  // Helper to calculate word coordinates for SVG relationship lines
  const getWordCoordinates = (index: number) => {
    const parent = canvasContainerRef.current;
    const wordEl = document.getElementById(`word-node-${index}`);
    if (!parent || !wordEl) return null;

    const pRect = parent.getBoundingClientRect();
    const wRect = wordEl.getBoundingClientRect();

    return {
      x: wRect.left - pRect.left + wRect.width / 2,
      y: wRect.top - pRect.top + wRect.height / 2,
    };
  };

  return (
    <div className="space-y-6" id="observation-board-root">
      {/* Educational Banner */}
      <div className="bg-[#141414] text-[#E4E3E0] rounded-xl p-5 border border-[#141414] shadow-sm flex flex-col md:flex-row items-start gap-4">
        <div className="p-3 bg-[#E4E3E0] text-[#141414] rounded-lg shrink-0">
          <PenTool className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider font-bold bg-[#E4E3E0] text-[#141414] px-1.5 py-0.5 rounded">Bite 04-09, 11-13</span>
            <span className="text-xs text-slate-400 font-mono">Visual Exegesis Studio</span>
          </div>
          <h3 className="font-serif text-lg font-semibold italic">
            "Observe with precision before you attempt to interpret."
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
            This workspace provides a <strong>digital colored-pencil board</strong> for annotating terms and plotting logical structures. State facts directly present in the text (e.g. grammar, repetitions, conjunctions). Points are deducted for interpreting (explaining meaning) or applying (drawing personal links).
          </p>
        </div>
      </div>

      {/* Bible Selection and API Integration Header */}
      <div className="bg-[#D4D3D0] border border-[#141414]/20 rounded-xl p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Preloaded Select */}
        <div className="md:col-span-5 space-y-1">
          <label className="block text-[10px] uppercase font-bold text-slate-600">
            Syllabus Passages (Multilingual & High-Fidelity)
          </label>
          <div className="flex gap-2">
            <select
              value={selectedPassageId}
              onChange={(e) => handleSelectPreloaded(e.target.value)}
              className="flex-1 text-xs font-mono border border-[#141414]/30 rounded bg-white p-2 text-[#141414] focus:ring-1 focus:ring-[#141414] outline-none"
            >
              {PRELOADED_PASSAGES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.reference} ({p.book})
                </option>
              ))}
              <option value="custom" disabled>
                Custom Loaded Passage
              </option>
            </select>

            {/* Translation Select */}
            {selectedPassageId !== "custom" && (
              <select
                value={activeTranslation}
                onChange={(e) => handleChangeTranslation(e.target.value)}
                className="w-32 text-xs font-mono border border-[#141414]/30 rounded bg-white p-2 text-[#141414] focus:ring-1 focus:ring-[#141414] outline-none"
              >
                {Object.keys(
                  PRELOADED_PASSAGES.find((p) => p.id === selectedPassageId)?.translations || {}
                ).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Live Github Scripture Lookup */}
        <div className="md:col-span-5 space-y-1">
          <label className="block text-[10px] uppercase font-bold text-slate-600">
            GitHub Bible Repositories Lookup (No APIs)
          </label>
          <div className="flex gap-1.5">
            <select
              value={customTranslation}
              onChange={(e) => setCustomTranslation(e.target.value)}
              className="text-xs font-mono border border-[#141414]/30 rounded bg-white p-2 text-[#141414] focus:outline-none focus:ring-1 focus:ring-[#141414] shrink-0"
              title="GitHub Hosted Translation"
            >
              <option value="WEB">WEB</option>
              <option value="KJV">KJV</option>
              <option value="ASV">ASV</option>
              <option value="Reina-Valera (ES)">RVR</option>
              <option value="Almeida (PT)">ARA</option>
              <option value="Louis Segond (FR)">LSG</option>
            </select>
            <div className="relative flex-1">
              <input
                type="text"
                value={customRef}
                onChange={(e) => setCustomRef(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleFetchCustomBible();
                }}
                className="w-full text-xs font-mono border border-[#141414]/30 rounded bg-white py-2 pl-3 pr-10 text-[#141414] placeholder:text-slate-400 outline-none"
                placeholder="e.g. Jonah 1:2, Romans 8:28"
              />
              <button
                onClick={handleFetchCustomBible}
                disabled={customLoading}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors"
                title="Fetch directly from GitHub repository"
              >
                {customLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Rapid Actions */}
        <div className="md:col-span-2 flex flex-col justify-end h-full">
          <button
            onClick={handlePreloadActs}
            className="w-full h-9 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold uppercase rounded tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Preload Acts 1:8
          </button>
        </div>

        {customError && (
          <div className="md:col-span-12 text-[11px] text-red-700 font-mono flex items-center gap-1.5 bg-red-50 p-2 rounded border border-red-150">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Error: {customError}</span>
          </div>
        )}
      </div>

      {/* Main Board Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Interactive Column (Canvas Board) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#141414]/25 rounded-xl p-5 shadow-sm space-y-4 relative">
            
            {/* Toolbar Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-serif text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-emerald-800" />
                  {passageRef}
                </h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Click words to markup</p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  onClick={handleAutoGenerateObservations}
                  className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-bold uppercase rounded transition-all flex items-center gap-1.5 shadow-sm cursor-pointer border border-amber-500"
                  title="Automatically extract terms, verbs, connectives, and tone observations"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-Generate Observations
                </button>
                <button
                  onClick={() => {
                    setLexiconTerm("power");
                    setIsLexiconOpen(true);
                  }}
                  className="px-2.5 py-1 text-[10px] font-bold uppercase border border-purple-800 bg-purple-50 text-purple-950 hover:bg-purple-100 rounded transition-colors flex items-center gap-1 cursor-pointer"
                  title="Open Integrated Concordance & Lexicon"
                >
                  <BookMarked className="w-3.5 h-3.5 text-purple-700" />
                  Lexicon & Concordance
                </button>
                <button
                  onClick={handleClearAnnotations}
                  className="px-2.5 py-1 text-[10px] font-bold uppercase border border-[#141414]/30 rounded text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Clear Canvas
                </button>
                <button
                  onClick={handleCompileObservations}
                  className="px-3 py-1 bg-[#141414] hover:bg-[#252525] text-white text-[10px] font-bold uppercase rounded transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Compile visual drawings into factual study sentences"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Compile to Logger
                </button>
              </div>
            </div>

            {/* Annotation Brush Controls */}
            <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-lg space-y-3.5">
              
              {/* Highlight Palette */}
              <div className="space-y-1.5">
                <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400">
                  Colored-Pencil Highlighting Brushes
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "Verb", label: "Verb (Red)", color: "bg-red-50 text-red-800 border-red-300 ring-red-400" },
                    { id: "Connective", label: "Connective (Blue)", color: "bg-blue-50 text-blue-800 border-blue-300 ring-blue-400" },
                    { id: "Preposition", label: "Preposition (Green)", color: "bg-emerald-50 text-emerald-800 border-emerald-300 ring-emerald-400" },
                    { id: "Pronoun", label: "Pronoun (Amber)", color: "bg-amber-50 text-amber-800 border-amber-300 ring-amber-400" },
                    { id: "Key Term", label: "Key Term (Purple)", color: "bg-purple-50 text-purple-800 border-purple-300 ring-purple-400" },
                    { id: "Lexicon Inspector", label: "🔍 Lexicon Inspector (Strong's)", color: "bg-indigo-50 text-indigo-900 border-indigo-300 ring-indigo-400 font-bold" },
                    { id: "None", label: "Eraser (Clear)", color: "bg-slate-100 text-slate-700 border-slate-300 ring-slate-400" },
                  ].map((brush) => (
                    <button
                      key={brush.id}
                      onClick={() => {
                        setConnectionMode(false);
                        setActiveHighlightTool(brush.id as HighlightType);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
                        !connectionMode && activeHighlightTool === brush.id
                          ? `${brush.color} ring-2 scale-102 font-semibold`
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {brush.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Structural Relation Line Drawer */}
              <div className="pt-2.5 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400">
                    Structural Relationship Connector
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setConnectionMode(!connectionMode);
                        setSourceWordIndex(null);
                      }}
                      className={`px-3 py-1 text-xs font-semibold rounded border transition-all flex items-center gap-1.5 ${
                        connectionMode
                          ? "bg-slate-800 text-white border-slate-800 ring-2 ring-slate-400"
                          : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      {connectionMode ? "Active: Connection Mode" : "Start Connection Line"}
                    </button>

                    {connectionMode && (
                      <select
                        value={activeRelationType}
                        onChange={(e) => setActiveRelationType(e.target.value as any)}
                        className="text-xs border border-slate-300 bg-white rounded p-1 text-[#141414] focus:outline-none"
                      >
                        <option value="Causation">Causation (Cause &rarr; Effect)</option>
                        <option value="Substantiation">Substantiation (Effect &rarr; Cause)</option>
                        <option value="Condition">Condition (If &rarr; Then)</option>
                        <option value="Comparison">Comparison (Like &rarr; Like)</option>
                        <option value="Contrast">Contrast (Opposite)</option>
                        <option value="Progression">Progression</option>
                        <option value="Instrumentation">Instrumentation (Means)</option>
                      </select>
                    )}
                  </div>
                </div>

                {connectionMode && (
                  <div className="text-[11px] text-slate-500 font-mono italic max-w-[240px] text-left sm:text-right">
                    {sourceWordIndex === null ? (
                      "1. Click starting term on the board..."
                    ) : (
                      <>
                        Selected Source: <strong className="text-slate-800">"{words[sourceWordIndex].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")}"</strong>. Click target term to draw the line!
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Word Canvas Container */}
            <div
              ref={canvasContainerRef}
              id="canvas-container"
              className="relative p-6 border border-slate-200 rounded-xl min-h-[220px] select-none bg-slate-50/20 overflow-hidden"
            >
              {/* SVG Overlay for Connections */}
              <svg className="absolute inset-0 pointer-events-none w-full h-full z-10">
                <defs>
                  <marker
                    id="arrow-marker"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b" />
                  </marker>
                </defs>

                {connections.map((conn) => {
                  const startCoords = getWordCoordinates(conn.fromIndex);
                  const endCoords = getWordCoordinates(conn.toIndex);

                  if (!startCoords || !endCoords) return null;

                  const x1 = startCoords.x;
                  const y1 = startCoords.y;
                  const x2 = endCoords.x;
                  const y2 = endCoords.y;

                  // Compute elegant curved arc path
                  const dx = x2 - x1;
                  const dy = y2 - y1;
                  const distance = Math.hypot(dx, dy);

                  // Do not render path if too close
                  if (distance < 15) return null;

                  // Curved control points
                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2;
                  const bend = 0.25; // bend ratio
                  const cx = midX - dy * bend;
                  const cy = midY + dx * bend;

                  return (
                    <g key={conn.id}>
                      {/* Invisible wider interactive hover line */}
                      <path
                        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                        fill="none"
                        stroke="transparent"
                        strokeWidth="12"
                        className="cursor-pointer pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Remove connection line: ${conn.relationshipType}?`)) {
                            handleRemoveConnection(conn.id);
                          }
                        }}
                      />
                      {/* Elegant dotted background arc */}
                      <path
                        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        markerEnd="url(#arrow-marker)"
                      />
                      {/* Connection relationship text badge */}
                      <text
                        x={cx}
                        y={cy - 6}
                        fill="#1e293b"
                        className="font-mono text-[9px] font-bold bg-white px-1"
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        {conn.relationshipType}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Clickable Word Grid */}
              <div className="flex flex-wrap gap-x-2 gap-y-3.5 relative z-20">
                {words.map((word, idx) => {
                  const highlight = wordHighlights[idx];
                  const isSource = sourceWordIndex === idx;

                  // Determine brush tag styling
                  let brushClass = "";
                  if (highlight === "Verb") {
                    brushClass = "bg-red-50 text-red-800 border-red-300 border-b-2 border-b-red-600";
                  } else if (highlight === "Connective") {
                    brushClass = "bg-blue-50 text-blue-800 border-blue-300 border-b-2 border-b-blue-600 font-bold";
                  } else if (highlight === "Preposition") {
                    brushClass = "bg-emerald-50 text-emerald-800 border-emerald-300 border-b-2 border-b-emerald-600 border-dashed";
                  } else if (highlight === "Pronoun") {
                    brushClass = "bg-amber-50 text-amber-800 border-amber-300 border-b-2 border-b-amber-600 italic";
                  } else if (highlight === "Key Term") {
                    brushClass = "bg-purple-100 text-purple-950 border-purple-400 ring-1 ring-purple-300 font-serif";
                  } else if (highlight === "Lexicon Inspector") {
                    brushClass = "bg-indigo-100 text-indigo-950 border-indigo-500 font-bold underline decoration-indigo-500";
                  } else {
                    brushClass = "bg-white hover:bg-slate-50 border-slate-200 text-slate-800";
                  }

                  if (isSource) {
                    brushClass = "bg-slate-800 text-white border-slate-900 ring-2 ring-slate-400";
                  }

                  return (
                    <button
                      key={idx}
                      id={`word-node-${idx}`}
                      onClick={() => handleWordClick(idx)}
                      className={`px-2 py-1 text-xs rounded border transition-all cursor-pointer font-sans leading-none flex items-center shrink-0 ${brushClass}`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Canvas Instructions info */}
            <div className="text-[10px] text-slate-400 leading-relaxed italic border-t border-slate-100 pt-3 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                To draw lines: select "Start Connection Line", select the type, click the origin word, then click the destination word. Click an existing line to remove it.
              </span>
            </div>
          </div>

          {/* Connection Line Summary List */}
          {connections.length > 0 && (
            <div className="bg-white border border-[#141414]/25 rounded-xl p-4 shadow-sm space-y-2">
              <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Visual Relations Drawn ({connections.length})
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {connections.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                  >
                    <div className="flex items-center gap-1 font-mono text-[11px] truncate">
                      <span className="font-semibold text-slate-700 truncate">"{c.fromWord}"</span>
                      <span className="text-slate-400 text-[10px]">&rarr;</span>
                      <span className="text-emerald-800 font-bold">[{c.relationshipType}]</span>
                      <span className="text-slate-400 text-[10px]">&rarr;</span>
                      <span className="font-semibold text-slate-700 truncate">"{c.toWord}"</span>
                    </div>
                    <button
                      onClick={() => handleRemoveConnection(c.id)}
                      className="text-slate-400 hover:text-red-600 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Observation Logger Column */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Action Logger Controls */}
          <div className="bg-white border border-[#141414]/25 rounded-xl p-5 shadow-sm space-y-4">
            
            {/* Pedagogy Gate Status Bar */}
            <div className={`p-3 rounded-lg border flex items-center justify-between gap-2 text-xs font-mono ${
              isConsultationUnlocked
                ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                : "bg-amber-50 border-amber-200 text-amber-950"
            }`}>
              <div className="flex items-center gap-2">
                {isConsultationUnlocked ? (
                  <Unlock className="w-4 h-4 text-emerald-700 shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                )}
                <span className="font-bold">
                  {isConsultationUnlocked
                    ? "Consultation Desk: Unlocked"
                    : `Pedagogy Gate: ${observations.length}/${minRequiredObservations} Obs Logged`}
                </span>
              </div>
              <span className="text-[10px] opacity-75">
                {isConsultationUnlocked
                  ? "Rule 5 Satisfied"
                  : `Need ${Math.max(0, minRequiredObservations - observations.length)} more`}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-serif text-sm font-bold text-slate-800">
                  Observation Logger
                </h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Syllabus requirement: 25 observations
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Logged: {observations.length}
              </span>
            </div>

            {/* Scribing input */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <select
                  value={obsCategory}
                  onChange={(e) => setObsCategory(e.target.value as any)}
                  className="w-24 text-[11px] font-mono border border-slate-200 bg-white rounded-lg p-2 focus:ring-1 focus:ring-[#141414] outline-none shrink-0"
                >
                  <option value="Terms">Terms</option>
                  <option value="Structure">Structure</option>
                  <option value="Genre">Genre</option>
                  <option value="Atmosphere">Atmosphere</option>
                </select>

                <input
                  type="text"
                  value={obsText}
                  onChange={(e) => setObsText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddManualObservation();
                  }}
                  className="flex-1 text-xs border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  placeholder="Type literal exegesis statement..."
                />
                
                <button
                  onClick={handleAddManualObservation}
                  className="p-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors flex items-center justify-center shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List of Logged Obs */}
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
              {observations.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-slate-200 rounded-lg text-slate-400 text-xs italic">
                  No observations recorded. Draw lines/tags and click "Compile to Logger" or write manual ones above!
                </div>
              ) : (
                observations.map((obs, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-slate-50 border border-slate-150 rounded-lg p-2.5 text-xs text-slate-700 hover:border-slate-300 transition-colors group"
                  >
                    <span className="font-mono text-slate-400 font-semibold w-5 shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <span className="flex-1 leading-relaxed">{obs}</span>
                    <button
                      onClick={() => handleRemoveObservation(idx)}
                      className="text-slate-400 hover:text-red-600 transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Evaluation Actions */}
            {observations.length > 0 && (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleResetWorkspace}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
                >
                  Reset All
                </button>
                <button
                  onClick={handleAnalyzeObservations}
                  disabled={loading}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Evaluating with Rubric...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Grade Observations
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Academic Rubric Audit output panel */}
          <div className="bg-white border border-[#141414]/25 rounded-xl p-5 shadow-sm space-y-4">
            <h4 className="font-serif text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
              Professor's Assessment Feedback
            </h4>

            {loading && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-800 animate-spin" />
                <p className="text-xs font-serif italic text-slate-500 max-w-xs">
                  "Checking statements for academic rigor. We must have factual observations, not theological inferences."
                </p>
                <p className="text-[10px] text-slate-400 font-mono">— Dr. Keith Shubert</p>
              </div>
            )}

            {!loading && totalScore === null && (
              <div className="py-12 flex flex-col items-center justify-center text-center text-slate-400 border border-dashed border-slate-200 rounded-lg">
                <HelpCircle className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-xs italic leading-relaxed max-w-xs">
                  Build annotations, compile observations, then click "Grade Observations" for Dr. Shubert's rubric score.
                </p>
              </div>
            )}

            {!loading && totalScore !== null && (
              <div className="space-y-4">
                {/* Score badge */}
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                      Academic Score
                    </span>
                    <span className="font-serif text-sm font-bold text-slate-800">
                      Rubric Passing Grade
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-serif font-bold text-emerald-800">
                      {evaluations.filter((e) => e.isValid).length}
                    </span>
                    <span className="text-slate-400 text-xs"> / {observations.length} Approved</span>
                  </div>
                </div>

                {/* Overall Feedback comments */}
                <div className="bg-amber-50/40 border border-amber-100 p-3 rounded-lg text-xs text-amber-900 leading-relaxed italic">
                  <strong>Dr. Shubert's critique:</strong> "{overallComment}"
                </div>

                {/* Line items critique */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400">
                    Line Item Critique
                  </span>

                  {evaluations.map((e, idx) => (
                    <div
                      key={idx}
                      className={`border rounded-lg p-3 space-y-1.5 text-xs transition-colors ${
                        e.isValid ? "bg-emerald-50/10 border-emerald-200" : "bg-rose-50/10 border-rose-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex gap-1.5">
                          {e.isValid ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-700 shrink-0 mt-0.5" />
                          )}
                          <span className="font-semibold text-slate-800 block leading-tight">
                            Obs {e.index}: "{e.studentText}"
                          </span>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1 py-0.5 rounded">
                          {e.isValid ? "FACT" : "INFERENCE"}
                        </span>
                      </div>

                      <p className="text-slate-600 leading-relaxed pl-5 text-[11px]">
                        <strong>Critique:</strong> {e.explanation}
                      </p>

                      {!e.isValid && e.correctedForm && (
                        <div className="bg-slate-50 border border-slate-150 p-2 rounded text-slate-700 text-[11px] ml-5 border-l-2 border-l-slate-400">
                          <span className="font-mono font-bold text-[9px] uppercase text-slate-500 block mb-0.5">
                            Suggested pure observation phrasing:
                          </span>
                          <span className="italic">"{e.correctedForm}"</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Embedded Lexicon & Concordance Modal */}
      <LexiconConcordanceModal
        isOpen={isLexiconOpen}
        onClose={() => setIsLexiconOpen(false)}
        initialTerm={lexiconTerm}
        contextPassage={passageRef}
      />
    </div>
  );
}
