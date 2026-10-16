import Link from 'next/link';
import { ClipboardList, Coffee, MapPin, Users, Flame } from 'lucide-react';
import { KEDAI, LINKS, MENU, rp } from '@/lib/vendra';
import StatusBuka from './components/StatusBuka';

const IKON = { pesan: ClipboardList, menu: Coffee, lokasi: MapPin, katering: Users };
const FAVORIT = MENU.flatMap((k) => k.item).filter((m) => ['kopsus', 'latte', 'matcha', 'croissant'].includes(m.id));

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-30px)] items-center justify-center px-4 pb-12 pt-14 lg:px-8">
      <div className="w-full max-w-md lg:grid lg:max-w-4xl lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <header className="rise text-center">
            <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-espresso text-5xl">
              <svg className="uap absolute -top-8 left-1/2 -translate-x-1/2" width="48" height="30" viewBox="0 0 48 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M14 28c-5-5 5-8 0-13s5-8 0-13" />
                <path d="M24 28c-5-5 5-8 0-13s5-8 0-13" />
                <path d="M34 28c-5-5 5-8 0-13s5-8 0-13" />
              </svg>
              <span aria-hidden="true">☕</span>
            </div>
            <h1 className="mt-4 font-display text-4xl lg:text-5xl">{KEDAI.nama}</h1>
            <p className="mt-1 text-sm text-espresso/75">Kedai kopi rumahan — diseduh pelan, disajikan hangat.</p>
            <div className="mt-3 flex flex-col items-center gap-2 text-xs font-semibold">
              <StatusBuka />
              <span className="inline-flex items-center gap-1 text-espresso/75"><Flame size={12} className="text-caramel-ink" aria-hidden="true" /> Biji disangrai sendiri tiap Senin</span>
            </div>
          </header>

          <section className="rise mt-7" style={{ animationDelay: '0.08s' }} aria-labelledby="fav">
            <h2 id="fav" className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-espresso/70">— Menu favorit —</h2>
            <ul className="grid grid-cols-2 gap-3">
              {FAVORIT.map((m) => (
                <li key={m.id} className="card relative rounded-2xl p-4 text-center">
                  {m.laris && <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-caramel-ink px-2.5 py-0.5 text-[10px] font-bold text-white">Terlaris</span>}
                  <p className="text-3xl" aria-hidden="true">{m.emoji}</p>
                  <p className="mt-1.5 text-sm font-bold">{m.nama}</p>
                  <p className="font-display text-lg text-caramel-ink">{rp(m.harga)}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div>
          <nav className="mt-6 space-y-3 lg:mt-0" aria-label="Pesan dan informasi">
            {LINKS.map((c, i) => {
              const Ikon = IKON[c.ikon];
              return (
                <Link
                  key={c.label}
                  href={c.href}
                  className={`rise flex items-center gap-4 rounded-2xl p-3.5 transition hover:-translate-y-0.5 ${c.utama ? 'bg-espresso text-latte shadow-lg' : 'card'}`}
                  style={{ animationDelay: `${0.14 + i * 0.05}s` }}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${c.utama ? 'bg-caramel-ink text-white' : 'bg-latte text-espresso'}`}><Ikon size={19} aria-hidden="true" /></span>
                  <span className="flex-1">
                    <span className="block font-bold">{c.label}</span>
                    <span className={`block text-xs ${c.utama ? 'text-latte/80' : 'text-espresso/70'}`}>{c.sub}</span>
                  </span>
                </Link>
                );
              })}
            </nav>

            <p className="rise mt-7 text-center text-sm text-espresso/75 lg:text-left" style={{ animationDelay: '0.4s' }}>Promo & menu baru di Instagram {KEDAI.handle}</p>
            <p className="rise mt-3 text-center text-xs text-espresso/70 lg:text-left" style={{ animationDelay: '0.45s' }}>Kedai fiktif untuk purwarupa desain · Bandung</p>
          </div>
        </div>
      </main>
  );
}
