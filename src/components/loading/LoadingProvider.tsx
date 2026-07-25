"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";

const SESSION_KEY = "portfolio-loaded";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    setShowLoader(!alreadySeen);
    setMounted(true);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
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
