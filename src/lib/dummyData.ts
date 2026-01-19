// Dummy Data untuk Demo/Iklan
// Data dummy lengkap untuk perpustakaan

export const DUMMY_BOOKS = [
  {
    id: 1,
    title: "Matematika untuk SMA Kelas XI",
    author: { name: "Dr. Ahmad Susanto", id: 1 },
    author_name: "Dr. Ahmad Susanto",
    isbn: "978-602-1234-001-1",
    year_published: "2023-01-15",
    category: "Matematika",
    num_book_available: 15,
    num_book_total: 20,
    cover_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    description: "Buku matematika lengkap untuk siswa SMA kelas XI dengan pembahasan materi yang mendalam dan contoh soal yang beragam.",
    publisher: "Penerbit Erlangga",
    pages: 342,
    language: "Indonesia"
  },
  {
    id: 2,
    title: "Fisika Modern untuk Pemula",
    author: { name: "Prof. Dr. Bambang Hidayat", id: 2 },
    author_name: "Prof. Dr. Bambang Hidayat",
    isbn: "978-602-1234-002-8",
    year_published: "2023-03-20",
    category: "Fisika",
    num_book_available: 12,
    num_book_total: 15,
    cover_url: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    description: "Pengantar fisika modern yang mudah dipahami dengan ilustrasi dan eksperimen praktis.",
    publisher: "Penerbit Gramedia",
    pages: 298,
    language: "Indonesia"
  },
  {
    id: 3,
    title: "Kimia Organik Dasar",
    author: { name: "Dr. Siti Nurhaliza", id: 3 },
    author_name: "Dr. Siti Nurhaliza",
    isbn: "978-602-1234-003-5",
    year_published: "2022-11-10",
    category: "Kimia",
    num_book_available: 8,
    num_book_total: 12,
    cover_url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    description: "Panduan lengkap kimia organik dengan fokus pada struktur molekul dan reaksi kimia.",
    publisher: "Penerbit Yudhistira",
    pages: 415,
    language: "Indonesia"
  },
  {
    id: 4,
    title: "Biologi Molekuler",
    author: { name: "Dr. Rina Kartika", id: 4 },
    author_name: "Dr. Rina Kartika",
    isbn: "978-602-1234-004-2",
    year_published: "2023-05-08",
    category: "Biologi",
    num_book_available: 10,
    num_book_total: 14,
    cover_url: "data:image/jpeg;base64,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",
    description: "Eksplorasi mendalam tentang DNA, RNA, dan proses seluler dalam biologi molekuler.",
    publisher: "Penerbit Tiga Serangkai",
    pages: 380,
    language: "Indonesia"
  },
  {
    id: 5,
    title: "Sejarah Indonesia Modern",
    author: { name: "Prof. Hasan Mustafa", id: 5 },
    author_name: "Prof. Hasan Mustafa",
    isbn: "978-602-1234-005-9",
    year_published: "2023-02-14",
    category: "Sejarah",
    num_book_available: 18,
    num_book_total: 20,
    cover_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    description: "Perjalanan sejarah Indonesia dari masa kolonial hingga era reformasi.",
    publisher: "Penerbit Erlangga",
    pages: 456,
    language: "Indonesia"
  },
  {
    id: 6,
    title: "Geografi dan Lingkungan",
    author: { name: "Dr. Budi Santoso", id: 6 },
    author_name: "Dr. Budi Santoso",
    isbn: "978-602-1234-006-6",
    year_published: "2023-04-22",
    category: "Geografi",
    num_book_available: 14,
    num_book_total: 18,
    cover_url: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=600&fit=crop",
    description: "Studi geografi komprehensif dengan fokus pada isu lingkungan kontemporer.",
    publisher: "Penerbit Gramedia",
    pages: 368,
    language: "Indonesia"
  },
  {
    id: 7,
    title: "Ekonomi Makro & Mikro",
    author: { name: "Dr. Dewi Lestari", id: 7 },
    author_name: "Dr. Dewi Lestari",
    isbn: "978-602-1234-007-3",
    year_published: "2023-01-30",
    category: "Ekonomi",
    num_book_available: 11,
    num_book_total: 16,
    cover_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=600&fit=crop",
    description: "Penjelasan lengkap tentang teori ekonomi makro dan mikro dengan studi kasus Indonesia.",
    publisher: "Penerbit Yudhistira",
    pages: 402,
    language: "Indonesia"
  },
  {
    id: 8,
    title: "Bahasa Inggris Advanced",
    author: { name: "Sarah Johnson", id: 8 },
    author_name: "Sarah Johnson",
    isbn: "978-602-1234-008-0",
    year_published: "2023-03-12",
    category: "Bahasa Inggris",
    num_book_available: 20,
    num_book_total: 25,
    cover_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop",
    description: "Buku bahasa Inggris tingkat lanjut dengan fokus pada grammar, vocabulary, dan conversation.",
    publisher: "Penerbit Oxford",
    pages: 328,
    language: "English"
  },
  {
    id: 9,
    title: "Pendidikan Kewarganegaraan",
    author: { name: "Dr. Agus Prasetyo", id: 9 },
    author_name: "Dr. Agus Prasetyo",
    isbn: "978-602-1234-009-7",
    year_published: "2023-06-05",
    category: "Pendidikan Pancasila dan Kewarganegaraan (PPKn)",
    num_book_available: 16,
    num_book_total: 20,
    cover_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
    description: "Memahami nilai-nilai Pancasila dan implementasinya dalam kehidupan berbangsa dan bernegara.",
    publisher: "Penerbit Erlangga",
    pages: 285,
    language: "Indonesia"
  },
  {
    id: 10,
    title: "Informatika dan Pemrograman",
    author: { name: "Dr. Rizki Aditya", id: 10 },
    author_name: "Dr. Rizki Aditya",
    isbn: "978-602-1234-010-3",
    year_published: "2023-07-18",
    category: "Informatika / TIK",
    num_book_available: 13,
    num_book_total: 18,
    cover_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=600&fit=crop",
    description: "Dasar-dasar pemrograman dan komputasi dengan Python dan JavaScript.",
    publisher: "Penerbit Informatika",
    pages: 478,
    language: "Indonesia"
  },
  {
    id: 11,
    title: "Laskar Pelangi",
    author: { name: "Andrea Hirata", id: 11 },
    author_name: "Andrea Hirata",
    isbn: "978-979-3062-79-2",
    year_published: "2005-08-15",
    category: "Novel dan Fiksi",
    num_book_available: 22,
    num_book_total: 25,
    cover_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    description: "Novel inspiratif tentang perjuangan anak-anak di Belitong menggapai mimpi melalui pendidikan.",
    publisher: "Bentang Pustaka",
    pages: 529,
    language: "Indonesia"
  },
  {
    id: 12,
    title: "Bumi Manusia",
    author: { name: "Pramoedya Ananta Toer", id: 12 },
    author_name: "Pramoedya Ananta Toer",
    isbn: "978-979-461-228-4",
    year_published: "1980-05-20",
    category: "Novel dan Fiksi",
    num_book_available: 8,
    num_book_total: 12,
    cover_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop",
    description: "Karya klasik tentang perjalanan hidup Minke di masa kolonial Belanda.",
    publisher: "Hasta Mitra",
    pages: 535,
    language: "Indonesia"
  },
  {
    id: 13,
    title: "Seni Budaya Nusantara",
    author: { name: "Dr. Made Artawan", id: 13 },
    author_name: "Dr. Made Artawan",
    isbn: "978-602-1234-013-4",
    year_published: "2023-04-10",
    category: "Seni Budaya",
    num_book_available: 9,
    num_book_total: 12,
    cover_url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=600&fit=crop",
    description: "Eksplorasi kekayaan seni dan budaya Indonesia dari Sabang sampai Merauke.",
    publisher: "Penerbit Pustaka",
    pages: 392,
    language: "Indonesia"
  },
  {
    id: 14,
    title: "Olahraga dan Kesehatan",
    author: { name: "Dr. Andi Kurniawan", id: 14 },
    author_name: "Dr. Andi Kurniawan",
    isbn: "978-602-1234-014-1",
    year_published: "2023-02-28",
    category: "Pendidikan Jasmani dan Kesehatan",
    num_book_available: 17,
    num_book_total: 20,
    cover_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=600&fit=crop",
    description: "Panduan lengkap tentang olahraga, nutrisi, dan gaya hidup sehat untuk remaja.",
    publisher: "Penerbit Kesehatan",
    pages: 310,
    language: "Indonesia"
  },
  {
    id: 15,
    title: "Ensiklopedia Dunia",
    author: { name: "Tim Penulis Encyclopedia", id: 15 },
    author_name: "Tim Penulis Encyclopedia",
    isbn: "978-602-1234-015-8",
    year_published: "2023-01-01",
    category: "Ensiklopedia",
    num_book_available: 5,
    num_book_total: 8,
    cover_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    description: "Kumpulan pengetahuan lengkap tentang berbagai topik dunia dari A hingga Z.",
    publisher: "Penerbit Ensiklopedia",
    pages: 1200,
    language: "Indonesia"
  }
];

