import React from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";

interface Member {
  id: number;
  nama: string;
  nisNip: string;
  email: string;
  kelas: string;
  role: string;
}

interface DeleteMemberModalProps {
  isOpen: boolean;
  member?: Member;
  onClose: () => void;
}

const DeleteMemberModal: React.FC<DeleteMemberModalProps> = ({
  isOpen,
  member,
  onClose,
}) => {
  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting member:", member);
    onClose();
  };

  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hapus Anggota">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle size={32} className="text-[#BE4139]" />
          </div>
        </div>

        <div>
          <p className="text-gray-800 font-medium">
            Apakah Anda yakin ingin menghapus data anggota ini?
          </p>
          <p className="text-gray-500 text-sm mt-1">
            "{member.nama}" ({member.nisNip})
          </p>
        </div>

        <p className="text-gray-500 text-sm">
          Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-[#BE4139] hover:bg-[#a13830]"
          >
            Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { DeleteMemberModal };
