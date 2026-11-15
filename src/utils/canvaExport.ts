import {
  AssurePhase,
  CreatorProfile,
  PeerSessionItem,
  ReferenceItem,
  SiteTemplateConfig,
} from '../types';
import { QUIZ_QUESTIONS, RUBRIC_TP_LEVELS } from '../data/curriculumData';

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapLines(text: string, maxChars: number): string[] {
  const words = String(text || '').split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = w;
    } else {
      current = (current + ' ' + w).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

function svgHeaderBar(activeTitle: string, pageNum: string): string {
  return `
  <rect width="1440" height="900" fill="#f8fafc"/>
  <rect width="1440" height="72" fill="#3195e0"/>
  <circle cx="96" cy="36" r="14" fill="#f6f03b"/>
  <text x="122" y="44" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#ffffff">Pulau Geometri</text>
  <text x="1360" y="42" text-anchor="end" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#f6f03b">${escapeXml(
    pageNum
  )} · ${escapeXml(activeTitle)}</text>`;
}

export interface CanvaSvgPage {
  filename: string;
  title: string;
  svg: string;
}

/**
 * Generates all 8 website pages as 1440x900 editable vector SVG files for Canva.
 */
export function buildAllCanvaSvgPages(
  profile: CreatorProfile,
  config: SiteTemplateConfig,
  assurePhases: AssurePhase[],
  peerSessions: PeerSessionItem[],
  references: ReferenceItem[]
): CanvaSvgPage[] {
  const introLines = wrapLines(profile.pengenalanRingkas, 76).slice(0, 3);

  // Page 1: Pengenalan (Home) — Sky Hero Style
  const page1 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900">
  <defs>
    <linearGradient id="skyHero" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3195e0"/>
      <stop offset="100%" stop-color="#7ec4f8"/>
    </linearGradient>
  </defs>
  <rect width="1440" height="900" fill="url(#skyHero)"/>
  <!-- Nav -->
  <circle cx="96" cy="40" r="14" fill="#f6f03b"/>
  <text x="122" y="48" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#ffffff">Pulau Geometri</text>
  <text x="720" y="46" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#ffffff">Pengenalan   ·   Nota   ·   Aktiviti   ·   Pentaksiran   ·   Rakan</text>
  <rect x="1210" y="20" width="160" height="40" rx="20" fill="#ffffff"/>
  <text x="1290" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Kuiz Interaktif</text>

  <!-- Student & Course Card -->
  <rect x="270" y="88" width="900" height="72" rx="16" fill="#ffffff" fill-opacity="0.92"/>
  <text x="300" y="116" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0369a1">${escapeXml(
    config.subjek
  )} · ${escapeXml(config.bab)}</text>
  <text x="300" y="142" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">Pembina: ${escapeXml(
    profile.namaPelajar
  )} · ${escapeXml(profile.kursus)}</text>

  <!-- Highlighter + Headline -->
  <rect x="520" y="185" width="400" height="44" rx="8" fill="#f6f03b"/>
  <text x="720" y="215" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#161c08">${escapeXml(
    config.heroKicker
  )}</text>
  <text x="720" y="305" text-anchor="middle" font-family="Georgia, serif" font-size="82" font-weight="bold" fill="#ffffff">${escapeXml(
    config.heroTitle
  )}</text>
  <rect x="490" y="325" width="460" height="48" rx="8" fill="#f6f03b"/>
  <text x="720" y="357" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#161c08">${escapeXml(
    config.heroHighlight
  )}</text>

  <!-- Intro Box -->
  <rect x="260" y="392" width="920" height="95" rx="14" fill="#0c4a6e" fill-opacity="0.35"/>
  ${introLines
    .map(
      (l, i) =>
        `<text x="720" y="${
          424 + i * 24
        }" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#ffffff">${escapeXml(
          l
        )}</text>`
    )
    .join('\n  ')}

  <!-- Floating Island & Clouds -->
  <ellipse cx="720" cy="790" rx="520" ry="75" fill="#ffffff" fill-opacity="0.85"/>
  <ellipse cx="720" cy="740" rx="280" ry="42" fill="#4ade80"/>
  <path d="M560 755 L720 860 L880 755 Z" fill="#92400e" fill-opacity="0.85"/>

  <!-- 4 Fanned Cards -->
  <g transform="translate(360, 520) rotate(-10)">
    <rect width="155" height="190" rx="14" fill="#f0f9ff" stroke="#ffffff" stroke-width="6"/>
    <rect x="28" y="30" width="98" height="60" rx="4" fill="#38bdf8" stroke="#0369a1" stroke-width="3"/>
    <text x="16" y="135" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Segi Empat Tepat</text>
    <text x="16" y="158" font-family="Arial, sans-serif" font-size="13" fill="#0369a1">Panjang × Lebar</text>
  </g>
  <g transform="translate(545, 505) rotate(-3)">
    <rect width="155" height="190" rx="14" fill="#fffbeb" stroke="#ffffff" stroke-width="6"/>
    <rect x="45" y="28" width="65" height="65" rx="4" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>
    <text x="16" y="135" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Segi Empat Sama</text>
    <text x="16" y="158" font-family="Arial, sans-serif" font-size="13" fill="#b45309">Sisi × Sisi</text>
  </g>
  <g transform="translate(730, 505) rotate(4)">
    <rect width="155" height="190" rx="14" fill="#ecfdf5" stroke="#ffffff" stroke-width="6"/>
    <polygon points="78,24 122,94 34,94" fill="#34d399" stroke="#047857" stroke-width="3"/>
    <text x="16" y="135" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Segi Tiga</text>
    <text x="16" y="158" font-family="Arial, sans-serif" font-size="13" fill="#047857">½ × Tapak × Tinggi</text>
  </g>
  <g transform="translate(915, 520) rotate(10)">
    <rect width="155" height="190" rx="14" fill="#fff1f2" stroke="#ffffff" stroke-width="6"/>
    <rect x="38" y="52" width="78" height="42" fill="#fb7185" stroke="#be123c" stroke-width="2.5"/>
    <polygon points="38,52 77,22 116,52" fill="#fde047" stroke="#be123c" stroke-width="2.5"/>
    <text x="16" y="135" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Gabungan 2D</text>
    <text x="16" y="158" font-family="Arial, sans-serif" font-size="13" fill="#be123c">Perimeter &amp; Luas</text>
  </g>
