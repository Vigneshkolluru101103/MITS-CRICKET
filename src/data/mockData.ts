import type { Sponsor, CommitteeMember, MatchFixture, Announcement, GalleryItem, FAQItem } from '../types';

export const CricHeroesConfig = {
  liveUrl: 'https://cricheroes.in/tournament/dilman-premier-league-season-7',
  channelName: 'DILMAN Premier League Season 1',
  appStoreUrl: 'https://cricheroes.in/download-app',
};

export const DILMANLeagueStats = {
  activeSeason: 'Season 1',
  totalPlayersRegistered: 50,
  auctionCap: '50k',
  participatingTeams: 3,
  totalMatches: 4,
  nextMatchDate: '2026-08-15T09:00:00+05:30',
  registrationDeadline: '2026-08-10T23:59:59+05:30',
};

export const TeamsList = [
  { id: 't1', name: 'DILMAN TITANS', shortName: 'DTN', color: 'from-amber-500 to-red-600', captain: 'BHARGAV' },
  { id: 't2', name: 'DILMAN WARRIORS', shortName: 'DWR', color: 'from-cyan-500 to-blue-700', captain: 'SRINIVASULU' },
  { id: 't3', name: 'DILMAN ROYALS', shortName: 'DRS', color: 'from-purple-600 to-pink-600', captain: 'SHIVARAJ' },
];

export const SponsorsData: Sponsor[] = [
  {
    id: 's1',
    name: 'Apollo Tyres & Auto',
    tier: 'TITLE',
    logo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80',
    tagline: 'Official Title Sponsor of DPL Season 1',
    website: 'https://example.com',
    description: 'Empowering sports performance & excellence across nationwide tournaments.'
  },
  {
    id: 's2',
    name: 'Red Bull Energy',
    tier: 'POWERED_BY',
    logo: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300&auto=format&fit=crop&q=80',
    tagline: 'Energy Partner',
    website: 'https://example.com',
    description: 'Fueling champions with maximum energy and tactical speed.'
  },
  {
    id: 's3',
    name: 'SG Cricket Equipment',
    tier: 'GOLD',
    logo: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&auto=format&fit=crop&q=80',
    tagline: 'Official Kit & Ball Partner',
    website: 'https://example.com',
    description: 'Premium match balls, bats, and player gear for high-grade performance.'
  },
  {
    id: 's4',
    name: 'Decathlon Sports',
    tier: 'GOLD',
    logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&auto=format&fit=crop&q=80',
    tagline: 'Sports Merchandise Partner',
    website: 'https://example.com',
    description: 'Providing official jerseys, boundary cushions & training gear.'
  },
  {
    id: 's5',
    name: 'FreshBites Cafe DILMAN',
    tier: 'SILVER',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=80',
    tagline: 'Hydration & Nutrition Partner',
    website: 'https://example.com',
    description: 'Refreshing players & spectators throughout the tournament.'
  },
  {
    id: 's6',
    name: 'CricHeroes',
    tier: 'PARTNER',
    logo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&auto=format&fit=crop&q=80',
    tagline: 'Official Scoring & Live Stream Partner',
    website: CricHeroesConfig.liveUrl,
    description: 'Ball-by-ball digital scoring, player stats, and high-definition video streaming.'
  }
];

export const CommitteeMembersData: CommitteeMember[] = [
  {
    id: 'c1',
    name: 'Dr. R. K. Ramesh',
    role: 'Patron & Principal, DILMAN',
    category: 'FACULTY',
    department: 'Administration',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Visionary academician promoting world-class sports infrastructure and student leadership.',
    socials: { linkedin: '#', email: 'principal@dilman.ac.in' }
  },
  {
    id: 'c2',
    name: 'Prof. Suresh Kumar',
    role: 'Physical Education Director & Chief Advisor',
    category: 'FACULTY',
    department: 'Department of Physical Education',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Over 20 years guiding collegiate sports leagues and state-level cricket championships.',
    socials: { linkedin: '#', email: 'sports@dilman.ac.in' }
  },
  {
    id: 'c3',
    name: 'Aravind Krishnan',
    role: 'Student League President & Convener',
    category: 'STUDENT_LEAD',
    department: 'Computer Science & Engg',
    batch: '2026',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Captain of DILMAN College Cricket Team and overall coordinator for DPL Season 1.',
    socials: { linkedin: '#', instagram: '#', email: 'aravind.dpl@dilman.ac.in' }
  },
  {
    id: 'c4',
    name: 'Meera Nair',
    role: 'Head of Operations & Logistics',
    category: 'STUDENT_LEAD',
    department: 'Electronics & Communication',
    batch: '2026',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: 'Directing tournament scheduling, ground management, and team auction workflows.',
    socials: { linkedin: '#', instagram: '#' }
  },
  {
    id: 'c5',
    name: 'Vivek Sharma (Alumni)',
    role: 'Alumni Engagement Lead',
    category: 'DIRECTOR',
    department: 'Mechanical Engg',
    batch: 'Alumni 2021',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    bio: 'Bridging active students and alumni networks to foster competitive sportsmanship.',
    socials: { linkedin: '#' }
  },
  {
    id: 'c6',
    name: 'Karan Patel',
    role: 'Tech & CricHeroes Live Streaming Lead',
    category: 'TECHNICAL',
    department: 'Information Technology',
    batch: '2027',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    bio: 'Managing digital scoring, web portal maintenance, and CricHeroes API synchronization.',
    socials: { linkedin: '#', instagram: '#' }
  }
];

