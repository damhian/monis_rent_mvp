"use client";

import React from "react";
import {
  Armchair,
  Table,
  Monitor,
  Keyboard,
  Leaf,
  Coffee,
  Bike,
  Smile,
  Wrench,
} from "lucide-react";
import { Category } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { cn } from "@/lib/utils";

interface CategoryMeta {
  id: Category;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: "chairs", label: "Chairs", icon: Armchair },
  { id: "desks", label: "Desks", icon: Table },
  { id: "monitors", label: "Monitors", icon: Monitor },
  { id: "accessories", label: "Peripherals", icon: Keyboard },
  { id: "plants", label: "Plants", icon: Leaf },
  { id: "coffee", label: "Coffee", icon: Coffee },
  { id: "outdoor", label: "Outdoor", icon: Bike },
  { id: "relax", label: "Relax Zone", icon: Smile },
  { id: "garage", label: "Garage", icon: Wrench },
];

interface CategoryTabsProps {
  className?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ className }) => {
  const activeCategory = useWorkspaceStore((s) => s.activeCategory);
  const setActiveCategory = useWorkspaceStore((s) => s.setActiveCategory);

  return (
    <div className={cn("flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none", className)}>
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all select-none cursor-pointer",
              isActive
                ? "bg-slate-900 text-white shadow-md scale-102"
                : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
            )}
          >
            <Icon className={cn("w-3.5 h-3.5", isActive ? "text-emerald-400" : "text-slate-500")} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
