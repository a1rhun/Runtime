import { MatchResultOfficialData } from '@/types'
import { SportShoe } from 'lucide-react'
import RuntimeLogo from './RuntimeLogo'
import { TemplateCanvas } from './shared/TemplateCanvas'
import { SpeedLinesBg } from './shared/SpeedLinesBg'
import { VignetteOverlay } from './shared/VignetteOverlay'
import { BottomBar } from './shared/BottomBar'

interface Props {
  data: MatchResultOfficialData
}

const VIGNETTE =
  'radial-gradient(ellipse 75% 75% at 50% 42%, rgba(0,0,0,0.93) 25%, transparent 100%)'

// 클래식 텔스타 패턴 축구공 SVG (오각형 + 5개 선)
const SoccerBall = ({
  size = 20,
  color = 'rgba(255,255,255,0.82)',
  strokeWidth = 1.5,
}: {
  size?: number
  color?: string
  strokeWidth?: number
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 외부 원 */}
    <circle cx="10" cy="10" r="9" stroke={color} strokeWidth={strokeWidth} />
    {/* 중앙 오각형 — 꼭짓점 순서: 위→오른쪽→오른쪽아래→왼쪽아래→왼쪽 */}
    <polygon
      points="10,6.5 13.33,8.92 12.06,12.83 7.94,12.83 6.67,8.92"
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
    />
    {/* 오각형 꼭짓점 → 원 가장자리 5개 선 */}
    <line x1="10" y1="6.5" x2="10" y2="1" stroke={color} strokeWidth={strokeWidth} />
    <line x1="13.33" y1="8.92" x2="18.56" y2="7.22" stroke={color} strokeWidth={strokeWidth} />
    <line x1="12.06" y1="12.83" x2="15.29" y2="17.28" stroke={color} strokeWidth={strokeWidth} />
    <line x1="7.94" y1="12.83" x2="4.71" y2="17.28" stroke={color} strokeWidth={strokeWidth} />
    <line x1="6.67" y1="8.92" x2="1.44" y2="7.22" stroke={color} strokeWidth={strokeWidth} />
  </svg>
)

const OpponentShield = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="96"
    height="96"
    style={{ opacity: 0.45 }}
  >
    <path
      d="M50 8 L88 22 L88 52 C88 72 70 88 50 94 C30 88 12 72 12 52 L12 22 Z"
      fill="rgba(255,255,255,0.05)"
      stroke="rgba(255,255,255,0.35)"
      strokeWidth="2.5"
    />
    <path
      d="M50 18 L80 29 L80 52 C80 67 66 80 50 85 C34 80 20 67 20 52 L20 29 Z"
      fill="none"
      stroke="rgba(255,255,255,0.15)"
      strokeWidth="1.5"
    />
  </svg>
)

const PhotoPlaceholder = ({ label }: { label: string }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <span
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '60px',
        letterSpacing: '4px',
        color: 'rgba(255,255,255,0.2)',
      }}
    >
      {label}
    </span>
  </div>
)

