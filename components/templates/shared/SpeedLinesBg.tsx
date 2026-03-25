/**
 * 코너 방사형 속도선 배경 (MatchAnnouncementTemplate, StartingXiBTemplate 공유)
 */
interface SpeedLinesBgProps {
  filterId: string;
  variant?: 'red' | 'white';
}

const RED_PALETTE = {
  primary: '#CC0000',
  dark: '#880000',
  bright: '#FF2222',
  medium: '#AA0000',
  vivid: '#FF3333',
  tint: 'rgba(180,0,0,0.04)',
};

const WHITE_PALETTE = {
  primary: 'rgba(255,255,255,0.65)',
  dark: 'rgba(255,255,255,0.35)',
  bright: 'rgba(255,255,255,0.85)',
  medium: 'rgba(255,255,255,0.5)',
  vivid: 'rgba(255,255,255,0.75)',
  tint: 'rgba(255,255,255,0.03)',
};

export function SpeedLinesBg({ filterId, variant = 'red' }: SpeedLinesBgProps) {
  const c = variant === 'white' ? WHITE_PALETTE : RED_PALETTE;
  return (
    <svg
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100%', height: '100%' }}
      viewBox="0 0 1080 1080"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={filterId}><feGaussianBlur stdDeviation="0.5" /></filter>
      </defs>

      {/* Top-left corner burst */}
      <g opacity="0.9" filter={`url(#${filterId})`}>
        <line x1="40"  y1="30" x2="280" y2="120" stroke={c.primary} strokeWidth="3" />
        <line x1="10"  y1="50" x2="220" y2="130" stroke={c.primary} strokeWidth="1.5" />
        <line x1="60"  y1="15" x2="340" y2="95"  stroke={c.primary} strokeWidth="2.5" />
        <line x1="0"   y1="70" x2="190" y2="145" stroke={c.dark}    strokeWidth="1" />
        <line x1="80"  y1="5"  x2="360" y2="75"  stroke={c.primary} strokeWidth="2" />
        <line x1="100" y1="20" x2="420" y2="90"  stroke={c.bright}  strokeWidth="3.5" />
        <line x1="20"  y1="85" x2="260" y2="155" stroke={c.primary} strokeWidth="1" />
        <line x1="130" y1="0"  x2="500" y2="110" stroke={c.medium}  strokeWidth="2" />
        <line x1="150" y1="15" x2="450" y2="105" stroke={c.primary} strokeWidth="1.5" />
        <line x1="170" y1="30" x2="480" y2="118" stroke={c.dark}    strokeWidth="1" />
        <line x1="50"  y1="95" x2="300" y2="170" stroke={c.primary} strokeWidth="2.5" />
        <line x1="200" y1="10" x2="520" y2="100" stroke={c.vivid}   strokeWidth="2" />
      </g>

      {/* Top-right corner burst */}
      <g opacity="0.85" filter={`url(#${filterId})`}>
        <line x1="700" y1="0"  x2="1000" y2="100" stroke={c.primary} strokeWidth="2.5" />
        <line x1="730" y1="10" x2="1020" y2="105" stroke={c.dark}    strokeWidth="1.5" />
        <line x1="760" y1="0"  x2="1080" y2="110" stroke={c.bright}  strokeWidth="3" />
        <line x1="780" y1="15" x2="1080" y2="90"  stroke={c.primary} strokeWidth="1" />
        <line x1="820" y1="5"  x2="1080" y2="70"  stroke={c.medium}  strokeWidth="2" />
      </g>

      {/* Left-side lines */}
      <g opacity="0.8">
        <line x1="0" y1="200" x2="120" y2="290" stroke={c.primary} strokeWidth="2" />
        <line x1="0" y1="230" x2="100" y2="310" stroke={c.dark}    strokeWidth="1" />
        <line x1="0" y1="310" x2="130" y2="400" stroke={c.primary} strokeWidth="2.5" />
        <line x1="0" y1="340" x2="110" y2="420" stroke={c.bright}  strokeWidth="1.5" />
        <line x1="0" y1="420" x2="140" y2="510" stroke={c.primary} strokeWidth="2" />
        <line x1="0" y1="500" x2="120" y2="580" stroke={c.dark}    strokeWidth="1.5" />
        <line x1="0" y1="580" x2="150" y2="660" stroke={c.primary} strokeWidth="3" />
        <line x1="0" y1="660" x2="130" y2="730" stroke={c.medium}  strokeWidth="1" />
      </g>

      {/* Right-side lines */}
      <g opacity="0.85">
        <line x1="960" y1="200" x2="1080" y2="290" stroke={c.primary} strokeWidth="2.5" />
        <line x1="950" y1="230" x2="1080" y2="320" stroke={c.dark}    strokeWidth="1.5" />
        <line x1="940" y1="310" x2="1080" y2="400" stroke={c.bright}  strokeWidth="3" />
        <line x1="955" y1="380" x2="1080" y2="450" stroke={c.primary} strokeWidth="2" />
        <line x1="945" y1="450" x2="1080" y2="530" stroke={c.medium}  strokeWidth="1.5" />
        <line x1="960" y1="530" x2="1080" y2="610" stroke={c.primary} strokeWidth="2.5" />
        <line x1="950" y1="610" x2="1080" y2="700" stroke={c.dark}    strokeWidth="1" />
        <line x1="940" y1="700" x2="1080" y2="780" stroke={c.primary} strokeWidth="3" />
        <line x1="955" y1="780" x2="1080" y2="860" stroke={c.bright}  strokeWidth="2" />
        <line x1="945" y1="860" x2="1080" y2="940" stroke={c.primary} strokeWidth="1.5" />
        <line x1="960" y1="930" x2="1080" y2="1010" stroke={c.medium} strokeWidth="2.5" />
      </g>

      {/* Bottom-left corner burst */}
      <g opacity="0.85">
        <line x1="0"   y1="900"  x2="250" y2="980"  stroke={c.primary} strokeWidth="2" />
        <line x1="20"  y1="930"  x2="280" y2="1010" stroke={c.dark}    strokeWidth="1.5" />
        <line x1="0"   y1="970"  x2="230" y2="1050" stroke={c.primary} strokeWidth="3" />
        <line x1="50"  y1="950"  x2="310" y2="1025" stroke={c.bright}  strokeWidth="1.5" />
        <line x1="80"  y1="940"  x2="340" y2="1010" stroke={c.medium}  strokeWidth="2" />
        <line x1="100" y1="980"  x2="350" y2="1055" stroke={c.primary} strokeWidth="2.5" />
        <line x1="120" y1="1000" x2="380" y2="1080" stroke={c.dark}    strokeWidth="1" />
      </g>

      {/* Bottom-right corner burst */}
      <g opacity="0.85">
        <line x1="750" y1="950"  x2="1000" y2="1030" stroke={c.primary} strokeWidth="2" />
        <line x1="780" y1="960"  x2="1040" y2="1040" stroke={c.dark}    strokeWidth="1.5" />
        <line x1="810" y1="940"  x2="1080" y2="1020" stroke={c.bright}  strokeWidth="3" />
        <line x1="840" y1="970"  x2="1080" y2="1045" stroke={c.primary} strokeWidth="2" />
        <line x1="870" y1="980"  x2="1080" y2="1055" stroke={c.medium}  strokeWidth="1" />
        <line x1="900" y1="1000" x2="1080" y2="1070" stroke={c.primary} strokeWidth="2.5" />
      </g>

      {/* Diagonal tint overlay */}
      <line x1="0" y1="0" x2="1080" y2="1080" stroke={c.tint} strokeWidth="300" />
    </svg>
  );
}
