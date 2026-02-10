import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updateBook, uploadBookCover, getAllAuthors, getAllPublishers, getAllCategories, getAllSubCategories } from "../../lib/api";

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
  const [error, setError] = useState("");
  const [authors, setAuthors] = useState<any[]>([]);
  const [publishers, setPublishers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || "",
        author_id: book.author?.id || book.author_id || "",
        publisher_id: book.publisher?.id || book.publisher_id || "",
        isbn: book.isbn || "",
        category_id: book.sub_category?.category?.id || book.category_id || "",
        sub_category_id: book.sub_category?.id || book.sub_category_id || "",
        num_book_available: book.num_book_available || 0,
        num_page: book.num_page || 0,
        year_published: book.year_published || "",
        city_origin: book.city_origin || "",
        ddc: book.ddc || "",
        eksemplar_code: book.eksemplar_code || "",
        location_id: book.location_id || "",
        desc_fisik_buku: book.desc_fisik_buku || "",
        desc_singkat_buku: book.desc_singkat_buku || "",
      });
    }
  }, [book]);

  useEffect(() => {
    if (isOpen) {
      loadDropdownData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (form.category_id) {
      const filtered = subCategories.filter(
        (sub) => sub.category_id === parseInt(form.category_id) || sub.category?.id === parseInt(form.category_id)
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories(subCategories);
    }
  }, [form.category_id, subCategories]);

  const loadDropdownData = async () => {
    try {
      setLoadingData(true);
      const [authorsData, publishersData, categoriesData, subCategoriesData] = await Promise.all([
        getAllAuthors(),
        getAllPublishers(),
        getAllCategories(),
        getAllSubCategories(),
      ]);
      
      setAuthors(Array.isArray(authorsData) ? authorsData : authorsData.authors || []);
      setPublishers(Array.isArray(publishersData) ? publishersData : publishersData.publishers || []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData.categories || []);
      setSubCategories(Array.isArray(subCategoriesData) ? subCategoriesData : subCategoriesData.sub_categories || []);
    } catch (err) {
      console.error("❌ Failed to load dropdown data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("File harus berupa gambar");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file maksimal 5MB");
        return;
      }
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const authorId = parseInt(form.author_id);
      const publisherId = form.publisher_id ? parseInt(form.publisher_id) : undefined;
      const subCategoryId = parseInt(form.sub_category_id);
      const categoryId = form.category_id ? parseInt(form.category_id) : undefined;
      const locationId = form.location_id ? parseInt(form.location_id) : undefined;

      const bookData: any = {
        title: form.title,
        author: {
          id: authorId
        },
        isbn: form.isbn || "",
        sub_category: {
          id: subCategoryId,
          category: {
            id: categoryId
          }
        },
        num_book_available: parseInt(form.num_book_available) || 1,
        num_page: parseInt(form.num_page) || 0,
        year_published: form.year_published || new Date().getFullYear().toString(),
        city_origin: form.city_origin || "",
        ddc: form.ddc || "",
        eksemplar_code: form.eksemplar_code || "",
        desc_fisik_buku: form.desc_fisik_buku || "",
        desc_singkat_buku: form.desc_singkat_buku || "",
      };

      if (publisherId && !isNaN(publisherId)) {
        bookData.publisher = { id: publisherId };
      }
      if (locationId && !isNaN(locationId)) {
        bookData.location_id = locationId;
      }

      await updateBook(book.id, bookData);

      // Upload cover if new file selected
      if (coverFile) {
        try {
          await uploadBookCover(book.id, coverFile);
        } catch (coverErr) {
          console.error("⚠️ Failed to upload cover:", coverErr);
        }
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Update book failed", err);
      setError("Gagal mengupdate buku");
    } finally {
      setLoading(false);
    }
  };

  if (!book) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Buku">
      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
            <Input
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              placeholder="Judul"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
            <Input
              name="isbn"
              value={form.isbn || ""}
              onChange={handleChange}
              placeholder="ISBN"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
            <select
              name="author_id"
              value={form.author_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
              disabled={loadingData}
            >
              <option value="">Pilih Penulis</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Penerbit</label>
            <select
              name="publisher_id"
              value={form.publisher_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
              disabled={loadingData}
            >
              <option value="">Pilih Penerbit</option>
              {publishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
              disabled={loadingData}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sub Kategori</label>
            <select
              name="sub_category_id"
              value={form.sub_category_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
              disabled={loadingData}
            >
              <option value="">Pilih Sub Kategori</option>
              {filteredSubCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
            <Input
              type="number"
              name="num_book_available"
              value={form.num_book_available ?? 0}
              onChange={handleChange}
              placeholder="Stok"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Halaman</label>
            <Input
              type="number"
              name="num_page"
              value={form.num_page || ""}
              onChange={handleChange}
              placeholder="Jumlah halaman"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Terbit</label>
            <Input
              name="year_published"
              value={form.year_published || ""}
              onChange={handleChange}
              placeholder="Tahun terbit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asal Kota</label>
            <Input
              name="city_origin"
              value={form.city_origin || ""}
              onChange={handleChange}
              placeholder="Kota asal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DDC</label>
            <Input
              name="ddc"
              value={form.ddc || ""}
              onChange={handleChange}
              placeholder="DDC"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Eksemplar</label>
            <Input
              name="eksemplar_code"
              value={form.eksemplar_code || ""}
              onChange={handleChange}
              placeholder="Kode eksemplar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
            <select
              name="location_id"
              value={form.location_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
            >
              <option value="">Pilih Lokasi</option>
              <option value="1">Lokasi 1</option>
              <option value="2">Lokasi 2</option>
              <option value="3">Lokasi 3</option>
              <option value="4">Lokasi 4</option>
              <option value="5">Lokasi 5</option>
              <option value="6">Lokasi 6</option>
              <option value="7">Lokasi 7</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Fisik</label>
          <Input
            name="desc_fisik_buku"
            value={form.desc_fisik_buku || ""}
            onChange={handleChange}
            placeholder="Deskripsi fisik buku"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
          <textarea
            name="desc_singkat_buku"
            value={form.desc_singkat_buku || ""}
            onChange={handleChange}
            placeholder="Deskripsi singkat"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Update Cover (Opsional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#BE4139] file:text-white hover:file:bg-[#9e3530]"
          />
          {coverPreview && (
            <div className="mt-3">
              <img src={coverPreview} alt="Preview" className="w-32 h-44 object-cover rounded-lg" />
            </div>
          )}
        </div>

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
