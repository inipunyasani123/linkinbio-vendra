/* Kopi Vendra — kedai kopi rumahan di Bandung (fiktif). Satu sumber isi untuk
   halaman tautan, menu, dan pre-order. Harga dan alamat adalah contoh. */

export const SITE = 'https://linkinbio-vendra.pintuweb.id';
export const rp = (n) => `Rp ${n.toLocaleString('id-ID')}`;

export const KEDAI = {
  nama: 'Kopi Vendra',
  alamat: 'Jl. Melati No. 5, Bandung (alamat contoh)',
  handle: '@kopivendra',
  buka: 8,
  tutup: 22,
};

export const JAM = [['Senin–Jumat', '08.00–22.00'], ['Sabtu', '08.00–23.00'], ['Minggu', '09.00–21.00']];

// Status buka dihitung menurut jam WIB, bukan jam perangkat pengunjung.
export function sedangBuka(d = new Date()) {
  const wib = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  const hari = wib.getDay();
  const jam = wib.getHours() + wib.getMinutes() / 60;
  const [a, b] = hari === 0 ? [9, 21] : hari === 6 ? [8, 23] : [8, 22];
  return jam >= a && jam < b;
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
