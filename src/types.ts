export interface InstructorInfo {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  notes: string;
}

export interface GraduateProfileArea {
  area: string;
  outcome: string;
  alignment: 'STRONG' | 'MODERATE' | 'MINIMAL' | 'NONE';
  justification: string;
}

export interface LearningOutcomeCategory {
  category: 'KNOW (Cognitive)' | 'DO (Conative)' | 'BE (Affective)';
  outcomes: string[];
}

export interface LearningTask {
  id: string;
  title: string;
  dueDate: string;
  timeHours: number;
  timeTotalHours: number;
  points: number;
  description: string;
  rationale: string;
}

export interface ScheduleSession {
  sessionNum: number;
  date: string;
  module: string;
  preClass: string;
  classBites: string[];
  tasksDue: string[];
}

// Student Data types stored in localStorage
export interface StudentObservation {
  id: string;
  text: string;
  isValid: boolean;
  errors: string[];
}

export interface StudentJonahLog {
  readings: {
    id: number;
    date: string;
    time: string;
    translation: string;
    completed: boolean;
  }[];
  valueReflection: string;
  fifthReadingInsights: string;
  purposeThoughts: string;
}

export interface StudentQuestion {
  id: string;
  category: 'Jesus' | 'Woman' | 'Pharisees' | 'Disciples' | 'Author' | 'Audience';
  text: string;
}

export interface StudentDisciplesChart {
  matthew10: string[];
  mark3: string[];
  luke6: string[];
  acts1: string[];
  observations: string;
}

export interface StudentHelperStudy {
  step1Culture: string;
  step2HebrewNum: string;
  step2GreekNum: string;
  step3OtObservations: string;
  step4Synthesis: string;
}

export interface StudentConflictResolution {
  cultureName: string;
  unbelieverMethod: string;
  believerMethod: string;
  studentStudent: string;
  studentFaculty: string;
  facultyFaculty: string;
}

export interface StudentBibliographySource {
  id: string;
  type: 'journal' | 'internet';
  authors: string;
  title: string;
  publication: string;
  date: string;
  urlOrPages: string;
}

export interface StudentResearchPaper {
  title: string;
  outline: Record<string, string>;
  sources: StudentBibliographySource[];
}

export interface StudentResearchPapersState {
  slavery: StudentResearchPaper;
  jonahBackground: StudentResearchPaper;
}

export interface BookChartRow {
  id: string;
  segment: string;
  title: string;
  relations: string;
  grade?: string;
  actor?: string;
  groupHeader?: string;
  subGroupHeader?: string;
  genre?: string;
  godAction?: string;
  setting?: string;
}

export interface StudentArgument {
  bookChartTheme?: string;
  bookNameLabel?: string;
  actorRowLabel?: string;
  gradeRowLabel?: string;
  introductoryMaterial: string;
  bookChart: BookChartRow[];
  gridChart: {
    headers: string[];
    rows: { id: string; label: string; cells: string[] }[];
  };
  simpleOutline: string;
  sentenceOutline: string[];
  argumentText: string;
}

export interface StudentArgumentsState {
  mark: StudentArgument;
  jonah: StudentArgument;
  philemon: StudentArgument;
  custom: StudentArgument;
}

export interface StudentInfographicPlan {
  infographicNotes: string;
  audienceSize: string;
  presentationDate: string;
  zoomLink: string;
  lessonPlan: string;
  questionsLogged: string;
  reportNotes: string;
}

export interface StudentAppState {
  taskStatus: Record<string, 'not_started' | 'in_progress' | 'done'>;
  taskScores: Record<string, number>;
  actsObservations: StudentObservation[];
  jonahLog: StudentJonahLog;
  johnQuestions: StudentQuestion[];
  disciplesChart: StudentDisciplesChart;
  helperStudy: StudentHelperStudy;
  conflictResolution: StudentConflictResolution;
  researchPapers: StudentResearchPapersState;
  arguments: StudentArgumentsState;
  infographic: StudentInfographicPlan;
}
