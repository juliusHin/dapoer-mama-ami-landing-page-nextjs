"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { waLink, waMessages } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

const links = [
  { href: "#produk", label: "Produk" },
  { href: "#festival", label: "Jadwal Festival" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#cara-pesan", label: "Cara Pesan" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-shadow ${
        scrolled ? "bg-cream/90 shadow-soft backdrop-blur" : "bg-cream"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="#beranda" className="font-serif text-lg font-bold text-brown">
          🎋 Dapoer Mama Ami
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-brown-light transition-colors hover:text-brown"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a
          href={waLink(waMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-festival px-4 py-2 text-sm font-semibold text-white transition hover:brightness-90 md:inline-flex"
        >
          <WhatsAppIcon className="h-4 w-4" /> Chat WhatsApp
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-brown md:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-brown/10 bg-cream px-4 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-medium text-brown"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-festival px-4 py-2.5 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="h-4 w-4" /> Chat WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
