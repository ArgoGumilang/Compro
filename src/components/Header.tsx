import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Bell, ChevronDown, User, LogOut } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

const Header: React.FC = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[60px] shadow-lg">
      {/* Sidebar Title Area */}
      <div className="w-52 bg-gradient-to-br from-[#BE4139] to-[#9e3530] flex items-center justify-center border-r border-white/20">
        <div className="text-white text-center">
          <div className="text-xs font-black bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-xl shadow-md">✨ SMA TELKOM</div>
          <div className="text-[10px] text-white/90 font-semibold mt-1">BANDUNG</div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="flex-1 bg-gradient-to-r from-[#BE4139] to-[#d94d43] text-white px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-px bg-white/30"></div>
          <h1 className="text-xl font-black">📚 Sistem Informasi Perpustakaan</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-xl transition-all duration-300 hover:bg-white/20 transform hover:scale-110 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          </button>
          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/20 transform hover:scale-105"
            >
              <Avatar className="w-8 h-8 ring-2 ring-white/50">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                  alt="User"
                />
                <AvatarFallback>DD</AvatarFallback>
              </Avatar>
              <ChevronDown size={18} />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-2 border-[#BE4139]/20 py-2 z-50 animate-in">
                <button
                  onClick={() => {
                    navigate('/profile')
                    setIsDropdownOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#BE4139]/10 hover:to-[#d94d43]/10 transition-all duration-300 rounded-xl mx-1 font-semibold"
                >
                  <User size={18} className="text-[#BE4139]" />
                  <span className="font-bold">👤 Lihat Profil</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={() => {
                    // Handle logout
                    console.log('Logout')
                    setIsDropdownOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 rounded-xl mx-1 font-semibold"
                >
                  <LogOut size={18} />
                  <span className="font-bold">🚪 Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
