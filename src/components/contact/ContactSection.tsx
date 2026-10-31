"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { siGithub, siX, siDiscord, siInstagram } from "simple-icons";
import { FaLinkedin } from "react-icons/fa";

function IconSvg({ path, fill }: { path: string; fill: string }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} className="inline-block shrink-0">
      <path d={path} fill={fill} />
    </svg>
  );
}

const socialLinks = [
  { icon: <IconSvg path={siGithub.path} fill="currentColor" />, label: "GitHub", href: "https://github.com/Kakashi21O/Kakashi21O", accent: "rgba(148,163,184,", color: "#94a3b8" },
  { icon: <FaLinkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/mantu-yadavo1", accent: "rgba(10,102,194,", color: "#0a66c2" },
  { icon: <Mail size={18} />, label: "Email", href: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=kakashi7gamer@gmail.com&su=About%20Your%20Portfolio", accent: "rgba(167,139,250,", color: "#a78bfa" },
  { icon: <IconSvg path={siDiscord.path} fill="currentColor" />, label: "Discord", href: "https://discord.gg/S6jbx9fs2p", accent: "rgba(88,101,242,", color: "#5865f2" },
  { icon: <IconSvg path={siInstagram.path} fill="currentColor" />, label: "Instagram", href: "https://instagram.com/mk_yadav_10", accent: "rgba(228,64,95,", color: "#e4405f" },
  { icon: <IconSvg path={siX.path} fill="currentColor" />, label: "Twitter / X", href: "https://x.com/nova12O", accent: "rgba(29,161,242,", color: "#1da1f2" },
];

const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };

function useTilt() {
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), springConfig);
  const liftY = useSpring(0, { stiffness: 300, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);
  const hasTilt = !reducedMotion;

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!hasTilt) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    ref.current?.style.setProperty("--glow-x", `${x * 100}%`);
    ref.current?.style.setProperty("--glow-y", `${y * 100}%`);
  }, [mouseX, mouseY, hasTilt]);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
    if (!hasTilt) return;
    liftY.set(-4);
  }, [hasTilt, liftY]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    if (!hasTilt) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
    liftY.set(0);
    ref.current?.style.setProperty("--glow-x", "50%");
    ref.current?.style.setProperty("--glow-y", "50%");
  }, [hasTilt, mouseX, mouseY, liftY]);

  return { ref, isHovered, hasTilt, rotateX, rotateY, liftY, handlePointerMove, handlePointerEnter, handlePointerLeave };
}

