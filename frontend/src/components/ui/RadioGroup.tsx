"use client";

import { cn } from "@/lib/utils/cn";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  direction?: "vertical" | "horizontal";
}

export function RadioGroup({
  options,
  value,
  onChange,
  error,
  className,
  direction = "vertical",
}: RadioGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className={cn(
          "flex gap-3",
          direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
        )}
      >
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 text-left",
                "transition-all duration-200 cursor-pointer w-full",
                isSelected
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-gray-200 dark:border-neutral-700 hover:border-primary/40 hover:bg-gray-50 dark:hover:bg-neutral-800",
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                  isSelected
                    ? "border-primary"
                    : "border-gray-300 dark:border-neutral-600",
                )}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>

              {option.icon && (
                <span className="shrink-0 text-neutral-500">{option.icon}</span>
              )}

              <div className="flex flex-col">
                <span
                  className={cn(
                    "font-medium text-sm",
                    isSelected
                      ? "text-primary"
                      : "text-neutral-900 dark:text-white",
                  )}
                >
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-neutral-500 mt-0.5">
                    {option.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </div>
  );
}
