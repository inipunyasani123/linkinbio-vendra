/* Tanggal relatif menurut WIB (Asia/Jakarta). Jadwal contoh di demo ini dihitung
   dari hari ini, bukan ditulis mati, supaya tidak pernah menampilkan acara atau
   slot yang sudah lewat. Tanggal dipertukarkan sebagai string 'YYYY-MM-DD' agar
   aman dikirim dari server ke komponen klien. */

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

const fmtIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' });

/** Tanggal kalender hari ini di WIB, 'YYYY-MM-DD'. */
export const hariIniWIB = (d = new Date()) => fmtIso.format(d);

const keDate = (iso) => new Date(`${iso}T00:00:00Z`);
const keIso = (d) => d.toISOString().slice(0, 10);

export const tambahHari = (iso, n) => { const d = keDate(iso); d.setUTCDate(d.getUTCDate() + n); return keIso(d); };
/** 0 = Minggu … 6 = Sabtu */
export const hariKe = (iso) => keDate(iso).getUTCDay();
/** Hari `dow` pertama yang jatuh paling cepat `jeda` hari setelah `iso`. */
export const hariBerikut = (iso, dow, jeda = 1) => { let t = tambahHari(iso, jeda); while (hariKe(t) !== dow) t = tambahHari(t, 1); return t; };

/** gaya: 'hari' → "Sabtu, 24 Okt" · 'panjang' → "Sabtu, 24 Okt 2026" · 'pendek' → "24 Okt" · 'lengkap' → "Sabtu, 24 Oktober 2026" */
export function tgl(iso, gaya = 'panjang') {
  const d = keDate(iso);
  const h = HARI[d.getUTCDay()], n = d.getUTCDate(), m = d.getUTCMonth(), y = d.getUTCFullYear();
  if (gaya === 'pendek') return `${n} ${BLN[m]}`;
  if (gaya === 'hari') return `${h}, ${n} ${BLN[m]}`;
  if (gaya === 'lengkap') return `${h}, ${n} ${BULAN[m]} ${y}`;
  return `${h}, ${n} ${BLN[m]} ${y}`;
}

/** Bulan ke-`n` dari bulan `iso` (0 = bulan ini): { nama, pendek, tahun } */
export function bulanKe(iso, n = 0) {
  const d = keDate(iso);
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1));
  return { nama: BULAN[t.getUTCMonth()], pendek: BLN[t.getUTCMonth()], tahun: t.getUTCFullYear() };
}
