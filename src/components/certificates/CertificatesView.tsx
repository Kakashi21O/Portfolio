"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ExternalLink, Award } from "lucide-react";
import { certificates, type Certificate } from "@/data/certificates";
import { publicPath } from "@/lib/utils";
import { useCursor } from "@/components/cursor/CursorContext";

export function CertificatesView() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const { setCursorState } = useCursor();

  const handleClose = useCallback(() => {
    setSelectedCert(null);
  }, []);

  // Keyboard navigation: Escape closes modal
  useEffect(() => {
    if (!selectedCert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCert, handleClose]);

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground flex flex-col justify-between pt-28 pb-16 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto overflow-x-hidden">
      {/* Background ambient glow matching portfolio style */}
      <div className="fixed top-24 -left-32 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-20 -right-32 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div>
        {/* Header with Navigation and Title */}
        <div className="w-full mb-12 md:mb-16">



          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-between gap-4 mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-10 bg-primary/50" />
              <span className="text-xs font-mono text-primary uppercase tracking-[0.2em]">
                Certifications &amp; Achievements
              </span>
            </div>

            <span className="text-xs font-mono text-muted-foreground/40 uppercase tracking-widest hidden sm:inline-flex items-center gap-1.5">
              <Award size={14} className="text-primary" />
              Verified Credentials
            </span>
          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-medium tracking-tight text-foreground max-w-3xl leading-tight"
          >
            Certificates of Completion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-sm md:text-base text-muted-foreground/70 mt-3 max-w-2xl leading-relaxed"
          >
            A curated record of professional training, hands-on internships, and technical certifications. Click any certificate to inspect full-size.
          </motion.p>
        </div>

        {/* Auto-responsive Grid for Certificate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedCert(cert)}
              onMouseEnter={() => setCursorState("hovering_link")}
              onMouseLeave={() => setCursorState("default")}
              role="button"
              tabIndex={0}
              aria-label={`View ${cert.title} certificate`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
              className="group relative flex flex-col cursor-pointer rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-primary/30 transition-all duration-300 overflow-hidden shadow-lg shadow-black/20"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 border-b border-white/5">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white/70 group-hover:text-white group-hover:border-primary/40 transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                  <ExternalLink size={16} />
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
                    {cert.title}
                  </h2>
                  {cert.issuer && (
                    <p className="text-xs text-muted-foreground/60 mt-1.5 font-mono line-clamp-1">
                      {cert.issuer}
                    </p>
                  )}
                </div>
                {cert.date && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-muted-foreground/40 uppercase tracking-wider">
                      Issued
                    </span>
                    <span className="text-xs font-mono text-primary/80">
                      {cert.date}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer minimal info */}
      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground/30">
        <p>&copy; {new Date().getFullYear()} Mantu Yadav. All rights reserved.</p>
        <Link
          href="/"
          onMouseEnter={() => setCursorState("hovering_link")}
          onMouseLeave={() => setCursorState("default")}
          className="hover:text-foreground transition-colors"
        >
          Return to portfolio &rarr;
        </Link>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/60 overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/3 backdrop-blur-sm z-10 shrink-0">
                <div className="pr-4">
                  <h3
                    id="modal-title"
                    className="text-base sm:text-lg font-semibold tracking-tight text-foreground truncate"
                  >
                    {selectedCert.title}
                  </h3>
                  {selectedCert.issuer && (
                    <p className="text-xs font-mono text-muted-foreground/60 truncate">
                      {selectedCert.issuer}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleClose}
                  onMouseEnter={() => setCursorState("hovering_button")}
                  onMouseLeave={() => setCursorState("default")}
                  className="p-2 rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Close certificate preview"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Image Display */}
              <div className="relative flex-1 min-h-[300px] max-h-[75vh] w-full bg-black/60 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                <div className="relative w-full h-full max-h-[72vh] flex items-center justify-center">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[72vh] max-w-full w-auto h-auto object-contain rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
