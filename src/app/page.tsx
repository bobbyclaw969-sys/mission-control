'use client';

import { useState } from 'react';

// Types
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'working' | 'idle' | 'thinking';
  specialty: string;
  tasks: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'website' | 'tool' | 'app' | 'skill';
  status: 'live' | 'demo';
}

// Initial Data
const agents: Agent[] = [
  { id: '1', name: 'permit-lead-coo', role: 'COO / Lead Gen', status: 'working', specialty: 'Permit Research', tasks: ['1', '2'] },
  { id: '2', name: 'apify', role: 'Scraper', status: 'idle', specialty: 'Data Collection', tasks: [] },
  { id: '3', name: 'conway-money', role: 'CFO / Ops', status: 'thinking', specialty: 'Operations', tasks: ['4'] },
  { id: '4', name: 'ai-csuite', role: 'Executive', status: 'working', specialty: 'Strategy', tasks: ['3'] },
];

const tasks: Task[] = [
  { id: '1', title: 'Query SF Permit API for new leads', status: 'in-progress', assignee: 'permit-lead-coo' },
  { id: '2', title: 'Email contractors from leads', status: 'todo', assignee: 'permit-lead-coo' },
  { id: '3', title: 'Weekly strategic review', status: 'in-progress', assignee: 'ai-csuite' },
  { id: '4', title: 'Monitor compute costs', status: 'todo', assignee: 'conway-money' },
  { id: '5', title: 'Set up Pine Voice auth', status: 'done', assignee: 'human' },
];

const projects: Project[] = [
  { id: '1', name: 'SF Permit Finder', description: 'Real-time building permits', url: 'https://bobbyclaw969-sys.github.io/sf-permit-finder/', category: 'website', status: 'live' },
  { id: '2', name: 'Santa Cruz Permit Finder', description: 'GIS-based permit data', url: 'https://bobbyclaw969-sys.github.io/scc-permit-finder/', category: 'website', status: 'live' },
  { id: '3', name: 'BuilderQuote Pro', description: 'Contractor quote tool', url: 'https://bobbyclaw969-sys.github.io/argoquote/', category: 'tool', status: 'live' },
  { id: '4', name: 'Mission Control', description: 'Agent dashboard', url: 'https://bobbyclaw969-sys.github.io/mission-control/', category: 'tool', status: 'live' },
];

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState<'team' | 'projects' | 'memory'>('team');

  const getAgentTasks = (agentId: string) => tasks.filter(t => t.assignee === agentId);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]';
      case 'thinking': return 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]';
      default: return 'bg-gray-500';
    }
  };

  const getStatusGlow = (status: string) => {
    switch (status) {
      case 'working': return 'shadow-[0_0_20px_rgba(16,185,129,0.4)]';
      case 'thinking': return 'shadow-[0_0_20px_rgba(245,158,11,0.4)]';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(139,92,246,0.05)_100%)]" />
        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)]">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent">
                Mission Control
              </h1>
              <p className="text-white/40 text-lg">AI Agent Operations</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Active Agents', value: '4', icon: '🤖', color: 'from-violet-500 to-purple-600' },
              { label: 'Running Tasks', value: '2', icon: '⚡', color: 'from-emerald-500 to-teal-600' },
              { label: 'Projects', value: '7', icon: '🚀', color: 'from-blue-500 to-cyan-600' },
              { label: 'Revenue', value: '$0', icon: '💰', color: 'from-amber-500 to-orange-600' },
            ].map((stat, i) => (
              <div key={i} className={`bg-gradient-to-br ${stat.color} bg-opacity-10 rounded-2xl p-4 border border-white/5`}>
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 py-4">
            {[
              { id: 'team', label: 'Team', icon: 'M17 20h5v-2a3 3 0 00-5.356V14a4 4 0 11-8 0V7.487A7 7 0 017.27 12h2.027M5 10V7a4 4 0 018-4h2' },
              { id: 'projects', label: 'Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v6' },
              { id: 'memory', label: 'Memory', icon: 'M12 6.253v13m0-13.34l-2.5-2.5L12 6.253M12 6.253A12 12 0 008.2 9.5 12 18a12 12 0 003.8-9.75' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Team - Agent Hierarchy */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Agent Team</h2>
            
            <div className="grid gap-6">
              {agents.map(agent => {
                const agentTasks = getAgentTasks(agent.name);
                return (
                  <div key={agent.id} className="bg-gradient-to-r from-white/[0.03] to-transparent rounded-2xl p-6 border border-white/5 hover:border-white/10 transition">
                    <div className="flex items-start gap-6">
                      {/* Avatar */}
                      <div className={`relative ${getStatusGlow(agent.status)}`}>
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                          agent.status === 'working' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                          agent.status === 'thinking' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                          'bg-gradient-to-br from-gray-600 to-gray-700'
                        }`}>
                          🤖
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#050507] ${getStatusColor(agent.status)}`} />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold">{agent.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            agent.status === 'working' ? 'bg-emerald-500/20 text-emerald-400' :
                            agent.status === 'thinking' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {agent.status === 'working' ? '● Working' : agent.status === 'thinking' ? '◐ Thinking' : '○ Idle'}
                          </span>
                        </div>
                        <p className="text-violet-400 text-sm mb-1">{agent.role}</p>
                        <p className="text-white/30 text-xs">{agent.specialty}</p>
                      </div>
                      
                      {/* Tasks Assigned */}
                      <div className="w-72">
                        <p className="text-white/40 text-xs mb-2 uppercase tracking-wider">Assigned Tasks</p>
                        <div className="space-y-2">
                          {agentTasks.map(task => (
                            <div key={task.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                              task.status === 'done' ? 'bg-emerald-500/10 text-emerald-400/60' :
                              task.status === 'in-progress' ? 'bg-amber-500/10 text-amber-400' :
                              'bg-white/5 text-white/40'
                            }`}>
                              <span className="text-xs">{task.status === 'done' ? '✓' : task.status === 'in-progress' ? '◐' : '○'}</span>
                              {task.title}
                            </div>
                          ))}
                          {agentTasks.length === 0 && (
                            <p className="text-white/20 text-sm italic">No tasks assigned</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Projects */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                className="group bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl p-6 border border-white/5 hover:border-violet-500/30 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    project.category === 'website' ? 'bg-blue-500/20 text-blue-400' :
                    project.category === 'tool' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {project.category}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${project.status === 'live' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                </div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-violet-400">{project.name}</h3>
                <p className="text-white/40 text-sm">{project.description}</p>
              </a>
            ))}
          </div>
        )}

        {/* Memory */}
        {activeTab === 'memory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Permit Lead Pipeline', date: 'Feb 17', preview: 'SF and Santa Cruz APIs working', category: 'business' },
              { title: 'Conway Setup', date: 'Feb 17', preview: 'Wallet created, needs funding', category: 'tech' },
              { title: 'Mission Control', date: 'Feb 18', preview: 'Alex Finn guide implemented', category: 'strategy' },
              { title: 'Web4 Money Loop', date: 'Feb 18', preview: 'Agents as economic actors', category: 'strategy' },
            ].map((mem, i) => (
              <div key={i} className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">{mem.title}</h3>
                  <span className="text-white/30 text-sm">{mem.date}</span>
                </div>
                <p className="text-white/40 text-sm mb-2">{mem.preview}</p>
                <span className="text-xs px-2 py-1 rounded bg-white/5 text-white/50">{mem.category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
