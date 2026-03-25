export interface PlayerProfile {
  num: string;
  name: string;
}

// 선수 등록 DB — 여기에 추가/수정
export const PLAYER_DB: PlayerProfile[] = [
  { num: '0',  name: '이시우' },
  { num: '2',  name: '심민서' },
  { num: '7',  name: '공기훈' },
  { num: '9',  name: '박태준' },
  { num: '10', name: '손승현' },
  { num: '12', name: '나건호' },
  { num: '14', name: '송권호' },
  { num: '16', name: '이창환' },
  { num: '17', name: '신상희' },
  { num: '18', name: '박상욱' },
  { num: '19', name: '김태영' },
  { num: '22', name: '심재현' },
  { num: '30', name: '유승웅' },
  { num: '32', name: '서태환' },
  { num: '34', name: '강신재' },
  { num: '37', name: '이준후' },
  { num: '39', name: '임준서' },
  { num: '42', name: '김현모' },
  { num: '66', name: '안시우' },
  { num: '77', name: '오현석' },
];

export function searchByNum(query: string): PlayerProfile[] {
  if (!query) return [];
  return PLAYER_DB.filter((p) => p.num.startsWith(query));
}

export function searchByName(query: string): PlayerProfile[] {
  if (!query) return [];
  return PLAYER_DB.filter((p) => p.name.includes(query));
}

export function findByNum(num: string): PlayerProfile | undefined {
  return PLAYER_DB.find((p) => p.num === num);
}

export function findByName(name: string): PlayerProfile | undefined {
  return PLAYER_DB.find((p) => p.name === name);
}
