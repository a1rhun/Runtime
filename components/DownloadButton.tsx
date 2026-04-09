'use client';

import { useState } from 'react';

interface Props {
  targetId: string;
  filename?: string;
}

function showMobileScreenshotMode(element: HTMLElement): () => void {
  const prevCssText = element.style.cssText;
  const scale = window.innerWidth / 1080;
  const cardDisplayHeight = Math.round(1080 * scale);

  // 전체 화면 덮개
  const backdrop = document.createElement('div');
  backdrop.style.cssText =
    'position:fixed;inset:0;background:#0a0a0a;z-index:9996;';
  document.body.appendChild(backdrop);

  // 카드를 화면 상단에 꽉 차게 배치
  element.style.cssText = `position:fixed;top:0;left:0;width:1080px;height:1080px;transform:scale(${scale});transform-origin:top left;z-index:9997;overflow:hidden;pointer-events:none;`;

  // 하단 안내 바
  const bar = document.createElement('div');
  bar.style.cssText = `position:fixed;top:${cardDisplayHeight}px;left:0;right:0;bottom:0;background:#0a0a0a;z-index:9998;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;`;
  bar.innerHTML = `
    <div style="font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:4px;color:rgba(255,255,255,0.45);">스크린샷을 찍어주세요</div>
    <button id="sc-close-btn" style="font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:3px;padding:10px 32px;background:#CC0000;color:#fff;border:none;cursor:pointer;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);">CLOSE</button>
  `;
  document.body.appendChild(bar);

  const cleanup = () => {
    element.style.cssText = prevCssText;
    backdrop.remove();
    bar.remove();
  };

  document.getElementById('sc-close-btn')?.addEventListener('click', cleanup);
  return cleanup;
}

export default function DownloadButton({ targetId, filename = 'runtime-card' }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      showMobileScreenshotMode(element);
      return;
    }

    // 데스크톱: PNG 생성 후 다운로드
    setLoading(true);

    const overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;inset:0;background:#0a0a0a;z-index:9999;pointer-events:none;';
    document.body.appendChild(overlay);

    try {
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

      element.style.cssText = prevCssText;

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
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
