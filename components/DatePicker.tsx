'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  value: string; // YYYY.MM.DD
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function parseDate(str: string): Date | null {
  const m = str.match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export default function DatePicker({ value, onChange, style }: Props) {
  const parsed = parseDate(value);
  const today = new Date();

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState((parsed ?? today).getFullYear());
  const [viewMonth, setViewMonth] = useState((parsed ?? today).getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = parseDate(value);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const select = (day: number) => {
    onChange(formatDate(new Date(viewYear, viewMonth, day)));
    setOpen(false);
  };

  const isSelected = (day: number) =>
    selected &&
    selected.getFullYear() === viewYear &&
    selected.getMonth() === viewMonth &&
    selected.getDate() === day;

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  return (
    <div ref={ref} style={{ position: 'relative', ...style }}>
      <input
        readOnly
        value={value}
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(204,0,0,0.3)',
          color: '#fff',
          padding: '8px 12px',
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: '14px',
          width: '100%',
          outline: 'none',
          borderRadius: '2px',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      />

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          zIndex: 1000,
          background: '#1a1a1a',
          border: '1px solid rgba(204,0,0,0.4)',
          borderRadius: '4px',
          padding: '12px',
          width: '240px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <button onClick={prevMonth} style={navBtn}>‹</button>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '2px', color: '#fff' }}>
              {viewYear}.{String(viewMonth + 1).padStart(2, '0')}
            </span>
            <button onClick={nextMonth} style={navBtn}>›</button>
          </div>

          {/* Day labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
            {DAYS.map((d, i) => (
              <div key={d} style={{
                textAlign: 'center',
                fontSize: '11px',
                fontFamily: "'Noto Sans KR', sans-serif",
                color: i === 0 ? '#CC0000' : i === 6 ? '#4488ff' : 'rgba(255,255,255,0.4)',
                padding: '2px 0',
              }}>{d}</div>
            ))}
          </div>

          {/* Cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {cells.map((day, i) => {
              const col = i % 7;
              return (
                <button
                  key={i}
                  disabled={day === null}
                  onClick={() => day && select(day)}
                  style={{
                    background: day && isSelected(day) ? '#CC0000' : 'transparent',
                    color: day === null ? 'transparent'
                      : isSelected(day) ? '#fff'
                      : isToday(day) ? '#FF4444'
                      : col === 0 ? 'rgba(204,80,80,0.8)'
                      : col === 6 ? 'rgba(100,150,255,0.8)'
                      : 'rgba(255,255,255,0.85)',
                    border: day && isToday(day) && !isSelected(day) ? '1px solid rgba(204,0,0,0.5)' : '1px solid transparent',
                    borderRadius: '3px',
                    padding: '5px 0',
                    fontSize: '13px',
                    fontFamily: "'Noto Sans KR', sans-serif",
                    cursor: day ? 'pointer' : 'default',
                    textAlign: 'center',
                  }}
                >
                  {day ?? ''}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const navBtn: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '0 8px',
  lineHeight: 1,
};
