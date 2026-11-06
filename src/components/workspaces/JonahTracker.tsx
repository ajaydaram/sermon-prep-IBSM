import React from 'react';
import type { StudentJonahLog } from '../../types';
import { Calendar, AlertTriangle, CheckCircle, Download } from 'lucide-react';

interface JonahTrackerProps {
  jonahLog: StudentJonahLog;
  setJonahLog: (log: StudentJonahLog) => void;
  markTaskDone: (taskId: string, isDone: boolean) => void;
  isTaskCompleted: boolean;
}

export const JonahTracker: React.FC<JonahTrackerProps> = ({
  jonahLog,
  setJonahLog,
  markTaskDone,
  isTaskCompleted
}) => {
  
  const updateReadingField = (index: number, field: 'date' | 'time' | 'translation', value: string) => {
    const updatedReadings = jonahLog.readings.map((r, idx) => {
      if (idx === index) {
        const updated = { ...r, [field]: value };
        // Mark completed if date and time are provided
        if (updated.date && updated.time && updated.translation) {
          updated.completed = true;
        }
        return updated;
      }
      return r;
    });

    setJonahLog({
      ...jonahLog,
      readings: updatedReadings
    });
  };

  const handleTextareaChange = (field: 'valueReflection' | 'fifthReadingInsights' | 'purposeThoughts', value: string) => {
    setJonahLog({
      ...jonahLog,
      [field]: value
    });
  };

  // Check if readings are 4+ hours apart
  const checkTimeIntervals = (): { readingIdx: number; warning: string }[] => {
    const warnings: { readingIdx: number; warning: string }[] = [];
    const dateTimes: Date[] = [];

    for (let i = 0; i < jonahLog.readings.length; i++) {
      const r = jonahLog.readings[i];
      if (r.date && r.time) {
        // Construct date object
        const dt = new Date(`${r.date}T${r.time}`);
        dateTimes.push(dt);
      } else {
        dateTimes.push(new Date(0)); // Dummy for incomplete
      }
    }

    for (let i = 1; i < dateTimes.length; i++) {
      const current = dateTimes[i];
      const prev = dateTimes[i - 1];

      if (current.getTime() > 0 && prev.getTime() > 0) {
        const diffMs = current.getTime() - prev.getTime();
        const diffHrs = diffMs / (1000 * 60 * 60);

        if (diffHrs < 0) {
          warnings.push({
            readingIdx: i,
            warning: `Reading #${i + 1} is logged before Reading #${i}. Please verify dates/times.`
          });
        } else if (diffHrs < 4) {
          warnings.push({
            readingIdx: i,
            warning: `Readings #${i} and #${i + 1} are only ${diffHrs.toFixed(1)} hours apart. The syllabus requires at least four hours between readings.`
          });
        }
      }
    }

    return warnings;
  };

  const timeWarnings = checkTimeIntervals();
  const completedReadingsCount = jonahLog.readings.filter(r => r.completed).length;

  const exportJonahWork = () => {
    const readingsStr = jonahLog.readings
      .map((r, idx) => `Reading ${idx + 1}:\n- Date: ${r.date || 'Pending'}\n- Time: ${r.time || 'Pending'}\n- Translation: ${r.translation || 'Pending'}`)
      .join('\n\n');

    const textContent = `BS510 Inductive Bible Study Method\nLearning Task B04: Read Jonah\n\n=== 1. READING LOG ===\n${readingsStr}\n\n=== 2. VALUE REFLECTION ===\n${jonahLog.valueReflection || 'Pending'}\n\n=== 3. FIFTH READING INSIGHTS ===\n${jonahLog.fifthReadingInsights || 'Pending'}\n\n=== 4. PURPOSE OF JONAH ===\n${jonahLog.purposeThoughts || 'Pending'}`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BS510_Jonah_Reading_Reflection.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Learning Task B04</span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-accent-gold)' }}>Jonah Reading Tracker & Reflection</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={exportJonahWork} 
            className="btn btn-secondary"
            disabled={completedReadingsCount === 0}
          >
            <Download size={16} /> Export Work
          </button>
          <button 
            onClick={() => markTaskDone('B04', !isTaskCompleted)} 
            className={`btn ${isTaskCompleted ? 'btn-primary' : 'btn-outline-gold'}`}
          >
            {isTaskCompleted ? '✓ Completed (200 pts)' : 'Mark Task Complete'}
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '2rem', borderLeft: '3px solid var(--color-accent-gold)' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>Exercise Overview & Rules</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          Read the entire book of Jonah <strong>five times</strong>, each time in a single sitting, and spaced at least <strong>four hours apart</strong>. You may use any translation, but all five readings must use the <em>same translation and language</em>.
        </p>
      </div>

      {/* Reading Log Grid */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>Reading Log</span>
          <span className="badge badge-gold">{completedReadingsCount} / 5 Logged</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {jonahLog.readings.map((reading, idx) => {
            const warning = timeWarnings.find(w => w.readingIdx === idx);
            return (
              <div 
                key={reading.id} 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  background: reading.completed ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} style={{ color: 'var(--color-accent-gold)' }} /> Reading #{idx + 1}
                  </h4>
                  {reading.completed ? (
                    <span style={{ color: 'var(--color-accent-emerald-light)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle size={14} /> Logged
                    </span>
                  ) : (
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Pending details</span>
                  )}
                </div>

                <div className="grid-3" style={{ gap: '1rem' }}>
                  <div>
                    <label className="label">Date</label>
                    <input 
                      type="date" 
                      className="input-field"
                      value={reading.date}
                      onChange={(e) => updateReadingField(idx, 'date', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">Time</label>
                    <input 
                      type="time" 
                      className="input-field"
                      value={reading.time}
                      onChange={(e) => updateReadingField(idx, 'time', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">Translation/Version</label>
                    <input 
                      type="text" 
                      className="input-field"
                      value={reading.translation}
                      onChange={(e) => updateReadingField(idx, 'translation', e.target.value)}
                      placeholder="e.g., NASB 2020 or ESV"
                    />
                  </div>
                </div>

                {warning && (
                  <div style={{ color: '#fde047', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
                    <AlertTriangle size={14} /> {warning.warning}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Reflections */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Reflections & Hypotheses</h3>
        
        <div>
          <label className="label">1. Value of Repetitive Reading (1-2 paragraphs)</label>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
            Explain the value you see in reading the entire book several times in one sitting, with hours between readings.
          </p>
          <textarea
            className="input-field"
            style={{ minHeight: '120px', resize: 'vertical' }}
            value={jonahLog.valueReflection}
            onChange={(e) => handleTextareaChange('valueReflection', e.target.value)}
            placeholder="Draft your thoughts on repeated readings..."
          ></textarea>
        </div>

        <div>
          <label className="label">2. Fifth Reading Insights (Unique details)</label>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
            List insights and observations you obtained on the fifth reading that you missed during the first four readings.
          </p>
          <textarea
            className="input-field"
            style={{ minHeight: '120px', resize: 'vertical' }}
            value={jonahLog.fifthReadingInsights}
            onChange={(e) => handleTextareaChange('fifthReadingInsights', e.target.value)}
            placeholder="What new things did you see in the fifth reading?..."
          ></textarea>
        </div>

        <div>
          <label className="label">3. Rationale/Purpose of Jonah</label>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
            Why do you think Jonah was written? Provide your own spontaneous thoughts without researching commentaries or study Bibles.
          </p>
          <textarea
            className="input-field"
            style={{ minHeight: '120px', resize: 'vertical' }}
            value={jonahLog.purposeThoughts}
            onChange={(e) => handleTextareaChange('purposeThoughts', e.target.value)}
            placeholder="Write your personal thoughts on Jonah's purpose..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};
