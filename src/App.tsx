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

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<LoginPage />} />

        {/* ================= PROTECTED ================= */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route path="/" element={<DashboardPage />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Data Anggota */}
          <Route path="/data-anggota" element={<DataAnggotaPage />} />

          {/* Manajemen Buku */}
          <Route path="/manajemen-buku" element={<ManajemenBukuPage />} />
          <Route path="/manajemen-buku/detail" element={<DetailBukuPage />} />

          {/* Peminjaman */}
          <Route path="/peminjaman/aktif" element={<PeminjamanAktifPage />} />
          <Route path="/peminjaman/pengembalian" element={<PengembalianPage />} />
          <Route path="/peminjaman/jatuh-tempo" element={<JatuhTempoPage />} />

          {/* Presensi */}
          <Route path="/presensi/data" element={<DataPresensiPage />} />
          <Route path="/presensi/scan-barcode" element={<BarcodePage />} />

          {/* Artikel */}
          <Route path="/upload-artikel" element={<ArtikelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
