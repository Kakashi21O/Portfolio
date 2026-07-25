"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";

const SESSION_KEY = "portfolio-loaded";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  // null = unknown (SSR), true = show loader, false = skip
  const [showLoader, setShowLoader] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowLoader(!alreadySeen);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setShowLoader(false);
  };

  // Avoid flash: render nothing until we know
  if (showLoader === null) return null;

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleComplete} />}
      {/* Always mount children so assets load in background */}
      <div className={showLoader ? "invisible" : "visible"}>{children}</div>
    </>
  );
}
