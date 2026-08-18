import { Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: t("Ballina", "Home"), href: "#ballina" },
    { label: t("Produktet", "Products"), href: "#produktet" },
    { label: t("Galeria", "Gallery"), href: "#galeria" },
    { label: t("Rreth Nesh", "About Us"), href: "#rreth-nesh" },
    { label: t("Kontakti", "Contact"), href: "#kontakti" },
  ];

  return (
    <footer className="bg-[#1C1410] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt={t("Logoja e Shtëpi Mobile", "Shtëpi Mobile logo")}
                className="h-12 w-12 rounded-md object-contain"
              />
              <div>
                <div
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Shtëpi Mobile
                </div>
                <div
                  className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {t("Mobilje Premium", "Premium Furniture")}
                </div>
              </div>
            </div>

            <p
              className="mb-6 max-w-xs text-sm leading-relaxed text-white/50"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t(
                "Transformojmë hapësirat tuaja me mobilje cilësore. Prodhues dhe shitës i mobiljeve premium në Prizren, Kosovë.",
                "We transform your spaces with quality furniture. Premium furniture manufacturer and retailer in Prizren, Kosovo."
              )}
            </p>

            <div className="flex gap-3">
              <a
                href="https://instagram.com/mobilehome.ks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/50 transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98 6.979-1.28.059-1.689.073-4.948.073-3.259 0-3.667-.014-4.947-.072-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://wa.me/38344546547"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/50 transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              >
                <span className="text-sm font-semibold">WA</span>
              </a>
            </div>
          </div>

          <div>
            <h4
              className="mb-6 text-xs uppercase tracking-[0.2em] text-white"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t("Navigimi", "Navigation")}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm text-white/50 transition-colors duration-300 hover:text-[#C9A84C]"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-6 text-xs uppercase tracking-[0.2em] text-white"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t("Kontakti", "Contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#C9A84C]" />
                <span
                  className="text-sm leading-relaxed text-white/50"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {t(
                    "Magjistralja Prizren-Suharekë në Lubizhdë 20000",
                    "Prizren-Suhareka Road in Lubizhdë 20000"
                  )}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-[#C9A84C]" />
                <a
                  href="tel:+38344546547"
                  className="text-sm text-white/50 transition-colors duration-300 hover:text-[#C9A84C]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  +383 44 546 547
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={14} className="mt-0.5 flex-shrink-0 text-[#C9A84C]" />
                <span
                  className="text-sm leading-relaxed text-white/50"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {t("E Hënë – E Shtunë", "Monday – Saturday")}
                  <br />
                  08:00 – 16:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:px-6 md:flex-row md:text-left lg:px-12">
          <span
            className="text-xs text-white/30"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            © 2026 Mobilehome. {t("Të gjitha të drejtat e rezervuara.", "All rights reserved.")}
          </span>
          <span
            className="text-xs text-white/30"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Prizren, {t("Kosovë", "Kosovo")} · {t("Mobilje Premium", "Premium Furniture")}
          </span>
        </div>
      </div>
    </footer>
  );
}
