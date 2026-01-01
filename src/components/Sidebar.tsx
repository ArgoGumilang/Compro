import { useState, useEffect } from "react"
import { LayoutGrid, Users, BookOpen, BookMarked, ChevronDown, ClipboardCheck } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

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
  
  const [userName, setUserName] = useState<string>('User');
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    // Get user data from localStorage
    const userStr = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.full_name || user.username || 'User');
        setUserRole(user.role?.name || role || '');
      } catch (err) {
        console.error('Failed to parse user data:', err);
      }
    }
  }, []);

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
    <div className="w-52 bg-gradient-to-b from-white to-red-50/30 border-r-2 border-[#BE4139]/20 shadow-xl flex flex-col fixed left-0 top-[60px] bottom-0 z-40 m-0">
      {/* User Profile Section */}
      <div className="p-6 border-b-2 border-[#BE4139]/20 bg-gradient-to-br from-[#BE4139]/5 to-orange-100/30">
        <div className="flex flex-col items-center">
          <h3 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#BE4139] to-[#d94d43]">{userName}</h3>
          {userRole && <p className="text-xs text-[#BE4139] font-semibold mt-1 capitalize">{userRole}</p>}
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
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      isParentActive || isOpen ? "bg-gradient-to-r from-[#BE4139] to-[#d94d43] text-white shadow-lg" : "text-gray-700 hover:bg-gradient-to-r hover:from-[#BE4139]/10 hover:to-orange-100/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-bold">{item.label}</span>
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                    />
                  </button>
                  {/* Dropdown Sub-items - Below the button */}
                  {isOpen && (
                    <ul className="mt-1 bg-white border-2 border-[#BE4139]/20 rounded-xl shadow-md overflow-hidden">
                      {item.subItems?.map((subItem) => (
                        <li key={subItem.id}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 transition-all duration-300 text-sm border-b border-[#BE4139]/10 last:border-b-0 ${
                                isActive 
                                  ? "text-white bg-gradient-to-r from-[#BE4139] to-[#d94d43] font-bold" 
                                  : "text-gray-600 hover:bg-gradient-to-r hover:from-[#BE4139]/5 hover:to-orange-50 font-semibold"
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
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      isActive ? "bg-gradient-to-r from-[#BE4139] to-[#d94d43] text-white shadow-lg" : "text-gray-700 hover:bg-gradient-to-r hover:from-[#BE4139]/10 hover:to-orange-100/50"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span className="font-bold">{item.label}</span>
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
