/**
 * SHTËPI MOBILE — About Section
 * Split layout: text left, image right with decorative elements
 */
import { useRef, useEffect, useState } from "react";
import { Award, Users, Truck, Wrench } from "lucide-react";

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const features = [
  { icon: Award, title: "Cilësi e Garantuar", desc: "Materialet më të mira evropiane" },
  { icon: Truck, title: "Dërgim Falas", desc: "Dërgim dhe montim falas në Prizren" },
  { icon: Wrench, title: "Montim Profesional", desc: "Ekip i specializuar montimi" },
  { icon: Users, title: "Shërbim Personal", desc: "Konsultim falas me dizajner" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);

  return (
    <section id="rreth-nesh" className="py-24 bg-[#FAF7F2]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div
            className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span
                className="text-[#8B6914] text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Historia Jonë
              </span>
            </div>
            <h2
              className="text-[#1C1410] text-4xl md:text-5xl font-semibold mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Pasion për
              <br />
              <em className="text-[#8B6914] not-italic">artizanatin</em> e mobiljes
            </h2>
            <p
              className="text-[#1C1410]/60 text-base leading-relaxed mb-6"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Shtëpi Mobile është themeluar me një vizion të thjeshtë: t'u sjellim
              familjarëve kosovarë mobilje të cilësisë evropiane me çmime të
              arsyeshme. Me mbi 15 vjet eksperiencë, kemi transformuar qindra
              shtëpi në Prizren dhe rrethinë.
            </p>
            <p
              className="text-[#1C1410]/60 text-base leading-relaxed mb-10"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Çdo mobilje që shesim vjen me garanci cilësie dhe shërbim pas
              shitjes. Besojmë se shtëpia juaj meriton vetëm të mirën.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <div className="w-10 h-10 bg-[#E8E0D4] flex items-center justify-center mb-3">
                    <f.icon size={18} className="text-[#8B6914]" />
                  </div>
                  <h4
                    className="text-[#1C1410] text-sm font-semibold mb-1"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {f.title}
                  </h4>
                  <p
                    className="text-[#1C1410]/50 text-xs leading-relaxed"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image with decorative frame */}
          <div
            className={`relative transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative">
              {/* Decorative border */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-[#C9A84C]/30 z-0" />
             <img
  src="/showroom.png"
  alt="Showroom Mobile Home"
  className="relative z-10 w-full aspect-[4/5] object-cover object-top"
/>
              {/* Gold accent badge */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-[#1C1410] p-6 w-40">
                <div
                  className="text-[#C9A84C] text-4xl font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  15+
                </div>
                <div
                  className="text-white/60 text-xs tracking-[0.1em] uppercase mt-1"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Vjet Eksperiencë
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
