import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Download, Filter, Eye, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ViewBookModal } from "../components/modals/view-book-modal";
import { AddBookModal } from "../components/modals/add-book-modal";
import { DeleteBookModal } from "../components/modals/delete-book-modal";
import { getAllBooks } from "../lib/api";

const ITEMS_PER_PAGE = 10;

export function ManajemenBukuPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any | undefined>();
  
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllBooks();
      console.log("📚 Books response:", data);
      // Backend return {books: [], page: 1, ...}
      const booksArray = data.books || data;
      setBooks(Array.isArray(booksArray) ? booksArray : []);
    } catch (err: any) {
      setError(err.message || "Gagal memuat data buku");
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.author_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, books]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Matematika":
        return "bg-blue-100 text-blue-700";
      case "Fisika":
        return "bg-indigo-100 text-indigo-700";
      case "Kimia":
        return "bg-purple-100 text-purple-700";
      case "Biologi":
        return "bg-green-100 text-green-700";
      case "Ilmu Pengetahuan Alam (IPA)":
        return "bg-teal-100 text-teal-700";
      case "Ilmu Pengetahuan Sosial (IPS)":
        return "bg-orange-100 text-orange-700";
      case "Sejarah":
        return "bg-yellow-100 text-yellow-700";
      case "Geografi":
        return "bg-lime-100 text-lime-700";
      case "Ekonomi":
        return "bg-emerald-100 text-emerald-700";
      case "Sosiologi":
        return "bg-rose-100 text-rose-700";
      case "Bahasa Indonesia":
        return "bg-red-100 text-red-700";
      case "Bahasa Inggris":
        return "bg-sky-100 text-sky-700";
      case "Bahasa Asing Lainnya":
        return "bg-cyan-100 text-cyan-700";
      case "Pendidikan Pancasila dan Kewarganegaraan (PPKn)":
        return "bg-gray-100 text-gray-700";
      case "Informatika / TIK":
        return "bg-zinc-100 text-zinc-700";
      case "Seni Budaya":
        return "bg-pink-100 text-pink-700";
      case "Pendidikan Jasmani dan Kesehatan":
        return "bg-fuchsia-100 text-fuchsia-700";
      case "Novel dan Fiksi":
        return "bg-violet-100 text-violet-700";
      case "Cerpen dan Puisi":
        return "bg-amber-100 text-amber-700";
      case "Ensiklopedia":
        return "bg-stone-100 text-stone-700";
      case "Al-Qur’an":
        return "bg-green-200 text-green-800";
      case "Juz Amma":
        return "bg-green-300 text-green-900";
      case "Alkitab":
        return "bg-blue-200 text-blue-800";
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

  const handleDeleteBook = (book: (typeof BOOKS_DATA)[0]) => {
    setSelectedBook(book);
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
              placeholder="Cari buku..."
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
            Tambah Buku
          </Button>
          <Button variant="outline" className="gap-2 border-2 border-[#BE4139] bg-white rounded-xl hover:bg-gray-50 hover:border-[#9e3530] transition-all duration-300 font-semibold">
            <Download size={18} />
            Import
          </Button>
          <Button variant="outline" className="gap-2 border-2 border-[#BE4139] bg-white rounded-xl hover:bg-gray-50 hover:border-[#9e3530] transition-all duration-300 font-semibold">
            <Filter size={18} />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#BE4139] overflow-hidden">
        {loading && (
          <div className="p-8 text-center text-gray-600">
            Loading...
          </div>
        )}
        
        {error && (
          <div className="p-8 text-center text-red-600">
            {error}
          </div>
        )}
        
        {!loading && !error && books.length === 0 && (
          <div className="p-8 text-center text-gray-600">
            Tidak ada data buku
          </div>
        )}
        
        {!loading && !error && books.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#BE4139] border-b-2 border-[#BE4139]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">No</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Judul</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Penulis</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">ISBN</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Tahun</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Stok</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-white">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBooks.map((book, index) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{book.title || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{book.author_name || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{book.isbn || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{book.year_of_publication || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{book.stock || 0}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/manajemen-buku/detail?id=${book.id}`)}
                          className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-110"
                        >
                          <Eye size={16} className="text-[#BE4139]" />
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book)}
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
        )}

        {/* Pagination */}
        {!loading && !error && books.length > 0 && (
          <div className="bg-white px-6 py-4 border-t-2 border-[#BE4139] flex items-center justify-center gap-1">
            {renderPagination()}
          </div>
        )}
      </div>

      <ViewBookModal isOpen={viewModalOpen} book={selectedBook} onClose={() => setViewModalOpen(false)} />
      <AddBookModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <DeleteBookModal isOpen={deleteModalOpen} book={selectedBook} onClose={() => setDeleteModalOpen(false)} />
    </div>
  );
}
