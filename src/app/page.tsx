'use client';

import { useState, useEffect } from 'react';

// Types
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee: 'human' | 'ai';
  priority?: 'low' | 'medium' | 'high';
  due?: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'working' | 'idle' | 'thinking';
  specialty: string;
  avatar?: string;
  tasksCompleted?: number;
}

interface Memory {
  id: string;
  title: string;
  date: string;
  preview: string;
  category: string;
}

interface Stat {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

// Initial Data
const initialTasks: Task[] = [
  { id: '1', title: 'Set up Pine Voice authentication', status: 'todo', assignee: 'ai', priority: 'high', due: 'Today' },
  { id: '2', title: 'Email contractors from permit leads', status: 'todo', assignee: 'human', priority: 'medium', due: 'Tomorrow' },
  { id: '3', title: 'Update SF Permit Finder', status: 'done', assignee: 'ai', priority: 'low', due: 'Yesterday' },
  { id: '4', title: 'Build content pipeline', status: 'in-progress', assignee: 'ai', priority: 'high', due: 'Today' },
  { id: '5', title: 'Review lead scoring model', status: 'todo', assignee: 'ai', priority: 'medium', due: 'Feb 28' },
  { id: '6', title: 'Deploy crypto intel bot', status: 'in-progress', assignee: 'ai', priority: 'low', due: 'Mar 1' },
];

const agents: Agent[] = [
  { id: '1', name: 'permit-lead-coo', role: 'COO', status: 'working', specialty: 'Lead Generation', avatar: '🎯', tasksCompleted: 234 },
  { id: '2', name: 'apify', role: 'Scraper', status: 'idle', specialty: 'Data Collection', avatar: '🕷️', tasksCompleted: 156 },
  { id: '3', name: 'conway-money', role: 'CFO', status: 'thinking', specialty: 'Operations', avatar: '💰', tasksCompleted: 89 },
  { id: '4', name: 'ai-csuite', role: 'Executive', status: 'working', specialty: 'Strategy', avatar: '👔', tasksCompleted: 45 },
  { id: '5', name: 'content-bot', role: 'Writer', status: 'working', specialty: 'Content', avatar: '✍️', tasksCompleted: 312 },
];

const memories: Memory[] = [
  { id: '1', title: 'Permit Lead Pipeline', date: '2026-02-17', preview: 'SF and Santa Cruz APIs working...', category: 'engineering' },
  { id: '2', title: 'Conway Setup', date: '2026-02-17', preview: 'Wallet created, needs funding...', category: 'finance' },
  { id: '3', title: 'Mission Control Plan', date: '2026-02-18', preview: 'Alex Finn guide saved...', category: 'strategy' },
  { id: '4', title: 'Web4 Money Loop', date: '2026-02-18', preview: 'Agents as economic actors...', category: 'innovation' },
  { id: '5', title: 'Lead Gen Results', date: '2026-02-19', preview: '47 new leads from SF permits...', category: 'sales' },
];

const stats: Stat[] = [
  { label: 'Active Tasks', value: '12', change: '+3 today', trend: 'up' },
  { label: 'Agents Online', value: '5', change: 'All operational', trend: 'neutral' },
  { label: 'Tasks Done', value: '847', change: '+23 this week', trend: 'up' },
  { label: 'Revenue', value: '$12,450', change: '+8%', trend: 'up' },
];

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'team' | 'office' | 'memory'>('tasks');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState<'human' | 'ai'>('ai');

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'todo',
      assignee: newTaskAssignee,
      priority: 'medium',
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setShowAddModal(false);
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'bg-emerald-500';
      case 'thinking': return 'bg-amber-500 animate-pulse';
      case 'idle': return 'bg-slate-500';
      default: return 'bg-slate-500';
    }
  };

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      {/* Header */}
      <header className="bg-[#111827] border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Mission Control
            </h1>
            <p className="text-slate-400 text-sm">AI Agent Operations Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {stats.map((stat, i) => (
                <div key={i} className="text-center px-4">
                  <p className="text-xs text-slate-500">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-xs text-emerald-400">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#111827] border-b border-slate-800 px-6">
        <div className="flex gap-1">
          {(['tasks', 'team', 'office', 'memory'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="p-6">
        {/* Tasks Board */}
        {activeTab === 'tasks' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Todo Column */}
            <div className="bg-[#1f2937] rounded-xl border border-slate-700">
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-semibold text-slate-300">To Do</h3>
                <span className="px-2 py-0.5 bg-slate-600 rounded text-xs">{todoTasks.length}</span>
              </div>
              <div className="p-3 space-y-3 min-h-[400px]">
                {todoTasks.map(task => (
                  <div
                    key={task.id}
                    className="bg-slate-800 rounded-lg p-3 border border-slate-600 hover:border-cyan-500/50 cursor-pointer transition-all group"
                    onClick={() => moveTask(task.id, 'in-progress')}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority || 'medium'}
                      </span>
                      <span className={`text-[10px] ${task.assignee === 'ai' ? 'text-purple-400' : 'text-blue-400'}`}>
                        {task.assignee === 'ai' ? '🤖' : '👤'}
                      </span>
                    </div>
                    <p className="text-sm text-white mb-2">{task.title}</p>
                    {task.due && (
                      <p className="text-xs text-slate-500">Due: {task.due}</p>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full p-3 border-2 border-dashed border-slate-600 text-slate-400 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all text-sm"
                >
                  + Add Task
                </button>
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-[#1f2937] rounded-xl border border-slate-700">
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-semibold text-cyan-300">In Progress</h3>
                <span className="px-2 py-0.5 bg-cyan-500/20 rounded text-xs text-cyan-400">{inProgressTasks.length}</span>
              </div>
              <div className="p-3 space-y-3 min-h-[400px]">
                {inProgressTasks.map(task => (
                  <div
                    key={task.id}
                    className="bg-slate-800 rounded-lg p-3 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all"
                    onClick={() => moveTask(task.id, 'done')}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority || 'medium'}
                      </span>
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                    </div>
                    <p className="text-sm text-white mb-2">{task.title}</p>
                    {task.due && (
                      <p className="text-xs text-slate-500">Due: {task.due}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Done Column */}
            <div className="bg-[#1f2937] rounded-xl border border-slate-700">
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-semibold text-emerald-300">Done</h3>
                <span className="px-2 py-0.5 bg-emerald-500/20 rounded text-xs text-emerald-400">{doneTasks.length}</span>
              </div>
              <div className="p-3 space-y-3 min-h-[400px]">
                {doneTasks.map(task => (
                  <div
                    key={task.id}
                    className="bg-slate-800/50 rounded-lg p-3 border border-slate-700 opacity-70"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority || 'medium'}
                      </span>
                      <span className="text-emerald-400 text-xs">✓</span>
                    </div>
                    <p className="text-sm text-slate-400 line-through">{task.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {agents.map(agent => (
              <div
                key={agent.id}
                className="bg-[#1f2937] rounded-xl border border-slate-700 p-4 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl">
                    {agent.avatar || '🤖'}
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
                </div>
                <h3 className="font-semibold text-white mb-1">{agent.name}</h3>
                <p className="text-xs text-cyan-400 mb-2">{agent.role}</p>
                <p className="text-xs text-slate-500 mb-3">{agent.specialty}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Tasks: {agent.tasksCompleted}</span>
                  <span className={`capitalize ${
                    agent.status === 'working' ? 'text-emerald-400' :
                    agent.status === 'thinking' ? 'text-amber-400' : 'text-slate-500'
                  }`}>{agent.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Memory Tab */}
        {activeTab === 'memory' && (
          <div className="grid grid-cols-2 gap-4">
            {memories.map(memory => (
              <div
                key={memory.id}
                className="bg-[#1f2937] rounded-xl border border-slate-700 p-4 hover:border-purple-500/50 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-purple-400 uppercase">{memory.category}</span>
                  <span className="text-xs text-slate-500">{memory.date}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{memory.title}</h3>
                <p className="text-sm text-slate-400">{memory.preview}</p>
              </div>
            ))}
          </div>
        )}

        {/* Office Tab */}
        {activeTab === 'office' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-white mb-2">Virtual Office</h3>
            <p className="text-slate-400">Team collaboration space coming soon...</p>
          </div>
        )}
      </main>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1f2937] rounded-xl border border-slate-700 p-6 w-96">
            <h3 className="text-lg font-semibold text-white mb-4">Add New Task</h3>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white mb-4 focus:outline-none focus:border-cyan-500"
              autoFocus
            />
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setNewTaskAssignee('ai')}
                className={`flex-1 py-2 rounded-lg text-sm ${
                  newTaskAssignee === 'ai' ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                🤖 AI
              </button>
              <button
                onClick={() => setNewTaskAssignee('human')}
                className={`flex-1 py-2 rounded-lg text-sm ${
                  newTaskAssignee === 'human' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                👤 Human
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addTask}
                className="flex-1 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 transition"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
