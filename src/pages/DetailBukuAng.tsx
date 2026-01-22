import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Star, Bell, Search, User } from "lucide-react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { getBookById } from "../lib/api";
import sadCover from "../assets/covers/sad.jpg";
import ayahkuCover from "../assets/covers/ayahkubukanpembohong.jpg";
import cobaCover from "../assets/covers/coba.jpg";
import leviathanCover from "../assets/covers/leviathan.jpg";
import laskarCover from "../assets/covers/laskar pelangi.jpg";

// Cover mapping berdasarkan title buku (lowercase untuk matching)
const coverMapping: { [key: string]: string } = {
  'sad': sadCover,
  'ayahku bukan pembohong': ayahkuCover,
  'ayahkubukanpembohong': ayahkuCover,
  'ayah ku bukan pembohong': ayahkuCover,
  'coba': cobaCover,
  'leviathan': leviathanCover,
  'laskar pelangi': laskarCover,
};

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

/* ================= PAGE ================= */
const DetailBukuPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("id");

  const [bookData, setBookData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine if this is admin or user view
  const isAdminView = window.location.pathname.includes('manajemen');
  const backUrl = isAdminView ? "/manajemen-buku" : "/dashanggota";

  useEffect(() => {
    const fetchBookDetail = async () => {
      if (!bookId) {
        setError("ID buku tidak ditemukan");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("📚 Fetching book detail for ID:", bookId);
        const data = await getBookById(bookId);
        console.log("✅ Book data received:", data);
        
        // Apply cover mapping
        const titleLower = data.title?.toLowerCase().trim().replace(/\s+/g, ' ') || '';
        console.log('📖 Matching book title:', data.title, '-> normalized:', titleLower);
        let coverUrl = coverMapping[titleLower];
        console.log('🖼️ Found cover in mapping:', !!coverUrl);
        
        if (!coverUrl) {
          if (data.cover) {
            coverUrl = data.cover;
          } else {
            coverUrl = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect width="300" height="400" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%23999"%3EBook Cover%3C/text%3E%3C/svg%3E';
          }
        }
        
        setBookData({
          ...data,
          cover: coverUrl,
          cover_url: coverUrl
        });
        setError(null);
      } catch (err: any) {
        console.error("❌ Error fetching book:", err);
        setError(err.message || "Gagal memuat detail buku");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [bookId]);

  const ratingData = {
    averageRating: 4.5,
    totalReviews: 123,
    ratings: [
      { star: 5, percentage: 48 },
      { star: 4, percentage: 32 },
      { star: 3, percentage: 14 },
      { star: 2, percentage: 4 },
      { star: 1, percentage: 2 },
    ],
  };

  const reviews = [
    {
      name: "Dinda D",
      date: "10 Dec 2022",
      rating: 4,
      comment:
        "Struktur materinya sistematis dan mudah dipahami. Cocok untuk persiapan UTBK.",
    },
    {
      name: "Desfira A",
      date: "04 Oct 2021",
      rating: 4,
      comment:
        "Latihan soalnya bervariasi dan menantang. Sangat membantu siswa.",
    },
    {
      name: "Argo Gumilang",
      date: "26 Sept 2020",
      rating: 4,
      comment:
        "Bahasanya jelas dan contoh soalnya relevan dengan kehidupan sehari-hari.",
    },
  ];

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={16}
          className={
            s <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 mb-6"
        >
          <ChevronLeft size={16} /> Kembali
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* COVER */}
          <div className="bg-white rounded-xl border shadow p-4">
            <img
              src="https://cdn.eurekabookhouse.co.id/ebh/product/all/004510075020.jpg"
              className="rounded-lg w-full aspect-[3/4] object-cover"
            />
          </div>

          {/* INFO */}
          <div className="xl:col-span-3 space-y-8">
            <div className="bg-white rounded-xl border shadow p-6">
              <h2 className="font-bold text-[#BE4139] mb-4">
                Informasi Buku
              </h2>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                {[
                  ["Judul", bookData.judul],
                  ["Penulis", bookData.penulis],
                  ["Publisher", bookData.publisher],
                  ["Kategori", bookData.kategori],
                  ["ISBN", bookData.isbn],
                  ["DDC", bookData.ddc],
                  ["Total Halaman", bookData.totalHalaman],
                  ["Tahun Terbit", bookData.tahunTerbit],
                  ["Asal Kota", bookData.asalKota],
                  ["Jumlah Buku", bookData.jumlahBukuTersedia],
                  ["Deskripsi Fisik", bookData.deskripsiFisikBuku],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="font-semibold text-gray-500">{label}</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="font-semibold text-gray-500">
                  Deskripsi Singkat
                </p>
                <p className="text-gray-700 mt-1">
                  {bookData.deskripsiSingkatBuku}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow p-6">
              <h2 className="font-bold text-[#BE4139] mb-2">
                Lokasi Buku
              </h2>
              <p className="mb-4">{bookData.denah}</p>

              <div className="relative inline-block max-w-full">
                <img 
                  src="/images/denah.png" 
                  alt="Denah Perpustakaan"
                  className="rounded-lg border w-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Denah+Tidak+Tersedia";
                  }}
                />

                {/* Highlight lokasi */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {(() => {
                    // Ambil nomor lokasi dari string, misal "Rak Koleksi Buku Pelajaran (5)" -> 5
                    const match = bookData.denah.match(/\((\d+)\)/);
                    const loc = match ? Number(match[1]) : null;
                    if (!loc) return null;

                    const highlights: Record<number, string> = {
                      1: "absolute left-[3%] top-[6.5%] w-[5%] h-[63%] bg-[#BE4139] opacity-50 animate-pulse border-2 border-[#BE4139]",
                      2: "absolute left-[8%] top-[6.5%] w-[19.5%] h-[9.5%] bg-[#BE4139] opacity-50 animate-pulse border-2 border-[#BE4139]",
                      3: "absolute left-[27.5%] top-[6.5%] w-[12%] h-[9.5%] bg-[#BE4139] opacity-50 animate-pulse border-2 border-[#BE4139]",
                      4: "absolute left-[44.4%] top-[18.5%] w-[4.9%] h-[15%] bg-[#BE4139] opacity-50 rounded-full animate-pulse border-2 border-[#BE4139]",
                      5: "absolute right-[38.7%] top-[6.5%] w-[5%] h-[39%] bg-[#BE4139] opacity-50 animate-pulse border-2 border-[#BE4139]",
                      6: "absolute right-[38.7%] bottom-[5.5%] w-[5%] h-[39%] bg-[#BE4139] opacity-50 animate-pulse border-2 border-[#BE4139]",
                      7: "absolute left-[24.5%] bottom-[5.5%] w-[28.5%] h-[8%] bg-[#BE4139] opacity-50 rounded-full animate-pulse border-2 border-[#BE4139]",
                    };

                    return <div className={highlights[loc]} />;
                  })()}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 bg-[#BE4139] opacity-50 border-2 border-[#BE4139] rounded"></div>
                <span>Lokasi buku saat ini</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow p-6">
              <h2 className="font-bold text-[#BE4139] mb-6">
                Rating & Ulasan
              </h2>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div>
                  <div className="text-5xl font-black text-[#BE4139]">
                    {ratingData.averageRating}
                  </div>
                  {renderStars(Math.round(ratingData.averageRating))}
                  <p className="text-sm text-gray-500">
                    {ratingData.totalReviews} ulasan
                  </p>
                </div>

                <div className="flex-1 space-y-2">
                  {ratingData.ratings.map((r) => (
                    <div key={r.star} className="flex items-center gap-3">
                      <span className="w-4 text-sm">{r.star}</span>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-[#BE4139] h-full rounded-full"
                          style={{ width: `${r.percentage}%` }}
                        />
                      </div>
                      <span className="w-10 text-sm text-right">
                        {r.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold">{r.name}</p>
                      <span className="text-xs text-gray-500">
                        {r.date}
                      </span>
                    </div>
                    {renderStars(r.rating)}
                    <p className="text-sm text-gray-600 mt-2">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetailBukuPage;
