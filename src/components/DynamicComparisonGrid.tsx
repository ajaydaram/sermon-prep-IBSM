import React, { useState } from "react";
import {
  Grid,
  Plus,
  Trash2,
  Download,
  Copy,
  Check,
  Search,
  Settings2,
  Table,
  FileText,
  Sparkles,
  Edit2
} from "lucide-react";
import { MatrixGrid, MatrixColumn, MatrixRow } from "../types";

// Preset 1: Revelation 2-3 Seven Churches Matrix
const PRESET_SEVEN_CHURCHES: MatrixGrid = {
  id: "matrix-rev-churches",
  title: "REVELATION 2-3: SEVEN CHURCHES COMPARISON MATRIX",
  description: "Comparative exegesis of Christ's letters to the seven churches in Asia Minor.",
  columns: [
    { id: "c-eph", header: "Ephesus", subtitle: "2:1-7", color: "#E0E7FF" },
    { id: "c-smy", header: "Smyrna", subtitle: "2:8-11", color: "#FEF3C7" },
    { id: "c-per", header: "Pergamum", subtitle: "2:12-17", color: "#FCE7F3" },
    { id: "c-thy", header: "Thyatira", subtitle: "2:18-29", color: "#F3E8FF" },
    { id: "c-sar", header: "Sardis", subtitle: "3:1-6", color: "#E2E8F0" },
    { id: "c-phi", header: "Philadelphia", subtitle: "3:7-13", color: "#D1FAE5" },
    { id: "c-lao", header: "Laodicea", subtitle: "3:14-22", color: "#FFE4E6" }
  ],
  rows: [
    { id: "r-title", label: "Title of Christ", category: "Identification" },
    { id: "r-praise", label: "Commendation", category: "Evaluation" },
    { id: "r-[#141414]", label: "Rebuke / Complaint", category: "Evaluation" },
    { id: "r-counsel", label: "Exhortation & Counsel", category: "Command" },
    { id: "r-promise", label: "Promise to Overcomer", category: "Eschatology" }
  ],
  cells: {
    "r-title_c-eph": "Holds 7 stars, walks among 7 golden lampstands",
    "r-praise_c-eph": "Hard work, perseverance, refuting false apostles (Nicolaitans)",
    "r-[#141414]_c-eph": "Abandoned your first love",
    "r-counsel_c-eph": "Remember, repent, and do the works you did at first",
    "r-promise_c-eph": "Right to eat from the tree of life in God's paradise",

    "r-title_c-smy": "First and Last, who died and came to life again",
    "r-praise_c-smy": "Affliction and poverty (yet rich), enduring slander",
    "r-[#141414]_c-smy": "None! (Pure suffering church)",
    "r-counsel_c-smy": "Do not fear suffering; be faithful unto death",
    "r-promise_c-smy": "Will not be hurt by the second death; crown of life",

    "r-title_c-per": "He who has the sharp two-edged sword",
    "r-praise_c-per": "Remains true to my name, even where Satan lives",
    "r-[#141414]_c-per": "Tolerate doctrine of Balaam and Nicolaitans",
    "r-counsel_c-per": "Repent, or I will fight against them with sword of my mouth",
    "r-promise_c-per": "Hidden manna, white stone with a new name written on it",

    "r-title_c-thy": "Son of God, eyes like blazing fire, feet like burnished bronze",
    "r-praise_c-thy": "Love, faith, service, perseverance, doing more now than at first",
    "r-[#141414]_c-thy": "Tolerate that woman Jezebel who misleads servants",
    "r-counsel_c-thy": "Hold fast to what you have until I come",
    "r-promise_c-thy": "Authority over nations; morning star",

    "r-title_c-sar": "Holds the seven spirits of God and the seven stars",
    "r-praise_c-sar": "A few people who have not soiled their clothes",
    "r-[#141414]_c-sar": "Reputation of being alive, but you are dead",
    "r-counsel_c-sar": "Wake up! Strengthen what remains and is about to die",
    "r-promise_c-sar": "Dressed in white; name never erased from Book of Life",

    "r-title_c-phi": "Holy and true, holds the key of David",
    "r-praise_c-phi": "Kept my word, not denied my name despite little strength",
    "r-[#141414]_c-phi": "None! (Faithful, open door church)",
    "r-counsel_c-phi": "Hold on to what you have so no one takes your crown",
    "r-promise_c-phi": "Pillar in the temple of my God; new Jerusalem name",

    "r-title_c-lao": "The Amen, the faithful & true witness, ruler of creation",
    "r-praise_c-lao": "None! (Self-satisfied, lukewarm church)",
    "r-[#141414]_c-lao": "Lukewarm—neither hot nor cold; spit you out",
    "r-counsel_c-lao": "Buy gold refined in fire, white clothes, & eye salve",
    "r-promise_c-lao": "Right to sit with Me on My throne"
  }
};

