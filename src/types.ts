export type SectionId =
  | 'pengenalan'
  | 'nota'
  | 'aktiviti'
  | 'pentaksiran'
  | 'interaktif'
  | 'rakan'
  | 'metadata'
  | 'maklumbalas';

export interface CreatorProfile {
  namaPelajar: string;
  kursus: string;
  institusi: string;
  kelas: string;
  emel: string;
  pensyarah: string;
  pengenalanRingkas: string;
  avatarUrl?: string;
}

export interface SiteTemplateConfig {
  heroKicker: string;
  heroTitle: string;
  heroHighlight: string;
  subjek: string;
  bab: string;
  standardKandungan: string;
  standardPembelajaran: string;
  setInduksiTajuk: string;
  setInduksiTeks: string;
  penutupTajuk: string;
  penutupTeks: string;
  embeddedFormTitle: string;
  embeddedFormUrl: string;
  embeddedFormDescription: string;
}

export interface AssurePhase {
  kod: string;
  nama: string;
  ringkasan: string;
  butiran: string[];
}

export interface CustomNoteItem {
  id: string;
  tajuk: string;
  kategori:
    | 'PDF'
    | 'Slaid Canva'
    | 'Video'
    | 'Audio'
    | 'Infografik'
    | 'Buku Teks Digital'
    | 'Pautan Lain';
  penerangan: string;
  sourceType: 'upload' | 'embed';
  fileName?: string;
  mimeType?: string;
  dataUrl?: string;
  embedUrl?: string;
  tarikh: string;
}

export interface CustomGameEmbed {
  id: string;
  tajuk: string;
  platform: string;
  penerangan: string;
  url: string;
  paparIframe: boolean;
}

export interface PeerSessionItem {
  id: string;
  jenis: 'Bersemuka' | 'Maya' | 'Tangkapan Skrin Chat';
  tajuk: string;
  lokasiAtauPlatform: string;
  kapsyen: string;
  imageUrl: string;
}

export interface ReferenceItem {
  id: string;
  kategori: string;
  rujukan: string;
}

export interface QuizQuestion {
  id: number;
  kategori: 'Perimeter' | 'Luas' | 'KBAT';
  tahap: 'Asas' | 'Sederhana' | 'Cabaran';
  soalan: string;
  pilihan: string[];
  jawapanBetul: number;
  petunjuk: string;
  langkahPenyelesaian: string[];
  shapeType:
    | 'l-shape-perimeter'
    | 'house-area'
    | 'house-perimeter'
    | 'l-shape-area'
    | 'rect-tri-area'
    | 'rect-tri-perimeter'
    | 'three-shapes-area'
    | 'cutout-perimeter';
}

export interface WorksheetProblem {
  id: string;
  tajuk: string;
  arahan: string;
  shapeType: 'l-shape' | 'house' | 'trapezoid-like' | 'banner';
  jawapanPerimeter: number;
  jawapanLuas: number;
  penjelasanPerimeter: string;
  penjelasanLuas: string;
}

export interface FeedbackEntry {
  id: string;
  nama: string;
  peranan: 'Murid Tahun 5' | 'Guru' | 'Rakan Pelajar' | 'Pelawat';
  bintang: number;
  tahapKefahaman: 'Sangat Faham' | 'Faham' | 'Perlu Latihan Lagi';
  komen: string;
  tarikh: string;
}
