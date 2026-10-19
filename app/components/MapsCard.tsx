"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function MapsCard() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="Lokasi Dapoer Mama Ami — Binong, Banten"
        src={site.mapsEmbed}
        className="h-64 w-full rounded-card border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="group relative h-64 w-full overflow-hidden rounded-card bg-pandan-light text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festival focus-visible:ring-offset-2"
    >
      <span className="absolute inset-0 opacity-15 [background-image:repeating-linear-gradient(45deg,#5A7D3A_0_1px,transparent_1px_12px)]" />
      <span className="relative mt-16 inline-block">
        <span aria-hidden="true" className="text-4xl">📍</span>
        <span className="mt-2 block font-semibold text-brown">{site.location}</span>
        <span className="mt-1 block text-sm text-brown-light group-hover:text-brown">
          Ketuk untuk membuka peta
        </span>
      </span>
    </button>
  );
}
