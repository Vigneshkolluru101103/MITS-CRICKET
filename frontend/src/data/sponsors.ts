export interface SponsorItem {
  id: string;
  name: string;
  designation?: string;
  photo: string;
  description: string;
}

export const sponsorsData: SponsorItem[] = [
  {
    id: '1',
    name: 'Vidya Sagar',
    designation: 'Title Sponsor & Patron',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    description: 'Supporting the MITS Premier League through valuable sponsorship, mentorship, and continuous encouragement for student athletes.',
  },
  {
    id: '2',
    name: 'Satish',
    designation: 'Associate Sponsor',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    description: 'Empowering youth sports and fostering collegiate athletic excellence across all matches of the MITS Premier League.',
  },
  {
    id: '3',
    name: 'Apollo Tyres',
    designation: 'Official Event Partner',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    description: 'Providing crucial tournament support, equipment sponsorship, and branding to drive sports excellence at MITS.',
  },
];
