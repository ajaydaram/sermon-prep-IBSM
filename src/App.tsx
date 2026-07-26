import React, { useState } from "react";
import {
  BookOpen,
  HelpCircle,
  Layers,
  Compass,
  Settings,
  Sparkles,
  PenTool,
  LayoutGrid,
  CheckCircle,
  Lock,
  Unlock,
  FolderKanban,
  Globe,
  Presentation,
  Feather
} from "lucide-react";
import { motion } from "motion/react";
import BiteLibrary from "./components/BiteLibrary";
import ObservationWorkshop from "./components/ObservationWorkshop";
import BigIdeaWizard from "./components/BigIdeaWizard";
import VisualChartBuilder from "./components/VisualChartBuilder";
import StructuralSuite from "./components/StructuralSuite";
import IBSMConsultant from "./components/IBSMConsultant";
import AssignmentPackager from "./components/AssignmentPackager";
import ScribeEzraLibrary from "./components/ScribeEzraLibrary";
import RealtimeCollaborativeWorkshop from "./components/RealtimeCollaborativeWorkshop";
import TeachingSlidesExporter from "./components/TeachingSlidesExporter";
import SermonHomileticsStudio from "./components/SermonHomileticsStudio";
import ProgressiveExegesisPlatform from "./components/ProgressiveExegesisPlatform";
import { ObservationProvider, useObservations } from "./context/ObservationContext";
import { StudyProject } from "./types";

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<
    "ezra-library" | "collaboration" | "teaching-slides" | "library" | "observation" | "big-idea" | "charts" | "structural" | "consultant" | "packager" | "sermon-homiletics" | "progressive-platform"
  >("progressive-platform");

  const [activeProject, setActiveProject] = useState<StudyProject | undefined>({
    id: "proj_haggai_01",
    title: "Temple Restoration & Present Hope",
    bookTitle: "HAGGAI",
    passageRef: "Haggai 1:1-15",
    tags: ["Sermon Series: Haggai", "Small Group: Haggai"],
    author: "Haggai the Prophet (Jerusalem)",
    date: "520 BC (Darius 2nd Year)",
    historicalSetting: "Post-exilic Jewish remnant returned under Zerubbabel. Building of the second temple lay dormant for 16 years.",
    occasionPurpose: "To rouse the community from economic self-indulgence and spiritual lethargy to rebuild YHWH's temple.",
    theme: "Israel can experience present covenant blessing and hope through prioritizing the rebuilding of God's house.",
    simpleOutline: "I. FIRST MESSAGE: CALL TO AROUSE (1:1-15)\n  A. Indifference and Indulgence Exposed (1:1-4)\n  B. Economic Consequences Detailed (1:5-11)\n  C. Rebuilding Commenced in Obedience (1:12-15)",
    sentenceOutline: "I. Israel and its leadership should rise from their lethargy and thus build the temple. (1:1-15)\n  A. The two reasons the building of God's house had ceased are the people's indifference and self-indulgence. (1:1-4)\n  B. YHWH withholding covenant fruitfulness was the direct outcome of neglecting his house. (1:5-11)",
    argumentProse: "Haggai immediately referred to the temple and pointed out that building had ceased in 1 Chron 11:1. Haggai wrote that this displayed an indifference to God. Conversely, this also exhibited self-indulgence while the common folk lived in paneled homes while God's house lay ruined.",
    observations: [
      "The passage in Haggai 1:1 specifies the second year of Darius the king.",
      "Zerubbabel son of Shealtiel governor of Judah and Joshua son of Jehozadak high priest are explicitly addressed.",
      "The phrase 'Consider your ways' is repeated twice (1:5, 1:7).",
      "Economic futility verbs appear in staccato: sown much/harvested little, eat/not filled, drink/not satisfied.",
      "The spirit of Zerubbabel and the spirit of Joshua and the spirit of all the remnant were stirred by YHWH."
    ],
    createdDate: "2026-07-10T09:30:00Z",
    lastModified: "2026-07-22T14:15:00Z",
    status: "Teaching Ready",
  });

  const [autoUpdate, setAutoUpdate] = useState(true);
  const [strictCheck, setStrictCheck] = useState(true);

  const { isConsultationUnlocked, observations, setObservations } = useObservations();

  const handleLoadProjectFromLibrary = (project: StudyProject) => {
    setActiveProject(project);
    if (project.observations && project.observations.length > 0) {
      setObservations(project.observations);
    }
    setActiveTab("observation");
  };

  interface TabItem {
    id: "ezra-library" | "collaboration" | "teaching-slides" | "library" | "observation" | "big-idea" | "charts" | "structural" | "consultant" | "packager" | "sermon-homiletics" | "progressive-platform";
    label: string;
    description: string;
    icon: any;
    badge: string;
  }

  interface SuiteItem {
    id: "workspace-library" | "exegetical-workbench" | "synthetic-studio" | "academic-publishing";
    stepNumber: string;
    title: string;
    shortTitle: string;
    description: string;
    tabs: TabItem[];
  }

  const suites: SuiteItem[] = [
    {
      id: "workspace-library",
      stepNumber: "Step 1",
      title: "1. Choose Passage & Projects",
      shortTitle: "1. Projects & Library",
      description: "Pick a book to study (2 Timothy, Daniel, Haggai, etc.)",
      tabs: [
        { id: "progressive-platform", label: "7-Stage Exegesis Engine", description: "Progressive workflow from Observation to Teaching", icon: Sparkles, badge: "Master Pipeline" },
        { id: "ezra-library", label: "Project Library", description: "Open sample exegesis papers", icon: FolderKanban, badge: "Start Here" },
        { id: "collaboration", label: "Live Team Work", description: "Study together in real-time", icon: Globe, badge: "Team" },
      ]
    },
    {
      id: "exegetical-workbench",
      stepNumber: "Step 2",
      title: "2. Observe Verses & Words",
      shortTitle: "2. Verse Workbench",
      description: "Read multi-translations, Greek/Hebrew, & take notes",
      tabs: [
        { id: "observation", label: "Verse Board", description: "Interlinear & word observations", icon: PenTool, badge: "Observe" },
        { id: "library", label: "Study Guides", description: "Bite-sized IBSM lecture notes", icon: BookOpen, badge: "Guide" },
        { id: "consultant", label: "AI Exegesis Helper", description: "Ask questions about passage context", icon: Compass, badge: "AI Assistant" },
      ]
    },
    {
      id: "synthetic-studio",
      stepNumber: "Step 3",
      title: "3. Diagram & Find Big Idea",
      shortTitle: "3. Charts & Structure",
      description: "Build book charts, structural laws, and Big Idea formula",
      tabs: [
        { id: "charts", label: "Visual Book Charts", description: "Interactive horizontal book charts", icon: LayoutGrid, badge: "Charts" },
        { id: "structural", label: "Structural Suite", description: "Connect comparison & contrast laws", icon: Layers, badge: "Diagram" },
        { id: "big-idea", label: "Big Idea Wizard", description: "Subject + Complement formula", icon: Sparkles, badge: "Formula" },
      ]
    },
    {
      id: "academic-publishing",
      stepNumber: "Step 4",
      title: "4. Write Paper & Slides",
      shortTitle: "4. Export & Paper",
      description: "Generate formatted papers, check rubric, and export slides",
      tabs: [
        { id: "sermon-homiletics", label: "Homiletics & Sermon Studio", description: "Build 3-pillar sermons (Exegesis ➔ Theology ➔ Homiletics)", icon: Feather, badge: "Sermon Builder" },
        { id: "packager", label: "Paper & Rubric Linter", description: "Auto-check 600-pt rubric & formatting", icon: Settings, badge: "Final Paper" },
        { id: "teaching-slides", label: "Slide Deck & Script", description: "Export presentation slides & script", icon: Presentation, badge: "Slides" },
      ]
    }
  ];

  const [activeSuite, setActiveSuite] = useState<"workspace-library" | "exegetical-workbench" | "synthetic-studio" | "academic-publishing">("workspace-library");
  const [showGuideBanner, setShowGuideBanner] = useState(true);

  return (
    <div className="h-screen w-full bg-[#E4E3E0] text-[#141414] flex flex-col font-sans overflow-hidden selection:bg-[#141414] selection:text-[#E4E3E0]" id="app-root">
      {/* Friendly Top Header */}
      <header className="h-16 border-b border-[#141414] flex items-center px-6 justify-between shrink-0 bg-white z-10 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 bg-[#141414] text-white flex items-center justify-center rounded-lg shadow-sm font-bold text-lg">
            Ω
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-[#141414] leading-none">Inductive Bible Study Workshop</span>
              <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded">Scribe Ezra Pro</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">Observe • Interpret • Apply</span>
          </div>
        </div>
        
        {/* Step-by-Step Top Workflow Bar */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {suites.map((suite) => {
            const isActive = activeSuite === suite.id;
            return (
              <button
                key={suite.id}
                onClick={() => {
                  setActiveSuite(suite.id as any);
                  setActiveTab(suite.tabs[0].id as any);
                }}
                className={`px-3 py-1.5 text-xs font-bold transition-all rounded-lg cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#141414] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-200/70"
                }`}
              >
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase ${
                  isActive ? "bg-amber-400 text-slate-950" : "bg-slate-200 text-slate-600"
                }`}>
                  {suite.stepNumber}
                </span>
                <span>{suite.shortTitle.replace(/^\d+\.\s*/, "")}</span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-4 items-center text-xs">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[9px] uppercase font-bold text-slate-400">Current Study</span>
            <span className="font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {activeProject?.bookTitle || "HAGGAI"} ({activeProject?.passageRef || "1:1-15"})
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Aside - Friendly Workspace Explorer */}
        <aside className="w-72 border-r border-[#141414] flex flex-col shrink-0 overflow-hidden bg-[#D4D3D0]">
          <div className="p-3.5 border-b border-[#141414] bg-[#D4D3D0] flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-tight text-[#141414]">Workspace Menu</span>
            </div>
            <span className="text-[10px] text-slate-600 font-mono bg-white/60 px-2 py-0.5 rounded border border-[#141414]/10">4 Steps</span>
          </div>
          
          {/* Worksuite Sections & Tabs */}
          <div className="flex-1 overflow-y-auto flex flex-col p-3 space-y-4">
            {suites.map((suite) => {
              const isSuiteActive = activeSuite === suite.id;
              return (
                <div key={suite.id} className="space-y-1.5">
                  <div
                    onClick={() => {
                      setActiveSuite(suite.id as any);
                      setActiveTab(suite.tabs[0].id as any);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg font-bold transition-colors flex items-center justify-between cursor-pointer ${
                      isSuiteActive ? "bg-[#141414] text-white" : "bg-white/40 text-slate-800 hover:bg-white/70"
                    }`}
                  >
                    <span className="text-xs">{suite.title}</span>
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/20">
                      {suite.tabs.length} Tools
                    </span>
                  </div>

                  <div className="space-y-1 pl-1">
                    {suite.tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveSuite(suite.id as any);
                            setActiveTab(tab.id as any);
                          }}
                          className={`w-full text-left p-2.5 rounded-lg border flex items-start justify-between cursor-pointer transition-all ${
                            isActive
                              ? "bg-[#141414] text-white border-[#141414] shadow-xs"
                              : "bg-white/70 hover:bg-white border-[#141414]/15 text-[#141414]"
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold truncate">{tab.label}</span>
                              <span className={`text-[10px] truncate ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                                {tab.description}
                              </span>
                            </div>
                          </div>
                          <span className={`text-[8px] font-sans px-1.5 py-0.5 rounded border shrink-0 ${
                            isActive ? "border-white/30 text-white bg-white/10" : "border-slate-300 text-slate-600 bg-slate-100"
                          }`}>
                            {tab.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Help Footer */}
          <div className="p-3 border-t border-[#141414] bg-[#D4D3D0] shrink-0 text-xs space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[11px] text-[#141414]">Method Guide</span>
              <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">IBSM Standard</span>
            </div>
            <p className="text-[10px] text-slate-600 leading-tight">
              Follow Steps 1 ➔ 2 ➔ 3 ➔ 4 to complete your Bible exegesis paper.
            </p>
          </div>
        </aside>

        {/* Central Workspace Display */}
        <section className="flex-1 flex flex-col overflow-hidden bg-[#E4E3E0]">
          {/* Mobile Tab Bar Header */}
          <div className="lg:hidden border-b border-[#141414] bg-[#D4D3D0] p-2 overflow-x-auto shrink-0 flex gap-1 scrollbar-none">
            {suites.flatMap(s => s.tabs).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase transition-all shrink-0 border ${
                    isActive
                      ? "bg-[#141414] text-[#E4E3E0] border-[#141414]"
                      : "text-[#141414] border-[#141414]/15 hover:bg-[#141414]/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Core Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-6xl mx-auto space-y-6">
              
              {/* Friendly Onboarding Guide Banner */}
              {showGuideBanner && (
                <div className="bg-white border-2 border-[#141414] rounded-2xl p-5 shadow-sm space-y-4 relative">
                  <button
                    onClick={() => setShowGuideBanner(false)}
                    className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded cursor-pointer"
                  >
                    ✕ Dismiss Guide
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-amber-400 text-slate-950 font-bold rounded-lg text-sm">
                      💡 Welcome
                    </span>
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#141414]">
                        How to use the Inductive Bible Study Workshop
                      </h3>
                      <p className="text-xs text-slate-600">
                        Inductive Bible study has 3 main stages: <strong>Observe</strong> (What do I see?), <strong>Interpret</strong> (What does it mean?), and <strong>Apply</strong> (How do I live it?).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
                    <button
                      onClick={() => {
                        setActiveSuite("workspace-library");
                        setActiveTab("ezra-library");
                      }}
                      className="bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-xl p-3 text-left transition-all cursor-pointer space-y-1"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-900 bg-amber-200/70 px-1.5 py-0.5 rounded">
                        Step 1: Start
                      </span>
                      <h5 className="font-bold text-xs text-slate-900">1. Project Library</h5>
                      <p className="text-[11px] text-slate-600">Pick a pre-loaded book (2 Timothy, Daniel, Haggai) or create a new one.</p>
                    </button>

                    <button
                      onClick={() => {
                        setActiveSuite("exegetical-workbench");
                        setActiveTab("observation");
                      }}
                      className="bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl p-3 text-left transition-all cursor-pointer space-y-1"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-emerald-900 bg-emerald-200/70 px-1.5 py-0.5 rounded">
                        Step 2: Observe
                      </span>
                      <h5 className="font-bold text-xs text-slate-900">2. Verse Workbench</h5>
                      <p className="text-[11px] text-slate-600">Compare translations, check Greek/Hebrew words & record observations.</p>
                    </button>

                    <button
                      onClick={() => {
                        setActiveSuite("synthetic-studio");
                        setActiveTab("charts");
                      }}
                      className="bg-sky-50 hover:bg-sky-100/80 border border-sky-200 rounded-xl p-3 text-left transition-all cursor-pointer space-y-1"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-sky-900 bg-sky-200/70 px-1.5 py-0.5 rounded">
                        Step 3: Diagram
                      </span>
                      <h5 className="font-bold text-xs text-slate-900">3. Charts & Structure</h5>
                      <p className="text-[11px] text-slate-600">View horizontal book charts and write your Big Idea statement.</p>
                    </button>

                    <button
                      onClick={() => {
                        setActiveSuite("academic-publishing");
                        setActiveTab("packager");
                      }}
                      className="bg-purple-50 hover:bg-purple-100/80 border border-purple-200 rounded-xl p-3 text-left transition-all cursor-pointer space-y-1"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-purple-900 bg-purple-200/70 px-1.5 py-0.5 rounded">
                        Step 4: Export
                      </span>
                      <h5 className="font-bold text-xs text-slate-900">4. Paper & Slides</h5>
                      <p className="text-[11px] text-slate-600">Auto-check your 600-pt rubric & export presentation slides.</p>
                    </button>
                  </div>
                </div>
              )}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="h-full"
              >
                {activeTab === "ezra-library" && (
                  <ScribeEzraLibrary
                    onLoadProject={handleLoadProjectFromLibrary}
                    activeProjectId={activeProject?.id}
                  />
                )}
                {activeTab === "collaboration" && (
                  <RealtimeCollaborativeWorkshop
                    currentProject={activeProject}
                    onUpdateProject={(p) => setActiveProject(p)}
                  />
                )}
                {activeTab === "teaching-slides" && (
                  <TeachingSlidesExporter project={activeProject} />
                )}
                {activeTab === "library" && <BiteLibrary />}
                {activeTab === "observation" && <ObservationWorkshop />}
                {activeTab === "big-idea" && <BigIdeaWizard />}
                {activeTab === "charts" && <VisualChartBuilder />}
                {activeTab === "structural" && <StructuralSuite />}
                {activeTab === "consultant" && (
                  <IBSMConsultant onNavigateToObservation={() => setActiveTab("observation")} />
                )}
                {activeTab === "packager" && <AssignmentPackager />}
                {activeTab === "sermon-homiletics" && <SermonHomileticsStudio />}
                {activeTab === "progressive-platform" && <ProgressiveExegesisPlatform />}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Right Aside - Real-time Academic Activity & Audit */}
        <aside className="hidden xl:flex w-72 border-l border-[#141414] bg-[#D4D3D0] p-4 flex-col gap-5 shrink-0 overflow-hidden">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase font-bold border-b border-[#141414] pb-1">Academic Audit Rules</span>
            <div className="font-mono text-[10px] space-y-2.5 opacity-90">
              <div className="flex justify-between items-center border-b border-[#141414]/10 pb-1">
                <span>1. SINGLE SPACE PERIOD</span>
                <span className="text-emerald-800 font-bold">OK</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#141414]/10 pb-1">
                <span>2. BIBLICAL PAST TENSE</span>
                <span className="text-emerald-800 font-bold">COMPLIANT</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#141414]/10 pb-1">
                <span>3. CITATION PUNCTUATION</span>
                <span className="text-orange-700 font-bold">SCANNING</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#141414]/10 pb-1">
                <span>4. SENTENCE OUTLINES</span>
                <span className="text-emerald-800 font-bold">VERIFIED</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#141414]/10 pb-1">
                <span>5. PRIMARY EXEGESIS FILE</span>
                <span className="text-[#141414] font-bold">READY</span>
              </div>
            </div>
          </div>

          {/* Course Progress Breakdown */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase font-bold border-b border-[#141414] pb-1">Syllabus Breakdown</span>
            <div className="space-y-3.5">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span>Observation (Bites 04-09)</span>
                  <span>100%</span>
                </div>
                <div className="h-1.5 bg-[#141414]/15 border border-[#141414]/25">
                  <div className="h-full bg-[#141414] w-[100%]"></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span>Interpretation (Bites 10-19)</span>
                  <span>90%</span>
                </div>
                <div className="h-1.5 bg-[#141414]/15 border border-[#141414]/25">
                  <div className="h-full bg-[#141414] w-[90%]"></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span>Application (Bites 20-21)</span>
                  <span>80%</span>
                </div>
                <div className="h-1.5 bg-[#141414]/15 border border-[#141414]/25">
                  <div className="h-full bg-[#141414] w-[80%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Toggle options styled beautifully like high density mockups */}
          <div className="mt-auto border-t border-[#141414] pt-4 flex flex-col gap-2.5">
            <button 
              onClick={() => setAutoUpdate(!autoUpdate)} 
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className={`w-3.5 h-3.5 border border-[#141414] flex items-center justify-center transition-colors ${autoUpdate ? "bg-[#141414]" : "bg-white"}`}>
                {autoUpdate && <span className="text-[8px] text-white font-bold">✓</span>}
              </div>
              <span className="text-[10px] uppercase font-bold group-hover:underline">Auto-Update Library</span>
            </button>
            <button 
              onClick={() => setStrictCheck(!strictCheck)} 
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className={`w-3.5 h-3.5 border border-[#141414] flex items-center justify-center transition-colors ${strictCheck ? "bg-[#141414]" : "bg-white"}`}>
                {strictCheck && <span className="text-[8px] text-white font-bold">✓</span>}
              </div>
              <span className="text-[10px] uppercase font-bold group-hover:underline">Strict Typing Check</span>
            </button>
          </div>
        </aside>
      </main>

      {/* Footer bar */}
      <footer className="bg-white border-t border-[#141414] h-8 shrink-0 flex items-center px-6 justify-between text-[9px] font-mono text-[#141414]/60 z-10">
        <span>East Asia School of Theology • Dr. Keith A. Shubert</span>
        <span className="hidden sm:inline">"The Bible is not for your information, it is for your transformation!"</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ObservationProvider>
      <MainAppContent />
    </ObservationProvider>
  );
}
