import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllBooks, getAllUsers, getAllBookingHistories } from '../lib/api';

const DashboardPage: React.FC = () => {
  const [kunjunganFilter, setKunjunganFilter] = useState<'perhari' | 'perbulan' | 'pertahun'>('perhari');
  const [peminjamanFilter, setPeminjamanFilter] = useState<'perhari' | 'perbulan' | 'pertahun'>('perhari');
  
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrowed, setTotalBorrowed] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [peminjamanChartData, setPeminjamanChartData] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [booksRes, usersRes, borrowRes] = await Promise.all([
        getAllBooks().catch(() => ({ books: [] })),
        getAllUsers().catch(() => ({ users: [] })),
        getAllBookingHistories().catch(() => ({ booking_histories: [] }))
      ]);

      // Extract arrays
      const books = booksRes.books || booksRes || [];
      const users = usersRes.users || usersRes || [];
      const histories = borrowRes.booking_histories || borrowRes.bookingHistories || borrowRes || [];

      // Count totals
      setTotalBooks(Array.isArray(books) ? books.length : 0);
      setTotalMembers(Array.isArray(users) ? users.length : 0);
      
      // Count active borrows
      const activeBorrows = Array.isArray(histories) 
        ? histories.filter((h: any) => h.status === 'active' || h.status === 'borrowed').length 
        : 0;
      setTotalBorrowed(activeBorrows);

      // Generate chart data from histories
      if (Array.isArray(histories) && histories.length > 0) {
        const chartData = generatePeminjamanChartData(histories);
        setPeminjamanChartData(chartData);
        
        // Get recent 5 activities sorted by date
        const sortedHistories = [...histories].sort((a, b) => {
          const dateA = new Date(a.borrowed_date || 0).getTime();
          const dateB = new Date(b.borrowed_date || 0).getTime();
          return dateB - dateA; // newest first
        }).slice(0, 5);
        
        setRecentActivities(sortedHistories);
      }

      console.log("📊 Dashboard data loaded:", { books: books.length, users: users.length, borrowed: activeBorrows });
    } catch (err) {
      console.error("❌ Failed to load dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const generatePeminjamanChartData = (histories: any[]) => {
    // Group by day of week (last 7 days)
    const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const counts: any = {};
    
    daysOfWeek.forEach(day => {
      counts[day] = 0;
    });

    histories.forEach((h: any) => {
      if (h.borrowed_date) {
        const date = new Date(h.borrowed_date);
        const dayName = daysOfWeek[date.getDay()];
        counts[dayName] = (counts[dayName] || 0) + 1;
      }
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      Peminjaman: value
    }));
  };

  // Data untuk Grafik Kunjungan (dummy - backend belum ada endpoint)
  const kunjunganData = [
    { name: 'Senin', Siswa: 35, Guru: 22 },
    { name: 'Selasa', Siswa: 42, Guru: 35 },
    { name: 'Rabu', Siswa: 28, Guru: 15 },
    { name: 'Kamis', Siswa: 68, Guru: 30 },
    { name: 'Jumat', Siswa: 52, Guru: 28 },
  ];

  // Data untuk Grafik Peminjaman dari backend
  const peminjamanData = peminjamanChartData.length > 0 
    ? peminjamanChartData 
    : [{ name: 'Tidak ada data', Peminjaman: 0 }];

  return (
    <div className="space-y-6 p-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#BE4139] rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-white text-sm font-bold mb-2">Total Buku</h3>
          <p className="text-4xl font-black text-white">
            {loading ? '...' : totalBooks}
          </p>
        </div>
        <div className="bg-[#BE4139] rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-white text-sm font-bold mb-2">Dipinjam</h3>
          <p className="text-4xl font-black text-white">
            {loading ? '...' : totalBorrowed}
          </p>
        </div>
        <div className="bg-[#BE4139] rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-white text-sm font-bold mb-2">Anggota</h3>
          <p className="text-4xl font-black text-white">
            {loading ? '...' : totalMembers}
          </p>
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
            <BarChart data={peminjamanData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Peminjaman" fill="#BE4139" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl">
        <h2 className="text-xl font-black text-[#BE4139] mb-4">Aktivitas Terbaru</h2>
        {loading ? (
          <div className="text-center py-4 text-gray-600">Loading...</div>
        ) : recentActivities.length === 0 ? (
          <div className="text-center py-4 text-gray-600">Belum ada aktivitas peminjaman</div>
        ) : (
          <div className="space-y-3">
            {recentActivities.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 px-4 bg-white rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 transform hover:scale-105 border-2 border-gray-200">
                <div>
                  <p className="text-sm font-bold text-gray-800">Peminjaman Buku</p>
                  <p className="text-xs text-gray-600 font-medium">
                    {item.user_name || 'User'} - {item.book_title || 'Buku'}
                  </p>
                </div>
                <span className="text-xs text-[#BE4139] font-semibold bg-red-100 px-3 py-1 rounded-full">
                  {item.borrowed_date ? new Date(item.borrowed_date).toLocaleDateString('id-ID') : '-'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
