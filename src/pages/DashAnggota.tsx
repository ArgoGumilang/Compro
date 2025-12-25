import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Search } from "lucide-react";
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
            <a
                className="font-semibold text-black cursor-pointer"
                onClick={() => navigate("/dashanggota")}
            >
                Home
            </a>
            <a className="cursor-pointer" onClick={() => navigate("/pinjamansaya")}>
                Pinjaman Saya
            </a>
            <a
                className="cursor-pointer"
                onClick={() => navigate("/kategori")}
            >
                Kategori
            </a>
            <a className="cursor-pointer" onClick={() => navigate("/forum")}>
                Forum
            </a>
            </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          {/* SEARCH */}
          <div className="hidden md:flex items-center border rounded-lg px-2 py-1 text-sm">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search"
              className="outline-none px-2 w-32"
            />
          </div>

          {/* NOTIFICATION */}
          <div className="relative">
            <button
              onClick={() => {
                setOpenNotif(!openNotif);
                setOpenProfile(false);
              }}
              className="relative"
            >
              <Bell size={18} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-[#BE4139] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            </button>

            {openNotif && (
              <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-lg overflow-hidden">
                <div className="px-4 py-3 font-semibold text-sm border-b">
                  Notifikasi
                </div>

                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((item, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                    >
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {item.time}
                      </p>
                    </div>
                  ))}
                </div>

                <button className="w-full py-2 text-sm text-[#BE4139] hover:bg-red-50">
                  Tandai semua sudah dibaca
                </button>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <button
            onClick={() => {
              setOpenProfile(!openProfile);
              setOpenNotif(false);
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
              className="w-8 h-8 rounded-full border"
            />
          </button>

          {openProfile && (
            <div className="absolute right-0 top-12 w-40 bg-white border rounded-xl shadow-md overflow-hidden">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
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

/* ================= HERO ================= */
const Hero = () => (
  <section
    className="rounded-2xl py-24 text-center bg-cover bg-center"
    style={{
      backgroundImage: "url('https://images.pexels.com/photos/185764/pexels-photo-185764.jpeg?_gl=1*o0jyc1*_ga*ODU3MDE0NjYwLjE3NTk1NTkzNTY.*_ga_8JE65Q40S6*czE3NjY2NzI3NzMkbzEzJGcxJHQxNzY2NjczOTAzJGo0OCRsMCRoMA..')",
    }}
  >
    <h1 className="text-4xl font-bold text-white">
      Cari & Baca Koleksi Favoritmu
    </h1>
    <p className="mt-4 text-white max-w-lg mx-auto">
      Perpustakaan digital untuk setiap langkah perjalanan belajarmu.
    </p>
    <button className="mt-8 bg-[#BE4139] text-white px-8 py-3 rounded-xl text-sm hover:opacity-90 transition">
      Mulai Jelajahi
    </button>
  </section>
);

/* ================= BOOK CARD ================= */
{/*const BookCard = ({ cover, title, author }) => (
  <div className="group cursor-pointer">
    <img
      src={cover}
      alt={title}
      className="h-52 w-full object-cover rounded-xl mb-3 group-hover:shadow-md transition"
    />
    <p className="font-semibold text-sm">{title}</p>
    <p className="text-xs text-gray-500">{author}</p>
  </div>
);*/}
const BookCard = ({ cover, title, author }) => (
  <div className="group cursor-pointer">
    <img
      src={"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093"}
      alt={"Random Book"}
      className="h-52 w-full object-cover rounded-xl mb-3 group-hover:shadow-md transition"
    />
    <p className="font-semibold text-sm">{"Judul Buku"}</p>
    <p className="text-xs text-gray-500">{"Author"}</p>
  </div>
);

/* ================= FAQ ITEM ================= */
const FAQItem = ({ q, a, open, onClick }) => (
  <div className="bg-white rounded-xl border px-4 py-3">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-sm font-semibold"
    >
      {q}
      <ChevronDown
        size={18}
        className={`transition ${open ? "rotate-180" : ""}`}
      />
    </button>
    {open && <p className="mt-3 text-sm text-gray-600">{a}</p>}
  </div>
);

/* ================= ARTICLE CARD ================= */
/*const ArticleCard = ({ title, subtitle, image }) => (
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
    <img
      src={image}
      alt={title}
      className="h-40 w-full object-cover"
    />
    <div className="p-4">
      <p className="font-bold">{title}</p>
      <p className="text-sm text-gray-500 mb-3">{subtitle}</p>
      <span className="text-[#BE4139] text-sm font-semibold">
        Baca Selengkapnya →
      </span>
    </div>
  </div>
);*/
const ArticleCard = ({ title, subtitle, image }) => (
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
    <img
      src={"https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?_gl=1*9jcn6t*_ga*ODU3MDE0NjYwLjE3NTk1NTkzNTY.*_ga_8JE65Q40S6*czE3NjY2NzI3NzMkbzEzJGcxJHQxNzY2Njc0ODI1JGozNyRsMCRoMA.."}
      alt={"Artikel"}
      className="h-40 w-full object-cover"
    />
    <div className="p-4">
      <p className="font-bold">{"Judul Artikel"}</p>
      <p className="text-sm text-gray-500 mb-3">{"Subjudul dari artikel"}</p>
      <span className="text-[#BE4139] text-sm font-semibold">
        Baca Selengkapnya →
      </span>
    </div>
  </div>
);

/* ================= FOOTER ================= */
const Footer = () => (
  <footer className="bg-white border-t mt-24">
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* TOP */}
      <div className="grid md:grid-cols-3 gap-8 text-sm items-start">
        {/* LEFT */}
        <div>
          <p className="font-bold mb-3">SMA TELKOM BANDUNG</p>
          <div className="flex gap-4 text-gray-600">
            <a className="hover:text-[#BE4139] transition">
                <FaXTwitter size={18} />
            </a>
            <a className="hover:text-[#BE4139] transition">
                <FaInstagram size={18} />
            </a>
            <a className="hover:text-[#BE4139] transition">
                <FaFacebook size={18} />
            </a>
            </div>
        </div>

        {/* CENTER */}
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

        {/* RIGHT */}
        <div className="md:text-right text-gray-500">
          <p className="font-semibold text-gray-700 mb-2">Perpustakaan Digital</p>
          <p>
            Mendukung budaya literasi dan pembelajaran digital siswa
            SMA Telkom Bandung.
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-10 pt-6 border-t text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Designed for SMA Telkom Bandung
      </div>
    </div>
  </footer>
);

/* ================= MAIN PAGE ================= */
export default function DashAnggota() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Bagaimana cara meminjam buku di perpustakaan sekolah?",
      a: "Untuk meminjam buku, siswa cukup login ke akun perpustakaan, cari judul yang diinginkan di katalog, lalu klik tombol Pinjam.",
    },
    {
      q: "Apakah saya bisa memperpanjang masa peminjaman buku secara online?",
      a: "Ya, masa peminjaman bisa diperpanjang melalui menu Peminjaman Saya.",
    },
    {
      q: "Bagaimana cara mengakses koleksi e-book?",
      a: "Pilih menu Kategori dan baca langsung melalui browser.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="pt-24 max-w-7xl mx-auto px-6 space-y-20">
        <Hero />

        <section>
          <h2 className="font-bold text-lg">Rekomendasi Untukmu</h2>
          <p className="text-sm text-gray-500 mb-6">
            Kami menyarankan buku ini karena aktivitas membacamu!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <BookCard key={i} />
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            Pertanyaan yang sering ditanyakan
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

        <section>
          <h2 className="text-xl font-bold text-center">Artikel</h2>
          <p className="text-sm text-center text-gray-500 mb-8">
            Baca informasi terbaru dari perpustakaan.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <ArticleCard title="Judul 1" subtitle="Subtitle 1" />
            <ArticleCard title="Judul 2" subtitle="Subtitle 2" />
            <ArticleCard title="Judul 3" subtitle="Subtitle 3" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
