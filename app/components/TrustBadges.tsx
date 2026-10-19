const badges = [
  { icon: "🌱", label: "100% Vegan" },
  { icon: "🥬", label: "100% Vegetarian" },
  { icon: "👩‍🍳", label: "PO Fresh Made" },
  { icon: "👵", label: "Resep Keluarga" },
  { icon: "🕌", label: "Bahan Halal-Friendly" },
];

export default function TrustBadges() {
  return (
    <section aria-label="Keunggulan kami" className="border-y border-brown/10 bg-cream-dark">
      <div className="mx-auto flex max-w-6xl snap-x gap-3 overflow-x-auto px-4 py-5 md:justify-center md:px-8">
        {badges.map((b) => (
          <div
            key={b.label}
            className="flex shrink-0 snap-center items-center gap-2 rounded-full border border-pandan/25 bg-white/60 px-5 py-2.5"
          >
            <span aria-hidden="true">{b.icon}</span>
            <span className="text-sm font-semibold text-brown">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
