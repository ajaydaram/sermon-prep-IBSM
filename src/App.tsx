import React, { useState, useEffect } from 'react';
import type { StudentAppState } from './types';
import { Dashboard } from './components/Dashboard';
import { Schedule } from './components/Schedule';
import { Workspace } from './components/Workspace';
import { COMPLETE_SLAVERY_PAPER } from './components/workspaces/ResearchPlanner';
import { LayoutDashboard, Calendar, BookOpen, RotateCcw, Book, Download, FileText } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'bs510_student_state';

const createEmptyArgument = () => ({
  introductoryMaterial: '',
  bookChart: [],
  gridChart: {
    headers: ['Comparison Aspect', 'Key Text/Section A', 'Key Text/Section B'],
    rows: [
      { id: '1', label: 'Theme Focus', cells: ['', ''] },
      { id: '2', label: 'Key Audience', cells: ['', ''] }
    ]
  },
  simpleOutline: '',
  sentenceOutline: [],
  argumentText: ''
});

const createDefaultJonahArgument = () => ({
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
      });

const createDefaultPhilemonArgument = () => ({
  bookChartTheme: "The appeal of Paul’s Christlike leadership urged Philemon to receive his converted runaway slave Onesimus no longer as a slave, but as a beloved brother in Christ, securing gospel reconciliation through sacrificial love and personal accountability (Phlm 1–25).",
  bookNameLabel: "Philemon",
  actorRowLabel: "Involved party",
  gradeRowLabel: "Leadership principle",
  introductoryMaterial: `Introduction
The Letter to Philemon is Paul’s shortest, most intensely personal, and diplomatically profound epistle. While ostensibly addressing a private domestic dispute within an ancient Greco-Roman household, this brief letter provides an enduring masterclass in biblical leadership. In it, the Apostle Paul demonstrated how the transforming power of the gospel redefines coercive societal hierarchies into sacrificial spiritual brotherhood within the household of God, showing that true spiritual leadership relies on relational persuasion, moral elevation, and vicarious sacrifice rather than authoritarian compulsion.

Author
The Apostle Paul authored the epistle, identifying himself explicitly by name as “a prisoner of Christ Jesus” alongside his trusted coworker Timothy (Phlm 1, 9, 19). Paul affirmed his direct personal authorship and legal commitment by penning the formal promissory debt guarantee with his own hand (Phlm 19).

Date of Writing
Paul composed this letter approximately AD 60–62 during his first Roman imprisonment under house arrest in his own rented quarters (Acts 28:16, 30–31). It was dispatched concurrently with the Epistle to the Colossians via Tychicus and the returning Onesimus (Col 4:7–9).

Historical Setting
Historically, the epistle was situated within the Pax Romana under the early reign of Emperor Nero (AD 54–68), where Roman slavery was an entrenched, legally coercive empire-wide institution maintained through warfare, natural reproduction, piracy, and economic destitution.[1] Under Roman law (dominica potestas), slaveholders possessed virtually unchecked legal dominion over enslaved persons, rendering a runaway slave (fugitivus) liable to severe corporal punishment, branding with the letters FUG upon the forehead, confinement in private workhouses (ergastula), or execution by crucifixion.[2] However, Roman custom also recognized the principle of amicus domini—where an enslaved person who fled in fear of a master’s wrath could seek refuge with a respected friend of the master to negotiate mediation and reconciliation without being classified as a criminal fugitive.[3] Even upon potential manumission, a freedperson (libertus) remained bound to their former master through continuing patronal duties of reverence (obsequium) and customary labor services (operae).[4] In the Lycus Valley city of Colossae, Philemon hosted a fledgling house church; the sudden return of his runaway slave Onesimus—now converted to Christ through Paul—confronted this congregation with a profound theological and social test of whether the gospel of grace could genuinely overturn Roman legal hierarchy in favor of Christian brotherhood.[5]

Place of Writing
Paul wrote this letter from Rome while under military custody in his rented quarters awaiting his formal legal hearing before Caesar (Acts 28:16, 30; Phlm 1, 9, 23). From this place of confinement, Paul actively proclaimed the kingdom of God and mobilized a network of missionary associates.

Recipients
The letter was addressed primarily to Philemon, a wealthy Christian citizen and patron in Colossae, along with Apphia (“our sister”), Archippus (“our fellow soldier”), and the entire local church meeting in Philemon’s residence (Phlm 1–2). Addressing the entire congregation placed Philemon’s private decision within the loving accountability, public visibility, and communal support of the Christian assembly.

Occasion and Purpose
The occasion was the return of the converted slave Onesimus to Colossae carrying this letter from Paul. Paul’s purpose was to appeal to Philemon on the basis of Christian love rather than apostolic command, urging him to forgive Onesimus, cancel any outstanding financial or legal debts, and receive him back no longer merely as an enslaved person, but as a beloved brother in the Lord. Furthermore, Paul sought to inspire Philemon to do even more than requested, releasing Onesimus for continuing gospel partnership in apostolic ministry.

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
      genre: 'Thanksgiving & Intercession (4–7)',
      godAction: 'Rejoicing in fruit of love among saints',
      setting: 'Personal prayer of Apostle in chains',
      relations: 'Causation: Philemon’s proven record of refreshing the hearts of the saints (splagchna, v. 7) provides the moral basis for Paul’s appeal.'
    },
    {
      id: 'p3',
      segment: '8–9',
      title: 'Appeal of love',
      groupHeader: 'Paul appealed for Onesimus’s reception in love',
      subGroupHeader: 'Interceding for Onesimus',
      actor: 'Paul & Philemon',
      grade: 'Persuasion over compulsion: "for love’s sake" (v. 9)',
      genre: 'Apostolic Plea / Intercession (8–9)',
      godAction: 'Renouncing apostolic command for agape',
      setting: 'Relational appeal as "the aged" prisoner',
      relations: 'Contrast: Paul has full apostolic authority to "command" (epitassein, v. 8), but appeals "for love’s sake" (dia tēn agapēn, v. 9) to protect voluntary obedience.'
    },
    {
      id: 'p4',
      segment: '10–16',
      title: 'Receiving a brother',
      groupHeader: 'Paul appealed for Onesimus’s reception in love',
      subGroupHeader: 'Interceding for Onesimus',
      actor: 'Paul, Onesimus & Philemon',
      grade: 'Restorative advocacy: "my child... beloved brother" (vv. 10, 16)',
      genre: 'Climax of Petition: Adoption & Brotherhood (10–16)',
      godAction: 'Transforming fugitive slave into beloved brother',
      setting: 'Sovereign providence in human estrangement',
      relations: 'Climax & Purpose: Onesimus was separated "for a while" that Philemon might have him forever, "no longer as a slave, but more than a slave, a beloved brother" (v. 16).'
    },
    {
      id: 'p5',
      segment: '17–20',
      title: 'Pledging debt repayment',
      groupHeader: 'Paul sealed the reconciliation through partnership',
      subGroupHeader: 'Assuming debt and confidence',
      actor: 'Paul & Philemon (for Onesimus)',
      grade: 'Sacrificial substitution: "charge that to my account" (v. 18)',
      genre: 'Legal Promissory Note / Guarantee (17–20)',
      godAction: 'Paul acts as surety, modeling Christ’s cross',
      setting: 'Formal handwriting: "I, Paul, write this" (v. 19)',
      relations: 'Substantiation: Paul links his appeal to partnership (koinōnon, v. 17), pledging his own hand to repay any wrong or debt incurred by Onesimus (v. 19).'
    },
    {
      id: 'p6',
      segment: '21',
      title: 'Confidence in obedience',
      groupHeader: 'Paul sealed the reconciliation through partnership',
      subGroupHeader: 'Assuming debt and confidence',
      actor: 'Paul & Philemon',
      grade: 'High-trust leadership: "do even more than I say" (v. 21)',
      genre: 'Pastoral Affirmation & Trust (21)',
      godAction: 'Inspiring voluntary obedience exceeding command',
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
      grade: 'Pastoral accountability: preparing a guest room (v. 22)',
      genre: 'Personal Request & Anticipated Visit (22)',
      godAction: 'Expectation of release through church’s prayers',
      setting: 'Colossian hospitality anticipating arrival',
      relations: 'Accountability: Requesting a guest room reminds Philemon that Paul expects to see the fruit of reconciliation in person through their prayers (v. 22).'
    },
    {
      id: 'p8',
      segment: '23–25',
      title: 'Final greetings and grace',
      groupHeader: 'Paul sealed the reconciliation through partnership',
      subGroupHeader: 'Expecting visit and fellowship',
      actor: 'Paul, Coworkers (Mark, Luke) & Church',
      grade: 'Restored ministry team & corporate grace (vv. 23–25)',
      genre: 'Epistolary Closing: Greetings & Benediction (23–25)',
      godAction: 'Uniting saints in Christ across social barriers',
      setting: 'Fellow workers in Rome sending greetings to Colossae',
      relations: 'Inclusio: Epaphras, Mark (restored deserter), Aristarchus, Demas, and Luke join Paul, closing with grace to "your spirit" (plural, v. 25).'
    }
  ],
  gridChart: {
    headers: ['Topics', 'I. Paul appealed for Onesimus’s reception in love (vv. 1–16)', 'II. Paul sealed the reconciliation through partnership (vv. 17–25)'],
    rows: [
      { id: 'pg0', label: 'Epistolary Structure', cells: ['Opening: Salutation (vv. 1–3) & Thanksgiving/Prayer (vv. 4–7); Body: Appeal of Love (vv. 8–9) & Plea for Brother (vv. 10–16)', 'Body: Partnership Pledge (vv. 17–20), Confidence (v. 21), Guest Room (v. 22) & Closing Greetings/Grace (vv. 23–25)'] },
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
    "I. Paul appealed for the restoration of Onesimus by preparing Philemon’s heart and urging him to welcome the converted runaway as a beloved spiritual brother in Christ (1–16).",
    "A. Paul prepared Philemon’s heart through warm fellowship, prayers of thanksgiving, and affirmation of his proven love for all the saints (1–7).",
    "1. Paul warmly greeted Philemon, Apphia, Archippus, and the house church from his imprisonment, imparting divine grace and peace (1–3).",
    "2. Paul thanked God for Philemon’s faith and love, affirming his proven record of refreshing the hearts of the saints as the moral basis for his request (4–7).",
    "B. Paul interceded on behalf of converted Onesimus, appealing on the basis of love rather than apostolic command and redefining the slave as a beloved brother (8–16).",
    "1. Paul chose to appeal on the basis of love rather than commanding what was required, honoring Philemon’s personal agency and voluntary obedience (8–9).",
    "2. Paul urged Philemon to receive his spiritual child Onesimus back no longer merely as an enslaved servant, but as an eternal, beloved brother in the Lord (10–16).",
    "II. Paul sealed the reconciliation between master and slave by personally assuming Onesimus’s liabilities, expressing pastoral confidence, and establishing mutual accountability (17–25).",
    "A. Paul guaranteed full financial restitution for any wrong committed by Onesimus and voiced confident expectation that Philemon would exceed his request (17–21).",
    "1. Paul personally pledged in his own handwriting to repay any debt or loss incurred by Onesimus, absorbing the liability to restore fellowship (17–20).",
    "2. Paul expressed confident expectation in Philemon’s willing obedience, anticipating that he would do even more than requested in releasing Onesimus for ministry (21).",
    "B. Paul requested personal lodging in expectation of release through prayer and closed with warm greetings from his fellow laborers and a benediction of grace (22–25).",
    "1. Paul instructed Philemon to prepare a guest room in hopeful expectation that he would soon be granted to them through their corporate prayers (22).",
    "2. Paul conveyed greetings from five fellow laborers and closed with a corporate benediction anchoring the church in the sovereign grace of the Lord Jesus Christ (23–25)."
  ],
  argumentText: `The appeal of Paul’s Christlike leadership urged Philemon to receive his converted runaway slave Onesimus no longer as a slave, but as a beloved brother in Christ, securing gospel reconciliation through sacrificial love and personal accountability (Phlm 1–25).

I. Paul appealed for the restoration of Onesimus by preparing Philemon’s heart and urging him to welcome the converted runaway as a beloved spiritual brother in Christ (1–16).

A. Paul prepared Philemon’s heart through warm fellowship, prayers of thanksgiving, and affirmation of his proven love for all the saints (1–7).

1. Paul warmly greeted Philemon, Apphia, Archippus, and the house church from his imprisonment, imparting divine grace and peace (1–3).
Paul began his epistle not by asserting his apostolic rank or commanding immediate compliance, but by identifying himself as “a prisoner of Christ Jesus” (desmios Christou Iēsou, Phlm 1). Under Roman imperial custody, Paul was a chained convict awaiting Caesar’s judgment; yet under the sovereignty of the gospel, he viewed his chains not as a social disgrace, but as an emblem of his service to Christ. This deliberate choice of self-designation immediately established a posture of shared humility. Rather than speaking from an elevated pedestal of apostolic authority, Paul placed himself alongside Philemon, addressing him affectionately as “our beloved brother and fellow worker” (synergos, Phlm 1). Furthermore, by explicitly including Apphia (“our sister”), Archippus (“our fellow soldier”), and “the church in your house” (Phlm 2), Paul brought what Roman legal culture treated as an exclusively private domestic dispute into the sphere of corporate Christian accountability. In Roman society, the master held absolute legal dominion (dominica potestas) over the household, possessing unchecked authority to punish or execute an enslaved person. By greeting the entire local assembly, Paul placed Philemon’s impending decision within the supportive, witnessing fellowship of the church. He concluded his greeting with an apostolic blessing: “Grace to you and peace from God our Father and the Lord Jesus Christ” (Phlm 3), establishing divine grace rather than Roman law as the governing atmosphere of the letter.

2. Paul thanked God for Philemon’s faith and love, affirming his proven record of refreshing the hearts of the saints as the moral basis for his request (4–7).
Paul offered continuous prayers of thanksgiving for Philemon’s faith toward the Lord Jesus and his love for all the saints (Phlm 4–5). He prayed that “the fellowship of your faith may become effective through the knowledge of every good thing which is in you for Christ’s sake” (koinōnia tēs pisteōs sou, Phlm 6). Philemon had earned a reputation as a generous Christian patron whose hospitality continually strengthened the believers: “For I have had great joy and comfort in your love, because the hearts of the saints have been refreshed through you, brother” (Phlm 7). The Greek term for “hearts” (splagchna) refers to one’s deepest seat of compassion and affection. By commending Philemon for having refreshed (anapepautai) the splagchna of God’s people, Paul affirmed his friend’s established character. When Paul subsequently asked Philemon to receive Onesimus, he did not demand an alien virtue; he invited Philemon to act consistently with the generous love he had already displayed toward all the saints.

B. Paul interceded on behalf of converted Onesimus, appealing on the basis of love rather than apostolic command and redefining the slave as a beloved brother (8–16).

1. Paul chose to appeal on the basis of love rather than commanding what was required, honoring Philemon’s personal agency and voluntary obedience (8–9).
Although Paul possessed full apostolic authority in Christ to “order” (epitassein) Philemon to do what was proper, he intentionally renounced authoritarian command in favor of relational persuasion: “Therefore, though I have enough confidence in Christ to order you to do what is proper, yet for love’s sake I rather appeal to you—since I am such a person as Paul, the aged, and now also a prisoner of Christ Jesus” (Phlm 8–9). Here Paul demonstrated a foundational principle of biblical leadership: genuine spiritual leadership values voluntary, love-motivated obedience far above forced compliance. Authoritarian leaders demand external conformity through decrees and institutional coercion; biblical leaders appeal to the regenerated heart, honoring the follower’s personal dignity and moral agency. Describing himself as “the aged” (presbytēs)—an elder whose years of missionary hardship and present chains carried immense moral weight—Paul wielded his authority with gentleness. By appealing “for love’s sake” (dia tēn agapēn), he ensured that Philemon’s response would be an act of genuine Christian virtue rather than grudging submission (Phlm 14).

2. Paul urged Philemon to receive his spiritual child Onesimus back no longer merely as an enslaved servant, but as an eternal, beloved brother in the Lord (10–16).
Paul unveiled the specific subject of his appeal: “I appeal to you for my child Onesimus, whom I have fathered in my imprisonment” (Phlm 10). In the ancient world, the name Onesimus was a common slave name meaning “useful” or “profitable.” Paul utilized a vivid wordplay on his name: “who formerly was useless to you, but now is useful both to you and to me” (Phlm 11). As an unconverted runaway, Onesimus had lived down to the ancient stereotype of an untrustworthy servant (achrēstos); but through his conversion to Christ under Paul’s ministry, he had become genuinely useful (euchrēstos). Paul sent Onesimus back in person, describing the returning servant as “my very heart” (ta ema splagchna, Phlm 12)—using the exact term previously applied to the saints whom Philemon refreshed in verse 7. Although Paul desired to retain Onesimus in Rome so that the young convert might minister to him during his imprisonment (Phlm 13), he refused to act unilaterally: “but without your consent I did not want to do anything, so that your goodness would not be, in effect, by compulsion, but of your own free will” (Phlm 14). Paul then framed the crisis through the lens of divine providence: “For perhaps he was for this reason separated from you for a while, that you would have him back forever, no longer as a slave, but more than a slave, a beloved brother, especially to me, but how much more to you, both in the flesh and in the Lord!” (Phlm 15–16). In Roman law, Onesimus was merely a fugitive piece of property subject to punishment. But Paul elevated the entire relationship into the kingdom of God. Onesimus’s temporary departure had been redirected by God so that Philemon might receive him back as an eternal spiritual brother, redefining Roman social hierarchy into Christian brotherhood.

II. Paul sealed the reconciliation between master and slave by personally assuming Onesimus’s liabilities, expressing pastoral confidence, and establishing mutual accountability (17–25).

A. Paul guaranteed full financial restitution for any wrong committed by Onesimus and voiced confident expectation that Philemon would exceed his request (17–21).

1. Paul personally pledged in his own handwriting to repay any debt or loss incurred by Onesimus, absorbing the liability to restore fellowship (17–20).
Paul grounded his plea for Onesimus in his personal partnership with Philemon: “If then you regard me as a partner, accept him as you would me” (Phlm 17). The term partner (koinōnon) was used in ancient legal and commercial arrangements to designate partners sharing mutual rights and liabilities. Paul asked Philemon to transfer the honor and welcome due to an apostle directly onto the returning slave. To remove any economic obstacle arising from stolen property or lost labor, Paul wrote a formal promissory note: “And if he has wronged you in any way or owes you anything, charge that to my account; I, Paul, am writing this with my own hand, I will repay it” (Phlm 18–19a). In antiquity, executing a debt agreement (cheirographon) in one’s own handwriting created an legally binding obligation. Paul stepped between master and slave, personally absorbing the financial cost of reconciliation. Yet he gently reminded Philemon of a deeper reality: “(not to mention to you that you owe to me even your own self as well)” (Phlm 19b). Philemon had received the gospel and eternal life through Paul’s ministry; any monetary debt Onesimus owed Philemon was minuscule compared to the spiritual debt Philemon owed Paul. Paul concluded: “Yes, brother, let me benefit from you in the Lord; refresh my heart in Christ” (Phlm 20), asking Philemon to refresh Paul’s splagchna by forgiving Onesimus.

2. Paul expressed confident expectation in Philemon’s willing obedience, anticipating that he would do even more than requested in releasing Onesimus for ministry (21).
Paul voiced confident assurance in Philemon’s spiritual maturity: “Having confidence in your obedience, I write to you, since I know that you will do even more than what I say” (Phlm 21). Biblical leaders motivate others through positive trust rather than suspicion. Paul’s declaration of confidence inspired Philemon to rise above baseline expectations. While Paul had explicitly requested that Philemon receive Onesimus as a beloved brother (v. 16) and partner (v. 17), his confidence that Philemon would “do even more than what I say” (hyper ha legō) pointed toward formal emancipation and releasing Onesimus for gospel ministry.

B. Paul requested personal lodging in expectation of release through prayer and closed with warm greetings from his fellow laborers and a benediction of grace (22–25).

1. Paul instructed Philemon to prepare a guest room in hopeful expectation that he would soon be granted to them through their corporate prayers (22).
Paul added immediate personal accountability to his appeal by requesting lodging: “At the same time also prepare me a guest room, for I hope that through your prayers I will be gave back to you” (Phlm 22). In the Greco-Roman world, providing hospitality (xenian) was an essential duty. Paul’s anticipated visit meant that Philemon’s treatment of Onesimus would soon be evaluated in person. Loving pastoral accountability ensured that spiritual convictions were translated into tangible action.

2. Paul conveyed greetings from five fellow laborers and closed with a corporate benediction anchoring the church in the sovereign grace of the Lord Jesus Christ (23–25).
Paul conveyed greetings from Epaphras, his “fellow prisoner in Christ Jesus” (Phlm 23), and four fellow workers: Mark, Aristarchus, Demas, and Luke (Phlm 24). The mention of Mark is especially poignant. Years earlier, Mark had deserted Paul and Barnabas in Pamphylia (Acts 13:13), causing a sharp contention between the missionaries (Acts 15:37–39). Yet here Mark stood fully restored as Paul’s valued coworker in Rome. Mark served as a living example of restorative leadership. If Paul could restore a deserter like Mark, Philemon could forgive and restore a runaway like Onesimus. Paul closed his letter with a corporate benediction: “The grace of the Lord Jesus Christ be with your spirit” (Phlm 25). The plural pronoun “your spirit” (hymōn) created an inclusio with the opening greeting in verse 3, placing the entire letter and Philemon’s decision under the grace of Christ.`
});

const createDefaultMarkArgument = () => ({
  bookChartTheme: "The authority and power of Jesus Christ",
  bookNameLabel: "Mark",
  actorRowLabel: "Involved party",
  gradeRowLabel: "Faith",
  introductoryMaterial: `Introduction
Mark 4:35–5:43 records a tightly structured sequence of four miracles demonstrating Jesus' supreme authority over cosmic nature, demonic legions, chronic defilement, and death itself, contrasting fear and unbelief with genuine faith.

Theme
The authority and power of Jesus Christ`,
  bookChart: [
    { id: 'm1', segment: '4:35–41', title: '', grade: 'No faith', actor: 'Jews', groupHeader: 'Jesus’ authority over the physical and spiritual world', subGroupHeader: 'Jesus calms the wind and sea', relations: 'Test of Faith: Fierce gale vs. Great calm. Jesus rebukes the wind and asks the disciples: "Why are you afraid? Do you still have no faith?"' },
    { id: 'm2', segment: '5:1–13', title: 'Recognition', grade: 'Submissive', actor: 'Demons', groupHeader: 'Jesus’ authority over the physical and spiritual world', subGroupHeader: 'Jesus commands the demons', relations: 'Demons recognize Jesus\' supreme authority and beg permission to enter the swine.' },
    { id: 'm3', segment: '5:14–20', title: 'Gentiles’ response', grade: 'Mixed faith', actor: 'Gentiles', groupHeader: 'Jesus’ authority over the physical and spiritual world', subGroupHeader: 'Jesus commands the demons', relations: 'Townspeople beg Jesus to leave in fear, while the restored man begs to follow Him and proclaims His mercy.' },
    { id: 'm4', segment: '5:21–24', title: 'Desperate father', grade: 'Half faith', actor: 'Jewish leader', groupHeader: 'Jesus’ authority over disease and death', subGroupHeader: 'Jesus brings healing', relations: 'Initial Faith (Markan Sandwich Part 1): Jairus falls at Jesus\' feet pleading urgently for his dying daughter.' },
    { id: 'm5', segment: '5:25–34', title: 'Desperate woman', grade: 'Full Faith', actor: 'Jewish outcast', groupHeader: 'Jesus’ authority over disease and death', subGroupHeader: 'Jesus brings healing', relations: 'Interpolation / Model of Faith: 12-year hemorrhage; touches Jesus\' cloak in bold faith: "Daughter, your faith has made you well."' },
    { id: 'm6', segment: '5:35–43', title: '', grade: 'Full Faith', actor: 'Jewish family', groupHeader: 'Jesus’ authority over disease and death', subGroupHeader: 'Jesus raises the dead', relations: 'Climactic Faith (Markan Sandwich Part 2): 12-year-old girl dies; "Do not be afraid any longer, only believe" — raised to life.' }
  ],
  gridChart: {
    headers: ['Comparative Aspect', 'I. Natural & Supernatural Powers (4:35–5:20)', 'II. Sickness & Death (5:21–43)'],
    rows: [
      { id: 'mg1', label: 'Realm of Authority', cells: ['Cosmic Nature (Wind/Sea) & Supernatural Evil (Legion)', 'Chronic Disease (12 yrs) & Physical Death (12 yrs old)'] },
      { id: 'mg2', label: 'Involved Party & Faith', cells: ['Disciples (Little faith) & Demon-possessed man (Growing faith)', 'Jairus (Desperate -> Tested faith) & Bleeding woman (Bold faith)'] }
    ]
  },
  simpleOutline: `Theme: The mighty deeds of Jesus before everyone

I. Authority over natural & supernatural powers (4:35–5:20)
   A. Power over wind and sea (4:35–41)
      1. Calming the storm (4:35–41)
   B. Power over demonic forces (5:1–20)
      1. Restoring the possessed man (5:1–20)

II. Authority over sickness & death (5:21–43)
   A. Power to heal the incurable & raise the dead (5:21–43)
      1. Jairus’s plea for his daughter (5:21–24)
      2. Healing of the bleeding woman (5:25–34)
      3. Raising Jairus’s daughter to life (5:35–43)`,
  sentenceOutline: [
    "Theme: Jesus performs mighty deeds before everyone to reveal His divine authority and call people to faith.",
    "I. In Mark 4:35–5:20, Jesus shows His authority over natural and supernatural powers by calming the storm and freeing a demon-possessed man.",
    "A. In 4:35–41, Jesus demonstrates His power over the wind and the sea by calming a violent storm with His word.",
    "1. In 4:35–41, Jesus rebukes the wind and waves, bringing complete calm and revealing the disciples’ lack of faith.",
    "B. In 5:1–20, Jesus demonstrates His power over demonic forces by delivering a man possessed by a legion of demons.",
    "1. In 5:1–20, Jesus casts out the unclean spirits, restores the man to his right mind, and sends him to proclaim God’s mercy."
  ],
  argumentText: `Theme: Jesus performs mighty deeds before everyone to reveal His divine authority and call people to faith.

I. Authority over natural & supernatural powers (4:35–5:20)

In this section, Mark shows Jesus’ supreme authority over both the physical creation and the spiritual realm. Through these events, Jesus reveals His divine power and challenges people to respond in faith rather than fear.

A. Power over wind and sea (4:35–41)
In 4:35–41, as Jesus and His disciples cross the Sea of Galilee, a violent windstorm arises and threatens to sink the boat. While the disciples panic, Jesus remains asleep, showing His peaceful trust and control. When they wake Him in fear, Jesus rebukes the wind and commands the sea, “Peace! Be still!” Immediately, the storm ceases, and there is a great calm. He then confronts the disciples for their fear and lack of faith. Filled with awe, they ask who He is that even the wind and sea obey Him, pointing to His divine authority over nature.

B. Power over demonic forces (5:1–20)
In 5:1–20, Jesus crosses into the region of the Gerasenes and meets a man controlled by a legion of unclean spirits. This man lives among the tombs, cannot be restrained by anyone, and continually cries out and harms himself, showing the destructive power of demonic bondage. When he sees Jesus, the demons recognize His authority and beg Him not to torment them. Jesus permits them to enter a herd of pigs, which then rush into the sea and drown, visibly proving the man’s complete deliverance. The townspeople, seeing the man sitting clothed and in his right mind, respond in fear and ask Jesus to leave. In contrast, the restored man desires to follow Jesus, showing growing faith. Jesus sends him home to proclaim what the Lord has done and how He has shown him mercy, making him a witness to everyone in the Decapolis.`
});

const initialAppState: StudentAppState = {
  taskStatus: {},
  taskScores: {},
  actsObservations: [],
  jonahLog: {
    readings: [
      { id: 1, date: '', time: '', translation: '', completed: false },
      { id: 2, date: '', time: '', translation: '', completed: false },
      { id: 3, date: '', time: '', translation: '', completed: false },
      { id: 4, date: '', time: '', translation: '', completed: false },
      { id: 5, date: '', time: '', translation: '', completed: false },
    ],
    valueReflection: '',
    fifthReadingInsights: '',
    purposeThoughts: ''
  },
  johnQuestions: [],
  disciplesChart: {
    matthew10: Array(12).fill(''),
    mark3: Array(12).fill(''),
    luke6: Array(12).fill(''),
    acts1: Array(12).fill(''),
    observations: ''
  },
  helperStudy: {
    step1Culture: '',
    step2HebrewNum: '',
    step2GreekNum: '',
    step3OtObservations: '',
    step4Synthesis: ''
  },
  conflictResolution: {
    cultureName: 'Telugu Indian culture (South Asian diaspora, characterized by high power distance, strict elder/pastoral authority, honor–shame dynamics [maanam/avamaanam], and preservation of outward social harmony).',
    unbelieverMethod: 'Unbelievers in Telugu culture prioritize "face-saving" (maanam) and avoid direct confrontation. Interpersonal hostility is channeled through cold silence, emotional withdrawal, passive aggression, and triangulation (venting to relatives/caste networks to rally factions). When disputes become uncontainable, traditional family or village elder councils (peddalu/panchayats) arbitrate; however, secular elders prioritize maintaining hierarchical status and social peace over moral truth or repentance. The junior or weaker party is pressured to touch feet and apologize regardless of innocence. Unresolved offenses often escalate into lifelong family boycotts or vindictive police/court cases (FIRs).',
    believerMethod: `Believers frequently syncretize cultural defaults with pious language rather than obeying Scripture:

1. When the Believer is in the Wrong (Neglect of Matt 5:23–24): Offending believers rarely initiate reconciliation because admitting guilt is seen as a humiliating loss of face. Instead, they attempt spiritualized compensation through intense religious performance (tithing, 40-day fasting, choir singing). Pastors and elders almost never apologize to junior members or laypersons, weaponizing "Touch not the Lord's anointed" (1 Chr 16:22) to silence valid grievances.

2. When the Believer is in the Right (Perversion of Matt 18:15–17): Rather than going privately to win the sinning brother alone, offended Christians broadcast offenses across the congregation disguised as "prayer requests." When mediation fails, believers resort to silent boycotts or church splitting rather than practicing patient, witness-backed redemptive discipline.`,
    studentStudent: `Within the multicultural community of EAST (East Asia School of Theology), students must resolve peer conflicts by explicitly distinguishing who is in the right and who is in the wrong:

• When Student A is in the Wrong (The Offender — Matt 5:23–24): If Student A commits an offense (e.g., culturally insensitive remark, broken ministry team obligation, dorm conflict) and realizes a peer has a grievance, Student A must pause religious activities (chapel, prayer leadership), take the initiative to approach Peer B privately, confess the specific sin without excuses, ask forgiveness, and offer tangible restitution.

• When Student A is in the Right / Peer B is in the Wrong (The Offended Party — Matt 18:15–17):
  - Step 1: Go privately alone to Peer B in a gentle spirit (Gal 6:1) to win the brother; refuse to vent to national affinity groups or WhatsApp chats.
  - Step 2: If resisted, invite 1–2 mature, neutral EAST peers (e.g., Student Council officer, mutual prayer partner) as objective witnesses to appeal to conscience.
  - Step 3: If still unrepentant, bring the matter to the Dean of Students and Student Affairs Committee for corporate spiritual mediation.
  - Step 4: If unheeded, enact redemptive community discipline (suspension of leadership/privileges) aiming at ultimate repentance.`,
    studentFaculty: `Navigating the high power distance between Asian students and theological faculty requires biblical clarity regarding right vs. wrong:

• When the Student is in the Wrong (The Offender — Matt 5:23–24): If a student commits academic dishonesty (plagiarism, unauthorized AI use), disrespectful speech, or false accusations against a lecturer, the student must not evade or manipulate. Following Matt 5:23–24, the student must schedule a private office appointment, make full confession of sin, and submit humbly to academic penalties (zero grade, course repetition, probation) to restore integrity before God and faculty.

• When the Student is in the Right / Faculty is in the Wrong (The Offended Party — Matt 18:15–17 & 1 Tim 5:1): If a lecturer makes an objective grading error, unfair public rebuke, or cultural insult, the student must not nurse silent resentment or incite student boycotts. Scripture commands an honoring posture: "Do not sharply rebuke an older man, but appeal to him as a father" (1 Tim 5:1).
  - Step 1: The student schedules a private office meeting, presenting objective evidence (rubric, syllabus, notes) calmly and humbly to give the professor opportunity to correct the error without losing face.
  - Step 2: If the lecturer is defensive or punitive, the student brings their assigned academic mentor or resident faculty advisor as an impartial biblical witness.
  - Step 3: If unresolved, the student submits a formal petition through EAST's official grievance procedure to the Academic Dean.`,
    facultyFaculty: `Theological educators must model Christlike peacemaking, setting aside academic pride, tenure, and professional rivalry:

• When Faculty Member A is in the Wrong (The Offender — Matt 5:23–24): If Professor A criticizes Colleague B to students, misrepresents Colleague B's doctrine, or usurps departmental resources, academic prestige provides zero exemption from Christ's command. Professor A must suspend lecture preparation or public preaching, go directly to Colleague B's office, confess pride and breach of trust, and restore Colleague B's reputation.

• When Faculty Member A is in the Right / Colleague B is in the Wrong (The Offended Party — Matt 18:15–17): If Colleague B promotes unorthodox doctrine, compromises institutional integrity, or mistreats staff, Professor A must strictly reject academic politics, lobbying, and faculty voting blocs.
  - Step 1: Approach Colleague B privately colleague-to-colleague with theological clarity and brotherly love.
  - Step 2: If resisted, engage 1–2 senior department heads or senior professors as impartial theological adjudicators.
  - Step 3: Escalate to the Academic Dean and President for formal academic hearings.
  - Step 4: If Colleague B defies corporate spiritual authority, enact institutional and ecclesiastical separation to preserve doctrinal purity and prompt ultimate repentance.`
  },
  researchPapers: {
    slavery: {
      title: COMPLETE_SLAVERY_PAPER.title,
      outline: { ...COMPLETE_SLAVERY_PAPER.outline },
      sources: [...COMPLETE_SLAVERY_PAPER.sources]
    },
    jonahBackground: {
      title: "Jonah Background Paper",
      outline: {
        intro: '',
        israelState: '',
        ninevehImportance: '',
        egyptImportance: '',
        levantDynamics: '',
        summary: ''
      },
      sources: []
    }
  },
  arguments: {
    mark: createDefaultMarkArgument(),
    jonah: createDefaultJonahArgument(),
    philemon: createDefaultPhilemonArgument(),
    custom: createEmptyArgument()
  },
  infographic: {
    infographicNotes: `A4 Portrait 3-Pillar Architectural Blueprint (“From Information to Transformation” — Ezra 7:10; 2 Tim 2:15; Jas 1:22–25):
1. STEP 1: OBSERVATION (“What Do I See?” — Deep Detective Blue)
   • Box 1A: 10 Reading Strategies (Thoughtfully, Repeatedly 5x, Patiently, Selectively, Prayerfully, Imaginatively, Meditatively, Purposefully, Acquisitively, Telescopically) + 6 Investigative Questions (Who, What, Where, When, Why, Wherefore).
   • Box 1B: 4 Core Elements (Terms, Grammatical/Literary Structure, Genre, Atmosphere) + 6 Things to Look For (Emphasized, Repeated, Related, Alike, Unlike/Contrast, True to Life).
   • Box 1C: Paragraph = Basic Unit of Thought (2–4 word titles) + Laws of Structure (Comparison, Contrast, Repetition, Climax, Cruciality/Pivot, Particularization/Generalization, Causation/Substantiation, Instrumentation, Interrogation, Proportion).
   • Box 1D: Visual Charting — Hierarchical Book Chart (Red Theme, Orange Major Divisions, Blue Sub-Divisions, Green 2–4 Word Paragraph Titles + Topics Grid) & Comparative Grid Chart.

2. STEP 2: INTERPRETATION (“What Does It Mean?” — Deep Scholar Gold)
   • Box 2A: The Five Principles of Interpretation (“The 5 C’s”): (1) Content (Word Studies, e.g., Hebrew ‘ezer #5826 in Gen 2:18), (2) Context (Immediate, Book, Satellite Story of the Bible), (3) Comparison (Scripture interprets Scripture), (4) Cultural & Historical Background (1st-c. Roman slavery in Philemon; 8th-c. BC Assyria/Nineveh in Jonah), (5) Consultation (commentaries/dictionaries last).
   • Box 2B: Literary Genre Principles — Narrative, Hebrew Poetry (Parallelism in Jonah 2:2–9), Parables (One central truth in Luke 15), Epistles (Opening/Body/Closing), OT Prophecy & Apocalyptic.
   • Box 2C: Synthesizing an Argument — Introductory Material, Book Chart & Word-for-Word Simple Outline, Sentence Outline (“The reason for [Subject] is to show [Complement]”), & Written Argument.

3. STEP 3: APPLICATION (“How Does It Work?” — Deep Disciple Green)
   • Box 3A: Reject the 4 Counterfeit Substitutes for Application (Substituting Interpretation for Application, Superficial Obedience for Substantive Change, Cultural Rationalization for Repentance [Matt 5:23–24; 18:15–17], Emotional Feeling for Volitional Action).
   • Box 3B: The 4-Step Process of Application & Cultural Bridge — (1) Know (Text & Self), (2) Relate (Timeless Theological Principle vs. Cultural Vehicle, 1 Cor 16:20), (3) Meditate (God, Self, Church, World), (4) Practice (Specific, measurable obedience — receptive & reproductive).`,
    audienceSize: '8 cell group / discipleship group members',
    presentationDate: 'November 2026 (Due Nov 12)',
    zoomLink: 'On-site / Hybrid (with printed A4 IBSM Infographic handouts)',
    lessonPlan: `00:00–10:00 (10m) | I. Introduction & Visual Design Rationale:
  • Hook: “The Bible was not given for our information, but for our transformation” (Ezra 7:10; 2 Tim 2:15; Jas 1:22–25).
  • 4 Reasons for Firsthand Discovery (Bite 02): Think for yourself, evaluate others, joy of discovery, fall in love with the Author.
  • Overview of the A4 3-Color Blueprint: Detective Blue (Observation) ➔ Scholar Gold (Interpretation) ➔ Disciple Green (Application).

10:00–32:00 (22m) | II. Step 1: Observation — “What Do I See?” (Boxes 1A–1D):
  • Box 1A (6m): 10 Strategies for First-Rate Reading (illustrated with reading Jonah 5x in one sitting) & 6 Investigative Questions (Who, What, Where, When, Why, Wherefore — illustrated with 30 questions on John 8:1–11).
  • Box 1B (6m): 4 Core Elements (Terms, Structure, Genre, Atmosphere) & 6 Things to Look For (illustrated with 25 observations on Acts 1:8 and stated purpose in Luke 1:1–4 & John 20:30–31).
  • Boxes 1C & 1D (10m): Paragraph as the basic unit (2–4 word titles), Major Laws of Structure (Contrast, Repetition, Climax, Interrogation), & Visual Charting (Mark 4:35–5:43 & Jonah 1–4 Hierarchical Book Charts; 12 Disciples Comparative Grid Chart).

32:00–55:00 (23m) | III. Step 2: Interpretation — “What Does It Mean?” (Boxes 2A–2C):
  • Bridge: “The more time you spend in observation, the less time you will spend in interpretation, and the more accurate will be your results.”
  • Box 2A (12m): The Five Principles (“The 5 C’s”): Content (Hebrew ‘ezer #5826 word study in Gen 2:18), Context (Immediate, Book, Satellite Story of the Bible), Comparison, Cultural/Historical Background (Roman slavery in Philemon; Nineveh in Jonah), & Consultation.
  • Boxes 2B & 2C (11m): Genre lenses (Narrative, Hebrew Poetry parallelism in Jonah 2:2–9, Parables in Luke 15, Epistles, Prophecy) & Synthesizing into a 4-part Argument (“The reason for... is to show...”).

55:00–72:00 (17m) | IV. Step 3: Application — “How Does It Work?” (Boxes 3A–3B):
  • Box 3A (8m): Exposing the 4 Counterfeit Substitutes for Application (illustrated with Jonah 4 and cultural “face-saving” vs. biblical conflict resolution in Matt 5:23–24 & 18:15–17).
  • Box 3B (9m): The 4-Step Process of Application (Know, Relate, Meditate, Practice) & Cultural Application Bridge (“holy kiss” in 1 Cor 16:20).

72:00–102:00 (30m) | V. Interactive Group Q&A Session (30 minutes)`,
    questionsLogged: `1. Q: “Why should we keep Study Bibles and commentaries closed during Step 1 (Observation)?”
   A: Reading commentaries too early locks our eyes into someone else’s framework and robs us of firsthand discovery (Bite 02). Commentaries belong in Step 2, Principle 5 (Consultation) to check and refine our firsthand work.

2. Q: “How do I know where one paragraph ends and the next begins when building a Book Chart?”
   A: Watch for shifts in the 5 structural factors (Bite 08): changes in key persons/actors, geographical setting, time markers, events, or literary genre (e.g., Jonah 2 shifting from narrative in 2:1 to Hebrew poetry in 2:2–9).

3. Q: “Can someone who doesn’t know Hebrew or Greek still do an accurate Word Study like ‘ezer in Genesis 2:18?”
   A: Yes! Using Strong’s Exhaustive Concordance or free tools like STEP Bible / Blue Letter Bible, anyone can look up the Strong’s number (#5826 ‘ezer) and compare how that underlying Hebrew/Greek word is used across Scripture.

4. Q: “How do we distinguish cultural practices (like the ‘holy kiss’ in 1 Cor 16:20) from timeless commands?”
   A: Apply the 4 Principles of Cultural Application (Bite 12): determine what the practice meant in its original context, extract the timeless theological truth (warm, genuine Christian love/welcome), and express it through today’s faithful cultural equivalent.`,
    reportNotes: `IBSM INFOGRAPHIC SHARING / TEACHING REPORT (200 Points)
• Group Shared/Taught: Church Cell Group / Discipleship Group (8 participants, excluding myself)
• Session Duration & Mode: 70 minutes teaching + 30 minutes Q&A (On-site/Hybrid with printed A4 handouts)
• What Was Helpful / New Learning for Participants:
  1) Having the entire IBSM workflow color-coded on one A4 page (Blue Detective ➔ Gold Scholar ➔ Green Disciple) prevented jumping straight from reading a verse to personal application without context.
  2) Learning to read a short book repeatedly (Jonah 5x) and ask the 6 Investigative Questions on John 8:1–11 and Acts 1:8 showed how much detail they previously skimmed over.
  3) The Genesis 2:18 word study on ‘ezer (“strong deliverer/rescuer”) and the Four Counterfeit Substitutes for Application (especially cultural “face-saving” vs. Matt 5:23–24; 18:15–17) were deeply practical.
• Suggestions for Improvement from Participants:
  1) Include brief everyday synonyms next to technical structural terms like “Particularization,” “Substantiation,” and “Instrumentation.”
  2) Add a 10-minute hands-on mini-exercise in the middle of the session where participants title a short 4-verse paragraph together.
• Personal Reflection & Assessment:
  Teaching the full IBSM cycle for 70 minutes and answering 30 minutes of live questions crystallized how Observation, Interpretation, and Application lock together into one unified discipline (Ezra 7:10). I would gladly teach this session again with a back-page practice worksheet on Mark 4:35–41!`
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schedule' | 'workspace'>('dashboard');
  const [appState, setAppState] = useState<StudentAppState>(initialAppState);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge to ensure default structures exist if new fields were added
        setAppState({
          ...initialAppState,
          ...parsed,
          taskStatus: parsed.taskStatus || {},
          taskScores: parsed.taskScores || {},
          actsObservations: parsed.actsObservations || [],
          jonahLog: parsed.jonahLog || initialAppState.jonahLog,
          johnQuestions: parsed.johnQuestions || [],
          disciplesChart: parsed.disciplesChart || initialAppState.disciplesChart,
          helperStudy: parsed.helperStudy || initialAppState.helperStudy,
          conflictResolution: (() => {
            const cr = parsed.conflictResolution || initialAppState.conflictResolution;
            if (!cr.cultureName || cr.cultureName.trim() === '') {
              return initialAppState.conflictResolution;
            }
            return cr;
          })(),
          researchPapers: (() => {
            const rp = parsed.researchPapers || initialAppState.researchPapers;
            if (!rp.slavery || !rp.slavery.outline?.intro || Object.keys(rp.slavery.outline).length < 5) {
              return {
                ...rp,
                slavery: {
                  title: COMPLETE_SLAVERY_PAPER.title,
                  outline: { ...COMPLETE_SLAVERY_PAPER.outline },
                  sources: (rp.slavery?.sources && rp.slavery.sources.length >= 2) ? rp.slavery.sources : [...COMPLETE_SLAVERY_PAPER.sources]
                }
              };
            }
            return rp;
          })(),
          arguments: (() => {
            const merged = { ...initialAppState.arguments };
            const parsedArgs = parsed.arguments;
            if (!parsedArgs) return merged;
            (['mark', 'jonah', 'philemon', 'custom'] as const).forEach(k => {
              if (parsedArgs[k] && 'introductoryMaterial' in parsedArgs[k]) {
                // Auto-upgrade saved Jonah or Mark chart if missing subGroupHeader, numbering prefixes, or older titles/responses
                const firstRow = parsedArgs[k].bookChart?.[0];
                const secondRow = parsedArgs[k].bookChart?.[1];
                const fifthRow = parsedArgs[k].bookChart?.[4];
                const hasNumberingPrefix = firstRow && (/^[IVX]+\.\s/.test(firstRow.groupHeader || '') || /^[A-Z]\.\s/.test(firstRow.subGroupHeader || ''));
                const hasLegacyJonahFields = k === 'jonah' && ((parsedArgs[k].bookChart?.length || 0) < 9 || secondRow?.title === 'Sailors plead in the storm' || fifthRow?.grade === 'Reluctant preaching' || parsedArgs[k].bookChartTheme === 'The sovereign compassion of God over all peoples' || !parsedArgs[k].introductoryMaterial?.includes('pastoral') && parsedArgs[k].sentenceOutline?.[0]?.includes('God reveals') || parsedArgs[k].argumentText?.includes('The reason for the'));
                const isLegacyFormat = (k === 'jonah' || k === 'mark' || k === 'philemon') && (!firstRow?.subGroupHeader || hasNumberingPrefix || hasLegacyJonahFields);
                if (((k === 'jonah' || k === 'mark' || k === 'philemon') && (!parsedArgs[k].bookChart || parsedArgs[k].bookChart.length === 0)) || isLegacyFormat) {
                  const defaultPreset = k === 'jonah' ? createDefaultJonahArgument() : k === 'philemon' ? createDefaultPhilemonArgument() : createDefaultMarkArgument();
                  merged[k] = {
                    ...defaultPreset,
                    introductoryMaterial: (k === 'jonah' && (!parsedArgs[k].introductoryMaterial?.includes('pastoral') && parsedArgs[k].sentenceOutline?.[0]?.includes('God reveals') || parsedArgs[k].argumentText?.includes('The reason for the'))) ? defaultPreset.introductoryMaterial : (parsedArgs[k].introductoryMaterial || defaultPreset.introductoryMaterial),
                    bookChartTheme: defaultPreset.bookChartTheme,
                    bookNameLabel: defaultPreset.bookNameLabel,
                    actorRowLabel: defaultPreset.actorRowLabel,
                    gradeRowLabel: defaultPreset.gradeRowLabel,
                    bookChart: defaultPreset.bookChart,
                    gridChart: defaultPreset.gridChart,
                    simpleOutline: defaultPreset.simpleOutline,
                    sentenceOutline: defaultPreset.sentenceOutline,
                    argumentText: defaultPreset.argumentText
                  };
                } else {
                  merged[k] = parsedArgs[k];
                }
              } else if (parsedArgs[k] && 'thesis' in parsedArgs[k]) {
                merged[k] = {
                  ...createEmptyArgument(),
                  introductoryMaterial: `Migrated Thesis: ${parsedArgs[k].thesis || ''}`,
                  argumentText: `Migrated Support Details:\n${parsedArgs[k].supportDetails || ''}\n\nMigrated Synthesis:\n${parsedArgs[k].synthesis || ''}`
                };
              }
            });
            return merged;
          })(),
          infographic: (parsed.infographic && parsed.infographic.infographicNotes) ? parsed.infographic : initialAppState.infographic
        });
      } catch (e) {
        console.error("Error loading student state:", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  const toggleTaskStatus = (taskId: string) => {
    setAppState(prev => {
      const currentStatus = prev.taskStatus[taskId] || 'not_started';
      const nextStatus = currentStatus === 'done' ? 'not_started' : 'done';
      return {
        ...prev,
        taskStatus: {
          ...prev.taskStatus,
          [taskId]: nextStatus
        }
      };
    });
  };

  const markTaskDone = (taskId: string, isDone: boolean) => {
    setAppState(prev => ({
      ...prev,
      taskStatus: {
        ...prev.taskStatus,
        [taskId]: isDone ? 'done' : 'not_started'
      }
    }));
  };

  const resetData = () => {
    if (window.confirm("WARNING: This will clear all your logged observations, questions, and readings. Are you sure you want to reset all data?")) {
      setAppState(initialAppState);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard appState={appState} />;
      case 'schedule':
        return <Schedule appState={appState} toggleTaskStatus={toggleTaskStatus} />;
      case 'workspace':
        return (
          <Workspace
            appState={appState}
            setAppState={setAppState}
            markTaskDone={markTaskDone}
          />
        );
      default:
        return <Dashboard appState={appState} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar Navigation */}
      <aside 
        style={{
          width: '280px',
          background: 'var(--color-bg-sidebar)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem 1.5rem',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Logo Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--color-accent-gold) 0%, var(--color-primary) 100%)',
              padding: '0.65rem',
              borderRadius: '10px',
              color: '#060b09',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Book size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--color-accent-gold)', margin: 0, lineHeight: 1.1 }}>
                EAST Campus
              </h2>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                Syllabus Companion
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                background: activeTab === 'dashboard' ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                color: activeTab === 'dashboard' ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
                border: activeTab === 'dashboard' ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 500,
                textAlign: 'left',
                transition: 'all var(--transition-fast)'
              }}
            >
              <LayoutDashboard size={18} />
              <span>Course Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                background: activeTab === 'schedule' ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                color: activeTab === 'schedule' ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
                border: activeTab === 'schedule' ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 500,
                textAlign: 'left',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Calendar size={18} />
              <span>Weekly Schedule</span>
            </button>

            <button
              onClick={() => setActiveTab('workspace')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                background: activeTab === 'workspace' ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                color: activeTab === 'workspace' ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
                border: activeTab === 'workspace' ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 500,
                textAlign: 'left',
                transition: 'all var(--transition-fast)'
              }}
            >
              <BookOpen size={18} />
              <span>Study Workspace</span>
            </button>
          </nav>

          {/* Quick Submissions Download Box */}
          <div style={{ 
            marginTop: '1.25rem',
            background: 'rgba(212, 175, 55, 0.06)', 
            border: '1px solid rgba(212, 175, 55, 0.3)', 
            borderRadius: '10px', 
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-accent-gold)', fontSize: '0.8rem', fontWeight: 600 }}>
              <Download size={14} /> Submissions (.docx)
            </div>
            <a 
              href="/Roman-Slavery-in-the-First-Century-AD.docx" 
              download="Roman Slavery in the First Century AD.docx"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.65rem',
                background: 'rgba(212, 175, 55, 0.18)',
                color: 'var(--color-accent-gold-light)',
                borderRadius: '6px',
                fontSize: '0.78rem',
                textDecoration: 'none',
                fontWeight: 600,
                border: '1px solid rgba(212, 175, 55, 0.4)',
                transition: 'all 0.2s ease'
              }}
              title="Download final research paper on Roman Slavery (EAST / Turabian 9th ed.)"
            >
              <FileText size={13} /> Roman Slavery Paper
            </a>
            <a 
              href="/Philemon%20argument.docx" 
              download="Philemon argument.docx"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.6rem',
                color: 'var(--color-text-secondary)',
                borderRadius: '4px',
                fontSize: '0.74rem',
                textDecoration: 'none'
              }}
            >
              <FileText size={12} /> Philemon Argument
            </a>
            <a 
              href="/Jonah%20argument.docx" 
              download="Jonah argument.docx"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.6rem',
                color: 'var(--color-text-secondary)',
                borderRadius: '4px',
                fontSize: '0.74rem',
                textDecoration: 'none'
              }}
            >
              <FileText size={12} /> Jonah Argument
            </a>
          </div>
        </div>

        {/* Footer info / Reset */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <span>East Asia School of Theology</span>
            <br />
            <span>Singapore Campus</span>
          </div>
          
          <button 
            onClick={resetData}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.5rem',
              background: 'transparent',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '6px',
              color: '#fca5a5',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <RotateCcw size={12} /> Clear Local Progress
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2.5rem 3rem', overflowY: 'auto' }}>
        {renderActiveView()}
      </main>

    </div>
  );
};

export default App;
