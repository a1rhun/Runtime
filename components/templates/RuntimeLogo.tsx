// 공통 RUNTIME 로고 SVG 컴포넌트
interface RuntimeLogoProps {
  width: number;
  height: number;
  clipId: string;
  style?: React.CSSProperties;
}

export default function RuntimeLogo({ width, height, clipId, style }: RuntimeLogoProps) {
  return (
    <svg
      viewBox="0 0 200 228"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={style}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M18,6 L182,6 L182,148 L100,222 L18,148 Z" />
        </clipPath>
      </defs>
      <path d="M18,6 L182,6 L182,148 L100,222 L18,148 Z" fill="white" />
      <text x="100" y="92" fontFamily="'Bebas Neue',sans-serif" fontSize="80" textAnchor="middle" fill="#080808" clipPath={`url(#${clipId})`}>RUN</text>
      <text x="100" y="178" fontFamily="'Bebas Neue',sans-serif" fontSize="80" textAnchor="middle" fill="#080808" clipPath={`url(#${clipId})`}>TIME</text>
      <line x1="8"   y1="230" x2="103" y2="0" stroke="#080808" strokeWidth="10" clipPath={`url(#${clipId})`} />
      <line x1="40"  y1="230" x2="135" y2="0" stroke="#080808" strokeWidth="5"  clipPath={`url(#${clipId})`} />
      <line x1="72"  y1="230" x2="167" y2="0" stroke="#080808" strokeWidth="8"  clipPath={`url(#${clipId})`} />
      <line x1="108" y1="230" x2="203" y2="0" stroke="#080808" strokeWidth="4"  clipPath={`url(#${clipId})`} />
    </svg>
  );
}
