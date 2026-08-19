import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import { supabase, type Product } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

type ProductWithTranslations = Product & {
  name_en?: string | null;
  description_en?: string | null;
  material_en?: string | null;
  tag_en?: string | null;
};

type Category = {
  value: string;
  al: string;
  en: string;
};

const categories: Category[] = [
  { value: "Dhoma Ndenje", al: "Dhoma Ndenje", en: "Living Room" },
  { value: "Dhoma Gjumi", al: "Dhoma Gjumi", en: "Bedroom" },
  { value: "Kuzhinë", al: "Kuzhinë", en: "Kitchen" },
  { value: "Komoda", al: "Komoda", en: "Dressers" },
];

function getProductText(
  product: ProductWithTranslations,
  field: "name" | "description" | "material" | "tag",
  lang: "al" | "en"
) {
  const albanian = product[field] ?? "";
  const english = product[`${field}_en`];
  return lang === "en" && english ? english : albanian;
}

type CategoryPhoto = {
  src: string;
  alt: string;
  productName: string;
};

export default function ProductsSection() {
  const { lang, t } = useLanguage();
  const [products, setProducts] = useState<ProductWithTranslations[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (mounted) {
        setProducts((data ?? []) as ProductWithTranslations[]);
        setLoading(false);
      }
    }

    loadProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const categoryPhotos = useMemo(() => {
    const result: Record<string, CategoryPhoto[]> = {};

    for (const category of categories) {
      const categoryProducts = products.filter(
        (product) => product.category === category.value
      );

      result[category.value] = categoryProducts.flatMap((product) => {
        const images =
          product.images && product.images.length > 0
            ? product.images
            : product.image
              ? [product.image]
              : [];
        const productName = getProductText(product, "name", lang);

        return images.map((src, index) => ({
          src,
          productName,
          alt: `${productName} ${index + 1}`,
        }));
      });
    }

    return result;
  }, [products, lang]);

  const selectedPhotos = activeCategory
    ? categoryPhotos[activeCategory.value] ?? []
    : [];
  const selectedPhoto = selectedPhotos[activePhoto];

  function openCategory(category: Category) {
    setActiveCategory(category);
    setActivePhoto(0);
  }

  function closeCategory() {
    setActiveCategory(null);
    setActivePhoto(0);
  }

  function previousPhoto() {
    setActivePhoto((current) =>
      current === 0 ? selectedPhotos.length - 1 : current - 1
    );
  }

  function nextPhoto() {
    setActivePhoto((current) =>
      current === selectedPhotos.length - 1 ? 0 : current + 1
    );
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!activeCategory) return;
      if (event.key === "Escape") closeCategory();
      if (event.key === "ArrowLeft") previousPhoto();
      if (event.key === "ArrowRight") nextPhoto();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCategory, selectedPhotos.length]);

  return (
    <section id="produktet" className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span
                className="text-xs uppercase tracking-[0.2em] text-[#8B6914] sm:tracking-[0.25em]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {t("Koleksionet Tona", "Our Collections")}
              </span>
            </div>
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
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed text-[#1C1410]/55"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {t(
              "Zgjidhni një kategori për të parë modelet dhe fotot e produkteve.",
              "Choose a category to view its furniture models and photos."
            )}
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-[#1C1410]/50">
            {t("Duke i ngarkuar produktet...", "Loading products...")}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {categories.map((category) => {
              const photos = categoryPhotos[category.value] ?? [];
              const cover = photos[0];

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => openCategory(category)}
                  disabled={photos.length === 0}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#E8E0D4] text-left disabled:cursor-not-allowed sm:rounded-[2.5rem]"
                >
                  {cover ? (
                    <img
                      src={cover.src}
                      alt={cover.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-xs text-[#1C1410]/45">
                      {t("Ende pa foto", "No photos yet")}
                    </div>
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/85 via-[#1C1410]/15 to-transparent" />
                  <span className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <span
                      className="block text-sm font-semibold text-white sm:text-base"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {t(category.al, category.en)}
                    </span>
                    <span
                      className="mt-1 flex items-center gap-1 text-[9px] uppercase tracking-[0.12em] text-[#C9A84C] sm:text-[10px]"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {photos.length > 0
                        ? t("Shiko fotot", "View photos")
                        : t("Shto në Admin", "Add in Admin")}
                      {photos.length > 0 && <ArrowRight size={11} />}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {activeCategory && selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t(activeCategory.al, activeCategory.en)}
          onClick={closeCategory}
        >
          <button
            type="button"
            onClick={closeCategory}
            aria-label={t("Mbyll galerinë", "Close gallery")}
            className="absolute right-3 top-3 z-10 rounded-full p-2 text-white/75 hover:text-white sm:right-6 sm:top-6"
          >
            <X size={30} />
          </button>

          <div
            className="relative flex w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-h-[72vh] max-w-full rounded-[1.5rem] object-contain sm:max-h-[78vh] sm:rounded-[2rem]"
            />

            {selectedPhotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousPhoto}
                  aria-label={t("Foto e mëparshme", "Previous photo")}
                  className="absolute left-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/30 sm:left-4"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  aria-label={t("Foto tjetër", "Next photo")}
                  className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/30 sm:right-4"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <div className="mt-4 text-center text-white">
              <p
                className="text-base font-semibold sm:text-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t(activeCategory.al, activeCategory.en)}
              </p>
              <p className="mt-1 text-xs text-white/60">
                {selectedPhoto.productName} · {activePhoto + 1}/{selectedPhotos.length}
              </p>
            </div>

            {selectedPhotos.length > 1 && (
              <div className="mt-4 flex max-w-full gap-2 overflow-x-auto pb-1">
                {selectedPhotos.map((photo, index) => (
                  <button
                    key={`${photo.src}-${index}`}
                    type="button"
                    onClick={() => setActivePhoto(index)}
                    className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                      index === activePhoto ? "border-[#C9A84C]" : "border-transparent"
                    }`}
                  >
                    <img src={photo.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
