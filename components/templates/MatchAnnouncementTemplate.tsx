import { MapPin } from "lucide-react";
import { MatchAnnouncementData } from "@/types";
import RuntimeLogo from "./RuntimeLogo"; // hero matchup에서 사용
import { TemplateCanvas } from "./shared/TemplateCanvas";
import { SpeedLinesBg } from "./shared/SpeedLinesBg";
import { VignetteOverlay } from "./shared/VignetteOverlay";
import { BottomBar } from "./shared/BottomBar";

interface Props {
  data: MatchAnnouncementData;
}

const VIGNETTE_GRADIENT =
  "radial-gradient(ellipse 90% 90% at 50% 45%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.2) 65%, transparent 100%)";

const styles = {
  content: {
    position: "relative" as const,
    zIndex: 2,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    padding: "64px 72px 72px",
  },

  // ── Competition header ────────────────────────────────────
  competitionHeader: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "14px",
    marginBottom: "60px",
    width: "100%",
  },
  competitionText: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "36px",
    letterSpacing: "10px",
    color: "#fff",
    lineHeight: 1.3,
  },
  competitionSub: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: "36px",
    fontWeight: 600,
    letterSpacing: "6px",
    lineHeight: 1.3,
    paddingBottom: "4px",
    marginTop: "2px",
    background:
      "linear-gradient(90deg, #CC0000, rgba(255,220,200,0.9), #CC0000)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
  },
  competitionLine: {
    width: "100%",
    height: "2px",
    background:
      "linear-gradient(90deg, transparent, #CC0000 30%, #CC0000 70%, transparent)",
  },

  // ── Hero (matchup) ────────────────────────────────────────
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "32px",
    gap: "100px",
  },
  teamBlock: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    width: "100px",
    alignItems: "center",
    gap: "20px",
  },
  teamLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "48px",
    letterSpacing: "8px",
    color: "rgba(255,255,255,0.85)",
    lineHeight: 1,
  },
  opponentEmblem: {
    width: "210px",
    height: "210px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  vsBlock: {
    width: "200px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  vsText: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "180px",
    color: "#CC0000",
    lineHeight: 1,
    letterSpacing: "-4px",
    textShadow: "0 0 50px rgba(204,0,0,0.7), 0 0 100px rgba(204,0,0,0.3)",
  },

  // ── Big date/time block ───────────────────────────────────
  dateTimeBlock: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "8px",
    marginTop: "64px",
  },
  bigDate: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "96px",
    color: "rgba(255,255,255,0.8)",
    letterSpacing: "4px",
    lineHeight: 1,
  },
  bigTime: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "72px",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "6px",
    lineHeight: 1,
  },

  // ── Venue (near bottom bar) ───────────────────────────────
  venueRow: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "80px",
  },
  venueText: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: "42px",
    fontWeight: 600,
    letterSpacing: "3px",
    color: "rgba(255,255,255,0.65)",
  },
};

export default function MatchAnnouncementTemplate({ data }: Props) {
  return (
    <TemplateCanvas>
      <SpeedLinesBg filterId="blur-match-ann" />
      <VignetteOverlay gradient={VIGNETTE_GRADIENT} />

      <div style={styles.content}>
        {/* Competition header */}
        <div style={styles.competitionHeader}>
          <div style={styles.competitionLine} />
          <div style={styles.competitionText}>{data.badge}</div>
          {data.competition && (
            <div style={styles.competitionSub}>{data.competition}</div>
          )}
          <div style={styles.competitionLine} />
        </div>

        {/* Hero: team matchup */}
        <div style={styles.hero}>
          {/* RUNTIME */}
          <div style={styles.teamBlock}>
            <RuntimeLogo
              width={200}
              height={228}
              color="white"
              style={{
                filter:
                  "drop-shadow(0 0 16px rgba(204,0,0,0.4)) drop-shadow(0 0 32px rgba(255,255,255,0.06))",
              }}
            />
            <div style={styles.teamLabel}>RUNTIME</div>
          </div>

          {/* VS */}
          <div style={styles.vsBlock}>
            <div style={styles.vsText}>VS</div>
          </div>

          {/* Opponent */}
          <div style={styles.teamBlock}>
            <div style={styles.opponentEmblem}>
              {data.opponentImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.opponentImage}
                  alt={data.awayTeam}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="210"
                  height="210"
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
              )}
            </div>
            <div style={styles.teamLabel}>{data.awayTeam}</div>
          </div>
        </div>

        {/* Big date + time */}
        <div style={styles.dateTimeBlock}>
          <div style={styles.bigDate}>{data.matchDate}</div>
          <div style={styles.bigTime}>{data.kickoffTime}</div>
        </div>

        {/* Venue near bottom */}
        <div style={styles.venueRow}>
          <MapPin size={36} color="rgba(204,0,0,0.8)" strokeWidth={2.5} />
          <div style={styles.venueText}>{data.venueShort}</div>
        </div>
      </div>

      <BottomBar />
    </TemplateCanvas>
  );
}
