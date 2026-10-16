/* Kopi Vendra — kedai kopi rumahan di Bandung (fiktif). Satu sumber isi untuk
   halaman tautan, menu, dan pre-order. Harga dan alamat adalah contoh. */

export const SITE = 'https://linkinbio-vendra.pintuweb.id';
export const rp = (n) => `Rp ${n.toLocaleString('id-ID')}`;

export const KEDAI = {
  nama: 'Kopi Vendra',
  alamat: 'Jl. Melati No. 5, Bandung (alamat contoh)',
  handle: '@kopivendra',
};

export const JAM = [['Senin–Jumat', '08.00–22.00'], ['Sabtu', '08.00–23.00'], ['Minggu', '09.00–21.00']];

// Jam buka per hari (0 = Minggu … 6 = Sabtu), dalam jam WIB.
export const jamBuka = (hari) => (hari === 0 ? [9, 21] : hari === 6 ? [8, 23] : [8, 22]);
const dua = (n) => String(n).padStart(2, '0');
export const fmtMenit = (m) => `${dua(Math.floor(m / 60))}.${dua(m % 60)}`;

/** Waktu dinding WIB saat ini: { hari (0–6), menit sejak 00.00 }. */
export function kiniWIB(d = new Date()) {
  const wib = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  return { hari: wib.getDay(), menit: wib.getHours() * 60 + wib.getMinutes() };
}

/** Status kedai menurut jam WIB, beserta kapan berikutnya buka/tutup. */
export function statusKedai(k = kiniWIB()) {
  const [a, b] = jamBuka(k.hari);
  if (k.menit >= a * 60 && k.menit < b * 60) return { buka: true, teks: `Buka sampai ${dua(b)}.00 WIB` };
  if (k.menit < a * 60) return { buka: false, teks: `Buka pukul ${dua(a)}.00 WIB` };
  return { buka: false, teks: `Buka besok ${dua(jamBuka((k.hari + 1) % 7)[0])}.00 WIB` };
}

/** Jam ambil pre-order tiap 15 menit, mulai 15 menit setelah buka sampai 15 menit sebelum tutup. */
export function slotAmbil(hari, mulai = 0) {
  const [a, b] = jamBuka(hari);
  const out = [];
  for (let m = a * 60 + 15; m <= b * 60 - 15; m += 15) if (m >= mulai) out.push(fmtMenit(m));
  return out;
}

export const LINKS = [
  { ikon: 'pesan', label: 'Pre-order, ambil di kedai', sub: 'Pilih jam ambil, tanpa antre', href: '/pesan', utama: true },
  { ikon: 'menu', label: 'Menu lengkap', sub: '14 menu, kopi sampai kudapan', href: '/menu' },
  { ikon: 'lokasi', label: 'Lokasi & jam buka', sub: 'Jl. Melati, Bandung', href: '/menu#lokasi' },
  { ikon: 'katering', label: 'Kopi untuk acara', sub: 'Mulai 30 gelas', href: '/pesan#katering' },
];

export const MENU = [
  { kat: 'Kopi', item: [
    { id: 'kopsus', emoji: '☕', nama: 'Kopi Susu Vendra', harga: 18000, ket: 'gula aren, susu segar', laris: true },
    { id: 'americano', emoji: '🫖', nama: 'Americano', harga: 16000, ket: 'biji Java Preanger' },
    { id: 'latte', emoji: '🥛', nama: 'Caramel Latte', harga: 24000, ket: 'karamel buatan sendiri' },
    { id: 'v60', emoji: '⏳', nama: 'Seduh Manual V60', harga: 22000, ket: 'biji berganti tiap minggu' },
    { id: 'tubruk', emoji: '🔥', nama: 'Kopi Tubruk', harga: 12000, ket: 'robusta Temanggung' },
  ] },
  { kat: 'Bukan kopi', item: [
    { id: 'matcha', emoji: '🍵', nama: 'Matcha Oat', harga: 26000, ket: 'susu oat' },
    { id: 'coklat', emoji: '🍫', nama: 'Cokelat Hangat', harga: 20000, ket: 'kakao Bali' },
    { id: 'teh', emoji: '🌿', nama: 'Teh Serai Madu', harga: 15000, ket: 'panas atau dingin' },
    { id: 'lemon', emoji: '🍋', nama: 'Es Lemon Soda', harga: 17000, ket: 'segar, tanpa sirup' },
  ] },
  { kat: 'Kudapan', item: [
    { id: 'croissant', emoji: '🥐', nama: 'Butter Croissant', harga: 20000, ket: 'dipanggang tiap pagi', laris: true },
    { id: 'pisang', emoji: '🍌', nama: 'Banana Bread', harga: 18000, ket: 'potong tebal' },
    { id: 'roti', emoji: '🍞', nama: 'Roti Bakar Srikaya', harga: 16000, ket: 'srikaya pandan' },
    { id: 'kentang', emoji: '🍟', nama: 'Kentang Goreng', harga: 15000, ket: 'bumbu bawang' },
    { id: 'cookie', emoji: '🍪', nama: 'Cookie Gula Aren', harga: 12000, ket: '2 keping' },
  ] },
];
export const SEMUA = MENU.flatMap((k) => k.item);

export const KATERING = [['30–50 gelas', 'Rp 15.000 / gelas'], ['51–100 gelas', 'Rp 13.500 / gelas'], ['Lebih dari 100', 'harga khusus']];
