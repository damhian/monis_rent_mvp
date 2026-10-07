"use client";

import React from "react";
import { Sparkles, RotateCcw, Check, SlidersHorizontal } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { WORKSPACE_PRESETS } from "@/data/catalog";
import { DeskCore } from "./DeskCore";

export const WorkspaceCanvas: React.FC = () => {
  const applyPreset = useWorkspaceStore((s) => s.applyPreset);
  const clearWorkspace = useWorkspaceStore((s) => s.clearWorkspace);
  const getEquippedItemsCount = useWorkspaceStore((s) => s.getEquippedItemsCount);
  const getDiscountedMonthlyTotal = useWorkspaceStore((s) => s.getDiscountedMonthlyTotal);
  const getTotalRetailValue = useWorkspaceStore((s) => s.getTotalRetailValue);
  const rentalDuration = useWorkspaceStore((s) => s.rentalDuration);
  const setCatalogOpen = useWorkspaceStore((s) => s.setCatalogOpen);

  const equippedCount = getEquippedItemsCount();
  const monthlyTotal = getDiscountedMonthlyTotal();
  const retailValue = getTotalRetailValue();

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center">
      {/* Top Header matching Sketch */}
      <div className="text-center pt-8 pb-4 px-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive 2.5D Workspace Studio</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Design Your Workspace!
        </h1>
        <p className="mt-2 text-base sm:text-lg text-slate-600 font-medium">
          — Create Your Perfect Setup & Rent Instantly —
        </p>

        {/* Quick Presets Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Presets:
          </span>

          {WORKSPACE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 shadow-sm transition-all hover:shadow active:scale-95"
            >
              {preset.name}
            </button>
          ))}

          <button
            type="button"
            onClick={clearWorkspace}
            className="px-2.5 py-1.5 rounded-full text-xs font-medium text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all ml-1 flex items-center gap-1"
            title="Clear all equipped items"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Live Workspace Canvas Stage */}
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 relative">
        <div className="relative rounded-3xl workspace-grid border border-slate-200/90 shadow-xl overflow-hidden p-4 sm:p-8 bg-slate-50/60 backdrop-blur-sm">
          {/* Subtle Ambient Lighting behind monitors */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Canvas Floating Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2 px-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                {equippedCount} Items Equipped
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Retail value: <strong className="text-slate-700">€{retailValue.toLocaleString()}</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCatalogOpen(true)}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-xl transition-colors shadow-sm"
            >
              Browse Full Catalog &rarr;
            </button>
          </div>

          {/* Central Desk & Anchor Slots */}
          <DeskCore />
        </div>
      </div>
    </div>
  );
};
