import type { InstructorInfo, GraduateProfileArea, LearningOutcomeCategory, LearningTask, ScheduleSession } from '../types';

export const instructorInfo: InstructorInfo = {
  name: "Keith A. Shubert, PhD",
  email: "kshubert@east.edu.sg",
  phone: "(65) 8177-1593 [mobile]",
  whatsapp: "(65) 8298-1593 [WhatsApp]",
  notes: "Please contact me either by phone or email should you wish to meet with me. I enjoy getting to know students and helping them with their studies."
};

export const gradProfile: GraduateProfileArea[] = [
  {
    area: "Maturing in Christlikeness",
    outcome: "To reflect Christ in daily life through spiritual disciplines, the fruit of the Spirit, a secure identity in Him, the exercise of spiritual gifts, dependence on the Holy Spirit, and godly conflict resolution.",
    alignment: "STRONG",
    justification: "In IBSM we focus a great deal of time on the spiritual discipline of Bible Study. We begin our time in the Word with prayer for the Holy Spirit to guide us. When we discuss application, we address conflict resolution."
  },
  {
    area: "Nurturing Healthy Ministerial Life",
    outcome: "To cultivate holistic personal, emotional, and spiritual well-being, a right understanding of self and God, a biblical perspective on sustaining a balanced ministerial life, and relationships marked by love, integrity, humility, and forgiveness.",
    alignment: "MODERATE",
    justification: "Towards the end of the course, the focus is on developing a personal Bible study program for oneself."
  },
  {
    area: "Learning God's Word",
    outcome: "To understand, study, and apply Scripture faithfully and contextually.",
    alignment: "STRONG",
    justification: "The entire IBSM course focuses on the understanding, study, and application of Scripture within its context."
  },
  {
    area: "Communicating God's Word",
    outcome: "To interpret and share God's Word clearly, effectively in contextually appropriate ways for life change.",
    alignment: "STRONG",
    justification: "One-third of IBSM addresses the interpretation of Scripture both clearly and correctly. The theme is often verbalized: 'The Bible is not for our information, it is for our transformation.'"
  }
];

export const outcomes: LearningOutcomeCategory[] = [
  {
    category: "KNOW (Cognitive)",
    outcomes: [
      "Define and explain the three essential parts of inductive Bible study: Observation, Interpretation, and Application.",
      "Identify the basic elements and features in approaching the study of various literary genres including Bible narratives, Hebrew poetry, Epistles, etc.",
      "Explain the basic flow of the Old Testament and some details as to its composition.",
      "Explain the basic flow of the New Testament and some details as to its composition."
    ]
  },
  {
    category: "DO (Conative)",
    outcomes: [
      "Be exposed to and practice using a set of Bible study tools and electronic resources in the process of Bible study.",
      "Practice the elements and methods of the inductive Bible study method on selected Bible passages in the epistolary and narrative genres.",
      "Perform a balanced study of a biblical passage.",
      "Research the historical context of any biblical passage."
    ]
  },
  {
    category: "BE (Affective)",
    outcomes: [
      "Be confident in doing a Bible study by oneself using the principles, methods, guidelines, and resources learned in this course.",
      "Be confident in explaining the Story of the Bible."
    ]
  }
];

