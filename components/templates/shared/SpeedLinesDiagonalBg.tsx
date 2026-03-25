/**
 * 대각선 속도선 배경 (StartingXiATemplate 전용)
 */
interface SpeedLinesDiagonalBgProps {
  filterId: string;
  gradientId: string;
  maskId: string;
}

export function SpeedLinesDiagonalBg({ filterId, gradientId, maskId }: SpeedLinesDiagonalBgProps) {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100%', height: '100%' }}
      viewBox="0 0 1080 1080"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={filterId}><feGaussianBlur stdDeviation="0.7" /></filter>
        <radialGradient id={gradientId} cx="30%" cy="50%" r="80%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.6" />
          <stop offset="50%"  stopColor="white" stopOpacity="0.45" />
          <stop offset="100%" stopColor="white" stopOpacity="0.75" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="1080" height="1080" fill={`url(#${gradientId})`} />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`} filter={`url(#${filterId})`}>
        {/* Primary diagonal lines */}
        <g opacity="0.6">
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

        {/* Secondary diagonal lines */}
        <g opacity="0.65">
          <line x1="80"  y1="-30" x2="1110" y2="660"  stroke="#CC0000" strokeWidth="2" />
          <line x1="180" y1="-30" x2="1110" y2="580"  stroke="#880000" strokeWidth="1.5" />
          <line x1="310" y1="-30" x2="1110" y2="490"  stroke="#FF2222" strokeWidth="2.5" />
          <line x1="460" y1="-30" x2="1110" y2="390"  stroke="#CC0000" strokeWidth="1" />
          <line x1="620" y1="-30" x2="1110" y2="280"  stroke="#AA0000" strokeWidth="3" />
          <line x1="780" y1="-30" x2="1110" y2="170"  stroke="#CC0000" strokeWidth="2" />
          <line x1="930" y1="-30" x2="1110" y2="70"   stroke="#FF3333" strokeWidth="3.5" />
          <line x1="100" y1="200" x2="1110" y2="820"  stroke="#CC0000" strokeWidth="1.5" />
          <line x1="100" y1="420" x2="1110" y2="1040" stroke="#880000" strokeWidth="2" />
          <line x1="100" y1="640" x2="920"  y2="1110" stroke="#CC0000" strokeWidth="1.5" />
          <line x1="100" y1="860" x2="720"  y2="1110" stroke="#AA0000" strokeWidth="2.5" />
        </g>

        {/* Accent lines (bright) */}
        <g opacity="0.4">
          <line x1="-30" y1="30"  x2="1110" y2="440"  stroke="#FF2222" strokeWidth="4.5" />
          <line x1="-30" y1="280" x2="1110" y2="690"  stroke="#FF2222" strokeWidth="3.5" />
          <line x1="-30" y1="580" x2="1110" y2="990"  stroke="#FF3333" strokeWidth="4" />
          <line x1="250" y1="-30" x2="1110" y2="530"  stroke="#FF2222" strokeWidth="3" />
          <line x1="680" y1="-30" x2="1110" y2="310"  stroke="#FF2222" strokeWidth="3.5" />
        </g>
      </g>

      {/* Diagonal red tint overlay */}
      <line x1="0" y1="0" x2="1080" y2="1080" stroke="rgba(180,0,0,0.03)" strokeWidth="260" />
    </svg>
  );
}
