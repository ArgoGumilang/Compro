import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User, ChevronLeft } from "lucide-react";
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
            onClick={() => navigate("/dashanggota")}
          >
            Home
          </button>
          <button onClick={() => navigate("/pinjamansaya")}>
            Pinjaman Saya
          </button>
          <button 
          className="font-semibold text-black"
          onClick={() => navigate("/kategori")}>
            Kategori
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

/* ================= BOOK ================= */
interface Book {
  id: number;
  cover: string;
  cover_url?: string;
  title: string;
  author: string;
  author_name?: string;
}

const BookCard: React.FC<Book> = ({ id, cover, cover_url, title, author, author_name }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer group"
      onClick={() => navigate(`/detailbuku?id=${id}`)}
    >
      <img
        src={cover || cover_url || "https://via.placeholder.com/200x300?text=Book+Cover"}
        alt={title}
        className="h-52 w-full object-cover rounded-xl mb-2 group-hover:shadow-lg transition"
      />
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-xs text-gray-500">{author_name || author}</p>
    </div>
  );
};

/* ================= PAGE ================= */
export default function Jelajahi() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 14;

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await getAllBooks();
      const booksArray = response.books || response || [];
      
      // Convert to Book interface format
      const formattedBooks = (Array.isArray(booksArray) ? booksArray : []).map((book: any) => ({
        id: book.id,
        cover: book.cover,
        cover_url: book.cover_url,
        title: book.title,
        author: book.author?.name || book.author_name || book.author || 'Unknown',
        author_name: book.author?.name || book.author_name
      }));
      
      setBooks(formattedBooks);
      console.log("📚 Loaded books for Jelajahi:", formattedBooks.length);
    } catch (err) {
      console.error("❌ Failed to load books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = books.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="px-6 py-10 max-w-7xl mx-auto">
        <button
            onClick={() => navigate("/kategori")}
            className="flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-gray-800 transition"
        >
            <ChevronLeft size={16} />
            Kembali
        </button>
        
        <h1 className="text-2xl font-bold mb-6">
          Jelajahi Koleksi Buku
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BE4139] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading buku...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Belum ada buku tersedia</p>
            <button 
              onClick={loadBooks}
              className="px-4 py-2 bg-[#BE4139] text-white rounded-lg hover:bg-[#9e3530]"
            >
              Muat Ulang
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {currentBooks.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-200 transition"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                      currentPage === i + 1
                        ? "bg-[#BE4139] text-white"
                        : "border hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-200 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
