import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Filter, Eye, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ViewMemberModal } from "../components/modals/view-member-modal";
import { AddMemberModal } from "../components/modals/add-member-modal";
import { DeleteMemberModal } from "../components/modals/delete-member-modal";
import { getAllUsers } from "../lib/api";

const ITEMS_PER_PAGE = 10;

export function DataAnggotaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(undefined);
  
  // State untuk data dari backend
  const [anggotaData, setAnggotaData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data users dari backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllUsers();
      console.log("👥 Users data:", response);
      // Backend return {users: [], page: 1, ...}
      const usersArray = response.users || response;
      setAnggotaData(Array.isArray(usersArray) ? usersArray : []);
    } catch (err: any) {
      console.error("❌ Failed to fetch users:", err);
      
      // Jika 403, berarti butuh login
      if (err.message.includes("403") || err.message.includes("Forbidden")) {
        setError("Anda belum login. Silakan login terlebih dahulu untuk melihat data.");
      } else {
        setError(err.message || "Gagal mengambil data users.");
      }
      
      // Gunakan data dummy untuk development
      console.log("🔄 Using dummy data for development");
      setAnggotaData([
        { id: 1, username: "admin", full_name: "Administrator", email: "admin@example.com", role_id: 1 },
        { id: 2, username: "user1", full_name: "User Satu", email: "user1@example.com", role_id: 2 },
        { id: 3, username: "user2", full_name: "User Dua", email: "user2@example.com", role_id: 2 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return anggotaData.filter(
      (item) =>
        item.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, anggotaData]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

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
        className="flex items-center gap-1 px-4 py-2 text-[#BE4139] hover:text-[#9e3530] disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded-xl hover:bg-white transition-all duration-300"
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
          className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
            currentPage === i
              ? "bg-[#BE4139] text-white shadow-lg"
              : "text-[#BE4139] hover:bg-white"
          }`}
        >
          {i}
        </button>
      );
    }

    // Ellipsis
    if (totalPages > 5) {
      pages.push(
        <span key="ellipsis" className="px-2 text-[#BE4139]/60 font-bold">✨</span>
      );
    }

    // Last pages
    if (totalPages > 3) {
      for (let i = Math.max(totalPages - 1, 4); i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
              currentPage === i
                ? "bg-[#BE4139] text-white shadow-lg"
                : "text-[#BE4139] hover:bg-white"
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
        className="flex items-center gap-1 px-4 py-2 text-[#BE4139] hover:text-[#9e3530] disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded-xl hover:bg-white transition-all duration-300"
      >
        Next →
      </button>
    );

    return pages;
  };

  const handleViewMember = (member: (typeof anggotaData)[0]) => {
    setSelectedMember(member);
    setViewModalOpen(true);
  };

  const handleDeleteMember = (member: (typeof anggotaData)[0]) => {
    setSelectedMember(member);
    setDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6 p-8">
      {/* Search and Action Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#BE4139]">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-[#BE4139]" size={20} />
            <Input
              placeholder="Cari anggota..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-white border-2 border-gray-300 rounded-xl focus:border-[#BE4139] transition-all duration-300"
            />
          </div>
          <Button onClick={() => setAddModalOpen(true)} className="gap-2 text-white bg-[#BE4139] hover:bg-[#9e3530] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">
            <Plus size={18} />
            Tambah Pengguna
          </Button>
          <Button variant="outline" className="gap-2 border-2 border-[#BE4139] bg-white rounded-xl hover:bg-gray-50 hover:border-[#9e3530] transition-all duration-300 font-semibold">
            <Filter size={18} />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#BE4139] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BE4139] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            <p className="text-gray-500 text-sm mb-4">Cek console (F12) untuk detail error</p>
            <button 
              onClick={fetchUsers}
              className="mt-4 px-4 py-2 bg-[#BE4139] text-white rounded-xl hover:bg-[#9e3530]"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#BE4139] border-b-2 border-[#BE4139]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.full_name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.email || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold shadow-sm ${
                        item.role?.name === 'admin' ? 'bg-red-100 text-red-800' :
                        item.role?.name === 'guru' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.role?.name || item.role_id || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewMember(item)}
                          className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-110"
                        >
                          <Eye size={16} className="text-[#BE4139]" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(item)}
                          className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-110"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t-2 border-[#BE4139] flex items-center justify-center gap-1">
          {renderPagination()}
        </div>
      </div>
      <ViewMemberModal isOpen={viewModalOpen} member={selectedMember ?? undefined} onClose={() => setViewModalOpen(false)}/>
      <AddMemberModal 
        isOpen={addModalOpen} 
        onClose={() => setAddModalOpen(false)} 
        onSuccess={fetchUsers}
      />
      <DeleteMemberModal isOpen={deleteModalOpen} member={selectedMember} onClose={() => setDeleteModalOpen(false)} />
    </div>
  );
}
