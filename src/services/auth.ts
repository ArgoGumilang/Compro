// Auth Service
import { 
  login as apiLogin, 
  logout as apiLogout, 
  getCurrentUser,
  setTokens,
  clearTokens 
} from "../lib/api";

export const loginWithCookies = async (
  username: string,
  password: string
): Promise<any> => {
  try {
    const response = await apiLogin(username, password);
    
    console.log("📥 Backend response:", response);
    
    // Simpan tokens jika ada di response
    if (response.accessToken || response.access_token) {
      const accessToken = response.accessToken || response.access_token;
      const refreshToken = response.refreshToken || response.refresh_token;
      setTokens(accessToken, refreshToken);
      console.log("✅ Tokens saved from login response");
    }
    
    // Backend langsung return user object
    return response;
  } catch (error: any) {
    throw new Error(error.message || "Login gagal");
  }
};

export const logoutWithCookies = async (): Promise<void> => {
  try {
    await apiLogout();
    clearTokens();
  } catch (error: any) {
    clearTokens();
    throw new Error(error.message || "Logout gagal");
  }
};

export const checkAuth = async () => {
  try {
    const response = await getCurrentUser();
    return response;
  } catch (error) {
    throw new Error("Not authenticated");
  }
};

// ==================== LEGACY (untuk backward compatibility) ====================

export const fakeLoginApi = async (
  username: string,
  password: string
) => {
  return new Promise<{ token: string; role: string }>((resolve, reject) => {
    setTimeout(() => {
      // ADMIN
      if (username === "admin" && password === "admin123") {
        resolve({
          token: "fake-jwt-admin",
          role: "Administrator",
        });
        return;
      }

      // ANGGOTA
      if (username === "anggota" && password === "anggota123") {
        resolve({
          token: "fake-jwt-anggota",
          role: "Anggota",
        });
        return;
      }

      reject(new Error("Username atau password salah"));
    }, 1000);
  });
};
