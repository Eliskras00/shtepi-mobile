import { useRef, useEffect, useState } from "react";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

export default function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
      window.setTimeout(() => setSent(false), 4000);
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setError(
        t(
          "Diçka shkoi keq. Provo përsëri ose na kontakto në WhatsApp.",
          "Something went wrong. Please try again or contact us on WhatsApp."
        )
      );
    } finally {
      setSending(false);
    }
  };

  const contactItems = [
    {
      icon: MapPin,
      title: t("Adresa", "Address"),
      value: "Magjistralja Prizren-Prishtinë në Lubizhdë 20000",
      sub: t("Suharekë, Kosovë", "Suhareka, Kosovo"),
    },
    {
      icon: Phone,
      title: t("Telefoni", "Phone"),
      value: "+383 44 546 547",
      sub: t("Na telefononi çdo ditë", "Call us every day"),
    },
    {
      icon: Clock,
      title: t("Orari", "Opening Hours"),
      value: t("E Hënë – E Shtunë: 08:00 – 16:00", "Monday – Saturday: 08:00 – 16:00"),
      sub: t("E Diel: Mbyllur", "Sunday: Closed"),
    },
  ];

  return (
    <section
      id="kontakti"
      ref={sectionRef}
      className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div
          className={`mb-10 transition-all duration-700 sm:mb-16 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span
              className="text-xs uppercase tracking-[0.2em] text-[#8B6914] sm:tracking-[0.25em]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t("Na Gjeni", "Find Us")}
            </span>
          </div>
          <h2
            className="text-3xl font-semibold leading-tight text-[#1C1410] sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("Vizitoni Showroomin", "Visit Our Showroom")}
            <br />
            <em className="not-italic text-[#8B6914]">{t("tonë", "")}</em>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className={`transition-all duration-700 ${
              inView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <h3
              className="mb-7 text-2xl font-semibold text-[#1C1410] sm:mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("Dërgoni një Mesazh", "Send Us a Message")}
            </h3>

            {sent && (
              <div
                className="mb-6 border border-[#C9A84C] bg-[#C9A84C]/10 px-5 py-4 text-sm text-[#8B6914]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                ✓ {t(
                  "Mesazhi u dërgua me sukses! Do t'ju kontaktojmë së shpejti.",
                  "Your message was sent successfully! We will contact you soon."
                )}
              </div>
            )}

            {error && (
              <div
                className="mb-6 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-700"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#1C1410]/60"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {t("Emri Juaj", "Your Name")}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  required
                  className="w-full border border-[#E8E0D4] bg-white px-4 py-3 text-sm text-[#1C1410] transition-colors duration-300 focus:border-[#C9A84C] focus:outline-none"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  placeholder={t("p.sh. Arjeta Krasniqi", "e.g. Arjeta Krasniqi")}
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#1C1410]/60"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {t("Numri i Telefonit", "Phone Number")}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  required
                  className="w-full border border-[#E8E0D4] bg-white px-4 py-3 text-sm text-[#1C1410] transition-colors duration-300 focus:border-[#C9A84C] focus:outline-none"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  placeholder="+383 44 ..."
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#1C1410]/60"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {t("Mesazhi", "Message")}
                </label>
                <textarea
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  required
                  rows={5}
                  className="w-full resize-none border border-[#E8E0D4] bg-white px-4 py-3 text-sm text-[#1C1410] transition-colors duration-300 focus:border-[#C9A84C] focus:outline-none"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  placeholder={t(
                    "Çfarë mobilje jeni të interesuar?",
                    "What type of furniture are you interested in?"
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-3 bg-[#1C1410] py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#8B6914] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <Send size={14} />
                {sending
                  ? t("Duke dërguar...", "Sending...")
                  : t("Dërgoni Mesazhin", "Send Message")}
              </button>
            </form>
          </div>

          <div
            className={`transition-all duration-700 ${
              inView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="mb-8 space-y-6 sm:mb-10">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center bg-[#E8E0D4]">
                      <Icon size={16} className="text-[#8B6914]" />
                    </div>
                    <div>
                      <div
                        className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#1C1410]/50"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="text-sm font-medium text-[#1C1410]"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {item.value}
                      </div>
                      <div
                        className="mt-0.5 text-xs text-[#1C1410]/50"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d20.7675455!3d42.2457903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353956087dab185%3A0xcab03a3971cf7aa5!2sMobilehome!5e0!3m2!1sen!2sxk!4v1690000000000!5m2!1sen!2sxk"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("Lokacioni i Shtëpi Mobile", "Shtëpi Mobile location")}
              className="h-[320px] sm:h-[450px]"
            />

            <a
              href="https://wa.me/38344546547"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-3 border border-[#C9A84C] py-4 text-xs font-medium uppercase tracking-[0.12em] text-[#8B6914] transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#1C1410] active:scale-[0.98]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("Na Shkruani në WhatsApp", "Message Us on WhatsApp")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
