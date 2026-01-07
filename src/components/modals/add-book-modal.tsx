import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { createBook, getAllAuthors, getAllPublishers, getAllCategories, getAllSubCategories } from '../../lib/api';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author_id || !formData.sub_category_id) {
      setError('Judul, penulis, dan sub kategori harus diisi');
      return;
    }

    try {
      setLoading(true);
      setError('');

      console.log('📋 Form data before conversion:', formData);

      const authorId = parseInt(formData.author_id);
      const publisherId = formData.publisher_id ? parseInt(formData.publisher_id) : undefined;
      const subCategoryId = parseInt(formData.sub_category_id);
      const locationId = formData.location_id ? parseInt(formData.location_id) : undefined;
      const categoryId = formData.category_id ? parseInt(formData.category_id) : undefined;

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

      // Format year_published - backend expects just the year as string
      let yearPublished = '';
      if (formData.year_published) {
        const date = new Date(formData.year_published);
        yearPublished = date.getFullYear().toString();
      } else {
        // Default to current year
        yearPublished = new Date().getFullYear().toString();
      }

      // Build book data matching API structure
      const bookData: any = {
        title: formData.title,
        author: {
          id: authorId
        },
        isbn: formData.isbn || '',
        sub_category: {
          id: subCategoryId
        },
        num_book_available: parseInt(formData.num_book_available) || 1,
        num_page: parseInt(formData.num_page) || 0,
        year_published: yearPublished,
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

      // Add category to sub_category if provided
      if (categoryId && !isNaN(categoryId)) {
        bookData.sub_category.category = {
          id: categoryId
        };
      }

      console.log('📤 Creating book with data:', JSON.stringify(bookData, null, 2));
      
      await createBook(bookData);
      console.log('✅ Book created successfully');
      
      alert('Buku berhasil ditambahkan!');
      
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
