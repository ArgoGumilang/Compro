import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { getCurrentUser, getBookingHistoriesByUser, getBookById, getUserById } from "../lib/api";

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
          <button 
          className="font-semibold text-black"
          onClick={() => navigate("/pinjamansaya")}>
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

/* ================= BOOK ITEM CARD ================= */
const BorrowedBookCard = ({ book }: { book: any }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img 
        src={book.cover_url || book.cover || 'https://via.placeholder.com/150x200?text=No+Cover'} 
        alt={book.book_title || book.title} 
        className="h-44 w-full object-cover" 
      />
      <div className="p-4">
        <p className="font-bold text-lg">{book.book_title || book.title}</p>
        <p className="text-sm text-gray-500 mb-1">{book.author_name || 'Unknown Author'}</p>
        <p className="text-xs text-gray-400 mt-2 mb-2">Dipinjam: {formatDate(book.booking_date || book.date)}</p>
        <p className="text-xs text-red-600">Harus kembali: {formatDate(book.return_date)}</p>
        <div className="mt-2">
          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
            book.status ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {book.status ? 'Dipinjam' : 'Dikembalikan'}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ================= PINJAMAN SAYA PAGE ================= */
export default function PinjamanSaya() {
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    try {
      setLoading(true);
      setError('');

      // Get current user
      const userData = await getCurrentUser();
      console.log('👤 Current user:', userData);
      
      if (!userData || !userData.id) {
        setError('User tidak ditemukan. Silakan login terlebih dahulu.');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      let bookingsArray = [];
      
      try {
        // Try to get user's booking histories
        const bookingsResponse = await getBookingHistoriesByUser(userData.id);
        console.log('📚 Bookings response:', bookingsResponse);
        bookingsArray = bookingsResponse.booking_histories || bookingsResponse || [];
      } catch (bookingErr: any) {
        console.warn('⚠️ Failed to fetch user bookings, trying alternative method:', bookingErr);
        
        // If endpoint not available, check if user data contains bookings
        if (userData.booking_histories) {
          bookingsArray = userData.booking_histories;
        } else {
          // If no bookings found anywhere, just show empty state
          console.log('ℹ️ No bookings found for user');
          bookingsArray = [];
        }
      }
      
      // Filter only active bookings (status = true)
      const activeBookings = (Array.isArray(bookingsArray) ? bookingsArray : [])
        .filter((b: any) => b.status === true);

      if (activeBookings.length === 0) {
        setBorrowedBooks([]);
        setLoading(false);
        return;
      }

      // Enrich with book details
      const enrichedBookings = await Promise.all(
        activeBookings.map(async (booking: any) => {
          try {
            const bookData = await getBookById(booking.book_id);
            return {
              ...booking,
              book_title: bookData.title,
              author_name: bookData.author_name || bookData.author?.name || bookData.author,
              cover_url: bookData.cover_url || bookData.cover,
            };
          } catch (err) {
            console.error(`❌ Failed to fetch book ${booking.book_id}:`, err);
            return {
              ...booking,
              book_title: `Book ID ${booking.book_id}`,
              author_name: 'Unknown Author',
            };
          }
        })
      );

      console.log('✨ Enriched bookings:', enrichedBookings);
      setBorrowedBooks(enrichedBookings);
    } catch (err: any) {
      console.error('❌ Failed to load bookings:', err);
      
      // Check if authentication error
      if (err.message && (err.message.includes('401') || err.message.includes('403') || err.message.includes('Unauthorized') || err.message.includes('non-JSON'))) {
        setError('Session anda telah berakhir. Silakan login kembali.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.message || 'Gagal memuat data peminjaman');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />

      <main className="pt-16 pb-8 max-w-7xl mx-auto px-6 space-y-8">
        <h2 className="text-2xl font-bold text-center mt-6">Buku yang Sedang Dipinjam</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#BE4139] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading peminjaman...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md mx-auto">
              <p className="font-semibold mb-2">Gagal memuat data</p>
              <p className="text-sm">{error}</p>
              <button 
                onClick={loadUserBookings}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        ) : borrowedBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="mb-4">
                <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Peminjaman</h3>
              <p className="text-gray-600 mb-6">
                Anda belum meminjam buku apapun saat ini. Mulai jelajahi koleksi perpustakaan kami!
              </p>
              <button
                onClick={() => navigate('/dashanggota')}
                className="px-6 py-3 bg-[#BE4139] text-white rounded-xl hover:bg-[#9e3530] transition font-semibold"
              >
                Jelajahi Buku
              </button>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {borrowedBooks.map((book) => (
              <BorrowedBookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
