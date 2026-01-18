import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { createBook, uploadBookCover, getAllAuthors, getAllPublishers, getAllCategories, getAllSubCategories } from '../../lib/api';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authors, setAuthors] = useState<any[]>([]);
  const [publishers, setPublishers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    author_id: '',
    publisher_id: '',
    isbn: '',
    category_id: '',
    sub_category_id: '',
    num_book_available: '',
    num_page: '',
    year_published: '',
    city_origin: '',
    ddc: '',
    eksemplar_code: '',
    location_id: '',
    desc_fisik_buku: '',
    desc_singkat_buku: '',
  });

  useEffect(() => {
    if (isOpen) {
      loadDropdownData();
    }
  }, [isOpen]);

  useEffect(() => {
    // Filter sub_categories based on selected category
    if (formData.category_id) {
      console.log('🔍 Filtering sub_categories for category_id:', formData.category_id);
      console.log('📋 All sub_categories:', subCategories);
      const filtered = subCategories.filter(
        (sub) => {
          console.log(`Checking sub: ${sub.name}, sub.category_id: ${sub.category_id}, sub.category?.id: ${sub.category?.id}`);
          return sub.category_id === parseInt(formData.category_id) || sub.category?.id === parseInt(formData.category_id);
        }
      );
      console.log('✅ Filtered sub_categories:', filtered);
      setFilteredSubCategories(filtered);
    } else {
      console.log('📋 No category selected, showing all sub_categories');
      setFilteredSubCategories(subCategories);
    }
  }, [formData.category_id, subCategories]);

  const loadDropdownData = async () => {
    try {
      setLoadingData(true);
      const [authorsData, publishersData, categoriesData, subCategoriesData] = await Promise.all([
        getAllAuthors(),
        getAllPublishers(),
        getAllCategories(),
        getAllSubCategories(),
      ]);
      console.log('📚 Authors:', authorsData);
      console.log('📚 Publishers:', publishersData);
      console.log('📚 Categories:', categoriesData);
      console.log('📚 SubCategories:', subCategoriesData);
      
      setAuthors(Array.isArray(authorsData) ? authorsData : authorsData.authors || []);
      setPublishers(Array.isArray(publishersData) ? publishersData : publishersData.publishers || []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData.categories || []);
      setSubCategories(Array.isArray(subCategoriesData) ? subCategoriesData : subCategoriesData.sub_categories || []);
    } catch (err) {
      console.error('❌ Failed to load dropdown data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('File harus berupa gambar');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file maksimal 5MB');
        return;
      }
      
      setCoverFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      console.log('📎 Cover file selected:', file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author_id || !formData.sub_category_id) {
      setError('Judul, penulis, dan sub kategori harus diisi');
      return;
    }

    // DEBUG: Show what we're about to send
    const authorsList = authors.map(a => `ID:${a.id} - ${a.name}`).join('\n');
    const debugInfo = `
About to create book:

Title: ${formData.title}
Author ID: ${formData.author_id}

Available Authors (${authors.length}):
${authorsList}

Does author ID ${formData.author_id} exist in the list above?
    `.trim();
    
    console.log('🚨 DEBUG INFO:', debugInfo);
    
    // Show alert for debugging
    const confirm = window.confirm(debugInfo + '\n\nProceed?');
    
    if (!confirm) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      console.log('📋 Form data before conversion:', formData);
      console.log('📋 Available authors:', authors);
      console.log('📋 Selected author_id:', formData.author_id);

      const authorId = parseInt(formData.author_id);
      const publisherId = formData.publisher_id ? parseInt(formData.publisher_id) : undefined;
      const subCategoryId = parseInt(formData.sub_category_id);
      const locationId = formData.location_id ? parseInt(formData.location_id) : undefined;

      // Validate IDs
      if (isNaN(authorId) || authorId === 0) {
        setError('Penulis harus dipilih');
        setLoading(false);
        return;
      }

      if (isNaN(subCategoryId) || subCategoryId === 0) {
        setError('Sub kategori harus dipilih');
        setLoading(false);
        return;
      }

      // Get the selected category_id from form to build nested structure
      const categoryId = formData.category_id ? parseInt(formData.category_id) : undefined;

      const bookData: any = {
        title: formData.title,
        author: {
          id: authorId
        },
        isbn: formData.isbn || '',
        sub_category: {
          id: subCategoryId,
          category: {
            id: categoryId
          }
        },
        num_book_available: parseInt(formData.num_book_available) || 1,
        num_page: parseInt(formData.num_page) || 0,
        year_published: formData.year_published ? new Date(formData.year_published).getFullYear().toString() : new Date().getFullYear().toString(),
        city_origin: formData.city_origin || '',
        ddc: formData.ddc || '',
        eksemplar_code: formData.eksemplar_code || '',
        desc_fisik_buku: formData.desc_fisik_buku || '',
        desc_singkat_buku: formData.desc_singkat_buku || '',
        cover: '',
        rating: 0,
      };

      // Add optional fields only if they have values
      if (publisherId && !isNaN(publisherId)) {
        bookData.publisher = {
          id: publisherId
        };
      }
      
      if (locationId && !isNaN(locationId)) {
        bookData.location_id = locationId;
      }

      console.log('📤 Creating book with data:', bookData);
      console.log('🔍 Type check - author_id:', typeof bookData.author_id, bookData.author_id);
      
      const response = await createBook(bookData);
      console.log('✅ Book created successfully:', response);
      
      // Upload cover if file is selected
      const bookId = response.id || response.book?.id;
      if (coverFile && bookId) {
        try {
          console.log('📤 Uploading cover for book ID:', bookId);
          await uploadBookCover(bookId, coverFile);
          console.log('✅ Cover uploaded successfully');
          alert('Buku dan cover berhasil ditambahkan!');
        } catch (coverErr: any) {
          console.error('⚠️ Failed to upload cover:', coverErr);
          alert(`Buku berhasil ditambahkan, tetapi gagal upload cover: ${coverErr.message}`);
        }
      } else {
        alert('Buku berhasil ditambahkan!');
      }
      
      // Reset form
      setFormData({ 
        title: '', 
        author_id: '', 
        publisher_id: '', 
        isbn: '', 
        category_id: '',
        sub_category_id: '', 
        num_book_available: '', 
        num_page: '', 
        year_published: '', 
        city_origin: '', 
        ddc: '', 
        eksemplar_code: '', 
        location_id: '', 
        desc_fisik_buku: '', 
        desc_singkat_buku: '' 
      });
      setCoverFile(null);
      setCoverPreview(null);
      onClose();
      
      // Refresh parent data
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 500);
      }
    } catch (err: any) {
      console.error('❌ Failed to create book:', err);
      setError(`Gagal menambahkan buku: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Buku">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul *</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul buku"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ISBN *</label>
            <Input
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Masukkan ISBN"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Penulis *</label>
            <select
              name="author_id"
              value={formData.author_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent"
              required
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
              value={formData.publisher_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent"
              required
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Sub Kategori *</label>
            <select
              name="sub_category_id"
              value={formData.sub_category_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent"
              required
              disabled={loadingData || !formData.category_id}
            >
              <option value="">Pilih Sub Kategori</option>
              {filteredSubCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
            {!formData.category_id && (
              <p className="text-xs text-gray-500 mt-1">Pilih kategori terlebih dahulu</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Tersedia *</label>
            <Input
              type="number"
              name="num_book_available"
              value={formData.num_book_available}
              onChange={handleChange}
              placeholder="Jumlah buku"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Halaman</label>
            <Input
              type="number"
              name="num_page"
              value={formData.num_page}
              onChange={handleChange}
              placeholder="Jumlah halaman"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Terbit</label>
            <Input
              type="date"
              name="year_published"
              value={formData.year_published}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asal Kota</label>
            <Input
              name="city_origin"
              value={formData.city_origin}
              onChange={handleChange}
              placeholder="Kota asal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DDC</label>
            <Input
              name="ddc"
              value={formData.ddc}
              onChange={handleChange}
              placeholder="Dewey Decimal Classification"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Eksemplar</label>
            <Input
              name="eksemplar_code"
              value={formData.eksemplar_code}
              onChange={handleChange}
              placeholder="Kode eksemplar"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi ID</label>
            <select
              name="location_id"
              value={formData.location_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Fisik Buku</label>
          <Input
            name="desc_fisik_buku"
            value={formData.desc_fisik_buku}
            onChange={handleChange}
            placeholder="Contoh: Softcover, ukuran A4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
          <textarea
            name="desc_singkat_buku"
            value={formData.desc_singkat_buku}
            onChange={handleChange as any}
            placeholder="Deskripsi singkat buku..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Buku (Opsional)</label>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#BE4139] file:text-white hover:file:bg-[#9e3530]"
            />
            <p className="text-xs text-gray-500">Format: JPG, PNG, GIF. Maksimal 5MB</p>
            
            {/* Preview */}
            {coverPreview && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <div className="relative w-32 h-44 border-2 border-gray-300 rounded-lg overflow-hidden">
                  <img 
                    src={coverPreview} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCoverFile(null);
                      setCoverPreview(null);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Batal
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export { AddBookModal };
