# Pekarangan Institute — Versi HTML (Final Project, Nomer 1)

Konversi redesign Figma **"Pekarangan Institute"** (halaman **Notion - Risky**, bagian Rizky)
menjadi situs HTML statis. Tugas Final Project DESAIN UI/UX GOL B — Eka Yuniar, POLIJE.
Deadline pengumpulan: **29 Nov 2026, 23:59 WIB**.

## Cara membuka

Tidak butuh server atau build step. Cukup buka file `index.html` di browser
(double-click), atau jalankan server statis apa pun dari folder ini, misalnya:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Halaman

| File | Halaman Figma |
| --- | --- |
| `index.html` | Beranda · Desktop |
| `katalog.html` | Katalog Produk · Desktop |
| `program-donasi.html` | Program Donasi · Desktop |
| `formulir-donasi.html` | Formulir Donasi · Desktop |
| `laporan.html` | Laporan Transparansi Dana · Desktop |
| `tentang.html` | Tentang Kami · Desktop |

Aset bersama: `assets/css/style.css` (satu stylesheet, font Poppins dari Google Fonts)
dan `assets/js/main.js` (interaksi sisi klien, tanpa backend).

## Interaksi yang berfungsi

- **Menu mobile** (hamburger) di lebar layar kecil; grid 3 kolom menjadi 1 kolom.
- **Katalog:** pencarian teks memfilter kartu produk; filter kategori
  (Kriya / Tekstil / Rumah & kesehatan / Pangan); urutan Nama A–Z / Z–A.
- **Program donasi:** pencarian program; FAQ accordion (klik pertanyaan untuk membuka jawaban).
- **Formulir donasi:** klik preset nominal atau ketik nominal sendiri → ringkasan
  (Kontribusi + Total pembayaran) ikut berubah. Tombol **Donasi** nonaktif sampai
  checkbox persetujuan dicentang. Submit hanya menampilkan pesan demo — **tidak ada
  pembayaran nyata yang diproses**, sesuai catatan di Figma.
- **Laporan:** dropdown Pencatatan memfilter baris ledger (Penerimaan / Penyaluran).
  Tombol "Unduh laporan PDF" dan "Ekspor donasi" menampilkan pesan demo.

## Catatan kesetiaan terhadap Figma

1. **Semua teks mengikuti Figma apa adanya**, termasuk placeholder
   `[Nama UMKM]`, `[Daerah asal]`, `Rp. X.XXX` / `Rp. X.XXX.XXX`, dan label
   `[Foto ...]`. Tidak ada angka, nama, atau produk yang dikarang.
2. **Foto placeholder** berupa kotak abu-abu berlabel persis seperti Figma,
   lengkap dengan badge **DATA DEMO**. Tidak dipakai gambar stok/AI.
3. **Header 5-link di semua halaman** (Beranda, Katalog, Program, Transparansi,
   Tentang Kami). Di Figma, header Beranda hanya menampilkan 4 link tanpa
   "Transparansi" dan tanpa ikon keranjang — diseragamkan demi navigasi antar
   halaman yang berfungsi. Ini satu-satunya penyimpangan sadar dari Figma.
4. **Kalimat footer diselesaikan.** Akhir kalimat disclaimer di Figma tidak
   terbaca penuh pada screenshot ("...bukan publikasi atau klaim resmi yang …").
   Di HTML ditulis: "Pekarangan Institute · Konsep platform kewirausahaan sosial.
   Seluruh konten, data, dan foto adalah placeholder, bukan publikasi atau klaim resmi."
5. **Preset nominal donasi.** Label preset di Figma tertulis "Rp. XX.XXX" (dua kali)
   dan "Lainnya". Label tersebut dipertahankan apa adanya; di baliknya, dua preset
   memakai nilai demo Rp25.000 dan Rp50.000 agar ringkasan bisa berubah saat diklik.
   Mengetik nominal sendiri selalu mengesampingkan preset.
6. **Biaya pembayaran** di ringkasan tetap tertulis "Rp. X.XXX" sesuai Figma,
   sehingga Total pembayaran mengikuti nominal kontribusi yang dimasukkan.
7. Link footer **Ruang yang Aman** (Kebijakan privasi, Syarat layanan, Pusat
   bantuan, Aksesibilitas) dan tombol "Hubungi Pekarangan" mengarah ke `#`
   karena halaman-halaman tersebut tidak ada di Figma bagian ini.
