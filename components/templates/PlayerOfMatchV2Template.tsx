import { PlayerOfMatchData } from '@/types';
import { BottomBar } from './shared/BottomBar';

interface Props {
  data: PlayerOfMatchData;
}

export default function PlayerOfMatchV2Template({ data }: Props) {
  const H = data.format === 'story' ? 1920 : 1080;
  return (
    <div style={{
      width: '1080px',
      height: `${H}px`,
      position: 'relative',
      overflow: 'hidden',
      background: '#080808',
    }}>

      {/* 선수 사진 — 풀블리드 */}
      {data.pomPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.pomPhoto}
          alt={data.pomName}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: `${data.pomPhotoX ?? 50}% ${data.pomPhotoY ?? 0}%`,
          }}
        />
      ) : (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
        }} />
      )}

      {/* 미묘한 비네트 — 모서리만 살짝 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
        zIndex: 1,
      }} />

      {/* 텍스트 레이어 */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>

        {/* THIS — 상단 좌측 */}
        <span style={{
          position: 'absolute',
          top: '36px',
          left: '48px',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '260px',
          lineHeight: 0.85,
          color: '#ffffff',
          letterSpacing: '-4px',
          textShadow: '4px 4px 0px rgba(0,0,0,0.35)',
          userSelect: 'none',
          display: 'block',
          transform: 'scaleY(1.45)',
          transformOrigin: 'top left',
        }}>THIS</span>

        {/* IS — 하단 우측 */}
        <span style={{
          position: 'absolute',
          bottom: '36px',
          right: '48px',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '260px',
          lineHeight: 0.85,
          color: '#ffffff',
          letterSpacing: '-4px',
          textShadow: '4px 4px 0px rgba(0,0,0,0.35)',
          userSelect: 'none',
          display: 'block',
          transform: 'scaleY(1.45)',
          transformOrigin: 'bottom right',
        }}>IS</span>

      </div>

      <BottomBar />
    </div>
  );
}
