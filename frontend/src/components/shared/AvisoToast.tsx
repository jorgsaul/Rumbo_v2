import { Info, TriangleAlert, OctagonAlert, Check, X } from "lucide-react";
import { Button, Card } from "../ui";
import { cn } from "@/lib";

interface AvisoProps {
  title?: string;
  description?: string;
  category: "info" | "success" | "warning" | "danger";
  onClose?: () => void;
}

const ICON_MAP = {
  info: { icon: Info, color: "text-info" },
  warning: { icon: TriangleAlert, color: "text-warning" },
  danger: { icon: OctagonAlert, color: "text-danger" },
  success: { icon: Check, color: "text-success" },
};

export default function AvisoToast({
  category = "info",
  title = "",
  description = "",
  onClose,
}: AvisoProps) {
  const { icon: Icon, color } = ICON_MAP[category];

  return (
    <Card
      padding="sm"
      rounded="xl"
      border="light"
      shadow="md"
      className="max-w-sm min-w-72 bg-white dark:bg-neutral-900"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
            category === "info" && "bg-info/10",
            category === "warning" && "bg-warning/10",
            category === "danger" && "bg-danger/10",
            category === "success" && "bg-success/10",
          )}
        >
          <Icon size={16} className={color} />
        </div>

        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              {title}
            </p>
          )}
          {description && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-neutral-300 hover:text-neutral-500 transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </Card>
  );
}
