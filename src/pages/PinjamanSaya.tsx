import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";

/* ================= HEADER ================= */
const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    { title: "Buku hampir jatuh tempo", desc: "Buku Matematika harus dikembalikan besok", time: "1 jam lalu" },
    { title: "Peminjaman berhasil", desc: "Kamu berhasil meminjam buku Fisika Dasar", time: "2 hari lalu" },
    { title: "Info Perpustakaan", desc: "Jam operasional berubah selama ujian", time: "1 minggu lalu" },
  ];

  const handleLogout = () => {
    setOpenProfile(false);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-sm">
          <span className="text-[#BE4139]">SMA TELKOM</span>
          <span className="text-gray-700">BANDUNG</span>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <span className="cursor-pointer" onClick={() => navigate("/dashanggota")}>Home</span>
          <span className="cursor-pointer font-semibold text-black" onClick={() => navigate("/pinjamansaya")}>Pinjaman Saya</span>
          <span className="cursor-pointer" onClick={() => navigate("/kategori")}>Kategori</span>
          <span className="cursor-pointer" onClick={() => navigate("/forum")}>Forum</span>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          <div className="hidden md:flex items-center border rounded-lg px-2 py-1 text-sm">
            <Search size={16} className="text-gray-400" />
            <input placeholder="Search buku..." className="outline-none px-2 w-32" />
          </div>

          <div className="relative">
            <button
              onClick={() => { setOpenNotif(!openNotif); setOpenProfile(false); }}
              className="relative"
            >
              <Bell size={18} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-[#BE4139] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            </button>

            {openNotif && (
              <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-lg overflow-hidden">
                <div className="px-4 py-3 font-semibold text-sm border-b">Notifikasi</div>
                {notifications.map((item, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setOpenProfile(!openProfile)}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                 className="w-8 h-8 rounded-full border" />
          </button>

          {openProfile && (
            <div className="absolute right-0 top-12 w-40 bg-white border rounded-xl shadow-md overflow-hidden">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Profil</button>
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
    <div className="max-w-7xl mx-auto px-6 py-12 text-sm">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-bold mb-3">SMA TELKOM BANDUNG</p>
          <div className="flex gap-4 text-gray-600">
            <FaXTwitter size={18} /> <FaInstagram size={18} /> <FaFacebook size={18} />
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
        <div className="text-gray-500 md:text-right">
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
const BorrowedBookCard = ({ cover, title, author, borrowedAt, dueDate }) => (
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
    <img src={cover} alt={title} className="h-40 w-full object-cover" />
    <div className="p-4">
      <p className="font-bold text-lg">{title}</p>
      <p className="text-sm text-gray-500 mb-1">{author}</p>
      <p className="text-xs text-gray-400">Dipinjam: {borrowedAt}</p>
      <p className="text-xs text-red-600">Harus kembali: {dueDate}</p>
      <button className="mt-2 w-full bg-[#BE4139] text-white py-1 rounded text-sm hover:opacity-90 transition">
        Kembalikan Buku
      </button>
    </div>
  </div>
);

/* ================= PINJAMAN SAYA PAGE ================= */
export default function PinjamanSaya() {
  const borrowedBooks = [
    {
      cover: "https://source.unsplash.com/400x300/?book,library",
      title: "Fisika Dasar",
      author: "John Doe",
      borrowedAt: "01/12/2025",
      dueDate: "15/12/2025",
    },
    {
      cover: "https://source.unsplash.com/400x300/?science,book",
      title: "Biologi Modern",
      author: "Jane Smith",
      borrowedAt: "28/11/2025",
      dueDate: "12/12/2025",
    },
    {
      cover: "https://source.unsplash.com/400x300/?literature,book",
      title: "Sastra Dunia",
      author: "Richard Roe",
      borrowedAt: "30/11/2025",
      dueDate: "14/12/2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="pt-24 max-w-7xl mx-auto px-6 space-y-8">
        <h2 className="text-2xl font-bold text-center mt-6">Buku yang Sedang Dipinjam</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {borrowedBooks.map((book, i) => (
            <BorrowedBookCard key={i} {...book} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
