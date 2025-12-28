import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPage: React.FC = () => {
  const [kunjunganFilter, setKunjunganFilter] = useState<'perhari' | 'perbulan' | 'pertahun'>('perhari');
  const [peminjamanFilter, setPeminjamanFilter] = useState<'perhari' | 'perbulan' | 'pertahun'>('perhari');

  // Data untuk Grafik Kunjungan
  const kunjunganData = [
    { name: 'Senin', Siswa: 35, Guru: 22 },
    { name: 'Selasa', Siswa: 42, Guru: 35 },
    { name: 'Rabu', Siswa: 28, Guru: 15 },
    { name: 'Kamis', Siswa: 68, Guru: 30 },
    { name: 'Jumat', Siswa: 52, Guru: 28 },
  ];

  // Data untuk Grafik Peminjaman
  const peminjamanData = [
    { name: 'Peminjaman', Senin: 15, Selasa: 12, Rabu: 8, Kamis: 25, Jumat: 21 },
  ];

  return (
    <div className="space-y-6 p-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#BE4139] rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-white text-sm font-bold mb-2">Total Buku</h3>
          <p className="text-4xl font-black text-white">1,234</p>
        </div>
        <div className="bg-[#BE4139] rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-white text-sm font-bold mb-2">Dipinjam</h3>
          <p className="text-4xl font-black text-white">89</p>
        </div>
        <div className="bg-[#BE4139] rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-white text-sm font-bold mb-2">Anggota</h3>
          <p className="text-4xl font-black text-white">567</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Kunjungan */}
        <div className="bg-white rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl">
          <h2 className="text-xl font-black text-[#BE4139] mb-4 text-center">Grafik Kunjungan</h2>
          
          {/* Filter Buttons */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setKunjunganFilter('perhari')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                kunjunganFilter === 'perhari'
                  ? 'bg-[#BE4139] text-white shadow-lg'
                  : 'bg-white text-[#BE4139] hover:bg-gray-50 border-2 border-[#BE4139]'
              }`}
            >
              Perhari
            </button>
            <button
              onClick={() => setKunjunganFilter('perbulan')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                kunjunganFilter === 'perbulan'
                  ? 'bg-[#BE4139] text-white shadow-lg'
                  : 'bg-white text-[#BE4139] hover:bg-gray-50 border-2 border-[#BE4139]'
              }`}
            >
              Perbulan
            </button>
            <button
              onClick={() => setKunjunganFilter('pertahun')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                kunjunganFilter === 'pertahun'
                  ? 'bg-[#BE4139] text-white shadow-lg'
                  : 'bg-white text-[#BE4139] hover:bg-gray-50 border-2 border-[#BE4139]'
              }`}
            >
              Pertahun
            </button>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kunjunganData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Siswa" fill="#8B7FFF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Guru" fill="#FFA6A6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Peminjaman */}
        <div className="bg-white rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl">
          <h2 className="text-xl font-black text-[#BE4139] mb-4 text-center">Grafik Peminjaman</h2>
          
          {/* Filter Buttons */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setPeminjamanFilter('perhari')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                peminjamanFilter === 'perhari'
                  ? 'bg-[#BE4139] text-white shadow-lg'
                  : 'bg-white text-[#BE4139] hover:bg-gray-50 border-2 border-[#BE4139]'
              }`}
            >
              Perhari
            </button>
            <button
              onClick={() => setPeminjamanFilter('perbulan')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                peminjamanFilter === 'perbulan'
                  ? 'bg-[#BE4139] text-white shadow-lg'
                  : 'bg-white text-[#BE4139] hover:bg-gray-50 border-2 border-[#BE4139]'
              }`}
            >
              Perbulan
            </button>
            <button
              onClick={() => setPeminjamanFilter('pertahun')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                peminjamanFilter === 'pertahun'
                  ? 'bg-[#BE4139] text-white shadow-lg'
                  : 'bg-white text-[#BE4139] hover:bg-gray-50 border-2 border-[#BE4139]'
              }`}
            >
              Pertahun
            </button>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peminjamanData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Senin" fill="#8B7FFF" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Selasa" fill="#FFA6A6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Rabu" fill="#5EC4C4" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Kamis" fill="#FFB84D" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Jumat" fill="#6B9FFF" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl">
        <h2 className="text-xl font-black text-[#BE4139] mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between py-3 px-4 bg-white rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 transform hover:scale-105 border-2 border-gray-200">
              <div>
                <p className="text-sm font-bold text-gray-800">Peminjaman Buku</p>
                <p className="text-xs text-gray-600 font-medium">Nama Lengkap - Judul Buku</p>
              </div>
              <span className="text-xs text-[#BE4139] font-semibold bg-red-100 px-3 py-1 rounded-full">10/26/2022</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
