# 🎭 Panduan Penggunaan Dummy Data untuk Demo/Iklan

## 📝 Ringkasan

Aplikasi perpustakaan sekarang dilengkapi dengan **data dummy yang lengkap dan menarik** untuk keperluan pembuatan iklan dan demo. Data dummy ini mencakup:

- ✅ **Dashboard Admin** - Statistik lengkap dengan grafik
- ✅ **Dashboard User** - Tampilan untuk anggota perpustakaan
- ✅ **Manajemen Buku** - 15 buku dengan cover image yang menarik
- ✅ **Data Peminjaman** - History peminjaman aktif dan selesai
- ✅ **Data Pengembalian** - Riwayat pengembalian buku
- ✅ **Data Jatuh Tempo** - Buku yang akan/sudah jatuh tempo
- ✅ **Data Presensi** - Kunjungan perpustakaan
- ✅ **Data Anggota** - 7 user (6 siswa + 1 admin)

## 🎨 Cover Buku

Semua buku dummy dilengkapi dengan **cover image berkualitas tinggi** dari Unsplash yang relevan dengan kategori bukunya:

- Matematika - gambar grafik dan angka
- Fisika - ilustrasi sains
- Kimia - molekul dan lab
- Novel - desain buku menarik
- Dan lain-lain

## 🚀 Cara Mengaktifkan Dummy Data

### Mode 1: Aktif (Untuk Demo/Iklan) ⭐

**File:** `src/lib/dummyData.ts` (baris terakhir)

```typescript
export const USE_DUMMY_DATA = true;  // ✅ Gunakan dummy data
```

Dengan setting ini:
- ✅ Data langsung muncul tanpa perlu backend
- ✅ Cover buku otomatis tampil
- ✅ Dashboard penuh dengan data menarik
- ✅ Grafik terisi otomatis
- ✅ Cocok untuk screenshot dan video promosi

### Mode 2: Nonaktif (Production)

```typescript
export const USE_DUMMY_DATA = false;  // ❌ Gunakan data real dari backend
```

## 📊 Data yang Tersedia

### 1. Buku (15 Items)
- Matematika untuk SMA Kelas XI
- Fisika Modern untuk Pemula
- Kimia Organik Dasar
- Biologi Molekuler
- Sejarah Indonesia Modern
- Geografi dan Lingkungan
- Ekonomi Makro & Mikro
- Bahasa Inggris Advanced
- Pendidikan Kewarganegaraan
- Informatika dan Pemrograman
- Laskar Pelangi (Novel)
- Bumi Manusia (Novel)
- Seni Budaya Nusantara
- Olahraga dan Kesehatan
- Ensiklopedia Dunia

### 2. Users (7 Items)
- Andi Prasetya (XI IPA 1)
- Siti Rahmawati (XI IPA 2)
- Budi Santoso (XI IPS 1)
- Dewi Lestari (XII IPA 1)
- Rizki Aditya (XII IPA 2)
- Maya Anggraini (X IPA 1)
- Administrator (Admin)

### 3. Peminjaman (12 Items)
- 5 buku sedang dipinjam
- 7 buku sudah dikembalikan
- Lengkap dengan tanggal dan status

### 4. Kunjungan (15 Items)
- Data kunjungan 2 minggu terakhir
- Untuk grafik dashboard

## 🎬 Tips untuk Membuat Iklan

### 1. Dashboard Admin
- Buka `/dashboard`
- Screenshot statistik cards (Total Buku, Dipinjam, Anggota)
- Capture grafik peminjaman dan kunjungan
- Gunakan filter perhari/perbulan/pertahun untuk variasi

### 2. Manajemen Buku
- Buka `/manajemen-buku`
- Tampilkan tabel buku yang rapi
- Click "Detail" untuk melihat cover buku fullsize
- Screenshot halaman detail buku

### 3. Dashboard User
- Buka `/dashanggota`
- Screenshot section "Rekomendasi Untukmu"
- Cover buku tampil otomatis dan menarik
- FAQ section juga bisa di-capture

### 4. Kategori & Jelajahi
- Buka `/kategori` atau `/jelajahi`
- Tampilan grid buku dengan cover
- Filter berdasarkan kategori

## 🎨 Warna & Branding

Aplikasi menggunakan warna **#BE4139** (merah SMA Telkom) sebagai warna utama. Pastikan screenshot menampilkan:
- ✅ Header dengan logo "SMA TELKOM BANDUNG"
- ✅ Card dengan border merah
- ✅ Button merah yang eye-catching
- ✅ Grafik dengan warna koordinasi

## 📱 Responsive Design

Dummy data bekerja di semua ukuran layar:
- Desktop (recommended untuk screenshot)
- Tablet
- Mobile

## 🔧 Customisasi Data

Untuk mengedit dummy data, buka file:
```
src/lib/dummyData.ts
```

Anda bisa:
- Menambah/mengurangi buku
- Mengubah cover image URL
- Menambah user
- Modifikasi history peminjaman

### Contoh Mengganti Cover Buku:

```typescript
{
  id: 1,
  title: "Matematika untuk SMA Kelas XI",
  cover_url: "https://images.unsplash.com/photo-XXXXX", // Ganti URL ini
  // ... field lainnya
}
```

## 🎯 Checklist untuk Pembuatan Iklan

- [ ] Aktifkan `USE_DUMMY_DATA = true`
- [ ] Refresh browser
- [ ] Screenshot Dashboard Admin
- [ ] Screenshot Manajemen Buku (dengan cover)
- [ ] Screenshot Dashboard User
- [ ] Screenshot Detail Buku
- [ ] Screenshot Grafik Peminjaman
- [ ] Screenshot Kategori
- [ ] Capture video navigasi antar halaman
- [ ] Test di berbagai resolusi layar
- [ ] Kembalikan ke `USE_DUMMY_DATA = false` setelah selesai

## 📸 Rekomendasi Tool Screenshot

- Windows: Snipping Tool, ShareX
- Mac: Command + Shift + 4
- Chrome: DevTools Device Toolbar untuk preview mobile
- Browser Extension: GoFullPage (untuk full page screenshot)

## 🌟 Fitur Unggulan untuk Dipromosikan

1. **Cover Buku Menarik** - Visual yang eye-catching
2. **Dashboard Interaktif** - Grafik dinamis dengan filter
3. **UI Modern** - Design clean dengan animasi smooth
4. **Responsive** - Bekerja di semua device
5. **Search & Filter** - Mudah mencari buku
6. **Status Real-time** - Tracking peminjaman dan jatuh tempo

## ❓ Troubleshooting

### Data tidak muncul?
1. Check console browser (F12)
2. Pastikan `USE_DUMMY_DATA = true`
3. Clear cache dan refresh

### Cover image tidak muncul?
1. Check koneksi internet
2. URL image mungkin expired, ganti dengan URL baru dari unsplash.com

### Grafik kosong?
- Grafik akan otomatis terisi dari DUMMY_BOOKING_HISTORIES dan DUMMY_VISIT_HISTORIES

---

**Happy Marketing! 🚀📚**

Jika ada pertanyaan atau butuh customisasi lebih lanjut, silakan hubungi developer.
