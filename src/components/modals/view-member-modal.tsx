import React from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface Member {
  id: number;
  nama: string;
  nisNip: string;
  email: string;
  kelas: string;
  role: string;
}

interface ViewMemberModalProps {
  isOpen: boolean;
  member?: Member;
  onClose: () => void;
}

const ViewMemberModal: React.FC<ViewMemberModalProps> = ({ isOpen, member, onClose }) => {
  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Anggota">
      <div className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={member.nama}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* NIS / NIP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NIS / NIP
          </label>
          <input
            type="text"
            value={member.nisNip}
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
            value={member.email}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Kelas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kelas
          </label>
          <input
            type="text"
            value={member.kelas}
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
            value={member.role?.name || member.role || '-'}
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
