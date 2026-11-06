import React, { useState } from 'react';
import { scheduleSessions, learningTasks } from '../data/syllabusData';
import { Calendar, CheckCircle2, Clock, PlayCircle, AlertCircle, X, Copy, Check, Search, BookOpen, Presentation, Download, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import type { StudentAppState } from '../types';
import lectureNotes from '../data/lectureNotes.json';
import slideDecksData from '../data/slideDecks.json';

interface SlideItem {
  slideNum: number;
  title: string;
  bullets: string[];
}

interface SlideDeckEntry {
  key: string;
  filename: string;
  title: string;
  category: 'bite' | 'case_study';
  biteKey?: string;
  pdfCompanion?: string | null;
  slideCount: number;
  slides: SlideItem[];
  fullText: string;
}

const slideDeckList: SlideDeckEntry[] = (slideDecksData as any[]).map((raw) => {
  const slides: SlideItem[] = (raw.slides || []).map((s: any, idx: number) => ({
    slideNum: s.slideNum ?? s.slideNumber ?? idx + 1,
    title: s.title || `Slide ${idx + 1}`,
    bullets: s.bullets || []
  }));
  const biteKey = raw.biteKey || (typeof raw.biteNumber === 'number' ? `Bite ${String(raw.biteNumber).padStart(2, '0')}` : undefined);
  const fullText = raw.fullText || slides.map(s => `${s.title} ${s.bullets.join(' ')}`).join(' ');
  return {
    key: raw.key || raw.id || raw.filename,
    filename: raw.filename,
    title: raw.title,
    category: (raw.category === 'bite' || String(raw.category).includes('Bite') || biteKey) ? 'bite' : 'case_study',
    biteKey,
    pdfCompanion: raw.pdfCompanion || null,
    slideCount: raw.slideCount || slides.length,
    slides,
    fullText
  };
});

const slideDecks: Record<string, SlideDeckEntry> = Object.fromEntries(
  slideDeckList.map(d => [d.key, d])
);

interface ScheduleProps {
  appState: StudentAppState;
  toggleTaskStatus: (taskId: string) => void;
}

export const Schedule: React.FC<ScheduleProps> = ({ appState, toggleTaskStatus }) => {
  const [selectedBite, setSelectedBite] = useState<string | null>(null);
  const [selectedBiteTitle, setSelectedBiteTitle] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [modalTab, setModalTab] = useState<'notes' | 'slides' | 'pdf'>('notes');
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [selectedDeckKey, setSelectedDeckKey] = useState<string | null>(null);
  const [showSlideLibrary, setShowSlideLibrary] = useState<boolean>(true);
  
  // Smart Search State
  const [searchQuery, setSearchQuery] = useState('');

  const getDeckForBite = (biteKey: string): SlideDeckEntry | undefined => {
    return slideDeckList.find(d => d.biteKey?.toLowerCase() === biteKey.toLowerCase());
  };

  const handleBiteClick = (biteKey: string, fullTitle: string, initialTab: 'notes' | 'slides' | 'pdf' = 'notes') => {
    setSelectedDeckKey(null);
    setSelectedBite(biteKey);
    setSelectedBiteTitle(fullTitle);
    setModalTab(initialTab);
    setActiveSlideIdx(0);
    setCopied(false);
  };

  const handleOpenDeckModal = (deck: SlideDeckEntry, initialTab: 'slides' | 'pdf' = 'slides') => {
    if (deck.biteKey) {
      const session = scheduleSessions.find(s => s.classBites.some(b => b.toLowerCase().includes(deck.biteKey!.toLowerCase())));
      const fullTitle = session?.classBites.find(b => b.toLowerCase().includes(deck.biteKey!.toLowerCase())) || deck.title;
      setSelectedDeckKey(deck.key);
      setSelectedBite(deck.biteKey);
      setSelectedBiteTitle(fullTitle);
      setModalTab(initialTab);
      setActiveSlideIdx(0);
      setCopied(false);
    } else {
      setSelectedDeckKey(deck.key);
      setSelectedBite(deck.key);
      setSelectedBiteTitle(deck.title);
      setModalTab(initialTab);
      setActiveSlideIdx(0);
      setCopied(false);
    }
  };

  const handleCopyNotes = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBiteNotes = (biteKey: string): string => {
    const raw = (lectureNotes as Record<string, string>)[biteKey];
    if (!raw) return "No Word lecture notes found for this item. Switch to the 'Slide Deck (.pptx)' tab above to view the presentation slides.";
    if (raw.includes("Error reading") || raw.trim().length === 0) {
      return `Bite Notes Draft Outline:\n\nUse this space for your notes on ${biteKey}.\n\nPoints discussed in class:\n- Key observations\n- Class questions\n- Application guidelines`;
    }
    return raw;
  };

  // Search filter across both Word lecture notes AND PowerPoint slide decks
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const results: { biteKey: string; snippet: string; sessionNum: number; fullTitle: string; source: 'Notes' | 'Slides'; deckKey?: string }[] = [];
    const query = searchQuery.toLowerCase();
    
    Object.entries(lectureNotes).forEach(([biteKey, text]) => {
      if (text.toLowerCase().includes(query)) {
        const session = scheduleSessions.find(s => s.classBites.some(b => b.toLowerCase().includes(biteKey.toLowerCase())));
        const sessionNum = session ? session.sessionNum : 1;
        const fullTitle = session ? session.classBites.find(b => b.toLowerCase().includes(biteKey.toLowerCase())) || biteKey : biteKey;
        
        const idx = text.toLowerCase().indexOf(query);
        const start = Math.max(0, idx - 40);
        const end = Math.min(text.length, idx + query.length + 60);
        let snippet = text.substring(start, end).replace(/\s+/g, ' ');
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';
        
        results.push({ biteKey, snippet, sessionNum, fullTitle, source: 'Notes' });
      }
    });

    slideDeckList.forEach((deck) => {
      if (deck.fullText.toLowerCase().includes(query) || deck.title.toLowerCase().includes(query)) {
        const idx = deck.fullText.toLowerCase().indexOf(query);
        const start = Math.max(0, idx - 40);
        const end = Math.min(deck.fullText.length, idx + query.length + 60);
        let snippet = idx >= 0 ? deck.fullText.substring(start, end).replace(/\s+/g, ' ') : deck.title;
        if (start > 0) snippet = '...' + snippet;
        if (end < deck.fullText.length) snippet = snippet + '...';

        results.push({
          biteKey: deck.biteKey || deck.key,
          snippet,
          sessionNum: 0,
          fullTitle: `${deck.title} (${deck.filename})`,
          source: 'Slides',
          deckKey: deck.key
        });
      }
    });

    return results;
  };

  const searchResults = getSearchResults();
  const caseStudyDecks = slideDeckList.filter(d => d.category === 'case_study');
  const activeModalDeck: SlideDeckEntry | undefined = selectedDeckKey
    ? slideDecks[selectedDeckKey]
    : (selectedBite ? getDeckForBite(selectedBite) : undefined);

  return (
    <div className="fade-in">
      <style>{`
        .hover-bite {
          transition: all 0.2s ease-in-out;
        }
        .hover-bite:hover {
          background: rgba(212, 175, 55, 0.08) !important;
          border-color: rgba(212, 175, 55, 0.4) !important;
          transform: translateX(4px);
        }
      `}</style>

      <header style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>
              Weekly Course Schedule & Slide Library
            </h1>
            <p style={{ fontSize: '1.05rem', maxWidth: '800px', marginBottom: '1.25rem' }}>
              Follow the weekly timeline of pre-class preparation, class topics ("Bites"), and all 25 newly added PowerPoint slide decks & case studies (`Bite 01x–19x`, `Bite Argument JL`, `C Mark 4 & 5`, `C Luke 15`, `C Mark 1 & 2`, `Graphic Organizer`, `EGYPT`, and `WADI WALK`).
            </p>
          </div>
          <button
            onClick={() => setShowSlideLibrary(!showSlideLibrary)}
            className="btn btn-secondary"
            style={{ border: '1px solid var(--color-accent-gold)', color: 'var(--color-accent-gold)' }}
          >
            <Presentation size={16} /> {showSlideLibrary ? 'Hide Slide Deck Library (25)' : 'Show Slide Deck Library (25)'}
          </button>
        </div>

        {/* Smart Search Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '650px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
            <Search size={16} />
          </div>
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '2.25rem', flex: 1 }}
            placeholder="Search all 22 lecture notes + 25 PowerPoint slide decks (e.g. 'Big Idea', 'Luke 15', 'Capernaum')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={15} />
            </button>
          )}
        </div>
      </header>

      {/* CASE STUDIES & SEMINAR SLIDE DECKS GALLERY */}
      {showSlideLibrary && (
        <div className="glass-card" style={{ marginBottom: '2.25rem', border: '1px solid rgba(212, 175, 55, 0.3)', background: 'rgba(212, 175, 55, 0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>Dr. Keith Shubert Course Presentations</span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--color-accent-gold)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Presentation size={18} /> Special Case Studies, Book Charts & Background Seminars ({caseStudyDecks.length} Decks)
              </h3>
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
              Click any presentation to inspect all slides or download the original `.pptx` / `.pdf`
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.9rem', marginBottom: '0.5rem' }}>
            {caseStudyDecks.map((deck) => (
              <div
                key={deck.key}
                className="hover-bite"
                style={{
                  padding: '0.9rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.65rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <strong style={{ color: 'var(--color-text-primary)', fontSize: '0.95rem', lineHeight: 1.3 }}>
                      {deck.title}
                    </strong>
                    <span className="badge badge-gold" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                      {deck.slideCount} slides
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>
                    File: <code>{deck.filename}</code>
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  <button
                    onClick={() => handleOpenDeckModal(deck, 'slides')}
                    className="btn btn-primary"
                    style={{ padding: '0.32rem 0.7rem', fontSize: '0.76rem' }}
                  >
                    <Presentation size={13} /> View Slides
                  </button>
                  {deck.pdfCompanion && (
                    <button
                      onClick={() => handleOpenDeckModal(deck, 'pdf')}
                      className="btn btn-secondary"
                      style={{ padding: '0.32rem 0.7rem', fontSize: '0.76rem', border: '1px solid var(--color-accent-gold)', color: 'var(--color-accent-gold)' }}
                    >
                      <FileText size={13} /> Open PDF (41p)
                    </button>
                  )}
                  <a
                    href={`/slides/${encodeURIComponent(deck.filename)}`}
                    download={deck.filename}
                    className="btn btn-secondary"
                    style={{ padding: '0.32rem 0.65rem', fontSize: '0.76rem', textDecoration: 'none' }}
                  >
                    <Download size={13} /> .pptx
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results Display */}
      {searchQuery && (
        <div className="glass-card" style={{ marginBottom: '2rem', border: '1px solid rgba(212, 175, 55, 0.25)', background: 'rgba(212, 175, 55, 0.02)' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={16} /> Search Results ({searchResults.length})
          </h3>
          {searchResults.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>
              No matches found for "{searchQuery}". Try searching for 'Big Idea', 'Luke 15', 'climax', 'structure', or 'Capernaum'.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {searchResults.map((res, index) => (
                <div 
                  key={index} 
                  onClick={() => {
                    if (res.deckKey && slideDecks[res.deckKey]) {
                      handleOpenDeckModal(slideDecks[res.deckKey], 'slides');
                    } else {
                      handleBiteClick(res.biteKey, res.fullTitle, 'notes');
                    }
                  }}
                  style={{ 
                    padding: '0.75rem', 
                    borderRadius: '8px', 
                    background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="hover-bite"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                      {res.fullTitle} {res.sessionNum > 0 ? `(Session #${res.sessionNum})` : ''}
                    </strong>
                    <span className={res.source === 'Slides' ? 'badge badge-green' : 'badge badge-gold'} style={{ fontSize: '0.7rem' }}>
                      {res.source === 'Slides' ? 'PowerPoint Slides' : 'Word Notes'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0, fontStyle: 'italic' }}>
                    {res.snippet}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingLeft: '1.5rem' }}>
        {/* Vertical Timeline Line */}
        <div style={{
          position: 'absolute',
          top: '10px',
          bottom: '10px',
          left: '7px',
          width: '2px',
          background: 'rgba(212, 175, 55, 0.15)'
        }}></div>

        {scheduleSessions.map((session) => {
          // Check if session tasks are completed
          const totalSessionTasks = session.tasksDue.length;
          const completedSessionTasks = session.tasksDue.filter(taskName => {
            const match = taskName.match(/^([A-E]\d{2})/);
            if (match) {
              const taskId = match[1];
              return appState.taskStatus[taskId] === 'done';
            }
            return false;
          }).length;

          const isFullyDone = totalSessionTasks > 0 && completedSessionTasks === totalSessionTasks;

          return (
            <div key={session.sessionNum} className="glass-card" style={{ 
              position: 'relative', 
              marginLeft: '1rem',
              borderLeft: isFullyDone ? '4px solid var(--color-accent-emerald)' : '1px solid var(--border-color)',
            }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-2.15rem',
                top: '1.5rem',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: isFullyDone ? 'var(--color-accent-emerald)' : 'var(--color-primary-light)',
                border: '3px solid var(--color-bg-base)',
                boxShadow: '0 0 0 2px rgba(212, 175, 55, 0.1)'
              }}></div>

              {/* Session Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.75rem' }}>
                <div>
                  <span className="badge badge-gold" style={{ marginBottom: '0.5rem', marginRight: '0.5rem' }}>
                    Session #{session.sessionNum}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    {session.date} | 9:00 AM - Noon
                  </span>
                  <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem', color: 'var(--color-text-primary)' }}>
                    {session.module}
                  </h3>
                </div>
                
                {totalSessionTasks > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                      Tasks: {completedSessionTasks}/{totalSessionTasks} Done
                    </span>
                    {isFullyDone ? (
                      <span className="badge badge-green">Complete</span>
                    ) : (
                      <span className="badge badge-gold">Pending</span>
                    )}
                  </div>
                )}
              </div>

              <div className="grid-2" style={{ gap: '1.5rem' }}>
                {/* Left side: Pre-class & Bites */}
                <div>
                  {session.preClass && (
                    <div style={{ marginBottom: '1rem', background: 'rgba(212, 175, 55, 0.04)', padding: '0.75rem', borderRadius: '8px', borderLeft: '2.5px solid var(--color-accent-gold-dark)' }}>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-accent-gold)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={13} /> Pre-Class Preparation
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                        {session.preClass}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <PlayCircle size={14} /> Class Outline ("Bites")
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '0.25rem' }}>
                      {session.classBites.map((bite, bIdx) => {
                        const match = bite.match(/^(Bite\s+\d+)/i);
                        const biteKey = match ? match[1] : '';
                        const hasNotes = !!biteKey;
                        const matchingDeck = biteKey ? getDeckForBite(biteKey) : undefined;

                        return (
                          <li 
                            key={bIdx} 
                            onClick={() => hasNotes && handleBiteClick(biteKey, bite, 'notes')}
                            style={{ 
                              fontSize: '0.88rem', 
                              color: 'var(--color-text-secondary)', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.5rem',
                              cursor: hasNotes ? 'pointer' : 'default',
                              padding: '0.35rem 0.6rem',
                              borderRadius: '6px',
                              background: hasNotes ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                              border: hasNotes ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid transparent',
                              flexWrap: 'wrap'
                            }}
                            className={hasNotes ? 'hover-bite' : ''}
                          >
                            <span style={{ color: 'var(--color-accent-emerald)', fontSize: '1rem' }}>•</span>
                            <span style={{ flex: 1, textDecoration: hasNotes ? 'underline decoration-dotted' : 'none' }}>{bite}</span>
                            {hasNotes && (
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBiteClick(biteKey, bite, 'notes');
                                }}
                                className="badge badge-gold"
                                style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem', cursor: 'pointer' }}
                              >
                                Notes
                              </span>
                            )}
                            {matchingDeck && (
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBiteClick(biteKey, bite, 'slides');
                                }}
                                className="badge badge-green"
                                style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', cursor: 'pointer' }}
                                title={`Open ${matchingDeck.filename} (${matchingDeck.slideCount} slides)`}
                              >
                                PPTX ({matchingDeck.slideCount})
                              </span>
                            )}
                            {matchingDeck?.pdfCompanion && (
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBiteClick(biteKey, bite, 'pdf');
                                }}
                                className="badge badge-gold"
                                style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem', cursor: 'pointer', background: 'rgba(56, 189, 248, 0.15)', color: '#7dd3fc', borderColor: 'rgba(56, 189, 248, 0.3)' }}
                              >
                                PDF
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Right side: Tasks Due Tracker */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-accent-gold)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <AlertCircle size={14} /> Deliverables Due
                  </h4>
                  {session.tasksDue.length === 0 ? (
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                      No tasks due for submission. Enjoy the rest/meditation!
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {session.tasksDue.map((taskName, tIdx) => {
                        const match = taskName.match(/^([A-E]\d{2})/);
                        const taskId = match ? match[1] : '';
                        const taskDetail = learningTasks.find(t => t.id === taskId);
                        const isDone = appState.taskStatus[taskId] === 'done';

                        return (
                          <div 
                            key={tIdx} 
                            style={{ 
                              padding: '0.75rem', 
                              borderRadius: '8px', 
                              background: isDone ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.02)',
                              border: isDone ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(255,255,255,0.05)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '1rem'
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                                  {taskId}
                                </span>
                                <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                                  {taskDetail ? taskDetail.title : taskName}
                                </span>
                              </div>
                              {taskDetail && (
                                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.2rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                  <span>Due: {taskDetail.dueDate}</span>
                                  <span>•</span>
                                  <span>{taskDetail.points} pts</span>
                                  <span>•</span>
                                  <span>{taskDetail.timeHours} hrs expected</span>
                                </div>
                              )}
                            </div>

                            <button 
                              onClick={() => toggleTaskStatus(taskId)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: isDone ? 'var(--color-accent-emerald)' : 'var(--color-text-muted)',
                                transition: 'color var(--transition-fast)'
                              }}
                              title={isDone ? "Mark Incomplete" : "Mark Complete"}
                            >
                              <CheckCircle2 size={22} style={{ fill: isDone ? 'rgba(16, 185, 129, 0.1)' : 'transparent' }} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Calendar Notes */}
        <div className="glass-card" style={{ marginLeft: '1rem', marginTop: '1rem', background: 'rgba(212, 175, 55, 0.03)' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} /> Syllabus Notice on Deadlines
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
            It is essential that you complete each Learning Task on time. If a Learning Task is completed late, it will receive <strong>no credit (0 points)</strong>. All tasks are due at <strong>11:59 PM</strong> on Populi on their respective dates. 
          </p>
        </div>
      </div>

      {/* LECTURE NOTES + SLIDE DECK + PDF MODAL */}
      {selectedBite && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(6, 11, 9, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div className="glass-card fade-in" style={{
            maxWidth: '940px',
            width: '100%',
            maxHeight: '88vh',
            overflowY: 'auto',
            border: '1px solid var(--border-color)',
            padding: '2rem',
            position: 'relative',
            background: 'var(--color-bg-card)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            {/* Close Button */}
            <button 
              onClick={() => setSelectedBite(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                padding: '0.25rem'
              }}
            >
              <X size={20} />
            </button>

            {/* Header / Actions */}
            <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', paddingRight: '2rem' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Lecture & Presentation Study Guide</span>
              <h2 style={{ fontSize: '1.75rem', color: 'var(--color-accent-gold)', lineHeight: 1.2 }}>{selectedBiteTitle}</h2>

              {/* Modal View Switcher Tabs */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {(lectureNotes as Record<string, string>)[selectedBite] && (
                    <button
                      onClick={() => setModalTab('notes')}
                      className={modalTab === 'notes' ? 'btn btn-primary' : 'btn btn-secondary'}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      <BookOpen size={14} /> Word Lecture Notes (.docx)
                    </button>
                  )}
                  {activeModalDeck && (
                    <button
                      onClick={() => setModalTab('slides')}
                      className={modalTab === 'slides' ? 'btn btn-primary' : 'btn btn-secondary'}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      <Presentation size={14} /> Slide Deck ({activeModalDeck.slideCount} Slides)
                    </button>
                  )}
                  {activeModalDeck?.pdfCompanion && (
                    <button
                      onClick={() => setModalTab('pdf')}
                      className={modalTab === 'pdf' ? 'btn btn-primary' : 'btn btn-secondary'}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      <FileText size={14} /> Embedded PDF Slides
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {modalTab === 'notes' && (
                    <button 
                      onClick={() => handleCopyNotes(getBiteNotes(selectedBite))}
                      className="btn btn-secondary"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                    >
                      {copied ? <Check size={14} style={{ color: 'var(--color-accent-emerald)' }} /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy Notes'}
                    </button>
                  )}
                  {activeModalDeck && (
                    <a
                      href={`/slides/${encodeURIComponent(activeModalDeck.filename)}`}
                      download={activeModalDeck.filename}
                      className="btn btn-secondary"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.85rem', fontSize: '0.8rem', textDecoration: 'none', border: '1px solid var(--color-accent-gold)', color: 'var(--color-accent-gold)' }}
                    >
                      <Download size={14} /> Download {activeModalDeck.filename}
                    </a>
                  )}
                  {activeModalDeck?.pdfCompanion && (
                    <a
                      href={`/slides/${encodeURIComponent(activeModalDeck.pdfCompanion)}`}
                      download={activeModalDeck.pdfCompanion}
                      className="btn btn-secondary"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.85rem', fontSize: '0.8rem', textDecoration: 'none' }}
                    >
                      <Download size={14} /> Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* TAB 1: WORD LECTURE NOTES */}
            {modalTab === 'notes' && (
              <div style={{ 
                whiteSpace: 'pre-wrap', 
                fontFamily: '"Outfit", sans-serif', 
                fontSize: '1rem', 
                lineHeight: '1.6', 
                color: 'var(--color-text-primary)',
                background: 'rgba(255,255,255,0.01)',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.03)',
                maxHeight: '55vh',
                overflowY: 'auto'
              }}>
                {getBiteNotes(selectedBite)}
              </div>
            )}

            {/* TAB 2: INTERACTIVE SLIDE DECK VIEWER */}
            {modalTab === 'slides' && activeModalDeck && (
              <div>
                {/* Interactive Current Slide Card */}
                {activeModalDeck.slides.length > 0 && (
                  <div
                    style={{
                      background: 'linear-gradient(145deg, #fdf6e3 0%, #f3e5ab 100%)',
                      color: '#1e1b18',
                      borderRadius: '10px',
                      padding: '1.75rem 2rem',
                      marginBottom: '1.25rem',
                      border: '2px solid #b45309',
                      minHeight: '220px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid rgba(180, 83, 9, 0.25)', paddingBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {activeModalDeck.filename}
                        </span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#78350f' }}>
                          Slide {activeSlideIdx + 1} of {activeModalDeck.slides.length}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.4rem', color: '#7c2d12', marginBottom: '0.85rem', fontFamily: 'Georgia, serif' }}>
                        {activeModalDeck.slides[activeSlideIdx]?.title}
                      </h3>
                      <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', margin: 0 }}>
                        {activeModalDeck.slides[activeSlideIdx]?.bullets.map((b, idx) => (
                          <li key={idx} style={{ fontSize: '0.98rem', color: '#1c1917', lineHeight: 1.5 }}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(180, 83, 9, 0.2)' }}>
                      <button
                        onClick={() => setActiveSlideIdx(Math.max(0, activeSlideIdx - 1))}
                        disabled={activeSlideIdx === 0}
                        className="btn btn-secondary"
                        style={{ background: '#78350f', color: '#fef3c7', border: 'none', padding: '0.35rem 0.85rem', fontSize: '0.8rem', opacity: activeSlideIdx === 0 ? 0.4 : 1 }}
                      >
                        <ChevronLeft size={14} /> Prev Slide
                      </button>
                      <span style={{ fontSize: '0.8rem', color: '#78350f', fontWeight: 600 }}>
                        Click any slide below to jump directly
                      </span>
                      <button
                        onClick={() => setActiveSlideIdx(Math.min(activeModalDeck.slides.length - 1, activeSlideIdx + 1))}
                        disabled={activeSlideIdx >= activeModalDeck.slides.length - 1}
                        className="btn btn-secondary"
                        style={{ background: '#78350f', color: '#fef3c7', border: 'none', padding: '0.35rem 0.85rem', fontSize: '0.8rem', opacity: activeSlideIdx >= activeModalDeck.slides.length - 1 ? 0.4 : 1 }}
                      >
                        Next Slide <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Complete Scrollable Slide Outline List */}
                <div style={{ maxHeight: '32vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '0.25rem' }}>
                  {activeModalDeck.slides.map((s, idx) => (
                    <div
                      key={s.slideNum}
                      onClick={() => setActiveSlideIdx(idx)}
                      style={{
                        padding: '0.65rem 0.9rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: idx === activeSlideIdx ? 'rgba(212, 175, 55, 0.14)' : 'rgba(255,255,255,0.02)',
                        border: idx === activeSlideIdx ? '1px solid var(--color-accent-gold)' : '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <strong style={{ color: 'var(--color-accent-gold)', fontSize: '0.88rem' }}>
                          Slide #{s.slideNum}: {s.title}
                        </strong>
                      </div>
                      {s.bullets.length > 0 && (
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                          {s.bullets.join(' • ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: EMBEDDED PDF VIEWER */}
            {modalTab === 'pdf' && activeModalDeck?.pdfCompanion && (
              <div style={{ height: '60vh', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <iframe
                  src={`/slides/${encodeURIComponent(activeModalDeck.pdfCompanion)}`}
                  title={activeModalDeck.pdfCompanion}
                  style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
                />
              </div>
            )}
            
            {/* Modal Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <button onClick={() => setSelectedBite(null)} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
                Close Guide
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
