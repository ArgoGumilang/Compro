import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";

/* ================= HEADER ================= */
const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenProfile(false);
    navigate("/login");
  };

  const notifications = [
    { title: "Buku hampir jatuh tempo", desc: "Buku Matematika Wajib harus dikembalikan besok", time: "1 jam lalu" },
    { title: "Peminjaman berhasil", desc: "Kamu berhasil meminjam buku Fisika Dasar", time: "2 hari lalu" },
    { title: "Info Perpustakaan", desc: "Jam operasional berubah selama ujian", time: "1 minggu lalu" },
  ];

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
          <a className="cursor-pointer" onClick={() => navigate("/dashanggota")}>Home</a>
          <a className="cursor-pointer" onClick={() => navigate("/pinjamansaya")}>Pinjaman Saya</a>
          <a className="font-semibold text-black cursor-pointer" onClick={() => navigate("/kategori")}>Kategori</a>
          <a className="cursor-pointer" onClick={() => navigate("/forum")}>Forum</a>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          {/* SEARCH */}
          <div className="hidden md:flex items-center border rounded-lg px-2 py-1 text-sm">
            <Search size={16} className="text-gray-400" />
            <input placeholder="Search" className="outline-none px-2 w-32" />
          </div>

          {/* NOTIFICATION */}
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
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((item, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2 text-sm text-[#BE4139] hover:bg-red-50">Tandai semua sudah dibaca</button>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <button onClick={() => { setOpenProfile(!openProfile); setOpenNotif(false); }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-8 h-8 rounded-full border" />
          </button>

          {openProfile && (
            <div className="absolute right-0 top-12 w-40 bg-white border rounded-xl shadow-md overflow-hidden">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Profil</button>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
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
            <FaXTwitter size={18} />
            <FaInstagram size={18} />
            <FaFacebook size={18} />
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

/* ================= GENRE CARD ================= */
const GenreCard = ({ genre, subtitle, image }) => (
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
    <img src={image} alt={genre} className="h-40 w-full object-cover" />
    <div className="p-4">
      <p className="font-bold">{genre}</p>
      <p className="text-sm text-gray-500 mb-3">{subtitle}</p>
      <span className="text-[#BE4139] text-sm font-semibold">Jelajahi →</span>
    </div>
  </div>
);

/* ================= KATEGORI PAGE ================= */
export default function KategoriPage() {
  const genres = [
    { genre: "Fiksi", subtitle: "Cerita imajinatif yang menarik", image: "https://source.unsplash.com/400x300/?fiction,book" },
    { genre: "Non-Fiksi", subtitle: "Buku fakta dan referensi", image: "https://source.unsplash.com/400x300/?nonfiction,book" },
    { genre: "Sejarah", subtitle: "Menyelami masa lalu", image: "https://source.unsplash.com/400x300/?history,book" },
    { genre: "Sains", subtitle: "Pengetahuan ilmiah dan eksperimen", image: "https://source.unsplash.com/400x300/?science,book" },
    { genre: "Teknologi", subtitle: "Inovasi dan perkembangan teknologi", image: "https://source.unsplash.com/400x300/?technology,book" },
    { genre: "Biografi", subtitle: "Kisah hidup tokoh terkenal", image: "https://source.unsplash.com/400x300/?biography,book" },
    { genre: "Fantasi", subtitle: "Dunia imajinatif penuh petualangan", image: "https://source.unsplash.com/400x300/?fantasy,book" },
    { genre: "Romance", subtitle: "Cerita cinta dan hubungan", image: "https://source.unsplash.com/400x300/?romance,book" },
    { genre: "Misteri", subtitle: "Teka-teki dan kasus yang menarik", image: "https://source.unsplash.com/400x300/?mystery,book" },
    { genre: "Self-Help", subtitle: "Buku pengembangan diri", image: "https://source.unsplash.com/400x300/?selfhelp,book" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="pt-24 max-w-7xl mx-auto px-6 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-center mb-6">Kategori Buku</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {genres.map((g, i) => (
              <GenreCard key={i} {...g} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
