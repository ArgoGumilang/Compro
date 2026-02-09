import React from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface ViewMemberModalProps {
  isOpen: boolean;
  member?: any;
  onClose: () => void;
}

const ViewMemberModal: React.FC<ViewMemberModalProps> = ({ isOpen, member, onClose }) => {
  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Anggota">
      <div className="space-y-4">
        {/* ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User ID
          </label>
          <input
            type="text"
            value={member.id || '-'}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={member.full_name || member.nama || '-'}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Username / NIS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username / NIS
          </label>
          <input
            type="text"
            value={member.username || member.nisNip || '-'}
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

        {/* No HP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            No. HP
          </label>
          <input
            type="text"
            value={member.no_hp || member.phone || '-'}
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
            value={member.kelas || member.class || '-'}
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

        {/* Tanggal Terdaftar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Terdaftar
          </label>
          <input
            type="text"
            value={
              member.tanggal_terdaftar || member.created_at
                ? new Date(member.tanggal_terdaftar || member.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : '-'
            }
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
