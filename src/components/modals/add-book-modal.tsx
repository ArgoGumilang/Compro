import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    quantity: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
    setFormData({ title: '', author: '', isbn: '', category: '', quantity: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Buku">
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <option value="Belum Kembali">Belum Kembali</option>
            <option value="Sudah Kembali">Sudah Kembali</option>
            <option value="Terlambat">Terlambat</option>
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
          <Button type="submit" className="flex-1">
            Simpan
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export { AddBookModal };
