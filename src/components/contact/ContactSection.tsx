"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { Send, Mail, CheckCircle, AlertCircle, Shield } from "lucide-react";
import { siGithub, siX, siDiscord, siInstagram } from "simple-icons";
import { FaLinkedin } from "react-icons/fa";
import { OTPInput } from "./OTPInput";

function IconSvg({ path, fill }: { path: string; fill: string }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} className="inline-block shrink-0">
      <path d={path} fill={fill} />
    </svg>
  );
}

const socialLinks = [
  { icon: <IconSvg path={siGithub.path} fill="currentColor" />, label: "GitHub", href: "https://github.com/Kakashi21O/Kakashi21O", accent: "rgba(148,163,184," },
  { icon: <FaLinkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/mantu-yadavo1", accent: "rgba(10,102,194," },
  { icon: <Mail size={18} />, label: "Email", href: "mailto:kakashi7gamer@gmail.com?subject=About%20Your%20Portfolio", accent: "rgba(167,139,250," },
  { icon: <IconSvg path={siDiscord.path} fill="currentColor" />, label: "Discord", href: "https://discord.gg/S6jbx9fs2p", accent: "rgba(88,101,242," },
  { icon: <IconSvg path={siInstagram.path} fill="currentColor" />, label: "Instagram", href: "https://instagram.com/mk_yadav_10", accent: "rgba(228,64,95," },
  { icon: <IconSvg path={siX.path} fill="currentColor" />, label: "Twitter / X", href: "#", accent: "rgba(29,161,242," },
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
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formPhase, setFormPhase] = useState<"idle" | "requesting-otp" | "otp-sent" | "verifying" | "success">("idle");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpRef = useRef<string>("");

  const isFormLocked = formPhase !== "idle";

  useEffect(() => {
    if (formPhase === "success") {
      const timer = setTimeout(() => {
        setFormPhase("idle");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setError(null);
        setFieldErrors({});
        setVerificationId(null);
        otpRef.current = "";
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [formPhase]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (formPhase !== "otp-sent" || resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [formPhase, resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formPhase !== "idle") return;
    setError(null);
    setFieldErrors({});
    setFormPhase("requesting-otp");

    try {
      const res = await fetch("/api/contact/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
          setFormPhase("idle");
          return;
        }
        throw new Error(data.error ?? "Failed to send verification code.");
      }

      setVerificationId(data.verificationId);
      setFormPhase("otp-sent");
      setResendCooldown(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send the verification email. Please try again.");
      setFormPhase("idle");
    }
  };

  const handleVerifyClick = async () => {
    const otp = otpRef.current;
    if (!otp || otp.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setError(null);
    setFormPhase("verifying");

    try {
      const res = await fetch("/api/contact/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationId, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Verification failed.");
      }

      setFormPhase("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed. Please try again.");
      setFormPhase("otp-sent");
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !verificationId) return;

    try {
      const res = await fetch("/api/contact/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to resend code.");
      }

      setResendCooldown(60);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't resend the code. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isFormLocked) return;
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors((prev) => {
      if (!prev[e.target.name]) return prev;
      const next = { ...prev };
      delete next[e.target.name];
      return next;
    });
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={isFormLocked} className={`${inputClass} ${fieldErrors.name ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`} placeholder="Your name" />
                {fieldErrors.name && <p className="text-[11px] text-red-400 mt-1">{fieldErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={isFormLocked} className={`${inputClass} ${fieldErrors.email ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`} placeholder="your@email.com" />
                {fieldErrors.email && <p className="text-[11px] text-red-400 mt-1">{fieldErrors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">Subject</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required disabled={isFormLocked} className={`${inputClass} ${fieldErrors.subject ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`} placeholder="What's this about?" />
              {fieldErrors.subject && <p className="text-[11px] text-red-400 mt-1">{fieldErrors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required disabled={isFormLocked} rows={5} maxLength={2000} className={`${inputClass} resize-none ${fieldErrors.message ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`} placeholder="Tell me about your project or idea..." />
              <div className="text-right text-[10px] font-mono text-muted-foreground/30 mt-1">{formData.message.length}/2000</div>
              {fieldErrors.message && <p className="text-[11px] text-red-400 mt-1">{fieldErrors.message}</p>}
            </div>

            {/* OTP Section */}
            <AnimatePresence mode="wait">
              {(formPhase === "otp-sent" || formPhase === "verifying") && verificationId && (
                <motion.div
                  key="otp-section"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-5 rounded-xl border border-primary/15 bg-primary/[0.03] backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield size={14} className="text-primary/70" />
                      <span className="text-xs font-mono text-primary/70 uppercase tracking-wider">Verify your email</span>
                    </div>

                    <p className="text-xs text-muted-foreground/70 mb-4">
                      We sent a verification code to{" "}
                      <span className="text-foreground/80 font-medium">{formData.email}</span>
                    </p>

                    <OTPInput
                      length={6}
                      onComplete={(otp) => { otpRef.current = otp; }}
                      onChange={(otp) => { otpRef.current = otp; }}
                      disabled={formPhase === "verifying"}
                    />

                    <div className="mt-3 text-center">
                      {resendCooldown > 0 ? (
                        <span className="text-[11px] font-mono text-muted-foreground/50">
                          Resend code in {resendCooldown}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResend}
                          disabled={formPhase === "verifying"}
                          className="text-[11px] font-mono text-primary/70 hover:text-primary transition-colors disabled:opacity-40"
                        >
                          Resend code
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error display */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="form-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5"
                >
                  <AlertCircle size={12} className="shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type={formPhase === "otp-sent" ? "button" : "submit"}
              onClick={formPhase === "otp-sent" ? handleVerifyClick : undefined}
              disabled={formPhase === "requesting-otp" || formPhase === "verifying"}
              whileHover={{ scale: formPhase === "success" ? 1 : 1.02 }}
              whileTap={{ scale: formPhase === "success" ? 1 : 0.98 }}
              layout
              className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                formPhase === "success"
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                  : error
                  ? "bg-red-500/20 border border-red-500/40 text-red-400"
                  : "bg-primary text-primary-foreground hover:bg-primary/80 border border-transparent"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {formPhase === "requesting-otp" ? (
                <><div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" /><span>Sending code...</span></>
              ) : formPhase === "otp-sent" || formPhase === "verifying" ? (
                <>{formPhase === "verifying" ? <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" /> : <Shield size={14} />}<span>{formPhase === "verifying" ? "Verifying..." : "Verify & Send"}</span></>
              ) : formPhase === "success" ? (
                <><CheckCircle size={14} /><span>Message Sent!</span></>
              ) : (
                <><Send size={14} /><span>Send Message</span></>
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
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group/link relative flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/3 text-muted-foreground/60 hover:text-foreground hover:bg-white/8 transition-all duration-300 overflow-hidden"
                aria-label={`Contact on ${link.label}`}
              >
                {/* Link glimmer */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${link.accent}0.1), transparent 70%)` }}
                />
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <span className="transition-transform duration-300 group-hover/link:scale-110">{link.icon}</span>
                  <span className="text-sm font-medium">{link.label}</span>
                </div>
              </motion.a>
            ))}
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
