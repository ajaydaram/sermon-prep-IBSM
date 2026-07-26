export interface LexiconEntry {
  strongsNumber: string;
  lemma: string;
  transliteration: string;
  pronunciation: string;
  language: "Greek" | "Hebrew" | "Aramaic";
  partOfSpeech: string;
  gloss: string;
  semanticRange: {
    definition: string;
    nuance: string;
    sampleReferences: string[];
  }[];
  canonFrequency: number;
  frequencyBreakdown: {
    section: string;
    count: number;
  }[];
  concordanceEntries: {
    reference: string;
    text: string;
    highlightedTerm: string;
  }[];
}

export interface PedagogyGateState {
  minObservationsRequired: number;
  bypassGate: boolean;
  userObservations: string[];
}

export interface Observation {
  text: string;
}

export interface ObservationEvaluation {
  index: number;
  studentText: string;
  isValid: boolean;
  category: string;
  explanation: string;
  feedback: string;
  score: number;
  correctedForm: string;
}

export interface BigIdeaEvaluation {
  subjectAnalysis: string;
  impliedQuestion: string;
  complementAnalysis: string;
  compiledSentence: string;
  isValidBigIdea: boolean;
  score: number;
  critiqueAndSuggestions: string;
}

export interface ConsultationInsights {
  bookName: string;
  author: string;
  dateOfWriting: string;
  historicalSetting: string;
  recipients: string;
  occasionAndPurpose: string;
  genre: string;
  keyThemes: string;
}

export interface DetectedLaw {
  lawName: string;
  keyVerses: string;
  evidenceText: string;
  explanation: string;
}

export interface StructuralAnalysis {
  passageReference: string;
  detectedLaws: DetectedLaw[];
  summaryOfStructure: string;
}

export interface ChartColumn {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  reference: string;
  perspective: "Past" | "Present" | "Future" | "N/A";
  tone: "Gratitude" | "Encouraging" | "Concern" | "Command" | "N/A";
}

export interface BookChartData {
  chartTitle: string;
  theme: string;
  columns: ChartColumn[];
}

export type HierarchyScopeLevel = "bird" | "meso" | "worm";

export interface CanvasBlock {
  id: string;
  label: string;
  reference: string;
  level: "Division" | "Segment" | "Paragraph" | "Sentence";
  x: number;
  y: number;
  width: number;
  height: number;
  parentId?: string;
  color?: string;
  text?: string;
  notes?: string;
  perspective?: "Past" | "Present" | "Future" | "N/A";
  tone?: "Gratitude" | "Encouraging" | "Concern" | "Command" | "N/A";
}

export interface CanvasConnection {
  id: string;
  sourceId: string;
  targetId: string;
  relationType: "Comparison" | "Contrast" | "CauseEffect" | "Climax" | "Repetition" | "GeneralSpecific" | "Proportion";
  label?: string;
  style?: "solid" | "dashed" | "curved";
}

export interface SentenceGrammarNode {
  id: string;
  verseRef: string;
  clauseType: "Main Clause" | "Subordinate Clause" | "Prepositional Phrase" | "Conjunction" | "Verbal Modifier" | "Direct Object";
  originalText: string;
  translationText: string;
  modifierTargetId?: string;
  indentLevel: number;
  colorCode?: string;
  notes?: string;
}

export interface MatrixColumn {
  id: string;
  header: string;
  subtitle?: string;
  color?: string;
}

export interface MatrixRow {
  id: string;
  label: string;
  category?: string;
}

export interface MatrixGrid {
  id: string;
  title: string;
  description: string;
  columns: MatrixColumn[];
  rows: MatrixRow[];
  cells: Record<string, string>; // Key: `${rowId}_${colId}`
}

export interface VerbTenseIssue {
  location: string;
  originalText: string;
  flaggedVerb: string;
  issueExplanation: string;
  suggestedCorrection: string;
  correctedSentence: string;
}

export interface StructuralOutlineIssue {
  lineIdentifier: string;
  originalHeading: string;
  isCompleteSentence: boolean;
  subjectFound: string;
  complementFound: string;
  issueExplanation: string;
  suggestedSentence: string;
}

export interface HarmonizationFinding {
  category: string;
  status: "Harmonized" | "Warning" | "Contradiction";
  analysis: string;
  recommendation: string;
}

export interface CitationIssue {
  location: string;
  originalCitation: string;
  ruleViolated: string;
  explanation: string;
  correctedCitation: string;
}

export interface AuditLinterResult {
  overallScore: number;
  summaryStatus: "Pass with Distinction" | "Minor Revisions Required" | "Action Required";
  verbTenseAudit: {
    score: number;
    passed: boolean;
    issuesCount: number;
    items: VerbTenseIssue[];
  };
  structuralOutlineAudit: {
    score: number;
    passed: boolean;
    items: StructuralOutlineIssue[];
  };
  harmonizationAudit: {
    score: number;
    passed: boolean;
    overallAlignmentRating: string;
    findings: HarmonizationFinding[];
  };
  citationAudit: {
    score: number;
    passed: boolean;
    items: CitationIssue[];
  };
  autoCorrectedDraft: {
    theme: string;
    sentenceOutline: string;
    argumentProse: string;
    summaryOfChanges: string[];
  };
}

// The Scribe Ezra Library Types
export interface StudyProject {
  id: string;
  title: string;
  bookTitle: string;
  passageRef: string;
  tags: string[]; // e.g. ["Sermon Series: Ephesians", "Small Group: Haggai"]
  author: string;
  date: string;
  historicalSetting: string;
  occasionPurpose: string;
  theme: string;
  simpleOutline: string;
  sentenceOutline: string;
  argumentProse: string;
  observations: string[];
  bookChartColumns?: ChartColumn[];
  createdDate: string;
  lastModified: string;
  status: "Draft" | "Peer Review" | "Final Exegesis" | "Teaching Ready";
}

// Real-Time Collaboration Types
export interface CollaboratorPresence {
  id: string;
  name: string;
  role: "Professor" | "Pastor" | "Group Member" | "Student";
  color: string;
  activeTab: string;
  lastActive: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  user: string;
  userColor: string;
  action: string;
  details: string;
}

export interface CollaborativeRoomState {
  roomId: string;
  roomName: string;
  studyProject: StudyProject;
  collaborators: CollaboratorPresence[];
  activityLogs: ActivityLogItem[];
  sharedNotes: string;
}

// Teaching Slide Deck Export Types
export interface TeachingSlide {
  id: number;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  keyPassageVerse?: string;
  teacherNotes: string;
  bgStyle: "scholarly-dark" | "academic-gold" | "clean-parchment" | "deep-[#141414]";
}


