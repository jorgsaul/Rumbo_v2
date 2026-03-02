import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { iconSizes } from "@/config/sizes";

const SizeClasses = {
  xs: {
    base: "h-7 px-2 text-xs",
    withLeftIcon: "pl-7.5 pr-3",
    withRightIcon: "pl-2 pr-8",
    title: "text-xs",
    description: "text-xs",
  },
  sm: {
    base: "h-8 px-2.5 text-sm",
    withLeftIcon: "pl-8.5 pr-3.5",
    withRightIcon: "pl-2 pr-9",
    title: "text-sm",
    description: "text-xs",
  },
  md: {
    base: "h-9 px-3 text-base",
    withLeftIcon: "pl-9.5 pr-4",
    withRightIcon: "pl-2 pr-10",
    title: "text-base",
    description: "text-sm",
  },
  lg: {
    base: "h-10 px-3.5 text-lg",
    withLeftIcon: "pl-10.5 pr-5",
    withRightIcon: "pl-2 pr-11",
    title: "text-lg",
    description: "text-md",
  },
  xl: {
    base: "h-11 px-4 text-xl",
    withLeftIcon: "pl-11.5 pr-6",
    withRightIcon: "pl-2 pr-12",
    title: "text-xl",
    description: "text-lg",
  },
} as const;

type InputSize = keyof typeof SizeClasses;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  title?: string;
  description?: string;
  error?: string;
  inputSize?: InputSize;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "pill";
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
}

export default function Input({
  label,
  error,
  inputSize = "md",
  icon: Icon,
  iconPosition = "left",
  className,
  title,
  rounded = "lg",
  description,
  ...props
}: InputProps) {
  const size = SizeClasses[inputSize];

  return (
    <div className={cn("w-full my-2", className)}>
      {title && (
        <p className={cn(size.title, error ? "text-danger-700" : "opacity-95")}>
          {title}
        </p>
      )}

      <div className="relative">
        {Icon && (
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none",
              iconPosition === "left" ? "left-2.5" : "right-2.5",
            )}
          >
            <Icon size={iconSizes[inputSize]} />
          </span>
        )}

        <input
          type="text"
          placeholder={label}
          className={cn(
            "w-full border-2 border-gray-300 dark:border-[#1c1c1c]",
            "hover:border-primary focus:outline-none focus:border-primary",
            "dark:bg-neutral-900 transition-colors duration-200",
            size.base,
            {
              "rounded-none": rounded === "none",
              "rounded-sm": rounded === "sm",
              "rounded-md": rounded === "md",
              "rounded-lg": rounded === "lg",
              "rounded-xl": rounded === "xl",
              "rounded-2xl": rounded === "2xl",
              "rounded-full": rounded === "full",
              "rounded-pill": rounded === "pill",
            },
            Icon && iconPosition === "left" && size.withLeftIcon,
            Icon && iconPosition === "right" && size.withRightIcon,
            error && "border-danger focus:border-danger",
          )}
          {...props}
        />
      </div>

      {error ? (
        <p className={cn(size.description, "text-danger mt-1")}>{error}</p>
      ) : description ? (
        <p className={cn(size.description, "opacity-80 mt-1")}>{description}</p>
      ) : null}
    </div>
  );
}
