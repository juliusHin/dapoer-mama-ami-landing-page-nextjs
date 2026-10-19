import Image from "next/image";
import type { Product } from "@/lib/products";
import { waLink, waMessages } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ProductCard({ product }: { product: Product }) {
  const message =
    product.id === "nasi-box"
      ? waMessages.catering
      : waMessages.order(product.name);

  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-brown/10 bg-white shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
              product.badge === "Best Seller" ? "bg-festival text-white" : "bg-gold text-brown"
            }`}
          >
            <span aria-hidden="true">{product.badge === "Best Seller" ? "⭐ " : "🥮 "}</span>
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-bold text-brown">{product.name}</h3>
        <p className="mb-4 mt-2 text-sm leading-relaxed text-brown-light">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-medium text-brown-light">
            Min. order {product.minOrder} pcs
          </span>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pesan ${product.name}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-festival px-4 py-2 text-xs font-semibold text-white transition hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festival focus-visible:ring-offset-2"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" /> Pesan
          </a>
        </div>
      </div>
    </article>
  );
}
