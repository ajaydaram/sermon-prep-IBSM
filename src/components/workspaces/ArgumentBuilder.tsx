import React, { useState } from 'react';
import type { StudentArgumentsState, BookChartRow } from '../../types';
import { Plus, Trash2, Download, AlertTriangle, ChevronLeft, ChevronRight, Upload, Eye, Sparkles } from 'lucide-react';
import { parseDocxText, parseArgumentDoc } from '../../utils/docxParser';
import { getRubricEvaluation } from '../../utils/gemini';

interface ArgumentBuilderProps {
  argumentsState: StudentArgumentsState;
  setArgumentsState: (args: StudentArgumentsState) => void;
  markTaskDone: (taskId: string, isDone: boolean) => void;
  taskStatus: Record<string, string>;
}

type SubTabType = 'intro' | 'bookChart' | 'gridChart' | 'simpleOutline' | 'sentenceOutline' | 'argument' | 'rubric';

export const ArgumentBuilder: React.FC<ArgumentBuilderProps> = ({
  argumentsState,
  setArgumentsState,
  markTaskDone,
  taskStatus
}) => {
  const [activeArg, setActiveArg] = useState<'mark' | 'jonah' | 'philemon' | 'custom'>('jonah');
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('bookChart');

  // Local inputs for adding a new segment column
  const [newSegment, setNewSegment] = useState('');
  const [newSegmentTitle, setNewSegmentTitle] = useState('');
  const [newSegmentRelations, setNewSegmentRelations] = useState('');
  const [newSegmentGrade, setNewSegmentGrade] = useState('');
  const [newSegmentActor, setNewSegmentActor] = useState('');
  const [newSegmentGroup, setNewSegmentGroup] = useState('');
  const [newSegmentSubGroup, setNewSegmentSubGroup] = useState('');

  // Visual chart style ('hierarchy' = Mark argument (2).docx clean white hierarchical chart | 'slides' = Dr. Shubert parchment slides)
  const [chartStyle, setChartStyle] = useState<'hierarchy' | 'slides'>('hierarchy');
  
  const [newSentenceText, setNewSentenceText] = useState('');

  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('bs510_gemini_api_key') || '');
  const [tempApiKey, setTempApiKey] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);

  const currentArg = argumentsState[activeArg];

  const handleDocxUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const fullText = await parseDocxText(file);
      const parsedData = parseArgumentDoc(fullText);
      
      if (window.confirm(`Successfully read ${file.name}! Import parsed sections? This will overwrite your draft fields.`)) {
        setArgumentsState({
          ...argumentsState,
          [activeArg]: {
            ...currentArg,
            introductoryMaterial: parsedData.introductoryMaterial || currentArg.introductoryMaterial,
            simpleOutline: parsedData.simpleOutline || currentArg.simpleOutline,
            sentenceOutline: parsedData.sentenceOutline || currentArg.sentenceOutline,
            argumentText: parsedData.argumentText || currentArg.argumentText
          }
        });
        alert("Import completed! Check the tabs to review.");
      }
    } catch (err: any) {
      alert(`Error reading file: ${err.message || err}`);
    }
  };

  const runAiEvaluation = async () => {
    if (!apiKey) {
      alert("Please enter a Gemini API Key to run the evaluation.");
      setShowKeyInput(true);
      return;
    }
    setIsEvaluating(true);
    setEvaluationResult('');
    try {
      const bookChartText = currentArg.bookChart.map((r, i) => `${i+1}. ${r.segment} - ${r.title} [Division I/II: ${r.groupHeader || 'N/A'}, Sub-Division A/B: ${r.subGroupHeader || 'N/A'}, Party: ${r.actor || 'N/A'}, Response: ${r.grade || 'N/A'}, Relations: ${r.relations}]`).join('\n');
      const gridChartText = `Headers: ${currentArg.gridChart.headers.join(' | ')}\nRows:\n` + 
        currentArg.gridChart.rows.map(r => `- ${r.label}: ${r.cells.join(' | ')}`).join('\n');
      const sentenceOutlineText = currentArg.sentenceOutline.map((s, i) => `${i+1}. ${s}`).join('\n');
      
      const feedback = await getRubricEvaluation({
        title: details.title,
        intro: currentArg.introductoryMaterial,
        bookChart: bookChartText,
        gridChart: gridChartText,
        simpleOutline: currentArg.simpleOutline,
        sentenceOutline: sentenceOutlineText,
        argumentText: currentArg.argumentText
      });
      setEvaluationResult(feedback);
    } catch (err: any) {
      alert(`AI Evaluation failed: ${err.message || err}`);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSaveApiKey = () => {
    const trimmed = tempApiKey.trim();
    if (!trimmed) return;
    localStorage.setItem('bs510_gemini_api_key', trimmed);
    setApiKey(trimmed);
    setTempApiKey('');
    setShowKeyInput(false);
    alert("API Key saved locally!");
  };

  const loadJonahSample = () => {
    if (window.confirm("Load the complete 12-paragraph NASB 2020 Jonah Hierarchical Book Chart & Argument Portfolio with rich observations? This will overwrite your Jonah tab inputs.")) {
      const sample = {
        bookChartTheme: "The sovereign compassion of God toward the undeserving",
        bookNameLabel: "Jonah",
        actorRowLabel: "Perspective: Jonah",
        gradeRowLabel: "Prayer & Divine Answer",
        introductoryMaterial: `Introduction
As Dr. John D. Hannah observes in The Bible Knowledge Commentary, unlike other Old Testament prophetic books that compile spoken oracles addressed directly to nations, the Book of Jonah is a prophetic narrative centering on the prophet himself. The book records the journey of a reluctant prophet who resisted God’s commission, experienced sovereign discipline and preservation, proclaimed impending judgment to Nineveh, and bitterly resented God’s forgiveness toward a repentant Gentile city.

Author
According to Dr. Hannah, Jonah the son of Amittai from Gath-hepher in lower Galilee is the historical author of this prophetic book (Jon 1:1; 2 Kgs 14:25). The historical authenticity of the prophet Jonah, his three days in the stomach of the great fish, and the historic repentance of the Ninevites were explicitly confirmed by the Lord Jesus Christ in the Gospels (Matt 12:39–41; Luke 11:29–32).

Date of Writing
Dr. Hannah dates the events and composition of the book to the mid-eighth century BC, approximately 760 BC (c. 780–750 BC). Jonah ministered during the reign of King Jeroboam II of Israel (793–753 BC) and King Uzziah of Judah (792–740 BC), well before the Assyrian conquest and fall of Samaria in 722 BC.

Historical Setting
Dr. Hannah highlights that Jonah ministered during the eighth-century BC reign of King Jeroboam II of Israel (793–753 BC), when the northern kingdom enjoyed dramatic territorial expansion and material prosperity as Jonah had prophesied (2 Kgs 14:25). However, this era was characterized by severe spiritual apathy and moral decay in Israel. Meanwhile, Nineveh, a prominent capital and military center of the Assyrian Empire, was notorious for its cruelty, pagan wickedness, and oppression (Jon 1:2; 3:8).

Place of Writing
As noted by Dr. Hannah, the Book of Jonah was written in the northern kingdom of Israel (Samaria or Galilee) following the prophet's return from Nineveh.

Recipients
Dr. Hannah emphasizes that the primary recipients were the people of the northern kingdom of Israel. The narrative confronted their narrow nationalistic pride, challenged their spiritual complacency, and called them to recognize the universal scope of God's sovereign mercy toward all nations.

Occasion and Purpose
Dr. Hannah explains that the book was written under divine inspiration to expose the profound contrast between God’s boundless compassion and His prophet’s selfish, parochial resentment. The theological purpose was to demonstrate that the LORD’s sovereign grace and saving compassion extend freely to all undeserving peoples—including Gentile sailors and repentant Ninevites—calling God's covenant people to share His compassionate heart.

Theme
God revealed His sovereign compassion toward all undeserving peoples—rescuing pagan sailors, preserving His wayward prophet, and sparing repentant Nineveh—calling His people to share His compassion toward undeserving sinners (Jon 1:1–4:11).`,
        bookChart: [
          {
            id: 'j1',
            segment: '1:1–3',
            title: 'Jonah flees to Tarshish',
            groupHeader: 'God’s sovereign compassion toward the fleeing prophet and pagan sailors',
            subGroupHeader: 'Jonah rejects God’s call',
            actor: 'Panics & flees from LORD',
            grade: 'No prayer; Jonah flees',
            genre: 'Historical narrative',
            godAction: 'Calls prophet to Nineveh (1:1–2)',
            setting: 'Israel → Joppa → Tarshish ship',
            relations: 'Contrast: Commanded to go East to Nineveh, Jonah goes West to Tarshish ("went down" 3x).'
          },
          {
            id: 'j2',
            segment: '1:4–6',
            title: 'Tempest strikes the ship',
            groupHeader: 'God’s sovereign compassion toward the fleeing prophet and pagan sailors',
            subGroupHeader: 'Jonah rejects God’s call',
            actor: 'Apathetic; sound asleep',
            grade: 'Sailors cry; Jonah asleep',
            genre: 'Historical narrative',
            godAction: 'Chastens with great wind (1:4)',
            setting: 'Raging sea (in ship\'s hold)',
            relations: 'Foil: Pagan sailors pray vehemently & lighten ship while prophet sleeps soundly until captain awakens him.'
          },
          {
            id: 'j3',
            segment: '1:7–9',
            title: 'Lot falls on Jonah',
            groupHeader: 'God’s sovereign compassion toward the fleeing prophet and pagan sailors',
            subGroupHeader: 'Jonah rejects God’s call',
            actor: 'Confesses to Creator God',
            grade: 'Seek lot; God reveals',
            genre: 'Historical narrative',
            godAction: 'Directs lot on Jonah (1:7)',
            setting: 'On deck of tossing ship',
            relations: 'Identification: Lot falls on Jonah; confession that he fears the LORD God of heaven who made sea and dry land.'
          },
          {
            id: 'j4',
            segment: '1:10–14',
            title: 'Sailors plead and row',
            groupHeader: 'God’s sovereign compassion toward the fleeing prophet and pagan sailors',
            subGroupHeader: 'Jonah rejects God’s call',
            actor: 'Resigned; casts to sea',
            grade: 'Sailors plead for mercy',
            genre: 'Historical narrative',
            godAction: 'Intensifies the storm (1:11, 13)',
            setting: 'Raging sea (rowing to land)',
            relations: 'Moral Contrast: Pagan sailors desperately row to save Jonah\'s life and plead with the LORD not to charge them with innocent blood.'
          },
          {
            id: 'j5',
            segment: '1:15–17',
            title: 'Sea calmed, fish appointed',
            groupHeader: 'God’s sovereign compassion toward the fleeing prophet and pagan sailors',
            subGroupHeader: 'Jonah receives God’s rescue',
            actor: 'Cast in sea; preserved in fish',
            grade: 'God answers: sea calmed!',
            genre: 'Historical narrative',
            godAction: 'Stills sea & designates fish (1:15, 17)',
            setting: 'Cast in sea → fish stomach',
            relations: 'Climax of Ch. 1: Sea stops raging; sailors fear God exceedingly with sacrifices and vows; God designates a great fish to swallow Jonah.'
          },
          {
            id: 'j6',
            segment: '2:1–10',
            title: 'Jonah prays in the fish',
            groupHeader: 'God’s sovereign compassion toward the fleeing prophet and pagan sailors',
            subGroupHeader: 'Jonah receives God’s rescue',
            actor: 'Prays psalm of praise',
            grade: 'God answers: Jonah saved!',
            genre: 'Hebrew poetry (2:2–9) & narrative (2:1, 10)',
            godAction: 'Commands fish to vomit him (2:10)',
            setting: 'Fish stomach → dry land',
            relations: 'Genre Shift to Hebrew Poetry (2:2–9): Poetic thanksgiving from Sheol; "Salvation is from the LORD"; fish vomits Jonah onto dry land (2:10).'
          },
          {
            id: 'j7',
            segment: '3:1–4',
            title: 'Jonah warns Nineveh',
            groupHeader: 'God’s sovereign compassion toward repentant Nineveh and the angry prophet',
            subGroupHeader: 'Jonah returns to God’s mission',
            actor: 'Preaches 40-day warning',
            grade: 'Proclaims overthrow',
            genre: 'Historical narrative',
            godAction: 'Recommissions prophet (3:1–2)',
            setting: 'Israel → Nineveh city',
            relations: 'Repetition: Word of the LORD comes a second time; Jonah obeys and enters Nineveh proclaiming 40-day overthrow warning.'
          },
          {
            id: 'j8',
            segment: '3:5–9',
            title: 'Nineveh repents in sackcloth',
            groupHeader: 'God’s sovereign compassion toward repentant Nineveh and the angry prophet',
            subGroupHeader: 'Jonah returns to God’s mission',
            actor: 'Observes fast and ashes',
            grade: 'Nineveh cries vehemently',
            genre: 'Historical narrative',
            godAction: 'Observes true repentance (3:5–9)',
            setting: 'Across city & king\'s palace',
            relations: 'Universal Repentance: Ninevites believe God; king issues royal decree of universal fasting in sackcloth, turning from evil and violence.'
          },
          {
            id: 'j9',
            segment: '3:10',
            title: 'God relents from disaster',
            groupHeader: 'God’s sovereign compassion toward repentant Nineveh and the angry prophet',
            subGroupHeader: 'Jonah returns to God’s mission',
            actor: 'Witnesses city spared',
            grade: 'God answers: city spared!',
            genre: 'Historical narrative',
            godAction: 'Relents from disaster (3:10)',
            setting: 'Nineveh city (spared)',
            relations: 'Cruciality / Theological Pivot: God sees their genuine turn; God relents from the declared disaster and spares Nineveh.'
          },
          {
            id: 'j10',
            segment: '4:1–4',
            title: 'Jonah complains in anger',
            groupHeader: 'God’s sovereign compassion toward repentant Nineveh and the angry prophet',
            subGroupHeader: 'Jonah resists God’s compassion',
            actor: 'Pouts & prays to die',
            grade: 'Prays to die (REFUSED!)',
            genre: 'Narrative & dialogue',
            godAction: 'Challenges angry prayer (4:4)',
            setting: 'Outside city of Nineveh',
            relations: 'Theological Protest: Jonah resents God\'s gracious character (Exod 34:6) and prays to die; God refuses death wish and questions anger.'
          },
          {
            id: 'j11',
            segment: '4:5–8',
            title: 'Plant, worm, and wind',
            groupHeader: 'God’s sovereign compassion toward repentant Nineveh and the angry prophet',
            subGroupHeader: 'Jonah resists God’s compassion',
            actor: 'Shelters east; faints in heat',
            grade: 'Begs to die (REFUSED!)',
            genre: 'Historical narrative',
            godAction: 'Appoints plant, worm & wind (4:6–8)',
            setting: 'East of city under shelter',
            relations: 'Divine Object Lesson: God designates shade plant (joy), worm (withers plant), and scorching east wind; refuses death wish again.'
          },
          {
            id: 'j12',
            segment: '4:9–11',
            title: 'God rebukes Jonah\'s pity',
            groupHeader: 'God’s sovereign compassion toward repentant Nineveh and the angry prophet',
            subGroupHeader: 'Jonah resists God’s compassion',
            actor: 'Convicted into silent rebuke',
            grade: 'God answers with mercy!',
            genre: 'Narrative & dialogue',
            godAction: 'Extends divine compassion (4:10–11)',
            setting: 'East of city / divine dialogue',
            relations: 'Climax & Enduring Interrogation: God contrasts Jonah\'s selfish pity for a plant with His sovereign compassion for 120,000 people and animals; Jonah silenced.'
          }
        ],
        gridChart: {
          headers: ['Jonah', 'I. First Commission: Chs. 1–2 (1:1–2:10)', 'II. Second Commission: Chs. 3–4 (3:1–4:11)'],
          rows: [
            { id: 'g0', label: 'Genre', cells: ['Historical narrative (1:1–2:1; 2:10) & Hebrew poetry (2:2–9; thanksgiving psalm from Sheol)', 'Historical narrative and divine dialogue culminating in rhetorical interrogation (3:1–4:11)'] },
            { id: 'g1', label: 'Perspective: Jonah', cells: ['Jonah Panics & Flees (1:1–14) → Jonah Prays & Praises (1:15–2:10)', 'Jonah Preaches (3:1–10) → Jonah Pouts & Resents (4:1–11)'] },
            { id: 'g2', label: 'Perspective: God', cells: ['God Chastens & Pursues (1:1–14) → God Cleanses & Delivers (1:15–2:10)', 'God Converts & Relents (3:1–10) → God Cares & Rebukes (4:1–11)'] },
            { id: 'g3', label: 'Prayer & Divine Answer', cells: ['Sailors cry to gods (1:5); Sailors plead to LORD (1:14) → GOD ANSWERS: sea calmed! (1:15); Jonah prays (2:1) → GOD ANSWERS: delivered on land! (2:10)', 'Nineveh cries vehemently (3:8) → GOD ANSWERS: city spared! (3:10); Jonah prays to die (4:3, 8) → GOD REFUSES DEATH WISH, answering with compassion! (4:11)'] },
            { id: 'g4', label: 'Geography / Setting', cells: ['Jonah at Sea: Israel → Joppa → Mediterranean Sea → Belly of the Great Fish → Dry Land', 'Jonah at Nineveh: Israel → Exceedingly Great City of Nineveh → Palace → East of City under Shelter'] }
          ]
        },
        simpleOutline: `The sovereign compassion of God toward the undeserving (Jonah 1:1–4:11)
I. God’s sovereign compassion toward the fleeing prophet and pagan sailors (1:1–2:10)
   A. Jonah rejects God’s call (1:1–14)
      1. Jonah flees to Tarshish (1:1–3)
      2. Tempest strikes the ship (1:4–6)
      3. Lot falls on Jonah (1:7–9)
      4. Sailors plead and row (1:10–14)
   B. Jonah receives God’s rescue (1:15–2:10)
      1. Sea calmed, fish designated (1:15–17)
      2. Jonah prays in the fish (2:1–10)
II. God’s sovereign compassion toward repentant Nineveh and the angry prophet (3:1–4:11)
   A. Jonah returns to God’s mission (3:1–10)
      1. Jonah warns Nineveh (3:1–4)
      2. Nineveh repents in sackcloth (3:5–9)
      3. God relents from disaster (3:10)
   B. Jonah resists God’s compassion (4:1–11)
      1. Jonah complains in anger (4:1–4)
      2. Plant, worm, and wind (4:5–8)
      3. God rebukes Jonah’s pity (4:9–11)`,
        sentenceOutline: [
          "God revealed His sovereign compassion toward all undeserving peoples—rescuing pagan sailors, preserving His wayward prophet, and sparing repentant Nineveh—calling His people to share His compassion toward undeserving sinners (Jon 1:1–4:11).",
          "I. God displayed His sovereign compassion toward His fleeing prophet and pagan sailors through the tempest and the great fish (1:1–2:10).",
          "A. Jonah rebelled against God’s call in downward flight toward Tarshish while the pagan sailors awakened to earnest prayer (1:1–14).",
          "1. Jonah deliberately fled toward Tarshish to escape the presence of the LORD and evade his prophetic commission to Nineveh (1:1–3).",
          "2. The LORD hurled a violent tempest on the sea that threatened shipwreck while Jonah slept soundly in the hold until the captain awakened him to pray (1:4–6).",
          "3. The sailors cast lots to discover who caused the disaster, and the lot fell on Jonah, who confessed that he feared the LORD God of heaven who made sea and dry land (1:7–9).",
          "4. Although Jonah instructed the sailors to throw him into the sea, the men rowed desperately to reach land and prayed earnestly that the LORD would not hold them guilty of innocent blood (1:10–14).",
          "B. God sovereignly delivered Jonah from death in the belly of the great fish after the sea was calmed for the sailors (1:15–2:10).",
          "1. The sailors reluctantly cast Jonah into the sea, whereupon the waters ceased raging, prompting the sailors to worship the LORD while God designated a great fish to preserve His prophet (1:15–17).",
          "2. From the stomach of the great fish, Jonah offered a prayer of thanksgiving confessing that salvation is from the LORD, whereupon God commanded the fish to vomit him onto dry land (2:1–10).",
          "II. God displayed His sovereign compassion toward repentant Nineveh and rebuked the bitter resentment of His angry prophet (3:1–4:11).",
          "A. God recommissioned Jonah to proclaim judgment, moving all Nineveh to radical repentance and leading God to relent from calamity (3:1–10).",
          "1. God called Jonah a second time, and the prophet obeyed by entering Nineveh and proclaiming its imminent overthrow in forty days (3:1–4).",
          "2. The people and king of Nineveh believed God, declared a universal fast in sackcloth, turned from their evil ways, and cried urgently to God for mercy (3:5–9).",
          "3. When God saw Nineveh turn from its evil way, He sovereignly relented from the declared disaster and spared the city (3:10).",
          "B. Jonah resented God’s mercy toward Nineveh, and God used a plant, a worm, and a scorching wind to expose the hypocrisy of the prophet’s misplaced pity (4:1–11).",
          "1. Jonah bitterly complained against God’s gracious and compassionate character and requested to die, prompting God to question the validity of his anger (4:1–4).",
          "2. Jonah waited outside Nineveh under a shelter where God designated a shade plant, a destroying worm, and a scorching east wind that caused the prophet to faint and beg for death (4:5–8).",
          "3. God confronted Jonah by contrasting the prophet’s selfish grief over a short-lived plant with the LORD’s boundless compassion for more than 120,000 spiritually helpless people and many animals in Nineveh (4:9–11)."
        ],
        argumentText: `God revealed His sovereign compassion toward all undeserving peoples—rescuing pagan sailors, preserving His wayward prophet, and sparing repentant Nineveh—calling His people to share His compassion toward undeserving sinners (Jon 1:1–4:11).

I. God displayed His sovereign compassion toward His fleeing prophet and pagan sailors through the tempest and the great fish (1:1–2:10).
In these opening chapters, the LORD displayed His supreme authority over creation and His boundless compassion toward both pagan sailors and His rebellious prophet. While Jonah sought to flee from the presence of the LORD, God pursued him in compassion, leading the pagan sailors to fear and worship the LORD and preserving the drowning prophet in the depths of the sea.

A. Jonah rebelled against God’s call in downward flight toward Tarshish while the pagan sailors awakened to earnest prayer (1:1–14).
In chapter one, Jonah's rebellious refusal to obey God's commission stood in direct contrast to the spiritual responsiveness of the Gentile sailors. As Jonah descended into spiritual apathy and slumber, God intervened through a violent sea tempest that exposed the prophet's disobedience and prompted the pagan sailors to call upon the name of the LORD.

1. Jonah deliberately fled toward Tarshish to escape the presence of the LORD and evade his prophetic commission to Nineveh (1:1–3).
The narrative opened with God's direct prophetic commission commanding Jonah to arise and go to the great city of Nineveh and cry out against its wickedness (1:1–2). Instead of obeying, Jonah immediately arose to flee in the opposite direction toward Tarshish to escape from the presence of the LORD (1:3). The prophet went down to Joppa, paid the fare, and boarded a ship heading for Tarshish, initiating a continuous physical and spiritual descent away from the divine will.

2. The LORD hurled a violent tempest on the sea that threatened shipwreck while Jonah slept soundly in the hold until the captain awakened him to pray (1:4–6).
In response to Jonah's flight, the LORD hurled a great wind onto the sea, creating a violent storm that brought the vessel to the verge of breaking apart (1:4). Filled with terror, each pagan sailor cried out to his own god and cast valuable cargo overboard to lighten the ship (1:5a). In stark contrast to the sailors' frantic prayers, Jonah went down into the lowest hold of the ship, lay down, and fell sound asleep (1:5b). The ship captain approached the slumbering prophet, rebuked his apathy, and urgently commanded him to arise and call upon his god in hope of divine deliverance (1:6).

3. The sailors cast lots to discover who caused the disaster, and the lot fell on Jonah, who confessed that he feared the LORD God of heaven who made sea and dry land (1:7–9).
Recognizing the supernatural nature of the tempest, the crew decided to cast lots to determine who was responsible for the catastrophe striking them (1:7a). God sovereignly directed the lot so that it fell upon Jonah, whereupon the sailors pressed him with rapid questions regarding his occupation, origin, country, and people (1:7b–8). Jonah openly confessed his Hebrew identity and acknowledged that he feared the LORD God of heaven who made both the sea and dry land, revealing to the sailors that he was fleeing from the sovereign Creator of the very waters threatening their lives (1:9).

4. Although Jonah instructed the sailors to throw him into the sea, the men rowed desperately to reach land and prayed earnestly that the LORD would not hold them guilty of innocent blood (1:10–14).
Jonah's confession caused extreme fear among the sailors, who questioned how he could dare disobey the sovereign God of heaven and sea (1:10). As the tempest grew increasingly violent, the men asked Jonah what they had to do to calm the raging waters (1:11). Jonah instructed them to pick him up and hurl him into the sea, acknowledging that the catastrophic storm had come entirely upon his account (1:12). Rather than immediately discarding the prophet, the compassionate sailors rowed desperately against the gale to reach land, but the storm intensified beyond their strength (1:13). Conceding their helplessness, the crew cried out directly to the LORD, pleading that He would not let them perish for taking Jonah's life or hold them guilty of innocent blood (1:14).

B. God sovereignly delivered Jonah from death in the belly of the great fish after the sea was calmed for the sailors (1:15–2:10).
Following the crisis at sea, the narrative transitioned from divine judgment to sovereign deliverance. When the sailors reluctantly cast Jonah overboard, God immediately stilled the raging sea and designated a great fish to preserve the drowning prophet, eliciting reverent worship from the Gentiles and a prayer of declarative thanksgiving from Jonah.

1. The sailors reluctantly cast Jonah into the sea, whereupon the waters ceased raging, prompting the sailors to worship the LORD while God designated a great fish to preserve His prophet (1:15–17).
The sailors lifted Jonah and hurled him into the roaring sea, whereupon the raging waters immediately stilled (1:15). Beholding this miraculous display of sovereign authority over nature, the men became exceedingly afraid of the LORD, offered a sacrifice to Him, and made vows of lasting devotion (1:16). Meanwhile, the LORD demonstrated His providential mercy toward His wayward prophet by designating a great fish to swallow Jonah, preserving him alive within its stomach for three days and three nights (1:17).

2. From the stomach of the great fish, Jonah offered a prayer of thanksgiving confessing that salvation is from the LORD, whereupon God commanded the fish to vomit him onto dry land (2:1–10).
From the stomach of the great fish, Jonah prayed to the LORD his God, recalling how he cried out in his distress from the depths of Sheol and God heard his voice (2:1–2). Recounting his terrifying submersion beneath swirling currents, breakers, and weeds wrapped about his head at the base of the mountains, Jonah praised God for bringing his life up from the pit (2:3–7). Jonah declared that those who follow worthless idols abandon their faithfulness, while he vowed to sacrifice with a voice of thanksgiving and fulfill his vows, culminating in the triumphant confession that salvation belongs to the LORD (2:8–9). At God's command, the great fish vomited Jonah onto dry land, fully restoring him to the realm of the living (2:10).

II. God displayed His sovereign compassion toward repentant Nineveh and rebuked the bitter resentment of His angry prophet (3:1–4:11).
In these final two chapters, the LORD demonstrated His boundless compassion toward the repentant city of Nineveh and lovingly confronted the hardened attitude of His prophet. When Nineveh responded to God's warning with deep humility, God relented from judgment, exposing the contrast between divine compassion for the lost and Jonah's narrow, ungracious resentment.

A. God recommissioned Jonah to proclaim judgment, moving all Nineveh to radical repentance and leading God to relent from calamity (3:1–10).
This narrative section recorded Nineveh's extraordinary response to God's warning of judgment. Upon receiving a second commission to proclaim God's message, Jonah warned Nineveh of its impending overthrow, prompting the people and the king to believe God, fast in sackcloth, cry out to the LORD, and turn from their evil ways, whereupon God relented from the declared calamity.

1. God called Jonah a second time, and the prophet obeyed by entering Nineveh and proclaiming its imminent overthrow in forty days (3:1–4).
The word of the LORD came to Jonah a second time, commanding him to arise, go to Nineveh, and proclaim the message God gave him (3:1–2). Unlike his initial refusal, Jonah obeyed the divine command, arose, and traveled to the exceedingly large city of Nineveh (3:3). Entering a day's walk into the metropolis, Jonah proclaimed the divine ultimatum that forty more days remained before Nineveh would be overthrown (3:4).

2. The people and king of Nineveh believed God, declared a universal fast in sackcloth, turned from their evil ways, and cried urgently to God for mercy (3:5–9).
Upon hearing Jonah's proclamation, the inhabitants of Nineveh believed in God, called a corporate fast, and put on sackcloth from the greatest to the least of them (3:5). When the report reached the king of Nineveh, the monarch arose from his royal throne, removed his robe, covered himself with sackcloth, and sat down in the dust (3:6). The king and his nobles issued a royal decree enforcing a total fast for humans and animals alike, requiring everyone to be covered in sackcloth, call upon God vehemently, and turn away from evil deeds and violence, in the humble hope that God might relent from His fierce anger so they would not perish (3:7–9).

3. When God saw Nineveh turn from its evil way, He sovereignly relented from the declared disaster and spared the city (3:10).
When God observed their actions and saw that they genuinely turned from their evil ways, He relented concerning the disaster He had declared He would bring upon them, choosing not to destroy the city (3:10). God's decision to spare Nineveh revealed that prophetic announcements of judgment were warnings intended to invite genuine repentance, displaying God's sovereign readiness to extend mercy to any pagan nation that humbles itself before Him.

B. Jonah resented God’s mercy toward Nineveh, and God used a plant, a worm, and a scorching wind to expose the hypocrisy of the prophet’s misplaced pity (4:1–11).
The final section of the book brought the narrative to its emotional and theological climax through a direct dialogue between God and His prophet. Resentful that God spared Israel's enemies, Jonah sank into bitter anger, prompting the LORD to use an object lesson from nature to expose the stark contrast between Jonah's petty concern for a plant and God's compassionate concern for a vast city.

1. Jonah bitterly complained against God’s gracious and compassionate character and requested to die, prompting God to question the validity of his anger (4:1–4).
Rather than rejoicing over the deliverance of Nineveh, Jonah was exceedingly displeased and became furious that God had extended mercy to Israel's Gentile enemies (4:1). The prophet prayed and admitted that this impending grace was the very reason he originally fled to Tarshish, citing the classic credal confession that the LORD is a gracious and compassionate God, slow to anger, abundant in mercy, and one who relents of disaster (4:2). Overwhelmed by bitter disappointment, Jonah begged the LORD to take his life, declaring that death was preferable to witnessing God's mercy to Gentiles (4:3). The LORD met Jonah's outburst not with harsh condemnation, but with a searching question challenging whether he had any valid reason to be angry (4:4).

2. Jonah waited outside Nineveh under a shelter where God designated a shade plant, a destroying worm, and a scorching east wind that caused the prophet to faint and beg for death (4:5–8).
Jonah departed the city and sat down to the east, constructing a crude shelter to sit in the shade while waiting to see what would happen to Nineveh (4:5). To relieve the prophet's discomfort, the LORD God designated a leafy plant that grew over Jonah's head, bringing him immense joy (4:6). At dawn the next morning, God designated a worm that attacked the plant, causing it to wither and die (4:7). When the sun arose, God designated a scorching east wind and intense heat that beat upon Jonah's head until he became faint, prompting the prophet to despair once more and beg with all his soul to die (4:8).

3. God confronted Jonah by contrasting the prophet’s selfish grief over a short-lived plant with the LORD’s boundless compassion for more than 120,000 spiritually helpless people and many animals in Nineveh (4:9–11).
God questioned Jonah a second time, asking if he had good reason to be angry about the plant, to which the obstinate prophet insisted he had every right to be angry even unto death (4:9). The LORD delivered the definitive divine rebuke: Jonah felt intense compassion for an ephemeral plant for which he had not labored and which sprang up and perished overnight (4:10). If the prophet could pity a short-lived plant, the LORD had every right to have compassion on Nineveh, an immense city containing more than 120,000 spiritually helpless people who did not know their right hand from their left, as well as many innocent animals (4:11). The book concluded with Jonah in convicted silence, leaving God's sovereign, compassionate heart standing as an enduring challenge to His people.`
      };
      setActiveArg('jonah');
      setArgumentsState({
        ...argumentsState,
        jonah: sample
      });
    }
  };

  const loadPhilemonSample = () => {
    if (window.confirm("Load the complete Philemon Book Chart & Argument Portfolio (400 points)? This will load into your Philemon tab.")) {
      const sample = {
        bookChartTheme: "The appeal of Paul’s Christlike leadership urged Philemon to receive his converted runaway slave Onesimus no longer as a slave, but as a beloved brother in Christ, securing gospel reconciliation through sacrificial love and personal accountability (Phlm 1–25).",
        bookNameLabel: "Philemon",
        actorRowLabel: "Involved party",
        gradeRowLabel: "Leadership principle",
        introductoryMaterial: `Introduction
The Letter to Philemon is Paul’s shortest and most intensely personal epistle, addressing the volatile first-century crisis of a converted runaway slave returning to his Christian master. In this brief letter, Paul demonstrated how the transforming power of the gospel redefines societal hierarchies into spiritual brotherhood within the household of God.

Author
The Apostle Paul authored the epistle, identifying himself explicitly by name as “a prisoner of Christ Jesus” alongside his coworker Timothy (Phlm 1, 9, 19). Paul affirmed his direct personal authorship by penning the legal promissory pledge with his own hand (Phlm 19).

Date of Writing
Paul composed this letter approximately AD 60–62 during his first Roman imprisonment under house arrest (Acts 28:16, 30–31). It was dispatched simultaneously with the Epistle to the Colossians via Tychicus and Onesimus (Col 4:7–9).

Historical Setting
Historically, the epistle was situated within the Pax Romana under Emperor Nero, where Roman slavery was an entrenched, legally coercive empire-wide institution maintained through conquest, birth, and economic distress (Harrill; Byron; Scheidel). Under Roman law (dominica potestas), masters held absolute legal authority over enslaved persons, rendering a runaway slave (fugitivus) subject to severe branding, imprisonment, or execution (Bradley). Slaves performed diverse roles from brutal agricultural field labor to skilled domestic, administrative, and financial management (Cobb and Shaner), yet even manumitted freedpersons remained legally bound through continuing patronal obligations (De Vos). In Colossae, an Asian provincial town recently damaged by an earthquake, Philemon hosted a fledgling house church whose societal order was profoundly challenged when his runaway slave Onesimus met Paul in Rome and became a believer (Moo).

Place of Writing
Paul wrote this letter from Rome while under military custody in his rented quarters awaiting trial before Caesar (Acts 28:16, 30; Phlm 1, 9, 23). From this place of confinement, Paul actively ministered and dispatched coworkers throughout the empire.

Recipients
The letter was addressed primarily to Philemon, a wealthy Christian citizen of Colossae, along with Apphia, Archippus, and the house church meeting in Philemon’s residence (Phlm 1–2). Addressing the entire congregation placed Philemon’s personal decision within the loving accountability of the Christian community.

Occasion and Purpose
The occasion was the return of the converted runaway slave Onesimus to Colossae carrying this letter from Paul. Paul’s purpose was to appeal to Philemon on the basis of Christian love rather than apostolic command, urging him to forgive Onesimus, cancel his debt, and welcome him back as a beloved brother in the Lord. Furthermore, Paul sought to inspire Philemon to do even more than requested, potentially granting Onesimus freedom for continuing gospel ministry.

Theme
The appeal of Paul’s Christlike leadership urged Philemon to receive his converted runaway slave Onesimus no longer as a slave, but as a beloved brother in Christ, securing gospel reconciliation through sacrificial love and personal accountability (Phlm 1–25).`,
        bookChart: [
    {
      id: 'p1',
      segment: '1–3',
      title: 'Prisoner’s warm greeting',
      groupHeader: 'Paul appealed for Onesimus’s reception in love',
      subGroupHeader: 'Preparing Philemon’s heart',
      actor: 'Paul, Timothy & Philemon’s church',
      grade: 'Humble identity: “prisoner” of Christ (v. 1)',
      genre: 'Epistolary Opening: Greeting (1–3)',
      godAction: 'Master & slave → Co-workers in Christ',
      setting: 'Roman prison → Colossian house church',
      relations: 'Contrast: Rather than claiming apostolic authority, Paul identifies as "a prisoner of Christ Jesus" (v. 1), addressing Philemon and the house church.'
    },
    {
      id: 'p2',
      segment: '4–7',
      title: 'Thanksgiving for love',
      groupHeader: 'Paul appealed for Onesimus’s reception in love',
      subGroupHeader: 'Preparing Philemon’s heart',
      actor: 'Paul & Philemon (with all saints)',
      grade: 'Affirming & praying before appealing (vv. 4–7)',
      genre: 'Epistolary Opening: Thanksgiving & Prayer (4–7)',
      godAction: 'Legal hierarchy → Koinonia of faith',
      setting: 'Continual prayer with joy and comfort',
      relations: 'Causation: Philemon’s proven record of refreshing the hearts of the saints (splagchna, v. 7) provides the moral basis for Paul’s appeal.'
    },
    {
      id: 'p3',
      segment: '8–9',
      title: 'Appeal of love',
      groupHeader: 'Paul appealed for Onesimus’s reception in love',
      subGroupHeader: 'Interceding for Onesimus',
      actor: 'Paul & Philemon',
      grade: 'Appealing in love over command (vv. 8–9)',
      genre: 'Epistolary Body: Appeal of Love (8–9)',
      godAction: 'Commanding authority → Vulnerable love',
      setting: 'Rome (aged, chained) → Colossian master',
      relations: 'Contrast: Apostolic right to command (epitassein) vs. appealing on the basis of love (dia tēn agapēn, vv. 8–9) as an aged prisoner.'
    },
    {
      id: 'p4',
      segment: '10–16',
      title: 'Receiving a brother',
      groupHeader: 'Paul appealed for Onesimus’s reception in love',
      subGroupHeader: 'Interceding for Onesimus',
      actor: 'Paul, Onesimus & Philemon',
      grade: 'Seeking voluntary consent (v. 14)',
      genre: 'Epistolary Body: Plea for Brother (10–16)',
      godAction: '“Useless” runaway slave → Beloved brother forever',
      setting: 'Spiritual child sent back to Colossae',
      relations: 'Climax & Wordplay: Onesimus was formerly useless (achrēston) but now useful (euchrēston, v. 11); received no longer as a slave, but a beloved brother (v. 16).'
    },
    {
      id: 'p5',
      segment: '17–20',
      title: 'Pledging debt repayment',
      groupHeader: 'Paul sealed the reconciliation through partnership',
      subGroupHeader: 'Assuming debt and confidence',
      actor: 'Paul & Philemon (for Onesimus)',
      grade: 'Sacrificial cost-bearing & advocacy (vv. 18–19)',
      genre: 'Epistolary Body: Partnership Pledge (17–20)',
      godAction: 'Guilt & debt → Imputed to Paul’s account',
      setting: 'Pledge signed with Paul’s own hand',
      relations: 'Sacrificial Mediation: "Accept him as you would me" (v. 17); promissory note (cheirographon) assuming all debts (vv. 18–19); "refresh my heart in Christ" (v. 20).'
    },
    {
      id: 'p6',
      segment: '21',
      title: 'Confidence in obedience',
      groupHeader: 'Paul sealed the reconciliation through partnership',
      subGroupHeader: 'Assuming debt and confidence',
      actor: 'Paul & Philemon',
      grade: 'Inspiring exceeding obedience (v. 21)',
      genre: 'Epistolary Body: Confidence in Obedience (21)',
      godAction: 'Coerced duty → Joyful, exceeding obedience',
      setting: 'Absolute confidence in Philemon’s love',
      relations: 'Progression: Paul expresses absolute confidence that Philemon will do even more than what is asked (hyper ha legō, v. 21).'
    },
    {
      id: 'p7',
      segment: '22',
      title: 'Guest room request',
      groupHeader: 'Paul sealed the reconciliation through partnership',
      subGroupHeader: 'Expecting visit and fellowship',
      actor: 'Paul & Philemon',
      grade: 'Personal pastoral accountability (v. 22)',
      genre: 'Epistolary Body: Guest Room Request (22)',
      godAction: 'Distant appeal → Impending personal visit',
      setting: 'Preparing lodging in hope through prayer',
      relations: 'Accountability: Requesting a guest room reminds Philemon that Paul expects to see the fruit of reconciliation in person through their prayers (v. 22).'
    },
    {
      id: 'p8',
      segment: '23–25',
      title: 'Final greetings and grace',
      groupHeader: 'Paul sealed the reconciliation through partnership',
      subGroupHeader: 'Expecting visit and fellowship',
      actor: 'Paul, 5 coworkers & house church',
      grade: 'Corporate grace & team witness (vv. 23–25)',
      genre: 'Epistolary Closing: Greetings & Grace (23–25)',
      godAction: 'Household hierarchy → Community under grace',
      setting: 'Fellow prisoners & laborers to church',
      relations: 'Inclusio & Benediction: Greetings from Epaphras, Mark, Aristarchus, Demas, Luke (vv. 23–24); closing benediction on the church’s spirit (plural hymōn, v. 25).'
    }
  ],
        gridChart: {
    headers: ['Topics', 'I. Paul appealed for Onesimus’s reception in love (vv. 1–16)', 'II. Paul sealed the reconciliation through partnership (vv. 17–25)'],
    rows: [
      { id: 'pg0', label: 'Epistolary Structure (Bite 17)', cells: ['Opening: Salutation (vv. 1–3) & Thanksgiving/Prayer (vv. 4–7); Body: Appeal of Love (vv. 8–9) & Plea for Brother (vv. 10–16)', 'Body: Partnership Pledge (vv. 17–20), Confidence (v. 21), Guest Room (v. 22) & Closing Greetings/Grace (vv. 23–25)'] },
      { id: 'pg1', label: 'Involved party', cells: ['Paul ("prisoner"), Timothy, Philemon, Apphia, Archippus, House Church & Onesimus ("child")', 'Paul ("partner"), Philemon ("brother"), Onesimus & 5 Fellow Workers (Mark, Luke, etc.)'] },
      { id: 'pg2', label: 'Biblical Leadership Principle', cells: ['Humble identification (laying aside rank) + Affirmation before asking + Appealing in love over command + Seeking voluntary consent', 'Sacrificial cost-bearing (promissory note) + Inspiring exceeding obedience + Personal pastoral accountability + Corporate grace'] },
      { id: 'pg3', label: '1st-C. Slavery vs. Gospel', cells: ['Earthly master & runaway slave → Beloved brother in the flesh and in the Lord (vv. 11, 16)', 'Legal retribution & liabilities → Imputed to Paul’s account; community transformed under grace'] },
      { id: 'pg4', label: 'Setting / Atmosphere', cells: ['Roman prison to Colossian house church (warm, prayerful, vulnerable, urgent)', 'Signed pledge in Paul’s hand → Lodging prepared in prayer → Apostolic circle united in grace'] }
    ]
  },
        simpleOutline: `The appeal of Paul’s Christlike leadership urged Philemon to receive his converted runaway slave Onesimus no longer as a slave, but as a beloved brother in Christ, securing gospel reconciliation through sacrificial love and personal accountability (Phlm 1–25).

I. Paul appealed for Onesimus’s reception in love (1–16)
   A. Preparing Philemon’s heart (1–7)
      1. Prisoner’s warm greeting (1–3)
      2. Thanksgiving for love (4–7)
   B. Interceding for Onesimus (8–16)
      1. Appeal of love (8–9)
      2. Receiving a brother (10–16)

II. Paul sealed the reconciliation through partnership (17–25)
   A. Assuming debt and confidence (17–21)
      1. Pledging debt repayment (17–20)
      2. Confidence in obedience (21)
   B. Expecting visit and fellowship (22–25)
      1. Guest room request (22)
      2. Final greetings and grace (23–25)`,
        sentenceOutline: [
    "The appeal of Paul’s Christlike leadership urged Philemon to receive his converted runaway slave Onesimus no longer as a slave, but as a beloved brother in Christ, securing gospel reconciliation through sacrificial love and personal accountability (Phlm 1–25).",
    "I. Paul appealed for the restoration of Onesimus by preparing Philemon’s heart and urging him to welcome the converted runaway as a beloved brother in the Lord (1–16).",
    "A. Paul prepared Philemon’s heart through warm fellowship, prayers of thanksgiving, and genuine pastoral affirmation (1–7).",
    "1. Paul warmly greeted Philemon, Apphia, Archippus, and the house church from his position as a prisoner of Christ Jesus to establish communal accountability (1–3).",
    "2. Paul thanked God for Philemon’s faith and love, affirming his proven record of refreshing the hearts of the saints as the foundation for his appeal (4–7).",
    "B. Paul interceded on behalf of converted Onesimus, appealing on the basis of love rather than apostolic compulsion (8–16).",
    "1. Paul chose to appeal on the basis of love rather than commanding what was required, speaking as an aged prisoner of Christ Jesus (8–9).",
    "2. Paul urged Philemon to receive his spiritual child Onesimus back no longer merely as an enslaved person, but as a beloved brother in the Lord (10–16).",
    "II. Paul sealed the reconciliation between master and slave by personally assuming Onesimus’s liabilities and anticipating a joyous reunion in Colossae (17–25).",
    "A. Paul guaranteed full financial restitution for any wrong committed by Onesimus and expressed absolute confidence in Philemon’s willing obedience (17–21).",
    "1. Paul personally pledged in his own handwriting to repay any debt or loss incurred by Onesimus, modeling sacrificial Christlike advocacy (17–20).",
    "2. Paul expressed confident expectation in Philemon’s willing obedience, anticipating that he would do even more than requested (21).",
    "B. Paul requested personal lodging in expectation of release through prayer and closed with warm greetings from his fellow workers (22–25).",
    "1. Paul instructed Philemon to prepare a guest room in hopeful expectation that he would soon be granted to them through their corporate prayers (22).",
    "2. Paul conveyed greetings from five fellow laborers and closed with a benediction anchoring the church in the grace of the Lord Jesus Christ (23–25)."
  ],
        argumentText: `The appeal of Paul’s Christlike leadership urged Philemon to receive his converted runaway slave Onesimus no longer as a slave, but as a beloved brother in Christ, securing gospel reconciliation through sacrificial love and personal accountability (Phlm 1–25).

I. Paul appealed for the restoration of Onesimus by preparing Philemon’s heart and urging him to welcome the converted runaway as a beloved brother in the Lord (1–16).
In the first major division of the epistle, Paul established the spiritual and interpersonal framework necessary to achieve true gospel reconciliation. Before placing his radical request before Philemon, Paul first cultivated mutual fellowship and affirmed Philemon’s established reputation for Christian love (vv. 1–7), which then served as the ethical basis to appeal for Onesimus’s reception not as property, but as a beloved brother in the Lord (vv. 8–16). This initial movement of loving petition strategically prepares for the second major division (vv. 17–25), where Paul transitions from theological persuasion to concrete financial restitution and personal accountability.

A. Paul prepared Philemon’s heart through warm fellowship, prayers of thanksgiving, and genuine pastoral affirmation (1–7).
In this preparatory section, Paul laid the foundation for his impending appeal by modeling humble servant leadership and celebrating Philemon’s active faith. By intentionally omitting his authoritative title of apostle and framing his letter within the loving accountability of the Colossian house church, Paul set a tone of mutual affection rather than ecclesiastical command. This opening affirmation directly connects to the subsequent section (vv. 8–16), where Paul specifically calls upon Philemon to demonstrate that same celebrated love toward his estranged runaway slave.

1. Paul warmly greeted Philemon, Apphia, Archippus, and the house church from his position as a prisoner of Christ Jesus to establish communal accountability (1–3).
In the opening salutation, Paul began not by asserting his apostolic rank, but by identifying himself humbly as “a prisoner of Christ Jesus” alongside his coworker Timothy (Phlm 1). By addressing Philemon as “our beloved brother and fellow worker,” Apphia as “our sister,” Archippus as “our fellow soldier,” and “the church in your house” (Phlm 1–2), Paul embedded a private master-slave dispute within the corporate life of the Christian community. Under Roman imperial law, Philemon held absolute legal authority (dominica potestas) over Onesimus, yet reading this letter before the gathered assembly enveloped Philemon’s legal sovereignty in the higher reality of divine “grace... and peace from God our Father and the Lord Jesus Christ” (Phlm 3). This warm greeting immediately anticipates the prayer of thanksgiving in verses 4–7, grounding all subsequent appeals in shared gospel fellowship.

2. Paul thanked God for Philemon’s faith and love, affirming his proven record of refreshing the hearts of the saints as the foundation for his appeal (4–7).
Building directly upon his greeting, Paul offered continuous prayers of thanksgiving because he regularly heard of Philemon’s “love and of the faith which you have toward the Lord Jesus and toward all the saints” (Phlm 4–5). Paul petitioned that the “fellowship of your faith may become effective through the knowledge of every good thing which is in you for the sake of Christ” (Phlm 6), underscoring that authentic Christian communion (koinōnia) demands practical, costly manifestation. Expressing great joy and comfort because “the hearts of the saints have been refreshed through you, brother” (Phlm 7), Paul utilized the visceral term splagchna (“deepest affections”). By commending Philemon as one whose lifestyle habitually refreshed vulnerable believers, Paul strategically positioned him to extend that same refreshing grace to Onesimus in verses 8–16.

B. Paul interceded on behalf of converted Onesimus, appealing on the basis of love rather than apostolic compulsion (8–16).
Transitioning from general praise to specific intercession, Paul bridged the immense social chasm between Roman slaveholder and runaway slave. Having affirmed Philemon’s character in verses 1–7, Paul now petitioned for Onesimus as his spiritual child and a transformed brother in Christ, refusing to compel obedience so that Philemon’s response would flow from genuine devotion. This central appeal serves as the theological core of the letter, creating the urgent necessity for the practical guarantees and restitution provided in the subsequent section (vv. 17–25).

1. Paul chose to appeal on the basis of love rather than commanding what was required, speaking as an aged prisoner of Christ Jesus (8–9).
Although Paul possessed full apostolic authority in Christ to “order” (epitassein) Philemon to execute what was proper under gospel ethics, he deliberately chose instead to appeal on the basis of love (dia tēn agapēn mallon parakalō, Phlm 8–9). Coerced obedience imposed by hierarchical decree would undermine the voluntary beauty of Christian virtue. Presenting himself not as a commanding superintendent but as “Paul, an old man (presbytēs), and now also a prisoner of Christ Jesus” (Phlm 9), Paul placed himself in intentional vulnerability. This appeal of love flows directly out of the thanksgiving of verses 4–7 and opens the door for Paul to name the vulnerable subject of his plea in verses 10–16.

2. Paul urged Philemon to receive his spiritual child Onesimus back no longer merely as an enslaved person, but as a beloved brother in the Lord (10–16).
Following his appeal of love, Paul unveiled his specific plea: “my child Onesimus, whom I have fathered in my imprisonment” (Phlm 10). Employing a deft wordplay on the name Onesimus (which signified “useful”), Paul acknowledged that while he was formerly “useless” (achrēstos) to Philemon as a fleeing slave, he had become “useful” (euchrēstos) to both of them through regeneration (Phlm 11). Although Paul yearned to retain Onesimus to minister to him in chains on Philemon’s behalf (Phlm 13), he resolved to do nothing without Philemon’s consent, so that his good deed “would not be, in effect, by compulsion, but of your own free will” (Phlm 14). Paul then reframed the painful departure within divine providence: perhaps Onesimus was parted for an hour so that Philemon might recover him forever, “no longer as a slave, but more than a slave, a beloved brother” (Phlm 15–16). This profound declaration dismantles the social hierarchy of slavery from within and leads directly into the covenantal pledges of verses 17–20.

II. Paul sealed the reconciliation between master and slave by personally assuming Onesimus’s liabilities and anticipating a joyous reunion in Colossae (17–25).
In the second major division of the epistle, Paul moved from theological persuasion to tangible action, securing the reconciliation advocated in verses 1–16. Recognizing that true reconciliation requires resolving real grievances, Paul personally assumed all debts incurred by Onesimus (vv. 17–21) and established personal accountability by requesting hospitality and conveying greetings from the apostolic circle (vv. 22–25). This division brings the entire argument to its triumphant conclusion, proving that gospel brotherhood is both economically practical and communally sustained.

A. Paul guaranteed full financial restitution for any wrong committed by Onesimus and expressed absolute confidence in Philemon’s willing obedience (17–21).
Within this section, Paul translated the spiritual brotherhood articulated in verses 10–16 into binding legal and economic reality. By executing a formal promissory pledge and expressing unreserved confidence in Philemon’s maturity, Paul removed every barrier to complete restoration. This practical pledge flows naturally from the appeal for brotherhood and establishes the moral foundation for the travel plans and closing benediction that follow in verses 22–25.

1. Paul personally pledged in his own handwriting to repay any debt or loss incurred by Onesimus, modeling sacrificial Christlike advocacy (17–20).
Paul grounded his intercession in shared spiritual fellowship: “If then you regard me as a partner, accept him as you would me” (Phlm 17). Linking the term partner (koinōnos) back to the koinōnia celebrated in verse 6, Paul demanded that Onesimus receive the identical honor accorded to the apostle himself. To eliminate any lingering financial grievance arising from theft or property loss, Paul executed a formal legal guarantee: “if he has wronged you in any way or owes you anything, charge that to my account; I, Paul, am writing this with my own hand, I will repay it” (Phlm 18–19a). By authoring this promissory note (cheirographon), Paul mirrored the vicarious mediation of Christ, absorbing another’s liability so that reconciliation could occur. Gently reminding Philemon that he owed Paul his very salvation (“you owe to me even your own self,” Phlm 19b), Paul pleaded, “Yes, brother, let me benefit from you in the Lord; refresh my heart in Christ” (Phlm 20). This costly pledge prepares for Paul’s declaration of confidence in verse 21.

2. Paul expressed confident expectation in Philemon’s willing obedience, anticipating that he would do even more than requested (21).
Building upon his written guarantee, Paul voiced unwavering pastoral confidence: “Having confidence in your obedience, I write to you, since I know that you will do even more than what I say” (Phlm 21). Rather than coercing compliance, Paul’s affirmation inspired Philemon to exceed the baseline request, pointing beyond mere pardon to full emancipation and releasing Onesimus for gospel ministry. This declaration of confidence resolves the tension of the financial pledge in verses 17–20 and seamlessly transitions to the practical visit request in verse 22.

B. Paul requested personal lodging in expectation of release through prayer and closed with warm greetings from his fellow workers (22–25).
In the concluding section of the epistle, Paul combined personal accountability with corporate encouragement. By announcing his planned arrival in Colossae and relaying greetings from his missionary associates, Paul reminded Philemon that his decision was witnessed by the broader church and supported by the grace of Christ. This closing section completes the epistle by providing the communal reinforcement needed to realize the appeal of verses 1–16.

1. Paul instructed Philemon to prepare a guest room in hopeful expectation that he would soon be granted to them through their corporate prayers (22).
Adding immediate personal accountability to his written appeal, Paul requested: “At the same time also prepare me a guest room, for I hope that through your prayers I will be gave back to you” (Phlm 22). In the ancient Mediterranean world, preparing a guest room (xenian) was a sacred obligation of hospitality. The anticipation of Paul’s imminent arrival ensured that Philemon’s reception of Onesimus would soon be evaluated in person, reinforcing the confidence expressed in verse 21. This personal request directly introduces the closing circle of coworkers in verses 23–25.

2. Paul conveyed greetings from five fellow laborers and closed with a benediction anchoring the church in the grace of the Lord Jesus Christ (23–25).
In the final verses, Paul conveyed greetings from Epaphras, his “fellow prisoner in Christ Jesus” (Phlm 23), along with four fellow workers: Mark, Aristarchus, Demas, and Luke (Phlm 24). The inclusion of Mark—who had once deserted the missionary work (Acts 13:13; 15:37–39) but was restored to usefulness (2 Tim 4:11)—stood as a living testament to restorative leadership alongside Onesimus. Paul concluded with a corporate benediction: “The grace of the Lord Jesus Christ be with your spirit” (Phlm 25). By utilizing the plural pronoun “your spirit” (hymōn), Paul formed an inclusio with the opening greeting in verse 3, enveloping the entire letter and Philemon’s impending decision in the sovereign grace of Christ.`
      };
      setActiveArg('philemon');
      setArgumentsState({
        ...argumentsState,
        philemon: sample
      });
    }
  };

  const loadMarkSample = () => {
    if (window.confirm("Load your exact Mark argument (2).docx Hierarchical Book Chart & Portfolio Sample? This will overwrite your Mark 4 & 5 tab inputs.")) {
      const sample = {
        bookChartTheme: "The authority and power of Jesus Christ",
        bookNameLabel: "Mark",
        actorRowLabel: "Involved party",
        gradeRowLabel: "Faith",
        introductoryMaterial: `Author\nJohn Mark is the author of this gospel.\n\nDate of writing\nThe date of writing was approximately AD 57-59.\n\nHistorical Setting\nThe Jews and Christians in Rome were not getting along well with each other, resulting in much hostility and unrest. The first generation of believers was dying out, and as a result, their teachings and testimonies were disappearing as they relied on verbal transmission.\n\nPlace of Writing\nThe Gospel of Mark was written in Rome.\n\nRecipients\nThe main recipients were the non-Jewish believers in Rome.\n\nOccasion and Purpose\nMark’s purpose was to encourage and guide the believers in living out their faith despite persecution. They were familiar with the gospel but needed help in understanding it; therefore, Mark provided a different perspective.\n\nTheme\nThe total authority and power of Jesus Christ is revealed to believers, reminding them not to give in to fear but to have faith in Him.`,
        bookChart: [
          {
            id: 'm1',
            segment: '4:35-41',
            title: '',
            groupHeader: 'Jesus’ authority over the physical and spiritual world',
            subGroupHeader: 'Jesus calms the wind and sea',
            actor: 'Jews',
            grade: 'No faith',
            relations: 'Physical world: Raging sea and wind obey His command; disciples respond in fear.'
          },
          {
            id: 'm2',
            segment: '5:1-13',
            title: 'Recognition',
            groupHeader: 'Jesus’ authority over the physical and spiritual world',
            subGroupHeader: 'Jesus commands the demons',
            actor: 'Demons',
            grade: 'Submissive',
            relations: 'Spiritual world: 2,000 demons recognize Jesus and beg permission to enter pigs.'
          },
          {
            id: 'm3',
            segment: '5:14-20',
            title: 'Gentiles’ response',
            groupHeader: 'Jesus’ authority over the physical and spiritual world',
            subGroupHeader: 'Jesus commands the demons',
            actor: 'Gentiles',
            grade: 'Mixed faith',
            relations: 'Townspeople beg Jesus to leave in fear; healed man wants to follow & proclaims in Decapolis.'
          },
          {
            id: 'm4',
            segment: '5:21-24',
            title: 'Desperate father',
            groupHeader: 'Jesus’ authority over disease and death',
            subGroupHeader: 'Jesus brings healing',
            actor: 'Jewish leader',
            grade: 'Half faith',
            relations: 'Synagogue official Jairus falls at Jesus\' feet begging Him to heal his dying daughter.'
          },
          {
            id: 'm5',
            segment: '5:25-34',
            title: 'Desperate woman',
            groupHeader: 'Jesus’ authority over disease and death',
            subGroupHeader: 'Jesus brings healing',
            actor: 'Jewish outcast',
            grade: 'Full Faith',
            relations: 'Woman ill 12 years touches Jesus\' cloak in faith and is commended & cured.'
          },
          {
            id: 'm6',
            segment: '5:35-43',
            title: '',
            groupHeader: 'Jesus’ authority over disease and death',
            subGroupHeader: 'Jesus raises the dead',
            actor: 'Jewish family',
            grade: 'Full Faith',
            relations: 'Jesus tells Jairus not to fear but believe, raising his 12-year-old daughter from death.'
          }
        ],
        gridChart: {
          headers: ['Comparative Aspect', 'I. Physical & Spiritual World (4:35–5:20)', 'II. Disease & Death (5:21–43)'],
          rows: [
            { id: 'mg1', label: 'Involved party', cells: ['Jews (4:35-41), Demons (5:1-13), Gentiles (5:14-20)', 'Jewish leader (5:21-24), Jewish outcast (5:25-34), Jewish family (5:35-43)'] },
            { id: 'mg2', label: 'Faith', cells: ['No faith -> Submissive -> Mixed faith', 'Half faith -> Full Faith -> Full Faith'] }
          ]
        },
        simpleOutline: `The authority and power of Jesus Christ (Mark 4:35-5:43)\nI. Jesus’ authority over the physical and spiritual world (4:35-5:20)\n   A. Jesus calms the sea and wind. (4:35-41)\n   B. Jesus commands the demons. (5:1-20)\n      1. Recognition. (5:1-13)\n      2. Gentiles’ response. (5:14-20)\nII. Jesus’ authority over disease and death. (5:21-43)\n   A. Jesus brings healing. (5:21-34)\n      1. Desperate father. (5:21-24)\n      2. Desperate woman. (5:25-34)\n   B. Jesus raises the dead. (5:35-43)`,
        sentenceOutline: [
          "The total authority and power of Jesus Christ is revealed to believers, reminding them not to give in to fear but to have faith in Him. (Mark 4:35-5:43)",
          "I. Jesus displayed His total power and authority over the forces in the physical and spiritual world. (4:35-5:20)",
          "A. Jesus displayed His total power and authority over the physical world when the raging sea and wind obeyed His commands to be calm. (4:35-41)",
          "B. Jesus displayed His total power and authority over the spiritual world when all two thousand demons obeyed His command to leave the man and sought permission from Jesus to enter the pigs. (5:1-20)",
          "1. The demons recognise the total power and authority of Jesus over them. (5:1-13)",
          "2. The Gentiles feared Jesus and wanted Him to leave, but the demon-possessed man wanted to follow Jesus. (5:14-20)",
          "II. Jesus displayed His total power and authority over disease and death. (5:21-43)",
          "A. Jesus displayed His total power and authority over disease when a desperate father and woman sought Him for healing. (5:21-34)",
          "1. Jairus, a desperate father, seeks Jesus to save his daughter even though Jairus was a synagogue official. (5:21-24)",
          "2. A woman who was ill for twelve years was cured by Jesus because of her faith in Him. (5:25-34)",
          "B. Jesus displayed His total power and authority over death when Jesus raised Jairus’ daughter from the dead, and she was able to function normally and healthily. (5:35-43)"
        ],
        argumentText: `The total authority and power of Jesus Christ is revealed to believers, reminding them not to give in to fear but to have faith in Him.\n\nI. Jesus displayed His total power and authority over the forces in the physical and spiritual world. (4:35-5:20)\nIn these verses, Jesus displayed His total power and authority over creation, both physical and spiritual. These displays show that Jesus is God, the creator of the universe.\n\nA. Jesus displayed His total power and authority over the physical world when the raging sea and wind obeyed His commands to be calm. (4:35-41)\nThe same day Jesus began teaching in parables, He led His disciples across the Sea of Galilee (4:35-36). Here, Jesus displayed His total authority and power over the physical world by commanding nature (4:39). However, His disciples not only failed to recognise who Jesus was but also responded in fear to the storm and to Jesus, instead of having faith in Him (4:38, 40-41).\n\nB. Jesus displayed His total power and authority over the spiritual world when all two thousand demons obeyed His command to leave the man and sought permission from Jesus to enter the pigs. (5:1-20)\nIn these verses, Jesus displays His total power and authority over the demons, reinforcing His identity as God, creator of the universe.\n1. The demons recognise the total power and authority of Jesus over them. (5:1-13)\nBy crossing the sea, Jesus and His disciples reached the region of the Gerasenes, where the Gentiles dwell (5:1). They encountered a demon-possessed man, who had multiple demons in him, and no one in the region could subdue him (5:3-5, 9). Here, Jesus’ total authority and power over the spiritual world were displayed when the demons had to obey His commands and seek Jesus’ permission to enter the pigs to destroy them (5:8-14). Even the demons recognised who Jesus was and knew they had to submit to Him (5:7).\n2. The Gentiles feared Jesus and wanted Him to leave, but the demon-possessed man wanted to follow Jesus. (5:14-20)\nThis led to two different responses by the people in the region. After witnessing the man freed from his demon possession and hearing the accounts about the pigs, the people begged Jesus to leave their region (5:15-17). However, the man wanted to follow Jesus, but instead was redirected to return home and share what Jesus had done for him (5:18-19). This resulted in many people in Decapolis being amazed by Jesus (5:20).\n\nII. Jesus displayed His total power and authority over disease and death. (5:21-43)\nIn these verses, Jesus displayed total power and authority over disease and death, two causes of suffering that man could not overcome. This shows that Jesus is not only God the Creator, but He has come to bring salvation to man.\n\nA. Jesus displayed His total power and authority over disease when a disease-stricken woman was healed completely because of her faith in Jesus. (5:21-34)\n1. Jairus, a desperate father, seeks Jesus to save his daughter even though Jairus was a synagogue official. (5:21-24)\nAfter being asked to leave the region of the Gerasenes, Jesus and His disciples crossed back across the sea (5:21). Here, a synagogue official, Jairus, who believed that Jesus could save his daughter from death, came to beg Him for help (5:22-23). Jesus obliged, and a large number of people followed and crowded around Him (5:24).\n2. A woman who was ill for twelve years was cured by Jesus because of her faith in Him. (5:25-34)\nOn the way to Jairus’ house, Jesus’ authority and power over any illnesses or diseases were displayed. A woman who was ill for twelve years was instantly healed when she touched Jesus’ cloak, as she believed that He had the power to do so (5:25-29). Jesus commended her faith in Him and confirmed her complete healing from the disease (5:34).\n\nB. Jesus displayed His total power and authority over death when Jesus raised Jairus’ daughter from the dead, and she was able to function normally and healthily. (5:35-43)\nAfter healing the woman, news came to Jairus that his daughter had passed away (5:35). Jesus overheard and told Jairus not to give in to fear but to have faith in Him (5:36). Here, Jesus demonstrated His total authority and power over death by raising Jairus’ twelve-year-old daughter from the dead (5:37-42). This astonished all who were present, but Jesus gave strict instructions to not make known to others about this miracle (5:42-43).`
      };
      setActiveArg('mark');
      setArgumentsState({
        ...argumentsState,
        mark: sample
      });
    }
  };

  const load2TimothySample = () => {
    if (window.confirm("Load the complete 2 Timothy Sample Portfolio? This will overwrite your current inputs for the active tab.")) {
      const sample = {
        bookChartTheme: "Charge Timothy to endure suffering and be faithful to God’s word",
        bookNameLabel: "2 Tim",
        actorRowLabel: "Involved party",
        gradeRowLabel: "Response",
        introductoryMaterial: `Introduction\nPaul was imprisoned in a dungeon at Rome. He was closing to his death when he wrote this second epistle to Timothy (4:6).\n\nAuthor\nPaul is the author of this epistle (1:1).\n\nDate of Writing\nThe date of writing was approximately 67 AD.\n\nHistorical Setting\nUnder the reign of the cruel and unbalanced Nero, the Roman emperor (54-68 AD), Christianity became an illicit religion. Paul was arrested by his enemies using their Roman official position and was put into a Roman cell.\n\nPlace of Writing\nPaul was a prisoner in a cold Roman cell, regarded as a criminal (2:9).\n\nRecipients\nThe recipient of this personal epistle was Timothy (1:2).\n\nOccasion and Purpose\nThe purpose of this epistle was as an encouragement to Timothy’s ministry at Ephesus, asking him to stay faithful in hard times.\n\nGenre(s)\nIt is a Pauline epistle adopting the Greco-Roman letter format.\n\nTheme\nThe purpose of this epistle is to charge Timothy to follow Paul, continue to endure suffering, and be faithful to God’s word in hard times.`,
        bookChart: [
          { id: '1', segment: '1:1-2', title: 'Greeting', grade: 'Grace & Peace', actor: 'Paul to Timothy', groupHeader: 'Salutation & Thanksgiving', subGroupHeader: 'Salutation', relations: 'Greco-Roman epistle greeting.' },
          { id: '2', segment: '1:3-7', title: 'Inherited Faith', grade: 'Gratitude', actor: 'Timothy\'s Family', groupHeader: 'Salutation & Thanksgiving', subGroupHeader: 'Thanksgiving', relations: 'Praising Timothy\'s faith and family inheritance.' },
          { id: '3', segment: '1:8-14', title: 'Suffer Unashamedly', grade: 'Boldness', actor: 'Paul & Timothy', groupHeader: 'Faithful in Suffering (1:8–2:13)', subGroupHeader: 'Charge & Examples', relations: 'Repetition of suffer and unashamed.' },
          { id: '4', segment: '1:15-18', title: 'Onesiphorus', grade: 'Faithful', actor: 'Onesiphorus', groupHeader: 'Faithful in Suffering (1:8–2:13)', subGroupHeader: 'Charge & Examples', relations: 'Contrast with Asian turncoats.' },
          { id: '5', segment: '2:1-7', title: 'Soldier, Athlete, Farmer', grade: 'Endurance', actor: 'Timothy', groupHeader: 'Faithful in Suffering (1:8–2:13)', subGroupHeader: 'Images & Promise', relations: 'Analogy of endurance and hard work.' },
          { id: '6', segment: '2:8-13', title: 'Reigning with Christ', grade: 'Faithful', actor: 'Risen Christ', groupHeader: 'Faithful in Suffering (1:8–2:13)', subGroupHeader: 'Images & Promise', relations: 'Contrast of denial and faithfulness.' }
        ],
        gridChart: {
          headers: ['Comparative Aspect', 'Paul\'s Situation', 'Timothy\'s Charge'],
          rows: [
            { id: '1', label: 'Setting', cells: ['Cold Roman cell, chained as a criminal (2:9)', 'Ephesus ministry leadership (1:18)'] },
            { id: '2', label: 'Endurance', cells: ['Facing execution, poured out as drink offering (4:6)', 'Preach the word, be sober, endure hardship (4:2, 5)'] }
          ]
        },
        simpleOutline: `I. Salutation (1:1-2)\nII. Thanksgiving (1:3-7)\nIII. Faithful in Suffering (1:8-2:13)\n   A. Charge (1:8-14)\n   B. Examples & Images (1:15-2:7)\n   C. Promise (2:8-13)\nIV. Faithful to Truth (2:14-4:8)\n   A. Godliness (2:14-26)\n   B. Right Doctrine (3:1-17)\n   C. Preach the Word (4:1-8)\nV. Concluding Remarks & Greetings (4:9-22)`,
        sentenceOutline: [
          "The salutation of this epistle is a greeting from Paul to his beloved son Timothy (1:1-2).",
          "The thanksgiving of this epistle is giving thanks for Timothy’s faith inherited from his grandmother and mother (1:3-7).",
          "The charge that Paul asked Timothy for is to join with him in suffering for the gospel according to the power of God without being ashamed (1:8-14).",
          "The purpose of using images of a soldier, an athlete, and a farmer is to charge Timothy to be strong, faithful, and suffer with Paul (2:1-7).",
          "The promise that Paul reminded Timothy is Christ has risen and we will reign with Him if we endure because He is faithful (2:8-13).",
          "The charge from Paul to Timothy is to pursue godliness to honor the Lord and charge the ungodly who go astray (2:14-19)."
        ],
        argumentText: `Introduction: Paul wrote this epistle when he was imprisoned in a Roman cell. He realized that he was approaching to his death (4:6), so this epistle could be his final reminder to Timothy his spiritual son, encouraging him to endure in hard times, and charging to stay faithful in the ministry of God’s word. He, for multiple times, asked Timothy to go to him soon (4:9, 21).\n\nThe salutation of this epistle is a greeting from Paul to his beloved son Timothy (1:1-2). The epistle follows the Greco-Roman epistle format by starting with salutation. It clearly shows that the author is Paul (1:1), and the addressee is Timothy, followed by Paul’s greeting with “Grace, mercy and peace from God the Father and Christ Jesus our Lord.” (1:2)\n\nThe thanksgiving of this epistle is giving thanks for Timothy’s faith inherited from his grandmother and mother (1:3-7). Paul then gave thanks to God about Timothy for how he had inherited his faith from his grandmother and mother (1:5). When he gave thanks, he said he always remembered Timothy in his prayers night and day (1:3), and was longing to see him. He rejoiced when he recalled Timothy’s tears (1:4). Thus, he reminded Timothy to kindle the gift of God (1:6), since God had given them a spirit of power, love and discipline (1:7).\n\nThe charge that Paul asked Timothy for is to join with him in suffering unashamedly, faithfully, and depending on Christ (1:8-2:13). Paul then charged Timothy that not to be ashamed, but to join with him in suffering for the gospel according to the power of God (1:8). God has saved them not because of works but mere grace in Christ Jesus (1:9-10). Paul was appointed to be a preacher, an apostle and a teacher (1:11). Hence, Paul suffered without being ashamed, for he knew whom he had believed and Jesus would guard what he had entrusted to Him (1:12). Paul, therefore, asked Timothy to guard the standard of sound words that he had heard from Paul (1:13), and guard through the Holy Spirit who dwelled in them (1:14).`
      };
      setArgumentsState({
        ...argumentsState,
        [activeArg]: sample
      });
    }
  };

  const loadLuke15Sample = () => {
    if (window.confirm("Load Dr. Keith Shubert's Luke 15 Book Chart & Sentence Outline (from Bite Argument JL.pptx & C Luke 15.pptx)? This will load into your Custom Study tab.")) {
      const sample = {
        bookChartTheme: "GOD LOVES LOST PEOPLE",
        bookNameLabel: "Luke 15",
        actorRowLabel: "Involved party",
        gradeRowLabel: "Ratio Lost",
        introductoryMaterial: `Context & Setting (from Bite Argument JL.pptx & C Luke 15.pptx)\nThe tax collectors and sinners were drawing near to hear Jesus, while the Pharisees and scribes grumbled, saying, "This man receives sinners and eats with them" (Luke 15:1–2). In response, Jesus told three parables to reveal the Father's heart for the lost and to expose the Pharisees' self-righteous resentment.\n\nBig Idea (Subject + Complement)\nThe reason for Jesus' parables in Luke 15 is to show that God loves lost people and rejoices over their repentance, whereas the Pharisees do not.`,
        bookChart: [
          {
            id: 'l1',
            segment: '15:1-2',
            title: 'Setting: Sinners vs. Pharisees',
            groupHeader: 'Historical Setting',
            subGroupHeader: 'Pharisees Grumble',
            actor: 'Jesus, Sinners & Pharisees',
            grade: 'Conflict',
            relations: 'Tax collectors/sinners draw near; Pharisees/scribes grumble that Jesus welcomes sinners.'
          },
          {
            id: 'l2',
            segment: '15:3-7',
            title: 'Lost Sheep',
            groupHeader: 'Three Parables of God Seeking the Lost',
            subGroupHeader: 'Lost Sheep & Lost Coin',
            actor: 'Shepherd (1 of 100)',
            grade: '1 : 100',
            relations: 'Repetition & Progression: 1 of 100 lost -> sought -> found -> rejoicing in heaven.'
          },
          {
            id: 'l3',
            segment: '15:8-10',
            title: 'Lost Coin',
            groupHeader: 'Three Parables of God Seeking the Lost',
            subGroupHeader: 'Lost Sheep & Lost Coin',
            actor: 'Woman (1 of 10)',
            grade: '1 : 10',
            relations: 'Repetition & Progression: 1 of 10 lost -> sought -> found -> joy before angels of God.'
          },
          {
            id: 'l4',
            segment: '15:11-24',
            title: 'Lost Younger Son',
            groupHeader: 'Three Parables of God Seeking the Lost',
            subGroupHeader: 'Two Lost Sons',
            actor: 'Father & Prodigal Son',
            grade: '1 : 2 (Repentant)',
            relations: 'Compassion of Father: runs, embraces, clothes, and celebrates the son who was dead and is alive.'
          },
          {
            id: 'l5',
            segment: '15:25-32',
            title: 'Lost Older Son',
            groupHeader: 'Three Parables of God Seeking the Lost',
            subGroupHeader: 'Two Lost Sons',
            actor: 'Father & Older Brother',
            grade: '1 : 2 (Resentful)',
            relations: 'Climax / Contrast: Older brother (picturing the Pharisees) is angry and refuses to celebrate.'
          }
        ],
        gridChart: {
          headers: ['Comparative Aspect', 'Sheep (15:3–7) & Coin (15:8–10)', 'Two Sons (15:11–32)'],
          rows: [
            { id: 'lg1', label: 'Ratio Lost', cells: ['1 : 100 (Sheep) -> 1 : 10 (Coin)', '1 : 2 (Younger Son & Older Son)'] },
            { id: 'lg2', label: 'Response to Recovery', cells: ['Shepherd & Woman rejoice with friends/angels', 'Father celebrates joyfully; Older brother is angry & refuses to enter'] }
          ]
        },
        simpleOutline: `GOD LOVES LOST PEOPLE (Luke 15:1–32)\nI. Setting (15:1–2)\n   A. Sinners (15:1)\n   B. Pharisees (15:2)\nII. Parables (15:3–32)\n   A. Lost Sheep (15:3–7)\n   B. Lost Coin (15:8–10)\n   C. Lost Sons (15:11–32)`,
        sentenceOutline: [
          "The reason for Luke 15 is to show that God loves lost people and rejoices over their restoration, whereas the self-righteous Pharisees do not. (Luke 15:1–32)",
          "I. The reason for the setting in 15:1–2 is to show the contrast between the sinners and the Pharisees.",
          "A. The reason for Luke's comment about the sinners in 15:1 is to show their openness and interest in Jesus.",
          "B. The reason for Luke's comment about the Pharisees in 15:2 is to show their critical attitude toward Jesus and the sinners.",
          "II. The reason for the parables in 15:3–32 is to show that God loves lost people and the Pharisees do not.",
          "A. The reason for the parable of the lost sheep in 15:3–7 is to show that God's love for lost people is like a shepherd's concern for a lost sheep.",
          "B. The reason for the parable of the lost coin in 15:8–10 is to show that God's love for lost people is like a woman's concern for a lost coin.",
          "C. The reason for the parable of the lost sons in 15:11–32 is to show that God's love for lost people is like a father's love for his lost sons, in contrast to the older brother's resentment."
        ],
        argumentText: `The reason for Luke 15 is to show that God loves lost people and rejoices over their restoration, whereas the self-righteous Pharisees do not.\n\nI. The reason for the setting in 15:1–2 is to show the contrast between the sinners and the Pharisees. (15:1–2)\nLuke opens the chapter by contrasting two audiences around Jesus. In 15:1, all the tax collectors and sinners were drawing near to listen to Jesus, showing their spiritual hunger and openness. In 15:2, however, the Pharisees and scribes grumbled against Jesus, criticizing Him for welcoming sinners and eating with them.\n\nII. The reason for the parables in 15:3–32 is to show that God loves lost people and the Pharisees do not. (15:3–32)\nIn response to the Pharisees' grumbling, Jesus tells three connected parables in which the ratio of what is lost intensifies from 1 out of 100 (the sheep, 15:3–7), to 1 out of 10 (the coin, 15:8–10), to 1 out of 2 (the sons, 15:11–32). In the first two parables, both the shepherd and the woman search diligently until they find what was lost and call their friends and neighbors to rejoice — picturing the joy in heaven over one sinner who repents (15:7, 10). In the climactic third parable (15:11–32), the father welcomes back his repentant younger son with lavish compassion (15:20–24), while the older brother becomes angry and refuses to join the feast (15:25–30), mirroring the exact hard-heartedness of the Pharisees (and of Jonah in Jonah 4!).`
      };
      setActiveArg('custom');
      setArgumentsState({
        ...argumentsState,
        custom: sample
      });
    }
  };


  const getArgDetails = () => {
    switch (activeArg) {
      case 'mark':
        return {
          title: "Mark 4 & 5 Argument",
          taskId: "C11",
          maxPoints: 400,
          defaultTheme: "The authority and power of Jesus Christ",
          defaultBookLabel: "Mark",
          defaultActorLabel: "Involved party",
          defaultGradeLabel: "Faith"
        };
      case 'jonah':
        return {
          title: "Jonah Argument",
          taskId: "C14",
          maxPoints: 500,
          defaultTheme: "The sovereign compassion of Yahweh over all peoples",
          defaultBookLabel: "Jonah",
          defaultActorLabel: "Involved party",
          defaultGradeLabel: "Response"
        };
      case 'philemon':
        return {
          title: "Philemon Argument",
          taskId: "C15",
          maxPoints: 400,
          defaultTheme: "Christlike leadership appealing for gospel reconciliation between master and slave",
          defaultBookLabel: "Topics / Philemon",
          defaultActorLabel: "Involved party",
          defaultGradeLabel: "Leadership principle"
        };
      case 'custom':
        return {
          title: "Custom Study (e.g. Nehemiah)",
          taskId: "CUSTOM",
          maxPoints: 600,
          defaultTheme: "Rebuilding the walls and renewing the covenant",
          defaultBookLabel: "Book",
          defaultActorLabel: "Involved party",
          defaultGradeLabel: "Response"
        };
    }
  };

  const details = getArgDetails();

  const handleFieldChange = (
    field: 'introductoryMaterial' | 'simpleOutline' | 'argumentText' | 'bookChartTheme' | 'bookNameLabel' | 'actorRowLabel' | 'gradeRowLabel',
    value: string
  ) => {
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        [field]: value
      }
    });
  };

  // 1. Book Chart Actions
  const addBookChartRow = () => {
    if (!newSegment) {
      alert("Please fill in the Segment Reference (e.g. 1:1–3).");
      return;
    }
    const newRow: BookChartRow = {
      id: Math.random().toString(36).substr(2, 9),
      segment: newSegment,
      title: newSegmentTitle,
      relations: newSegmentRelations,
      grade: newSegmentGrade || '',
      actor: newSegmentActor || '',
      groupHeader: newSegmentGroup || '',
      subGroupHeader: newSegmentSubGroup || ''
    };
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        bookChart: [...currentArg.bookChart, newRow]
      }
    });
    setNewSegment('');
    setNewSegmentTitle('');
    setNewSegmentRelations('');
    setNewSegmentGrade('');
    setNewSegmentActor('');
    setNewSegmentGroup('');
    setNewSegmentSubGroup('');
  };

  const updateBookChartRow = (id: string, field: keyof BookChartRow, value: string) => {
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        bookChart: currentArg.bookChart.map(r => r.id === id ? { ...r, [field]: value } : r)
      }
    });
  };

  const deleteBookChartRow = (id: string) => {
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        bookChart: currentArg.bookChart.filter(r => r.id !== id)
      }
    });
  };

  // Group consecutive bookChart rows that share a non-empty field (for Roman I/II and Capital A/B spans)
  const computeSpans = (rows: BookChartRow[], field: 'groupHeader' | 'subGroupHeader') => {
    const spans: { header: string; count: number; startIndex: number }[] = [];
    rows.forEach((r, idx) => {
      const h = (r[field] || '').trim();
      if (spans.length > 0 && spans[spans.length - 1].header === h && h !== '') {
        spans[spans.length - 1].count += 1;
      } else {
        spans.push({ header: h, count: 1, startIndex: idx });
      }
    });
    return spans;
  };

  // 2. Grid Chart Actions
  const handleGridCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedRows = currentArg.gridChart.rows.map((row, rIdx) => {
      if (rIdx === rowIndex) {
        const updatedCells = [...row.cells];
        updatedCells[colIndex] = value;
        return { ...row, cells: updatedCells };
      }
      return row;
    });
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        gridChart: {
          ...currentArg.gridChart,
          rows: updatedRows
        }
      }
    });
  };

  const handleGridRowLabelChange = (rowIndex: number, value: string) => {
    const updatedRows = currentArg.gridChart.rows.map((row, rIdx) => {
      if (rIdx === rowIndex) {
        return { ...row, label: value };
      }
      return row;
    });
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        gridChart: {
          ...currentArg.gridChart,
          rows: updatedRows
        }
      }
    });
  };

  const handleGridHeaderChange = (colIndex: number, value: string) => {
    const updatedHeaders = [...currentArg.gridChart.headers];
    updatedHeaders[colIndex] = value;
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        gridChart: {
          ...currentArg.gridChart,
          headers: updatedHeaders
        }
      }
    });
  };

  const addGridRow = () => {
    const newRow = {
      id: Math.random().toString(36).substr(2, 9),
      label: 'New Aspect',
      cells: Array(currentArg.gridChart.headers.length - 1).fill('')
    };
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        gridChart: {
          ...currentArg.gridChart,
          rows: [...currentArg.gridChart.rows, newRow]
        }
      }
    });
  };

  const deleteGridRow = (id: string) => {
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        gridChart: {
          ...currentArg.gridChart,
          rows: currentArg.gridChart.rows.filter(r => r.id !== id)
        }
      }
    });
  };

  // 3. Sentence Outline Actions
  const addSentence = () => {
    const trimmed = newSentenceText.trim();
    if (!trimmed) return;
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        sentenceOutline: [...currentArg.sentenceOutline, trimmed]
      }
    });
    setNewSentenceText('');
  };

  const deleteSentence = (index: number) => {
    setArgumentsState({
      ...argumentsState,
      [activeArg]: {
        ...currentArg,
        sentenceOutline: currentArg.sentenceOutline.filter((_, idx) => idx !== index)
      }
    });
  };

  const validateSentence = (text: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const trimmed = text.trim();
    if (!trimmed) {
      errors.push("Sentence cannot be empty.");
      return { isValid: false, errors };
    }
    const firstChar = trimmed.charAt(0);
    if (firstChar !== firstChar.toUpperCase() || !/[A-Z]/.test(firstChar)) {
      errors.push("Must start with a capital letter.");
    }
    if (!/[.!?)]$/.test(trimmed)) {
      errors.push("Must end with sentence-ending punctuation (e.g. '.' or reference '(1:1-3)').");
    }
    const wordCount = trimmed.split(/\s+/).length;
    if (wordCount < 5) {
      errors.push("Should represent a complete thought (minimum 5 words).");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // 4. Score Estimator calculations (based on 600 points standard)
  const getRubricScores = () => {
    const introLen = currentArg.introductoryMaterial.trim().length;
    const introScore = introLen > 150 ? 48 : Math.min(48, Math.round((introLen / 150) * 48));

    const chartRowCount = currentArg.bookChart.length;
    const chartScore = Math.min(120, chartRowCount * 20);

    const filledGridCells = currentArg.gridChart.rows.reduce((count, r) => {
      const filled = r.cells.filter(c => c.trim().length > 0).length;
      return count + (filled > 0 ? 1 : 0);
    }, 0);
    const gridScore = Math.min(24, filledGridCells * 12);

    const simpleOutlineLen = currentArg.simpleOutline.trim().length;
    const simpleScore = simpleOutlineLen > 80 ? 24 : Math.min(24, Math.round((simpleOutlineLen / 80) * 24));

    const validSentencesCount = currentArg.sentenceOutline.filter(s => validateSentence(s).isValid).length;
    const sentenceScore = Math.min(180, validSentencesCount * 30);

    const argWordCount = currentArg.argumentText.trim() ? currentArg.argumentText.trim().split(/\s+/).length : 0;
    const argScore = argWordCount > 300 ? 204 : Math.min(204, Math.round((argWordCount / 300) * 204));

    const totalRubricScore = introScore + chartScore + gridScore + simpleScore + sentenceScore + argScore;
    const finalScaledScore = Math.round((totalRubricScore / 600) * details.maxPoints);

    return {
      intro: introScore,
      bookChart: chartScore,
      grid: gridScore,
      simple: simpleScore,
      sentence: sentenceScore,
      argument: argScore,
      totalRaw: totalRubricScore,
      scaled: finalScaledScore
    };
  };

  const scores = getRubricScores();

  const exportFormattedArgument = () => {
    let output = `BS510 Inductive Bible Study Method\nAssignment Portfolio: ${details.title}\n`;
    output += `Syllabus Task ID: ${details.taskId} | Rubric Score Estimate: ${scores.scaled} / ${details.maxPoints} pts\n\n`;

    output += `==============================================\n`;
    output += `1. INTRODUCTORY MATERIAL (8% / 48 points)\n`;
    output += `==============================================\n`;
    output += `${currentArg.introductoryMaterial || 'No draft logged.'}\n\n`;

    output += `==============================================\n`;
    output += `2. BOOK CHART & GRID CHART (24% / 144 points)\n`;
    output += `==============================================\n`;
    output += `Overarching Theme (Red): ${currentArg.bookChartTheme || details.defaultTheme}\n\n`;
    if (currentArg.bookChart.length === 0) {
      output += `No book chart segments logged.\n`;
    } else {
      currentArg.bookChart.forEach((row, idx) => {
        output += `Segment ${idx + 1} (${currentArg.bookNameLabel || details.defaultBookLabel} ${row.segment}):\n`;
        output += `- Major Division (Orange): ${row.groupHeader || 'N/A'}\n`;
        output += `- Section Heading (Blue): ${row.subGroupHeader || 'N/A'}\n`;
        output += `- Paragraph Sub-Point (Green): ${row.title || 'N/A'}\n`;
        output += `- ${currentArg.actorRowLabel || details.defaultActorLabel}: ${row.actor || 'N/A'}\n`;
        output += `- ${currentArg.gradeRowLabel || details.defaultGradeLabel}: ${row.grade || 'N/A'}\n`;
        output += `- Structural Notes: ${row.relations || 'None'}\n\n`;
      });
    }

    output += `==============================================\n`;
    output += `3. SIMPLE OUTLINE (4% / 24 points)\n`;
    output += `==============================================\n`;
    output += `${currentArg.simpleOutline || 'No outline logged.'}\n\n`;

    output += `==============================================\n`;
    output += `4. SENTENCE OUTLINE (30% / 180 points)\n`;
    output += `==============================================\n`;
    if (currentArg.sentenceOutline.length === 0) {
      output += `No sentence outline logged.\n`;
    } else {
      currentArg.sentenceOutline.forEach((s) => {
        output += `${s}\n`;
      });
      output += `\n`;
    }

    output += `==============================================\n`;
    output += `5. THE ARGUMENT (34% / 204 points)\n`;
    output += `==============================================\n`;
    output += `${currentArg.argumentText || 'No argument text logged.'}\n\n`;

    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BS510_Argument_${activeArg}_Portfolio.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render the current hierarchical Book Chart onto an HTML5 Canvas matching Mark argument (2).docx (1917x991)
  const renderBookChartToCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const W = 1917;
    const H = 991;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    const rows = currentArg.bookChart;
    const numCols = Math.max(rows.length, 1);
    const stubX = 18;
    const chartLeft = 205;
    const chartRight = 1890;
    const chartW = chartRight - chartLeft;
    const colW = chartW / numCols;

    const topFinialY = 26;
    const tier0Y = 45;
    const tier1Y = 120;
    const tier2Y = 250;
    const tier3Y = 395;
    const gridTop = 600;
    const row1H = 75;
    const row2H = 120;
    const row3H = 135;

    const drawWrappedText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
      font: string,
      color: string
    ) => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textBaseline = 'top';
      const paragraphs = (text || '').split('\n');
      let currY = y;
      for (const para of paragraphs) {
        const words = para.split(/\s+/);
        let line = '';
        for (let n = 0; n < words.length; n++) {
          const testLine = line ? `${line} ${words[n]}` : words[n];
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line, x, currY);
            line = words[n];
            currY += lineHeight;
          } else {
            line = testLine;
          }
        }
        if (line) {
          ctx.fillText(line, x, currY);
          currY += lineHeight;
        }
      }
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number, lineWidth = 3.5) => {
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const stripPrefix = (s: string) =>
      (s || '').replace(/^(Theme:\s*|[IVX]+\.\s*|[A-Z]\.\s*|\d+\.\s*)/i, '').trim();

    // 1. Tier 0: Red Theme
    drawWrappedText(
      stripPrefix(currentArg.bookChartTheme || details.defaultTheme),
      chartLeft + 20,
      tier0Y + 8,
      chartW - 40,
      34,
      '32px "Times New Roman", Times, serif',
      '#fa2e2e'
    );

    // 2. Tier 1: Orange Major Divisions
    const gSpans = computeSpans(rows, 'groupHeader');
    let gCursor = 0;
    for (const sp of gSpans) {
      const x = chartLeft + gCursor * colW + 16;
      const w = sp.count * colW - 32;
      drawWrappedText(stripPrefix(sp.header), x, tier1Y + 12, w, 30, '27px "Times New Roman", Times, serif', '#f57317');
      gCursor += sp.count;
    }

    // 3. Tier 2: Blue Sub-divisions
    const sSpans = computeSpans(rows, 'subGroupHeader');
    let sCursor = 0;
    for (const sp of sSpans) {
      const x = chartLeft + sCursor * colW + 14;
      const w = sp.count * colW - 28;
      drawWrappedText(stripPrefix(sp.header), x, tier2Y + 10, w, 26, '23px "Times New Roman", Times, serif', '#0045ab');
      sCursor += sp.count;
    }

    // 4. Tier 3: Green Paragraph Titles
    rows.forEach((r, idx) => {
      const x = chartLeft + idx * colW + 12;
      const w = colW - 24;
      drawWrappedText(stripPrefix(r.title || ''), x, tier3Y + 10, w, 23, '20px "Times New Roman", Times, serif', '#009e47');
    });

    // 5. Bottom 3-Row Grid Table
    const yR0 = gridTop;
    const yR1 = gridTop + row1H;
    const yR2 = yR1 + row2H;
    const yR3 = yR2 + row3H;

    [yR0, yR1, yR2, yR3].forEach((yLine) => drawLine(stubX, yLine, chartRight, yLine, 3.5));

    drawWrappedText(currentArg.bookNameLabel || details.defaultBookLabel, stubX + 14, yR0 + 22, chartLeft - stubX - 24, 26, '21px "Times New Roman", Times, serif', '#000000');
    drawWrappedText(currentArg.actorRowLabel || details.defaultActorLabel, stubX + 14, yR1 + 28, chartLeft - stubX - 24, 26, '21px "Times New Roman", Times, serif', '#000000');
    drawWrappedText(currentArg.gradeRowLabel || details.defaultGradeLabel, stubX + 14, yR2 + 45, chartLeft - stubX - 24, 26, '21px "Times New Roman", Times, serif', '#000000');

    rows.forEach((r, idx) => {
      const cx = chartLeft + idx * colW + 12;
      const cw = colW - 24;
      drawWrappedText(r.segment || '', cx, yR0 + 22, cw, 24, '21px "Times New Roman", Times, serif', '#000000');
      drawWrappedText(r.actor || '', cx, yR1 + 28, cw, 24, '21px "Times New Roman", Times, serif', '#000000');
      drawWrappedText(r.grade || '', cx, yR2 + 32, cw, 24, '21px "Times New Roman", Times, serif', '#000000');
    });

    // 6. Clean Squared-off Stepped Vertical Lines & Enclosed Left Stub Border
    drawLine(stubX, yR0, stubX, yR3, 3.5);
    drawLine(chartLeft, topFinialY, chartLeft, yR3, 3.8);
    drawLine(chartRight, topFinialY, chartRight, yR3, 3.8);

    for (let i = 1; i < numCols; i++) {
      const vx = chartLeft + i * colW;
      const prevG = (rows[i - 1]?.groupHeader || '').trim();
      const currG = (rows[i]?.groupHeader || '').trim();
      const prevS = (rows[i - 1]?.subGroupHeader || '').trim();
      const currS = (rows[i]?.subGroupHeader || '').trim();

      let yStart = tier3Y;
      if (prevG !== currG) {
        yStart = tier1Y;
      } else if (prevS !== currS) {
        yStart = tier2Y;
      }
      drawLine(vx, yStart, vx, yR3, 3.5);
    }

    return canvas;
  };

  const downloadChartPng = async () => {
    try {
      if (activeArg === 'jonah') {
        const response = await fetch(`/Jonah Book Chart.png?v=${Date.now()}`, { cache: 'no-store' });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Jonah Book Chart.png');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          return;
        }
      } else if (activeArg === 'philemon') {
        const response = await fetch(`/Philemon Book Chart.png?v=${Date.now()}`, { cache: 'no-store' });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Philemon Book Chart.png');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          return;
        }
      }
    } catch (err) {
      console.warn('Fallback to client canvas PNG export:', err);
    }
    const canvas = renderBookChartToCanvas();
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const bookName = (currentArg.bookNameLabel || details.defaultBookLabel || activeArg).replace(/\s+/g, '_');
      link.setAttribute('download', `${bookName}_Book_Chart.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const downloadChartOnlyDocx = async () => {
    try {
      if (activeArg === 'jonah') {
        const response = await fetch(`/Jonah Book Chart.docx?v=${Date.now()}`, { cache: 'no-store' });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Jonah Book Chart.docx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          return;
        }
      } else if (activeArg === 'philemon') {
        const response = await fetch(`/Philemon Book Chart.docx?v=${Date.now()}`, { cache: 'no-store' });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Philemon Book Chart.docx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          return;
        }
      }
    } catch (err) {
      console.warn('Fallback to PNG chart export:', err);
    }
    downloadChartPng();
  };

  const downloadDocxPortfolio = async () => {
    try {
      if (activeArg === 'jonah') {
        const response = await fetch(`/Jonah argument.docx?v=${Date.now()}`, { cache: 'no-store' });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Jonah argument.docx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          return;
        }
      } else if (activeArg === 'philemon') {
        const response = await fetch(`/Philemon argument.docx?v=${Date.now()}`, { cache: 'no-store' });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Philemon argument.docx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          return;
        }
      }
    } catch (err) {
      console.warn('Fallback to client docx export:', err);
    }
    downloadChartPng();
    exportFormattedArgument();
  };

  const stripOutlineNumbering = (s: string) =>
    (s || '').replace(/^(Theme:\s*|[IVX]+\.\s*|[A-Z]\.\s*|\d+\.\s*)/i, '').trim();

  const isCompleted = taskStatus[details.taskId] === 'done';

  const subTabs = [
    { id: 'rubric', label: 'Rubric & Grade' },
    { id: 'intro', label: '1. Intro Material' },
    { id: 'bookChart', label: '2. Book Chart (Visual)' },
    { id: 'gridChart', label: '3. Grid Chart' },
    { id: 'simpleOutline', label: '4. Simple Outline' },
    { id: 'sentenceOutline', label: '5. Sentence Outline' },
    { id: 'argument', label: '6. The Argument' }
  ] as const;

  const groupSpans = computeSpans(currentArg.bookChart, 'groupHeader');
  const subGroupSpans = computeSpans(currentArg.bookChart, 'subGroupHeader');

  return (
    <div className="fade-in">
      
      {/* Top Selector: mark / jonah / philemon / custom */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {(['mark', 'jonah', 'philemon', 'custom'] as const).map(argKey => {
          const argDetails = argKey === 'mark' ? { title: 'Mark 4 & 5 (LT C11)' } :
                             argKey === 'jonah' ? { title: 'Jonah (LT C14)' } :
                             argKey === 'philemon' ? { title: 'Philemon (LT C15)' } :
                             { title: 'Custom (Nehemiah etc.)' };
          return (
            <button
              key={argKey}
              onClick={() => { setActiveArg(argKey); }}
              className="btn"
              style={{
                background: activeArg === argKey ? 'var(--color-primary-light)' : 'transparent',
                color: 'var(--color-text-primary)',
                border: activeArg === argKey ? '1px solid var(--color-accent-gold)' : '1px solid var(--border-color)'
              }}
            >
              {argDetails.title}
            </button>
          );
        })}
      </div>

      {/* Header and Exporters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
            {details.taskId === 'CUSTOM' ? 'Portfolio Study' : `Learning Task ${details.taskId}`}
          </span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-accent-gold)' }}>{details.title}</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button onClick={loadPhilemonSample} className="btn btn-secondary" style={{ border: '1px solid var(--color-accent-gold)', color: 'var(--color-accent-gold)' }}>
            <Sparkles size={15} /> Load Philemon Portfolio (400 pts)
          </button>
          <button onClick={loadJonahSample} className="btn btn-secondary" style={{ border: '1px solid var(--color-accent-gold)', color: 'var(--color-accent-gold)' }}>
            <Sparkles size={15} /> Load Jonah Chart (Mark Style)
          </button>
          <button onClick={loadMarkSample} className="btn btn-secondary" style={{ border: '1px solid rgba(212, 175, 55, 0.5)' }}>
            Load Mark 4–5 (from .docx)
          </button>
          <button onClick={loadLuke15Sample} className="btn btn-secondary" style={{ border: '1px solid rgba(212, 175, 55, 0.45)' }}>
            Load Luke 15 (Dr. Shubert PPTX)
          </button>
          <button onClick={load2TimothySample} className="btn btn-secondary" style={{ border: '1px solid rgba(212, 175, 55, 0.4)' }}>
            Load 2 Timothy Sample
          </button>
          <a
            href="/slides/C%20Mark%204%20%26%205.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ textDecoration: 'none', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#7dd3fc' }}
          >
            <Eye size={15} /> C Mark 4 & 5 Slides (PDF)
          </a>
          <label className="btn btn-secondary" style={{ border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0 }}>
            <Upload size={16} /> Upload .docx
            <input 
              type="file" 
              accept=".docx" 
              onChange={handleDocxUpload} 
              style={{ display: 'none' }} 
            />
          </label>
          <button onClick={downloadDocxPortfolio} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Download size={16} /> Download Full Argument (.docx)
          </button>
          <button onClick={downloadChartOnlyDocx} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', border: '1px solid var(--color-accent-gold)', color: 'var(--color-accent-gold)' }}>
            <Download size={16} /> Download Book Chart (.docx)
          </button>
          <button onClick={downloadChartPng} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Download size={16} /> Download Chart (.png)
          </button>
          <button onClick={exportFormattedArgument} className="btn btn-secondary">
            <Download size={16} /> Export .txt
          </button>
          {details.taskId !== 'CUSTOM' && (
            <button 
              onClick={() => markTaskDone(details.taskId, !isCompleted)} 
              className={`btn ${isCompleted ? 'btn-primary' : 'btn-outline-gold'}`}
            >
              {isCompleted ? `✓ Completed (${details.maxPoints} pts)` : 'Mark Task Complete'}
            </button>
          )}
        </div>
      </div>

      {/* Grid of Sub-Tabs aligned to the 6 Rubric Areas */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        {subTabs.map(st => (
          <button
            key={st.id}
            onClick={() => setActiveSubTab(st.id)}
            className="btn"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              background: activeSubTab === st.id ? 'var(--color-primary-light)' : 'transparent',
              color: activeSubTab === st.id ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
              border: activeSubTab === st.id ? '1px solid var(--color-accent-gold)' : '1px solid transparent',
              borderRadius: '6px'
            }}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Active Tab Panel */}
      <div className="glass-card" style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* 0. RUBRIC SUMMARY & LIVE GRADED PREVIEW */}
        {activeSubTab === 'rubric' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.75rem' }}>
              Assignment Rubric & Live Progress Grader
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              The grade is estimated based on the official <strong>600-point Bible book argument rubric</strong>. Fill in each tab to see your points update.
            </p>

            <div className="custom-table-container" style={{ marginBottom: '1.5rem' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Rubric Category</th>
                    <th style={{ width: '120px' }}>Weight (%)</th>
                    <th style={{ width: '120px' }}>Max Raw Pts</th>
                    <th style={{ width: '120px' }}>Your Est. Pts</th>
                    <th style={{ width: '100px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>1. Introductory Material</strong> (Authorship, date, settings, purpose)</td>
                    <td>8%</td>
                    <td>48</td>
                    <td style={{ color: 'var(--color-accent-gold)', fontWeight: 'bold' }}>{scores.intro}</td>
                    <td>{scores.intro >= 48 ? '✓ Complete' : 'Incomplete'}</td>
                  </tr>
                  <tr>
                    <td><strong>2. Book Chart</strong> (Hierarchical visual book chart & segments)</td>
                    <td>20%</td>
                    <td>120</td>
                    <td style={{ color: 'var(--color-accent-gold)', fontWeight: 'bold' }}>{scores.bookChart}</td>
                    <td>{scores.bookChart >= 120 ? '✓ Complete' : `${currentArg.bookChart.length}/6+ segments`}</td>
                  </tr>
                  <tr>
                    <td><strong>3. Grid Chart</strong> (Involved party & response matrix)</td>
                    <td>4%</td>
                    <td>24</td>
                    <td style={{ color: 'var(--color-accent-gold)', fontWeight: 'bold' }}>{scores.grid}</td>
                    <td>{scores.grid >= 24 ? '✓ Complete' : 'Incomplete'}</td>
                  </tr>
                  <tr>
                    <td><strong>4. Simple Outline</strong> (Hierarchical book divisions)</td>
                    <td>4%</td>
                    <td>24</td>
                    <td style={{ color: 'var(--color-accent-gold)', fontWeight: 'bold' }}>{scores.simple}</td>
                    <td>{scores.simple >= 24 ? '✓ Complete' : 'Incomplete'}</td>
                  </tr>
                  <tr>
                    <td><strong>5. Sentence Outline</strong> (Full-sentence structural statements)</td>
                    <td>30%</td>
                    <td>180</td>
                    <td style={{ color: 'var(--color-accent-gold)', fontWeight: 'bold' }}>{scores.sentence}</td>
                    <td>{scores.sentence >= 180 ? '✓ Complete' : `${currentArg.sentenceOutline.filter(s => validateSentence(s).isValid).length}/6 sentences`}</td>
                  </tr>
                  <tr>
                    <td><strong>6. The Argument</strong> (Logically structured central claim essay)</td>
                    <td>34%</td>
                    <td>204</td>
                    <td style={{ color: 'var(--color-accent-gold)', fontWeight: 'bold' }}>{scores.argument}</td>
                    <td>{scores.argument >= 204 ? '✓ Complete' : 'Incomplete'}</td>
                  </tr>
                  <tr style={{ background: 'rgba(212,175,55,0.05)', fontWeight: 'bold' }}>
                    <td>Total Rubric Score (Standard Book Scale)</td>
                    <td>100%</td>
                    <td>600</td>
                    <td style={{ color: 'var(--color-accent-gold)' }}>{scores.totalRaw}</td>
                    <td>{scores.totalRaw >= 550 ? 'Excellent' : 'Drafting'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ color: 'var(--color-accent-emerald-light)' }}>Scaled Final Task Estimate</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Scaled to the task's syllabus point size of {details.maxPoints} pts
                </p>
              </div>
              <h3 style={{ fontSize: '2rem', color: 'var(--color-accent-gold)' }}>
                {scores.scaled} / {details.maxPoints} pts
              </h3>
            </div>

            {/* AI Rubric Critic Section */}
            <div style={{ padding: '1.5rem', borderRadius: '10px', background: 'rgba(212, 175, 55, 0.02)', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h4 style={{ color: 'var(--color-accent-gold)', margin: 0, fontSize: '1.1rem' }}>AI Rubric Critic Evaluation</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                    Get detailed grading feedback and socratic revision recommendations from Gemini.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {!apiKey ? (
                    <button onClick={() => setShowKeyInput(!showKeyInput)} className="btn btn-outline-gold" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                      Set API Key
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => setShowKeyInput(true)} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                        Change API Key
                      </button>
                      <button onClick={runAiEvaluation} className="btn btn-primary" disabled={isEvaluating} style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem' }}>
                        {isEvaluating ? 'Evaluating...' : 'Run AI Critic'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {showKeyInput && (
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                  <input
                    type="password"
                    className="input-field"
                    style={{ flex: 1, padding: '0.5rem' }}
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder="Enter your Gemini API Key..."
                  />
                  <button onClick={handleSaveApiKey} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    Save Key
                  </button>
                </div>
              )}

              {isEvaluating && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                  Gemini is auditing your outlines, book divisions, and essay against the 600-point rubric. Please wait...
                </div>
              )}

              {evaluationResult && (
                <div style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border-color)', 
                  marginTop: '1rem',
                  fontSize: '1.05rem',
                  lineHeight: '1.6',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'system-ui' }}>
                    {evaluationResult}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 1. INTRODUCTORY MATERIAL */}
        {activeSubTab === 'intro' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>
              1. Introductory Material (48 Points)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Draft the introduction detailing critical historical context: author, date, setting, addressees, and theological purpose. Aim for at least 150 characters to secure full points.
            </p>
            <textarea
              className="input-field"
              style={{ minHeight: '240px', resize: 'vertical' }}
              value={currentArg.introductoryMaterial}
              onChange={(e) => handleFieldChange('introductoryMaterial', e.target.value)}
              placeholder="Introduce authorship, date, setting, and recipients..."
            ></textarea>
          </div>
        )}

        {/* 2. BOOK CHART (HIERARCHICAL DIAGRAM MATCHING MARK ARGUMENT (2).DOCX) */}
        {activeSubTab === 'bookChart' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.25rem' }}>
                  2. Hierarchical Book Chart & Grid Chart (120 + 24 Points)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Modeled directly after your <strong>Mark argument (2).docx</strong> Book Chart: Red overarching theme, Orange major divisions (`I / II`), Blue section headings (`A / B`), Green paragraph titles (`1 / 2`), and the 3-row baseline grid (`Book Ref`, `Involved party`, `Response/Faith`).
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={downloadChartOnlyDocx}
                  className="btn btn-primary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                >
                  <Download size={14} /> Download Book Chart (.docx)
                </button>
                <button
                  onClick={downloadDocxPortfolio}
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', border: '1px solid var(--color-accent-gold)', color: 'var(--color-accent-gold)' }}
                >
                  <Download size={14} /> Download Full Argument (.docx)
                </button>
                <button
                  onClick={downloadChartPng}
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                >
                  <Download size={14} /> Download Chart (.png)
                </button>
                <button
                  onClick={loadPhilemonSample}
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', border: '1px solid var(--color-accent-gold)', color: 'var(--color-accent-gold)' }}
                >
                  <Sparkles size={14} /> Load Philemon 8-Paragraph Chart (NASB)
                </button>
                <button
                  onClick={loadJonahSample}
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                >
                  <Sparkles size={14} /> Load Jonah 8-Segment Chart
                </button>
                <button
                  onClick={loadMarkSample}
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                >
                  <Eye size={14} /> View Mark 4–5 (.docx) Chart
                </button>
              </div>
            </div>

            {/* Chart Header & Row Labels Configuration */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '1.25rem', padding: '0.85rem 1rem', background: 'rgba(212, 175, 55, 0.04)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <div>
                <label className="label" style={{ marginBottom: '0.25rem', color: '#f87171' }}>Overarching Book Theme (Red Top Title)</label>
                <input
                  type="text"
                  className="input-field"
                  value={currentArg.bookChartTheme ?? details.defaultTheme}
                  onChange={(e) => handleFieldChange('bookChartTheme', e.target.value)}
                  placeholder="e.g., The sovereign compassion of Yahweh over all peoples"
                />
              </div>
              <div>
                <label className="label" style={{ marginBottom: '0.25rem' }}>Row 1 Label (Book)</label>
                <input
                  type="text"
                  className="input-field"
                  value={currentArg.bookNameLabel ?? details.defaultBookLabel}
                  onChange={(e) => handleFieldChange('bookNameLabel', e.target.value)}
                  placeholder="Jonah"
                />
              </div>
              <div>
                <label className="label" style={{ marginBottom: '0.25rem' }}>Row 2 Label (Party)</label>
                <input
                  type="text"
                  className="input-field"
                  value={currentArg.actorRowLabel ?? details.defaultActorLabel}
                  onChange={(e) => handleFieldChange('actorRowLabel', e.target.value)}
                  placeholder="Involved party"
                />
              </div>
              <div>
                <label className="label" style={{ marginBottom: '0.25rem' }}>Row 3 Label (Theme)</label>
                <input
                  type="text"
                  className="input-field"
                  value={currentArg.gradeRowLabel ?? details.defaultGradeLabel}
                  onChange={(e) => handleFieldChange('gradeRowLabel', e.target.value)}
                  placeholder="Response / Faith"
                />
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  onClick={() => setChartStyle(chartStyle === 'hierarchy' ? 'slides' : 'hierarchy')}
                  className="btn btn-secondary"
                  style={{ padding: '0.55rem 0.75rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                >
                  Style: {chartStyle === 'hierarchy' ? 'Word Doc Diagram' : 'Parchment Slides'}
                </button>
              </div>
            </div>

            {/* VISUAL CHART RENDERER */}
            {currentArg.bookChart.length > 0 ? (
              chartStyle === 'hierarchy' ? (
                /* =========================================================================
                   STYLE 1: EXACT REPLICA OF "MARK ARGUMENT (2).DOCX" HIERARCHICAL BOOK CHART
                   ========================================================================= */
                <div
                  style={{
                    background: '#ffffff',
                    color: '#000000',
                    borderRadius: '10px',
                    padding: '1.25rem 1.25rem 1.5rem 1rem',
                    marginBottom: '1.75rem',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
                    border: '2px solid #d4af37',
                    overflowX: 'auto',
                    fontFamily: '"Times New Roman", Times, Georgia, serif'
                  }}
                >
                  <div style={{ minWidth: `${Math.max(920, currentArg.bookChart.length * 125 + 130)}px` }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `125px repeat(${currentArg.bookChart.length}, 1fr)`,
                        position: 'relative'
                      }}
                    >
                      {/* TIER 0: RED OVERARCHING THEME TITLE (NO OUTLINE NUMBERING, COMPRESSED, NO CIRCLE ENDPOINTS) */}
                      <div style={{ gridColumn: '1 / 2' }} />
                      <div
                        style={{
                          gridColumn: `2 / ${currentArg.bookChart.length + 2}`,
                          borderLeft: '2.5px solid #000',
                          borderRight: '2.5px solid #000',
                          textAlign: 'center',
                          padding: '0.2rem 1rem 0.65rem',
                          position: 'relative'
                        }}
                      >
                        <div
                          style={{
                            color: '#b81414',
                            fontSize: '1.35rem',
                            fontWeight: 700,
                            letterSpacing: '0.01em'
                          }}
                        >
                          {stripOutlineNumbering(currentArg.bookChartTheme || details.defaultTheme)}
                        </div>
                      </div>

                      {/* TIER 1: ORANGE MAJOR DIVISIONS (COMPRESSED, HIGH-CONTRAST) */}
                      <div style={{ gridColumn: '1 / 2' }} />
                      {groupSpans.map((span, sIdx) => (
                        <div
                          key={`grp-${sIdx}`}
                          style={{
                            gridColumn: `span ${span.count}`,
                            borderLeft: sIdx === 0 ? '2.5px solid #000' : 'none',
                            borderRight: '2.5px solid #000',
                            textAlign: 'center',
                            padding: '0.15rem 0.65rem 0.7rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#b84f05',
                            fontSize: '1.25rem',
                            lineHeight: 1.2,
                            fontWeight: 700
                          }}
                        >
                          {stripOutlineNumbering(span.header)}
                        </div>
                      ))}

                      {/* TIER 2: BLUE SUB-DIVISIONS (COMPRESSED, HIGH-CONTRAST) */}
                      <div style={{ gridColumn: '1 / 2' }} />
                      {subGroupSpans.map((span, sIdx) => (
                        <div
                          key={`subgrp-${sIdx}`}
                          style={{
                            gridColumn: `span ${span.count}`,
                            borderLeft: sIdx === 0 ? '2.5px solid #000' : 'none',
                            borderRight: '2.5px solid #000',
                            textAlign: 'center',
                            padding: '0.15rem 0.45rem 0.65rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#1240ad',
                            fontSize: '1.15rem',
                            lineHeight: 1.2,
                            fontWeight: 700
                          }}
                        >
                          {stripOutlineNumbering(span.header)}
                        </div>
                      ))}

                      {/* TIER 3: GREEN PARAGRAPH SUB-POINTS (COMPRESSED, DARK FOREST GREEN) */}
                      <div style={{ gridColumn: '1 / 2' }} />
                      {currentArg.bookChart.map((row, idx) => (
                        <div
                          key={`leaf-${row.id}`}
                          style={{
                            borderLeft: idx === 0 ? '2.5px solid #000' : 'none',
                            borderRight: '2.5px solid #000',
                            textAlign: 'center',
                            padding: '0.2rem 0.35rem 0.45rem',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            color: '#0f732e',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            lineHeight: 1.2,
                            minHeight: '42px'
                          }}
                        >
                          {stripOutlineNumbering(row.title)}
                        </div>
                      ))}

                      {/* ROW 0 OF ENCLOSED GRID: TOPICS / BOOK NAME & CHAPTER/VERSE REFERENCES */}
                      <div
                        style={{
                          borderTop: '2.5px solid #000',
                          borderBottom: '2.5px solid #000',
                          borderLeft: '2.5px solid #000',
                          borderRight: '2.5px solid #000',
                          background: '#f5f5f5',
                          padding: '0.4rem 0.45rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: '#000'
                        }}
                      >
                        {currentArg.bookNameLabel || details.defaultBookLabel}
                      </div>
                      {currentArg.bookChart.map((row) => (
                        <div
                          key={`ref-${row.id}`}
                          style={{
                            borderTop: '2.5px solid #000',
                            borderBottom: '2.5px solid #000',
                            borderRight: '2.5px solid #000',
                            background: '#f5f5f5',
                            padding: '0.4rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: '#000'
                          }}
                        >
                          {row.segment}
                        </div>
                      ))}

                      {/* OPTIONAL ROW: GENRE (HIGHLIGHTING CH. 2 POETRY SHIFT) */}
                      {currentArg.bookChart.some(r => r.genre) && (
                        <>
                          <div
                            style={{
                              borderBottom: '2.5px solid #000',
                              borderLeft: '2.5px solid #000',
                              borderRight: '2.5px solid #000',
                              background: '#fbfbfb',
                              padding: '0.45rem 0.4rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              fontSize: '1.05rem',
                              fontWeight: 700,
                              color: '#000'
                            }}
                          >
                            {activeArg === 'philemon' ? 'Epistolary structure' : 'Genre'}
                          </div>
                          {currentArg.bookChart.map((row) => {
                            const isPoetry = (row.genre || '').toLowerCase().includes('poetry');
                            return (
                              <div
                                key={`genre-${row.id}`}
                                style={{
                                  borderBottom: '2.5px solid #000',
                                  borderRight: '2.5px solid #000',
                                  background: isPoetry ? '#fff8e1' : '#ffffff',
                                  padding: '0.45rem 0.35rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  textAlign: 'center',
                                  fontSize: '1.0rem',
                                  fontWeight: isPoetry ? 700 : 400,
                                  color: isPoetry ? '#1240ad' : '#000',
                                  lineHeight: 1.2
                                }}
                              >
                                {row.genre || 'Historical narrative'}
                              </div>
                            );
                          })}
                        </>
                      )}

                      {/* ROW: INVOLVED PARTY */}
                      <div
                        style={{
                          borderBottom: '2.5px solid #000',
                          borderLeft: '2.5px solid #000',
                          borderRight: '2.5px solid #000',
                          background: '#fbfbfb',
                          padding: '0.5rem 0.4rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          lineHeight: 1.2,
                          color: '#000'
                        }}
                      >
                        {currentArg.actorRowLabel || details.defaultActorLabel}
                      </div>
                      {currentArg.bookChart.map((row) => (
                        <div
                          key={`actor-${row.id}`}
                          style={{
                            borderBottom: '2.5px solid #000',
                            borderRight: '2.5px solid #000',
                            padding: '0.5rem 0.35rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: '1.0rem',
                            color: '#000'
                          }}
                        >
                          {row.actor}
                        </div>
                      ))}

                      {/* ROW: RESPONSE / FAITH */}
                      <div
                        style={{
                          borderBottom: '2.5px solid #000',
                          borderLeft: '2.5px solid #000',
                          borderRight: '2.5px solid #000',
                          background: '#fbfbfb',
                          padding: '0.5rem 0.4rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: '#000'
                        }}
                      >
                        {currentArg.gradeRowLabel || details.defaultGradeLabel}
                      </div>
                      {currentArg.bookChart.map((row) => (
                        <div
                          key={`grade-${row.id}`}
                          style={{
                            borderBottom: '2.5px solid #000',
                            borderRight: '2.5px solid #000',
                            padding: '0.55rem 0.35rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: '1.0rem',
                            lineHeight: 1.2,
                            color: '#000'
                          }}
                        >
                          {row.grade}
                        </div>
                      ))}

                      {/* OPTIONAL ROW: GOD'S ACTION / PROVISION */}
                      {currentArg.bookChart.some(r => r.godAction) && (
                        <>
                          <div
                            style={{
                              borderBottom: '2.5px solid #000',
                              borderLeft: '2.5px solid #000',
                              borderRight: '2.5px solid #000',
                              background: '#fbfbfb',
                              padding: '0.5rem 0.4rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              fontSize: '1.0rem',
                              fontWeight: 700,
                              lineHeight: 1.2,
                              color: '#000'
                            }}
                          >
                            {activeArg === 'philemon' ? '1st-C. Slavery vs. Gospel' : 'God’s action / Provision'}
                          </div>
                          {currentArg.bookChart.map((row) => (
                            <div
                              key={`god-${row.id}`}
                              style={{
                                borderBottom: '2.5px solid #000',
                                borderRight: '2.5px solid #000',
                                padding: '0.5rem 0.35rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                fontSize: '1.0rem',
                                lineHeight: 1.2,
                                color: '#000'
                              }}
                            >
                              {row.godAction || ''}
                            </div>
                          ))}
                        </>
                      )}

                      {/* OPTIONAL ROW: SETTING / DIRECTION */}
                      {currentArg.bookChart.some(r => r.setting) && (
                        <>
                          <div
                            style={{
                              borderBottom: '2.5px solid #000',
                              borderLeft: '2.5px solid #000',
                              borderRight: '2.5px solid #000',
                              background: '#fbfbfb',
                              padding: '0.5rem 0.4rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              fontSize: '1.0rem',
                              fontWeight: 700,
                              lineHeight: 1.2,
                              color: '#000'
                            }}
                          >
                            {activeArg === 'philemon' ? 'Setting / Atmosphere' : 'Setting / Direction'}
                          </div>
                          {currentArg.bookChart.map((row) => (
                            <div
                              key={`set-${row.id}`}
                              style={{
                                borderBottom: '2.5px solid #000',
                                borderRight: '2.5px solid #000',
                                padding: '0.5rem 0.35rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                fontSize: '0.84rem',
                                lineHeight: 1.2,
                                color: '#000'
                              }}
                            >
                              {row.setting || ''}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* =========================================================================
                   STYLE 2: DR. SHUBERT PARCHMENT SLIDE VIEW
                   ========================================================================= */
                <div
                  style={{
                    background: 'linear-gradient(135deg, #f3e5c8 0%, #e6d2aa 50%, #efe0c2 100%)',
                    color: '#1a1410',
                    borderRadius: '12px',
                    padding: '1.75rem 1.25rem 1.5rem',
                    marginBottom: '1.75rem',
                    boxShadow: '0 14px 32px rgba(0, 0, 0, 0.45)',
                    border: '3px solid #c8a253',
                    overflowX: 'auto'
                  }}
                >
                  <div style={{ minWidth: `${Math.max(760, currentArg.bookChart.length * 125)}px` }}>
                    <div style={{ textAlign: 'center', fontSize: '2.1rem', fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 900, color: '#b91c1c', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                      {currentArg.bookChartTheme || details.defaultTheme}
                    </div>
                    <div style={{ borderLeft: '5px solid #111', borderRight: '5px solid #111', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${currentArg.bookChart.length}, 1fr)`, minHeight: '140px' }}>
                        {currentArg.bookChart.map((row, idx) => (
                          <div key={row.id} style={{ borderRight: idx < currentArg.bookChart.length - 1 ? '4px solid #111' : 'none', padding: '0.6rem 0.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#5b21b6' }}>{row.actor}</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#15803d', margin: '0.5rem 0' }}>{row.grade}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${currentArg.bookChart.length}, 1fr)`, borderTop: '4px solid #111', borderBottom: '4px solid #111', background: 'rgba(255,255,255,0.45)' }}>
                        {currentArg.bookChart.map((row, idx) => (
                          <div key={row.id} style={{ borderRight: idx < currentArg.bookChart.length - 1 ? '4px solid #111' : 'none', padding: '0.3rem 0.5rem', fontWeight: 900, color: '#dc2626', textAlign: 'right' }}>
                            {row.segment}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${currentArg.bookChart.length}, 1fr)`, minHeight: '85px' }}>
                        {currentArg.bookChart.map((row, idx) => (
                          <div key={row.id} style={{ borderRight: idx < currentArg.bookChart.length - 1 ? '4px solid #111' : 'none', padding: '0.6rem 0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '1.05rem', fontWeight: 900, color: '#1d4ed8' }}>
                            {row.title || row.subGroupHeader}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(212, 175, 55, 0.04)', borderRadius: '10px', border: '1px dashed var(--border-color)', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                  No Book Chart segments added yet for <strong>{details.title}</strong>.
                </p>
                <button onClick={activeArg === 'mark' ? loadMarkSample : loadJonahSample} className="btn btn-primary">
                  <Sparkles size={16} /> Load {activeArg === 'mark' ? 'Mark 4–5 (.docx)' : 'Jonah 8-Paragraph'} Book Chart Now
                </button>
              </div>
            )}

            {/* Addition Form */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <div>
                <label className="label">Segment Ref (Row 1)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={newSegment} 
                  onChange={(e) => setNewSegment(e.target.value)} 
                  placeholder="e.g., 1:1–3"
                />
              </div>
              <div>
                <label className="label" style={{ color: '#fdba74' }}>Major Division (Orange I/II)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={newSegmentGroup} 
                  onChange={(e) => setNewSegmentGroup(e.target.value)} 
                  placeholder="Spans matching columns"
                />
              </div>
              <div>
                <label className="label" style={{ color: '#7dd3fc' }}>Sub-Division (Blue A/B)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={newSegmentSubGroup} 
                  onChange={(e) => setNewSegmentSubGroup(e.target.value)} 
                  placeholder="Spans matching columns"
                />
              </div>
              <div>
                <label className="label" style={{ color: '#86efac' }}>Paragraph Title (Green 1/2)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={newSegmentTitle} 
                  onChange={(e) => setNewSegmentTitle(e.target.value)} 
                  placeholder="e.g., Jonah flees to Tarshish"
                />
              </div>
              <div>
                <label className="label">{currentArg.actorRowLabel || details.defaultActorLabel} (Row 2)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={newSegmentActor} 
                  onChange={(e) => setNewSegmentActor(e.target.value)} 
                  placeholder="e.g., Hebrew prophet"
                />
              </div>
              <div>
                <label className="label">{currentArg.gradeRowLabel || details.defaultGradeLabel} (Row 3)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={newSegmentGrade} 
                  onChange={(e) => setNewSegmentGrade(e.target.value)} 
                  placeholder="e.g., Rebellious flight"
                />
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <label className="label">Structural Notes (Optional observation notes)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={newSegmentRelations} 
                    onChange={(e) => setNewSegmentRelations(e.target.value)} 
                    placeholder="e.g., Contrast between Jonah's flight and sailors' prayer"
                  />
                </div>
                <button 
                  onClick={addBookChartRow} 
                  className="btn btn-primary" 
                  style={{ borderRadius: '8px', padding: '0.75rem 1.25rem' }}
                >
                  <Plus size={16} /> Add Segment Column
                </button>
              </div>
            </div>

            {/* Editable Table of Segments */}
            {currentArg.bookChart.length > 0 && (
              <div className="custom-table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th style={{ width: '90px' }}>Ref</th>
                      <th style={{ color: '#fdba74' }}>Orange Major Division (I / II)</th>
                      <th style={{ color: '#7dd3fc' }}>Blue Section Heading (A / B)</th>
                      <th style={{ color: '#86efac' }}>Green Paragraph Title (1 / 2)</th>
                      <th style={{ width: '140px' }}>{currentArg.actorRowLabel || details.defaultActorLabel}</th>
                      <th style={{ width: '155px' }}>{currentArg.gradeRowLabel || details.defaultGradeLabel}</th>
                      <th style={{ width: '45px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentArg.bookChart.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <input
                            type="text"
                            className="input-field"
                            style={{ padding: '0.35rem 0.45rem', fontSize: '0.82rem', fontWeight: 'bold' }}
                            value={row.segment}
                            onChange={(e) => updateBookChartRow(row.id, 'segment', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input-field"
                            style={{ padding: '0.35rem 0.45rem', fontSize: '0.82rem' }}
                            value={row.groupHeader || ''}
                            onChange={(e) => updateBookChartRow(row.id, 'groupHeader', e.target.value)}
                            placeholder="Orange Major Division"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input-field"
                            style={{ padding: '0.35rem 0.45rem', fontSize: '0.82rem' }}
                            value={row.subGroupHeader || ''}
                            onChange={(e) => updateBookChartRow(row.id, 'subGroupHeader', e.target.value)}
                            placeholder="Blue Section Heading"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input-field"
                            style={{ padding: '0.35rem 0.45rem', fontSize: '0.82rem' }}
                            value={row.title}
                            onChange={(e) => updateBookChartRow(row.id, 'title', e.target.value)}
                            placeholder="Green Sub-point"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input-field"
                            style={{ padding: '0.35rem 0.45rem', fontSize: '0.82rem' }}
                            value={row.actor || ''}
                            onChange={(e) => updateBookChartRow(row.id, 'actor', e.target.value)}
                            placeholder="Involved party"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input-field"
                            style={{ padding: '0.35rem 0.45rem', fontSize: '0.82rem' }}
                            value={row.grade || ''}
                            onChange={(e) => updateBookChartRow(row.id, 'grade', e.target.value)}
                            placeholder="Response"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            onClick={() => deleteBookChartRow(row.id)}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                            title="Delete Segment"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 3. GRID CHART */}
        {activeSubTab === 'gridChart' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>
              3. Grid Chart (24 Points)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Note: In your <strong>Mark argument (2).docx</strong> format, the Grid Chart rows (<em>Involved party</em> & <em>Response/Faith</em>) are already built directly into the bottom of your visual Book Chart in Tab 2! You can also log additional comparative notes below.
            </p>

            <div className="custom-table-container" style={{ marginBottom: '1rem' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Comparative Aspect</th>
                    <th>
                      <input
                        type="text"
                        className="input-field"
                        style={{ background: 'transparent', border: 'none', fontWeight: 'bold', color: 'var(--color-accent-gold)', padding: 0 }}
                        value={currentArg.gridChart.headers[1]}
                        onChange={(e) => handleGridHeaderChange(1, e.target.value)}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="input-field"
                        style={{ background: 'transparent', border: 'none', fontWeight: 'bold', color: 'var(--color-accent-gold)', padding: 0 }}
                        value={currentArg.gridChart.headers[2]}
                        onChange={(e) => handleGridHeaderChange(2, e.target.value)}
                      />
                    </th>
                    <th style={{ width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {currentArg.gridChart.rows.map((row, rIdx) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="text"
                          className="input-field"
                          style={{ background: 'transparent', border: 'none', fontWeight: 'bold', padding: 0 }}
                          value={row.label}
                          onChange={(e) => handleGridRowLabelChange(rIdx, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input-field"
                          style={{ background: 'transparent', border: 'none', padding: 0 }}
                          value={row.cells[0]}
                          onChange={(e) => handleGridCellChange(rIdx, 0, e.target.value)}
                          placeholder="Log comparison..."
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input-field"
                          style={{ background: 'transparent', border: 'none', padding: 0 }}
                          value={row.cells[1]}
                          onChange={(e) => handleGridCellChange(rIdx, 1, e.target.value)}
                          placeholder="Log comparison..."
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          onClick={() => deleteGridRow(row.id)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={addGridRow} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
              <Plus size={14} /> Add Comparison Row
            </button>
          </div>
        )}

        {/* 4. SIMPLE OUTLINE */}
        {activeSubTab === 'simpleOutline' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>
              4. Simple Outline (24 Points)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Provide a simple, hierarchical breakdown of the book's main thematic divisions (matching the Orange `I/II`, Blue `A/B`, and Green `1/2` tiers of your Book Chart).
            </p>
            <textarea
              className="input-field"
              style={{ minHeight: '240px', resize: 'vertical' }}
              value={currentArg.simpleOutline}
              onChange={(e) => handleFieldChange('simpleOutline', e.target.value)}
              placeholder="I. First major division (1:1–2:10)&#10;   A. Sub-heading..."
            ></textarea>
          </div>
        )}

        {/* 5. SENTENCE OUTLINE */}
        {activeSubTab === 'sentenceOutline' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.35rem' }}>
                  5. Sentence Outline (180 Points)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Draft a sentence outline. Unlike a simple outline, <strong>every point must be a complete, declarative sentence</strong> matching the scholarly standard of your portfolio sample (<code>Mark argument (2).docx</code>).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                className="input-field"
                value={newSentenceText}
                onChange={(e) => setNewSentenceText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSentence()}
                placeholder="Type a complete sentence outline point here..."
                style={{ flex: 1 }}
              />
              <button onClick={addSentence} className="btn btn-primary" style={{ borderRadius: '8px' }}>
                Add Sentence
              </button>
            </div>

            {/* List of Sentences */}
            {currentArg.sentenceOutline.length === 0 ? (
              <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1.5rem 0' }}>
                No sentence outline points added yet.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {currentArg.sentenceOutline.map((sentence, index) => {
                  const val = validateSentence(sentence);
                  return (
                    <div 
                      key={index}
                      style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.01)',
                        border: '1px solid',
                        borderColor: val.isValid ? 'var(--border-color)' : 'rgba(239, 68, 68, 0.2)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--color-text-primary)', fontSize: '1.05rem' }}>{sentence}</span>
                        </div>
                        {val.errors.map((err, eIdx) => (
                          <div key={eIdx} style={{ color: '#fca5a5', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem', paddingLeft: '1.25rem' }}>
                            <AlertTriangle size={12} /> {err}
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => deleteSentence(index)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 6. THE ARGUMENT */}
        {activeSubTab === 'argument' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>
              6. The Argument (204 Points)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Draft the actual argument essay following your Sentence Outline headings (just like in your <em>Mark argument (2).docx</em>). Aim for at least 300 words to secure full points.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="label" style={{ margin: 0 }}>Argument Text Essay</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Word Count: {currentArg.argumentText.trim() ? currentArg.argumentText.trim().split(/\s+/).length : 0} / 300 words
              </span>
            </div>

            <textarea
              className="input-field"
              style={{ minHeight: '280px', resize: 'vertical' }}
              value={currentArg.argumentText}
              onChange={(e) => handleFieldChange('argumentText', e.target.value)}
              placeholder="Synthesize your supporting points into the main argument..."
            ></textarea>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => {
              const prevIdx = subTabs.findIndex(st => st.id === activeSubTab) - 1;
              if (prevIdx >= 0) setActiveSubTab(subTabs[prevIdx].id);
            }}
            className="btn btn-secondary"
            disabled={activeSubTab === 'rubric'}
            style={{ padding: '0.5rem 1rem' }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', alignSelf: 'center' }}>
            {subTabs.findIndex(st => st.id === activeSubTab) + 1} of 7
          </span>

          <button
            onClick={() => {
              const nextIdx = subTabs.findIndex(st => st.id === activeSubTab) + 1;
              if (nextIdx < subTabs.length) {
                setActiveSubTab(subTabs[nextIdx].id);
              } else {
                setActiveSubTab('rubric');
              }
            }}
            className="btn btn-primary"
            style={{ padding: '0.5rem 1.25rem' }}
          >
            {activeSubTab === 'argument' ? 'Review Grade' : 'Next'} <ChevronRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
};
