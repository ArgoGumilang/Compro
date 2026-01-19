import React from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface Member {
  id: number;
  username: string;
  full_name?: string;
  email?: string;
  role_id?: number;
  role?: { id: number; name: string };
  created_at?: string;
}

interface ViewMemberModalProps {
  isOpen: boolean;
  member?: Member;
  onClose: () => void;
}

const ViewMemberModal: React.FC<ViewMemberModalProps> = ({ isOpen, member, onClose }) => {
  if (!member) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Anggota">
      <div className="space-y-4">
        {/* ID User */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID User
          </label>
          <input
            type="text"
            value={member.id}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={member.username}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Nama Lengkap */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={member.full_name || '-'}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="text"
            value={member.email || '-'}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            value={member.role?.name || `Role ID: ${member.role_id}` || '-'}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Tanggal Daftar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Terdaftar
          </label>
          <input
            type="text"
            value={formatDate(member.created_at)}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="bg-[#BE4139] hover:bg-[#A03A2F] text-white"
          >
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { ViewMemberModal };