export const MatchFixturesData: MatchFixture[] = [
  {
    id: 'm1',
    matchNumber: 1,
    stage: 'GROUP',
    teamA: { name: 'DILMAN TITANS', shortName: 'DTN', logo: '' },
    teamB: { name: 'DILMAN WARRIORS', shortName: 'DWR', logo: '' },
    date: '2026-08-16',
    time: '09:00 AM IST',
    venue: 'MITS COLLEGE GROUND',
    cricHeroesUrl: CricHeroesConfig.liveUrl
  },
  {
    id: 'm2',
    matchNumber: 2,
    stage: 'GROUP',
    teamA: { name: 'DILMAN WARRIORS', shortName: 'DWR', logo: '' },
    teamB: { name: 'DILMAN ROYALS', shortName: 'DRS', logo: '' },
    date: '2026-08-16',
    time: '02:00 PM IST',
    venue: 'MITS COLLEGE GROUND',
    cricHeroesUrl: CricHeroesConfig.liveUrl
  },
  {
    id: 'm3',
    matchNumber: 3,
    stage: 'GROUP',
    teamA: { name: 'DILMAN ROYALS', shortName: 'DRS', logo: '' },
    teamB: { name: 'DILMAN TITANS', shortName: 'DTN', logo: '' },
    date: '2026-08-17',
    time: '09:00 AM IST',
    venue: 'MITS COLLEGE GROUND',
    cricHeroesUrl: CricHeroesConfig.liveUrl
  },
  {
    id: 'm4',
    matchNumber: 4,
    stage: 'FINAL',
    teamA: { name: 'TABLE TOPPER 1', shortName: 'TBD', logo: '' },
    teamB: { name: 'TABLE TOPPER 2', shortName: 'TBD', logo: '' },
    date: '2026-08-24',
    time: '02:30 PM IST',
    venue: 'DILMAN Central Stadium Floodlight Turf',
    cricHeroesUrl: CricHeroesConfig.liveUrl
  }
];

export const AnnouncementsData: Announcement[] = [
  {
    id: 'a1',
    title: 'Player Registrations for Season 1 are NOW OPEN!',
    summary: 'Active students & alumni can submit registrations until August 10. Early registrations receive official trial preference.',
    content: `The Sports Committee is proud to announce that player registration for the **DILMAN Premier League Season 1** is officially live!

### Registration Eligibility:
- **Active Students**: ALL Branches enrolled students of MITS.
- **Alumni**: Graduated batches of MITS across all departments.

### How to Register:
Navigate to the [Registration](/register) page, complete the multi-step profile with your batting/bowling statistics, and upload your profile photo. Once submitted, you will receive a downloadable Digital Player Pass.

### Important Dates:
- **Registration Deadline**: August 10, 2026 (23:59 IST)
- **Grand Player Auction**: August 12, 2026 at DILMAN Auditorium
- **Tournament Opening Match**: August 16, 2026`,
    category: 'REGISTRATION',
    date: '2026-07-28',
    author: 'DPL Committee',
    isImportant: true,
    coverImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'a2',
    title: 'Grand Player Auction Date & Purse Allocation Announced',
    summary: '3 franchises will bid for top talent with a virtual purse cap of 10K Points each at DILMAN Auditorium.',
    content: `The DPL Season 1 Franchise Auction will be held on **August 12, 2026** at the Main College Auditorium.

Each franchise team owner will be allotted a virtual purse of **10,000 points**. 

- **Category A (Icon/State Players)**: Base bid 1,000 Points
- **Category B (College Team Players)**: Base bid 500 Points
- **Category C (Emerging/Alumni Stars)**: Base bid 250 Points

All registered players will be placed into the auction pool following selection trials on August 11.`,
    category: 'AUCTION',
    date: '2026-07-25',
    author: 'Auction Directorate',
    isImportant: true,
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'a3',
    title: 'DILMAN PREMIER LEAGUE (DPL) – TOURNAMENT DETAILS 🏆',
    summary: 'Official tournament format, match rules, player benefits, auction guidelines, and discipline policies.',
    content: `📢 **Attention All Captains**

Please read the tournament rules carefully. Participation in the tournament means you agree to all the rules and regulations mentioned below.

📋 **Tournament Format**
🔹 **Teams**: 3 Teams
🔹 **Match Format**: 20 Overs
🔹 **League Stage**: Each team will play 2 matches.
🔹 **Final Match**: Top 2 teams from the points table will qualify for the Grand Final.

🏏 **Match Rules**
🔹 **Ball**: White Leather Ball
🔹 **Rules**: All ICC Rules are applicable throughout the tournament.

🎽 **Player Benefits**
🔹 Every registered player will receive a **FREE Tournament Jersey**. 👕

🔨 **Auction**
🔹 This is an Auction Bidding Tournament.
🔹 All teams will be formed through the official player auction.

⚖️ **Tournament Management**
🔹 The tournament management reserves the right to modify or update the rules based on situations and tournament requirements.
🔹 The decision of the Tournament Management is final and binding in all matters.

⚠️ **Discipline & Responsibility**
🔹 No unnecessary arguments, disputes, or issues will be accepted.
🔹 Each Team Captain is fully responsible for the discipline and behavior of their players and supporters.
🔹 Any misconduct may lead to warnings, penalties, or disqualification, as decided by the Tournament Management.

🔥 **Get Ready for an Exciting Cricket Battle!**

📢 Auction Date, Fixtures & Match Schedule will be announced soon.

🏆 **DILMAN PREMIER LEAGUE (DPL)** 🏏
*Play Hard • Play Fair • Create History 💪🔥*`,
    category: 'RULES',
    date: '2026-07-29',
    author: 'DPL Tournament Management',
    isImportant: true,
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80'
  }
];

