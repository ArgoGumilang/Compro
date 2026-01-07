import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { createBookingHistory, getAllUsers, getAllBooks } from '../../lib/api';

interface AddPeminjamanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddPeminjamanModal: React.FC<AddPeminjamanModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    user_id: '',
    book_id: '',
    booking_date: new Date().toISOString().split('T')[0],
    return_date: '',
    status: true,
  });

  useEffect(() => {
    if (isOpen) {
      loadUsersAndBooks();
    }
  }, [isOpen]);

  const loadUsersAndBooks = async () => {
    try {
      setLoadingData(true);
      const [usersRes, booksRes] = await Promise.all([
        getAllUsers().catch(() => ({ users: [] })),
        getAllBooks().catch(() => ({ books: [] })),
      ]);

      const usersData = usersRes.users || usersRes || [];
      const booksData = booksRes.books || booksRes || [];

      setUsers(Array.isArray(usersData) ? usersData : []);
      setBooks(Array.isArray(booksData) ? booksData : []);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Gagal memuat data user dan buku');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.user_id || !formData.book_id || !formData.return_date) {
      setError('Semua field harus diisi');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const bookingDate = new Date(formData.booking_date);
      const returnDate = new Date(formData.return_date);
      
      const data = {
        user_id: parseInt(formData.user_id),
        book_id: parseInt(formData.book_id),
        booking_date: bookingDate.toISOString(),
        return_date: returnDate.toISOString(),
        status: formData.status, // Keep as boolean: true = active, false = returned
      };

      console.log('📤 Creating booking history:', data);
      
      await createBookingHistory(data);
      
      alert('Peminjaman berhasil ditambahkan!');
      
      setFormData({
        user_id: '',
        book_id: '',
        booking_date: new Date().toISOString().split('T')[0],
        return_date: '',
        status: true,
      });
      
      onClose();
      
      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (err: any) {
      console.error('❌ Failed to create booking:', err);
      setError(`Gagal menambahkan peminjaman: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black text-[#BE4139] mb-6">
          Tambah Peminjaman Baru
        </h2>

        {loadingData ? (
          <div className="text-center py-8 text-gray-600">Loading data...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-[#BE4139] mb-2">
                Pilih Anggota
              </label>
              <select
                value={formData.user_id}
                onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#BE4139]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
                required
              >
                <option value="">-- Pilih Anggota --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name || user.username} - {user.role?.name || 'Member'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#BE4139] mb-2">
                Pilih Buku
              </label>
              <select
                value={formData.book_id}
                onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#BE4139]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
                required
              >
                <option value="">-- Pilih Buku --</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#BE4139] mb-2">
                Tanggal Pinjam
              </label>
              <Input
                type="date"
                value={formData.booking_date}
                onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#BE4139] mb-2">
                Tanggal Kembali
              </label>
              <Input
                type="date"
                value={formData.return_date}
                onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#BE4139] hover:bg-[#9e3530] text-white"
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
