import React from 'react';
import { QuizQuestion, WorksheetProblem } from '../types';

type DiagramType =
  | QuizQuestion['shapeType']
  | WorksheetProblem['shapeType'];

interface ShapeDiagramProps {
  type: DiagramType;
  showDecomposition?: boolean;
  className?: string;
}

export const ShapeDiagram: React.FC<ShapeDiagramProps> = ({
  type,
  showDecomposition = true,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/90 p-4 ${className}`}
    >
      <svg
        viewBox="0 0 360 220"
        className="h-auto w-full max-w-[340px]"
        role="img"
        aria-label="Rajah bentuk gabungan dua dimensi"
      >
        <defs>
          <pattern
            id="gridPattern"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="360" height="220" fill="url(#gridPattern)" rx="8" />

        {/* 1. L-shape perimeter / l-shape worksheet (4x4 square atop 10x4 rect) */}
        {(type === 'l-shape-perimeter' || type === 'l-shape') && (
          <g transform="translate(80, 35)">
            <path
              d="M 0 0 L 80 0 L 80 80 L 200 80 L 200 150 L 0 150 Z"
              fill="#bae6fd"
              stroke="#0369a1"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {showDecomposition && (
              <line
                x1="0"
                y1="80"
                x2="80"
                y2="80"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            )}
            {/* Labels */}
            <text x="40" y="-8" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              4 cm
            </text>
            <text x="95" y="45" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
              4 cm
            </text>
            <text x="212" y="120" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
              4 cm
            </text>
            <text x="100" y="170" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              10 cm
            </text>
            <text x="-10" y="80" textAnchor="end" className="fill-slate-800 text-[12px] font-semibold">
              8 cm
            </text>
            <text x="140" y="72" textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold">
              ? (6 cm)
            </text>
          </g>
        )}

        {/* 2. House area (10x6 rect + triangle base 10, height 4) */}
        {type === 'house-area' && (
          <g transform="translate(80, 28)">
            <rect
              x="0"
              y="70"
              width="200"
              height="95"
              fill="#fde68a"
              stroke="#b45309"
              strokeWidth="2.5"
            />
            <polygon
              points="0,70 100,5 200,70"
              fill="#fed7aa"
              stroke="#b45309"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {showDecomposition && (
              <>
                <line
                  x1="100"
                  y1="5"
                  x2="100"
                  y2="70"
                  stroke="#dc2626"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />
                <rect x="100" y="58" width="12" height="12" fill="none" stroke="#dc2626" strokeWidth="1.5" />
              </>
            )}
            <text x="100" y="185" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              10 cm
            </text>
            <text x="212" y="120" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
              6 cm
            </text>
            <text x="108" y="44" textAnchor="start" className="fill-red-700 text-[12px] font-semibold">
              4 cm
            </text>
          </g>
        )}

        {/* 3. House perimeter (6x6 square + equilateral triangle 6cm) */}
        {type === 'house-perimeter' && (
          <g transform="translate(115, 25)">
            <rect
              x="0"
              y="80"
              width="120"
              height="100"
              fill="#d9f99d"
              stroke="#3f6212"
              strokeWidth="2.5"
            />
            <polygon
              points="0,80 60,5 120,80"
              fill="#bef264"
              stroke="#3f6212"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {showDecomposition && (
              <line
                x1="0"
                y1="80"
                x2="120"
                y2="80"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            )}
            <text x="20" y="40" textAnchor="end" className="fill-slate-800 text-[12px] font-semibold">
              6 cm
            </text>
            <text x="100" y="40" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
              6 cm
            </text>
            <text x="-10" y="132" textAnchor="end" className="fill-slate-800 text-[12px] font-semibold">
              6 cm
            </text>
            <text x="130" y="132" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
              6 cm
            </text>
            <text x="60" y="196" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              6 cm
            </text>
          </g>
        )}

        {/* 4. L-shape area (5x5 square + 9x4 rect) */}
        {type === 'l-shape-area' && (
          <g transform="translate(70, 32)">
            <rect
              x="0"
              y="0"
              width="80"
              height="80"
              fill="#c7d2fe"
              stroke="#3730a3"
              strokeWidth="2.5"
            />
            <rect
              x="0"
              y="80"
              width="190"
              height="70"
              fill="#a5b4fc"
              stroke="#3730a3"
              strokeWidth="2.5"
            />
            {showDecomposition && (
              <line
                x1="0"
                y1="80"
                x2="80"
                y2="80"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
            )}
            <text x="40" y="-8" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              5 cm
            </text>
            <text x="-10" y="45" textAnchor="end" className="fill-slate-800 text-[12px] font-semibold">
              5 cm
            </text>
            <text x="95" y="168" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              9 cm
            </text>
            <text x="200" y="120" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
              4 cm
            </text>
            <text x="40" y="45" textAnchor="middle" className="fill-indigo-950 text-[12px] font-bold">
              A
            </text>
            <text x="95" y="120" textAnchor="middle" className="fill-indigo-950 text-[12px] font-bold">
              B
            </text>
          </g>
        )}

        {/* 5 & 6. Rect/Square + Right triangle */}
        {(type === 'rect-tri-area' ||
          type === 'rect-tri-perimeter' ||
          type === 'trapezoid-like') && (
          <g transform="translate(65, 42)">
            <rect
              x="0"
              y="0"
              width="120"
              height="120"
              fill="#bae6fd"
              stroke="#0369a1"
              strokeWidth="2.5"
            />
            <polygon
              points="120,0 120,120 220,120"
              fill="#fde047"
              stroke="#0369a1"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {showDecomposition && (
              <line
                x1="120"
                y1="0"
                x2="120"
                y2="120"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            )}
            <rect x="120" y="108" width="12" height="12" fill="none" stroke="#0369a1" strokeWidth="1.5" />
            <text x="60" y="-10" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              {type === 'trapezoid-like' ? '6 cm' : '8 cm'}
            </text>
            <text x="-10" y="64" textAnchor="end" className="fill-slate-800 text-[12px] font-semibold">
              {type === 'trapezoid-like' ? '6 cm' : '8 cm'}
            </text>
            <text x="60" y="138" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              {type === 'trapezoid-like' ? '6 cm' : '8 cm'}
            </text>
            <text x="170" y="138" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              {type === 'trapezoid-like' ? '8 cm' : '6 cm'}
            </text>
            {(type === 'rect-tri-perimeter' || type === 'trapezoid-like') && (
              <text x="180" y="55" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
                10 cm
              </text>
            )}
          </g>
        )}

        {/* 7. Three shapes area (12x5 rect + 4x4 square top + 4x5 right triangle) */}
        {type === 'three-shapes-area' && (
          <g transform="translate(50, 38)">
            <rect
              x="25"
              y="0"
              width="58"
              height="58"
              fill="#fde68a"
              stroke="#0f766e"
              strokeWidth="2.5"
            />
            <rect
              x="0"
              y="58"
              width="175"
              height="74"
              fill="#99f6e4"
              stroke="#0f766e"
              strokeWidth="2.5"
            />
            <polygon
              points="175,58 175,132 238,132"
              fill="#a7f3d0"
              stroke="#0f766e"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {showDecomposition && (
              <>
                <line x1="25" y1="58" x2="83" y2="58" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
                <line x1="175" y1="58" x2="175" y2="132" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
              </>
            )}
            <text x="54" y="-8" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              4 cm
            </text>
            <text x="92" y="34" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
              4 cm
            </text>
            <text x="-8" y="98" textAnchor="end" className="fill-slate-800 text-[12px] font-semibold">
              5 cm
            </text>
            <text x="87" y="150" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              12 cm
            </text>
            <text x="206" y="150" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              4 cm
            </text>
          </g>
        )}

        {/* 8. Cutout perimeter (12x7 rect minus 3x3 corner) */}
        {type === 'cutout-perimeter' && (
          <g transform="translate(75, 42)">
            <path
              d="M 0 0 L 155 0 L 155 48 L 205 48 L 205 120 L 0 120 Z"
              fill="#fecdd3"
              stroke="#be123c"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M 155 0 L 205 0 L 205 48"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.8"
              strokeDasharray="5 4"
            />
            <text x="102" y="138" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              12 cm
            </text>
            <text x="-10" y="64" textAnchor="end" className="fill-slate-800 text-[12px] font-semibold">
              7 cm
            </text>
            <text x="180" y="-8" textAnchor="middle" className="fill-slate-500 text-[11px] font-semibold">
              3 cm (dipotong)
            </text>
            <text x="215" y="28" textAnchor="start" className="fill-slate-500 text-[11px] font-semibold">
              3 cm
            </text>
            <text x="77" y="-8" textAnchor="middle" className="fill-rose-800 text-[12px] font-semibold">
              9 cm
            </text>
            <text x="215" y="88" textAnchor="start" className="fill-rose-800 text-[12px] font-semibold">
              4 cm
            </text>
          </g>
        )}

        {/* Worksheet House (8x5 rect + roof base 8, h 3, slant 5) */}
        {type === 'house' && (
          <g transform="translate(95, 32)">
            <rect
              x="0"
              y="65"
              width="170"
              height="95"
              fill="#fde68a"
              stroke="#b45309"
              strokeWidth="2.5"
            />
            <polygon
              points="0,65 85,5 170,65"
              fill="#fed7aa"
              stroke="#b45309"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <line x1="85" y1="5" x2="85" y2="65" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
            <text x="85" y="178" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              8 cm
            </text>
            <text x="180" y="116" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
              5 cm
            </text>
            <text x="92" y="42" textAnchor="start" className="fill-red-700 text-[12px] font-semibold">
              3 cm
            </text>
            <text x="32" y="30" textAnchor="end" className="fill-slate-800 text-[12px] font-semibold">
              5 cm
            </text>
            <text x="138" y="30" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
              5 cm
            </text>
          </g>
        )}

        {/* Worksheet Banner (12x4 rect + 3x3 square bottom right) */}
        {type === 'banner' && (
          <g transform="translate(65, 42)">
            <path
              d="M 0 0 L 220 0 L 220 125 L 165 125 L 165 72 L 0 72 Z"
              fill="#d9f99d"
              stroke="#3f6212"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {showDecomposition && (
              <line
                x1="165"
                y1="72"
                x2="220"
                y2="72"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
            )}
            <text x="110" y="-10" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              12 cm
            </text>
            <text x="-10" y="40" textAnchor="end" className="fill-slate-800 text-[12px] font-semibold">
              4 cm
            </text>
            <text x="230" y="65" textAnchor="start" className="fill-slate-800 text-[12px] font-semibold">
              7 cm
            </text>
            <text x="192" y="143" textAnchor="middle" className="fill-slate-800 text-[12px] font-semibold">
              3 cm
            </text>
            <text x="155" y="102" textAnchor="end" className="fill-slate-800 text-[12px] font-semibold">
              3 cm
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
