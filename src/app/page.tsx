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
}

// Initial Data
const initialTasks: Task[] = [
  { id: '1', title: 'Set up Pine Voice authentication', status: 'todo', assignee: 'ai' },
  { id: '2', title: 'Email contractors from permit leads', status: 'todo', assignee: 'human' },
  { id: '3', title: 'Update SF Permit Finder', status: 'done', assignee: 'ai' },
  { id: '4', title: 'Build content pipeline', status: 'in-progress', assignee: 'ai' },
];

const agents: Agent[] = [
  { id: '1', name: 'permit-lead-coo', role: 'COO', status: 'working', specialty: 'Lead Generation' },
  { id: '2', name: 'apify', role: 'Scraper', status: 'idle', specialty: 'Data Collection' },
  { id: '3', name: 'conway-money', role: 'CFO', status: 'thinking', specialty: 'Operations' },
  { id: '4', name: 'ai-csuite', role: 'Executive', status: 'working', specialty: 'Strategy' },
];

const memories: Memory[] = [
  { id: '1', title: 'Permit Lead Pipeline', date: '2026-02-17', preview: 'SF and Santa Cruz APIs working...' },
  { id: '2', title: 'Conway Setup', date: '2026-02-17', preview: 'Wallet created, needs funding...' },
  { id: '3', title: 'Mission Control Plan', date: '2026-02-18', preview: 'Alex Finn guide saved...' },
  { id: '4', title: 'Web4 Money Loop', date: '2026-02-18', preview: 'Agents as economic actors...' },
];

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'team' | 'office' | 'memory'>('tasks');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string, assignee: 'human' | 'ai') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: 'todo',
      assignee,
    };
    setTasks([...tasks, newTask]);
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Mission Control
        </h1>
        <p className="text-gray-400 mt-2">AI Agent Operations Dashboard</p>
      </header>

      {/* Tabs */}
      <nav className="flex gap-4 mb-8">
        {(['tasks', 'team', 'office', 'memory'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab
                ? 'bg-cyan-500 text-gray-900'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Tasks Board */}
      {activeTab === 'tasks' && (
        <div className="grid grid-cols-3 gap-6">
          {(['todo', 'in-progress', 'done'] as const).map(status => (
            <div key={status} className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-bold mb-4 capitalize flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  status === 'todo' ? 'bg-red-500' : status === 'in-progress' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                {status.replace('-', ' ')}
              </h3>
              <div className="space-y-3">
                {tasks.filter(t => t.status === status).map(task => (
                  <div
                    key={task.id}
                    className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition"
                    onClick={() => {
                      const next = status === 'todo' ? 'in-progress' : status === 'in-progress' ? 'done' : 'todo';
                      moveTask(task.id, next);
                    }}
                  >
                    <p className="font-medium">{task.title}</p>
                    <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                      task.assignee === 'ai' ? 'bg-purple-500/30 text-purple-300' : 'bg-blue-500/30 text-blue-300'
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

      {/* Team View */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {agents.map(agent => (
            <div key={agent.id} className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-3xl">
                🤖
              </div>
              <h3 className="font-bold text-lg">{agent.name}</h3>
              <p className="text-cyan-400 text-sm mb-2">{agent.role}</p>
              <p className="text-gray-400 text-xs">{agent.specialty}</p>
              <div className={`mt-4 px-3 py-1 rounded-full text-xs inline-block ${
                agent.status === 'working' ? 'bg-green-500/30 text-green-400' :
                agent.status === 'thinking' ? 'bg-yellow-500/30 text-yellow-400' :
                'bg-gray-500/30 text-gray-400'
              }`}>
                {agent.status === 'working' ? '⚡ Working' : agent.status === 'thinking' ? '💭 Thinking' : '💤 Idle'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Office View */}
      {activeTab === 'office' && (
        <div className="bg-gray-800 rounded-xl p-8">
          <div className="grid grid-cols-4 gap-8">
            {agents.map(agent => (
              <div key={agent.id} className="text-center">
                <div className={`w-24 h-24 mx-auto mb-4 rounded-lg flex items-center justify-center transition-all ${
                  agent.status === 'working' ? 'bg-green-500/20 animate-pulse' :
                  agent.status === 'thinking' ? 'bg-yellow-500/20' :
                  'bg-gray-700'
                }`}>
                  <span className="text-4xl">{agent.status === 'working' ? '💻' : agent.status === 'thinking' ? '🤔' : '😴'}</span>
                </div>
                <p className="font-bold text-sm">{agent.name}</p>
                <p className="text-xs text-gray-400">{agent.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-gray-500">
            <p>Each agent has its own workspace and compute resources</p>
          </div>
        </div>
      )}

      {/* Memory Screen */}
      {activeTab === 'memory' && (
        <div className="grid grid-cols-2 gap-6">
          {memories.map(memory => (
            <div key={memory.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{memory.title}</h3>
                <span className="text-xs text-gray-500">{memory.date}</span>
              </div>
              <p className="text-gray-400 text-sm">{memory.preview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