</svg>`;

  // Page 2: Nota Multimedia & Formula
  const page2 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900">
  ${svgHeaderBar('Nota Pembelajaran', '02')}
  <text x="80" y="140" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="#0f172a">Nota Perimeter &amp; Luas Bentuk Gabungan</text>
  <text x="80" y="176" font-family="Arial, sans-serif" font-size="18" fill="#475569">${escapeXml(
    config.standardPembelajaran
  )}</text>

  <!-- Box 1: Perimeter -->
  <rect x="80" y="215" width="620" height="360" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="115" y="265" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#0369a1">1. Konsep Perimeter (Unit: cm, m)</text>
  <text x="115" y="305" font-family="Arial, sans-serif" font-size="18" fill="#334155">Jumlah ukuran jarak semua sisi LUAR bentuk gabungan.</text>
  <path d="M 180 350 L 340 350 L 340 420 L 520 420 L 520 510 L 180 510 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="5"/>
  <line x1="180" y1="420" x2="340" y2="420" stroke="#dc2626" stroke-width="3" stroke-dasharray="8 6"/>
  <text x="260" y="448" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#dc2626">Sisi Dalam (JANGAN KIRA!)</text>

  <!-- Box 2: Luas -->
  <rect x="740" y="215" width="620" height="360" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="775" y="265" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#b45309">2. Konsep Luas (Unit: cm², m²)</text>
  <text x="775" y="305" font-family="Arial, sans-serif" font-size="18" fill="#334155">Pecahkan bentuk kepada Bentuk A + Bentuk B, kemudian jumlahkan.</text>

  <rect x="775" y="340" width="550" height="62" rx="10" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1.5"/>
  <text x="800" y="378" font-family="Arial, sans-serif" font-size="19" font-weight="bold" fill="#0f172a">Segi Empat Tepat = Panjang × Lebar</text>

  <rect x="775" y="416" width="550" height="62" rx="10" fill="#fffbeb" stroke="#fde68a" stroke-width="1.5"/>
  <text x="800" y="454" font-family="Arial, sans-serif" font-size="19" font-weight="bold" fill="#0f172a">Segi Empat Sama = Sisi × Sisi</text>

  <rect x="775" y="492" width="550" height="62" rx="10" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.5"/>
  <text x="800" y="530" font-family="Arial, sans-serif" font-size="19" font-weight="bold" fill="#0f172a">Segi Tiga = ½ × Tapak × Tinggi</text>

  <!-- Tip Kesilapan Lazim -->
  <rect x="80" y="610" width="1280" height="220" rx="18" fill="#fef9c3" stroke="#facc15" stroke-width="2"/>
  <text x="115" y="660" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#161c08">3 Kesilapan Lazim Yang Perlu Dielakkan</text>
  <text x="115" y="705" font-family="Arial, sans-serif" font-size="18" fill="#334155">1. Menambah panjang garis cantuman di tengah semasa mengira perimeter.</text>
  <text x="115" y="745" font-family="Arial, sans-serif" font-size="18" fill="#334155">2. Menggunakan sisi sendeng segi tiga sebagai tinggi tegak dalam formula luas.</text>
  <text x="115" y="785" font-family="Arial, sans-serif" font-size="18" fill="#334155">3. Tertukar unit antara Perimeter (cm / m) dan Luas (cm² / m²).</text>
</svg>`;

  // Page 3: Aktiviti Pembelajaran Model ASSURE
  const page3 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900">
  ${svgHeaderBar('Aliran RPH Model ASSURE', '03')}
  <text x="80" y="140" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="#0f172a">Aliran RPH Berintegrasikan Model ASSURE</text>
  <text x="80" y="175" font-family="Arial, sans-serif" font-size="18" fill="#0369a1">Disediakan oleh: ${escapeXml(
    profile.namaPelajar
  )} · ${escapeXml(profile.kelas)}</text>

  <!-- Set Induksi Strip -->
  <rect x="80" y="200" width="1280" height="92" rx="14" fill="#fffbeb" stroke="#fbbf24" stroke-width="2"/>
  <text x="108" y="232" font-family="Arial, sans-serif" font-size="17" font-weight="bold" fill="#b45309">${escapeXml(
    config.setInduksiTajuk
  )}</text>
  <text x="108" y="264" font-family="Arial, sans-serif" font-size="15" fill="#334155">${escapeXml(
    config.setInduksiTeks.slice(0, 128)
  )}</text>

  <!-- 6 ASSURE Cards -->
  ${assurePhases
    .slice(0, 6)
    .map((p, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const x = 80 + col * 435;
      const y = 320 + row * 265;
      const lines = wrapLines(p.ringkasan, 38).slice(0, 4);
      return `<g>
    <rect x="${x}" y="${y}" width="410" height="240" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="${x + 20}" y="${y + 20}" width="42" height="42" rx="10" fill="#0284c7"/>
    <text x="${x + 41}" y="${y + 49}" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff">${escapeXml(
        p.kod
      )}</text>
    <text x="${x + 76}" y="${y + 47}" font-family="Arial, sans-serif" font-size="17" font-weight="bold" fill="#0f172a">${escapeXml(
        p.nama.slice(0, 32)
      )}</text>
    ${lines
      .map(
        (ln, li) =>
          `<text x="${x + 22}" y="${
            y + 98 + li * 28
          }" font-family="Arial, sans-serif" font-size="16" fill="#475569">${escapeXml(
            ln
          )}</text>`
      )
      .join('\n    ')}
  </g>`;
    })
    .join('\n  ')}
