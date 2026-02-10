// Helper function to convert server path to accessible URL
import { API_BASE_URL } from "./api";

/**
 * Converts server file path to accessible URL
 * Example: "/var/www/uploads/sad_15.jpeg" -> "http://localhost:3000/uploads/sad_15.jpeg"
 * 
 * @param path - Server path from backend (e.g., "/var/www/uploads/filename.jpg")
 * @returns Accessible URL or original path if already a URL
 */
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  
  // If already a full URL (starts with http:// or https://), return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If it's a server path (e.g., /var/www/uploads/filename.jpg)
  // Extract the filename and construct URL
  if (path.includes('/uploads/')) {
    // Extract everything after /uploads/
    const uploadsIndex = path.indexOf('/uploads/');
    const relativePath = path.substring(uploadsIndex);
    return `${API_BASE_URL}${relativePath}`;
  }
  
  // If path starts with /uploads/, use it directly
  if (path.startsWith('/uploads/')) {
    return `${API_BASE_URL}${path}`;
  }
  
  // If it's a relative path, prepend API_BASE_URL
  if (path.startsWith('/')) {
    return `${API_BASE_URL}${path}`;
  }
  
  // Return as is if none of the above conditions match
  return path;
}

/**
 * Gets book cover URL with fallback to placeholder
 */
export function getBookCoverUrl(cover: string | null | undefined, coverUrl: string | null | undefined): string {
  const url = getImageUrl(cover || coverUrl);
  
  if (url) return url;
  
  // Return SVG placeholder if no cover available
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='18' fill='%239ca3af'%3EBook Cover%3C/text%3E%3C/svg%3E";
}

export function enrichBooksWithCovers(books: any[]) {
  if (!Array.isArray(books)) return [];

  return books.map((book) => {
    const coverUrl = getBookCoverUrl(book.cover, book.cover_url);
    return {
      ...book,
      cover_url: coverUrl,
    };
  });
}
