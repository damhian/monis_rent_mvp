"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, X, RefreshCw, Sparkles } from "lucide-react";
import { CatalogItem, SlotId } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { cn } from "@/lib/utils";
import { ItemGraphic } from "../canvas/visuals/ItemGraphic";

interface ZonePodProps {
  slotId: SlotId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultAddLabel: string;
  accentColor: string; // Tailwind color token
}

export const ZonePod: React.FC<ZonePodProps> = ({
  slotId,
  title,
  subtitle,
  icon: Icon,
  defaultAddLabel,
  accentColor,
}) => {
  const slots = useWorkspaceStore((s) => s.slots);
  const setActiveSlotModal = useWorkspaceStore((s) => s.setActiveSlotModal);
  const removeItem = useWorkspaceStore((s) => s.removeItem);
  const shouldReduceMotion = useReducedMotion();

  const item = slots[slotId];

  return (
    <div className="relative flex flex-col justify-between p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all select-none">
      {/* Zone Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className={cn("p-2 rounded-2xl bg-slate-100", accentColor)}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-none">{title}</h3>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">{subtitle}</p>
            </div>
          </div>

          {item && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Active
            </span>
          )}
        </div>

        {/* Content Box (Equipped vs Empty Hotspot) */}
        <div className="mt-3">
          {item ? (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
            >
              {/* Product Visual Illustration */}
              <div className="w-full h-24 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center p-2 mb-2.5 shadow-2xs overflow-hidden">
                <ItemGraphic itemId={item.id} item={item} compact />
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.brand}
                </span>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-sm font-extrabold text-slate-900">€{item.monthlyPrice}</span>
                  <span className="text-[10px] text-slate-400 font-medium">/mo</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveSlotModal(slotId)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                    title="Swap gear"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(slotId)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove from workspace"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <button
              type="button"
              onClick={() => setActiveSlotModal(slotId)}
              className={cn(
                "w-full py-6 px-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500",
                "bg-slate-50/70 hover:bg-emerald-50/50 text-slate-600 hover:text-emerald-700",
                "flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
              )}
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </span>
              <span className="text-xs font-semibold">{defaultAddLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
