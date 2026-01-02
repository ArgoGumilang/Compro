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
    status: true, // true = active/dipinjam, false = returned/selesai
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
    console.log('🔵 Form submitted!');
    
    if (!formData.user_id || !formData.book_id || !formData.return_date) {
      setError('Semua field harus diisi');
      console.log('❌ Validation failed - missing fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log('🔵 Loading set to true');

      const data = {
        user_id: parseInt(formData.user_id),
        book_id: parseInt(formData.book_id),
        booking_date: formData.booking_date,
        return_date: formData.return_date,
        status: formData.status, // boolean: true or false
      };

      console.log('📤 Creating booking history with data:', data);
      console.log('📤 Data types:', {
        user_id: typeof data.user_id,
        book_id: typeof data.book_id,
        booking_date: typeof data.booking_date,
        return_date: typeof data.return_date,
        status: typeof data.status,
      });
      
      console.log('🔵 About to call createBookingHistory...');
      const result = await createBookingHistory(data);
      console.log('✅ Booking history response:', result);
      
      alert('Peminjaman telah diproses. Silakan refresh halaman untuk melihat data terbaru.');
      
      // Reset form
      setFormData({
        user_id: '',
        book_id: '',
        booking_date: new Date().toISOString().split('T')[0],
        return_date: '',
        status: true,
      });
      
      // Close modal first
      onClose();
      
      // Wait 1 second for backend to commit to database
      console.log('⏳ Waiting 1 second for backend to commit...');
      setTimeout(() => {
        console.log('🔄 Now refreshing data...');
        onSuccess();
      }, 1000);
    } catch (err: any) {
      console.error('❌ Failed to create booking:', err);
      console.error('❌ Error details:', {
        message: err.message,
        stack: err.stack,
        fullError: err,
      });
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

            {/* User Selection */}
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

            {/* Book Selection */}
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
                    {book.title} - {book.author_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Booking Date */}
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

            {/* Return Date */}
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

            {/* Buttons */}
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
