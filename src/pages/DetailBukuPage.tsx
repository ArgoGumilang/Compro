import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Star } from "lucide-react";
import { getBookById } from "../lib/api";

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

  // Determine if user is admin or regular user based on current path or role
  const isAdminView = window.location.pathname.includes('manajemen') || false;
  const backUrl = isAdminView ? "/manajemen-buku" : "/dashanggota";

  /* ======================
     FETCH DATA
  ====================== */
  useEffect(() => {
    const fetchBookDetail = async () => {
      if (!bookId) {
        setError("Book ID not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await getBookById(bookId);
        console.log("📚 Book detail:", response);
        setBookData(response);
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
     DUMMY RATING DATA (nanti bisa diganti dengan API)
  ====================== */

  const ratingData = {
    averageRating: 4.5,
    totalReviews: 123,
    ratings: [
      { star: 5, percentage: 48 },
      { star: 4, percentage: 32 },
      { star: 3, percentage: 14 },
      { star: 2, percentage: 4 },
      { star: 1, percentage: 2 },
    ],
  };

  const reviews = [
    {
      name: "Dinda D",
      date: "10 Dec 2022",
      rating: 4,
      comment:
        "Struktur materinya sistematis dan mudah dipahami. Cocok untuk persiapan UTBK.",
    },
    {
      name: "Desfira A",
      date: "04 Oct 2021",
      rating: 4,
      comment:
        "Latihan soalnya bervariasi dan menantang. Sangat membantu siswa.",
    },
    {
      name: "Argo Gumilang",
      date: "26 Sept 2020",
      rating: 4,
      comment:
        "Bahasanya jelas dan contoh soalnya relevan dengan kehidupan sehari-hari.",
    },
  ];

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={16}
          className={
            s <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );

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
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#BE4139]">
          Detail Data Buku
        </h1>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* COVER */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border shadow p-4">
            <img
              src={bookData.cover || "https://via.placeholder.com/300x400?text=No+Cover"}
              alt="Cover"
              className="rounded-lg object-cover w-full aspect-[3/4]"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/300x400?text=No+Cover";
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
              {[
                ["ID", bookData.id],
                ["Judul", bookData.title || "-"],
                ["Penulis", bookData.author?.name || "-"],
                ["Publisher", bookData.publisher?.name || "-"],
                ["Kategori", bookData.sub_category?.category?.name || "-"],
                ["Sub Kategori", bookData.sub_category?.name || "-"],
                ["ISBN", bookData.isbn || "-"],
                ["DDC", bookData.ddc || "-"],
                ["Kode Eksemplar", bookData.eksemplar_code || "-"],
                ["Total Halaman", bookData.num_page ? `${bookData.num_page} halaman` : "-"],
                ["Tahun Terbit", bookData.year_published ? new Date(bookData.year_published).getFullYear() : "-"],
                ["Asal Kota", bookData.city_origin || "-"],
                ["Jumlah Buku Tersedia", bookData.num_book_available?.toString() || "-"],
                ["Rating", bookData.rating ? `${bookData.rating} ⭐` : "Belum ada rating"],
                ["Lokasi ID", bookData.location_id || "-"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-semibold text-gray-500">{label}</p>
                  <p className="text-gray-800">{value}</p>
                </div>
              ))}
            </div>

            {bookData.desc_fisik_buku && (
              <div className="mt-6">
                <p className="font-semibold text-gray-500">Deskripsi Fisik Buku</p>
                <p className="text-gray-700 mt-1">{bookData.desc_fisik_buku}</p>
              </div>
            )}

            <div className="mt-6">
              <p className="font-semibold text-gray-500">Deskripsi Singkat</p>
              <p className="text-gray-700 mt-1">{bookData.desc_singkat_buku || "Tidak ada deskripsi tersedia."}</p>
            </div>
          </div>

          {/* LOCATION MAP */}
          {bookData.location_id && (
            <div className="bg-white rounded-xl border shadow p-6">
              <h2 className="font-bold text-[#BE4139] mb-4">
                Lokasi Buku di Perpustakaan
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Buku ini berada di Lokasi #{bookData.location_id}
              </p>
              
              <div className="relative inline-block max-w-full">
                <img 
                  src="/images/denah.png" 
                  alt="Denah Perpustakaan" 
                  className="rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Denah+Tidak+Tersedia";
                  }}
                />
                
                {/* Location Highlights */}
                <div className="absolute inset-0">
                  {/* Location 1 - Left side */}
                  {bookData.location_id === 1 && (
                    <div className="absolute left-[3%] top-[15%] w-[10%] h-[70%] bg-[#BE4139] opacity-30 rounded animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 2 - Top left */}
                  {bookData.location_id === 2 && (
                    <div className="absolute left-[15%] top-[3%] w-[23%] h-[12%] bg-[#BE4139] opacity-30 rounded animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 3 - Top center */}
                  {bookData.location_id === 3 && (
                    <div className="absolute left-[40%] top-[3%] w-[23%] h-[12%] bg-[#BE4139] opacity-30 rounded animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 4 - Top right circles */}
                  {bookData.location_id === 4 && (
                    <div className="absolute left-[66%] top-[8%] w-[15%] h-[30%] bg-[#BE4139] opacity-30 rounded-full animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 5 - Right side */}
                  {bookData.location_id === 5 && (
                    <div className="absolute right-[3%] top-[15%] w-[10%] h-[70%] bg-[#BE4139] opacity-30 rounded animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 6 - Bottom right */}
                  {bookData.location_id === 6 && (
                    <div className="absolute right-[3%] bottom-[15%] w-[10%] h-[30%] bg-[#BE4139] opacity-30 rounded animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                  
                  {/* Location 7 - Bottom center */}
                  {bookData.location_id === 7 && (
                    <div className="absolute left-[25%] bottom-[8%] w-[50%] h-[12%] bg-[#BE4139] opacity-30 rounded-full animate-pulse border-4 border-[#BE4139]"></div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 bg-[#BE4139] opacity-30 border-2 border-[#BE4139] rounded"></div>
                <span>Lokasi buku saat ini</span>
              </div>
            </div>
          )}

          {/* RATINGS */}
          <div className="bg-white rounded-xl border shadow p-6">
            <h2 className="font-bold text-[#BE4139] mb-6">
              Rating & Ulasan
            </h2>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="text-center md:text-left">
                <div className="text-5xl font-black text-[#BE4139]">
                  {ratingData.averageRating}
                </div>
                {renderStars(Math.round(ratingData.averageRating))}
                <p className="text-sm text-gray-500 mt-1">
                  {ratingData.totalReviews} ulasan
                </p>
              </div>

              <div className="flex-1 space-y-2">
                {ratingData.ratings.map((r) => (
                  <div key={r.star} className="flex items-center gap-3">
                    <span className="w-4 text-sm">{r.star}</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-[#BE4139] h-full rounded-full"
                        style={{ width: `${r.percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-sm text-right">
                      {r.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between mb-1">
                    <p className="font-semibold">{r.name}</p>
                    <span className="text-xs text-gray-500">
                      {r.date}
                    </span>
                  </div>
                  {renderStars(r.rating)}
                  <p className="text-sm text-gray-600 mt-2">
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBukuPage;
