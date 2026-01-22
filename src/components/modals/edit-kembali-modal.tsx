import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface PengembalianData {
  id: number;
  nama: string;
  judul: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  pengembalian: string;
  denda: string;
  status: "Dipinjam" | "Dikembalikan" | "Terlambat";
}

interface EditReturnModalProps {
  isOpen: boolean;
  data?: PengembalianData;
  onClose: () => void;
  onSave: (updated: PengembalianData) => void;
}

export const EditReturnModal: React.FC<EditReturnModalProps> = ({
  isOpen,
  data,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<PengembalianData | undefined>(undefined);

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSubmit = () => {
    // Validasi sederhana
    if (!formData.pengembalian) return alert("Tanggal pengembalian wajib diisi");
    if (!formData.denda) formData.denda = "Rp 0";
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-xl relative">
        <h2 className="text-xl font-bold mb-4">Edit Pengembalian</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nama</label>
            <Input name="nama" value={formData.nama} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Judul</label>
            <Input name="judul" value={formData.judul} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Tanggal Kembali</label>
            <Input type="date" name="pengembalian" value={formData.pengembalian} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Denda</label>
            <Input name="denda" value={formData.denda} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl p-2 focus:border-[#BE4139] transition-all"
            >
              <option value="Dipinjam">Dipinjam</option>
              <option value="Dikembalikan">Dikembalikan</option>
              <option value="Terlambat">Terlambat</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button className="bg-[#BE4139] text-white" onClick={handleSubmit}>Simpan</Button>
        </div>
      </div>
    </div>
  );
};
