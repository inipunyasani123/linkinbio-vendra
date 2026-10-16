'use client';

import { useEffect, useState } from 'react';
import { statusKedai } from '@/lib/vendra';

// Papan buka/tutup menurut jam WIB (bukan jam perangkat), diperbarui tiap menit.
export default function StatusBuka() {
  const [s, setS] = useState(null);
  useEffect(() => {
    const f = () => setS(statusKedai());
    f();
    const t = setInterval(f, 60000);
    return () => clearInterval(t);
  }, []);
  const warna = s === null ? 'bg-espresso/10 text-espresso/75' : s.buka ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900';
  const titik = s === null ? 'bg-espresso/40' : s.buka ? 'bg-emerald-600' : 'bg-red-600';
  return (
    <p role="status" className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${warna}`}>
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${titik}`} />
      {s === null ? 'Memeriksa jam buka…' : <><span className="font-bold">{s.buka ? 'Sedang buka' : 'Sedang tutup'}</span><span aria-hidden="true">·</span>{s.teks}</>}
    </p>
  );
}
