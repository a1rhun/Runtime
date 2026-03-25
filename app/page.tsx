'use client';

import { useState, useEffect, useRef } from 'react';
import MatchAnnouncementTemplate from '@/components/templates/MatchAnnouncementTemplate';
import StartingXiATemplate from '@/components/templates/StartingXiATemplate';
import StartingXiBTemplate from '@/components/templates/StartingXiBTemplate';
import MatchResultOfficialTemplate from '@/components/templates/MatchResultOfficialTemplate';
import MatchResultFriendlyTemplate from '@/components/templates/MatchResultFriendlyTemplate';
import PlayerOfMatchTemplate from '@/components/templates/PlayerOfMatchTemplate';
import PlayerOfMatchV2Template from '@/components/templates/PlayerOfMatchV2Template';
import DownloadButton from '@/components/DownloadButton';
import DatePicker from '@/components/DatePicker';
import PlayerRowInput from '@/components/PlayerRowInput';
import { MatchAnnouncementData, StartingXiData, Player, SubPlayer, MatchResultOfficialData, MatchResultFriendlyData, PlayerOfMatchData } from '@/types';

// ── 오늘 날짜 helper ─────────────────────────────────────
function todayStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

function infoDateToMatchDate(infoDate: string) {
  const parts = infoDate.split('.');
  return parts.length >= 3 ? `${parts[1]} / ${parts[2]}` : infoDate;
}

// ── 기본값 ──────────────────────────────────────────────
const _today = todayStr();
const DEFAULT_ANNOUNCEMENT: MatchAnnouncementData = {
  badge: 'MATCH PREVIEW',
  infoDate: _today,
  infoVenue: '동국대학교 대운동장',
  awayTeam: '3AM',
  matchDate: infoDateToMatchDate(_today),
  kickoffTime: '18 : 00',
  venueShort: '대운동장',
};


const DEFAULT_XI: StartingXiData = {
  matchLabel: '★ 토토배 · 2026',
  matchVs: '3AM',
  matchInfoDate: todayStr(),
  matchInfoTime: '18:00',
  matchInfoVenue: '동국대학교 대운동장',
  formation: '4 - 2 - 1 - 3',
  players: Array(11).fill(null).map(() => ({ num: '', name: '' })),
  substitutes: Array(7).fill(null).map(() => ({ num: '', name: '' })),
};

const DEFAULT_RESULT_OFFICIAL: MatchResultOfficialData = {
  badge: '토토배',
  infoDate: todayStr(),
  infoVenue: '동국대학교 대운동장',
  awayTeam: 'FC 정통',
  homeScore: '2',
  awayScore: '0',
  scorers: [
    { minute: '8', name: '손승현' },
    { minute: '13', name: '성준서', assist: '위인준' },
  ],
  pomName: '공기훈',
  pomNumber: '7',
  pomPosition: 'MF',
};

const DEFAULT_POM: PlayerOfMatchData = {
  pomName: '공가훈',
  pomNumber: '10',
  pomPosition: 'MF',
  matchLabel: '토토배 · 2026',
};

const DEFAULT_RESULT_FRIENDLY: MatchResultFriendlyData = {
  badge: '친선경기',
  infoDate: todayStr(),
  infoVenue: '동국대학교 대운동장',
  awayTeam: '통계학과',
};

type Tab = 'announcement' | 'xi-real' | 'xi-template1' | 'result-official' | 'result-friendly' | 'pom';

// ── 스타일 상수 ──────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(204,0,0,0.3)',
  color: '#fff',
  padding: '8px 12px',
  fontFamily: "'Noto Sans KR', sans-serif",
  fontSize: '14px',
  width: '100%',
  outline: 'none',
  borderRadius: '2px',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: '14px',
  letterSpacing: '3px',
  color: '#CC0000',
  marginBottom: '4px',
  display: 'block',
};

const fieldStyle: React.CSSProperties = {
  marginBottom: '12px',
};

// ── 스케일 계산 (미리보기용) ───────────────────────────────
const CARD_SIZE = 1080;