export const DUMMY_USERS = [
  {
    id: 1,
    username: "andi.prasetya",
    full_name: "Andi Prasetya",
    email: "andi.prasetya@smatelkom.sch.id",
    role: "user",
    class: "XI IPA 1",
    phone: "081234567890",
    address: "Jl. Merdeka No. 123, Bandung",
    joined_date: "2023-08-15"
  },
  {
    id: 2,
    username: "siti.rahmawati",
    full_name: "Siti Rahmawati",
    email: "siti.rahmawati@smatelkom.sch.id",
    role: "user",
    class: "XI IPA 2",
    phone: "081234567891",
    address: "Jl. Sudirman No. 45, Bandung",
    joined_date: "2023-08-16"
  },
  {
    id: 3,
    username: "budi.santoso",
    full_name: "Budi Santoso",
    email: "budi.santoso@smatelkom.sch.id",
    role: "user",
    class: "XI IPS 1",
    phone: "081234567892",
    address: "Jl. Diponegoro No. 78, Bandung",
    joined_date: "2023-08-17"
  },
  {
    id: 4,
    username: "dewi.lestari",
    full_name: "Dewi Lestari",
    email: "dewi.lestari@smatelkom.sch.id",
    role: "user",
    class: "XII IPA 1",
    phone: "081234567893",
    address: "Jl. Gatot Subroto No. 90, Bandung",
    joined_date: "2023-08-18"
  },
  {
    id: 5,
    username: "rizki.aditya",
    full_name: "Rizki Aditya",
    email: "rizki.aditya@smatelkom.sch.id",
    role: "user",
    class: "XII IPA 2",
    phone: "081234567894",
    address: "Jl. Ahmad Yani No. 12, Bandung",
    joined_date: "2023-08-19"
  },
  {
    id: 6,
    username: "maya.anggraini",
    full_name: "Maya Anggraini",
    email: "maya.anggraini@smatelkom.sch.id",
    role: "user",
    class: "X IPA 1",
    phone: "081234567895",
    address: "Jl. Pahlawan No. 56, Bandung",
    joined_date: "2024-07-10"
  },
  {
    id: 7,
    username: "admin",
    full_name: "Administrator Perpustakaan",
    email: "admin@smatelkom.sch.id",
    role: "admin",
    class: "-",
    phone: "081234567899",
    address: "SMA Telkom Bandung",
    joined_date: "2023-01-01"
  }
];

