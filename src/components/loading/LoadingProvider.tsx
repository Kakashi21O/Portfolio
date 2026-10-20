"use client";

import { useState, useSyncExternalStore } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";

const SESSION_KEY = "portfolio-loaded";

const emptySubscribe = () => () => {};

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [showLoader, setShowLoader] = useState(true);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      console.warn("Storage access denied");
    }
    setShowLoader(false);
  };

  if (!isClient) {
    return (
      <>
        <LoadingScreen onComplete={handleComplete} />
        <div className="invisible h-0 overflow-hidden">{children}</div>
      </>
    );
  }

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleComplete} />}
      <div className={showLoader ? "invisible h-0 overflow-hidden" : ""}>{children}</div>
    </>
  );
}
