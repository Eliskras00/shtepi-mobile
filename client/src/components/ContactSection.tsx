/**
 * SHTËPI MOBILE — Contact Section
 * Split layout: form left, map + info right
 */
import { useRef, useEffect, useState } from "react";
import { MapPin, Phone, Clock, Mail, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert({
          name: form.name,
          phone: form.phone,
          message: form.message,
        });

      if (insertError) throw insertError;

      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      setError("Diçka shkoi keq. Provo përsëri ose na kontakto në WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="kontakti" className="py-24 bg-[#FAF7F2]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span
              className="text-[#8B6914] text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Na Gjeni
            </span>
          </div>
          <h2
            className="text-[#1C1410] text-4xl md:text-5xl font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Vizitoni Showroomin
            <br />
            <em className="text-[#8B6914] not-italic">tonë</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact Form */}
          <div
            className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <h3
              className="text-[#1C1410] text-2xl font-semibold mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Dërgoni një Mesazh
            </h3>

            {sent && (
              <div className="bg-[#C9A84C]/10 border border-[#C9A84C] text-[#8B6914] px-5 py-4 mb-6 text-sm"
                style={{ fontFamily: "'Lato', sans-serif" }}>
                ✓ Mesazhi u dërgua me sukses! Do t'ju kontaktojmë së shpejti.
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-5 py-4 mb-6 text-sm"
                style={{ fontFamily: "'Lato', sans-serif" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-[#1C1410]/60 text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Emri Juaj
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full border border-[#E8E0D4] bg-white px-4 py-3 text-[#1C1410] text-sm focus:outline-none focus:border-[#C9A84C] transition-colors duration-300"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  placeholder="p.sh. Arjeta Krasniqi"
                />
              </div>
              <div>
                <label
                  className="block text-[#1C1410]/60 text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Numri i Telefonit
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full border border-[#E8E0D4] bg-white px-4 py-3 text-[#1C1410] text-sm focus:outline-none focus:border-[#C9A84C] transition-colors duration-300"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  placeholder="+383 44 ..."
                />
              </div>
              <div>
                <label
                  className="block text-[#1C1410]/60 text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Mesazhi
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full border border-[#E8E0D4] bg-white px-4 py-3 text-[#1C1410] text-sm focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 resize-none"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  placeholder="Çfarë mobilje jeni të interesuar?"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#1C1410] text-white py-4 text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-3 hover:bg-[#8B6914] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <Send size={14} />
                {sending ? "Duke dërguar..." : "Dërgoni Mesazhin"}
              </button>
            </form>
          </div>

          {/* Right: Info + Map */}
          <div
            className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              {[
                {
                  icon: MapPin,
                  title: "Adresa",
                  value: "Magjistralja Prizren-Suhareke në Lubizhdë 20000",
                  sub: "Suharekë, Kosovë",
                },
                {
                  icon: Phone,
                  title: "Telefoni",
                  value: "+383 44 546 547",
                  sub: "Na telefononi çdo ditë",
                },
                {
                  icon: Clock,
                  title: "Orari",
                  value: "E Hënë – E Shtunë: 08:00 – 16:00",
                  sub: "E Diel: Mbyllur",
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#E8E0D4] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={16} className="text-[#8B6914]" />
                  </div>
                  <div>
                    <div
                      className="text-[#1C1410]/50 text-[10px] tracking-[0.2em] uppercase mb-1"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-[#1C1410] text-sm font-medium"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {item.value}
                    </div>
                    <div
                      className="text-[#1C1410]/50 text-xs mt-0.5"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d20.7675455!3d42.2457903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353956087dab185%3A0xcab03a3971cf7aa5!2sMobilehome!5e0!3m2!1sen!2sxk!4v1690000000000!5m2!1sen!2sxk"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokacioni i Mobile Home"
            />

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/38344546547"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-3 w-full py-4 border border-[#C9A84C] text-[#8B6914] text-xs tracking-[0.12em] uppercase font-medium hover:bg-[#C9A84C] hover:text-[#1C1410] transition-all duration-300 active:scale-[0.98]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Na Shkruani në WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}