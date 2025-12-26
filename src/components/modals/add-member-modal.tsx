import React, { useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nama: "",
    nisNip: "",
    email: "",
    kelas: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // simulasi data member baru
    const newMember = {
      id: Date.now(), // dummy id
      ...formData,
    };

    console.log("Member ditambahkan:", newMember);

    onClose();
    setFormData({
      nama: "",
      nisNip: "",
      email: "",
      kelas: "",
      role: "",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Anggota">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <Input
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        {/* NIS / NIP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            NIS / NIP
          </label>
          <Input
            name="nisNip"
            value={formData.nisNip}
            onChange={handleChange}
            placeholder="Masukkan NIS / NIP"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
        </div>

        {/* Kelas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kelas
          </label>
          <Input
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            placeholder="Contoh: X IPA 1 / -"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
            required
          >
            <option value="">Pilih Role</option>
            <option value="Siswa">Siswa</option>
            <option value="Guru">Guru</option>
          </select>
        </div>

        {/* Action */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
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

export { AddMemberModal };
