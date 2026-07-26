import React, { useState, useEffect } from "react";
import {
  Users,
  Globe,
  Radio,
  Send,
  MessageSquare,
  Sparkles,
  PenTool,
  Layers,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Copy,
  RefreshCw,
  Zap,
  Lock,
  Share2,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { CollaborativeRoomState, CollaboratorPresence, ActivityLogItem, StudyProject } from "../types";

interface RealtimeCollaborativeWorkshopProps {
  currentProject?: StudyProject;
  onUpdateProject?: (project: StudyProject) => void;
}

export default function RealtimeCollaborativeWorkshop({
  currentProject,
  onUpdateProject,
}: RealtimeCollaborativeWorkshopProps) {
  const [roomId, setRoomId] = useState("EZRA-7701");
  const [userName, setUserName] = useState("Pastor Ezra");
  const [userRole, setUserRole] = useState<"Professor" | "Pastor" | "Group Member" | "Student">("Pastor");
  const [isJoined, setIsJoined] = useState(false);

  const [roomState, setRoomState] = useState<CollaborativeRoomState | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Active collaboration sub-tab
  const [activeBoardTab, setActiveBoardTab] = useState<"observations" | "outline" | "notes" | "roster">("observations");

  // Inputs
  const [newObsText, setNewObsText] = useState("");
  const [newOutlineLine, setNewOutlineLine] = useState("");
  const [chatInput, setChatInput] = useState("");

  // Auto-polling when connected to room
  useEffect(() => {
    let interval: any = null;
    if (isJoined && roomId) {
      interval = setInterval(() => {
        fetchRoomState(false);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isJoined, roomId]);

  const fetchRoomState = async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      const res = await fetch(`/api/collaboration/room/${roomId.toUpperCase().trim()}`);
      if (res.ok) {
        const data = await res.json();
        setRoomState(data);
      }
    } catch (e) {
      console.error("Room sync error:", e);
    } finally {
      if (showSpinner) setLoading(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim() || !userName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/collaboration/room/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
          userName,
          userRole,
          initialStudyProject: currentProject,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRoomState(data.room);
        setCurrentUserId(data.currentUserId);
        setIsJoined(true);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to join collaborative room.");
    } finally {
      setLoading(false);
    }
  };

  const broadcastUpdate = async (actionType: string, details: string, updatedProjectPayload?: any, newNotes?: string) => {
    if (!isJoined || !roomState) return;

    const me = roomState.collaborators.find((c) => c.id === currentUserId || c.name === userName);

    try {
      const res = await fetch("/api/collaboration/room/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: roomState.roomId,
          userId: currentUserId,
          userName: userName,
          userColor: me?.color || "#141414",
          actionType,
          details,
          studyProject: updatedProjectPayload,
          sharedNotes: newNotes,
          activeTab: activeBoardTab,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRoomState(data.room);
        if (updatedProjectPayload && onUpdateProject) {
          onUpdateProject(data.room.studyProject);
        }
      }
    } catch (e) {
      console.error("Broadcast update failed:", e);
    }
  };

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObsText.trim() || !roomState) return;

    const currentObs = roomState.studyProject.observations || [];
    const updatedObs = [newObsText.trim(), ...currentObs];

    broadcastUpdate(
      "Added Observation",
      `Added: "${newObsText.trim().slice(0, 40)}..."`,
      { observations: updatedObs }
    );
    setNewObsText("");
  };

  const handleRemoveObservation = (index: number) => {
    if (!roomState) return;
    const currentObs = roomState.studyProject.observations || [];
    const updatedObs = currentObs.filter((_: any, i: number) => i !== index);

    broadcastUpdate("Removed Observation", "Removed an observation entry", {
      observations: updatedObs,
    });
  };

  const handleAddSentenceOutline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOutlineLine.trim() || !roomState) return;

    const currentOutline = roomState.studyProject.sentenceOutline || "";
    const updatedOutline = currentOutline
      ? `${currentOutline}\n${newOutlineLine.trim()}`
      : newOutlineLine.trim();

    broadcastUpdate("Updated Sentence Outline", `Added line: "${newOutlineLine.trim()}"`, {
      sentenceOutline: updatedOutline,
    });
    setNewOutlineLine("");
  };

  const handleUpdateSharedNotes = (text: string) => {
    if (!roomState) return;
    broadcastUpdate("Updated Shared Notes", "Edited collaborative notes board", undefined, text);
  };

  const handlePostChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !roomState) return;

    broadcastUpdate("Room Chat", chatInput.trim());
    setChatInput("");
  };

  return (
    <div className="space-y-6" id="collaboration-workshop-root">
      {/* Header Banner */}
      <div className="bg-[#141414] text-[#E4E3E0] border border-[#141414] rounded-xl p-5 shadow-md flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-sky-400 text-[#141414] rounded-lg shrink-0 font-bold">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-wider font-bold bg-[#E4E3E0]/20 text-sky-300 px-2 py-0.5 rounded">
                Real-Time Live Sync
              </span>
              <span className="text-xs font-mono text-slate-300">Multi-User Academic Whiteboard</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              Real-Time Collaborative Workshop
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Enable group-study, ministry team, or peer-review collaboration. Multiple scholars or church staff can collaboratively log observations, highlight verse structures, construct sentence outlines, and debate exegesis in real time.
            </p>
          </div>
        </div>

        {isJoined && (
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/15">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
                Live Room: {roomState?.roomId}
              </span>
            </div>
            <button
              onClick={() => fetchRoomState(true)}
              className="p-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded cursor-pointer"
              title="Force Sync"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        )}
      </div>

      {!isJoined ? (
        /* Join Room Setup Card */
        <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-md space-y-5">
          <div className="border-b pb-3">
            <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-600" />
              Join or Create Group Collaboration Session
            </h4>
            <p className="text-xs text-slate-500">
              Enter a shared Room Code to connect with your small group or seminary cohort.
            </p>
          </div>

          <form onSubmit={handleJoinRoom} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Room Code
              </label>
              <input
                type="text"
                required
                placeholder="e.g. EZRA-7701"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                className="w-full text-xs font-mono border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 uppercase tracking-widest font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Your Scholar Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pastor Ezra"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Role
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as any)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="Pastor">Pastor</option>
                  <option value="Professor">Professor</option>
                  <option value="Group Member">Group Member</option>
                  <option value="Student">Student</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  Connecting to Room...
                </>
              ) : (
                <>
                  <Radio className="w-4 h-4 text-emerald-400" />
                  Connect to Live Whiteboard
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Connected Collaborative Workspace Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Board Content (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
              
              {/* Board Nav Tabs */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex gap-2">
                  {[
                    { id: "observations", label: "Live Observations", icon: PenTool },
                    { id: "outline", label: "Collaborative Outline", icon: Layers },
                    { id: "notes", label: "Shared Whiteboard Notes", icon: MessageSquare },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveBoardTab(tab.id as any)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeBoardTab === tab.id
                            ? "bg-[#141414] text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <span className="text-[10px] font-mono text-slate-400">
                  Room: <strong>{roomState?.roomId}</strong>
                </span>
              </div>

              {/* Sub-tab 1: Live Observations */}
              {activeBoardTab === "observations" && (
                <div className="space-y-4">
                  <form onSubmit={handleAddObservation} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an observation to the shared board (e.g., 'Verbs in v.5 show staccato rhythm')..."
                      value={newObsText}
                      onChange={(e) => setNewObsText(e.target.value)}
                      className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      Add Entry
                    </button>
                  </form>

                  <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                    {roomState?.studyProject?.observations?.map((obs: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex justify-between items-start gap-3 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-slate-800 leading-relaxed">{obs}</p>
                        </div>

                        <button
                          onClick={() => handleRemoveObservation(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer shrink-0"
                          title="Delete Observation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Collaborative Outline */}
              {activeBoardTab === "outline" && (
                <div className="space-y-4">
                  <form onSubmit={handleAddSentenceOutline} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add outline line formula: 'I. Complete subject + complement statement...'"
                      value={newOutlineLine}
                      onChange={(e) => setNewOutlineLine(e.target.value)}
                      className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      Add Heading
                    </button>
                  </form>

                  <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed max-h-[360px] overflow-y-auto whitespace-pre-wrap">
                    {roomState?.studyProject?.sentenceOutline || "// No sentence outline lines logged yet."}
                  </div>
                </div>
              )}

              {/* Sub-tab 3: Shared Whiteboard Notes */}
              {activeBoardTab === "notes" && (
                <div className="space-y-3">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Live Shared Scratchpad
                  </label>
                  <textarea
                    value={roomState?.sharedNotes || ""}
                    onChange={(e) => handleUpdateSharedNotes(e.target.value)}
                    rows={12}
                    className="w-full text-xs font-mono border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed bg-amber-50/20"
                    placeholder="Type communal study notes, questions for the professor, or sermon outlines here..."
                  />
                  <p className="text-[10px] text-slate-400 italic">
                    All edits in this scratchpad sync automatically across all connected team members.
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Right Sidebar: Active Collaborators & Live Activity Feed (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Active Collaborators Roster */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  Active Collaborators ({roomState?.collaborators?.length || 0})
                </h5>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              </div>

              <div className="space-y-2 max-h-[180px] overflow-y-auto">
                {roomState?.collaborators?.map((collab) => (
                  <div
                    key={collab.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs border border-slate-100"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0"
                        style={{ backgroundColor: collab.color }}
                      >
                        {collab.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block leading-tight">
                          {collab.name}
                        </span>
                        <span className="text-[9px] text-slate-400 block font-mono">
                          {collab.role}
                        </span>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Online
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
              <h5 className="font-serif text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-600" />
                Live Activity Stream
              </h5>

              <div className="space-y-2.5 max-h-[260px] overflow-y-auto text-xs">
                {roomState?.activityLogs?.map((log) => (
                  <div key={log.id} className="p-2 bg-slate-50/80 border border-slate-100 rounded-lg space-y-0.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-slate-900" style={{ color: log.userColor }}>
                        {log.user}
                      </span>
                      <span className="text-slate-400 font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-800">{log.action}</p>
                    <p className="text-[10px] text-slate-500">{log.details}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handlePostChat} className="pt-2 border-t flex gap-1.5">
                <input
                  type="text"
                  placeholder="Chat with team..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 text-xs border border-gray-200 rounded-md p-1.5 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
