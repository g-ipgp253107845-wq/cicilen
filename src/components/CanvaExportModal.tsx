import React, { useMemo, useState } from 'react';
import {
  Check,
  ClipboardCopy,
  Download,
  FileCode2,
  FolderArchive,
  Info,
  Printer,
  Video,
  X,
} from 'lucide-react';
import {
  AssurePhase,
  CreatorProfile,
  PeerSessionItem,
  ReferenceItem,
  SiteTemplateConfig,
} from '../types';
import {
  buildAllCanvaSvgPages,
  buildCanvaTextSummary,
  buildPrintableHtmlForCanva,
  createZipBlob,
  downloadBlob,
  downloadExternalAsset,
  downloadSvgAsPng,
  downloadTextFile,
} from '../utils/canvaExport';

const HERO_VIDEO_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/81764d30-8120-4ab5-8491-4dd852b82496.mp4';
const HERO_PLATE_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/dc4ac5c7-4eee-48ab-814c-cbba3c9fd1b7.jpg';

interface CanvaExportModalProps {
  open: boolean;
  onClose: () => void;
  profile: CreatorProfile;
  templateConfig: SiteTemplateConfig;
  assurePhases: AssurePhase[];
  peerSessions: PeerSessionItem[];
  references: ReferenceItem[];
}

