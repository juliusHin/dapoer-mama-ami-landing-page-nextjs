import Image from "next/image";

export default function About() {
  return (
    <section id="tentang" className="bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-soft">
          <Image
            src="/images/about-mama-ami.webp"
            alt="Mama Ami memasak di dapur keluarga"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold text-brown md:text-4xl">
            Cerita di Balik Dapoer Mama Ami
          </h2>
          <p className="mt-5 leading-relaxed text-brown-light">
            Dapoer Mama Ami lahir dari dapur keluarga Chinese-Indonesian kami.
            Saat keluarga memilih hidup lebih sehat, Mama Ami bertekad: tradisi
            tidak harus hilang. Resep bakcang, rendang, dan kuluyuk yang
            diwariskan turun-temurun ia olah ulang — 100% dari tumbuhan, 100%
            rasa yang sama.
          </p>
          <p className="mt-4 leading-relaxed text-brown-light">
            Karena kami percaya makanan untuk sembahyang dan acara keluarga
            harus dimasak dengan hati, semua pesanan kami buat fresh setelah
            PO masuk — tidak ada stok mengendap.
          </p>
          <p className="mt-6 font-serif text-lg italic text-brown">
            “Rasa tradisi tidak harus meninggalkan kebiasaan lama.” — Mama Ami
          </p>
        </div>
      </div>
    </section>
  );
}
