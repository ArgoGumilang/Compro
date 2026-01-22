import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updateBookingHistory, getAllUsers, getAllBooks } from "../../lib/api";

interface EditPeminjamanModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  onSuccess: () => void;
}

const EditPeminjamanModal: React.FC<EditPeminjamanModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSuccess,
}) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [bookId, setBookId] = useState<number | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("Dipinjam"); // default string
  const [users, setUsers] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch users & books for dropdown
  useEffect(() => {
    const fetchUsersAndBooks = async () => {
      try {
        const usersRes = await getAllUsers();
        const booksRes = await getAllBooks();
        setUsers(usersRes.users || usersRes || []);
        setBooks(booksRes.books || booksRes || []);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat users atau books");
      }
    };
    fetchUsersAndBooks();
  }, []);

  // Set initial values from booking
  useEffect(() => {
    if (booking) {
      setUserId(Number(booking.user_id));
      setBookId(Number(booking.book_id));
      setBookingDate(
        booking.booking_date
          ? new Date(booking.booking_date).toISOString().split("T")[0]
          : ""
      );
      setReturnDate(
        booking.return_date
          ? new Date(booking.return_date).toISOString().split("T")[0]
          : ""
      );
      // Convert boolean dari backend ke string untuk dropdown
      if (typeof booking.status === "boolean") {
        setStatus(booking.status ? "Dipinjam" : "Dikembalikan");
        }
    }
  }, [booking]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !bookId) {
      setError("User dan Buku harus dipilih");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const statusBool = status === "Dipinjam"; // true = Dipinjam, false = Dikembalikan

      await updateBookingHistory(booking.id, {
        user_id: userId,
        book_id: bookId,
        booking_date: bookingDate,
        return_date: returnDate,
        status: statusBool,
        });
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Edit Peminjaman</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User */}
          <div>
            <label className="block text-sm font-medium mb-1">User</label>
            <select
              className="w-full border rounded-xl p-2 focus:border-[#BE4139] transition-all duration-300"
              value={userId ?? ""}
              onChange={(e) => setUserId(Number(e.target.value))}
              required
            >
              <option value="">Pilih User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.full_name || u.username}
                </option>
              ))}
            </select>
          </div>

          {/* Book */}
          <div>
            <label className="block text-sm font-medium mb-1">Buku</label>
            <select
              className="w-full border rounded-xl p-2 focus:border-[#BE4139] transition-all duration-300"
              value={bookId ?? ""}
              onChange={(e) => setBookId(Number(e.target.value))}
              required
            >
              <option value="">Pilih Buku</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </select>
          </div>

          {/* Booking Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Pinjam</label>
            <Input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Kembali</label>
            <Input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border rounded-xl p-2 focus:border-[#BE4139] transition-all duration-300"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Dipinjam">Dipinjam</option>
              <option value="Dikembalikan">Dikembalikan</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-[#BE4139] text-white rounded-xl hover:bg-[#9e3530]"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPeminjamanModal;
