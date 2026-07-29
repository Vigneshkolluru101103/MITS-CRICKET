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
    name: 'BHARGAV',
    role: 'Captain - DILMAN TITANS',
    photo: '/images/bharav.jpg',
    description: 'Franchise Captain leading DILMAN Titans in the DPL Premier League.',
  },
  {
    id: '2',
    name: 'SRINIVASULU',
    role: 'Captain - DILMAN WARRIORS',
    photo: '/images/srinivasulu.jpg',
    description: 'Franchise Captain leading DILMAN WARRIORS in the DPL Premier League.',
  },
  {
    id: '3',
    name: 'SHIVARAJ',
    role: 'Captain - DILMAN ROYALS',
    photo: '/images/shivaraj.jpg',
    description: 'Franchise Captain leading DILMAN ROYALS in the DPL Premier League.',
  },
];
