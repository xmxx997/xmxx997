
import React, { useState, useMemo } from 'react';
import { ViewType, Project, User, Task } from './types';
import { INITIAL_PROJECTS, USERS, STATUS_UI } from './constants';
import { CompassIcon, PenToolIcon, MapIcon, SunIcon } from './components/Icons';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('Studio Pulse');
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);

  const getAssignee = (id: string) => USERS.find(u => u.id === id);

  const urgentTasks = useMemo(() => {
    const all = USERS.flatMap(u => u.dailyTasks || []);
    return all
      .filter(t => !t.completed && t.urgency === 'High')
      .sort((a, b) => (a.timeSlot || '').localeCompare(b.timeSlot || ''));
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white selection:bg-white selection:text-black">
      {/* Sidebar: Stark Minimalist */}
      <nav className="w-full md:w-20 lg:w-72 bg-black border-r border-white/10 flex flex-col p-10 space-y-20 z-50">
        <div className="flex flex-col space-y-1">
          <span className="text-4xl font-black tracking-tighter leading-none">EVO.</span>
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-black">STUDIO</span>
        </div>

        <div className="flex flex-col space-y-8 w-full">
          {[
            { id: 'Studio Pulse', icon: SunIcon, label: 'PULSE' },
            { id: 'Project Archive', icon: CompassIcon, label: 'ARCHIVE' },
            { id: 'Studio Roadmap', icon: PenToolIcon, label: 'ROADMAP' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewType)}
              className={`flex items-center gap-5 py-2 transition-all duration-300 group relative ${
                view === item.id ? 'text-white' : 'text-white/20 hover:text-white'
              }`}
            >
              {view === item.id && (
                <div className="absolute -left-10 w-1.5 h-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
              )}
              <item.icon className={`w-6 h-6 ${view === item.id ? 'stroke-[3px]' : 'stroke-[1.5px]'}`} />
              <span className={`hidden lg:block text-[11px] tracking-[0.3em] font-black transition-all ${view === item.id ? 'translate-x-2' : ''}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto hidden lg:block pt-10 border-t border-white/10">
          <div className="space-y-6">
            <p className="text-[9px] uppercase font-black text-white/20 tracking-[0.4em]">TEAM</p>
            <div className="flex flex-wrap gap-4">
              {USERS.map(u => (
                <div key={u.id} className="relative group">
                  <div className="w-10 h-10 overflow-hidden border border-white/20 group-hover:border-white transition-all duration-300">
                    <img src={u.avatar} className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-all duration-500" />
                  </div>
                  <div className="absolute hidden group-hover:block -top-10 left-0 bg-white text-black px-3 py-1 text-[10px] font-black whitespace-nowrap uppercase tracking-tighter z-50">
                    {u.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Studio Hub */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Urgent Ticker - High Contrast */}
        <div className="h-20 border-b border-white/10 flex items-center overflow-hidden bg-black relative">
          <div className="scanner-line"></div>
          <div className="bg-white text-black h-full px-10 flex flex-col justify-center gap-0 shrink-0 relative z-20">
            <span className="text-[10px] font-black tracking-[0.4em]">URGENT</span>
            <span className="text-[10px] font-black tracking-[0.4em] opacity-40">FEED</span>
          </div>
          <div className="flex-1 flex items-center px-10 gap-16 overflow-x-auto custom-scrollbar whitespace-nowrap">
            {urgentTasks.map((task, idx) => (
              <div key={task.id} className="flex items-center gap-5 group cursor-pointer">
                <span className="text-[16px] font-black text-white/20 group-hover:text-white transition-colors">0{idx + 1}</span>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-white/80 group-hover:text-white">{task.title}</span>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">{task.projectName} • {task.timeSlot}</span>
                </div>
              </div>
            ))}
            {urgentTasks.length === 0 && (
              <span className="text-xs font-black uppercase tracking-[0.5em] text-white/10">ALL CLEAR</span>
            )}
          </div>
        </div>

        {/* Dynamic Views */}
        <div className="flex-1 overflow-y-auto p-12 lg:p-16 custom-scrollbar">
          {view === 'Studio Pulse' && (
            <div className="space-y-20 animate-in fade-in duration-700">
              <header className="flex flex-col md:flex-row md:items-end justify-between border-b-[4px] border-white pb-10">
                <div>
                  <h1 className="text-7xl font-black tracking-tighter leading-none mb-4 uppercase">Pulse.</h1>
                  <p className="text-sm font-black uppercase tracking-[0.6em] text-white/30">Daily Studio Activity</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-xs font-black uppercase tracking-[0.5em] text-white mb-1 opacity-40">CALENDAR</p>
                  <p className="text-xl font-bold uppercase tracking-tighter">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                </div>
              </header>

              {/* Massive Active Focus Cards */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {USERS.map(user => (
                  <div key={user.id} className="focus-card p-10 flex flex-col md:flex-row gap-10 group">
                    <div className="shrink-0 relative">
                      <div className="w-28 h-28 overflow-hidden border border-white/20 group-hover:border-white transition-all duration-500">
                        <img src={user.avatar} className="w-full h-full object-cover grayscale transition-all duration-500" />
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-black border border-white/40 flex items-center justify-center text-[10px] font-black">
                        0{user.id}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-3xl font-black uppercase tracking-tighter mb-1 leading-none">{user.name}</h3>
                          <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">{user.role}</p>
                        </div>
                      </div>
                      
                      <div className="mb-8 p-5 bg-white/5 border-l-2 border-white">
                        <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mb-2">ACTIVE FOCUS</p>
                        <p className="text-xl font-bold leading-tight group-hover:text-white transition-colors uppercase tracking-tight">{user.activeFocus}</p>
                      </div>
                      
                      <div className="mt-auto space-y-4">
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">TODAY'S LOG</p>
                        <div className="space-y-2">
                           {user.dailyTasks?.map(task => (
                             <div key={task.id} className="flex items-center justify-between group/task py-1 border-b border-white/[0.03]">
                               <div className="flex items-center gap-4">
                                 <div className={`w-2.5 h-2.5 border transition-all duration-500 ${task.completed ? 'bg-white border-white' : 'border-white/30 group-hover/task:border-white'}`}></div>
                                 <span className={`text-[11px] font-black uppercase tracking-widest ${task.completed ? 'opacity-20' : 'opacity-80'}`}>{task.title}</span>
                               </div>
                               <span className="text-[9px] font-mono opacity-30">{task.timeSlot}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'Project Archive' && (
            <div className="space-y-20 animate-in fade-in duration-700">
              <header className="flex items-baseline justify-between border-b-[4px] border-white pb-10">
                <h1 className="text-7xl font-black tracking-tighter leading-none uppercase">Archive.</h1>
              </header>

              <div className="grid grid-cols-1 gap-24">
                {projects.map(project => (
                  <div key={project.id} className="flex flex-col lg:flex-row gap-16 group">
                    <div className="lg:w-1/2 relative overflow-hidden bg-white/5 aspect-[16/10] border border-white/10 group-hover:border-white transition-all duration-500">
                       <img src={project.coverImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
                       <div className="absolute bottom-8 left-8 flex items-end gap-6">
                         <span className="bg-white text-black px-6 py-2 text-[11px] font-black uppercase tracking-[0.4em] shadow-xl">
                            {project.category}
                         </span>
                         <span className="text-5xl font-black text-white/20 group-hover:text-white transition-all duration-500">{project.progress}%</span>
                       </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="mb-10">
                        <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.5em] mb-4">{STATUS_UI[project.status].label}</p>
                        <h2 className="text-6xl font-black tracking-tighter mb-5 leading-[0.9] uppercase group-hover:tracking-normal transition-all duration-500">{project.name}</h2>
                        <div className="flex items-center gap-3 text-white/30 text-[10px] font-black tracking-[0.3em] uppercase">
                          <MapIcon className="w-4 h-4 opacity-50" />
                          {project.location}
                        </div>
                      </div>

                      <div className="space-y-6 mb-10">
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">ASSIGNMENTS</p>
                        <div className="grid grid-cols-1 gap-3">
                          {project.tasks.map(t => {
                            const assignee = getAssignee(t.assigneeId);
                            return (
                              <div key={t.id} className="bg-white/[0.03] p-5 border border-transparent hover:border-white/20 transition-all flex items-center justify-between group/titem">
                                <div className="flex items-center gap-5">
                                  <div className={`w-3.5 h-3.5 border ${t.completed ? 'bg-white border-white' : 'border-white/20'}`}></div>
                                  <div>
                                    <p className={`text-[12px] font-black uppercase tracking-widest ${t.completed ? 'opacity-20' : 'opacity-90'}`}>{t.title}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                      <div className="w-4 h-4 overflow-hidden border border-white/20">
                                        <img src={assignee?.avatar} className="w-full h-full object-cover grayscale" />
                                      </div>
                                      <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{assignee?.name} • {assignee?.role}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                        <div className="bg-white h-full transition-all duration-1000 shadow-[0_0_10px_#FFF]" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'Studio Roadmap' && (
            <div className="min-h-[50vh] flex flex-col items-center justify-center border border-white/10 p-20 bg-black relative">
               <h2 className="text-6xl font-black uppercase mb-10 text-white/10 tracking-[0.2em]">Roadmap.</h2>
               <div className="w-32 h-[1px] bg-white opacity-20 relative z-10"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
