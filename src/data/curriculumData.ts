import {
  AssurePhase,
  CreatorProfile,
  FeedbackEntry,
  PeerSessionItem,
  QuizQuestion,
  ReferenceItem,
  SiteTemplateConfig,
  WorksheetProblem,
} from '../types';

export const DEFAULT_CREATOR_PROFILE: CreatorProfile = {
  namaPelajar: 'Carrieylen Injan Anak Steward',
  kursus: 'Teknologi untuk Pengajaran & Pembelajaran Matematik (MT3825)',
  institusi: 'Institut Pendidikan Guru (IPG)',
  kelas: 'Kelas 5 Awesome (25 Murid · 14L, 11P)',
  emel: 'g-ipgp253107845@moe-dl.edu.my',
  pensyarah: 'Pensyarah Pembimbing Matematik',
  pengenalanRingkas:
    'Laman pembelajaran bersepadu Bersemuka dan Digital Interaktif bagi Sukatan dan Geometri (6.0 Ruang) Tahun 5 — memfokuskan Standard Pembelajaran 6.3.1 melalui integrasi Model ASSURE, applet GeoGebra, Padlet, Wayground dan kuiz gamifikasi.',
  avatarUrl: '/src/assets/images/profil_pembina_pelajar_1794666386074.jpg',
};

export const DEFAULT_TEMPLATE_CONFIG: SiteTemplateConfig = {
  heroKicker: 'SK 6.3 · SP 6.3.1 · 5 Awesome',
  heroTitle: 'Perimeter & Luas',
  heroHighlight: 'Bentuk Gabungan 2D!',
  subjek: 'Matematik Tahun 5 (Sukatan dan Geometri)',
  bab: '6.0 Ruang · Bersemuka & Digital Interaktif',
  standardKandungan: '6.3 Perimeter dan Luas',
  standardPembelajaran:
    '6.3.1 Menentukan perimeter dan luas bentuk gabungan dua dimensi yang melibatkan segi empat tepat, segi empat sama dan segi tiga.',
  setInduksiTajuk: 'Set Induksi (10 Minit): Tayangan Video YouTube & Kad Imbasan 2D',
  setInduksiTeks:
    'Tayangan video YouTube → Guru mengadakan sesi soal jawab terbuka → Murid teruja menjawab soalan. BBM Set Induksi merangkumi video YouTube serta kad imbasan bentuk 2D gabungan dengan fokus memerhati, mengenal pasti gabungan dua bentuk 2D dan menjana idea secara lisan.',
  penutupTajuk: 'Segmen 3: Aplikasi, Pengukuhan & Penutup (Google Forms & Rumusan)',
  penutupTeks:
    'Murid melengkapkan kuiz sumatif masa nyata di Wayground (5 soalan), menjalankan Peer-Review di Padlet (menyemak unit cm untuk perimeter vs cm² untuk luas), serta mengisi borang refleksi murid di Google Forms sebelum guru membuat rumusan konsep.',
  embeddedFormTitle: 'Borang Refleksi & Maklumbalas Murid (Google Forms)',
  embeddedFormUrl: '',
  embeddedFormDescription:
    'Tampal pautan Google Forms, Microsoft Forms, atau Padlet anda di bawah supaya murid Tahun 5 Awesome boleh mengisi refleksi terus di dalam halaman ini.',
};

export const DEFAULT_PEER_SESSIONS: PeerSessionItem[] = [
  {
    id: 'peer-1',
    jenis: 'Bersemuka',
    tajuk: 'Bengkel Amali Gunting & Cantum Bentuk Gabungan 2D',
    lokasiAtauPlatform: 'Perpustakaan Kampus',
    kapsyen:
      'Bersama rakan sekuliah menguji aktiviti pentaksiran bukan digital menggunakan kertas grid 1 cm², pembaris dan kepingan kad segi tiga serta segi empat tepat bagi memastikan ukuran soalan tepat sebelum digunakan oleh murid Tahun 5.',
    imageUrl: '/src/assets/images/sesi_bersemuka_matematik_1794666381601.jpg',
  },
  {
    id: 'peer-2',
    jenis: 'Maya',
    tajuk: 'Semakan Slaid Pengajaran & Penyelarasan Model ASSURE',
    lokasiAtauPlatform: 'Google Meet',
    kapsyen:
      'Perbincangan dalam talian bersama ahli kumpulan bagi menyemak kesesuaian isi kandungan slaid, kejelasan audio penerangan Bahasa Melayu dan kebolehgunaan Makmal Geometri Interaktif.',
    imageUrl: '/src/assets/images/sesi_maya_perbincangan_1794666381469.jpg',
  },
];

