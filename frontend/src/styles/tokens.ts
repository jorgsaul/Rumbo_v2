export const SHADOW_CUSTOM = {
  glow: "shadow-[0_0_15px_rgba(90,18,54,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
  floating: "shadow-lg hover:shadow-xl transition-shadow dark:shadow-black/30",
} as const;

export const HOVER = {
  lift: "hover:-translate-y-1 hover:shadow-lg transition-all duration-300",
  scale: "hover:scale-105 transition-transform duration-300",
  glow: "hover:shadow-[0_0_15px_rgba(90,18,54,0.3)] transition-shadow duration-500",
  press: "active:scale-98 transition-transform duration-50",
} as const;

export const ROUNDED_CUSTOM = {
  pill: "rounded-[2rem]",
} as const;

export const EASING = {
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  soft: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
} as const;

export type HoverVariant = keyof typeof HOVER;
export type ShadowCustomVariant = keyof typeof SHADOW_CUSTOM;
export type RoundedCustomVariant = keyof typeof ROUNDED_CUSTOM;
