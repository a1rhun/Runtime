import { StartingXiData } from '@/types';
import RuntimeLogo from './RuntimeLogo';

interface Props {
  data: StartingXiData;
}

// xi-template1.html 기반 — CSS 변수(--s) 대신 고정 1080px 기준으로 계산
// calc(var(--s)*X) → 1080*X px
const S = 1080;
const s = (ratio: number) => `${S * ratio}px`;

export default function StartingXiTemplate1({ data }: Props) {
  const subsText = data.substitutes.trim() || '교체 선수를 여기에 입력하세요';

  return (
    <div style={{
      width: '1080px',
      height: '1080px',
      background: '#080808',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
    }}>

      {/* SVG Background speed lines */}
      <svg
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100%', height: '100%' }}
        viewBox="0 0 1080 1080"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="blur1-t1"><feGaussianBlur stdDeviation="0.5" /></filter>
        </defs>
        <g opacity="0.9" filter="url(#blur1-t1)">
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
        <g opacity="0.85" filter="url(#blur1-t1)">
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
        background: 'radial-gradient(ellipse 75% 75% at 60% 50%, rgba(0,0,0,0.91) 25%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Left sidebar */}
      <div style={{
        width: s(0.13),
        flexShrink: 0,
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)',
        borderRight: '2px solid rgba(180,0,0,0.35)',
        overflow: 'hidden',
      }}>
        {/* subtle diagonal stripes */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(-48deg, transparent, transparent 14px, rgba(150,0,0,0.07) 14px, rgba(150,0,0,0.07) 28px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: s(0.1),
          letterSpacing: '0.1em',
          color: '#AA0000',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          position: 'relative',
          zIndex: 1,
          textShadow: '0 0 30px rgba(200,0,0,0.5), 0 0 60px rgba(200,0,0,0.2)',
        }}>
          STARTING XI
        </div>
      </div>

      {/* Right content */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        padding: `${s(0.04)} ${s(0.05)} ${s(0.036)} ${s(0.044)}`,
      }}>

        {/* Top header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: s(0.02),
          flexShrink: 0,
        }}>
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: s(0.014),
              letterSpacing: '0.35em',
              color: '#CC0000',
              marginBottom: s(0.005),
            }}>
              {data.matchLabel}
            </div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: s(0.05),
              letterSpacing: '0.05em',
              color: '#fff',
              lineHeight: 1,
            }}>
              RUNTIME <span style={{ color: '#CC0000' }}>VS</span> {data.matchVs}
            </div>
            <div style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: s(0.013),
              color: 'rgba(255,255,255,0.38)',
              fontWeight: 400,
              marginTop: s(0.006),
            }}>
              {data.matchDate}
            </div>
          </div>
          <RuntimeLogo
            width={S * 0.09}
            height={S * 0.09 * (228 / 200)}
            clipId="sc-t1"
            style={{ filter: 'drop-shadow(0 0 14px rgba(204,0,0,0.35))' }}
          />
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, #CC0000, rgba(204,0,0,0.2) 65%, transparent)',
          marginBottom: s(0.018),
          flexShrink: 0,
        }} />

        {/* Formation row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: s(0.012),
          marginBottom: s(0.016),
          flexShrink: 0,
        }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: s(0.02),
            letterSpacing: '0.18em',
            color: '#fff',
            background: 'rgba(204,0,0,0.12)',
            border: '1px solid rgba(204,0,0,0.5)',
            padding: `${s(0.004)} ${s(0.016)}`,
            clipPath: 'polygon(7px 0%, 100% 0%, calc(100% - 7px) 100%, 0% 100%)',
            whiteSpace: 'nowrap',
          }}>
            {data.formation}
          </div>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(204,0,0,0.2), transparent)',
          }} />
        </div>

        {/* Player list */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          marginBottom: s(0.014),
        }}>
          {data.players.map((player, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: s(0.012),
              padding: `${s(0.005)} 0`,
              borderBottom: '1px solid rgba(255,255,255,0.055)',
            }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: s(0.036),
                color: 'rgba(180,0,0,0.5)',
                lineHeight: 1,
                width: s(0.055),
                flexShrink: 0,
                letterSpacing: '-0.01em',
              }}>
                {player.num}
              </div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: s(0.034),
                color: '#fff',
                letterSpacing: '0.07em',
                lineHeight: 1,
                flex: 1,
              }}>
                {player.name}
              </div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: s(0.012),
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.18em',
                alignSelf: 'center',
              }}>
                {player.pos}
              </div>
            </div>
          ))}
        </div>

        {/* Subs */}
        <div style={{
          flexShrink: 0,
          borderTop: '1px solid rgba(180,0,0,0.3)',
          paddingTop: s(0.013),
          marginBottom: s(0.01),
        }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: s(0.016),
            letterSpacing: '0.3em',
            color: '#CC0000',
            marginBottom: s(0.007),
          }}>
            ▸ SUBSTITUTIONS
          </div>
          <div style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: s(0.015),
            fontWeight: 700,
            color: 'rgba(255,255,255,0.42)',
            letterSpacing: '0.04em',
            lineHeight: 1.7,
          }}>
            {subsText}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: s(0.011),
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.13)',
          flexShrink: 0,
        }}>
          RUNTIME &nbsp;·&nbsp; 동국대학교 컴퓨터공학과 축구 동아리
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: s(0.005),
        background: 'linear-gradient(90deg, transparent 0%, #CC0000 30%, #FF2222 50%, #CC0000 70%, transparent 100%)',
      }} />
    </div>
  );
}
