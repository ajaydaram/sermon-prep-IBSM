import React, { useState } from 'react';
import type { StudentAppState } from '../types';
import { ActsObservation } from './workspaces/ActsObservation';
import { JonahTracker } from './workspaces/JonahTracker';
import { JohnQuestions } from './workspaces/JohnQuestions';
import { DisciplesChart } from './workspaces/DisciplesChart';
import { HelperWordStudy } from './workspaces/HelperWordStudy';
import { ConflictResolution } from './workspaces/ConflictResolution';
import { ResearchPlanner } from './workspaces/ResearchPlanner';
import { ArgumentBuilder } from './workspaces/ArgumentBuilder';
import { InfographicPlanner } from './workspaces/InfographicPlanner';
import { Edit, Eye, MessageSquare, Table, HelpCircle, FileText, CheckCircle2, Compass } from 'lucide-react';
import { getSocraticFeedback } from '../utils/gemini';

interface WorkspaceProps {
  appState: StudentAppState;
  setAppState: React.Dispatch<React.SetStateAction<StudentAppState>>;
  markTaskDone: (taskId: string, isDone: boolean) => void;
}

type TabType = 'acts' | 'jonah' | 'john' | 'disciples' | 'helper' | 'conflict' | 'research' | 'arguments' | 'infographic';

