## 🎭 QUICK TOGGLE - Dummy Data untuk Demo/Iklan

### ⚡ CARA CEPAT AKTIFKAN DUMMY DATA

**1. Buka file:** `src/lib/dummyData.ts`

**2. Scroll ke baris paling bawah**

**3. Ubah nilai:**

```typescript
// UNTUK DEMO/IKLAN (Tampilkan data menarik)
export const USE_DUMMY_DATA = true;  ✅

// UNTUK PRODUCTION (Gunakan backend real)
export const USE_DUMMY_DATA = false; ❌
```

**4. Save file & Refresh browser**

### 🎯 Apa yang Berubah?

| Feature | Dummy Data ON | Dummy Data OFF |
|---------|---------------|----------------|
| Dashboard | ✅ Data terisi penuh | ❌ Perlu backend |
| Buku dengan Cover | ✅ 15 buku + cover | ❌ Perlu backend |
| Grafik | ✅ Auto terisi | ❌ Perlu backend |
| Peminjaman | ✅ 12 history | ❌ Perlu backend |
| User | ✅ 7 anggota | ❌ Perlu backend |

### 📸 Halaman untuk Screenshot Marketing

1. `/dashboard` - Admin Dashboard dengan statistik
2. `/manajemen-buku` - Tabel buku dengan cover menarik
3. `/manajemen-buku/detail?id=1` - Detail buku dengan cover image ✨
4. `/dashanggota` - User Dashboard dengan rekomendasi
5. `/detailbuku?id=1` - Detail buku view user dengan cover ✨
6. `/pinjamansaya` - Pinjaman aktif user dengan cover buku ✨
7. `/kategori` - Grid kategori buku
8. `/jelajahi` - Explore buku

### 🎨 Data Dummy Includes:

- **15 Buku** dengan cover image Unsplash berkualitas
- **7 Users** (6 siswa + 1 admin)
- **12 Peminjaman** (aktif & selesai)
- **15 Kunjungan** untuk grafik
- **8 Pengembalian** dengan detail
- **10 Jatuh Tempo** untuk monitoring

### ⚠️ PENTING!

**Jangan lupa kembalikan ke `false` setelah selesai demo/marketing!**

---

Need more info? Check `DUMMY_DATA_README.md` untuk dokumentasi lengkap.
