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
  console.log("🔑 Access token exists:", !!accessToken);
  if (accessToken) {
    console.log("🔑 Token preview:", accessToken.substring(0, 20) + "...");
  }
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
    console.log("🔑 Authorization header set");
  }
  
  console.log("📤 Request headers:", headers);
  
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
  const fullUrl = `${API_BASE_URL}/login`;
  
  const body = { 
    username: username.trim(), 
    password: password.trim() 
  };
  
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }
      throw new Error(errorData.error || errorData.message || "Login gagal");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error;
  }
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

// ==================== ROLES API ====================

// GET /roles
export async function getAllRoles() {
  return fetchWithCredentials("/roles", {
    method: "GET",
  });
}

// GET /roles/{id}
export async function getRoleById(id: string | number) {
  return fetchWithCredentials(`/roles/${id}`, {
    method: "GET",
  });
}

// ==================== VISIT HISTORIES API ====================

// GET /visit_hists
export async function getAllVisitHists() {
  return fetchWithCredentials("/visit_hists", {
    method: "GET",
  });
}

// GET /visit_hists/user/{user_id}
export async function getVisitHistsByUser(userId: string | number) {
  return fetchWithCredentials(`/visit_hists/user/${userId}`, {
    method: "GET",
  });
}

// POST /visit_hists
export async function createVisitHist(data: any) {
  return fetchWithCredentials("/visit_hists", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ==================== BOOKS API ====================

// GET /books
export async function getAllBooks() {
  return fetchWithCredentials("/books", {
    method: "GET",
  });
}

// GET /books/{id}
export async function getBookById(id: string | number) {
  return fetchWithCredentials(`/books/${id}`, {
    method: "GET",
  });
}

// POST /books
export async function createBook(data: any) {
  return fetchWithCredentials("/books", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT /books/{id}
export async function updateBook(id: string | number, data: any) {
  return fetchWithCredentials(`/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE /books/{id}
export async function deleteBook(id: string | number) {
  return fetchWithCredentials(`/books/${id}`, {
    method: "DELETE",
  });
}

// ==================== AUTHORS API ====================

// GET /authors
export async function getAllAuthors() {
  return fetchWithCredentials("/authors", {
    method: "GET",
  });
}

// GET /authors/{id}
export async function getAuthorById(id: string | number) {
  return fetchWithCredentials(`/authors/${id}`, {
    method: "GET",
  });
}

// POST /authors
export async function createAuthor(data: any) {
  return fetchWithCredentials("/authors", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT /authors/{id}
export async function updateAuthor(id: string | number, data: any) {
  return fetchWithCredentials(`/authors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE /authors/{id}
export async function deleteAuthor(id: string | number) {
  return fetchWithCredentials(`/authors/${id}`, {
    method: "DELETE",
  });
}

// ==================== PUBLISHERS API ====================

// GET /publishers
export async function getAllPublishers() {
  return fetchWithCredentials("/publishers", {
    method: "GET",
  });
}

// GET /publishers/{id}
export async function getPublisherById(id: string | number) {
  return fetchWithCredentials(`/publishers/${id}`, {
    method: "GET",
  });
}

// POST /publishers
export async function createPublisher(data: any) {
  return fetchWithCredentials("/publishers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT /publishers/{id}
export async function updatePublisher(id: string | number, data: any) {
  return fetchWithCredentials(`/publishers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE /publishers/{id}
export async function deletePublisher(id: string | number) {
  return fetchWithCredentials(`/publishers/${id}`, {
    method: "DELETE",
  });
}

// ==================== CATEGORIES API ====================

// GET /categories
export async function getAllCategories() {
  return fetchWithCredentials("/categories", {
    method: "GET",
  });
}

// GET /categories/{id}
export async function getCategoryById(id: string | number) {
  return fetchWithCredentials(`/categories/${id}`, {
    method: "GET",
  });
}

// POST /categories
export async function createCategory(data: any) {
  return fetchWithCredentials("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT /categories/{id}
export async function updateCategory(id: string | number, data: any) {
  return fetchWithCredentials(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE /categories/{id}
export async function deleteCategory(id: string | number) {
  return fetchWithCredentials(`/categories/${id}`, {
    method: "DELETE",
  });
}

// ==================== SUB CATEGORIES API ====================

// GET /sub_categories
export async function getAllSubCategories() {
  return fetchWithCredentials("/sub_categories", {
    method: "GET",
  });
}

// GET /sub_categories/{id}
export async function getSubCategoryById(id: string | number) {
  return fetchWithCredentials(`/sub_categories/${id}`, {
    method: "GET",
  });
}

// POST /sub_categories
export async function createSubCategory(data: any) {
  return fetchWithCredentials("/sub_categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT /sub_categories/{id}
export async function updateSubCategory(id: string | number, data: any) {
  return fetchWithCredentials(`/sub_categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE /sub_categories/{id}
export async function deleteSubCategory(id: string | number) {
  return fetchWithCredentials(`/sub_categories/${id}`, {
    method: "DELETE",
  });
}

// ==================== BOOKING HISTORIES API ====================

// GET /booking_histories
export async function getAllBookingHistories() {
  return fetchWithCredentials("/booking_histories", {
    method: "GET",
  });
}

// GET /booking_histories/{id}
export async function getBookingHistoryById(id: string | number) {
  return fetchWithCredentials(`/booking_histories/${id}`, {
    method: "GET",
  });
}

// GET /booking_histories/user/{user_id}
export async function getBookingHistoriesByUser(userId: string | number) {
  return fetchWithCredentials(`/booking_histories/user/${userId}`, {
    method: "GET",
  });
}

// POST /booking_histories
export async function createBookingHistory(data: any) {
  return fetchWithCredentials("/booking_histories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT /booking_histories/{id}
export async function updateBookingHistory(id: string | number, data: any) {
  return fetchWithCredentials(`/booking_histories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE /booking_histories/{id}
export async function deleteBookingHistory(id: string | number) {
  return fetchWithCredentials(`/booking_histories/${id}`, {
    method: "DELETE",
  });
}

// ==================== AUTH EXTRAS ====================

// POST /refresh_token
export async function refreshToken() {
  return fetchWithCredentials("/refresh_token", {
    method: "POST",
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
