import { useRef, useEffect, useState } from "react";
import { Award, Users, Truck, Wrench } from "lucide-react";
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
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

const featureContent = [
  {
    icon: Award,
    al: { title: "Cilësi e Garantuar", desc: "Materialet më të mira evropiane" },
    en: { title: "Guaranteed Quality", desc: "The finest European materials" },
  },
  {
    icon: Truck,
    al: { title: "Dërgim Falas", desc: "Dërgim dhe montim falas në Prizren" },
    en: { title: "Free Delivery", desc: "Free delivery and assembly in Prizren" },
  },
  {
    icon: Wrench,
    al: { title: "Montim Profesional", desc: "Ekip i specializuar montimi" },
    en: { title: "Professional Assembly", desc: "A specialized assembly team" },
  },
  {
    icon: Users,
    al: { title: "Shërbim Personal", desc: "Konsultim falas me dizajner" },
    en: { title: "Personal Service", desc: "Free consultation with a designer" },
  },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="rreth-nesh"
      ref={sectionRef}
      className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className={`transition-all duration-700 ${
              inView
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span
                className="text-xs uppercase tracking-[0.2em] text-[#8B6914] sm:tracking-[0.25em]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {t("Historia Jonë", "Our Story")}
              </span>
            </div>

            <h2
              className="mb-5 text-3xl font-semibold leading-tight text-[#1C1410] sm:mb-6 sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("Pasion për", "A passion for")}
              <br />
              <em className="not-italic text-[#8B6914]">
                {t("artizanatin", "furniture craftsmanship")}
              </em>{" "}
              {t("e mobiljes", "")}
            </h2>

            <p
              className="mb-5 text-base leading-relaxed text-[#1C1410]/60 sm:mb-6"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t(
                "Shtëpi Mobile është themeluar me një vizion të thjeshtë: t'u sjellim familjarëve kosovarë mobilje të cilësisë evropiane me çmime të arsyeshme. Me mbi 15 vjet eksperiencë, kemi transformuar qindra shtëpi në Prizren dhe rrethinë.",
                "Shtëpi Mobile was founded with a simple vision: to bring European-quality furniture to Kosovar families at fair prices. With over 15 years of experience, we have transformed hundreds of homes in Prizren and the surrounding area."
              )}
            </p>

            <p
              className="mb-8 text-base leading-relaxed text-[#1C1410]/60 sm:mb-10"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t(
                "Çdo mobilje që shesim vjen me garanci cilësie dhe shërbim pas shitjes. Besojmë se shtëpia juaj meriton vetëm të mirën.",
                "Every piece of furniture we sell comes with a quality guarantee and after-sales service. We believe your home deserves nothing but the best."
              )}
            </p>

            <div className="grid grid-cols-2 gap-5 sm:gap-6">
              {featureContent.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.al.title}
                    className={`transition-all duration-500 ${
                      inView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${300 + index * 80}ms` }}
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center bg-[#E8E0D4]">
                      <Icon size={18} className="text-[#8B6914]" />
                    </div>
                    <h4
                      className="mb-1 text-sm font-semibold text-[#1C1410]"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {t(feature.al.title, feature.en.title)}
                    </h4>
                    <p
                      className="text-xs leading-relaxed text-[#1C1410]/50"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {t(feature.al.desc, feature.en.desc)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`relative transition-all duration-700 ${
              inView
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative mx-2 sm:mx-4 lg:mx-0">
              <div className="absolute -right-3 -top-3 z-0 h-full w-full border border-[#C9A84C]/30 sm:-right-4 sm:-top-4" />
              <img
                src="/showroom.png"
                alt={t("Showroom Shtëpi Mobile", "Shtëpi Mobile showroom")}
                className="relative z-10 aspect-[4/5] w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute -bottom-5 -left-3 z-20 w-36 bg-[#1C1410] p-5 sm:-bottom-6 sm:-left-6 sm:w-40 sm:p-6">
                <div
                  className="text-3xl font-semibold text-[#C9A84C] sm:text-4xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  15+
                </div>
                <div
                  className="mt-1 text-[10px] uppercase tracking-[0.08em] text-white/60 sm:text-xs sm:tracking-[0.1em]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {t("Vjet Eksperiencë", "Years of Experience")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
