import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface DetailPeminjamanModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    nama: string;
    judul: string;
    tanggalPinjam: string;
    tanggalKembali: string;
    tanggalPengembalian: string;
  };
}

const DetailPeminjamanModal: React.FC<DetailPeminjamanModalProps> = ({ isOpen, onClose, data }) => {
  const [selectedDate, setSelectedDate] = useState<string>(data.tanggalPengembalian);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<number>(8); // September (0-indexed)
  const [currentYear, setCurrentYear] = useState<number>(2025);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${String(currentMonth + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}/${currentYear}`;
      const isSelected = dateString === selectedDate;
      const isToday = day === 9 || day === 12; // Highlighting specific days as in screenshot

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(dateString)}
          className={`p-2 text-sm rounded-lg transition-colors ${
            isSelected
              ? 'bg-gray-800 text-white font-semibold'
              : isToday
              ? 'bg-gray-700 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Peminjaman">
      <div className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
          <input
            type="text"
            value={data.nama}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Judul */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
          <input
            type="text"
            value={data.judul}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Tanggal Pinjam */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Pinjam</label>
          <input
            type="text"
            value={data.tanggalPinjam}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Tanggal Kembali */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kembali</label>
          <input
            type="text"
            value={data.tanggalKembali}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>

        {/* Tanggal Pengembalian with Calendar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Pengembalian</label>
          <input
            type="text"
            value={selectedDate}
            readOnly
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 cursor-pointer"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="bg-[#BE4139] hover:bg-[#A03A2F] text-white"
          >
            Simpan
          </Button>
        </div>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/30" 
            onClick={() => setShowCalendar(false)}
          />
          
          {/* Calendar Modal */}
          <div className="relative bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-96 z-[70]">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                <select
                  value={months[currentMonth]}
                  onChange={(e) => setCurrentMonth(months.indexOf(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  {[2023, 2024, 2025, 2026, 2027].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                →
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="p-2 text-xs font-medium text-gray-500 text-center">
                  {day}
                </div>
              ))}
              {/* Calendar days */}
              {renderCalendar()}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailPeminjamanModal;
