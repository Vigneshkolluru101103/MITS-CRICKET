export interface CommitteeMemberItem {
  id: string;
  name: string;
  teamName: string;
  role: string;
  photo: string;
  teamLogo: string;
  description?: string;
}

export const committeeData: CommitteeMemberItem[] = [
  {
    id: '1',
    name: 'SHIVARAJ',
    teamName: 'DILMAN TITANS',
    role: 'Franchise Captain',
    photo: '/images/shivaraj.jpg',
    teamLogo: '/images/logo_titans.jpg',
    description: 'Franchise Captain leading DILMAN Titans in the DPL Premier League.',
  },
  {
    id: '2',
    name: 'BHARGAV',
    teamName: 'DILMAN WARRIORS',
    role: 'Franchise Captain',
    photo: '/images/bharav.jpg',
    teamLogo: '/images/logo_warriors.jpg',
    description: 'Franchise Captain leading DILMAN Warriors in the DPL Premier League.',
  },
  {
    id: '3',
    name: 'SRINIVASULU',
    teamName: 'DILMAN GLADIATORS',
    role: 'Franchise Captain',
    photo: '/images/srinivasulu.jpg',
    teamLogo: '/images/logo_gladiators.jpg',
    description: 'Franchise Captain leading DILMAN Gladiators in the DPL Premier League.',
  },
];