</svg>`;

  // Page 4: Pentaksiran & Rubrik TP1-TP6
  const page4 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900">
  ${svgHeaderBar('Pentaksiran Digital &amp; Bukan Digital', '04')}
  <text x="80" y="140" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="#0f172a">Pentaksiran &amp; Rubrik Tahap Penguasaan</text>

  <rect x="80" y="185" width="620" height="240" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="110" y="230" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#0369a1">Pentaksiran Digital</text>
  <text x="110" y="270" font-family="Arial, sans-serif" font-size="17" fill="#334155">• Lembaran Kerja Digital Interaktif (4 soalan semak automatik)</text>
  <text x="110" y="305" font-family="Arial, sans-serif" font-size="17" fill="#334155">• Kuiz Sumatif Wayground (5 soalan masa nyata)</text>
  <text x="110" y="340" font-family="Arial, sans-serif" font-size="17" fill="#334155">• Peer-Review di Padlet (Semakan unit cm vs cm²)</text>

  <rect x="740" y="185" width="620" height="240" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="770" y="230" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#b45309">Pentaksiran Bukan Digital (Amali)</text>
  <text x="770" y="270" font-family="Arial, sans-serif" font-size="17" fill="#334155">• Projek Pelan Lantai Rumah Impian atas Kertas Grid 1 cm²</text>
  <text x="770" y="305" font-family="Arial, sans-serif" font-size="17" fill="#334155">• Aktiviti Stesen Koperatif &amp; Gallery Walk</text>
  <text x="770" y="340" font-family="Arial, sans-serif" font-size="17" fill="#334155">• Soal jawab lisan &amp; Senarai Semak Digital guru</text>

  <!-- Rubrik TP1-TP6 -->
  <text x="80" y="478" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#0f172a">Rubrik KSSR Semakan (TP 1 – TP 6)</text>
  ${RUBRIC_TP_LEVELS.map((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 80 + col * 655;
    const y = 505 + row * 120;
    return `<g>
    <rect x="${x}" y="${y}" width="625" height="102" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect x="${x + 16}" y="${y + 18}" width="64" height="32" rx="8" fill="#0284c7"/>
    <text x="${x + 48}" y="${y + 40}" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff">${escapeXml(
      r.tp
    )}</text>
    <text x="${x + 96}" y="${y + 40}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">${escapeXml(
      r.tafsiran
    )}</text>
    <text x="${x + 18}" y="${y + 78}" font-family="Arial, sans-serif" font-size="14" fill="#475569">${escapeXml(
      r.indikator.slice(0, 72)
    )}</text>
  </g>`;
  }).join('\n  ')}
</svg>`;

  // Page 5: Aktiviti Interaktif & Kuiz Gamifikasi
  const page5 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900">
  ${svgHeaderBar('Makmal Geometri &amp; Kuiz Gamifikasi', '05')}
  <text x="80" y="140" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="#0f172a">Kuiz Misi Pulau Geometri &amp; Gamifikasi</text>
  <text x="80" y="176" font-family="Arial, sans-serif" font-size="18" fill="#475569">Contoh soalan kuiz interaktif dan penyelesaian langkah demi langkah SP 6.3.1.</text>

  ${QUIZ_QUESTIONS.slice(0, 4)
    .map((q, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 80 + col * 655;
      const y = 215 + row * 315;
      const qLines = wrapLines(q.soalan, 56).slice(0, 3);
      return `<g>
    <rect x="${x}" y="${y}" width="625" height="290" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <text x="${x + 24}" y="${y + 40}" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0369a1">Soalan ${
        q.id
      } · ${escapeXml(q.kategori)} (${escapeXml(q.tahap)})</text>
    ${qLines
      .map(
        (ln, li) =>
          `<text x="${x + 24}" y="${
            y + 76 + li * 25
          }" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">${escapeXml(
            ln
          )}</text>`
      )
      .join('\n    ')}
    <rect x="${x + 24}" y="${y + 160}" width="575" height="44" rx="8" fill="#ecfdf5" stroke="#a7f3d0"/>
    <text x="${x + 40}" y="${y + 188}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#047857">Jawapan: ${escapeXml(
        q.pilihan[q.jawapanBetul]
      )}</text>
    <text x="${x + 24}" y="${y + 236}" font-family="Arial, sans-serif" font-size="14" fill="#475569">${escapeXml(
        (q.langkahPenyelesaian[0] || '').slice(0, 68)
      )}</text>
    <text x="${x + 24}" y="${y + 262}" font-family="Arial, sans-serif" font-size="14" fill="#475569">${escapeXml(
        (q.langkahPenyelesaian[1] || '').slice(0, 68)
      )}</text>
  </g>`;
    })
    .join('\n  ')}