export const DUMMY_BOOKING_HISTORIES = [
  {
    id: 1,
    user_id: 1,
    book_id: 1,
    user_name: "Andi Prasetya",
    book_title: "Matematika untuk SMA Kelas XI",
    date: "2026-01-01",
    booking_date: "2026-01-01",
    due_date: "2026-01-08",
    return_date: null,
    status: true, // masih dipinjam
    fine: 0
  },
  {
    id: 2,
    user_id: 2,
    book_id: 3,
    user_name: "Siti Rahmawati",
    book_title: "Kimia Organik Dasar",
    date: "2025-12-28",
    booking_date: "2025-12-28",
    due_date: "2026-01-04",
    return_date: "2026-01-03",
    status: false, // sudah dikembalikan
    fine: 0
  },
  {
    id: 3,
    user_id: 3,
    book_id: 5,
    user_name: "Budi Santoso",
    book_title: "Sejarah Indonesia Modern",
    date: "2025-12-30",
    booking_date: "2025-12-30",
    due_date: "2026-01-06",
    return_date: null,
    status: true,
    fine: 0
  },
  {
    id: 4,
    user_id: 4,
    book_id: 8,
    user_name: "Dewi Lestari",
    book_title: "Bahasa Inggris Advanced",
    date: "2025-12-25",
    booking_date: "2025-12-25",
    due_date: "2026-01-01",
    return_date: "2025-12-31",
    status: false,
    fine: 0
  },
  {
    id: 5,
    user_id: 5,
    book_id: 10,
    user_name: "Rizki Aditya",
    book_title: "Informatika dan Pemrograman",
    date: "2026-01-02",
    booking_date: "2026-01-02",
    due_date: "2026-01-09",
    return_date: null,
    status: true,
    fine: 0
  },
  {
    id: 6,
    user_id: 1,
    book_id: 11,
    user_name: "Andi Prasetya",
    book_title: "Laskar Pelangi",
    date: "2025-12-20",
    booking_date: "2025-12-20",
    due_date: "2025-12-27",
    return_date: "2025-12-26",
    status: false,
    fine: 0
  },
  {
    id: 7,
    user_id: 6,
    book_id: 2,
    user_name: "Maya Anggraini",
    book_title: "Fisika Modern untuk Pemula",
    date: "2025-12-29",
    booking_date: "2025-12-29",
    due_date: "2026-01-05",
    return_date: null,
    status: true,
    fine: 0
  },
  {
    id: 8,
    user_id: 2,
    book_id: 7,
    user_name: "Siti Rahmawati",
    book_title: "Ekonomi Makro & Mikro",
    date: "2025-12-22",
    booking_date: "2025-12-22",
    due_date: "2025-12-29",
    return_date: "2025-12-28",
    status: false,
    fine: 0
  },
  {
    id: 9,
    user_id: 3,
    book_id: 12,
    user_name: "Budi Santoso",
    book_title: "Bumi Manusia",
    date: "2025-12-27",
    booking_date: "2025-12-27",
    due_date: "2026-01-03",
    return_date: null,
    status: true,
    fine: 0
  },
  {
    id: 10,
    user_id: 4,
    book_id: 4,
    user_name: "Dewi Lestari",
    book_title: "Biologi Molekuler",
    date: "2025-12-24",
    booking_date: "2025-12-24",
    due_date: "2025-12-31",
    return_date: "2025-12-30",
    status: false,
    fine: 0
  },
  {
    id: 11,
    user_id: 5,
    book_id: 6,
    user_name: "Rizki Aditya",
    book_title: "Geografi dan Lingkungan",
    date: "2025-12-26",
    booking_date: "2025-12-26",
    due_date: "2026-01-02",
    return_date: null,
    status: true,
    fine: 0
  },
  {
    id: 12,
    user_id: 6,
    book_id: 9,
    user_name: "Maya Anggraini",
    book_title: "Pendidikan Kewarganegaraan",
    date: "2025-12-23",
    booking_date: "2025-12-23",
    due_date: "2025-12-30",
    return_date: "2025-12-29",
    status: false,
    fine: 0
  }
];

