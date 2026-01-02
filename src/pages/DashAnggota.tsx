import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User, ChevronDown } from "lucide-react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { getAllBooks } from "../lib/api";

/* ================= HEADER ================= */
const Header = () => {
  const navigate = useNavigate();
  const [openNotif, setOpenNotif] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const notifications = [
    {
      title: "Buku hampir jatuh tempo",
      desc: "Buku Matematika Wajib harus dikembalikan besok",
      time: "1 jam lalu",
    },
    {
      title: "Peminjaman berhasil",
      desc: "Kamu berhasil meminjam buku Fisika Dasar",
      time: "2 hari lalu",
    },
    {
      title: "Info Perpustakaan",
      desc: "Jam operasional berubah selama ujian",
      time: "1 minggu lalu",
    },
  ];

  const handleLogout = () => {
    setOpenProfile(false);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3 font-bold text-sm">
          <span className="text-[#BE4139]">SMA TELKOM</span>
          <span className="text-gray-700">BANDUNG</span>
        </div>

        {/* CENTER */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <button
            className="font-semibold text-black"
            onClick={() => navigate("/dashanggota")}
          >
            Home
          </button>
          <button onClick={() => navigate("/pinjamansaya")}>
            Pinjaman Saya
          </button>
          <button onClick={() => navigate("/kategori")}>
            Kategori
          </button>
          <button onClick={() => navigate("/forum")}>
            Forum
          </button>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          <div className="hidden md:flex items-center border rounded-lg px-2 py-1 text-sm">
            <Search size={16} className="text-gray-400" />
            <input placeholder="Search" className="outline-none px-2 w-32" />
          </div>

          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => {
                setOpenNotif(!openNotif);
                setOpenProfile(false);
              }}
            >
              <Bell size={20} />
            </button>

            <button
              onClick={() => {
                setOpenProfile(!openProfile);
                setOpenNotif(false);
              }}
            >
              <User size={20} />
            </button>
          </div>

          {openNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white border rounded-xl shadow-lg">
              <div className="px-4 py-3 font-semibold text-sm border-b">
                Notifikasi
              </div>
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className="px-4 py-3 hover:bg-gray-100 border-b last:border-b-0"
                >
                  <p className="font-semibold text-sm">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.desc}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}

          {openProfile && (
            <div className="absolute right-0 top-12 w-40 bg-white border rounded-xl shadow-md">
              <button
                onClick={() => {
                  navigate("/profileang");
                  setOpenProfile(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profil
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

/* ================= FOOTER ================= */
const Footer = () => (
  <footer className="bg-white border-t mt-24">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8 text-sm items-start">
        <div>
          <p className="font-bold mb-3">SMA TELKOM BANDUNG</p>
          <div className="flex gap-4 text-gray-600">
            {/* Twitter/X */}
            <a
              href="https://twitter.com/smatelkombandung"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#BE4139] transition"
            >
              <FaXTwitter size={18} />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/smatelkombandungjuara"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#BE4139] transition"
            >
              <FaInstagram size={18} />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/smatelkombandung"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#BE4139] transition"
            >
              <FaFacebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="font-bold mb-3">Informasi</p>
          <ul className="space-y-1 text-gray-600">
            <li>Jalan Radio Palasari, Citeureup, Dayeuhkolot, Bandung</li>
            <li>Telp./Fax. (022) 5229478</li>
            <li>081322290010</li>
            <li>smatelkombandung@ypt.or.id</li>
            <li>Senin - Jumat, 07.00 - 15.15</li>
          </ul>
        </div>

        <div className="md:text-right text-gray-500">
          <p className="font-semibold text-gray-700 mb-2">Perpustakaan Digital</p>
          <p>Mendukung budaya literasi dan pembelajaran digital siswa SMA Telkom Bandung.</p>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Designed for SMA Telkom Bandung
      </div>
    </div>
  </footer>
);

/* ================= HERO ================= */
const Hero: React.FC = () => {
  const navigate = useNavigate(); // <-- di sini

  return (
    <section
      className="rounded-2xl py-24 text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://anulib.anu.edu.au/files/2024-11/book-banner-2300x600.png')",
        /*backgroundImage: "url('https://www.state.gov/wp-content/uploads/2019/04/shutterstock_83045623-e1555360482941-2560x852.jpg')",*/
      }}
    >
      <h1 className="text-4xl font-bold text-white 
               drop-shadow-[0_6px_14px_rgba(0,0,0,0.9)]">
        Cari & Baca Koleksi Favoritmu
      </h1>

      <p className="mt-4 text-white max-w-lg mx-auto
                    drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
        Perpustakaan digital untuk setiap langkah perjalanan belajarmu.
      </p>

      <button
        onClick={() => navigate("/kategori")}
        className="mt-8 bg-[#BE4139] text-white px-8 py-3 rounded-xl text-sm
                  shadow-[0_10px_30px_rgba(0,0,0,0.7)]
                  hover:shadow-[0_14px_40px_rgba(0,0,0,0.85)]
                  hover:opacity-95 transition-all duration-300"
      >
        Mulai Jelajahi
      </button>
    </section>
  );
};

/* ================= BOOK CARD ================= */
const BookCard = ({ book }: { book: any }) => {
  const navigate = useNavigate();
  return (
    <div 
      className="group cursor-pointer" 
      onClick={() => navigate(`/detailbuku?id=${book.id}`)}
    >
      <img 
        src={book.cover_url || book.cover || 'https://via.placeholder.com/150x200?text=No+Cover'} 
        alt={book.title} 
        className="h-52 w-full object-cover rounded-xl mb-3 group-hover:shadow-md transition" 
      />
      <p className="font-semibold text-sm">{book.title}</p>
      <p className="text-xs text-gray-500">{book.author}</p>
    </div>
  );
};

/* ================= FAQ ITEM ================= */
const FAQItem = ({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) => (
  <div className="bg-white rounded-xl border px-4 py-3">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-sm font-semibold"
    >
      {q}
      <ChevronDown size={18} className={`transition ${open ? "rotate-180" : ""}`} />
    </button>
    {open && <p className="mt-3 text-sm text-gray-600">{a}</p>}
  </div>
);



/* ================= MAIN PAGE ================= */
export default function DashAnggota() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await getAllBooks();
      const booksArray = response.books || response || [];
      // Limit to 5 books for recommendations
      const limitedBooks = Array.isArray(booksArray) ? booksArray.slice(0, 5) : [];
      setBooks(limitedBooks);
      console.log("📚 Loaded books for recommendations:", limitedBooks.length);
    } catch (err) {
      console.error("❌ Failed to load books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    { q: "Bagaimana cara melihat daftar buku yang sedang saya pinjam?", a: "Buka menu 'Pinjaman Saya' untuk melihat semua buku yang sedang Anda pinjam dan tanggal pengembaliannya." },
    { q: "Bagaimana cara menjelajahi kategori buku dan melihat isinya?", a: "Pilih menu 'Kategori' untuk melihat semua kategori dan klik kategori tertentu untuk melihat daftar bukunya." },
    { q: "Apakah saya bisa berdiskusi di forum dan bagaimana caranya?", a: "Ya, buka menu 'Forum', pilih topik yang menarik, dan Anda bisa membuat postingan atau memberikan komentar." },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="pt-16 pb-8 max-w-7xl mx-auto px-6 space-y-16">
        <Hero />

        <section>
          <h2 className="font-bold text-lg">Rekomendasi Untukmu</h2>
          <p className="text-sm text-gray-500 mb-6">
            Kami menyarankan buku ini karena aktivitas membacamu!
          </p>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BE4139] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              Belum ada buku untuk direkomendasikan
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center">Frequently Asked Questions</h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            Pertanyaan yang sering ditanyakan anggota
          </p>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                {...item}
                open={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