export const DEFAULT_SUMBER_RUJUKAN: ReferenceItem[] = [
  {
    id: 'ref-1',
    kategori: 'Dokumen Kurikulum Rasmi',
    rujukan:
      'Kementerian Pendidikan Malaysia. (2019). Dokumen Standard Kurikulum dan Pentaksiran (DSKP) Matematik Tahun 5 KSSR (Semakan 2017). Bahagian Pembangunan Kurikulum.',
  },
  {
    id: 'ref-2',
    kategori: 'Buku Teks Rasmi',
    rujukan:
      'Chan, Y. L., & Norazlin Mohd Rusdin. (2020). Buku Teks Matematik Tahun 5 Sekolah Kebangsaan (KSSR Semakan). Dewan Bahasa dan Pustaka.',
  },
  {
    id: 'ref-3',
    kategori: 'Model Reka Bentuk Pengajaran',
    rujukan:
      'Heinich, R., Molenda, M., Russell, J. D., & Smaldino, S. E. (2002). Instructional Media and Technologies for Learning (7th ed.). Merrill Prentice Hall. (Rujukan Model ASSURE).',
  },
  {
    id: 'ref-4',
    kategori: 'Sumber Digital & Pedagogi',
    rujukan:
      'Kementerian Pendidikan Malaysia. (2024). Portal Pembelajaran Digital DELIMa & Modul Geometri Interaktif Sekolah Rendah.',
  },
];

export const CANVA_SLIDES = [
  {
    id: 1,
    tajuk: 'Objektif Pembelajaran (SP 6.3.1)',
    subtajuk: 'Apa yang akan kita kuasai hari ini?',
    isi: [
      'Mengenal pasti komponen bentuk asas (segi empat tepat, segi empat sama, segi tiga) di dalam sesuatu bentuk gabungan.',
      'Menghitung perimeter bentuk gabungan dengan menjumlahkan panjang semua sisi luar sahaja.',
      'Menghitung luas bentuk gabungan dengan memecahkan bentuk kepada bahagian asas dan menjumlahkan luas setiap bahagian.',
    ],
    tipCikgu: 'Sentiasa tandakan sisi luar dengan pen warna sebelum mula menambah!',
  },
  {
    id: 2,
    tajuk: 'Konsep 1: Apakah Itu Perimeter?',
    subtajuk: 'Pagar di sekeliling kawasan',
    isi: [
      'Perimeter ialah jumlah ukuran jarak di sekeliling sempadan luar sesuatu bentuk 2D tertutup.',
      'Analogi mudah: Bayangkan anda memasang pagar di sekeliling taman. Pagar hanya dipasang di tepi luar, bukan di tengah-tengah taman!',
      'Unit perimeter ialah unit panjang biasa seperti mm, cm, m, atau km (tiada kuasa dua).',
    ],
    tipCikgu: 'Sisi yang bercantum di bahagian dalam JANGAN dimasukkan dalam kiraan perimeter.',
  },
  {
    id: 3,
    tajuk: 'Konsep 2: Tiga Formula Luas Asas',
    subtajuk: 'Karpet atau jubin yang memenuhi permukaan',
    isi: [
      'Segi Empat Tepat: Luas = Panjang × Lebar',
      'Segi Empat Sama: Luas = Sisi × Sisi',
      'Segi Tiga: Luas = ½ × Tapak × Tinggi (pastikan tinggi berserenjang 90° dengan tapak)',
    ],
    tipCikgu: 'Unit luas sentiasa mempunyai kuasa dua seperti cm² atau m².',
  },
  {
    id: 4,
    tajuk: 'Strategi 3 Langkah Pecahan Bentuk',
    subtajuk: 'Teknik mudah menyelesaikan bentuk gabungan',
    isi: [
      'Langkah 1 (Pecah): Lukis garisan putus-putus untuk membahagikan bentuk gabungan kepada Bentuk A dan Bentuk B.',
      'Langkah 2 (Kira Asing): Hitung luas Bentuk A dan luas Bentuk B secara berasingan dengan menyemak panjang setiap sisi.',
      'Langkah 3 (Jumlahkan): Tambah Luas A + Luas B untuk mendapatkan jumlah luas bentuk gabungan.',
    ],
    tipCikgu: 'Jika ada sisi yang tidak berlabel, gunakan sifat sisi bertentangan segi empat untuk mencarinya.',
  },
  {
    id: 5,
    tajuk: 'Awas! 3 Kesilapan Lazim Murid',
    subtajuk: 'Elakkan perangkap dalam peperiksaan',
    isi: [
      'Kesilapan 1: Menambah panjang garisan putus-putus di bahagian dalam semasa mengira perimeter.',
      'Kesilapan 2: Menggunakan sisi sendeng segi tiga sebagai "tinggi" dalam formula luas ½ × tapak × tinggi.',
      'Kesilapan 3: Tersilap tulis unit (contohnya menulis cm untuk luas atau cm² untuk perimeter).',
    ],
    tipCikgu: 'Semak semula unit jawapan akhir anda: Perimeter = cm, Luas = cm².',
  },
  {
    id: 6,
    tajuk: 'Rumusan & Aplikasi Dunia Sebenar',
    subtajuk: 'Di manakah kita gunakan kemahiran ini?',
    isi: [
      'Mengira panjang kayu atau pagar untuk mengelilingi kebun berbentuk huruf L.',
      'Mengira luas jubin atau karpet yang diperlukan untuk lantai bilik yang mempunyai sudut segi tiga.',
      'Membina reka bentuk pelan rumah, taman permainan, dan poster grafik.',
    ],
    tipCikgu: 'Teruskan ke Makmal Geometri & Kuiz Gamifikasi untuk menguji kecekapan anda!',
  },
];

