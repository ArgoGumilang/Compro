import React from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

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

interface DetailTempoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: TempoData; 
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Dikembalikan':
      return 'bg-green-100 text-green-600';
    case 'Terlambat':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-orange-100 text-orange-600';
  }
};

const ViewTempoModal: React.FC<DetailTempoModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!data) return null; 

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Jatuh Tempo">
      <div className="space-y-4">
        <Field label="Nama" value={data.nama} />
        <Field label="Judul Buku" value={data.judul} />
        <Field label="Tanggal Pinjam" value={data.tanggalPinjam} />
        <Field label="Tanggal Kembali" value={data.tanggalKembali} />
        {/*<Field label="Tanggal Pengembalian" value={data.pengembalian} />*/}
        <Field label="Denda" value={data.denda} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
              data.status
            )}`}
          >
            {data.status}
          </span>
        </div>

        <div className="flex justify-end pt-4 border-t">
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

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      value={value}
      readOnly
      className="w-full px-4 py-2 border rounded-lg bg-gray-50"
    />
  </div>
);

export { ViewTempoModal };
