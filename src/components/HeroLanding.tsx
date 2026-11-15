import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Compass,
  Download,
  FileText,
  Gamepad2,
  MessageSquareHeart,
  PencilLine,
  Users,
} from 'lucide-react';
import { CreatorProfile, SectionId, SiteTemplateConfig } from '../types';
import { downloadExternalAsset } from '../utils/canvaExport';
import { HighlighterSwipe } from './HighlighterSwipe';

interface HeroLandingProps {
  profile: CreatorProfile;
  templateConfig: SiteTemplateConfig;
  editMode: boolean;
  onUpdateProfile: (next: CreatorProfile) => void;
  onUpdateConfig: (next: SiteTemplateConfig) => void;
  onNavigate: (section: SectionId) => void;
}

const PLATE_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/dc4ac5c7-4eee-48ab-814c-cbba3c9fd1b7.jpg';
const VIDEO_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/81764d30-8120-4ab5-8491-4dd852b82496.mp4';

const DIRECTORY_ITEMS: {
  id: SectionId;
  nombor: string;
  tajuk: string;
  ringkas: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  {
    id: 'pengenalan',
    nombor: '01',
    tajuk: 'Pengenalan (Home)',
    ringkas: 'Maklumat kursus, nama pelajar & gambaran keseluruhan topik.',
    icon: Compass,
  },
  {
    id: 'nota',
    nombor: '02',
    tajuk: 'Nota & Muat Naik Bahan',
    ringkas: 'Infografik, buku teks, slaid, video, audio, PDF & muat naik nota sendiri.',
    icon: BookOpen,
  },
  {
    id: 'aktiviti',
    nombor: '03',
    tajuk: 'Aktiviti Pembelajaran Bermakna',
    ringkas: 'Set Induksi, 6 fasa Model ASSURE dan Aktiviti Penutup.',
    icon: Compass,
  },
  {
    id: 'pentaksiran',
    nombor: '04',
    tajuk: 'Pentaksiran Digital & Bukan Digital',
    ringkas: 'Lembaran kerja semakan automatik, projek grid 1 cm² & rubrik TP1–TP6.',
    icon: ClipboardCheck,
  },
  {
    id: 'interaktif',
    nombor: '05',
    tajuk: 'Gamifikasi & Embed Pautan',
    ringkas: 'Makmal Geometri, Kuiz AI serta ruang embed pautan Wordwall/Kahoot anda.',
    icon: Gamepad2,
  },
  {
    id: 'rakan',
    nombor: '06',
    tajuk: 'Rakan Pembelajaran',
    ringkas: 'Muat naik gambar sesi bersemuka, maya & tangkapan skrin sembang.',
    icon: Users,
  },
  {
    id: 'metadata',
    nombor: '07',
    tajuk: 'Metadata & Sumber Rujukan',
    ringkas: 'Profil pembina laman web dan senarai rujukan yang boleh disunting.',
    icon: FileText,
  },
  {
    id: 'maklumbalas',
    nombor: '08',
    tajuk: 'Maklumbalas & Embed Borang',
    ringkas: 'Borang maklumbalas terbina serta ruang embed Google Form anda sendiri.',
    icon: MessageSquareHeart,
  },
];

