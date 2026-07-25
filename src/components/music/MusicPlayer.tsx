"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, X } from "lucide-react";

const TRACKS = [
  { id: 1, title: "Ambient Focus", artist: "Lo-Fi", src: "" },
  { id: 2, title: "Deep Work", artist: "Chillhop", src: "" },
  { id: 3, title: "Coding Flow", artist: "Instrumental", src: "" },
];

const STORAGE_KEY = "portfolio-music-state";

function loadState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);

  // Init audio element + restore state
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const saved = loadState();
    if (saved) {
      if (typeof saved.trackIndex === "number") setTrackIndex(saved.trackIndex);
      if (typeof saved.volume === "number") setVolume(saved.volume);
      if (typeof saved.muted === "boolean") setMuted(saved.muted);
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Sync track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = TRACKS[trackIndex];
    if (track.src) {
      audio.src = track.src;
      if (isPlaying) audio.play().catch(() => {});
    }
  }, [trackIndex]);

  // Sync volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // Persist state
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ trackIndex, volume, muted })
    );
  }, [trackIndex, volume, muted]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "m" || e.key === "M") {
        togglePlay();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // If track has no source, just toggle UI state for demo
    const track = TRACKS[trackIndex];
    if (!track.src) {
      setIsPlaying((p) => !p);
      return;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying((p) => !p);
  }, [isPlaying, trackIndex]);

  const nextTrack = useCallback(() => {
    setTrackIndex((i) => (i + 1) % TRACKS.length);
  }, []);

  const prevTrack = useCallback(() => {
    setTrackIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  }, []);

  const track = TRACKS[trackIndex];

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.4 }}
        onClick={() => setIsOpen((p) => !p)}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full border border-white/10 bg-white/8 backdrop-blur-xl shadow-lg shadow-black/20 flex items-center justify-center text-muted-foreground/50 hover:text-foreground hover:border-white/20 transition-all duration-300"
        aria-label={isOpen ? "Close music player" : "Open music player"}
      >
        {isOpen ? <X size={16} /> : <Music size={16} />}
      </motion.button>

      {/* Player Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-6 z-50 w-64 sm:w-72 p-4 rounded-2xl border border-white/8 bg-background/90 backdrop-blur-2xl shadow-2xl shadow-black/30"
          >
            {/* Track Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Music size={16} className="text-primary/60" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
                <p className="text-[11px] text-muted-foreground/40 truncate">{track.artist}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <button
                onClick={prevTrack}
                className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-white/5 transition-all"
                aria-label="Previous track"
              >
                <SkipBack size={14} />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary hover:bg-primary/25 transition-all"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>

              <button
                onClick={nextTrack}
                className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-white/5 transition-all"
                aria-label="Next track"
              >
                <SkipForward size={14} />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMuted((p) => !p)}
                className="p-1 rounded text-muted-foreground/30 hover:text-foreground/60 transition-colors"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (muted) setMuted(false);
                }}
                className="flex-1 h-1 appearance-none bg-white/10 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary/60"
                aria-label="Volume"
              />
            </div>

            {/* Track List */}
            <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
              {TRACKS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setTrackIndex(i)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-all ${
                    i === trackIndex
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground/35 hover:text-foreground/60 hover:bg-white/3"
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>

            <p className="mt-3 text-[9px] font-mono text-muted-foreground/15 text-center">
              Press <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/5">M</kbd> to toggle
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
