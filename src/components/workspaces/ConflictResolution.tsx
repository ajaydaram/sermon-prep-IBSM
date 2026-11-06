import React from 'react';
import type { StudentConflictResolution } from '../../types';
import { Download, Info, AlertTriangle, FileText } from 'lucide-react';

interface ConflictResolutionProps {
  conflictResolution: StudentConflictResolution;
  setConflictResolution: (cr: StudentConflictResolution) => void;
  markTaskDone: (taskId: string, isDone: boolean) => void;
  isTaskCompleted: boolean;
}

export const ConflictResolution: React.FC<ConflictResolutionProps> = ({
  conflictResolution,
  setConflictResolution,
  markTaskDone,
  isTaskCompleted
}) => {

  const handleFieldChange = (field: keyof StudentConflictResolution, value: string) => {
    setConflictResolution({
      ...conflictResolution,
      [field]: value
    });
  };

  const exportConflictPaper = () => {
    const textContent = `BS510 Inductive Bible Study Method\nLearning Task D16: Conflict Resolution Paper\n\n=== 1. PARTICULAR CULTURE ===\n${conflictResolution.cultureName || 'Pending'}\n\n=== 2. UNBELIEVERS CONFLICT RESOLUTION ===\nHow unbelievers resolve conflict in my culture:\n${conflictResolution.unbelieverMethod || 'Pending'}\n\n=== 3. BELIEVERS CONFLICT RESOLUTION ===\nHow believers resolve conflict in my culture:\n${conflictResolution.believerMethod || 'Pending'}\n\n=== 4. STUDENT / STUDENT CONFLICT RESOLUTION (EAST) ===\nHow student/student conflicts should be resolved at EAST:\n${conflictResolution.studentStudent || 'Pending'}\n\n=== 5. STUDENT / FACULTY CONFLICT RESOLUTION (EAST) ===\nHow student/faculty conflicts should be resolved at EAST:\n${conflictResolution.studentFaculty || 'Pending'}\n\n=== 6. FACULTY / FACULTY CONFLICT RESOLUTION (EAST) ===\nHow faculty/faculty conflicts should be resolved at EAST:\n${conflictResolution.facultyFaculty || 'Pending'}`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BS510_Conflict_Resolution_Draft.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Learning Task D16</span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-accent-gold)' }}>Conflict Resolution Paper Planner</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="/Conflict Resolution Paper.docx"
            download="Conflict Resolution Paper.docx"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
          >
            <FileText size={16} /> Download DOCX
          </a>
          <button 
            onClick={exportConflictPaper} 
            className="btn btn-secondary"
          >
            <Download size={16} /> Export Draft
          </button>
          <button 
            onClick={() => markTaskDone('D16', !isTaskCompleted)} 
            className={`btn ${isTaskCompleted ? 'btn-primary' : 'btn-outline-gold'}`}
          >
            {isTaskCompleted ? '✓ Completed (200 pts)' : 'Mark Task Complete'}
          </button>
        </div>
      </div>

      {/* Rationale Info Card */}
      <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', borderLeft: '3px solid var(--color-accent-gold)' }}>
        <div style={{ color: 'var(--color-accent-gold)' }}>
          <Info size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>Application of Matthew 5 & 18</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
            This paper is <strong>NOT a research paper</strong>. It is an application exercise applying <strong>Matthew 5:23-24</strong> (if you remember someone has something against you, go reconcile first) and <strong>Matthew 18:15-17</strong> (if your brother sins, go to him privately, then take witnesses, then tell the church).
          </p>
        </div>
      </div>

      {/* Warning Box */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        padding: '0.85rem 1rem', 
        background: 'rgba(239, 68, 68, 0.04)', 
        border: '1px solid rgba(239, 68, 68, 0.15)', 
        borderRadius: '8px',
        marginBottom: '2rem',
        color: '#fca5a5',
        fontSize: '0.88rem'
      }}>
        <AlertTriangle size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>Critical Requirement:</strong> In sections 3, 4, 5, and 6, be careful to distinguish between who is in the <em>right</em> and who is in the <em>wrong</em> according to biblical principles.
        </span>
      </div>

      {/* Grid of inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Culture & Background */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)', marginBottom: '1rem' }}>Part I: Cultural Baseline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="label">1. Identify your particular culture</label>
              <input
                type="text"
                className="input-field"
                value={conflictResolution.cultureName}
                onChange={(e) => handleFieldChange('cultureName', e.target.value)}
                placeholder="e.g. Singaporean, Korean, Filipino, multi-cultural, etc."
              />
            </div>
            
            <div>
              <label className="label">2. How do unbelievers resolve conflict in your culture?</label>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                Describe standard cultural mechanisms (silent treatment, saving face, lawsuits, gossip, mediation, etc.).
              </p>
              <textarea
                className="input-field"
                style={{ minHeight: '100px', resize: 'vertical' }}
                value={conflictResolution.unbelieverMethod}
                onChange={(e) => handleFieldChange('unbelieverMethod', e.target.value)}
                placeholder="Describe how unbelievers handle conflicts..."
              ></textarea>
            </div>

            <div>
              <label className="label">3. How do believers resolve conflict in your culture?</label>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                Describe what church-goers or Christian communities typically do. Does it differ from unbelievers?
              </p>
              <textarea
                className="input-field"
                style={{ minHeight: '100px', resize: 'vertical' }}
                value={conflictResolution.believerMethod}
                onChange={(e) => handleFieldChange('believerMethod', e.target.value)}
                placeholder="Describe how believers handle conflicts..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Part II: EAST Community Conflict Resolution */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)', marginBottom: '1rem' }}>Part II: EAST Theological Community Scenarios</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
            According to Matt 5:23-24 and Matt 18:15-17, outline how the following conflicts should be resolved, making sure to explicitly address options for who is in the right and who is in the wrong.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="label">4. Student-to-Student Conflicts</label>
              <textarea
                className="input-field"
                style={{ minHeight: '100px', resize: 'vertical' }}
                value={conflictResolution.studentStudent}
                onChange={(e) => handleFieldChange('studentStudent', e.target.value)}
                placeholder="Outline student/student conflict resolution path..."
              ></textarea>
            </div>

            <div>
              <label className="label">5. Student-to-Faculty Conflicts</label>
              <textarea
                className="input-field"
                style={{ minHeight: '100px', resize: 'vertical' }}
                value={conflictResolution.studentFaculty}
                onChange={(e) => handleFieldChange('studentFaculty', e.target.value)}
                placeholder="Outline student/faculty conflict resolution path (respecting authority vs. biblical truth)..."
              ></textarea>
            </div>

            <div>
              <label className="label">6. Faculty-to-Faculty Conflicts</label>
              <textarea
                className="input-field"
                style={{ minHeight: '100px', resize: 'vertical' }}
                value={conflictResolution.facultyFaculty}
                onChange={(e) => handleFieldChange('facultyFaculty', e.target.value)}
                placeholder="Outline faculty/faculty conflict resolution path..."
              ></textarea>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
