'use client';

import { useEffect, useState } from 'react';
import { MENU, SEMUA, kiniWIB, rp, slotAmbil } from '@/lib/vendra';

// Jam ambil mengikuti jam buka hari itu (WIB). Hari ini hanya menawarkan jam
// paling cepat 15 menit dari sekarang; bila kedai sudah tutup, pilihan pindah ke besok.
function pilihanHari(k) {
  if (!k) return [{ id: 'hari-ini', nama: 'Hari ini', slot: slotAmbil(1) }];
  const mulai = Math.ceil((k.menit + 15) / 15) * 15;
  const hariIni = slotAmbil(k.hari, mulai);
  const besok = slotAmbil((k.hari + 1) % 7);
  return [...(hariIni.length ? [{ id: 'hari-ini', nama: 'Hari ini', slot: hariIni }] : []), { id: 'besok', nama: 'Besok', slot: besok }];
}

export default function PreOrder() {
  const [jml, setJml] = useState({ kopsus: 1 });
  const [kini, setKini] = useState(null);
  const [hari, setHari] = useState('hari-ini');
  const [jam, setJam] = useState('');
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    const f = () => setKini(kiniWIB());
    f();
    const t = setInterval(f, 60000);
    return () => clearInterval(t);
  }, []);

  const opsi = pilihanHari(kini);
  const h = opsi.find((o) => o.id === hari) || opsi[0];
  const jamAmbil = h.slot.includes(jam) ? jam : h.slot[0];
  const ubah = (id, d) => setJml((j) => ({ ...j, [id]: Math.max(0, Math.min(10, (j[id] || 0) + d)) }));
  const isi = SEMUA.filter((m) => jml[m.id]);
  const total = isi.reduce((s, m) => s + m.harga * jml[m.id], 0);
  const item = isi.reduce((s, m) => s + jml[m.id], 0);
  const tombol = 'grid h-10 w-10 place-items-center rounded-full bg-latte text-lg font-bold disabled:opacity-40';
  const input = 'mt-1 h-12 w-full rounded-xl border border-espresso/55 bg-foam px-3 font-bold text-espresso focus:border-caramel-ink';

  if (selesai) {
    return (
      <div role="status" className="card mt-8 rounded-2xl p-6 text-center">
        <p className="text-4xl" aria-hidden="true">🧾</p>
        <p className="mt-2 font-display text-2xl">Siap diambil {h.nama.toLowerCase()} pukul {jamAmbil}</p>
        <p className="mt-1 text-sm text-espresso/75">{item} item · {rp(total)} · bayar di kasir</p>
        <p className="mt-3 text-xs text-espresso/70">Ini purwarupa desain: tidak ada pesanan yang benar-benar dibuat.</p>
        <button type="button" onClick={() => setSelesai(false)} className="mt-5 min-h-11 rounded-full bg-espresso px-5 py-2.5 text-sm font-bold text-latte">Ubah pesanan</button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (total) setSelesai(true); }} className="mt-8">
      {MENU.map((k) => (
        <fieldset key={k.kat} className="mt-6 first:mt-0">
          <legend className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-espresso/70">{k.kat}</legend>
          <ul className="card divide-y divide-espresso/10 rounded-2xl">
            {k.item.map((m) => (
              <li key={m.id} className="flex items-center gap-3 px-4 py-2.5">
                <span className="text-xl" aria-hidden="true">{m.emoji}</span>
                <span className="flex-1 text-sm"><span className="block font-bold">{m.nama}</span><span className="text-espresso/70">{rp(m.harga)}</span></span>
                <span className="flex items-center gap-1.5" role="group" aria-label={`Jumlah ${m.nama}`}>
                  <button type="button" onClick={() => ubah(m.id, -1)} disabled={!jml[m.id]} className={tombol} aria-label={`Kurangi ${m.nama}`}>−</button>
                  <span className="w-6 text-center font-bold tabular-nums">{jml[m.id] || 0}</span>
                  <button type="button" onClick={() => ubah(m.id, 1)} className={tombol} aria-label={`Tambah ${m.nama}`}>+</button>
                </span>
              </li>
            ))}
          </ul>
        </fieldset>
      ))}

      <fieldset className="card mt-8 rounded-2xl p-5">
        <legend className="sr-only">Pengambilan</legend>
        <p className="font-display text-2xl">Ambil di kedai</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="p-hari" className="text-xs font-bold uppercase tracking-wide text-espresso/75">Hari</label>
            <select id="p-hari" value={h.id} onChange={(e) => setHari(e.target.value)} className={input}>
              {opsi.map((o) => <option key={o.id} value={o.id}>{o.nama}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="p-jam" className="text-xs font-bold uppercase tracking-wide text-espresso/75">Jam ambil (WIB)</label>
            <select id="p-jam" value={jamAmbil} onChange={(e) => setJam(e.target.value)} className={input}>
              {h.slot.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="p-nama" className="text-xs font-bold uppercase tracking-wide text-espresso/75">Nama di gelas</label>
            <input id="p-nama" required autoComplete="given-name" className={input} />
          </div>
        </div>
      </fieldset>

      {/* Bilah ringkas yang ikut menempel di bawah layar selama memilih menu */}
      <div className="sticky bottom-3 z-10 mt-4 flex items-center gap-4 rounded-2xl bg-espresso p-3 pl-5 text-latte shadow-xl">
        <p className="flex-1" aria-live="polite">
          <span className="block text-xs text-latte/80">{item} item · {h.nama.toLowerCase()} {jamAmbil}</span>
          <span className="font-display text-2xl">{rp(total)}</span>
        </p>
        <button type="submit" disabled={!total} className="min-h-12 rounded-xl bg-caramel-ink px-5 font-bold text-white hover:bg-white hover:text-espresso disabled:cursor-not-allowed disabled:opacity-50">Pesan</button>
      </div>
      <p className="mt-3 text-center text-[11px] text-espresso/70">Purwarupa — tidak ada pesanan yang dikirim. Bayar di kasir saat mengambil.</p>
    </form>
  );
}
