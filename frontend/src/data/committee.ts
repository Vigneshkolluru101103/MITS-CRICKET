export interface CommitteeMemberItem {
  id: string;
  name: string;
  role?: string;
  photo: string;
  description?: string;
}

export const committeeData: CommitteeMemberItem[] = [
  {
    id: '1',
    name: 'Vignesh Kolluru',
    role: 'Event Coordinator & Lead',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    description: 'Organizing league operations, match schedules, and overall event execution.',
  },
  {
    id: '2',
    name: 'Aravind Krishnan',
    role: 'Student League President',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    description: 'Overseeing tournament planning, franchise management, and player auctions.',
  },
  {
    id: '3',
    name: 'Rahul Sharma',
    role: 'Operations & Logistics',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    description: 'Managing ground preparation, match gear, and team coordination.',
  },
  {
    id: '4',
    name: 'Mourya R',
    role: 'Technical & Media Lead',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    description: 'Directing CricHeroes live streams, scoring systems, and digital coverage.',
  },
  {
    id: '5',
    name: 'Guru Mohan',
    role: 'Public Relations Lead',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    description: 'Handling media announcements, player communications, and outreach.',
  },
];
