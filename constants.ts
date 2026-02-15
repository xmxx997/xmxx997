
import { User, Project, ProjectStatus, Task } from './types';

export const USERS: User[] = [
  { 
    id: '1', name: 'xmx', role: 'Lead Design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    activeFocus: 'Lime Ln Site Inspection & Texture Board Review',
    dailyTasks: [
      { id: 'dt1', title: 'Lime Ln Site Inspection', assigneeId: '1', completed: false, urgency: 'High', timeSlot: '09:00', projectName: 'Lime Lane' },
      { id: 'dt2', title: 'Review Material Samples', assigneeId: '1', completed: true, urgency: 'Medium', timeSlot: '14:00', projectName: 'Hawthorine' }
    ]
  },
  { 
    id: '2', name: 'ke', role: 'Architect', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    activeFocus: 'Structural Calcs for Grandview Ave Villa',
    dailyTasks: [
      { id: 'dt3', title: 'Grandview Structural Calc', assigneeId: '2', completed: false, urgency: 'High', timeSlot: '10:30', projectName: 'Grandview Ave' },
      { id: 'dt4', title: 'AutoCAD Detail Updates', assigneeId: '2', completed: false, urgency: 'Low', timeSlot: '16:00', projectName: 'Ballina' }
    ]
  },
  { 
    id: '3', name: 'mona', role: 'Stylist', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    activeFocus: 'Sourcing Velvets for Hawthorine Loft FF&E',
    dailyTasks: [
      { id: 'dt5', title: 'Moodboard for Hawthorine', assigneeId: '3', completed: false, urgency: 'Medium', timeSlot: '11:00', projectName: 'Hawthorine' },
      { id: 'dt6', title: 'Textile Vendor Meeting', assigneeId: '3', completed: true, urgency: 'Low', timeSlot: '15:30', projectName: 'Internal' }
    ]
  },
  { 
    id: '4', name: 'yifan', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    activeFocus: 'Finalizing City Permits for Ballina Project',
    dailyTasks: [
      { id: 'dt7', title: 'Ballina Permit Status Check', assigneeId: '4', completed: false, urgency: 'High', timeSlot: '08:30', projectName: 'Ballina' },
      { id: 'dt8', title: 'Contractor Weekly Sync', assigneeId: '4', completed: false, urgency: 'Medium', timeSlot: '13:00', projectName: 'General' }
    ]
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Lime Lane Residence',
    location: 'Santa Ana, CA',
    status: ProjectStatus.DREAMING,
    category: 'Architecture',
    progress: 15,
    assignees: ['1', '4'],
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    tasks: [
      { id: 't1', title: 'Initial Concept Sketch', assigneeId: '1', completed: true, urgency: 'High' },
      { id: 't2', title: 'Permit Filing', assigneeId: '4', completed: false, urgency: 'Medium' },
    ]
  },
  {
    id: 'p2',
    name: 'Hawthorine Loft',
    location: 'Hawthorine, CA',
    status: ProjectStatus.REFINING,
    category: 'Interior',
    progress: 45,
    assignees: ['2', '3'],
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    tasks: [
      { id: 't3', title: '3D Renders', assigneeId: '2', completed: true, urgency: 'Medium' },
      { id: 't4', title: 'FF&E Schedule', assigneeId: '3', completed: false, urgency: 'High' },
    ]
  },
  {
    id: 'p3',
    name: 'Grandview Ave Villa',
    location: 'Yorba Linda, CA',
    status: ProjectStatus.BUILDING,
    category: 'Unified',
    progress: 75,
    assignees: ['1', '2'],
    coverImage: 'https://images.unsplash.com/photo-1600607687940-47a04b62d35a?w=1200&q=80',
    tasks: [
      { id: 't5', title: 'Site Inspection', assigneeId: '1', completed: true, urgency: 'High' },
      { id: 't6', title: 'Structural Check', assigneeId: '2', completed: true, urgency: 'High' },
    ]
  },
  {
    id: 'p4',
    name: 'Ballina Drive',
    location: 'Encino, CA',
    status: ProjectStatus.DOCUMENTING,
    category: 'Architecture',
    progress: 60,
    assignees: ['4', '2'],
    coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=1200&q=80',
    tasks: [
      { id: 't7', title: 'Window Schedules', assigneeId: '2', completed: true, urgency: 'Low' },
      { id: 't8', title: 'Contractor Bidding', assigneeId: '4', completed: false, urgency: 'Medium' },
    ]
  }
];

export const STATUS_UI: Record<ProjectStatus, { label: string }> = {
  [ProjectStatus.DREAMING]: { label: 'Concept' },
  [ProjectStatus.SKETCHING]: { label: 'Schematic' },
  [ProjectStatus.REFINING]: { label: 'Development' },
  [ProjectStatus.DOCUMENTING]: { label: 'Documentation' },
  [ProjectStatus.BUILDING]: { label: 'Construction' },
  [ProjectStatus.FINISHED]: { label: 'Archive' },
};