export const learningTasks: LearningTask[] = [
  {
    id: "A01",
    title: "Syllabus Review",
    dueDate: "22-Jul",
    timeHours: 0.3,
    timeTotalHours: 0.3,
    points: 100,
    description: "Read the course syllabus carefully and in its entirety. Write out (1) that you have read the syllabus in its entirety, (2) carefully, and (3) that you understand it. Email this directly to the instructor.",
    rationale: "Any syllabus, such as this one, is something like a contract. It tells all who read it where the faculty is headed and how he/she wishes the students to follow. This is a skills course."
  },
  {
    id: "B02",
    title: "Acts 1:8 (Observations)",
    dueDate: "22-Jul",
    timeHours: 2.0,
    timeTotalHours: 2.3,
    points: 200,
    description: "List 25 significant observations on Acts 1:8 using NASB 2020. Number each. Must be statements, not questions. No personal pronouns (us, we, I, you) representing interpretation or application. Do not use external resources.",
    rationale: "The first skill that we will address is that of 'observing.' Like any skill, it takes time to learn and the process is not easy, but frustrating. Yet the end product will be treasured."
  },
  {
    id: "B03",
    title: "Purpose Study",
    dueDate: "29-Jul",
    timeHours: 0.5,
    timeTotalHours: 2.8,
    points: 100,
    description: "Determine why the Gospel of Luke (see Luke 1:1-4) and the Gospel of John (see John 20:30-31) were written. Use only your Bible, not a study Bible.",
    rationale: "All Scripture was written for a particular purpose. When the reader knows the author's purpose, he or she will understand better what the author wants the reader to observe and understand."
  },
  {
    id: "B04",
    title: "Jonah (Reread)",
    dueDate: "29-Jul",
    timeHours: 1.2,
    timeTotalHours: 4.0,
    points: 200,
    description: "Read Jonah 5 times in one sitting each, at least 4 hours apart, using the same version. Indicate the date/time/version for each. Write 1-2 paragraphs explaining the value of this exercise, insights gained on the 5th reading, and why Jonah was written (purpose).",
    rationale: "Most books are written to be read in their entirety as a unit. In this exercise, we shall read a familiar passage as a unit and see that the fifth reading has something for us that the initial reading did not yield."
  },
  {
    id: "B05",
    title: "John 8 (Questions)",
    dueDate: "5-Aug",
    timeHours: 1.4,
    timeTotalHours: 5.4,
    points: 200,
    description: "Using the 6 basic questions, write out 30 good questions based on John 8:1-11 and specify to whom they are addressed (Jesus, Woman, Pharisees, Disciples, Author, Audience).",
    rationale: "Often, by asking questions of the Text, a student begins to see more and thus searches for answers. Asking questions is a basic form of learning. It will help one observe what is there."
  },
  {
    id: "B06",
    title: "Chart (Twelve Disciples)",
    dueDate: "5-Aug",
    timeHours: 3.0,
    timeTotalHours: 8.4,
    points: 200,
    description: "Make a comparative chart of the four times Jesus' disciples are listed in Scripture: Matthew 10, Mark 3, Luke 6, and Acts 1. List relevant observations from this chart.",
    rationale: "This is a beginning of comparing Scripture with other Scripture. It also introduces the student to many types of charts besides the Book Chart."
  },
  {
    id: "C07",
    title: "Helper (Word Study)",
    dueDate: "12-Aug",
    timeHours: 3.0,
    timeTotalHours: 11.4,
    points: 200,
    description: "Study the word 'helper' in Genesis 2:18. (Step 1) Define 'helper' in your own culture. (Step 2) Locate it in a concordance (Hebrew 5826 and NT Greek equivalents). (Step 3) Study other OT passages using this Hebrew word. (Step 4) Synthesize how your understanding has changed.",
    rationale: "Understanding the meaning of words is essential to our comprehension of written meaning. But the same word can have different meanings in different cultures and even within the same culture."
  },
  {
    id: "C08",
    title: "Story of the Bible Quiz",
    dueDate: "14-Aug",
    timeHours: 3.0,
    timeTotalHours: 14.4,
    points: 300,
    description: "Short objective class quiz to evaluate how well you comprehend the Story of the Bible (Old and New Testament presentations). Called the satellite view.",
    rationale: "Too often the insight for one passage is located far away in another. A basic understanding of the Story of the Bible is indispensable to the more complete comprehension of a particular passage."
  },
  {
    id: "C09",
    title: "Mark 4 & 5 (Chart)",
    dueDate: "19-Aug",
    timeHours: 6.0,
    timeTotalHours: 20.4,
    points: 300,
    description: "Make a comprehensive book chart of Mark 4:35-5:43. Make sure you include your Simple Outline. Ready for class presentation.",
    rationale: "This is a well-known pericope, but often it is taught as separate narratives and not as a unit. This is designed to help the student place any paragraph within its larger context."
  },
  {
    id: "C10",
    title: "Research Slavery (Informal)",
    dueDate: "26-Aug",
    timeHours: 6.0,
    timeTotalHours: 26.4,
    points: 200,
    description: "Draft progress on research paper 'Roman Slavery in the First Century AD' as historical context for Philemon. At least 6 content pages, at least 2 journal articles, and 2 internet citations. Grading focus is progress.",
    rationale: "While in Observation we avoid books other than the passage itself, in Interpretation the library is the biblical student's home. Helps develop skills to investigate cultural/linguistic contexts."
  },
  {
    id: "C11",
    title: "Mark 4 & 5 (Argument)",
    dueDate: "23-Sep",
    timeHours: 6.0,
    timeTotalHours: 32.4,
    points: 400,
    description: "Write an argument for the short passage of Mark 4:35-5:43, focusing on elements of Jesus' Training of the Twelve. Include all standard argument elements.",
    rationale: "This pericope has much to tell us about elements basic to biblical leadership. Helps place a paragraph within the context of its entire Book and Christ's cultural context."
  },
  {
    id: "C12",
    title: "Research Slavery (Final)",
    dueDate: "30-Sep",
    timeHours: 8.0,
    timeTotalHours: 40.4,
    points: 600,
    description: "Final submission of the research paper 'Roman Slavery in the First Century AD'. Must be at least six pages of content, formatted correctly with bibliography, using notes-bibliography format.",
    rationale: "Refining the informal draft into a high-quality academic paper demonstrating deep interpretative skills in cultural and historical context analysis."
  },
  {
    id: "C13",
    title: "Jonah Background Paper",
    dueDate: "14-Oct",
    timeHours: 8.0,
    timeTotalHours: 48.4,
    points: 500,
    description: "Write a 6-page research paper addressing Jonah's background: (I) State of Israel, (II) Nineveh, (III) Egypt, (IV) Dynamics of the Levant, and Summary.",
    rationale: "In future ministry, you may well have numerous times that you need to research various topics to make clear, precise decisions. This task helps develop that skill."
  },
  {
    id: "C14",
    title: "Jonah Argument",
    dueDate: "27-Oct",
    timeHours: 8.0,
    timeTotalHours: 56.4,
    points: 500,
    description: "Write a structured argument for the book of Jonah, looking at narrative/poetical genres, leadership, and disobedience to God.",
    rationale: "Important Old Testament Prophet that helps develop in narrative and poetical genres. Addressing disobedience to God is very relevant to future ministry."
  },
  {
    id: "C15",
    title: "Philemon Argument",
    dueDate: "10-Nov",
    timeHours: 11.0,
    timeTotalHours: 67.4,
    points: 500,
    description: "Write a structured argument for the short epistle of Philemon, taking into account leadership principles and the cultural context of slavery.",
    rationale: "Short epistle of a personal nature that teaches us about elements basic to biblical leadership within its historical-cultural framework."
  },
  {
    id: "D16",
    title: "Conflict Resolution",
    dueDate: "4-Nov",
    timeHours: 2.0,
    timeTotalHours: 69.4,
    points: 200,
    description: "Write a paper applying Matthew 5:23-24 and 18:15-17. Identify your culture, explain conflict resolution by unbelievers and believers, and how student-student, student-faculty, and faculty-faculty conflicts should be resolved.",
    rationale: "Too often, students KNOW what to do, but fall back on cultural dictations instead of what God stated. Application is often much more difficult than observation/interpretation."
  },
  {
    id: "E17",
    title: "Infographic & Presentation",
    dueDate: "12-Nov",
    timeHours: 8.1,
    timeTotalHours: 77.5,
    points: 500,
    description: "Create an A4-size infographic capturing main steps/key elements of IBSM (Observation to Application). Present it in a 60-75 min session + 30 min Q&A to an audience. Infographic is 300 pts, Report is 200 pts.",
    rationale: "Designed to cause you to work through the entire process of inductive Bible Study. Communicating it and answering questions leads to a deeper understanding."
  },
  {
    id: "E18",
    title: "Course Evaluation",
    dueDate: "13-Nov",
    timeHours: 0.3,
    timeTotalHours: 77.8,
    points: 200,
    description: "Fill out the online course evaluation on Populi and email the instructor to confirm: 'I have filled out the entire course evaluation on Populi.'",
    rationale: "It is always encouraging to survey a course you have just completed and reflect on what you have learned and also what you want to study in the future."
  }
];

