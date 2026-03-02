"use client";

import { useState } from "react";
import MenuItem, { MenuItemData } from "./MenuItem";

interface MenuDropdownProps {
  data?: MenuItemData[];
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function MenuDropdown({ data, size = "md" }: MenuDropdownProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (label: string) =>
    setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <nav className="flex flex-col gap-1">
      {data?.map((item) => (
        <div key={item.label}>
          <MenuItem
            {...item}
            size={size}
            isOpen={openItems[item.label]}
            onClick={() => toggle(item.label)}
          />

          {openItems[item.label] &&
            item.items?.map((child) => (
              <MenuItem key={child.label} {...child} size={size} />
            ))}
        </div>
      ))}
    </nav>
  );
}
