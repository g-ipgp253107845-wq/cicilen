import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCopy,
  ExternalLink,
  FileDown,
  FolderPlus,
  Headphones,
  Image as ImageIcon,
  Link2,
  Pause,
  Play,
  Presentation,
  RotateCcw,
  Trash2,
  Upload,
  Video,
  Volume2,
} from 'lucide-react';
import {
  AUDIO_TRANSCRIPT_SEGMENTS,
  CANVA_SLIDES,
} from '../data/curriculumData';
import { CustomNoteItem } from '../types';
import { normalizeEmbedUrl, readFileAsDataUrl } from '../utils/embedHelpers';

type NotaTab =
  | 'infografik'
  | 'bukuteks'
  | 'slaid'
  | 'video'
  | 'audio'
  | 'pdf'
  | 'muatnaik';

const VALID_NOTA_TABS: NotaTab[] = [
  'infografik',
  'bukuteks',
  'slaid',
  'video',
  'audio',
  'pdf',
  'muatnaik',
];

interface NotaSectionProps {
  customNotes: CustomNoteItem[];
  initialTab?: string;
  onTabChange?: (tab: NotaTab) => void;
  onAddNote: (note: CustomNoteItem) => void;
  onDeleteNote: (id: string) => void;
}

export const NotaSection: React.FC<NotaSectionProps> = ({
  customNotes,
  initialTab,
  onTabChange,
  onAddNote,
  onDeleteNote,
}) => {
  const [activeTab, setActiveTab] = useState<NotaTab>(() =>
    initialTab && VALID_NOTA_TABS.includes(initialTab as NotaTab)
      ? (initialTab as NotaTab)
      : 'infografik'
  );
  const [copiedVideoLink, setCopiedVideoLink] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [bookPage, setBookPage] = useState(1);

  const selectTab = (tab: NotaTab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  useEffect(() => {
    if (initialTab && VALID_NOTA_TABS.includes(initialTab as NotaTab)) {
      setActiveTab(initialTab as NotaTab);
    }
  }, [initialTab]);

  // Video simulation state
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoStep, setVideoStep] = useState(0);

  // Audio state
  const [audioPlayingIndex, setAudioPlayingIndex] = useState<number | null>(
    null
  );

  // Upload / Add custom note form state
  const [sourceType, setSourceType] = useState<'upload' | 'embed'>('upload');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteCategory, setNoteCategory] =
    useState<CustomNoteItem['kategori']>('PDF');
  const [noteDesc, setNoteDesc] = useState('');
  const [noteEmbedUrl, setNoteEmbedUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    mime: string;
    dataUrl: string;
  } | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  useEffect(() => {
    if (!videoPlaying) return;
    const timer = window.setInterval(() => {
      setVideoStep((prev) => {
        if (prev >= 3) {
          setVideoPlaying(false);
          return 3;
        }
        return prev + 1;
      });
    }, 2600);
    return () => window.clearInterval(timer);
  }, [videoPlaying]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeakSegment = (idx: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setAudioPlayingIndex(audioPlayingIndex === idx ? null : idx);
      return;
    }

    window.speechSynthesis.cancel();
    if (audioPlayingIndex === idx) {
      setAudioPlayingIndex(null);
      return;
    }

    const segment = AUDIO_TRANSCRIPT_SEGMENTS[idx];
    const utterance = new SpeechSynthesisUtterance(segment.teks);
    utterance.lang = 'ms-MY';
    utterance.rate = 0.95;
    utterance.onend = () => setAudioPlayingIndex(null);
    utterance.onerror = () => setAudioPlayingIndex(null);

    setAudioPlayingIndex(idx);
    window.speechSynthesis.speak(utterance);
  };

  const handleFilePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setUploadedFile({
        name: file.name,
        mime: file.type || 'application/octet-stream',
        dataUrl,
      });
      if (!noteTitle.trim()) {
        setNoteTitle(file.name.replace(/\.[^.]+$/, ''));
      }
      if (file.type.includes('pdf')) setNoteCategory('PDF');
      else if (file.type.startsWith('image/')) setNoteCategory('Infografik');
      else if (file.type.startsWith('video/')) setNoteCategory('Video');
      else if (file.type.startsWith('audio/')) setNoteCategory('Audio');
    } catch {
      setUploadError('Tidak dapat membaca fail yang dipilih. Sila cuba fail lain.');
    }
  };

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');

    if (!noteTitle.trim()) {
      setUploadError('Sila masukkan tajuk nota.');
      return;
    }

    if (sourceType === 'upload' && !uploadedFile) {
      setUploadError('Sila pilih fail nota untuk dimuat naik.');
      return;
    }

    if (sourceType === 'embed' && !noteEmbedUrl.trim()) {
      setUploadError('Sila masukkan pautan URL nota / Canva / Google Drive.');
      return;
    }

    const newNote: CustomNoteItem = {
      id: `note-${Date.now()}`,
      tajuk: noteTitle.trim(),
      kategori: noteCategory,
      penerangan: noteDesc.trim(),
      sourceType,
      fileName: uploadedFile?.name,
      mimeType: uploadedFile?.mime,
      dataUrl: sourceType === 'upload' ? uploadedFile?.dataUrl : undefined,
      embedUrl:
        sourceType === 'embed' ? normalizeEmbedUrl(noteEmbedUrl) : undefined,
      tarikh: new Date().toLocaleDateString('ms-MY', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    onAddNote(newNote);
    setNoteTitle('');
    setNoteDesc('');
    setNoteEmbedUrl('');
    setUploadedFile(null);
    setUploadSuccess('Nota anda telah berjaya ditambah ke senarai Nota Saya.');
    window.setTimeout(() => setUploadSuccess(''), 3500);
  };

  const tabs: {
    id: NotaTab;
    label: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'infografik', label: 'Infografik', icon: ImageIcon },
    { id: 'bukuteks', label: 'Buku Teks Digital', icon: BookOpen },
    { id: 'slaid', label: 'Slaid Canva', icon: Presentation },
    { id: 'video', label: 'Video Penerangan', icon: Video },
    { id: 'audio', label: 'Audio Nota', icon: Headphones },
    { id: 'pdf', label: 'Nota PDF', icon: FileDown },
    {
      id: 'muatnaik',
      label:
        customNotes.length > 0
          ? `Muat Naik Nota (${customNotes.length})`
          : 'Muat Naik Nota',
      icon: FolderPlus,
    },
  ];

  const currentSlide = CANVA_SLIDES[slideIndex];

  const videoStepsInfo = [
    {
      tajuk: 'Langkah 1: Kenal Pasti Bentuk Gabungan',
      penerangan:
        'Kita mempunyai sebuah bentuk gabungan terdiri daripada segi empat tepat (8 cm × 5 cm) dan segi tiga di bahagian atas (tapak 8 cm, tinggi 4 cm).',
    },
    {
      tajuk: 'Langkah 2: Pecahkan Untuk Mengira Luas',
      penerangan:
        'Lukis garisan putus-putus untuk memisahkan Bentuk A (segi empat tepat) dan Bentuk B (segi tiga). Luas A = 8 × 5 = 40 cm².',
    },
    {
      tajuk: 'Langkah 3: Kira Luas Segi Tiga & Jumlahkan',
      penerangan:
        'Luas B = ½ × 8 × 4 = 16 cm². Maka Jumlah Luas = 40 cm² + 16 cm² = 56 cm².',
    },
    {
      tajuk: 'Langkah 4: Kira Perimeter Sisi Luar Sahaja',
      penerangan:
        'Perimeter = 8 + 5 + 5.7 + 5.7 + 5 = 29.4 cm. Garis putus-putus di tengah TIDAK dimasukkan dalam kiraan perimeter!',
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            Modul 02 · Pusat Nota Multimedia
          </p>
          <h2 className="font-serif-display mt-1 text-3xl text-slate-900 sm:text-4xl">
            Nota Perimeter &amp; Luas Bentuk Gabungan
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Teroka nota sedia ada atau muat naik PDF, slaid Canva, gambar infografik, audio dan video anda sendiri di tab Muat Naik Nota.
          </p>
        </div>
        <button
          type="button"
          onClick={() => selectTab('muatnaik')}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
        >
          <Upload className="h-4 w-4" />
          Muat Naik Nota Saya
        </button>
      </div>

      {/* Format Tabs */}
      <div
        role="tablist"
        aria-label="Format Nota Pembelajaran"
        className="mb-8 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-100 p-1.5"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors sm:text-sm ${
                active
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. INFOGRAFIK */}
      {activeTab === 'infografik' && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">
                  1. Konsep Perimeter (Keliling Luar)
                </h3>
                <span className="font-mono-tabular text-xs font-semibold text-sky-700">
                  Unit: cm, m
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Perimeter ialah <strong>jumlah panjang semua sisi luar</strong> yang mengelilingi bentuk gabungan.
              </p>
              <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                <svg viewBox="0 0 320 140" className="mx-auto h-auto w-full max-w-[290px]">
                  <path
                    d="M 40 20 L 140 20 L 140 65 L 260 65 L 260 120 L 40 120 Z"
                    fill="#e0f2fe"
                    stroke="#0284c7"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="40"
                    y1="65"
                    x2="140"
                    y2="65"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  <text x="90" y="14" textAnchor="middle" className="fill-sky-900 text-[11px] font-bold">
                    Sisi Luar
                  </text>
                  <text x="90" y="82" textAnchor="middle" className="fill-red-600 text-[10px] font-bold">
                    Sisi Dalam (JANGAN KIRA!)
                  </text>
                </svg>
              </div>
              <p className="mt-4 text-xs font-medium text-slate-700">
                Tip Pantas: Jika ada sisi yang belum dilabelkan, tolak atau tambah panjang sisi yang bertentangan dengannya.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">
                  2. Konsep Luas (Kawasan Permukaan)
                </h3>
                <span className="font-mono-tabular text-xs font-semibold text-amber-700">
                  Unit: cm², m²
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Luas ialah besarnya sesuatu permukaan. Pecahkan bentuk gabungan kepada <strong>Bentuk A + Bentuk B</strong>, kira setiap luas, kemudian jumlahkan!
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                  <div className="mx-auto mb-2 h-8 w-12 rounded border-2 border-sky-600 bg-sky-200" />
                  <p className="text-xs font-bold text-slate-900">Segi Empat Tepat</p>
                  <p className="font-mono-tabular mt-1 text-xs font-semibold text-sky-700">
                    Panjang × Lebar
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                  <div className="mx-auto mb-2 h-8 w-8 rounded border-2 border-amber-600 bg-amber-200" />
                  <p className="text-xs font-bold text-slate-900">Segi Empat Sama</p>
                  <p className="font-mono-tabular mt-1 text-xs font-semibold text-amber-800">
                    Sisi × Sisi
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                  <svg viewBox="0 0 48 36" className="mx-auto mb-2 h-8 w-12">
                    <polygon
                      points="24,3 44,33 4,33"
                      fill="#a7f3d0"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />
                  </svg>
                  <p className="text-xs font-bold text-slate-900">Segi Tiga</p>
                  <p className="font-mono-tabular mt-1 text-xs font-semibold text-emerald-700">
                    ½ × Tapak × Tinggi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BUKU TEKS DIGITAL */}
      {activeTab === 'bukuteks' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-semibold text-sky-700">
                Buku Teks Digital Matematik Tahun 5 (KSSR Semakan)
              </p>
              <h3 className="text-lg font-bold text-slate-900">
                Muka Surat {213 + bookPage} daripada 216
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={bookPage === 1}
                onClick={() => setBookPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelum
              </button>
              <button
                type="button"
                disabled={bookPage === 3}
                onClick={() => setBookPage((p) => Math.min(3, p + 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                Seterusnya
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {bookPage === 1 && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
                  Contoh Buku Teks 1 · Perimeter Bentuk Gabungan
                </p>
                <h4 className="mt-1 text-base font-bold text-slate-900">
                  Gabungan Segi Empat Sama &amp; Segi Empat Tepat
                </h4>
                <p className="mt-2 text-sm text-slate-700">
                  Rajah ialah gabungan sebuah segi empat sama bersisi 5 cm dan sebuah segi empat tepat berukuran 12 cm × 4 cm.
                </p>
                <div className="mt-4 space-y-2 rounded-lg bg-white p-4 text-sm">
                  <p className="font-semibold text-slate-900">Penyelesaian:</p>
                  <p className="font-mono-tabular text-slate-700">
                    Sisi tidak berlabel = 12 cm − 5 cm = 7 cm
                  </p>
                  <p className="font-mono-tabular text-slate-700">
                    Perimeter = 5 + 5 + 7 + 4 + 12 + 9 = <strong>42 cm</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4">
                <svg viewBox="0 0 300 180" className="h-auto w-full max-w-[280px]">
                  <path
                    d="M 40 25 L 115 25 L 115 90 L 245 90 L 245 145 L 40 145 Z"
                    fill="#fef08a"
                    stroke="#854d0e"
                    strokeWidth="2.5"
                  />
                  <line x1="40" y1="90" x2="115" y2="90" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
                  <text x="77" y="18" textAnchor="middle" className="fill-slate-800 text-[11px] font-bold">5 cm</text>
                  <text x="125" y="60" textAnchor="start" className="fill-slate-800 text-[11px] font-bold">5 cm</text>
                  <text x="180" y="82" textAnchor="middle" className="fill-red-700 text-[11px] font-bold">7 cm</text>
                  <text x="255" y="122" textAnchor="start" className="fill-slate-800 text-[11px] font-bold">4 cm</text>
                  <text x="142" y="164" textAnchor="middle" className="fill-slate-800 text-[11px] font-bold">12 cm</text>
                  <text x="30" y="90" textAnchor="end" className="fill-slate-800 text-[11px] font-bold">9 cm</text>
                </svg>
              </div>
            </div>
          )}

          {bookPage === 2 && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-sky-800">
                  Contoh Buku Teks 2 · Luas Bentuk Gabungan
                </p>
                <h4 className="mt-1 text-base font-bold text-slate-900">
                  Gabungan Segi Empat Tepat &amp; Segi Tiga
                </h4>
                <p className="mt-2 text-sm text-slate-700">
                  Sekeping kad terdiri daripada segi empat tepat (10 cm × 6 cm) dan segi tiga di sebelah kanan (tapak 4 cm, tinggi 6 cm).
                </p>
                <div className="mt-4 space-y-2 rounded-lg bg-white p-4 text-sm">
                  <p className="font-semibold text-slate-900">Penyelesaian:</p>
                  <p className="font-mono-tabular text-slate-700">
                    Luas A (Segi empat tepat) = 10 × 6 = 60 cm²
                  </p>
                  <p className="font-mono-tabular text-slate-700">
                    Luas B (Segi tiga) = ½ × 4 × 6 = 12 cm²
                  </p>
                  <p className="font-mono-tabular text-sky-800 font-bold">
                    Jumlah Luas = 60 + 12 = 72 cm²
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4">
                <svg viewBox="0 0 300 180" className="h-auto w-full max-w-[280px]">
                  <rect x="35" y="35" width="150" height="95" fill="#bae6fd" stroke="#0369a1" strokeWidth="2.5" />
                  <polygon points="185,35 185,130 255,130" fill="#a7f3d0" stroke="#047857" strokeWidth="2.5" />
                  <text x="110" y="88" textAnchor="middle" className="fill-sky-900 text-[13px] font-bold">A</text>
                  <text x="208" y="108" textAnchor="middle" className="fill-emerald-900 text-[13px] font-bold">B</text>
                  <text x="110" y="148" textAnchor="middle" className="fill-slate-800 text-[11px] font-bold">10 cm</text>
                  <text x="220" y="148" textAnchor="middle" className="fill-slate-800 text-[11px] font-bold">4 cm</text>
                  <text x="25" y="85" textAnchor="end" className="fill-slate-800 text-[11px] font-bold">6 cm</text>
                </svg>
              </div>
            </div>
          )}

          {bookPage === 3 && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-6">
              <h4 className="text-base font-bold text-slate-900">
                Uji Diri Ringkas (Semak Konsep Buku Teks)
              </h4>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    1. Mengapakah garis cantuman di tengah tidak ditambah semasa mengira perimeter?
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Jawapan: Kerana garis cantuman berada di bahagian <strong>dalam</strong> bentuk gabungan, manakala perimeter hanya mengukur bahagian <strong>sempadan luar</strong> sahaja.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    2. Apakah perbezaan unit antara perimeter dan luas?
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Jawapan: Perimeter menggunakan unit panjang (contoh: <span className="font-mono-tabular font-semibold">cm</span>, <span className="font-mono-tabular font-semibold">m</span>), manakala luas menggunakan unit persegi (contoh: <span className="font-mono-tabular font-semibold">cm²</span>, <span className="font-mono-tabular font-semibold">m²</span>).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. SLAID CANVA */}
      {activeTab === 'slaid' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500">
              Slaid Pengajaran Interaktif · Slaid {slideIndex + 1} / {CANVA_SLIDES.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={slideIndex === 0}
                onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                Slaid Sebelum
              </button>
              <button
                type="button"
                disabled={slideIndex === CANVA_SLIDES.length - 1}
                onClick={() =>
                  setSlideIndex((i) => Math.min(CANVA_SLIDES.length - 1, i + 1))
                }
                className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 disabled:opacity-40"
              >
                Slaid Seterusnya
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-[#3195e0] to-[#1e64a3] p-6 text-white shadow-sm sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-100">
              Matematik Tahun 5 · SP 6.3.1
            </p>
            <h3 className="font-serif-display mt-2 text-2xl sm:text-4xl">
              {currentSlide.tajuk}
            </h3>
            <p className="mt-1 text-sm font-medium text-sky-100">
              {currentSlide.subtajuk}
            </p>

            <ul className="mt-6 space-y-3">
              {currentSlide.isi.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl bg-white/12 px-4 py-3 text-sm leading-relaxed backdrop-blur-sm"
                >
                  <span className="font-mono-tabular mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f6f03b] text-xs font-bold text-[#161c08]">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-[#f6f03b] px-4 py-3 text-sm font-semibold text-[#161c08]">
              Tip Cikgu: {currentSlide.tipCikgu}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {CANVA_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSlideIndex(idx)}
                aria-label={`Pergi ke slaid ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  idx === slideIndex ? 'w-8 bg-sky-600' : 'w-2.5 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. VIDEO PENERANGAN BERANIMASI */}
      {activeTab === 'video' && (() => {
        const videoDirectUrl =
          typeof window !== 'undefined'
            ? `${window.location.origin}/?modul=nota&tab=video`
            : '/?modul=nota&tab=video';

        const handleCopyVideoLink = async () => {
          try {
            await navigator.clipboard.writeText(videoDirectUrl);
            setCopiedVideoLink(true);
            window.setTimeout(() => setCopiedVideoLink(false), 2500);
          } catch {
            // ignore clipboard errors
          }
        };

        return (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sky-200 bg-sky-50/70 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-sky-900">
                Pautan Terus Video Penerangan (Untuk Canva / Perkongsian Murid)
              </p>
              <p className="font-mono-tabular mt-0.5 truncate text-xs text-slate-600">
                {videoDirectUrl}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handleCopyVideoLink}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-bold text-white hover:bg-sky-700"
              >
                {copiedVideoLink ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <ClipboardCopy className="h-3.5 w-3.5" />
                )}
                {copiedVideoLink ? 'Pautan Disalin!' : 'Salin Pautan'}
              </button>
              <a
                href={videoDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-bold text-sky-800 hover:bg-sky-50"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Buka
              </a>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-xl border border-slate-200 bg-slate-900 p-5 text-white">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-sky-300">
                  Video Penerangan Langkah Demi Langkah
                </span>
                <span className="font-mono-tabular text-xs text-slate-300">
                  Babak {videoStep + 1} / 4
                </span>
              </div>

              <div className="flex items-center justify-center rounded-lg bg-slate-950 p-4">
                <svg viewBox="0 0 320 200" className="h-auto w-full max-w-[300px]">
                  <rect
                    x="70"
                    y={videoStep >= 1 ? 105 : 95}
                    width="180"
                    height="75"
                    fill="#0ea5e9"
                    fillOpacity="0.35"
                    stroke={videoStep === 3 ? '#f6f03b' : '#38bdf8'}
                    strokeWidth={videoStep === 3 ? '3.5' : '2.5'}
                    className="transition-all duration-500"
                  />
                  <polygon
                    points={`70,${videoStep >= 1 && videoStep < 3 ? 82 : 95} 160,${
                      videoStep >= 1 && videoStep < 3 ? 22 : 35
                    } 250,${videoStep >= 1 && videoStep < 3 ? 82 : 95}`}
                    fill="#fbbf24"
                    fillOpacity="0.4"
                    stroke={videoStep === 3 ? '#f6f03b' : '#fbbf24'}
                    strokeWidth={videoStep === 3 ? '3.5' : '2.5'}
                    className="transition-all duration-500"
                  />
                  {videoStep >= 1 && (
                    <text
                      x="160"
                      y="148"
                      textAnchor="middle"
                      className="fill-sky-200 text-[12px] font-bold"
                    >
                      A: 8 × 5 = 40 cm²
                    </text>
                  )}
                  {videoStep >= 2 && (
                    <text
                      x="160"
                      y="68"
                      textAnchor="middle"
                      className="fill-amber-200 text-[12px] font-bold"
                    >
                      B: ½ × 8 × 4 = 16 cm²
                    </text>
                  )}
                  <text x="160" y="194" textAnchor="middle" className="fill-slate-300 text-[11px]">
                    8 cm
                  </text>
                  <text x="262" y="140" textAnchor="start" className="fill-slate-300 text-[11px]">
                    5 cm
                  </text>
                </svg>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (videoStep >= 3 && !videoPlaying) setVideoStep(0);
                    setVideoPlaying((p) => !p);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-xs font-bold text-white hover:bg-sky-400"
                >
                  {videoPlaying ? (
                    <>
                      <Pause className="h-4 w-4" /> Jeda
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> Mainkan Video
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVideoPlaying(false);
                    setVideoStep(0);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Ulang Semula
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {videoStepsInfo.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setVideoPlaying(false);
                    setVideoStep(idx);
                  }}
                  className={`w-full rounded-xl border p-4 text-left transition-colors ${
                    videoStep === idx
                      ? 'border-sky-500 bg-sky-50/70'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold text-sky-800">{item.tajuk}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.penerangan}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        );
      })()}

      {/* 5. AUDIO NOTA */}
      {activeTab === 'audio' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Audio Nota Ringkas (Bahasa Melayu)
              </h3>
              <p className="text-sm text-slate-600">
                Tekan butang main untuk mendengar penerangan audio setiap subtopik bersama transkrip penuh.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700">
              <Volume2 className="h-4 w-4" />
              Sintesis Suara Pelayar
            </span>
          </div>

          <div className="space-y-4">
            {AUDIO_TRANSCRIPT_SEGMENTS.map((seg, idx) => {
              const isPlaying = audioPlayingIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border p-5 transition-colors ${
                    isPlaying
                      ? 'border-sky-400 bg-sky-50/70'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="font-mono-tabular text-xs font-semibold text-slate-500">
                        {seg.masa}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {seg.tajuk}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSpeakSegment(idx)}
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
                        isPlaying
                          ? 'bg-rose-600 text-white hover:bg-rose-700'
                          : 'bg-sky-600 text-white hover:bg-sky-700'
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-3.5 w-3.5" /> Henti Audio
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" /> Dengar Segmen
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    “{seg.teks}”
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. NOTA PDF */}
      {activeTab === 'pdf' && (
        <div className="print-only-sheet rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Helaian Ringkasan Formula (Sedia Cetak / PDF)
              </h3>
              <p className="text-sm text-slate-600">
                Gunakan butang di sebelah kanan untuk mencetak atau menyimpan nota ini sebagai fail PDF.
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <FileDown className="h-4 w-4" />
              Cetak / Simpan PDF
            </button>
          </div>

          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Nota Ringkas Matematik Tahun 5 · Bab 6: Ruang
              </p>
              <h4 className="font-serif-display mt-1 text-2xl text-slate-900">
                6.3.1 Perimeter &amp; Luas Bentuk Gabungan Dua Dimensi
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-600">
                    <th className="p-3 font-bold">Bentuk Asas</th>
                    <th className="p-3 font-bold">Formula Luas</th>
                    <th className="p-3 font-bold">Contoh Kiraan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Segi Empat Tepat</td>
                    <td className="font-mono-tabular p-3 text-slate-700">Panjang × Lebar</td>
                    <td className="font-mono-tabular p-3 text-slate-600">8 cm × 4 cm = 32 cm²</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Segi Empat Sama</td>
                    <td className="font-mono-tabular p-3 text-slate-700">Sisi × Sisi</td>
                    <td className="font-mono-tabular p-3 text-slate-600">5 cm × 5 cm = 25 cm²</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Segi Tiga</td>
                    <td className="font-mono-tabular p-3 text-slate-700">½ × Tapak × Tinggi</td>
                    <td className="font-mono-tabular p-3 text-slate-600">½ × 6 cm × 4 cm = 12 cm²</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. MUAT NAIK / TAMBAH NOTA SENDIRI */}
      {activeTab === 'muatnaik' && (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          {/* Borang Muat Naik Nota */}
          <form
            onSubmit={handleSubmitNote}
            className="h-fit rounded-xl border border-slate-200 bg-white p-6"
          >
            <h3 className="text-lg font-bold text-slate-900">
              Muat Naik atau Tambah Nota Anda
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Muat naik fail PDF, gambar infografik, video/audio dari peranti anda atau tampal pautan Canva, Google Drive dan YouTube.
            </p>

            {/* Pilihan Mod: Muat Naik Fail vs Pautan Embed */}
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setSourceType('upload')}
                className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold transition-colors ${
                  sourceType === 'upload'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                Muat Naik Fail
              </button>
              <button
                type="button"
                onClick={() => setSourceType('embed')}
                className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold transition-colors ${
                  sourceType === 'embed'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                <Link2 className="h-3.5 w-3.5" />
                Pautan / Embed
              </button>
            </div>

            {uploadError && (
              <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                {uploadError}
              </div>
            )}
            {uploadSuccess && (
              <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                {uploadSuccess}
              </div>
            )}

            <div className="mt-4 space-y-3.5">
              {sourceType === 'upload' ? (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-sky-300 bg-sky-50/40 px-4 py-6 text-center transition-colors hover:bg-sky-50">
                  <Upload className="h-7 w-7 text-sky-600" />
                  <span className="mt-2 text-xs font-bold text-slate-900">
                    {uploadedFile
                      ? `Dipilih: ${uploadedFile.name}`
                      : 'Klik untuk pilih fail (PDF, PNG, JPG, MP4, MP3)'}
                  </span>
                  <span className="mt-1 text-[11px] text-slate-500">
                    Fail akan dipaparkan terus dalam halaman Nota
                  </span>
                  <input
                    type="file"
                    accept=".pdf,image/*,video/*,audio/*"
                    onChange={handleFilePick}
                    className="sr-only"
                  />
                </label>
              ) : (
                <label className="block text-xs font-semibold text-slate-700">
                  Pautan URL (Canva / Google Drive / YouTube / Buku Teks)
                  <input
                    type="url"
                    value={noteEmbedUrl}
                    onChange={(e) => setNoteEmbedUrl(e.target.value)}
                    placeholder="https://www.canva.com/... atau https://drive.google.com/..."
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </label>
              )}

              <label className="block text-xs font-semibold text-slate-700">
                Tajuk Nota
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Contoh: Nota Padat Perimeter & Luas Bab 6"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                Kategori Format
                <select
                  value={noteCategory}
                  onChange={(e) =>
                    setNoteCategory(e.target.value as CustomNoteItem['kategori'])
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                >
                  <option value="PDF">PDF</option>
                  <option value="Slaid Canva">Slaid Canva</option>
                  <option value="Infografik">Infografik</option>
                  <option value="Buku Teks Digital">Buku Teks Digital</option>
                  <option value="Video">Video</option>
                  <option value="Audio">Audio</option>
                  <option value="Pautan Lain">Pautan Lain</option>
                </select>
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                Penerangan Ringkas (Pilihan)
                <textarea
                  rows={2}
                  value={noteDesc}
                  onChange={(e) => setNoteDesc(e.target.value)}
                  placeholder="Catatan ringkas tentang isi nota ini..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-700"
              >
                <FolderPlus className="h-4 w-4" />
                Simpan Nota Ke Portal
              </button>
            </div>
          </form>

          {/* Senarai Nota Muat Naik Pengguna */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Koleksi Nota Saya ({customNotes.length})
              </h3>
            </div>

            {customNotes.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <FolderPlus className="mx-auto h-9 w-9 text-slate-300" />
                <p className="mt-3 text-sm font-bold text-slate-800">
                  Belum ada nota tambahan dimuat naik
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Gunakan borang di sebelah kiri untuk memuat naik fail PDF, gambar, audio/video atau pautan Canva anda sendiri.
                </p>
              </div>
            ) : (
              customNotes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-sky-700">
                        {note.kategori} · {note.tarikh}
                      </p>
                      <h4 className="mt-0.5 text-base font-bold text-slate-900">
                        {note.tajuk}
                      </h4>
                      {note.penerangan && (
                        <p className="mt-1 text-sm text-slate-600">
                          {note.penerangan}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteNote(note.id)}
                      aria-label={`Padam nota ${note.tajuk}`}
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Preview Area */}
                  <div className="mt-4">
                    {note.sourceType === 'upload' && note.dataUrl && (
                      <>
                        {note.mimeType?.startsWith('image/') && (
                          <img
                            src={note.dataUrl}
                            alt={note.tajuk}
                            className="max-h-96 w-full rounded-lg border border-slate-200 object-contain bg-slate-50"
                          />
                        )}
                        {note.mimeType?.includes('pdf') && (
                          <div className="space-y-2">
                            <iframe
                              src={note.dataUrl}
                              title={note.tajuk}
                              className="h-80 w-full rounded-lg border border-slate-200"
                            />
                            <a
                              href={note.dataUrl}
                              download={note.fileName || 'nota.pdf'}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:underline"
                            >
                              <FileDown className="h-3.5 w-3.5" />
                              Muat Turun {note.fileName}
                            </a>
                          </div>
                        )}
                        {note.mimeType?.startsWith('video/') && (
                          <video
                            src={note.dataUrl}
                            controls
                            className="max-h-80 w-full rounded-lg border border-slate-200 bg-black"
                          />
                        )}
                        {note.mimeType?.startsWith('audio/') && (
                          <audio
                            src={note.dataUrl}
                            controls
                            className="w-full"
                          />
                        )}
                        {!note.mimeType?.startsWith('image/') &&
                          !note.mimeType?.includes('pdf') &&
                          !note.mimeType?.startsWith('video/') &&
                          !note.mimeType?.startsWith('audio/') && (
                            <a
                              href={note.dataUrl}
                              download={note.fileName || 'nota'}
                              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100"
                            >
                              <FileDown className="h-4 w-4 text-sky-600" />
                              Muat Turun Fail ({note.fileName})
                            </a>
                          )}
                      </>
                    )}

                    {note.sourceType === 'embed' && note.embedUrl && (
                      <div className="space-y-2">
                        <iframe
                          src={note.embedUrl}
                          title={note.tajuk}
                          allowFullScreen
                          className="h-72 w-full rounded-lg border border-slate-200 bg-slate-50"
                        />
                        <a
                          href={note.embedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Buka Pautan di Tab Baharu
                        </a>
                      </div>
                    )}
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
