import { MatchAnnouncementData } from '@/types';
import RuntimeLogo from './RuntimeLogo';
import { TemplateCanvas } from './shared/TemplateCanvas';
import { SpeedLinesBg } from './shared/SpeedLinesBg';
import { VignetteOverlay } from './shared/VignetteOverlay';
import { BottomBar } from './shared/BottomBar';

interface Props {
  data: MatchAnnouncementData;
}

const VIGNETTE_GRADIENT = 'radial-gradient(ellipse 70% 70% at 50% 55%, rgba(0,0,0,0.92) 30%, transparent 100%)';

const styles = {
  content: {
    position: 'relative' as const,
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '60px 80px 55px',
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    marginBottom: '32px',
  },
  logoAccentLine: {
    width: '90px',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #CC0000, transparent)',
    marginTop: '10px',
  },
  badge: {
    background: 'rgba(204, 0, 0, 0.15)',
    border: '1.5px solid #CC0000',
    color: '#FF3333',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '22px',
    letterSpacing: '4px',
    padding: '6px 24px',
    marginBottom: '18px',
    clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
  },
  infoLine: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: '22px',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: '1px',
    marginBottom: '44px',
  },
  infoDate: {
    color: '#fff',
    fontWeight: 700,
  },
  divider: {
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(204,0,0,0.6) 30%, rgba(204,0,0,0.6) 70%, transparent)',
    marginBottom: '44px',
  },
  sectionLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '26px',
    letterSpacing: '6px',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '32px',
  },
  matchupRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '50px',
    width: '100%',
    marginBottom: '50px',
  },
  teamCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '18px',
    flex: 1,
  },
  teamName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '26px',
    letterSpacing: '5px',
    color: 'rgba(255,255,255,0.85)',
  },
  vsCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0,
  },
  vsText: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '100px',
    color: '#CC0000',
    lineHeight: 1,
    letterSpacing: '-2px',
    textShadow: '0 0 40px rgba(204,0,0,0.6), 0 0 80px rgba(204,0,0,0.3)',
  },
  opponentEmblem: {
    width: '160px',
    height: '160px',
    border: '3px solid rgba(255,255,255,0.15)',
    background: 'rgba(10,10,10,0.8)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
  },
  timeBlock: {
    background: 'rgba(204, 0, 0, 0.08)',
    border: '1px solid rgba(204,0,0,0.4)',
    padding: '22px 80px',
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
    clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)',
  },
  timeBlockItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
  },
  timeBlockLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '18px',
    letterSpacing: '4px',
    color: '#CC0000',
  },
  timeBlockValue: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '40px',
    color: '#fff',
    letterSpacing: '3px',
    lineHeight: 1,
  },
  timeBlockVenueValue: {
    fontSize: '40px',
    fontFamily: "'Bebas Neue', sans-serif",
    fontWeight: 600,
    letterSpacing: '1px',
    color: '#fff',
    lineHeight: 1,
    whiteSpace: 'nowrap' as const,
  },
  timeBlockDivider: {
    width: '1px',
    height: '50px',
    background: 'rgba(204,0,0,0.3)',
  },
};

export default function MatchAnnouncementTemplate({ data }: Props) {
  return (
    <TemplateCanvas>
      <SpeedLinesBg filterId="blur-match-ann" />
      <VignetteOverlay gradient={VIGNETTE_GRADIENT} />

      {/* Content */}
      <div style={styles.content}>

        {/* Logo */}
        <div style={styles.logoSection}>
          <RuntimeLogo
            width={108}
            height={123}
            color="white"
            style={{ filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.15))' }}
          />
          <div style={styles.logoAccentLine} />
        </div>

        {/* Badge */}
        <div style={styles.badge}>{data.badge}</div>

        {/* Info line */}
        <div style={styles.infoLine}>
          <span style={styles.infoDate}>{data.infoDate}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          {data.infoVenue}
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Section label */}
        <div style={styles.sectionLabel}>[ MATCHUP ]</div>

        {/* Matchup */}
        <div style={styles.matchupRow}>

          {/* RUNTIME */}
          <div style={styles.teamCol}>
            <RuntimeLogo
              width={158}
              height={180}
              color="white"
              style={{ filter: 'drop-shadow(0 0 14px rgba(204,0,0,0.35)) drop-shadow(0 0 30px rgba(255,255,255,0.08))' }}
            />
            <div style={styles.teamName}>RUNTIME</div>
          </div>

          {/* VS */}
          <div style={styles.vsCol}>
            <div style={styles.vsText}>VS</div>
          </div>

          {/* Opponent */}
          <div style={styles.teamCol}>
            <div style={styles.opponentEmblem}>
              {data.opponentImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.opponentImage}
                  alt={data.awayTeam}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="90" height="90" style={{ opacity: 0.5 }}>
                  <path d="M50 8 L88 22 L88 52 C88 72 70 88 50 94 C30 88 12 72 12 52 L12 22 Z"
                    fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
                  <path d="M50 18 L80 29 L80 52 C80 67 66 80 50 85 C34 80 20 67 20 52 L20 29 Z"
                    fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                </svg>
              )}
            </div>
            <div style={styles.teamName}>{data.awayTeam}</div>
          </div>
        </div>

        {/* Time block */}
        <div style={styles.timeBlock}>
          <div style={styles.timeBlockItem}>
            <div style={styles.timeBlockLabel}>DATE</div>
            <div style={styles.timeBlockValue}>{data.matchDate}</div>
          </div>
          <div style={styles.timeBlockDivider} />
          <div style={styles.timeBlockItem}>
            <div style={styles.timeBlockLabel}>KICKOFF</div>
            <div style={styles.timeBlockValue}>{data.kickoffTime}</div>
          </div>
          <div style={styles.timeBlockDivider} />
          <div style={styles.timeBlockItem}>
            <div style={styles.timeBlockLabel}>VENUE</div>
            <div style={styles.timeBlockVenueValue}>{data.venueShort}</div>
          </div>
        </div>
      </div>

      <BottomBar />
    </TemplateCanvas>
  );
}
