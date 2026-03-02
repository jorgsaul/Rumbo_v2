"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils/cn";

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  value = "",
  onChange,
  error,
  disabled = false,
  className,
}: OTPInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value
    .split("")
    .concat(Array(length).fill(""))
    .slice(0, length);

  const focusNext = (index: number) => inputs.current[index + 1]?.focus();
  const focusPrev = (index: number) => inputs.current[index - 1]?.focus();

  const handleChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char.slice(-1);
    onChange(newDigits.join(""));

    if (char) focusNext(index);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index]) focusPrev(index);
    if (e.key === "ArrowLeft") focusPrev(index);
    if (e.key === "ArrowRight") focusNext(index);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    onChange(pasted.padEnd(length, "").slice(0, length));
    inputs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-2 justify-center">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              "w-11 h-12 text-center text-lg font-semibold rounded-xl border-2",
              "transition-all duration-200 outline-none",
              "dark:bg-neutral-900",
              digit
                ? "border-primary text-primary dark:text-primary"
                : "border-gray-200 dark:border-neutral-700 text-neutral-900 dark:text-white",
              "hover:border-primary/50 focus:border-primary",
              error && "border-danger focus:border-danger",
              disabled && "opacity-50 cursor-not-allowed",
            )}
          />
        ))}
      </div>

      {error && <p className="text-xs text-danger text-center">{error}</p>}
    </div>
  );
}
