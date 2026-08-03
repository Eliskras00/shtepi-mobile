/**
 * SHTËPI MOBILE — Splash Screen
 * Shfaqet 3-4 sekonda në hapje të parë të sajtit, me animacion zgjerimi të logos
 */
import { useState, useEffect } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 3700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img
        src="/logo.jpg"
        alt="Shtëpi Mobile"
        className="w-20 h-20 object-contain rounded-md animate-splash-zoom"
      />
    </div>
  );
}