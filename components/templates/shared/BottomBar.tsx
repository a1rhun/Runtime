interface BottomBarProps {
  zIndex?: number;
}

export function BottomBar({ zIndex = 3 }: BottomBarProps) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '6px',
      background: 'linear-gradient(90deg, transparent 0%, #CC0000 30%, #FF2222 50%, #CC0000 70%, transparent 100%)',
      zIndex,
    }} />
  );
}
