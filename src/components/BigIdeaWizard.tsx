import React, { useState } from "react";
import { Info, HelpCircle, RefreshCw, CheckCircle, AlertTriangle, ArrowRight, BookOpen, PenTool } from "lucide-react";
import { motion } from "motion/react";
import { BigIdeaEvaluation } from "../types";

const defaultPassageRef = "Ephesians 2:8-10";
const sampleSubject = "The basis of a Christian's salvation is";
const sampleComplement = "solely the unearned grace of God received through faith rather than works, so that no person can boast.";

export default function BigIdeaWizard() {
  const [passageReference, setPassageReference] = useState(defaultPassageRef);
  const [subject, setSubject] = useState(sampleSubject);
  const [complement, setComplement] = useState(sampleComplement);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<BigIdeaEvaluation | null>(null);

  const handleAnalyze = async () => {
    if (!passageReference.trim() || !subject.trim() || !complement.trim()) return;
    setLoading(true);
    setEvaluation(null);

    try {
      const res = await fetch("/api/gemini/analyze-big-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passageReference, subject, complement }),
      });

      if (!res.ok) {
        throw new Error("Failed to evaluate the Big Idea");
      }

      const data = await res.json();
      setEvaluation(data);
    } catch (err: any) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePreloadSample = () => {
    setPassageReference(defaultPassageRef);
    setSubject(sampleSubject);
    setComplement(sampleComplement);
    setEvaluation(null);
  };

  return (
    <div className="space-y-6" id="big-idea-wizard-root">
      {/* Educational Header */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 flex flex-col md:flex-row items-start gap-4 shadow-xs">
        <div className="p-2.5 bg-amber-100/80 rounded-lg text-amber-900 shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-serif text-base font-bold text-amber-950">
              Formulating the "Big Idea" (Synthetic Exegesis Method)
            </h3>
            <span className="text-[10px] font-mono font-bold bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded">
              Formula: Subject + Complement
            </span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            In IBSM exegesis, the "Big Idea" is the single-sentence summation of the entire passage. 
            The Subject (<em>"What is the author talking about?"</em>) must be a short phrase (never a single word), and the Complement (<em>"What is the author saying about that subject?"</em>) must directly complete it.
          </p>
          <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-amber-950 font-serif italic gap-2">
            <span>"In Bible study methods, we have many analysts, but few who can synthesize." — Howard Hendricks</span>
            <span className="font-sans font-mono font-bold text-[10px] not-italic bg-white/80 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
              Aim: Complete & Unique (Avoid Too General / Too Narrow)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor wizard */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="font-serif text-base font-semibold text-slate-800 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-emerald-700" />
                Statement Editor
              </h4>
              <button
                onClick={handlePreloadSample}
                className="text-xs text-amber-800 hover:text-amber-900 font-medium transition-colors"
              >
                Preload Ephesians 2:8-10 Sample
              </button>
            </div>

            {/* Passage reference */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Biblical Passage Reference
              </label>
              <input
                type="text"
                value={passageReference}
                onChange={(e) => setPassageReference(e.target.value)}
                className="w-full text-xs font-mono border border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                placeholder="e.g. Ephesians 2:8-10, Philemon 1:1-25"
              />
            </div>

            {/* STEP 1: SUBJECT */}
            <div className="space-y-2 border-t border-gray-50 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-sans font-bold text-xs uppercase text-slate-400 tracking-wider">
                  Step 1: The Subject
                </span>
                <span className="text-[10px] text-slate-400 italic">"What is the author talking about?"</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                The Subject is a short, complete phrase, never a single word. (e.g. ❌ "Salvation" is too short.  "The basis of salvation is..." represents a solid Subject, implying: <em>"What is the basis of salvation?"</em>).
              </p>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
                placeholder="Draft your Subject phrase... e.g., 'The reason for Paul's joy in prison is'"
              />
              {subject.trim() && (
                <div className="bg-slate-50 border border-gray-150 p-2.5 rounded-lg text-[11px] text-slate-600 italic">
                  <strong>Implied Question:</strong> "What is {subject.trim().toLowerCase().replace(/\bis\b|\bare\b$/, "")}?"
                </div>
              )}
            </div>

            {/* STEP 2: COMPLEMENT */}
            <div className="space-y-2 border-t border-gray-50 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-sans font-bold text-xs uppercase text-slate-400 tracking-wider">
                  Step 2: The Complement
                </span>
                <span className="text-[10px] text-slate-400 italic">"What is the author saying about the subject?"</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                The Complement must directly, grammatically, and fully answer the implied question created by your Subject. (e.g. "...God's unearned grace received through faith.")
              </p>
              <textarea
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                rows={3}
                className="w-full text-xs border border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                placeholder="Draft your Complement phrase... e.g., 'the mutual faith and love shown by Philemon toward the church.'"
              />
            </div>

            {/* Compiled Preview */}
            {subject.trim() && complement.trim() && (
              <div className="bg-emerald-50/20 border border-emerald-100 rounded-xl p-4 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-800">
                  Compiled Sentence Preview:
                </span>
                <p className="font-serif text-sm text-slate-800 leading-relaxed font-semibold">
                  {subject.trim()} {complement.trim().charAt(0).toLowerCase() + complement.trim().slice(1)}
                </p>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading || !passageReference.trim() || !subject.trim() || !complement.trim()}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Subject & Complement alignment...
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  Evaluate Big Idea Formula
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI feedback */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm min-h-[580px] flex flex-col">
            <h4 className="font-serif text-base font-semibold text-slate-800 border-b border-gray-100 pb-3 mb-4">
              Rubric Assessment & Score
            </h4>

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <RefreshCw className="w-8 h-8 text-amber-700 animate-spin" />
                <p className="text-sm font-serif italic text-slate-500">
                  "Checking the logical synthesis. Subject and complement must represent a perfect mathematical thought lock."
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  — IBSM Critique Engine
                </p>
              </div>
            )}

            {!loading && !evaluation && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 border border-dashed border-gray-200 rounded-lg">
                <HelpCircle className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-xs italic leading-relaxed max-w-xs">
                  Fill out the Subject and Complement on the left, and click "Evaluate Big Idea Formula" to receive Dr. Shubert's rubric assessment and advice.
                </p>
              </div>
            )}

            {!loading && evaluation && (
              <div className="space-y-5 flex-1 flex flex-col">
                {/* Score badge */}
                <div className="bg-slate-50 border border-gray-150 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Formula Match Score
                    </span>
                    <span className="font-serif text-base font-bold text-slate-800">
                      IBSM Exegetical Grade
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-bold text-emerald-800">
                      {evaluation.score}
                    </span>
                    <span className="text-slate-400 text-xs"> / 100</span>
                  </div>
                </div>

                {/* Analysis breakdown */}
                <div className="space-y-4 flex-1 overflow-y-auto max-h-[360px] pr-1">
                  {/* Subject analysis */}
                  <div className="border border-gray-100 rounded-lg p-3 text-xs space-y-1 bg-slate-50/50">
                    <span className="font-mono font-bold text-[10px] uppercase text-slate-400">
                      Subject Critique
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {evaluation.subjectAnalysis}
                    </p>
                  </div>

                  {/* Question analysis */}
                  <div className="border border-emerald-100 rounded-lg p-3 text-xs space-y-1 bg-emerald-50/20">
                    <span className="font-mono font-bold text-[10px] uppercase text-emerald-800">
                      AI Implied Question Lock
                    </span>
                    <p className="text-emerald-950 font-serif font-semibold italic">
                      "{evaluation.impliedQuestion}"
                    </p>
                  </div>

                  {/* Complement analysis */}
                  <div className="border border-gray-100 rounded-lg p-3 text-xs space-y-1 bg-slate-50/50">
                    <span className="font-mono font-bold text-[10px] uppercase text-slate-400">
                      Complement Critique
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {evaluation.complementAnalysis}
                    </p>
                  </div>

                  {/* Suggestions critique */}
                  <div className="border border-amber-100 rounded-lg p-3.5 text-xs space-y-1.5 bg-amber-50/20 text-amber-900 leading-relaxed">
                    <span className="font-mono font-bold text-[10px] uppercase text-amber-800 block">
                      Professor's Specific Guidance
                    </span>
                    <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                      {evaluation.critiqueAndSuggestions}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
