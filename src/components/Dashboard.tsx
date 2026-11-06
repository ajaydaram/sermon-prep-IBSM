import React, { useState } from 'react';
import { instructorInfo, gradProfile, outcomes, learningTasks } from '../data/syllabusData';
import { Award, BookOpen, Clock, Mail, Phone, ExternalLink, Download, Sparkles } from 'lucide-react';
import type { StudentAppState } from '../types';

interface DashboardProps {
  appState: StudentAppState;
}

export const Dashboard: React.FC<DashboardProps> = ({ appState }) => {
  const [activeOutcomeTab, setActiveOutcomeTab] = useState<'KNOW' | 'DO' | 'BE'>('KNOW');

  // Compute stats
  const totalTasks = learningTasks.length;
  const completedTaskIds = Object.keys(appState.taskStatus).filter(
    id => appState.taskStatus[id] === 'done'
  );
  const tasksCompletedCount = completedTaskIds.length;

  const pointsEarned = completedTaskIds.reduce((sum, id) => {
    const task = learningTasks.find(t => t.id === id);
    return sum + (task ? task.points : 0);
  }, 0);

  const totalPointsAvailable = learningTasks.reduce((sum, t) => sum + t.points, 0);
  const percentComplete = Math.round((pointsEarned / totalPointsAvailable) * 100) || 0;

  // Hours calculation
  const hoursSpent = completedTaskIds.reduce((sum, id) => {
    const task = learningTasks.find(t => t.id === id);
    return sum + (task ? task.timeHours : 0);
  }, 0);

  const totalHoursExpected = 77.8; // From syllabus totals

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>
          BS510 Inductive Bible Study Method
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px' }}>
          Welcome to your interactive Course Companion. Equip yourself with the skills and tools of observation, interpretation, and application to handle God's Word with accuracy, integrity, confidence, and passion.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid-3" style={{ marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--color-accent-gold)' }}>
            <Award size={32} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grade Progress</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-primary)', margin: '0.1rem 0' }}>
              {pointsEarned} / {totalPointsAvailable} pts
            </h3>
            <div className="progress-bar-bg" style={{ width: '150px', marginTop: '0.5rem' }}>
              <div className="progress-bar-fill" style={{ width: `${percentComplete}%` }}></div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-gold)', marginTop: '0.2rem', display: 'block' }}>
              {percentComplete}% Completed
            </span>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--color-accent-emerald-light)' }}>
            <BookOpen size={32} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Learning Tasks</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-primary)', margin: '0.1rem 0' }}>
              {tasksCompletedCount} / {totalTasks} Done
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              {totalTasks - tasksCompletedCount} tasks remaining
            </span>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '12px', color: 'var(--color-text-primary)' }}>
            <Clock size={32} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time Invested</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-primary)', margin: '0.1rem 0' }}>
              {hoursSpent.toFixed(1)} / {totalHoursExpected} hrs
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Approximate focused hours required
            </span>
          </div>
        </div>
      </section>

      {/* Course Submissions Available to Download (.docx) */}
      <section className="glass-card fade-in" style={{ 
        marginBottom: '2.5rem', 
        padding: '1.5rem', 
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(16, 185, 129, 0.06))', 
        border: '1px solid var(--color-accent-gold)',
        borderRadius: '12px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent-gold)', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <Sparkles size={20} /> Major Course Submissions Available to Download (.docx)
            </div>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
              Fully formatted Microsoft Word documents with Turabian 9th ed. footnotes, bibliographies, and book charts ready for submission.
            </p>
          </div>
        </div>

        <div className="grid-3" style={{ gap: '1rem' }}>
          {/* Roman Slavery Research Paper */}
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.35)', 
            padding: '1.25rem', 
            borderRadius: '10px', 
            border: '1px solid rgba(212, 175, 55, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              <span className="badge badge-gold" style={{ fontSize: '0.7rem', marginBottom: '0.4rem' }}>Learning Tasks C10 & C12 (500 pts)</span>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-text-primary)', margin: '0.2rem 0' }}>
                Roman Slavery in the First Century AD
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '0.3rem 0 0' }}>
                8 body pages (2,150+ words), 49 footnotes, 27 sources, top-right page numbering, EAST cover page.
              </p>
            </div>
            <a 
              href="/Roman-Slavery-in-the-First-Century-AD.docx" 
              download="Roman Slavery in the First Century AD.docx"
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.55rem 0.85rem', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}
            >
              <Download size={15} /> Download Paper (.docx)
            </a>
          </div>

          {/* Philemon Argument */}
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.35)', 
            padding: '1.25rem', 
            borderRadius: '10px', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              <span className="badge badge-blue" style={{ fontSize: '0.7rem', marginBottom: '0.4rem' }}>Major Project</span>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-text-primary)', margin: '0.2rem 0' }}>
                Philemon Book Chart & Argument
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '0.3rem 0 0' }}>
                NASB 8-paragraph grid chart, sentence outline, and comprehensive argument document.
              </p>
            </div>
            <a 
              href="/Philemon%20argument.docx" 
              download="Philemon argument.docx"
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.55rem 0.85rem', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              <Download size={15} /> Download Argument (.docx)
            </a>
          </div>

          {/* Jonah Argument */}
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.35)', 
            padding: '1.25rem', 
            borderRadius: '10px', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              <span className="badge badge-green" style={{ fontSize: '0.7rem', marginBottom: '0.4rem' }}>Major Project</span>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-text-primary)', margin: '0.2rem 0' }}>
                Jonah Book Chart & Argument
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '0.3rem 0 0' }}>
                NASB 2020 14-column book chart, observation grid, and interpretive argument document.
              </p>
            </div>
            <a 
              href="/Jonah%20argument.docx" 
              download="Jonah argument.docx"
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.55rem 0.85rem', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              <Download size={15} /> Download Argument (.docx)
            </a>
          </div>
        </div>
      </section>

      {/* Main Grid: Instructor Info & Graduate Profile */}
      <div className="grid-2" style={{ marginBottom: '2.5rem', alignItems: 'start' }}>
        
        {/* Left Side: Instructor Details & Policies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent-gold)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Instructor Profile
            </h3>
            <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
              {instructorInfo.name}
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.25rem', fontStyle: 'italic' }}>
              {instructorInfo.notes}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} style={{ color: 'var(--color-accent-gold)' }} />
                <a href={`mailto:${instructorInfo.email}`} style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
                  {instructorInfo.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} style={{ color: 'var(--color-accent-gold)' }} />
                <span>{instructorInfo.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1.8rem' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>WhatsApp</span>
                <span>{instructorInfo.whatsapp.replace(' [WhatsApp]', '')}</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ borderLeft: '3px solid var(--color-accent-gold)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
              Populi Course Policies
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
              Please review policies regarding attendance, late submissions, plagiarism, and formatting rules BEFORE using this application.
            </p>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); alert("Accessing simulated Course Policy document... Remember that late submissions receive zero credit, and you must use Chicago 'notes-bibliography' format for papers!"); }}
              className="btn btn-outline-gold" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              <ExternalLink size={14} /> Read Course Policies
            </a>
          </div>
        </div>

        {/* Right Side: Graduate Profile Alignment */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent-gold)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Graduate Profile & Integration
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            How BS510 contributes to the theological and ministerial formation outcomes identified by EAST.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {gradProfile.map((gp, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {gp.area}
                  </h4>
                  <span className={`badge ${gp.alignment === 'STRONG' ? 'badge-green' : 'badge-gold'}`}>
                    {gp.alignment}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Goal:</strong> {gp.outcome}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', borderLeft: '2px solid var(--color-primary-light)', paddingLeft: '0.5rem' }}>
                  <strong>BS510 Integration:</strong> {gp.justification}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Learning Outcomes */}
      <section className="glass-card" style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent-gold)', marginBottom: '1rem' }}>
          Student Learning Outcomes (SLO)
        </h3>
        
        {/* Tab Headers */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          {(['KNOW', 'DO', 'BE'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveOutcomeTab(tab)}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeOutcomeTab === tab ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
                padding: '0.75rem 1.25rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                borderBottom: activeOutcomeTab === tab ? '2px solid var(--color-accent-gold)' : '2px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab === 'KNOW' ? 'KNOW (Cognitive)' : tab === 'DO' ? 'DO (Conative)' : 'BE (Affective)'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: '150px' }}>
          {outcomes.map((cat, idx) => {
            const shortCatName = cat.category.split(' ')[0] as 'KNOW' | 'DO' | 'BE';
            if (shortCatName !== activeOutcomeTab) return null;
            return (
              <ul 
                key={idx} 
                style={{ 
                  listStyle: 'none', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem' 
                }}
              >
                {cat.outcomes.map((outcomeStr, oIdx) => (
                  <li 
                    key={oIdx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '0.75rem', 
                      fontSize: '0.95rem' 
                    }}
                  >
                    <span style={{ 
                      color: 'var(--color-accent-gold)', 
                      fontWeight: 'bold', 
                      marginTop: '0.1rem',
                      fontFamily: 'var(--font-serif)'
                    }}>
                      {oIdx + 1}.
                    </span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{outcomeStr}</span>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </section>
    </div>
  );
};
