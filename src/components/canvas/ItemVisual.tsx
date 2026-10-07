"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, RefreshCw } from "lucide-react";
import { CatalogItem, SlotId } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

interface ItemVisualProps {
  item: CatalogItem;
  slotId: SlotId;
  deskColor?: string;
}

export const ItemVisual: React.FC<ItemVisualProps> = ({
  item,
  slotId,
  deskColor = "#E5C29F",
}) => {
  const removeItem = useWorkspaceStore((s) => s.removeItem);
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
      initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.82, opacity: 0, y: -18 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={springDropTransition}
      className="group relative flex flex-col items-center justify-center cursor-pointer select-none"
    >
      {/* Floating Hover Actions */}
      <div className="absolute -top-9 z-40 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-[11px] font-medium shadow-xl backdrop-blur-md">
        <span className="truncate max-w-35 text-slate-200">{item.name}</span>
        <span className="text-emerald-400 font-bold">€{item.monthlyPrice}/mo</span>
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveSlotModal(slotId);
          }}
          className="ml-1 p-1 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-colors"
          title="Swap equipment"
        >
          <RefreshCw className="w-3 h-3" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            removeItem(slotId);
          }}
          className="p-1 hover:bg-rose-500 rounded-full text-slate-300 hover:text-white transition-colors"
          title="Remove from setup"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* SVG Representations per category */}
      {slotId.startsWith("monitor") && (
        <div className="relative flex flex-col items-center">
          {/* Display Bezel */}
          <div className="relative w-44 sm:w-56 h-28 sm:h-36 rounded-xl bg-slate-950 p-1.5 shadow-2xl border border-slate-700/60 overflow-hidden flex flex-col justify-between">
            {/* Screen Content - Aesthetic Dark Mode IDE / Studio preview */}
            <div className="w-full h-full rounded-lg bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 p-2 flex flex-col justify-between overflow-hidden relative">
              <div className="flex items-center justify-between opacity-70">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[9px] font-mono text-slate-400 tracking-wider">
                  {item.brand} 4K
                </span>
              </div>

              {/* Minimalist code / waveform graphics */}
              <div className="space-y-1.5 my-auto">
                <div className="h-1.5 w-3/4 rounded bg-emerald-400/40" />
                <div className="h-1.5 w-1/2 rounded bg-indigo-400/40" />
                <div className="h-1.5 w-2/3 rounded bg-slate-500/40" />
              </div>

              <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                <span className="text-emerald-400 font-semibold">{item.name.split(" ")[0]}</span>
                <span className="text-slate-300">120Hz Retina</span>
              </div>
            </div>

            {/* Aluminum Chin / Logo */}
            <div className="w-full h-2 flex items-center justify-center">
              <div className="w-1.5 h-0.5 rounded-full bg-slate-500" />
            </div>
          </div>

          {/* Monitor Stand */}
          <div className="w-4 h-6 bg-linear-to-b from-slate-400 to-slate-500 shadow-sm" />
          <div className="w-16 h-1.5 rounded-full bg-slate-400 shadow-md border-t border-slate-200" />
        </div>
      )}

      {slotId === "chair" && (
        <div className="relative flex flex-col items-center">
          {/* Chair Headrest / Backrest */}
          <div className="w-28 sm:w-32 h-28 sm:h-32 rounded-3xl bg-linear-to-b from-slate-800 to-slate-900 border-2 border-slate-700/80 shadow-2xl p-2 flex flex-col items-center justify-between relative overflow-hidden">
            {/* Pellicle Mesh Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] bg-size-[6px_6px] opacity-60" />
            
            {/* Lumbar Contour */}
            <div className="z-10 w-16 h-4 rounded-full bg-slate-700/90 border border-slate-600 shadow-inner mt-4" />
            <div className="z-10 text-[9px] font-semibold text-slate-400 uppercase tracking-widest pb-1">
              {item.brand}
            </div>
          </div>

          {/* Armrests */}
          <div className="absolute top-12 -left-3 w-4 h-12 rounded-lg bg-slate-800 border border-slate-700 shadow-md" />
          <div className="absolute top-12 -right-3 w-4 h-12 rounded-lg bg-slate-800 border border-slate-700 shadow-md" />

          {/* Seat Cushion */}
          <div className="w-32 sm:w-36 h-10 rounded-2xl bg-slate-900 border-t-2 border-slate-700 shadow-xl -mt-2 z-10" />

          {/* Pneumatic Stem & 5-Star Caster Base */}
          <div className="w-3.5 h-6 bg-slate-700 shadow-inner" />
          <div className="flex items-center gap-1.5 -mt-1">
            <div className="w-2.5 h-2 rounded-full bg-slate-800 shadow" />
            <div className="w-28 h-1.5 bg-slate-700 rounded-full" />
            <div className="w-2.5 h-2 rounded-full bg-slate-800 shadow" />
          </div>
        </div>
      )}

      {slotId === "keyboard" && (
        <div className="w-36 sm:w-44 h-14 rounded-lg bg-slate-900 border border-slate-700 p-1.5 shadow-lg flex flex-col justify-between">
          <div className="grid grid-cols-12 gap-0.5 h-full">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xs bg-slate-800 border border-slate-700/60 shadow-[0_1px_0_rgba(0,0,0,0.5)]"
              />
            ))}
          </div>
          <div className="w-20 h-1 rounded bg-slate-700 mx-auto mt-0.5" />
        </div>
      )}

      {slotId === "mouse" && (
        <div className="w-8 h-12 rounded-full bg-linear-to-b from-slate-800 to-slate-900 border border-slate-700 shadow-md flex flex-col items-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-slate-600 mt-1 shadow-inner" />
        </div>
      )}

      {slotId === "desk-lamp" && (
        <div className="flex flex-col items-center">
          <div className="w-24 sm:w-28 h-2 rounded-full bg-linear-to-r from-amber-200 via-amber-100 to-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
          <div className="w-1 h-14 bg-slate-700 -mt-0.5" />
          <div className="w-8 h-1.5 rounded-full bg-slate-800 shadow" />
        </div>
      )}

      {slotId === "desk-plant" && (
        <div className="flex flex-col items-center">
          {/* Leaves */}
          <div className="relative w-14 h-12 flex justify-center items-end">
            <div className="absolute -top-1 -left-1 w-6 h-8 rounded-full bg-emerald-600 rotate-[-25deg] shadow-sm" />
            <div className="absolute -top-3 w-7 h-9 rounded-full bg-emerald-500 shadow-sm" />
            <div className="absolute -top-1 -right-1 w-6 h-8 rounded-full bg-emerald-600 rotate-25deg shadow-sm" />
          </div>
          {/* Pot */}
          <div className="w-9 h-8 rounded-b-xl bg-linear-to-b from-stone-200 to-stone-300 border border-stone-400/80 shadow-md flex items-center justify-center">
            <span className="text-[8px] font-bold text-stone-600">Monis</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
