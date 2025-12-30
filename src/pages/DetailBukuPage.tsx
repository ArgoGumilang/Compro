import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Star } from "lucide-react";

const DetailBukuPage: React.FC = () => {
  const navigate = useNavigate();

  /* ======================
     DATA
  ====================== */
  const bookData = {
    judul: "Matematika Wajib untuk SMA/MA Kelas XII",
    kategori: "Matematika",
    isbn: "9786020321231",
    penulis: "B. K. Noormandiri",
    jumlahBukuTersedia: "12",
    ddc: "510 MAT",
    publisher:
      "Pusat Kurikulum dan Perbukuan, Kementerian Pendidikan dan Kebudayaan, Penerbit Erlangga",
    asalKota: "Jakarta",
    deskripsiFisikBuku: "Softcover, ukuran A4, cetakan ke-2",
    totalHalaman: "280 halaman",
    tahunTerbit: "2021",
    deskripsiSingkatBuku:
      "Buku ini disusun berdasarkan Kurikulum 2013 revisi, mencakup materi limit, turunan, integral, dan statistika. Dilengkapi latihan soal dan evaluasi akhir bab.",
    denah: "Rak Koleksi Buku Pelajaran (5)",
  };

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
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* BACK */}
      <button
        onClick={() => navigate("/manajemen-buku")}
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
        {/*<p className="text-sm text-gray-600 mt-2">
          Informasi lengkap buku & ulasan pengguna
        </p>*/}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* COVER */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border shadow p-4">
            <img
              src="https://cdn.eurekabookhouse.co.id/ebh/product/all/004510075020.jpg"
              alt="Cover"
              className="rounded-lg object-cover w-full aspect-[3/4]"
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
                ["Judul", bookData.judul],
                ["Penulis", bookData.penulis],
                ["Publisher", bookData.publisher],
                ["Kategori", bookData.kategori],
                ["ISBN", bookData.isbn],
                ["DDC", bookData.ddc],
                ["Total Halaman", bookData.totalHalaman],
                ["Tahun Terbit", bookData.tahunTerbit],
                ["Asal Kota", bookData.asalKota],
                ["Jumlah Buku", bookData.jumlahBukuTersedia],
                ["Deskripsi Fisik", bookData.deskripsiFisikBuku],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-semibold text-gray-500">{label}</p>
                  <p className="text-gray-800">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="font-semibold text-gray-500">
                Deskripsi Singkat
              </p>
              <p className="text-gray-700 mt-1">
                {bookData.deskripsiSingkatBuku}
              </p>
            </div>
          </div>

          {/* LOCATION */}
          <div className="bg-white rounded-xl border shadow p-6">
            <h2 className="font-bold text-[#BE4139] mb-2">
              Lokasi Buku
            </h2>
            <p className="text-gray-700 mb-4">{bookData.denah}</p>
            <img
              src="/images/denah.png"
              alt="Denah"
              className="rounded-lg mx-auto"
            />
          </div>

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
