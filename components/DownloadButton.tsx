'use client';

import { useState } from 'react';

interface Props {
  targetId: string;
  filename?: string;
}

export default function DownloadButton({ targetId, filename = 'runtime-card' }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    // 캡처 중 카드가 화면에 잠깐 보이는 것을 막는 오버레이
    const overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;inset:0;background:#0a0a0a;z-index:9999;pointer-events:none;';
    document.body.appendChild(overlay);

    try {
      const element = document.getElementById(targetId);
      if (!element) return;

      const prevCssText = element.style.cssText;
      element.style.cssText =
        'position:fixed;left:0;top:0;width:1080px;height:1080px;overflow:hidden;pointer-events:none;z-index:9998;';

      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(element, {
        width: 1080,
        height: 1080,
        pixelRatio: 1,
      });

      // 위치 복원
      element.style.cssText = prevCssText;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        if (navigator.share) {
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const file = new File([blob], `${filename}.png`, { type: 'image/png' });
          try {
            await navigator.share({ files: [file] });
            return;
          } catch {
            // 공유 취소 or 미지원 → 새 탭 fallback
          }
        }
        const newTab = window.open('', '_blank');
        if (newTab) {
          newTab.document.write(
            `<html><body style="margin:0;background:#000">` +
            `<img src="${dataUrl}" style="width:100%;display:block">` +
            `</body></html>`
          );
          newTab.document.close();
        }
      } else {
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = dataUrl;
        link.click();
      }
    } finally {
      overlay.remove();
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      style={{
        background: loading ? 'rgba(204,0,0,0.4)' : '#CC0000',
        color: '#fff',
        border: 'none',
        padding: '12px 32px',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '20px',
        letterSpacing: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
        transition: 'background 0.2s',
        width: '100%',
        marginTop: '16px',
      }}
    >
      {loading ? 'GENERATING...' : '▼ DOWNLOAD IMAGE'}
    </button>
  );
}
