import React, { useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createUser } from "../../lib/api";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    nisNip: "",
    email: "",
    kelas: "",
    roleId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.username || !formData.password || !formData.roleId) {
      setError('Nama, username, password, dan role harus diisi');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const userData = {
        full_name: formData.fullName,
        username: formData.username,
        password: formData.password,
        nis_nip: formData.nisNip || '',
        email: formData.email || '',
        kelas: formData.kelas || '',
        role_id: parseInt(formData.roleId),
      };

      console.log('📤 Creating user:', userData);
      await createUser(userData);
      console.log('✅ User created successfully');
      
      alert('Anggota berhasil ditambahkan!');
      
      // Reset form
      setFormData({
        fullName: "",
        username: "",
        password: "",
        nisNip: "",
        email: "",
        kelas: "",
        roleId: "",
      });
      
      onClose();
      
      // Refresh parent data
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 500);
      }
    } catch (err: any) {
      console.error('❌ Failed to create user:', err);
      setError(`Gagal menambahkan anggota: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Anggota">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Masukkan username"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Masukkan password"
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
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
            required
          >
            <option value="">Pilih Role</option>
            <option value="3">Siswa</option>
            <option value="2">Guru</option>
            <option value="1">Admin</option>
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
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export { AddMemberModal };
