import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { createBook } from '../../lib/api';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    quantity: '',
    place: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.category) {
      setError('Judul, penulis, dan kategori harus diisi');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const bookData = {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn || '',
        category: formData.category,
        quantity: parseInt(formData.quantity) || 1,
        place: formData.place || '',
      };

      console.log('📤 Creating book:', bookData);
      await createBook(bookData);
      console.log('✅ Book created successfully');
      
      alert('Buku berhasil ditambahkan!');
      
      // Reset form
      setFormData({ title: '', author: '', isbn: '', category: '', quantity: '', place: '' });
      onClose();
      
      // Refresh parent data
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 500);
      }
    } catch (err: any) {
      console.error('❌ Failed to create book:', err);
      setError(`Gagal menambahkan buku: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Buku">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan judul buku"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
          <Input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Masukkan nama penulis"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
          <Input
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Masukkan ISBN"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent"
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="mtk">Matematika</option>
            <option value="fisika">Fisika</option>
            <option value="kimia">Kimia</option>
            <option value="biologi">Biologi</option>
            <option value="ipa">Ilmu Pengetahuan Alam (IPA)</option>
            <option value="ips">Ilmu Pengetahuan Sosial (IPS)</option>
            <option value="sejarah">Sejarah</option>
            <option value="geografi">Geografi</option>
            <option value="ekonomi">Ekonomi</option>
            <option value="sosio">Sosiologi</option>
            <option value="bindo">Bahasa Indonesia</option>
            <option value="beng">Bahasa Inggris</option>
            <option value="basing">Bahasa Asing Lainnya</option>
            <option value="ppkn">Pendidikan Pancasila dan Kewarganegaraan (PPKn)</option>
            <option value="tik">Informatika / TIK</option>
            <option value="senbud">Seni Budaya</option>
            <option value="penjas">Pendidikan Jasmani dan Kesehatan</option>
            <option value="novfik">Novel dan Fiksi</option>
            <option value="cerpuis">Cerpen dan Puisi</option>
            <option value="ensik">Ensiklopedia</option>
            <option value="alquran">Al-Qur'an</option>
            <option value="juzamma">Juz Amma</option>
            <option value="alkitab">Alkitab</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
          <select
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent"
            required
          >
            <option value="">Pilih Lokasi Buku</option>
            <option value="Posisi 1">Rak Koleksi Novel dan Fiksi (1)</option>
            <option value="Posisi 2">Rak Koleksi Ensiklopedia (2)</option>
            <option value="Posisi 3">Rak Koleksi Keagamaan (3)</option>
            <option value="Posisi 4">Area Tamu (4)</option>
            <option value="Posisi 5">Rak Koleksi Buku Pelajaran (5)</option>
            <option value="Posisi 6">Rak Koleksi Buku Pelajaran (6)</option>
            <option value="Posisi 7">Meja Baca (7)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Masukkan jumlah"
            min="1"
            required
          />
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Batal
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export { AddBookModal };
