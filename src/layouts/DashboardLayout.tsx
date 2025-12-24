// layouts/DashboardLayout.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  ArtikelPage,
  ManajemenBukuPage,
  DataPresensiPage,
  DataAnggotaPage,
  PeminjamanAktifPage,
  PengembalianPage,
  JatuhTempoPage,
} from "../pages";

import DashboardPage from "../pages/DashboardPage";
import DetailBukuPage from "../pages/DetailBukuPage";
import ProfilePage from "../pages/ProfilePage";

const pageTitles: { [key: string]: string } = {
  "/": "Dashboard",
  "/data-anggota": "Data Anggota",
  "/manajemen-buku": "Manajemen Buku",
  "/manajemen-buku/detail": "Manajemen Buku",
  "/peminjaman/aktif": "Peminjaman Aktif",
  "/peminjaman/pengembalian": "Pengembalian",
  "/peminjaman/jatuh-tempo": "Jatuh Tempo",
  "/presensi/data": "Presensi",
  "/upload-artikel": "Upload Artikel",
  "/profile": "Profile",
};

const DashboardLayout = () => {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />

      <main className="ml-52 pt-[60px]">
        <div className="bg-[#BE4139] px-6 py-4">
          <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
        </div>

        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/data-anggota" element={<DataAnggotaPage />} />
            <Route path="/manajemen-buku" element={<ManajemenBukuPage />} />
            <Route path="/manajemen-buku/detail" element={<DetailBukuPage />} />
            <Route path="/peminjaman/aktif" element={<PeminjamanAktifPage />} />
            <Route path="/peminjaman/pengembalian" element={<PengembalianPage />} />
            <Route path="/peminjaman/jatuh-tempo" element={<JatuhTempoPage />} />
            <Route path="/presensi/data" element={<DataPresensiPage />} />
            <Route path="/upload-artikel" element={<ArtikelPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