</svg>`;

  // Page 6: Rakan Pembelajaran
  const page6 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900">
  ${svgHeaderBar('Rakan Pembelajaran', '06')}
  <text x="80" y="140" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="#0f172a">Rakan Pembelajaran &amp; Kolaborasi</text>
  <text x="80" y="176" font-family="Arial, sans-serif" font-size="18" fill="#475569">Dokumentasi sesi perbincangan bersemuka, sesi maya dan semakan rakan sebaya.</text>

  ${peerSessions
    .slice(0, 2)
    .map((s, i) => {
      const x = 80 + i * 655;
      const capLines = wrapLines(s.kapsyen, 52).slice(0, 4);
      return `<g>
    <rect x="${x}" y="220" width="625" height="390" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="${x + 24}" y="244" width="577" height="175" rx="12" fill="#e0f2fe"/>
    <text x="${x + 312}" y="338" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0369a1">[Ruang Gambar: ${escapeXml(
        s.jenis
      )} · ${escapeXml(s.lokasiAtauPlatform)}]</text>
    <text x="${x + 24}" y="458" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#0f172a">${escapeXml(
        s.tajuk
      )}</text>
    ${capLines
      .map(
        (ln, li) =>
          `<text x="${x + 24}" y="${
            495 + li * 25
          }" font-family="Arial, sans-serif" font-size="15" fill="#475569">${escapeXml(
            ln
          )}</text>`
      )
      .join('\n    ')}
  </g>`;
    })
    .join('\n  ')}

  <rect x="80" y="640" width="1280" height="200" rx="18" fill="#efeae2" stroke="#cbd5e1" stroke-width="2"/>
  <text x="115" y="685" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#047857">Perbincangan Chat Kumpulan: Rakan Matematik Tahun 5</text>
  <rect x="115" y="705" width="760" height="48" rx="10" fill="#ffffff"/>
  <text x="135" y="735" font-family="Arial, sans-serif" font-size="15" fill="#1e293b">Amirah: Betul kan garis cantuman di tengah tidak ditambah dalam perimeter?</text>
  <rect x="520" y="766" width="800" height="48" rx="10" fill="#d9fdd3"/>
  <text x="540" y="796" font-family="Arial, sans-serif" font-size="15" fill="#1e293b">Pembina: Betul! Kita hanya tambah semua sisi sempadan luar sahaja.</text>
</svg>`;

  // Page 7: Metadata & Sumber Rujukan
  const page7 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900">
  ${svgHeaderBar('Metadata &amp; Sumber Rujukan', '07')}
  <text x="80" y="140" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="#0f172a">Metadata Pembina &amp; Sumber Rujukan</text>

  <rect x="80" y="190" width="560" height="630" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="115" y="245" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#0369a1">Profil Pembina Laman Web</text>
  <text x="115" y="305" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#0f172a">${escapeXml(
    profile.namaPelajar
  )}</text>
  <text x="115" y="345" font-family="Arial, sans-serif" font-size="17" font-weight="bold" fill="#0284c7">${escapeXml(
    profile.kelas
  )}</text>
  <text x="115" y="395" font-family="Arial, sans-serif" font-size="16" fill="#334155">Kursus: ${escapeXml(
    profile.kursus
  )}</text>
  <text x="115" y="435" font-family="Arial, sans-serif" font-size="16" fill="#334155">Institusi: ${escapeXml(
    profile.institusi
  )}</text>
  <text x="115" y="475" font-family="Arial, sans-serif" font-size="16" fill="#334155">Pensyarah: ${escapeXml(
    profile.pensyarah
  )}</text>
  <text x="115" y="515" font-family="Arial, sans-serif" font-size="16" fill="#0369a1">E-mel: ${escapeXml(
    profile.emel
  )}</text>

  <rect x="680" y="190" width="680" height="630" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="715" y="245" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#b45309">Sumber Rujukan (APA)</text>
  ${references
    .slice(0, 4)
    .map((r, i) => {
      const y = 290 + i * 125;
      const rLines = wrapLines(r.rujukan, 60).slice(0, 2);
      return `<g>
    <rect x="715" y="${y}" width="610" height="105" rx="12" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="735" y="${y + 30}" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0369a1">${escapeXml(
        r.kategori
      )}</text>
    ${rLines
      .map(
        (ln, li) =>
          `<text x="735" y="${
            y + 58 + li * 22
          }" font-family="Arial, sans-serif" font-size="15" fill="#334155">${escapeXml(
            ln
          )}</text>`
      )
      .join('\n    ')}
  </g>`;
    })
    .join('\n  ')}
