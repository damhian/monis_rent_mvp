"use client";

import React, { useRef, useState, useCallback } from "react";
import { Sparkles, RotateCcw, Check, SlidersHorizontal, Box, Square } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { WORKSPACE_PRESETS } from "@/data/catalog";
import { DeskCore } from "./DeskCore";

export const WorkspaceCanvas: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [is3d, setIs3d] = useState(true);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalise to -1..1 relative to centre
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    // Max ±4° parallax nudge on top of the base 42° tilt
    setTilt({ x: ny * -4, y: nx * 4 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);
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
    <div className="wall-texture relative w-full overflow-hidden flex flex-col items-center pb-10">
      {/* Top Header matching Sketch */}
      <div className="text-center pt-8 pb-4 px-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive Workspace Studio</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Design Your Workspace!
        </h1>
        <p className="mt-2 text-base sm:text-lg text-slate-300 font-medium">
          — Create Your Perfect Setup & Rent Instantly —
        </p>

        {/* Quick Presets Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Presets:
          </span>

          {WORKSPACE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/30 text-white backdrop-blur-sm hover:bg-emerald-500 hover:border-emerald-400 hover:text-white shadow-sm transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-emerald-300"
            >
              {preset.name}
            </button>
          ))}

          <button
            type="button"
            onClick={clearWorkspace}
            className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-200 bg-rose-500/15 border border-rose-300/50 hover:bg-rose-500 hover:text-white hover:border-rose-400 transition-all ml-1 flex items-center gap-1 active:scale-95 focus-visible:outline-2 focus-visible:outline-rose-300"
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
              <span className="text-xs text-shadow-slate-800 hidden sm:inline">
                Retail value: <strong className="text-slate-900">€{retailValue.toLocaleString()}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div
                role="group"
                aria-label="Workspace view mode"
                className="inline-flex p-0.5 rounded-xl bg-white border border-slate-200 shadow-sm"
              >
                {([
                  { id: false, label: "Flat", Icon: Square },
                  { id: true, label: "3D", Icon: Box },
                ] as const).map(({ id, label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setIs3d(id)}
                    aria-pressed={is3d === id}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[10px] text-xs font-semibold transition-colors ${
                      is3d === id
                        ? "bg-emerald-600 text-white"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCatalogOpen(true)}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-xl transition-colors shadow-sm"
              >
                Browse Full Catalog &rarr;
              </button>
            </div>
          </div>

          {/* Scene stage: perspective + tilt only in 3D mode; flat mode renders DeskCore as before */}
          {is3d ? (
            <div
              ref={stageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full"
              style={{ perspective: "1400px", perspectiveOrigin: "50% 20%" }}
            >
              {/* Ground shadow — scales with tilt to sell the 3D depth */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-10 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)",
                  filter: "blur(8px)",
                  transform: "scaleX(1.2)",
                }}
              />

              <div
                style={{
                  ["--tilt" as string]: `${52 + tilt.x}deg`,
                  transform: `rotateX(var(--tilt)) rotateZ(${tilt.y * 0.3}deg)`,
                  transformStyle: "preserve-3d",
                  transformOrigin: "50% 70%",
                  willChange: "transform",
                }}
              >
                <DeskCore is3d />
              </div>
            </div>
          ) : (
            <DeskCore />
          )}
        </div>
      </div>
    </div>
  );
};
