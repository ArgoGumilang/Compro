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
            className="cursor-pointer"
            onClick={() => navigate("/dashanggota")}
          >
            Home
          </a>
          <a className="cursor-pointer" onClick={() => navigate("/pinjamansaya")}>
            Pinjaman Saya
          </a>
          <a className="cursor-pointer" onClick={() => navigate("/kategori")}>
            Kategori
          </a>
          <a className="font-semibold text-black cursor-pointer" onClick={() => navigate("/forum")}>
            Forum
          </a>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          {/* SEARCH */}
          <div className="hidden md:flex items-center border rounded-lg px-2 py-1 text-sm">
            <Search size={16} className="text-gray-400" />
            <input placeholder="Cari forum..." className="outline-none px-2 w-32" />
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
                      <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
                    </div>
                  ))}
                </div>
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

/* ================= COMMENT ITEM ================= */
const CommentItem = ({ author, avatar, text }) => (
  <div className="bg-white rounded-xl shadow p-4 space-y-2">
    <div className="flex items-center gap-3">
      <img src={avatar} className="w-8 h-8 rounded-full" />
      <p className="font-semibold">{author}</p>
    </div>
    <p className="text-sm text-gray-700">{text}</p>
  </div>
);

/* ================= MAIN FORUM PAGE ================= */
export default function ForumPage() {
  const [forums, setForums] = useState([
    {
      id: 1,
      title: "Tips Memilih Buku yang Tepat",
      body: "Bagaimana cara memilih buku yang cocok untuk belajar?",
      author: "Ayu",
      comments: [
        { author: "Budi", avatar: "https://i.pravatar.cc/150?img=7", text: "Menurut saya, pilih topik yang kamu suka dulu!" },
      ],
    },
    {
      id: 2,
      title: "Rekomendasi Buku Fiksi Seru",
      body: "Buku fiksi apa yang paling seru dibaca?",
      author: "Dewi",
      comments: [
        { author: "Citra", avatar: "https://i.pravatar.cc/150?img=12", text: "Aku suka fantasi & petualangan!" },
      ],
    },
  ]);

  const [view, setView] = useState<"list" | "detail" | "new">("list");
  const [currentForum, setCurrentForum] = useState<any>(null);
  const [newForumTitle, setNewForumTitle] = useState("");
  const [newForumBody, setNewForumBody] = useState("");
  const [newComment, setNewComment] = useState("");

  const openDetail = (f: any) => {
    setCurrentForum(f);
    setView("detail");
  };

  const handleCreateForum = () => {
    if (!newForumTitle.trim() || !newForumBody.trim()) return;

    const newF = {
      id: forums.length + 1,
      title: newForumTitle.trim(),
      body: newForumBody.trim(),
      author: "Kamu",
      comments: [],
    };

    setForums([newF, ...forums]);
    setNewForumTitle("");
    setNewForumBody("");
    setView("list");
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !currentForum) return;

    const updated = forums.map((f) =>
      f.id === currentForum.id
        ? {
            ...f,
            comments: [
              {
                author: "Kamu",
                avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 1}`,
                text: newComment.trim(),
              },
              ...f.comments,
            ],
          }
        : f
    );
    setForums(updated);
    setCurrentForum(updated.find((f) => f.id === currentForum.id));
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="pt-24 max-w-3xl mx-auto px-6 space-y-6 mb-12">
        {/* FORUM LIST */}
        {view === "list" && (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Forum Diskusi</h1>
              <button
                onClick={() => setView("new")}
                className="bg-[#BE4139] text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Buat Forum Baru
              </button>
            </div>

            {forums.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-xl p-4 shadow hover:shadow-lg cursor-pointer"
                onClick={() => openDetail(f)}
              >
                <p className="font-bold text-lg">{f.title}</p>
                <p className="text-sm text-gray-500">Oleh: {f.author}</p>
                <p className="text-sm text-gray-700 mt-2">{f.body.substring(0, 80)}…</p>
              </div>
            ))}
          </>
        )}

                {/* NEW FORUM FORM */}
        {view === "new" && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Buat Forum Baru</h1>
            <input
              value={newForumTitle}
              onChange={(e) => setNewForumTitle(e.target.value)}
              placeholder="Judul Forum"
              className="w-full border rounded-md p-2"
            />
            <textarea
              value={newForumBody}
              onChange={(e) => setNewForumBody(e.target.value)}
              placeholder="Isi Forum"
              className="w-full border rounded-md p-2"
              rows={5}
            />

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={handleCreateForum}
                className="bg-[#BE4139] text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Create Forum
              </button>
              <button
                onClick={() => setView("list")}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* DETAIL FORUM + COMMENTS */}
        {view === "detail" && currentForum && (
          <>
            {/* Back */}
            <button
              onClick={() => setView("list")}
              className="text-[#BE4139] text-sm underline"
            >
              &larr; Kembali ke daftar Forum
            </button>

            {/* Forum Contents */}
            <div className="bg-white rounded-xl shadow p-6 space-y-3">
              <h1 className="text-2xl font-bold">{currentForum.title}</h1>
              <p className="text-gray-600">Oleh: {currentForum.author}</p>
              <p className="text-gray-700 mt-3">{currentForum.body}</p>
            </div>

            {/* Form Comment */}
            <div className="bg-white rounded-xl p-4 space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar kamu..."
                className="w-full border rounded-md p-2"
                rows={3}
              />
              <button
                onClick={handleAddComment}
                className="bg-[#BE4139] text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Kirim Komentar
              </button>
            </div>

            {/* Comments */}
            <div className="space-y-4">
              {currentForum.comments.length === 0 && (
                <p className="text-center text-gray-500">Belum ada komentar</p>
              )}
              {currentForum.comments.map((c, i) => (
                <CommentItem key={i} {...c} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

