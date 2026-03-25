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
