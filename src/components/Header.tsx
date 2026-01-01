import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Bell, ChevronDown, User, LogOut } from "lucide-react"

const Header: React.FC = () => {
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [showNotif, setShowNotif] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  /* =======================
     CLOSE PROFILE DROPDOWN
     ======================= */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  /* =======================
     CLOSE NOTIFICATION POPUP
     ======================= */
  useEffect(() => {
    const handleClickOutsideNotif = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotif(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutsideNotif)
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideNotif)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rememberUser");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[60px] shadow-lg">
      {/* Sidebar Title Area */}
      <div className="w-52 bg-gradient-to-br from-[#BE4139] to-[#9e3530] flex items-center justify-center border-r border-white/20">
        <div className="text-white text-center">
          <div className="text-xs font-black bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-xl shadow-md">
            SMA TELKOM
          </div>
          <div className="text-[10px] text-white/90 font-semibold mt-1">
            BANDUNG
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex-1 bg-gradient-to-r from-[#BE4139] to-[#d94d43] text-white px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-px bg-white/30"></div>
          <h1 className="text-xl font-black">
            Sistem Informasi Perpustakaan
          </h1>
        </div>

        <div className="flex items-center gap-4 relative">
          {/* 🔔 Bell Notification */}
          <button
            onClick={() => {
              setShowNotif(!showNotif)
              setIsDropdownOpen(false)
            }}
            className="p-2 rounded-xl transition-all duration-300 hover:bg-white/20 transform hover:scale-110 relative"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          </button>

          {/* 🔔 Notification Popup */}
          {showNotif && (
            <div
              ref={notifRef}
              className="absolute right-16 top-14 w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b">
                <h3 className="text-lg font-bold text-gray-800">
                  Notifikasi
                </h3>
              </div>

              {/* Today */}
              <div className="bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
                Today
              </div>

              {/* Item 1 */}
              <div className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50">
                <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                  ⚠️
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm leading-snug">
                    Pengembalian Buku Terlambat
                  </p>
                  <p className="text-xs text-gray-600 mt-[-16px]">
                    Buku <b>UI/UX Handbook</b> belum dikembalikan.
                    <span className="text-red-500 font-semibold">
                      {" "}10 November 2025
                    </span>
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  5 jam lalu
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50">
                <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                  ⏳
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm leading-snug">
                    Pengingat Pengembalian Buku
                  </p>
                  <p className="text-xs text-gray-600 mt-[-16px]">
                    Buku <b>Desain UI/UX</b> tinggal <b>1 hari lagi</b>.
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  7 jam lalu
                </span>
              </div>

              {/* Footer */}
              <button
                className="w-full text-center py-3 text-sm font-semibold text-[#BE4139] hover:bg-gray-100"
                onClick={() => setShowNotif(false)}
              >
                Lihat semua notifikasi
              </button>
            </div>
          )}

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen)
                setShowNotif(false)
              }}
              className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/20 transform hover:scale-105"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/50">
                <User size={16} className="text-white" />
              </div>
              <ChevronDown size={18} />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-2 border-[#BE4139]/20 py-2 z-50">
                <button
                  onClick={() => {
                    navigate("/profile")
                    setIsDropdownOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#BE4139]/10 hover:to-[#d94d43]/10 transition-all duration-300 rounded-xl mx-1 font-semibold"
                >
                  <User size={18} className="text-[#BE4139]" />
                  <span className="font-bold">Lihat Profil</span>
                </button>

                <div className="border-t border-gray-200 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 rounded-xl mx-1 font-semibold"
                >
                  <LogOut size={18} />
                  <span className="font-bold">Logout</span>
                </button>

                {/*
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#BE4139] rounded-2xl shadow-xl border-2 border-[#BE4139] p-8 hover:bg-[#9e3530] transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-white">Keluar</span>
                    <ChevronRight size={28} className="text-white" />
                  </div>
                </button>
                */}

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
