"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onChange?: (otp: string) => void;
  disabled?: boolean;
}

export function OTPInput({
  length = 6,
  onComplete,
  onChange,
  disabled = false,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

  const focusInput = useCallback(
    (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus();
      }
    },
    [length],
  );

  const handleChange = useCallback(
    (index: number, value: string) => {
      const digits = value.replace(/\D/g, "");

      if (digits.length > 1) {
        const newOtp = Array(length).fill("");
        for (let i = 0; i < Math.min(digits.length, length); i++) {
          newOtp[i] = digits[i];
        }
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
        const nextIndex = Math.min(digits.length, length - 1);
        focusInput(nextIndex);
        if (digits.length >= length) {
          onComplete(digits.slice(0, length));
        }
        return;
      }

      const digit = digits.slice(-1);
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);

      onChange?.(newOtp.join(""));

      if (digit && index < length - 1) {
        focusInput(index + 1);
      }

      if (newOtp.every((d) => d !== "")) {
        onComplete(newOtp.join(""));
      }
    },
    [otp, length, focusInput, onComplete, onChange],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (otp[index]) {
          const newOtp = [...otp];
          newOtp[index] = "";
          setOtp(newOtp);
          onChange?.(newOtp.join(""));
        } else if (index > 0) {
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          onChange?.(newOtp.join(""));
          focusInput(index - 1);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        focusInput(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        focusInput(index + 1);
      }
    },
    [otp, length, focusInput, onChange],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, length);
      const newOtp = Array(length).fill("");
      for (let i = 0; i < pasted.length; i++) {
        newOtp[i] = pasted[i];
      }
      setOtp(newOtp);
      onChange?.(newOtp.join(""));
      const nextIndex = Math.min(pasted.length, length - 1);
      focusInput(nextIndex);

      if (pasted.length === length) {
        onComplete(pasted);
      }
    },
    [length, focusInput, onComplete, onChange],
  );

  useEffect(() => {
    const timer = setTimeout(() => focusInput(0), 100);
    return () => clearTimeout(timer);
  }, [focusInput]);

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={otp[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-mono font-semibold rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-white/[0.07] disabled:opacity-50"
        />
      ))}
    </div>
  );
}
