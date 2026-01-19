import React, { useState } from 'react';
import { Search, Filter, Eye, Trash2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ViewReturnModal } from "../components/modals/view-kembali-modal";
import { DeleteReturnModal } from "../components/modals/delete-kembali-modal";

interface PengembalianData {
  id: number;
  nama: string;
  judul: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  pengembalian: string;
  denda: string;
  status: 'Dipinjam' | 'Dikembalikan' | 'Terlambat';
}

const PengembalianPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteReturnOpen, setDeleteReturnOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<PengembalianData | undefined>(undefined);

  // Sample data - Data pengembalian buku
  const pengembalianData: PengembalianData[] = [
    {
      id: 1,
      nama: 'Siti Rahmawati',
      judul: 'Kimia Organik Dasar',
      tanggalPinjam: '2025-12-28',
      tanggalKembali: '2026-01-04',
      pengembalian: '2026-01-03',
      denda: 'Rp 0',
      status: 'Dikembalikan'
    },
    {
      id: 2,
      nama: 'Dewi Lestari',
      judul: 'Bahasa Inggris Advanced',
      tanggalPinjam: '2025-12-25',
      tanggalKembali: '2026-01-01',
      pengembalian: '2025-12-31',
      denda: 'Rp 0',
      status: 'Dikembalikan'
    },
    {
      id: 3,
      nama: 'Siti Rahmawati',
      judul: 'Ekonomi Makro & Mikro',
      tanggalPinjam: '2025-12-22',
      tanggalKembali: '2025-12-29',
      pengembalian: '2025-12-28',
      denda: 'Rp 0',
      status: 'Dikembalikan'
    },
    {
      id: 4,
      nama: 'Andi Prasetya',
      judul: 'Laskar Pelangi',
      tanggalPinjam: '2025-12-20',
      tanggalKembali: '2025-12-27',
      pengembalian: '2025-12-26',
      denda: 'Rp 0',
      status: 'Dikembalikan'
    },
    {
      id: 5,
      nama: 'Dewi Lestari',
      judul: 'Biologi Molekuler',
      tanggalPinjam: '2025-12-24',
      tanggalKembali: '2025-12-31',
      pengembalian: '2025-12-30',
      denda: 'Rp 0',
      status: 'Dikembalikan'
    },
    {
      id: 6,
      nama: 'Maya Anggraini',
      judul: 'Pendidikan Kewarganegaraan',
      tanggalPinjam: '2025-12-23',
      tanggalKembali: '2025-12-30',
      pengembalian: '2025-12-29',
      denda: 'Rp 0',
      status: 'Dikembalikan'
    },
    {
      id: 7,
      nama: 'Budi Santoso',
      judul: 'Fisika Dasar',
      tanggalPinjam: '2025-12-18',
      tanggalKembali: '2025-12-25',
      pengembalian: '2025-12-27',
      denda: 'Rp 4000',
      status: 'Terlambat'
    },
    {
      id: 8,
      nama: 'Rizki Aditya',
      judul: 'Pemrograman Python',
      tanggalPinjam: '2025-12-15',
      tanggalKembali: '2025-12-22',
      pengembalian: '2025-12-21',
      denda: 'Rp 0',
      status: 'Dikembalikan'
    }
  ];

  // Filter data based on search
  const filteredData = pengembalianData.filter(item =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case 'Dipinjam':
        return 'bg-orange-100 text-orange-600';
      case 'Dikembalikan':
        return 'bg-green-100 text-green-600';
      case 'Terlambat':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const renderPagination = (): React.ReactElement => {
    const pages: React.ReactElement[] = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 text-sm rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
            currentPage === i
              ? 'bg-[#BE4139] text-white shadow-lg'
              : 'text-[#BE4139] hover:bg-white'
          }`}
        >
          {i}
        </button>
      );
    }

    return <>{pages}</>;
  };

  const handleViewReturn = (data: PengembalianData) => {
    setSelectedReturn(data);
    setViewModalOpen(true);
  };

  const handleDeleteReturn = (data: PengembalianData) => {
    setSelectedReturn(data);
    setDeleteReturnOpen(true);
  };

  return (
    <div className="space-y-6 p-8">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#BE4139]">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-[#BE4139]" size={20} />
            <Input
              placeholder="Cari pengembalian..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-white border-2 border-gray-300 rounded-xl focus:border-[#BE4139] transition-all duration-300"
            />
          </div>
          <Button variant="outline" className="gap-2 border-2 border-[#BE4139] bg-white rounded-xl hover:bg-gray-50 hover:border-[#9e3530] transition-all duration-300 font-semibold">
            <Filter size={18} />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#BE4139] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#BE4139] border-b-2 border-[#BE4139]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-black text-white">No</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Nama</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Judul</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Tanggal Pinjam</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Tanggal Kembali</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Pengembalian</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Denda</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BE4139]/10">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-red-50 transition-all duration-200">
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.judul}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.tanggalPinjam}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.tanggalKembali}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.pengembalian}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{item.denda}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-bold shadow-sm ${getStatusBadgeColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewReturn(item)}
                        className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Eye size={16} className="text-[#BE4139]" />
                      </button>
                      <button
                        onClick={() => handleDeleteReturn(item)}
                        className="p-2 hover:bg-red-200 rounded-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t-2 border-[#BE4139] flex items-center justify-center gap-1">
          {renderPagination()}
        </div>
        
      </div>
      <ViewReturnModal isOpen={viewModalOpen} data={selectedReturn ?? undefined} onClose={() => setViewModalOpen(false)}/>
      <DeleteReturnModal isOpen={deleteReturnOpen} data={selectedReturn} onClose={() => setDeleteReturnOpen(false)}/>
    </div>
  );
};

export default PengembalianPage;
