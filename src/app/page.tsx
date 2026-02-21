'use client';

import { useState } from 'react';

// Types
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee: 'human' | 'ai';
}

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'working' | 'idle' | 'thinking';
  specialty: string;
}

interface Memory {
  id: string;
  title: string;
  date: string;
  preview: string;
  category: string;
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
const initialTasks: Task[] = [
  { id: '1', title: 'Set up Pine Voice authentication', status: 'todo', assignee: 'ai' },
  { id: '2', title: 'Email contractors from permit leads', status: 'todo', assignee: 'human' },
  { id: '3', title: 'Update SF Permit Finder', status: 'done', assignee: 'ai' },
  { id: '4', title: 'Build content pipeline', status: 'in-progress', assignee: 'ai' },
];

const agents: Agent[] = [
  { id: '1', name: 'permit-lead-coo', role: 'Lead Gen', status: 'working', specialty: 'Permit Research' },
  { id: '2', name: 'apify', role: 'Scraper', status: 'idle', specialty: 'Data Collection' },
  { id: '3', name: 'conway-money', role: 'CFO', status: 'thinking', specialty: 'Operations' },
  { id: '4', name: 'ai-csuite', role: 'Executive', status: 'working', specialty: 'Strategy' },
];

const memories: Memory[] = [
  { id: '1', title: 'Permit Lead Pipeline', date: 'Feb 17', preview: 'SF and Santa Cruz APIs working...', category: 'business' },
  { id: '2', title: 'Conway Setup', date: 'Feb 17', preview: 'Wallet created, needs funding...', category: 'tech' },
  { id: '3', title: 'Mission Control Plan', date: 'Feb 18', preview: 'Alex Finn guide saved...', category: 'strategy' },
  { id: '4', title: 'Web4 Money Loop', date: 'Feb 18', preview: 'Agents as economic actors...', category: 'strategy' },
  { id: '5', title: 'Pine Voice Installed', date: 'Feb 18', preview: 'Plugin installed, needs auth...', category: 'tech' },
];

const projects: Project[] = [
  { id: '1', name: 'SF Permit Finder', description: 'Real-time building permits from SF DBI', url: 'https://bobbyclaw969-sys.github.io/sf-permit-finder/', category: 'website', status: 'live' },
  { id: '2', name: 'Santa Cruz Permit Finder', description: 'GIS-based permit data from Santa Cruz County', url: 'https://bobbyclaw969-sys.github.io/scc-permit-finder/', category: 'website', status: 'live' },
  { id: '3', name: 'BuilderQuote Pro', description: 'Contractor quote generation tool', url: 'https://bobbyclaw969-sys.github.io/argoquote/', category: 'tool', status: 'live' },
  { id: '4', name: 'ARGO Logistics Demo', description: 'AI agent demo for logistics company', url: 'https://bobbyclaw969-sys.github.io/argo-ai-demo/', category: 'website', status: 'demo' },
  { id: '5', name: 'Mission Control', description: 'AI agent operations dashboard', url: 'https://bobbyclaw969-sys.github.io/mission-control/', category: 'tool', status: 'live' },
  { id: '6', name: 'Edge Aura Pro', description: 'Android app for IoT control', url: 'https://github.com/bobbyclaw969-sys/edge-aura-pro', category: 'app', status: 'live' },
  { id: '7', name: 'Santa Cruz Plumber SEO', description: 'Local SEO site for plumber', url: 'https://bobbyclaw969-sys.github.io/santa-cruz-plumber-pro/', category: 'website', status: 'live' },
];

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'team' | 'projects' | 'memory'>('projects');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'bg-emerald-500';
      case 'thinking': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'website': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'tool': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'app': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-indigo-900/20 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-12 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Mission Control
            </h1>
          </div>
          <p className="text-white/50 text-lg ml-13">AI Agent Operations Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1 py-4">
            {[
              { id: 'projects', label: 'Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v6M5 11h14' },
              { id: 'tasks', label: 'Tasks', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4m-4-2h8' },
              { id: 'team', label: 'Team', icon: 'M17 20h5v-2a3 3 0 00-5.356V14a4 4 0 11-8 0V7.487A7 7 0 017.27 12h2.027M5 10V7a4 4 0 018-4h2' },
              { id: 'memory', label: 'Memory', icon: 'M12 6.253v13m0-13.34l-2.5-2.5L12 6.253M12 6.253A12 12 0 008.2 9.5 12 18a12 12 0 003.8-9.75M12 6.253A12 12 0 0111.8 9.5 12 18a12 12 0 00.2-5.247' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Projects Grid */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Our Projects</h2>
              <div className="flex gap-2">
                {['website', 'tool', 'app'].map(cat => (
                  <span key={cat} className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getCategoryColor(cat)}`}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map(project => (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${project.status === 'live' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-violet-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-white/40 text-sm mb-4">{project.description}</p>
                  <div className="flex items-center gap-2 text-violet-400 text-sm font-medium">
                    <span>Visit</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tasks Board */}
        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['todo', 'in-progress', 'done'] as const).map(status => (
              <div key={status} className="bg-white/[0.02] rounded-2xl p-5 border border-white/5">
                <h3 className="text-lg font-semibold mb-4 capitalize flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    status === 'todo' ? 'bg-red-500' : status === 'in-progress' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  {status.replace('-', ' ')}
                  <span className="text-white/30 text-sm font-normal ml-auto">
                    {tasks.filter(t => t.status === status).length}
                  </span>
                </h3>
                <div className="space-y-3">
                  {tasks.filter(t => t.status === status).map(task => (
                    <div key={task.id} className="bg-white/[0.03] rounded-xl p-4 hover:bg-white/[0.05] transition">
                      <p className="font-medium mb-2">{task.title}</p>
                      <span className={`text-xs px-2 py-1 rounded-lg ${
                        task.assignee === 'ai' ? 'bg-violet-500/20 text-violet-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {task.assignee === 'ai' ? '🤖 AI' : '👤 Human'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Grid */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map(agent => (
              <div key={agent.id} className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    agent.status === 'working' ? 'bg-emerald-500/20' : agent.status === 'thinking' ? 'bg-amber-500/20' : 'bg-gray-500/20'
                  }`}>
                    {agent.status === 'working' ? '⚡' : agent.status === 'thinking' ? '🤔' : '💤'}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                    agent.status === 'working' ? 'bg-emerald-500/20 text-emerald-400' : 
                    agent.status === 'thinking' ? 'bg-amber-500/20 text-amber-400' : 
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(agent.status)}`} />
                    {agent.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{agent.name}</h3>
                <p className="text-violet-400 text-sm mb-1">{agent.role}</p>
                <p className="text-white/30 text-xs">{agent.specialty}</p>
              </div>
            ))}
          </div>
        )}

        {/* Memory */}
        {activeTab === 'memory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memories.map(memory => (
              <div key={memory.id} className="bg-white/[0.02] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold">{memory.title}</h3>
                  <span className="text-white/30 text-sm">{memory.date}</span>
                </div>
                <p className="text-white/40 text-sm mb-3">{memory.preview}</p>
                <span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/50 capitalize">
                  {memory.category}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
