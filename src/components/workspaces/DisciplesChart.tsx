import React from 'react';
import type { StudentDisciplesChart } from '../../types';
import { Download, RefreshCw } from 'lucide-react';

interface DisciplesChartProps {
  disciplesChart: StudentDisciplesChart;
  setDisciplesChart: (chart: StudentDisciplesChart) => void;
  markTaskDone: (taskId: string, isDone: boolean) => void;
  isTaskCompleted: boolean;
}

export const DisciplesChart: React.FC<DisciplesChartProps> = ({
  disciplesChart,
  setDisciplesChart,
  markTaskDone,
  isTaskCompleted
}) => {

  const handleCellChange = (column: 'matthew10' | 'mark3' | 'luke6' | 'acts1', index: number, value: string) => {
    const columnData = [...disciplesChart[column]];
    columnData[index] = value;
    setDisciplesChart({
      ...disciplesChart,
      [column]: columnData
    });
  };

  const handleObservationsChange = (value: string) => {
    setDisciplesChart({
      ...disciplesChart,
      observations: value
    });
  };

  const loadStandardLists = () => {
    if (window.confirm("Are you sure you want to load the reference lists? This will overwrite your current cell entries.")) {
      setDisciplesChart({
        matthew10: [
          "1. Simon (Peter)",
          "2. Andrew (his brother)",
          "3. James (son of Zebedee)",
          "4. John (his brother)",
          "5. Philip",
          "6. Bartholomew",
          "7. Thomas",
          "8. Matthew (tax collector)",
          "9. James (son of Alphaeus)",
          "10. Thaddaeus (Lebbaeus)",
          "11. Simon (the Cananaean)",
          "12. Judas Iscariot"
        ],
        mark3: [
          "1. Simon (Peter)",
          "2. James (son of Zebedee)",
          "3. John (brother of James)",
          "4. Andrew",
          "5. Philip",
          "6. Bartholomew",
          "7. Matthew",
          "8. Thomas",
          "9. James (son of Alphaeus)",
          "10. Thaddaeus",
          "11. Simon (the Cananaean)",
          "12. Judas Iscariot"
        ],
        luke6: [
          "1. Simon (Peter)",
          "2. Andrew (his brother)",
          "3. James",
          "4. John",
          "5. Philip",
          "6. Bartholomew",
          "7. Matthew",
          "8. Thomas",
          "9. James (son of Alphaeus)",
          "10. Simon (called the Zealot)",
          "11. Judas (son of James)",
          "12. Judas Iscariot"
        ],
        acts1: [
          "1. Peter",
          "2. John",
          "3. James",
          "4. Andrew",
          "5. Philip",
          "6. Thomas",
          "7. Bartholomew",
          "8. Matthew",
          "9. James (son of Alphaeus)",
          "10. Simon (the Zealot)",
          "11. Judas (son of James)",
          "(Judas Iscariot is deceased)"
        ],
        observations: disciplesChart.observations || "Observations on comparing the lists:\n- Peter is always listed first in all lists, while Judas Iscariot is listed last (or absent in Acts).\n- The names are grouped in subsets (Philip is always 5th, James son of Alphaeus is always 9th).\n- Thaddaeus in Matthew/Mark seems to be Judas son of James in Luke/Acts.\n- Simon the Cananaean (Matthew/Mark) is Simon the Zealot (Luke/Acts)."
      });
    }
  };

  const exportChart = () => {
    let text = `BS510 Inductive Bible Study Method\nLearning Task B06: Chart (Twelve Disciples)\n\n`;
    text += `| Row | Matthew 10 | Mark 3 | Luke 6 | Acts 1 |\n`;
    text += `|---|---|---|---|---|\n`;
    for (let i = 0; i < 12; i++) {
      text += `| ${i + 1} | ${disciplesChart.matthew10[i] || ''} | ${disciplesChart.mark3[i] || ''} | ${disciplesChart.luke6[i] || ''} | ${disciplesChart.acts1[i] || ''} |\n`;
    }
    text += `\n\n=== OBSERVATIONS ===\n${disciplesChart.observations || 'None'}`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BS510_Twelve_Disciples_Comparison.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Learning Task B06</span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-accent-gold)' }}>Disciples Comparison Chart</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={loadStandardLists} className="btn btn-secondary">
            <RefreshCw size={16} /> Load Reference Lists
          </button>
          <button 
            onClick={exportChart} 
            className="btn btn-secondary"
          >
            <Download size={16} /> Export Work
          </button>
          <button 
            onClick={() => markTaskDone('B06', !isTaskCompleted)} 
            className={`btn ${isTaskCompleted ? 'btn-primary' : 'btn-outline-gold'}`}
          >
            {isTaskCompleted ? '✓ Completed (200 pts)' : 'Mark Task Complete'}
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '2rem', borderLeft: '3px solid var(--color-accent-gold)' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>Assignment Guidelines</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          Create a chart comparing the four disciple lists in the New Testament. Examine spelling, order, and naming differences (e.g. Zealot vs Cananaean, Thaddaeus vs Judas son of James), and write down observations that result from comparing the lists.
        </p>
      </div>

      {/* The Comparative Chart */}
      <div className="custom-table-container" style={{ marginBottom: '2.5rem' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>No.</th>
              <th>Matthew 10:2-4</th>
              <th>Mark 3:16-19</th>
              <th>Luke 6:14-16</th>
              <th>Acts 1:13</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 12 }).map((_, idx) => (
              <tr key={idx}>
                <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--color-accent-gold)' }}>
                  {idx + 1}
                </td>
                <td>
                  <input 
                    type="text" 
                    className="input-field"
                    style={{ background: 'transparent', border: 'none', padding: '0.25rem' }}
                    value={disciplesChart.matthew10[idx] || ''}
                    onChange={(e) => handleCellChange('matthew10', idx, e.target.value)}
                    placeholder="Enter disciple name"
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    className="input-field"
                    style={{ background: 'transparent', border: 'none', padding: '0.25rem' }}
                    value={disciplesChart.mark3[idx] || ''}
                    onChange={(e) => handleCellChange('mark3', idx, e.target.value)}
                    placeholder="Enter disciple name"
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    className="input-field"
                    style={{ background: 'transparent', border: 'none', padding: '0.25rem' }}
                    value={disciplesChart.luke6[idx] || ''}
                    onChange={(e) => handleCellChange('luke6', idx, e.target.value)}
                    placeholder="Enter disciple name"
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    className="input-field"
                    style={{ background: 'transparent', border: 'none', padding: '0.25rem' }}
                    value={disciplesChart.acts1[idx] || ''}
                    onChange={(e) => handleCellChange('acts1', idx, e.target.value)}
                    placeholder="Enter disciple name"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Observations Textarea */}
      <div className="glass-card">
        <label className="label" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Observations from comparing the lists</label>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
          Compare the lists and record your observations. Focus on who is listed first, grouping patterns, alternative names used by different writers, and who is omitted in Acts.
        </p>
        <textarea
          className="input-field"
          style={{ minHeight: '180px', resize: 'vertical' }}
          value={disciplesChart.observations}
          onChange={(e) => handleObservationsChange(e.target.value)}
          placeholder="Type your comparative observations here..."
        ></textarea>
      </div>
    </div>
  );
};
