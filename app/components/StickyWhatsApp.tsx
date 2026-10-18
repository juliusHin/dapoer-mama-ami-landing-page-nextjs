import { waLink, waMessages } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function StickyWhatsApp() {
  return (
    <a
      href={waLink(waMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Dapoer Mama Ami"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-20" />
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
