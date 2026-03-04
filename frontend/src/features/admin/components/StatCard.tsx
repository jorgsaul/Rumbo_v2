import { Card } from "@/components/ui";
import { cn } from "@/lib";

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      className="flex items-center gap-4"
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
          color,
        )}
      >
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-neutral-400">{label}</p>
      </div>
    </Card>
  );
}