// Preset 2: Matthew 13 Soil Parables Matrix
const PRESET_SOIL_PARABLES: MatrixGrid = {
  id: "matrix-matt-soils",
  title: "MATTHEW 13: THE FOUR SOILS & SEED RECEPTION MATRIX",
  description: "Hermeneutical comparison of the heart attitudes and fruitful yields in the Parable of the Sower.",
  columns: [
    { id: "s-path", header: "Along the Path", subtitle: "Matt 13:4, 19", color: "#E2E8F0" },
    { id: "s-rocky", header: "Rocky Ground", subtitle: "Matt 13:5-6, 20-21", color: "#FEF3C7" },
    { id: "s-thorns", header: "Among Thorns", subtitle: "Matt 13:7, 22", color: "#FFE4E6" },
    { id: "s-good", header: "Good Soil", subtitle: "Matt 13:8, 23", color: "#D1FAE5" }
  ],
  rows: [
    { id: "sr-condition", label: "Soil Condition", category: "Environment" },
    { id: "sr-seed", label: "Seed Fate & Enemy Action", category: "Process" },
    { id: "sr-heart", label: "Heart State / Understanding", category: "Spiritual" },
    { id: "sr-obstacle", label: "Growth Obstacle", category: "Hazard" },
    { id: "sr-harvest", label: "Harvest Yield", category: "Outcome" }
  ],
  cells: {
    "sr-condition_s-path": "Hardened, trampled ground with no topsoil depth",
    "sr-seed_s-path": "Birds come and devour seed immediately; Evil One snatches away",
    "sr-heart_s-path": "Hears the word of the kingdom but does not understand it",
    "sr-obstacle_s-path": "Immediate Satanic snatching / hard-hearted indifference",
    "sr-harvest_s-path": "Zero yield (Barren)",

    "sr-condition_s-rocky": "Thin soil over bedrock ledge; quick warmth",
    "sr-seed_s-rocky": "Springs up quickly, but scorched by sun with no root depth",
    "sr-heart_s-rocky": "Receives word immediately with joy, but lacks root",
    "sr-obstacle_s-rocky": "Tribulation or persecution arises on account of the word",
    "sr-harvest_s-rocky": "Zero yield (Withered away)",

    "sr-condition_s-thorns": "Fertile ground infested with dormant weeds & briars",
    "sr-seed_s-thorns": "Seed grows alongside thorns, which choke its light and nutrients",
    "sr-heart_s-thorns": "Hears the word, but cares of world choke fruitfulness",
    "sr-obstacle_s-thorns": "Cares of the world & deceitfulness of riches",
    "sr-harvest_s-thorns": "Zero yield (Choked & unfruitful)",

    "sr-condition_s-good": "Plowing-prepared, deep, weeded, receptive soil",
    "sr-seed_s-good": "Roots deeply, absorbs rain, grows to full maturity",
    "sr-heart_s-good": "Hears the word, understands it, and holds it fast",
    "sr-obstacle_s-good": "None; perseveres through trial into fruitfulness",
    "sr-harvest_s-good": "Abundant yield: 100x, 60x, or 30x"
  }
};

