import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  ArtikelPage,
  ManajemenBukuPage,
  DataPresensiPage,
  BarcodePage,
  DataAnggotaPage,
  PeminjamanAktifPage,
  PinjamanSaya,
  Kategori,
  Forum,
  ArtikelAng,
  Jelajahi,
  ProfileAng,
} from "../pages";

import DashboardPage from "../pages/DashboardPage";
import DetailBukuPage from "../pages/DetailBukuPage";
import DetailBukuAng from "../pages/DetailBukuAng";
import ProfilePage from "../pages/ProfilePage";
import DashAnggota from "../pages/DashAnggota";

const pageTitles: { [key: string]: string } = {
  "/": "Dashboard",
  "/data-anggota": "Data Anggota",
  "/manajemen-buku": "Manajemen Buku",
  "/manajemen-buku/detail": "Manajemen Buku",
  "/peminjaman/aktif": "Peminjaman Aktif",
  "/presensi/data": "Presensi",
  "/presensi/barcode": "Barcode",
  "/upload-artikel": "Upload Artikel",
  "/profile": "Profile",
  "/detailbuku": "Detail Buku",
  "/dashanggota": "Dashboard Anggota",
  "/pinjamansaya": "Pinjaman Saya",
  "/kategori": "Kategori",
  "/forum": "Forum",
  "/artikelang": "Artikel Ang",
  "/jelajahi": "Jelajahi",
  "/profileang": "Profile Ang",
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
            <Route path="/presensi/data" element={<DataPresensiPage />} />
            <Route path="/presensi/barcode" element={<BarcodePage />} />
            <Route path="/upload-artikel" element={<ArtikelPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashanggota" element={<DashAnggota />} />
            <Route path="/detailbuku" element={<DetailBukuAng />} />
            <Route path="/pinjamansaya" element={<PinjamanSaya />} />
            <Route path="/kategori" element={<Kategori />} />
            <Route path="/Forum" element={<Forum />} />
            <Route path="/artikelang" element={<ArtikelAng />} />
            <Route path="/jelajahi" element={<Jelajahi />} />
            <Route path="/profileang" element={<ProfileAng />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
