interface VignetteOverlayProps {
  gradient: string;
}

export function VignetteOverlay({ gradient }: VignetteOverlayProps) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      background: gradient,
      pointerEvents: 'none',
    }} />
  );
}
