import React, { useState } from "react";
import {
  ZoomIn,
  Eye,
  ChevronRight,
  GitCommit,
  Layers,
  Sparkles,
  ArrowDownRight,
  Plus,
  Trash2,
  CornerDownRight,
  Indent,
  Outdent,
  Edit2,
  Check
} from "lucide-react";
import { HierarchyScopeLevel, SentenceGrammarNode } from "../types";

// Pre-loaded Grammatical Data for 2 Timothy 2:1-7 Worm's Eye View
const INITIAL_GRAMMAR_NODES: SentenceGrammarNode[] = [
  {
    id: "g-1",
    verseRef: "2 Tim 2:1a",
    clauseType: "Main Clause",
    originalText: "Thou therefore, my son,",
    translationText: "You then, my child,",
    indentLevel: 0,
    colorCode: "#1E3A8A",
    notes: "Direct apostrophic address to Timothy."
  },
  {
    id: "g-2",
    verseRef: "2 Tim 2:1b",
    clauseType: "Verbal Modifier",
    originalText: "be strong in the grace that is in Christ Jesus.",
    translationText: "be strengthened by the grace that is in Christ Jesus,",
    indentLevel: 1,
    colorCode: "#047857",
    notes: "Passive imperative (endynamou) - Divine empowerment."
  },
  {
    id: "g-3",
    verseRef: "2 Tim 2:2a",
    clauseType: "Subordinate Clause",
    originalText: "And the things that thou hast heard of me among many witnesses,",
    translationText: "and what you have heard from me in the presence of many witnesses",
    indentLevel: 1,
    colorCode: "#1D4ED8",
    notes: "Apostolic deposit / tradition."
  },
  {
    id: "g-4",
    verseRef: "2 Tim 2:2b",
    clauseType: "Main Clause",
    originalText: "the same commit thou to faithful men,",
    translationText: "entrust these to faithful men",
    indentLevel: 2,
    colorCode: "#B91C1C",
    notes: "Core transmission imperative (paratithou)."
  },
  {
    id: "g-5",
    verseRef: "2 Tim 2:2c",
    clauseType: "Subordinate Clause",
    originalText: "who shall be able to teach others also.",
    translationText: "who will be able to teach others also.",
    indentLevel: 3,
    colorCode: "#6B21A8",
    notes: "Purpose / Result clause: 4th generation succession (Paul -> Timothy -> Faithful Men -> Others)."
  },
  {
    id: "g-6",
    verseRef: "2 Tim 2:3",
    clauseType: "Main Clause",
    originalText: "Thou therefore endure hardness,",
    translationText: "Share in suffering as a good soldier of Christ Jesus.",
    indentLevel: 1,
    colorCode: "#047857",
    notes: "Imperative of endurance (synkakopatheson)."
  },
  {
    id: "g-7",
    verseRef: "2 Tim 2:4a",
    clauseType: "Subordinate Clause",
    originalText: "No man that warreth entangleth himself with the affairs of this life;",
    translationText: "No soldier gets entangled in civilian pursuits,",
    indentLevel: 2,
    colorCode: "#D97706",
    notes: "Analogy 1: Soldier's single-minded devotion."
  },
  {
    id: "g-8",
    verseRef: "2 Tim 2:4b",
    clauseType: "Subordinate Clause",
    originalText: "that he may please him who hath chosen him to be a soldier.",
    translationText: "since his aim is to please the one who enlisted him.",
    indentLevel: 3,
    colorCode: "#6B21A8",
    notes: "Purpose clause (hina aresē)."
  },
  {
    id: "g-9",
    verseRef: "2 Tim 2:5",
    clauseType: "Subordinate Clause",
    originalText: "And if a man also strive for masteries, yet is he not crowned, except he strive lawfully.",
    translationText: "An athlete is not crowned unless he competes according to the rules.",
    indentLevel: 2,
    colorCode: "#D97706",
    notes: "Analogy 2: Athlete's disciplined rule-keeping."
  },
  {
    id: "g-10",
    verseRef: "2 Tim 2:6",
    clauseType: "Subordinate Clause",
    originalText: "The husbandman that laboureth must be first partaker of the fruits.",
    translationText: "It is the hard-working farmer who ought to have the first share of the crops.",
    indentLevel: 2,
    colorCode: "#D97706",
    notes: "Analogy 3: Farmer's patient labor prior to reward."
  },
  {
    id: "g-11",
    verseRef: "2 Tim 2:7",
    clauseType: "Main Clause",
    originalText: "Consider what I say; and the Lord give thee understanding in all things.",
    translationText: "Think over what I say, for the Lord will give you understanding in everything.",
    indentLevel: 1,
    colorCode: "#1E3A8A",
    notes: "Reflective exhortation & divine promise of insight."
  }
];

