import React, { useState } from "react";
import {
  Presentation,
  Printer,
  Download,
  Copy,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  Sparkles,
  BookOpen,
  Check,
  Palette,
  Layers,
  HelpCircle,
  Minimize2
} from "lucide-react";
import { TeachingSlide, StudyProject } from "../types";

interface TeachingSlidesExporterProps {
  project?: StudyProject;
}

export default function TeachingSlidesExporter({ project }: TeachingSlidesExporterProps) {
  const currentBook = project?.bookTitle || "HAGGAI";
  const currentPassage = project?.passageRef || "Haggai 1:1-15";
  const currentTheme = project?.theme || "Israel can have present hope through the rebuilding of the temple.";

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideStyle, setSlideStyle] = useState<"scholarly-dark" | "academic-gold" | "clean-parchment" | "deep-[#141414]">("deep-[#141414]");
  const [copiedText, setCopiedText] = useState(false);

  // Generate 5 Teaching Slides from exegesis project
  const slides: TeachingSlide[] = [
    {
      id: 1,
      title: `${currentBook.toUpperCase()} EXEGESIS & TEACHING`,
      subtitle: `Passage: ${currentPassage} • Inductive Bible Study Method`,
      bulletPoints: [
        `Book: ${currentBook} (${currentPassage})`,
        `Author: ${project?.author || "Haggai the Prophet (Jerusalem)"}`,
        `Date of Writing: ${project?.date || "520 BC (Post-Exilic Period)"}`,
        `Core Purpose: To rouse the community from lethargy to rebuild YHWH's house.`,
      ],
      keyPassageVerse: project?.passageRef || "Haggai 1:1-15",
      teacherNotes: "Teaching Intro: Establish the historical setting immediately. Rebuilding had been delayed 16 years. Ask the audience: 'Where in our lives has building for God taken second place to paneled luxury?'",
      bgStyle: slideStyle,
    },
    {
      id: 2,
      title: "HISTORICAL & OCCASIONAL CONTEXT",
      subtitle: "Understanding the Post-Exilic Rebuilding Crisis",
      bulletPoints: [
        `Historical Setting: ${project?.historicalSetting || "Babylon fell to Cyrus in 539 BC. Jews returned under Zerubbabel but temple construction stalled."}`,
        `The Occasion: ${project?.occasionPurpose || "Economic futility accompanied spiritual apathy. The people said 'The time has not come to build'."}`,
        `Key Historical Figures: Zerubbabel son of Shealtiel (Governor) & Joshua son of Jehozadak (High Priest).`,
      ],
      teacherNotes: "Historical Context Note: Highlight that Persia ruled supreme. The remnant was small and discouraged. Economic frustration was divine discipline, not bad luck.",
      bgStyle: slideStyle,
    },
    {
      id: 3,
      title: "KEY VERSE OBSERVATIONS & STRUCTURAL MARKS",
      subtitle: "Literary Clues & Repeated Staccato Phrases",
      bulletPoints: [
        project?.observations?.[0] || "1. Adversative connectives contrast human excuses with divine commands.",
        project?.observations?.[1] || "2. Repeated imperative: 'Consider your ways!' (1:5, 1:7).",
        project?.observations?.[2] || "3. Economic staccato verbs: Sown much/harvested little, eat/not satisfied, earn wages/put in a bag with holes.",
        "4. Divine response: YHWH stirred up the spirit of the leadership and remnant.",
      ],
      teacherNotes: "Observation Note: Emphasize 'Consider your ways' (Hebrew: simu levavchem - 'set your heart upon your ways'). It demands solemn self-examination.",
      bgStyle: slideStyle,
    },
    {
      id: 4,
      title: "SENTENCE OUTLINE & EXEGESIS ARGUMENT",
      subtitle: "Subject + Complement Formulaic Structure",
      bulletPoints: [
        project?.sentenceOutline?.split("\n")?.[0] || "I. Israel and its leadership should rise from lethargy and build the temple. (1:1-15)",
        project?.sentenceOutline?.split("\n")?.[1] || "A. Indifference and self-indulgence were the two root causes of stopping work.",
        "B. Obedient fear of YHWH yielded immediate divine promise: 'I am with you, declares YHWH.'",
      ],
      teacherNotes: "Outline Note: Notice the shift in verse 13. As soon as the people feared the Lord, God gave instant assurance: 'I am with you.' Grace precedes completion.",
      bgStyle: slideStyle,
    },
    {
      id: 5,
      title: "CENTRAL MESSAGE & SUNDAY APPLICATION",
      subtitle: "Transformational Takeaway for Believers Today",
      bulletPoints: [
        `Central Theme: "${currentTheme}"`,
        "1. Priority Alignment: Do we prioritize our own paneled comfort over God's kingdom priority?",
        "2. Divine Presence: Obedience unlocks the assurance of YHWH's personal presence and power.",
        "3. Present Hope: Present faithfulness in small steps yields eternal glory.",
      ],
      teacherNotes: "Application Note: Conclude with a strong call to action. Have the group commit to one concrete area of kingdom service this week.",
      bgStyle: slideStyle,
    },
  ];

  const currentSlide = slides[activeSlideIndex];

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCopySlideText = () => {
    const text = `
SLIDE ${currentSlide.id}: ${currentSlide.title}
${currentSlide.subtitle}
--------------------------------------------------
${currentSlide.bulletPoints.map((bp) => "• " + bp).join("\n")}

TEACHER NOTES:
${currentSlide.teacherNotes}
`;
    navigator.clipboard.writeText(text.trim());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handlePrintSlides = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="teaching-slides-root">
      {/* Header Banner */}
      <div className="bg-[#141414] text-[#E4E3E0] border border-[#141414] rounded-xl p-5 shadow-md flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-purple-400 text-[#141414] rounded-lg shrink-0 font-bold">
            <Presentation className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-wider font-bold bg-[#E4E3E0]/20 text-purple-300 px-2 py-0.5 rounded">
                Teaching & Exegesis Export Engine
              </span>
              <span className="text-xs font-mono text-slate-300">Sermon & Sunday School Deck Generator</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              APA/Turabian Exegesis & Teaching Slide Deck
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Convert your raw exegesis paper directly into an elegant 5-slide teaching deck for pulpit preaching, small group lessons, or classroom presentations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            {isFullscreen ? "Exit Fullscreen" : "Launch Fullscreen Deck"}
          </button>
        </div>
      </div>

      {/* Main Slide Deck Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Slide Stage Display (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Theme Style Controls */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-purple-600" />
              Presentation Theme:
            </span>
            <div className="flex gap-1.5">
              {[
                { id: "deep-[#141414]", label: "Scholarly Black" },
                { id: "scholarly-dark", label: "Navy Blue" },
                { id: "academic-gold", label: "Academic Gold" },
                { id: "clean-parchment", label: "Clean Parchment" },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSlideStyle(theme.id as any)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                    slideStyle === theme.id
                      ? "bg-slate-900 text-white font-bold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slide Canvas */}
          <div
            className={`w-full aspect-[16/9] rounded-2xl p-8 shadow-xl flex flex-col justify-between border border-slate-700 transition-all relative overflow-hidden select-none ${
              slideStyle === "deep-[#141414]"
                ? "bg-[#141414] text-slate-100"
                : slideStyle === "scholarly-dark"
                ? "bg-slate-900 text-slate-100"
                : slideStyle === "academic-gold"
                ? "bg-amber-950 text-amber-100 border-amber-800"
                : "bg-amber-50 text-slate-900 border-amber-200"
            } ${isFullscreen ? "fixed inset-0 z-50 rounded-none w-screen h-screen p-12" : ""}`}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                  Slide {currentSlide.id} of {slides.length}
                </span>
                <span className="text-xs font-serif italic opacity-75">
                  BS510 Inductive Teaching Deck
                </span>
              </div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase opacity-80">
                {currentBook} ({currentPassage})
              </span>
            </div>

            {/* Slide Body */}
            <div className="my-auto space-y-4">
              <div className="space-y-1">
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-amber-300">
                  {currentSlide.title}
                </h2>
                <p className="text-xs font-mono opacity-80">{currentSlide.subtitle}</p>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm font-sans leading-relaxed">
                {currentSlide.bulletPoints.map((bp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Footer */}
            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-mono opacity-60">
              <span>Scribe Ezra Exegetical Suite</span>
              <span>"The Bible is for your transformation!"</span>
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2 border border-gray-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`w-7 h-7 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    activeSlideIndex === idx
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s.id}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Teacher Notes & Export Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Teacher Notes Drawer */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
            <h4 className="font-serif text-sm font-bold text-slate-900 border-b pb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                Pulpit & Teaching Notes
              </span>
              <span className="text-[10px] font-mono text-slate-400">Slide {currentSlide.id}</span>
            </h4>

            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs font-serif leading-relaxed text-slate-800 space-y-2">
              <p>{currentSlide.teacherNotes}</p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleCopySlideText}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copiedText ? "Copied Slide Text!" : "Copy Slide & Speaker Notes"}
              </button>

              <button
                onClick={handlePrintSlides}
                className="w-full py-2 border border-gray-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                Print Full Presentation Deck
              </button>
            </div>
          </div>

          {/* Academic Paper APA/Turabian Export Instructions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
            <h4 className="font-serif text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              APA / Turabian Formatting Compliance
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              All generated slides and double-spaced paper outputs automatically adhere to Turabian 9th Edition and SBL Academic Citation standards, omitting dotted book abbreviations in parenthetical references and maintaining 1-inch margins.
            </p>
          </div>

        </div>

      </div>

      {/* IBSM INFOGRAPHIC & TEACHING SCRIPT SECTION (500 Points Rubric) */}
      <div className="bg-white border-2 border-[#141414] rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-purple-100 text-purple-900 font-mono text-[10px] font-bold uppercase rounded">
                500-POINT IBSM LEARNING TASK
              </span>
              <span className="text-xs text-slate-500 font-mono">Infographic (300 pts) + Teaching Session (200 pts)</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#141414]">
              IBSM Infographic & 60–75 Min Teaching Script Builder
            </h3>
          </div>
          <button
            onClick={() => {
              const scriptText = `IBSM INFOGRAPHIC TEACHING SCRIPT (60-75 MINUTES + 30 MIN Q&A)
Target Audience: Discipleship Group / Small Group Leaders
Biblical Example Passage: ${currentBook} (${currentPassage})

SECTION 1: WHAT THIS INFOGRAPHIC COMMUNICATES (10-15 Mins)
- Aim: To provide a clear visual roadmap for personal Bible study from Observation up to Application.
- Three Pillars: Observation (What do I see?), Interpretation (What does it mean?), Application (How does it work?).

SECTION 2: STEP-BY-STEP ELEMENT BREAKDOWN (25-30 Mins)
- Step 1 (Observation): Terms, Structure, Genre, and Atmosphere. Howard Hendricks: "The more time in observation, the less time in interpretation."
- Step 2 (Interpretation): Asking questions, finding context answers, and formulating the Big Idea (Subject + Complement).
- Step 3 (Application): Personal and relational transformation.

SECTION 3: PASSAGE DEMONSTRATION - ${currentBook.toUpperCase()} (${currentPassage}) (20 Mins)
- Historical Context: ${project?.historicalSetting || "Post-exilic period under Persia"}
- Central Big Idea: "${currentTheme}"
- Practical Application: Moving from spiritual lethargy to prioritize God's kingdom building.

SECTION 4: Q&A SESSION OUTLINE (30 Mins)
- Question 1: How do I handle difficult or confusing verses? (Rely on context and clear passages).
- Question 2: How much time should I spend on Observation? (At least 60-70% of study time).`;
              navigator.clipboard.writeText(scriptText);
              alert("60-75 Min Teaching Script copied to clipboard!");
            }}
            className="px-4 py-2 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <Copy className="w-4 h-4 text-purple-300" />
            Copy Teaching Script Outline (8-10 Pages Guide)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
              1. Comprehensive (120 pts)
            </span>
            <p className="text-slate-700 leading-relaxed">
              Captures all key elements of personal Bible study (Observation, Interpretation, Application) suitable for a 1-hour workshop handout.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
              2. Simple & Easy (45 pts)
            </span>
            <p className="text-slate-700 leading-relaxed">
              Logical flow showing connection between observation tools, Big Idea subject/complement formula, and life application.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
              3. Visual Design (45 pts)
            </span>
            <p className="text-slate-700 leading-relaxed">
              Creative A4 layout using balanced white space, color coding for structural laws, and clear typographic hierarchy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
