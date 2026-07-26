import React, { useState } from "react";
import {
  Move,
  Layers,
  Table,
  LayoutGrid,
  Sparkles,
  Info,
  Sliders,
  Maximize2
} from "lucide-react";
import VectorCanvasChart from "./VectorCanvasChart";
import HierarchicalScopeView from "./HierarchicalScopeView";
import DynamicComparisonGrid from "./DynamicComparisonGrid";
import { BookChartData, ChartColumn } from "../types";

// Preloaded 2 Timothy Chart
const preloadTimothy: BookChartData = {
  chartTitle: "BE FAITHFUL (SECOND TIMOTHY)",
  theme: "Charge Timothy to follow Paul, continue to endure suffering, and be faithful to God's Word.",
  columns: [
    {
      id: "col-1",
      title: "Salutation",
      paragraphs: ["Greeting"],
      reference: "1:1-2",
      perspective: "Past",
      tone: "Gratitude"
    },
    {
      id: "col-2",
      title: "Thanksgiving",
      paragraphs: ["Faith Inherited"],
      reference: "1:3-7",
      perspective: "Past",
      tone: "Gratitude"
    },
    {
      id: "col-3",
      title: "Faithful in Suffering",
      subtitle: "Charge & Particulars",
      paragraphs: ["Example (Onesiphorus)", "Image (Soldier, Athlete, Farmer)", "Promise (Endure)"],
      reference: "1:8-2:13",
      perspective: "Present",
      tone: "Encouraging"
    },
    {
      id: "col-4",
      title: "Faithful to Truth",
      subtitle: "Godliness, Right Doctrine & Preach",
      paragraphs: ["Godliness (Honorable vessel)", "Right Doctrine", "Preach the Word"],
      reference: "2:14-4:8",
      perspective: "Present",
      tone: "Concern"
    },
    {
      id: "col-5",
      title: "Remarks",
      paragraphs: ["Requests", "God's Power"],
      reference: "4:9-18",
      perspective: "Future",
      tone: "Command"
    },
    {
      id: "col-6",
      title: "Greeting",
      paragraphs: ["Greetings", "Benediction"],
      reference: "4:19-22",
      perspective: "Future",
      tone: "Command"
    }
  ]
};

export default function VisualChartBuilder() {
  const [activeChartMode, setActiveChartMode] = useState<
    "canvas" | "hierarchical" | "matrix" | "classic"
  >("canvas");

  return (
    <div className="space-y-6 font-sans" id="visual-chart-builder-root">
      {/* Top Interactive Mode Navigation Header */}
      <div className="bg-[#141414] text-white rounded-xl p-5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FEF3C7] text-[#141414] text-[10px] font-mono font-bold uppercase rounded">
              INTERACTIVE VECTOR DIAGRAM CANVAS
            </span>
          </div>
          <h2 className="font-serif text-xl font-bold mt-1 text-white">
            Multi-Dimensional Interactive Charting & Diagrams
          </h2>
          <p className="text-xs text-gray-300 max-w-xl leading-relaxed mt-0.5">
            Arrange vector block containers, toggle between Bird's Eye and Worm's Eye sentence syntax views,
            and construct dynamic comparison matrix grids.
          </p>
        </div>

        {/* View Mode Toggle Switcher */}
        <div className="flex flex-wrap bg-white/10 p-1 rounded-lg border border-white/20 gap-1">
          <button
            onClick={() => setActiveChartMode("canvas")}
            className={`px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 rounded transition-all cursor-pointer ${
              activeChartMode === "canvas"
                ? "bg-white text-[#141414] shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <Move className="w-3.5 h-3.5" />
            <span>1. Vector Diagram Canvas</span>
          </button>

          <button
            onClick={() => setActiveChartMode("hierarchical")}
            className={`px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 rounded transition-all cursor-pointer ${
              activeChartMode === "hierarchical"
                ? "bg-white text-[#141414] shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Hierarchical Scope Zoom</span>
          </button>

          <button
            onClick={() => setActiveChartMode("matrix")}
            className={`px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 rounded transition-all cursor-pointer ${
              activeChartMode === "matrix"
                ? "bg-white text-[#141414] shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>3. Dynamic Comparison Grids</span>
          </button>

          <button
            onClick={() => setActiveChartMode("classic")}
            className={`px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 rounded transition-all cursor-pointer ${
              activeChartMode === "classic"
                ? "bg-white text-[#141414] shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>4. Classic Book Chart</span>
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE MODE */}
      {activeChartMode === "canvas" && <VectorCanvasChart />}

      {activeChartMode === "hierarchical" && <HierarchicalScopeView />}

      {activeChartMode === "matrix" && <DynamicComparisonGrid />}

      {activeChartMode === "classic" && (
        <div className="bg-white border-2 border-[#141414] rounded-xl p-6 shadow-sm space-y-4">
          <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
            <div>
              <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                CLASSIC IBS HORIZONTAL BOOK CHART
              </span>
              <h3 className="font-serif text-lg font-bold text-[#141414]">
                {preloadTimothy.chartTitle}
              </h3>
            </div>
            <span className="font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded font-bold">
              Rubric Compliant (Bite 09 Structure)
            </span>
          </div>

          <p className="text-xs text-slate-600 italic">
            "{preloadTimothy.theme}"
          </p>

          <div className="overflow-x-auto pb-4 scrollbar-thin">
            <div className="flex gap-4 min-w-[900px] border border-slate-200 rounded-xl bg-slate-50 p-4">
              {preloadTimothy.columns.map((col) => (
                <div
                  key={col.id}
                  className="flex-1 min-w-[140px] border border-[#141414]/30 rounded-lg p-3 bg-white shadow-xs flex flex-col justify-between min-h-[260px]"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] font-bold uppercase text-slate-500 block">
                      {col.reference}
                    </span>
                    <div>
                      <h5 className="font-serif text-sm font-bold text-slate-900">
                        {col.title}
                      </h5>
                      {col.subtitle && (
                        <p className="text-[10px] text-slate-500">{col.subtitle}</p>
                      )}
                    </div>
                    <div className="space-y-1 pt-1">
                      {col.paragraphs.map((p, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-100 border border-slate-200 rounded px-2 py-1 text-[10px] text-slate-700 font-semibold"
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between text-[9px] font-mono font-bold text-slate-600">
                    <span>{col.perspective}</span>
                    <span>{col.tone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
