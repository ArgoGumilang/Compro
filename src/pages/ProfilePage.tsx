import React, { useState } from 'react';
import { ChevronRight, Edit, Save, X } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    namaDepan: 'Anu',
    namaBelakang: 'Nama Lengkap',
    tanggalLahir: '10-12-1998',
    alamatEmail: 'emailanu@gmail.com',
    nomorTelepon: '081378424178',
    peran: 'Administrator',
  });
  const [originalData, setOriginalData] = useState({ ...profileData });

  const handleEdit = () => {
    setOriginalData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically call an API to save the data
    console.log('Saving data:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({ ...originalData });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  return (
    <div className="space-y-6 min-h-screen">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#BE4139] p-8 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-[#BE4139] rounded-full flex-shrink-0 overflow-hidden shadow-lg ring-4 ring-white">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#BE4139]">👑 Dinda Desfira</h2>
            <p className="text-[#BE4139] text-sm font-semibold mt-1">Administrator</p>
          </div>
        </div>
      </div>

      {/* Data Anggota Section */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#BE4139] p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-[#BE4139]">📄 Data Anggota</h3>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button 
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 font-semibold border-2 border-gray-300"
                >
                  <X size={16} />
                  <span>Batal</span>
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#BE4139] hover:bg-[#9e3530] rounded-xl transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
                >
                  <Save size={16} />
                  <span>Simpan</span>
                </button>
              </>
            ) : (
              <button 
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#BE4139] hover:bg-[#9e3530] rounded-xl transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
              >
                <Edit size={16} />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Row 1 */}
          <div>
            <label className="block text-sm font-bold text-[#BE4139] mb-2">👤 Nama Depan</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.namaDepan}
                onChange={(e) => handleChange('namaDepan', e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#BE4139]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent transition-all duration-300"
              />
            ) : (
              <p className="text-gray-800 font-semibold text-base bg-red-50 px-3 py-2 rounded-xl">{profileData.namaDepan}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-[#BE4139] mb-2">👤 Nama Belakang</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.namaBelakang}
                onChange={(e) => handleChange('namaBelakang', e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#BE4139]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent transition-all duration-300"
              />
            ) : (
              <p className="text-gray-800 font-semibold text-base bg-red-50 px-3 py-2 rounded-xl">{profileData.namaBelakang}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-[#BE4139] mb-2">🎂 Tanggal Lahir</label>
            {isEditing ? (
              <input
                type="date"
                value={profileData.tanggalLahir}
                onChange={(e) => handleChange('tanggalLahir', e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#BE4139]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent transition-all duration-300"
              />
            ) : (
              <p className="text-gray-800 font-semibold text-base bg-red-50 px-3 py-2 rounded-xl">{profileData.tanggalLahir}</p>
            )}
          </div>

          {/* Row 2 */}
          <div>
            <label className="block text-sm font-bold text-[#BE4139] mb-2">📧 Alamat Email</label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.alamatEmail}
                onChange={(e) => handleChange('alamatEmail', e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#BE4139]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent transition-all duration-300"
              />
            ) : (
              <p className="text-gray-800 font-semibold text-base bg-red-50 px-3 py-2 rounded-xl">{profileData.alamatEmail}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-[#BE4139] mb-2">📱 Nomor Telepon</label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.nomorTelepon}
                onChange={(e) => handleChange('nomorTelepon', e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#BE4139]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE4139] focus:border-transparent transition-all duration-300"
              />
            ) : (
              <p className="text-gray-800 font-semibold text-base bg-red-50 px-3 py-2 rounded-xl">{profileData.nomorTelepon}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-[#BE4139] mb-2">🎯 Peran</label>
            <p className="text-gray-800 font-semibold text-base bg-red-50 px-3 py-2 rounded-xl">{profileData.peran}</p>
          </div>
        </div>
      </div>

      {/* Lihat QRCode Button */}
      <button className="w-full bg-white rounded-2xl shadow-xl border-2 border-[#BE4139] p-8 mb-6 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-[#BE4139]">📱 Lihat QRCode</span>
          <ChevronRight size={28} className="text-[#BE4139]" />
        </div>
      </button>

      {/* Keluar Button */}
      <button
        onClick={() => {
          // Handle logout
          console.log('Logout');
        }}
        className="w-full bg-[#BE4139] rounded-2xl shadow-xl border-2 border-[#BE4139] p-8 hover:bg-[#9e3530] transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-white">🚪 Keluar</span>
          <ChevronRight size={28} className="text-white" />
        </div>
      </button>
    </div>
  );
};

export default ProfilePage;
