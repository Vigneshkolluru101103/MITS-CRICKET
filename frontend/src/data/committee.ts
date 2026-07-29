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
    role: 'Captain - DILMAN Titans',
    photo: '/images/bharav.jpg',
    description: 'Franchise Captain leading DILMAN Titans in the DPL Premier League.',
  },
  {
    id: '2',
    name: 'SRINIVASULU',
    role: 'Captain - Strikers XI',
    photo: '/images/srinivasulu.jpg',
    description: 'Franchise Captain leading Strikers XI in the DPL Premier League.',
  },
  {
    id: '3',
    name: 'SHIVARAJ',
    role: 'Captain - Royal Strikers DILMAN',
    photo: '/images/shivaraj.jpg',
    description: 'Franchise Captain leading Royal Strikers DILMAN in the DPL Premier League.',
  },
];
