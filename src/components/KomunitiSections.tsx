import React, { useState } from 'react';
import {
  BookMarked,
  Check,
  ExternalLink,
  GraduationCap,
  ImagePlus,
  Link2,
  Mail,
  MessageCircle,
  Plus,
  Send,
  Star,
  Trash2,
  Upload,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  CreatorProfile,
  FeedbackEntry,
  PeerSessionItem,
  ReferenceItem,
  SiteTemplateConfig,
} from '../types';
import { normalizeEmbedUrl, readFileAsDataUrl } from '../utils/embedHelpers';

/* ---------------------------------------------------------
   1. RAKAN PEMBELAJARAN (DENGAN MUAT NAIK GAMBAR SENDIRI)
   --------------------------------------------------------- */
interface RakanPembelajaranSectionProps {
  sessions: PeerSessionItem[];
  onAddSession: (item: PeerSessionItem) => void;
  onDeleteSession: (id: string) => void;
}

export const RakanPembelajaranSection: React.FC<
  RakanPembelajaranSectionProps
> = ({ sessions, onAddSession, onDeleteSession }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [jenis, setJenis] = useState<PeerSessionItem['jenis']>('Bersemuka');
  const [tajuk, setTajuk] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [kapsyen, setKapsyen] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError('');
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageError('Sila pilih fail gambar (JPG, PNG, WEBP).');
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setImagePreview(dataUrl);
    } catch {
      setImageError('Gagal memuatkan gambar.');
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      setImageError('Sila muat naik gambar atau masukkan pautan gambar.');
      return;
    }
    if (!tajuk.trim() || !kapsyen.trim()) {
      setImageError('Sila isi tajuk dan kapsyen gambar.');
      return;
    }

    onAddSession({
      id: `peer-${Date.now()}`,
      jenis,
      tajuk: tajuk.trim(),
      lokasiAtauPlatform: lokasi.trim() || 'Sesi Kolaborasi',
      kapsyen: kapsyen.trim(),
      imageUrl: imagePreview,
    });

    setTajuk('');
    setLokasi('');
    setKapsyen('');
    setImagePreview('');
    setShowUpload(false);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            Modul 06 · Kolaborasi &amp; Komuniti
          </p>
          <h2 className="font-serif-display mt-1 text-3xl text-slate-900 sm:text-4xl">
            Rakan Pembelajaran
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Dokumentasi gambar atau tangkapan skrin perbincangan bersama secara maya dan bersemuka. Anda boleh memuat naik gambar sesi anda sendiri di bawah.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUpload((s) => !s)}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
        >
          <ImagePlus className="h-4 w-4" />
          {showUpload ? 'Tutup Borang Muat Naik' : 'Muat Naik Gambar Sendiri'}
        </button>
      </div>

      {/* Borang Muat Naik Gambar Rakan Pembelajaran */}
      {showUpload && (
        <form
          onSubmit={handleAdd}
          className="mb-8 rounded-xl border border-sky-200 bg-white p-6 shadow-sm"
        >
          <h3 className="text-base font-bold text-slate-900">
            Tambah Gambar / Tangkapan Skrin Perbincangan
          </h3>
          {imageError && (
            <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
              {imageError}
            </p>
          )}

          <div className="mt-4 grid gap-5 md:grid-cols-[260px_1fr]">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-sky-300 bg-sky-50/50 p-4 text-center hover:bg-sky-50">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Pratonton gambar"
                  className="h-40 w-full rounded-lg object-cover"
                />
              ) : (
                <>
                  <Upload className="h-8 w-8 text-sky-600" />
                  <span className="mt-2 text-xs font-bold text-slate-800">
                    Pilih Gambar dari Peranti
                  </span>
                  <span className="mt-1 text-[11px] text-slate-500">
                    Foto sesi bersemuka, Google Meet atau screenshot chat
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>

            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Jenis Sesi
                  <select
                    value={jenis}
                    onChange={(e) =>
                      setJenis(e.target.value as PeerSessionItem['jenis'])
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  >
                    <option value="Bersemuka">Sesi Bersemuka</option>
                    <option value="Maya">Sesi Perbincangan Maya</option>
                    <option value="Tangkapan Skrin Chat">
                      Tangkapan Skrin Chat
                    </option>
                  </select>
                </label>

                <label className="block text-xs font-semibold text-slate-700">
                  Lokasi / Platform
                  <input
                    type="text"
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                    placeholder="Contoh: Google Meet / WhatsApp / Bilik Kuliah"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                  />
                </label>
              </div>

              <label className="block text-xs font-semibold text-slate-700">
                Tajuk Sesi
                <input
                  type="text"
                  required
                  value={tajuk}
                  onChange={(e) => setTajuk(e.target.value)}
                  placeholder="Contoh: Perbincangan Kumpulan Penyelesaian Masalah 6.3.1"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                Kapsyen
                <textarea
                  rows={2}
                  required
                  value={kapsyen}
                  onChange={(e) => setKapsyen(e.target.value)}
                  placeholder="Terangkan perkara yang dibincangkan bersama rakan pembelajaran anda..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </label>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-600 px-5 py-2 text-xs font-bold text-white hover:bg-sky-700"
                >
                  Simpan Gambar ke Galeri
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Photo Sessions Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {sessions.map((item) => (
          <figure
            key={item.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <div className="aspect-[4/3] w-full bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.tajuk}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
                  <Users className="h-4 w-4" />
                  {item.jenis} · {item.lokasiAtauPlatform}
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteSession(item.id)}
                  aria-label={`Padam ${item.tajuk}`}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-1 text-base font-bold text-slate-900">
                {item.tajuk}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {item.kapsyen}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Contoh Tangkapan Skrin Chat Kumpulan */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
              Contoh Paparan Perbincangan Chat Kumpulan
            </p>
            <h3 className="text-base font-bold text-slate-900">
              Kumpulan WhatsApp “Rakan Matematik Tahun 5 (SK 6.3)”
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <MessageCircle className="h-4 w-4" />
            Semakan rakan sebaya
          </span>
        </div>

        <div className="mx-auto max-w-2xl space-y-3 rounded-xl border border-slate-200 bg-[#efeae2] p-4 sm:p-5">
          <div className="max-w-[85%] rounded-xl rounded-tl-none bg-white p-3 shadow-sm">
            <p className="text-xs font-bold text-sky-700">Amirah Syafiqah</p>
            <p className="mt-1 text-sm text-slate-800">
              Salam semua, untuk soalan nombor 3 dalam kuiz tu, betul kan garis cantuman antara segi empat sama dan segi tiga di tengah tak perlu tambah untuk perimeter?
            </p>
            <p className="mt-1 text-right text-[11px] text-slate-400">09:14 PG</p>
          </div>

          <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-none bg-[#d9fdd3] p-3 shadow-sm">
            <p className="text-xs font-bold text-emerald-800">Anda (Pembina Laman)</p>
            <p className="mt-1 text-sm text-slate-800">
              Betul Amirah! Kita hanya kira 5 sisi luar sahaja (6 + 6 + 6 + 6 + 6 = 30 cm). Saya dah tambah garis putus-putus merah pada rajah supaya murid nampak sisi dalam tak dikira.
            </p>
            <p className="mt-1 text-right text-[11px] text-slate-500">09:16 PG ✓✓</p>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          Kapsyen: Sesi semakan rakan pembelajaran secara maya memastikan ketepatan konsep matematik sebelum portal digunakan oleh murid.
        </p>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------
   2. METADATA (PROFIL PEMBINA & SUMBER RUJUKAN BOLEH SUNTING)
   --------------------------------------------------------- */
interface MetadataSectionProps {
  profile: CreatorProfile;
  references: ReferenceItem[];
  onUpdateProfile: (next: CreatorProfile) => void;
  onUpdateReferences: (next: ReferenceItem[]) => void;
}

export const MetadataSection: React.FC<MetadataSectionProps> = ({
  profile,
  references,
  onUpdateProfile,
  onUpdateReferences,
}) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<CreatorProfile>(profile);
  const [savedNotice, setSavedNotice] = useState(false);

  const [newRefCat, setNewRefCat] = useState('Sumber Digital');
  const [newRefText, setNewRefText] = useState('');

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setForm((prev) => ({ ...prev, avatarUrl: dataUrl }));
    } catch {
      // ignore read failure
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(form);
    setEditing(false);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleAddReference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRefText.trim()) return;
    onUpdateReferences([
      ...references,
      {
        id: `ref-${Date.now()}`,
        kategori: newRefCat.trim() || 'Rujukan Tambahan',
        rujukan: newRefText.trim(),
      },
    ]);
    setNewRefText('');
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
          Modul 07 · Maklumat Pembina &amp; Bibliografi
        </p>
        <h2 className="font-serif-display mt-1 text-3xl text-slate-900 sm:text-4xl">
          Metadata &amp; Sumber Rujukan
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Profil Pembina */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <UserCheck className="h-5 w-5 text-sky-600" />
              Profil Pembina Laman Web
            </h3>
            <button
              type="button"
              onClick={() => {
                setForm(profile);
                setEditing((e) => !e);
              }}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              {editing ? 'Tutup Suntingan' : 'Sunting Profil'}
            </button>
          </div>

          {savedNotice && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
              <Check className="h-4 w-4" />
              Maklumat profil pembina telah dikemas kini.
            </div>
          )}

          {!editing ? (
            <div className="space-y-5">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <img
                  src={
                    profile.avatarUrl ||
                    '/src/assets/images/profil_pembina_pelajar_1794666386074.jpg'
                  }
                  alt={profile.namaPelajar}
                  referrerPolicy="no-referrer"
                  className="h-24 w-24 rounded-2xl border border-slate-200 object-cover shadow-sm"
                />
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {profile.namaPelajar}
                  </h4>
                  <p className="text-sm font-semibold text-sky-700">
                    {profile.kelas}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {profile.institusi}
                  </p>
                </div>
              </div>

              <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/70 text-sm">
                <div className="grid grid-cols-[120px_1fr] gap-2 p-3">
                  <dt className="font-semibold text-slate-600">Kursus</dt>
                  <dd className="font-medium text-slate-900">{profile.kursus}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2 p-3">
                  <dt className="font-semibold text-slate-600">Pensyarah</dt>
                  <dd className="font-medium text-slate-900">{profile.pensyarah}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2 p-3">
                  <dt className="font-semibold text-slate-600">E-mel</dt>
                  <dd className="flex items-center gap-1.5 font-medium text-sky-700">
                    <Mail className="h-3.5 w-3.5" />
                    {profile.emel}
                  </dd>
                </div>
              </dl>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-3">
              <div className="flex items-center gap-4">
                <img
                  src={
                    form.avatarUrl ||
                    '/src/assets/images/profil_pembina_pelajar_1794666386074.jpg'
                  }
                  alt="Pratonton profil"
                  className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
                />
                <label className="cursor-pointer rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100">
                  Muat Naik Foto Profil
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="sr-only"
                  />
                </label>
              </div>
              <label className="block text-xs font-semibold text-slate-700">
                Nama Pelajar
                <input
                  type="text"
                  value={form.namaPelajar}
                  onChange={(e) => setForm({ ...form, namaPelajar: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                Tajuk Kursus
                <input
                  type="text"
                  value={form.kursus}
                  onChange={(e) => setForm({ ...form, kursus: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                Kelas / Program
                <input
                  type="text"
                  value={form.kelas}
                  onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                Institusi / Sekolah
                <input
                  type="text"
                  value={form.institusi}
                  onChange={(e) => setForm({ ...form, institusi: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                Pensyarah Pembimbing
                <input
                  type="text"
                  value={form.pensyarah}
                  onChange={(e) => setForm({ ...form, pensyarah: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                E-mel
                <input
                  type="email"
                  value={form.emel}
                  onChange={(e) => setForm({ ...form, emel: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <button
                type="submit"
                className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700"
              >
                Simpan Perubahan
              </button>
            </form>
          )}
        </div>

        {/* Sumber Rujukan */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <BookMarked className="h-5 w-5 text-amber-600" />
            Sumber Rujukan (Format APA)
          </h3>

          <div className="mt-4 space-y-3">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="flex items-start justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
                    <GraduationCap className="mr-1 inline h-3.5 w-3.5" />
                    {ref.kategori}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                    {ref.rujukan}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateReferences(references.filter((r) => r.id !== ref.id))
                  }
                  aria-label="Padam rujukan"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleAddReference}
            className="mt-5 space-y-2.5 border-t border-slate-100 pt-4"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Tambah Rujukan Baharu
            </p>
            <div className="grid gap-2 sm:grid-cols-[160px_1fr]">
              <input
                type="text"
                value={newRefCat}
                onChange={(e) => setNewRefCat(e.target.value)}
                placeholder="Kategori"
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
              />
              <input
                type="text"
                value={newRefText}
                onChange={(e) => setNewRefText(e.target.value)}
                placeholder="Masukkan sitasi rujukan APA anda..."
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah Rujukan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------
   3. MAKLUMBALAS MURID & PENGUNJUNG (KOSONG + EMBED BORANG)
   --------------------------------------------------------- */
interface MaklumbalasSectionProps {
  entries: FeedbackEntry[];
  templateConfig: SiteTemplateConfig;
  onAddFeedback: (entry: FeedbackEntry) => void;
  onClearFeedback: () => void;
  onUpdateConfig: (next: SiteTemplateConfig) => void;
}

export const MaklumbalasSection: React.FC<MaklumbalasSectionProps> = ({
  entries,
  templateConfig,
  onAddFeedback,
  onClearFeedback,
  onUpdateConfig,
}) => {
  const [formTab, setFormTab] = useState<'terbina' | 'embed'>('terbina');

  // Borang Terbina state
  const [nama, setNama] = useState('');
  const [peranan, setPeranan] =
    useState<FeedbackEntry['peranan']>('Murid Tahun 5');
  const [bintang, setBintang] = useState(5);
  const [tahapKefahaman, setTahapKefahaman] =
    useState<FeedbackEntry['tahapKefahaman']>('Sangat Faham');
  const [komen, setKomen] = useState('');
  const [filterRole, setFilterRole] = useState<string>('Semua');
  const [submittedMsg, setSubmittedMsg] = useState(false);

  // Embed Form Editor state
  const [draftFormTitle, setDraftFormTitle] = useState(
    templateConfig.embeddedFormTitle
  );
  const [draftFormUrl, setDraftFormUrl] = useState(
    templateConfig.embeddedFormUrl
  );
  const [embedSaved, setEmbedSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !komen.trim()) return;

    const newEntry: FeedbackEntry = {
      id: `fb-${Date.now()}`,
      nama: nama.trim(),
      peranan,
      bintang,
      tahapKefahaman,
      komen: komen.trim(),
      tarikh: new Date().toLocaleDateString('ms-MY', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    onAddFeedback(newEntry);
    setNama('');
    setKomen('');
    setBintang(5);
    setSubmittedMsg(true);
    window.setTimeout(() => setSubmittedMsg(false), 3500);
  };

  const handleSaveEmbedForm = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      ...templateConfig,
      embeddedFormTitle: draftFormTitle.trim() || 'Borang Maklumbalas Saya',
      embeddedFormUrl: normalizeEmbedUrl(draftFormUrl),
    });
    setEmbedSaved(true);
    window.setTimeout(() => setEmbedSaved(false), 3000);
  };

  const filtered =
    filterRole === 'Semua'
      ? entries
      : entries.filter((e) => e.peranan === filterRole);

  const avgRating =
    entries.length > 0
      ? (
          entries.reduce((sum, item) => sum + item.bintang, 0) / entries.length
        ).toFixed(1)
      : '0.0';

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            Modul 08 · Penilaian Pengguna
          </p>
          <h2 className="font-serif-display mt-1 text-3xl text-slate-900 sm:text-4xl">
            Maklumbalas Murid &amp; Pengunjung
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setFormTab('terbina')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                formTab === 'terbina'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              Borang Terbina
            </button>
            <button
              type="button"
              onClick={() => setFormTab('embed')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                formTab === 'embed'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              <Link2 className="h-3.5 w-3.5" />
              Embed Borang Saya
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-mono-tabular text-sm font-bold text-slate-900">
              {avgRating} / 5.0
            </span>
            <span className="text-xs text-slate-500">
              ({entries.length} ulasan)
            </span>
          </div>
        </div>
      </div>

      {formTab === 'terbina' ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          {/* Borang Maklumbalas Terbina (Dikekalkan) */}
          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-xl border border-slate-200 bg-white p-6"
          >
            <h3 className="text-lg font-bold text-slate-900">
              Kongsikan Maklumbalas Anda
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Pandangan anda membantu penambahbaikan bahan pembelajaran Matematik Tahun 5 ini.
            </p>

            {submittedMsg && (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-800">
                Terima kasih! Maklumbalas anda telah dipaparkan pada dinding komen.
              </div>
            )}

            <div className="mt-4 space-y-4">
              <label className="block text-xs font-semibold text-slate-700">
                Nama Penuh
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Aiman Hakim (5 Bestari)"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Peranan
                  <select
                    value={peranan}
                    onChange={(e) =>
                      setPeranan(e.target.value as FeedbackEntry['peranan'])
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="Murid Tahun 5">Murid Tahun 5</option>
                    <option value="Guru">Guru</option>
                    <option value="Rakan Pelajar">Rakan Pelajar</option>
                    <option value="Pelawat">Pelawat</option>
                  </select>
                </label>

                <label className="block text-xs font-semibold text-slate-700">
                  Tahap Kefahaman
                  <select
                    value={tahapKefahaman}
                    onChange={(e) =>
                      setTahapKefahaman(
                        e.target.value as FeedbackEntry['tahapKefahaman']
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="Sangat Faham">Sangat Faham</option>
                    <option value="Faham">Faham</option>
                    <option value="Perlu Latihan Lagi">Perlu Latihan Lagi</option>
                  </select>
                </label>
              </div>

              <div>
                <span className="block text-xs font-semibold text-slate-700">
                  Penilaian Keseluruhan
                </span>
                <div className="mt-1.5 flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setBintang(star)}
                      aria-label={`${star} bintang`}
                      className="rounded-md p-1 hover:bg-slate-100"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= bintang
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <label className="block text-xs font-semibold text-slate-700">
                Ulasan / Cadangan
                <textarea
                  required
                  rows={4}
                  value={komen}
                  onChange={(e) => setKomen(e.target.value)}
                  placeholder="Nyatakan bahagian yang paling membantu anda atau cadangan penambahbaikan..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-700"
              >
                <Send className="h-4 w-4" />
                Hantar Maklumbalas
              </button>
            </div>
          </form>

          {/* Dinding Maklumbalas (Kosong Secara Lalai) */}
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {['Semua', 'Murid Tahun 5', 'Guru', 'Rakan Pelajar', 'Pelawat'].map(
                  (role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFilterRole(role)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        filterRole === role
                          ? 'border-sky-600 bg-sky-600 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {role}
                    </button>
                  )
                )}
              </div>

              {entries.length > 0 && (
                <button
                  type="button"
                  onClick={onClearFeedback}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Kosongkan Semua
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <MessageCircle className="mx-auto h-9 w-9 text-slate-300" />
                <p className="mt-3 text-sm font-bold text-slate-800">
                  Belum ada maklumbalas direkodkan
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Ruangan ini dikosongkan sebagai templat. Hantar maklumbalas menggunakan borang di sebelah kiri atau gunakan tab “Embed Borang Saya”.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {item.nama}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {item.peranan} · {item.tahapKefahaman} · {item.tarikh}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-4 w-4 ${
                              s <= item.bintang
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      “{item.komen}”
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* TAB EMBED BORANG PENGGUNA (Google Form / MS Form / Typeform) */
        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <form
            onSubmit={handleSaveEmbedForm}
            className="h-fit rounded-xl border border-slate-200 bg-white p-6"
          >
            <h3 className="text-base font-bold text-slate-900">
              Tetapan Embed Borang Anda
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              {templateConfig.embeddedFormDescription}
            </p>

            {embedSaved && (
              <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                Pautan borang telah disimpan!
              </div>
            )}

            <div className="mt-4 space-y-3.5">
              <label className="block text-xs font-semibold text-slate-700">
                Tajuk Borang
                <input
                  type="text"
                  value={draftFormTitle}
                  onChange={(e) => setDraftFormTitle(e.target.value)}
                  placeholder="Borang Maklumbalas Murid (Google Form)"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                Pautan Borang (URL)
                <input
                  type="url"
                  value={draftFormUrl}
                  onChange={(e) => setDraftFormUrl(e.target.value)}
                  placeholder="https://docs.google.com/forms/d/e/.../viewform"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-700"
              >
                Papar Borang Sekarang
              </button>
            </div>
          </form>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {templateConfig.embeddedFormTitle}
              </h3>
              {templateConfig.embeddedFormUrl && (
                <a
                  href={templateConfig.embeddedFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Buka Borang di Tab Baharu
                </a>
              )}
            </div>

            {templateConfig.embeddedFormUrl ? (
              <iframe
                src={templateConfig.embeddedFormUrl}
                title={templateConfig.embeddedFormTitle}
                className="h-[520px] w-full rounded-lg border border-slate-200 bg-slate-50"
              />
            ) : (
              <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <Link2 className="h-9 w-9 text-slate-300" />
                <p className="mt-3 text-sm font-bold text-slate-800">
                  Belum ada pautan borang dimasukkan
                </p>
                <p className="mt-1 max-w-md text-xs text-slate-500">
                  Tampal pautan Google Form, Microsoft Form atau Padlet anda di ruangan sebelah kiri untuk memaparkan borang maklumbalas anda terus di sini.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
