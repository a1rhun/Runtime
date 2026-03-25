import { MatchResultFriendlyData } from '@/types';
import RuntimeLogo from './RuntimeLogo';
import { TemplateCanvas } from './shared/TemplateCanvas';
import { SpeedLinesBg } from './shared/SpeedLinesBg';
import { VignetteOverlay } from './shared/VignetteOverlay';
import { BottomBar } from './shared/BottomBar';

interface Props {
  data: MatchResultFriendlyData;
}

const VIGNETTE = 'radial-gradient(ellipse 75% 75% at 50% 40%, rgba(0,0,0,0.93) 25%, transparent 100%)';

const OpponentShield = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="90" height="90" style={{ opacity: 0.45 }}>
    <path d="M50 8 L88 22 L88 52 C88 72 70 88 50 94 C30 88 12 72 12 52 L12 22 Z"
      fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
    <path d="M50 18 L80 29 L80 52 C80 67 66 80 50 85 C34 80 20 67 20 52 L20 29 Z"
      fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
  </svg>
);

export default function MatchResultFriendlyTemplate({ data }: Props) {
  return (
    <TemplateCanvas>
      <SpeedLinesBg filterId="blur-result-friendly" />
      <VignetteOverlay gradient={VIGNETTE} />

      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '52px 80px 50px',
        boxSizing: 'border-box',
      }}>

        {/* Logo */}
        <RuntimeLogo width={82} height={93} color="white"
          style={{ filter: 'drop-shadow(0 0 14px rgba(255,255,255,0.12))', flexShrink: 0 }} />
        <div style={{
          width: '70px', height: '2px',
          background: 'linear-gradient(90deg, transparent, #CC0000, transparent)',
          margin: '8px 0 18px',
          flexShrink: 0,
        }} />

        {/* Info line */}
        <div style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: '19px', color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.5px', marginBottom: '26px', flexShrink: 0,
        }}>
          <span style={{ color: '#FF4444', fontWeight: 700 }}>[{data.badge}]</span>
          {' '}{data.infoDate}/{data.infoVenue}
        </div>

        {/* Section label */}
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '20px', letterSpacing: '6px',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '28px', flexShrink: 0,
        }}>
          Matchup
        </div>

        {/* Matchup row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '60px', width: '100%', marginBottom: '22px', flexShrink: 0,
        }}>
          {/* RUNTIME */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <RuntimeLogo width={148} height={168} color="white"
              style={{ filter: 'drop-shadow(0 0 16px rgba(204,0,0,0.4))' }} />
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '24px', letterSpacing: '5px', color: 'rgba(255,255,255,0.85)',
            }}>RUNTIME</div>
          </div>

          {/* Opponent */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '160px', height: '160px',
              border: '2px solid rgba(255,255,255,0.12)',
              background: 'rgba(10,10,10,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
            }}>
              {data.opponentImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.opponentImage} alt={data.awayTeam}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : <OpponentShield />}
            </div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '24px', letterSpacing: '5px', color: 'rgba(255,255,255,0.85)',
            }}>{data.awayTeam}</div>
          </div>
        </div>

        {/* Dot separator */}
        <div style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'rgba(204,0,0,0.6)',
          marginBottom: '22px', flexShrink: 0,
        }} />

        {/* Team photo */}
        {data.teamPhoto && (
          <div style={{ flex: 1, width: '100%', overflow: 'hidden', minHeight: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.teamPhoto} alt="team"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        )}
      </div>

      <BottomBar />
    </TemplateCanvas>
  );
}