export const Workspace: React.FC<WorkspaceProps> = ({ appState, setAppState, markTaskDone }) => {
  const [activeTab, setActiveTab] = useState<TabType>('acts');
  
  // Socratic Coach Local State
  const [chatInput, setChatInput] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [chatResponse, setChatResponse] = useState<string>('');
  
  const apiKey = localStorage.getItem('bs510_gemini_api_key') || '';

  const tabs = [
    { id: 'acts', label: 'B02: Acts 1:8', icon: <Eye size={16} />, taskId: 'B02', desc: 'Observations' },
    { id: 'jonah', label: 'B04: Jonah Reread', icon: <FileText size={16} />, taskId: 'B04', desc: 'Reading Log' },
    { id: 'john', label: 'B05: John 8 Questions', icon: <HelpCircle size={16} />, taskId: 'B05', desc: '30 Questions' },
    { id: 'disciples', label: 'B06: Disciples Chart', icon: <Table size={16} />, taskId: 'B06', desc: '4 Lists' },
    { id: 'helper', label: 'C07: Helper Word Study', icon: <Edit size={16} />, taskId: 'C07', desc: 'Genesis 2:18' },
    { id: 'conflict', label: 'D16: Conflict Resolution', icon: <MessageSquare size={16} />, taskId: 'D16', desc: 'Matthew 5 & 18' },
    { id: 'research', label: 'C10-13: Research Papers', icon: <FileText size={16} />, taskId: 'C13', desc: 'Slavery & Jonah' },
    { id: 'arguments', label: 'C11-15: Arguments', icon: <Edit size={16} />, taskId: 'C14', desc: 'Mark, Jonah, Philem' },
    { id: 'infographic', label: 'E17: Infographic Plan', icon: <Compass size={16} />, taskId: 'E17', desc: 'IBSM Infographic' }
  ] as const;

  const handleSocraticQuery = async () => {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    setChatResponse('');
    try {
      // Gather active tab state contexts
      let context = '';
      if (activeTab === 'acts') {
        context = `Active observations: ${JSON.stringify(appState.actsObservations)}`;
      } else if (activeTab === 'jonah') {
        context = `Active Jonah log: ${JSON.stringify(appState.jonahLog)}`;
      } else if (activeTab === 'helper') {
        context = `Active Genesis 2:18 helper study: ${JSON.stringify(appState.helperStudy)}`;
      } else if (activeTab === 'arguments') {
        context = `Active Argument builder states: ${JSON.stringify(appState.arguments)}`;
      } else if (activeTab === 'conflict') {
        context = `Active conflict resolution worksheet: ${JSON.stringify(appState.conflictResolution)}`;
      }

      const response = await getSocraticFeedback(`Assignment Task ${activeTab}. User query: ${chatInput}`, context);
      setChatResponse(response);
    } catch (err: any) {
      setChatResponse(`Error: ${err.message || err}`);
    } finally {
      setChatLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'acts':
        return (
          <ActsObservation
            observations={appState.actsObservations}
            setObservations={(obs) => setAppState(prev => ({ ...prev, actsObservations: obs }))}
            markTaskDone={markTaskDone}
            isTaskCompleted={appState.taskStatus['B02'] === 'done'}
          />
        );
      case 'jonah':
        return (
          <JonahTracker
            jonahLog={appState.jonahLog}
            setJonahLog={(log) => setAppState(prev => ({ ...prev, jonahLog: log }))}
            markTaskDone={markTaskDone}
            isTaskCompleted={appState.taskStatus['B04'] === 'done'}
          />
        );
      case 'john':
        return (
          <JohnQuestions
            questions={appState.johnQuestions}
            setQuestions={(qs) => setAppState(prev => ({ ...prev, johnQuestions: qs }))}
            markTaskDone={markTaskDone}
            isTaskCompleted={appState.taskStatus['B05'] === 'done'}
          />
        );
      case 'disciples':
        return (
          <DisciplesChart
            disciplesChart={appState.disciplesChart}
            setDisciplesChart={(chart) => setAppState(prev => ({ ...prev, disciplesChart: chart }))}
            markTaskDone={markTaskDone}
            isTaskCompleted={appState.taskStatus['B06'] === 'done'}
          />
        );
      case 'helper':
        return (
          <HelperWordStudy
            helperStudy={appState.helperStudy}
            setHelperStudy={(study) => setAppState(prev => ({ ...prev, helperStudy: study }))}
            markTaskDone={markTaskDone}
            isTaskCompleted={appState.taskStatus['C07'] === 'done'}
          />
        );
      case 'conflict':
        return (
          <ConflictResolution
            conflictResolution={appState.conflictResolution}
            setConflictResolution={(cr) => setAppState(prev => ({ ...prev, conflictResolution: cr }))}
            markTaskDone={markTaskDone}
            isTaskCompleted={appState.taskStatus['D16'] === 'done'}
          />
        );
      case 'research':
        return (
          <ResearchPlanner
            researchPapers={appState.researchPapers}
            setResearchPapers={(papers) => setAppState(prev => ({ ...prev, researchPapers: papers }))}
            markTaskDone={markTaskDone}
            taskStatus={appState.taskStatus}
          />
        );
      case 'arguments':
        return (
          <ArgumentBuilder
            argumentsState={appState.arguments}
            setArgumentsState={(args) => setAppState(prev => ({ ...prev, arguments: args }))}
            markTaskDone={markTaskDone}
            taskStatus={appState.taskStatus}
          />
        );
      case 'infographic':
        return (
          <InfographicPlanner
            infographic={appState.infographic}
            setInfographic={(plan) => setAppState(prev => ({ ...prev, infographic: plan }))}
            markTaskDone={markTaskDone}
            isTaskCompleted={appState.taskStatus['E17'] === 'done'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'start' }}>
      
      {/* Sub-navigation Sidebar */}
      <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '1rem', flexShrink: 0 }}>
        <div 
          className="glass-card" 
          style={{ 
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-accent-gold)', padding: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
            Study Workspaces
          </h3>
          
          {tabs.map((tab) => {
            const isDone = appState.taskStatus[tab.taskId] === 'done';
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setChatResponse('');
                  setChatInput('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  background: isActive 
                    ? 'var(--color-primary-light)' 
                    : 'transparent',
                  color: isActive 
                    ? 'var(--color-text-primary)' 
                    : 'var(--color-text-secondary)',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                  <span style={{ color: isActive ? 'var(--color-accent-gold)' : 'var(--color-text-muted)' }}>
                    {tab.icon}
                  </span>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{tab.label}</div>
                    <div style={{ fontSize: '0.7rem', color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                      {tab.desc}
                    </div>
                  </div>
                </div>

                {isDone && (
                  <CheckCircle2 size={16} style={{ color: 'var(--color-accent-emerald-light)', flexShrink: 0 }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Floating/Side Socratic Coach Panel */}
        <div className="glass-card" style={{ padding: '1rem', background: 'rgba(212,175,55,0.02)', border: '1px solid rgba(212,175,55,0.1)' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--color-accent-gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Compass size={15} /> Socratic Study Coach
          </h4>
          
          {!apiKey ? (
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>
              Unlock Socratic hints by entering your Gemini API Key in the **Arguments Grader** tab!
            </p>
          ) : (
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                Get guiding questions tailored to your active task.
              </p>
              
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  className="input-field"
                  style={{ flex: 1, fontSize: '0.8rem', padding: '0.4rem 0.6rem', minWidth: 0 }}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSocraticQuery()}
                  placeholder="Ask for hints..."
                />
                <button 
                  onClick={handleSocraticQuery} 
                  className="btn btn-primary" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '6px' }}
                  disabled={chatLoading}
                >
                  {chatLoading ? '...' : 'Ask'}
                </button>
              </div>

              {chatResponse && (
                <div style={{
                  fontSize: '0.78rem',
                  lineHeight: '1.4',
                  background: 'rgba(0,0,0,0.18)',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  color: 'var(--color-text-primary)',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  marginTop: '0.6rem',
                  wordBreak: 'break-word'
                }}>
                  <strong>Coach:</strong> {chatResponse}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace content */}
      <div style={{ flex: 1, minWidth: '320px' }}>
        {renderContent()}
      </div>

    </div>
  );
};
