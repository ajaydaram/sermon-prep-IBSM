import React, { useState } from "react";
import {
  Clipboard,
  Check,
  FileText,
  Settings,
  AlertTriangle,
  ShieldCheck,
  Printer,
  CheckCircle,
  Sparkles,
  RefreshCw,
  Clock,
  Layers,
  Scale,
  BookMarked,
  Zap,
  ArrowRight,
  Info,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { AuditLinterResult } from "../types";

export default function AssignmentPackager() {
  const [bookTitle, setBookTitle] = useState("HAGGAI");
  const [passageRef, setPassageRef] = useState("Haggai 1:1-15");

  // Exegesis sections
  const [author, setAuthor] = useState("Haggai apparently wrote within Yehud and probably from Jerusalem. Both chapters contain references to the temple.");
  const [date, setDate] = useState("The date of writing was approximately 520 BC, corresponding to less than four months.");
  const [historicalSetting, setHistoricalSetting] = useState("Babylon fell to Cyrus of Medo-Persia in 539 BC. The following year Cyrus issued his famous decree allowing the Jews to return to their native homelands.");
  const [occasionPurpose, setOccasionPurpose] = useState("To arouse the Jews from their spiritual lethargy and prompt them to rebuild the temple.");
  const [theme, setTheme] = useState("Israel can have present hope through the rebuilding of the temple.");

  // Simple & Sentence outlines
  const [simpleOutline, setSimpleOutline] = useState("I. FIRST MESSAGE: TO AROUSE (1:1-14)\n  A. Building Ceased (1:1-4)\n  B. Blessings Ceased (1:5-11)\n  C. Building Commenced (1:12-15)");
  const [sentenceOutline, setSentenceOutline] = useState("I. Israel and its leadership should rise from their lethargy and thus build the temple. (1:1-14)\n  A. The two reasons the building of God’s house had ceased are the people’s indifference to God and the people’s indulgence. (1:1-4)");
  const [argumentProse, setArgumentArgumentProse] = useState("Haggai immediately referred to the temple and pointed out that building had ceased in 1 Chron. 11:1. Haggai says this displayed an indifference to God. Conversely, this also exhibits self-indulgence while the common folk lived in upscale homes.");

  const [copied, setCopied] = useState(false);
  const [rubricViolations, setRubricViolations] = useState<{ id: string; type: "error" | "warning"; text: string; details?: string }[]>([]);
  const [verified, setVerified] = useState(false);

  // AI Linter Audit state
  const [aiLinterResult, setAiLinterResult] = useState<AuditLinterResult | null>(null);
  const [linterLoading, setLinterLoading] = useState(false);
  const [linterError, setLinterError] = useState<string | null>(null);
  const [activePillarTab, setActivePillarTab] = useState<"all" | "verb" | "structure" | "harmonization" | "citation">("all");
  const [autoFixApplied, setAutoFixApplied] = useState(false);

  // Deterministic local rubric checks
  const runRubricChecks = () => {
    const violations: typeof rubricViolations = [];

    // Check 1: Double space after period
    const doubleSpaceRegex = /\.\s{2,}\w/g;
    if (doubleSpaceRegex.test(argumentProse) || doubleSpaceRegex.test(author)) {
      violations.push({
        id: "period-space",
        type: "warning",
        text: "Double space found after periods.",
        details: "Syllabus Rule 9: 'Stop. Notice, there is only one space between a period and the beginning of the next sentence.' Change double spaces to a single space."
      });
    }

    // Check 2: Citation punctuation check (dotted abbreviations like '1 Chron. 11:1')
    const dottedAbbrevRegex = /(1|2|3)\s[A-Za-z]+\.\s\d/g;
    if (dottedAbbrevRegex.test(argumentProse) || dottedAbbrevRegex.test(simpleOutline)) {
      violations.push({
        id: "dotted-citation",
        type: "error",
        text: "Dotted book abbreviation detected in citation.",
        details: "Syllabus Rule 6: 'Always abbreviate biblical citations within parenthesis (1 Chron 11:1; note, no period after the book abbreviation).' Omit the dot after abbreviations like 'Chron.', 'Sam.', 'Tim.'."
      });
    }

    // Check 3: Raw abbreviations outside parentheses
    const rawAbbrevRegex = /\b(1|2|3)\s(Chron|Sam|Tim|Thess|Pet|Cor|Kings|Chronicles)\s\d+:\d+/g;
    const parenthesizedMatches = argumentProse.match(/\(\s*(1|2|3)\s*[A-Za-z]+\s+\d+:\d+\s*\)/g) || [];
    const rawMatches = argumentProse.match(rawAbbrevRegex) || [];
    if (rawMatches.length > parenthesizedMatches.length) {
      violations.push({
        id: "paragraph-abbrev",
        type: "warning",
        text: "Abbreviated bible books in paragraph body text.",
        details: "Syllabus Rule 6: Write out book names fully within paragraph text (e.g. 'First Chronicles 11:1'). Use abbreviations strictly inside parentheses: '(1 Chron 11:1)'."
      });
    }

    // Check 4: Verb Tense check (historical events)
    const presentTenseAlertWords = /\b(says|tells|speaks|preaches|is preaching|is writing|is saying|exhibits)\b/gi;
    if (presentTenseAlertWords.test(argumentProse)) {
      violations.push({
        id: "verb-tense",
        type: "warning",
        text: "Potential present tense verbs talking about biblical/historical events.",
        details: "Syllabus Rule 3: 'Use the past tense when writing about biblical events.' Rephrase sentences using verbs like 'wrote', 'declared', 'spoke', or 'instructed' instead of 'says' or 'exhibits'."
      });
    }

    // Check 5: Sentence outline formula check
    const sentenceLines = sentenceOutline.split("\n").filter(l => l.trim() !== "");
    const incompleteSentences = sentenceLines.filter(line => {
      const cleanLine = line.replace(/^[IVXAD\d\s\.\(\)\-\:]+/, "").trim();
      if (cleanLine.length === 0) return false;
      const cleanWithVerb = /\b(is|are|was|were|should|will|has|have|had|rebuild|cease|receive|command|suffers|witness)\b/i;
      return !cleanWithVerb.test(cleanLine);
    });

    // Check 6: Rule of Division check (Mark 4 & 5 Rubric: An I. must have a II.; an A. must have a B.)
    const hasStandaloneA = /\bA\.\s+[^\n]+\n(?!\s*B\.)/g.test(simpleOutline) || /\bA\.\s+[^\n]+\n(?!\s*B\.)/g.test(sentenceOutline);
    const hasStandaloneOne = /\b1\.\s+[^\n]+\n(?!\s*2\.)/g.test(simpleOutline) || /\b1\.\s+[^\n]+\n(?!\s*2\.)/g.test(sentenceOutline);
    if (hasStandaloneA || hasStandaloneOne) {
      violations.push({
        id: "rule-of-division",
        type: "warning",
        text: "Rule of Division violation (Standalone A. or 1. detected).",
        details: "Mark 4 & 5 Rubric Rule 3: 'An I. must have a II. An A. must have a B.' If you divide a point into subpoint A, you must have at least subpoint B."
      });
    }

    setRubricViolations(violations);
    setVerified(true);
  };

  // Run AI Syntactical & Theological Linter
  const handleRunAiLinter = async () => {
    setLinterLoading(true);
    setLinterError(null);
    setAutoFixApplied(false);

    try {
      const res = await fetch("/api/linter/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
      });

      if (!res.ok) {
        throw new Error("Linter Audit API request failed.");
      }

      const data: AuditLinterResult = await res.json();
      setAiLinterResult(data);
      // Also run local deterministic check
      runRubricChecks();
    } catch (err: any) {
      console.error(err);
      setLinterError(err.message || "Failed to execute AI Linter Audit.");
    } finally {
      setLinterLoading(false);
    }
  };

  const handleApplyAutoFixes = () => {
    if (!aiLinterResult?.autoCorrectedDraft) return;

    if (aiLinterResult.autoCorrectedDraft.theme) {
      setTheme(aiLinterResult.autoCorrectedDraft.theme);
    }
    if (aiLinterResult.autoCorrectedDraft.sentenceOutline) {
      setSentenceOutline(aiLinterResult.autoCorrectedDraft.sentenceOutline);
    }
    if (aiLinterResult.autoCorrectedDraft.argumentProse) {
      setArgumentArgumentProse(aiLinterResult.autoCorrectedDraft.argumentProse);
    }

    setAutoFixApplied(true);
    setTimeout(() => setAutoFixApplied(false), 4000);
    // Re-verify
    setTimeout(() => runRubricChecks(), 300);
  };

  const handleCopy = () => {
    const fullText = `
${bookTitle.toUpperCase()} EXEGESIS ASSIGNMENT
Passage Reference: ${passageRef}

INTRODUCTORY MATERIAL
---------------------
Author: ${author}
Date of Writing: ${date}
Historical Setting: ${historicalSetting}
Occasion and Purpose: ${occasionPurpose}
Theme (Message Statement): ${theme}

SIMPLE OUTLINE
--------------
${simpleOutline}

SENTENCE OUTLINE
----------------
${sentenceOutline}

THE ARGUMENT
------------
${argumentProse}
`;
    navigator.clipboard.writeText(fullText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="assignment-packager-root">
      {/* Educational Banner */}
      <div className="bg-[#141414] text-[#E4E3E0] border border-[#141414] rounded-xl p-5 shadow-md flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-400 text-[#141414] rounded-lg shrink-0 font-bold">
            <Zap className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-wider font-bold bg-[#E4E3E0]/20 text-amber-300 px-2 py-0.5 rounded">
                Syntactical & Theological Linter
              </span>
              <span className="text-xs font-mono text-slate-300">BS510 Academic Exegesis Engine</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              Advanced Exegetical Auditing Suite
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Elevate your draft from basic proofreading to full academic exegesis compliance. The Linter evaluates <strong>Verb Tense Accuracy</strong> (past tense for historical events), <strong>Structural Outlining Formula</strong> (Subject + Complement = Complete Sentence), <strong>Theological Harmonization</strong>, and <strong>Citation/Punctuation Rules</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunAiLinter}
          disabled={linterLoading}
          className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
        >
          {linterLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              Auditing Draft...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              Run Full AI Linter Audit
            </>
          )}
        </button>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Exegesis Draft Editor */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
              <h4 className="font-serif text-base font-semibold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-700" />
                Exegesis Workspace Draft
              </h4>
              <span className="text-xs text-slate-400 font-mono">BS510 Standard Paper</span>
            </div>

            {/* General Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Book Name (ALL CAPS)
                </label>
                <input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value.toUpperCase())}
                  className="w-full text-xs font-serif border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-slate-700"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Assignment Passage
                </label>
                <input
                  type="text"
                  value={passageRef}
                  onChange={(e) => setPassageRef(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-slate-700"
                />
              </div>
            </div>

            {/* Introductory Material */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <span className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                1. Introductory Material (Bite 19)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500">Author & Place</label>
                  <textarea
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    rows={2}
                    className="w-full text-xs border border-gray-200 rounded p-1.5 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500">Date of Writing</label>
                  <textarea
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    rows={2}
                    className="w-full text-xs border border-gray-200 rounded p-1.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-500">Historical Setting</label>
                <textarea
                  value={historicalSetting}
                  onChange={(e) => setHistoricalSetting(e.target.value)}
                  rows={2}
                  className="w-full text-xs border border-gray-200 rounded p-1.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500">Occasion and Purpose</label>
                  <textarea
                    value={occasionPurpose}
                    onChange={(e) => setOccasionPurpose(e.target.value)}
                    rows={2}
                    className="w-full text-xs border border-gray-200 rounded p-1.5 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500">Central Theme (Message Statement)</label>
                  <textarea
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    rows={2}
                    className="w-full text-xs border border-gray-200 rounded p-1.5 focus:outline-none font-serif"
                  />
                </div>
              </div>
            </div>

            {/* Outlines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-100">
              <div className="space-y-1">
                <span className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  2. Simple Outline Draft
                </span>
                <p className="text-[10px] text-slate-400 italic">Paragraph structure headings</p>
                <textarea
                  value={simpleOutline}
                  onChange={(e) => setSimpleOutline(e.target.value)}
                  rows={6}
                  className="w-full text-xs font-mono border border-gray-200 rounded p-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <span className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center justify-between">
                  <span>3. Sentence Outline Draft</span>
                  <span className="text-[9px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Subject + Complement
                  </span>
                </span>
                <p className="text-[10px] text-slate-400 italic">Complete Subject + Complement lines</p>
                <textarea
                  value={sentenceOutline}
                  onChange={(e) => setSentenceOutline(e.target.value)}
                  rows={6}
                  className="w-full text-xs font-mono border border-gray-200 rounded p-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Argument Prose */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <span className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center justify-between">
                <span>4. Exegesis Argument Prose</span>
                <span className="text-[9px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                  Past Tense & Citation Rules
                </span>
              </span>
              <p className="text-[10px] text-slate-400 italic">
                Explain paragraph relationships. Write out book titles. Cite inside parentheses correctly: (1 Chron 11:1). Use past tense.
              </p>
              <textarea
                value={argumentProse}
                onChange={(e) => setArgumentArgumentProse(e.target.value)}
                rows={5}
                className="w-full text-xs border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-slate-700 leading-relaxed font-serif"
                placeholder="Draft your paragraph-by-paragraph arguments..."
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={runRubricChecks}
                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Run Instant Local Scan
              </button>

              <button
                onClick={handleRunAiLinter}
                disabled={linterLoading}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {linterLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 text-slate-950" />
                )}
                Run AI Exegetical Audit
              </button>
              
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 border border-gray-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print Layout
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Advanced Linter & Audit Diagnostics Panel */}
        <div className="lg:col-span-5 space-y-6">

          {/* AI Linter Audit Score & Results Panel */}
          {aiLinterResult && (
            <div className="bg-white border border-[#141414]/20 rounded-2xl p-5 shadow-sm space-y-5">
              
              {/* Header Score Badge */}
              <div className="bg-[#141414] text-white p-4 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-amber-400">
                    Audit Compliance Score
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-white">
                      {aiLinterResult.overallScore}/100
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      aiLinterResult.overallScore >= 85
                        ? "bg-emerald-900 text-emerald-200"
                        : aiLinterResult.overallScore >= 70
                        ? "bg-amber-900 text-amber-200"
                        : "bg-rose-900 text-rose-200"
                    }`}>
                      {aiLinterResult.summaryStatus}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleApplyAutoFixes}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  Apply AI Auto-Fixes
                </button>
              </div>

              {autoFixApplied && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  AI Linter Auto-Fixes successfully applied to your Exegesis Draft fields!
                </div>
              )}

              {/* 4 Pillars Filter Tabs */}
              <div className="flex flex-wrap gap-1 border-b border-slate-100 pb-2">
                {[
                  { id: "all", label: "All Audits" },
                  { id: "verb", label: `Verb Tense (${aiLinterResult.verbTenseAudit.items.length})` },
                  { id: "structure", label: `Outline (${aiLinterResult.structuralOutlineAudit.items.length})` },
                  { id: "harmonization", label: `Harmonization (${aiLinterResult.harmonizationAudit.findings.length})` },
                  { id: "citation", label: `Citations (${aiLinterResult.citationAudit.items.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePillarTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      activePillarTab === tab.id
                        ? "bg-[#141414] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Pillar 1: Verb Tense Accuracy */}
              {(activePillarTab === "all" || activePillarTab === "verb") && (
                <div className="space-y-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-700" />
                      1. Verb Tense Accuracy Audit
                    </h5>
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                      aiLinterResult.verbTenseAudit.passed
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-rose-100 text-rose-900"
                    }`}>
                      Score: {aiLinterResult.verbTenseAudit.score}%
                    </span>
                  </div>

                  {aiLinterResult.verbTenseAudit.items.length === 0 ? (
                    <p className="text-xs text-slate-500 italic pl-5">
                      ✓ No improper present/future tense verbs detected for historical events.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {aiLinterResult.verbTenseAudit.items.map((item, idx) => (
                        <div key={idx} className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-xs space-y-1.5">
                          <div className="flex justify-between items-center text-[10px] font-mono text-blue-900 font-bold">
                            <span>{item.location}</span>
                            <span className="bg-blue-200 px-1.5 py-0.5 rounded text-blue-950">
                              Flagged: "{item.flaggedVerb}"
                            </span>
                          </div>
                          <p className="text-slate-800 italic">"{item.originalText}"</p>
                          <p className="text-slate-600 text-[11px]">{item.issueExplanation}</p>
                          <div className="pt-1 text-emerald-900 font-semibold text-[11px] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            Correction: "{item.correctedSentence}"
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Pillar 2: Structural Outlining Compliance */}
              {(activePillarTab === "all" || activePillarTab === "structure") && (
                <div className="space-y-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-purple-700" />
                      2. Sentence Outline Formula (Subject + Complement)
                    </h5>
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                      aiLinterResult.structuralOutlineAudit.passed
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-rose-100 text-rose-900"
                    }`}>
                      Score: {aiLinterResult.structuralOutlineAudit.score}%
                    </span>
                  </div>

                  <div className="space-y-2">
                    {aiLinterResult.structuralOutlineAudit.items.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                          item.isCompleteSentence
                            ? "bg-emerald-50/50 border-emerald-200"
                            : "bg-rose-50/50 border-rose-200"
                        }`}
                      >
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                          <span className="text-slate-700">Line {item.lineIdentifier}</span>
                          <span className={item.isCompleteSentence ? "text-emerald-800" : "text-rose-800"}>
                            {item.isCompleteSentence ? "Complete Sentence ✓" : "Incomplete / Fragment ✗"}
                          </span>
                        </div>
                        <p className="font-mono text-slate-900 font-medium">{item.originalHeading}</p>
                        <div className="flex gap-2 text-[10px] text-slate-600 font-mono">
                          <span>Subject: <strong>{item.subjectFound}</strong></span>
                          <span>•</span>
                          <span>Complement: <strong>{item.complementFound}</strong></span>
                        </div>
                        {!item.isCompleteSentence && (
                          <div className="pt-1 text-purple-900 text-[11px]">
                            <strong>Suggested Rewrite:</strong> "{item.suggestedSentence}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pillar 3: Theological & Logical Harmonization Audit */}
              {(activePillarTab === "all" || activePillarTab === "harmonization") && (
                <div className="space-y-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-emerald-700" />
                      3. Theological & Logical Harmonization Audit
                    </h5>
                    <span className="text-[10px] font-bold font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                      {aiLinterResult.harmonizationAudit.overallAlignmentRating}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {aiLinterResult.harmonizationAudit.findings.map((f, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between items-center font-semibold text-slate-800">
                          <span>{f.category}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            f.status === "Harmonized"
                              ? "bg-emerald-100 text-emerald-900"
                              : f.status === "Warning"
                              ? "bg-amber-100 text-amber-900"
                              : "bg-rose-100 text-rose-900"
                          }`}>
                            {f.status}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-[11px]">{f.analysis}</p>
                        <p className="text-slate-800 text-[11px] italic font-serif pt-1">
                          💡 <strong>Recommendation:</strong> {f.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pillar 4: Citation & Punctuation Validation */}
              {(activePillarTab === "all" || activePillarTab === "citation") && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <BookMarked className="w-4 h-4 text-amber-700" />
                      4. Citation & Punctuation Validation
                    </h5>
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                      aiLinterResult.citationAudit.passed
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-rose-100 text-rose-900"
                    }`}>
                      Score: {aiLinterResult.citationAudit.score}%
                    </span>
                  </div>

                  {aiLinterResult.citationAudit.items.length === 0 ? (
                    <p className="text-xs text-slate-500 italic pl-5">
                      ✓ All scripture citations follow SBL/BS510 parenthetical rules.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {aiLinterResult.citationAudit.items.map((cit, idx) => (
                        <div key={idx} className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs space-y-1">
                          <div className="flex justify-between text-[10px] font-mono font-bold text-amber-900">
                            <span>{cit.location}</span>
                            <span className="bg-amber-200 px-1.5 py-0.5 rounded">{cit.ruleViolated}</span>
                          </div>
                          <p className="text-slate-800 font-mono">Original: "{cit.originalCitation}"</p>
                          <p className="text-slate-600 text-[11px]">{cit.explanation}</p>
                          <p className="text-emerald-900 font-mono font-bold text-[11px]">
                            Corrected: "{cit.correctedCitation}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* Local Instant Rubric Diagnostics */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <h4 className="font-serif text-base font-semibold text-slate-800 border-b border-gray-100 pb-2 flex items-center justify-between">
              <span>Instant Local Rubric Diagnostics</span>
              <span className="text-xs text-slate-400 font-mono">Zero-Latency Scan</span>
            </h4>

            {!verified && (
              <div className="text-center py-6 text-slate-400 text-xs italic">
                Click "Run Instant Local Scan" or "Run AI Exegetical Audit" to scan your exegesis draft for grader deduction traps.
              </div>
            )}

            {verified && rubricViolations.length === 0 && (
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 flex gap-3 text-emerald-950 text-xs leading-relaxed">
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-700 mt-0.5" />
                <div>
                  <strong>No local violations found!</strong> Your exegesis draft appears to conform to Dr. Shubert's strict structural formatting rules (single spaces, proper parentheses, correct past tense hints). Excellent work.
                </div>
              </div>
            )}

            {verified && rubricViolations.length > 0 && (
              <div className="space-y-2">
                <span className="block text-[10px] uppercase tracking-wider font-bold text-rose-600">
                  {rubricViolations.length} Local Format Warnings Flagged:
                </span>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {rubricViolations.map((viol) => (
                    <div
                      key={viol.id}
                      className={`border rounded-lg p-3 text-xs leading-relaxed ${
                        viol.type === "error"
                          ? "bg-rose-50/30 border-rose-200 text-rose-950"
                          : "bg-amber-50/30 border-amber-200 text-amber-950"
                      }`}
                    >
                      <div className="flex gap-2 items-start">
                        <AlertTriangle
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            viol.type === "error" ? "text-rose-700" : "text-amber-700"
                          }`}
                        />
                        <div>
                          <strong className="block font-semibold">{viol.text}</strong>
                          {viol.details && <p className="text-slate-600 mt-1 text-[11px]">{viol.details}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Academic Double Spaced Preview Box */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col min-h-[380px]">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h4 className="font-serif text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-500" />
                Syllabus Double-Spaced Layout Preview
              </h4>
              <button
                onClick={handleCopy}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    Copy Exegesis
                  </>
                )}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[340px] pr-1 p-4 bg-slate-50 rounded-lg border border-slate-200 font-serif text-[11px] leading-loose space-y-6 text-slate-800 select-all">
              <div className="text-center space-y-1 line-normal border-b border-gray-200 pb-3">
                <h3 className="font-bold text-sm tracking-wider uppercase text-slate-900">
                  {bookTitle.toUpperCase()} EXEGESIS WORKSPACE
                </h3>
                <p className="italic text-slate-500">BS510 Inductive Bible Study Method • Passage: {passageRef}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold border-b border-gray-200 pb-1 uppercase text-[10px] tracking-wide text-slate-500">
                  I. Introductory Material
                </h4>
                <p><strong>Author:</strong> {author}</p>
                <p><strong>Date of Writing:</strong> {date}</p>
                <p><strong>Historical Setting:</strong> {historicalSetting}</p>
                <p><strong>Occasion and Purpose:</strong> {occasionPurpose}</p>
                <p><strong>Theme:</strong> {theme}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold border-b border-gray-200 pb-1 uppercase text-[10px] tracking-wide text-slate-500">
                  II. Simple Outline
                </h4>
                <pre className="font-mono text-[10px] leading-normal whitespace-pre-wrap">{simpleOutline}</pre>

                <h4 className="font-bold border-b border-gray-200 pb-1 uppercase text-[10px] tracking-wide text-slate-500">
                  III. Sentence Outline
                </h4>
                <pre className="font-mono text-[10px] leading-normal whitespace-pre-wrap">{sentenceOutline}</pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold border-b border-gray-200 pb-1 uppercase text-[10px] tracking-wide text-slate-500">
                  IV. The Exegesis Argument (Double Spaced)
                </h4>
                <p className="indent-8 text-justify">{argumentProse}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