export const scheduleSessions: ScheduleSession[] = [
  {
    sessionNum: 1,
    date: "24 JUL",
    module: "Course Introduction",
    preClass: "Learning Tasks A01 and B02 are due 22 July before midnight",
    classBites: [
      "Bite 01 – The Need for Systematic Study of God's Word",
      "Bite 02 – The Process of Systematic study of God's Word (The Details)",
      "Bite 03 – The Process of Systematic Study of God's Word (The Details)"
    ],
    tasksDue: ["A01: Syllabus Review", "B02: Acts 1:8 (Observations)"]
  },
  {
    sessionNum: 2,
    date: "31 JUL",
    module: "Observation",
    preClass: "Learning Tasks B03 & B04 are due 29 July before midnight",
    classBites: [
      "Bite 04 – The Essentiality of Reading (The Generalities)",
      "Bite 05 – The Specifics of Reading (First Five Rules for Reading)",
      "Bite 06 – The Specifics of Reading (Second Five Rules for Reading)",
      "OT Overview"
    ],
    tasksDue: ["B03: Purpose Study", "B04: Jonah (Reread)"]
  },
  {
    sessionNum: 3,
    date: "7 AUG",
    module: "Observation",
    preClass: "Learning Tasks B05 & B06 are due 5 August before midnight",
    classBites: [
      "Bite 07 – The Essentiality of Observing",
      "Bite 08 – The Cruciality of Structure",
      "Bite 09 – The Value of making Charts",
      "NT Overview"
    ],
    tasksDue: ["B05: John 8 (Questions)", "B06: Chart (Twelve Disciples)"]
  },
  {
    sessionNum: 4,
    date: "14 AUG",
    module: "Interpretation",
    preClass: "Prepare for the quiz on the Bible Story during class. Learning Task C07 due on 12 August before midnight.",
    classBites: [
      "Bite 10 – The Five Principles of the Process of Interpretation I",
      "Bite 11 – The Five Principles of the Process of Interpretation II",
      "Quiz on Story of the Bible"
    ],
    tasksDue: ["C07: Helper (Word Study)", "C08: Story of the Bible Quiz"]
  },
  {
    sessionNum: 5,
    date: "21 AUG",
    module: "Interpretation",
    preClass: "Learning Task C09 due 19 August before midnight",
    classBites: [
      "Bite 12 – The Cultural Background",
      "Bite 13 – The Historical Background"
    ],
    tasksDue: ["C09: Mark 4 & 5 (Chart)"]
  },
  {
    sessionNum: 6,
    date: "28 AUG",
    module: "Interpretation",
    preClass: "Learning Task C10 due on 26 August before midnight",
    classBites: [
      "Bite 14 – The Literary Background (Genre = Narrative)",
      "Bite 15 – The Literary Background (Genre = Hebrew Poetry)"
    ],
    tasksDue: ["C10: Research Slavery (Informal)"]
  },
  {
    sessionNum: 7,
    date: "4 SEP",
    module: "Interpretation",
    preClass: "Nothing is due 2 September",
    classBites: [
      "Bite 16 – The Literary Background (Genre = Parables)",
      "Bite 17 – The Literary Background (Genre = Epistles)"
    ],
    tasksDue: []
  },
  {
    sessionNum: 8,
    date: "25 SEP",
    module: "Interpretation",
    preClass: "Learning Task C11 due on 23 September before midnight (Note: Sept 11 is Ministry Weekend, Sept 18 is Rest Break)",
    classBites: [
      "Bite 18 – The Literary Background (Genre = OT Prophecy, Apocalyptic)",
      "Bite 19 – Putting it all Together (An Explanation of an Argument)"
    ],
    tasksDue: ["C11: Mark 4 & 5 (Argument)"]
  },
  {
    sessionNum: 9,
    date: "2 OCT",
    module: "Interpretation",
    preClass: "Learning Task C12 due on 30 September before midnight",
    classBites: [
      "Class Interaction (Labs)"
    ],
    tasksDue: ["C12: Research Slavery (Final)"]
  },
  {
    sessionNum: 10,
    date: "9 OCT",
    module: "Interpretation",
    preClass: "Nothing is due 7 October",
    classBites: [
      "Class Interaction (Labs)"
    ],
    tasksDue: []
  },
  {
    sessionNum: 11,
    date: "16 OCT",
    module: "Application",
    preClass: "Learning Task C13 due on 14 October before midnight",
    classBites: [
      "Bite 20 – The Four Substitutes for Application",
      "Bite 21 – The Four-step Process of Application"
    ],
    tasksDue: ["C13: Jonah Background Paper"]
  },
  {
    sessionNum: 12,
    date: "23 OCT",
    module: "Application",
    preClass: "Nothing is due 21 October",
    classBites: [
      "Bite 22 – The Four Substitutes for Application"
    ],
    tasksDue: []
  },
  {
    sessionNum: 13,
    date: "30 OCT",
    module: "Application",
    preClass: "Learning Task C14 due on 28 October before midnight",
    classBites: [
      "Class Interaction (Labs)"
    ],
    tasksDue: ["C14: Jonah Argument"]
  },
  {
    sessionNum: 14,
    date: "6 NOV",
    module: "Application",
    preClass: "Learning Task D16 due on 4 November before midnight",
    classBites: [
      "Class Interaction (Labs)"
    ],
    tasksDue: ["D16: Conflict Resolution"]
  }
];