</svg>`;

  // Page 8: Maklumbalas
  const page8 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900">
  ${svgHeaderBar('Maklumbalas Murid &amp; Pengunjung', '08')}
  <text x="80" y="140" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="#0f172a">Borang Maklumbalas &amp; Refleksi</text>
  <text x="80" y="176" font-family="Arial, sans-serif" font-size="18" fill="#475569">Ruangan penilaian murid, guru dan pengunjung laman web.</text>

  <rect x="80" y="215" width="600" height="600" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="115" y="265" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#0f172a">Borang Maklumbalas</text>
  <rect x="115" y="300" width="530" height="50" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="135" y="331" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Nama Penuh Murid / Pengunjung</text>
  <rect x="115" y="370" width="530" height="50" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="135" y="401" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Peranan &amp; Tahap Kefahaman</text>
  <rect x="115" y="440" width="530" height="190" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="135" y="476" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Ulasan / Cadangan Penambahbaikan...</text>
  <rect x="115" y="660" width="530" height="54" rx="12" fill="#0284c7"/>
  <text x="380" y="694" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff">Hantar Maklumbalas</text>

  <rect x="720" y="215" width="640" height="600" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-dasharray="10 8" stroke-width="2"/>
  <text x="1040" y="495" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#334155">Ruang Borang Refleksi / Google Forms</text>
  <text x="1040" y="535" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Sunting teks atau gantikan dengan pautan Google Forms anda di Canva.</text>
</svg>`;

  return [
    { filename: '01_Pengenalan_Home.svg', title: 'Pengenalan (Home)', svg: page1 },
    { filename: '02_Nota_Multimedia.svg', title: 'Nota Multimedia', svg: page2 },
    { filename: '03_Aktiviti_ASSURE.svg', title: 'Aktiviti Model ASSURE', svg: page3 },
    { filename: '04_Pentaksiran_Rubrik.svg', title: 'Pentaksiran & Rubrik', svg: page4 },
    { filename: '05_Kuiz_Gamifikasi.svg', title: 'Kuiz & Gamifikasi', svg: page5 },
    { filename: '06_Rakan_Pembelajaran.svg', title: 'Rakan Pembelajaran', svg: page6 },
    { filename: '07_Metadata_Rujukan.svg', title: 'Metadata & Rujukan', svg: page7 },
    { filename: '08_Maklumbalas.svg', title: 'Maklumbalas', svg: page8 },
  ];
}

