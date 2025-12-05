import React from "react"
import { Bell, ChevronDown } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[60px]">
      {/* Sidebar Title Area */}
      <div className="w-52 bg-[#BE4139] flex items-center justify-center border-r border-[#BE4139]/80">
        <div className="text-white text-center">
          <div className="text-xs font-bold bg-yellow-400 text-black px-2 py-0.5 rounded">SMA TELKOM</div>
          <div className="text-[10px] text-white/80">BANDUNG</div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="flex-1 bg-[#BE4139] text-white px-8 flex items-center justify-between border-b border-[#BE4139]/80">
        <div className="flex items-center gap-3">
          <div className="h-6 w-px bg-white/30"></div>
          <h1 className="text-xl font-semibold">Sistem Informasi Perpustakaan</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg transition-colors hover:bg-white/10">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-colors hover:bg-white/10">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                alt="User"
              />
              <AvatarFallback>DD</AvatarFallback>
            </Avatar>
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
