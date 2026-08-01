/**
 * SHTËPI MOBILE — Brand Banner / Marquee
 * Full-width dark section with gold quote and brand values
 */
export default function BrandBanner() {
  return (
    <section className="bg-[#1C1410] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Left quote */}
          <div className="md:col-span-2">
            <div
              className="text-[#C9A84C]/20 text-8xl leading-none mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "
            </div>
            <blockquote
              className="text-white text-2xl md:text-3xl font-light leading-relaxed -mt-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Çdo mobilje është një histori —
              <br />
              <em className="text-[#C9A84C]">ne e tregojmë atë</em> në shtëpinë tuaj.
            </blockquote>
          </div>

          {/* Right: Brand values */}
          <div className="space-y-6 border-l border-[#C9A84C]/20 pl-8">
            {[
              { num: "I", value: "Cilësi pa kompromis" },
              { num: "II", value: "Dizajn i personalizuar" },
              { num: "III", value: "Shërbim i plotë" },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4">
                <span
                  className="text-[#C9A84C]/40 text-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.num}
                </span>
                <span
                  className="text-white/60 text-sm leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
