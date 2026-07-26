import React, { useState } from "react";
import { Info, HelpCircle, RefreshCw, BookOpen, Send, FileText, Compass, MapPin, Calendar, User, Bookmark, Lock, Unlock, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";
import { ConsultationInsights } from "../types";
import { useObservations } from "../context/ObservationContext";

const defaultBookOptions = [
  "Second Timothy",
  "Haggai",
  "Jonah",
  "Philemon",
  "Daniel",
  "Nehemiah"
];

export default function IBSMConsultant({ onNavigateToObservation }: { onNavigateToObservation?: () => void }) {
  const [selectedBook, setSelectedBook] = useState("Second Timothy");
  const [customBook, setCustomBook] = useState("");
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<ConsultationInsights | null>(null);

  const {
    observations,
    minRequiredObservations,
    bypassGate,
    setBypassGate,
    isConsultationUnlocked,
    addObservation,
  } = useObservations();

  const handleConsult = async (book: string) => {
    if (!isConsultationUnlocked) {
      alert(`Hermeneutic Guardrail Active: Log at least ${minRequiredObservations} observations on raw scripture before secondary consultation!`);
      return;
    }

    const finalBook = book.trim();
    if (!finalBook) return;
    setLoading(true);
    setInsights(null);

    try {
      const res = await fetch("/api/gemini/consultation-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookName: finalBook }),
      });

      if (!res.ok) {
        throw new Error("Failed to consult Bible Dictionary");
      }

      const data = await res.json();
      setInsights(data);
    } catch (err: any) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFillSampleObservations = () => {
    const sampleObs = [
      "The passage opens with the adversative conjunction 'but'.",
      "'Receive' is a future active indicative verb denoting imminent promise.",
      "The plural pronoun 'you' specifies the apostolic group as recipients.",
      "The coming of the Holy Spirit establishes a temporal condition ('when').",
      "Geographical progression moves outward: Jerusalem, Judea, Samaria, earth.",
      "'Witnesses' is modified by the possessive pronoun 'My'.",
      "The preposition 'in' governs all four geographical areas.",
      "The Holy Spirit is designated by the adjective 'Holy'.",
      "'Power' is the direct object of the verb 'receive'.",
      "'Remotest part' indicates maximum geographical distance."
    ];
    sampleObs.forEach((obs) => addObservation(obs));
  };

  return (
    <div className="space-y-6" id="ibsm-consultant-root">
      {/* Structural Pedagogy Gate Header Banner */}
      {!isConsultationUnlocked ? (
        <div className="bg-[#141414] text-[#E4E3E0] rounded-xl p-5 border border-red-900/50 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-red-900/60 text-red-200 rounded-lg shrink-0 border border-red-700">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] uppercase tracking-wider font-bold bg-red-800 text-white px-2 py-0.5 rounded">
                    Hermeneutic Guardrail Active
                  </span>
                  <span className="text-xs font-mono text-slate-300">IBSM Rule 5: Observation Before Consultation</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Consultation Desk Restricted (Secondary Sources)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  According to the Inductive Bible Study Method, <strong>Firsthand Observation</strong> must precede secondary consultation (Bible Dictionaries, Commentaries, Study Bibles). Consulting secondary commentaries too early introduces researcher bias and undermines original exegesis.
                </p>
              </div>
            </div>

            <button
              onClick={() => setBypassGate(!bypassGate)}
              className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase border border-slate-600 rounded text-slate-300 hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Instructor Override
            </button>
          </div>

          {/* Progress Bar & Actions */}
          <div className="bg-[#252525] p-4 rounded-lg border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2 space-y-1.5">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-slate-300">Observations Logged Requirement:</span>
                <span className="text-amber-400">{observations.length} / {minRequiredObservations} Logged</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-600">
                <div
                  className="h-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${Math.min((observations.length / minRequiredObservations) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
              <button
                onClick={handleFillSampleObservations}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Auto-Log +10 Exegesis Obs
              </button>
              {onNavigateToObservation && (
                <button
                  onClick={onNavigateToObservation}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  Go to Observation Board
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Unlocked Banner */
        <div className="bg-emerald-950 text-emerald-100 rounded-xl p-4 border border-emerald-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800 text-emerald-100 rounded-lg shrink-0">
              <Unlock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider font-bold bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded">
                Pedagogy Gate Cleared
              </span>
              <h3 className="font-serif text-sm font-bold text-white mt-0.5">
                Firsthand Exegesis Requirement Met ({observations.length} Observations Logged)
              </h3>
              <p className="text-xs text-emerald-200/80">
                Secondary sources are unlocked. You may now compare your firsthand observations against scholarly Bible dictionaries and commentaries.
              </p>
            </div>
          </div>

          {bypassGate && (
            <button
              onClick={() => setBypassGate(false)}
              className="text-[10px] font-mono text-amber-300 underline hover:text-amber-200 shrink-0"
            >
              Re-enable Gate
            </button>
          )}
        </div>
      )}

      {/* Educational banner */}
      <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-5 flex flex-col md:flex-row items-start gap-4">
        <div className="p-2.5 bg-purple-100 rounded-lg text-purple-800 shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-serif text-base font-semibold text-purple-950">
            Historical & Cultural Consultation (Bite 11 - 13)
          </h3>
          <p className="text-xs text-purple-800 leading-relaxed">
            According to Principle Five (Consultation), the correct hermeneutic order is FIRST the Bible itself, THEN secondary sources like Study Bibles, Concordances, Dictionaries, and Commentaries. Use this Consultation Desk to gather introductory background material for your written arguments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Select Book */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-4">
            <h4 className="font-serif text-base font-semibold text-slate-800 border-b border-gray-100 pb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-purple-700" />
                Consultation Desk
              </span>
              {!isConsultationUnlocked && <Lock className="w-4 h-4 text-red-600" />}
            </h4>

            {/* Default Quick select options */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Syllabus Study Books
              </label>
              <div className="grid grid-cols-2 gap-2">
                {defaultBookOptions.map((book) => (
                  <button
                    key={book}
                    onClick={() => {
                      setSelectedBook(book);
                      setCustomBook("");
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-left truncate cursor-pointer ${
                      selectedBook === book && !customBook
                        ? "bg-purple-50 border-purple-300 text-purple-950"
                        : "border-gray-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {book}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Book search input */}
            <div className="space-y-1.5 pt-2 border-t border-gray-50">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Or Consult Any Other Biblical Book
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customBook}
                  onChange={(e) => {
                    setCustomBook(e.target.value);
                    setSelectedBook("");
                  }}
                  className="flex-1 text-xs border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-700"
                  placeholder="e.g. Ephesians, Philemon, Mark..."
                />
              </div>
            </div>

            <button
              onClick={() => handleConsult(customBook || selectedBook)}
              disabled={loading || (!selectedBook && !customBook.trim())}
              className={`w-full text-xs font-semibold py-2.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                isConsultationUnlocked
                  ? "bg-slate-800 hover:bg-slate-900 text-white"
                  : "bg-slate-300 text-slate-600 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Consulting Bible Dictionary...
                </>
              ) : !isConsultationUnlocked ? (
                <>
                  <Lock className="w-4 h-4 text-red-600" />
                  Locked: Log {minRequiredObservations - observations.length} More Obs
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Consult Scholarly Library
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Scholarship Details */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm min-h-[500px] flex flex-col">
            <h4 className="font-serif text-base font-semibold text-slate-800 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-700" />
              Introductory Consultation Data
            </h4>

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <RefreshCw className="w-8 h-8 text-purple-700 animate-spin" />
                <p className="text-sm font-serif italic text-slate-500">
                  "Sifting through internal and external evidence. Pulling historical context, recipients, occasion and purpose statement..."
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  — Populi Library Connector
                </p>
              </div>
            )}

            {!loading && !insights && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 border border-dashed border-gray-200 rounded-lg">
                <HelpCircle className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-xs italic leading-relaxed max-w-xs">
                  Select or type a biblical book on the left, then consult our academic library to fetch authentic background exegesis.
                </p>
              </div>
            )}

            {!loading && insights && (
              <div className="space-y-6 flex-1">
                {/* Book header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-800">
                      {insights.bookName.toUpperCase()} INTRODUCTORY MATERIAL
                    </h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                      Category: {insights.genre}
                    </p>
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Author */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-600" />
                      Author & Evidence
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 border border-slate-100 rounded-lg p-3">
                      {insights.author}
                    </p>
                  </div>

                  {/* Date of Writing */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      Date of Writing
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 border border-slate-100 rounded-lg p-3">
                      {insights.dateOfWriting}
                    </p>
                  </div>

                  {/* Recipients */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-purple-600" />
                      Audience & Recipients
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 border border-slate-100 rounded-lg p-3">
                      {insights.recipients}
                    </p>
                  </div>

                  {/* Historical Setting */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-600" />
                      Historical Setting
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 border border-slate-100 rounded-lg p-3">
                      {insights.historicalSetting}
                    </p>
                  </div>
                </div>

                {/* Full-width sections */}
                {/* Occasion and purpose */}
                <div className="space-y-1 border-t border-slate-100 pt-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Occasion and Purpose
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 border border-slate-100 rounded-lg p-3.5">
                    {insights.occasionAndPurpose}
                  </p>
                </div>

                {/* Central Theme */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Central Theme & Exegetical Message
                  </span>
                  <p className="text-xs text-purple-950 font-serif font-bold italic leading-relaxed bg-purple-50/30 border border-purple-100/50 rounded-lg p-3.5">
                    "{insights.keyThemes}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
