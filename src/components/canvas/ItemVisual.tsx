"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { CatalogItem, SlotId } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { ItemGraphic } from "./visuals/ItemGraphic";

interface ItemVisualProps {
  item: CatalogItem;
  slotId: SlotId;
  deskColor?: string;
}

export const ItemVisual: React.FC<ItemVisualProps> = ({
  item,
  slotId,
}) => {
  const setActiveSlotModal = useWorkspaceStore((s) => s.setActiveSlotModal);
  const shouldReduceMotion = useReducedMotion();

  const springDropTransition = shouldReduceMotion
    ? { duration: 0.1 }
    : {
        type: "spring" as const,
        stiffness: 380,
        damping: 24,
        mass: 0.8,
      };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${item.name} — swap or remove`}
      onClick={() => setActiveSlotModal(slotId)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActiveSlotModal(slotId);
        }
      }}
      initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.82, opacity: 0, y: -18 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={springDropTransition}
      className="group relative flex flex-col items-center justify-center cursor-pointer select-none rounded-xl focus-visible:outline-2 focus-visible:outline-emerald-400"
    >
      {/* Hover label: read-only. Clicking the item opens the swap/remove drawer. */}
      <div className="absolute -top-9 z-40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-[11px] font-medium shadow-xl whitespace-nowrap">
        <span className="truncate max-w-35 text-slate-200">{item.name}</span>
        <span className="text-emerald-400 font-bold">€{item.monthlyPrice}/mo</span>
        <span className="flex items-center gap-1 pl-1.5 ml-0.5 border-l border-white/20 text-slate-300">
          <RefreshCw className="w-3 h-3" />
          Click to swap
        </span>
      </div>

      {/* Render distinctive visual for the equipped item */}
      <ItemGraphic itemId={item.id} item={item} />
    </motion.div>
  );
};
