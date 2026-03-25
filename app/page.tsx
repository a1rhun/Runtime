'use client';

import { useState, useEffect } from 'react';
import MatchAnnouncementTemplate from '@/components/templates/MatchAnnouncementTemplate';
import StartingXiRealTemplate from '@/components/templates/StartingXiRealTemplate';
import StartingXiTemplate1 from '@/components/templates/StartingXiTemplate1';
import DownloadButton from '@/components/DownloadButton';
import { MatchAnnouncementData, StartingXiData, Player, SubPlayer } from '@/types';

// ── 오늘 날짜 helper ─────────────────────────────────────
function todayStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

// ── 기본값 ──────────────────────────────────────────────
const DEFAULT_ANNOUNCEMENT: MatchAnnouncementData = {
  badge: 'MATCH PREVIEW',
  infoDate: todayStr(),
  infoVenue: '동국대학교 대운동장',
  awayTeam: '3AM',
  matchDate: '03 / 27',
  kickoffTime: '18 : 00',
  venueShort: '대운동장',
};

const DEFAULT_PLAYERS: Player[] = [
  { num: '21', name: '장한승' },
  { num: '3',  name: '이시우'  },
  { num: '5',  name: '손승현'  },
  { num: '4',  name: '정유현'  },
  { num: '2',  name: '이준후'  },
  { num: '6',  name: '정서현'  },
  { num: '8',  name: '김준승'  },
  { num: '10', name: '오현석'  },
  { num: '11', name: '박태준'  },
  { num: '9',  name: '성준서'  },
  { num: '7',  name: '김영민'  },
];

const DEFAULT_SUBS: SubPlayer[] = [
  { num: '12', name: '김민준' },
  { num: '13', name: '이도현' },
  { num: '14', name: '박지호' },
  { num: '15', name: '최우성' },
  { num: '16', name: '강현우' },
  { num: '17', name: '윤서준' },
  { num: '18', name: '임태양' },
];

const DEFAULT_XI: StartingXiData = {
  matchLabel: '★ 토토배 · 2026',
  matchVs: '3AM',
  matchInfoDate: todayStr(),
  matchInfoTime: '18:00',
  matchInfoVenue: '동국대학교 대운동장',
  formation: '4 - 2 - 1 - 3',
  players: DEFAULT_PLAYERS,
  substitutes: DEFAULT_SUBS,
};

type Tab = 'announcement' | 'xi-real' | 'xi-template1';

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
  const [announcement, setAnnouncement] = useState<MatchAnnouncementData>(DEFAULT_ANNOUNCEMENT);
  const [xiReal, setXiReal] = useState<StartingXiData>(DEFAULT_XI);
  const [xiT1, setXiT1] = useState<StartingXiData>(DEFAULT_XI);

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
    tab === 'announcement'
      ? `runtime-match-announcement`
      : tab === 'xi-real'
      ? `runtime-starting-xi`
      : `runtime-starting-xi-alt`;

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
          height: '1080px',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {tab === 'announcement' && <MatchAnnouncementTemplate data={announcement} />}
        {tab === 'xi-real'      && <StartingXiRealTemplate data={xiReal} />}
        {tab === 'xi-template1' && <StartingXiTemplate1 data={xiT1} />}
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
              { key: 'announcement', label: 'MATCH' },
              { key: 'xi-real',      label: 'XI-A' },
              { key: 'xi-template1', label: 'XI-B' },
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
                  <input style={inputStyle} value={announcement.infoDate}
                    onChange={(e) => setAnnouncement((p) => ({ ...p, infoDate: e.target.value }))} />
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
                      <input style={inputStyle} value={data.matchInfoDate}
                        onChange={(e) => setData((p) => ({ ...p, matchInfoDate: e.target.value }))} />
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
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '14px',
                    letterSpacing: '3px',
                    color: 'rgba(255,255,255,0.5)',
                    margin: '16px 0 8px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '12px',
                  }}>
                    PLAYERS (번호 · 이름)
                  </div>

                  {data.players.map((player, i) => (
                    <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                      <input
                        style={{ ...inputStyle, width: '52px', flexShrink: 0, textAlign: 'center' }}
                        value={player.num}
                        placeholder="#"
                        onChange={(e) => updatePlayer(setData, i, 'num', e.target.value)}
                      />
                      <input
                        style={{ ...inputStyle, flex: 1 }}
                        value={player.name}
                        placeholder="이름"
                        onChange={(e) => updatePlayer(setData, i, 'name', e.target.value)}
                      />
                    </div>
                  ))}

                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '14px',
                    letterSpacing: '3px',
                    color: 'rgba(255,255,255,0.5)',
                    margin: '16px 0 8px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '12px',
                  }}>
                    SUBSTITUTIONS (번호 · 이름)
                  </div>

                  {data.substitutes.map((sub, i) => (
                    <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                      <input
                        style={{ ...inputStyle, width: '52px', flexShrink: 0, textAlign: 'center' }}
                        value={sub.num}
                        placeholder="#"
                        onChange={(e) => updateSub(setData, i, 'num', e.target.value)}
                      />
                      <input
                        style={{ ...inputStyle, flex: 1 }}
                        value={sub.name}
                        placeholder="이름"
                        onChange={(e) => updateSub(setData, i, 'name', e.target.value)}
                      />
                    </div>
                  ))}
                </>
              );
            })()}

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
            width: `${PREVIEW_SIZE}px`,
            height: `${PREVIEW_SIZE}px`,
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(204,0,0,0.2), 0 0 120px rgba(0,0,0,0.8)',
          }}>
            <div
              style={{
                transformOrigin: 'top left',
                transform: `scale(${scale})`,
                width: `${CARD_SIZE}px`,
                height: `${CARD_SIZE}px`,
              }}
            >
              {/* 미리보기용 (스케일 적용) */}
              {tab === 'announcement' && <MatchAnnouncementTemplate data={announcement} />}
              {tab === 'xi-real'      && <StartingXiRealTemplate data={xiReal} />}
              {tab === 'xi-template1' && <StartingXiTemplate1 data={xiT1} />}
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
