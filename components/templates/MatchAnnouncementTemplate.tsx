import { MatchAnnouncementData } from '@/types';
import RuntimeLogo from './RuntimeLogo';

interface Props {
  data: MatchAnnouncementData;
}

export default function MatchAnnouncementTemplate({ data }: Props) {
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
      <svg style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur1-ann">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
        <g opacity="0.9" filter="url(#blur1-ann)">
          <line x1="40" y1="30" x2="280" y2="120" stroke="#CC0000" strokeWidth="3" />
          <line x1="10" y1="50" x2="220" y2="130" stroke="#CC0000" strokeWidth="1.5" />
          <line x1="60" y1="15" x2="340" y2="95" stroke="#CC0000" strokeWidth="2.5" />
          <line x1="0"  y1="70" x2="190" y2="145" stroke="#880000" strokeWidth="1" />
          <line x1="80" y1="5"  x2="360" y2="75"  stroke="#CC0000" strokeWidth="2" />
          <line x1="100" y1="20" x2="420" y2="90" stroke="#FF2222" strokeWidth="3.5" />
          <line x1="20"  y1="85" x2="260" y2="155" stroke="#CC0000" strokeWidth="1" />
          <line x1="130" y1="0"  x2="500" y2="110" stroke="#AA0000" strokeWidth="2" />
          <line x1="150" y1="15" x2="450" y2="105" stroke="#CC0000" strokeWidth="1.5" />
          <line x1="170" y1="30" x2="480" y2="118" stroke="#880000" strokeWidth="1" />
          <line x1="50"  y1="95" x2="300" y2="170" stroke="#CC0000" strokeWidth="2.5" />
          <line x1="200" y1="10" x2="520" y2="100" stroke="#FF3333" strokeWidth="2" />
        </g>
        <g opacity="0.85" filter="url(#blur1-ann)">
          <line x1="700" y1="0"  x2="1000" y2="100" stroke="#CC0000" strokeWidth="2.5" />
          <line x1="730" y1="10" x2="1020" y2="105" stroke="#880000" strokeWidth="1.5" />
          <line x1="760" y1="0"  x2="1080" y2="110" stroke="#FF2222" strokeWidth="3" />
          <line x1="780" y1="15" x2="1080" y2="90"  stroke="#CC0000" strokeWidth="1" />
          <line x1="820" y1="5"  x2="1080" y2="70"  stroke="#AA0000" strokeWidth="2" />
        </g>
        <g opacity="0.8">
          <line x1="0"  y1="200" x2="120" y2="290" stroke="#CC0000" strokeWidth="2" />
          <line x1="0"  y1="230" x2="100" y2="310" stroke="#880000" strokeWidth="1" />
          <line x1="0"  y1="310" x2="130" y2="400" stroke="#CC0000" strokeWidth="2.5" />
          <line x1="0"  y1="340" x2="110" y2="420" stroke="#FF2222" strokeWidth="1.5" />
          <line x1="0"  y1="420" x2="140" y2="510" stroke="#CC0000" strokeWidth="2" />
          <line x1="0"  y1="500" x2="120" y2="580" stroke="#880000" strokeWidth="1.5" />
          <line x1="0"  y1="580" x2="150" y2="660" stroke="#CC0000" strokeWidth="3" />
          <line x1="0"  y1="660" x2="130" y2="730" stroke="#AA0000" strokeWidth="1" />
        </g>
        <g opacity="0.85">
          <line x1="960" y1="200" x2="1080" y2="290" stroke="#CC0000" strokeWidth="2.5" />
          <line x1="950" y1="230" x2="1080" y2="320" stroke="#880000" strokeWidth="1.5" />
          <line x1="940" y1="310" x2="1080" y2="400" stroke="#FF2222" strokeWidth="3" />
          <line x1="955" y1="380" x2="1080" y2="450" stroke="#CC0000" strokeWidth="2" />
          <line x1="945" y1="450" x2="1080" y2="530" stroke="#AA0000" strokeWidth="1.5" />
          <line x1="960" y1="530" x2="1080" y2="610" stroke="#CC0000" strokeWidth="2.5" />
          <line x1="950" y1="610" x2="1080" y2="700" stroke="#880000" strokeWidth="1" />
          <line x1="940" y1="700" x2="1080" y2="780" stroke="#CC0000" strokeWidth="3" />
          <line x1="955" y1="780" x2="1080" y2="860" stroke="#FF2222" strokeWidth="2" />
          <line x1="945" y1="860" x2="1080" y2="940" stroke="#CC0000" strokeWidth="1.5" />
          <line x1="960" y1="930" x2="1080" y2="1010" stroke="#AA0000" strokeWidth="2.5" />
        </g>
        <g opacity="0.85">
          <line x1="0"   y1="900" x2="250" y2="980"  stroke="#CC0000" strokeWidth="2" />
          <line x1="20"  y1="930" x2="280" y2="1010" stroke="#880000" strokeWidth="1.5" />
          <line x1="0"   y1="970" x2="230" y2="1050" stroke="#CC0000" strokeWidth="3" />
          <line x1="50"  y1="950" x2="310" y2="1025" stroke="#FF2222" strokeWidth="1.5" />
          <line x1="80"  y1="940" x2="340" y2="1010" stroke="#AA0000" strokeWidth="2" />
          <line x1="100" y1="980" x2="350" y2="1055" stroke="#CC0000" strokeWidth="2.5" />
          <line x1="120" y1="1000" x2="380" y2="1080" stroke="#880000" strokeWidth="1" />
        </g>
        <g opacity="0.85">
          <line x1="750"  y1="950" x2="1000" y2="1030" stroke="#CC0000" strokeWidth="2" />
          <line x1="780"  y1="960" x2="1040" y2="1040" stroke="#880000" strokeWidth="1.5" />
          <line x1="810"  y1="940" x2="1080" y2="1020" stroke="#FF2222" strokeWidth="3" />
          <line x1="840"  y1="970" x2="1080" y2="1045" stroke="#CC0000" strokeWidth="2" />
          <line x1="870"  y1="980" x2="1080" y2="1055" stroke="#AA0000" strokeWidth="1" />
          <line x1="900"  y1="1000" x2="1080" y2="1070" stroke="#CC0000" strokeWidth="2.5" />
        </g>
        <line x1="0" y1="0" x2="1080" y2="1080" stroke="rgba(180,0,0,0.04)" strokeWidth="300" />
      </svg>

      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'radial-gradient(ellipse 70% 70% at 50% 55%, rgba(0,0,0,0.92) 30%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 80px 55px',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <RuntimeLogo
            width={108}
            height={123}
            clipId="sc-header"
            style={{ filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.15))' }}
          />
          <div style={{
            width: '90px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #CC0000, transparent)',
            marginTop: '10px',
          }} />
        </div>

        {/* Badge */}
        <div style={{
          background: 'rgba(204, 0, 0, 0.15)',
          border: '1.5px solid #CC0000',
          color: '#FF3333',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '22px',
          letterSpacing: '4px',
          padding: '6px 24px',
          marginBottom: '18px',
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        }}>
          {data.badge}
        </div>

        {/* Info line */}
        <div style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: '22px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '1px',
          marginBottom: '44px',
        }}>
          <span style={{ color: '#fff', fontWeight: 700 }}>{data.infoDate}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          {data.infoVenue}
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(204,0,0,0.6) 30%, rgba(204,0,0,0.6) 70%, transparent)',
          marginBottom: '44px',
        }} />

        {/* Section label */}
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '26px',
          letterSpacing: '6px',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '32px',
        }}>
          [ MATCHUP ]
        </div>

        {/* Matchup */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '50px',
          width: '100%',
          marginBottom: '50px',
        }}>
          {/* RUNTIME */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', flex: 1 }}>
            <RuntimeLogo
              width={158}
              height={180}
              clipId="sc-matchup"
              style={{ filter: 'drop-shadow(0 0 14px rgba(204,0,0,0.35)) drop-shadow(0 0 30px rgba(255,255,255,0.08))' }}
            />
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '26px',
              letterSpacing: '5px',
              color: 'rgba(255,255,255,0.85)',
            }}>
              RUNTIME
            </div>
          </div>

          {/* VS */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '100px',
              color: '#CC0000',
              lineHeight: 1,
              letterSpacing: '-2px',
              textShadow: '0 0 40px rgba(204,0,0,0.6), 0 0 80px rgba(204,0,0,0.3)',
            }}>
              VS
            </div>
          </div>

          {/* Opponent */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', flex: 1 }}>
            <div style={{
              width: '160px',
              height: '160px',
              border: '3px solid rgba(255,255,255,0.15)',
              background: 'rgba(10,10,10,0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
            }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="90" height="90" style={{ opacity: 0.5 }}>
                <path d="M50 8 L88 22 L88 52 C88 72 70 88 50 94 C30 88 12 72 12 52 L12 22 Z"
                  fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
                <path d="M50 18 L80 29 L80 52 C80 67 66 80 50 85 C34 80 20 67 20 52 L20 29 Z"
                  fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              </svg>
            </div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '26px',
              letterSpacing: '5px',
              color: 'rgba(255,255,255,0.85)',
            }}>
              {data.awayTeam}
            </div>
          </div>
        </div>

        {/* Time block */}
        <div style={{
          background: 'rgba(204, 0, 0, 0.08)',
          border: '1px solid rgba(204,0,0,0.4)',
          padding: '22px 80px',
          display: 'flex',
          alignItems: 'center',
          gap: '50px',
          clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '4px', color: '#CC0000' }}>DATE</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', color: '#fff', letterSpacing: '3px', lineHeight: 1 }}>{data.matchDate}</div>
          </div>
          <div style={{ width: '1px', height: '50px', background: 'rgba(204,0,0,0.3)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '4px', color: '#CC0000' }}>KICKOFF</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', color: '#fff', letterSpacing: '3px', lineHeight: 1 }}>{data.kickoffTime}</div>
          </div>
          <div style={{ width: '1px', height: '50px', background: 'rgba(204,0,0,0.3)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '4px', color: '#CC0000' }}>VENUE</div>
            <div style={{ fontSize: '26px', fontFamily: "'Noto Sans KR'", fontWeight: 700, letterSpacing: '1px', color: '#fff', lineHeight: 1 }}>{data.venueShort}</div>
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
      }} />
    </div>
  );
}
