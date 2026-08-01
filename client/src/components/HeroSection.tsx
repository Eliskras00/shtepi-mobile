/**
 * SHTËPI MOBILE — Hero Section
 * Full-bleed image, asymmetric text left, scroll indicator
 * Dark gradient overlay for text contrast
 */
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToProducts = () => {
    document.querySelector("#produktet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="ballina" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
  src="/hero.jpeg"
  alt="Dhomë ndenje luksoze"
  className="w-full h-full object-cover"
/>
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="w-10 h-px bg-[#C9A84C]" />
              <span
                className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Suharekë, Kosovë · Që nga 2010
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`text-white text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6 transition-all duration-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                fontFamily: "'Playfair Display', serif",
                transitionDelay: "350ms",
              }}
            >
              Mobilje që
              <br />
              <em className="text-[#C9A84C] not-italic">flasin</em> për ju
            </h1>

            {/* Subtext */}
            <p
              className={`text-white/75 text-lg leading-relaxed mb-10 max-w-lg transition-all duration-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontFamily: "'Lato', sans-serif",
                transitionDelay: "500ms",
              }}
            >
              Transformojmë hapësirat tuaja në vepra arti. Koleksione premium
              për çdo dhomë — nga dhoma e ndenjes deri te kuzhina.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "650ms" }}
            >
              <button
                onClick={() => document.querySelector("#produktet")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-[#C9A84C] text-[#1C1410] text-sm tracking-[0.12em] uppercase font-bold hover:bg-[#8B6914] hover:text-white transition-all duration-300 active:scale-[0.97] border-0"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Zbuloni Koleksionin
              </button>
              <button
                onClick={() => document.querySelector("#kontakti")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 border border-white/60 text-white text-sm tracking-[0.12em] uppercase font-medium hover:bg-white hover:text-[#1C1410] transition-all duration-300 active:scale-[0.97] border-0"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Na Kontaktoni
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            className={`flex gap-8 md:gap-16 pb-10 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            {[
              { num: "15+", label: "Vjet Eksperiencë" },
              { num: "500+", label: "Klientë të Kënaqur" },
              { num: "200+", label: "Modele Disponueshme" },
            ].map((stat) => (
              <div key={stat.num}>
                <div
                  className="text-[#C9A84C] text-3xl font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-white/60 text-xs tracking-[0.1em] uppercase mt-1"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProducts}
        className="absolute bottom-8 right-12 z-10 text-white/50 hover:text-[#C9A84C] transition-colors duration-300 animate-bounce"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
