import { cn } from "@/lib";

export function Status({
  status,
}: {
  status: { label: string; color: string };
}) {
  return (
    <div className="flex items-center gap-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
      <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", status.color)} />
      {status.label}
    </div>
  );
}
