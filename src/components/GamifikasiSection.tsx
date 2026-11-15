import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  Check,
  CheckCircle2,
  ClipboardCopy,
  ExternalLink,
  Eye,
  Gamepad2,
  Heart,
  HelpCircle,
  Layers,
  Link2,
  Plus,
  RotateCcw,
  Sliders,
  Trash2,
  XCircle,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/curriculumData';
import { CustomGameEmbed } from '../types';
import { normalizeEmbedUrl } from '../utils/embedHelpers';
import { ShapeDiagram } from './ShapeDiagram';

type PresetShape = 'rumah' | 'bentukL' | 'gelongsor';

type GamifikasiMode = 'makmal' | 'kuiz' | 'embed';
const VALID_MODES: GamifikasiMode[] = ['makmal', 'kuiz', 'embed'];

interface GamifikasiSectionProps {
  customEmbeds: CustomGameEmbed[];
  initialMode?: string;
  onModeChange?: (mode: GamifikasiMode) => void;
  onAddEmbed: (embed: CustomGameEmbed) => void;
  onDeleteEmbed: (id: string) => void;
}

export const GamifikasiSection: React.FC<GamifikasiSectionProps> = ({
  customEmbeds,
  initialMode,
  onModeChange,
  onAddEmbed,
  onDeleteEmbed,
}) => {
  const [mode, setMode] = useState<GamifikasiMode>(() =>
    initialMode && VALID_MODES.includes(initialMode as GamifikasiMode)
      ? (initialMode as GamifikasiMode)
      : 'makmal'
  );
  const [copiedMakmalLink, setCopiedMakmalLink] = useState(false);

  const selectMode = (nextMode: GamifikasiMode) => {
    setMode(nextMode);
    onModeChange?.(nextMode);
  };

  useEffect(() => {
    if (initialMode && VALID_MODES.includes(initialMode as GamifikasiMode)) {
      setMode(initialMode as GamifikasiMode);
    }
  }, [initialMode]);

  // --- MAKMAL GEOMETRI STATE ---
  const [preset, setPreset] = useState<PresetShape>('rumah');
  const [decompose, setDecompose] = useState(true);
  const [highlightPerimeter, setHighlightPerimeter] = useState(true);

  const [dimA, setDimA] = useState(8);
  const [dimB, setDimB] = useState(5);
  const [dimC, setDimC] = useState(4);

  const labCalculations = useMemo(() => {
    if (preset === 'rumah') {
      const halfBase = dimA / 2;
      const slant = Number(
        Math.sqrt(halfBase * halfBase + dimC * dimC).toFixed(1)
      );
      const areaRect = dimA * dimB;
      const areaTri = 0.5 * dimA * dimC;
      const totalArea = Number((areaRect + areaTri).toFixed(1));
      const perimeter = Number((dimA + 2 * dimB + 2 * slant).toFixed(1));
      return {
        tajukBentuk: 'Rumah Mini (Segi Empat Tepat + Segi Tiga)',
        luasA: `${dimA} × ${dimB} = ${areaRect} cm²`,
        luasB: `½ × ${dimA} × ${dimC} = ${areaTri} cm²`,
        jumlahLuas: totalArea,
        perimeterFormula: `${dimA} + ${dimB} + ${dimB} + ${slant} + ${slant}`,
        jumlahPerimeter: perimeter,
        slant,
      };
    }
    if (preset === 'bentukL') {
      const sqSide = Math.min(dimC, dimA - 1);
      const stepWidth = dimA - sqSide;
      const areaSq = sqSide * sqSide;
      const areaRect = dimA * dimB;
      const totalArea = areaSq + areaRect;
      const perimeter = 2 * (dimA + dimB + sqSide);
      return {
        tajukBentuk: 'Bentuk-L (Segi Empat Sama + Segi Empat Tepat)',
        luasA: `${sqSide} × ${sqSide} = ${areaSq} cm²`,
        luasB: `${dimA} × ${dimB} = ${areaRect} cm²`,
        jumlahLuas: totalArea,
        perimeterFormula: `${sqSide} + ${sqSide} + ${stepWidth} + ${dimB} + ${dimA} + ${
          dimB + sqSide
        }`,
        jumlahPerimeter: perimeter,
        slant: sqSide,
      };
    }
    const hypot = Number(Math.sqrt(dimC * dimC + dimB * dimB).toFixed(1));
    const areaSq = dimB * dimB;
    const areaTri = 0.5 * dimC * dimB;
    const totalArea = Number((areaSq + areaTri).toFixed(1));
    const perimeter = Number((dimB + dimB + (dimB + dimC) + hypot).toFixed(1));
    return {
      tajukBentuk:
        'Gelongsor Geometri (Segi Empat Sama + Segi Tiga Bersudut Tegak)',
      luasA: `${dimB} × ${dimB} = ${areaSq} cm²`,
      luasB: `½ × ${dimC} × ${dimB} = ${areaTri} cm²`,
      jumlahLuas: totalArea,
      perimeterFormula: `${dimB} + ${dimB} + (${dimB} + ${dimC}) + ${hypot}`,
      jumlahPerimeter: perimeter,
      slant: hypot,
    };
  }, [preset, dimA, dimB, dimC]);

  // --- KUIZ GAMIFIKASI STATE ---
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [quizDone, setQuizDone] = useState(false);
  const [bestScore, setBestScore] = useState<number>(() => {
    const saved = localStorage.getItem('pulau_geometri_best_score');
    return saved ? Number(saved) : 0;
  });

  // --- EMBED PAUTAN GAMIFIKASI STATE ---
  const [embedTajuk, setEmbedTajuk] = useState('');
  const [embedPlatform, setEmbedPlatform] = useState('Wordwall');
  const [embedUrl, setEmbedUrl] = useState('');
  const [embedDesc, setEmbedDesc] = useState('');
  const [embedIframe, setEmbedIframe] = useState(true);
  const [embedNotice, setEmbedNotice] = useState('');

  const handleCreateEmbed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!embedTajuk.trim() || !embedUrl.trim()) return;

    const newItem: CustomGameEmbed = {
      id: `game-${Date.now()}`,
      tajuk: embedTajuk.trim(),
      platform: embedPlatform,
      penerangan: embedDesc.trim(),
      url: normalizeEmbedUrl(embedUrl),
      paparIframe: embedIframe,
    };
    onAddEmbed(newItem);
    setEmbedTajuk('');
    setEmbedUrl('');
    setEmbedDesc('');
    setEmbedNotice('Pautan gamifikasi anda telah disimpan.');
    window.setTimeout(() => setEmbedNotice(''), 3000);
  };

  const currentQ = QUIZ_QUESTIONS[qIndex];

  const handleAnswer = (optIdx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(optIdx);

    if (optIdx === currentQ.jawapanBetul) {
      const gained = 100 + streak * 25;
      const nextScore = score + gained;
      setScore(nextScore);
      setStreak((s) => s + 1);
      if (nextScore > bestScore) {
        setBestScore(nextScore);
        localStorage.setItem('pulau_geometri_best_score', String(nextScore));
      }
    } else {
      setStreak(0);
      setLives((l) => Math.max(0, l - 1));
    }
  };

  const handleNextQuestion = () => {
    if (lives === 0 || qIndex >= QUIZ_QUESTIONS.length - 1) {
      setQuizDone(true);
      return;
    }
    setQIndex((i) => i + 1);
    setSelectedOpt(null);
    setShowHint(false);
  };

  const handleRestartQuiz = () => {
    setQIndex(0);
    setSelectedOpt(null);
    setShowHint(false);
    setScore(0);
    setStreak(0);
    setLives(3);
    setQuizDone(false);
  };

  const scale = 16;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            Modul 05 · Aktiviti Interaktif &amp; Gamifikasi AI
          </p>
          <h2 className="font-serif-display mt-1 text-3xl text-slate-900 sm:text-4xl">
            Makmal Geometri, Kuiz &amp; Embed Pautan
          </h2>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => selectMode('makmal')}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors sm:text-sm ${
              mode === 'makmal'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="h-4 w-4" />
            Makmal Geometri
          </button>
          <button
            type="button"
            onClick={() => selectMode('kuiz')}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors sm:text-sm ${
              mode === 'kuiz'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="h-4 w-4" />
            Kuiz Misi Pulau
          </button>
          <button
            type="button"
            onClick={() => selectMode('embed')}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors sm:text-sm ${
              mode === 'embed'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Link2 className="h-4 w-4" />
            Embed Pautan ({customEmbeds.length})
          </button>
        </div>
      </div>

      {/* MODE 1: MAKMAL GEOMETRI INTERAKTIF */}
      {mode === 'makmal' && (() => {
        const makmalDirectUrl =
          typeof window !== 'undefined'
            ? `${window.location.origin}/?modul=interaktif&tab=makmal`
            : '/?modul=interaktif&tab=makmal';

        const handleCopyMakmalLink = async () => {
          try {
            await navigator.clipboard.writeText(makmalDirectUrl);
            setCopiedMakmalLink(true);
            window.setTimeout(() => setCopiedMakmalLink(false), 2500);
          } catch {
            // ignore clipboard errors
          }
        };

        return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sky-200 bg-sky-50/70 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-sky-900">
                Pautan Terus Makmal Geometri (Untuk Canva / Perkongsian Murid)
              </p>
              <p className="font-mono-tabular mt-0.5 truncate text-xs text-slate-600">
                {makmalDirectUrl}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handleCopyMakmalLink}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-bold text-white hover:bg-sky-700"
              >
                {copiedMakmalLink ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <ClipboardCopy className="h-3.5 w-3.5" />
                )}
                {copiedMakmalLink ? 'Pautan Disalin!' : 'Salin Pautan'}
              </button>
              <a
                href={makmalDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-bold text-sky-800 hover:bg-sky-50"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Buka
              </a>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {labCalculations.tajukBentuk}
                </h3>
                <p className="text-xs text-slate-500">
                  Ubah dimensi di sebelah kanan dan lihat bentuk serta pengiraan bertukar secara langsung.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setDecompose((d) => !d)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    decompose
                      ? 'border-rose-300 bg-rose-50 text-rose-700'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  {decompose ? 'Garis Pecahan: Hidup' : 'Garis Pecahan: Padam'}
                </button>
                <button
                  type="button"
                  onClick={() => setHighlightPerimeter((h) => !h)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    highlightPerimeter
                      ? 'border-sky-300 bg-sky-50 text-sky-700'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  {highlightPerimeter ? 'Sempadan Perimeter: Aktif' : 'Sempadan: Biasa'}
                </button>
              </div>
            </div>

            <div className="flex min-h-[340px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4">
              <svg viewBox="0 0 420 290" className="h-auto w-full max-w-[400px]">
                <defs>
                  <pattern
                    id="labGrid"
                    width="16"
                    height="16"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 16 0 L 0 0 0 16"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="0.8"
                    />
                  </pattern>
                </defs>
                <rect width="420" height="290" fill="url(#labGrid)" rx="8" />

                {preset === 'rumah' && (() => {
                  const w = dimA * scale;
                  const h = dimB * scale;
                  const th = dimC * scale;
                  const startX = 210 - w / 2;
                  const baseBottomY = 250;
                  const rectTopY = baseBottomY - h;
                  const peakY = rectTopY - th;
                  const gap = decompose ? 10 : 0;

                  return (
                    <g>
                      <rect
                        x={startX}
                        y={rectTopY}
                        width={w}
                        height={h}
                        fill="#bae6fd"
                        stroke={highlightPerimeter ? '#0284c7' : '#334155'}
                        strokeWidth={highlightPerimeter ? 3.5 : 2}
                        className="transition-all duration-300"
                      />
                      <polygon
                        points={`${startX},${rectTopY - gap} 210,${
                          peakY - gap
                        } ${startX + w},${rectTopY - gap}`}
                        fill="#fde68a"
                        stroke={highlightPerimeter ? '#0284c7' : '#334155'}
                        strokeWidth={highlightPerimeter ? 3.5 : 2}
                        strokeLinejoin="round"
                        className="transition-all duration-300"
                      />
                      {decompose && (
                        <>
                          <line
                            x1={210}
                            y1={peakY - gap}
                            x2={210}
                            y2={rectTopY - gap}
                            stroke="#dc2626"
                            strokeWidth="2"
                            strokeDasharray="4 3"
                          />
                          <text
                            x={216}
                            y={(peakY + rectTopY) / 2 - gap}
                            className="fill-red-700 text-[11px] font-bold"
                          >
                            {dimC} cm
                          </text>
                        </>
                      )}
                      <text
                        x={210}
                        y={baseBottomY + 18}
                        textAnchor="middle"
                        className="fill-slate-800 text-[12px] font-bold"
                      >
                        Tapak = {dimA} cm
                      </text>
                      <text
                        x={startX + w + 10}
                        y={rectTopY + h / 2}
                        className="fill-slate-800 text-[12px] font-bold"
                      >
                        {dimB} cm
                      </text>
                      <text
                        x={startX + w * 0.2}
                        y={(peakY + rectTopY) / 2 - gap - 8}
                        textAnchor="end"
                        className="fill-sky-800 text-[11px] font-bold"
                      >
                        {labCalculations.slant} cm
                      </text>
                    </g>
                  );
                })()}

                {preset === 'bentukL' && (() => {
                  const sqSide = Math.min(dimC, dimA - 1);
                  const sqPx = sqSide * scale;
                  const w = dimA * scale;
                  const h = dimB * scale;
                  const startX = 210 - w / 2;
                  const bottomY = 250;
                  const rectTopY = bottomY - h;
                  const gap = decompose ? 10 : 0;

                  return (
                    <g>
                      <rect
                        x={startX}
                        y={rectTopY}
                        width={w}
                        height={h}
                        fill="#bae6fd"
                        stroke={highlightPerimeter ? '#0284c7' : '#334155'}
                        strokeWidth={highlightPerimeter ? 3.5 : 2}
                        className="transition-all duration-300"
                      />
                      <rect
                        x={startX}
                        y={rectTopY - sqPx - gap}
                        width={sqPx}
                        height={sqPx}
                        fill="#fde68a"
                        stroke={highlightPerimeter ? '#0284c7' : '#334155'}
                        strokeWidth={highlightPerimeter ? 3.5 : 2}
                        className="transition-all duration-300"
                      />
                      {!decompose && (
                        <line
                          x1={startX + 2}
                          y1={rectTopY}
                          x2={startX + sqPx - 2}
                          y2={rectTopY}
                          stroke="#bae6fd"
                          strokeWidth="4"
                        />
                      )}
                      <text
                        x={startX + sqPx / 2}
                        y={rectTopY - sqPx - gap - 8}
                        textAnchor="middle"
                        className="fill-slate-800 text-[12px] font-bold"
                      >
                        {sqSide} cm
                      </text>
                      <text
                        x={210}
                        y={bottomY + 18}
                        textAnchor="middle"
                        className="fill-slate-800 text-[12px] font-bold"
                      >
                        {dimA} cm
                      </text>
                      <text
                        x={startX + w + 10}
                        y={rectTopY + h / 2}
                        className="fill-slate-800 text-[12px] font-bold"
                      >
                        {dimB} cm
                      </text>
                    </g>
                  );
                })()}

                {preset === 'gelongsor' && (() => {
                  const sPx = dimB * scale;
                  const triBasePx = dimC * scale;
                  const totalW = sPx + triBasePx;
                  const startX = 210 - totalW / 2;
                  const bottomY = 230;
                  const topY = bottomY - sPx;
                  const gap = decompose ? 12 : 0;

                  return (
                    <g>
                      <rect
                        x={startX}
                        y={topY}
                        width={sPx}
                        height={sPx}
                        fill="#bae6fd"
                        stroke={highlightPerimeter ? '#0284c7' : '#334155'}
                        strokeWidth={highlightPerimeter ? 3.5 : 2}
                        className="transition-all duration-300"
                      />
                      <polygon
                        points={`${startX + sPx + gap},${topY} ${
                          startX + sPx + gap
                        },${bottomY} ${startX + totalW + gap},${bottomY}`}
                        fill="#a7f3d0"
                        stroke={highlightPerimeter ? '#0284c7' : '#334155'}
                        strokeWidth={highlightPerimeter ? 3.5 : 2}
                        strokeLinejoin="round"
                        className="transition-all duration-300"
                      />
                      <text
                        x={startX + sPx / 2}
                        y={bottomY + 18}
                        textAnchor="middle"
                        className="fill-slate-800 text-[12px] font-bold"
                      >
                        {dimB} cm
                      </text>
                      <text
                        x={startX + sPx + gap + triBasePx / 2}
                        y={bottomY + 18}
                        textAnchor="middle"
                        className="fill-slate-800 text-[12px] font-bold"
                      >
                        {dimC} cm
                      </text>
                      <text
                        x={startX - 10}
                        y={topY + sPx / 2}
                        textAnchor="end"
                        className="fill-slate-800 text-[12px] font-bold"
                      >
                        {dimB} cm
                      </text>
                      <text
                        x={startX + sPx + gap + triBasePx / 2 + 12}
                        y={topY + sPx / 2 - 8}
                        className="fill-sky-800 text-[11px] font-bold"
                      >
                        {labCalculations.slant} cm
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                1. Pilih Bentuk Gabungan
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { id: 'rumah' as PresetShape, label: 'Rumah Mini' },
                  { id: 'bentukL' as PresetShape, label: 'Bentuk-L' },
                  { id: 'gelongsor' as PresetShape, label: 'Gelongsor' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreset(item.id)}
                    className={`rounded-lg border px-2.5 py-2 text-xs font-bold transition-colors ${
                      preset === item.id
                        ? 'border-sky-600 bg-sky-600 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                2. Laras Ukuran Dimensi
              </p>

              {preset !== 'gelongsor' && (
                <label className="block">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Panjang Tapak (A)</span>
                    <span className="font-mono-tabular text-sky-700">{dimA} cm</span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={14}
                    value={dimA}
                    onChange={(e) => setDimA(Number(e.target.value))}
                    className="mt-1 w-full accent-sky-600"
                  />
                </label>
              )}

              <label className="block">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>
                    {preset === 'gelongsor'
                      ? 'Sisi Segi Empat Sama'
                      : 'Tinggi Segi Empat Tepat'}
                  </span>
                  <span className="font-mono-tabular text-sky-700">{dimB} cm</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={8}
                  value={dimB}
                  onChange={(e) => setDimB(Number(e.target.value))}
                  className="mt-1 w-full accent-sky-600"
                />
              </label>

              <label className="block">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>
                    {preset === 'rumah'
                      ? 'Tinggi Bumbung Segi Tiga'
                      : preset === 'bentukL'
                      ? 'Sisi Segi Empat Sama Atas'
                      : 'Tapak Segi Tiga'}
                  </span>
                  <span className="font-mono-tabular text-sky-700">{dimC} cm</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={7}
                  value={dimC}
                  onChange={(e) => setDimC(Number(e.target.value))}
                  className="mt-1 w-full accent-sky-600"
                />
              </label>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                3. Pengiraan Secara Langsung
              </p>

              <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-3.5">
                <p className="text-xs font-bold text-sky-900">
                  Perimeter (Sisi Luar Sahaja)
                </p>
                <p className="font-mono-tabular mt-1 text-xs text-slate-700">
                  = {labCalculations.perimeterFormula}
                </p>
                <p className="font-mono-tabular mt-1 text-lg font-bold text-sky-800">
                  = {labCalculations.jumlahPerimeter} cm
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
                <p className="text-xs font-bold text-amber-900">
                  Luas Bentuk Gabungan (A + B)
                </p>
                <p className="font-mono-tabular mt-1 text-xs text-slate-700">
                  Luas A = {labCalculations.luasA}
                </p>
                <p className="font-mono-tabular text-xs text-slate-700">
                  Luas B = {labCalculations.luasB}
                </p>
                <p className="font-mono-tabular mt-1 text-lg font-bold text-amber-900">
                  Jumlah Luas = {labCalculations.jumlahLuas} cm²
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
        );
      })()}

      {/* MODE 2: KUIZ GAMIFIKASI */}
      {mode === 'kuiz' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-4">
              <span className="font-mono-tabular text-sm font-bold text-slate-900">
                Soalan {qIndex + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {currentQ.kategori} · Tahap {currentQ.tahap}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1" aria-label={`Nyawa: ${lives}`}>
                {[1, 2, 3].map((h) => (
                  <Heart
                    key={h}
                    className={`h-4 w-4 ${
                      h <= lives
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <div className="font-mono-tabular text-xs font-bold text-amber-700">
                Rentetan: {streak}x
              </div>
              <div className="font-mono-tabular rounded-lg bg-sky-50 px-3 py-1 text-sm font-bold text-sky-800">
                Markah: {score}
              </div>
            </div>
          </div>

          {!quizDone ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
              <div>
                <ShapeDiagram type={currentQ.shapeType} />
                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowHint((h) => !h)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800"
                  >
                    <HelpCircle className="h-4 w-4" />
                    {showHint ? 'Tutup Petunjuk' : 'Buka Petunjuk Formula'}
                  </button>
                  <span className="font-mono-tabular text-xs text-slate-500">
                    Rekod Terbaik: {bestScore}
                  </span>
                </div>
                {showHint && (
                  <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-medium text-amber-900">
                    Petunjuk: {currentQ.petunjuk}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold leading-snug text-slate-900">
                    {currentQ.soalan}
                  </h3>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {currentQ.pilihan.map((opt, idx) => {
                      const isPicked = selectedOpt === idx;
                      const isCorrect = idx === currentQ.jawapanBetul;
                      let btnStyle =
                        'border-slate-200 bg-white text-slate-800 hover:border-sky-300 hover:bg-sky-50/40';
                      if (selectedOpt !== null) {
                        if (isCorrect) {
                          btnStyle =
                            'border-emerald-500 bg-emerald-50 text-emerald-900';
                        } else if (isPicked) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                        } else {
                          btnStyle = 'border-slate-200 bg-slate-50 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={selectedOpt !== null}
                          onClick={() => handleAnswer(idx)}
                          className={`font-mono-tabular flex items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left text-sm font-bold transition-colors ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {selectedOpt !== null && isCorrect && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          )}
                          {selectedOpt !== null && isPicked && !isCorrect && (
                            <XCircle className="h-4 w-4 text-rose-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOpt !== null && (
                    <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p
                        className={`text-sm font-bold ${
                          selectedOpt === currentQ.jawapanBetul
                            ? 'text-emerald-700'
                            : 'text-rose-700'
                        }`}
                      >
                        {selectedOpt === currentQ.jawapanBetul
                          ? 'Syabas! Jawapan anda tepat.'
                          : 'Jawapan kurang tepat. Semak langkah penyelesaian di bawah:'}
                      </p>
                      <ul className="mt-2 space-y-1 text-xs leading-relaxed text-slate-700">
                        {currentQ.langkahPenyelesaian.map((step, i) => (
                          <li key={i}>• {step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {selectedOpt !== null && (
                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-sky-700"
                    >
                      {lives === 0 || qIndex >= QUIZ_QUESTIONS.length - 1
                        ? 'Lihat Keputusan Akhir'
                        : 'Soalan Seterusnya'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-lg py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f6f03b] text-[#161c08] shadow">
                <Award className="h-9 w-9" />
              </div>
              <h3 className="font-serif-display mt-4 text-3xl text-slate-900">
                Misi Pulau Geometri Tamat!
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Pangkat Anda:{' '}
                <strong className="text-sky-700">
                  {score >= 700
                    ? 'Jaguh Geometri Terbilang'
                    : score >= 400
                    ? 'Peneroka Geometri Mahir'
                    : 'Perantis Geometri'}
                </strong>
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="text-xs text-slate-500">Markah Akhir</p>
                  <p className="font-mono-tabular text-2xl font-bold text-slate-900">
                    {score}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Rekod Terbaik</p>
                  <p className="font-mono-tabular text-2xl font-bold text-sky-700">
                    {bestScore}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRestartQuiz}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 text-sm font-bold text-white hover:bg-sky-700"
              >
                <RotateCcw className="h-4 w-4" />
                Main Semula Kuiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: EMBED PAUTAN GAMIFIKASI PENGGUNA */}
      {mode === 'embed' && (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          <form
            onSubmit={handleCreateEmbed}
            className="h-fit rounded-xl border border-slate-200 bg-white p-6"
          >
            <h3 className="text-lg font-bold text-slate-900">
              Embed Pautan Aplikasi Gamifikasi Anda
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Masukkan pautan kuiz atau permainan luar yang anda bina (contoh: Wordwall, Kahoot, Quizizz, Blooket, Genially, Canva, atau pautan web AI lain).
            </p>

            {embedNotice && (
              <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                {embedNotice}
              </div>
            )}

            <div className="mt-4 space-y-3.5">
              <label className="block text-xs font-semibold text-slate-700">
                Tajuk Permainan / Kuiz
                <input
                  type="text"
                  required
                  value={embedTajuk}
                  onChange={(e) => setEmbedTajuk(e.target.value)}
                  placeholder="Contoh: Cabaran Wordwall Perimeter Bentuk Gabungan"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                Platform
                <select
                  value={embedPlatform}
                  onChange={(e) => setEmbedPlatform(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                >
                  <option value="Wordwall">Wordwall</option>
                  <option value="Quizizz">Quizizz</option>
                  <option value="Kahoot">Kahoot</option>
                  <option value="Genially">Genially</option>
                  <option value="Blooket">Blooket</option>
                  <option value="Canva">Canva Interaktif</option>
                  <option value="Aplikasi AI / Web Lain">Aplikasi AI / Web Lain</option>
                </select>
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                Pautan / URL Embed
                <input
                  type="url"
                  required
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  placeholder="https://wordwall.net/embed/..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                Arahan Ringkas Murid (Pilihan)
                <textarea
                  rows={2}
                  value={embedDesc}
                  onChange={(e) => setEmbedDesc(e.target.value)}
                  placeholder="Contoh: Masukkan nama kelas sebelum mula bermain..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={embedIframe}
                  onChange={(e) => setEmbedIframe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-sky-600"
                />
                Papar terus dalam bingkai (iframe) di halaman ini
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-700"
              >
                <Plus className="h-4 w-4" />
                Tambah Pautan Gamifikasi
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Senarai Gamifikasi Terbenam ({customEmbeds.length})
            </h3>

            {customEmbeds.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <Link2 className="mx-auto h-9 w-9 text-slate-300" />
                <p className="mt-3 text-sm font-bold text-slate-800">
                  Tiada pautan gamifikasi ditambah lagi
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Tampal URL Wordwall, Kahoot, Quizizz atau aplikasi kuiz AI anda pada borang di sebelah kiri untuk memaparkannya di sini.
                </p>
              </div>
            ) : (
              customEmbeds.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-sky-700">
                        {item.platform}
                      </p>
                      <h4 className="mt-0.5 text-base font-bold text-slate-900">
                        {item.tajuk}
                      </h4>
                      {item.penerangan && (
                        <p className="mt-1 text-sm text-slate-600">
                          {item.penerangan}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteEmbed(item.id)}
                      aria-label={`Padam ${item.tajuk}`}
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {item.paparIframe && (
                    <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <iframe
                        src={item.url}
                        title={item.tajuk}
                        allowFullScreen
                        className="h-80 w-full"
                      />
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <span className="truncate text-xs text-slate-400 max-w-xs">
                      {item.url}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Buka Permainan
                    </a>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
};
