/**
 * SHTËPI MOBILE — Footer
 * Dark background with gold accents, links and social
 */
import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1C1410] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
            src="/logo.jpg"
            alt="Mobile Home Logo"
           className="w-12 h-12 object-contain rounded-md"
            />
              <div>
                <div
                  className="text-white text-xl font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Shtëpi Mobile
                </div>
                <div
                  className="text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Mobilje Premium
                </div>
              </div>
            </div>
            <p
              className="text-white/50 text-sm leading-relaxed max-w-xs mb-6"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Transformojmë hapësirat tuaja me mobilje cilësore. Prodhues dhe
              shitës i mobiljeve premium në Prizren, Kosovë.
            </p>
            <div className="flex gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com/mobilehome.ks"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/38344546547"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Navigimi
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Ballina", href: "#ballina" },
                { label: "Produktet", href: "#produktet" },
                { label: "Galeria", href: "#galeria" },
                { label: "Rreth Nesh", href: "#rreth-nesh" },
                { label: "Kontakti", href: "#kontakti" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-white/50 text-sm hover:text-[#C9A84C] transition-colors duration-300"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-white text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Kontakti
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span
                  className="text-white/50 text-sm leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Magjistralja Prizren-Suhareke në Lubizhdë 20000
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+38344546547"
                  className="text-white/50 text-sm hover:text-[#C9A84C] transition-colors duration-300"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  +383 44 546 547
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span
                  className="text-white/50 text-sm leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  E Hënë – E Shtunë<br />08:00 – 16:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <span
            className="text-white/30 text-xs"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            © 2024 Mobilehome. Të gjitha të drejtat e rezervuara.
          </span>
          <span
            className="text-white/30 text-xs"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Suharekë, Kosovë · Mobilje Premium
          </span>
        </div>
      </div>
    </footer>
  );
}