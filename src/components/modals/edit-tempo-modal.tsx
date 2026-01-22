import React, { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface JatuhTempoData {
  id: number;
  nama: string;
  judul: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  denda: string;
  status: "Dipinjam" | "Dikembalikan" | "Terlambat";
}

interface EditTempoModalProps {
  isOpen: boolean;
  data?: JatuhTempoData;
  onClose: () => void;
  onSave?: (updatedData: JatuhTempoData) => void; // callback ketika save
}

export const EditTempoModal: React.FC<EditTempoModalProps> = ({
  isOpen,
  data,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<JatuhTempoData | undefined>(data);

  // Sync formData setiap kali data berubah
  useEffect(() => {
    if (data) setFormData({ ...data });
  }, [data]);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof JatuhTempoData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    if (formData && onSave) {
      onSave(formData); // kirim data ke parent
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Data Jatuh Tempo">
      <div className="space-y-4">
        <div>
            <label className="block text-sm font-semibold mb-1">Nama</label>
            <Input
            value={formData.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
            />
        </div>

        <div>
            <label className="block text-sm font-semibold mb-1">Judul Buku</label>
            <Input
            value={formData.judul}
            onChange={(e) => handleChange("judul", e.target.value)}
            />
        </div>

        <div>
            <label className="block text-sm font-semibold mb-1">Tanggal Pinjam</label>
            <Input
            type="date"
            value={formData.tanggalPinjam}
            onChange={(e) => handleChange("tanggalPinjam", e.target.value)}
            />
        </div>

        <div>
            <label className="block text-sm font-semibold mb-1">Tanggal Kembali</label>
            <Input
            type="date"
            value={formData.tanggalKembali}
            onChange={(e) => handleChange("tanggalKembali", e.target.value)}
            />
        </div>

        <div>
            <label className="block text-sm font-semibold mb-1">Denda</label>
            <Input
            value={formData.denda}
            onChange={(e) => handleChange("denda", e.target.value)}
            />
        </div>

        <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full border-2 border-gray-300 rounded-xl p-2 focus:border-[#BE4139] transition-all duration-300"
            >
            <option value="Dipinjam">Dipinjam</option>
            <option value="Dikembalikan">Dikembalikan</option>
            <option value="Terlambat">Terlambat</option>
            </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={onClose}>Batal</Button>
            <Button onClick={handleSave}>Simpan</Button>
        </div>
        </div>
    </Modal>
  );
};