export const AUDIO_TRANSCRIPT_SEGMENTS = [
  {
    masa: '0:00 – 0:18',
    tajuk: 'Pengenalan Bentuk Gabungan',
    teks: 'Salam sejahtera murid-murid Tahun 5! Hari ini kita belajar topik 6.3.1 iaitu menentukan perimeter dan luas bentuk gabungan dua dimensi. Bentuk gabungan bermaksud dua atau lebih bentuk asas seperti segi empat tepat, segi empat sama dan segi tiga yang dicantumkan bersama.',
  },
  {
    masa: '0:19 – 0:38',
    tajuk: 'Cara Mengira Perimeter',
    teks: 'Untuk mencari perimeter, bayangkan seekor semut berjalan mengelilingi bahagian paling luar bentuk itu sahaja. Kita tambah panjang semua sisi luar. Ingat ya, garisan tempat bentuk bercantum di bahagian dalam tidak boleh dikira.',
  },
  {
    masa: '0:39 – 1:02',
    tajuk: 'Cara Mengira Luas',
    teks: 'Untuk mencari luas pula, kita mesti pecahkan bentuk gabungan kepada bentuk asas A dan B. Gunakan formula Panjang darab Lebar untuk segi empat, dan setengah darab tapak darab tinggi untuk segi tiga. Akhir sekali, jumlahkan kedua-dua luas itu dalam unit sentimeter persegi.',
  },
];

