import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User, ChevronDown, ChevronLeft } from "lucide-react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";

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

/* ================= ARTIKEL PAGE ================= */
interface Comment {
  id: number;
  name: string;
  role: "Mahasiswa" | "Guru";
  date: string;
  message: string;
}

const formatDateIndonesia = (date: Date) =>
  date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const article = {
  title: "Tips Membaca Efektif",
  description: "Cara meningkatkan konsentrasi saat membaca buku pelajaran.",
  coverImage:
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
};

export default function ArtikelAng() {
  const navigate = useNavigate();

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Dinda",
      role: "Mahasiswa",
      date: "12 September 2025",
      message:
        "Artikelnya relevan banget buat mahasiswa, bahasannya ringan tapi insightful 👍",
    },
    {
      id: 2,
      name: "Pak Andi",
      role: "Guru",
      date: "13 September 2025",
      message: "Sangat membantu sebagai referensi pembelajaran di kelas.",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        name: "User",
        role: "Mahasiswa",
        date: formatDateIndonesia(new Date()),
        message: newComment,
      },
    ]);

    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="px-6 py-8 max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 mb-6"
        >
          <ChevronLeft size={16} />
          Kembali
        </button>

        <div
          className="h-80 rounded-2xl mb-10 relative overflow-hidden flex items-end"
          style={{
            backgroundImage: `url(${article.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 p-6">
            <h1 className="text-4xl font-extrabold text-white">
              {article.title}
            </h1>
            <p className="text-white/90 mt-3 max-w-3xl">
              {article.description}
            </p>
          </div>
        </div>

        {/* ISI ARTIKEL */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-10 space-y-6">
          <p className="text-gray-700 leading-relaxed indent-8">
            Membaca buku pelajaran merupakan aktivitas penting dalam proses belajar,
            baik bagi mahasiswa maupun guru. Namun, banyak pembaca mengalami kesulitan
            berkonsentrasi akibat gangguan lingkungan atau kurangnya strategi membaca
            yang tepat. Oleh karena itu, membaca secara efektif menjadi kunci agar
            materi dapat dipahami dengan lebih baik.
        </p>

        <p className="text-gray-700 leading-relaxed indent-8">
            Langkah awal untuk meningkatkan konsentrasi adalah menciptakan lingkungan
            membaca yang kondusif dan menentukan tujuan membaca. Tempat yang tenang,
            pencahayaan yang cukup, serta tujuan yang jelas akan membantu pembaca lebih
            fokus pada informasi utama yang ingin dipahami.
        </p>

        <p className="text-gray-700 leading-relaxed indent-8">
            Selain itu, teknik membaca aktif seperti memberi catatan, menandai poin
            penting, atau membuat ringkasan singkat dapat meningkatkan pemahaman.
            Mengatur waktu membaca dengan jeda istirahat singkat juga membantu menjaga
            fokus agar tidak mudah lelah.
        </p>

        <p className="text-gray-700 leading-relaxed indent-8">
            Dengan menerapkan strategi membaca yang tepat dan konsisten, mahasiswa dan
            guru dapat meningkatkan konsentrasi serta efektivitas belajar. Membaca
            bukan hanya tentang menyelesaikan bacaan, tetapi memahami dan mengolah
            informasi secara optimal.
        </p>
        </div>

        {/* KOMENTAR */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-[#BE4139] mb-4">
            Diskusi & Komentar
          </h3>

          {comments.map((c) => (
            <div key={c.id} className="mb-4 border-b pb-3 last:border-none">
              <p className="font-semibold">{c.name}</p>
              <p className="text-xs text-gray-400">{c.date}</p>
              <p className="mt-2">{c.message}</p>
            </div>
          ))}

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border rounded-xl p-3 mt-4"
            placeholder="Tulis komentar..."
          />

          <div className="flex justify-end mt-3">
            <button
              onClick={handleAddComment}
              className="bg-[#BE4139] text-white px-5 py-2 rounded-xl"
            >
              Kirim Komentar
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
