import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section id="produk" className="bg-cream-dark py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-brown md:text-4xl">
            Menu Andalan
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brown-light">
            Semua dibuat setelah PO masuk — fresh dimasak, tanpa pengawet.
            Klik <em>Pesan</em> untuk chat langsung via WhatsApp.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
