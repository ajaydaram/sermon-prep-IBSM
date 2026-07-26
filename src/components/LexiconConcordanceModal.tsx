import React, { useState, useEffect } from "react";
import { Search, BookOpen, X, Sparkles, RefreshCw, Layers, ArrowRight, BookMarked, Hash, Compass, Info, Check } from "lucide-react";
import { LexiconEntry } from "../types";
import { PRELOADED_LEXICON } from "../data/lexiconData";

interface LexiconConcordanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTerm?: string;
  contextPassage?: string;
}

export default function LexiconConcordanceModal({
  isOpen,
  onClose,
  initialTerm = "power",
  contextPassage = "Acts 1:8",
}: LexiconConcordanceModalProps) {
  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [activeEntry, setActiveEntry] = useState<LexiconEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const normalized = (initialTerm || "power").toLowerCase().replace(/[^a-z0-9]/g, "");
      if (normalized && PRELOADED_LEXICON[normalized]) {
        setActiveEntry(PRELOADED_LEXICON[normalized]);
        setSearchTerm(initialTerm);
      } else if (initialTerm) {
        setSearchTerm(initialTerm);
        handleFetchLexicon(initialTerm);
      } else {
        setActiveEntry(PRELOADED_LEXICON["power"]);
      }
    }
  }, [isOpen, initialTerm]);

  const handleSearch = (termToSearch: string) => {
    const trimmed = termToSearch.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (PRELOADED_LEXICON[normalized]) {
      setActiveEntry(PRELOADED_LEXICON[normalized]);
      setError(null);
    } else {
      handleFetchLexicon(trimmed);
    }
  };

  const handleFetchLexicon = async (termToQuery: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/lexicon/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term: termToQuery, contextPassage }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch lexicon definition.");
      }

      const data: LexiconEntry = await res.json();
      setActiveEntry(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Lexicon lookup failed. Check your search term.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#E4E3E0] border border-[#141414] rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#141414] text-[#E4E3E0] p-4 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E4E3E0] text-[#141414] rounded-lg">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase font-bold tracking-wider bg-[#E4E3E0]/20 text-[#E4E3E0] px-2 py-0.5 rounded">
                  Open-Source Concordance & Lexicon
                </span>
                <span className="text-xs text-[#E4E3E0]/60 font-mono">Strong's & Mounce Dictionary</span>
              </div>
              <h3 className="font-serif text-lg font-bold leading-snug">
                Greek & Hebrew Exegetical Lexicon
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#E4E3E0]/20 rounded-lg text-[#E4E3E0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Quick Term Chips Bar */}
        <div className="bg-[#D4D3D0] border-b border-[#141414]/20 p-4 px-6 flex flex-col gap-3 shrink-0">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch(searchTerm);
                }}
                placeholder="Search English word (e.g. power, witness, spirit, faith) or Strong's No. (G1411)..."
                className="w-full text-xs font-mono bg-white border border-[#141414]/30 rounded-xl py-2.5 pl-9 pr-4 text-[#141414] placeholder:text-[#141414]/40 focus:outline-none focus:ring-2 focus:ring-[#141414]"
              />
              <Search className="w-4 h-4 text-[#141414]/50 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              onClick={() => handleSearch(searchTerm)}
              disabled={loading || !searchTerm.trim()}
              className="bg-[#141414] hover:bg-[#252525] text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Lookup Term
            </button>
          </div>

          {/* Quick Preloaded Term Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">Preloaded Canon Words:</span>
            {Object.keys(PRELOADED_LEXICON).map((key) => {
              const entry = PRELOADED_LEXICON[key];
              const isActive = activeEntry?.strongsNumber === entry.strongsNumber;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSearchTerm(key);
                    setActiveEntry(entry);
                    setError(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? "bg-[#141414] text-[#E4E3E0] border-[#141414] font-bold"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <span className="capitalize">{key}</span>
                  <span className="text-[9px] font-mono opacity-70">({entry.strongsNumber})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#E4E3E0]">
          
          {loading && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#141414] animate-spin" />
              <p className="font-serif italic text-sm text-slate-700">
                Searching Strong's Greek/Hebrew Concordance & Mounce Exegetical Dictionary...
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-mono">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && activeEntry && (
            <div className="space-y-6">
              
              {/* Primary Lemma Hero Banner */}
              <div className="bg-white border border-[#141414]/20 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-mono font-bold rounded-md">
                      {activeEntry.strongsNumber}
                    </span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md ${
                      activeEntry.language === "Greek"
                        ? "bg-blue-100 text-blue-900 border border-blue-200"
                        : "bg-amber-100 text-amber-900 border border-amber-200"
                    }`}>
                      {activeEntry.language} Lexicon
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {activeEntry.partOfSpeech}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-4 pt-1">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-wide">
                      {activeEntry.lemma}
                    </h2>
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-lg font-bold text-slate-700 italic">
                        "{activeEntry.transliteration}"
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        [{activeEntry.pronunciation}]
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-serif text-slate-800 italic pt-1 border-t border-slate-100">
                    "{activeEntry.gloss}"
                  </p>
                </div>

                {/* Occurrence Counter */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center shrink-0 min-w-[140px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Canon Occurrences
                  </span>
                  <span className="text-3xl font-serif font-bold text-[#141414]">
                    {activeEntry.canonFrequency}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    times across OT/NT
                  </span>
                </div>
              </div>

              {/* Grid: Semantic Range & Canon Frequency Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Semantic Range (8 cols) */}
                <div className="md:col-span-8 bg-white border border-[#141414]/20 rounded-2xl p-5 shadow-sm space-y-4">
                  <h4 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-700" />
                    Semantic Range & Contextual Nuances
                  </h4>

                  <div className="space-y-3">
                    {activeEntry.semanticRange.map((sem, idx) => (
                      <div key={idx} className="bg-slate-50/70 border border-slate-150 rounded-xl p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 font-serif">
                            {idx + 1}. {sem.definition}
                          </span>
                          <div className="flex gap-1">
                            {sem.sampleReferences.map((ref) => (
                              <span key={ref} className="text-[9px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">
                                {ref}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed italic pl-3 border-l-2 border-purple-400">
                          {sem.nuance}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distribution Breakdown (4 cols) */}
                <div className="md:col-span-4 bg-white border border-[#141414]/20 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col">
                  <h4 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-emerald-700" />
                    Canonical Distribution
                  </h4>

                  <div className="space-y-3 flex-1 justify-center">
                    {activeEntry.frequencyBreakdown.map((sec, idx) => {
                      const maxCount = Math.max(...activeEntry.frequencyBreakdown.map((f) => f.count)) || 1;
                      const percentage = Math.round((sec.count / maxCount) * 100);

                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-medium text-slate-700">
                            <span>{sec.section}</span>
                            <span className="font-mono font-bold text-slate-900">{sec.count}x</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div
                              className="h-full bg-slate-800 rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(percentage, 8)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Concordance Verse Occurrences Browser */}
              <div className="bg-white border border-[#141414]/20 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-700" />
                      Concordance Passages ({activeEntry.concordanceEntries.length} Sample References)
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Key occurrence verses where "{activeEntry.lemma}" ({activeEntry.strongsNumber}) appears
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    Strong's {activeEntry.strongsNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeEntry.concordanceEntries.map((verse, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 space-y-1.5 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {verse.reference}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Occurrence #{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed font-sans">
                        "{verse.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#D4D3D0] border-t border-[#141414]/20 p-3 px-6 flex justify-between items-center text-[10px] font-mono text-slate-600 shrink-0">
          <span>BS510 Inductive Bible Study Method • Strong's Concordance Module</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#141414] text-white rounded-lg font-sans text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Lexicon
          </button>
        </div>

      </div>
    </div>
  );
}
