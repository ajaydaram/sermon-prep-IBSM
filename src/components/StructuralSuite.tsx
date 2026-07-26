import React, { useState } from "react";
import { Info, HelpCircle, RefreshCw, Layers, CheckCircle2, ChevronRight, FileText, Send } from "lucide-react";
import { motion } from "motion/react";
import { StructuralAnalysis } from "../types";

const defaultPassageRef = "Romans 5:12-21";
const defaultPassageText = "Therefore, just as through one man sin entered into the world, and death through sin, and so death spread to all men, because all sinned— for until the Law sin was in the world, but sin is not imputed when there is no law. Nevertheless death reigned from Adam until Moses, even over those who had not sinned in the likeness of the offense of Adam, who is a type of Him who was to come. But the free gift is not like the transgression. For if by the transgression of the one the many died, much more did the grace of God and the gift by the grace of the one Man, Jesus Christ, abound to the many.";

const sampleRomans1 = {
  ref: "Romans 1:18-32",
  text: "For the wrath of God is revealed from heaven against all ungodliness and unrighteousness of men who suppress the truth in unrighteousness, because that which is known about God is evident within them; for God made it evident to them. For since the creation of the world His invisible attributes, His eternal power and divine nature, have been clearly seen, being understood through what has been made, so that they are without excuse. For even though they knew God, they did not honor Him as God or give thanks, but they became futile in their speculations, and their foolish heart was darkened."
};

export default function StructuralSuite() {
  const [passageReference, setPassageReference] = useState(defaultPassageRef);
  const [passageText, setPassageText] = useState(defaultPassageText);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<StructuralAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!passageReference.trim() || !passageText.trim()) return;
    setLoading(true);
    setAnalysis(null);

    try {
      const res = await fetch("/api/gemini/analyze-structural-laws", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passageReference, passageText }),
      });

      if (!res.ok) {
        throw new Error("Failed to analyze passage structure");
      }

      const data = await res.json();
      setAnalysis(data);
    } catch (err: any) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePreload = (type: "romans5" | "romans1") => {
    if (type === "romans5") {
      setPassageReference(defaultPassageRef);
      setPassageText(defaultPassageText);
    } else {
      setPassageReference(sampleRomans1.ref);
      setPassageText(sampleRomans1.text);
    }
    setAnalysis(null);
  };

  return (
    <div className="space-y-6" id="structural-suite-root">
      {/* Educational banner */}
      <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-5 flex flex-col md:flex-row items-start gap-4">
        <div className="p-2.5 bg-sky-100 rounded-lg text-sky-800 shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-serif text-base font-semibold text-sky-950">
            Structural Laws Analysis (Bite 08)
          </h3>
          <p className="text-xs text-sky-800 leading-relaxed">
            Thought patterns inside biblical books are carried forward by 17 primary "Laws of Structure". 
            Examples include <strong>Causation</strong> (cause-to-effect), <strong>Contrast</strong> (comparing opposites, key words like "but"), <strong>Repetition</strong>, and <strong>Particularization</strong> (general-to-specific). Use this tool to auto-detect structural mechanics in any passage of scripture.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Input */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="font-serif text-base font-semibold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                Scripture Input
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreload("romans5")}
                  className="text-[10px] text-sky-700 hover:text-sky-800 font-semibold transition-colors"
                >
                  Romans 5
                </button>
                <span className="text-slate-300 text-xs">|</span>
                <button
                  onClick={() => handlePreload("romans1")}
                  className="text-[10px] text-sky-700 hover:text-sky-800 font-semibold transition-colors"
                >
                  Romans 1
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Passage Reference
                </label>
                <input
                  type="text"
                  value={passageReference}
                  onChange={(e) => setPassageReference(e.target.value)}
                  className="w-full text-xs font-mono border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-sky-700"
                  placeholder="e.g. Romans 5:12-21"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Passage Text (NASB preferred)
                </label>
                <textarea
                  value={passageText}
                  onChange={(e) => setPassageText(e.target.value)}
                  rows={8}
                  className="w-full text-xs border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-sky-700 leading-relaxed font-sans"
                  placeholder="Paste the passage of scripture here..."
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !passageReference.trim() || !passageText.trim()}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing thought connections...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Analyze Structural Laws
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right column: Results */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm min-h-[500px] flex flex-col">
            <h4 className="font-serif text-base font-semibold text-slate-800 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-700" />
              Detected Thought Relationships
            </h4>

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <RefreshCw className="w-8 h-8 text-sky-700 animate-spin" />
                <p className="text-sm font-serif italic text-slate-500">
                  "Parsing structural signposts, looking for causal relationships, contrasts, and repetition lines..."
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  — Robert A. Traina Methodical Bot
                </p>
              </div>
            )}

            {!loading && !analysis && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 border border-dashed border-gray-200 rounded-lg">
                <HelpCircle className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-xs italic leading-relaxed max-w-xs">
                  Provide a passage and click "Analyze Structural Laws" to examine how the biblical author constructed their core thought.
                </p>
              </div>
            )}

            {!loading && analysis && (
              <div className="space-y-5 flex-1 flex flex-col">
                {/* Structural summary block */}
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-slate-400">
                    Exegetical Structure Overview
                  </span>
                  <p className="text-slate-700 leading-relaxed font-serif">
                    {analysis.summaryOfStructure}
                  </p>
                </div>

                {/* Laws detected grid */}
                <div className="space-y-4 overflow-y-auto max-h-[380px] pr-1">
                  <span className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                    Operating Laws of Composition
                  </span>
                  
                  {analysis.detectedLaws && analysis.detectedLaws.map((law, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-150 rounded-xl p-4 space-y-2.5 text-xs hover:border-gray-300 transition-colors bg-white shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-slate-800 text-sm flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-sky-700" />
                          {law.lawName}
                        </span>
                        <span className="font-mono text-[9px] uppercase font-bold text-slate-400">
                          {law.keyVerses}
                        </span>
                      </div>

                      {/* Evidence block */}
                      <div className="bg-sky-50/20 border border-sky-100/50 p-2.5 rounded-lg text-sky-950 font-serif font-semibold italic">
                        "{law.evidenceText}"
                      </div>

                      <p className="text-slate-600 leading-relaxed">
                        <strong>Explanation:</strong> {law.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
