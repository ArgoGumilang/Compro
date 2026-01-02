import React, { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createVisitHist, getAllUsers } from "../../lib/api";

interface AddAbsenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddAbsenceModal: React.FC<AddAbsenceModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState("");

  // --- Form Data ---
  const [formData, setFormData] = useState({
    user_id: "",
    visit_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const data = await getAllUsers();
      const usersArray = data.users || data || [];
      setUsers(Array.isArray(usersArray) ? usersArray : []);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.user_id || !formData.visit_date) {
      setError('Semua field harus diisi');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const data = {
        user_id: parseInt(formData.user_id),
        visit_date: formData.visit_date,
      };

      console.log('📤 Creating visit history:', data);
      await createVisitHist(data);
      console.log('✅ Visit history created');
      
      alert('Presensi berhasil ditambahkan!');
      
      // Reset form
      setFormData({
        user_id: '',
        visit_date: new Date().toISOString().split('T')[0],
      });
      
      onClose();
      
      // Refresh data after delay
      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (err: any) {
      console.error('❌ Failed to create visit:', err);
      setError(`Gagal menambahkan presensi: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Presensi">
      {loadingUsers ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BE4139] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* User Selection */}
          <div>
            <label className="block text-sm font-bold text-[#BE4139] mb-2">Pilih Anggota</label>
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

          {/* Visit Date */}
          <div>
            <label className="block text-sm font-bold text-[#BE4139] mb-2">Tanggal Presensi</label>
            <Input
              type="date"
              value={formData.visit_date}
              onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
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
    </Modal>
  );
};

export { AddAbsenceModal };
