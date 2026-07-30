"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";

const SESSION_KEY = "portfolio-loaded";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    setShowLoader(true); // Always show for now so you can see the effect!
    setMounted(true);
  }, []);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch (e) {
      console.warn("Storage access denied");
    }
    setShowLoader(false);
  };

  // On SSR and before mount, render children directly (no loader)
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleComplete} />}
      <div className={showLoader ? "invisible h-0 overflow-hidden" : ""}>{children}</div>
    </>
  );
}
