"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { SlotId } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { cn } from "@/lib/utils";

interface SlotHotspotProps {
  slotId: SlotId;
  label: string;
  className?: string;
  icon?: React.ReactNode;
}

export const SlotHotspot: React.FC<SlotHotspotProps> = ({
  slotId,
  label,
  className,
  icon,
}) => {
  const setActiveSlotModal = useWorkspaceStore((s) => s.setActiveSlotModal);
  const shouldReduceMotion = useReducedMotion();

  const pulseAnimation = shouldReduceMotion
    ? undefined
    : {
        scale: [1, 1.04, 1],
        boxShadow: [
          "0 0 0 0 rgba(16, 185, 129, 0.2)",
          "0 0 0 8px rgba(16, 185, 129, 0)",
          "0 0 0 0 rgba(16, 185, 129, 0)",
        ],
        transition: {
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <motion.button
      type="button"
      onClick={() => setActiveSlotModal(slotId)}
      animate={pulseAnimation}
      whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -2 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
      className={cn(
        "group relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold",
        "bg-white/95 text-slate-700 shadow-md backdrop-blur-md",
        "border-2 border-dashed border-emerald-400/80 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/90",
        "transition-colors cursor-pointer select-none",
        className
      )}
      aria-label={label}
    >
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
        {icon || <Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
      </span>
      <span>{label}</span>
    </motion.button>
  );
};
