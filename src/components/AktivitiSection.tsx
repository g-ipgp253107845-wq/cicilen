import React, { useState } from 'react';
import {
  CheckCircle2,
  Compass,
  FileText,
  Layers,
  PencilLine,
  Sparkles,
} from 'lucide-react';
import { AssurePhase, SiteTemplateConfig } from '../types';

interface AktivitiSectionProps {
  templateConfig: SiteTemplateConfig;
  assurePhases: AssurePhase[];
  editMode: boolean;
  onUpdateConfig: (next: SiteTemplateConfig) => void;
  onUpdateAssurePhases: (next: AssurePhase[]) => void;
}

const ATTACHED_RPH_PDF_URL =
  '/assets/aistudio/CARRIEYLEN_INJAN_ANAK_STEWARD__2__0afe1835.pdf';

export const AktivitiSection: React.FC<AktivitiSectionProps> = ({
  templateConfig,
  assurePhases,
  editMode,
  onUpdateConfig,
  onUpdateAssurePhases,
}) => {
  const [selectedAssure, setSelectedAssure] = useState(0);
  const [induksiChoice, setInduksiChoice] = useState<string | null>(null);
  const [exitAnswer, setExitAnswer] = useState<number | null>(null);
  const [localEdit, setLocalEdit] = useState(false);
  const [showOriginalPdf, setShowOriginalPdf] = useState(false);

  const isEditing = editMode || localEdit;
  const activePhase = assurePhases[selectedAssure];

  const handleUpdatePhaseField = (
    field: 'nama' | 'ringkasan',
    value: string
  ) => {
    const updated = assurePhases.map((p, idx) =>
      idx === selectedAssure ? { ...p, [field]: value } : p
    );
    onUpdateAssurePhases(updated);
  };

  const handleUpdateBullet = (bulletIdx: number, value: string) => {
    const updated = assurePhases.map((p, idx) => {
      if (idx !== selectedAssure) return p;
      const nextBullets = [...p.butiran];
      nextBullets[bulletIdx] = value;
      return { ...p, butiran: nextBullets };
    });
    onUpdateAssurePhases(updated);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            Modul 03 · Aliran RPH Berintegrasikan Model ASSURE
          </p>
          <h2 className="font-serif-display mt-1 text-3xl text-slate-900 sm:text-4xl">
            Aktiviti Pembelajaran Bermakna
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Berdasarkan RPH Matematik Tahun 5 (Kelas 5 Awesome · 25 Murid · Bersemuka &amp; Digital Interaktif) merangkumi Segmen Set Induksi, Model ASSURE dan Penutup.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowOriginalPdf((p) => !p)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            <FileText className="h-4 w-4 text-sky-600" />
            {showOriginalPdf ? 'Tutup Infografik RPH (PDF)' : 'Lihat Infografik RPH (PDF)'}
          </button>

          {!editMode && (
            <button
              type="button"
              onClick={() => setLocalEdit((v) => !v)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold transition-colors ${
                localEdit
                  ? 'border-sky-600 bg-sky-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <PencilLine className="h-4 w-4" />
              {localEdit ? 'Selesai Suntingan' : 'Sunting Teks Aktiviti'}
            </button>
          )}
        </div>
      </div>

      {/* Paparan Infografik PDF RPH Asal */}
      {showOriginalPdf && (
        <div className="mb-8 rounded-xl border border-sky-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Infografik Aliran RPH Model ASSURE (Lampiran PDF)
            </h3>
            <a
              href={ATTACHED_RPH_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-sky-700 hover:underline"
            >
              Buka PDF Penuh
            </a>
          </div>
          <iframe
            src={ATTACHED_RPH_PDF_URL}
            title="Aliran RPH Berintegrasikan Model ASSURE"
            className="h-[540px] w-full rounded-lg border border-slate-200 bg-slate-50"
          />
        </div>
      )}

      {/* Segmen 1: Set Induksi & Pengenalan */}
      <div className="mb-10 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Sparkles className="h-4 w-4" />
          Segmen 1 · Set Induksi (10 Minit) &amp; Pengenalan
        </div>

        {isEditing ? (
          <div className="mt-3 space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Tajuk Set Induksi
              <input
                type="text"
                value={templateConfig.setInduksiTajuk}
                onChange={(e) =>
                  onUpdateConfig({
                    ...templateConfig,
                    setInduksiTajuk: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-900"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              Penerangan Set Induksi
              <textarea
                rows={3}
                value={templateConfig.setInduksiTeks}
                onChange={(e) =>
                  onUpdateConfig({
                    ...templateConfig,
                    setInduksiTeks: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
              />
            </label>
          </div>
        ) : (
          <h3 className="mt-2 text-xl font-bold text-slate-900">
            {templateConfig.setInduksiTajuk}
          </h3>
        )}

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            {!isEditing && (
              <p className="text-sm leading-relaxed text-slate-600">
                {templateConfig.setInduksiTeks}
              </p>
            )}

            {/* Aliran 3 Langkah Set Induksi dari RPH */}
            <div className="grid gap-2.5 sm:grid-cols-3">
              <div className="rounded-lg border border-rose-200 bg-rose-50/50 p-3">
                <p className="text-[11px] font-bold uppercase text-rose-700">
                  1. Tayangan Video
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-800">
                  Tayangan Video YouTube bentuk gabungan 2D.
                </p>
              </div>
              <div className="rounded-lg border border-sky-200 bg-sky-50/50 p-3">
                <p className="text-[11px] font-bold uppercase text-sky-700">
                  2. Soal Jawab
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-800">
                  Guru mengadakan sesi soal jawab terbuka &amp; kad imbasan.
                </p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
                <p className="text-[11px] font-bold uppercase text-emerald-700">
                  3. Pencetus Minda
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-800">
                  Murid mengenal pasti gabungan dua bentuk 2D secara lisan.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-900">
                Soalan Lisan Pencetus Minda:
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Jika kita mahu memasang pagar di keliling gabungan taman segi empat dan segi tiga, ukuran manakah yang mesti dikira?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { id: 'perimeter', label: 'Perimeter (Sempadan Luar)' },
                  { id: 'luas', label: 'Luas (Permukaan Tanah)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setInduksiChoice(opt.id)}
                    className={`rounded-lg border px-4 py-2 text-xs font-semibold transition-colors ${
                      induksiChoice === opt.id
                        ? 'border-sky-600 bg-sky-600 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {induksiChoice && (
                <p
                  className={`mt-3 text-sm font-medium ${
                    induksiChoice === 'perimeter'
                      ? 'text-emerald-700'
                      : 'text-rose-700'
                  }`}
                >
                  {induksiChoice === 'perimeter'
                    ? 'Tepat sekali! Pagar dipasang di sempadan luar, maka kita mengira Perimeter (unit cm / m).'
                    : 'Cuba fikir semula: Permukaan dalam ialah Luas (cm² / m²), manakala pagar di tepi luar ialah Perimeter.'}
                </p>
              )}
            </div>
          </div>

          {/* Profil Kelas 5 Awesome & VARK */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
                Profil Murid · Kelas 5 Awesome (25 Murid)
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                  <p className="font-mono-tabular text-lg font-bold text-sky-700">
                    14
                  </p>
                  <p className="text-xs font-semibold text-slate-600">Lelaki</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                  <p className="font-mono-tabular text-lg font-bold text-amber-700">
                    11
                  </p>
                  <p className="text-xs font-semibold text-slate-600">Perempuan</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Gaya Belajar VARK
              </p>
              <div className="mt-2 space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Visual</span>
                    <span className="font-mono-tabular">60%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[60%] bg-emerald-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Kinestetik</span>
                    <span className="font-mono-tabular">25%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[25%] bg-sky-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Auditori</span>
                    <span className="font-mono-tabular">15%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[15%] bg-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segmen 2: Aktiviti Utama & Penerokaan (Model ASSURE) */}
      <div className="mb-10 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <Layers className="h-4 w-4" />
          Segmen 2 · Aktiviti Pembelajaran (Model ASSURE)
        </div>
        <h3 className="mt-2 text-xl font-bold text-slate-900">
          6 Fasa Aliran RPH Model ASSURE
        </h3>

        <div className="mt-5 grid gap-6 lg:grid-cols-[290px_1fr]">
          <div className="space-y-2">
            {assurePhases.map((phase, idx) => {
              const active = selectedAssure === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedAssure(idx)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors ${
                    active
                      ? 'border-sky-500 bg-sky-50 text-sky-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                      active
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {phase.kod}
                  </span>
                  <span className="text-xs font-bold leading-snug sm:text-sm">
                    {phase.nama}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-lg font-bold text-white">
                {activePhase.kod}
              </span>
              <div className="w-full">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={activePhase.nama}
                      onChange={(e) =>
                        handleUpdatePhaseField('nama', e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-slate-900"
                    />
                    <input
                      type="text"
                      value={activePhase.ringkasan}
                      onChange={(e) =>
                        handleUpdatePhaseField('ringkasan', e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700"
                    />
                  </div>
                ) : (
                  <>
                    <h4 className="text-lg font-bold text-slate-900">
                      {activePhase.nama}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {activePhase.ringkasan}
                    </p>
                  </>
                )}
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {activePhase.butiran.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white p-3.5 text-sm leading-relaxed text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={item}
                      onChange={(e) => handleUpdateBullet(i, e.target.value)}
                      className="w-full rounded border border-slate-200 px-2 py-1 text-sm text-slate-800"
                    />
                  ) : (
                    <span>{item}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Segmen 3: Aktiviti Penutup */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Compass className="h-4 w-4" />
          Segmen 3 · Aplikasi, Pengukuhan &amp; Penutup
        </div>

        {isEditing ? (
          <div className="mt-3 space-y-3">
            <input
              type="text"
              value={templateConfig.penutupTajuk}
              onChange={(e) =>
                onUpdateConfig({
                  ...templateConfig,
                  penutupTajuk: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-bold text-slate-900"
            />
            <textarea
              rows={2}
              value={templateConfig.penutupTeks}
              onChange={(e) =>
                onUpdateConfig({
                  ...templateConfig,
                  penutupTeks: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
            />
          </div>
        ) : (
          <>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              {templateConfig.penutupTajuk}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {templateConfig.penutupTeks}
            </p>
          </>
        )}

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h4 className="text-sm font-bold text-slate-900">
              3 Komponen Penilaian &amp; Penutup (RPH)
            </h4>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                <strong>1. Penilaian Sumatif (Wayground):</strong> Kuiz interaktif masa nyata (5 soalan) bagi menguji penguasaan SP 6.3.1.
              </p>
              <p>
                <strong>2. Penilaian Autentik (Peer-Review Padlet):</strong> Murid menyemak unit <span className="font-mono-tabular font-semibold">cm</span> (perimeter) vs <span className="font-mono-tabular font-semibold">cm²</span> (luas) jawapan rakan.
              </p>
              <p>
                <strong>3. Refleksi Media &amp; Hasil:</strong> Borang refleksi murid di Google Forms serta rumusan konsep oleh guru.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h4 className="text-sm font-bold text-slate-900">
              Semakan Unit Akhir (Latihan Peer-Review)
            </h4>
            <p className="mt-1.5 text-sm text-slate-600">
              Jika sebuah segi empat sama (sisi 4 cm) dicantum dengan segi tiga sama sisi (sisi 4 cm), apakah jawapan <strong>perimeter</strong> bersama unit yang betul?
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {['20 cm²', '20 cm', '24 cm', '16 cm²'].map((ans, idx) => (
                <button
                  key={ans}
                  type="button"
                  onClick={() => setExitAnswer(idx)}
                  className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${
                    exitAnswer === idx
                      ? idx === 1
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-rose-600 bg-rose-600 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {ans}
                </button>
              ))}
            </div>
            {exitAnswer !== null && (
              <p
                className={`mt-3 text-xs font-semibold ${
                  exitAnswer === 1 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {exitAnswer === 1
                  ? 'Betul! Perimeter = 5 sisi luar × 4 cm = 20 cm (unit panjang cm, bukan cm²).'
                  : 'Semak semula: Perimeter mengukur 5 sisi luar (20) dan unitnya ialah cm (bukan cm²).'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
