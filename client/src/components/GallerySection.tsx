/**
 * SHTËPI MOBILE — Gallery Section
 * Masonry-style grid with lightbox effect
 * Lexon fotot nga Supabase (tabela gallery_images)
 */
import { useState, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";
import { supabase, type GalleryImage } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GallerySection() {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          setFetchError(error.message);
        } else if (data) {
          setGalleryImages(data);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (loading) return null;

  if (fetchError) {
    console.error("Gabim gjatë ngarkimit të galerisë:", fetchError);
    return (
      <section className="py-24 bg-[#1C1410]">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/50 text-sm">
          {t("Gabim gjatë ngarkimit të galerisë.", "Error loading the gallery.")}
        </div>
      </section>
    );
  }

  if (galleryImages.length === 0) return null;

  return (
    <section id="galeria" className="py-24 bg-[#1C1410]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span
              className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t("Puna Jonë", "Our Work")}
            </span>
          </div>
          <h2
            className="text-white text-4xl md:text-5xl font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("Galeria e", "Gallery of")}
            <em className="text-[#C9A84C] not-italic">
              {t(" Projekteve", " Projects")}
            </em>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className={`relative group overflow-hidden cursor-pointer ${img.span}`}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#1C1410]/0 group-hover:bg-[#1C1410]/50 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center gap-2">
                  <ZoomIn className="text-white" size={28} />
                  <span
                    className="text-white text-xs tracking-[0.15em] uppercase"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {img.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}