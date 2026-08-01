/**
 * SHTËPI MOBILE — Testimonials Section
 * Dark background with gold accents, carousel
 */
import { useRef, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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

const testimonials = [
  {
    name: "Arjeta Krasniqi",
    location: "Prizren",
    text: "Mobiljet e dhomës sime të ndenjes janë thjesht të mrekullueshme! Cilësia është e jashtëzakonshme dhe shërbimi ishte shumë profesional. I rekomandoj të gjithëve!",
    rating: 5,
    role: "Klienti i Kënaqur",
  },
  {
    name: "Besnik Gashi",
    location: "Prizren",
    text: "Bleva kuzhinën e plotë dhe jam shumë i kënaqur. Çmimi ishte i arsyeshëm dhe montimi u bë brenda 2 ditësh. Ekip shumë profesional!",
    rating: 5,
    role: "Klienti i Kënaqur",
  },
  {
    name: "Vjosa Berisha",
    location: "Suharekë",
    text: "Dhoma e gjumit që bleva është pikërisht siç e imagjinoja. Materialet janë cilësore dhe dizajni është elegant. Faleminderit Shtëpi Mobile!",
    rating: 5,
    role: "Klienti i Kënaqur",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-[#E8E0D4]" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <div
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span
              className="text-[#8B6914] text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Çfarë Thonë Klientët
            </span>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>
          <h2
            className="text-[#1C1410] text-4xl md:text-5xl font-semibold mb-16"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Vlerësimet e Klientëve
          </h2>
        </div>

        {/* Testimonial Card */}
        <div
          className={`transition-all duration-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="bg-white p-10 md:p-14 relative">
            {/* Quote mark */}
            <div
              className="text-[#C9A84C] text-8xl leading-none absolute top-6 left-8 opacity-30"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={16} className="text-[#C9A84C] fill-[#C9A84C]" />
              ))}
            </div>

            <p
              className="text-[#1C1410]/70 text-lg md:text-xl leading-relaxed mb-8 italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "{testimonials[current].text}"
            </p>

            <div>
              <div
                className="text-[#1C1410] font-semibold text-base"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {testimonials[current].name}
              </div>
              <div
                className="text-[#8B6914] text-xs tracking-[0.1em] uppercase mt-1"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {testimonials[current].location} · {testimonials[current].role}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 border border-[#8B6914] text-[#8B6914] flex items-center justify-center hover:bg-[#8B6914] hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 ${
                    i === current ? "w-8 h-1 bg-[#C9A84C]" : "w-2 h-1 bg-[#C9A84C]/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 border border-[#8B6914] text-[#8B6914] flex items-center justify-center hover:bg-[#8B6914] hover:text-white transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
