import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { getCurrentUser } from "../lib/api";
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
  <footer className="bg-white border-t mt-40">
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

/* ================= PROFILE PAGE ================= */
export default function ProfileAng() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    fullName: '',
    username: '',
    email: '',
    role: '',
    kelas: '',
    no_hp: '',
    tanggal_terdaftar: '',
    id: '',
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      console.log("📡 Fetching user profile from backend...");
      
      const response = await getCurrentUser();
      console.log("✅ Profile data received:", response);
      
      setProfileData({
        fullName: response.full_name || response.username || 'User',
        username: response.username || '',
        email: response.email || '',
        role: response.role?.name || '',
        kelas: response.class || response.kelas || '-',
        no_hp: response.no_hp || response.phone || '-',
        tanggal_terdaftar: response.tanggal_terdaftar || response.created_at || '-',
        id: response.id || '',
      });
      
    } catch (err) {
      console.error('❌ Failed to load profile:', err);
      
      // Fallback ke localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        console.log("⚠️ Using fallback data from localStorage");
        const user = JSON.parse(userStr);
        setProfileData({
          fullName: user.full_name || user.username || 'User',
          username: user.username || '',
          email: user.email || '',
          role: user.role?.name || '',
          kelas: user.class || user.kelas || '-',
          no_hp: user.no_hp || user.phone || '-',
          tanggal_terdaftar: user.tanggal_terdaftar || user.created_at || '-',
          id: user.id || '',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="pt-20 max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-[#BE4139]/10 flex items-center justify-center">
              <User size={32} className="text-[#BE4139]" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Profil Anggota</h1>
              <p className="text-sm text-gray-500">
                Informasi akun perpustakaan
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-600">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-500">User ID</p>
                <p className="font-semibold">{profileData.id || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500">Nama</p>
                <p className="font-semibold">{profileData.fullName}</p>
              </div>
              <div>
                <p className="text-gray-500">Username / NIS</p>
                <p className="font-semibold">{profileData.username}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-semibold">{profileData.email}</p>
              </div>
              <div>
                <p className="text-gray-500">No. HP</p>
                <p className="font-semibold">{profileData.no_hp}</p>
              </div>
              <div>
                <p className="text-gray-500">Kelas</p>
                <p className="font-semibold">{profileData.kelas}</p>
              </div>
              <div>
                <p className="text-gray-500">Role</p>
                <p className="font-semibold capitalize">{profileData.role}</p>
              </div>
              <div>
                <p className="text-gray-500">Tanggal Terdaftar</p>
                <p className="font-semibold">
                  {profileData.tanggal_terdaftar !== '-' 
                    ? new Date(profileData.tanggal_terdaftar).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : '-'
                  }
                </p>
              </div>
            </div>
          )}
            {/*
          <div className="mt-10">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 rounded-xl border text-sm hover:bg-gray-100"
            >
              Kembali
            </button>
          </div>
          */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
