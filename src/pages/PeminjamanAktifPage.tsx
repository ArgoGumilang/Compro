import React, { useState } from 'react';
import { Search, Filter, Eye, Trash2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import DetailPeminjamanModal from '../components/modals/DetailPeminjamanModal';

interface PeminjamanData {
  id: number;
  nama: string;
  judul: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  status: 'Dipinjam' | 'Dikembalikan' | 'Terlambat';
}

const PeminjamanAktifPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedPeminjaman, setSelectedPeminjaman] = useState<PeminjamanData | null>(null);
  const itemsPerPage = 10;

  // Sample data
  const peminjamanData: PeminjamanData[] = [
    { id: 1, nama: 'Nama Lengkap', judul: 'Judul Buku', tanggalPinjam: '10/26/2022', tanggalKembali: '10/26/2022', status: 'Dipinjam' },
    { id: 2, nama: 'Nama Lengkap', judul: 'Judul Buku', tanggalPinjam: '08/26/2022', tanggalKembali: '08/26/2022', status: 'Dipinjam' },
    { id: 3, nama: 'Nama Lengkap', judul: 'Judul Buku', tanggalPinjam: '10/26/2022', tanggalKembali: '10/26/2022', status: 'Dikembalikan' },
    { id: 4, nama: 'Nama Lengkap', judul: 'Judul Buku', tanggalPinjam: '10/26/2022', tanggalKembali: '10/26/2022', status: 'Dipinjam' },
    { id: 5, nama: 'Nama Lengkap', judul: 'Judul Buku', tanggalPinjam: '10/26/2022', tanggalKembali: '10/26/2022', status: 'Dikembalikan' },
    { id: 6, nama: 'Nama Lengkap', judul: 'Judul Buku', tanggalPinjam: '10/26/2022', tanggalKembali: '10/26/2022', status: 'Dipinjam' },
    { id: 7, nama: 'Nama Lengkap', judul: 'Judul Buku', tanggalPinjam: '10/26/2022', tanggalKembali: '10/26/2022', status: 'Dipinjam' },
    { id: 8, nama: 'Nama Lengkap', judul: 'Judul Buku', tanggalPinjam: '10/26/2022', tanggalKembali: '10/26/2022', status: 'Terlambat' },
    { id: 9, nama: 'Nama Lengkap', judul: 'Judul Buku', tanggalPinjam: '05/09/2022', tanggalKembali: '05/09/2022', status: 'Dipinjam' },
    { id: 10, nama: 'Nama Lengkap', judul: 'Judul Buku', tanggalPinjam: '10/26/2022', tanggalKembali: '10/26/2022', status: 'Dipinjam' },
  ];

  // Filter data based on search
  const filteredData = peminjamanData.filter(item =>
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

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#BE4139]">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-[#BE4139]" size={20} />
            <Input
              placeholder="✨ Cari peminjaman..."
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
                <th className="px-6 py-4 text-left text-sm font-black text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-purple-50 transition-all duration-200">
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.judul}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.tanggalPinjam}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.tanggalKembali}</td>
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
                        onClick={() => {
                          setSelectedPeminjaman(item);
                          setIsDetailModalOpen(true);
                        }}
                        className="p-2 hover:bg-purple-200 rounded-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Eye size={18} className="text-[#BE4139]" />
                      </button>
                      <button className="p-2 hover:bg-red-200 rounded-xl transition-all duration-300 transform hover:scale-110">
                        <Trash2 size={18} className="text-red-500" />
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

      {/* Detail Modal */}
      {selectedPeminjaman && (
        <DetailPeminjamanModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          data={{
            nama: selectedPeminjaman.nama,
            judul: selectedPeminjaman.judul,
            tanggalPinjam: selectedPeminjaman.tanggalPinjam,
            tanggalKembali: selectedPeminjaman.tanggalKembali,
            tanggalPengembalian: selectedPeminjaman.tanggalKembali,
          }}
        />
      )}
    </div>
  );
};

export default PeminjamanAktifPage;
