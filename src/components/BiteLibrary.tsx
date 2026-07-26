import React, { useState } from "react";
import { BookOpen, HelpCircle, LayoutGrid, Lightbulb, PenTool, CheckCircle, AlertTriangle, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface BiteLesson {
  id: string;
  category: "Observation" | "Interpretation" | "Application" | "General";
  bite: string;
  title: string;
  subtitle: string;
  keyFormula?: string;
  summary: string;
  details: string[];
  tips: string[];
}

const biteLessons: BiteLesson[] = [
  {
    id: "bite-01",
    category: "General",
    bite: "Bite 01",
    title: "The Need for Systematic Study",
    subtitle: "Grow, Mature, and Prepare",
    keyFormula: "The Bible is not for your information, it is for your transformation!",
    summary: "Why study systematically? The Bible was not written to satisfy your curiosity, but to make you conform to Christ's image. Not to make you a smarter sinner, but to make you like the Savior. It is the only means for spiritual growth, maturation, and ministry preparation.",
    details: [
      "Two Basic Questions: 1. Why do people not study the Bible? (They do not make it a priority, think it is not relevant, don't know how to begin, or think they can't understand it). 2. Why do we need to study?",
      "Answer #1 - Spiritual Growth (1 Peter 2:2): Requires an active baby-like Attitude (grab for the Word as a baby grabs for a bottle), Appetite (crave the pure milk of the word), and Aim (focus on growing, not just knowing). Growth is Answer #1!",
      "Answer #2 - Developing Spirituality (Hebrews 5:11-14): The problem is dullness of hearing (density of reception, a learning disability), not the difficulty of revelation. Mature believers train themselves by constant, habituated practice to take the Word and use it to distinguish good from evil. The standard for maturity is not how much you know; it is how much you use what you know.",
      "Answer #3 - Preparation for Ministry and Life (2 Timothy 3:16-17): All Scripture is inspired and profitable: 1. Teaching (structures thinking; what we believe determines how we live); 2. Reproof (tells us when we are out of bounds); 3. Correction (reveals our problems AND solves them); 4. Training (equips and prepares us for every good work)."
    ],
    tips: [
      "Dr. Shubert's Question: 'Would you let a surgeon operate on you if he knew just as much about medicine as you know of God's Word?'",
      "The opposite of ignorance in the spiritual realm is not knowledge; it is application."
    ]
  },
  {
    id: "bite-netiquette",
    category: "General",
    bite: "Bite 00",
    title: "Netiquette Guidelines: T.R.U.S.T.",
    subtitle: "Discussion Board Etiquette for Scholars",
    keyFormula: "Always focus on the subject, back conclusions with verified sources, and maintain appropriate tone.",
    summary: "Professional academic interaction guidelines for online discussion boards, based on the T.R.U.S.T. framework.",
    details: [
      "T - TOPIC: Stay on TOPIC in your posts and responses. Never attack the person; focus on the subject and why differing views exist.",
      "R - REVIEW: Always REVIEW before you post. Like in-person conversations, think before you speak.",
      "U - UNDERSTAND: UNDERSTAND that everyone in class will have different perspectives and approaches. Respect other opinions and beliefs.",
      "S - SOURCES: Your thoughts and conclusions should always be backed by verified SOURCES.",
      "T - TONE: Make sure your TONE is appropriate to the discussion at hand. Be cautious with stylistic choices such as sarcasm, humor, and colloquialisms."
    ],
    tips: [
      "Purdue Communication Netiquette: Respectful academic dialogue fosters deeper theological discovery.",
      "Always proofread your comments before pressing Submit on class discussion forums."
    ]
  },
  {
    id: "bite-02",
    category: "General",
    bite: "Bite 02",
    title: "The Process of Systematic Study",
    subtitle: "Definition of Methodicalness",
    keyFormula: "Certain steps in a certain order to guarantee a certain result.",
    summary: "Bible study is methodicalness with a view to becoming receptive and reproductive by means of firsthand acquaintance with the Word. Before we can make an impact on our culture, the Scripture must make an impact on our lives.",
    details: [
      "Definition: Follow certain steps in a certain order to guarantee a certain result.",
      "End Product: 1. Personal study of the Scriptures; 2. Study that produces life change.",
      "Three-Step Approach: Step ONE is Observation (What? What do I see?), Step TWO is Interpretation (What does it mean?), and Step THREE is Application (What does it mean to me? How does it work?).",
      "Four Reasons Firsthand Discovery is Essential: 1. Enables you to think for yourself (the Bible is a Revelation, not a riddle); 2. Prepares you to evaluate the thoughts of others; 3. Gives you the joy of personal discovery; 4. Enables you to fall in love with the Author."
    ],
    tips: [
      "Involvement vs. Isolation: We need involvement in the world to be reproductive, but isolation from the world's noise to be receptive.",
      "The Bible was not given as a riddle, but as a Revelation!"
    ]
  },
  {
    id: "bite-03",
    category: "General",
    bite: "Bite 03",
    title: "Process Details: What to Notice",
    subtitle: "Observation and Interpretation Mechanics",
    keyFormula: "The more time in observation, the less time in interpretation.",
    summary: "A practical guide to the specific components of step one (observation) and step two (interpretation) that ensure accurate exegetical conclusions.",
    details: [
      "Observation (What do I see?): Four basic things to notice: 1. Terms (words with specific meaning based on context); 2. Structure (grammatical and literary relationships); 3. Literary form/genre (poetry, prophecy, history, narrative); 4. Atmosphere (feelings, mood, tone, environment—what it's like to be in the author's shoes).",
      "Interpretation (What does it mean?): Three factors to discover meaning: 1. Bombard the text with questions (it is never embarrassed to be asked questions); 2. Look for the answers (mostly coming out of your observation process); 3. Integrate parts and put details together into a meaningful whole.",
      "Application (How does it work?): Ask: 1. How does it work for me? 2. How does it work for others?"
    ],
    tips: [
      "Golden Rule: The more time you spend in observation, the less time you will spend in interpretation, and the more accurate will be your results.",
      "Never look at terms as mere isolated dictionary definitions. Meaning comes from terms in context."
    ]
  },
  {
    id: "bite-04",
    category: "Observation",
    bite: "Bite 04",
    title: "The Essentiality of Reading",
    subtitle: "The Generalities of Observation",
    keyFormula: "The only difference is how much they see in the same place.",
    summary: "The ability to observe is a developed process. There is a direct correlation between efficiency in reading and effectiveness in Bible study.",
    details: [
      "Efficiency and Effectiveness: To observe well, we must read actively and with disciplined mental focus.",
      "Rule 1: Learn to read it better and faster. Track ideas with your eyes and maintain active comprehension.",
      "Rule 2: Learn to read it as for the first time. Read the passage in several different versions and languages to break through familiarity bias.",
      "Rule 3: Learn to read it as a love letter. We must come to the Word of God in love with the Person who wrote it."
    ],
    tips: [
      "The moment you come to a passage of Scripture and say, 'I know this one!' you are in deep trouble.",
      "Observation is not a passive activity; it is a developed process of intentional search."
    ]
  },
  {
    id: "bite-05",
    category: "Observation",
    bite: "Bite 05",
    title: "Specifics of Reading (Rules 1-5)",
    subtitle: "The First Five Rules for Reading",
    keyFormula: "The Bible does not yield its fruits to the lazy.",
    summary: "Dr. Keith Shubert's first five rules for systematic Bible reading. Active reading requires programming our minds with the Word, patience, and selectivity.",
    details: [
      "Rule I. Read the Bible thoughtfully: Programming our minds with the Word. If you seek her as silver and search for her as hidden treasures, then you will discern the fear of the Lord (Prov 2:4-5, Job 28).",
      "Rule II. Read the Bible repeatedly: 1. Read all of one book in one setting; 2. Read each book from the beginning to absorb the complete literary context.",
      "Rule III. Read the Bible patiently: Most people quit too soon before they find gold.",
      "Rule IV. Read the Bible selectively: Six questions help you: 1. Who? (What is said about them? What do they say?); 2. What? (What is happening? What is the argument? What is the author trying to say?); 3. Where? (Where is my atlas?); 4. When? (What time is it? Before & after? When will these things occur?); 5. Why? (Why included? Why did it happen?); 6. Wherefore? (So what difference does it make? Since it was written to change our lives).",
      "Rule V. Read the Bible prayerfully: Learn to pray. Listen to new converts and children; turn actual Scripture text into prayer."
    ],
    tips: [
      "Selective reading forces active mental engagements with the text rather than passive scanning.",
      "Keep an atlas handy when asking 'Where?' to see the historical and physical terrain."
    ]
  },
  {
    id: "bite-06",
    category: "Observation",
    bite: "Bite 06",
    title: "Specifics of Reading (Rules 6-10)",
    subtitle: "The Second Five Rules for Reading",
    keyFormula: "One cannot be holy in a hurry.",
    summary: "Rules six through ten of systematic Bible reading, focusing on imaginative, reflective, purposeful, acquisitive, and telescopic reading.",
    details: [
      "Rule VI. Read the Bible imaginatively: The reason the Bible appears dull to people is that they come to it with dull minds. Put yourself in the narrative, feel the ground, hear the crowds.",
      "Rule VII. Read the Bible reflectively or meditatively: Take time to chew on the words. One cannot be holy in a hurry; take time to be holy.",
      "Rule VIII. Read the Bible purposefully: Whenever you read, ask, 'What is the purpose of this passage?' and 'How will it instruct me in the path of righteousness?'",
      "Rule IX. Read the Bible acquisitively: Read with a desire to assimilate, capture, own, and retain the truth personally.",
      "Rule X. Read the Bible telescopically: Read in light of the whole. The Bible is not simply a collection of parts; it is an integrated message. Every time we take it apart, we need to put it back together again."
    ],
    tips: [
      "Telescopic reading prevents us from making paragraphs say things that conflict with the overarching theme of the biblical book.",
      "Take notes acquisitively to build your personal treasury of truth."
    ]
  },
  {
    id: "bite-07",
    category: "Observation",
    bite: "Bite 07",
    title: "The Essentiality of Observing",
    subtitle: "Detecting Key Literary Elements",
    keyFormula: "Look for things that are emphasized, repeated, and related.",
    summary: "To observe means to see with purpose. We must actively search the text for elements of emphasis, repetition, relationship, similarity, contrast, and real-world relevance.",
    details: [
      "I. Look for Things that are Emphasized: 1. Amount of space; 2. Stated purpose (e.g. Luke 1:1-4, John 20:30-32, 1 John); 3. Order of material; 4. Movement from lesser to greater.",
      "II. Look for Things that are Repeated: Reiteration of identical terms, phrases, or characters (e.g., 'faith' in Hebrews 11, Psalm 136).",
      "III. Look for Things that are Related: Movement from general to specific (e.g. Matthew 6:1-ff), Questions and Answers (e.g. Romans 6:1, 15), and Cause and Effect (e.g. Acts 8:1, 4).",
      "IV. Look for Things that are Alike: Expressions of comparison such as 'as' or 'like' (e.g. John 3:15, 'As the deer... so my soul...').",
      "V. Look for Things that are Unlike, or in Contrast: Look for opposites. The key contrast signpost is 'But' (e.g. Matthew 5 'You have heard it said, but I...').",
      "VI. Look for Things that are True to Life: Real human situations, struggles, and historical authenticity."
    ],
    tips: [
      "Always mark the word 'But' in contrast texts. It represents a massive pivot in the author's logic.",
      "Use Psalm 136 as a classic example of repetitive structural reinforcement."
    ]
  },
  {
    id: "bite-08",
    category: "Observation",
    bite: "Bite 08",
    title: "The Cruciality of Structure",
    subtitle: "Laws of Composition and Form",
    keyFormula: "Structure is the relation and interrelation of component parts.",
    summary: "Whenever you have two of anything (terms, phrases, clauses, connectives, sentences, paragraphs) you have structure. Observation involves learning to read and learning to detect structure.",
    details: [
      "What vs. How: What God has said represents the content. How God has said it represents the form, including structural relationships and arrangement.",
      "Kinds of Structure: 1. Grammatical (verbs, subject/object, modifiers, dependent/independent clauses, prepositional phrases, and connectives); 2. Literary (Genre presupposes unity).",
      "Spheres of Structure: 1. Within a paragraph, primarily grammatical (Worm's Eye View); 2. Between paragraphs, primarily literary (Bird's Eye View).",
      "Principles of Structure: The paragraph is the basic unit of study and thought, not the verse or chapter. Devise a title for each paragraph that is brief, personal, memorable, and unique to that paragraph.",
      "Robert A. Traina's 17 Laws of Composition: 1. Comparison, 2. Contrast, 3. Repetition, 4. Continuity, 5. Continuation, 6. Climax, 7. Cruciality/Pivot, 8. Interchange, 9. Particularization/Generalization, 10. Causation/Substantiation, 11. Instrumentation, 12. Explanation, 13. Preparation, 14. Summarization, 15. Interrogation, 16. Harmony, 17. Proportion."
    ],
    tips: [
      "Syllabus Caution: Paragraph divisions are not inspired. Evaluate and change them if warranted, but always study them as logical thought units.",
      "Connectives (e.g. 'therefore', 'for', 'nevertheless') are structural signposts of the author's flow."
    ]
  },
  {
    id: "bite-09",
    category: "Observation",
    bite: "Bite 09",
    title: "The Method of Making Charts",
    subtitle: "Navigating Oceans of Words Graphically",
    keyFormula: "Pictures are more readily remembered than words.",
    summary: "Charts appeal to the eye gate to summarize, record, and preserve findings. They reveal the laws of composition and the mind, giving perspective, principality, and association on a single sheet.",
    details: [
      "The Mariner's Map: Charts supplement outlines, essays, and notes to keep you from getting lost in details. They deliver you onto the highway of the dominant idea.",
      "Contents of a Chart: Work on a sheet of paper (A4 size). Draw a line the long way (baseline). Read rapidly and mark main features. Read again to group related chapters and paragraphs. Put your name and date in the upper-right corner.",
      "Dr. Shubert's Do's & Don'ts: Don't make it too large or elaborate. Do keep it seeable at a glance. Don't let mechanics usurp thought. Don't proceed chapter-by-chapter; go paragraph-by-paragraph and give each equal space. Don't make it bland—use color, alliteration, and simple sketches.",
      "Types of Charts: 1. Book Chart (shows overall bird's-eye book layout); 2. Grid Chart (compares multiple records, e.g. Matthew 13 Soils [Soils, Description, Growth, Hindrances, Results] or Revelation 2-3 Seven Churches [Background, Jesus Description, Deeds, Faults, Command])."
    ],
    tips: [
      "Keep details subordinate. Ponder the significance as wholes, units, and larger relationships. Be inductive: move from particular to general.",
      "Put your name and the date in the upper-right corner of every chart!"
    ]
  },
  {
    id: "bite-10",
    category: "Interpretation",
    bite: "Bite 10",
    title: "Five Principles of Interpretation",
    subtitle: "Content, Context, and Comparison",
    keyFormula: "Scripture is its own greatest interpreter.",
    summary: "Interpretation is discovering the single, consciously-intended meaning of the original author. Cultivate a deep respect for Content, Context, and Comparison before consulting secondary helps.",
    details: [
      "Principle One: CONTENT — There is a cause/effect relationship between content and meaning. Factual observations are the raw material. 'The more time you spend in observation, the less time you will spend in interpretation and the more accurate your result' (Heb 6:15-20).",
      "Principle Two: CONTEXT — Context refers to that which goes before and that which follows. Any time we break into the middle of a passage, look at context first. 'Every major cult is built on a violation of this principle' (Luke 17:21).",
      "Principle Three: COMPARISON — Compare Scripture with Scripture. Although the Bible has more than 40 different authors, the entire 66 books are the result of one ultimate Author, the Holy Spirit (Eph 4:11-12, Moses, Abraham).",
      "Principle Four: CULTURAL BACKGROUND — Set the passage against its original environment, audience, and geographical context before formulating any modern application.",
      "Principle Five: CONSULTATION — The correct priority order is FIRST the Bible itself, then secondary sources (Commentaries, Concordances, Dictionaries, and Study Bibles) only after personal study is complete."
    ],
    tips: [
      "Principle Five Rule: Consultation is secondary. Never start with a commentary—always study the biblical text and context firsthand first.",
      "Avoid proof-texting traps. Respect the text preceding and succeeding your focus passage."
    ]
  },
  {
    id: "bite-11",
    category: "Interpretation",
    bite: "Bite 11",
    title: "Interpretation: Culture & Consultation",
    subtitle: "Principles Four and Five of Interpretation",
    keyFormula: "FIRST the Scriptures, THEN the secondary sources.",
    summary: "The remaining two principles of exegesis: Principle Four requires setting the passage against its original cultural and historical environment to prevent modern bias. Principle Five introduces consultation with external helps in their strictly prioritized order.",
    details: [
      "Principle Four: CULTURAL AND HISTORICAL BACKGROUND - One key to studying the Bible is to set it against its background. Our problem is that we tend to read back into the Bible our time and culture. Consider John 14:1-3 (My Father's house, dwelling places, preparing a place) where ancient Jewish wedding customs clarify Christ's words.",
      "Principle Five: CONSULTATION - This refers to the secondary resource tools in our study of God's Word. The correct academic order is FIRST the Bible itself, THEN secondary sources.",
      "Order of Consultation: A. Study Bible, B. Concordance, C. Bible Dictionary / Encyclopedia, D. Bible Handbook, E. Bible Commentary, F. Internet Tools.",
      "Danger of Dependence: No previous generation has had available to it what we can find at most bookstores, but we must avoid depending on second-hand information. The use of resource tools should not be a substitute for Bible study; it is a stimulus for it!"
    ],
    tips: [
      "Remember the golden rule of consultation: first the Scriptures, then the secondary sources. Never consult commentaries first!",
      "Avoid reading 21st-century values or structures back into the ancient biblical context."
    ]
  },
  {
    id: "bite-12",
    category: "Interpretation",
    bite: "Bite 12",
    title: "The Cultural Background",
    subtitle: "Analyzing General and Specific Divisions of Culture",
    keyFormula: "IF THE THEOLOGICAL MEANING IS INHERENT IN THE CULTURAL PRACTICE, THEN KEEP THE CULTURAL PRACTICE!",
    summary: "An in-depth look at how culture impacts exegesis. Learn the divisions of culture (what people think, say, do, and make) and how to discover timeless truths that translate across generations.",
    details: [
      "General Divisions of Culture: Either split into: 1. Material Culture and 2. Social Culture; OR categorize by: A. What people think, B. What people say, C. What people do, D. What people make.",
      "Specific Divisions of Culture: Analytical categories to explore include Political, Geographical, Economic, Legal, Agricultural, Military, Family, Dietary, Architectural, Clothing, Social, and Religious (Judaism/Christianity).",
      "Religious Specifics - Judaism: Exegesis must investigate origin, theology, covenants, exodus, sacred calendar, temple and tabernacle, exile, synagogue life, sects (Pharisees, Sadducees), education, diaspora, and Jerusalem's role.",
      "Religious Specifics - Christianity: Analyze prediction, origin, rapid expansion, systematic theology, leadership development, ordinances, and missionary endeavors.",
      "Four Principles of Cultural Application: A. Determine the meaning of the practice in its original context; B. Discover the timeless theological truth; C. Discover the cultural equivalent for the present culture; D. Determine the appropriate applicational expressions."
    ],
    tips: [
      "A classic error is mistaking a passing cultural vehicle for a permanent theological mandate, or vice versa.",
      "If the theological meaning is inherent in the cultural practice, then keep the cultural practice!"
    ]
  },
  {
    id: "bite-13",
    category: "Interpretation",
    bite: "Bite 13",
    title: "The Historical Background",
    subtitle: "Questions about Author and Audience",
    keyFormula: "PEOPLE + PLACE + PERSPECTIVE + PROBLEMS + PURPOSE = MEANING",
    summary: "To reconstruct the historical setting, the exegesis must answer five key questions about the author and their primary audience, shifting our focus from modern perspectives to ancient realities.",
    details: [
      "Questions About the Author: 1. Who is the author? Examine internal evidence (claims in text), external evidence (early church fathers), and address any modern objections. 2. What do we know about their background? (Family heritage, educational background, occupational skills, cultural advantages, religious experiences).",
      "Questions About the Audience (PEOPLE): Who are they? Are they Jewish or Gentile? What is their unique historical background?",
      "Location of Audience (PLACE): Where are they located geographically and socially?",
      "Dating of Writing (PERSPECTIVE): When did the writing take place? What was the socio-political timeline?",
      "Situation & Purpose (PROBLEMS & PURPOSE): What was their situation socially and spiritually? Why was the book written? What was the primary motivation of the author?"
    ],
    tips: [
      "Always look for internal hints about the readers' spiritual state (e.g. immaturity, persecution, false teaching) to understand the author's tone.",
      "Differentiate clearly between internal evidence within the text and external history from archaeology or church history."
    ]
  },
  {
    id: "bite-14",
    category: "Interpretation",
    bite: "Bite 14",
    title: "The Literary Background: Narrative",
    subtitle: "Suggestions for Biblical Narrative",
    keyFormula: "Plot is the coherent sequence of interrelated events with a beginning, middle, and end.",
    summary: "Narrative is the most common genre in the Bible. Interpreting it correctly requires close attention to settings, detailed character analysis, conflict resolution, and the ultimate theological values in view.",
    details: [
      "Setting Details: Pay close attention to setting, including: 1. Physical setting (geography, terrain); 2. Temporal setting (time of day, seasons, epochs); 3. Cultural setting (customs, hospitality).",
      "Character Analysis: Thoroughly study characters through: A. Direct description, B. Responses of others, C. Words/thoughts, D. Self-characterization, and E. Actions (subjective behavior).",
      "Protagonist & Antagonist: Identify the hero (protagonist) and the foil/enemy (antagonist or event) that provides contrast.",
      "Plot & Conflict: Map the plot development (coherent sequence of events) and conflicts (physical, character, or moral/spiritual conflict). Ask: what gives interest, curiosity, or suspense? (danger, tests, divine-human encounters).",
      "Choice Tests & Ending Changes: Track the tests of choices faced by the main character and evaluate what changed between beginning and end (plot changes: tragic, punitive, pathetic, comic; character changes: reform, degeneration, revelation). Check the roles of foils, dramatic irony, or poetic justice.",
      "Intentional Purpose (Reality, Morality, Values): What does the story communicate about the author's purpose? 1. Reality (What is real?); 2. Morality (What is good/bad?); 3. Values (What really matters/matters most?)."
    ],
    tips: [
      "Never extract a moral doctrine from a narrative without first analyzing the character's flaws and the story's tragic or punitive plot change.",
      "Details in biblical narratives are extremely scarce; if the narrator mentions a detail (e.g. 'it was night', or a character's physical height), it is highly significant for the plot."
    ]
  },
  {
    id: "bite-15",
    category: "Interpretation",
    bite: "Bite 15",
    title: "The Literary Background: Poetry",
    subtitle: "Appreciating Hebrew Parallelism",
    keyFormula: "Poetry = Heightened speech used to express intensified feeling or insight.",
    summary: "Hebrew poetry does not rely on rhyme or meter, but on the rhythm of thought through parallelism. Master the structural types of parallelism and the emotional styles of biblical poetry.",
    details: [
      "Definition of Poetry: Heightened, concentrated speech designed to express intensified feeling or insight.",
      "Synonymous Parallelism: The second line repeats the thought of the first line using different, equivalent words. Example: 'A good name is to be more desired than great riches, Favor is better than silver and gold' (Proverbs 22:1).",
      "Antithetical Parallelism: The second line contrasts with the first line, often signaled by 'But'. Example: 'He who gathers in summer is a son who acts wisely, But he who sleeps in harvest is a son who acts shamefully' (Proverbs 10:5).",
      "Other Parallelisms: 1. Climatic Parallelism (builds up to a peak); 2. Synthetic Parallelism (completes or expands the first line's thought); 3. Emblematic Parallelism (pairs a literal statement with a metaphor/simile).",
      "Styles of Biblical Poetry: Lyrics, Psalms, Love lyrics, Encomiums (songs of praise), and Laments (expressions of deep sorrow).",
      "Semantics of Poetry: Extensive use of figurative language, metaphors, similes, and anthropomorphisms that must be interpreted figuratively, not flatly literal."
    ],
    tips: [
      "In synonymous parallelism, don't invent two different meanings for the lines; they are two perspectives on a single unified truth.",
      "Always look for the 'But' transition in Proverbs and Psalms; antithetical structure is the primary tool of Hebrew wisdom literature."
    ]
  },
  {
    id: "bite-16",
    category: "Interpretation",
    bite: "Bite 16",
    title: "The Literary Background: Parables",
    subtitle: "Pondering the Kingdom Analogy",
    keyFormula: "Parable = figurative, fictional narrative true to life conveying spiritual truth.",
    summary: "A parable is designed for historical and pedagogical purposes of conveying through analogy some specific spiritual truth, usually relative to the kingdom program of God. Understand why Jesus spoke in parables and follow the 5 strict guidelines for their interpretation.",
    details: [
      "Defining Parables: A figurative, fictional narrative which is true to life and designed for the historical and pedagogical purposes of conveying through analogy some specific spiritual truth (usually relative to the kingdom program of God).",
      "The Purpose of Parables (Why Jesus Spoke in Parables): 1. Revelation: to reveal new truth to the responsive. 2. Judgment: to conceal truth (of the kingdom) from the unresponsive. 3. Persuade: to evoke decisions from the undecided. 4. Perpetuate: to allow memory of the truth in a concrete form or story.",
      "Scriptural Basis (Mark 4:10-13a, 33-34; Luke 8:9-10; Matt 13:10-14, 33-35): Disciples are granted to know the mysteries of the kingdom, but those outside hear in parables so that 'seeing they may see and not perceive, hearing they may hear and not understand lest they return and be forgiven.'",
      "Guidelines for Interpretation: 1. Recover the original setting of the parable (historical and cultural contexts); 2. Discover the problem that is being answered (relationship to the Kingdom); 3. Uncover the central truth of the parable (major point of comparison); 4. Relate details to the central truth (supporting scenery for the analogy); 5. State the intended appeal (application in historical and contemporary settings)."
    ],
    tips: [
      "Remember: Parable details are 'supporting scenery' for the main point. Do not try to assign a symbolic meaning to every blade of grass, coin, or sheep unless the text explicitly does so.",
      "The primary theme of parables usually addresses some aspect of the Kingdom of God, responding directly to a crisis, challenge, or question of the audience."
    ]
  },
  {
    id: "bite-17",
    category: "Interpretation",
    bite: "Bite 17",
    title: "The Literary Background: Epistle",
    subtitle: "Examining the Greek Letter Structure",
    keyFormula: "Structure: Opening -> Body -> Closing",
    summary: "Epistles are situational documents written to specific audiences. Correct exegesis requires recognizing the rigid, formal structure of first-century Hellenistic or Greco-Roman letters, tracing how the theological body transitions to practical appeals.",
    details: [
      "Epistle Structure: Greco-Roman letters follow a distinct, predictable three-part formula: Opening, Body, and Closing. Recognizing this flow helps identify key shifts in authorial intent.",
      "I. Opening: A. Salutation (1. Author, 2. Addressees, 3. Greetings); B. Health Wish (1. Request of welfare of reader, 2. Report of welfare of writer); C. Prayer Formula.",
      "II. Body: A. Introduction; B. Requests of author for the reader(s); C. Conclusion. The body contains the theological arguments and the logical appeals based on those arguments.",
      "III. Closing: A. Closing greetings; B. Health wish; C. Farewell salutation. This contains personal remarks, final blessings, and signatures."
    ],
    tips: [
      "Unlike modern letters, ancient Greek letters place the sender's name at the absolute beginning (Salutation) so the recipient knew immediately who was writing.",
      "Epistles are 'occasional'—meaning they were written to solve specific problems or answer specific questions. Always locate the historical occasion in the opening pages."
    ]
  },
  {
    id: "bite-18",
    category: "Interpretation",
    bite: "Bite 18",
    title: "The Literary Background: OT Prophecy & Apocalyptic",
    subtitle: "Previewing the Visionary and Proclamatory Literature",
    keyFormula: "OT Prophecy (Salvation & Judgment) + Apocalyptic Symbolism",
    summary: "Prophecy and Apocalyptic are distinct genres with visionary and proclamatory elements. Prophecy deals with God's summons, accusations, and declarations, while Apocalyptic literature uses visionary symbols to portray supernatural struggles and cosmic outcomes.",
    details: [
      "Prophetic Messages: Prophecy comprises two major types of messages: 1. Announcement of salvation; 2. Announcement of judgment. Judgment includes: 1) Summons; 2) Accusation (transgression against Law, sometimes a 'woe'); 3) Announcement (with divine intervention, notice of punishment, and characteristics of punishment).",
      "Apocalyptic Visionary Characteristics: 1. Structure (places a kaleidoscope structure of self-contained units); 2. Symbolism (communicates historical realities through ideological rather than literalistic symbols); 3. Supernatural (portrays a supernatural or transcendental world with divine, demonic, or angelic agencies); 4. Scope (transforms known situation into one only imagined); 5. Subjects (familiar people/places in unfamiliar contexts); 6. Scenic (reveals cosmic rather than localized scene); 7. Strangeness (characterizes people, settings, and events in extraordinary descriptions).",
      "Interpreting Visionary Literature: 1. Visionary material should be interpreted in relation to its own self-contained unit and then to the larger context; 2. Biblical symbols should be interpreted according to the 'analogy of faith' (comparing other biblical usages); 3. Visionary literature anticipates the divine intervention of God for salvation/judgment.",
      "Visionary Rules: Visionary literature is primarily futuristic in reference, using present images to reveal future unknowns (e.g., Day of the Lord). Familiarity with overall prophetic literature protects from individual spiritualization, allowing one to distinguish near and far fulfillments."
    ],
    tips: [
      "Rule of proportion: National and cosmic implications are far more frequent in visionary literature than individual ones.",
      "Not every detail of extraordinary visionary descriptions has interpretative significance. Focus on the main theological message of the vision."
    ]
  },
  {
    id: "bite-19",
    category: "Interpretation",
    bite: "Bite 19",
    title: "Formulating a Written Argument",
    subtitle: "The Five Pillars of Academic Exegesis",
    keyFormula: "Introductory Material -> Chart -> Simple Outline -> Sentence Outline -> Argument",
    summary: "Putting it all together: A formal IBSM argument requires complete harmony between the introductory background, the visual chart, the outlines, and the written exegesis.",
    details: [
      "Introductory Material: Concise sentences about Author, Date, Historical Setting, Place, Recipients, and Theme.",
      "Simple Outline: Detailed, paragraph-by-paragraph index utilizing identical headings to your book chart.",
      "Sentence Outline: Each line must be a complete sentence with a Subject and Complement, capturing the argument.",
      "The Argument: Detailed, paragraph-by-paragraph prose explaining how the paragraphs relate, incorporating background context."
    ],
    tips: [
      "Never allow your theme to disagree with your outlines or argument. They must harmonize perfectly.",
      "Follow strict writing rules: double-space, use past tense for biblical events, cite standard abbreviations (e.g. 1 Chron 11:1)."
    ]
  },
  {
    id: "bite-20",
    category: "Application",
    bite: "Bite 20",
    title: "The Four Substitutes for Application",
    subtitle: "Avoiding the Knowledge Trap",
    keyFormula: "To know and not to do is not to know at all.",
    summary: "Application is the ultimate goal of Bible study, yet the human heart resists change. We must identify and reject the four subtle substitutes that replace actual life change with passive academic or emotional activities.",
    details: [
      "The Struggle of Application: There is nothing the human heart resists more than change. Yet spiritual growth is a commitment to change, leading to conformity to Christ's image (Romans 8:28-30, Titus 1:1, Titus 2:9-10).",
      "I. Substituting Interpretation for Application (Knowledge instead of Experience): The mistake of substituting knowledge for experience. Knowledge creates responsibility. If you know the right thing to do and do not do it, it is sin (James 4:17). The scribes and Pharisees mastered the Scriptures, but the Scriptures never mastered them.",
      "II. Substituting Application in easy areas instead of needed areas: E.g., being scrupulous about honesty on tax forms while ignoring severe relational gossip or bitterness where application is desperately needed.",
      "III. Substituting Rationalization for Application: Coming up with clever reasons why God's truth won't work for us or our specific situation. The older we become, the more experienced we become at rationalization.",
      "IV. Substituting an Emotional Experience for a Volitional Decision: Being convicted by the truth is no substitute for being changed by it. James tells us we must be doers of the word, not merely hearers who delude themselves (James 1:21-25). Receiving means to welcome and show hospitality."
    ],
    tips: [
      "Knowledge creates responsibility. The scribes and Pharisees mastered the Text, but the Text never mastered them.",
      "Emotional conviction (tears during a sermon or song) is not application. True application requires a concrete volitional decision."
    ]
  },
  {
    id: "bite-21",
    category: "Application",
    bite: "Bite 21",
    title: "The Four-step Process of Application",
    subtitle: "Learning to Know, Relate, Meditate, and Practice",
    keyFormula: "ONE INTERPRETATION; MANY APPLICATIONS",
    summary: "How do we move from exegesis to life transformation? Dr. Keith Shubert outlines the four-step process of application, showing how we must understand ourselves, our relationships, and implement the Nine Helpful Questions to practice truth.",
    details: [
      "Step 1: Learning to KNOW: A. One must know the interpretation (if interpretation is erroneous, application will be erroneous. If correct, application will be correct). B. One must know him/herself (understanding assets, which develops confidence; and liabilities, which develops faith). Cf. 1 Tim 4:16, Rom 12:3.",
      "Step 2: Learning to RELATE: We must relate Scriptures to our experience. Christianity is best understood as a series of new relationships (2 Cor 5:17): a new relationship with God, self, other people, and the enemy. How the Word affects these relationships: exposing sin, presenting a promise, giving a command, or providing an example.",
      "Step 3: Learning to MEDITATE: Meditation provides the mind with the fuel (linked with memorization) to do what is written (Joshua 1:8, Prov 23:7, Psalm 1:1-2, Psalm 119:97). For as a man thinks within himself, so he is.",
      "Step 4: Learning to PRACTICE: The ultimate goal of application. The task of Bible study is not to fatten geese, but to train athletes and equip soldiers. Ask 'Lord, how can this truth change my life in a specific area?' Our hunger is in direct proportion to our obedience.",
      "The Nine Helpful Questions to Aid Application: 1. Is there an example for me to follow? 2. Is there a sin to avoid? 3. Is there a promise to claim? 4. Is there a prayer to repeat? 5. Is there a command to obey? 6. Is there a condition to meet? 7. Is there a verse to memorize? 8. Is there an error to mark? 9. Is there a challenge to face?"
    ],
    tips: [
      "Principle: One Interpretation; Many Applications! Use the fork illustration—one handle of exegesis branches into many applicational tines.",
      "How do we bring change in our society? Before the Word can bring change to my world, it must first bring change to me."
    ]
  },
  {
    id: "bite-22",
    category: "Application",
    bite: "Bite 22",
    title: "Three Suggestions to Begin",
    subtitle: "Establishing a Personal and Corporate Plan",
    keyFormula: "Study the Word, Practice it, and Teach it!",
    summary: "To conclude BS510, Dr. Keith Shubert presents three vital suggestions for launching a lifelong journey of methodical Bible study, modeling the scribe Ezra who set his heart to study, practice, and teach God's statutes.",
    details: [
      "Suggestion I: Begin with a personal Bible study program: Determine your objectives, Establish your priorities, Develop your schedule, and Employ the fruit of discipline.",
      "Suggestion II: Form a small Bible study group: Groups allow active participation and involvement, provide the value of great motivation, and are less threatening.",
      "Suggestion III: Share the results of your Bible study with others: You can share it by teaching it, and you can share it by living it.",
      "The Ezra Model (Ezra 7:10): 'For Ezra had set his heart to study the law of the Lord, and to practice it, and to teach His statutes and ordinances in Israel.' Note the sequence: first study, second practice, third teach."
    ],
    tips: [
      "Dr. Shubert's Final encouragement: 'The Bible is not God's Word because it works; it works because it is God's Word.' Keep studying methodically!",
      "Ezra 7:10 is your primary ministerial roadmap. Never try to teach what you are not already actively practicing in your own life."
    ]
  }
];

export default function BiteLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Observation" | "Interpretation" | "Application" | "General">("All");
  const [activeBite, setActiveBite] = useState<string>("bite-02");

  const filteredBites = selectedCategory === "All" 
    ? biteLessons 
    : biteLessons.filter(b => b.category === selectedCategory);

  const activeLesson = biteLessons.find(b => b.id === activeBite) || biteLessons[0];

  const categoryColors = {
    General: "bg-amber-50 text-amber-800 border-amber-200",
    Observation: "bg-emerald-50 text-emerald-800 border-emerald-200",
    Interpretation: "bg-sky-50 text-sky-800 border-sky-200",
    Application: "bg-rose-50 text-rose-800 border-rose-200",
  };

  const categoryBadges = {
    General: "bg-amber-100 text-amber-800",
    Observation: "bg-emerald-100 text-emerald-800",
    Interpretation: "bg-sky-100 text-sky-800",
    Application: "bg-rose-100 text-rose-800",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="bite-library-root">
      {/* Sidebar List */}
      <div className="lg:col-span-4 bg-white border border-gray-150 rounded-xl p-4 shadow-sm h-[680px] flex flex-col">
        <h3 className="font-serif text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          BS510 Lecture Bites
        </h3>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 mb-4 border-b border-gray-100 pb-3">
          {(["All", "General", "Observation", "Interpretation", "Application"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs rounded-full font-medium transition-all ${
                selectedCategory === cat 
                  ? "bg-slate-800 text-white" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lessons List */}
        <div className="overflow-y-auto flex-1 space-y-2 pr-1 scrollbar-thin">
          {filteredBites.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setActiveBite(lesson.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-150 flex flex-col gap-1.5 ${
                activeBite === lesson.id 
                  ? "border-emerald-700 bg-emerald-50/40 shadow-xs" 
                  : "border-gray-100 bg-white hover:bg-slate-50 hover:border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                  {lesson.bite}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryBadges[lesson.category]}`}>
                  {lesson.category}
                </span>
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-slate-800 leading-snug">
                  {lesson.title}
                </h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {lesson.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-8 space-y-6">
        <motion.div
          key={activeLesson.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm min-h-[680px] flex flex-col"
        >
          {/* Header */}
          <div className="border-b border-gray-100 pb-5 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                  {activeLesson.bite}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${categoryColors[activeLesson.category]}`}>
                  {activeLesson.category} Class Material
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-800">
                {activeLesson.title}
              </h2>
              <p className="text-sm text-slate-500 italic mt-0.5">
                {activeLesson.subtitle}
              </p>
            </div>
            
            <div className="flex items-center gap-1.5 bg-emerald-50/50 text-emerald-800 text-xs py-2 px-3 rounded-lg border border-emerald-100/50 max-w-xs md:self-start">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-700" />
              <span>Conforms to BS510 EAST Academic Syllabus</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="space-y-6 flex-1">
            {/* Key Formula / Core Concept */}
            {activeLesson.keyFormula && (
              <div className="bg-slate-50 border border-gray-150 rounded-lg p-3.5 flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-slate-600 shrink-0" />
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Core IBSM Methodology
                  </span>
                  <span className="font-serif text-sm font-semibold text-slate-700 italic">
                    {activeLesson.keyFormula}
                  </span>
                </div>
              </div>
            )}

            {/* Lecture Summary */}
            <div>
              <h4 className="font-sans font-bold text-xs uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Lecture Summary
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm bg-slate-50/40 p-4 rounded-xl border border-gray-100">
                {activeLesson.summary}
              </p>
            </div>

            {/* Key Details */}
            <div>
              <h4 className="font-sans font-bold text-xs uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Essential Teachings & Principles
              </h4>
              <ul className="space-y-3">
                {activeLesson.details.map((detail, index) => (
                  <li key={index} className="flex gap-2.5 items-start text-sm text-slate-600">
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Tips */}
            <div>
              <h4 className="font-sans font-bold text-xs uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Rubric Warnings & Practical Tips
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeLesson.tips.map((tip, index) => (
                  <div key={index} className="bg-amber-50/40 border border-amber-100 p-3.5 rounded-lg text-xs text-amber-900 leading-relaxed">
                    <strong>Pro-Tip:</strong> {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Navigation Suggestion */}
          <div className="border-t border-gray-100 pt-4 mt-6 text-xs text-slate-400 text-center font-serif italic">
            "The Bible is not for your information, it is for your transformation!" — BS510 Course Motto
          </div>
        </motion.div>
      </div>
    </div>
  );
}
