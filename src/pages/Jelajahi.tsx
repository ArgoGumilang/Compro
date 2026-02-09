import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, ChevronLeft } from "lucide-react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { getAllBooks } from "../lib/api";
import { getBookCoverUrl } from "../lib/bookCoverHelper";
import { Input } from "../components/ui/input";
import logoSekolah from "../assets/logo-sekolah.png";
/* ================= HEADER ================= */
const Header = () => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = () => {
    setOpenProfile(false);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src={logoSekolah}
            alt="Logo Sekolah"
            className="h-10 w-auto object-contain"
          />
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
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          <div className="hidden md:flex items-center border rounded-lg px-2 py-1 text-sm">
            <Search size={16} className="text-gray-400" />
            <input placeholder="Search" className="outline-none px-2 w-32" />
          </div>

          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => setOpenProfile(!openProfile)}
            >
              <User size={20} />
            </button>
          </div>

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
        src={getBookCoverUrl(cover, cover_url)}
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
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
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
        author: typeof book.author === 'string' ? book.author : (book.author?.name || book.author_name || book.author || 'Unknown'),
        author_name: typeof book.author === 'string' ? book.author : (book.author?.name || book.author_name),
        category: book.sub_category?.category?.name || book.category?.name || book.category || ''
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

  // Filter books based on search and category
  const filteredBooks = books.filter(book => {
    const matchesSearch = searchQuery === "" || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "" || 
      (book as any).category?.toLowerCase().includes(categoryFilter.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(books.map(book => (book as any).category).filter(Boolean)));

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);

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

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari judul atau penulis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
            >
              <option value="">Semua Kategori</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat as string}>{cat as string}</option>
              ))}
            </select>
          </div>
          {(searchQuery || categoryFilter) && (
            <p className="text-sm text-gray-600">
              Menampilkan {filteredBooks.length} dari {books.length} buku
            </p>
          )}
        </div>

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
