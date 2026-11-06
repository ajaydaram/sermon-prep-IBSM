import React, { useState, useEffect } from 'react';
import type { StudentHelperStudy } from '../../types';
import { ChevronLeft, ChevronRight, Download, Search, BookOpen, Check } from 'lucide-react';

interface HelperWordStudyProps {
  helperStudy: StudentHelperStudy;
  setHelperStudy: (study: StudentHelperStudy) => void;
  markTaskDone: (taskId: string, isDone: boolean) => void;
  isTaskCompleted: boolean;
}

interface LexiconEntry {
  lemma: string;
  translit: string;
  pronunciation?: string;
  def: string;
  derivation?: string;
}

export const HelperWordStudy: React.FC<HelperWordStudyProps> = ({
  helperStudy,
  setHelperStudy,
  markTaskDone,
  isTaskCompleted
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Lexicon & Interlinear States
  const [lexiconData, setLexiconData] = useState<any>(null);
  const [lexiconLoading, setLexiconLoading] = useState<boolean>(false);
  const [lexiconSearch, setLexiconSearch] = useState<string>('');
  const [selectedLexiconWord, setSelectedLexiconWord] = useState<any>({
    strongs: 'H5828',
    lemma: 'עֵזֶר',
    translit: 'ʻêzer',
    pronunciation: "ay'-zer",
    def: '1) help,  succour; 1a) help,  succour; 1b) one who helps',
    derivation: 'from H5826;'
  });

  // Load the Hebrew strongs database on mount
  useEffect(() => {
    const fetchLexicon = async () => {
      setLexiconLoading(true);
      try {
        const res = await fetch('/resources/lexicon/strongs-hebrew.json');
        const data = await res.json();
        setLexiconData(data);
      } catch (err) {
        console.error("Failed to load lexicon database:", err);
      } finally {
        setLexiconLoading(false);
      }
    };
    fetchLexicon();
  }, []);

  const handleTextChange = (field: keyof StudentHelperStudy, value: string) => {
    setHelperStudy({
      ...helperStudy,
      [field]: value
    });
  };

  const steps = [
    {
      num: 1,
      title: "Cultural Definition",
      desc: "Define 'helper' in your culture."
    },
    {
      num: 2,
      title: "Concordance & Interlinear Bible",
      desc: "Hebrew root words & interactive lookup."
    },
    {
      num: 3,
      title: "OT Cross-References",
      desc: "How 'helper' is used elsewhere in the OT."
    },
    {
      num: 4,
      title: "Synthesis & Comparison",
      desc: "How your understanding has evolved."
    }
  ];

  // Genesis 2:18 interlinear word list
  const interlinearWords = [
    { eng: "Then the LORD", heb: "וַיֹּאמֶר יְהוָה", strongs: "H3068" },
    { eng: "God", heb: "אֱלֹהִים", strongs: "H430" },
    { eng: "said,", heb: "אָמַר", strongs: "H559" },
    { eng: "It is not", heb: "לֹא־", strongs: "H3808" },
    { eng: "good", heb: "טוֹב", strongs: "H2896" },
    { eng: "that the man", heb: "הָאָדָם", strongs: "H120" },
    { eng: "should be", heb: "הֱיוֹת", strongs: "H1961" },
    { eng: "alone;", heb: "לְבַדּוֹ", strongs: "H905" },
    { eng: "I will make", heb: "אֶעֱשֶׂהּ־", strongs: "H6213" },
    { eng: "him a helper", heb: "עֵזֶר", strongs: "H5828" },
    { eng: "fit", heb: "כְּנֶגְדּוֹ", strongs: "H5048" },
    { eng: "for him.", heb: "לּוֹ", strongs: "H1" }
  ];

  const handleWordClick = (strongs: string) => {
    if (!strongs) return;
    if (lexiconData && lexiconData[strongs]) {
      const entry = lexiconData[strongs] as LexiconEntry;
      setSelectedLexiconWord({
        strongs,
        lemma: entry.lemma || '',
        translit: entry.translit || '',
        pronunciation: entry.pronunciation || '',
        def: entry.def || '',
        derivation: entry.derivation || ''
      });
    } else {
      setSelectedLexiconWord({
        strongs,
        lemma: "N/A",
        translit: "N/A",
        pronunciation: "N/A",
        def: "Looking up. Enter strongs number manually or try H5828 / H5826.",
        derivation: "N/A"
      });
    }
  };

  const handleSearchLexicon = () => {
    const term = lexiconSearch.trim();
    if (!term) return;

    let strongsKey = term.toUpperCase();
    if (/^\d+$/.test(term)) {
      strongsKey = 'H' + term;
    }

    if (lexiconData && lexiconData[strongsKey]) {
      const entry = lexiconData[strongsKey] as LexiconEntry;
      setSelectedLexiconWord({
        strongs: strongsKey,
        lemma: entry.lemma || '',
        translit: entry.translit || '',
        pronunciation: entry.pronunciation || '',
        def: entry.def || '',
        derivation: entry.derivation || ''
      });
      return;
    }

    if (lexiconData) {
      const match = Object.entries(lexiconData).find(([, val]: [string, any]) => 
        val.def.toLowerCase().includes(term.toLowerCase()) || 
        val.lemma.includes(term) ||
        val.translit.toLowerCase().includes(term.toLowerCase())
      );
      if (match) {
        const entry = match[1] as LexiconEntry;
        setSelectedLexiconWord({
          strongs: match[0],
          lemma: entry.lemma || '',
          translit: entry.translit || '',
          pronunciation: entry.pronunciation || '',
          def: entry.def || '',
          derivation: entry.derivation || ''
        });
      } else {
        alert(`No results found for "${term}" in Hebrew database.`);
      }
    }
  };

  const applyWordToInputs = () => {
    setHelperStudy({
      ...helperStudy,
      step2HebrewNum: `${selectedLexiconWord.strongs} - ${selectedLexiconWord.lemma} (${selectedLexiconWord.translit})`
    });
    alert(`Applied ${selectedLexiconWord.lemma} to your workspace concordance input!`);
  };

  const exportWordStudy = () => {
    const textContent = `BS510 Inductive Bible Study Method\nLearning Task C07: Helper (Word Study) in Genesis 2:18\n\n=== STEP 1: CULTURAL DEFINITION ===\nWhat "helper" means in my culture and how husbands relate to a helper:\n${helperStudy.step1Culture || 'Pending'}\n\n=== STEP 2: CONCORDANCE RESEARCH ===\nStrong's Concordance details:\n- Hebrew index (H5826/H5828 - 'Ezer): ${helperStudy.step2HebrewNum || 'e.g. 5826'}\n- Greek equivalents in NT: ${helperStudy.step2GreekNum || 'e.g. Boethos / Parakletos'}\n\n=== STEP 3: OT CROSS-REFERENCES ===\nObservations on other Old Testament uses (God as Helper):\n${helperStudy.step3OtObservations || 'Pending'}\n\n=== STEP 4: SYNTHESIS ===\nHow my understanding has changed since Step 1:\n${helperStudy.step4Synthesis || 'Pending'}`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BS510_Genesis_2_18_Word_Study.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Learning Task C07</span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-accent-gold)' }}>Helper (Word Study) Wizard</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={exportWordStudy} 
            className="btn btn-secondary"
          >
            <Download size={16} /> Export Work
          </button>
          <button 
            onClick={() => markTaskDone('C07', !isTaskCompleted)} 
            className={`btn ${isTaskCompleted ? 'btn-primary' : 'btn-outline-gold'}`}
          >
            {isTaskCompleted ? '✓ Completed (200 pts)' : 'Mark Task Complete'}
          </button>
        </div>
      </div>

      {/* Steps Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {steps.map(step => (
          <button
            key={step.num}
            onClick={() => setCurrentStep(step.num)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: currentStep === step.num ? 'var(--color-accent-gold)' : 'var(--border-color)',
              background: currentStep === step.num ? 'rgba(212, 175, 55, 0.08)' : 'rgba(18, 28, 24, 0.4)',
              textAlign: 'left',
              cursor: 'pointer',
              minWidth: '150px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ fontSize: '0.75rem', color: currentStep === step.num ? 'var(--color-accent-gold)' : 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Step {step.num}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {step.title}
            </div>
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="glass-card" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* STEP 1: Cultural Definition */}
        {currentStep === 1 && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.75rem' }}>
              Step 1: Culture & Initial Definition
            </h3>
            <div style={{ background: 'rgba(212, 175, 55, 0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', borderLeft: '2px solid var(--color-accent-gold)' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                <strong>Genesis 2:18 Text:</strong> “Then the Lord God said, ‘It is not good for the man to be alone; I will make him a <strong>helper</strong> suitable for him.’”
              </p>
            </div>
            <label className="label" style={{ marginBottom: '0.5rem' }}>What does "helper" mean in your own culture?</label>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              In your culture, how does the husband (who is often considered the head of the home) relate to a "helper"? Is it a title of submission, assistance, domestic work, or partnership?
            </p>
            <textarea
              className="input-field"
              style={{ minHeight: '150px', resize: 'vertical' }}
              value={helperStudy.step1Culture}
              onChange={(e) => handleTextChange('step1Culture', e.target.value)}
              placeholder="Write your cultural observations here..."
            ></textarea>
          </div>
        )}

        {/* STEP 2: Concordance Research & Interactive Bible */}
        {currentStep === 2 && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.75rem' }}>
              Step 2: Interactive Interlinear Bible & Lexicon Search
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Click any word in the **Genesis 2:18 Interlinear Passage** to load its Lemma, Transliteration, Pronunciation, and definitions from the Hebrew database.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              
              {/* Interlinear Display */}
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-accent-gold)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <BookOpen size={15} /> Clickable Genesis 2:18 Interlinear
                </h4>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  {interlinearWords.map((w, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleWordClick(w.strongs)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        background: selectedLexiconWord.strongs === w.strongs ? 'var(--color-primary-light)' : 'rgba(255,255,255,0.03)',
                        border: selectedLexiconWord.strongs === w.strongs ? '1px solid var(--color-accent-gold)' : '1px solid var(--border-color)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        minWidth: '65px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{w.eng}</div>
                      <div style={{ fontSize: '1rem', color: 'var(--color-text-primary)', margin: '0.2rem 0', fontFamily: 'serif' }}>{w.heb}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--color-accent-gold)' }}>{w.strongs || 'N/A'}</div>
                    </div>
                  ))}
                </div>

                {/* Lexicon Search Input */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="input-field"
                    style={{ fontSize: '0.88rem', flex: 1 }}
                    value={lexiconSearch}
                    onChange={(e) => setLexiconSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchLexicon()}
                    placeholder="Search lexicon by word or Strong's (e.g. H5828 or 'father')..."
                  />
                  <button onClick={handleSearchLexicon} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    <Search size={16} /> Search
                  </button>
                  {lexiconLoading && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-gold)', marginLeft: '0.5rem' }}>Loading DB...</span>
                  )}
                </div>
              </div>

              {/* Lexicon Sidebar Card */}
              <div style={{ background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>{selectedLexiconWord.strongs || 'Lexicon'}</span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>{selectedLexiconWord.lemma}</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                    Translit: <em>{selectedLexiconWord.translit}</em> | Pronounce: {selectedLexiconWord.pronunciation}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', maxHeight: '150px', overflowY: 'auto', paddingRight: '0.25rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', lineHeight: '1.4' }}>
                    {selectedLexiconWord.def}
                  </div>
                  {selectedLexiconWord.derivation && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                      Derivation: {selectedLexiconWord.derivation}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={applyWordToInputs} 
                  className="btn btn-outline-gold" 
                  style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                >
                  <Check size={14} /> Apply to Workspace Input
                </button>
              </div>

            </div>

            {/* Core Form Inputs */}
            <div className="grid-2" style={{ gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <div>
                <label className="label">Hebrew Strong's Number & Original Word</label>
                <input
                  type="text"
                  className="input-field"
                  value={helperStudy.step2HebrewNum}
                  onChange={(e) => handleTextChange('step2HebrewNum', e.target.value)}
                  placeholder="e.g., H5826 - עֵזֶר ('ezer)"
                />
              </div>
              
              <div>
                <label className="label">New Testament Greek Equivalent (Strong's & Word)</label>
                <input
                  type="text"
                  className="input-field"
                  value={helperStudy.step2GreekNum}
                  onChange={(e) => handleTextChange('step2GreekNum', e.target.value)}
                  placeholder="e.g., G998 - βοηθός (boēthos) or G3875 (paraklētos)"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: OT Cross-References */}
        {currentStep === 3 && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.75rem' }}>
              Step 3: Old Testament Cross-References
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Look at other Old Testament passages where <em>'ezer</em> occurs (besides Gen 2:18). What observations do you notice? Who is usually the "helper" in these verses?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', maxHeight: '180px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', borderRadius: '6px', fontSize: '0.85rem' }}>
                <strong>Exodus 18:4:</strong> “...for he said, ‘The God of my father was my <strong>helper</strong>, and delivered me from the sword of Pharaoh.’”
              </div>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', borderRadius: '6px', fontSize: '0.85rem' }}>
                <strong>Psalm 33:20:</strong> “Our soul waits for the Lord; He is our <strong>help</strong> and our shield.”
              </div>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', borderRadius: '6px', fontSize: '0.85rem' }}>
                <strong>Psalm 121:1-2:</strong> “I will lift up my eyes to the mountains; from where shall my <strong>help</strong> come? My <strong>help</strong> comes from the Lord, who made heaven and earth.”
              </div>
            </div>

            <label className="label" style={{ marginBottom: '0.5rem' }}>What observations do you notice that are extremely important to our Genesis 2:18 passage?</label>
            <textarea
              className="input-field"
              style={{ minHeight: '120px', resize: 'vertical' }}
              value={helperStudy.step3OtObservations}
              onChange={(e) => handleTextChange('step3OtObservations', e.target.value)}
              placeholder="Record your observations on OT uses of the word 'ezer'..."
            ></textarea>
          </div>
        )}

        {/* STEP 4: Synthesis & Comparison */}
        {currentStep === 4 && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginBottom: '0.75rem' }}>
              Step 4: Synthesis & Evolution of Meaning
            </h3>
            <label className="label" style={{ marginBottom: '0.5rem' }}>In light of your research, how has your understanding of "helper" and Genesis 2:18 changed, if at all, from what you wrote in Step One?</label>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              Summarize how the scriptural context of the word <em>'ezer</em> (frequently used of God as a strong military shield and rescuer of humanity) modifies or expands your cultural view.
            </p>
            <textarea
              className="input-field"
              style={{ minHeight: '160px', resize: 'vertical' }}
              value={helperStudy.step4Synthesis}
              onChange={(e) => handleTextChange('step4Synthesis', e.target.value)}
              placeholder="Summarize your final word study findings..."
            ></textarea>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className="btn btn-secondary"
            disabled={currentStep === 1}
            style={{ padding: '0.5rem 1rem' }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', alignSelf: 'center' }}>
            Step {currentStep} of 4
          </span>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1.25rem' }}
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => markTaskDone('C07', !isTaskCompleted)}
              className={`btn ${isTaskCompleted ? 'btn-secondary' : 'btn-primary'}`}
              style={{ padding: '0.5rem 1.25rem' }}
            >
              {isTaskCompleted ? '✓ Done' : 'Mark Assignment Done'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
