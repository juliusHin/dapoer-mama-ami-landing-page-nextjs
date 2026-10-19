import { festivals } from "@/lib/festivals";
import { waMessages } from "@/lib/site";
import ActiveFestivalTag from "./ActiveFestivalTag";
import WhatsAppButton from "./WhatsAppButton";

export default function FestivalTimeline() {
  return (
    <section id="festival" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-brown md:text-4xl">
            Jadwal Festival
          </h2>
          <p className="mt-3 text-brown-light">
            Kami tampil mengikuti kalender tradisi. Pasang pengingat agar tidak
            kehabisan.
          </p>
        </div>

        <ol className="relative mt-12 space-y-10 border-l-2 border-gold/60 pl-8">
          {festivals.map((f) => (
            <li key={f.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-gold bg-cream text-sm"
              >
                {f.emoji}
              </span>
              <div className="rounded-card border border-brown/10 bg-white/70 p-5 shadow-soft">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gold-light px-3 py-1 text-xs font-bold text-brown">
                    {f.monthLabel}
                  </span>
                  <ActiveFestivalTag festivalId={f.id} />
                </div>
                <h3 className="mt-3 font-serif text-xl font-bold text-brown">
                  {f.name} — {f.highlight}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-light">
                  {f.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-card bg-gold-light p-6 text-center shadow-soft">
          <p className="font-semibold text-brown">
            🔔 Ingin diingatkan saat PO festival dibuka?
          </p>
          <p className="mt-1 text-sm text-brown-light">
            Simpan kontak kami dan chat — Mama Ami akan mengabari jadwal PO terbaru.
          </p>
          <WhatsAppButton message={waMessages.reminder} variant="gold" className="mt-4">
            Ingatkan Saya via WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
