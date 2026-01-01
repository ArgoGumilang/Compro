import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Trash2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import DetailPeminjamanModal from '../components/modals/DetailPeminjamanModal';
import { DeleteBorrowModal } from "../components/modals/delete-pinjam-modal";
import { getAllBookingHistories } from '../lib/api';

const PeminjamanAktifPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedPeminjaman, setSelectedPeminjaman] = useState<any | undefined>(undefined);
  const [deleteBorrowOpen, setDeleteModalOpen] = useState<boolean>(false);
  const itemsPerPage = 10;

  const [bookingHistories, setBookingHistories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBookingHistories();
  }, []);

  const loadBookingHistories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllBookingHistories();
      console.log("📚 Booking histories:", data);
      // Backend return {booking_histories: [], page: 1, ...}
      const historiesArray = data.booking_histories || data.bookingHistories || data;
      setBookingHistories(Array.isArray(historiesArray) ? historiesArray : []);
    } catch (err: any) {
      console.error("❌ Failed to fetch booking histories:", err);
      if (err.message.includes("403") || err.message.includes("Forbidden")) {
        setError("Anda belum login. Silakan login terlebih dahulu.");
      } else {
        setError(err.message || "Gagal memuat data peminjaman");
      }
      // Dummy data untuk development
      setBookingHistories([
        { id: 1, user_name: 'User Test', book_title: 'Buku Test', borrowed_date: '2024-01-01', return_date: '2024-01-15', status: 'active' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on search
  const filteredData = bookingHistories.filter(item =>
    item.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.book_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case 'Dipinjam':
        return 'bg-orange-100 text-orange-600';
      case 'Dikembalikan':
        return 'bg-green-100 text-green-600';
      case 'Terlambat':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const renderPagination = (): React.ReactElement => {
    const pages: React.ReactElement[] = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 text-sm rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
            currentPage === i
              ? 'bg-[#BE4139] text-white shadow-lg'
              : 'text-[#BE4139] hover:bg-white'
          }`}
        >
          {i}
        </button>
      );
    }

    return <>{pages}</>;
  };

  const handleDeleteBorrow = (borrow: PeminjamanData) => {
    setSelectedPeminjaman(borrow);
    setDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6 p-8">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#BE4139]">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-[#BE4139]" size={20} />
            <Input
              placeholder="Cari peminjaman..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-white border-2 border-gray-300 rounded-xl focus:border-[#BE4139] transition-all duration-300"
            />
          </div>
          <Button variant="outline" className="gap-2 border-2 border-[#BE4139] bg-white rounded-xl hover:bg-gray-50 hover:border-[#9e3530] transition-all duration-300 font-semibold">
            <Filter size={18} />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#BE4139] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BE4139] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            <p className="text-gray-500 text-sm mb-4">Cek console (F12) untuk detail error</p>
            <button 
              onClick={loadBookingHistories}
              className="mt-4 px-4 py-2 bg-[#BE4139] text-white rounded-xl hover:bg-[#9e3530]"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#BE4139] border-b-2 border-[#BE4139]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">No</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">User</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Buku</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Tanggal Pinjam</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Tanggal Kembali</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {paginatedData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-purple-50 transition-all duration-200">
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.user_name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.book_title || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.borrowed_date ? new Date(item.borrowed_date).toLocaleDateString() : '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.return_date ? new Date(item.return_date).toLocaleDateString() : '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-bold shadow-sm ${getStatusBadgeColor(item.status || 'active')}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setSelectedPeminjaman(item);
                          setIsDetailModalOpen(true);
                        }}
                        className="p-2 hover:bg-purple-200 rounded-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Eye size={18} className="text-[#BE4139]" />
                      </button>
                      <button
                        onClick={() => handleDeleteBorrow(item)}
                        className="p-2 hover:bg-red-200 rounded-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {/* Pagination */}
        {!loading && !error && bookingHistories.length > 0 && (
          <div className="bg-white px-6 py-4 border-t-2 border-[#BE4139] flex items-center justify-center gap-1">
            {renderPagination()}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPeminjaman && (
        <DetailPeminjamanModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          data={{
            nama: selectedPeminjaman.nama,
            judul: selectedPeminjaman.judul,
            tanggalPinjam: selectedPeminjaman.tanggalPinjam,
            tanggalKembali: selectedPeminjaman.tanggalKembali,
            tanggalPengembalian: selectedPeminjaman.tanggalKembali,
          }}
        />
      )}
      <DeleteBorrowModal isOpen={deleteBorrowOpen} borrow={selectedPeminjaman} onClose={() => setDeleteModalOpen(false)}/>
    </div>
  );
};

export default PeminjamanAktifPage;
