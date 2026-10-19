import Image from "next/image";
import Link from "next/link";
import { waMessages } from "@/lib/site";
import CountdownChip from "./CountdownChip";
import PandanLeaves from "./PandanLeaves";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-cream">
      <PandanLeaves />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <CountdownChip />
          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-brown md:text-6xl">
            Rasa Tradisi,
            <br />
            <span className="text-pandan">100% Tumbuhan.</span>
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-brown-light">
            Bacang &amp; Rendang Vegetarian autentik — resep keluarga
            Chinese-Indonesian tanpa bahan hewani. Dibuat fresh berdasarkan
            Pre-Order, minimal order 2 pcs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#festival"
              className="inline-flex items-center rounded-full border-2 border-pandan px-6 py-3 font-semibold text-pandan-dark transition hover:bg-pandan-light"
            >
              Lihat Menu Festival
            </Link>
            <WhatsAppButton message={waMessages.general}>Chat WhatsApp</WhatsAppButton>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-hero shadow-lift">
          <Image
            src="/images/hero-bacang.webp"
            alt="Bacang daun pandan segar Dapoer Mama Ami"
            fill
            preload
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
