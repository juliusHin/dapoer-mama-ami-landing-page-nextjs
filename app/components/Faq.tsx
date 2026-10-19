import { faqs } from "@/lib/faqs";

export default function Faq() {
  return (
    <section id="faq" className="bg-cream-dark py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <h2 className="text-center font-serif text-3xl font-bold text-brown md:text-4xl">
          Pertanyaan Umum
        </h2>
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.id}
              className="group rounded-card border border-brown/10 bg-white/70 px-5 py-4 shadow-soft"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-brown [&::-webkit-details-marker]:hidden">
                {f.question}
                <span aria-hidden="true" className="ml-4 shrink-0 text-pandan transition-transform group-open:rotate-45">
                  ＋
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-brown-light">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
