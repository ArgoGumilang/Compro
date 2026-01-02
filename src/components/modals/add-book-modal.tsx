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
    author_id: '',
    publisher_id: '',
    isbn: '',
    sub_category_id: '',
    num_book_available: '',
    num_page: '',
    year_published: '',
    city_origin: '',
    ddc: '',
    eksemplar_code: '',
    location_id: '',
    desc_fisik_buku: '',
    desc_singkat_buku: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author_id || !formData.sub_category_id) {
      setError('Judul, penulis, dan kategori harus diisi');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const bookData = {
        title: formData.title,
        author_id: parseInt(formData.author_id) || 0,
        publisher_id: parseInt(formData.publisher_id) || 0,
        isbn: formData.isbn || '',
        sub_category_id: parseInt(formData.sub_category_id) || 0,
        num_book_available: parseInt(formData.num_book_available) || 1,
        num_page: parseInt(formData.num_page) || 0,
        year_published: formData.year_published ? new Date(formData.year_published).toISOString() : new Date().toISOString(),
        city_origin: formData.city_origin || '',
        ddc: formData.ddc || '',
        eksemplar_code: formData.eksemplar_code || '',
        location_id: parseInt(formData.location_id) || 0,
        desc_fisik_buku: formData.desc_fisik_buku || '',
        desc_singkat_buku: formData.desc_singkat_buku || '',
        cover: '',
        rating: 0,
      };

      console.log('📤 Creating book:', bookData);
      await createBook(bookData);
      console.log('✅ Book created successfully');
      
      alert('Buku berhasil ditambahkan!');
      
      // Reset form
      setFormData({ 
        title: '', 
        author_id: '', 
        publisher_id: '', 
        isbn: '', 
        sub_category_id: '', 
        num_book_available: '', 
        num_page: '', 
        year_published: '', 
        city_origin: '', 
        ddc: '', 
        eksemplar_code: '', 
        location_id: '', 
        desc_fisik_buku: '', 
        desc_singkat_buku: '' 
      });
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
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul *</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul buku"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ISBN *</label>
            <Input
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Masukkan ISBN"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author ID *</label>
            <Input
              type="number"
              name="author_id"
              value={formData.author_id}
              onChange={handleChange}
              placeholder="ID Penulis"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Publisher ID</label>
            <Input
              type="number"
              name="publisher_id"
              value={formData.publisher_id}
              onChange={handleChange}
              placeholder="ID Penerbit"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category ID *</label>
            <Input
              type="number"
              name="sub_category_id"
              value={formData.sub_category_id}
              onChange={handleChange}
              placeholder="ID Sub Kategori"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Tersedia *</label>
            <Input
              type="number"
              name="num_book_available"
              value={formData.num_book_available}
              onChange={handleChange}
              placeholder="Jumlah buku"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Halaman</label>
            <Input
              type="number"
              name="num_page"
              value={formData.num_page}
              onChange={handleChange}
              placeholder="Jumlah halaman"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Terbit</label>
            <Input
              type="date"
              name="year_published"
              value={formData.year_published}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asal Kota</label>
            <Input
              name="city_origin"
              value={formData.city_origin}
              onChange={handleChange}
              placeholder="Kota asal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DDC</label>
            <Input
              name="ddc"
              value={formData.ddc}
              onChange={handleChange}
              placeholder="Dewey Decimal Classification"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Eksemplar</label>
            <Input
              name="eksemplar_code"
              value={formData.eksemplar_code}
              onChange={handleChange}
              placeholder="Kode eksemplar"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi ID</label>
            <select
              name="location_id"
              value={formData.location_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent"
            >
              <option value="">Pilih Lokasi</option>
              <option value="1">Lokasi 1</option>
              <option value="2">Lokasi 2</option>
              <option value="3">Lokasi 3</option>
              <option value="4">Lokasi 4</option>
              <option value="5">Lokasi 5</option>
              <option value="6">Lokasi 6</option>
              <option value="7">Lokasi 7</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Fisik Buku</label>
          <Input
            name="desc_fisik_buku"
            value={formData.desc_fisik_buku}
            onChange={handleChange}
            placeholder="Contoh: Softcover, ukuran A4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
          <textarea
            name="desc_singkat_buku"
            value={formData.desc_singkat_buku}
            onChange={handleChange as any}
            placeholder="Deskripsi singkat buku..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
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
