// API Configuration
// src/lib/api.ts

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

console.log("🔗 API Base URL:", API_BASE_URL);

// Token Management
export const TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken?: string) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  console.log("✅ Tokens saved to localStorage");
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  console.log("🗑️ Tokens cleared from localStorage");
}

// Helper function untuk fetch dengan credentials
async function fetchWithCredentials(url: string, options: RequestInit = {}) {
  const fullUrl = `${API_BASE_URL}${url}`;
  console.log("📡 Fetching:", fullUrl);
  
  const accessToken = getAccessToken();
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
    console.log("🔑 Using access token");
  }
  
  try {
    const response = await fetch(fullUrl, {
      ...options,
      credentials: "include",
      headers,
    });

    console.log("✅ Response status:", response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Request failed" }));
      console.error("❌ Response error:", error);
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("📦 Response data:", data);
    return data;
  } catch (error: any) {
    console.error("🔴 Fetch error:", error);
    throw error;
  }
}

// ==================== AUTH API ====================

export async function login(username: string, password: string) {
  return fetchWithCredentials("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function logout() {
  return fetchWithCredentials("/logout", {
    method: "POST",
  });
}

export async function getCurrentUser() {
  return fetchWithCredentials("/checkLogin", {
    method: "GET",
  });
}

// ==================== USERS API ====================

// GET /users - Get all users
export async function getAllUsers() {
  return fetchWithCredentials("/users", {
    method: "GET",
  });
}

// GET /users/{id} - Get user by ID
export async function getUserById(id: string | number) {
  return fetchWithCredentials(`/users/${id}`, {
    method: "GET",
  });
}

// POST /users - Create new user
export async function createUser(data: any) {
  return fetchWithCredentials("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT /users/{id} - Update user
export async function updateUser(id: string | number, data: any) {
  return fetchWithCredentials(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE /users/{id} - Delete user
export async function deleteUser(id: string | number) {
  return fetchWithCredentials(`/users/${id}`, {
    method: "DELETE",
  });
}

// ==================== LEGACY FUNCTIONS ====================

export async function checkIn({ photo, role }: { photo: File; role?: "siswa" | "guru" }) {
  console.log("checkIn called", { photo, role });
  return { late_minutes: 0 };
}

export async function getUserByBarcode(barcode: string) {
  const res = await fetch(`/api/users/barcode/${barcode}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

export async function getMyProjects() {
  return [
    { id: 1, name: "Guru", role: "Guru" },
    { id: 2, name: "Siswa", role: "Siswa" }
  ];
}
