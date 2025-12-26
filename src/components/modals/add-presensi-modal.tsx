import React, { useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AddAbsenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    tanggalPengembalian?: string;
  };
  
}

const AddAbsenceModal: React.FC<AddAbsenceModalProps> = ({ isOpen, onClose, data }) => {
  // --- Form Data ---
  const [formData, setFormData] = useState({
    nama: "",
    nisNip: "",
    email: "",
    kelas: "",
    role: "",
    tanggal: data?.tanggalPengembalian || "",
  });

  // --- Calendar State ---
  const [showCalendar, setShowCalendar] = useState(false);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // --- Helpers ---
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAbsence = { id: Date.now(), ...formData };
    console.log("Presensi ditambahkan:", newAbsence);
    onClose();
    setFormData({
      nama: "",
      nisNip: "",
      email: "",
      kelas: "",
      role: "",
      tanggal: data?.tanggalPengembalian || "",
    });
  };

  // --- Calendar Navigation ---
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  const handleDateSelect = (day: number) => {
    const dateString = `${String(currentMonth + 1).padStart(2,'0')}/${String(day).padStart(2,'0')}/${currentYear}`;
    setFormData(prev => ({ ...prev, tanggal: dateString }));
    setShowCalendar(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="p-2"></div>);

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${String(currentMonth + 1).padStart(2,'0')}/${String(day).padStart(2,'0')}/${currentYear}`;
      const isSelected = dateString === formData.tanggal;
      const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`p-2 text-sm rounded-lg transition-colors ${
            isSelected ? 'bg-gray-800 text-white font-semibold' :
            isToday ? 'bg-gray-700 text-white' :
            'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Anggota">
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <Input name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama lengkap" required />
        </div>

        {/* NIS/NIP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NIS / NIP</label>
          <Input name="nisNip" value={formData.nisNip} onChange={handleChange} placeholder="Masukkan NIS / NIP" required />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Masukkan email" required />
        </div>

        {/* Kelas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
          <Input name="kelas" value={formData.kelas} onChange={handleChange} placeholder="Contoh: X IPA 1 / -" required />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
            required
          >
            <option value="">Pilih Role</option>
            <option value="Siswa">Siswa</option>
            <option value="Guru">Guru</option>
          </select>
        </div>

        {/* Tanggal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
          <Input
            value={formData.tanggal}
            readOnly
            onClick={() => setShowCalendar(!showCalendar)}
            className="cursor-pointer"
          />
        </div>

        {/* Action */}
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">Batal</Button>
          <Button type="submit" className="flex-1">Simpan</Button>
        </div>

        {/* Calendar Popup */}
        {showCalendar && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={() => setShowCalendar(false)} />
            <div className="relative bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-96 z-[70]">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">←</button>
                <div className="flex items-center gap-2">
                  <select value={months[currentMonth]} onChange={e => setCurrentMonth(months.indexOf(e.target.value))} className="px-2 py-1 border border-gray-300 rounded text-sm">
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={currentYear} onChange={e => setCurrentYear(parseInt(e.target.value))} className="px-2 py-1 border border-gray-300 rounded text-sm">
                    {[2023,2024,2025,2026,2027].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">→</button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-7 gap-1">
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                  <div key={d} className="p-2 text-xs font-medium text-gray-500 text-center">{d}</div>
                ))}
                {renderCalendar()}
              </div>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

export { AddAbsenceModal };
