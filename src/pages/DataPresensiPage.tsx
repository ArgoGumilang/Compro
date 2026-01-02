import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { AddAbsenceModal } from "../components/modals/add-presensi-modal";
import { getAllVisitHists, getAllUsers } from "../lib/api";

const ITEMS_PER_PAGE = 10;

export function DataPresensiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [presensiData, setPresensiData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPresensiData();
  }, []);

  const loadPresensiData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [visitsData, usersData] = await Promise.all([
        getAllVisitHists().catch(() => ({ visit_hists: [] })),
        getAllUsers().catch(() => ({ users: [] })),
      ]);
      
      console.log("📚 Visit hists response:", visitsData);
      console.log("👥 Users data:", usersData);
      
      const visitsArray = visitsData.visit_hists || visitsData || [];
      const usersArray = usersData.users || usersData || [];
      
      // Join data: add user info to each visit
      const enrichedVisits = (Array.isArray(visitsArray) ? visitsArray : []).map((visit: any) => {
        const user = usersArray.find((u: any) => u.id === visit.user_id);
        
        return {
          id: visit.id,
          nama: user?.full_name || user?.username || `User ID ${visit.user_id}`,
          nisNip: user?.nis_nip || user?.username || '-',
          email: user?.email || '-',
          kelas: user?.kelas || '-',
          role: user?.role?.name || 'Siswa',
          tanggal: visit.visit_date || visit.created_at || '-',
          user_id: visit.user_id,
        };
      });
      
      console.log("✨ Enriched visits:", enrichedVisits);
      setPresensiData(enrichedVisits);
    } catch (err: any) {
      console.error("❌ Failed to fetch presensi:", err);
      setError(err.message || "Gagal memuat data presensi");
      // Dummy fallback
      setPresensiData([
        { id: 1, nama: "Nama Lengkap", nisNip: "11040", email: "email@gmail.com", kelas: "kelas", role: "Siswa", tanggal: "10/26/2022" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return presensiData.filter(
      (item) =>
        item.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nisNip?.includes(searchQuery)
    );
  }, [searchQuery, presensiData]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        <span key="ellipsis" className="px-2 text-[#BE4139]/60 font-bold">...</span>
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

  return (
    <div className="space-y-6 p-8">
      {/* Search and Action Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#BE4139]">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-[#BE4139]" size={20} />
            <Input
              placeholder="Cari presensi..."
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
            <button 
              onClick={loadPresensiData}
              className="mt-4 px-4 py-2 bg-[#BE4139] text-white rounded-xl hover:bg-[#9e3530]"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#BE4139] border-b-2 border-[#BE4139]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-black text-white">No</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Nama</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">NIS/NIP</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Email</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Kelas</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Role</th>
                <th className="px-6 py-4 text-left text-sm font-black text-white">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.nisNip}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.kelas}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-bold shadow-sm ${getRoleBadgeColor(item.role)}`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {presensiData.length > 0 && (
          <div className="bg-white px-6 py-4 border-t-2 border-[#BE4139] flex items-center justify-center gap-1">
            {renderPagination()}
          </div>
        )}
        </>
        )}
      </div>
      <AddAbsenceModal 
        isOpen={addModalOpen} 
        onClose={() => setAddModalOpen(false)}
        onSuccess={() => {
          loadPresensiData();
          setAddModalOpen(false);
        }}
      />
    </div>
  );
}
