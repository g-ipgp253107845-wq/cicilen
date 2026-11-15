import React from 'react';

interface HighlighterSwipeProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
  variant?: 'wide' | 'compact';
}

export const HighlighterSwipe: React.FC<HighlighterSwipeProps> = ({
  children,
  className = '',
  rotation = -1.5,
  variant = 'wide',
}) => {
  return (
    <span
      className={`relative inline-block font-bold tracking-[-0.02em] text-[#161c08] px-3 py-0.5 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <svg
        aria-hidden="true"
        viewBox={variant === 'wide' ? '0 0 260 56' : '0 0 180 52'}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full highlighter-bleed"
      >
        {variant === 'wide' ? (
          <path
            d="M7 11 C42 5, 118 8, 184 5 C218 4, 245 7, 255 12 L251 22 L257 31 L249 44 C205 49, 134 45, 72 49 C38 51, 14 47, 4 42 L9 30 L3 21 Z"
            fill="#f6f03b"
          />
        ) : (
          <path
            d="M5 10 C34 6, 92 7, 145 5 C162 4, 173 8, 177 13 L173 24 L176 34 L170 43 C135 47, 74 45, 32 47 C16 48, 7 44, 3 39 L7 28 L2 19 Z"
            fill="#f6f03b"
          />
        )}
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
};
