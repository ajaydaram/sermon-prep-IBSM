import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Printer,
  Copy,
  ChevronRight,
  Lightbulb,
  Heart,
  Target,
  Compass,
  MessageSquare,
  Users,
  Feather
} from "lucide-react";
import { motion } from "motion/react";

interface SermonMovement {
  id: string;
  title: string;
  explanation: string;
  validation: string;
  application: string;
  illustration: string;
}

interface SermonDraft {
  id: string;
  sermonTitle: string;
  scripturePassage: string;
  preachingDate: string;

  // Exegesis Pillar
  prayedForUnderstanding: boolean;
  textIsolation: string;
  who: string;
  what: string;
  why: string;
  when: string;
  where: string;
  how: string;
  textOutline: string;
  exegeticalSubject: string;
  exegeticalComplement: string;
  textPurposeContext: string;
  exhortation: string;
  warning: string;
  encouragement: string;
  exegeticalCentralProposition: string;

  // Theology Pillar
  crossReferences: string;
  theologicalOutline: string;
  theologicalSubject: string;
  theologicalComplement: string;
  theologicalPrinciple: string;
  theologicalPurpose: string;
  theologicalCentralProposition: string;

  // Homiletics Pillar
  homileticalPurpose: string;
  explanationQuestion: string;
  validationQuestion: string;
  applicationQuestion: string;
  audienceAnalysis: string;
  sermonForm: "Deductive" | "Inductive" | "Semi-Inductive";
  homileticalProposition: string;

  sermonIntroduction: string;
  movements: SermonMovement[];
  sermonConclusion: string;
  supportingMaterials: string;
  additionalNotes: string;
}

