import { useRef, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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

const testimonials = [
  {
    name: "Arjeta Krasniqi",
    location: "Prizren",
    al: "Mobiljet e dhomës sime të ndenjes janë thjesht të mrekullueshme! Cilësia është e jashtëzakonshme dhe shërbimi ishte shumë profesional. I rekomandoj të gjithëve!",
    en: "The furniture in my living room is simply wonderful! The quality is exceptional and the service was very professional. I recommend them to everyone!",
    rating: 5,
  },
  {
    name: "Besnik Gashi",
    location: "Prizren",
    al: "Bleva kuzhinën e plotë dhe jam shumë i kënaqur. Çmimi ishte i arsyeshëm dhe montimi u bë brenda 2 ditësh. Ekip shumë profesional!",
    en: "I bought a complete kitchen and I am very satisfied. The price was reasonable and the installation was completed within two days. A very professional team!",
    rating: 5,
  },
  {
    name: "Vjosa Berisha",
    location: "Suharekë",
    al: "Dhoma e gjumit që bleva është pikërisht siç e imagjinoja. Materialet janë cilësore dhe dizajni është elegant. Faleminderit Shtëpi Mobile!",
    en: "The bedroom I bought is exactly as I imagined it. The materials are high quality and the design is elegant. Thank you, Shtëpi Mobile!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  const prev = () =>
    setCurrent((index) => (index - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setCurrent((index) => (index + 1) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section
      ref={sectionRef}
      className="bg-[#E8E0D4] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-12">
        <div
          className={`transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span
              className="text-xs uppercase tracking-[0.2em] text-[#8B6914] sm:tracking-[0.25em]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t("Çfarë Thonë Klientët", "What Our Clients Say")}
            </span>
            <div className="h-px w-8 bg-[#C9A84C]" />
          </div>
          <h2
            className="mb-10 text-3xl font-semibold text-[#1C1410] sm:mb-16 sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("Vlerësimet e Klientëve", "Client Reviews")}
          </h2>
        </div>

        <div
          className={`transition-all duration-700 ${
            inView ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="relative bg-white p-7 sm:p-10 md:p-14">
            <div
              className="absolute left-4 top-3 text-7xl leading-none text-[#C9A84C] opacity-30 sm:left-8 sm:top-6 sm:text-8xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
              aria-hidden="true"
            >
              “
            </div>

            <div className="mb-5 flex justify-center gap-1 sm:mb-6">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className="fill-[#C9A84C] text-[#C9A84C]"
                  aria-hidden="true"
                />
              ))}
            </div>

            <p
              className="mb-7 text-base italic leading-relaxed text-[#1C1410]/70 sm:mb-8 sm:text-lg md:text-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              “{t(testimonial.al, testimonial.en)}”
            </p>

            <div>
              <div
                className="text-base font-semibold text-[#1C1410]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {testimonial.name}
              </div>
              <div
                className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[#8B6914] sm:text-xs sm:tracking-[0.1em]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {testimonial.location} · {t("Klienti i Kënaqur", "Satisfied Client")}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8 sm:gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label={t("Vlerësimi i mëparshëm", "Previous review")}
              className="flex h-10 w-10 items-center justify-center border border-[#8B6914] text-[#8B6914] transition-all duration-300 hover:bg-[#8B6914] hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={t(`Shfaq vlerësimin ${index + 1}`, `Show review ${index + 1}`)}
                  className={`h-1 transition-all duration-300 ${
                    index === current
                      ? "w-8 bg-[#C9A84C]"
                      : "w-2 bg-[#C9A84C]/30"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label={t("Vlerësimi tjetër", "Next review")}
              className="flex h-10 w-10 items-center justify-center border border-[#8B6914] text-[#8B6914] transition-all duration-300 hover:bg-[#8B6914] hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
