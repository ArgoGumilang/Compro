import React from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";

interface Borrow {
  id: number;
  nama: string;
  judul: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  status: 'Dipinjam' | 'Dikembalikan' | 'Terlambat';
}

interface DeleteBorrowModalProps {
  isOpen: boolean;
  borrow?: Borrow;
  onClose: () => void;
}

const DeleteBorrowModal: React.FC<DeleteBorrowModalProps> = ({
  isOpen,
  borrow,
  onClose,
}) => {
  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting book borrowing data:", borrow);
    onClose();
  };

  if (!borrow) return null;

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
            Apakah Anda yakin ingin menghapus data peminjaman buku ini?
          </p>
          <p className="text-gray-500 text-sm mt-1">
            "{borrow.nama}" ({borrow.judul})
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

export { DeleteBorrowModal };
