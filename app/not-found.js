import Link from "next/link";

export const metadata = { title: "Halaman tidak ditemukan" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="card w-full max-w-sm rounded-3xl p-8 text-center">
        <p className="text-5xl" aria-hidden="true">☕💨</p>
        <h1 className="mt-4 font-display text-3xl">Gelasnya kosong</h1>
        <p className="mt-2 text-espresso/75">Halaman ini tidak ada di menu kami.</p>
        <Link href="/" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-espresso px-5 py-2.5 font-bold text-latte hover:bg-caramel-ink">Kembali ke kedai</Link>
      </div>
    </main>
  );
}
