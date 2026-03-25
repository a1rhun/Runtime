interface TemplateCanvasProps {
  children: React.ReactNode;
  flexDirection?: 'row' | 'column';
}

export function TemplateCanvas({ children, flexDirection = 'column' }: TemplateCanvasProps) {
  return (
    <div style={{
      width: '1080px',
      height: '1080px',
      background: '#080808',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection,
      alignItems: flexDirection === 'column' ? 'center' : undefined,
    }}>
      {children}
    </div>
  );
}
