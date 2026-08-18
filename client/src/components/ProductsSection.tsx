/**
 * SHTËPI MOBILE — Products Section (Editorial Collection Catalogue)
 * Premium presentation: collection names, materials, atmosphere lead
 * All images: warm European luxury showroom world
 */
import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase, type Product } from "@/lib/supabase";

const categories = ["Të Gjitha", "Dhoma Ndenje", "Dhoma Gjumi", "Kuzhinë", "Komoda"];

function formatPrice(price: number) {
  return new Intl.NumberFormat("sq-AL", { minimumFractionDigits: 0 }).format(price);
}

function ProductImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  function prev(e: React.MouseEvent) {
    e.stopPropagation();
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }

  function next(e: React.MouseEvent) {
    e.stopPropagation();
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }

  function handleImageLoad(index: number) {
    setLoadedImages((prev) => new Set(prev).add(index));
  }

  return (
    <>
      <div className="relative w-full h-full overflow-hidden bg-[#E8E0D4]">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={alt}
            loading={i === 0 ? "eager" : "lazy"}
            onLoad={() => handleImageLoad(i)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${
              i === current && loadedImages.has(i) ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {!loadedImages.has(current) && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#E8E0D4] animate-pulse">
            <div className="w-8 h-8 border-2 border-[#C9A84C]/40 border-t-[#C9A84C] rounded-full animate-spin" />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#1C1410]/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#1C1410]/80"
            aria-label="Foto e mëparshme"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#1C1410]/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#1C1410]/80"
            aria-label="Foto tjetër"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-[#C9A84C] w-4" : "bg-white/60"
                }`}
                aria-label={`Foto ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("Të Gjitha");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setProducts(data);
      });
  }, []);

  const filtered = activeCategory === "Të Gjitha"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="produktet" className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span
              className="text-[#8B6914] text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Koleksionet Tona
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="text-[#1C1410] text-4xl md:text-5xl font-semibold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Produkte për çdo
              <br />
              <em className="text-[#8B6914] not-italic">hapësirë</em>
            </h2>
            <p
              className="text-[#1C1410]/55 text-sm max-w-sm leading-relaxed"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Çdo koleksion është projektuar me kujdes të veçantë, duke kombinuar
              materialet më cilësore me dizajnin bashkëkohor.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs tracking-[0.12em] uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#1C1410] text-[#C9A84C]"
                  : "border border-[#E8E0D4] text-[#1C1410]/50 hover:border-[#C9A84C] hover:text-[#8B6914]"
              }`}
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const images = product.images && product.images.length > 0
              ? product.images
              : [product.image];

            return (
              <div
                key={product.id}
                className="group relative overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <ProductImageCarousel images={images} alt={product.name} />

                  {/* Gradient overlay always present */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/80 via-[#1C1410]/10 to-transparent pointer-events-none" />

                  {/* Tag */}
                  {product.tag && (
                    <span
                      className="absolute top-4 right-4 bg-[#C9A84C] text-[#1C1410] text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 font-bold"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {product.tag}
                    </span>
                  )}

                  {/* Content on image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                    <div
                      className="text-[#C9A84C] text-[9px] tracking-[0.25em] uppercase mb-1.5"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {product.material}
                    </div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3
                        className="text-white text-xl font-semibold leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {product.name}
                      </h3>
                      {product.price != null && (
                        <span
                          className="text-[#C9A84C] text-lg font-semibold whitespace-nowrap"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {formatPrice(product.price)} €
                        </span>
                      )}
                    </div>
                    <p
                      className="text-white/65 text-xs leading-relaxed mb-4"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {product.description}
                    </p>
                    <button
                      onClick={() => document.querySelector("#kontakti")?.scrollIntoView({ behavior: "smooth" })}
                      className="pointer-events-auto flex items-center gap-2 text-[#C9A84C] text-xs tracking-[0.12em] uppercase font-medium hover:gap-4 transition-all duration-300 group/btn"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      Kërko Informacion
                      <ArrowRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-[#E8E0D4]" />
            <p
              className="text-[#1C1410]/45 text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Mbi 200 modele disponueshme
            </p>
            <div className="w-16 h-px bg-[#E8E0D4]" />
          </div>
          <button
            onClick={() => document.querySelector("#kontakti")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 border border-[#8B6914] text-[#8B6914] text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#8B6914] hover:text-white transition-all duration-300 active:scale-[0.97]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Konsultohuni me Dizajnerin
          </button>
        </div>
      </div>
    </section>
  );
}