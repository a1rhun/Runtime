export interface Player {
  num: string;
  name: string;
  pos: string;
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
  matchDate: string;
  formation: string;
  players: Player[];
  substitutes: string;
}