export const DUMMY_VISIT_HISTORIES = [
  { id: 1, user_id: 1, visit_date: "2026-01-03", purpose: "Membaca" },
  { id: 2, user_id: 2, visit_date: "2026-01-03", purpose: "Meminjam Buku" },
  { id: 3, user_id: 3, visit_date: "2026-01-02", purpose: "Membaca" },
  { id: 4, user_id: 4, visit_date: "2026-01-02", purpose: "Mengembalikan Buku" },
  { id: 5, user_id: 5, visit_date: "2026-01-01", purpose: "Meminjam Buku" },
  { id: 6, user_id: 6, visit_date: "2026-01-01", purpose: "Membaca" },
  { id: 7, user_id: 1, visit_date: "2025-12-31", purpose: "Mengembalikan Buku" },
  { id: 8, user_id: 2, visit_date: "2025-12-30", purpose: "Membaca" },
  { id: 9, user_id: 3, visit_date: "2025-12-29", purpose: "Meminjam Buku" },
  { id: 10, user_id: 4, visit_date: "2025-12-28", purpose: "Membaca" },
  { id: 11, user_id: 5, visit_date: "2025-12-27", purpose: "Mengembalikan Buku" },
  { id: 12, user_id: 6, visit_date: "2025-12-26", purpose: "Membaca" },
  { id: 13, user_id: 1, visit_date: "2025-12-25", purpose: "Meminjam Buku" },
  { id: 14, user_id: 2, visit_date: "2025-12-24", purpose: "Membaca" },
  { id: 15, user_id: 3, visit_date: "2025-12-23", purpose: "Mengembalikan Buku" }
];

