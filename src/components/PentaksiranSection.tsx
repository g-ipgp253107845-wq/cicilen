import React, { useState } from 'react';
import {
  CheckCircle2,
  ClipboardCheck,
  FileSpreadsheet,
  Hand,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  RUBRIC_TP_LEVELS,
  WORKSHEET_PROBLEMS,
} from '../data/curriculumData';
import { ShapeDiagram } from './ShapeDiagram';

export const PentaksiranSection: React.FC = () => {
  const [inputs, setInputs] = useState<
    Record<string, { perimeter: string; luas: string }>
  >({});
  const [checked, setChecked] = useState(false);
  const [selectedTp, setSelectedTp] = useState(2);

  const handleChange = (
    id: string,
    field: 'perimeter' | 'luas',
    value: string
  ) => {
    setInputs((prev) => ({
      ...prev,
      [id]: {
        perimeter: field === 'perimeter' ? value : prev[id]?.perimeter || '',
        luas: field === 'luas' ? value : prev[id]?.luas || '',
      },
    }));
  };

  const totalScore = WORKSHEET_PROBLEMS.reduce((acc, prob) => {
    const val = inputs[prob.id];
    const pOk = Number(val?.perimeter) === prob.jawapanPerimeter ? 1 : 0;
    const lOk = Number(val?.luas) === prob.jawapanLuas ? 1 : 0;
    return acc + pOk + lOk;
  }, 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
          Modul 04 · Pentaksiran Formatif &amp; Sumatif
        </p>
        <h2 className="font-serif-display mt-1 text-3xl text-slate-900 sm:text-4xl">
          Pentaksiran Digital &amp; Bukan Digital
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Penilaian menyeluruh bagi menguji penguasaan SP 6.3.1 melalui lembaran kerja digital semakan automatik serta tugasan amali luar talian berpandukan rubrik KSSR Semakan.
        </p>
      </div>

      {/* Bahagian A: Pentaksiran Digital */}
      <div className="mb-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-sky-600" />
            <h3 className="text-xl font-bold text-slate-900">
              Bahagian A: Pentaksiran Secara Digital (Lembaran Kerja Interaktif)
            </h3>
          </div>
          {checked && (
            <span className="font-mono-tabular rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-bold text-sky-800">
              Skor Anda: {totalScore} / {WORKSHEET_PROBLEMS.length * 2}
            </span>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {WORKSHEET_PROBLEMS.map((prob) => {
            const val = inputs[prob.id] || { perimeter: '', luas: '' };
            const pCorrect = Number(val.perimeter) === prob.jawapanPerimeter;
            const lCorrect = Number(val.luas) === prob.jawapanLuas;

            return (
              <div
                key={prob.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {prob.tajuk}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {prob.arahan}
                  </p>
                  <ShapeDiagram type={prob.shapeType} className="mt-4" />
                </div>

                <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">
                        Perimeter (cm)
                      </span>
                      <input
                        type="number"
                        value={val.perimeter}
                        onChange={(e) =>
                          handleChange(prob.id, 'perimeter', e.target.value)
                        }
                        placeholder="cth: 36"
                        className="font-mono-tabular mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">
                        Luas (cm²)
                      </span>
                      <input
                        type="number"
                        value={val.luas}
                        onChange={(e) =>
                          handleChange(prob.id, 'luas', e.target.value)
                        }
                        placeholder="cth: 56"
                        className="font-mono-tabular mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                      />
                    </label>
                  </div>

                  {checked && (
                    <div className="space-y-1.5 rounded-lg bg-slate-50 p-3 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold">
                        {pCorrect ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-rose-600" />
                        )}
                        <span
                          className={
                            pCorrect ? 'text-emerald-700' : 'text-rose-700'
                          }
                        >
                          {prob.penjelasanPerimeter}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold">
                        {lCorrect ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-rose-600" />
                        )}
                        <span
                          className={
                            lCorrect ? 'text-emerald-700' : 'text-rose-700'
                          }
                        >
                          {prob.penjelasanLuas}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setChecked(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-700"
          >
            <ClipboardCheck className="h-4 w-4" />
            Semak Semua Jawapan
          </button>
          <button
            type="button"
            onClick={() => {
              setInputs({});
              setChecked(false);
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Set Semula
          </button>
        </div>
      </div>

      {/* Bahagian B: Pentaksiran Bukan Digital */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-2">
          <Hand className="h-5 w-5 text-amber-600" />
          <h3 className="text-xl font-bold text-slate-900">
            Bahagian B: Pentaksiran Bukan Digital (Amali &amp; Hands-On)
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
              Tugasan Amali 1 · Individu / Berpasangan
            </p>
            <h4 className="mt-1 text-base font-bold text-slate-900">
              Projek “Pelan Lantai Rumah Impian” (Kertas Grid 1 cm²)
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <strong>Bahan:</strong> Kertas grid 1 cm², kertas warna, gunting, gam dan pembaris.
              </li>
              <li>
                <strong>Langkah 1:</strong> Gunting sekurang-kurangnya 1 segi empat tepat, 1 segi empat sama, dan 1 segi tiga daripada kertas warna.
              </li>
              <li>
                <strong>Langkah 2:</strong> Cantumkan di atas kertas grid untuk membentuk satu pelan lantai rumah gabungan 2D.
              </li>
              <li>
                <strong>Langkah 3:</strong> Ukur semua sisi luar menggunakan pembaris untuk mengira perimeter dan hitung jumlah luas dengan membilang petak grid serta mengesahkan menggunakan formula.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
              Tugasan Amali 2 · Berkumpulan
            </p>
            <h4 className="mt-1 text-base font-bold text-slate-900">
              Aktiviti Stesen “Gallery Walk” Kad Bentuk Gabungan
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <strong>Pelaksanaan:</strong> Setiap kumpulan menyelesaikan 1 kad cabaran berbeza di atas kertas sebak (mahjong).
              </li>
              <li>
                <strong>Semakan Rakan Sebaya:</strong> Kumpulan lain bergerak dari stesen ke stesen sambil menampal nota pelekat untuk mengesahkan langkah pecahan bentuk dan unit jawapan.
              </li>
              <li>
                <strong>Pentaksiran Lisan:</strong> Guru menyoal sebab sisi dalam tidak dikira dalam perimeter bagi menilai kefahaman konseptual (TP3–TP6).
              </li>
            </ul>
          </div>
        </div>

        {/* Rubrik Pemarkahan TP1-TP6 */}
        <div className="mt-8 border-t border-slate-200 pt-6">
          <h4 className="text-base font-bold text-slate-900">
            Rubrik Tahap Penguasaan (TP 1 – TP 6) KSSR Semakan
          </h4>
          <p className="mt-1 text-sm text-slate-600">
            Pilih tahap penguasaan untuk melihat tafsiran dan indikator pentaksiran murid:
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {RUBRIC_TP_LEVELS.map((item, idx) => (
              <button
                key={item.tp}
                type="button"
                onClick={() => setSelectedTp(idx)}
                className={`rounded-lg border px-4 py-2 text-xs font-bold transition-colors ${
                  selectedTp === idx
                    ? 'border-sky-600 bg-sky-600 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.tp}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50/60 p-5">
            <p className="text-xs font-bold uppercase text-sky-800">
              {RUBRIC_TP_LEVELS[selectedTp].tp}
            </p>
            <p className="mt-1 text-base font-bold text-slate-900">
              {RUBRIC_TP_LEVELS[selectedTp].tafsiran}
            </p>
            <p className="mt-1.5 text-sm text-slate-700">
              <strong>Indikator Pemerhatian Guru:</strong>{' '}
              {RUBRIC_TP_LEVELS[selectedTp].indikator}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
