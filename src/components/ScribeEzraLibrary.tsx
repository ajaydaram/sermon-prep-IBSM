import React, { useState, useEffect } from "react";
import {
  FolderKanban,
  Search,
  Plus,
  Tag,
  Calendar,
  BookOpen,
  ArrowUpDown,
  Download,
  Upload,
  Copy,
  Trash2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  Filter,
  Bookmark,
  Share2,
  Edit3
} from "lucide-react";
import { StudyProject } from "../types";

interface ScribeEzraLibraryProps {
  onLoadProject?: (project: StudyProject) => void;
  activeProjectId?: string;
}

const SEED_PROJECTS: StudyProject[] = [
  {
    id: "proj_haggai_01",
    title: "Temple Restoration & Present Hope",
    bookTitle: "HAGGAI",
    passageRef: "Haggai 1:1-15",
    tags: ["Sermon Series: Haggai", "Small Group: Haggai", "BS510 Exegesis"],
    author: "Haggai the Prophet (Jerusalem)",
    date: "520 BC (Darius 2nd Year)",
    historicalSetting: "Post-exilic Jewish remnant returned under Zerubbabel. Building of the second temple lay dormant for 16 years.",
    occasionPurpose: "To rouse the community from economic self-indulgence and spiritual lethargy to rebuild YHWH's temple.",
    theme: "Israel can experience present covenant blessing and hope through prioritizing the rebuilding of God's house.",
    simpleOutline: "I. FIRST MESSAGE: CALL TO AROUSE (1:1-15)\n  A. Indifference and Indulgence Exposed (1:1-4)\n  B. Economic Consequences Detailed (1:5-11)\n  C. Rebuilding Commenced in Obedience (1:12-15)",
    sentenceOutline: "I. Israel and its leadership should rise from their lethargy and thus build the temple. (1:1-15)\n  A. The two reasons the building of God's house had ceased are the people's indifference and self-indulgence. (1:1-4)\n  B. YHWH withholding covenant fruitfulness was the direct outcome of neglecting his house. (1:5-11)",
    argumentProse: "Haggai immediately referred to the temple and pointed out that building had ceased in 1 Chron 11:1. Haggai wrote that this displayed an indifference to God. Conversely, this also exhibited self-indulgence while the common folk lived in paneled homes while God's house lay ruined.",
    observations: [
      "The passage in Haggai 1:1 specifies the second year of Darius the king.",
      "Zerubbabel son of Shealtiel governor of Judah and Joshua son of Jehozadak high priest are explicitly addressed.",
      "The phrase 'Consider your ways' is repeated twice (1:5, 1:7).",
      "Economic futility verbs appear in staccato: sown much/harvested little, eat/not filled, drink/not satisfied.",
      "The spirit of Zerubbabel and the spirit of Joshua and the spirit of all the remnant were stirred by YHWH."
    ],
    createdDate: "2026-07-10T09:30:00Z",
    lastModified: "2026-07-22T14:15:00Z",
    status: "Teaching Ready",
  },
  {
    id: "proj_ephesians_02",
    title: "Made Alive in Christ & Grace through Faith",
    bookTitle: "EPHESIANS",
    passageRef: "Ephesians 2:1-10",
    tags: ["Sermon Series: Ephesians", "SOT Doctrine", "Exegesis Paper"],
    author: "Paul the Apostle (Rome Prisoner)",
    date: "AD 60-62",
    historicalSetting: "Written during Paul's first Roman imprisonment to believers in Asia Minor centering on the cosmic church.",
    occasionPurpose: "To explain the glorious transition from spiritual death to resurrected life in Christ purely by grace.",
    theme: "Believers are resurrected from spiritual death into new creation life by divine grace through faith for good works.",
    simpleOutline: "I. OUR PAST CONDITION: DEAD IN TRESPASSES (2:1-3)\nII. GOD'S MERCIFUL ACTION: MADE ALIVE (2:4-7)\nIII. OUR PRESENT PURPOSE: HIS WORKMANSHIP (2:8-10)",
    sentenceOutline: "I. Humanity was formerly spiritually dead and enslaved to worldly powers and sinful desires. (2:1-3)\nII. God in rich mercy made believers alive together with Christ through sovereign grace. (2:4-7)\nIII. Believers are created anew in Christ Jesus specifically to walk in pre-prepared good works. (2:8-10)",
    argumentProse: "Paul formerly described the Gentile condition in stark terms of spiritual mortality. But God, being rich in mercy, intervened decisively. By grace you have been saved through faith, and this is not from yourselves.",
    observations: [
      "The conjunction 'And' opens verse 1 connecting back to Christ's resurrection power in 1:19-23.",
      "'Dead in trespasses and sins' describes universal human state.",
      "The turning point conjunction 'But God' (Deos de) in verse 4 introduces divine mercy.",
      "'Workmanship' translates poiēma, implying God's master artistic creation."
    ],
    createdDate: "2026-07-15T11:00:00Z",
    lastModified: "2026-07-21T18:40:00Z",
    status: "Final Exegesis",
  },
  {
    id: "proj_acts_01",
    title: "Holy Spirit Power & Global Witness",
    bookTitle: "ACTS",
    passageRef: "Acts 1:1-11",
    tags: ["Small Group: Haggai", "Hermeneutics BS510", "Sermon Series: Acts"],
    author: "Luke the Physician",
    date: "AD 62",
    historicalSetting: "Post-resurrection 40-day instruction period in Jerusalem prior to Ascension and Pentecost.",
    occasionPurpose: "To prepare the apostles for world mission empowered by the Holy Spirit.",
    theme: "The resurrected Christ equips his church with Holy Spirit power to bear witness to the ends of the earth.",
    simpleOutline: "I. PROMISE OF THE SPIRIT (1:1-5)\nII. MANDATE OF GLOBAL WITNESS (1:6-8)\nIII. ASCENSION & RETURN PROMISE (1:9-11)",
    sentenceOutline: "I. Jesus instructed the apostles to await the promised Holy Spirit in Jerusalem. (1:1-5)\nII. The Holy Spirit empowers believers to be witnesses from Jerusalem to the remotest parts of the earth. (1:6-8)",
    argumentProse: "Luke recorded the final instructions of the risen Lord before ascension. Power was promised upon the arrival of the Holy Spirit.",
    observations: [
      "Adversative 'but' opens verse 8 contrasting political kingdom restoration with spiritual power.",
      "Geographical progression moves from local (Jerusalem) to global (end of the earth).",
      "'Witnesses' translates martyres."
    ],
    createdDate: "2026-07-18T16:20:00Z",
    lastModified: "2026-07-23T01:05:00Z",
    status: "Draft",
  },
  {
    id: "proj_2timothy_01",
    title: "Be Faithful: Charge to Timothy in Hard Times",
    bookTitle: "2 TIMOTHY",
    passageRef: "2 Timothy 1:1-4:22",
    tags: ["BS510 Exegesis", "Book Chart", "Pauline Epistles"],
    author: "Paul the Apostle (Roman Dungeon)",
    date: "AD 67",
    historicalSetting: "Under Nero's reign (54-68 AD), Christianity became an illicit religion. Paul was arrested and imprisoned in a cold Roman cell awaiting execution.",
    occasionPurpose: "To encourage Timothy's ministry at Ephesus, charging him to follow Paul, endure suffering, and stay faithful to God's word.",
    theme: "The purpose of this epistle is to charge Timothy to follow Paul, continue to endure suffering, and be faithful to God's word in hard times.",
    simpleOutline: "BE FAITHFUL\nI. Salutation (1:1-2)\nII. Thanksgiving (1:3-7)\nIII. Faithful in Suffering (1:8-2:13)\n  A. Charge (1:8-14)\n  B. Particulars (1:15-2:13)\n    1. Example (1:15-18)\n    2. Image (2:1-7)\n    3. Promise (2:8-13)\nIV. Faithful to Truth (2:14-4:8)\n  A. Godliness (2:14-26)\n    1. Problem (2:14-19)\n    2. Work to Honor (2:20-26)\n  B. Right Doctrine (3:1-17)\n    1. Problem (3:1-9)\n    2. Continue in Truth (3:10-17)\n  C. Preach the Word (4:1-8)\n    1. Charge (4:1-5)\n    2. Reason (4:6-8)\nV. Remarks (4:9-18)\n  A. Requests (4:9-15)\n  B. God's Power (4:16-18)\nVI. Greeting (4:19-22)",
    sentenceOutline: "The purpose of this epistle is to charge Timothy to follow Paul, continue to endure suffering, and be faithful to God's word in hard times.\nI. The salutation of this epistle is a greeting from Paul to his beloved son Timothy. (1:1-2)\nII. The thanksgiving of this epistle is giving thanks for Timothy's faith inherited from his grandmother and mother. (1:3-7)\nIII. The charge that Paul asked Timothy for is to join with him in suffering unashamedly, faithfully, and depending on Christ. (1:8-2:13)\n  A. The charge that Paul asked Timothy for is to join with him in suffering for the gospel according to the power of God without being ashamed. (1:8-14)\n  B. The quality that Paul charged Timothy to have in suffering is he would not be ashamed, but be strong, faithful, and depending on Christ. (1:15-2:13)\n    1. The reason why Onesiphorus' services in Rome and Ephesus were told is to honor his willingness to suffer with Paul and being not ashamed. (1:15-18)\n    2. The purpose of using images of a soldier, an athlete, and a farmer is to charge him to be strong and faithful, and suffer with Paul. (2:1-7)\n    3. The promise that Paul reminded Timothy is Christ has risen and we'd reign with Him if we endure because He is faithful. (2:8-13)\nIV. The charge from Paul to Timothy is to pursue godliness, continue in correct teachings, and faithfully preach the word in hard times. (2:14-4:8)\n  A. The charge from Paul to Timothy is to pursue godliness to honor the Lord and charge the ungodly people who has gone astray from the truth. (2:14-26)\n    1. The problem of the people that Paul asked Timothy to charge are their ungodliness which have led them to go astray from the truth. (2:14-19)\n    2. The charge from Paul to Timothy is to ask him to pursue godliness with those who with a pure heart in order to honor the Lord. (2:20-26)\n  B. The reminder from Paul to Timothy is to avoid the men opposing the truth, follow his persecutions, and continue in correct teachings in difficult times. (3:1-17)\n    1. The reminder from Paul to Timothy is to avoid the men who are superficially learning the truth but in fact opposing the truth in the difficult times. (3:1-9)\n    2. The charge from Paul to Timothy is asking Timothy to follow his persecutions and continue in correct teachings that he has learned in difficult times. (3:10-17)\n  C. The charge from Paul to Timothy is to faithfully preach the word against oppositions and endure the hardship for Paul is about to die. (4:1-8)\n    1. The charge from Paul to Timothy is to endure hardship and diligently preach the word in the face of oppositions. (4:1-5)\n    2. The reason of the charge is Paul was closing to his death and he is going to be rewarded for his faithfulness until the end. (4:6-8)\nV. The remark is asking Timothy to go to Paul soon and bring him the things that he needed, remembering God's faithfulness in difficult times. (4:9-18)\n  A. The requests from Paul are asking Timothy to go to him soon with Mark, his cloak and the books since different people have left him. (4:9-15)\n  B. The remark made by Paul is the Lord has faithfully sustained him and powerfully rescued him from every evil deed. (4:16-18)\nVI. The closing greeting from Paul and his coworkers is regarding the coworkers of Timothy and to request him again to go to Paul soon. (4:19-22)",
    argumentProse: "Paul wrote this epistle when he was imprisoned in a Roman cell. He realized that he was approaching his death (4:6), so this epistle could be his final reminder to Timothy his spiritual son, encouraging him to endure in hard times, and charging him to stay faithful in the ministry of God's word. The salutation is a greeting from Paul to his beloved son Timothy (1:1-2). Paul then gave thanks to God about Timothy for how he had inherited his faith from his grandmother and mother (1:3-7). Paul charged Timothy to join with him in suffering for the gospel according to the power of God without being ashamed (1:8-14). He honored Onesiphorus for his willingness to suffer with Paul (1:15-18), used images of a soldier, athlete, and farmer to charge Timothy to be strong and faithful (2:1-7), and reminded him of Christ's resurrection (2:8-13). Paul charged Timothy to pursue godliness (2:14-26), avoid men opposing the truth (3:1-9), follow Paul's persecutions and continue in Scripture (3:10-17), preach the word in all seasons (4:1-8), visit Paul soon with Mark, cloak, and books (4:9-15), testifying that the Lord faithfully rescued him (4:16-18), and concluded with personal greetings and benediction (4:19-22).",
    observations: [
      "Paul writes from a Roman cell, expecting imminent martyrdom (4:6).",
      "Timothy inherited sincere faith from his grandmother Lois and mother Eunice (1:5).",
      "Three metaphors of endurance are used: soldier (2:3-4), athlete (2:5), and hard-working farmer (2:6).",
      "Hymenaeus and Philetus upset faith by teaching resurrection had already happened (2:17-18).",
      "All Scripture is inspired by God (theopneustos) and profitable for teaching, reproof, correction, and training in righteousness (3:16-17)."
    ],
    createdDate: "2026-07-20T08:00:00Z",
    lastModified: "2026-07-23T12:00:00Z",
    status: "Final Exegesis",
  },
  {
    id: "proj_daniel_01",
    title: "God's Sovereignty Over Individuals & Nations",
    bookTitle: "DANIEL",
    passageRef: "Daniel 1:1-5:31",
    tags: ["BS510 Exegesis", "Old Testament", "Prophetic/Apocalyptic"],
    author: "Daniel the Statesman (Babylon)",
    date: "605 - 536 BC",
    historicalSetting: "Deported to Babylon as a royal hostage in 605 BC under Nebuchadnezzar. Daniel lived through Assyrian decline, Egyptian control, Babylonian captivity, and Persian rise.",
    occasionPurpose: "To demonstrate God's absolute sovereignty over earthly empires, kings, and faithful individuals through trials and visions.",
    theme: "God demonstrates His absolute sovereignty over individuals and pagan nations through preserving His faithful servants and humbling earthly rulers.",
    simpleOutline: "I. GOD'S SOVEREIGNTY OVER INDIVIDUALS (1:1-21)\n  A. Judah Humbled by God (1:1-2)\n  B. Youth Deported (1:3-7)\n  C. Four Trust God (1:8-16)\n    1. The Resolve (1:8)\n    2. The Request (1:9-14)\n    3. The Result (1:15-16)\n  D. Four Exalted by God (1:17-21)\nII. GOD'S SOVEREIGNTY OVER NATIONS (2:1-7:28)\n  A. Dream of Nebuchadnezzar #1 (Statue) (2:1-49)\n  B. Image of Nebuchadnezzar (3:1-30)\n  C. Dream of Nebuchadnezzar #2 (Tree) (4:1-37)\n  D. Feast of Belshazzar (5:1-31)",
    sentenceOutline: "I. God demonstrates His sovereignty over individuals by humbling Judah and exalting four faithful royal hostages in Babylon. (1:1-21)\n  A. Jehovah used Nebuchadnezzar to humble Judah by military conquest and temple utensil seizure. (1:1-2)\n  B. Royal youth were deported to receive Babylonian education. (1:3-7)\n  C. Four hostages trusted God by requesting kosher food and passing a ten-day trial. (1:8-16)\n  D. God exalted the four with learning and wisdom to enter royal service. (1:17-21)\nII. God demonstrates His sovereignty over nations by revealing Gentile empire collapse and humbling arrogant pagan kings. (2:1-5:31)",
    argumentProse: "The statesman Daniel witnessed Jerusalem controlled by Assyria, Egypt, Babylon, and Persia. God humbled Judah in 605 BC (1:1-2) and royal youth were deported (1:3-7). Four hostages trusted God by refusing defilement (1:8-16) and God exalted them into kingly service (1:17-21). God demonstrated sovereignty over nations through Nebuchadnezzar's dream test (2:1-16), revealing Gentile domination, preserving the three friends in the furnace (3:1-30), humbling Nebuchadnezzar like a beast (4:1-37), and declaring the doom of Belshazzar (5:1-31).",
    observations: [
      "Daniel was deported in the first Babylonian deportation (605 BC).",
      "Daniel prayed toward Jerusalem three times daily (6:10).",
      "The ten-day kosher food test demonstrated God's blessing over human diet rules (1:12-16).",
      "Carchemish battle (605 BC) established Babylonian dominance over Egypt.",
      "The book is classified in the Writings (Kethuvim) rather than Prophets in the Hebrew Canon."
    ],
    createdDate: "2026-07-22T10:00:00Z",
    lastModified: "2026-07-23T14:30:00Z",
    status: "Final Exegesis",
  },
  {
    id: "proj_melchizedek_01",
    title: "The Eternal Priesthood of Christ (Melchizedek)",
    bookTitle: "HEBREWS",
    passageRef: "Hebrews 7:1-28",
    tags: ["Christology", "High Priesthood", "Hebrews", "Melchizedek", "BS510 Exegesis"],
    author: "Author of Hebrews (To Jewish Believers)",
    date: "AD 64-68",
    historicalSetting: "Written to Jewish Christians facing persecution and tempted to relapse into Levitical Judaism. The author demonstrates Christ's absolute superiority over Old Covenant institutions.",
    occasionPurpose: "To establish that Jesus Christ is our eternal High Priest after the order of Melchizedek, inaugurating a superior covenant based on an indestructible life.",
    theme: "Jesus Christ possesses an eternal and superior high priesthood according to the order of Melchizedek, replacing the temporary Levitical system to save believers completely.",
    simpleOutline: "I. THE HISTORICAL PERSON & SUPERIORITY OF MELCHIZEDEK (7:1-10)\n  A. Identity of Melchizedek as King & Priest (7:1-3)\n  B. Melchizedek's Greatness over Abraham & Levi (7:4-10)\nII. THE NEED FOR A NEW PRIESTLY ORDER (7:11-19)\n  A. Imperfection of the Levitical Priesthood (7:11-14)\n  B. Inauguration of a Better Hope (7:15-19)\nIII. THE ETERNAL & PERFECT PRIESTHOOD OF JESUS (7:20-28)\n  A. Divine Oath & Guarantor of a Better Covenant (7:20-22)\n  B. Perpetual Intercession & Sinless Sacrifice (7:23-28)",
    sentenceOutline: "I. Melchizedek was superior to Abraham and the Levitical priesthood because Abraham paid tithes to him and received his blessing. (7:1-10)\n  A. Melchizedek combined kingly righteousness and peace with perpetual priesthood without genealogical origin. (7:1-3)\n  B. Abraham giving a tenth of spoils demonstrated Melchizedek's preeminence over the patriarch and Levi. (7:4-10)\nII. The arrival of a priest according to the order of Melchizedek required a change of law and inaugurated a better covenant. (7:11-19)\n  A. The Levitical priesthood could not bring perfection, necessitating a priest from Judah. (7:11-14)\n  B. Jesus arose as priest based on the power of an indestructible life rather than physical ancestry. (7:15-19)\nIII. Jesus guarantees a superior covenant forever because He holds a permanent priesthood and intercedes perpetually for believers. (7:20-28)\n  A. God confirmed Christ's priesthood with a divine oath, making Him guarantor of a better covenant. (7:20-22)\n  B. Jesus is able to save completely those who draw near to God because He lives forever to intercede for them. (7:23-28)",
    argumentProse: "The author of Hebrews established that Melchizedek king of Salem and priest of God Most High (Gen 14:18-20) prefigured the eternal priesthood of Jesus Christ. Melchizedek received tithes from Abraham and blessed him (7:1-4). Since the lesser is blessed by the greater, Melchizedek was superior to Abraham, and by extension Levi paid tithes while still in Abraham's body (7:5-10). The appointment of a priest after Melchizedek rather than Aaron (Ps 110:4) proved the Levitical system was imperfect (7:11-14). Jesus became priest not through physical descent, but through the power of an indestructible life (7:15-19). Sworn with a divine oath, Jesus is the guarantor of a better covenant (7:20-22). Unlike mortal Levitical priests who died, Jesus holds a permanent priesthood and is able to save to the uttermost those who draw near to God through Him, offering Himself once for all as a sinless sacrifice (7:23-28).",
    observations: [
      "Melchizedek means 'King of Righteousness' and Salem means 'Peace' (7:2).",
      "Melchizedek appears without father, mother, or recorded genealogy to typify an eternal priesthood (7:3).",
      "Levi paid tithes to Melchizedek while still in the loins of his forefather Abraham (7:9-10).",
      "Jesus was appointed priest by divine oath: 'The Lord has sworn and will not change His mind' (7:21, Ps 110:4).",
      "Jesus is able to save to the uttermost (eis to panteles) because He always lives to intercede for believers (7:25)."
    ],
    createdDate: "2026-07-24T08:00:00Z",
    lastModified: "2026-07-24T09:00:00Z",
    status: "Final Exegesis",
  }
];

