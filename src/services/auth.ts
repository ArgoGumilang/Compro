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
    
    // Simpan tokens jika ada
    if (response.accessToken || response.access_token) {
      setTokens(
        response.accessToken || response.access_token,
        response.refreshToken || response.refresh_token
      );
    }
    
    // Return user data TANPA override role
    console.log("🔍 Auth service - Raw response:", response);
    console.log("🔍 Auth service - Role from backend:", response.role);
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
