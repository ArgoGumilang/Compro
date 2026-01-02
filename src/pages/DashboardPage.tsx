import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllBooks, getAllUsers, getAllBookingHistories, getAllVisitHists } from '../lib/api';

const DashboardPage: React.FC = () => {
  const [kunjunganFilter, setKunjunganFilter] = useState<'perhari' | 'perbulan' | 'pertahun'>('perhari');
  const [peminjamanFilter, setPeminjamanFilter] = useState<'perhari' | 'perbulan' | 'pertahun'>('perhari');
  
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrowed, setTotalBorrowed] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [peminjamanChartData, setPeminjamanChartData] = useState<any[]>([]);
  const [kunjunganChartData, setKunjunganChartData] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [allHistories, setAllHistories] = useState<any[]>([]);
  const [allVisits, setAllVisits] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [booksRes, usersRes, borrowRes, visitsRes] = await Promise.all([
        getAllBooks().catch(() => ({ books: [] })),
        getAllUsers().catch(() => ({ users: [] })),
        getAllBookingHistories().catch(() => ({ booking_histories: [] })),
        getAllVisitHists().catch(() => ({ visit_hists: [] }))
      ]);

      // Extract arrays
      const booksArray = booksRes.books || booksRes || [];
      const usersArray = usersRes.users || usersRes || [];
      const historiesArray = borrowRes.booking_histories || borrowRes.bookingHistories || borrowRes || [];
      const visitsArray = visitsRes.visit_hists || visitsRes || [];

      // Count totals
      setTotalBooks(Array.isArray(booksArray) ? booksArray.length : 0);
      setTotalMembers(Array.isArray(usersArray) ? usersArray.length : 0);
      
      // Count active borrows (status = true)
      const activeBorrows = Array.isArray(historiesArray) 
        ? historiesArray.filter((h: any) => h.status === true).length 
        : 0;
      setTotalBorrowed(activeBorrows);

      // Join data: add user_name and book_title
      const enrichedHistories = (Array.isArray(historiesArray) ? historiesArray : []).map((booking: any) => {
        const user = usersArray.find((u: any) => u.id === booking.user_id);
        const book = booksArray.find((b: any) => b.id === booking.book_id);
        
        return {
          ...booking,
          user_name: user?.full_name || user?.username || `User ID ${booking.user_id}`,
          book_title: book?.title || `Book ID ${booking.book_id}`,
        };
      });

      // Store all data for filtering
      setAllHistories(enrichedHistories);
      setAllVisits(Array.isArray(visitsArray) ? visitsArray : []);

      // Get recent 5 activities sorted by date
      if (enrichedHistories.length > 0) {
        const sortedHistories = [...enrichedHistories].sort((a, b) => {
          const dateA = new Date(a.date || a.booking_date || 0).getTime();
          const dateB = new Date(b.date || b.booking_date || 0).getTime();
          return dateB - dateA; // newest first
        }).slice(0, 5);
        
        console.log("🔍 Recent activities sample:", sortedHistories[0]);
        setRecentActivities(sortedHistories);
      }

      console.log("📊 Dashboard data loaded:", { books: booksArray.length, users: usersArray.length, borrowed: activeBorrows, visits: visitsArray.length });
    } catch (err) {
      console.error("❌ Failed to load dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update charts when filter or data changes
  useEffect(() => {
    if (allHistories.length > 0) {
      const chartData = generatePeminjamanChartData(allHistories, peminjamanFilter);
      setPeminjamanChartData(chartData);
    }
  }, [peminjamanFilter, allHistories]);

  useEffect(() => {
    if (allVisits.length > 0) {
      const chartData = generateKunjunganChartData(allVisits, kunjunganFilter);
      setKunjunganChartData(chartData);
    }
  }, [kunjunganFilter, allVisits]);

  const generatePeminjamanChartData = (histories: any[], filter: string) => {
    if (filter === 'perhari') {
      // Last 7 days by day name
      const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const counts: any = {};
      daysOfWeek.forEach(day => { counts[day] = 0; });

      histories.forEach((h: any) => {
        if (h.date || h.booking_date) {
          const date = new Date(h.date || h.booking_date);
          const dayName = daysOfWeek[date.getDay()];
          counts[dayName] = (counts[dayName] || 0) + 1;
        }
      });

      return daysOfWeek.map(name => ({ name, Peminjaman: counts[name] }));
    } else if (filter === 'perbulan') {
      // Last 12 months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
      const counts: any = {};
      months.forEach(month => { counts[month] = 0; });

      histories.forEach((h: any) => {
        if (h.date || h.booking_date) {
          const date = new Date(h.date || h.booking_date);
          const monthName = months[date.getMonth()];
          counts[monthName] = (counts[monthName] || 0) + 1;
        }
      });

      return months.map(name => ({ name, Peminjaman: counts[name] }));
    } else {
      // Per tahun - group by year
      const counts: any = {};
      histories.forEach((h: any) => {
        if (h.date || h.booking_date) {
          const year = new Date(h.date || h.booking_date).getFullYear();
          counts[year] = (counts[year] || 0) + 1;
        }
      });

      return Object.entries(counts)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([name, value]) => ({ name, Peminjaman: value }));
    }
  };

  const generateKunjunganChartData = (visits: any[], filter: string) => {
    if (filter === 'perhari') {
      const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const counts: any = {};
      daysOfWeek.forEach(day => { counts[day] = 0; });

      visits.forEach((v: any) => {
        if (v.visit_date) {
          const date = new Date(v.visit_date);
          const dayName = daysOfWeek[date.getDay()];
          counts[dayName] = (counts[dayName] || 0) + 1;
        }
      });

      return daysOfWeek.map(name => ({ name, Kunjungan: counts[name] }));
    } else if (filter === 'perbulan') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
      const counts: any = {};
      months.forEach(month => { counts[month] = 0; });

      visits.forEach((v: any) => {
        if (v.visit_date) {
          const date = new Date(v.visit_date);
          const monthName = months[date.getMonth()];
          counts[monthName] = (counts[monthName] || 0) + 1;
        }
      });

      return months.map(name => ({ name, Kunjungan: counts[name] }));
    } else {
      const counts: any = {};
      visits.forEach((v: any) => {
        if (v.visit_date) {
          const year = new Date(v.visit_date).getFullYear();
          counts[year] = (counts[year] || 0) + 1;
        }
      });

      return Object.entries(counts)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([name, value]) => ({ name, Kunjungan: value }));
    }
  };

  // Data untuk charts
  const kunjunganData = kunjunganChartData.length > 0 
    ? kunjunganChartData 
    : [{ name: 'Tidak ada data', Kunjungan: 0 }];

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
              <Bar dataKey="Kunjungan" fill="#8B7FFF" radius={[4, 4, 0, 0]} />
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
                  {(item.date || item.booking_date) ? new Date(item.date || item.booking_date).toLocaleDateString('id-ID') : '-'}
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
