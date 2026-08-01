/**
 * SHTËPI MOBILE — Navbar Component
 * Style: Artizanal Luxury — transparent on top, cream+gold on scroll
 * Font: Lato uppercase nav links, Playfair Display for logo
 */
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t("Ballina", "Home"), href: "#ballina" },
    { label: t("Produktet", "Products"), href: "#produktet" },
    { label: t("Galeria", "Gallery"), href: "#galeria" },
    { label: t("Rreth Nesh", "About Us"), href: "#rreth-nesh" },
    { label: t("Kontakti", "Contact"), href: "#kontakti" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8E0D4]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#ballina"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#ballina");
              }}
              className="flex items-center gap-3 group"
            >
              <img
                src="/logo.jpg"
                alt="Mobile Home Logo"
                className="w-12 h-12 object-contain rounded-md"
              />

              <div>
                <span
                  className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${
                    scrolled ? "text-[#1C1410]" : "text-white"
                  }`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Shtëpi Mobile
                </span>
                <p
                  className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                    scrolled ? "text-[#8B6914]" : "text-[#C9A84C]"
                  }`}
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {t("Mobilje Premium", "Premium Furniture")}
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300 hover:text-[#C9A84C] ${
                    scrolled ? "text-[#1C1410]" : "text-white/90"
                  }`}
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Phone + Language Toggle */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleLang}
                className={`text-xs font-medium tracking-wider border rounded-md px-3 py-2 transition-colors duration-300 ${
                  scrolled
                    ? "border-[#8B6914]/40 text-[#8B6914] hover:bg-[#8B6914]/10"
                    : "border-white/40 text-white hover:bg-white/10"
                }`}
              >
                {lang === "al" ? "EN" : "AL"}
              </button>
              <a
                href="tel:+38344546547"
                className={`flex items-center gap-2 px-5 py-2.5 border transition-all duration-300 text-xs tracking-[0.1em] uppercase font-medium ${
                  scrolled
                    ? "border-[#8B6914] text-[#8B6914] hover:bg-[#8B6914] hover:text-white"
                    : "border-white/70 text-white hover:bg-white hover:text-[#1C1410]"
                }`}
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <Phone size={13} />
                +383 44 546 547
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                scrolled ? "text-[#1C1410]" : "text-white"
              }`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#1C1410] transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-white/80 hover:text-[#C9A84C] text-2xl font-light tracking-[0.2em] uppercase transition-colors duration-300"
              style={{
                fontFamily: "'Playfair Display', serif",
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+38344546547"
            className="mt-4 text-[#C9A84C] text-sm tracking-[0.15em] uppercase flex items-center gap-2"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            <Phone size={14} />
            +383 44 546 547
          </a>
          <button
            onClick={toggleLang}
            className="mt-2 text-xs font-medium tracking-wider border border-[#C9A84C]/40 rounded-md px-4 py-2 text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
          >
            {lang === "al" ? "EN" : "AL"}
          </button>
        </div>
      </div>
    </>
  );
}