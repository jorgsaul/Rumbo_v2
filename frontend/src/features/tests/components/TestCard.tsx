"use client";

import { Clock, BookOpen, ChevronRight, FlaskConical } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { TestSummary } from "@/features/tests/types/tests.types";

const TYPE_CONFIG = {
  VOCATIONAL: {
    label: "Vocacional",
    icon: FlaskConical,
    variant: "primary" as const,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  KNOWLEDGE: {
    label: "Conocimientos",
    icon: BookOpen,
    variant: "info" as const,
    iconColor: "text-info",
    iconBg: "bg-info/10",
  },
};

interface TestCardProps {
  test: TestSummary;
}

export default function TestCard({ test }: TestCardProps) {
  const router = useRouter();
  const config = TYPE_CONFIG[test.type];

  const handleClick = () => {
    router.push(`/tests/${test.id}`);
  };

  return (
    <Card
      padding="md"
      rounded="xl"
      border="light"
      shadow="sm"
      clickable="lift"
      onClick={handleClick}
      className="group"
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
            config.iconBg,
          )}
        >
          <config.icon size={22} className={config.iconColor} />
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 leading-tight">
              {test.title}
            </h3>
            <Tag label={config.label} variant={config.variant} />
          </div>

          {test.description && (
            <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
              {test.description}
            </p>
          )}

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <Clock size={12} />
              {test.estimatedMinutes} min
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <BookOpen size={12} />
              {test._count.questions} preguntas
            </span>
          </div>
        </div>

        <ChevronRight
          size={16}
          className="text-neutral-300 dark:text-neutral-600 group-hover:text-primary transition-colors shrink-0 mt-1"
        />
      </div>
    </Card>
  );
}
