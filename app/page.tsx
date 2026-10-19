import About from "./components/About";
import Faq from "./components/Faq";
import FestivalTimeline from "./components/FestivalTimeline";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowToOrder from "./components/HowToOrder";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import TestimonialCarousel from "./components/TestimonialCarousel";
import TrustBadges from "./components/TrustBadges";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <About />
        <ProductGrid />
        <FestivalTimeline />
        <TestimonialCarousel />
        <HowToOrder />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
