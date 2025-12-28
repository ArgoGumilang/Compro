import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";

/* ================= HEADER ================= */
const Header = () => {
  const navigate = useNavigate();
  const [openNotif, setOpenNotif] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const notifications = [
    { title: "Buku hampir jatuh tempo", desc: "Buku Matematika harus dikembalikan besok", time: "1 jam lalu" },
    { title: "Peminjaman berhasil", desc: "Kamu berhasil meminjam buku Fisika", time: "2 hari lalu" },
    { title: "Info Perpustakaan", desc: "Jam operasional berubah selama ujian", time: "1 minggu lalu" },
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
          <button onClick={() => navigate("/dashanggota")}>Home</button>
          <button onClick={() => navigate("/pinjamansaya")}>Pinjaman Saya</button>
          <button className="font-semibold text-black" onClick={() => navigate("/kategori")}>Kategori</button>
          <button onClick={() => navigate("/forum")}>Forum</button>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          {/* SEARCH */}
          <div className="hidden md:flex items-center border rounded-lg px-2 py-1 text-sm">
            <Search size={16} className="text-gray-400" />
            <input placeholder="Search kategori..." className="outline-none px-2 w-32" />
          </div>

          {/* ICON NOTIF & PROFILE */}
          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => { setOpenNotif(!openNotif); setOpenProfile(false); }}
            >
              <Bell size={20} />
            </button>
            <button
              onClick={() => { setOpenProfile(!openProfile); setOpenNotif(false); }}
            >
              <User size={20} />
            </button>
          </div>

          {/* DROPDOWN NOTIF */}
          {openNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white border rounded-xl shadow-lg">
              <div className="px-4 py-3 font-semibold text-sm border-b">Notifikasi</div>
              {notifications.map((n, i) => (
                <div key={i} className="px-4 py-3 hover:bg-gray-100 border-b last:border-b-0">
                  <p className="font-semibold text-sm">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.desc}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}

          {/* PROFILE DROPDOWN */}
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
            <a href="https://twitter.com/smatelkombandung" target="_blank" rel="noopener noreferrer" className="hover:text-[#BE4139] transition">
              <FaXTwitter size={18} />
            </a>
            <a href="https://www.instagram.com/smatelkombandung/" target="_blank" rel="noopener noreferrer" className="hover:text-[#BE4139] transition">
              <FaInstagram size={18} />
            </a>
            <a href="https://www.facebook.com/smatelkombandung" target="_blank" rel="noopener noreferrer" className="hover:text-[#BE4139] transition">
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

/* ================= CATEGORY CARD ================= */
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
    { genre: "Matematika", subtitle: "Buku & materi Matematika", image: "https://www.ubaya.ac.id/storage/sites/20/2022/12/225_20160913092013.jpeg" },
    { genre: "Fisika", subtitle: "Buku & materi Fisika", image: "https://www.quipper.com/id/blog/wp-content/uploads/2019/09/Hakikat-Fisika-Fisika-Kelas-10-1.png" },
    { genre: "Kimia", subtitle: "Buku & materi Kimia", image: "https://www.indochem.co.id/lib/images/news/bahan-kimia.png" },
    { genre: "Biologi", subtitle: "Buku & materi Biologi", image: "https://pelayananpublik.id/wp-content/uploads/2021/10/Screenshot_20211019-220359_1.jpg" },
    { genre: "IPA", subtitle: "Ilmu Pengetahuan Alam", image: "https://blog.sman1genteng.sch.id/wp-content/uploads/2023/08/IPA-BS-KLS-X-Cover.png" },
    { genre: "IPS", subtitle: "Ilmu Pengetahuan Sosial", image: "https://blog.sman1genteng.sch.id/wp-content/uploads/2023/08/IPS-BS-KLS-X-Cover.png" },
    { genre: "Sejarah", subtitle: "Sejarah dunia & Indonesia", image: "https://www.selasar.com/wp-content/uploads/2020/06/tentang-Pengertian-Sejarah.jpg" },
    { genre: "Geografi", subtitle: "Geografi & lingkungan", image: "https://cdn.antaranews.com/cache/1200x800/2025/08/19/proyeksi-beras-nasional-surplus-september-2025-2602981.jpg" },
    { genre: "Ekonomi", subtitle: "Ekonomi & bisnis", image: "https://awsimages.detik.net.id/visual/2025/05/05/ekonomi-indonesia-q1-2025-1746445744650_169.png?w=1200" },
    { genre: "Sosiologi", subtitle: "Ilmu sosial & masyarakat", image: "https://uinsgd.ac.id/wp-content/uploads/2023/03/peran-dan-fungsi-sosiologijpg-20230323081410.jpg" },
    { genre: "Bahasa Indonesia", subtitle: "Bahasa & sastra Indonesia", image: "https://languagecenter.unj.ac.id/wp-content/uploads/2023/10/bahasa-indonesia.png" },
    { genre: "Bahasa Inggris", subtitle: "Bahasa & sastra Inggris", image: "https://pbi.umsida.ac.id/wp-content/uploads/2025/07/ChatGPT-Image-16-Jul-2025-11.21.05-1.png" },
    { genre: "Bahasa Asing Lainnya", subtitle: "Bahasa asing & linguistik", image: "https://identitasunhas.com/wp-content/uploads/2022/09/Tips-Belajar-Bahasa-Asing.png" },
    { genre: "PPKn", subtitle: "Pendidikan Pancasila & Kewarganegaraan", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvpOuPa2Pf9T2hdeLi_rHppOwPeNEd3sYfcw&s" },
    { genre: "Informatika / TIK", subtitle: "Teknologi & informatika", image: "https://www.umn.ac.id/wp-content/uploads/2024/12/1-3-1200x675.jpg" },
    { genre: "Seni Budaya", subtitle: "Seni & budaya", image: "https://www.pelajaran.co.id/wp-content/uploads/2019/12/Seni-Budaya.jpg" },
    { genre: "Pendidikan Jasmani & Kesehatan", subtitle: "Olahraga & kesehatan", image: "https://i0.wp.com/rsum.bandaacehkota.go.id/wp-content/uploads/2025/02/lari.webp?fit=1279%2C853&ssl=1" },
    { genre: "Novel & Fiksi", subtitle: "Novel & fiksi populer", image: "https://shopee.co.id/inspirasi-shopee/wp-content/uploads/2021/11/harry-potter.webp" },
    { genre: "Cerpen & Puisi", subtitle: "Cerpen & karya puisi", image: "https://literasisains.id/wp-content/uploads/2025/05/Fullcover-Puisi-Cerpen-dan-Puisi-Asmara-Putih-Abu-Kesan-Masa-SMA-Guruku-Idolaku-1024x703.jpg" },
    { genre: "Ensiklopedia", subtitle: "Ensiklopedia & referensi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOsfOmQow_gkF-au64XaiNqzPkpRzZz88aTA&s" },
    { genre: "Al-Qur’an", subtitle: "Kitab suci Al-Qur’an", image: "https://bdksemarang.kemenag.go.id/assets/images/article/alquran_43.jpeg" },
    { genre: "Juz Amma", subtitle: "Bagian Al-Qur’an Juz Amma", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_i1i5HgKMOEpzDvkq-YJIYQ6HN7EF2vielA&s" },
    { genre: "Alkitab", subtitle: "Kitab suci Alkitab", image: "https://warungsatekamu.org/wp-content/uploads/2018/08/lebih-efektif-membaca-alkitab-low.jpg" },
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
