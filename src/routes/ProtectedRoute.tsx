import { Navigate } from "react-router-dom";
import React from "react";

interface Props {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'member'; // admin untuk admin saja, member untuk guru/siswa
}

const ProtectedRoute: React.FC<Props> = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada requirement role
  if (requiredRole) {
    const userStr = localStorage.getItem("user");
    console.log("🔐 ProtectedRoute check - Required role:", requiredRole);
    console.log("🔐 User data from localStorage:", userStr?.substring(0, 100) + "...");
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const userRole = user.role?.name?.toLowerCase() || '';
        console.log("🔐 Current user role:", userRole);
        
        // Jika butuh admin tapi bukan admin
        if (requiredRole === 'admin' && userRole !== 'admin') {
          console.log("❌ Access denied! Admin required but user is:", userRole);
          console.log("🔀 Redirecting to /dashanggota");
          return <Navigate to="/dashanggota" replace />;
        }
        
        // Jika butuh member tapi ternyata admin
        if (requiredRole === 'member' && userRole === 'admin') {
          console.log("❌ Access denied! Member page but user is admin");
          console.log("🔀 Redirecting to /");
          return <Navigate to="/" replace />;
        }
        
        console.log("✅ Access granted!");
      } catch (err) {
        console.error('Failed to parse user:', err);
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
