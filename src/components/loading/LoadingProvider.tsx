"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";

const SESSION_KEY = "portfolio-loaded";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    if (alreadySeen) {
      setShowLoader(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && mounted && <LoadingScreen onComplete={handleComplete} />}
      {!mounted && <LoadingScreen onComplete={handleComplete} />}
      <div className={showLoader ? "invisible h-0 overflow-hidden" : "visible"}>{children}</div>
    </>
  );
}
