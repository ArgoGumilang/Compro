import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown, User, LogOut } from "lucide-react"
import logoSekolah from "../assets/logo-sekolah.png";

const Header: React.FC = () => {
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rememberUser");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[60px] shadow-lg">
      {/* Sidebar Title Area */}
      <div className="w-52 bg-gradient-to-br from-[#BE4139] to-[#9e3530] flex items-center justify-center border-r border-white/20">
        <div className="flex items-center justify-center w-full">
          <img
            src={logoSekolah}
            alt="Logo Sekolah"
            className="h-10 w-auto object-contain"
          />
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
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
