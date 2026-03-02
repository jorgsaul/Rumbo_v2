"use client";

import { cn } from "@/lib/utils/cn";

const VARIANT_CLASSES = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300",
  danger: "bg-danger text-white hover:bg-danger/90",
  ghost: "bg-transparent hover:opacity-80 dark:shadow-[0_1px_1px_gray]",
  outline:
    "border border-primary-300 text-primary-300 hover:bg-primary/10 dark:hover:bg-primary/20",
} as const;

const SIZE_CLASSES = {
  xs: "h-6 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
  xl: "h-14 px-8 text-xl",
} as const;

const ROUNDED_CLASSES = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
  pill: "rounded-pill",
} as const;

const HOVER_CLASSES = {
  lift: "hover:-translate-y-1 hover:shadow-lg transition-all duration-300",
  scale: "hover:scale-105 transition-transform duration-300",
  glow: "hover:shadow-glow transition-shadow duration-500",
  press: "active:scale-95 transition-transform duration-75",
} as const;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_CLASSES;
  size?: keyof typeof SIZE_CLASSES;
  rounded?: keyof typeof ROUNDED_CLASSES;
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "glow" | "floating";
  hoverEffect?: keyof typeof HOVER_CLASSES;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  rounded = "md",
  shadow = "sm",
  hoverEffect = "press",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center font-medium",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        ROUNDED_CLASSES[rounded],
        {
          "shadow-none": shadow === "none",
          "shadow-sm": shadow === "sm",
          "shadow-md": shadow === "md",
          "shadow-lg": shadow === "lg",
          "shadow-xl": shadow === "xl",
          "shadow-glow": shadow === "glow",
          "shadow-floating": shadow === "floating",
        },
        !isDisabled && HOVER_CLASSES[hoverEffect],
        loading && "cursor-wait",
        !isDisabled && !loading && "cursor-pointer",
        fullWidth && "w-full",
        (leftIcon || rightIcon) && "gap-2",
        className,
      )}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <>
      <svg
        className="animate-spin h-4 w-4 mr-2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      Cargando...
    </>
  );
}
