import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Pencil, Save, X } from "lucide-react";
import { getBookById, updateBook, API_BASE_URL } from "../lib/api";
import { getBookCoverUrl, getImageUrl } from "../lib/bookCoverHelper";

const DetailBukuPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("id");

  /* ======================
     STATE
  ====================== */
  const [bookData, setBookData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  // Determine if user is admin or regular user based on current path or role
  const isAdminView = window.location.pathname.includes('manajemen') || false;
  const backUrl = isAdminView ? "/manajemen-buku" : "/dashanggota";

  /* ======================
     FETCH DATA
  ====================== */
  useEffect(() => {
    const fetchBookDetail = async () => {
    if (!bookId) return;

      try {
        setLoading(true);
        setError("");
        const response = await getBookById(bookId);
        console.log("📚 Book detail:", response);
        
        // Use helper to convert cover path
        const coverUrl = getImageUrl(response.cover || response.cover_url) || getBookCoverUrl(null, null);
        console.log('🖼️ Using cover URL:', coverUrl);
        
        setBookData({
          ...response,
          cover: coverUrl,
          cover_url: coverUrl
        });
        setFormData(response);
      } catch (err: any) {
        console.error("❌ Failed to fetch book:", err);
        setError(err.message || "Gagal mengambil data buku");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [bookId]);





  /* ======================
     UI
  ====================== */
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BE4139]"></div>
          <p className="ml-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !bookData) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <button
          onClick={() => navigate(backUrl)}
          className="mb-6 flex items-center gap-2 bg-[#BE4139] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#9e3530]"
        >
          <ChevronLeft size={18} />
          Kembali
        </button>
        <div className="bg-white rounded-xl border shadow p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">{error || "Book not found"}</p>
          <button 
            onClick={() => navigate(backUrl)} 
            className="px-4 py-2 bg-[#BE4139] text-white rounded-xl hover:bg-[#9e3530]"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
      ...formData,
      year_published: formData.year_published
        ? String(formData.year_published)
        : null,

      // pastikan number
      location_id: Number(formData.location_id),
    };

      await updateBook(bookData.id, payload);

      // Refresh data after successful update
      const updatedBook = await getBookById(bookData.id.toString());
      
      // Use helper to convert cover path
      const coverUrl = getImageUrl(updatedBook.cover || updatedBook.cover_url) || getBookCoverUrl(null, null);
      
      setBookData({
        ...updatedBook,
        cover: coverUrl,
        cover_url: coverUrl
      });
      setFormData(updatedBook);
      setIsEditMode(false);
      
      // Show success message
      alert('Perubahan berhasil disimpan!');
    } catch (err: any) {
      console.error('Failed to update book:', err);
      alert(err.message || 'Gagal menyimpan perubahan');
    } finally {
      setSaving(false);
    }
  };

  const renderEditableField = (
    label: string,
    field: string,
    value: any,
    type: "text" | "number" | "textarea" = "text"
  ) => {
    return (
      <div>
        {/* LABEL (SAMA SEPERTI ID) */}
        <p className="font-semibold text-gray-500">{label}</p>

        {/* VIEW MODE */}
        {!isEditMode && (
          <p className="text-gray-800">
            {value !== null && value !== undefined && value !== "" ? value : "-"}
          </p>
        )}

        {/* EDIT MODE */}
        {isEditMode && (
          type === "textarea" ? (
            <textarea
              value={formData[field] ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              rows={3}
            />
          ) : (
            <input
              type={type}
              value={formData[field] ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [field]: type === "number" ? Number(e.target.value) : e.target.value,
                })
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          )
        )}
      </div>
    );
  };

  const renderEditableLocation = () => (
    <div>
      <p className="font-semibold text-gray-500">Lokasi Buku</p>

      {!isEditMode && (
        <p className="text-gray-800">
          {currentLocation ? `Lokasi #${currentLocation}` : "-"}
        </p>
      )}

      {isEditMode && (
        <select
          value={formData.location_id ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              location_id: Number(e.target.value),
            })
          }
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">-- Pilih Lokasi --</option>
          {[1, 2, 3, 4, 5, 6, 7].map((loc) => (
            <option key={loc} value={loc}>
              Lokasi #{loc}
            </option>
          ))}
        </select>
      )}
    </div>
  );

  const currentLocation = isEditMode
    ? formData.location_id
    : bookData.location_id;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* BACK */}
      <button
        onClick={() => navigate(backUrl)}
        className="mb-6 flex items-center gap-2 bg-[#BE4139] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#9e3530]"
      >
        <ChevronLeft size={18} />
        Kembali
      </button>

      {/* TITLE */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#BE4139]">
          Detail Data Buku
        </h1>

        {isAdminView && (
          <div className="flex gap-2">
            {!isEditMode ? (
              <button
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
              >
                <Pencil size={16} />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
                >
                  <Save size={16} />
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>

                <button
                  onClick={() => {
                    setFormData(bookData); // Reset to original data
                    setIsEditMode(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500"
                >
                  <X size={16} />
                  Batal
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* COVER */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border shadow p-4">
            <img
              src={getBookCoverUrl(bookData.cover, bookData.cover_url)}
              alt="Cover"
              className="rounded-lg object-cover w-full aspect-[3/4]"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='18' fill='%239ca3af'%3ENo Cover%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>

        {/* INFO */}
        <div className="xl:col-span-3 space-y-8">
          {/* METADATA */}
          <div className="bg-white rounded-xl border shadow p-6">
            <h2 className="font-bold text-[#BE4139] mb-4">
              Informasi Buku
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

              <div>
                <p className="font-semibold text-gray-500">ID</p>
                <p className="text-gray-800">{bookData.id}</p>
              </div>

              {renderEditableField("Judul", "title", bookData.title)}
              {renderEditableField("ISBN", "isbn", bookData.isbn)}
              {renderEditableField("DDC", "ddc", bookData.ddc)}
              {renderEditableField(
                "Total Halaman",
                "num_page",
                bookData.num_page,
                "number"
              )}
              {renderEditableField(
                "Tahun Terbit",
                "year_published",
                bookData.year_published
                  ? new Date(bookData.year_published).getFullYear()
                  : "",
                "number"
              )}
              {renderEditableField("Asal Kota", "city_origin", bookData.city_origin)}
              {renderEditableField(
                "Jumlah Buku Tersedia",
                "num_book_available",
                bookData.num_book_available,
                "number"
              )}

              {renderEditableField(
                "Penulis",
                "author_name",
                typeof bookData.author === 'object' ? bookData.author?.name : bookData.author || "-"
              )}

              {renderEditableField(
                "Publisher",
                "publisher_name",
                typeof bookData.publisher === 'object' ? bookData.publisher?.name : bookData.publisher || "-"
              )}

              {renderEditableLocation()}

            </div>

            <div className="mt-4">
              {renderEditableField(
                "Deskripsi Fisik Buku",
                "desc_fisik_buku",
                bookData.desc_fisik_buku || "-",
                "textarea"
              )}
            </div>

            <div className="mt-2">
              {renderEditableField(
                "Deskripsi Singkat",
                "desc_singkat_buku",
                bookData.desc_singkat_buku,
                "textarea"
              )}
            </div>

          </div>

          {/* LOCATION MAP */}
          {currentLocation && (
            <div className="bg-white rounded-xl border shadow p-6">
              <h2 className="font-bold text-[#BE4139] mb-4">
                Lokasi Buku di Perpustakaan
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Buku ini berada di Lokasi #{currentLocation}
              </p>
              
              <div className="relative inline-block max-w-full">
                <img 
                  src="/images/denah.png" 
                  alt="Denah Perpustakaan" 
                  className="rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%239ca3af'%3EDenah Tidak Tersedia%3C/text%3E%3C/svg%3E";
                  }}
                />
                
                {/* Location Highlights */}
                <div className="absolute inset-0">
                  {/* Location 1 - Left side */}
                  {currentLocation === 1 && (
                    <div className="absolute left-[3%] top-[6.5%] w-[5%] h-[63%] bg-[#BE4139] opacity-30 animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 2 - Top left */}
                  {currentLocation === 2 && (
                    <div className="absolute left-[8%] top-[6.5%] w-[19.5%] h-[9.5%] bg-[#BE4139] opacity-30 animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 3 - Top center */}
                  {currentLocation === 3 && (
                    <div className="absolute left-[27.5%] top-[6.5%] w-[12%] h-[9.5%] bg-[#BE4139] opacity-30 animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 4 - Top right circles */}
                  {currentLocation === 4 && (
                    <div className="absolute left-[44.4%] top-[18.5%] w-[4.9%] h-[15%] bg-[#BE4139] opacity-30 rounded-full animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 5 - Right side */}
                  {currentLocation === 5 && (
                    <div className="absolute right-[38.7%] top-[6.5%] w-[5%] h-[39%] bg-[#BE4139] opacity-30 animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 6 - Bottom right */}
                  {currentLocation === 6 && (
                    <div className="absolute right-[38.7%] bottom-[5.5%] w-[5%] h-[39%] bg-[#BE4139] opacity-30 animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 7 - Bottom center */}
                  {currentLocation === 7 && (
                    <div className="absolute left-[24.5%] bottom-[5.5%] w-[28.5%] h-[8%] bg-[#BE4139] opacity-30 rounded-full animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 bg-[#BE4139] opacity-30 border-2 border-[#BE4139] rounded"></div>
                <span>Lokasi buku saat ini</span>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default DetailBukuPage;