import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "al" | "en";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (al: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("site_lang");
    return saved === "en" ? "en" : "al";
  });

  function toggleLang() {
    setLang((prev) => {
      const next = prev === "al" ? "en" : "al";
      localStorage.setItem("site_lang", next);
      return next;
    });
  }

  function t(al: string, en: string) {
    return lang === "al" ? al : en;
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage duhet përdorur brenda LanguageProvider");
  return ctx;
}