// Preset 3: Learning Task B06 Twelve Disciples Comparison Matrix (200 Points)
const PRESET_TWELVE_DISCIPLES: MatrixGrid = {
  id: "matrix-b06-disciples",
  title: "LEARNING TASK B06: COMPARATIVE CHART OF THE TWELVE DISCIPLES (200 PTS)",
  description: "Comparative exegesis of the four apostolic lists in Matthew 10:2-4, Mark 3:16-19, Luke 6:14-16, and Acts 1:13.",
  columns: [
    { id: "c-matt", header: "Matthew 10:2-4", subtitle: "Gospel of Matthew", color: "#E0E7FF" },
    { id: "c-mark", header: "Mark 3:16-19", subtitle: "Gospel of Mark", color: "#FEF3C7" },
    { id: "c-luke", header: "Luke 6:14-16", subtitle: "Gospel of Luke", color: "#FCE7F3" },
    { id: "c-acts", header: "Acts 1:13", subtitle: "Book of Acts", color: "#D1FAE5" }
  ],
  rows: [
    { id: "r-g1p1", label: "Group 1 - Pos 1 (Leader)", category: "Group 1 (Positions 1-4)" },
    { id: "r-g1p2", label: "Group 1 - Pos 2", category: "Group 1 (Positions 1-4)" },
    { id: "r-g1p3", label: "Group 1 - Pos 3", category: "Group 1 (Positions 1-4)" },
    { id: "r-g1p4", label: "Group 1 - Pos 4", category: "Group 1 (Positions 1-4)" },
    { id: "r-g2p5", label: "Group 2 - Pos 5 (Leader)", category: "Group 2 (Positions 5-8)" },
    { id: "r-g2p6", label: "Group 2 - Pos 6", category: "Group 2 (Positions 5-8)" },
    { id: "r-g2p7", label: "Group 2 - Pos 7", category: "Group 2 (Positions 5-8)" },
    { id: "r-g2p8", label: "Group 2 - Pos 8", category: "Group 2 (Positions 5-8)" },
    { id: "r-g3p9", label: "Group 3 - Pos 9 (Leader)", category: "Group 3 (Positions 9-12)" },
    { id: "r-g3p10", label: "Group 3 - Pos 10", category: "Group 3 (Positions 9-12)" },
    { id: "r-g3p11", label: "Group 3 - Pos 11", category: "Group 3 (Positions 9-12)" },
    { id: "r-g3p12", label: "Group 3 - Pos 12", category: "Group 3 (Positions 9-12)" },
  ],
  cells: {
    "r-g1p1_c-matt": "1. Simon (called Peter) [First]",
    "r-g1p1_c-mark": "1. Simon (whom He named Peter)",
    "r-g1p1_c-luke": "1. Simon (whom He named Peter)",
    "r-g1p1_c-acts": "1. Peter",

    "r-g1p2_c-matt": "2. Andrew his brother",
    "r-g1p2_c-mark": "2. James son of Zebedee",
    "r-g1p2_c-luke": "2. Andrew his brother",
    "r-g1p2_c-acts": "2. John",

    "r-g1p3_c-matt": "3. James son of Zebedee",
    "r-g1p3_c-mark": "3. John brother of James (Boanerges)",
    "r-g1p3_c-luke": "3. James",
    "r-g1p3_c-acts": "3. James",

    "r-g1p4_c-matt": "4. John his brother",
    "r-g1p4_c-mark": "4. Andrew",
    "r-g1p4_c-luke": "4. John",
    "r-g1p4_c-acts": "4. Andrew",

    "r-g2p5_c-matt": "5. Philip",
    "r-g2p5_c-mark": "5. Philip",
    "r-g2p5_c-luke": "5. Philip",
    "r-g2p5_c-acts": "5. Philip",

    "r-g2p6_c-matt": "6. Bartholomew",
    "r-g2p6_c-mark": "6. Bartholomew",
    "r-g2p6_c-luke": "6. Bartholomew",
    "r-g2p6_c-acts": "6. Thomas",

    "r-g2p7_c-matt": "7. Thomas",
    "r-g2p7_c-mark": "7. Matthew",
    "r-g2p7_c-luke": "7. Matthew",
    "r-g2p7_c-acts": "7. Bartholomew",

    "r-g2p8_c-matt": "8. Matthew the tax collector",
    "r-g2p8_c-mark": "8. Thomas",
    "r-g2p8_c-luke": "8. Thomas",
    "r-g2p8_c-acts": "8. Matthew",

    "r-g3p9_c-matt": "9. James son of Alphaeus",
    "r-g3p9_c-mark": "9. James son of Alphaeus",
    "r-g3p9_c-luke": "9. James son of Alphaeus",
    "r-g3p9_c-acts": "9. James son of Alphaeus",

    "r-g3p10_c-matt": "10. Thaddaeus (Labbaeus)",
    "r-g3p10_c-mark": "10. Thaddaeus",
    "r-g3p10_c-luke": "10. Simon called the Zealot",
    "r-g3p10_c-acts": "10. Simon the Zealot",

    "r-g3p11_c-matt": "11. Simon the Cananaean",
    "r-g3p11_c-mark": "11. Simon the Cananaean",
    "r-g3p11_c-luke": "11. Judas son of James",
    "r-g3p11_c-acts": "11. Judas son of James",

    "r-g3p12_c-matt": "12. Judas Iscariot (betrayer)",
    "r-g3p12_c-mark": "12. Judas Iscariot (betrayer)",
    "r-g3p12_c-luke": "12. Judas Iscariot (traitor)",
    "r-g3p12_c-acts": "[Omitted: Dead (Acts 1:16-20)]",
  }
};

