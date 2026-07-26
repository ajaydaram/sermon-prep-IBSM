import React, { useState, useRef, useEffect } from "react";
import {
  Move,
  Plus,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Link2,
  Layers,
  Edit3,
  Check,
  RotateCcw,
  Square,
  ArrowRight,
  Info,
  Type
} from "lucide-react";
import { CanvasBlock, CanvasConnection } from "../types";

const INITIAL_BLOCKS: CanvasBlock[] = [
  // Division 1
  {
    id: "div-1",
    label: "DIVISION I: PRESENT DUTY IN GUARDING THE GOSPEL",
    reference: "2 Tim 1:1 - 2:13",
    level: "Division",
    x: 40,
    y: 40,
    width: 440,
    height: 380,
    color: "#E2E8F0",
    text: "Paul's charge to Timothy to endure hardship, guard the deposit of faith, and remain steadfast in Grace."
  },
  // Segments inside Div 1
  {
    id: "seg-1",
    label: "Segment A: Paul's Thanksgiving & Loyalty Charge",
    reference: "2 Tim 1:1-18",
    level: "Segment",
    x: 60,
    y: 90,
    width: 400,
    height: 150,
    parentId: "div-1",
    color: "#FEF3C7",
    perspective: "Past",
    tone: "Gratitude"
  },
  {
    id: "seg-2",
    label: "Segment B: Call to Grace & Military/Athletic Endurance",
    reference: "2 Tim 2:1-13",
    level: "Segment",
    x: 60,
    y: 250,
    width: 400,
    height: 150,
    parentId: "div-1",
    color: "#D1FAE5",
    perspective: "Present",
    tone: "Encouraging"
  },
  // Division 2
  {
    id: "div-2",
    label: "DIVISION II: FUTURE PERIL & FAITHFUL PREACHING",
    reference: "2 Tim 2:14 - 4:22",
    level: "Division",
    x: 520,
    y: 40,
    width: 440,
    height: 380,
    color: "#E2E8F0",
    text: "Exhortation to rightly divide the word, flee youthful lusts, persevere through apostasy, and preach the Word."
  },
  // Segments inside Div 2
  {
    id: "seg-3",
    label: "Segment C: Worker Approved & Vessel of Honor",
    reference: "2 Tim 2:14-26",
    level: "Segment",
    x: 540,
    y: 90,
    width: 400,
    height: 150,
    parentId: "div-2",
    color: "#E0E7FF",
    perspective: "Present",
    tone: "Concern"
  },
  {
    id: "seg-4",
    label: "Segment D: Godliness in Last Days & Solemn Preaching Charge",
    reference: "2 Tim 3:1 - 4:22",
    level: "Segment",
    x: 540,
    y: 250,
    width: 400,
    height: 150,
    parentId: "div-2",
    color: "#F3E8FF",
    perspective: "Future",
    tone: "Command"
  }
];

const INITIAL_CONNECTIONS: CanvasConnection[] = [
  {
    id: "conn-1",
    sourceId: "seg-1",
    targetId: "seg-2",
    relationType: "CauseEffect",
    label: "Loyalty Charge leads to Military Endurance",
    style: "curved"
  },
  {
    id: "conn-2",
    sourceId: "seg-2",
    targetId: "seg-3",
    relationType: "Contrast",
    label: "Endurance in Grace vs Hymenaeus's False Babble",
    style: "solid"
  },
  {
    id: "conn-3",
    sourceId: "seg-3",
    targetId: "seg-4",
    relationType: "Climax",
    label: "Honorable Vessel Culminates in Preaching the Word",
    style: "dashed"
  }
];

