"use client";

import Card from "@/components/ui/Card";
import FAQItem from "./FAQItem";
import { FAQ } from "../constants/support.constants";
import { HelpCircle } from "lucide-react";

export default function FAQSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <HelpCircle size={18} className="text-primary" />
        <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
          Preguntas frecuentes
        </h2>
      </div>
      {FAQ.map((section) => (
        <div key={section.category} className="space-y-1">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">
            {section.category}
          </p>
          <Card padding="md" rounded="xl" border="light" shadow="sm">
            {section.items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
}
