import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { ArtikelPage, ManajemenBukuPage, DataPresensiPage, DataAnggotaPage } from './pages';

// Page titles mapping
const pageTitles: { [key: string]: string } = {
  '/': 'Dashboard',
  '/data-anggota': 'Data Anggota',
  '/manajemen-buku': 'Manajemen Buku',
  '/peminjaman/aktif': 'Peminjaman Aktif',
  '/peminjaman/pengembalian': 'Pengembalian',
  '/peminjaman/jatuh-tempo': 'Jatuh Tempo',
  '/presensi/data': 'Presensi',
  '/presensi/scan-barcode': 'Scan Barcode',
  '/upload-artikel': 'Upload Artikel',
};

function AppContent() {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-52 pt-[60px]">
        {/* Page Title Bar */}
        <div className="bg-[#BE4139] px-6 py-4 relative z-30">
          <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
        </div>
        
        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<div className="text-gray-600">Dashboard Page</div>} />
            <Route path="/data-anggota" element={<DataAnggotaPage />} />
            <Route path="/manajemen-buku" element={<ManajemenBukuPage />} />
            <Route path="/peminjaman/aktif" element={<div className="text-gray-600">Peminjaman Aktif Page</div>} />
            <Route path="/peminjaman/pengembalian" element={<div className="text-gray-600">Pengembalian Page</div>} />
            <Route path="/peminjaman/jatuh-tempo" element={<div className="text-gray-600">Jatuh Tempo Page</div>} />
            <Route path="/presensi/data" element={<DataPresensiPage />} />
            <Route path="/presensi/scan-barcode" element={<div className="text-gray-600">Scan Barcode Page</div>} />
            <Route path="/upload-artikel" element={<ArtikelPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
