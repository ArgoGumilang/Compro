import React from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";

interface TempoData {
  id: number;
  nama: string;
  judul: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  //pengembalian: string;
  denda: string;
  status: 'Dipinjam' | 'Dikembalikan' | 'Terlambat';
}

interface DeleteTempoModalProps {
  isOpen: boolean;
  data?: TempoData;
  onClose: () => void;
}

const DeleteTempoModal: React.FC<DeleteTempoModalProps> = ({
  isOpen,
  data,
  onClose,
}) => {
  const handleDelete = () => {
    console.log("Deleting book due date data:", data);
    onClose();
  };

  if (!data) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hapus Data Pengembalian">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle size={32} className="text-[#BE4139]" />
          </div>
        </div>

        <div>
          <p className="text-gray-800 font-medium">
            Apakah Anda yakin ingin menghapus data jatuh tempo buku ini?
          </p>
          <p className="text-gray-500 text-sm mt-1">
            "{data.nama}" ({data.judul})
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

export { DeleteTempoModal };
