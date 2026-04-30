import { PlayerOfMatchData } from '@/types';
import RuntimeLogo from './RuntimeLogo';
import { BottomBar } from './shared/BottomBar';

interface Props {
  data: PlayerOfMatchData;
}

export default function PlayerOfMatchTemplate({ data }: Props) {
  const H = data.format === 'story' ? 1920 : 1080;
  return (
    <div style={{
      width: '1080px',
      height: `${H}px`,
      position: 'relative',
      overflow: 'hidden',
      background: '#080808',
    }}>

      {/* 선수 사진 — 풀블리드 배경 */}
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '28px',
            letterSpacing: '8px',
            color: 'rgba(255,255,255,0.1)',
          }}>PLAYER PHOTO</span>
        </div>
      )}

      {/* 그라디언트 오버레이 — 상단·하단 어둡게 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.85) 100%)',
        zIndex: 1,
      }} />

      {/* 콘텐츠 레이어 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
      }}>

        {/* ── 상단 좌측: PLAYER OF THE MATCH ── */}
        <div style={{
          position: 'absolute',
          top: '52px',
          left: '60px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          lineHeight: 0.88,
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '168px',
            color: '#ffffff',
            letterSpacing: '-2px',
            textShadow: '0 4px 40px rgba(0,0,0,0.6)',
            display: 'block',
          }}>PLAYER</span>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '68px',
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '12px',
            display: 'block',
            marginTop: '4px',
          }}>OF THE</span>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '168px',
            color: '#CC0000',
            letterSpacing: '-2px',
            textShadow: '0 0 60px rgba(204,0,0,0.7), 0 4px 40px rgba(0,0,0,0.5)',
            display: 'block',
          }}>MATCH</span>
        </div>

        {/* ── 상단 우측: RUNTIME 로고 ── */}
        <div style={{
          position: 'absolute',
          top: '52px',
          right: '60px',
        }}>
          <RuntimeLogo width={64} height={73} color="white"
            style={{ opacity: 0.8, filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.6))' }} />
        </div>

        {/* ── 하단: 선수 정보 블록 ── */}
        <div style={{
          position: 'absolute',
          bottom: '42px',
          left: 0,
          right: 0,
          padding: '0 60px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>

          {/* 왼쪽: 이름 + 경기 정보 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.matchLabel && (
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '22px',
                letterSpacing: '6px',
                color: 'rgba(255,255,255,0.45)',
              }}>{data.matchLabel}</span>
            )}
            <div style={{
              width: '56px',
              height: '3px',
              background: '#CC0000',
              borderRadius: '2px',
              marginBottom: '4px',
            }} />
            <span style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: '72px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1,
              letterSpacing: '2px',
              textShadow: '0 2px 24px rgba(0,0,0,0.8)',
            }}>{data.pomName}</span>
          </div>

          {/* 오른쪽: 등번호 + 포지션 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '2px',
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '130px',
              lineHeight: 1,
              color: '#CC0000',
              letterSpacing: '-2px',
              textShadow: '0 0 50px rgba(204,0,0,0.8), 0 2px 24px rgba(0,0,0,0.6)',
            }}>#{data.pomNumber}</span>
            <div style={{
              background: 'rgba(204,0,0,0.2)',
              border: '1px solid rgba(204,0,0,0.6)',
              padding: '6px 20px 5px',
              clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
            }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '28px',
                letterSpacing: '6px',
                color: '#FF4444',
              }}>{data.pomPosition}</span>
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
