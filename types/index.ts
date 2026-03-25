export interface Player {
  num: string;
  name: string;
}

export interface SubPlayer {
  num: string;
  name: string;
}

export interface MatchAnnouncementData {
  badge: string;
  infoDate: string;
  infoVenue: string;
  awayTeam: string;
  matchDate: string;
  kickoffTime: string;
  venueShort: string;
  opponentImage?: string;
}

export interface StartingXiData {
  matchLabel: string;
  matchVs: string;
  matchInfoDate: string;
  matchInfoTime: string;
  matchInfoVenue: string;
  formation: string;
  players: Player[];
  substitutes: SubPlayer[];
}

export interface Scorer {
  minute: string;
  name: string;
  assist?: string;
}

export interface MatchResultOfficialData {
  badge: string;
  infoDate: string;
  infoVenue: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  scorers: Scorer[];
  teamPhoto?: string;
  pomPhoto?: string;
  pomName: string;
  pomNumber: string;
  pomPosition: string;
  opponentImage?: string;
}

export interface PlayerOfMatchData {
  pomPhoto?: string;
  pomPhotoX?: number; // 0~100, default 50
  pomPhotoY?: number; // 0~100, default 0
  pomName: string;
  pomNumber: string;
  pomPosition: string;
  matchLabel?: string;
  format?: 'square' | 'story'; // square=1080x1080, story=1080x1920
}

export interface MatchResultFriendlyData {
  badge: string;
  infoDate: string;
  infoVenue: string;
  awayTeam: string;
  teamPhoto?: string;
  opponentImage?: string;
}
