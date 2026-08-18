import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  const scrollToProducts = () => {
    document.querySelector("#produktet")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#kontakti")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { num: "15+", label: t("Vjet Eksperiencë", "Years of Experience") },
    { num: "500+", label: t("Klientë të Kënaqur", "Happy Clients") },
    { num: "200+", label: t("Modele Disponueshme", "Available Models") },
  ];

  return (
    <section id="ballina" className="relative min-h-[650px] h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[#1C1410]">
        <img
          src="/hero.jpeg"
          alt={t("Dhomë ndenjeje luksoze", "Luxury living room")}
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="max-w-2xl pt-16 sm:pt-20">
            <div
              className={`mb-5 flex items-center gap-3 transition-all duration-700 sm:mb-6 ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="h-px w-8 bg-[#C9A84C] sm:w-10" />
              <span
                className="text-[10px] uppercase tracking-[0.18em] text-[#C9A84C] sm:text-xs sm:tracking-[0.25em]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {t("Suharekë, Kosovë · Që nga 2010", "Suhareka, Kosovo · Since 2010")}
              </span>
            </div>

            <h1
              className={`mb-5 text-4xl font-semibold leading-[1.08] text-white transition-all duration-700 sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{
                fontFamily: "'Playfair Display', serif",
                transitionDelay: "350ms",
              }}
            >
              {t("Mobilje që", "Furniture that")}
              <br />
              <em className="not-italic text-[#C9A84C]">
                {t("flasin", "speaks")}
              </em>{" "}
              {t("për ju", "for you")}
            </h1>

            <p
              className={`mb-8 max-w-lg text-base leading-relaxed text-white/75 transition-all duration-700 sm:mb-10 sm:text-lg ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{
                fontFamily: "'Lato', sans-serif",
                transitionDelay: "500ms",
              }}
            >
              {t(
                "Transformojmë hapësirat tuaja në vepra arti. Koleksione premium për çdo dhomë — nga dhoma e ndenjes deri te kuzhina.",
                "We transform your spaces into works of art. Premium collections for every room — from the living room to the kitchen."
              )}
            </p>

            <div
              className={`flex flex-wrap gap-3 transition-all duration-700 sm:gap-4 ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "650ms" }}
            >
              <button
                type="button"
                onClick={scrollToProducts}
                className="border-0 bg-[#C9A84C] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-[#1C1410] transition-all duration-300 hover:bg-[#8B6914] hover:text-white active:scale-[0.97] sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.12em]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {t("Zbuloni Koleksionin", "Discover the Collection")}
              </button>

              <button
                type="button"
                onClick={scrollToContact}
                className="border border-white/60 px-5 py-3.5 text-xs font-medium uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-white hover:text-[#1C1410] active:scale-[0.97] sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.12em]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {t("Na Kontaktoni", "Contact Us")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div
            className={`flex gap-5 pb-7 transition-all duration-700 sm:gap-10 sm:pb-10 md:gap-16 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.num}>
                <div
                  className="text-2xl font-semibold text-[#C9A84C] sm:text-3xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.num}
                </div>
                <div
                  className="mt-1 max-w-[95px] text-[9px] uppercase tracking-[0.08em] text-white/60 sm:max-w-none sm:text-xs sm:tracking-[0.1em]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label={t("Shko te produktet", "Go to products")}
        onClick={scrollToProducts}
        className="absolute bottom-7 right-5 z-10 hidden text-white/50 transition-colors duration-300 hover:text-[#C9A84C] sm:block sm:right-12"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
