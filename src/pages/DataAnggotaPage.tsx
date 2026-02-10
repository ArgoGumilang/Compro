import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Plus, Eye, Trash2, Pencil } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ViewMemberModal } from "../components/modals/view-member-modal";
import { EditMemberModal } from "../components/modals/edit-member-modal";
import { AddMemberModal } from "../components/modals/add-member-modal";
import { DeleteMemberModal } from "../components/modals/delete-member-modal";
import { getAllUsers } from "../lib/api";

const ITEMS_PER_PAGE = 10;

interface Member {
  id: number;
  username: string;
  full_name?: string;
  email?: string;
  role_id?: number;
  role?: { id: number; name: string };
  tgl_terdaftar: Date | null;
}

export function DataAnggotaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [anggotaData, setAnggotaData] = useState<Member[]>([]);
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
      const usersArray = response.users || response;
      setAnggotaData(Array.isArray(usersArray) ? usersArray : []);
    } catch (err: any) {
      console.error("❌ Failed to fetch users:", err);
      setError(err.message || "Gagal mengambil data users.");
      // Dummy data development
      setAnggotaData([
        { id: 1, username: "admin", full_name: "Administrator", email: "admin@example.com", role_id: 1, tgl_terdaftar: new Date() },
        { id: 2, username: "user1", full_name: "User Satu", email: "user1@example.com", role_id: 2, tgl_terdaftar: new Date("2025-01-01") },
        { id: 3, username: "user2", full_name: "User Dua", email: "user2@example.com", role_id: 2, tgl_terdaftar: new Date("2025-02-01") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Sort ascending by ID
  const sortedData = useMemo(() => {
    return [...anggotaData].sort((a, b) => (a.id || 0) - (b.id || 0));
  }, [anggotaData]);

  // Filtered data
  const filteredData = useMemo(() => {
    return sortedData.filter(
      (item) =>
        item.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortedData]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Paginated
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setEditModalOpen(true);
  };

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setViewModalOpen(true);
  };

  const handleDeleteMember = (member: Member) => {
    setSelectedMember(member);
    setDeleteModalOpen(true);
  };

  // Role badge helper
  const getRoleBadge = (role?: { id: number; name: string }, role_id?: number) => {
    switch (role?.name || role_id) {
      case 1: case 'admin': return "bg-red-100 text-red-800";
      case 2: case 'guru': return "bg-green-100 text-green-800";
      case 3: case 'siswa': return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const renderPagination = () => {
    const pages = [];

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

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
            currentPage === i ? "bg-[#BE4139] text-white shadow-lg" : "text-[#BE4139] hover:bg-white"
          }`}
        >
          {i}
        </button>
      );
    }

    if (totalPages > 5) {
      pages.push(<span key="ellipsis" className="px-2 text-[#BE4139]/60 font-bold">...</span>);
    }

    if (totalPages > 3) {
      for (let i = Math.max(totalPages - 1, 4); i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
              currentPage === i ? "bg-[#BE4139] text-white shadow-lg" : "text-[#BE4139] hover:bg-white"
            }`}
          >
            {i}
          </button>
        );
      }
    }

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

  return (
    <div className="space-y-6 p-8">
      {/* Search & Add */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#BE4139] flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-[#BE4139]" size={20} />
          <Input
            placeholder="Cari anggota..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="pl-10 bg-white border-2 border-gray-300 rounded-xl focus:border-[#BE4139] transition-all duration-300"
          />
        </div>
        <Button onClick={() => setAddModalOpen(true)} className="gap-2 text-white bg-[#BE4139] hover:bg-[#9e3530] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">
          <Plus size={18} /> Tambah Pengguna
        </Button>
        <Button variant="outline" className="gap-2 border-2 border-[#BE4139] bg-white rounded-xl hover:bg-gray-50 hover:border-[#9e3530]">
          <Filter size={18}/> Filter
        </Button>
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
            <button onClick={fetchUsers} className="mt-4 px-4 py-2 bg-[#BE4139] text-white rounded-xl hover:bg-[#9e3530]">
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
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Tanggal Terdaftar</th>
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
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold shadow-sm ${getRoleBadge(item.role, item.role_id)}`}>
                        {item.role?.name || (item.role_id === 1 ? 'Admin' : item.role_id === 2 ? 'Guru' : 'Siswa')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {item.tgl_terdaftar
                        ? item.tgl_terdaftar.toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleViewMember(item)} className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-110">
                          <Eye size={16} className="text-[#BE4139]" />
                        </button>
                        <button onClick={() => handleEditMember(item)} className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-110">
                          <Pencil size={16} className="text-[#BE4139]" />
                        </button>
                        <button onClick={() => handleDeleteMember(item)} className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-110">
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

      {/* Modals */}
      <ViewMemberModal isOpen={viewModalOpen} member={selectedMember ?? undefined} onClose={() => setViewModalOpen(false)} />
      <AddMemberModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onSuccess={fetchUsers} />
      <EditMemberModal
        isOpen={editModalOpen}
        member={selectedMember ?? undefined}
        onClose={() => setEditModalOpen(false)}
        onSave={(formData) => {
          const updatedMember = {
            ...formData,
            role:
              formData.role_id === 1 ? { id: 1, name: 'admin' } :
              formData.role_id === 2 ? { id: 2, name: 'guru' } :
              formData.role_id === 3 ? { id: 3, name: 'siswa' } :
              undefined
          };
          setAnggotaData(prev =>
            prev.map(m => m.id === updatedMember.id ? updatedMember : m)
          );
        }}
      />
      <DeleteMemberModal isOpen={deleteModalOpen} member={selectedMember ?? undefined} onClose={() => setDeleteModalOpen(false)} onSuccess={fetchUsers} />
    </div>
  );
}