export default function DynamicComparisonGrid() {
  const [matrix, setMatrix] = useState<MatrixGrid>(PRESET_TWELVE_DISCIPLES);
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);

  // Edit cell state
  const [editingCellKey, setEditingCellKey] = useState<string | null>(null);
  const [cellText, setCellText] = useState("");

  // Edit matrix title/description
  const [editingHeader, setEditingHeader] = useState(false);

  // Add column/row modal or state
  const [newColHeader, setNewColHeader] = useState("");
  const [newRowLabel, setNewRowLabel] = useState("");

  const handleSelectPreset = (type: "disciples" | "rev" | "matt" | "blank") => {
    if (type === "disciples") {
      setMatrix(PRESET_TWELVE_DISCIPLES);
    } else if (type === "rev") {
      setMatrix(PRESET_SEVEN_CHURCHES);
    } else if (type === "matt") {
      setMatrix(PRESET_SOIL_PARABLES);
    } else {
      setMatrix({
        id: `matrix-custom-${Date.now()}`,
        title: "CUSTOM EXEGESIS COMPARISON MATRIX",
        description: "Compare multiple passages, topics, or historical entities side-by-side.",
        columns: [
          { id: "col-1", header: "Entity A", subtitle: "Passage 1", color: "#E0E7FF" },
          { id: "col-2", header: "Entity B", subtitle: "Passage 2", color: "#FEF3C7" }
        ],
        rows: [
          { id: "row-1", label: "Key Theme" },
          { id: "row-2", label: "Theological Emphasis" }
        ],
        cells: {
          "row-1_col-1": "Sample Observation A",
          "row-1_col-2": "Sample Observation B"
        }
      });
    }
  };

  const handleCellClick = (rowId: string, colId: string) => {
    const key = `${rowId}_${colId}`;
    setEditingCellKey(key);
    setCellText(matrix.cells[key] || "");
  };

  const handleSaveCell = () => {
    if (!editingCellKey) return;
    setMatrix({
      ...matrix,
      cells: {
        ...matrix.cells,
        [editingCellKey]: cellText
      }
    });
    setEditingCellKey(null);
  };

  const handleAddColumn = () => {
    if (!newColHeader.trim()) return;
    const colId = `col-${Date.now()}`;
    const newCol: MatrixColumn = {
      id: colId,
      header: newColHeader.trim(),
      subtitle: "Custom",
      color: "#F3E8FF"
    };
    setMatrix({
      ...matrix,
      columns: [...matrix.columns, newCol]
    });
    setNewColHeader("");
  };

  const handleAddRow = () => {
    if (!newRowLabel.trim()) return;
    const rowId = `row-${Date.now()}`;
    const newRow: MatrixRow = {
      id: rowId,
      label: newRowLabel.trim()
    };
    setMatrix({
      ...matrix,
      rows: [...matrix.rows, newRow]
    });
    setNewRowLabel("");
  };

  const handleDeleteColumn = (colId: string) => {
    if (matrix.columns.length <= 1) {
      alert("Matrix must have at least one column.");
      return;
    }
    setMatrix({
      ...matrix,
      columns: matrix.columns.filter((c) => c.id !== colId)
    });
  };

  const handleDeleteRow = (rowId: string) => {
    if (matrix.rows.length <= 1) {
      alert("Matrix must have at least one row.");
      return;
    }
    setMatrix({
      ...matrix,
      rows: matrix.rows.filter((r) => r.id !== rowId)
    });
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(matrix, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    let csv = `Category,Row Label,${matrix.columns.map(c => `"${c.header} (${c.subtitle})"`).join(",")}\n`;
    matrix.rows.forEach(r => {
      const rowCategory = r.category || "General";
      const rowLabel = `"${r.label}"`;
      const cellValues = matrix.columns.map(c => {
        const val = matrix.cells[`${r.id}_${c.id}`] || "";
        return `"${val.replace(/"/g, '""')}"`;
      });
      csv += `"${rowCategory}",${rowLabel},${cellValues.join(",")}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${matrix.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${matrix.title}</title>
  <style>
    body { font-family: Georgia, serif; padding: 30px; background: #fff; color: #111; }
    h1 { font-size: 20px; text-transform: uppercase; margin-bottom: 5px; border-bottom: 2px solid #111; padding-bottom: 8px; }
    p { font-size: 13px; color: #444; margin-bottom: 20px; font-style: italic; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #333; padding: 10px; font-size: 11px; text-align: left; vertical-align: top; }
    th { background-color: #141414; color: #fff; text-transform: uppercase; font-size: 10px; tracking: 1px; }
    tr:nth-child(even) { background-color: #f8f9fa; }
    .footer { margin-top: 30px; font-size: 10px; color: #777; font-family: sans-serif; text-align: center; }
  </style>
</head>
<body>
  <h1>${matrix.title}</h1>
  <p>${matrix.description}</p>
  <table>
    <thead>
      <tr>
        <th>Category / Row</th>
        ${matrix.columns.map(c => `<th>${c.header}<br><small style="color:#ccc">${c.subtitle}</small></th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${matrix.rows.map(r => `
        <tr>
          <td><strong>${r.label}</strong><br><small style="color:#666">${r.category || ''}</small></td>
          ${matrix.columns.map(c => `<td>${matrix.cells[`${r.id}_${c.id}`] || '-'}</td>`).join('')}
        </tr>
      `).join('')}
    </tbody>
  </table>
  <div class="footer">Generated by Scribe Ezra Pro IBSM Platform • BS510 Learning Task B06</div>
  <script>window.print();</script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) {
      win.focus();
    }
  };

  return (
    <div className="space-y-5 font-sans" id="dynamic-comparison-grid-root">
      {/* Preset Selector & Action Header */}
      <div className="bg-white border-2 border-[#141414] rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-emerald-800" />
          <span className="font-serif font-bold text-sm text-[#141414]">
            Comparison Matrix Templates:
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSelectPreset("disciples")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              matrix.id.includes("disciples")
                ? "bg-amber-400 border-amber-500 text-slate-950 font-extrabold shadow-sm"
                : "border-gray-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            ⭐ Task B06: Twelve Disciples (200 Pts)
          </button>
          <button
            onClick={() => handleSelectPreset("rev")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              matrix.id.includes("rev")
                ? "bg-[#141414] border-[#141414] text-white"
                : "border-gray-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Revelation 2-3 Churches
          </button>
          <button
            onClick={() => handleSelectPreset("matt")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              matrix.id.includes("matt")
                ? "bg-[#141414] border-[#141414] text-white"
                : "border-gray-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Matthew 13 Four Soils
          </button>
          <button
            onClick={() => handleSelectPreset("blank")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              matrix.id.includes("custom")
                ? "bg-[#141414] border-[#141414] text-white"
                : "border-gray-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            + Create Custom Matrix
          </button>
        </div>
      </div>

      {/* MATRIX CONTROLS BAR */}
      <div className="bg-white border border-[#141414]/20 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        {/* Search input filter */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search matrix observations..."
            className="w-full text-xs pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Quick Add Row/Column Inputs */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={newColHeader}
              onChange={(e) => setNewColHeader(e.target.value)}
              placeholder="New Column Header"
              className="text-xs p-1.5 border border-gray-300 rounded w-36"
            />
            <button
              onClick={handleAddColumn}
              className="px-2.5 py-1.5 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-800"
            >
              + Col
            </button>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="text"
              value={newRowLabel}
              onChange={(e) => setNewRowLabel(e.target.value)}
              placeholder="New Row Category"
              className="text-xs p-1.5 border border-gray-300 rounded w-36"
            />
            <button
              onClick={handleAddRow}
              className="px-2.5 py-1.5 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-800"
            >
              + Row
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 border border-amber-500 text-slate-950 font-extrabold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            title="Download CSV spreadsheet file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>

          <button
            onClick={handleDownloadHTML}
            className="px-3 py-1.5 bg-[#141414] hover:bg-[#252525] text-white font-bold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            title="Print or Save Printable HTML / PDF report"
          >
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={handleCopyJSON}
            className="px-3 py-1.5 border border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-white rounded font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied Matrix" : "Export JSON"}</span>
          </button>
        </div>
      </div>

      {/* RENDERED MATRIX TABLE */}
      <div className="bg-white border-2 border-[#141414] rounded-xl p-5 shadow-sm space-y-4 overflow-hidden">
        {/* Title & Description Header */}
        <div className="border-b border-gray-200 pb-3 flex justify-between items-start">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#141414]">
              {matrix.title}
            </h2>
            <p className="text-xs text-slate-500 italic mt-0.5">
              {matrix.description}
            </p>
          </div>
          <span className="font-mono text-[10px] font-bold uppercase bg-slate-100 px-2 py-1 rounded text-slate-600 border border-slate-300">
            {matrix.columns.length} Cols × {matrix.rows.length} Rows
          </span>
        </div>

        {/* Scrollable Data Table */}
        <div className="overflow-x-auto pb-2 scrollbar-thin">
          <table className="w-full border-collapse text-left text-xs min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-[#141414]">
                {/* Top Left Sticky Header */}
                <th className="p-3 bg-slate-100 border-r-2 border-[#141414] font-serif font-bold text-slate-800 w-44">
                  Matrix Criteria / Rows
                </th>

                {/* Column Headers */}
                {matrix.columns.map((col) => (
                  <th
                    key={col.id}
                    style={{ backgroundColor: col.color || "#F8FAFC" }}
                    className="p-3 border-r border-[#141414]/20 min-w-[160px] align-top relative group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-serif font-bold text-sm text-slate-900 block">
                          {col.header}
                        </span>
                        {col.subtitle && (
                          <span className="font-mono text-[10px] font-bold text-slate-500 block">
                            {col.subtitle}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteColumn(col.id)}
                        className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                        title="Delete Column"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {matrix.rows.map((row, rIdx) => (
                <tr
                  key={row.id}
                  className={`border-b border-[#141414]/20 ${
                    rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  {/* Row Label */}
                  <td className="p-3 font-serif font-bold text-slate-900 border-r-2 border-[#141414] bg-slate-100/80 align-top relative group">
                    <div className="flex justify-between items-center">
                      <span>{row.label}</span>
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                        title="Delete Row"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>

                  {/* Data Cells */}
                  {matrix.columns.map((col) => {
                    const key = `${row.id}_${col.id}`;
                    const content = matrix.cells[key] || "";
                    const isMatchesSearch =
                      searchTerm.trim() !== "" &&
                      content.toLowerCase().includes(searchTerm.toLowerCase());

                    return (
                      <td
                        key={col.id}
                        onClick={() => handleCellClick(row.id, col.id)}
                        className={`p-3 border-r border-[#141414]/15 align-top cursor-pointer transition-colors hover:bg-emerald-50/40 relative ${
                          isMatchesSearch ? "bg-yellow-100 ring-2 ring-amber-400" : ""
                        }`}
                      >
                        <div className="text-[11px] leading-relaxed text-slate-800 font-sans min-h-[40px]">
                          {content ? (
                            content
                          ) : (
                            <span className="text-slate-300 italic text-[10px]">
                              + Click to add data
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CELL EDITING MODAL */}
      {editingCellKey && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#141414] rounded-xl p-5 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-base border-b border-gray-200 pb-2">
              Edit Matrix Cell Data
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                Cell Observation Content
              </label>
              <textarea
                rows={4}
                value={cellText}
                onChange={(e) => setCellText(e.target.value)}
                className="w-full text-xs p-2.5 border border-gray-300 rounded font-sans focus:ring-1 focus:ring-black"
                placeholder="Enter detailed matrix cell observation..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => setEditingCellKey(null)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCell}
                className="px-4 py-1.5 bg-[#141414] text-white rounded text-xs font-bold hover:bg-black/90"
              >
                Save Cell
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
