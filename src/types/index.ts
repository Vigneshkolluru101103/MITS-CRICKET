export type PlayerCategory = 'STUDENT' | 'ALUMNI';

export type PlayerRole = 
  | 'BATSMAN'
  | 'BOWLER'
  | 'ALL_ROUNDER'
  | 'WICKET_KEEPER'
  | 'WICKET_KEEPER_BATSMAN';

export interface PlayerRegistrationData {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  category: PlayerCategory;
  rollNo?: string;
  batchYear: string;
  department: string;
  role: PlayerRole;
  battingStyle: string;
  bowlingStyle: string;
  highestLevel: string;
  pastMatchStats: string;
  profileImage?: string;
  tshirtSize?: string;
  agreeRules: boolean;
  createdAt?: string;
}

export type SponsorTier = 'TITLE' | 'POWERED_BY' | 'GOLD' | 'SILVER' | 'PARTNER';

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  logo: string;
  tagline: string;
  website: string;
  description?: string;
}

export type CommitteeRoleCategory = 'FACULTY' | 'STUDENT_LEAD' | 'DIRECTOR' | 'TECHNICAL';

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  category: CommitteeRoleCategory;
  department?: string;
  batch?: string;
  image: string;
  bio: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
}

export interface MatchFixture {
  id: string;
  matchNumber: number;
  stage: 'GROUP' | 'QUARTER_FINAL' | 'SEMI_FINAL' | 'FINAL';
  teamA: {
    name: string;
    logo: string;
    shortName: string;
  };
  teamB: {
    name: string;
    logo: string;
    shortName: string;
  };
  date: string;
  time: string;
  venue: string;
  cricHeroesUrl: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'AUCTION' | 'SCHEDULE' | 'RULES' | 'GENERAL' | 'REGISTRATION';
  date: string;
  author: string;
  isImportant?: boolean;
  coverImage?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'MATCHES' | 'AUCTION' | 'CELEBRATIONS' | 'TROPHIES' | 'ALL';
  type: 'IMAGE' | 'VIDEO';
  mediaUrl: string;
  thumbnailUrl: string;
  date: string;
  description?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'REGISTRATION' | 'RULES' | 'GENERAL' | 'CRICHEROES';
}
