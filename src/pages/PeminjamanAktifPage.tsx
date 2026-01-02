import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Trash2, Plus } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import DetailPeminjamanModal from '../components/modals/DetailPeminjamanModal';
import { DeleteBorrowModal } from "../components/modals/delete-pinjam-modal";
import { AddPeminjamanModal } from "../components/modals/add-peminjaman-modal";
import { getAllBookingHistories, getAllUsers, getAllBooks } from '../lib/api';

const PeminjamanAktifPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedPeminjaman, setSelectedPeminjaman] = useState<any | undefined>(undefined);
  const [deleteBorrowOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [addPeminjamanOpen, setAddPeminjamanOpen] = useState<boolean>(false);
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
      
      // Fetch booking histories, users, and books in parallel
      const [bookingsData, usersData, booksData] = await Promise.all([
        getAllBookingHistories().catch(() => []),
        getAllUsers().catch(() => ({ users: [] })),
        getAllBooks().catch(() => ({ books: [] })),
      ]);
      
      console.log("📚 Booking histories raw response:", bookingsData);
      console.log("👥 Users data:", usersData);
      console.log("📖 Books data:", booksData);
      
      // Extract arrays
      const historiesArray = bookingsData.booking_histories || bookingsData.bookingHistories || bookingsData;
      const usersArray = usersData.users || usersData || [];
      const booksArray = booksData.books || booksData || [];
      
      console.log("📚 Histories array after extraction:", historiesArray);
      console.log("📚 Array length:", Array.isArray(historiesArray) ? historiesArray.length : 'not array');
      
      // Join data: add user_name and book_title to each booking
      const enrichedHistories = (Array.isArray(historiesArray) ? historiesArray : []).map((booking: any) => {
        const user = usersArray.find((u: any) => u.id === booking.user_id);
        const book = booksArray.find((b: any) => b.id === booking.book_id);
        
        return {
          ...booking,
          user_name: user?.full_name || user?.username || `User ID ${booking.user_id}`,
          book_title: book?.title || `Book ID ${booking.book_id}`,
        };
      });
      
      console.log("✨ Enriched histories with names:", enrichedHistories);
      setBookingHistories(enrichedHistories);
    } catch (err: any) {
      console.error("❌ Failed to fetch booking histories:", err);
      if (err.message.includes("403") || err.message.includes("Forbidden")) {
        setError("Anda belum login. Silakan login terlebih dahulu.");
      } else {
        setError(err.message || "Gagal memuat data peminjaman");
      }
      // Dummy data untuk development
      setBookingHistories([
        { id: 1, user_name: 'User Test', book_title: 'Buku Test', booking_date: '2024-01-01', return_date: '2024-01-15', status: 'active' },
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
          <Button 
            onClick={() => setAddPeminjamanOpen(true)}
            className="gap-2 bg-[#BE4139] text-white rounded-xl hover:bg-[#9e3530] transition-all duration-300 font-semibold"
          >
            <Plus size={18} />
            Tambah Peminjaman
          </Button>
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
                  <td className="px-6 py-4 text-sm text-gray-700">{item.booking_date ? new Date(item.booking_date).toLocaleDateString() : '-'}</td>
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
          bookingId={selectedPeminjaman.id}
        />
      )}
      <DeleteBorrowModal 
        isOpen={deleteBorrowOpen} 
        borrow={selectedPeminjaman} 
        onClose={() => setDeleteModalOpen(false)}
      />
      <AddPeminjamanModal
        isOpen={addPeminjamanOpen}
        onClose={() => setAddPeminjamanOpen(false)}
        onSuccess={async () => {
          console.log('🔄 Refreshing booking histories...');
          await loadBookingHistories();
          console.log('✅ Booking histories refreshed');
        }}
      />
    </div>
  );
};

export default PeminjamanAktifPage;
