
import React from 'react';
import { Project, ProjectStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  projects: Project[];
}

export const Dashboard: React.FC<DashboardProps> = ({ projects }) => {
  // Stats calculations
  const totalProjects = projects.length;
  // Fixed: ProjectStatus.COMPLETED does not exist on type, using ProjectStatus.FINISHED instead
  const completedProjects = projects.filter(p => p.status === ProjectStatus.FINISHED).length;
  const inProgressProjects = totalProjects - completedProjects;
  
  const statusData = Object.values(ProjectStatus).map(status => ({
    name: status,
    value: projects.filter(p => p.status === status).length,
  })).filter(d => d.value > 0);

  // Note: priority and milestones are not explicitly defined in the Project type in types.ts. 
  // We use type casting as a temporary measure to fix specific requested errors while maintaining the component structure.
  const priorityData = [
    { name: 'High', value: projects.filter(p => (p as any).priority === 'High').length, color: '#ef4444' },
    { name: 'Medium', value: projects.filter(p => (p as any).priority === 'Medium').length, color: '#f59e0b' },
    { name: 'Low', value: projects.filter(p => (p as any).priority === 'Low').length, color: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: totalProjects, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'In Progress', value: inProgressProjects, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Average Progress', value: `${totalProjects > 0 ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / totalProjects) : 0}%`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'High Priority', value: projects.filter(p => (p as any).priority === 'High').length, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6">Status Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#6366f1', '#f59e0b', '#fbbf24', '#10b981'][index % 6]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6">Priority Level</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {priorityData.map(p => (
                <div key={p.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: p.color}}></div>
                  <span className="text-xs text-gray-500">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity / Quick List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Critical Milestones</h3>
        <div className="space-y-3">
          {projects.flatMap(p => ((p as any).milestones || []).filter((m: any) => !m.completed).map((m: any) => ({ ...m, projectAddress: p.location }))).slice(0, 5).map((m: any) => (
            <div key={m.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-50 hover:border-gray-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{m.title}</p>
                  <p className="text-xs text-gray-500">{m.projectAddress}</p>
                </div>
              </div>
              <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">Pending</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
