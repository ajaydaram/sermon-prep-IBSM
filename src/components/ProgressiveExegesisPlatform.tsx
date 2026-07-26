import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Layers,
  Compass,
  Sparkles,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Heart,
  Target,
  ArrowRight,
  ChevronRight,
  Globe,
  Award,
  History,
  FileText,
  Users,
  Feather,
  Copy,
  Eye,
  Sliders,
  Terminal,
  Bookmark
} from "lucide-react";
import { motion } from "motion/react";

export type StageId =
  | "observation"
  | "interpretation"
  | "biblical-theology"
  | "systematic-theology"
  | "application"
  | "teaching"
  | "reasoning-trail";

interface ExegesisStage {
  id: StageId;
  stageNumber: number;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
}

const STAGES: ExegesisStage[] = [
  { id: "observation", stageNumber: 1, title: "Observation", subtitle: "Structure, Keywords, Context & Languages", icon: Eye, color: "border-blue-600 text-blue-900 bg-blue-50" },
  { id: "interpretation", stageNumber: 2, title: "Interpretation", subtitle: "Authorial Intent, Meaning & Historical Views", icon: Compass, color: "border-emerald-600 text-emerald-900 bg-emerald-50" },
  { id: "biblical-theology", stageNumber: 3, title: "Biblical Theology", subtitle: "Canonical Timeline, FCF & Gospel Connection", icon: GitBranch, color: "border-amber-600 text-amber-900 bg-amber-50" },
  { id: "systematic-theology", stageNumber: 4, title: "Systematic Theology", subtitle: "Doctrines, Attributes & Confessional Links", icon: Layers, color: "border-[#141414] text-[#141414] bg-slate-100" },
  { id: "application", stageNumber: 5, title: "Application", subtitle: "Mind, Heart, Hands, Church & Mission", icon: Heart, color: "border-rose-600 text-rose-900 bg-rose-50" },
  { id: "teaching", stageNumber: 6, title: "Teaching & Ministry", subtitle: "Big Idea, Sermon Aim & Common Pitfalls", icon: Feather, color: "border-purple-600 text-purple-900 bg-purple-50" },
  { id: "reasoning-trail", stageNumber: 7, title: "Reasoning Trail", subtitle: "Transparent Step-by-Step Interpretive Proof", icon: Sparkles, color: "border-indigo-600 text-indigo-900 bg-indigo-50" },
];