const DEFAULT_SERMON: SermonDraft = {
  id: "sermon-melchizedek-01",
  sermonTitle: "Our Indestructible High Priest: Drawing Near Through Christ",
  scripturePassage: "Hebrews 7:1-28 (Gen 14:18-20, Ps 110:4)",
  preachingDate: "2026-08-02",

  // Exegesis Pillar
  prayedForUnderstanding: true,
  textIsolation: `Hebrews 7:1-3, 23-25 (NASB 2020)
For this Melchizedek, king of Salem, priest of the Most High God, who met Abraham as he was returning from the slaughter of the kings and blessed him, to whom also Abraham apportioned a tenth part of all the spoils, was first of all, by the translation of his name, king of righteousness, and then also king of Salem, which is king of peace. Without father, without mother, without genealogy, having neither beginning of days nor end of life, but made like the Son of God, he remains a priest perpetually.

The former priests, on the one hand, existed in greater numbers because they were prevented by death from continuing, but Jesus, on the other hand, because He continues forever, holds His priesthood permanently. Therefore He is also able to save forever those who come to God through Him, since He always lives to make intercession for them.`,
  who: "Melchizedek, Abram (Abraham), Jesus Christ, Levi/Levitical Priests, 1st-century Jewish Christian readers facing persecution.",
  what: "Melchizedek blesses Abram and receives tithes (Gen 14). Hebrews 7 proves Christ's Melchizedekian priesthood is superior to Aaron's temporary Levitical order.",
  why: "To prevent discouraged Jewish believers from abandoning Christ to return to obsolete temple sacrifices.",
  when: "Historical meeting ~2000 BC; Psalm 110 prophecy ~1000 BC; Hebrews written mid-60s AD.",
  where: "Valley of Shaveh (King's Valley near Salem/Jerusalem); now ministering in the Heavenly Sanctuary.",
  how: "Established through typological silence in Genesis, divine oath in Psalm 110:4, and the power of an indestructible life in Christ (Heb 7:16).",
  textOutline: `I. THE HISTORICAL PERSON & SUPERIORITY OF MELCHIZEDEK (7:1-10)
  A. Identity of Melchizedek as King of Righteousness & Peace (7:1-3)
  B. Preeminence over Abraham and Levi (7:4-10)
II. THE NEED FOR A NEW PRIESTLY ORDER (7:11-19)
  A. Imperfection of the Levitical Priesthood (7:11-14)
  B. Inauguration of a Better Hope through an Indestructible Life (7:15-19)
III. THE ETERNAL & PERFECT PRIESTHOOD OF JESUS (7:20-28)
  A. Divine Oath & Guarantor of a Better Covenant (7:20-22)
  B. Perpetual Intercession & Sinless Sacrifice (7:23-28)`,
  exegeticalSubject: "The reason for the absolute superiority and permanence of Jesus Christ's High Priesthood over the Levitical system is",
  exegeticalComplement: "His appointment according to the order of Melchizedek through the power of an indestructible life, confirmed by divine oath to intercede perpetually for believers.",
  textPurposeContext: "Placed in Hebrews 7 to establish that Old Covenant Levitical rituals are obsolete, anchoring believers' security in Christ's perpetual intercession.",
  exhortation: "Draw near to God with full confidence of faith through Jesus, our eternal Melchizedekian High Priest.",
  warning: "Stop seeking assurance or righteousness through human rituals, obsolete traditions, or self-effort.",
  encouragement: "Continue enduring steadfastly in Christian faith, knowing Jesus lives forever to intercede for you continuously.",
  exegeticalCentralProposition: "The reason for the absolute superiority and permanence of Jesus Christ's High Priesthood over the Levitical system is His divine appointment according to the order of Melchizedek through the power of an indestructible life, guaranteeing a better covenant and saving believers completely.",

  // Theology Pillar
  crossReferences: "Genesis 14:18-20; Psalm 110:4; Romans 8:34; 1 Timothy 2:5; Hebrews 4:14-16; Hebrews 10:11-14; Revelation 1:6.",
  theologicalOutline: `I. GOD REVEALS HIS REDEMPTIVE PLAN THROUGH TYPOLOGICAL FIGURES (Gen 14, Heb 7:1-10)
II. HUMAN INSTITUTION AND LAW CANNOT BRING SPIRITUAL PERFECTION (Heb 7:11-19)
III. GOD GUARANTEES ETERNAL SALVATION THROUGH AN UNCHANGING MEDIATOR (Heb 7:20-28)`,
  theologicalSubject: "God's eternal provision for humanity's access to His holy presence is",
  theologicalComplement: "the indestructible, perpetual priesthood of His Son Jesus Christ who guarantees an unshakeable covenant.",
  theologicalPrinciple: "Because Jesus Christ possesses an unchangeable and indestructible priesthood, God's people have perpetual, unhindered access to God and complete salvation.",
  theologicalPurpose: "To anchor the believer's spiritual assurance in the eternal, living intercession of Christ rather than fragile human performance.",
  theologicalCentralProposition: "Because Jesus Christ possesses an indestructible life and an unchangeable priesthood, God guarantees complete, permanent salvation to all who approach Him through Christ.",

  // Homiletics Pillar
  homileticalPurpose: "To lead believers to surrender legalistic insecurity and confidently draw near to God daily through the living intercession of Jesus Christ.",
  explanationQuestion: "Why is Jesus' priesthood after Melchizedek different and superior to any human religious system?",
  validationQuestion: "How do we know Christ's intercession can never fail or be cut short by our weakness?",
  applicationQuestion: "How does knowing Jesus lives right now to intercede for you change the way you pray and face trial this week?",
  audienceAnalysis: "Believers struggling with guilt, spiritual weariness, performance anxiety, or feeling distant from God during personal trials.",
  sermonForm: "Deductive",
  homileticalProposition: "Because Jesus lives forever as your indestructible High Priest, you can draw near to God with complete confidence every single day.",

  sermonIntroduction: `Hook: Have you ever felt like your spiritual life is a roller coaster—feeling close to God on Sunday, but condemned and distant by Wednesday? 
Context: In 1st century Rome, Jewish Christians were tempted to return to the old temple sacrifices because the physical rituals felt tangible. 
Orienting Question: How can we find absolute, unshakeable security when our feelings and circumstances fluctuate?
Thesis: Today we discover why Jesus is our indestructible High Priest whose intercession never stops.`,
  movements: [
    {
      id: "mov-1",
      title: "Movement 1: A Priesthood Greater Than Abraham (Hebrews 7:1-10)",
      explanation: "Melchizedek combined King of Righteousness and King of Peace. Abraham paid tithes to him, showing Melchizedek's preeminence.",
      validation: "Even Levi—the father of Israel's priests—paid tithes to Melchizedek while still in Abraham's body. The lesser is always blessed by the greater.",
      application: "Stop relying on earthly pedigree or religious heritage. Your standing before God comes from One greater than Abraham.",
      illustration: "An ambassador receiving honors from foreign kings: Jesus represents a kingdom higher than any earthly institution."
    },
    {
      id: "mov-2",
      title: "Movement 2: A Priesthood Powered by Indestructible Life (Hebrews 7:11-19)",
      explanation: "Levitical priests died and had to be replaced. Jesus became priest not by physical lineage, but by the power of an indestructible life (zoē akatalytos).",
      validation: "God declared by an unchangeable oath in Psalm 110:4: 'You are a priest forever.' Death could not hold Him.",
      application: "Your salvation does not depend on your fragile performance, but on Christ's indestructible life.",
      illustration: "Replacing a flickering battery-powered flashlight with an infinite power grid connected directly to the sun."
    },
    {
      id: "mov-3",
      title: "Movement 3: A Priest Who Always Lives to Intercede (Hebrews 7:20-28)",
      explanation: "Jesus holds His priesthood perpetually. He is able to save to the uttermost (eis to panteles) because He always lives to make intercession for us.",
      validation: "Unlike earthly priests who had to offer sacrifices for their own sins, Jesus offered Himself once for all as a sinless sacrifice.",
      application: "When Satan accuses you of your failures, remember Jesus is currently standing at the right hand of God interceding for you.",
      illustration: "A master advocate who has never lost a case, standing in court presenting his own sealed blood covenant on your behalf."
    }
  ],
  sermonConclusion: `Summary: Jesus is our King of Righteousness, King of Peace, and Indestructible High Priest.
Call to Action: 1. Lay down legalistic self-reliance at the cross. 2. Approach God's throne of grace right now with bold prayer. 3. Trust Him to save you to the uttermost!`,
  supportingMaterials: "Gen 14:18-20, Ps 110:4, Heb 4:14-16, SBLGNT Lexicon notes on 'zoē akatalytos' and 'eis to panteles'.",
  additionalNotes: "Ensure 30 minutes for congregation Q&A. Distribute A4 IBSM Infographic handout."
};

