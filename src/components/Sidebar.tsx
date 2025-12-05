import { useState } from "react"
import { LayoutGrid, Users, BookOpen, BookMarked, Upload, ChevronDown, ClipboardCheck } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.FC<{ size?: number }>;
  path?: string;
  subItems?: SubMenuItem[];
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(
    location.pathname.startsWith("/peminjaman") ? "peminjaman" : 
    location.pathname.startsWith("/presensi") ? "presensi" : null
  );

  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid, path: "/" },
    { id: "data-anggota", label: "Data Anggota", icon: Users, path: "/data-anggota" },
    { id: "manajemen-buku", label: "Manajemen Buku", icon: BookOpen, path: "/manajemen-buku" },
    { 
      id: "peminjaman", 
      label: "Peminjaman", 
      icon: BookMarked,
      subItems: [
        { id: "peminjaman-aktif", label: "Peminjaman Aktif", path: "/peminjaman/aktif" },
        { id: "pengembalian", label: "Pengembalian", path: "/peminjaman/pengembalian" },
        { id: "jatuh-tempo", label: "Jatuh Tempo", path: "/peminjaman/jatuh-tempo" },
      ]
    },
    { id: "upload-artikel", label: "Upload Artikel", icon: Upload, path: "/upload-artikel" },
    { 
      id: "presensi", 
      label: "Presensi", 
      icon: ClipboardCheck,
      subItems: [
        { id: "data-presensi", label: "Data Presensi", path: "/presensi/data" },
        { id: "scan-barcode", label: "Scan Barcode", path: "/presensi/scan-barcode" },
      ]
    },
  ]

  const isSubItemActive = (subItems?: SubMenuItem[]) => {
    if (!subItems) return false;
    return subItems.some(item => location.pathname === item.path);
  }

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  }

  return (
    <div className="w-52 bg-white border border-gray-200 shadow-md rounded-lg flex flex-col fixed left-0 top-[60px] bottom-0 z-40 m-0">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <Avatar className="w-16 h-16 mb-4">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
              alt="Dinda Desfira"
            />
            <AvatarFallback>DD</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-gray-900">Dinda Desfira</h3>
          <p className="text-sm text-gray-500">Administrator</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isOpen = openDropdown === item.id;
            const isParentActive = isSubItemActive(item.subItems);

            if (hasSubItems) {
              return (
                <li key={item.id}>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      isParentActive || isOpen ? "bg-[#BE4139] text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                    />
                  </button>
                  {/* Dropdown Sub-items - Below the button */}
                  {isOpen && (
                    <ul className="mt-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      {item.subItems?.map((subItem) => (
                        <li key={subItem.id}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 transition-colors text-sm border-b border-gray-100 last:border-b-0 ${
                                isActive 
                                  ? "text-[#BE4139] font-semibold bg-red-50" 
                                  : "text-gray-600 hover:bg-gray-50"
                              }`
                            }
                          >
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path || "/"}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive ? "bg-[#BE4139] text-white" : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar;