export default function HierarchicalScopeView() {
  const [scope, setScope] = useState<HierarchyScopeLevel>("worm");
  const [selectedParagraph, setSelectedParagraph] = useState("2 Tim 2:1-7 (Transmission & Analogies)");
  const [grammarNodes, setGrammarNodes] = useState<SentenceGrammarNode[]>(INITIAL_GRAMMAR_NODES);
  
  // State for editing a grammar node inline
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editType, setEditType] = useState<SentenceGrammarNode["clauseType"]>("Main Clause");
  const [editNotes, setEditNotes] = useState("");

  const handleIndent = (id: string, delta: number) => {
    setGrammarNodes(
      grammarNodes.map((g) =>
        g.id === id ? { ...g, indentLevel: Math.max(0, Math.min(5, g.indentLevel + delta)) } : g
      )
    );
  };

  const handleDeleteNode = (id: string) => {
    setGrammarNodes(grammarNodes.filter((g) => g.id !== id));
  };

  const handleAddClause = () => {
    const newNode: SentenceGrammarNode = {
      id: `g-${Date.now()}`,
      verseRef: "2 Tim 2:8",
      clauseType: "Subordinate Clause",
      originalText: "New clause text...",
      translationText: "Translation text...",
      indentLevel: 1,
      notes: "Clause analysis note"
    };
    setGrammarNodes([...grammarNodes, newNode]);
  };

  const startEditing = (node: SentenceGrammarNode) => {
    setEditingId(node.id);
    setEditText(node.translationText);
    setEditType(node.clauseType);
    setEditNotes(node.notes || "");
  };

  const saveEditing = () => {
    if (!editingId) return;
    setGrammarNodes(
      grammarNodes.map((g) =>
        g.id === editingId
          ? { ...g, translationText: editText, clauseType: editType, notes: editNotes }
          : g
      )
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-6 font-sans" id="hierarchical-scope-view-root">
      {/* Scope Zoom Level Header Controller */}
      <div className="bg-white border-2 border-[#141414] rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#141414] text-white flex items-center justify-center rounded-lg font-mono font-bold text-sm">
            {scope === "bird" ? "L1" : scope === "meso" ? "L2" : "L3"}
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[#141414]">
              Hierarchical Scope Controller
            </h3>
            <p className="text-xs text-[#141414]/60">
              Seamlessly toggle between Macro Book Divisions and Micro Grammatical Syntax
            </p>
          </div>
        </div>

        {/* Level Switcher Tabs */}
        <div className="flex bg-[#E4E3E0] p-1 border border-[#141414]/20 rounded-lg">
          <button
            onClick={() => setScope("bird")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase flex items-center gap-2 rounded cursor-pointer transition-all ${
              scope === "bird" ? "bg-[#141414] text-white shadow-xs" : "text-[#141414] hover:bg-black/10"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Bird's Eye (Book)</span>
          </button>
          <button
            onClick={() => setScope("meso")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase flex items-center gap-2 rounded cursor-pointer transition-all ${
              scope === "meso" ? "bg-[#141414] text-white shadow-xs" : "text-[#141414] hover:bg-black/10"
            }`}
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>2. Meso (Paragraphs)</span>
          </button>
          <button
            onClick={() => setScope("worm")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase flex items-center gap-2 rounded cursor-pointer transition-all ${
              scope === "worm" ? "bg-[#141414] text-white shadow-xs" : "text-[#141414] hover:bg-black/10"
            }`}
          >
            <CornerDownRight className="w-3.5 h-3.5" />
            <span>3. Worm's Eye (Grammar)</span>
          </button>
        </div>
      </div>

      {/* LEVEL 1: BIRD'S EYE VIEW (Macro Book Level) */}
      {scope === "bird" && (
        <div className="bg-white border border-[#141414]/20 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                MACRO LEVEL 1 ARCHITECTURE
              </span>
              <h2 className="font-serif text-xl font-bold text-slate-900">
                2 TIMOTHY: BOOK-LEVEL DIVISIONS
              </h2>
            </div>
            <button
              onClick={() => setScope("meso")}
              className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded flex items-center gap-1.5 hover:bg-emerald-800 transition-colors"
            >
              <span>Zoom to Segments</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Division 1 Block */}
            <div
              onClick={() => setScope("meso")}
              className="border-2 border-slate-800 bg-amber-50/40 rounded-xl p-5 cursor-pointer hover:border-emerald-700 hover:shadow-md transition-all space-y-3 group"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold bg-slate-800 text-white px-2 py-0.5 rounded">
                  2 Tim 1:1 - 2:13
                </span>
                <span className="text-xs font-bold text-amber-800 uppercase font-mono group-hover:underline">
                  Inspect Segment II →
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                DIVISION I: PRESENT DUTY IN GUARDING THE GOSPEL
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Paul's personal exhortation to Timothy to remain loyal despite widespread apostasy in Asia,
                guarding the apostolic deposit with soldier-like endurance and grace.
              </p>
              <div className="pt-2 border-t border-amber-200/60 flex justify-between text-[11px] font-mono font-bold text-slate-500">
                <span>Segments: 2</span>
                <span>Tone: Encouraging & Loyal</span>
              </div>
            </div>

            {/* Division 2 Block */}
            <div
              onClick={() => setScope("meso")}
              className="border-2 border-slate-800 bg-indigo-50/40 rounded-xl p-5 cursor-pointer hover:border-emerald-700 hover:shadow-md transition-all space-y-3 group"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold bg-slate-800 text-white px-2 py-0.5 rounded">
                  2 Tim 2:14 - 4:22
                </span>
                <span className="text-xs font-bold text-indigo-800 uppercase font-mono group-hover:underline">
                  Inspect Segment III →
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                DIVISION II: FUTURE PERIL & FAITHFUL PREACHING
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                A prophetic warning regarding the perilous last days, calling for approved workmanship,
                right division of God's Word, and persistent preaching in season and out of season.
              </p>
              <div className="pt-2 border-t border-indigo-200/60 flex justify-between text-[11px] font-mono font-bold text-slate-500">
                <span>Segments: 2</span>
                <span>Tone: Solemn Command</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 2: MESO VIEW (Segment & Paragraph Level) */}
      {scope === "meso" && (
        <div className="bg-white border border-[#141414]/20 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                MESO LEVEL 2 PERICOPE SCOPE
              </span>
              <h2 className="font-serif text-xl font-bold text-slate-900">
                DIVISION I: PARAGRAPH BREAKDOWN & TEMPORAL TONALITY
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setScope("bird")}
                className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-bold rounded hover:bg-slate-50"
              >
                ← Bird's Eye
              </button>
              <button
                onClick={() => setScope("worm")}
                className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded hover:bg-emerald-800"
              >
                Zoom to Worm's Eye Grammar →
              </button>
            </div>
          </div>

          {/* Paragraph Pericopes list */}
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-serif text-sm font-bold text-slate-900">
                  Segment A: Paul's Thanksgiving & Loyalty (2 Tim 1:1-18)
                </span>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  Perspective: Past
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white border border-slate-200 p-3 rounded-lg">
                  <span className="font-mono font-bold text-[10px] text-slate-400">1:1-7</span>
                  <h4 className="font-bold text-slate-800">Inherited Unfeigned Faith</h4>
                  <p className="text-slate-500 text-[11px]">Paul recalls Lois & Eunice, urging Timothy to fan into flame the gift of God.</p>
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-lg">
                  <span className="font-mono font-bold text-[10px] text-slate-400">1:8-18</span>
                  <h4 className="font-bold text-slate-800">Not Ashamed of the Gospel</h4>
                  <p className="text-slate-500 text-[11px]">Contrast between Asia defectors (Phygellus) and loyal servant Onesiphorus.</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/50 border-2 border-emerald-700 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-serif text-sm font-bold text-emerald-950">
                  Segment B: Transmission & Tripartite Analogies (2 Tim 2:1-13)
                </span>
                <button
                  onClick={() => setScope("worm")}
                  className="text-xs font-mono font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                >
                  Inspect Sentence Grammar (Worm's Eye) →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div
                  onClick={() => setScope("worm")}
                  className="bg-white border-2 border-emerald-600 p-3 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors"
                >
                  <span className="font-mono font-bold text-[10px] text-emerald-700">2:1-7 • Active Selection</span>
                  <h4 className="font-bold text-slate-900">Apostolic Deposit & 3 Images</h4>
                  <p className="text-slate-500 text-[11px]">Soldier, Athlete, Farmer. Entrust truth to faithful men.</p>
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-lg opacity-75">
                  <span className="font-mono font-bold text-[10px] text-slate-400">2:8-10</span>
                  <h4 className="font-bold text-slate-800">Remember Jesus Christ</h4>
                  <p className="text-slate-500 text-[11px]">Resurrected seed of David; God's word is not bound.</p>
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-lg opacity-75">
                  <span className="font-mono font-bold text-[10px] text-slate-400">2:11-13</span>
                  <h4 className="font-bold text-slate-800">Trustworthy Hymn</h4>
                  <p className="text-slate-500 text-[11px]">If we died with Him, we shall also live with Him.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 3: WORM'S EYE VIEW (Granular Sentence Grammatical Diagramming) */}
      {scope === "worm" && (
        <div className="bg-white border-2 border-[#141414] rounded-xl p-6 shadow-sm space-y-5">
          <div className="border-b border-gray-200 pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-purple-100 text-purple-900 font-mono text-[10px] font-bold uppercase rounded">
                  MICRO LEVEL 3 GRAMMATICAL SYNTAX
                </span>
                <span className="font-mono text-xs text-slate-500">2 Tim 2:1-7</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-slate-900 mt-1">
                WORM'S EYE VIEW: SENTENCE CLAUSE DIAGRAMMING
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddClause}
                className="px-3 py-1.5 bg-[#141414] text-white text-xs font-bold rounded flex items-center gap-1.5 hover:bg-black/80"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Clause Node</span>
              </button>
              <button
                onClick={() => setScope("meso")}
                className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-bold rounded hover:bg-slate-100"
              >
                ↑ Zoom Out to Meso
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-600 italic">
            Hierarchical sentence structure showing clause subordination, conjunction modifiers, and imperative verbs.
            Use the Indent / Outdent controls to adjust grammatical nesting depth.
          </p>

          {/* Grammar Tree Diagramming List */}
          <div className="space-y-2 border-l-2 border-slate-300 pl-4 py-2 font-sans">
            {grammarNodes.map((node) => {
              const indentPixels = node.indentLevel * 28;
              const isEditing = editingId === node.id;

              return (
                <div
                  key={node.id}
                  style={{ marginLeft: `${indentPixels}px` }}
                  className="group relative transition-all"
                >
                  <div
                    className={`border rounded-lg p-3 text-xs space-y-1.5 transition-all bg-white hover:border-[#141414] shadow-2xs ${
                      node.clauseType === "Main Clause"
                        ? "border-blue-300 bg-blue-50/20"
                        : node.clauseType === "Subordinate Clause"
                        ? "border-purple-300 bg-purple-50/20"
                        : "border-amber-300 bg-amber-50/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-slate-500">
                          {node.verseRef}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded text-white`}
                          style={{
                            backgroundColor:
                              node.clauseType === "Main Clause"
                                ? "#1E3A8A"
                                : node.clauseType === "Subordinate Clause"
                                ? "#6B21A8"
                                : node.clauseType === "Verbal Modifier"
                                ? "#047857"
                                : "#D97706"
                          }}
                        >
                          {node.clauseType}
                        </span>
                      </div>

                      {/* Tree Indent Controls & Actions */}
                      <div className="flex items-center gap-1 opacity-90">
                        <button
                          onClick={() => handleIndent(node.id, -1)}
                          disabled={node.indentLevel <= 0}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-30"
                          title="Outdent Clause"
                        >
                          <Outdent className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleIndent(node.id, 1)}
                          disabled={node.indentLevel >= 5}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-30"
                          title="Indent Clause"
                        >
                          <Indent className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => startEditing(node)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600"
                          title="Edit Clause"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNode(node.id)}
                          className="p-1 hover:bg-rose-100 rounded text-rose-600"
                          title="Delete Clause"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="space-y-2 pt-2 border-t border-slate-200">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full text-xs font-serif p-1.5 border border-slate-300 rounded"
                        />
                        <div className="flex gap-2">
                          <select
                            value={editType}
                            onChange={(e) => setEditType(e.target.value as any)}
                            className="text-xs p-1 border border-slate-300 rounded"
                          >
                            <option value="Main Clause">Main Clause</option>
                            <option value="Subordinate Clause">Subordinate Clause</option>
                            <option value="Verbal Modifier">Verbal Modifier</option>
                            <option value="Prepositional Phrase">Prepositional Phrase</option>
                            <option value="Conjunction">Conjunction</option>
                          </select>
                          <input
                            type="text"
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            placeholder="Grammatical note..."
                            className="flex-1 text-xs p-1 border border-slate-300 rounded"
                          />
                          <button
                            onClick={saveEditing}
                            className="px-2 py-1 bg-emerald-700 text-white rounded text-xs font-bold"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="font-serif text-sm font-semibold text-slate-900 leading-snug">
                          {node.translationText}
                        </p>

                        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono italic">
                          <span>Greek: "{node.originalText}"</span>
                          {node.notes && <span className="text-slate-600 font-sans">Note: {node.notes}</span>}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