export const DUMMY_CATEGORIES = [
  { 
    id: 1, 
    name: "Matematika", 
    description: "Buku & materi Matematika", 
    image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop" 
  },
  { 
    id: 2, 
    name: "Fisika", 
    description: "Buku & materi Fisika", 
    image_url: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop" 
  },
  { 
    id: 3, 
    name: "Kimia", 
    description: "Buku & materi Kimia", 
    image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop" 
  },
  { 
    id: 4, 
    name: "Biologi", 
    description: "Buku & materi Biologi", 
    image_url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop" 
  },
  { 
    id: 5, 
    name: "Ilmu Pengetahuan Alam (IPA)", 
    description: "Ilmu Pengetahuan Alam", 
    image_url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=300&fit=crop" 
  },
  { 
    id: 6, 
    name: "Ilmu Pengetahuan Sosial (IPS)", 
    description: "Ilmu Pengetahuan Sosial", 
    image_url: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?w=400&h=300&fit=crop" 
  },
  { 
    id: 7, 
    name: "Sejarah", 
    description: "Sejarah dunia & Indonesia", 
    image_url: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=300&fit=crop" 
  },
  { 
    id: 8, 
    name: "Geografi", 
    description: "Geografi & lingkungan", 
    image_url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=300&fit=crop" 
  },
  { 
    id: 9, 
    name: "Ekonomi", 
    description: "Ekonomi & bisnis", 
    image_url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop" 
  },
  { 
    id: 10, 
    name: "Sosiologi", 
    description: "Ilmu sosial & masyarakat", 
    image_url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=300&fit=crop" 
  },
  { 
    id: 11, 
    name: "Bahasa Indonesia", 
    description: "Bahasa & sastra Indonesia", 
    image_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop" 
  },
  { 
    id: 12, 
    name: "Bahasa Inggris", 
    description: "Bahasa & sastra Inggris", 
    image_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop" 
  },
  { 
    id: 13, 
    name: "Bahasa Asing Lainnya", 
    description: "Bahasa asing & linguistik", 
    image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop" 
  },
  { 
    id: 14, 
    name: "Pendidikan Pancasila dan Kewarganegaraan (PPKn)", 
    description: "Pendidikan Pancasila & Kewarganegaraan", 
    image_url: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=400&h=300&fit=crop" 
  },
  { 
    id: 15, 
    name: "Informatika / TIK", 
    description: "Teknologi & informatika", 
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop" 
  },
  { 
    id: 16, 
    name: "Seni Budaya", 
    description: "Seni & budaya", 
    image_url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop" 
  },
  { 
    id: 17, 
    name: "Pendidikan Jasmani dan Kesehatan", 
    description: "Olahraga & kesehatan", 
    image_url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop" 
  },
  { 
    id: 18, 
    name: "Novel dan Fiksi", 
    description: "Novel & fiksi populer", 
    image_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop" 
  },
  { 
    id: 19, 
    name: "Cerpen dan Puisi", 
    description: "Cerpen & karya puisi", 
    image_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop" 
  },
  { 
    id: 20, 
    name: "Ensiklopedia", 
    description: "Ensiklopedia & referensi", 
    image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop" 
  },
];

// Flag untuk menggunakan dummy data
export const USE_DUMMY_DATA = false;