export default function MatchResultOfficialTemplate({ data }: Props) {
  return (
    <TemplateCanvas>
      <SpeedLinesBg filterId="blur-result-official" />
      <VignetteOverlay gradient={VIGNETTE} />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '44px 72px 48px',
          boxSizing: 'border-box',
        }}
      >
        {/* MATCH RESULT */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            marginBottom: '14px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(204,0,0,0.4))',
            }}
          />
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '36px',
              letterSpacing: '10px',
              color: '#FFFFFF',
            }}
          >
            MATCH RESULT
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(270deg, transparent, rgba(204,0,0,0.4))',
            }}
          />
        </div>

        {/* Competition header — Announcement 스타일 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '14px',
            width: '100%',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '2px',
              background:
                'linear-gradient(90deg, transparent, #CC0000 30%, #CC0000 70%, transparent)',
            }}
          />
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '42px',
              letterSpacing: '10px',
              fontWeight: 700,
              lineHeight: 1.2,
              background: 'linear-gradient(90deg, #CC0000, rgba(255,220,200,0.9), #CC0000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {data.badge}
          </span>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '32px',
              letterSpacing: '5px',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            {data.infoDate}
          </span>

          <div
            style={{
              width: '100%',
              height: '2px',
              background:
                'linear-gradient(90deg, transparent, #CC0000 30%, #CC0000 70%, transparent)',
            }}
          />
        </div>

        {/* Matchup row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
            marginBottom: '18px',
            flexShrink: 0,
          }}
        >
          {/* RUNTIME */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              flex: 1,
            }}
          >
            <RuntimeLogo
              width={144}
              height={163}
              color="white"
              style={{ filter: 'drop-shadow(0 0 18px rgba(204,0,0,0.5))' }}
            />
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '42px',
                letterSpacing: '5px',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              RUNTIME
            </div>
          </div>

          {/* Score */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '200px',
                color: '#CC0000',
                lineHeight: 1,
                letterSpacing: '8px',
                textShadow: '0 0 50px rgba(204,0,0,0.8), 0 0 100px rgba(204,0,0,0.4)',
              }}
            >
              {data.homeScore}-{data.awayScore}
            </div>
          </div>

          {/* Opponent */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              flex: 1,
            }}
          >
            <div
              style={{
                width: '163px',
                height: '163px',
                border: '2px solid rgba(255,255,255,0.12)',
                background: 'rgba(10,10,10,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
              }}
            >
              {data.opponentImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.opponentImage}
                  alt={data.awayTeam}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <OpponentShield />
              )}
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '42px',
                letterSpacing: '5px',
                color: 'rgba(255,255,255,0.85)',
                whiteSpace: 'nowrap',
              }}
            >
              {data.awayTeam}
            </div>
          </div>
        </div>

        {/* Dot separator */}
        <div
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'rgba(204,0,0,0.6)',
            marginBottom: '18px',
            flexShrink: 0,
          }}
        />

        {/* Bottom: GOALS + 단체사진 (세로 스택, 전체 너비) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            flex: 1,
            minHeight: 0,
            gap: '14px',
          }}
        >
          {/* GOALS + POM — 가로 배치 */}
          <div style={{ display: 'flex', gap: '0px', flexShrink: 0 }}>
            {/* GOALS */}
            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '50px', flex: 1 }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}
              >
                <div
                  style={{
                    width: '3px',
                    height: '28px',
                    background: '#CC0000',
                    borderRadius: '2px',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '34px',
                    letterSpacing: '6px',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  GOALS
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.scorers.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '36px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <SoccerBall size={22} />
                    </div>
                    <div
                      style={{
                        width: '68px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          marginTop: '4px',
                          fontSize: '38px',
                          lineHeight: 1,
                          color: 'rgba(204,0,0,0.9)',
                          letterSpacing: '1px',
                        }}
                      >
                        {s.minute}&apos;
                      </span>
                    </div>
                    <div
                      style={{
                        width: '180px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span
                        style={{
                          marginTop: '-2px',
                          fontFamily: "'Noto Sans KR', sans-serif",
                          fontSize: '28px',
                          fontWeight: 700,
                          lineHeight: 1.2,
                          color: 'rgba(255,255,255,0.95)',
                          letterSpacing: '4px',
                          display: 'inline-block',
                          transform: 'scaleX(0.92)',
                          transformOrigin: 'left center',
                        }}
                      >
                        {s.name}
                      </span>
                      {s.isPenalty && (
                        <span
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: '28px',
                            lineHeight: 1,
                            color: 'rgba(204,0,0,0.8)',
                            letterSpacing: '1px',
                          }}
                        >
                          Pen
                        </span>
                      )}
                    </div>

                    {s.assist && s.assist.trim() !== '' && (
                      <>
                        <div
                          style={{
                            width: '30px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <SportShoe size={20} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
                        </div>
                        <span
                          style={{
                            fontFamily: "'Noto Sans KR', sans-serif",
                            fontWeight: 700,
                            fontSize: '26px',
                            lineHeight: 1,
                            color: 'rgba(255,255,255,0.45)',
                            display: 'inline-block',
                            transform: 'scaleX(0.78)',
                            letterSpacing: '2px',
                            transformOrigin: 'left center',
                          }}
                        >
                          {s.assist}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* POM — GOALS 라벨 기준선에 맞춰 상단 정렬 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingRight: '140px',
                gap: '6px',
                flexShrink: 0,
              }}
            >
              {/* POM 라벨 */}
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}
              >
                <div
                  style={{
                    width: '3px',
                    height: '28px',
                    background: '#CC0000',
                    borderRadius: '2px',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '34px',
                    letterSpacing: '6px',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  POM
                </span>
              </div>

              {/* #번호 이름 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '58px',
                    lineHeight: 1,
                    color: '#CC0000',
                    textShadow: '0 0 30px rgba(204,0,0,0.5)',
                    letterSpacing: '2px',
                  }}
                >
                  #{data.pomNumber}
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: '30px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.92)',
                    letterSpacing: '2px',
                  }}
                >
                  {data.pomName}
                </span>
              </div>
            </div>
          </div>

          {/* 단체사진 — 나머지 공간 전부 */}
          <div
            style={{
              flex: 1,
              width: '100%',
              overflow: 'hidden',
              minHeight: 0,
              paddingLeft: '50px',
              paddingRight: '50px',
              boxSizing: 'border-box',
            }}
          >
            {data.teamPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.teamPhoto}
                alt="team"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <PhotoPlaceholder label="TEAM PHOTO" />
            )}
          </div>
        </div>
      </div>

      <BottomBar />
    </TemplateCanvas>
  )
}
