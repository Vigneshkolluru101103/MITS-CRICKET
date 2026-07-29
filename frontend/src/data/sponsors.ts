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
    name: 'Dr. K. Dinesh',
    designation: 'HEAD of MITS CRICKET CLUB',
    photo: '/images/dr_dinesh.jpg',
    description: 'Providing crucial tournament support, equipment sponsorship, and branding to drive sports excellence at MITS.',
  },
  {
    id: '2',
    name: 'SUMAN THOTI',
    designation: 'Title Sponsor & Patron',
    photo: '/images/suman_thoti.jpg',
    description: 'Supporting the DPL Premier League through valuable sponsorship, mentorship, and continuous encouragement for student athletes.',
  },
  {
    id: '3',
    name: 'DIWAKAR',
    designation: 'Associate Sponsor',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    description: 'Empowering youth sports and fostering collegiate athletic excellence across all matches of the MITS Premier League.',
  },
];
