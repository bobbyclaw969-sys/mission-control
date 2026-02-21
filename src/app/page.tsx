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
}

// Initial Data
const agents: Agent[] = [
  { id: '1', name: 'permit-lead-coo', role: 'COO / Lead Gen', status: 'working', specialty: 'Permit Research' },
  { id: '2', name: 'apify', role: 'Scraper', status: 'idle', specialty: 'Data Collection' },
  { id: '3', name: 'conway-money', role: 'CFO / Ops', status: 'thinking', specialty: 'Operations' },
  { id: '4', name: 'ai-csuite', role: 'Executive', status: 'working', specialty: 'Strategy' },
];

const tasks: Task[] = [
  { id: '1', title: 'Query SF Permit API for new leads', status: 'in-progress', assignee: 'permit-lead-coo' },
  { id: '2', title: 'Email contractors from leads', status: 'todo', assignee: 'permit-lead-coo' },
  { id: '3', title: 'Weekly strategic review', status: 'in-progress', assignee: 'ai-csuite' },
  { id: '4', title: 'Monitor compute costs', status: 'todo', assignee: 'conway-money' },
  { id: '5', title: 'Set up Pine Voice auth', status: 'done', assignee: 'human' },
];

const projects = [
  { name: 'SF Permit Finder', desc: 'Real-time building permits from SF DBI', url: 'https://bobbyclaw969-sys.github.io/sf-permit-finder/', category: 'Website', status: 'Live' },
  { name: 'Santa Cruz Permit Finder', desc: 'GIS-based permit data from Santa Cruz County', url: 'https://bobbyclaw969-sys.github.io/scc-permit-finder/', category: 'Website', status: 'Live' },
  { name: 'BuilderQuote Pro', desc: 'Contractor quote generation tool', url: 'https://bobbyclaw969-sys.github.io/argoquote/', category: 'Tool', status: 'Live' },
  { name: 'Mission Control', desc: 'AI agent operations dashboard', url: 'https://bobbyclaw969-sys.github.io/mission-control/', category: 'Tool', status: 'Live' },
  { name: 'ARGO Logistics Demo', desc: 'AI agent demo for logistics', url: 'https://bobbyclaw969-sys.github.io/argo-ai-demo/', category: 'Demo', status: 'Demo' },
  { name: 'Edge Aura Pro', desc: 'Android app for IoT control', url: 'https://github.com/bobbyclaw969-sys/edge-aura-pro', category: 'App', status: 'Live' },
  { name: 'Santa Cruz Plumber SEO', desc: 'Local SEO site for plumber', url: 'https://bobbyclaw969-sys.github.io/santa-cruz-plumber-pro/', category: 'Website', status: 'Live' },
];

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState<'team' | 'projects' | 'memory'>('team');

  const getAgentTasks = (agentName: string) => tasks.filter(t => t.assignee === agentName);

  return (
    <div className="min-h-screen bg-[#030304] text-white font-sans">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(139,92,246,0.08)_0%,transparent_100%)]" />
        
        <div className="max-w-6xl mx-auto px-8 pt-12 pb-16 relative">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.5)]">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-violet-100 to-purple-300 bg-clip-text text-transparent">
                Mission Control
              </h1>
              <p className="text-white/40 text-lg">AI Agent Operations Center</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Active Agents', value: '4', icon: '🤖', color: 'from-violet-600 to-purple-600' },
              { label: 'Tasks Running', value: '2', icon: '⚡', color: 'from-emerald-600 to-teal-600' },
              { label: 'Projects', value: '7', icon: '🚀', color: 'from-blue-600 to-cyan-600' },
              { label: 'Revenue', value: '$0', icon: '💰', color: 'from-amber-600 to-orange-600' },
            ].map((stat, i) => (
              <div key={i} className={`bg-gradient-to-br ${stat.color} bg-opacity-10 rounded-2xl p-5 border border-white/5`}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="sticky top-0 z-50 bg-[#030304]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex gap-2 py-4">
            {[
              { id: 'team', label: 'Team', icon: 'M17 20h5v-2a3 3 0 00-5.356V14a4 4 0 11-8 0V7.487A7 7 0 017.27 12h2.027M5 10V7a4 4 0 018-4h2' },
              { id: 'projects', label: 'Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v6' },
              { id: 'memory', label: 'Memory', icon: 'M12 6.253v13m0-13.34l-2.5-2.5L12 6.253M12 6.253A12 12 0 008.2 9.5 12 18a12 12 0 003.8-9.75' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
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
      <div className="max-w-6xl mx-auto px-8 py-10">
        
        {/* Team */}
        {activeTab === 'team' && (
          <div className="space-y-4">
            {agents.map(agent => {
              const agentTasks = getAgentTasks(agent.name);
              return (
                <div key={agent.id} className="group bg-gradient-to-r from-white/[0.04] to-transparent rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className={`relative ${agent.status === 'working' ? 'shadow-[0_0_30px_rgba(16,185,129,0.4)]' : agent.status === 'thinking' ? 'shadow-[0_0_30px_rgba(245,158,11,0.4)]' : ''}`}>
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                        agent.status === 'working' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                        agent.status === 'thinking' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                        'bg-gradient-to-br from-gray-600 to-gray-700'
                      }`}>
                        🤖
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-[#030304] ${
                        agent.status === 'working' ? 'bg-emerald-500' :
                        agent.status === 'thinking' ? 'bg-amber-500' : 'bg-gray-500'
                      }`} />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold">{agent.name}</h3>
                        <span className={`px-3 py-0.5 rounded-full text-xs font-medium ${
                          agent.status === 'working' ? 'bg-emerald-500/20 text-emerald-400' :
                          agent.status === 'thinking' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {agent.status === 'working' ? '● Working' : agent.status === 'thinking' ? '◐ Thinking' : '○ Idle'}
                        </span>
                      </div>
                      <p className="text-violet-400 text-sm">{agent.role}</p>
                      <p className="text-white/30 text-xs">{agent.specialty}</p>
                    </div>
                    
                    {/* Tasks */}
                    <div className="w-80">
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-2">Tasks</p>
                      <div className="flex flex-wrap gap-2">
                        {agentTasks.map(task => (
                          <span key={task.id} className={`text-xs px-2.5 py-1 rounded-lg ${
                            task.status === 'done' ? 'bg-emerald-500/20 text-emerald-400' :
                            task.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-white/5 text-white/40'
                          }`}>
                            {task.status === 'done' ? '✓' : task.status === 'in-progress' ? '◐' : '○'} {task.title}
                          </span>
                        ))}
                        {agentTasks.length === 0 && <span className="text-white/20 text-xs">No tasks</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Projects */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <a
                key={i}
                href={project.url}
                target="_blank"
                className="group bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl p-6 border border-white/5 hover:border-violet-500/30 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                    project.category === 'Website' ? 'bg-blue-500/20 text-blue-400' :
                    project.category === 'Tool' ? 'bg-purple-500/20 text-purple-400' :
                    project.category === 'App' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {project.category}
                  </span>
                  <span className={`text-xs flex items-center gap-1.5 ${project.status === 'Live' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {project.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-violet-400 transition-colors">{project.name}</h3>
                <p className="text-white/40 text-sm">{project.desc}</p>
                <div className="flex items-center gap-1 text-violet-400 text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Visit</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Memory */}
        {activeTab === 'memory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Permit Lead Pipeline', date: 'Feb 17', preview: 'SF and Santa Cruz APIs working', tag: 'Business' },
              { title: 'Conway Setup', date: 'Feb 17', preview: 'Wallet created, API configured', tag: 'Tech' },
              { title: 'Mission Control', date: 'Feb 18', preview: 'Alex Finn guide implemented', tag: 'Strategy' },
              { title: 'Web4 Money Loop', date: 'Feb 18', preview: 'Agents as economic actors', tag: 'Strategy' },
            ].map((mem, i) => (
              <div key={i} className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{mem.title}</h3>
                  <span className="text-white/30 text-sm">{mem.date}</span>
                </div>
                <p className="text-white/40 mb-3">{mem.preview}</p>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-white/50">{mem.tag}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
