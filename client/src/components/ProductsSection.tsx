import { useEffect, useState, type MouseEvent } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase, type Product } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

type ProductWithTranslations = Product & {
  name_en?: string | null;
  description_en?: string | null;
  material_en?: string | null;
  tag_en?: string | null;
  category_en?: string | null;
};

const categoryOptions = [
  { value: "Të Gjitha", al: "Të Gjitha", en: "All" },
  { value: "Dhoma Ndenje", al: "Dhoma Ndenje", en: "Living Room" },
  { value: "Dhoma Gjumi", al: "Dhoma Gjumi", en: "Bedroom" },
  { value: "Kuzhinë", al: "Kuzhinë", en: "Kitchen" },
  { value: "Komoda", al: "Komoda", en: "Dressers" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
  }).format(price);
}

function ProductImageCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  function prev(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setCurrent((index) => (index === 0 ? images.length - 1 : index - 1));
  }

  function next(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setCurrent((index) => (index === images.length - 1 ? 0 : index + 1));
  }

  return (
    <>
      <div className="relative h-full w-full overflow-hidden bg-[#E8E0D4]">
        {images.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={alt}
            loading={index === 0 ? "eager" : "lazy"}
            onLoad={() =>
              setLoadedImages((previous) => new Set(previous).add(index))
            }
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${
              index === current && loadedImages.has(index)
                ? "opacity-100"
                : "opacity-0"
            }`}
          />
        ))}

        {!loadedImages.has(current) && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#E8E0D4]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A84C]/40 border-t-[#C9A84C]" />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label={t("Foto e mëparshme", "Previous photo")}
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#1C1410]/50 text-white opacity-0 transition-opacity duration-300 hover:bg-[#1C1410]/80 group-hover:opacity-100"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={t("Foto tjetër", "Next photo")}
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#1C1410]/50 text-white opacity-0 transition-opacity duration-300 hover:bg-[#1C1410]/80 group-hover:opacity-100"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrent(index);
                }}
                aria-label={t(`Foto ${index + 1}`, `Photo ${index + 1}`)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current ? "w-4 bg-[#C9A84C]" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function ProductsSection() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Të Gjitha");
  const [products, setProducts] = useState<ProductWithTranslations[]>([]);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;
      if (!error && data) setProducts(data as ProductWithTranslations[]);
    }

    loadProducts();
    return () => {
      active = false;
    };
  }, []);

  const filtered =
    activeCategory === "Të Gjitha"
      ? products
      : products.filter((product) => product.category === activeCategory);

  function getProductText(
    product: ProductWithTranslations,
    field: "name" | "description" | "material" | "tag"
  ) {
    const albanian = product[field] ?? "";
    const english = product[`${field}_en`];
    return lang === "en" && english ? english : albanian;
  }

  return (
    <section id="produktet" className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span
              className="text-xs uppercase tracking-[0.2em] text-[#8B6914] sm:tracking-[0.25em]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t("Koleksionet Tona", "Our Collections")}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-6">
            <h2
              className="text-3xl font-semibold leading-tight text-[#1C1410] sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("Produkte për çdo", "Products for every")}
              <br />
              <em className="not-italic text-[#8B6914]">
                {t("hapësirë", "space")}
              </em>
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed text-[#1C1410]/55"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t(
                "Çdo koleksion është projektuar me kujdes të veçantë, duke kombinuar materialet më cilësore me dizajnin bashkëkohor.",
                "Every collection is carefully designed, combining the finest materials with contemporary design."
              )}
            </p>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 sm:mb-14">
          {categoryOptions.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setActiveCategory(category.value)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.1em] transition-all duration-300 sm:px-5 sm:tracking-[0.12em] ${
                activeCategory === category.value
                  ? "bg-[#1C1410] text-[#C9A84C]"
                  : "border border-[#E8E0D4] text-[#1C1410]/50 hover:border-[#C9A84C] hover:text-[#8B6914]"
              }`}
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t(category.al, category.en)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filtered.map((product) => {
            const images =
              product.images && product.images.length > 0
                ? product.images
                : [product.image];
            const productName = getProductText(product, "name");
            const productDescription = getProductText(product, "description");
            const productMaterial = getProductText(product, "material");
            const productTag = getProductText(product, "tag");

            return (
              <article key={product.id} className="group relative overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProductImageCarousel images={images} alt={productName} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1410]/80 via-[#1C1410]/10 to-transparent" />

                  {productTag && (
                    <span
                      className="absolute right-4 top-4 bg-[#C9A84C] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1C1410]"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {productTag}
                    </span>
                  )}

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div
                      className="mb-1.5 text-[9px] uppercase tracking-[0.25em] text-[#C9A84C]"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {productMaterial}
                    </div>
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h3
                        className="text-lg font-semibold leading-tight text-white sm:text-xl"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {productName}
                      </h3>
                      {product.price != null && (
                        <span
                          className="whitespace-nowrap text-base font-semibold text-[#C9A84C] sm:text-lg"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {formatPrice(product.price)} €
                        </span>
                      )}
                    </div>
                    <p
                      className="mb-4 text-xs leading-relaxed text-white/65"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {productDescription}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .querySelector("#kontakti")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="pointer-events-auto flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-[#C9A84C] transition-all duration-300 hover:gap-4 group/btn sm:tracking-[0.12em]"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {t("Kërko Informacion", "Request Information")}
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center sm:mt-16">
          <div className="mb-6 flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-px w-10 bg-[#E8E0D4] sm:w-16" />
            <p
              className="text-center text-[10px] uppercase tracking-[0.1em] text-[#1C1410]/45 sm:text-xs sm:tracking-[0.15em]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t("Mbi 200 modele disponueshme", "Over 200 models available")}
            </p>
            <div className="h-px w-10 bg-[#E8E0D4] sm:w-16" />
          </div>
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#kontakti")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-[#8B6914] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.12em] text-[#8B6914] transition-all duration-300 hover:bg-[#8B6914] hover:text-white active:scale-[0.97] sm:px-10 sm:py-4 sm:tracking-[0.15em]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {t("Konsultohuni me Dizajnerin", "Consult with a Designer")}
          </button>
        </div>
      </div>
    </section>
  );
}
