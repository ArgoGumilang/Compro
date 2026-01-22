import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updateBook } from "../../lib/api";

interface EditBookModalProps {
  isOpen: boolean;
  book?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditBookModal({
  isOpen,
  book,
  onClose,
  onSuccess,
}: EditBookModalProps) {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) setForm(book);
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateBook(book.id, {
        title: form.title,
        isbn: form.isbn,
        category: form.category,
        num_book_available: Number(form.num_book_available),
      });
      onSuccess(); // 🔄 refresh list
      onClose();
    } catch (err) {
      console.error("Update book failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!book) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Buku">
      <div className="space-y-4">
        <Input
          name="title"
          value={form.title || ""}
          onChange={handleChange}
          placeholder="Judul"
        />

        <Input
          name="isbn"
          value={form.isbn || ""}
          onChange={handleChange}
          placeholder="ISBN"
        />

        <Input
          name="category"
          value={form.category || ""}
          onChange={handleChange}
          placeholder="Kategori"
        />

        <Input
          type="number"
          name="num_book_available"
          value={form.num_book_available ?? 0}
          onChange={handleChange}
          placeholder="Stok"
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#BE4139] text-white"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
