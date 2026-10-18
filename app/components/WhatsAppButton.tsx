import { waLink } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

type Variant = "red" | "gold" | "outline" | "brown";

const styles: Record<Variant, string> = {
  red: "bg-festival text-white hover:brightness-90 shadow-lift",
  gold: "bg-gold text-brown hover:brightness-95 shadow-lift",
  outline: "border-2 border-pandan text-pandan hover:bg-pandan-light",
  brown: "bg-brown text-cream hover:brightness-110",
};

export default function WhatsAppButton({
  message,
  variant = "red",
  className = "",
  children,
}: {
  message: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition ${styles[variant]} ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {children}
    </a>
  );
}
