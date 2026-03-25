// color 값에 따라 CSS filter로 색상 변환
// 지원: 'white', 'black', 또는 임의의 CSS filter 문자열
function colorToFilter(color?: string): string | undefined {
  if (!color) return undefined;
  if (color === 'white') return 'brightness(0) invert(1)';
  if (color === 'black') return 'brightness(0)';
  return color; // filter 문자열 직접 전달도 허용
}

interface RuntimeLogoProps {
  width: number;
  height: number;
  clipId?: string;
  color?: string;
  style?: React.CSSProperties;
}

export default function RuntimeLogo({ width, height, color, style }: RuntimeLogoProps) {
  const colorFilter = colorToFilter(color);
  const combinedFilter = [colorFilter, style?.filter].filter(Boolean).join(' ') || undefined;
  return (
    <img
      src="/runtime-logo.svg"
      width={width}
      height={height}
      style={{ ...style, filter: combinedFilter }}
      alt="RUNTIME FC"
    />
  );
}
