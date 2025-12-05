import { useState, useMemo } from "react";
import { Search, Plus, Download, Filter, Eye, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ViewBookModal } from "../components/modals/view-book-modal";
import { AddBookModal } from "../components/modals/add-book-modal";
import { DeleteBookModal } from "../components/modals/delete-book-modal";

const BOOKS_DATA = [
  { id: 1, title: "Judul Buku", author: "Ruslan Ismail", isbn: "10/26/2022", category: "Terlambat", quantity: 1 },
  { id: 2, title: "Judul Buku", author: "Ahmad Abdullah", isbn: "08/26/2022", category: "Sudah Kembali", quantity: 2 },
  { id: 3, title: "Judul Buku", author: "Surya Firdaus", isbn: "10/26/2022", category: "Belum Kembali", quantity: 3 },
  { id: 4, title: "Judul Buku", author: "Ismail Sulaiman", isbn: "10/26/2022", category: "Belum Kembali", quantity: 4 },
  { id: 5, title: "Judul Buku", author: "Rahman Mansur", isbn: "10/26/2022", category: "Sudah Kembali", quantity: 5 },
  { id: 6, title: "Judul Buku", author: "Buana Ahmad", isbn: "10/26/2022", category: "Belum Kembali", quantity: 6 },
  { id: 7, title: "Judul Buku", author: "Putri Melati", isbn: "10/26/2022", category: "Belum Kembali", quantity: 7 },
  { id: 8, title: "Judul Buku", author: "Wira Cahya", isbn: "10/26/2022", category: "Belum Kembali", quantity: 8 },
  { id: 9, title: "Judul Buku", author: "Mohamad Zakaria", isbn: "05/09/2022", category: "Sudah Kembali", quantity: 9 },
  { id: 10, title: "Judul Buku", author: "Putra Idris", isbn: "10/26/2022", category: "Belum Kembali", quantity: 10 },
];

const ITEMS_PER_PAGE = 10;

export function ManajemenBukuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<(typeof BOOKS_DATA)[0] | undefined>();

  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter(
      (book) =>
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Terlambat":
        return "bg-[#BE4139] text-white";
      case "Sudah Kembali":
        return "bg-green-100 text-green-700";
      case "Belum Kembali":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewBook = (book: (typeof BOOKS_DATA)[0]) => {
    setSelectedBook(book);
    setViewModalOpen(true);
  };

  const handleDeleteBook = (book: (typeof BOOKS_DATA)[0]) => {
    setSelectedBook(book);
    setDeleteModalOpen(true);
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
          <Button onClick={() => setAddModalOpen(true)} className="gap-2 text-white bg-[#BE4139] hover:bg-[#A03A2F]">
            <Plus size={18} />
            Tambah Buku
          </Button>
          <Button variant="outline" className="gap-2 border-gray-300 bg-transparent">
            <Download size={18} />
            Import
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Judul</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Penulis</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ISBN</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Jumlah</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">{book.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{book.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{book.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{book.isbn}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(book.category)}`}
                    >
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{book.quantity}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewBook(book)}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book)}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                      >
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
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded ${
                  currentPage === page
                    ? "bg-gray-900 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}
          {totalPages > 5 && <span className="text-gray-600">...</span>}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <ViewBookModal isOpen={viewModalOpen} book={selectedBook} onClose={() => setViewModalOpen(false)} />
      <AddBookModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <DeleteBookModal isOpen={deleteModalOpen} book={selectedBook} onClose={() => setDeleteModalOpen(false)} />
    </div>
  );
}
