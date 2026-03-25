import { StartingXiData } from '@/types';
import RuntimeLogo from './RuntimeLogo';

interface Props {
  data: StartingXiData;
}

export default function StartingXiRealTemplate({ data }: Props) {
  const subsArray = data.substitutes
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div style={{
      width: '1080px',
      height: '1080px',
      background: '#080808',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>

      {/* SVG Background speed lines */}
      <svg style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100%', height: '100%' }} viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur1-xi-real"><feGaussianBlur stdDeviation="0.7" /></filter>
          <radialGradient id="vigGrad-xi-real" cx="30%" cy="50%" r="80%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.6" />
            <stop offset="50%"  stopColor="white" stopOpacity="0.45" />
            <stop offset="100%" stopColor="white" stopOpacity="0.75" />
          </radialGradient>
          <mask id="vigMask-xi-real">
            <rect width="1080" height="1080" fill="url(#vigGrad-xi-real)" />
          </mask>
        </defs>
        <g mask="url(#vigMask-xi-real)" filter="url(#blur1-xi-real)">
          <g opacity="0.9">
            <line x1="-30" y1="0"    x2="1110" y2="410"  stroke="#CC0000" strokeWidth="3.5" />
            <line x1="-30" y1="50"   x2="1110" y2="460"  stroke="#880000" strokeWidth="1.5" />
            <line x1="-30" y1="105"  x2="1110" y2="515"  stroke="#FF2222" strokeWidth="2.5" />
            <line x1="-30" y1="165"  x2="1110" y2="575"  stroke="#CC0000" strokeWidth="1" />
            <line x1="-30" y1="230"  x2="1110" y2="640"  stroke="#AA0000" strokeWidth="3" />
            <line x1="-30" y1="300"  x2="1110" y2="710"  stroke="#CC0000" strokeWidth="2" />
            <line x1="-30" y1="375"  x2="1110" y2="785"  stroke="#FF3333" strokeWidth="4" />
            <line x1="-30" y1="455"  x2="1110" y2="865"  stroke="#CC0000" strokeWidth="1.5" />
            <line x1="-30" y1="540"  x2="1110" y2="950"  stroke="#880000" strokeWidth="2.5" />
            <line x1="-30" y1="630"  x2="1110" y2="1040" stroke="#CC0000" strokeWidth="2" />
            <line x1="-30" y1="720"  x2="1000" y2="1110" stroke="#AA0000" strokeWidth="1.5" />
            <line x1="-30" y1="820"  x2="840"  y2="1110" stroke="#CC0000" strokeWidth="3" />
            <line x1="-30" y1="930"  x2="680"  y2="1110" stroke="#FF2222" strokeWidth="1.5" />
            <line x1="-30" y1="1020" x2="520"  y2="1110" stroke="#CC0000" strokeWidth="2" />
          </g>
          <g opacity="0.65">
            <line x1="80"  y1="-30"  x2="1110" y2="660"  stroke="#CC0000" strokeWidth="2" />
            <line x1="180" y1="-30"  x2="1110" y2="580"  stroke="#880000" strokeWidth="1.5" />
            <line x1="310" y1="-30"  x2="1110" y2="490"  stroke="#FF2222" strokeWidth="2.5" />
            <line x1="460" y1="-30"  x2="1110" y2="390"  stroke="#CC0000" strokeWidth="1" />
            <line x1="620" y1="-30"  x2="1110" y2="280"  stroke="#AA0000" strokeWidth="3" />
            <line x1="780" y1="-30"  x2="1110" y2="170"  stroke="#CC0000" strokeWidth="2" />
            <line x1="930" y1="-30"  x2="1110" y2="70"   stroke="#FF3333" strokeWidth="3.5" />
            <line x1="100" y1="200"  x2="1110" y2="820"  stroke="#CC0000" strokeWidth="1.5" />
            <line x1="100" y1="420"  x2="1110" y2="1040" stroke="#880000" strokeWidth="2" />
            <line x1="100" y1="640"  x2="920"  y2="1110" stroke="#CC0000" strokeWidth="1.5" />
            <line x1="100" y1="860"  x2="720"  y2="1110" stroke="#AA0000" strokeWidth="2.5" />
          </g>
          <g opacity="1">
            <line x1="-30" y1="30"   x2="1110" y2="440"  stroke="#FF2222" strokeWidth="4.5" />
            <line x1="-30" y1="280"  x2="1110" y2="690"  stroke="#FF2222" strokeWidth="3.5" />
            <line x1="-30" y1="580"  x2="1110" y2="990"  stroke="#FF3333" strokeWidth="4" />
            <line x1="250" y1="-30"  x2="1110" y2="530"  stroke="#FF2222" strokeWidth="3" />
            <line x1="680" y1="-30"  x2="1110" y2="310"  stroke="#FF2222" strokeWidth="3.5" />
          </g>
        </g>
        <line x1="0" y1="0" x2="1080" y2="1080" stroke="rgba(180,0,0,0.03)" strokeWidth="260" />
      </svg>

      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.65) 100%)',
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '110px',
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #CC0000 0%, rgba(204,0,0,0.3) 70%, transparent 100%)',
        zIndex: 3,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}>

        {/* Left: STARTING XI vertical label */}
        <div style={{
          width: '110px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          flexShrink: 0,
        }}>
          <div style={{
            content: '',
            position: 'absolute',
            right: 0,
            top: '80px',
            bottom: '80px',
            width: '2px',
            background: 'linear-gradient(180deg, transparent, rgba(204,0,0,0.5) 30%, rgba(204,0,0,0.5) 70%, transparent)',
          }} />
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '90px',
            color: '#CC0000',
            letterSpacing: '10px',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            lineHeight: 1,
            textShadow: '0 0 40px rgba(204,0,0,0.5), 0 0 80px rgba(204,0,0,0.2)',
          }}>
            STARTING XI
          </div>
        </div>

        {/* Main content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 0 48px 46px',
          overflow: 'hidden',
          minWidth: 0,
        }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
            <RuntimeLogo
              width={78}
              height={89}
              clipId="sc-xi-real"
              style={{ filter: 'drop-shadow(0 0 12px rgba(204,0,0,0.3)) drop-shadow(0 0 24px rgba(255,255,255,0.06))' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '52px',
                color: '#fff',
                letterSpacing: '6px',
                lineHeight: 1,
                textShadow: '0 0 20px rgba(255,255,255,0.1)',
              }}>
                RUNTIME FC
              </div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '18px',
                color: '#CC0000',
                letterSpacing: '5px',
              }}>
                {data.matchLabel}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            width: '100%',
            height: '1.5px',
            background: 'linear-gradient(90deg, rgba(204,0,0,0.8) 0%, rgba(204,0,0,0.3) 80%, transparent 100%)',
            marginBottom: '24px',
          }} />

          {/* Body row */}
          <div style={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 0, minHeight: 0 }}>

            {/* Left col: player list + subs */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '400px', flexShrink: 0 }}>

              {/* Player list */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {data.players.map((player, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '9px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    borderTop: i === 0 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                    position: 'relative',
                  }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '26px',
                      color: '#CC0000',
                      width: '50px',
                      textAlign: 'right',
                      lineHeight: 1,
                      flexShrink: 0,
                      opacity: 0.9,
                    }}>
                      {player.num}
                    </div>
                    <div style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: '#CC0000',
                      margin: '0 16px',
                      flexShrink: 0,
                      opacity: 0.5,
                    }} />
                    <div style={{
                      fontFamily: "'Noto Sans KR', sans-serif",
                      fontSize: '28px',
                      fontWeight: 900,
                      color: '#fff',
                      letterSpacing: '2px',
                      lineHeight: 1,
                    }}>
                      {player.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subs */}
              <div style={{
                marginTop: '16px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '14px',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '15px',
                  letterSpacing: '5px',
                  color: 'rgba(204,0,0,0.75)',
                  marginBottom: '8px',
                }}>
                  SUBSTITUTIONS
                </div>
                <div style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.55)',
                  letterSpacing: '2px',
                  lineHeight: 2,
                }}>
                  {subsArray.reduce<React.ReactNode[]>((acc, name, i) => {
                    if (i > 0 && i % 4 === 0) acc.push(<br key={`br-${i}`} />);
                    if (i % 4 !== 0) acc.push(<span key={`sp-${i}`}>&nbsp;&nbsp;</span>);
                    acc.push(<span key={name + i}>{name}</span>);
                    return acc;
                  }, [])}
                </div>
              </div>

            </div>

            {/* Right: RUNTIME vertical */}
            <div style={{
              width: '300px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              position: 'relative',
              marginLeft: '16px',
              overflow: 'visible',
            }}>
              <div style={{
                content: '',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '1.5px',
                background: 'linear-gradient(180deg, transparent, rgba(204,0,0,0.4) 15%, rgba(204,0,0,0.4) 85%, transparent)',
              }} />
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '300px',
                color: 'rgba(255,255,255,0.92)',
                letterSpacing: '18px',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                lineHeight: 1,
                marginTop: '-200px',
                textShadow: '0 0 50px rgba(204,0,0,0.55), 0 0 100px rgba(204,0,0,0.25), 0 0 3px rgba(255,255,255,0.15)',
              }}>
                RUNTIME
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '6px',
        background: 'linear-gradient(90deg, transparent 0%, #CC0000 30%, #FF2222 50%, #CC0000 70%, transparent 100%)',
        zIndex: 3,
      }} />
    </div>
  );
}
