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
    <Modal isOpen={isOpen} onClose={onClose} title="Lihat Data Anggota">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Nama Lengkap</label>
          <p className="text-gray-800">{member.nama}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">NIS / NIP</label>
          <p className="text-gray-800">{member.nisNip}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <p className="text-gray-800">{member.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Kelas</label>
          <p className="text-gray-800">{member.kelas}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Role</label>
          <p className="text-gray-800">{member.role}</p>
        </div>
        <div className="pt-4">
          <Button onClick={onClose} className="w-full">
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { ViewMemberModal };
