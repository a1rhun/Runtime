'use client';

import { useState } from 'react';
import MatchAnnouncementTemplate from '@/components/templates/MatchAnnouncementTemplate';
import StartingXiRealTemplate from '@/components/templates/StartingXiRealTemplate';
import StartingXiTemplate1 from '@/components/templates/StartingXiTemplate1';
import DownloadButton from '@/components/DownloadButton';
import { MatchAnnouncementData, StartingXiData, Player } from '@/types';

// ── 기본값 ──────────────────────────────────────────────
const DEFAULT_ANNOUNCEMENT: MatchAnnouncementData = {
  badge: 'MATCH PREVIEW',
  infoDate: '2026.03.27',
  infoVenue: '동국대학교 대운동장',
  awayTeam: '3AM',
  matchDate: '03 / 27',
  kickoffTime: '18 : 00',
  venueShort: '대운동장',
};

const DEFAULT_PLAYERS: Player[] = [
  { num: '21', name: '장한승', pos: 'GK' },
  { num: '3',  name: '이시우',  pos: 'LB' },
  { num: '5',  name: '손승현',  pos: 'CB' },
  { num: '4',  name: '정유현',  pos: 'CB' },
  { num: '2',  name: '이준후',  pos: 'RB' },
  { num: '6',  name: '정서현',  pos: 'DM' },
  { num: '8',  name: '김준승',  pos: 'DM' },
  { num: '10', name: '오현석',  pos: 'AM' },
  { num: '11', name: '박태준',  pos: 'LW' },
  { num: '9',  name: '성준서',  pos: 'ST' },
  { num: '7',  name: '김영민',  pos: 'RW' },
];

const DEFAULT_XI: StartingXiData = {
  matchLabel: '★ 토토배 · 2026',
  matchVs: '3AM',
  matchDate: '2026.03.27 · 18:00 · 동국대학교 대운동장',
  formation: '4 - 2 - 1 - 3',
  players: DEFAULT_PLAYERS,
  substitutes: '김민준  이도현  박지호  최우성\n강현우  윤서준  임태양',
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
const PREVIEW_SIZE = 480;
const scale = PREVIEW_SIZE / CARD_SIZE;

export default function Home() {
  const [tab, setTab] = useState<Tab>('announcement');
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

  const currentData = tab === 'announcement' ? announcement : tab === 'xi-real' ? xiReal : xiT1;
  const downloadFilename =
    tab === 'announcement'
      ? `runtime-match-announcement`
      : tab === 'xi-real'
      ? `runtime-starting-xi`
      : `runtime-starting-xi-alt`;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>

      {/* Header */}
      <header style={{
        borderBottom: '2px solid rgba(204,0,0,0.4)',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '32px',
          letterSpacing: '6px',
          color: '#fff',
          textShadow: '0 0 20px rgba(204,0,0,0.4)',
        }}>
          RUNTIME FC
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '14px',
          letterSpacing: '3px',
          color: '#CC0000',
        }}>
          CARD GENERATOR
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>

        {/* Left: Form panel */}
        <div style={{
          width: '380px',
          flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>

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
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

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
                  <div style={fieldStyle}>
                    <label style={labelStyle}>MATCH DATE / INFO</label>
                    <input style={inputStyle} value={data.matchDate}
                      onChange={(e) => setData((p) => ({ ...p, matchDate: e.target.value }))} />
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
                    PLAYERS (번호 · 이름 · 포지션)
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
                      <input
                        style={{ ...inputStyle, width: '56px', flexShrink: 0, textAlign: 'center' }}
                        value={player.pos}
                        placeholder="POS"
                        onChange={(e) => updatePlayer(setData, i, 'pos', e.target.value)}
                      />
                    </div>
                  ))}

                  <div style={{ ...fieldStyle, marginTop: '16px' }}>
                    <label style={labelStyle}>SUBSTITUTIONS</label>
                    <textarea
                      style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
                      value={data.substitutes}
                      onChange={(e) => setData((p) => ({ ...p, substitutes: e.target.value }))}
                      placeholder="교체 선수 이름 (줄바꿈 또는 쉼표로 구분)"
                    />
                  </div>
                </>
              );
            })()}

          </div>

          {/* Download button */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <DownloadButton targetId="card-preview" filename={downloadFilename} />
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          overflow: 'auto',
          background: 'rgba(0,0,0,0.3)',
        }}>
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
              {/* 실제 캡처 대상 (1080×1080, 숨겨진 위치에 실물 크기로 렌더) */}
              <div id="card-preview" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                {tab === 'announcement' && <MatchAnnouncementTemplate data={announcement} />}
                {tab === 'xi-real'      && <StartingXiRealTemplate data={xiReal} />}
                {tab === 'xi-template1' && <StartingXiTemplate1 data={xiT1} />}
              </div>
              {/* 미리보기용 복사본 (스케일) */}
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
            왼쪽 DOWNLOAD 버튼으로 1080×1080 PNG 저장
          </div>
        </div>
      </div>
    </div>
  );
}
