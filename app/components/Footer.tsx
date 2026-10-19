import Image from "next/image";
import { site, waLink, waMessages } from "@/lib/site";
import MapsCard from "./MapsCard";
import WhatsAppIcon from "./WhatsAppIcon";

const igPosts = [
  { src: "/images/ig/1.webp", alt: "Bacang daun pandan", cls: "h-40 rotate-[-1.5deg]" },
  { src: "/images/ig/2.webp", alt: "Rendang vegetarian", cls: "h-52 rotate-[1deg]" },
  { src: "/images/ig/3.webp", alt: "Mooncake", cls: "h-36 rotate-[0.5deg] border-2 border-gold bg-white", polaroid: true },
  { src: "/images/ig/4.webp", alt: "Ayam kuluyuk", cls: "h-48 -rotate-[1deg]" },
  { src: "/images/ig/5.webp", alt: "Proses memasak", cls: "h-40 rotate-[1.5deg] shadow-lift bg-white", polaroid: true },
  { src: "/images/ig/6.webp", alt: "Nasi box", cls: "h-44 rotate-[-0.5deg]" },
];

async function CopyrightYear() {
  "use cache";
  return <span>{new Date().getFullYear()}</span>;
}

export default function Footer() {
  return (
    <footer className="bg-brown py-16 text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="font-serif text-xl font-bold">Ikuti Kami</h3>
          <p className="mt-2 text-sm text-cream/70">
            Lihat proses masak &amp; testimoni terbaru di Instagram.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {igPosts.map((p, i) => (
              <a
                key={i}
                href={site.igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block w-28 overflow-hidden rounded-lg shadow-soft transition-transform hover:rotate-0 hover:scale-105 ${p.cls}`}
                aria-label={`Instagram: ${p.alt}`}
              >
                <span className={p.polaroid ? "absolute inset-1.5" : "block h-full w-full"}>
                  <Image src={p.src} alt="" fill sizes="112px" className="object-cover" />
                </span>
              </a>
            ))}
          </div>
          <a
            href={site.igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full border-2 border-gold px-5 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brown"
          >
            @{site.igHandle} →
          </a>
        </div>

        <div>
          <h3 className="font-serif text-xl font-bold">Hubungi Kami</h3>
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-semibold text-brown transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brown"
          >
            <WhatsAppIcon className="h-5 w-5" /> Chat WhatsApp
          </a>
          <p className="mt-4 text-sm text-cream/70">
            Pre-Order only — minimal 2 pcs.
            <br />
            Fresh cooked setelah PO dikonfirmasi.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-xl font-bold">Lokasi</h3>
          <div className="mt-4">
            <MapsCard />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-cream/15 px-4 pt-6 text-center text-sm text-cream/60 md:px-8">
        © <CopyrightYear /> Dapoer Mama Ami — {site.tagline}. Dibuat dengan ❤️ di Binong, Banten.
      </div>
    </footer>
  );
}
