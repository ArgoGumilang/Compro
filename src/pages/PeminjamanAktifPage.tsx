import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Trash2, Plus, Pencil } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import DetailPeminjamanModal from '../components/modals/DetailPeminjamanModal';
import EditPeminjamanModal from '../components/modals/edit-pinjam-modal';
import { DeleteBorrowModal } from "../components/modals/delete-pinjam-modal";
import { AddPeminjamanModal } from "../components/modals/add-peminjaman-modal";
import { getAllBookingHistories, getAllUsers, getAllBooks } from '../lib/api';

interface BookingData {
  id: number;
  user_name: string;
  book_title: string;
  booking_date: string;
  return_date: string;
  status: 'Dipinjam' | 'Dikembalikan' | 'Terlambat';
}

const PeminjamanAktifPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [bookingHistories, setBookingHistories] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const itemsPerPage = 10;

  useEffect(() => { loadBookingHistories(); }, []);

  const loadBookingHistories = async () => {
    try {
      setLoading(true);
      setError('');

      const [bookingsData, usersData, booksData] = await Promise.all([
        getAllBookingHistories().catch(() => []),
        getAllUsers().catch(() => ({ users: [] })),
        getAllBooks().catch(() => ({ books: [] })),
      ]);

      const historiesArray = bookingsData.booking_histories || bookingsData.bookingHistories || bookingsData;
      const usersArray = usersData.users || usersData || [];
      const booksArray = booksData.books || booksData || [];

      const enrichedHistories = historiesArray.map((booking: any) => {
        const user = usersArray.find((u: any) => u.id === booking.user_id);
        const book = booksArray.find((b: any) => b.id === booking.book_id);

        return {
          ...booking,
          user_name: user?.full_name || user?.username || `User ID ${booking.user_id}`,
          book_title: book?.title || `Book ID ${booking.book_id}`,
          status: booking.status === true ? "Dipinjam" : "Dikembalikan", // convert boolean -> string
        };
      });

      setBookingHistories(enrichedHistories);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Gagal memuat data peminjaman");
    } finally {
      setLoading(false);
    }
  };

  // Filter
  const filteredData = bookingHistories
    .filter(item => item.status === "Dipinjam")
    .filter(item =>
      item.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.book_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Badge warna status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Dipinjam': return 'bg-orange-100 text-orange-600';
      case 'Dikembalikan': return 'bg-green-100 text-green-600';
      case 'Terlambat': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6 p-8">
      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#BE4139] flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-[#BE4139]" size={20} />
          <Input
            placeholder="Cari peminjaman..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="pl-10 border-2 border-gray-300 rounded-xl focus:border-[#BE4139] transition-all"
          />
        </div>
        <Button onClick={() => setAddModalOpen(true)} className="gap-2 bg-[#BE4139] text-white rounded-xl hover:bg-[#9e3530]">
          <Plus size={18}/> Tambah Peminjaman
        </Button>
        <Button variant="outline" className="gap-2 border-2 border-[#BE4139] bg-white rounded-xl hover:bg-gray-50 hover:border-[#9e3530]">
          <Filter size={18}/> Filter
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#BE4139] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BE4139] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-600 font-semibold">
            {error}
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
                  <tr key={item.id} className="hover:bg-purple-50 transition-all">
                    <td className="px-6 py-4">{startIndex + index + 1}</td>
                    <td className="px-6 py-4">{item.user_name}</td>
                    <td className="px-6 py-4">{item.book_title}</td>
                    <td className="px-6 py-4">{new Date(item.booking_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(item.return_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold shadow-sm ${getStatusBadgeColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => { setSelectedBooking(item); setIsDetailModalOpen(true); }} className="p-2 hover:bg-gray-200 rounded-xl">
                        <Eye size={18} className="text-[#BE4139]" />
                      </button>
                      <button onClick={() => { setSelectedBooking(item); setIsEditModalOpen(true); }} className="p-2 hover:bg-gray-200 rounded-xl">
                        <Pencil size={16} className="text-[#BE4139]" />
                      </button>
                      <button onClick={() => { setSelectedBooking(item); setDeleteModalOpen(true); }} className="p-2 hover:bg-gray-200 rounded-xl">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && bookingHistories.length > 0 && (
          <div className="bg-white px-6 py-4 border-t-2 border-[#BE4139] flex justify-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-xl font-bold ${currentPage === i+1 ? 'bg-[#BE4139] text-white shadow-lg' : 'text-[#BE4139]'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedBooking && (
        <>
          <DetailPeminjamanModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            bookingId={selectedBooking.id}
          />
          <EditPeminjamanModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            booking={selectedBooking}
            onSuccess={loadBookingHistories}
          />
        </>
      )}

      <DeleteBorrowModal
        isOpen={deleteModalOpen}
        borrow={selectedBooking}
        onClose={() => setDeleteModalOpen(false)}
      />
      <AddPeminjamanModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={loadBookingHistories}
      />
    </div>
  );
};

export default PeminjamanAktifPage;