export const GalleryData: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Season 1 Opening Trophy Launch',
    category: 'TROPHIES',
    type: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1000&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&auto=format&fit=crop&q=80',
    date: '2026-08-01',
    description: 'Official DPL Season 1 trophy unveiled at MITS Sports Complex.'
  },
  {
    id: 'g2',
    title: 'Intense Night Floodlight Match Under Lights',
    category: 'MATCHES',
    type: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&auto=format&fit=crop&q=80',
    date: '2026-08-02',
    description: 'Packed stands at DILMAN Central Stadium during practice clash.'
  },
  {
    id: 'g3',
    title: 'High Stakes Player Bidding at Auction Night',
    category: 'AUCTION',
    type: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&auto=format&fit=crop&q=80',
    date: '2026-08-03',
    description: 'Franchise owners engaging in intense paddle bidding for marquee players.'
  },
  {
    id: 'g4',
    title: 'Match Winning Six Celebration',
    category: 'CELEBRATIONS',
    type: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&auto=format&fit=crop&q=80',
    date: '2026-08-04',
    description: 'Strikers XI batsman celebrating half-century off 22 balls.'
  },
  {
    id: 'g5',
    title: 'Custom Championship Trophy & Medals Unveiling',
    category: 'TROPHIES',
    type: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1000&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&auto=format&fit=crop&q=80',
    date: '2026-08-05',
    description: 'Gold-plated custom crafted DPL championship cup unveiled by Principal Dr. Ramesh.'
  },
  {
    id: 'g6',
    title: 'Spectacular Boundary Catch Spotlight',
    category: 'MATCHES',
    type: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=80',
    date: '2026-08-06',
    description: 'Mind-boggling airborne catch taken at deep mid-wicket.'
  }
];

export const FAQsData: FAQItem[] = [
  {
    id: 'f1',
    category: 'REGISTRATION',
    question: 'Who is eligible to register for DILMAN Premier League (DPL)?',
    answer: 'All currently enrolled active students (B.Tech, M.Tech, MCA, MBA) of DILMAN as well as verified DILMAN Alumni are eligible to register. Active students must provide their valid Roll Number.'
  },
  {
    id: 'f2',
    category: 'REGISTRATION',
    question: 'Is there a registration fee for players?',
    answer: 'Registration is completely free for all active DILMAN students and alumni. Once registered, candidates will be invited to selection trial sessions.'
  },
  {
    id: 'f3',
    category: 'CRICHEROES',
    question: 'How do I watch matches live online?',
    answer: 'Every match is streamed live in high-definition on CricHeroes! Click the "Watch Live on CricHeroes" CTA anywhere on the website to jump straight to the live stream and ball-by-ball scorecards.'
  },
  {
    id: 'f4',
    category: 'RULES',
    question: 'What is the match format for DPL Season 1?',
    answer: 'Matches follow the T20 / 15-overs limited overs format with powerplay overs, free hits on no-balls, and mandatory pink leather balls for day/night floodlight fixtures.'
  },
  {
    id: 'f5',
    category: 'RULES',
    question: 'How does the player auction work?',
    answer: 'All verified registered players are cataloged into an auction handbook categorized by primary skills (Batsmen, Fast Bowlers, Spinners, All-Rounders, Wicketkeepers). 3 team owners use virtual purse points (10,000 points) to bid for players.'
  }
];

export const PastChampionsData = [
  { season: 'Season 1 (2026)', champion: 'In Progress', runnerUp: 'TBD', playerOfTournament: 'TBD' },
];