export default function Home() {
  const [tab, setTab] = useState<Tab>('announcement');
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isMobile = windowWidth < 768;
  const PREVIEW_SIZE = isMobile ? Math.min(windowWidth - 24, 480) : 480;
  const scale = PREVIEW_SIZE / CARD_SIZE;
  // story 모드용 프리뷰 치수 (높이 기준으로 스케일)
  const STORY_PREVIEW_H = isMobile ? Math.min(windowWidth - 24, 640) : 640;
  const storyScale = STORY_PREVIEW_H / 1920;
  const STORY_PREVIEW_W = Math.round(1080 * storyScale);
  const [announcement, setAnnouncement] = useState<MatchAnnouncementData>(DEFAULT_ANNOUNCEMENT);
  const [xiReal, setXiReal] = useState<StartingXiData>(DEFAULT_XI);
  const [xiT1, setXiT1] = useState<StartingXiData>(DEFAULT_XI);
  const [resultOfficial, setResultOfficial] = useState<MatchResultOfficialData>(DEFAULT_RESULT_OFFICIAL);
  const [resultFriendly, setResultFriendly] = useState<MatchResultFriendlyData>(DEFAULT_RESULT_FRIENDLY);
  const [pom, setPom] = useState<PlayerOfMatchData>(DEFAULT_POM);
  const [pomVersion, setPomVersion] = useState<1 | 2>(1);
  const pomFormat = pom.format ?? 'square';

  // 번호 입력 탭 네비게이션용 refs
  const xiRealPlayerRefs = useRef<(HTMLInputElement | null)[]>(Array(11).fill(null));
  const xiRealSubRefs = useRef<(HTMLInputElement | null)[]>(Array(7).fill(null));
  const xiT1PlayerRefs = useRef<(HTMLInputElement | null)[]>(Array(11).fill(null));
  const xiT1SubRefs = useRef<(HTMLInputElement | null)[]>(Array(7).fill(null));

  // 플레이어 행 업데이트 헬퍼
  const updatePlayer = (
    setter: React.Dispatch<React.SetStateAction<StartingXiData>>,
    index: number,
    field: keyof Player,
    value: string
  ) => {
    setter((prev) => {
      const players = [...prev.players];
      players[index] = { ...players[index], [field]: value };
      return { ...prev, players };
    });
  };

  // 교체선수 행 업데이트 헬퍼
  const updateSub = (
    setter: React.Dispatch<React.SetStateAction<StartingXiData>>,
    index: number,
    field: keyof SubPlayer,
    value: string
  ) => {
    setter((prev) => {
      const substitutes = [...prev.substitutes];
      substitutes[index] = { ...substitutes[index], [field]: value };
      return { ...prev, substitutes };
    });
  };

  const downloadFilename =
    tab === 'announcement'     ? 'runtime-match-announcement'
    : tab === 'xi-real'        ? 'runtime-starting-xi'
    : tab === 'xi-template1'   ? 'runtime-starting-xi-alt'
    : tab === 'result-official'? 'runtime-match-result-official'
    : tab === 'result-friendly'? 'runtime-match-result-friendly'
    :                            'runtime-player-of-the-match';

  const isStoryPreview = tab === 'pom' && pomFormat === 'story';
  const previewW = isStoryPreview ? STORY_PREVIEW_W : PREVIEW_SIZE;
  const previewH = isStoryPreview ? STORY_PREVIEW_H : PREVIEW_SIZE;
  const previewScale = isStoryPreview ? storyScale : scale;
  const previewCardH = isStoryPreview ? 1920 : CARD_SIZE;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', position: 'relative' }}>

      {/* 캡처 전용 렌더 — 화면 밖이지만 transform 없는 독립 위치 */}
      <div
        id="card-preview"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          width: '1080px',
          height: tab === 'pom' && pomFormat === 'story' ? '1920px' : '1080px',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {tab === 'announcement'      && <MatchAnnouncementTemplate data={announcement} />}
        {tab === 'xi-real'           && <StartingXiATemplate data={xiReal} />}
        {tab === 'xi-template1'      && <StartingXiBTemplate data={xiT1} />}
        {tab === 'result-official'   && <MatchResultOfficialTemplate data={resultOfficial} />}
        {tab === 'result-friendly'   && <MatchResultFriendlyTemplate data={resultFriendly} />}
        {tab === 'pom' && pomVersion === 1 && <PlayerOfMatchTemplate data={pom} />}
        {tab === 'pom' && pomVersion === 2 && <PlayerOfMatchV2Template data={pom} />}
      </div>

      {/* Header */}
      <header className="page-header">
        <div className="header-title">RUNTIME FC</div>
        <div className="header-sub">CARD GENERATOR</div>
      </header>

      <div className="page-body">

        {/* Form panel */}
        <div className="form-panel">

          {/* Tab selector */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {([
              { key: 'announcement',    label: 'MATCH' },
              { key: 'xi-real',         label: 'XI-A' },
              { key: 'xi-template1',    label: 'XI-B' },
              { key: 'result-official', label: 'RES-O' },
              { key: 'result-friendly', label: 'RES-F' },
              { key: 'pom',            label: 'POM' },
            ] as { key: Tab; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  flex: 1,
                  padding: '14px 4px',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '15px',
                  letterSpacing: '2px',
                  background: tab === key ? 'rgba(204,0,0,0.15)' : 'transparent',
                  color: tab === key ? '#FF3333' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  borderBottom: tab === key ? '2px solid #CC0000' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form body */}
          <div key={tab} style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

            {/* ── Match Announcement Form ── */}
            {tab === 'announcement' && (
              <>
                <div style={fieldStyle}>
                  <label style={labelStyle}>BADGE TEXT</label>
                  <input style={inputStyle} value={announcement.badge}
                    onChange={(e) => setAnnouncement((p) => ({ ...p, badge: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>INFO DATE</label>
                  <DatePicker value={announcement.infoDate}
                    onChange={(v) => setAnnouncement((p) => ({ ...p, infoDate: v, matchDate: infoDateToMatchDate(v) }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>INFO VENUE</label>
                  <input style={inputStyle} value={announcement.infoVenue}
                    onChange={(e) => setAnnouncement((p) => ({ ...p, infoVenue: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>AWAY TEAM</label>
                  <input style={inputStyle} value={announcement.awayTeam}
                    onChange={(e) => setAnnouncement((p) => ({ ...p, awayTeam: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>OPPONENT EMBLEM</label>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ ...inputStyle, padding: '6px 12px', cursor: 'pointer' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setAnnouncement((p) => ({ ...p, opponentImage: ev.target?.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  {announcement.opponentImage && (
                    <button
                      style={{
                        marginTop: '6px',
                        background: 'transparent',
                        border: '1px solid rgba(204,0,0,0.4)',
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '12px',
                        fontFamily: "'Bebas Neue', sans-serif",
                        letterSpacing: '2px',
                        padding: '4px 10px',
                        cursor: 'pointer',
                      }}
                      onClick={() => setAnnouncement((p) => ({ ...p, opponentImage: undefined }))}
                    >
                      REMOVE IMAGE
                    </button>
                  )}
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>DATE (하단 표시)</label>
                  <input style={inputStyle} value={announcement.matchDate}
                    onChange={(e) => setAnnouncement((p) => ({ ...p, matchDate: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>KICKOFF TIME</label>
                  <input style={inputStyle} value={announcement.kickoffTime}
                    onChange={(e) => setAnnouncement((p) => ({ ...p, kickoffTime: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>VENUE SHORT</label>
                  <input style={inputStyle} value={announcement.venueShort}
                    onChange={(e) => setAnnouncement((p) => ({ ...p, venueShort: e.target.value }))} />
                </div>
              </>
            )}

            {/* ── Starting XI Forms (공통 구조) ── */}
            {(tab === 'xi-real' || tab === 'xi-template1') && (() => {
              const data = tab === 'xi-real' ? xiReal : xiT1;
              const setData = tab === 'xi-real' ? setXiReal : setXiT1;
              const playerRefs = tab === 'xi-real' ? xiRealPlayerRefs : xiT1PlayerRefs;
              const subRefs = tab === 'xi-real' ? xiRealSubRefs : xiT1SubRefs;
              return (
                <>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>MATCH LABEL</label>
                    <input style={inputStyle} value={data.matchLabel}
                      onChange={(e) => setData((p) => ({ ...p, matchLabel: e.target.value }))} />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>OPPONENT</label>
                    <input style={inputStyle} value={data.matchVs}
                      onChange={(e) => setData((p) => ({ ...p, matchVs: e.target.value }))} />
                  </div>

                  {/* 날짜 / 시간 / 장소 분리 입력 */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>날짜</label>
                      <DatePicker value={data.matchInfoDate}
                        onChange={(v) => setData((p) => ({ ...p, matchInfoDate: v }))} />
                    </div>
                    <div style={{ width: '90px', flexShrink: 0 }}>
                      <label style={labelStyle}>시간</label>
                      <input style={inputStyle} value={data.matchInfoTime}
                        onChange={(e) => setData((p) => ({ ...p, matchInfoTime: e.target.value }))} />
                    </div>
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>장소</label>
                    <input style={inputStyle} value={data.matchInfoVenue}
                      onChange={(e) => setData((p) => ({ ...p, matchInfoVenue: e.target.value }))} />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>FORMATION</label>
                    <input style={inputStyle} value={data.formation}
                      onChange={(e) => setData((p) => ({ ...p, formation: e.target.value }))} />
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '16px 0 8px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '12px',
                  }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)' }}>
                      PLAYERS (번호 · 이름)
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => setData((p) => ({ ...p, players: [...p.players].sort((a, b) => Number(a.num || 9999) - Number(b.num || 9999)) }))}
                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.4)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '2px', padding: '3px 8px', cursor: 'pointer', borderRadius: '2px' }}
                      >
                        SORT
                      </button>
                      <button
                        onClick={() => setData((p) => ({ ...p, players: p.players.map(() => ({ num: '', name: '' })) }))}
                        style={{ background: 'transparent', border: '1px solid rgba(204,0,0,0.3)', color: 'rgba(204,0,0,0.6)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '2px', padding: '3px 8px', cursor: 'pointer', borderRadius: '2px' }}
                      >
                        CLEAR ALL
                      </button>
                    </div>
                  </div>

                  {data.players.map((player, i) => (
                    <div key={i} style={{ marginBottom: '6px' }}>
                      <PlayerRowInput
                        ref={(el) => { playerRefs.current[i] = el; }}
                        num={player.num}
                        name={player.name}
                        inputStyle={inputStyle}
                        onNumChange={(v) => updatePlayer(setData, i, 'num', v)}
                        onNameChange={(v) => updatePlayer(setData, i, 'name', v)}
                        onSelect={(p) => setData((prev) => {
                          const players = [...prev.players];
                          players[i] = { num: p.num, name: p.name };
                          return { ...prev, players };
                        })}
                        onClear={() => setData((prev) => {
                          const players = [...prev.players];
                          players[i] = { num: '', name: '' };
                          return { ...prev, players };
                        })}
                        onTabNext={() => {
                          if (i < data.players.length - 1) playerRefs.current[i + 1]?.focus();
                          else subRefs.current[0]?.focus();
                        }}
                      />
                    </div>
                  ))}

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '16px 0 8px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '12px',
                  }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)' }}>
                      SUBSTITUTIONS (번호 · 이름)
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => setData((p) => ({ ...p, substitutes: [...p.substitutes].sort((a, b) => Number(a.num || 9999) - Number(b.num || 9999)) }))}
                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.4)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '2px', padding: '3px 8px', cursor: 'pointer', borderRadius: '2px' }}
                      >
                        SORT
                      </button>
                      <button
                        onClick={() => setData((p) => ({ ...p, substitutes: p.substitutes.map(() => ({ num: '', name: '' })) }))}
                        style={{ background: 'transparent', border: '1px solid rgba(204,0,0,0.3)', color: 'rgba(204,0,0,0.6)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '2px', padding: '3px 8px', cursor: 'pointer', borderRadius: '2px' }}
                      >
                        CLEAR ALL
                      </button>
                    </div>
                  </div>

                  {data.substitutes.map((sub, i) => (
                    <div key={i} style={{ marginBottom: '6px' }}>
                      <PlayerRowInput
                        ref={(el) => { subRefs.current[i] = el; }}
                        num={sub.num}
                        name={sub.name}
                        inputStyle={inputStyle}
                        onNumChange={(v) => updateSub(setData, i, 'num', v)}
                        onNameChange={(v) => updateSub(setData, i, 'name', v)}
                        onSelect={(p) => setData((prev) => {
                          const substitutes = [...prev.substitutes];
                          substitutes[i] = { num: p.num, name: p.name };
                          return { ...prev, substitutes };
                        })}
                        onClear={() => setData((prev) => {
                          const substitutes = [...prev.substitutes];
                          substitutes[i] = { num: '', name: '' };
                          return { ...prev, substitutes };
                        })}
                        onTabNext={() => subRefs.current[i + 1]?.focus()}
                      />
                    </div>
                  ))}
                </>
              );
            })()}

            {/* ── Match Result Official Form ── */}
            {tab === 'result-official' && (
              <>
                <div style={fieldStyle}>
                  <label style={labelStyle}>BADGE (대회명)</label>
                  <input style={inputStyle} value={resultOfficial.badge}
                    onChange={(e) => setResultOfficial((p) => ({ ...p, badge: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>INFO DATE</label>
                  <DatePicker value={resultOfficial.infoDate}
                    onChange={(v) => setResultOfficial((p) => ({ ...p, infoDate: v }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>INFO VENUE</label>
                  <input style={inputStyle} value={resultOfficial.infoVenue}
                    onChange={(e) => setResultOfficial((p) => ({ ...p, infoVenue: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>AWAY TEAM</label>
                  <input style={inputStyle} value={resultOfficial.awayTeam}
                    onChange={(e) => setResultOfficial((p) => ({ ...p, awayTeam: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>OPPONENT EMBLEM</label>
                  <input type="file" accept="image/*"
                    style={{ ...inputStyle, padding: '6px 12px', cursor: 'pointer' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => setResultOfficial((p) => ({ ...p, opponentImage: ev.target?.result as string }));
                      reader.readAsDataURL(file);
                    }} />
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>HOME SCORE</label>
                    <input style={inputStyle} value={resultOfficial.homeScore}
                      onChange={(e) => setResultOfficial((p) => ({ ...p, homeScore: e.target.value }))} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>AWAY SCORE</label>
                    <input style={inputStyle} value={resultOfficial.awayScore}
                      onChange={(e) => setResultOfficial((p) => ({ ...p, awayScore: e.target.value }))} />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)' }}>SCORERS</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button type="button" onClick={() => setResultOfficial((p) => ({ ...p, scorers: [...p.scorers, { minute: '', name: '', assist: '' }] }))}
                        style={{ background: 'transparent', border: '1px solid rgba(204,0,0,0.4)', color: 'rgba(204,0,0,0.7)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '2px', padding: '3px 8px', cursor: 'pointer' }}>
                        + ADD
                      </button>
                      <button type="button" onClick={() => setResultOfficial((p) => ({ ...p, scorers: p.scorers.slice(0, -1) }))}
                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.3)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '2px', padding: '3px 8px', cursor: 'pointer' }}>
                        - DEL
                      </button>
                    </div>
                  </div>
                  {resultOfficial.scorers.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                      <input style={{ ...inputStyle, width: '52px', flexShrink: 0 }} placeholder="분'" value={s.minute}
                        onChange={(e) => setResultOfficial((p) => { const sc = [...p.scorers]; sc[i] = { ...sc[i], minute: e.target.value }; return { ...p, scorers: sc }; })} />
                      <input style={{ ...inputStyle, flex: 1 }} placeholder="득점자" value={s.name}
                        onChange={(e) => setResultOfficial((p) => { const sc = [...p.scorers]; sc[i] = { ...sc[i], name: e.target.value }; return { ...p, scorers: sc }; })} />
                      <input style={{ ...inputStyle, flex: 1 }} placeholder="도움 (선택)" value={s.assist ?? ''}
                        onChange={(e) => setResultOfficial((p) => { const sc = [...p.scorers]; sc[i] = { ...sc[i], assist: e.target.value }; return { ...p, scorers: sc }; })} />
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '8px' }}>POM</span>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>이름</label>
                      <input style={inputStyle} value={resultOfficial.pomName}
                        onChange={(e) => setResultOfficial((p) => ({ ...p, pomName: e.target.value }))} />
                    </div>
                    <div style={{ width: '60px', flexShrink: 0 }}>
                      <label style={labelStyle}>등번호</label>
                      <input style={inputStyle} value={resultOfficial.pomNumber}
                        onChange={(e) => setResultOfficial((p) => ({ ...p, pomNumber: e.target.value }))} />
                    </div>
                    <div style={{ width: '70px', flexShrink: 0 }}>
                      <label style={labelStyle}>포지션</label>
                      <input style={inputStyle} value={resultOfficial.pomPosition}
                        onChange={(e) => setResultOfficial((p) => ({ ...p, pomPosition: e.target.value }))} />
                    </div>
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>POM 사진</label>
                    <input type="file" accept="image/*"
                      style={{ ...inputStyle, padding: '6px 12px', cursor: 'pointer' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => setResultOfficial((p) => ({ ...p, pomPhoto: ev.target?.result as string }));
                        reader.readAsDataURL(file);
                      }} />
                  </div>
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>팀 단체사진</label>
                  <input type="file" accept="image/*"
                    style={{ ...inputStyle, padding: '6px 12px', cursor: 'pointer' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => setResultOfficial((p) => ({ ...p, teamPhoto: ev.target?.result as string }));
                      reader.readAsDataURL(file);
                    }} />
                </div>
              </>
            )}

            {/* ── Player Of Match Form ── */}
            {tab === 'pom' && (
              <>
                {/* 버전 스위처 */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {([1, 2] as const).map((v) => (
                    <button key={v} onClick={() => setPomVersion(v)} style={{
                      flex: 1,
                      padding: '10px',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '15px',
                      letterSpacing: '3px',
                      background: pomVersion === v ? 'rgba(204,0,0,0.18)' : 'rgba(255,255,255,0.04)',
                      color: pomVersion === v ? '#FF3333' : 'rgba(255,255,255,0.35)',
                      border: pomVersion === v ? '1px solid rgba(204,0,0,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'all 0.15s',
                    }}>
                      VER. {v}
                    </button>
                  ))}
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>선수 사진</label>
                  <input type="file" accept="image/*"
                    style={{ ...inputStyle, padding: '6px 12px', cursor: 'pointer' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => setPom((p) => ({ ...p, pomPhoto: ev.target?.result as string }));
                      reader.readAsDataURL(file);
                    }} />
                  {pom.pomPhoto && (
                    <button
                      style={{ marginTop: '6px', background: 'transparent', border: '1px solid rgba(204,0,0,0.4)', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', padding: '4px 10px', cursor: 'pointer' }}
                      onClick={() => setPom((p) => ({ ...p, pomPhoto: undefined }))}
                    >REMOVE IMAGE</button>
                  )}
                </div>
                {pom.pomPhoto && (
                  <div style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <label style={{ ...labelStyle, marginBottom: '6px' }}>
                        사진 위치 X — {pom.pomPhotoX ?? 50}%
                      </label>
                      <input type="range" min={0} max={100} value={pom.pomPhotoX ?? 50}
                        style={{ width: '100%', accentColor: '#CC0000' }}
                        onChange={(e) => setPom((p) => ({ ...p, pomPhotoX: Number(e.target.value) }))} />
                    </div>
                    <div>
                      <label style={{ ...labelStyle, marginBottom: '6px' }}>
                        사진 위치 Y — {pom.pomPhotoY ?? 0}%
                      </label>
                      <input type="range" min={0} max={100} value={pom.pomPhotoY ?? 0}
                        style={{ width: '100%', accentColor: '#CC0000' }}
                        onChange={(e) => setPom((p) => ({ ...p, pomPhotoY: Number(e.target.value) }))} />
                    </div>
                  </div>
                )}
                {/* 포맷 선택 */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {(['square', 'story'] as const).map((f) => (
                    <button key={f} onClick={() => setPom((p) => ({ ...p, format: f }))} style={{
                      flex: 1,
                      padding: '10px',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '15px',
                      letterSpacing: '3px',
                      background: pomFormat === f ? 'rgba(204,0,0,0.18)' : 'rgba(255,255,255,0.04)',
                      color: pomFormat === f ? '#FF3333' : 'rgba(255,255,255,0.35)',
                      border: pomFormat === f ? '1px solid rgba(204,0,0,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'all 0.15s',
                    }}>
                      {f === 'square' ? 'SQUARE 1:1' : 'STORY 9:16'}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>이름</label>
                    <input style={inputStyle} value={pom.pomName}
                      onChange={(e) => setPom((p) => ({ ...p, pomName: e.target.value }))} />
                  </div>
                  <div style={{ width: '60px', flexShrink: 0 }}>
                    <label style={labelStyle}>등번호</label>
                    <input style={inputStyle} value={pom.pomNumber}
                      onChange={(e) => setPom((p) => ({ ...p, pomNumber: e.target.value }))} />
                  </div>
                  <div style={{ width: '70px', flexShrink: 0 }}>
                    <label style={labelStyle}>포지션</label>
                    <input style={inputStyle} value={pom.pomPosition}
                      onChange={(e) => setPom((p) => ({ ...p, pomPosition: e.target.value }))} />
                  </div>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>경기 라벨 (선택)</label>
                  <input style={inputStyle} value={pom.matchLabel ?? ''}
                    placeholder="e.g. 토토배 · 2026"
                    onChange={(e) => setPom((p) => ({ ...p, matchLabel: e.target.value }))} />
                </div>
              </>
            )}

          {/* ── Match Result Friendly Form ── */}
            {tab === 'result-friendly' && (
              <>
                <div style={fieldStyle}>
                  <label style={labelStyle}>BADGE (경기 종류)</label>
                  <input style={inputStyle} value={resultFriendly.badge}
                    onChange={(e) => setResultFriendly((p) => ({ ...p, badge: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>INFO DATE</label>
                  <DatePicker value={resultFriendly.infoDate}
                    onChange={(v) => setResultFriendly((p) => ({ ...p, infoDate: v }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>INFO VENUE</label>
                  <input style={inputStyle} value={resultFriendly.infoVenue}
                    onChange={(e) => setResultFriendly((p) => ({ ...p, infoVenue: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>AWAY TEAM</label>
                  <input style={inputStyle} value={resultFriendly.awayTeam}
                    onChange={(e) => setResultFriendly((p) => ({ ...p, awayTeam: e.target.value }))} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>OPPONENT EMBLEM</label>
                  <input type="file" accept="image/*"
                    style={{ ...inputStyle, padding: '6px 12px', cursor: 'pointer' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => setResultFriendly((p) => ({ ...p, opponentImage: ev.target?.result as string }));
                      reader.readAsDataURL(file);
                    }} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>팀 단체사진</label>
                  <input type="file" accept="image/*"
                    style={{ ...inputStyle, padding: '6px 12px', cursor: 'pointer' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => setResultFriendly((p) => ({ ...p, teamPhoto: ev.target?.result as string }));
                      reader.readAsDataURL(file);
                    }} />
                </div>
              </>
            )}

          </div>

          {/* Download button */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <DownloadButton targetId="card-preview" filename={downloadFilename} />
          </div>
        </div>

        {/* Preview panel */}
        <div className="preview-panel">
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '13px',
            letterSpacing: '4px',
            color: 'rgba(255,255,255,0.25)',
            marginBottom: '20px',
          }}>
            PREVIEW — {PREVIEW_SIZE}px (실제 출력 {CARD_SIZE}px)
          </div>

          {/* 스케일 래퍼 */}
          <div style={{
            width: `${previewW}px`,
            height: `${previewH}px`,
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(204,0,0,0.2), 0 0 120px rgba(0,0,0,0.8)',
          }}>
            <div style={{ transformOrigin: 'top left', transform: `scale(${previewScale})`, width: `${CARD_SIZE}px`, height: `${previewCardH}px` }}>

              {/* 미리보기용 (스케일 적용) */}
              {tab === 'announcement'      && <MatchAnnouncementTemplate data={announcement} />}
              {tab === 'xi-real'           && <StartingXiATemplate data={xiReal} />}
              {tab === 'xi-template1'      && <StartingXiBTemplate data={xiT1} />}
              {tab === 'result-official'   && <MatchResultOfficialTemplate data={resultOfficial} />}
              {tab === 'result-friendly'   && <MatchResultFriendlyTemplate data={resultFriendly} />}
              {tab === 'pom' && pomVersion === 1 && <PlayerOfMatchTemplate data={pom} />}
              {tab === 'pom' && pomVersion === 2 && <PlayerOfMatchV2Template data={pom} />}
            </div>
          </div>

          <div style={{
            marginTop: '16px',
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.2)',
          }}>
            {isMobile ? '하단 DOWNLOAD 버튼으로 1080×1080 PNG 저장' : '왼쪽 DOWNLOAD 버튼으로 1080×1080 PNG 저장'}
          </div>
        </div>
      </div>
    </div>
  );
}
