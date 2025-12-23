import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star } from 'lucide-react';

const DetailBukuPage: React.FC = () => {
  const navigate = useNavigate();

  // Sample data
  const bookData = {
    judul: 'Judul Buku',
    kategori: 'Judul Buku',
    isbn: 'Judul Buku',
    penulis: 'Judul Buku',
    jumlahBukuTersedia: 'Judul Buku',
    ddc: 'Judul Buku',
    publisher: 'Judul Buku',
    asalKota: 'Judul Buku',
    deskripsiFisikBuku: 'Judul Buku',
    totalHalaman: 'Judul Buku',
    tahunTerbit: 'Judul Buku',
    deskripsiSingkatBuku: 'Judul Buku',
  };

  const ratingData = {
    averageRating: 4.5,
    totalReviews: 123,
    ratings: [
      { star: 5, percentage: 48, count: 59 },
      { star: 4, percentage: 32, count: 40 },
      { star: 3, percentage: 14, count: 17 },
      { star: 2, percentage: 4, count: 5 },
      { star: 1, percentage: 2, count: 2 },
    ]
  };

  const reviews = [
    {
      name: 'Dinda Desfira',
      date: '10 Dec 2022',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      name: 'Dinda Desfira',
      date: '10 Dec 2022',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      name: 'Dinda Desfira',
      date: '10 Dec 2022',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-[#BE4139] p-8">
      {/* Header with Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/manajemen-buku')}
          className="flex items-center gap-2 text-white bg-[#BE4139] hover:bg-[#9e3530] px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-bold">Kembali</span>
        </button>
      </div>

      <h1 className="text-3xl font-black text-[#BE4139] mb-6">📖 Data Buku #1</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Book Cover */}
        <div className="lg:col-span-1">
          <div className="bg-[#BE4139] rounded-2xl aspect-[3/4] flex items-center justify-center shadow-xl border-2 border-[#BE4139] transform hover:scale-105 transition-all duration-300">
            <span className="text-white font-black text-xl">📖 Book Cover</span>
          </div>
        </div>

        {/* Right Column - Book Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Book Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">📝 Judul</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.judul}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">✍️ Penulis</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.penulis}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">🏢 Publisher</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.publisher}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">📚 Total Halaman</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.totalHalaman}</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">🏷️ Kategori</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.kategori}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">📚 Jumlah Buku Tersedia</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.jumlahBukuTersedia}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">🌆 Asal Kota</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.asalKota}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">📅 Tahun Terbit</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.tahunTerbit}</p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">🔢 ISBN</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.isbn}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">📊 DDC</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.ddc}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">📕 Deskripsi Fisik Buku</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.deskripsiFisikBuku}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-[#BE4139]">
                <h3 className="text-sm font-black text-[#BE4139] mb-2">📝 Deskripsi Singkat Buku</h3>
                <p className="text-sm text-gray-700 font-semibold">{bookData.deskripsiSingkatBuku}</p>
              </div>
            </div>
          </div>

          {/* Rating and Reviews Section */}
          <div className="pt-6 border-t-2 border-[#BE4139]">
            <h2 className="text-2xl font-black text-[#BE4139] mb-4">⭐ Rating dan Ulasan</h2>
            
            {/* Rating Summary */}
            <div className="flex flex-col md:flex-row gap-8 mb-8 bg-white p-6 rounded-2xl border-2 border-[#BE4139]">
              {/* Average Rating */}
              <div className="flex flex-col items-center md:items-start">
                <div className="text-6xl font-black text-[#BE4139] mb-2">{ratingData.averageRating}</div>
                {renderStars(Math.round(ratingData.averageRating))}
                <p className="text-sm text-[#BE4139] mt-2 font-bold">{ratingData.totalReviews} reviews</p>
              </div>

              {/* Rating Bars */}
              <div className="flex-1 space-y-2">
                {ratingData.ratings.map((rating) => (
                  <div key={rating.star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-3 font-bold">{rating.star}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-[#BE4139] h-full rounded-full transition-all duration-500"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#BE4139] w-12 text-right font-bold">{rating.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border-2 border-[#BE4139] hover:border-[#9e3530] transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-[#BE4139] rounded-full flex-shrink-0 shadow-lg" />
                    
                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-black text-[#BE4139]">{review.name}</h4>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      {renderStars(review.rating)}
                      <p className="text-sm text-gray-600 mt-3 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
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
