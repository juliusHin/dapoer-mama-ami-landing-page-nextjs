import { waMessages } from "@/lib/site";
import WhatsAppButton from "./WhatsAppButton";

const steps = [
  {
    n: 1,
    title: "Cek Jadwal PO",
    desc: "Lihat kalender festival di atas atau Instagram @dapoermamaami untuk jadwal PO terbuka.",
  },
  {
    n: 2,
    title: "Chat WhatsApp",
    desc: "Klik tombol WhatsApp, sebutkan menu dan jumlah yang diinginkan. Min. order 2 pcs.",
  },
  {
    n: 3,
    title: "Transfer & Tunggu",
    desc: "Setelah pembayaran terkonfirmasi, pesanan Anda masuk antrean — dimasak fresh!",
  },
  {
    n: 4,
    title: "Pengiriman / Pickup",
    desc: "Ambil di Binong, Tangerang, atau atur pengiriman sesuai kesepakatan di chat.",
  },
];

export default function HowToOrder() {
  return (
    <section id="cara-pesan" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
        <h2 className="font-serif text-3xl font-bold text-brown md:text-4xl">
          Cara Pesan
        </h2>
        <p className="mt-3 text-brown-light">Semudah chat dengan saudara sendiri.</p>
        <ol className="mt-12 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-card border border-brown/10 bg-white/70 p-6 shadow-soft"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-festival font-serif text-lg font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 font-serif text-lg font-bold text-brown">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brown-light">{s.desc}</p>
            </li>
          ))}
        </ol>
        <WhatsAppButton message={waMessages.general} className="mt-12 px-8 py-4 text-lg">
          Mulai Pesan via WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}