function FormCard() {
  const { ref, isHovered, hasTilt, rotateX, rotateY, liftY, handlePointerMove, handlePointerEnter, handlePointerLeave } = useTilt();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", botcheck: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", subject: "", message: "", botcheck: "" });
        setErrorMsg(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Honeypot spam check - if bot filled this hidden field, silently reject
    if (formData.botcheck) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
      } else {
        throw new Error(result.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try emailing directly.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-sm text-foreground placeholder:text-muted-foreground/30 outline-none transition-all duration-300 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-white/[0.07] disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-3"
      style={{ perspective: hasTilt ? 1000 : undefined }}
    >
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: hasTilt ? rotateX : 0,
          rotateY: hasTilt ? rotateY : 0,
          y: hasTilt ? liftY : 0,
          borderColor: isHovered ? "rgba(167,139,250,0.3)" : undefined,
        }}
        className="relative p-6 sm:p-8 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-xl shadow-black/20 transition-all duration-500 hover:bg-white/8"
      >
        {/* Glimmer */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered && hasTilt ? 1 : 0,
            background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(167,139,250,0.06), transparent 60%)`,
          }}
        />
        {/* Top edge strip */}
        <div
          className="absolute top-0 left-10 right-10 h-px pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)",
          }}
        />

        <div className="relative z-10" style={{ transform: hasTilt ? "translateZ(12px)" : undefined }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot hidden input for anti-spam */}
            <input
              type="checkbox"
              name="botcheck"
              checked={!!formData.botcheck}
              onChange={(e) => setFormData((prev) => ({ ...prev, botcheck: e.target.checked ? "bot" : "" }))}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  suppressHydrationWarning
                  className={inputClass}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={status === "submitting"}
                className={inputClass}
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === "submitting"}
                rows={5}
                maxLength={2000}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your project or idea..."
              />
              <div className="text-right text-[10px] font-mono text-muted-foreground/30 mt-1">{formData.message.length}/2000</div>
            </div>

            {/* Error display */}
            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.div
                  key="form-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5"
                >
                  <AlertCircle size={12} className="shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === "submitting"}
              whileHover={{ scale: status === "success" ? 1 : 1.02 }}
              whileTap={{ scale: status === "success" ? 1 : 0.98 }}
              layout
              className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                status === "success"
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                  : status === "error"
                  ? "bg-red-500/20 border border-red-500/40 text-red-400"
                  : "bg-primary text-primary-foreground hover:bg-primary/80 border border-transparent"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {status === "submitting" ? (
                <>
                  <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                  <span>Sending message...</span>
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle size={14} />
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SocialCard() {
  const { ref, isHovered, hasTilt, rotateX, rotateY, liftY, handlePointerMove, handlePointerEnter, handlePointerLeave } = useTilt();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-2"
      style={{ perspective: hasTilt ? 1000 : undefined }}
    >
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: hasTilt ? rotateX : 0,
          rotateY: hasTilt ? rotateY : 0,
          y: hasTilt ? liftY : 0,
          borderColor: isHovered ? "rgba(167,139,250,0.3)" : undefined,
        }}
        className="relative p-6 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-xl shadow-black/20 transition-all duration-500 hover:bg-white/8"
      >
        {/* Glimmer */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered && hasTilt ? 1 : 0,
            background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(167,139,250,0.06), transparent 60%)`,
          }}
        />
        {/* Top edge strip */}
        <div
          className="absolute top-0 left-8 right-8 h-px pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)",
          }}
        />

        <div className="relative z-10" style={{ transform: hasTilt ? "translateZ(12px)" : undefined }}>
          <h3 className="text-lg font-semibold text-foreground tracking-tight mb-2">
            Get in Touch
          </h3>
          <p className="text-xs text-muted-foreground/60 leading-relaxed mb-6">
            Prefer reaching out directly? Connect with me on any of these platforms.
          </p>

          <div className="space-y-3">
            {socialLinks.map((link, i) => {
              const active = hoverIdx === i;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                  className="relative flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/3 text-muted-foreground/60 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                  aria-label={`Contact on ${link.label}`}
                >
                  {/* Link glimer */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-500"
                    style={{
                      opacity: active ? 1 : 0,
                      background: `radial-gradient(circle at 50% 0%, ${link.accent}0.25), transparent 70%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-700"
                    style={{
                      opacity: active ? 1 : 0,
                      background: `radial-gradient(circle at 50% 50%, ${link.accent}0.08), transparent 80%)`,
                    }}
                  />
                  <div className="relative z-10 flex items-center gap-3 w-full">
                    <span
                      className="transition-all duration-300"
                      style={{ color: active ? link.color : undefined, scale: active ? "1.1" : "1" }}
                    >
                      {link.icon}
                    </span>
                    <span
                      className="text-sm font-medium transition-colors duration-300"
                      style={{ color: active ? link.color : undefined }}
                    >
                      {link.label}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Ambient glows */}
      <div className="absolute top-40 -right-24 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 -left-24 w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="w-full text-center md:text-left mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-6 justify-center md:justify-start"
        >
          <div className="h-[1px] w-12 bg-primary/50" />
          <h2 className="text-sm font-mono text-primary uppercase tracking-[0.2em]">Contact</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground max-w-3xl leading-tight"
        >
          Let&apos;s build something great together.
        </motion.p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8">
        <FormCard />
        <SocialCard />
      </div>
    </section>
  );
}
