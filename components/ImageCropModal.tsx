'use client';
import { useRef, useState, useCallback } from 'react';

interface Props {
  src: string;
  aspectRatio: number; // width / height
  label: string;
  onConfirm: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

export default function ImageCropModal({ src, aspectRatio, label, onConfirm, onCancel }: Props) {
  const [disp, setDisp] = useState<{ w: number; h: number } | null>(null);
  const [cropPos, setCropPos] = useState({ x: 0, y: 0 });
  const [cropDim, setCropDim] = useState({ w: 0, h: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const drag = useRef<{ mx: number; my: number; x0: number; y0: number } | null>(null);

  const handleLoad = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;

    const maxW = Math.min(window.innerWidth * 0.85, 700);
    const maxH = Math.min(window.innerHeight * 0.55, 480);
    let dw = nw, dh = nh;
    if (dw > maxW) { dh = Math.round(dh * maxW / dw); dw = Math.round(maxW); }
    if (dh > maxH) { dw = Math.round(dw * maxH / dh); dh = Math.round(maxH); }

    let cw = dw, ch = Math.round(cw / aspectRatio);
    if (ch > dh) { ch = dh; cw = Math.round(ch * aspectRatio); }

    setDisp({ w: dw, h: dh });
    setCropDim({ w: cw, h: ch });
    setCropPos({ x: Math.round((dw - cw) / 2), y: Math.round((dh - ch) / 2) });
  }, [aspectRatio]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { mx: e.clientX, my: e.clientY, x0: cropPos.x, y0: cropPos.y };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !disp) return;
    const dx = e.clientX - drag.current.mx;
    const dy = e.clientY - drag.current.my;
    setCropPos({
      x: Math.round(Math.max(0, Math.min(disp.w - cropDim.w, drag.current.x0 + dx))),
      y: Math.round(Math.max(0, Math.min(disp.h - cropDim.h, drag.current.y0 + dy))),
    });
  };

  const handlePointerUp = () => { drag.current = null; };

  const handleConfirm = () => {
    const img = imgRef.current;
    if (!img || !disp) return;
    const scaleX = img.naturalWidth / disp.w;
    const scaleY = img.naturalHeight / disp.h;
    const cw = Math.round(cropDim.w * scaleX);
    const ch = Math.round(cropDim.h * scaleY);
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(
      img,
      Math.round(cropPos.x * scaleX), Math.round(cropPos.y * scaleY),
      cw, ch,
      0, 0, cw, ch,
    );
    onConfirm(canvas.toDataURL('image/jpeg', 0.92));
  };

  const corner = '#CC0000';
  const cornerStyle = (pos: 'tl' | 'tr' | 'bl' | 'br'): React.CSSProperties => ({
    position: 'absolute',
    width: 14, height: 14,
    ...(pos === 'tl' ? { top: -2, left: -2, borderTop: `2px solid ${corner}`, borderLeft: `2px solid ${corner}` } : {}),
    ...(pos === 'tr' ? { top: -2, right: -2, borderTop: `2px solid ${corner}`, borderRight: `2px solid ${corner}` } : {}),
    ...(pos === 'bl' ? { bottom: -2, left: -2, borderBottom: `2px solid ${corner}`, borderLeft: `2px solid ${corner}` } : {}),
    ...(pos === 'br' ? { bottom: -2, right: -2, borderBottom: `2px solid ${corner}`, borderRight: `2px solid ${corner}` } : {}),
  });

  const btnBase: React.CSSProperties = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '15px', letterSpacing: '3px',
    padding: '10px 28px', cursor: 'pointer', border: 'none',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.88)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#111',
        border: '1px solid rgba(204,0,0,0.35)',
        padding: '28px',
        display: 'flex', flexDirection: 'column', gap: '18px',
        maxWidth: '92vw',
      }}>
        {/* Header */}
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '19px', letterSpacing: '5px', color: '#FF4444',
            marginBottom: '5px',
          }}>
            CROP — {label}
          </div>
          <div style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: '12px', color: 'rgba(255,255,255,0.35)',
          }}>
            드래그해서 위치를 조절하세요
          </div>
        </div>

        {/* Image area */}
        <div style={{ position: 'relative', flexShrink: 0, userSelect: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={src}
            alt=""
            onLoad={handleLoad}
            draggable={false}
            style={{
              display: 'block',
              width: disp ? disp.w : 'auto',
              height: disp ? disp.h : 'auto',
              maxWidth: '85vw',
              pointerEvents: 'none',
            }}
          />

          {disp && (
            <>
              {/* Dark overlay (4 panels) */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: cropPos.y, background: 'rgba(0,0,0,0.6)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: cropPos.y + cropDim.h, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: cropPos.y, left: 0, width: cropPos.x, height: cropDim.h, background: 'rgba(0,0,0,0.6)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: cropPos.y, left: cropPos.x + cropDim.w, right: 0, height: cropDim.h, background: 'rgba(0,0,0,0.6)', pointerEvents: 'none' }} />
              {/* Crop box */}
              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{
                  position: 'absolute',
                  left: cropPos.x, top: cropPos.y,
                  width: cropDim.w, height: cropDim.h,
                  border: '1.5px solid rgba(255,255,255,0.75)',
                  cursor: 'move',
                  boxSizing: 'border-box',
                  touchAction: 'none',
                }}
              >
                <div style={cornerStyle('tl')} />
                <div style={cornerStyle('tr')} />
                <div style={cornerStyle('bl')} />
                <div style={cornerStyle('br')} />
              </div>
            </>
          )}

          {!disp && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.35)',
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '3px',
            }}>LOADING...</div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{ ...btnBase, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
          >CANCEL</button>
          <button
            onClick={handleConfirm}
            disabled={!disp}
            style={{ ...btnBase, background: disp ? 'rgba(204,0,0,0.85)' : 'rgba(204,0,0,0.2)', color: disp ? '#fff' : 'rgba(255,255,255,0.3)' }}
          >APPLY</button>
        </div>
      </div>
    </div>
  );
}
