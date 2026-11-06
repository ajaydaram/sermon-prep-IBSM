import React, { useState } from 'react';
import type { StudentQuestion } from '../../types';
import { Plus, Trash2, HelpCircle, Download } from 'lucide-react';

interface JohnQuestionsProps {
  questions: StudentQuestion[];
  setQuestions: (qs: StudentQuestion[]) => void;
  markTaskDone: (taskId: string, isDone: boolean) => void;
  isTaskCompleted: boolean;
}

type QuestionCategory = 'Jesus' | 'Woman' | 'Pharisees' | 'Disciples' | 'Author' | 'Audience';

export const JohnQuestions: React.FC<JohnQuestionsProps> = ({
  questions,
  setQuestions,
  markTaskDone,
  isTaskCompleted
}) => {
  const [newQuestionText, setNewQuestionText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('Jesus');
  const [activeFilter, setActiveFilter] = useState<'All' | QuestionCategory>('All');

  const categories: QuestionCategory[] = ['Jesus', 'Woman', 'Pharisees', 'Disciples', 'Author', 'Audience'];

  const addQuestion = () => {
    const trimmed = newQuestionText.trim();
    if (!trimmed) return;

    const newQuestion: StudentQuestion = {
      id: Math.random().toString(36).substr(2, 9),
      category: selectedCategory,
      text: trimmed.endsWith('?') ? trimmed : `${trimmed}?`
    };

    const updated = [...questions, newQuestion];
    setQuestions(updated);
    setNewQuestionText('');

    if (updated.length >= 30) {
      markTaskDone('B05', true);
    }
  };

  const deleteQuestion = (id: string) => {
    const updated = questions.filter(q => q.id !== id);
    setQuestions(updated);

    if (updated.length < 30 && isTaskCompleted) {
      markTaskDone('B05', false);
    }
  };

  const getCountByCategory = (cat: QuestionCategory) => {
    return questions.filter(q => q.category === cat).length;
  };

  const filteredQuestions = activeFilter === 'All' 
    ? questions 
    : questions.filter(q => q.category === activeFilter);

  const exportQuestions = () => {
    let textContent = `BS510 Inductive Bible Study Method\nLearning Task B05: John 8 (Questions)\n\nTotal Questions: ${questions.length} / 30\n\n`;

    categories.forEach(cat => {
      const catQs = questions.filter(q => q.category === cat);
      textContent += `=== QUESTIONS ADDRESSED TO: ${cat.toUpperCase()} (${catQs.length}) ===\n`;
      if (catQs.length === 0) {
        textContent += `None\n`;
      } else {
        catQs.forEach((q, idx) => {
          textContent += `${idx + 1}. ${q.text}\n`;
        });
      }
      textContent += `\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BS510_John_8_Questions.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Learning Task B05</span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-accent-gold)' }}>John 8:1-11 Question Generator</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={exportQuestions} 
            className="btn btn-secondary"
            disabled={questions.length === 0}
          >
            <Download size={16} /> Export Work
          </button>
          <button 
            onClick={() => markTaskDone('B05', !isTaskCompleted)} 
            className={`btn ${isTaskCompleted ? 'btn-primary' : 'btn-outline-gold'}`}
          >
            {isTaskCompleted ? '✓ Completed (200 pts)' : 'Mark Task Complete'}
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '2rem', borderLeft: '3px solid var(--color-accent-gold)' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>Assignment Guidelines</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          Write out <strong>30 good questions</strong> based on John 8:1-11. Categorize each question by specifying who the question would be addressed to (Jesus, the Woman, the Pharisees, the Disciples, the Author, or the Audience).
        </p>
      </div>

      {/* Progress Bar & Add Form */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>Draft Question</h3>
          <span className={`badge ${questions.length >= 30 ? 'badge-green' : 'badge-gold'}`}>
            Progress: {questions.length} / 30 Questions
          </span>
        </div>

        <div className="progress-bar-bg" style={{ marginBottom: '1.5rem' }}>
          <div className="progress-bar-fill" style={{ width: `${Math.min(100, (questions.length / 30) * 100)}%` }}></div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select 
            className="input-field" 
            style={{ width: '160px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as QuestionCategory)}
          >
            {categories.map(c => (
              <option key={c} value={c} style={{ background: '#0a110e', color: 'var(--color-text-primary)' }}>
                Addressed to: {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="input-field"
            style={{ flex: 1, minWidth: '250px' }}
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addQuestion()}
            placeholder={`Ask a question (e.g., 'What were the Pharisees writing on the ground?')`}
          />

          <button onClick={addQuestion} className="btn btn-primary" style={{ borderRadius: '8px' }}>
            <Plus size={18} /> Add Question
          </button>
        </div>
      </div>

      {/* Category Pills & Question List */}
      <div className="glass-card">
        {/* Category Filter Tab Header */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setActiveFilter('All')}
            className="btn"
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.85rem',
              background: activeFilter === 'All' ? 'var(--color-primary-light)' : 'transparent',
              color: activeFilter === 'All' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            All ({questions.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="btn"
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.85rem',
                background: activeFilter === cat ? 'var(--color-primary-light)' : 'transparent',
                color: activeFilter === cat ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              {cat} ({getCountByCategory(cat)})
            </button>
          ))}
        </div>

        {/* Flat List */}
        {filteredQuestions.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem 0' }}>
            No questions in this category. Write some questions above!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredQuestions.map((q) => (
              <div 
                key={q.id}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                  <HelpCircle size={16} style={{ color: 'var(--color-accent-gold)' }} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                    {activeFilter === 'All' && (
                      <span className="badge badge-gold" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                        {q.category}
                      </span>
                    )}
                    <span style={{ color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{q.text}</span>
                  </div>
                </div>

                <button 
                  onClick={() => deleteQuestion(q.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                  title="Delete Question"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
