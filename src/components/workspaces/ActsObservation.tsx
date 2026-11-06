import React, { useState } from 'react';
import type { StudentObservation } from '../../types';
import { Plus, Trash2, CheckCircle2, AlertTriangle, Download } from 'lucide-react';

interface ActsObservationProps {
  observations: StudentObservation[];
  setObservations: (obs: StudentObservation[]) => void;
  markTaskDone: (taskId: string, isDone: boolean) => void;
  isTaskCompleted: boolean;
}

export const ActsObservation: React.FC<ActsObservationProps> = ({
  observations,
  setObservations,
  markTaskDone,
  isTaskCompleted
}) => {
  const [newObsText, setNewObsText] = useState('');

  const validateObservation = (text: string): { isValid: boolean; errors: string[]; warnings: string[] } => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const trimmed = text.trim();

    if (!trimmed) {
      errors.push("Observation cannot be empty.");
      return { isValid: false, errors, warnings };
    }

    // Rule 8: Should be a statement, not a question.
    if (trimmed.endsWith('?')) {
      errors.push("Observations must be statements, not questions.");
    }

    // Rule 6: No interpretation/application pronouns.
    // However, the verse itself has "you" and "your". 
    // We check for "I", "me", "we", "us", "our", "my" as errors (personal application).
    // "you" will trigger a warning in case they are quoting the verse, but reminder not to apply.
    const lowercase = trimmed.toLowerCase();
    const appPronounsError = ['\bi\b', '\bme\b', '\bwe\b', '\bus\b', '\bour\b', '\bmy\b', '\bmyself\b', '\bourselves\b'];
    const appPronounsWarning = ['\byou\b', '\byour\b', '\byours\b'];

    const hasErrorPronoun = appPronounsError.some(pattern => new RegExp(pattern, 'i').test(trimmed));
    const hasWarningPronoun = appPronounsWarning.some(pattern => new RegExp(pattern, 'i').test(trimmed));

    if (hasErrorPronoun) {
      errors.push("Interpretation/Application detected! Avoid personal application pronouns ('I', 'me', 'we', 'us', 'our', 'my').");
    } else if (hasWarningPronoun) {
      warnings.push("Contains 'you'/'your'. Ensure this is a direct observation of the text and not a personal application to the reader.");
    }

    // Check for common interpretation words
    const interpKeywords = ['means', 'signifies', 'applies', 'should', 'must do', 'represent'];
    if (interpKeywords.some(kw => lowercase.includes(kw))) {
      warnings.push("Ensure this is an observation of what the text *says*, not an interpretation of what it *means*.");
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  };

  const addObservation = () => {
    const trimmed = newObsText.trim();
    if (!trimmed) return;

    const { isValid, errors } = validateObservation(trimmed);
    const newObs: StudentObservation = {
      id: Math.random().toString(36).substr(2, 9),
      text: trimmed,
      isValid,
      errors
    };

    const updated = [...observations, newObs];
    setObservations(updated);
    setNewObsText('');

    // Proactively check if 25 observations are valid
    const validCount = updated.filter(o => o.isValid).length;
    if (validCount >= 25) {
      markTaskDone('B02', true);
    }
  };

  const deleteObservation = (id: string) => {
    const updated = observations.filter(o => o.id !== id);
    setObservations(updated);
    
    // Unmark done if valid drops below 25
    const validCount = updated.filter(o => o.isValid).length;
    if (validCount < 25 && isTaskCompleted) {
      markTaskDone('B02', false);
    }
  };

  const validObservationsCount = observations.filter(o => o.isValid).length;

  const exportObservations = () => {
    const textContent = `BS510 Inductive Bible Study Method\nLearning Task B02: Acts 1:8 (Observations)\n\nACTS 1:8 (NASB 2020):\n"but you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem and in all Judea, and Samaria, and as far as the remotest part of the earth."\n\nObservations:\n` + 
      observations.map((o, idx) => `${idx + 1}. ${o.text} (${o.isValid ? 'Valid' : 'Invalid'})`).join('\n') + 
      `\n\nTotal Observations: ${observations.length} (Valid: ${validObservationsCount})`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BS510_Acts_1_8_Observations.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentValidation = newObsText ? validateObservation(newObsText) : null;

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Learning Task B02</span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-accent-gold)' }}>Acts 1:8 Observation Validator</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={exportObservations} 
            className="btn btn-secondary"
            disabled={observations.length === 0}
          >
            <Download size={16} /> Export Work
          </button>
          <button 
            onClick={() => markTaskDone('B02', !isTaskCompleted)} 
            className={`btn ${isTaskCompleted ? 'btn-primary' : 'btn-outline-gold'}`}
          >
            {isTaskCompleted ? '✓ Completed (200 pts)' : 'Mark Task Complete'}
          </button>
        </div>
      </div>

      {/* Rationale & Rules */}
      <div className="grid-2" style={{ marginBottom: '2rem', alignItems: 'stretch' }}>
        <div className="glass-card" style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>The Scripture (NASB 2020)</h3>
          <blockquote style={{ 
            fontSize: '1.05rem', 
            color: 'var(--color-text-primary)', 
            borderLeft: '3px solid var(--color-accent-gold)', 
            paddingLeft: '1rem',
            margin: '0.5rem 0',
            fontStyle: 'italic',
            fontFamily: 'var(--font-serif)'
          }}>
            “but you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem and in all Judea, and Samaria, and as far as the remotest part of the earth.”
          </blockquote>
        </div>

        <div className="glass-card" style={{ flex: 1, borderLeft: '3px solid var(--color-accent-gold-dark)' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>Observation Guidelines</h3>
          <ul style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <li>Write statements only, not questions (e.g. <em>“Shall receive” is future</em>).</li>
            <li>Focus strictly on Acts 1:8. Exclude context from other verses.</li>
            <li>No interpretation (what it means) or application (how it applies).</li>
            <li>Avoid pronouns like <strong>I, me, we, us, our, my</strong>.</li>
            <li><strong>Requirement:</strong> Submit at least 25 significant observations.</li>
          </ul>
        </div>
      </div>

      {/* Progress & Input Box */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>Add New Observation</h3>
          <span className={`badge ${validObservationsCount >= 25 ? 'badge-green' : 'badge-gold'}`}>
            Progress: {validObservationsCount} / 25 Valid
          </span>
        </div>

        <div className="progress-bar-bg" style={{ marginBottom: '1.5rem' }}>
          <div className="progress-bar-fill" style={{ width: `${Math.min(100, (validObservationsCount / 25) * 100)}%` }}></div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            className="input-field"
            value={newObsText}
            onChange={(e) => setNewObsText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addObservation()}
            placeholder="Type your observation here (e.g., 'There are four geographical regions mentioned.')"
            style={{ flex: 1 }}
          />
          <button onClick={addObservation} className="btn btn-primary" style={{ borderRadius: '8px' }}>
            <Plus size={18} /> Add
          </button>
        </div>

        {/* Live Validation Feedback */}
        {currentValidation && (newObsText.trim().length > 0) && (
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            {currentValidation.errors.map((err, index) => (
              <div key={index} style={{ color: '#fca5a5', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                <AlertTriangle size={14} /> {err}
              </div>
            ))}
            {currentValidation.warnings.map((warn, index) => (
              <div key={index} style={{ color: '#fde047', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={14} /> {warn}
              </div>
            ))}
            {currentValidation.isValid && currentValidation.warnings.length === 0 && (
              <div style={{ color: 'var(--color-accent-emerald-light)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} /> Syntax looks good! Ready to add.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Observations List */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>Observations List ({observations.length})</h3>
        
        {observations.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem 0' }}>
            No observations added yet. Start typing above to analyze the text.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {observations.map((obs, index) => {
              // Recalculate validation for display in case logic changes
              const val = validateObservation(obs.text);
              return (
                <div 
                  key={obs.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid',
                    borderColor: val.errors.length > 0 ? 'rgba(239, 68, 68, 0.2)' : 'var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-accent-gold)', fontWeight: 600, fontSize: '0.95rem' }}>{index + 1}.</span>
                      <p style={{ color: 'var(--color-text-primary)', fontSize: '0.95rem', margin: 0 }}>{obs.text}</p>
                    </div>
                    
                    {val.errors.map((err, eIdx) => (
                      <div key={eIdx} style={{ color: '#fca5a5', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem', paddingLeft: '1.2rem' }}>
                        <AlertTriangle size={12} /> {err}
                      </div>
                    ))}
                    {val.warnings.map((warn, wIdx) => (
                      <div key={wIdx} style={{ color: '#fde047', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem', paddingLeft: '1.2rem' }}>
                        <AlertTriangle size={12} /> {warn}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => deleteObservation(obs.id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                    title="Delete Observation"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
