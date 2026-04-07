'use client';

import { useState } from 'react';

interface Props {
  targetId: string;
  filename?: string;
}

/**
 * iOS Safari는 SVG foreignObject 내부에서 CSS filter / -webkit-text-fill-color를
 * 렌더링하지 않음. 캡처 전 해당 속성을 직접 처리하고 캡처 후 복원한다.
 */
async function applyMobileFixes(root: HTMLElement): Promise<() => void> {
  const restores: (() => void)[] = [];

  // Fix 1: CSS filter(invert)가 걸린 img → 픽셀 조작으로 흰색 변환
  // ctx.filter는 iOS에서 SVG에 불안정 → SVG 내부 PNG를 추출해 직접 처리
  const imgs = root.querySelectorAll<HTMLImageElement>('img');
  for (const img of imgs) {
    const filterVal = img.style.filter;
    if (!filterVal || !filterVal.includes('invert')) continue;

    try {
      // SVG URL이면 내장된 PNG를 꺼내 처리 (canvas taint 방지)
      let srcToDraw = img.src;
      if (!img.src.startsWith('data:')) {
        const resp = await fetch(img.src);
        const svgText = await resp.text();
        const match = svgText.match(/xlink:href="(data:image\/[^"]+)"/);
        if (match) srcToDraw = match[1];
      }

      const tempImg = new Image();
      tempImg.src = srcToDraw;
      await new Promise<void>((r) => {
        tempImg.onload = () => r();
        tempImg.onerror = () => r();
      });

      const w = tempImg.naturalWidth || img.naturalWidth || img.width;
      const h = tempImg.naturalHeight || img.naturalHeight || img.height;
      if (!w || !h) continue;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      ctx.drawImage(tempImg, 0, 0, w, h);

      // brightness(0) invert(1): 불투명 픽셀을 모두 흰색으로
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 10) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      const whiteDataUrl = canvas.toDataURL('image/png');
      const prevSrc = img.src;
      const prevFilter = img.style.filter;
      img.src = whiteDataUrl;
      img.style.filter = '';
      restores.push(() => {
        img.src = prevSrc;
        img.style.filter = prevFilter;
      });
    } catch {
      // 변환 실패 시 원본 유지
    }
  }

  // Fix 2: gradient clip text → webkit 속성 제거 (흰색 inherited color로 표시)
  // React는 style.setProperty('-webkit-text-fill-color', ...)로 설정하므로
  // cssText로 감지해야 함 (el.style.WebkitTextFillColor 접근은 불안정)
  const allEls = root.querySelectorAll<HTMLElement>('*');
  for (const el of allEls) {
    if (!el.style.cssText.includes('-webkit-text-fill-color')) continue;

    const prevCssText = el.style.cssText;
    el.style.removeProperty('-webkit-text-fill-color');
    el.style.removeProperty('-webkit-background-clip');
    el.style.removeProperty('background');
    restores.push(() => {
      el.style.cssText = prevCssText;
    });
  }

  // DOM 반영 대기
  await new Promise<void>((r) => requestAnimationFrame(() => r()));

  return () => restores.forEach((fn) => fn());
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

    let restore: (() => void) | undefined;

    try {
      const element = document.getElementById(targetId);
      if (!element) return;

      const prevCssText = element.style.cssText;
      element.style.cssText =
        'position:fixed;left:0;top:0;width:1080px;height:1080px;overflow:hidden;pointer-events:none;z-index:9998;';

      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        restore = await applyMobileFixes(element);
      }

      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(element, {
        width: 1080,
        height: 1080,
        pixelRatio: 1,
      });

      restore?.();
      restore = undefined;

      // 위치 복원
      element.style.cssText = prevCssText;

      if (isMobile) {
        if (navigator.share) {
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const file = new File([blob], `${filename}.png`, { type: 'image/png' });
          try {
            await navigator.share({ files: [file] });
            return;
          } catch {
            // 공유 취소 or 미지원 → 다운로드 fallback
          }
        }
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = dataUrl;
        link.click();
      } else {
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = dataUrl;
        link.click();
      }
    } finally {
      restore?.();
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