export default function SermonHomileticsStudio() {
  const [draft, setDraft] = useState<SermonDraft>(() => {
    const saved = localStorage.getItem("scribe_ezra_sermon_draft");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_SERMON;
  });

  const [activePillar, setActivePillar] = useState<"exegesis" | "theology" | "homiletics">("exegesis");
  const [saveStatus, setSaveStatus] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("scribe_ezra_sermon_draft", JSON.stringify(draft));
  }, [draft]);

  const handleSave = () => {
    localStorage.setItem("scribe_ezra_sermon_draft", JSON.stringify(draft));
    setSaveStatus("Draft Saved Successfully!");
    setTimeout(() => setSaveStatus(""), 2500);
  };

  const handleAddMovement = () => {
    const newMov: SermonMovement = {
      id: `mov-${Date.now()}`,
      title: `Movement ${draft.movements.length + 1}: [New Point]`,
      explanation: "",
      validation: "",
      application: "",
      illustration: ""
    };
    setDraft({ ...draft, movements: [...draft.movements, newMov] });
  };

  const handleRemoveMovement = (id: string) => {
    setDraft({ ...draft, movements: draft.movements.filter(m => m.id !== id) });
  };

  const handleUpdateMovement = (id: string, field: keyof SermonMovement, value: string) => {
    setDraft({
      ...draft,
      movements: draft.movements.map(m => m.id === id ? { ...m, [field]: value } : m)
    });
  };

  const handleCopyFullManuscript = () => {
    const manuscript = `=====================================================
SERMON MANUSCRIPT & HOMILETICAL PREPARATION
=====================================================
TITLE: ${draft.sermonTitle}
PASSAGE: ${draft.scripturePassage}
DATE: ${draft.preachingDate}
FORM: ${draft.sermonForm}

-----------------------------------------------------
1. HOMILETICAL PROPOSITION (BIG IDEA)
-----------------------------------------------------
"${draft.homileticalProposition}"

-----------------------------------------------------
2. HOMILETICAL PURPOSE
-----------------------------------------------------
${draft.homileticalPurpose}

-----------------------------------------------------
3. AUDIENCE ANALYSIS & 3 DEVELOPMENTAL QUESTIONS
-----------------------------------------------------
Audience: ${draft.audienceAnalysis}
- Explanation: ${draft.explanationQuestion}
- Validation: ${draft.validationQuestion}
- Application: ${draft.applicationQuestion}

-----------------------------------------------------
4. SERMON INTRODUCTION
-----------------------------------------------------
${draft.sermonIntroduction}

-----------------------------------------------------
5. SERMON MOVEMENTS (BODY POINTS)
-----------------------------------------------------
${draft.movements.map((m) => `
[${m.title}]
- Explain It: ${m.explanation}
- Prove It: ${m.validation}
- Apply It: ${m.application}
- Illustration: ${m.illustration}`).join("\n\n")}

-----------------------------------------------------
6. CONCLUSION & CALL TO ACTION
-----------------------------------------------------
${draft.sermonConclusion}

-----------------------------------------------------
7. THEOLOGICAL PRINCIPLE (THEOLOGY PILLAR)
-----------------------------------------------------
"${draft.theologicalPrinciple}"

-----------------------------------------------------
8. EXEGETICAL CENTRAL PROPOSITION (EXEGESIS PILLAR)
-----------------------------------------------------
"${draft.exegeticalCentralProposition}"
`;
    navigator.clipboard.writeText(manuscript.trim());
    alert("Full Sermon Manuscript copied to clipboard!");
  };

  return (
    <div className="space-y-6 font-sans" id="sermon-homiletics-studio-root">
      
      {/* Top Header Controls */}
      <div className="bg-[#141414] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-mono text-[10px] font-bold uppercase rounded">
              EXEGESIS ➔ THEOLOGY ➔ HOMILETICS
            </span>
            <span className="text-xs text-slate-300 font-mono">Master Sermon Builder</span>
          </div>
          <h2 className="font-serif text-xl font-bold text-white">
            Homiletics & Sermon Exegesis Studio
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Move from concrete exegetical details to timeless theological principles, and shape timely homiletical application for your listeners.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            onClick={handleCopyFullManuscript}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            Copy Manuscript
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Basic Sermon Information */}
      <div className="bg-white border-2 border-[#141414] rounded-2xl p-5 shadow-sm space-y-4">
        <h4 className="font-serif text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
          <Feather className="w-4 h-4 text-amber-600" />
          Basic Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-bold text-slate-500">Sermon Title</label>
            <input
              type="text"
              value={draft.sermonTitle}
              onChange={(e) => setDraft({ ...draft, sermonTitle: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2 font-serif font-bold text-slate-900 focus:ring-1 focus:ring-slate-800"
              placeholder="e.g. Our Indestructible High Priest"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-bold text-slate-500">Scripture Passage</label>
            <input
              type="text"
              value={draft.scripturePassage}
              onChange={(e) => setDraft({ ...draft, scripturePassage: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2 font-mono text-slate-900 focus:ring-1 focus:ring-slate-800"
              placeholder="e.g. Hebrews 7:1-28"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-bold text-slate-500">Preaching Date</label>
            <input
              type="date"
              value={draft.preachingDate}
              onChange={(e) => setDraft({ ...draft, preachingDate: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2 font-mono text-slate-900 focus:ring-1 focus:ring-slate-800"
            />
          </div>
        </div>
      </div>

      {/* 3 Pillars Workspace Tabs */}
      <div className="flex border-b border-slate-300 bg-white rounded-t-2xl px-4 pt-2 gap-2">
        <button
          onClick={() => setActivePillar("exegesis")}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activePillar === "exegesis"
              ? "border-emerald-700 text-emerald-900 font-extrabold bg-emerald-50/50 rounded-t-xl"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          1. Exegesis (Text & 6 Friends)
        </button>

        <button
          onClick={() => setActivePillar("theology")}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activePillar === "theology"
              ? "border-amber-700 text-amber-900 font-extrabold bg-amber-50/50 rounded-t-xl"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          2. Theology (Timeless Principle)
        </button>

        <button
          onClick={() => setActivePillar("homiletics")}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activePillar === "homiletics"
              ? "border-purple-700 text-purple-900 font-extrabold bg-purple-50/50 rounded-t-xl"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Target className="w-4 h-4" />
          3. Homiletics (Sermon & Movements)
        </button>
      </div>

      {/* PILLAR 1: EXEGESIS */}
      {activePillar === "exegesis" && (
        <div className="bg-white border-x border-b border-slate-300 rounded-b-2xl p-6 space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.prayedForUnderstanding}
                  onChange={(e) => setDraft({ ...draft, prayedForUnderstanding: e.target.checked })}
                  className="w-4 h-4 text-emerald-700 rounded focus:ring-emerald-600"
                />
                <span className="text-xs font-bold text-emerald-950">
                  "I have prayed for understanding of this passage"
                </span>
              </label>
            </div>
            <span className="text-[10px] font-mono text-emerald-800 font-bold bg-white px-2 py-0.5 rounded border border-emerald-300">
              Pillar 1: Exegesis (Concrete, Specific & Time-Bound)
            </span>
          </div>

          {/* Text Isolation */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-slate-700">Text Isolation (Write out the text)</label>
            <textarea
              value={draft.textIsolation}
              onChange={(e) => setDraft({ ...draft, textIsolation: e.target.value })}
              rows={4}
              className="w-full border border-slate-300 rounded-xl p-3 text-xs font-serif leading-relaxed text-slate-900 focus:ring-1 focus:ring-emerald-700"
              placeholder="Paste or write out the exact scripture verses..."
            />
          </div>

          {/* The 6 Friends */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              The 6 Friends (Selective Observation Questions)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">WHO?</label>
                <textarea
                  value={draft.who}
                  onChange={(e) => setDraft({ ...draft, who: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">WHAT?</label>
                <textarea
                  value={draft.what}
                  onChange={(e) => setDraft({ ...draft, what: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">WHY?</label>
                <textarea
                  value={draft.why}
                  onChange={(e) => setDraft({ ...draft, why: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">WHEN?</label>
                <textarea
                  value={draft.when}
                  onChange={(e) => setDraft({ ...draft, when: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">WHERE?</label>
                <textarea
                  value={draft.where}
                  onChange={(e) => setDraft({ ...draft, where: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">HOW?</label>
                <textarea
                  value={draft.how}
                  onChange={(e) => setDraft({ ...draft, how: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Text Outline & Propositional Statement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <label className="block font-bold uppercase text-slate-700">Text Outline</label>
              <textarea
                value={draft.textOutline}
                onChange={(e) => setDraft({ ...draft, textOutline: e.target.value })}
                rows={6}
                className="w-full border border-slate-300 rounded-xl p-3 font-mono text-xs text-slate-900 focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div className="space-y-3">
              <span className="block font-bold uppercase text-slate-700">Propositional Statement Formula</span>
              
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500">Subject (What is author talking about?)</label>
                <input
                  type="text"
                  value={draft.exegeticalSubject}
                  onChange={(e) => setDraft({ ...draft, exegeticalSubject: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500">Complement (What is the answer?)</label>
                <textarea
                  value={draft.exegeticalComplement}
                  onChange={(e) => setDraft({ ...draft, exegeticalComplement: e.target.value })}
                  rows={3}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Text Purpose */}
          <div className="space-y-3 border-t pt-4">
            <h4 className="font-serif text-sm font-bold text-slate-900">Establish the Text's Purpose</h4>
            
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Why is this text placed in this context?</label>
              <input
                type="text"
                value={draft.textPurposeContext}
                onChange={(e) => setDraft({ ...draft, textPurposeContext: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-emerald-800">Exhortation (Start doing)</label>
                <textarea
                  value={draft.exhortation}
                  onChange={(e) => setDraft({ ...draft, exhortation: e.target.value })}
                  rows={2}
                  className="w-full border border-emerald-200 bg-emerald-50/40 rounded-lg p-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-red-800">Warning (Stop doing)</label>
                <textarea
                  value={draft.warning}
                  onChange={(e) => setDraft({ ...draft, warning: e.target.value })}
                  rows={2}
                  className="w-full border border-red-200 bg-red-50/40 rounded-lg p-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-blue-800">Encouragement (Continue doing)</label>
                <textarea
                  value={draft.encouragement}
                  onChange={(e) => setDraft({ ...draft, encouragement: e.target.value })}
                  rows={2}
                  className="w-full border border-blue-200 bg-blue-50/40 rounded-lg p-2 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Exegetical Central Proposition */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
              Exegetical Central Proposition (Concrete, Specific & Time-Bound)
            </span>
            <textarea
              value={draft.exegeticalCentralProposition}
              onChange={(e) => setDraft({ ...draft, exegeticalCentralProposition: e.target.value })}
              rows={2}
              className="w-full bg-transparent text-white border-none font-serif text-sm focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* PILLAR 2: THEOLOGY */}
      {activePillar === "theology" && (
        <div className="bg-white border-x border-b border-slate-300 rounded-b-2xl p-6 space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-xs text-amber-950">
                From Exegesis to Theology
              </span>
              <p className="text-xs text-amber-900 italic">
                "Move from the concrete, specific, and time-bound to the abstract, broad, and timeless. Exegesis is parent, Theology is child."
              </p>
            </div>
            <span className="text-[10px] font-mono text-amber-900 font-bold bg-white px-2 py-0.5 rounded border border-amber-300">
              Pillar 2: Timeless Truth
            </span>
          </div>

          {/* Cross References */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-slate-700">Cross References (What does the rest of the Bible say?)</label>
            <textarea
              value={draft.crossReferences}
              onChange={(e) => setDraft({ ...draft, crossReferences: e.target.value })}
              rows={2}
              className="w-full border border-slate-300 rounded-xl p-3 text-xs font-mono text-slate-900 focus:ring-1 focus:ring-amber-700"
            />
          </div>

          {/* Theological Outline */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-slate-700">Theological Outline (Abstract, Timeless)</label>
            <textarea
              value={draft.theologicalOutline}
              onChange={(e) => setDraft({ ...draft, theologicalOutline: e.target.value })}
              rows={4}
              className="w-full border border-slate-300 rounded-xl p-3 text-xs font-mono text-slate-900 focus:ring-1 focus:ring-amber-700"
            />
          </div>

          {/* Theological Subject & Complement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Theological Subject (What passage says about God & relationship)</label>
              <textarea
                value={draft.theologicalSubject}
                onChange={(e) => setDraft({ ...draft, theologicalSubject: e.target.value })}
                rows={3}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-amber-700"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Theological Complement (Answer to subject)</label>
              <textarea
                value={draft.theologicalComplement}
                onChange={(e) => setDraft({ ...draft, theologicalComplement: e.target.value })}
                rows={3}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-amber-700"
              />
            </div>
          </div>

          {/* Principle & Purpose */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="block font-bold text-amber-900">Theological Principle (Universal Statement)</label>
              <textarea
                value={draft.theologicalPrinciple}
                onChange={(e) => setDraft({ ...draft, theologicalPrinciple: e.target.value })}
                rows={3}
                className="w-full border border-amber-200 bg-amber-50/30 rounded-lg p-2 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-amber-900">Theological Purpose (Timeless Purpose)</label>
              <textarea
                value={draft.theologicalPurpose}
                onChange={(e) => setDraft({ ...draft, theologicalPurpose: e.target.value })}
                rows={3}
                className="w-full border border-amber-200 bg-amber-50/30 rounded-lg p-2 text-xs"
              />
            </div>
          </div>

          {/* Theological Central Proposition */}
          <div className="bg-amber-950 text-white p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-300">
              Theological Central Proposition (Abstract, Broad & Timeless)
            </span>
            <textarea
              value={draft.theologicalCentralProposition}
              onChange={(e) => setDraft({ ...draft, theologicalCentralProposition: e.target.value })}
              rows={2}
              className="w-full bg-transparent text-white border-none font-serif text-sm focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* PILLAR 3: HOMILETICS */}
      {activePillar === "homiletics" && (
        <div className="bg-white border-x border-b border-slate-300 rounded-b-2xl p-6 space-y-6">
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-xs text-purple-950">
                From Theology to Homiletics
              </span>
              <p className="text-xs text-purple-900 italic">
                "Shape timeless truth for timely application. Answer 3 questions: Explain it, Prove it, Apply it."
              </p>
            </div>
            <span className="text-[10px] font-mono text-purple-900 font-bold bg-white px-2 py-0.5 rounded border border-purple-300">
              Pillar 3: Timely Application
            </span>
          </div>

          {/* Homiletical Purpose & 3 Developmental Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Homiletical Purpose (What to achieve in listeners?)</label>
              <textarea
                value={draft.homileticalPurpose}
                onChange={(e) => setDraft({ ...draft, homileticalPurpose: e.target.value })}
                rows={3}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-purple-700"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Audience Analysis (Describe your listeners)</label>
              <textarea
                value={draft.audienceAnalysis}
                onChange={(e) => setDraft({ ...draft, audienceAnalysis: e.target.value })}
                rows={3}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-purple-700"
              />
            </div>
          </div>

          {/* The 3 Developmental Questions */}
          <div className="space-y-3 bg-purple-50/40 border border-purple-150 p-4 rounded-xl">
            <span className="block font-bold text-xs text-purple-950 uppercase">The 3 Developmental Questions</span>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">1. Explanation ("Explain it")</label>
                <textarea
                  value={draft.explanationQuestion}
                  onChange={(e) => setDraft({ ...draft, explanationQuestion: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-300 bg-white rounded-lg p-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">2. Validation ("Prove it")</label>
                <textarea
                  value={draft.validationQuestion}
                  onChange={(e) => setDraft({ ...draft, validationQuestion: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-300 bg-white rounded-lg p-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">3. Application ("Apply it")</label>
                <textarea
                  value={draft.applicationQuestion}
                  onChange={(e) => setDraft({ ...draft, applicationQuestion: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-300 bg-white rounded-lg p-2 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Sermon Form Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border p-3.5 rounded-xl text-xs">
            <span className="font-bold text-slate-800">Sermon Form (How will sermon argue?):</span>
            <div className="flex gap-2">
              {[
                { id: "Deductive", label: "Deductive (Idea in Intro)" },
                { id: "Inductive", label: "Inductive (Idea late in Conclusion)" },
                { id: "Semi-Inductive", label: "Semi-Inductive (Idea in Middle)" },
              ].map((form) => (
                <button
                  key={form.id}
                  onClick={() => setDraft({ ...draft, sermonForm: form.id as any })}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    draft.sermonForm === form.id
                      ? "bg-purple-900 text-white shadow-xs"
                      : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {form.label}
                </button>
              ))}
            </div>
          </div>

          {/* Homiletical Proposition */}
          <div className="bg-purple-950 text-white p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-purple-300">
              Homiletical Proposition (Memorable, Specific Sentence Gripping Heads, Hearts & Hands)
            </span>
            <textarea
              value={draft.homileticalProposition}
              onChange={(e) => setDraft({ ...draft, homileticalProposition: e.target.value })}
              rows={2}
              className="w-full bg-transparent text-white border-none font-serif text-sm font-bold focus:outline-none"
            />
          </div>

          {/* Sermon Movements (Body Points) */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between items-center">
              <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-700" />
                Sermon Movements (Main Points)
              </h4>
              <button
                onClick={handleAddMovement}
                className="px-3 py-1.5 bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Movement
              </button>
            </div>

            {/* Introduction */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Sermon Introduction (Hook, Context, Appetite)</label>
              <textarea
                value={draft.sermonIntroduction}
                onChange={(e) => setDraft({ ...draft, sermonIntroduction: e.target.value })}
                rows={3}
                className="w-full border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-1 focus:ring-purple-700"
              />
            </div>

            {/* Movements List */}
            <div className="space-y-4">
              {draft.movements.map((mov) => (
                <div key={mov.id} className="border-2 border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/50 relative">
                  <button
                    onClick={() => handleRemoveMovement(mov.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-600 cursor-pointer"
                    title="Remove Movement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    value={mov.title}
                    onChange={(e) => handleUpdateMovement(mov.id, "title", e.target.value)}
                    className="w-full font-serif font-bold text-sm text-purple-950 border-b border-slate-300 bg-transparent pb-1 focus:outline-none"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500">Explain It</label>
                      <textarea
                        value={mov.explanation}
                        onChange={(e) => handleUpdateMovement(mov.id, "explanation", e.target.value)}
                        rows={2}
                        className="w-full border border-slate-200 bg-white rounded p-2 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500">Prove It (Validation)</label>
                      <textarea
                        value={mov.validation}
                        onChange={(e) => handleUpdateMovement(mov.id, "validation", e.target.value)}
                        rows={2}
                        className="w-full border border-slate-200 bg-white rounded p-2 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500">Apply It</label>
                      <textarea
                        value={mov.application}
                        onChange={(e) => handleUpdateMovement(mov.id, "application", e.target.value)}
                        rows={2}
                        className="w-full border border-slate-200 bg-white rounded p-2 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500">Illustration / Story</label>
                      <textarea
                        value={mov.illustration}
                        onChange={(e) => handleUpdateMovement(mov.id, "illustration", e.target.value)}
                        rows={2}
                        className="w-full border border-slate-200 bg-white rounded p-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Sermon Conclusion (Summarize & Call to Action)</label>
              <textarea
                value={draft.sermonConclusion}
                onChange={(e) => setDraft({ ...draft, sermonConclusion: e.target.value })}
                rows={3}
                className="w-full border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-1 focus:ring-purple-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
