import Link from 'next/link';
import { KEDAI } from '@/lib/vendra';

export default function Kembali() {
  return (
    <Link href="/" className="card inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold hover:-translate-y-0.5">
      <span aria-hidden="true">☕ ←</span> {KEDAI.nama}
    </Link>
  );
}
