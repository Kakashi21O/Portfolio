"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  { icon: <IconSvg path={siGithub.path} fill="currentColor" />, label: "GitHub", href: "https://github.com/Kakashi21O/Kakashi21O", color: "hover:text-foreground" },
  { icon: <FaLinkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/mantu-yadavo1", color: "hover:text-[#0a66c2]" },
  { icon: <Mail size={18} />, label: "Email", href: "mailto:https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=kakashi7gamer@gmail.com&su=About%20Your%20Portfolio%20Website", color: "hover:text-primary" },
  { icon: <IconSvg path={siDiscord.path} fill="currentColor" />, label: "Discord", href: "https://discord.gg/https://discord.gg/S6jbx9fs2p", color: "hover:text-[#5865f2]" },
  { icon: <IconSvg path={siInstagram.path} fill="currentColor" />, label: "Instagram", href: "https://instagram.com/mk_yadav_10", color: "hover:text-[#e4405f]" },
  { icon: <IconSvg path={siX.path} fill="currentColor" />, label: "Twitter / X", href: "#", color: "hover:text-[#1da1f2]" },
];

export function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate form submission
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormState("idle"), 4000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-center items-center overflow-visible"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-40 -right-24 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none -z-10"
      />
      <div
        className="absolute bottom-40 -left-24 w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10"
      />

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
          <h2 className="text-sm font-mono text-primary uppercase tracking-[0.2em]">
            Contact
          </h2>
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
        {/* Left: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                maxLength={2000}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
                placeholder="Tell me about your project or idea..."
              />
              <div className="text-right text-[10px] font-mono text-muted-foreground/30 mt-1">
                {formData.message.length}/2000
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={formState === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                formState === "success"
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                  : formState === "error"
                  ? "bg-red-500/20 border border-red-500/40 text-red-400"
                  : "bg-primary text-primary-foreground hover:bg-primary/80 border border-transparent"
              }`}
            >
              {formState === "sending" ? (
                <>
                  <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : formState === "success" ? (
                <>
                  <CheckCircle size={14} />
                  <span>Message Sent!</span>
                </>
              ) : formState === "error" ? (
                <>
                  <AlertCircle size={14} />
                  <span>Failed — Try Again</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Right: Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2"
        >
          <div className="p-6 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm shadow-xl shadow-black/20">
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
                  className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/3 text-muted-foreground/60 ${link.color} hover:bg-white/8 hover:border-white/10 transition-all duration-300`}
                  aria-label={`Contact on ${link.label}`}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