export const DEFAULT_ASSURE_PHASES: AssurePhase[] = [
  {
    kod: 'A',
    nama: 'Analisis Pelajar (Analyze Learners)',
    ringkasan:
      'Profil Murid Kelas 5 Awesome (25 Murid: 14 Lelaki, 11 Perempuan) dengan Gaya Belajar VARK (60% Visual, 25% Kinestetik, 15% Auditori).',
    butiran: [
      'Profil Murid: Kelas 5 Awesome seramai 25 orang murid (14 lelaki, 11 perempuan) dalam mod pembelajaran Bersemuka dan Digital Interaktif.',
      'Gaya Belajar VARK: 60% Visual, 25% Kinestetik, dan 15% Auditori.',
      'Pengetahuan Sedia Ada: Murid telah menguasai cara mengira perimeter dan luas satu bentuk asas semasa Tahun 4.',
    ],
  },
  {
    kod: 'S',
    nama: 'Nyatakan Objektif (State Objectives — ABCD)',
    ringkasan:
      'Menetapkan objektif pembelajaran SP 6.3.1 berpandukan format Audience, Behavior, Condition & Degree (ABCD).',
    butiran: [
      'A (Audience / Sasaran): Murid Tahun 5 Awesome.',
      'B (Behavior / Tingkah Laku): Mengira perimeter & luas bentuk gabungan 2D.',
      'C (Condition / Syarat): Melalui applet GeoGebra & Padlet.',
      'D (Degree / Tahap Pencapaian): Tepat sekurang-kurangnya 4/5 soalan. (Awal Pentaksiran: Soal jawab lisan & pencetus minda).',
    ],
  },
  {
    kod: 'S',
    nama: 'Pilih Strategi & Media (Select Methods, Media & Materials)',
    ringkasan:
      'Menggabungkan strategi berpusatkan murid serta media digital YouTube, GeoGebra, Padlet dan Wayground.',
    butiran: [
      'Strategi: Pembelajaran Berpusatkan Murid, Kaedah Inkuiri & Penyiasatan dan Pemikiran berpandukan Model ASSURE.',
      'Media Utama: YouTube (video set induksi), GeoGebra (manipulasi bentuk), Padlet (Galeri Walk Digital & Peer-Review) dan Wayground (kuiz sumatif).',
      'Bahan Sokongan: Kad imbasan bentuk 2D gabungan dan stesen kod QR.',
    ],
  },
  {
    kod: 'U',
    nama: 'Guna Media (Utilize Media & Materials)',
    ringkasan:
      'Melaksanakan stesen pembelajaran koperatif menggunakan kod QR, tablet sekolah dan templat kerja GeoGebra.',
    butiran: [
      'Imbas Kod QR di stesen pembelajaran untuk akses terus bahan digital.',
      'Penggunaan Template Kerja GeoGebra bagi meneroka potongan bentuk gabungan.',
      'Susunan 5 stesen koperatif di dalam kelas dengan penggunaan tablet sekolah secara berkumpulan.',
    ],
  },
  {
    kod: 'R',
    nama: 'Galak Penyertaan Pelajar (Require Learner Participation)',
    ringkasan:
      'Inkuiri Penemuan secara maya, Galeri Walk Digital di Padlet, penyelesaian masalah dan pengurusan kelas PAK-21.',
    butiran: [
      'Inkuiri Penemuan: Murid memotong bentuk gabungan secara maya untuk mencari luas A & B.',
      'Galeri Walk Digital & Penyelesaian Masalah: Murid memuat naik hasil kerja ke Padlet dan mengaplikasikan konsep perimeter serta luas dalam situasi kehidupan sebenar.',
      'Pengurusan Kelas PAK-21 & Pemantauan: Murid bekerja dalam kumpulan (5 orang per kumpulan). Guru bertindak sebagai fasilitator menggunakan Senarai Semak Digital untuk memantau pemahaman mengasingkan bentuk.',
    ],
  },
  {
    kod: 'E',
    nama: 'Penilaian & Semakan (Evaluate & Revise)',
    ringkasan:
      'Penilaian Sumatif di Wayground, Penilaian Autentik (Peer-Review) di Padlet serta refleksi di Google Forms.',
    butiran: [
      'Penilaian Sumatif: Kuiz interaktif masa nyata di Wayground (5 soalan) bagi menguji hasil pembelajaran.',
      'Penilaian Autentik: Peer-Review di Padlet — murid menyemak unit cm (perimeter) vs cm² (luas) jawapan rakan.',
      'Refleksi Media & Hasil: Borang refleksi murid di Google Forms serta rumusan konsep oleh guru.',
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    kategori: 'Perimeter',
    tahap: 'Asas',
    soalan:
      'Rajah menunjukkan bentuk gabungan huruf L terdiri daripada sebuah segi empat sama (4 cm) di atas sebuah segi empat tepat (10 cm × 4 cm). Berapakah perimeter seluruh rajah?',
    pilihan: ['32 cm', '36 cm', '40 cm', '56 cm'],
    jawapanBetul: 1,
    petunjuk: 'Tambahkan panjang semua 6 sisi luar sahaja: 4 + 4 + 6 + 4 + 10 + 8.',
    langkahPenyelesaian: [
      'Kenal pasti sisi bahagian kanan atas yang belum berlabel: 10 cm − 4 cm = 6 cm.',
      'Kenal pasti jumlah tinggi sisi kiri: 4 cm + 4 cm = 8 cm.',
      'Jumlahkan semua sisi luar: 4 + 4 + 6 + 4 + 10 + 8 = 36 cm.',
    ],
    shapeType: 'l-shape-perimeter',
  },
  {
    id: 2,
    kategori: 'Luas',
    tahap: 'Asas',
    soalan:
      'Sebuah model rumah terdiri daripada segi empat tepat (tapak 10 cm, tinggi 6 cm) dan sebuah segi tiga di atasnya (tapak 10 cm, tinggi 4 cm). Berapakah jumlah luas rajah itu?',
    pilihan: ['60 cm²', '70 cm²', '80 cm²', '100 cm²'],
    jawapanBetul: 2,
    petunjuk: 'Kira luas segi empat tepat dahulu, kemudian tambah dengan luas segi tiga (½ × tapak × tinggi).',
    langkahPenyelesaian: [
      'Luas segi empat tepat = 10 cm × 6 cm = 60 cm².',
      'Luas segi tiga = ½ × 10 cm × 4 cm = 20 cm².',
      'Jumlah luas = 60 cm² + 20 cm² = 80 cm².',
    ],
    shapeType: 'house-area',
  },
  {
    id: 3,
    kategori: 'Perimeter',
    tahap: 'Asas',
    soalan:
      'Sebuah segi empat sama bersisi 6 cm dicantum dengan sebuah segi tiga sama sisi di bahagian atasnya. Berapakah perimeter bentuk gabungan ini?',
    pilihan: ['24 cm', '30 cm', '36 cm', '42 cm'],
    jawapanBetul: 1,
    petunjuk: 'Terdapat 5 sisi luar yang sama panjang (6 cm setiap satu). Sisi cantuman di tengah tidak dikira!',
    langkahPenyelesaian: [
      'Sisi segi empat sama di luar ada 3 bahagian: kiri (6 cm), bawah (6 cm), kanan (6 cm).',
      'Sisi bumbung segi tiga di luar ada 2 bahagian: kiri (6 cm), kanan (6 cm).',
      'Perimeter = 6 + 6 + 6 + 6 + 6 = 30 cm.',
    ],
    shapeType: 'house-perimeter',
  },
  {
    id: 4,
    kategori: 'Luas',
    tahap: 'Sederhana',
    soalan:
      'Bentuk gabungan terdiri daripada segi empat sama bersisi 5 cm dan segi empat tepat berukuran 9 cm × 4 cm. Hitung jumlah luas rajah.',
    pilihan: ['56 cm²', '61 cm²', '64 cm²', '72 cm²'],
    jawapanBetul: 1,
    petunjuk: 'Luas A = 5 × 5, Luas B = 9 × 4. Kemudian jumlahkan kedua-duanya.',
    langkahPenyelesaian: [
      'Luas segi empat sama = 5 cm × 5 cm = 25 cm².',
      'Luas segi empat tepat = 9 cm × 4 cm = 36 cm².',
      'Jumlah luas = 25 cm² + 36 cm² = 61 cm².',
    ],
    shapeType: 'l-shape-area',
  },
  {
    id: 5,
    kategori: 'Luas',
    tahap: 'Sederhana',
    soalan:
      'Sebuah segi empat sama bersisi 8 cm dicantumkan di sebelah kanannya dengan sebuah segi tiga bersudut tegak bertapak 6 cm dan tinggi 8 cm. Berapakah jumlah luas rajah itu?',
    pilihan: ['84 cm²', '88 cm²', '96 cm²', '112 cm²'],
    jawapanBetul: 1,
    petunjuk: 'Luas segi empat sama (8 × 8) + Luas segi tiga (½ × 6 × 8).',
    langkahPenyelesaian: [
      'Luas segi empat sama = 8 cm × 8 cm = 64 cm².',
      'Luas segi tiga = ½ × 6 cm × 8 cm = 24 cm².',
      'Jumlah luas = 64 cm² + 24 cm² = 88 cm².',
    ],
    shapeType: 'rect-tri-area',
  },
  {
    id: 6,
    kategori: 'Perimeter',
    tahap: 'Sederhana',
    soalan:
      'Menggunakan rajah segi empat sama (sisi 8 cm) dan segi tiga bersudut tegak (tapak 6 cm, sisi sendeng 10 cm), berapakah perimeter seluruh rajah?',
    pilihan: ['32 cm', '38 cm', '40 cm', '48 cm'],
    jawapanBetul: 2,
    petunjuk: 'Jumlahkan sisi atas (8), sisi kiri (8), tapak penuh (8 + 6), dan sisi sendeng (10).',
    langkahPenyelesaian: [
      'Panjang penuh bahagian bawah = 8 cm + 6 cm = 14 cm.',
      'Sisi luar lain: atas = 8 cm, kiri = 8 cm, sisi sendeng = 10 cm.',
      'Perimeter = 8 + 8 + 14 + 10 = 40 cm.',
    ],
    shapeType: 'rect-tri-perimeter',
  },
  {
    id: 7,
    kategori: 'Luas',
    tahap: 'Cabaran',
    soalan:
      'Rajah menggabungkan 3 bentuk: segi empat tepat (12 cm × 5 cm), segi empat sama di atas (sisi 4 cm) dan segi tiga di kanan (tapak 4 cm, tinggi 5 cm). Hitung jumlah luas.',
    pilihan: ['76 cm²', '80 cm²', '86 cm²', '96 cm²'],
    jawapanBetul: 2,
    petunjuk: 'Pecahkan kepada 3 bahagian: (12 × 5) + (4 × 4) + (½ × 4 × 5).',
    langkahPenyelesaian: [
      'Luas segi empat tepat = 12 cm × 5 cm = 60 cm².',
      'Luas segi empat sama = 4 cm × 4 cm = 16 cm².',
      'Luas segi tiga = ½ × 4 cm × 5 cm = 10 cm².',
      'Jumlah luas = 60 + 16 + 10 = 86 cm².',
    ],
    shapeType: 'three-shapes-area',
  },
  {
    id: 8,
    kategori: 'KBAT',
    tahap: 'Cabaran',
    soalan:
      'Sekeping kad segi empat tepat berukuran 12 cm × 7 cm telah dipotong keluar satu segi empat sama bersisi 3 cm di penjuru kanan atas. Berapakah perimeter kad yang tinggal?',
    pilihan: ['32 cm', '35 cm', '38 cm', '44 cm'],
    jawapanBetul: 2,
    petunjuk: 'Cari panjang dua sisi yang terpotong (9 cm dan 4 cm), kemudian tambah dua sisi potongan (3 cm + 3 cm).',
    langkahPenyelesaian: [
      'Sisi atas yang tinggal = 12 cm − 3 cm = 9 cm.',
      'Sisi kanan yang tinggal = 7 cm − 3 cm = 4 cm.',
      'Jumlah semua sisi luar = 7 + 12 + 4 + 3 + 3 + 9 = 38 cm.',
    ],
    shapeType: 'cutout-perimeter',
  },
];

export const WORKSHEET_PROBLEMS: WorksheetProblem[] = [
  {
    id: 'lk-1',
    tajuk: 'Soalan 1: Taman Bentuk-L',
    arahan:
      'Sebuah taman mini terdiri daripada segi empat sama (4 cm) di atas segi empat tepat (10 cm × 4 cm). Tentukan perimeter dan luas taman.',
    shapeType: 'l-shape',
    jawapanPerimeter: 36,
    jawapanLuas: 56,
    penjelasanPerimeter: 'Perimeter = 4 + 4 + 6 + 4 + 10 + 8 = 36 cm',
    penjelasanLuas: 'Luas = (4 × 4) + (10 × 4) = 16 + 40 = 56 cm²',
  },
  {
    id: 'lk-2',
    tajuk: 'Soalan 2: Bumbung Pondok Ilmu',
    arahan:
      'Rajah menunjukkan dinding segi empat tepat (8 cm × 5 cm) dan bumbung segi tiga (tapak 8 cm, tinggi 3 cm, sisi sendeng 5 cm setiap belah). Cari perimeter dan luas.',
    shapeType: 'house',
    jawapanPerimeter: 28,
    jawapanLuas: 52,
    penjelasanPerimeter: 'Perimeter = 8 + 5 + 5 + 5 + 5 = 28 cm',
    penjelasanLuas: 'Luas = (8 × 5) + (½ × 8 × 3) = 40 + 12 = 52 cm²',
  },
  {
    id: 'lk-3',
    tajuk: 'Soalan 3: Gelongsor Geometri',
    arahan:
      'Sekeping papan kayu menggabungkan segi empat sama (6 cm × 6 cm) di kiri dengan segi tiga bersudut tegak di kanan (tapak 8 cm, tinggi 6 cm, sisi sendeng 10 cm).',
    shapeType: 'trapezoid-like',
    jawapanPerimeter: 36,
    jawapanLuas: 60,
    penjelasanPerimeter: 'Perimeter = 6 + 6 + (6 + 8) + 10 = 36 cm',
    penjelasanLuas: 'Luas = (6 × 6) + (½ × 8 × 6) = 36 + 24 = 60 cm²',
  },
  {
    id: 'lk-4',
    tajuk: 'Soalan 4: Pentas Sekolah',
    arahan:
      'Pentas berbentuk segi empat tepat (12 cm × 4 cm) disambung dengan sebuah segi empat sama (3 cm × 3 cm) di bahagian bawah kanannya.',
    shapeType: 'banner',
    jawapanPerimeter: 38,
    jawapanLuas: 57,
    penjelasanPerimeter: 'Perimeter = 12 + 7 + 3 + 3 + 9 + 4 = 38 cm',
    penjelasanLuas: 'Luas = (12 × 4) + (3 × 3) = 48 + 9 = 57 cm²',
  },
];

// Dikosongkan seperti diminta oleh pengguna
export const INITIAL_FEEDBACK: FeedbackEntry[] = [];

export const RUBRIC_TP_LEVELS = [
  {
    tp: 'TP 1',
    tafsiran: 'Menyatakan maksud perimeter dan luas bentuk asas.',
    indikator: 'Murid dapat menyebut bahawa perimeter ialah ukuran keliling dan luas ialah kawasan permukaan.',
  },
  {
    tp: 'TP 2',
    tafsiran: 'Menerangkan langkah menentukan perimeter dan luas bentuk gabungan.',
    indikator: 'Murid dapat mengenal pasti bentuk asas yang membentuk sesuatu rajah gabungan.',
  },
  {
    tp: 'TP 3',
    tafsiran: 'Menentukan perimeter dan luas bentuk gabungan dua dimensi.',
    indikator: 'Murid dapat menghitung perimeter dan luas gabungan segi empat tepat, segi empat sama dan segi tiga dengan betul.',
  },
  {
    tp: 'TP 4',
    tafsiran: 'Menyelesaikan masalah rutin melibatkan perimeter dan luas bentuk gabungan.',
    indikator: 'Murid dapat menyelesaikan situasi harian (contoh: mengira pagar atau jubin taman) dengan langkah yang sistematik.',
  },
  {
    tp: 'TP 5',
    tafsiran: 'Menyelesaikan masalah rutin menggunakan pelbagai strategi.',
    indikator: 'Murid boleh memecahkan bentuk gabungan dalam lebih daripada satu cara dan menyemak jawapan semula.',
  },
  {
    tp: 'TP 6',
    tafsiran: 'Menyelesaikan masalah bukan rutin secara kreatif dan inovatif.',
    indikator: 'Murid mampu mencipta pelan bentuk gabungan baharu mengikut kekangan perimeter/luas yang ditetapkan.',
  },
];
