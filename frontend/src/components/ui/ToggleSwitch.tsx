import { cn } from "@/lib";

interface ToggleSwitchProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
}

export function ToggleSwitch({
  active,
  onClick,
  icon,
  label,
  description,
}: ToggleSwitchProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full"
    >
      <div className="flex items-center gap-3">
        {icon}
        <div className="text-left">
          <p className="text-sm font-medium text-neutral-900 dark:text-white">
            {label}
          </p>
          <p className="text-xs text-neutral-400">{description}</p>
        </div>
      </div>
      <div
        className={cn(
          "w-10 h-6 rounded-full transition-colors relative",
          active ? "bg-primary" : "bg-neutral-300 dark:bg-neutral-600",
        )}
      >
        <div
          className={cn(
            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
            active ? "translate-x-5" : "translate-x-1",
          )}
        />
      </div>
    </button>
  );
}
