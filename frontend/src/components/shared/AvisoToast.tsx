import { Info, TriangleAlert, OctagonAlert, Check, X } from "lucide-react";
import { Button, Card } from "../ui";
import { cn } from "@/lib";

interface AvisoProps {
  title?: string;
  description?: string;
  category: "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  date?: Date;
  read?: boolean;
  iconClass?: keyof typeof IconClasses;
  onClose?: () => void;
}

const IconClasses = {
  info: Info,
  warning: TriangleAlert,
  danger: OctagonAlert,
  success: Check,
};

const ColorClasses = {
  success: "bg-success border-success-700",
  danger: "bg-danger border-danger-700",
  warning: "bg-warning border-warning-700",
  info: "bg-info border-info-700",
};

export default function AvisoToast({
  category = "info",
  title = "",
  description = "",
  onClose,
}: AvisoProps) {
  const Icon = IconClasses[category];

  return (
    <Card
      className={cn(
        ColorClasses[category],
        "text-white pl-0 pr-2 max-w-xl min-w-100 border-2 border-gray-300 dark:border-[#1c1c1c]",
      )}
      padding="sm"
      disableDarkMode
    >
      <div className="flex justify-between items-center">
        <span className="h-full w-20 inline-flex justify-center items-center">
          <Icon />
        </span>
        <div className="w-full">
          <b>{title}</b>
          <p>{description}</p>
        </div>
        <Button
          children={<X />}
          variant="ghost"
          className="!shadow-none rounded-full"
          onClick={onClose}
        />
      </div>
    </Card>
  );
}