export const HeroLanding: React.FC<HeroLandingProps> = ({
  profile,
  templateConfig,
  editMode,
  onUpdateProfile,
  onUpdateConfig,
  onNavigate,
}) => {
  const [editingHero, setEditingHero] = useState(false);
  const [downloadingVideo, setDownloadingVideo] = useState(false);
  const [draftProfile, setDraftProfile] = useState<CreatorProfile>(profile);
  const [draftConfig, setDraftConfig] =
    useState<SiteTemplateConfig>(templateConfig);

  const handleDownloadHeroVideo = async () => {
    setDownloadingVideo(true);
    await downloadExternalAsset(VIDEO_URL, 'Pulau_Geometri_Video_Latar.mp4');
    setDownloadingVideo(false);
  };

  const openEditor = () => {
    setDraftProfile(profile);
    setDraftConfig(templateConfig);
    setEditingHero(true);
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(draftProfile);
    onUpdateConfig(draftConfig);
    setEditingHero(false);
  };

  const showEditor = editingHero || editMode;

  return (
    <div>
      {/* Bright Airy Floating Island Hero Section */}
      <section
        aria-label="Halaman Utama Pulau Geometri"
        className="relative overflow-hidden bg-gradient-to-b from-[#3195e0] via-[#41a0eb] to-[#7ec4f8] pt-8 pb-20 lg:min-h-[760px]"
      >
        {/* Background Plate Image + Mirror-Extended Looping Video */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={PLATE_URL}
            alt=""
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center opacity-95"
          />
          <video
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="motion-safe-only absolute top-0 left-[-5.556%] h-full w-[111.11%] max-w-none object-cover object-center mix-blend-normal"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f7ac4]/55 via-[#3195e0]/20 to-transparent" />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Course & Student Identity Ribbon */}
          <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-white/40 bg-white/90 px-5 py-3.5 text-slate-900 shadow-lg backdrop-blur-md">
            {!showEditor ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-0.5 text-left">
                  <p className="text-xs font-semibold tracking-wide text-sky-700">
                    {templateConfig.subjek} · {templateConfig.bab}
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    Pembina: {profile.namaPelajar}
                    <span className="font-normal text-slate-600">
                      {' '}
                      · {profile.kursus}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openEditor}
                  className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:self-center"
                >
                  <PencilLine className="h-3.5 w-3.5" />
                  Sunting Templat
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveHero} className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
                    Sunting Kandungan Halaman Utama (Templat)
                  </p>
                  {editingHero && (
                    <button
                      type="button"
                      onClick={() => setEditingHero(false)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Tutup
                    </button>
                  )}
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nama Pelajar
                    <input
                      type="text"
                      value={editMode ? profile.namaPelajar : draftProfile.namaPelajar}
                      onChange={(e) => {
                        if (editMode) {
                          onUpdateProfile({ ...profile, namaPelajar: e.target.value });
                        } else {
                          setDraftProfile({ ...draftProfile, namaPelajar: e.target.value });
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-700">
                    Tajuk Kursus
                    <input
                      type="text"
                      value={editMode ? profile.kursus : draftProfile.kursus}
                      onChange={(e) => {
                        if (editMode) {
                          onUpdateProfile({ ...profile, kursus: e.target.value });
                        } else {
                          setDraftProfile({ ...draftProfile, kursus: e.target.value });
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-700">
                    Subjek
                    <input
                      type="text"
                      value={editMode ? templateConfig.subjek : draftConfig.subjek}
                      onChange={(e) => {
                        if (editMode) {
                          onUpdateConfig({ ...templateConfig, subjek: e.target.value });
                        } else {
                          setDraftConfig({ ...draftConfig, subjek: e.target.value });
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-700">
                    Bab / Topik
                    <input
                      type="text"
                      value={editMode ? templateConfig.bab : draftConfig.bab}
                      onChange={(e) => {
                        if (editMode) {
                          onUpdateConfig({ ...templateConfig, bab: e.target.value });
                        } else {
                          setDraftConfig({ ...draftConfig, bab: e.target.value });
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-700">
                    Teks Highlighter Atas
                    <input
                      type="text"
                      value={editMode ? templateConfig.heroKicker : draftConfig.heroKicker}
                      onChange={(e) => {
                        if (editMode) {
                          onUpdateConfig({ ...templateConfig, heroKicker: e.target.value });
                        } else {
                          setDraftConfig({ ...draftConfig, heroKicker: e.target.value });
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-700">
                    Tajuk Besar Hero
                    <input
                      type="text"
                      value={editMode ? templateConfig.heroTitle : draftConfig.heroTitle}
                      onChange={(e) => {
                        if (editMode) {
                          onUpdateConfig({ ...templateConfig, heroTitle: e.target.value });
                        } else {
                          setDraftConfig({ ...draftConfig, heroTitle: e.target.value });
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-700 sm:col-span-2">
                    Teks Highlighter Bawah
                    <input
                      type="text"
                      value={editMode ? templateConfig.heroHighlight : draftConfig.heroHighlight}
                      onChange={(e) => {
                        if (editMode) {
                          onUpdateConfig({ ...templateConfig, heroHighlight: e.target.value });
                        } else {
                          setDraftConfig({ ...draftConfig, heroHighlight: e.target.value });
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-700 sm:col-span-2">
                    Pengenalan Ringkas
                    <textarea
                      rows={2}
                      value={editMode ? profile.pengenalanRingkas : draftProfile.pengenalanRingkas}
                      onChange={(e) => {
                        if (editMode) {
                          onUpdateProfile({ ...profile, pengenalanRingkas: e.target.value });
                        } else {
                          setDraftProfile({ ...draftProfile, pengenalanRingkas: e.target.value });
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900"
                    />
                  </label>
                </div>

                {!editMode && (
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingHero(false)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-sky-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-sky-700"
                    >
                      Simpan Templat
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Skyprompt-inspired Typographic Stack */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-3 flex justify-center">
              <HighlighterSwipe
                rotation={-1.6}
                variant="wide"
                className="text-lg sm:text-2xl"
              >
                {templateConfig.heroKicker}
              </HighlighterSwipe>
            </div>

            <h1 className="font-serif-display hero-headline-stroke text-balance text-5xl leading-[1.03] text-white sm:text-7xl lg:text-[84px]">
              {templateConfig.heroTitle}
            </h1>

            <div className="mt-2 flex justify-center">
              <HighlighterSwipe
                rotation={1.2}
                variant="wide"
                className="text-xl sm:text-3xl"
              >
                {templateConfig.heroHighlight}
              </HighlighterSwipe>
            </div>

            <p className="mx-auto mt-5 max-w-2xl rounded-xl bg-sky-950/30 px-4 py-2.5 text-sm leading-relaxed font-medium text-white backdrop-blur-[2px] sm:text-base">
              {profile.pengenalanRingkas}
            </p>
          </div>

          {/* 4 Fanned Art/Geometry Cards Seated Over the Floating Island */}
          <div className="relative mx-auto mt-10 flex max-w-4xl flex-col items-center">
            <div className="relative flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap sm:gap-2">
              <div className="hidden lg:flex flex-col items-end mr-3 -mt-6">
                <HighlighterSwipe rotation={-9} variant="compact" className="text-sm">
                  Mulakan Dari Asas!
                </HighlighterSwipe>
                <svg
                  aria-hidden="true"
                  width="54"
                  height="38"
                  viewBox="0 0 54 38"
                  className="mt-1 mr-2 text-[#f6f03b] drop-shadow"
                >
                  <path
                    d="M6 6 C18 22, 34 26, 48 24 M40 16 L49 24 L39 31"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Card 1 */}
              <button
                type="button"
                onClick={() => onNavigate('nota')}
                className="group relative h-[178px] w-[142px] rounded-xl border-[5px] border-white bg-gradient-to-br from-sky-50 to-sky-100 p-3 text-left shadow-xl transition-all duration-200 hover:-translate-y-4 hover:rotate-0 hover:scale-105 focus-visible:outline-2 focus-visible:outline-white sm:-rotate-[11deg]"
              >
                <div className="flex h-20 items-center justify-center rounded-lg bg-white/90 p-2">
                  <svg viewBox="0 0 90 54" className="h-full w-full">
                    <rect
                      x="8"
                      y="10"
                      width="74"
                      height="34"
                      rx="3"
                      fill="#38bdf8"
                      stroke="#0369a1"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <p className="mt-2.5 text-xs font-bold text-slate-900">
                  Segi Empat Tepat
                </p>
                <p className="font-mono-tabular text-[11px] font-semibold text-sky-700">
                  Panjang × Lebar
                </p>
              </button>

              {/* Card 2 */}
              <button
                type="button"
                onClick={() => onNavigate('aktiviti')}
                className="group relative h-[178px] w-[142px] rounded-xl border-[5px] border-white bg-gradient-to-br from-amber-50 to-amber-100 p-3 text-left shadow-xl transition-all duration-200 hover:-translate-y-4 hover:rotate-0 hover:scale-105 focus-visible:outline-2 focus-visible:outline-white sm:-rotate-[4deg] sm:-translate-y-2"
              >
                <div className="flex h-20 items-center justify-center rounded-lg bg-white/90 p-2">
                  <svg viewBox="0 0 70 70" className="h-full w-full">
                    <rect
                      x="13"
                      y="13"
                      width="44"
                      height="44"
                      rx="3"
                      fill="#fbbf24"
                      stroke="#b45309"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <p className="mt-2.5 text-xs font-bold text-slate-900">
                  Segi Empat Sama
                </p>
                <p className="font-mono-tabular text-[11px] font-semibold text-amber-800">
                  Sisi × Sisi
                </p>
              </button>

              {/* Card 3 */}
              <button
                type="button"
                onClick={() => onNavigate('interaktif')}
                className="group relative h-[178px] w-[142px] rounded-xl border-[5px] border-white bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 text-left shadow-xl transition-all duration-200 hover:-translate-y-4 hover:rotate-0 hover:scale-105 focus-visible:outline-2 focus-visible:outline-white sm:rotate-[4deg] sm:-translate-y-2"
              >
                <div className="flex h-20 items-center justify-center rounded-lg bg-white/90 p-2">
                  <svg viewBox="0 0 80 65" className="h-full w-full">
                    <polygon
                      points="40,8 72,56 8,56"
                      fill="#34d399"
                      stroke="#047857"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="mt-2.5 text-xs font-bold text-slate-900">
                  Segi Tiga
                </p>
                <p className="font-mono-tabular text-[11px] font-semibold text-emerald-800">
                  ½ × Tapak × Tinggi
                </p>
              </button>

              {/* Card 4 */}
              <button
                type="button"
                onClick={() => onNavigate('interaktif')}
                className="group relative h-[178px] w-[142px] rounded-xl border-[5px] border-white bg-gradient-to-br from-rose-50 to-rose-100 p-3 text-left shadow-xl transition-all duration-200 hover:-translate-y-4 hover:rotate-0 hover:scale-105 focus-visible:outline-2 focus-visible:outline-white sm:rotate-[11deg]"
              >
                <div className="flex h-20 items-center justify-center rounded-lg bg-white/90 p-2">
                  <svg viewBox="0 0 80 70" className="h-full w-full">
                    <rect
                      x="12"
                      y="32"
                      width="56"
                      height="30"
                      fill="#fb7185"
                      stroke="#be123c"
                      strokeWidth="2.2"
                    />
                    <polygon
                      points="12,32 40,8 68,32"
                      fill="#fde047"
                      stroke="#be123c"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="mt-2.5 text-xs font-bold text-slate-900">
                  Gabungan 2D
                </p>
                <p className="font-mono-tabular text-[11px] font-semibold text-rose-700">
                  Perimeter &amp; Luas
                </p>
              </button>

              <div className="hidden lg:flex flex-col items-start ml-3 mt-12">
                <svg
                  aria-hidden="true"
                  width="50"
                  height="34"
                  viewBox="0 0 50 34"
                  className="mb-1 text-[#f6f03b] drop-shadow"
                >
                  <path
                    d="M44 28 C28 24, 16 16, 8 6 M6 16 L7 5 L18 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <HighlighterSwipe rotation={-5} variant="compact" className="text-sm">
                  Uji Kuiz AI!
                </HighlighterSwipe>
              </div>
            </div>

            {/* Island Call To Action */}
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <HighlighterSwipe rotation={-1} variant="compact" className="text-xs">
                Interaktif &amp; Boleh Disunting
              </HighlighterSwipe>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('nota')}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-base font-bold text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Mula Belajar
                  <ArrowRight className="h-4 w-4 text-sky-600" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('interaktif')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-sky-900/60 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-sky-900/80"
                >
                  <Gamepad2 className="h-4 w-4 text-[#f6f03b]" />
                  Kuiz &amp; Embed Gamifikasi
                </button>
                <button
                  type="button"
                  disabled={downloadingVideo}
                  onClick={handleDownloadHeroVideo}
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/20 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30 disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  {downloadingVideo ? 'Memuat turun...' : 'Muat Turun Video (.mp4)'}
                </button>
              </div>
              <p className="text-xs font-medium text-white drop-shadow-sm">
                {templateConfig.standardKandungan} · {templateConfig.standardPembelajaran}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Peta 8 Laman Pembelajaran */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              Struktur Templat Portal Pembelajaran
            </p>
            <h2 className="font-serif-display mt-1 text-3xl text-slate-900 sm:text-4xl">
              Lapan Komponen Lengkap Modul
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Semua halaman di bawah boleh disesuaikan sepenuhnya — anda boleh memuat naik nota, gambar rakan pembelajaran serta membenamkan pautan gamifikasi dan borang anda sendiri.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DIRECTORY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-xs font-semibold text-sky-700">
                      {item.nombor}
                    </span>
                    <Icon className="h-4 w-4 text-slate-400 transition-colors group-hover:text-sky-600" />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-sky-700">
                    {item.tajuk}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {item.ringkas}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                  Buka halaman
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
