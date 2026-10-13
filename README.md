# Kopi Vendra — Kedai Kopi Rumahan di Bandung

Tautan Kopi Vendra, kedai kopi rumahan di Bandung: status buka menurut jam WIB, menu lengkap, pre-order ambil di kedai dengan jam pilihan, dan kopi untuk acara.

**Demo live:** https://linkinbio-vendra.vercel.app

![Tangkapan layar Kopi Vendra](public/og.jpg)

> Template link-in-bio dengan persona fiktif. Akun, klien, harga, dan jadwal hanya contoh; tautan utama menuju halaman dalam yang benar-benar ada, dan formulir tidak mengirim data.

## Konsep

Persona Kopi Vendra, kedai kopi. Tampil seperti etalase toko: status buka/tutup mengikuti jam, grid menu berharga, tombol GoFood dan WhatsApp, serta animasi uap kopi.

## Halaman

- `/` — papan nama kedai dengan uap kopi, status buka/tutup menurut WIB, empat menu favorit, tombol pesan
- `/menu` — menu lengkap 14 item per kategori, lokasi, jam buka per hari
- `/pesan` — pre-order dengan jumlah, jam ambil, total; permintaan kopi untuk acara

## Teknologi

- Next.js 15.5 (App Router) dan React 19
- Tailwind CSS v4
- JavaScript
- Lucide (ikon)
- Font: DM Serif Display, Plus Jakarta Sans (next/font)
- SEO: metadata per halaman, Open Graph, JSON-LD, sitemap.xml, dan robots.txt

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Untuk build produksi: `npm run build` lalu `npm start`.

---

Bagian dari koleksi 12 template link-in-bio di [PortalBio](https://www.pintuweb.id/link-in-bio). Dibuat oleh [PintuWeb](https://www.pintuweb.id), jasa pembuatan website.
