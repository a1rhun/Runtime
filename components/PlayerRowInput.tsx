'use client';

import { useState, useRef, useEffect, forwardRef } from 'react';
import { searchByNum, searchByName, findByNum, findByName, PlayerProfile } from '@/lib/playerDb';

interface Props {
  num: string;
  name: string;
  onNumChange: (num: string) => void;
  onNameChange: (name: string) => void;
  onSelect: (profile: PlayerProfile) => void;
  onClear: () => void;
  onTabNext?: () => void;
  inputStyle: React.CSSProperties;
}

const PlayerRowInput = forwardRef<HTMLInputElement, Props>(
  ({ num, name, onNumChange, onNameChange, onSelect, onClear, onTabNext, inputStyle }, ref) => {
    const [suggestions, setSuggestions] = useState<PlayerProfile[]>([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node))
          setSuggestions([]);
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleNumChange = (val: string) => {
      onNumChange(val);
      setActiveIndex(-1);
      if (!val) { onNameChange(''); setSuggestions([]); return; }
      const exact = findByNum(val);
      if (exact) { onNameChange(exact.name); setSuggestions([]); return; }
      setSuggestions(searchByNum(val));
    };

    const handleNameChange = (val: string) => {
      onNameChange(val);
      setActiveIndex(-1);
      const exact = findByName(val);
      if (exact) { onNumChange(exact.num); setSuggestions([]); return; }
      setSuggestions(searchByName(val));
    };

    const handleSelect = (profile: PlayerProfile) => {
      onSelect(profile);
      setSuggestions([]);
      setActiveIndex(-1);
    };

    const handleNumKeyDown = (e: React.KeyboardEvent) => {
      if (suggestions.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (activeIndex >= 0) handleSelect(suggestions[activeIndex]);
        } else if (e.key === 'Escape') {
          setSuggestions([]);
          setActiveIndex(-1);
        } else if (e.key === 'Tab') {
          e.preventDefault();
          setSuggestions([]);
          onTabNext?.();
        }
      } else {
        if (e.key === 'Tab') {
          e.preventDefault();
          onTabNext?.();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          onTabNext?.();
        }
      }
    };

    const handleNameKeyDown = (e: React.KeyboardEvent) => {
      if (suggestions.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0) handleSelect(suggestions[activeIndex]);
      } else if (e.key === 'Escape') {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };

    return (
      <div ref={containerRef} style={{ position: 'relative' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <input
            ref={ref}
            style={{ ...inputStyle, width: '52px', flexShrink: 0, textAlign: 'center' }}
            value={num}
            placeholder="#"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => handleNumChange(e.target.value)}
            onFocus={() => { if (num) setSuggestions(searchByNum(num)); }}
            onKeyDown={handleNumKeyDown}
          />
          <input
            style={{ ...inputStyle, flex: 1 }}
            value={name}
            placeholder="이름"
            tabIndex={-1}
            onChange={(e) => handleNameChange(e.target.value)}
            onFocus={() => { if (name) setSuggestions(searchByName(name)); }}
            onKeyDown={handleNameKeyDown}
          />
          <button
            onClick={onClear}
            title="초기화"
            tabIndex={-1}
            style={{
              flexShrink: 0,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.3)',
              borderRadius: '2px',
              width: '30px',
              cursor: 'pointer',
              fontSize: '14px',
              lineHeight: 1,
              padding: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(204,0,0,0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            ✕
          </button>
        </div>

        {suggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 2px)',
            left: 0,
            right: 0,
            zIndex: 500,
            background: '#1a1a1a',
            border: '1px solid rgba(204,0,0,0.4)',
            borderRadius: '3px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          }}>
            {suggestions.map((p, i) => (
              <button
                key={p.num}
                onMouseDown={(e) => { e.preventDefault(); handleSelect(p); }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(-1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '8px 12px',
                  background: i === activeIndex ? 'rgba(204,0,0,0.2)' : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#fff',
                }}
              >
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: '#CC0000', width: '28px', flexShrink: 0 }}>
                  {p.num}
                </span>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: '14px', fontWeight: 700 }}>
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

PlayerRowInput.displayName = 'PlayerRowInput';

export default PlayerRowInput;
