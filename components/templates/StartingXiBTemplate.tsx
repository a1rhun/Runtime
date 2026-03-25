import { StartingXiData } from '@/types';
import RuntimeLogo from './RuntimeLogo';
import { TemplateCanvas } from './shared/TemplateCanvas';
import { SpeedLinesBg } from './shared/SpeedLinesBg';
import { VignetteOverlay } from './shared/VignetteOverlay';
import { BottomBar } from './shared/BottomBar';

interface Props {
  data: StartingXiData;
}

// CSS 변수(--s) 대신 고정 1080px 기준으로 계산
const S = 1080;
const s = (ratio: number) => `${S * ratio}px`;

const VIGNETTE_GRADIENT = 'radial-gradient(ellipse 75% 75% at 60% 50%, rgba(0,0,0,0.91) 25%, transparent 100%)';

const styles = {
  // --- Left sidebar ---
  sidebar: {
    width: s(0.13),
    flexShrink: 0,
    position: 'relative' as const,
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.55)',
    borderRight: '2px solid rgba(180,0,0,0.35)',
    overflow: 'hidden',
  },
  sidebarStripes: {
    position: 'absolute' as const,
    inset: 0,
    background: 'repeating-linear-gradient(-48deg, transparent, transparent 14px, rgba(150,0,0,0.07) 14px, rgba(150,0,0,0.07) 28px)',
    pointerEvents: 'none' as const,
  },
  sidebarLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: s(0.1),
    letterSpacing: '0.1em',
    color: '#AA0000',
    writingMode: 'vertical-rl' as const,
    textOrientation: 'mixed' as const,
    transform: 'rotate(180deg)',
    lineHeight: 1,
    whiteSpace: 'nowrap' as const,
    position: 'relative' as const,
    zIndex: 1,
    textShadow: '0 0 30px rgba(200,0,0,0.5), 0 0 60px rgba(200,0,0,0.2)',
  },

  // --- Right content area ---
  mainContent: {
    flex: 1,
    position: 'relative' as const,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: `${s(0.04)} ${s(0.05)} ${s(0.036)} ${s(0.044)}`,
  },

  // --- Header ---
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: s(0.02),
    flexShrink: 0,
  },
  headerMatchLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: s(0.014),
    letterSpacing: '0.35em',
    color: '#CC0000',
    marginBottom: s(0.005),
  },
  headerMatchup: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: s(0.05),
    letterSpacing: '0.05em',
    color: '#fff',
    lineHeight: 1,
  },
  headerMatchupVs: {
    color: '#CC0000',
  },
  headerMatchInfo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: s(0.013),
    color: 'rgba(255,255,255,0.38)',
    fontWeight: 400,
    marginTop: s(0.006),
  },
  headerDivider: {
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, #CC0000, rgba(204,0,0,0.2) 65%, transparent)',
    marginBottom: s(0.018),
    flexShrink: 0,
  },

  // --- Formation badge ---
  formationRow: {
    display: 'flex',
    alignItems: 'center',
    gap: s(0.012),
    marginBottom: s(0.016),
    flexShrink: 0,
  },
  formationBadge: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: s(0.02),
    letterSpacing: '0.18em',
    color: '#fff',
    background: 'rgba(204,0,0,0.12)',
    border: '1px solid rgba(204,0,0,0.5)',
    padding: `${s(0.004)} ${s(0.016)}`,
    clipPath: 'polygon(7px 0%, 100% 0%, calc(100% - 7px) 100%, 0% 100%)',
    whiteSpace: 'nowrap' as const,
  },
  formationLine: {
    flex: 1,
    height: '1px',
    background: 'linear-gradient(90deg, rgba(204,0,0,0.2), transparent)',
  },

  // --- Player list ---
  playerList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-evenly',
    marginBottom: s(0.014),
  },
  playerRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: s(0.012),
    padding: `${s(0.005)} 0`,
    borderBottom: '1px solid rgba(255,255,255,0.055)',
  },
  playerNumber: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: s(0.036),
    color: 'rgba(180,0,0,0.5)',
    lineHeight: 1,
    width: s(0.055),
    flexShrink: 0,
    letterSpacing: '-0.01em',
  },
  playerName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: s(0.030),
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '0.28em',
    lineHeight: 1,
    flex: 1,
  },

  // --- Substitutions ---
  subsSection: {
    flexShrink: 0,
    borderTop: '1px solid rgba(180,0,0,0.3)',
    paddingTop: s(0.013),
    marginBottom: s(0.01),
  },
  subsTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: s(0.016),
    letterSpacing: '0.3em',
    color: '#CC0000',
    marginBottom: s(0.007),
  },
  subsGrid: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: s(0.015),
    fontWeight: 700,
    color: 'rgba(255,255,255,0.42)',
    letterSpacing: '0.04em',
    lineHeight: 1.7,
  },
  subsRow: {
    display: 'flex',
    gap: s(0.02),
  },
  subNumber: {
    fontFamily: "'Bebas Neue', sans-serif",
    color: '#CC0000',
    marginRight: s(0.004),
  },

  // --- Footer ---
  footer: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: s(0.011),
    letterSpacing: '0.22em',
    color: 'rgba(255,255,255,0.13)',
    flexShrink: 0,
  },
};

export default function StartingXiBTemplate({ data }: Props) {
  const matchDateStr = `${data.matchInfoDate} · ${data.matchInfoTime} · ${data.matchInfoVenue}`;
  const subRows = [];
  for (let i = 0; i < data.substitutes.length; i += 4) {
    subRows.push(data.substitutes.slice(i, i + 4));
  }

  return (
    <TemplateCanvas flexDirection="row">
      <SpeedLinesBg filterId="blur-xi-t1" variant="white" />
      <VignetteOverlay gradient={VIGNETTE_GRADIENT} />

      {/* Left sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarStripes} />
        <div style={styles.sidebarLabel}>STARTING XI</div>
      </div>

      {/* Right content */}
      <div style={styles.mainContent}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.headerMatchLabel}>{data.matchLabel}</div>
            <div style={styles.headerMatchup}>
              RUNTIME <span style={styles.headerMatchupVs}>VS</span> {data.matchVs}
            </div>
            <div style={styles.headerMatchInfo}>{matchDateStr}</div>
          </div>
          <RuntimeLogo
            width={S * 0.09}
            height={S * 0.09 * (228 / 200)}
            color="white"
            style={{ filter: 'drop-shadow(0 0 14px rgba(204,0,0,0.35))' }}
          />
        </div>

        {/* Divider */}
        <div style={styles.headerDivider} />

        {/* Formation badge */}
        <div style={styles.formationRow}>
          <div style={styles.formationBadge}>{data.formation}</div>
          <div style={styles.formationLine} />
        </div>

        {/* Player list */}
        <div style={styles.playerList}>
          {data.players.map((player, i) => (
            <div key={i} style={styles.playerRow}>
              <div style={styles.playerNumber}>{player.num}</div>
              <div style={styles.playerName}>{player.name}</div>
            </div>
          ))}
        </div>

        {/* Substitutions */}
        <div style={styles.subsSection}>
          <div style={styles.subsTitle}>▸ SUBSTITUTIONS</div>
          <div style={styles.subsGrid}>
            {subRows.map((row, ri) => (
              <div key={ri} style={styles.subsRow}>
                {row.map((sub, si) => (
                  <span key={si}>
                    <span style={styles.subNumber}>{sub.num}</span>
                    {sub.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          RUNTIME &nbsp;·&nbsp; 동국대학교 컴퓨터공학과 축구 동아리
        </div>
      </div>

      <BottomBar />
    </TemplateCanvas>
  );
}