export default function ProgressiveExegesisPlatform() {
  const [activeStage, setActiveStage] = useState<StageId>("observation");
  const [showAdvancedLanguages, setShowAdvancedLanguages] = useState<boolean>(false);
  const [activeTraditionTab, setActiveTraditionTab] = useState<"Reformation" | "Early Church" | "Medieval" | "Modern">("Reformation");

  return (
    <div className="space-y-6 font-sans" id="progressive-exegesis-platform">
      
      {/* Platform Header */}
      <div className="bg-[#141414] text-white rounded-2xl p-6 shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-mono text-[10px] font-bold uppercase rounded">
              7-STAGE PROGRESSIVE PIPELINE
            </span>
            <span className="text-xs text-slate-400 font-mono">Professional IBSM Interpretation Platform</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
            Inductive Exegesis & Hermeneutics Engine
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Progressively move from raw observation to authorial intent, canonical redemptive theology, systematic confessions, personal application, and homiletical teaching.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowAdvancedLanguages(!showAdvancedLanguages)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              showAdvancedLanguages
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {showAdvancedLanguages ? "Advanced Languages: Active" : "Enable Original Languages (Greek/Hebrew)"}
          </button>
        </div>
      </div>

      {/* 7-Stage Workflow Navigation Bar */}
      <div className="bg-white border-2 border-[#141414] rounded-2xl p-2 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-[900px]">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStage(s.id)}
                className={`flex-1 p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  isActive
                    ? `${s.color} border-2 shadow-xs ring-1 ring-slate-400`
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">
                    Stage {s.stageNumber}
                  </span>
                  <Icon className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs font-serif leading-tight">{s.title}</h5>
                <span className="text-[9px] font-sans opacity-75 line-clamp-1">{s.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STAGE 1: OBSERVATION */}
      {activeStage === "observation" && (
        <div className="bg-white border border-slate-300 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
                Stage 1: Observation
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                Passage Identity, Literary Analysis & Grammar
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Hebrews 7:1-28 / Genesis 14:18-20</span>
          </div>

          {/* 1. Passage Identity */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-700" />
              1. Passage Identity & Redemptive-Historical Setting
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-500">Book & Unit</span>
                <p className="font-semibold text-slate-900">Hebrews 7:1-28 (Unit: Superiority of Christ's Priesthood)</p>
              </div>

              <div className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-500">Covenant & Genre</span>
                <p className="font-semibold text-slate-900">New Covenant / Epistle (Sermonic Exhortation & Exposition)</p>
              </div>

              <div className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-500">Speaker & Audience</span>
                <p className="font-semibold text-slate-900">Author of Hebrews → Persecuted 1st-Century Jewish Believers</p>
              </div>
            </div>
          </div>

          {/* 2. Literary Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3 bg-white border border-slate-200 p-5 rounded-xl">
              <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-700" />
                Structural Laws & Grammar Flow
              </h4>

              <div className="space-y-2 font-mono text-[11px] text-slate-800">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="font-bold text-blue-900">Repeated Terms:</span> King of Righteousness, King of Peace, Priest forever, Oath, Better Covenant, Save to Uttermost.
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="font-bold text-blue-900">Contrasts:</span> Mortal Levitical Priests vs. Eternal Indestructible Priest; Fleshly Requirement vs. Power of Indestructible Life.
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="font-bold text-blue-900">Cause & Effect:</span> Because Jesus continues forever → He holds His priesthood permanently → Therefore He saves completely.
                </div>
              </div>
            </div>

            {/* Advanced Original Languages Tab */}
            {showAdvancedLanguages ? (
              <div className="space-y-3 bg-purple-50/60 border border-purple-200 p-5 rounded-xl">
                <h4 className="font-serif text-sm font-bold text-purple-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-700" />
                  Original Languages (Greek / Hebrew Syntax)
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <span className="font-mono font-bold text-purple-900">zoē akatalytos (ζωή ἀκατάλυτος) - Heb 7:16</span>
                    <p className="text-slate-700 mt-1">"Indestructible life" — Alpha privative (a-) + katalyo (to dissolve). Life that cannot be broken down by death or time.</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <span className="font-mono font-bold text-purple-900">eis to panteles (εἰς τὸ παντελές) - Heb 7:25</span>
                    <p className="text-slate-700 mt-1">"To the uttermost" — Adverbial phrase indicating complete duration, ultimate extent, and absolute perfection.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-300 p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-2">
                <BookOpen className="w-8 h-8 text-slate-400" />
                <h5 className="font-serif font-bold text-slate-700">Original Languages View (Advanced)</h5>
                <p className="text-slate-500 max-w-sm text-[11px]">
                  Click the button at the top to inspect Greek (SBLGNT) and Hebrew (BHS) syntax, semantic range, and textual variants.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STAGE 2: INTERPRETATION */}
      {activeStage === "interpretation" && (
        <div className="bg-white border border-slate-300 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                Stage 2: Interpretation
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                Exegetical Analysis, Authorial & Divine Intent
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                AI Confidence: ★★★★★ Strong
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2 bg-emerald-50/40 border border-emerald-200 p-4 rounded-xl">
              <span className="font-bold uppercase text-emerald-950">Content & Meaning (What Happened & Means)</span>
              <p className="text-slate-800 leading-relaxed">
                Melchizedek met Abram, blessed him, and received tithes. The author interprets Genesis's silence regarding Melchizedek's genealogy as a divine typology representing an eternal priesthood unattached to Aaronic descent.
              </p>
            </div>

            <div className="space-y-2 bg-emerald-50/40 border border-emerald-200 p-4 rounded-xl">
              <span className="font-bold uppercase text-emerald-950">Authorial Intent (Why Author Wrote It)</span>
              <p className="text-slate-800 leading-relaxed">
                To convince 1st-century Jewish Christians that reverting to Levitical sacrifices under persecution is a return to an imperfect, obsolete system superseded by Christ.
              </p>
            </div>
          </div>

          {/* Historical Views & Alternative Traditions */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-700" />
              Interpretive Evaluation Across Historical Traditions
            </h4>

            <div className="flex gap-2 border-b pb-2">
              {(["Reformation", "Early Church", "Medieval", "Modern"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTraditionTab(tab)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTraditionTab === tab
                      ? "bg-emerald-800 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-xs leading-relaxed text-slate-800">
              {activeTraditionTab === "Reformation" && (
                <p><strong>Reformation View (Calvin, Luther, Owen):</strong> Melchizedek is a historical Canaanite king-priest serving as a pre-incarnate type (not a christophany) prefiguring Christ's twofold office as King and High Priest.</p>
              )}
              {activeTraditionTab === "Early Church" && (
                <p><strong>Early Church View (Chrysostom, Origen, Jerome):</strong> Emphasized Melchizedek's offering of bread and wine as a prophetic type of the Eucharist and Christ's perpetual priesthood.</p>
              )}
              {activeTraditionTab === "Medieval" && (
                <p><strong>Medieval View (Thomas Aquinas):</strong> Structured Melchizedek's priesthood as establishing the sacramental hierarchy, superior to Levitical animal sacrifices.</p>
              )}
              {activeTraditionTab === "Modern" && (
                <p><strong>Modern Evangelical & Academic View:</strong> Emphasizes redemptive-historical typology and canonical intertextuality connecting Gen 14, Ps 110, and Heb 7.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: BIBLICAL THEOLOGY */}
      {activeStage === "biblical-theology" && (
        <div className="bg-white border border-slate-300 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                Stage 3: Biblical Theology
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                Canonical Development, FCF & Gospel Connection
              </h3>
            </div>
            <span className="text-xs text-amber-800 font-mono font-bold">Creation → Fall → Israel → Christ → Church → New Creation</span>
          </div>

          {/* Fallen Condition Focus */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-950">
              Fallen Condition Focus (Bryan Chapell)
            </span>
            <p className="text-xs font-serif text-amber-900 italic">
              "Human tendency to seek spiritual security in fragile human performance, legalistic ritual, or mortal mediators, resulting in spiritual weariness and fear of condemnation."
            </p>
          </div>

          {/* Redemptive-Historical Progress Timeline */}
          <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-amber-700" />
              Canonical Progress of Redemption Timeline
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="block font-bold text-amber-900 text-[10px]">CREATION</span>
                <span className="text-[10px] text-slate-600">Eden Priest-King</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="block font-bold text-amber-900 text-[10px]">FALL</span>
                <span className="text-[10px] text-slate-600">Sacrificial Need</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="block font-bold text-amber-900 text-[10px]">ISRAEL</span>
                <span className="text-[10px] text-slate-600">Melchizedek & Aaron</span>
              </div>
              <div className="bg-amber-400 p-2.5 rounded border border-amber-500 font-bold text-slate-950">
                <span className="block text-[10px]">CHRIST</span>
                <span className="text-[10px]">Eternal Priest</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="block font-bold text-amber-900 text-[10px]">CHURCH</span>
                <span className="text-[10px] text-slate-600">Royal Priesthood</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="block font-bold text-amber-900 text-[10px]">NEW CREATION</span>
                <span className="text-[10px] text-slate-600">Eternal Fellowship</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 4: SYSTEMATIC THEOLOGY */}
      {activeStage === "systematic-theology" && (
        <div className="bg-white border border-slate-300 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300 uppercase">
                Stage 4: Systematic Theology
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                Doctrines, Attributes of God & Confessional Links
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold uppercase text-slate-900 block border-b pb-1">Core Doctrines</span>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Christology:</strong> Twofold office of King and Priest.</li>
                <li>• <strong>Soteriology:</strong> Complete & eternal salvation (*eis to panteles*).</li>
                <li>• <strong>Pneumatology:</strong> Seal of the divine oath.</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold uppercase text-slate-900 block border-b pb-1">Attributes of God</span>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Immutability:</strong> God's unchangeable oath.</li>
                <li>• <strong>Sovereignty:</strong> El Elyon, creator of heaven and earth.</li>
                <li>• <strong>Faithfulness:</strong> Perpetually upholding the covenant.</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold uppercase text-slate-900 block border-b pb-1">Confessional Links</span>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>WCF VIII.1-3:</strong> Of Christ the Mediator.</li>
                <li>• <strong>1689 LBCF 8.1:</strong> Eternal Mediator & Priest.</li>
                <li>• <strong>Heidelberg Q&A 31:</strong> Why called Christ (Anointed One)?</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 5: APPLICATION */}
      {activeStage === "application" && (
        <div className="bg-white border border-slate-300 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 uppercase">
                Stage 5: Practical Application
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                Mind, Heart, Hands, Church & Mission
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 space-y-1">
              <span className="font-bold text-rose-950 uppercase block">🧠 MIND (Truth to Believe)</span>
              <p className="text-slate-800">Believe that Christ's priesthood is permanent and His intercession for you right now can never fail.</p>
            </div>

            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 space-y-1">
              <span className="font-bold text-rose-950 uppercase block">❤️ HEART (Affections to Cultivate)</span>
              <p className="text-slate-800">Cultivate deep gratitude, freedom from guilt, and bold joy when approaching God in prayer.</p>
            </div>

            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 space-y-1">
              <span className="font-bold text-rose-950 uppercase block">👐 HANDS (Actions to Obey)</span>
              <p className="text-slate-800">Draw near to God daily in prayer and surrender legalistic self-reliance and fear of performance.</p>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 6: TEACHING */}
      {activeStage === "teaching" && (
        <div className="bg-white border border-slate-300 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 uppercase">
                Stage 6: Teaching & Ministry Use
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                Big Idea, Sermon Aim & Common Pitfalls
              </h3>
            </div>
          </div>

          <div className="bg-purple-950 text-white p-5 rounded-xl space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
              The Big Idea (Main Takeaway)
            </span>
            <p className="font-serif text-base font-bold leading-relaxed">
              "Because Jesus lives forever as your indestructible High Priest, you can draw near to God with complete confidence every single day."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase block">Common Pitfalls to Avoid</span>
              <ul className="space-y-1 text-slate-700">
                <li>• ❌ <strong>Moralistic Reading:</strong> Turning Melchizedek into a lesson on tithing rather than a revelation of Christ.</li>
                <li>• ❌ <strong>Christless Allegory:</strong> Speculating on unrevealed details of Melchizedek's lineage.</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase block">Discussion Questions for Small Groups</span>
              <ul className="space-y-1 text-slate-700">
                <li>1. Why is it comforting that Jesus' priesthood is based on an "indestructible life"?</li>
                <li>2. How does Christ's continuous intercession change how you face temptation?</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 7: REASONING TRAIL */}
      {activeStage === "reasoning-trail" && (
        <div className="bg-white border border-slate-300 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Stage 7: Transparent Reasoning Trail
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                Step-by-Step Derivation of Interpretive Conclusions
              </h3>
            </div>
            <span className="text-xs text-indigo-900 font-mono font-bold">Discipleship & Hermeneutical Transparency</span>
          </div>

          <div className="space-y-4">
            {[
              {
                step: "1. Textual Observation",
                text: "Genesis 14:18-20 records Abram paying tithes to Melchizedek. Hebrews 7:3 notes Melchizedek has no recorded genealogy in Genesis.",
                badge: "Observation"
              },
              {
                step: "2. Exegetical Implication",
                text: "The silence of Genesis is typologically inspired to portray an unending priesthood superior to Abraham and Levi.",
                badge: "Interpretation"
              },
              {
                step: "3. Theological Synthesis",
                text: "Psalm 110:4 confirms Christ was sworn by divine oath to be a priest forever after Melchizedek's order based on an indestructible life.",
                badge: "Biblical Theology"
              },
              {
                step: "4. Practical Application",
                text: "Therefore, believers have complete, unshakeable assurance that Christ's intercession for them will never fail or end.",
                badge: "Application"
              }
            ].map((trail, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-indigo-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div className="space-y-1 flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-900 font-serif">{trail.step}</h5>
                    <span className="text-[10px] font-mono uppercase bg-indigo-100 text-indigo-900 font-bold px-2 py-0.5 rounded">
                      {trail.badge}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{trail.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
