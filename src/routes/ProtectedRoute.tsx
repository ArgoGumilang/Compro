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
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const userRole = user.role?.name?.toLowerCase() || '';
        
        // Jika butuh admin tapi bukan admin
        if (requiredRole === 'admin' && userRole !== 'admin') {
          return <Navigate to="/dashanggota" replace />;
        }
        
        // Jika butuh member tapi ternyata admin
        if (requiredRole === 'member' && userRole === 'admin') {
          return <Navigate to="/" replace />;
        }
      } catch (err) {
        console.error('Failed to parse user:', err);
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
