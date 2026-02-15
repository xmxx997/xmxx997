
export type User = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  dailyTasks?: Task[];
  activeFocus?: string;
};

export type ProjectCategory = 'Architecture' | 'Interior' | 'Unified';

export enum ProjectStatus {
  DREAMING = 'Dreaming',
  SKETCHING = 'Sketching',
  REFINING = 'Refining',
  DOCUMENTING = 'Documenting',
  BUILDING = 'Building',
  FINISHED = 'Finished'
}

export type Task = {
  id: string;
  title: string;
  assigneeId: string;
  completed: boolean;
  urgency: 'High' | 'Medium' | 'Low';
  timeSlot?: string;
  projectName?: string;
};

export type Project = {
  id: string;
  name: string;
  location: string;
  status: ProjectStatus;
  category: ProjectCategory;
  progress: number;
  assignees: string[];
  tasks: Task[];
  coverImage: string;
};

export type ViewType = 'Studio Pulse' | 'Project Archive' | 'Studio Roadmap';
