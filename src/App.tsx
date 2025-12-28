import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import { DataAnggotaPage } from "./pages/DataAnggotaPage";
import { ManajemenBukuPage } from "./pages/ManajemenBukuPage";
import DetailBukuPage from "./pages/DetailBukuPage";
import PeminjamanAktifPage from "./pages/PeminjamanAktifPage";
import PengembalianPage from "./pages/PengembalianPage";
import JatuhTempoPage from "./pages/JatuhTempoPage";
import { DataPresensiPage } from "./pages/DataPresensiPage";
import ArtikelPage from "./pages/ArtikelPage";
import BarcodePage from "./pages/BarcodePage";

import DashAnggota from "./pages/DashAnggota";
import DetailBukuAng from "./pages/DetailBukuAng";
import PinjamanSaya from "./pages/PinjamanSaya";
import Kategori from "./pages/Kategori";
import Forum from "./pages/Forum";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<LoginPage />} />

        {/* ================= DASH ANGGOTA (NO ADMIN LAYOUT) ================= */}
        <Route path="/dashanggota" element={ <ProtectedRoute><DashAnggota /></ProtectedRoute>}/>
        <Route path="/detailbuku" element={<DetailBukuAng />} />
        <Route path="/pinjamansaya" element={<PinjamanSaya />} />
        <Route path="/pinjamansaya" element={<PinjamanSaya />} />
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/forum" element={<Forum />} />

        {/* ================= ADMIN ================= */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/data-anggota" element={<DataAnggotaPage />} />
          <Route path="/manajemen-buku" element={<ManajemenBukuPage />} />
          <Route path="/manajemen-buku/detail" element={<DetailBukuPage />} />
          <Route path="/peminjaman/aktif" element={<PeminjamanAktifPage />} />
          <Route path="/peminjaman/pengembalian" element={<PengembalianPage />} />
          <Route path="/peminjaman/jatuh-tempo" element={<JatuhTempoPage />} />
          <Route path="/presensi/data" element={<DataPresensiPage />} />
          <Route path="/presensi/scan-barcode" element={<BarcodePage />} />
          <Route path="/upload-artikel" element={<ArtikelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
