// Helper untuk fetch cover buku dari backend
import { getBookCover, API_BASE_URL } from "./api";

// Import local covers sebagai fallback
import sadCover from "../assets/covers/sad.jpg";
import ayahkuCover from "../assets/covers/ayahkubukanpembohong.jpg";
import cobaCover from "../assets/covers/coba.jpg";
import leviathanCover from "../assets/covers/leviathan.jpg";
import laskarCover from "../assets/covers/laskar pelangi.jpg";

// Cover mapping lokal sebagai fallback
const localCoverMapping: { [key: string]: string } = {
  'sad': sadCover,
  'ayahku bukan pembohong': ayahkuCover,
  'ayahkubukanpembohong': ayahkuCover,
  'ayah ku bukan pembohong': ayahkuCover,
  'coba': cobaCover,
  'leviathan': leviathanCover,
  'laskar pelangi': laskarCover,
};

// Placeholder SVG untuk buku tanpa cover
const placeholderCover = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect width="300" height="400" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%23999"%3EBook Cover%3C/text%3E%3C/svg%3E';

/**
 * Fetch cover URL untuk buku dari backend API
 * Dengan fallback ke local cover mapping dan placeholder
 * 
 * @param bookId - ID buku
 * @param bookTitle - Title buku (opsional, untuk fallback ke local mapping)
 * @returns Promise<string> - URL cover image
 */
export async function fetchBookCover(bookId: string | number, bookTitle?: string): Promise<string> {
  try {
    // Coba fetch dari backend
    console.log(`🖼️ Fetching cover for book ID: ${bookId}`);
    const coverResponse = await getBookCover(bookId);
    
    if (coverResponse.cover_path) {
      const coverUrl = `${API_BASE_URL}${coverResponse.cover_path}`;
      console.log(`✅ Backend cover found: ${coverUrl}`);
      return coverUrl;
    }
  } catch (err) {
    console.log(`⚠️ Failed to fetch cover from backend for book ${bookId}:`, err);
  }
  
  // Fallback: cari di local cover mapping berdasarkan title
  if (bookTitle) {
    const titleLower = bookTitle.toLowerCase().trim().replace(/\s+/g, ' ');
    const localCover = localCoverMapping[titleLower];
    
    if (localCover) {
      console.log(`✅ Using local cover mapping for: ${bookTitle}`);
      return localCover;
    }
  }
  
  // Fallback terakhir: placeholder
  console.log(`📦 Using placeholder cover for book ${bookId}`);
  return placeholderCover;
}

/**
 * Batch fetch covers untuk multiple books
 * Menambahkan cover_url ke setiap book object
 * 
 * @param books - Array of book objects
 * @returns Promise<Array> - Books dengan cover_url ditambahkan
 */
export async function enrichBooksWithCovers(books: any[]): Promise<any[]> {
  if (!books || books.length === 0) {
    return books;
  }
  
  console.log(`📚 Enriching ${books.length} books with covers...`);
  
  // Fetch covers in parallel untuk performa lebih baik
  const enrichedBooks = await Promise.all(
    books.map(async (book) => {
      const coverUrl = await fetchBookCover(book.id, book.title);
      return {
        ...book,
        cover: coverUrl,
        cover_url: coverUrl,
      };
    })
  );
  
  console.log(`✅ Successfully enriched ${enrichedBooks.length} books with covers`);
  return enrichedBooks;
}

export { placeholderCover, localCoverMapping };