export const CanvaExportModal: React.FC<CanvaExportModalProps> = ({
  open,
  onClose,
  profile,
  templateConfig,
  assurePhases,
  peerSessions,
  references,
}) => {
  const [copiedType, setCopiedType] = useState<
    'url' | 'video' | 'makmal' | 'iframe' | 'text' | null
  >(null);

  const svgPages = useMemo(
    () =>
      buildAllCanvaSvgPages(
        profile,
        templateConfig,
        assurePhases,
        peerSessions,
        references
      ),
    [profile, templateConfig, assurePhases, peerSessions, references]
  );

  if (!open) return null;

  const baseOrigin =
    typeof window !== 'undefined' ? window.location.origin : '';
  const liveUrl = typeof window !== 'undefined' ? window.location.href : '';
  const videoNoteUrl = `${baseOrigin}/?modul=nota&tab=video`;
  const makmalUrl = `${baseOrigin}/?modul=interaktif&tab=makmal`;
  const iframeSnippet = `<iframe src="${liveUrl}" width="100%" height="720" style="border:0;border-radius:12px;" allowfullscreen></iframe>`;

  const handleCopy = async (
    type: 'url' | 'video' | 'makmal' | 'iframe' | 'text',
    text: string
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      window.setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  const handleDownloadAllSvgZip = () => {
    const zipBlob = createZipBlob(
      svgPages.map((p) => ({ name: p.filename, content: p.svg }))
    );
    downloadBlob(zipBlob, 'Pulau_Geometri_8_Halaman_Canva_SVG.zip');
  };

  const handleDownloadPrintableHtml = () => {
    const html = buildPrintableHtmlForCanva(svgPages);
    downloadTextFile(
      'Pulau_Geometri_Dek_8_Halaman_Canva.html',
      html,
      'text/html;charset=utf-8'
    );
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Eksport ke Canva"
        className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      >
        <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Eksport Laman Web Ke Canva
              </p>
              <h3 className="font-serif-display mt-1 text-2xl text-slate-900">
                Fail Eksport 8 Halaman Boleh Sunting di Canva
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Honest Technical Guide Box */}
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4 text-xs leading-relaxed text-slate-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
            <div>
              <p className="font-bold text-slate-900">
                Cara paling tepat menyunting reka bentuk &amp; menjalankan laman hidup ini dalam Canva:
              </p>
              <p className="mt-1">
                Canva tidak menyokong import fail kod React (<span className="font-mono-tabular">.tsx</span>) secara terus, tetapi Canva boleh mengimport <strong>Fail Vektor SVG</strong> dan <strong>PDF berbilang halaman</strong> menjadi lapisan reka bentuk yang boleh disunting sepenuhnya, serta membenarkan anda membenamkan laman hidup ini melalui <strong>Apps → Embed</strong>.
              </p>
            </div>
          </div>

          {/* Primary 3 Download Bundles */}
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {/* 1. ZIP of 8 Editable SVG Website Pages */}
            <div className="flex flex-col justify-between rounded-xl border border-sky-300 bg-sky-50/40 p-4">
              <div>
                <FolderArchive className="h-6 w-6 text-sky-700" />
                <h4 className="mt-2.5 text-sm font-bold text-slate-900">
                  1. Pek ZIP 8 Fail SVG (.zip)
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Mengandungi kesemua 8 halaman laman web (<span className="font-mono-tabular">1440×900</span>) sebagai vektor boleh sunting. Muat naik ke Canva untuk sunting teks, warna dan susun atur.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadAllSvgZip}
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
              >
                <Download className="h-3.5 w-3.5" />
                Muat Turun ZIP (8 SVG)
              </button>
            </div>

            {/* 2. Print 8-page PDF directly for Canva Import */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <Printer className="h-6 w-6 text-emerald-700" />
                <h4 className="mt-2.5 text-sm font-bold text-slate-900">
                  2. PDF 8 Halaman (Import Canva)
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Jana PDF lengkap 8 halaman (<span className="font-mono-tabular">Save as PDF</span>), kemudian gunakan <strong>Upload / Import file</strong> di Canva supaya kesemua 8 halaman menjadi slaid/laman Canva boleh sunting.
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
              >
                <Printer className="h-3.5 w-3.5" />
                Simpan PDF 8 Halaman
              </button>
            </div>

            {/* 3. Standalone HTML 8-Page Deck */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <FileCode2 className="h-6 w-6 text-amber-700" />
                <h4 className="mt-2.5 text-sm font-bold text-slate-900">
                  3. Fail Dek HTML (.html)
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Fail HTML tunggal yang memuatkan paparan 8 halaman berserta butang eksport PDF terbina untuk kegunaan luar talian.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadPrintableHtml}
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                <Download className="h-3.5 w-3.5" />
                Muat Turun Fail .HTML
              </button>
            </div>
          </div>

          {/* Individual 8-Page SVG/PNG Picker */}
          <div className="mt-6 border-t border-slate-200 pt-5">
            <h4 className="text-sm font-bold text-slate-900">
              Muat Turun Halaman Secara Berasingan (SVG Boleh Sunting / PNG)
            </h4>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {svgPages.map((page, i) => (
                <div
                  key={page.filename}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3"
                >
                  <div>
                    <span className="font-mono-tabular text-[11px] font-bold text-sky-700">
                      0{i + 1}
                    </span>
                    <p className="text-xs font-bold text-slate-900">
                      {page.title}
                    </p>
                  </div>
                  <div className="mt-2.5 flex gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        downloadTextFile(
                          page.filename,
                          page.svg,
                          'image/svg+xml;charset=utf-8'
                        )
                      }
                      className="flex-1 rounded border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] font-bold text-sky-800 hover:bg-sky-100"
                    >
                      SVG
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        downloadSvgAsPng(
                          page.svg,
                          page.filename.replace('.svg', '.png')
                        )
                      }
                      className="flex-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100"
                    >
                      PNG
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Muat Turun Media Latar Pengenalan (Video MP4 & Gambar Pulau) */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Video className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Video &amp; Gambar Latar Halaman Pengenalan (Untuk Latar Canva)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Muat turun video animasi pulau terapung (<span className="font-mono-tabular">.mp4</span>) dan gambar latar (<span className="font-mono-tabular">.jpg</span>) untuk dimasukkan terus sebagai latar belakang dalam Canva.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    downloadExternalAsset(
                      HERO_VIDEO_URL,
                      'Pulau_Geometri_Video_Latar.mp4'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-amber-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  Muat Turun Video (.mp4)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downloadExternalAsset(
                      HERO_PLATE_URL,
                      'Pulau_Geometri_Latar_Pulau.jpg'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3.5 py-2 text-xs font-bold text-amber-900 hover:bg-amber-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  Muat Turun Gambar (.jpg)
                </button>
              </div>
            </div>
          </div>

          {/* Embed Live Interactive App Inside Canva */}
          <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Masukkan Laman Hidup Interaktif Ke Dalam Canva (Apps → Embed)
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Buka reka bentuk Canva anda → klik <strong>Apps → Embed</strong> → tampal pautan di bawah supaya Makmal Geometri &amp; Kuiz berfungsi secara langsung di dalam Canva.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy('url', liveUrl)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-100"
                  >
                    {copiedType === 'url' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <ClipboardCopy className="h-3.5 w-3.5" />
                    )}
                    {copiedType === 'url' ? 'Pautan Disalin!' : 'Salin URL Laman'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy('video', videoNoteUrl)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800 hover:bg-sky-100"
                  >
                    {copiedType === 'video' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <ClipboardCopy className="h-3.5 w-3.5" />
                    )}
                    {copiedType === 'video' ? 'Disalin!' : 'Salin Link Video Penerangan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy('makmal', makmalUrl)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800 hover:bg-sky-100"
                  >
                    {copiedType === 'makmal' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <ClipboardCopy className="h-3.5 w-3.5" />
                    )}
                    {copiedType === 'makmal' ? 'Disalin!' : 'Salin Link Makmal Geometri'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy('iframe', iframeSnippet)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-100"
                  >
                    {copiedType === 'iframe' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <ClipboardCopy className="h-3.5 w-3.5" />
                    )}
                    {copiedType === 'iframe' ? 'Kod Disalin!' : 'Salin Kod Iframe'}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        'text',
                        buildCanvaTextSummary(
                          profile,
                          templateConfig,
                          assurePhases
                        )
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-700"
                  >
                    {copiedType === 'text' ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <ClipboardCopy className="h-3.5 w-3.5" />
                    )}
                    {copiedType === 'text' ? 'Teks Disalin!' : 'Salin Teks Canva Docs'}
                  </button>
                </div>
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p className="font-mono-tabular truncate rounded border border-slate-200 bg-white px-3 py-1.5">
                  <strong className="font-sans text-slate-800">Nota (Video Penerangan):</strong> {videoNoteUrl}
                </p>
                <p className="font-mono-tabular truncate rounded border border-slate-200 bg-white px-3 py-1.5">
                  <strong className="font-sans text-slate-800">Modul 5 (Makmal Geometri):</strong> {makmalUrl}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only 8-Page Vector Deck for crisp Canva PDF Import */}
      <div className="hidden print:block">
        {svgPages.map((p) => (
          <div
            key={p.filename}
            className="w-full break-after-page"
            dangerouslySetInnerHTML={{ __html: p.svg }}
          />
        ))}
      </div>
    </>
  );
};
