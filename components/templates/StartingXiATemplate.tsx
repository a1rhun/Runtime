import { StartingXiData, SubPlayer } from '@/types';
import RuntimeLogo from './RuntimeLogo';
import { TemplateCanvas } from './shared/TemplateCanvas';
import { SpeedLinesDiagonalBg } from './shared/SpeedLinesDiagonalBg';
import { VignetteOverlay } from './shared/VignetteOverlay';
import { BottomBar } from './shared/BottomBar';

interface Props {
  data: StartingXiData;
}

const VIGNETTE_GRADIENT = 'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.65) 100%)';

const styles = {
  topAccentLine: {
    position: 'absolute' as const,
    top: 0,
    left: '60px',
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #CC0000 0%, rgba(204,0,0,0.3) 70%, transparent 100%)',
    zIndex: 3,
  },
  contentRow: {
    position: 'relative' as const,
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row' as const,
  },

  // --- Left sidebar: logo + "STARTING XI" vertical label ---
  sidebarPanel: {
    width: '180px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    flexShrink: 0,
  },
  sidebarDividerLine: {
    position: 'absolute' as const,
    right: 0,
    top: '80px',
    bottom: '80px',
    width: '2px',
    background: 'linear-gradient(180deg, transparent, rgba(204,0,0,0.5) 30%, rgba(204,0,0,0.5) 70%, transparent)',
  },
  sidebarLogo: {
    position: 'absolute' as const,
    top: '48px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  sidebarLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '120px',
    color: '#CC0000',
    letterSpacing: '6px',
    writingMode: 'vertical-rl' as const,
    textOrientation: 'mixed' as const,
    transform: 'rotate(180deg)',
    lineHeight: 1,
    textShadow: '0 0 40px rgba(204,0,0,0.5), 0 0 80px rgba(204,0,0,0.2)',
  },

  // --- Main content area ---
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '48px 0 48px 46px',
    overflow: 'hidden',
    minWidth: 0,
  },
  header: {
    marginBottom: '32px',
    flexShrink: 0,
  },
  headerMatchLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '18px',
    letterSpacing: '5px',
    color: '#CC0000',
    marginBottom: '4px',
  },
  headerMatchup: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '54px',
    letterSpacing: '0.05em',
    color: '#fff',
    lineHeight: 1,
  },
  headerMatchupVs: {
    color: '#CC0000',
  },
  headerMatchInfo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '16px',
    color: 'rgba(255,255,255,0.38)',
    fontWeight: 400,
    marginTop: '6px',
    letterSpacing: '2px',
  },
  headerDivider: {
    width: '100%',
    height: '1.5px',
    background: 'linear-gradient(90deg, rgba(204,0,0,0.8) 0%, rgba(204,0,0,0.3) 80%, transparent 100%)',
    marginBottom: '24px',
  },

  // --- Body: player list + subs (left) + RUNTIME watermark (right) ---
  bodyRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    flex: 1,
    gap: 0,
    minHeight: 0,
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '400px',
    flexShrink: 0,
  },
  playerList: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    justifyContent: 'center' as const,
    gap: '16px',
  },
  playerRow: {
    display: 'flex',
    alignItems: 'baseline' as const,
    gap: '13px',
    borderBottom: '1px solid rgba(255,255,255,0.055)',
  },
  playerNumber: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '39px',
    color: 'rgba(180,0,0,0.9)',
    lineHeight: 1,
    width: '59px',
    flexShrink: 0,
    letterSpacing: '-0.01em',
  },
  playerName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '36px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '0.42em',
    lineHeight: 1,
    flex: 1,  
  },

  // --- Substitutions ---
  subsSection: {
    marginTop: '16px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '14px',
  },
  subsTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '15px',
    letterSpacing: '5px',
    color: 'rgba(204,0,0,0.75)',
    marginBottom: '8px',
  },
  subsGrid: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: '2px',
    lineHeight: 2,
  },
  subsRow: {
    display: 'flex',
    gap: '24px',
  },
  subNumber: {
    fontFamily: "'Bebas Neue', sans-serif",
    color: '#CC0000',
    marginRight: '6px',
  },

  // --- Right: RUNTIME watermark ---
  watermarkCol: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    position: 'relative' as const,
    marginLeft: '16px',
    overflow: 'visible',
  },
  watermarkDividerLine: {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    bottom: 0,
    width: '1.5px',
    background: 'linear-gradient(180deg, transparent, rgba(204,0,0,0.4) 15%, rgba(204,0,0,0.4) 85%, transparent)',
  },
  watermarkText: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '300px',
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: '18px',
    writingMode: 'vertical-rl' as const,
    textOrientation: 'mixed' as const,
    transform: 'rotate(180deg)',
    lineHeight: 1,
    marginTop: '-200px',
    textShadow: '0 0 50px rgba(204,0,0,0.55), 0 0 100px rgba(204,0,0,0.25), 0 0 3px rgba(255,255,255,0.15)',
  },
};

export default function StartingXiATemplate({ data }: Props) {
  const matchDateStr = `${data.matchInfoDate} · ${data.matchInfoTime} · ${data.matchInfoVenue}`;
  const subRows: SubPlayer[][] = [];
  for (let i = 0; i < data.substitutes.length; i += 4) {
    subRows.push(data.substitutes.slice(i, i + 4));
  }

  return (
    <TemplateCanvas flexDirection="column">
      <SpeedLinesDiagonalBg
        filterId="blur-xi-real"
        gradientId="vigGrad-xi-real"
        maskId="vigMask-xi-real"
      />
      <VignetteOverlay gradient={VIGNETTE_GRADIENT} />

      {/* Top accent line */}
      <div style={styles.topAccentLine} />

      {/* Content */}
      <div style={styles.contentRow}>

        {/* Left sidebar: logo + STARTING XI vertical label */}
        <div style={styles.sidebarPanel}>
          <div style={styles.sidebarDividerLine} />
          <div style={styles.sidebarLogo}>
            <RuntimeLogo
              width={90}
              height={90}
              color="white"
              style={{ width: '90px', height: '90px', filter: 'drop-shadow(0 0 12px rgba(204,0,0,0.3)) drop-shadow(0 0 24px rgba(255,255,255,0.06))' }}
            />
          </div>
          <div style={styles.sidebarLabel}>STARTING XI</div>
        </div>

        {/* Main content */}
        <div style={styles.mainContent}>

          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerMatchLabel}>{data.matchLabel}</div>
            <div style={styles.headerMatchup}>
              RUNTIME <span style={styles.headerMatchupVs}>VS</span> {data.matchVs}
            </div>
            <div style={styles.headerMatchInfo}>{matchDateStr}</div>
          </div>

          {/* Divider */}
          <div style={styles.headerDivider} />

          {/* Body row */}
          <div style={styles.bodyRow}>

            {/* Left col: player list + subs */}
            <div style={styles.leftCol}>

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
                <div style={styles.subsTitle}>SUBSTITUTIONS</div>
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
            </div>

            {/* Right: RUNTIME watermark */}
            <div style={styles.watermarkCol}>
              <div style={styles.watermarkDividerLine} />
              <div style={styles.watermarkText}>RUNTIME</div>
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </TemplateCanvas>
  );
}
