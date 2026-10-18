import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import StickyWhatsApp from "./components/StickyWhatsApp";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dapoer-mama-ami.vercel.app"),
  title: "Dapoer Mama Ami — Bacang & Rendang Vegetarian Autentik PO",
  description:
    "Bacang Bangka daun pandan, rendang & mooncake 100% tumbuhan. Resep keluarga Chinese-Indonesian, pre-order fresh made. PO Imlek, Ce It, Duan Wu Jie & Mooncake Festival — pesan via WhatsApp.",
  openGraph: {
    title: "Dapoer Mama Ami — Rasa Tradisi, 100% Tumbuhan",
    description:
      "Makanan vegan & vegetarian berbasis PO. Bacang daun pandan, rendang, mooncake — rasa gak kalah sama hewani.",
    type: "website",
    locale: "id_ID",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#C1272D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream font-sans text-brown">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Dapoer Mama Ami",
              description:
                "UMKM vegan & vegetarian berbasis pre-order. Bacang, rendang, mooncake.",
              servesCuisine: ["Vegetarian", "Vegan", "Chinese-Indonesian"],
              priceRange: "$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Binong",
                addressRegion: "Banten",
                addressCountry: "ID",
              },
              sameAs: ["https://instagram.com/dapoermamaami"],
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <StickyWhatsApp />
      </body>
    </html>
  );
}
