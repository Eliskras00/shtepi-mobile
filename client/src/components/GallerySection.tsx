import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { supabase, type GalleryImage } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

function getImageSpan(span?: string | null) {
  switch (span) {
    case "wide":
      return "md:col-span-2 md:row-span-1";
    case "tall":
      return "md:col-span-1 md:row-span-2";
    case "large":
      return "md:col-span-2 md:row-span-2";
    default:
      return "md:col-span-1 md:row-span-1";
  }
}

export default function GallerySection() {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadGallery() {
      setLoading(true);
      setFetchError(null);

      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!active) return;

      if (error) {
        console.error("Gallery loading error:", error);
        setFetchError(error.message);
      } else {
        setGalleryImages((data ?? []) as GalleryImage[]);
      }

      setLoading(false);
    }

    loadGallery();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLightbox(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (loading) {
    return (
      <section className="bg-[#1C1410] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-white/50 sm:px-6 lg:px-12">
          {t("Duke i ngarkuar fotot...", "Loading photos...")}
        </div>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className="bg-[#1C1410] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-white/50 sm:px-6 lg:px-12">
          {t("Gabim gjatë ngarkimit të galerisë.", "Error loading the gallery.")}
        </div>
      </section>
    );
  }

  if (galleryImages.length === 0) return null;

  return (
    <section id="galeria" className="bg-[#1C1410] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span
              className="text-xs uppercase tracking-[0.2em] text-[#C9A84C] sm:tracking-[0.25em]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t("Puna Jonë", "Our Work")}
            </span>
          </div>
          <h2
            className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("Galeria e", "Gallery of")}
            <em className="not-italic text-[#C9A84C]">
              {t(" Projekteve", " Projects")}
            </em>
          </h2>
        </div>

        <div className="grid grid-cols-1 auto-rows-[220px] gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:auto-rows-[250px]">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              type="button"
              aria-label={t("Hap foton", "Open photo")}
              className={`group relative min-h-0 w-full overflow-hidden rounded-sm text-left ${getImageSpan(image.span)}`}
              onClick={() => setLightbox(image)}
            >
              <img
                src={image.src}
                alt={image.alt || t("Foto e galerisë", "Gallery image")}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-[#1C1410]/0 transition-all duration-500 group-hover:bg-[#1C1410]/50">
                <span className="flex flex-col items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ZoomIn className="text-white" size={28} aria-hidden="true" />
                  <span
                    className="max-w-[90%] text-center text-xs uppercase tracking-[0.15em] text-white"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {image.alt}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t("Foto e galerisë", "Gallery image")}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label={t("Mbyll foton", "Close photo")}
            className="absolute right-3 top-3 rounded-full p-2 text-white/70 transition-colors hover:text-white sm:right-6 sm:top-6"
            onClick={() => setLightbox(null)}
          >
            <X size={30} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt || t("Foto e galerisë", "Gallery image")}
            className="max-h-[88vh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
