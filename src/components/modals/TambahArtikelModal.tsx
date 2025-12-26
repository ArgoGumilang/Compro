import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface TambahArtikelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TambahArtikelModal: React.FC<TambahArtikelModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    judul: '',
    subJudul: '',
    isi: '',
    cover: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cover: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Data Artikel">
      <div className="space-y-6">
        {/* Cover */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Cover</label>
          <div className="relative">
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="cover-upload"
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Paperclip size={18} className="text-gray-400" />
              <span className="text-sm">
                {formData.cover ? formData.cover.name : 'Attach Image'}
              </span>
            </label>
          </div>
        </div>

        {/* Judul Artikel */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Judul Artikel</label>
          <Input
            placeholder="Masukkan judul artikel"
            value={formData.judul}
            onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
            className="bg-white border-gray-300"
          />
        </div>

        {/* Sub judul */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Sub judul</label>
          <Input
            placeholder="Masukkan sub judul"
            value={formData.subJudul}
            onChange={(e) => setFormData({ ...formData, subJudul: e.target.value })}
            className="bg-white border-gray-300"
          />
        </div>

        {/* Isi */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Isi</label>
          <textarea
            placeholder="Masukkan isi artikel"
            value={formData.isi}
            onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent resize-none text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            className="bg-[#BE4139] hover:bg-[#A03A2F] text-white px-8"
          >
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TambahArtikelModal;