export default function ScribeEzraLibrary({ onLoadProject, activeProjectId }: ScribeEzraLibraryProps) {
  const [projects, setProjects] = useState<StudyProject[]>(() => {
    const saved = localStorage.getItem("scribe_ezra_library_projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const existingIds = new Set(parsed.map((p: any) => p.id));
        const missingSeeds = SEED_PROJECTS.filter((seed) => !existingIds.has(seed.id));
        if (missingSeeds.length > 0) {
          return [...missingSeeds, ...parsed];
        }
        return parsed;
      } catch (e) { /* ignore fallback */ }
    }
    return SEED_PROJECTS;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"modified" | "title" | "book">("modified");
  const [showNewModal, setShowNewModal] = useState(false);

  // New project form state
  const [newTitle, setNewTitle] = useState("");
  const [newBookTitle, setNewBookTitle] = useState("GENESIS");
  const [newPassageRef, setNewPassageRef] = useState("Genesis 1:1-31");
  const [newTagInput, setNewTagInput] = useState("Sermon Series: Genesis");

  useEffect(() => {
    localStorage.setItem("scribe_ezra_library_projects", JSON.stringify(projects));
  }, [projects]);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags || []))
  );

  // Filter and sort
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.passageRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.theme.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === "ALL" || p.tags?.includes(selectedTag);
    const matchesStatus = selectedStatus === "ALL" || p.status === selectedStatus;

    return matchesSearch && matchesTag && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "book") return a.bookTitle.localeCompare(b.bookTitle);
    return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProject: StudyProject = {
      id: `proj_${Date.now()}`,
      title: newTitle.trim(),
      bookTitle: newBookTitle.toUpperCase().trim(),
      passageRef: newPassageRef.trim(),
      tags: newTagInput ? newTagInput.split(",").map((t) => t.trim()) : ["Exegesis Paper"],
      author: "",
      date: "",
      historicalSetting: "",
      occasionPurpose: "",
      theme: "",
      simpleOutline: "I. DIVISION 1\n  A. Paragraph 1\n  B. Paragraph 2",
      sentenceOutline: "I. The complete sentence subject + complement statement.",
      argumentProse: "",
      observations: ["Initial observation for " + newPassageRef],
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      status: "Draft",
    };

    setProjects([newProject, ...projects]);
    setNewTitle("");
    setShowNewModal(false);

    if (onLoadProject) {
      onLoadProject(newProject);
    }
  };

  const handleDuplicateProject = (project: StudyProject) => {
    const duplicated: StudyProject = {
      ...project,
      id: `proj_${Date.now()}`,
      title: `${project.title} (Copy)`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      status: "Draft",
    };
    setProjects([duplicated, ...projects]);
  };

  const handleDeleteProject = (id: string) => {
    if (projects.length <= 1) {
      alert("You must keep at least one study project in your Scribe Ezra Library.");
      return;
    }
    if (confirm("Are you sure you want to delete this study project from your library?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `scribe_ezra_library_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            setProjects([...parsed, ...projects]);
            alert(`Successfully imported ${parsed.length} projects into your Scribe Ezra Library!`);
          }
        } catch (err) {
          alert("Invalid JSON format for Scribe Ezra Library archive.");
        }
      };
    }
  };

  return (
    <div className="space-y-6" id="ezra-library-root">
      {/* Header Banner */}
      <div className="bg-[#141414] text-[#E4E3E0] border border-[#141414] rounded-xl p-5 shadow-md flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-400 text-[#141414] rounded-lg shrink-0 font-bold">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-wider font-bold bg-[#E4E3E0]/20 text-amber-300 px-2 py-0.5 rounded">
                Durable Personal Repository
              </span>
              <span className="text-xs font-mono text-slate-300">Scribe Ezra Edition</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              The Scribe Ezra Exegetical Library
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Organize, search, tag, and persist all your Inductive Bible Studies in one structured academic repository. Switch active workspace sessions instantly across sermon series, small group guides, and exegesis term papers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Study Project
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
            title="Export Backup Archive"
          >
            <Download className="w-4 h-4" />
            Backup Library
          </button>
          <label className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-white/20">
            <Upload className="w-4 h-4" />
            Restore
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search title, book, passage, or theme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-800"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Tag Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:outline-none"
            >
              <option value="ALL">All Series / Tags ({projects.length})</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Peer Review">Peer Review</option>
              <option value="Final Exegesis">Final Exegesis</option>
              <option value="Teaching Ready">Teaching Ready</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:outline-none font-mono"
            >
              <option value="modified">Sort: Last Modified</option>
              <option value="title">Sort: Project Title</option>
              <option value="book">Sort: Book Name</option>
            </select>
          </div>
        </div>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => {
          const isActive = activeProjectId === project.id;
          return (
            <div
              key={project.id}
              className={`bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative ${
                isActive
                  ? "border-amber-500 ring-2 ring-amber-400/30"
                  : "border-gray-200 hover:border-slate-400"
              }`}
            >
              {isActive && (
                <span className="absolute -top-2.5 right-4 bg-amber-500 text-slate-950 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Active Workspace Session
                </span>
              )}

              <div className="space-y-2.5">
                {/* Book & Status */}
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-slate-900 text-sm tracking-wider uppercase border-b-2 border-amber-400 pb-0.5">
                    {project.bookTitle} ({project.passageRef})
                  </span>
                  <span
                    className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded ${
                      project.status === "Teaching Ready"
                        ? "bg-emerald-100 text-emerald-900"
                        : project.status === "Final Exegesis"
                        ? "bg-blue-100 text-blue-900"
                        : project.status === "Peer Review"
                        ? "bg-purple-100 text-purple-900"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-serif text-base font-semibold text-slate-900 leading-snug">
                  {project.title}
                </h4>

                {/* Theme preview */}
                {project.theme ? (
                  <p className="text-xs text-slate-600 line-clamp-2 italic font-serif bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    "{project.theme}"
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 italic">No central message theme formulated yet.</p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="text-[9px] font-mono bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-md hover:bg-amber-100 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {new Date(project.lastModified).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDuplicateProject(project)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                    title="Duplicate Study"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                    title="Delete Study"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onLoadProject && onLoadProject(project)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Load
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl space-y-3">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">No Study Projects Found</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search query or tag filter, or click "New Study Project" to begin a new study.
          </p>
        </div>
      )}

      {/* New Study Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-900 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-500" />
                Create New Scribe Ezra Study
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Study Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Haggai Rebuilding & Present Hope"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Book Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HAGGAI"
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value.toUpperCase())}
                    className="w-full text-xs font-serif border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Passage Reference
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Haggai 1:1-15"
                    value={newPassageRef}
                    onChange={(e) => setNewPassageRef(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Series / Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sermon Series: Haggai, Small Group: Haggai"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border text-xs font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Create & Open
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
