
import React from 'react';
import { Project, ProjectStatus } from '../types';
// Fixed: Changed STATUS_COLORS to STATUS_UI as exported in constants.ts
import { USERS, STATUS_UI } from '../constants';
import { MoreVerticalIcon } from './Icons';

interface ProjectTableProps {
  projects: Project[];
}

export const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  const getAssignee = (id: string) => USERS.find(u => u.id === id);

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold tracking-wider">
              <th className="px-6 py-4">Project / Address</th>
              <th className="px-6 py-4 text-center">Assignees</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Progress</th>
              <th className="px-6 py-4">Last Update</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <div>
                    {/* Fixed: Project type uses 'name' instead of 'address' */}
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </div>
                    {/* Fixed: Project type uses 'location' instead of individual address parts */}
                    <div className="text-xs text-gray-500">
                      {project.location}
                    </div>
                    <div className="mt-1">
                      {/* Fixed: 'category' is not in Project type; using status as a label */}
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase font-bold tracking-tight">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2 justify-center">
                    {project.assignees.map((id) => {
                      const user = getAssignee(id);
                      return user ? (
                        <div key={id} className="relative group/avatar">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          />
                          <div className="absolute bottom-full mb-2 hidden group-hover/avatar:block bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-50">
                            {user.name} ({user.role})
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {/* Fixed: Used STATUS_UI for background color and label */}
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: STATUS_UI[project.status].color }}
                  >
                    {STATUS_UI[project.status].label}
                  </span>
                </td>
                <td className="px-6 py-4 min-w-[140px]">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium">
                    {project.progress}% Complete
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {/* Fixed: lastUpdated is not in Project type; using a placeholder string */}
                  Recent
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                    <MoreVerticalIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
