import React from 'react';
import type { StudentInfographicPlan } from '../../types';
import { Download, Info, Calendar, MessageSquare, Compass, Upload, Play, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';
import { parseDocxText } from '../../utils/docxParser';

interface InfographicPlannerProps {
  infographic: StudentInfographicPlan;
  setInfographic: (plan: StudentInfographicPlan) => void;
  markTaskDone: (taskId: string, isDone: boolean) => void;
  isTaskCompleted: boolean;
}

export const InfographicPlanner: React.FC<InfographicPlannerProps> = ({
  infographic,
  setInfographic,
  markTaskDone,
  isTaskCompleted
}) => {

  const handleFieldChange = (field: keyof StudentInfographicPlan, value: string) => {
    setInfographic({
      ...infographic,
      [field]: value
    });
  };

  const loadMasterSample = () => {
    if (window.confirm("Load the complete Learning Task E17 A4 Infographic Blueprint, 60–75 Min Teaching Script Outline, 30-Min Q&A Log, and 200-pt Teaching Report?")) {
      setInfographic({
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
      });
    }
  };

  const handleDocxUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await parseDocxText(file);
      
      let reportNotes = text;
      let lessonPlan = infographic.lessonPlan;
      let infographicNotes = infographic.infographicNotes;
      let questionsLogged = infographic.questionsLogged;
      
      // Simple section parser based on keywords
      const lessonIdx = text.search(/LESSON\s+PLAN/i);
      const qaIdx = text.search(/Q&A|QUESTIONS/i);
      const reportIdx = text.search(/REPORT|REFLECTION/i);
      const infoIdx = text.search(/INFOGRAPHIC/i);
      
      if (lessonIdx !== -1 || qaIdx !== -1 || reportIdx !== -1 || infoIdx !== -1) {
        const sections = [
          { name: 'info', idx: infoIdx, keyword: 'INFOGRAPHIC' },
          { name: 'lesson', idx: lessonIdx, keyword: 'LESSON PLAN' },
          { name: 'qa', idx: qaIdx, keyword: 'Q&A' },
          { name: 'report', idx: reportIdx, keyword: 'REPORT' }
        ].filter(s => s.idx !== -1).sort((a, b) => a.idx - b.idx);
        
        for (let i = 0; i < sections.length; i++) {
          const current = sections[i];
          const next = sections[i + 1];
          const start = current.idx + current.keyword.length;
          const end = next ? next.idx : text.length;
          const sectionText = text.substring(start, end).replace(/^[:\-=\s\n\r]+/, '').trim();
          
          if (current.name === 'info') infographicNotes = sectionText;
          else if (current.name === 'lesson') lessonPlan = sectionText;
          else if (current.name === 'qa') questionsLogged = sectionText;
          else if (current.name === 'report') reportNotes = sectionText;
        }
      }
      
      if (window.confirm(`Successfully read ${file.name}! Load into report notes?`)) {
        setInfographic({
          ...infographic,
          infographicNotes,
          lessonPlan,
          questionsLogged,
          reportNotes
        });
        alert("Import completed!");
      }
    } catch (err: any) {
      alert(`Error reading file: ${err.message || err}`);
    }
  };

  const exportInfographicPlan = () => {
    const textContent = `BS510 Inductive Bible Study Method\nLearning Task E17: Infographic & Presentation Plan\n\n=== INFOGRAPHIC DESIGN NOTES ===\nVisual ideas, layout sketch notes:\n${infographic.infographicNotes || 'Pending'}\n\n=== PRESENTATION DETAILS ===\n- Date: ${infographic.presentationDate || 'Pending'}\n- Audience Size: ${infographic.audienceSize || 'Pending'}\n- Session Mode / Zoom Link: ${infographic.zoomLink || 'Pending'}\n\n=== LESSON PLAN ===\n(Outline of the 60-75 min session):\n${infographic.lessonPlan || 'Pending'}\n\n=== QUESTIONS FROM AUDIENCE (30-MIN Q&A) ===\n${infographic.questionsLogged || 'Pending'}\n\n=== INFOGRAPHIC REPORT CONTENT ===\nReflections and lessons learned:\n${infographic.reportNotes || 'Pending'}`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BS510_Infographic_Presentation_Report.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Learning Task E17</span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-accent-gold)' }}>Infographic & Presentation Planner</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={loadMasterSample}
            className="btn btn-secondary"
            style={{ border: '1px solid var(--color-accent-gold)', color: 'var(--color-accent-gold)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Sparkles size={16} /> Load E17 Complete Sample
          </button>
          <a
            href="/IBSM_Infographic_A4.png"
            download="IBSM_Infographic_A4.png"
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
          >
            <ImageIcon size={16} /> A4 Infographic (.PNG)
          </a>
          <a
            href="/IBSM Infographic & Teaching Script.docx"
            download="IBSM Infographic & Teaching Script.docx"
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
          >
            <FileText size={16} /> 300-pt Infographic &amp; Script (.DOCX)
          </a>
          <a
            href="/IBSM Infographic Teaching Report.docx"
            download="IBSM Infographic Teaching Report.docx"
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
          >
            <FileText size={16} /> 200-pt Teaching Report (.DOCX)
          </a>
          <label className="btn btn-secondary" style={{ border: '1px solid var(--color-accent-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0 }}>
            <Upload size={16} /> Upload Word Doc
            <input 
              type="file" 
              accept=".docx" 
              onChange={handleDocxUpload} 
              style={{ display: 'none' }} 
            />
          </label>
          <button 
            onClick={exportInfographicPlan} 
            className="btn btn-secondary"
          >
            <Download size={16} /> Export Notes (.TXT)
          </button>
          <button 
            onClick={() => markTaskDone('E17', !isTaskCompleted)} 
            className={`btn ${isTaskCompleted ? 'btn-primary' : 'btn-outline-gold'}`}
          >
            {isTaskCompleted ? '✓ Completed (500 pts)' : 'Mark Task Complete'}
          </button>
        </div>
      </div>

      {/* Rationale info card */}
      <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', borderLeft: '3px solid var(--color-accent-gold)' }}>
        <div style={{ color: 'var(--color-accent-gold)' }}>
          <Info size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Learning Task E17: A4 Infographic &amp; Teaching Session (500 Points — Due Nov 12)</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
            <strong>Part 1 (300 pts):</strong> Design an A4-size infographic capturing the main steps and key elements of IBSM (Observation → Interpretation → Application) plus an 8–10 page prose Teaching Script covering your 60–75 minute training session.{' '}
            <strong>Part 2 (200 pts):</strong> Teach your infographic to a cell/discipleship group in a <strong>60–75 minute session + 30 minutes Q&amp;A</strong> and submit the official IBSM Infographic Sharing/Teaching Report.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Live A4 Infographic Preview */}
        <div className="glass-card" style={{ border: '1px solid rgba(212, 175, 55, 0.35)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <ImageIcon size={18} /> Completed A4 IBSM Master Infographic (300-Pt Handout &amp; Teaching Tool)
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                Captures all essential elements of IBSM from Observation (Blue: Detective) → Interpretation (Gold: Scholar) → Application (Green: Disciple) on a single A4 portrait sheet.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a
                href="/IBSM_Infographic_A4.png"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-gold"
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.75rem', textDecoration: 'none' }}
              >
                Open Full-Size A4 Image
              </a>
              <a
                href="/IBSM Infographic & Teaching Script.docx"
                download="IBSM Infographic & Teaching Script.docx"
                className="btn btn-primary"
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Download size={14} /> Download 300-pt .DOCX (A4 Infographic + 60–75m Script)
              </a>
            </div>
          </div>
          <div style={{ background: '#f9f7f1', padding: '1rem', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <img
              src="/IBSM_Infographic_A4.png"
              alt="A4 IBSM Infographic: Observation, Interpretation, Application"
              style={{ maxWidth: '100%', maxHeight: '920px', borderRadius: '6px', boxShadow: '0 6px 24px rgba(0,0,0,0.22)' }}
            />
          </div>
        </div>
        
        {/* Infographic Design Blueprint */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={18} /> Part 1: Infographic Layout Blueprint
          </h3>
          <label className="label">A4 Infographic Structural Notes</label>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
            Sketch or plan what text, visual flowcharts, symbols, or colors you will use to depict the observation, interpretation, and application workflows.
          </p>
          <textarea
            className="input-field"
            style={{ minHeight: '120px', resize: 'vertical' }}
            value={infographic.infographicNotes}
            onChange={(e) => handleFieldChange('infographicNotes', e.target.value)}
            placeholder="Outline your visual themes, key headings, flowchart connections, and observation elements..."
          ></textarea>
        </div>

        {/* Presentation Log & Q&A */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} /> Part 2: Presentation Session Log
          </h3>
          
          <div className="grid-3" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="label">Presentation Date</label>
              <input
                type="text"
                className="input-field"
                value={infographic.presentationDate}
                onChange={(e) => handleFieldChange('presentationDate', e.target.value)}
                placeholder="e.g., Nov 10, 2026"
              />
            </div>
            
            <div>
              <label className="label">Audience Size & Group</label>
              <input
                type="text"
                className="input-field"
                value={infographic.audienceSize}
                onChange={(e) => handleFieldChange('audienceSize', e.target.value)}
                placeholder="e.g. 8 cell group members"
              />
            </div>

            <div>
              <label className="label">Presentation Link / Mode</label>
              <input
                type="text"
                className="input-field"
                value={infographic.zoomLink}
                onChange={(e) => handleFieldChange('zoomLink', e.target.value)}
                placeholder="e.g. Onsite or Zoom ID"
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="label">Lesson Plan Outline (60-75 minutes)</label>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              Detail the schedule for teaching (e.g. 15 min Observation, 25 min Interpretation, 20 min Application, etc.).
            </p>
            <textarea
              className="input-field"
              style={{ minHeight: '100px', resize: 'vertical' }}
              value={infographic.lessonPlan}
              onChange={(e) => handleFieldChange('lessonPlan', e.target.value)}
              placeholder="e.g. 0-10m: Introduction; 10-30m: Observation techniques..."
            ></textarea>
          </div>

          <div>
            <label className="label">Logged Q&A Session Questions (30 minutes)</label>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              Note down the questions asked by your audience. This helps show active engagement for your final infographic report!
            </p>
            <textarea
              className="input-field"
              style={{ minHeight: '100px', resize: 'vertical' }}
              value={infographic.questionsLogged}
              onChange={(e) => handleFieldChange('questionsLogged', e.target.value)}
              placeholder="1. Question: How do we distinguish structural relationships? Answer: Look for contrast or repetition..."
            ></textarea>
          </div>
        </div>

        {/* Presentation Video Examples (bsm-files-6) */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Play size={18} /> Part 3: Presentation Video Examples & Outlines
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
            Watch these student presentation recordings of <strong>"The Big Idea"</strong> for ideas on structure, flow, and visual aids.
          </p>
          <div className="grid-2" style={{ gap: '1.5rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Jacob Li: The Big Idea (Complete Version)</h4>
              <video 
                src="/resources/bsm-files-6/jacob_li_big_idea_complete.mp4" 
                controls 
                style={{ width: '100%', borderRadius: '6px', maxHeight: '200px', background: '#000' }}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                Full presentation showing slides, structural breakdowns, and Q&A delivery.
              </p>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Jacob Li: Narrative Big Idea (Short Version)</h4>
              <video 
                src="/resources/bsm-files-6/jacob_li_big_idea_short.mp4" 
                controls 
                style={{ width: '100%', borderRadius: '6px', maxHeight: '200px', background: '#000' }}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                Abbreviated outline focused specifically on narrative passages.
              </p>
            </div>
          </div>
        </div>

        {/* Discussion Netiquette Guidelines (bsm-files-3) */}
        <div className="glass-card" style={{ background: 'rgba(212, 175, 55, 0.02)' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={18} /> Part 4: Netiquette Rules for Class & Online Presentations
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Follow these **12 Ground Rules** to ensure productive, respectful online discussions and Q&A delivery (Peter Roper):
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>1. Participate:</strong> No cyberspace lurking; active contributions help everyone.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>2. Report Glitches:</strong> Inform the host of any electronic/audio-video issues.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>3. Help Others:</strong> Assist participants who are less experienced with online tools.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>4. Be Patient:</strong> Read the entire Q&A thread before posting to avoid repeats.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>5. Be Brief:</strong> Stay on point; avoid pomposity or overly wordy comments.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>6. Proper Writing:</strong> Maintain spelling, grammar and professional structure.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>7. Cite Sources:</strong> Give credit when referring to intellectual properties.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>8. Avoid Slang:</strong> Refrain from emojis or text messaging shortcuts in dialogue.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>9. Respect Diversity:</strong> Do not post sarcastic, offensive or derogatory remarks.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>10. No YELLING:</strong> Avoid typing in all bold or capitalized lettering.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>11. No Flaming:</strong> Keep critiques constructive; emotional rants won't be tolerated.
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <strong>12. Think First:</strong> You cannot un-ring a bell. Proofread before sending!
            </div>
          </div>
        </div>

        {/* Infographic Report Draft */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={18} /> Part 5: Infographic Presentation Report
          </h3>
          <label className="label">Presentation Report Reflection</label>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
            Summarize how the presentation went, how the audience responded, what questions were difficult to answer, and how this teaching experience deepened your own understanding of the inductive Bible study method.
          </p>
          <textarea
            className="input-field"
            style={{ minHeight: '140px', resize: 'vertical' }}
            value={infographic.reportNotes}
            onChange={(e) => handleFieldChange('reportNotes', e.target.value)}
            placeholder="Draft your final presentation reflection report here..."
          ></textarea>
        </div>

      </div>
    </div>
  );
};
