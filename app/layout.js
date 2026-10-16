import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmserif = DM_Serif_Display({ subsets: ["latin"], variable: "--font-dmserif", weight: "400" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

const __jsonld = {"@context":"https://schema.org","@type":"CafeOrCoffeeShop","name":"Kopi Vendra","description":"Kedai kopi rumahan (usaha fiktif untuk purwarupa desain)","url":"https://linkinbio-vendra.pintuweb.id","servesCuisine":"Kopi","priceRange":"Rp12.000–Rp26.000","address":{"@type":"PostalAddress","addressLocality":"Bandung","addressCountry":"ID"},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"08:00","closes":"22:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"08:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Sunday","opens":"09:00","closes":"21:00"}]};

export const metadata = {
  metadataBase: new URL("https://linkinbio-vendra.pintuweb.id"),
  title: { default: "Kopi Vendra — Kedai Kopi Rumahan di Bandung", template: "%s — Kopi Vendra" },
  description: "Tautan Kopi Vendra, kedai kopi rumahan di Bandung: status buka menurut jam WIB, menu lengkap, pre-order dengan jam ambil pilihan, dan kopi untuk acara.",
  applicationName: "Kopi Vendra",
  keywords: ["kedai kopi bandung", "pre-order kopi", "menu kopi susu", "kopi untuk acara", "link in bio kedai kopi"],
  authors: [{ name: "Kopi Vendra" }],
  creator: "Kopi Vendra",
  publisher: "Kopi Vendra",
  alternates: { canonical: "https://linkinbio-vendra.pintuweb.id" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://linkinbio-vendra.pintuweb.id",
    siteName: "Kopi Vendra",
    title: "Kopi Vendra — Kedai Kopi Rumahan di Bandung",
    description: "Tautan Kopi Vendra, kedai kopi rumahan di Bandung: status buka menurut jam WIB, menu lengkap, pre-order dengan jam ambil pilihan, dan kopi untuk acara.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Kopi Vendra — Kedai Kopi Rumahan di Bandung" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kopi Vendra — Kedai Kopi Rumahan di Bandung",
    description: "Tautan Kopi Vendra, kedai kopi rumahan di Bandung: status buka menurut jam WIB, menu lengkap, pre-order dengan jam ambil pilihan, dan kopi untuk acara.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${dmserif.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        {/* Kanopi bergaris di atas etalase — motif khas kedai, di semua halaman */}
        <div className="kanopi" aria-hidden="true" />
        {children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        <aside aria-label="Tentang situs demo ini" style={{ display: 'block', margin: 0, padding: '12px 16px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          Situs demo buatan PintuWeb — nama dan isinya rekaan.{' '}
          <a href="https://www.pintuweb.id/kontak?demo=vendra" style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Buat yang seperti ini →</a>
        </aside>
        </body>
    </html>
  );
}
