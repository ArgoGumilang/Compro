import { useState, useMemo } from "react";
import { Search, Plus, Filter, Eye, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const ANGGOTA_DATA = [
  { id: 1, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "kelas", role: "Siswa" },
  { id: 2, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "kelas", role: "Siswa" },
  { id: 3, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "kelas", role: "Siswa" },
  { id: 4, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "kelas", role: "Siswa" },
  { id: 5, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "kelas", role: "Siswa" },
  { id: 6, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "kelas", role: "Siswa" },
  { id: 7, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "kelas", role: "Siswa" },
  { id: 8, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "kelas", role: "Siswa" },
  { id: 9, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "-", role: "Guru" },
  { id: 10, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "kelas", role: "Siswa" },
];

const ITEMS_PER_PAGE = 10;

export function DataAnggotaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return ANGGOTA_DATA.filter(
      (item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nisNip.includes(searchQuery)
    );
  }, [searchQuery]);

  const totalPages = 68; // Sesuai gambar
  const paginatedData = filteredData.slice(0, ITEMS_PER_PAGE);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Siswa":
        return "bg-yellow-100 text-yellow-700";
      case "Guru":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderPagination = () => {
    const pages = [];
    
    // Previous button
    pages.push(
      <button
        key="prev"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Previous
      </button>
    );

    // First pages
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-2 rounded ${
            currentPage === i
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    // Ellipsis
    if (totalPages > 5) {
      pages.push(
        <span key="ellipsis" className="px-2 text-gray-400">...</span>
      );
    }

    // Last pages
    if (totalPages > 3) {
      for (let i = Math.max(totalPages - 1, 4); i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-2 rounded ${
              currentPage === i
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {i}
          </button>
        );
      }
    }

    // Next button
    pages.push(
      <button
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    );

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              placeholder="Cari"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-gray-50 border-gray-300"
            />
          </div>
          <Button className="gap-2 text-white bg-[#BE4139] hover:bg-[#A03A2F]">
            <Plus size={18} />
            Tambah Pengguna
          </Button>
          <Button variant="outline" className="gap-2 border-gray-300 bg-transparent">
            <Filter size={18} />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nama</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">NIS/NIP</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kelas</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.nisNip}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.kelas}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(item.role)}`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                        <Trash2 size={16} className="text-[#BE4139]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-center gap-1">
          {renderPagination()}
        </div>
      </div>
    </div>
  );
}