export default function VectorCanvasChart() {
  const [blocks, setBlocks] = useState<CanvasBlock[]>(INITIAL_BLOCKS);
  const [connections, setConnections] = useState<CanvasConnection[]>(INITIAL_CONNECTIONS);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>("seg-2");
  
  // Interactive tool state
  const [activeTool, setActiveTool] = useState<"select" | "connect" | "add">("select");
  const [connectSourceId, setConnectSourceId] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Dragging single block
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Resizing block
  const [resizingBlockId, setResizingBlockId] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0 });

  // Editing Block Modal / Sidebar
  const [editingBlock, setEditingBlock] = useState<CanvasBlock | null>(null);

  // New connection modal
  const [pendingConnTarget, setPendingConnTarget] = useState<string | null>(null);
  const [connRelation, setConnRelation] = useState<CanvasConnection["relationType"]>("Comparison");
  const [connLabel, setConnLabel] = useState("");

  const canvasRef = useRef<HTMLDivElement>(null);

  // Selected block reference
  const currentBlock = blocks.find((b) => b.id === selectedBlockId);

  // Handle Drag Start
  const handleBlockMouseDown = (e: React.MouseEvent, block: CanvasBlock) => {
    e.stopPropagation();
    if (activeTool === "connect") {
      if (!connectSourceId) {
        setConnectSourceId(block.id);
      } else if (connectSourceId !== block.id) {
        setPendingConnTarget(block.id);
      }
      return;
    }

    setSelectedBlockId(block.id);
    setDraggingBlockId(block.id);
    setDragOffset({
      x: (e.clientX - pan.x) / scale - block.x,
      y: (e.clientY - pan.y) / scale - block.y
    });
  };

  // Handle Resize Start
  const handleResizeMouseDown = (e: React.MouseEvent, block: CanvasBlock) => {
    e.stopPropagation();
    setSelectedBlockId(block.id);
    setResizingBlockId(block.id);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      w: block.width,
      h: block.height
    });
  };

  // Canvas Mouse Move (Drag block, Resize block, or Pan canvas)
  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (draggingBlockId) {
      const newX = Math.round((e.clientX - pan.x) / scale - dragOffset.x);
      const newY = Math.round((e.clientY - pan.y) / scale - dragOffset.y);

      setBlocks((prev) =>
        prev.map((b) => (b.id === draggingBlockId ? { ...b, x: Math.max(0, newX), y: Math.max(0, newY) } : b))
      );
    } else if (resizingBlockId) {
      const deltaX = (e.clientX - resizeStart.x) / scale;
      const deltaY = (e.clientY - resizeStart.y) / scale;
      const newW = Math.max(120, Math.round(resizeStart.w + deltaX));
      const newH = Math.max(80, Math.round(resizeStart.h + deltaY));

      setBlocks((prev) =>
        prev.map((b) => (b.id === resizingBlockId ? { ...b, width: newW, height: newH } : b))
      );
    } else if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  // Canvas Mouse Up
  const handleCanvasMouseUp = () => {
    setDraggingBlockId(null);
    setResizingBlockId(null);
    setIsPanning(false);
  };

  // Canvas Pan Mouse Down
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === "svg") {
      setSelectedBlockId(null);
      setIsPanning(true);
      setPanStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y
      });
    }
  };

  // Confirm Connection creation
  const handleCreateConnection = () => {
    if (!connectSourceId || !pendingConnTarget) return;
    const newConn: CanvasConnection = {
      id: `conn-${Date.now()}`,
      sourceId: connectSourceId,
      targetId: pendingConnTarget,
      relationType: connRelation,
      label: connLabel.trim() || connRelation,
      style: connRelation === "Contrast" ? "solid" : connRelation === "Climax" ? "dashed" : "curved"
    };
    setConnections([...connections, newConn]);
    setConnectSourceId(null);
    setPendingConnTarget(null);
    setConnLabel("");
    setActiveTool("select");
  };

  // Add a new block
  const handleAddBlock = (level: CanvasBlock["level"]) => {
    const id = `blk-${Date.now()}`;
    const newB: CanvasBlock = {
      id,
      label: `New ${level}`,
      reference: "1:1",
      level,
      x: 100 + blocks.length * 20,
      y: 100 + blocks.length * 15,
      width: level === "Division" ? 420 : level === "Segment" ? 360 : 280,
      height: level === "Division" ? 320 : level === "Segment" ? 140 : 100,
      color: level === "Division" ? "#E2E8F0" : level === "Segment" ? "#FEF3C7" : "#DCFCE7",
      perspective: "Present",
      tone: "Encouraging"
    };
    setBlocks([...blocks, newB]);
    setSelectedBlockId(id);
  };

  const handleDeleteSelected = () => {
    if (!selectedBlockId) return;
    setBlocks(blocks.filter((b) => b.id !== selectedBlockId));
    setConnections(connections.filter((c) => c.sourceId !== selectedBlockId && c.targetId !== selectedBlockId));
    setSelectedBlockId(null);
  };

  // Helper to calculate center points for connection arrows
  const getBlockCenter = (id: string) => {
    const block = blocks.find((b) => b.id === id);
    if (!block) return { x: 0, y: 0 };
    return {
      x: block.x + block.width / 2,
      y: block.y + block.height / 2
    };
  };

  return (
    <div className="space-y-4 font-sans" id="vector-canvas-chart-root">
      {/* Top Toolbar */}
      <div className="bg-white border border-[#141414]/20 p-3 rounded-lg flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex bg-[#E4E3E0] p-1 border border-[#141414]/20 rounded-md">
            <button
              onClick={() => {
                setActiveTool("select");
                setConnectSourceId(null);
              }}
              className={`px-3 py-1 text-xs font-bold uppercase flex items-center gap-1.5 rounded cursor-pointer transition-colors ${
                activeTool === "select" ? "bg-[#141414] text-white" : "text-[#141414] hover:bg-black/10"
              }`}
            >
              <Move className="w-3.5 h-3.5" />
              <span>Arrange & Drag</span>
            </button>
            <button
              onClick={() => {
                setActiveTool("connect");
                setConnectSourceId(null);
              }}
              className={`px-3 py-1 text-xs font-bold uppercase flex items-center gap-1.5 rounded cursor-pointer transition-colors ${
                activeTool === "connect" ? "bg-[#141414] text-white" : "text-[#141414] hover:bg-black/10"
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Relational Connector</span>
            </button>
          </div>

          <span className="h-4 w-px bg-[#141414]/20 mx-1"></span>

          {/* Quick Add Blocks */}
          <div className="flex items-center gap-1 text-xs font-semibold">
            <span className="text-[10px] uppercase font-bold text-[#141414]/60 mr-1">Add Container:</span>
            <button
              onClick={() => handleAddBlock("Division")}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-slate-800 transition-colors"
            >
              + Division
            </button>
            <button
              onClick={() => handleAddBlock("Segment")}
              className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded text-amber-900 transition-colors"
            >
              + Segment
            </button>
            <button
              onClick={() => handleAddBlock("Paragraph")}
              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded text-emerald-900 transition-colors"
            >
              + Paragraph
            </button>
          </div>
        </div>

        {/* Zoom & Reset Canvas controls */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center border border-[#141414]/20 rounded-md overflow-hidden bg-white">
            <button
              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
              className="p-1.5 hover:bg-gray-100 text-[#141414] border-r border-[#141414]/20"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] font-bold min-w-[48px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(Math.min(2, scale + 0.1))}
              className="p-1.5 hover:bg-gray-100 text-[#141414] border-l border-[#141414]/20"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              setScale(1);
              setPan({ x: 0, y: 0 });
            }}
            className="p-1.5 border border-[#141414]/20 rounded-md bg-white hover:bg-gray-100 font-mono text-[10px] font-bold"
            title="Reset Pan/Zoom"
          >
            Reset View
          </button>

          {selectedBlockId && (
            <button
              onClick={handleDeleteSelected}
              className="px-2.5 py-1 bg-rose-50 border border-rose-300 text-rose-700 hover:bg-rose-100 rounded text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Block</span>
            </button>
          )}
        </div>
      </div>

      {/* Connection Mode Alert Banner */}
      {activeTool === "connect" && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 px-4 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {connectSourceId
                ? "Now CLICK target block to complete structural law connection."
                : "CLICK source block to start connecting structural relationship."}
            </span>
          </div>
          {connectSourceId && (
            <button
              onClick={() => setConnectSourceId(null)}
              className="text-[10px] underline font-bold uppercase text-amber-800"
            >
              Cancel Selection
            </button>
          )}
        </div>
      )}

      {/* VECTOR CANVAS STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 border-2 border-[#141414] bg-[#F7F6F3] rounded-xl overflow-hidden relative h-[560px] shadow-inner select-none">
          {/* Subtle Grid Background Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(#141414 1px, transparent 1px)`,
              backgroundSize: `${20 * scale}px ${20 * scale}px`,
              backgroundPosition: `${pan.x}px ${pan.y}px`
            }}
          ></div>

          {/* Canvas Interactive Container */}
          <div
            ref={canvasRef}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            className="w-full h-full cursor-grab active:cursor-grabbing overflow-hidden relative"
          >
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                transformOrigin: "0 0",
                width: "2000px",
                height: "2000px"
              }}
              className="absolute top-0 left-0"
            >
              {/* SVG Layer for Relational Arrows/Connectors */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <defs>
                  <marker
                    id="arrow-head-Comparison"
                    markerWidth="10"
                    markerHeight="10"
                    refX="6"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#1E40AF" />
                  </marker>
                  <marker
                    id="arrow-head-Contrast"
                    markerWidth="10"
                    markerHeight="10"
                    refX="6"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#B91C1C" />
                  </marker>
                  <marker
                    id="arrow-head-CauseEffect"
                    markerWidth="10"
                    markerHeight="10"
                    refX="6"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#047857" />
                  </marker>
                  <marker
                    id="arrow-head-Climax"
                    markerWidth="10"
                    markerHeight="10"
                    refX="6"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#6B21A8" />
                  </marker>
                </defs>

                {connections.map((conn) => {
                  const src = getBlockCenter(conn.sourceId);
                  const tgt = getBlockCenter(conn.targetId);
                  if (!src.x || !tgt.x) return null;

                  const midX = (src.x + tgt.x) / 2;
                  const midY = (src.y + tgt.y) / 2 - 20;

                  const strokeColor =
                    conn.relationType === "Contrast"
                      ? "#B91C1C"
                      : conn.relationType === "CauseEffect"
                      ? "#047857"
                      : conn.relationType === "Climax"
                      ? "#6B21A8"
                      : "#1E40AF";

                  const strokeDash = conn.style === "dashed" ? "6,6" : "none";

                  return (
                    <g key={conn.id} className="pointer-events-auto cursor-pointer">
                      <path
                        d={`M ${src.x} ${src.y} Q ${midX} ${midY} ${tgt.x} ${tgt.y}`}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.5"
                        strokeDasharray={strokeDash}
                        markerEnd={`url(#arrow-head-${conn.relationType})`}
                      />
                      {/* Connection Label Pill */}
                      <foreignObject
                        x={midX - 75}
                        y={midY - 12}
                        width="150"
                        height="30"
                        className="overflow-visible"
                      >
                        <div
                          onClick={() => {
                            if (confirm(`Delete connection "${conn.label}"?`)) {
                              setConnections(connections.filter((c) => c.id !== conn.id));
                            }
                          }}
                          className="bg-white/95 border border-[#141414]/30 shadow-xs px-2 py-0.5 rounded text-[9px] font-bold font-mono text-center truncate cursor-pointer hover:bg-rose-50 hover:text-rose-700 transition-colors"
                          title="Click to remove connection"
                        >
                          {conn.label}
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>

              {/* RENDERED VECTOR BLOCKS */}
              {blocks.map((block) => {
                const isSelected = selectedBlockId === block.id;
                const isConnectSource = connectSourceId === block.id;

                return (
                  <div
                    key={block.id}
                    onMouseDown={(e) => handleBlockMouseDown(e, block)}
                    style={{
                      left: `${block.x}px`,
                      top: `${block.y}px`,
                      width: `${block.width}px`,
                      height: `${block.height}px`,
                      backgroundColor: block.color || "#FFFFFF"
                    }}
                    className={`absolute rounded-lg border-2 transition-shadow p-3 flex flex-col justify-between cursor-move z-20 ${
                      isConnectSource
                        ? "border-amber-600 ring-4 ring-amber-400/50 shadow-lg"
                        : isSelected
                        ? "border-[#141414] ring-2 ring-black/40 shadow-md"
                        : "border-[#141414]/30 hover:border-[#141414] shadow-xs"
                    }`}
                  >
                    {/* Header bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between border-b border-[#141414]/15 pb-1">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#141414]/70 px-1.5 py-0.5 bg-black/5 rounded">
                          {block.level} • {block.reference}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingBlock(block);
                            }}
                            className="p-1 hover:bg-black/10 rounded text-[#141414]/60 hover:text-[#141414]"
                            title="Edit Block Content"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-serif text-xs font-bold text-[#141414] leading-snug">
                        {block.label}
                      </h4>
                    </div>

                    {/* Content text preview */}
                    {block.text && (
                      <p className="text-[10px] text-[#141414]/75 line-clamp-3 leading-relaxed font-sans italic bg-white/50 p-1.5 rounded border border-black/5">
                        "{block.text}"
                      </p>
                    )}

                    {/* Footer metadata tags */}
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold pt-1 border-t border-[#141414]/10">
                      {block.perspective && (
                        <span className="px-1.5 py-0.5 bg-black/10 rounded uppercase">
                          {block.perspective}
                        </span>
                      )}
                      {block.tone && (
                        <span className="px-1.5 py-0.5 bg-black/10 rounded uppercase">
                          {block.tone}
                        </span>
                      )}
                    </div>

                    {/* Corner Resize Handle */}
                    {isSelected && (
                      <div
                        onMouseDown={(e) => handleResizeMouseDown(e, block)}
                        className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-[#141414] border border-white rounded-sm cursor-se-resize flex items-center justify-center text-white text-[8px]"
                        title="Drag to resize block"
                      >
                        ⌟
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar Inspector & Block Details */}
        <div className="bg-white border-2 border-[#141414] rounded-xl p-4 flex flex-col gap-4 shadow-xs">
          <div className="border-b border-[#141414]/20 pb-2 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Block Inspector</span>
            <span className="text-[10px] font-mono opacity-50">
              {currentBlock ? currentBlock.level : "NO SELECTION"}
            </span>
          </div>

          {currentBlock ? (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#141414]/60 mb-1">
                  Block Label
                </label>
                <input
                  type="text"
                  value={currentBlock.label}
                  onChange={(e) =>
                    setBlocks(
                      blocks.map((b) => (b.id === currentBlock.id ? { ...b, label: e.target.value } : b))
                    )
                  }
                  className="w-full text-xs font-bold p-2 border border-[#141414]/30 rounded bg-[#F7F6F3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#141414]/60 mb-1">
                    Reference
                  </label>
                  <input
                    type="text"
                    value={currentBlock.reference}
                    onChange={(e) =>
                      setBlocks(
                        blocks.map((b) => (b.id === currentBlock.id ? { ...b, reference: e.target.value } : b))
                      )
                    }
                    className="w-full text-xs p-1.5 border border-[#141414]/30 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#141414]/60 mb-1">
                    Container Level
                  </label>
                  <select
                    value={currentBlock.level}
                    onChange={(e) =>
                      setBlocks(
                        blocks.map((b) =>
                          b.id === currentBlock.id
                            ? { ...b, level: e.target.value as CanvasBlock["level"] }
                            : b
                        )
                      )
                    }
                    className="w-full text-xs p-1.5 border border-[#141414]/30 rounded"
                  >
                    <option value="Division">Division</option>
                    <option value="Segment">Segment</option>
                    <option value="Paragraph">Paragraph</option>
                    <option value="Sentence">Sentence</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#141414]/60 mb-1">
                  Exegesis / Summary Text
                </label>
                <textarea
                  rows={3}
                  value={currentBlock.text || ""}
                  onChange={(e) =>
                    setBlocks(
                      blocks.map((b) => (b.id === currentBlock.id ? { ...b, text: e.target.value } : b))
                    )
                  }
                  className="w-full text-xs p-2 border border-[#141414]/30 rounded bg-[#F7F6F3]"
                  placeholder="Enter structural observations or summary..."
                />
              </div>

              {/* Background Color Palette */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#141414]/60 mb-1">
                  Block Accent Color
                </label>
                <div className="flex gap-1.5">
                  {["#E2E8F0", "#FEF3C7", "#D1FAE5", "#E0E7FF", "#F3E8FF", "#FFE4E6"].map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setBlocks(
                          blocks.map((b) => (b.id === currentBlock.id ? { ...b, color } : b))
                        )
                      }
                      style={{ backgroundColor: color }}
                      className={`w-6 h-6 rounded-full border border-[#141414]/40 cursor-pointer transition-transform ${
                        currentBlock.color === color ? "scale-125 ring-2 ring-black" : "hover:scale-110"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#141414]/20 flex justify-between text-[10px] font-mono text-[#141414]/70">
                <span>Position: ({currentBlock.x}, {currentBlock.y})</span>
                <span>Size: {currentBlock.width}x{currentBlock.height}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-[#141414]/50 space-y-2">
              <Square className="w-8 h-8 opacity-40" />
              <p className="text-xs italic">Click any container block on the canvas to inspect & resize properties.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: RELATIONAL CONNECTOR CONFIG */}
      {pendingConnTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#141414] rounded-xl p-5 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-base border-b border-gray-200 pb-2">
              Define Relational Law Connection
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Structural Law / Relationship Type
                </label>
                <select
                  value={connRelation}
                  onChange={(e) => setConnRelation(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-black"
                >
                  <option value="Comparison">Comparison (Association of Similarities)</option>
                  <option value="Contrast">Contrast (Association of Differences)</option>
                  <option value="CauseEffect">Cause to Effect / Reason to Result</option>
                  <option value="Climax">Climax (Movement toward peak)</option>
                  <option value="Repetition">Repetition (Recurring terms or motifs)</option>
                  <option value="GeneralSpecific">General to Specific / Particularization</option>
                  <option value="Proportion">Proportion (Emphasis by space)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Connection Label / Explanation
                </label>
                <input
                  type="text"
                  value={connLabel}
                  onChange={(e) => setConnLabel(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="e.g. Loyalty Charge leads to Military Endurance"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => {
                  setConnectSourceId(null);
                  setPendingConnTarget(null);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateConnection}
                className="px-4 py-1.5 bg-[#141414] text-white rounded text-xs font-bold hover:bg-black/90"
              >
                Create Connector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