// Legacy single-slide helper kept for PNG download
export function buildCanvaSlideSvg(
  profile: CreatorProfile,
  config: SiteTemplateConfig,
  assurePhases: AssurePhase[]
): string {
  return buildAllCanvaSvgPages(profile, config, assurePhases, [], [])[2].svg;
}

/* ---------------------------------------------------------
   PURE-JS ZIP ARCHIVE GENERATOR (No external package needed)
   --------------------------------------------------------- */
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export function createZipBlob(
  files: { name: string; content: string }[]
): Blob {
  const encoder = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const dataBytes = encoder.encode(file.content);
    const crc = crc32(dataBytes);

    // Local File Header (30 bytes + name)
    const localHeader = new ArrayBuffer(30 + nameBytes.length);
    const lv = new DataView(localHeader);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0x0800, true); // UTF-8
    lv.setUint16(8, 0, true); // stored (no compression)
    lv.setUint16(10, 0, true);
    lv.setUint16(12, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, dataBytes.length, true);
    lv.setUint32(22, dataBytes.length, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    new Uint8Array(localHeader, 30).set(nameBytes);

    const localBytes = new Uint8Array(localHeader);
    localParts.push(localBytes, dataBytes);

    // Central Directory Header (46 bytes + name)
    const centralHeader = new ArrayBuffer(46 + nameBytes.length);
    const cv = new DataView(centralHeader);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, 0, true);
    cv.setUint16(14, 0, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, dataBytes.length, true);
    cv.setUint32(24, dataBytes.length, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    new Uint8Array(centralHeader, 46).set(nameBytes);

    centralParts.push(new Uint8Array(centralHeader));
    offset += localBytes.length + dataBytes.length;
  }

  let centralSize = 0;
  for (const cp of centralParts) centralSize += cp.length;

  const endRecord = new ArrayBuffer(22);
  const ev = new DataView(endRecord);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);
  ev.setUint16(20, 0, true);

  const allParts = [...localParts, ...centralParts, new Uint8Array(endRecord)];
  const totalBytes = allParts.reduce((acc, part) => acc + part.length, 0);
  const outBuffer = new ArrayBuffer(totalBytes);
  const outView = new Uint8Array(outBuffer);
  let cursor = 0;
  for (const part of allParts) {
    outView.set(part, cursor);
    cursor += part.length;
  }

  return new Blob([outBuffer], {
    type: 'application/zip',
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadTextFile(
  filename: string,
  content: string,
  mimeType: string
) {
  downloadBlob(new Blob([content], { type: mimeType }), filename);
}

/**
 * Generates a standalone printable/Canva-importable HTML bundle containing all 8 SVG pages
 * so opening it in any browser and pressing Ctrl+P -> Save as PDF produces an 8-page Canva Website PDF.
 */
export function buildPrintableHtmlForCanva(pages: CanvaSvgPage[]): string {
  return `<!doctype html>
<html lang="ms">
<head>
  <meta charset="UTF-8" />
  <title>Pulau Geometri — 8 Halaman Sedia Import Ke Canva</title>
  <style>
    @page { size: 1440px 900px; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #e2e8f0; font-family: Arial, sans-serif; }
    .toolbar {
      position: sticky; top: 0; z-index: 10; background: #0f172a; color: #fff;
      padding: 12px 24px; display: flex; justify-content: space-between; align-items: center;
    }
    .toolbar button {
      background: #f6f03b; color: #161c08; border: 0; border-radius: 8px;
      padding: 10px 18px; font-weight: bold; cursor: pointer;
    }
    .page {
      width: 100%; max-width: 1440px; margin: 24px auto; background: #fff;
      box-shadow: 0 10px 30px rgba(0,0,0,0.12); page-break-after: always;
    }
    .page svg { display: block; width: 100%; height: auto; }
    @media print {
      body { background: #fff; }
      .toolbar { display: none; }
      .page { margin: 0; box-shadow: none; width: 100vw; height: 100vh; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <span><strong>Pulau Geometri (8 Halaman)</strong> — Klik "Simpan Sebagai PDF" kemudian muat naik fail PDF ke Canva untuk disunting.</span>
    <button onclick="window.print()">Simpan Sebagai PDF Untuk Canva</button>
  </div>
  ${pages
    .map(
      (p) => `<section class="page" aria-label="${escapeXml(p.title)}">
    ${p.svg}
  </section>`
    )
    .join('\n')}
</body>
</html>`;
}

export function downloadSvgAsPng(svgContent: string, filename: string) {
  const svgBlob = new Blob([svgContent], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1440;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, 1440, 900);
      canvas.toBlob((pngBlob) => {
        if (pngBlob) {
          downloadBlob(pngBlob, filename);
        }
      }, 'image/png');
    }
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

export function buildCanvaTextSummary(
  profile: CreatorProfile,
  config: SiteTemplateConfig,
  assurePhases: AssurePhase[]
): string {
  const lines = [
    `TAJUK: ${config.heroTitle} — ${config.heroHighlight}`,
    `SUBJEK: ${config.subjek} (${config.bab})`,
    `SK: ${config.standardKandungan}`,
    `SP: ${config.standardPembelajaran}`,
    `DISEDIAKAN OLEH: ${profile.namaPelajar} (${profile.kelas})`,
    `KURSUS: ${profile.kursus}`,
    '',
    'PENGENALAN:',
    profile.pengenalanRingkas,
    '',
    'ALIRAN MODEL ASSURE:',
    ...assurePhases.flatMap((p) => [
      `[${p.kod}] ${p.nama}`,
      `Ringkasan: ${p.ringkasan}`,
      ...p.butiran.map((b) => `- ${b}`),
      '',
    ]),
    'SET INDUKSI:',
    config.setInduksiTajuk,
    config.setInduksiTeks,
    '',
    'PENUTUP & PENILAIAN:',
    config.penutupTajuk,
    config.penutupTeks,
  ];
  return lines.join('\n');
}

export async function downloadExternalAsset(
  url: string,
  filename: string
): Promise<void> {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error('Fetch failed');
    const blob = await res.blob();
    downloadBlob(blob, filename);
  } catch {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

