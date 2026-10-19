"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goNext = useCallback(
    () => setIndex((i) => (i + 1) % testimonials.length),
    []
  );
  const goPrev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setTimeout(goNext, 6000);
    return () => clearTimeout(t);
  }, [paused, reduceMotion, index, goNext]);

  const item = testimonials[index];

  return (
    <section id="testimoni" className="bg-cream-dark py-20 md:py-28">
      <h2 className="text-center font-serif text-3xl font-bold text-brown md:text-4xl">
        Kata Mereka
      </h2>
      <div
        className="mx-auto mt-10 max-w-3xl px-4 text-center md:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="relative min-h-56 md:min-h-48">
          <AnimatePresence mode="wait">
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -16 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="text-xl tracking-widest text-gold"
                aria-label={`Rating ${item.rating} dari 5`}
              >
                {"★".repeat(item.rating)}
                <span className="text-brown/20">{"★".repeat(5 - item.rating)}</span>
              </div>
              <blockquote className="mt-4 font-serif text-xl italic leading-relaxed text-brown md:text-2xl">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-brown-light">
                {item.name} — {item.event}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={goPrev}
            aria-label="Testimoni sebelumnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 text-brown transition hover:bg-pandan-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festival focus-visible:ring-offset-2"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Testimoni ${i + 1}`}
                aria-current={i === index}
                className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festival focus-visible:ring-offset-2 ${
                  i === index ? "bg-festival" : "bg-brown/20 hover:bg-brown/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={goNext}
            aria-label="Testimoni berikutnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 text-brown transition hover:bg-pandan-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festival focus-visible:ring-offset-2"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
