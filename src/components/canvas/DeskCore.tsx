"use client";

import React, { useState, useEffect } from "react";
import { Monitor, Zap } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { ItemVisual } from "./ItemVisual";
import { SlotHotspot } from "./SlotHotspot";

// Counter-rotates against the scene's --tilt so the item stands upright from its base edge.
const uprightStyle = (origin: "top" | "bottom"): React.CSSProperties => ({
  transform: "rotateX(calc(var(--tilt, 0deg) * -1))",
  transformOrigin: `50% ${origin === "top" ? "0%" : "100%"}`,
});

const P3D: React.CSSProperties = { transformStyle: "preserve-3d" };

// In 3D, seats an item on the desk: a contact shadow lies on the desk plane while the item
// itself either stands up ("stand") or is lifted and partly tilted toward the viewer ("raised").
const Grounded: React.FC<{
  is3d: boolean;
  kind: "stand" | "raised";
  className: string;
  children: React.ReactNode;
}> = ({ is3d, kind, className, children }) => {
  if (!is3d) return <div className={className}>{children}</div>;

  const item: React.CSSProperties =
    kind === "stand"
      ? uprightStyle("bottom")
      : {
          transform: "translateZ(10px) rotateX(calc(var(--tilt, 0deg) * -0.4))",
          transformOrigin: "50% 100%",
          filter: "drop-shadow(0 3px 0 rgba(0,0,0,0.45)) drop-shadow(0 6px 5px rgba(0,0,0,0.3))",
        };

  return (
    <div className={`relative ${className}`} style={P3D}>
      <div
        aria-hidden
        className={`absolute pointer-events-none rounded-full ${
          kind === "stand" ? "inset-x-[8%] -bottom-1 h-1/4" : "inset-x-[2%] top-1/3 -bottom-2"
        }`}
        style={{
          background: "radial-gradient(ellipse, rgba(0,0,0,0.4), transparent 70%)",
          filter: "blur(5px)",
        }}
      />
      <div style={item}>{children}</div>
    </div>
  );
};

export const DeskCore: React.FC<{ is3d?: boolean }> = ({ is3d = false }) => {
  // In flat mode these resolve to undefined, leaving the original 2D layout untouched.
  const upright = (origin: "top" | "bottom") => (is3d ? uprightStyle(origin) : undefined);
  const PRESERVE_3D = is3d ? P3D : undefined;

  const slots = useWorkspaceStore((s) => s.slots);
  const deskItem = slots["desk"];

  // Default color finish options
  const defaultColors = [
    { name: "Natural Bamboo", hex: "#E5C29F", border: "#D4A373" },
    { name: "White Oak", hex: "#F3ECE1", border: "#DDD3C1" },
    { name: "Solid Walnut", hex: "#5C4033", border: "#43281C" },
    { name: "Matte Black", hex: "#1C1917", border: "#0C0A09" },
  ];

  const [selectedFinish, setSelectedFinish] = useState(defaultColors[0]);

  // Sync default finish when switching desk item models
  useEffect(() => {
    if (deskItem?.id === "desk-oak-studio") {
      setSelectedFinish(defaultColors[1]); // White Oak
    } else if (deskItem?.id === "desk-smartdesk-pro") {
      setSelectedFinish(defaultColors[0]); // Natural Bamboo
    }
  }, [deskItem?.id]);

  const isOakStudio = deskItem?.id === "desk-oak-studio";

  return (
    <div
      className="relative w-full max-w-4xl mx-auto flex flex-col items-center select-none pt-4 pb-12"
      style={PRESERVE_3D}
    >
      {/* 1. TOP TIER: MONITORS & REAR ACCESSORIES (stand upright on the back edge) */}
      <div
        className="relative w-full z-20 flex items-end justify-center gap-3 sm:gap-6 -mb-6 sm:-mb-8 px-4"
        style={upright("bottom")}
      >
        {/* Left Monitor / Hotspot */}
        <div className="flex-1 max-w-47.5 sm:max-w-57.7 flex justify-center transform -rotate-1 origin-bottom-right">
          {slots["monitor-left"] ? (
            <ItemVisual item={slots["monitor-left"]} slotId="monitor-left" />
          ) : (
            <SlotHotspot
              slotId="monitor-left"
              label="Add Left Monitor"
              icon={<Monitor className="w-3.5 h-3.5" />}
              className="bg-white/80 border-slate-300 hover:border-emerald-500"
            />
          )}
        </div>

        {/* Center Monitor (Primary Display) */}
        <div className="flex-1 max-w-60 sm:max-w-70 flex justify-center z-30">
          {slots["monitor-center"] ? (
            <ItemVisual item={slots["monitor-center"]} slotId="monitor-center" />
          ) : (
            <SlotHotspot
              slotId="monitor-center"
              label="Add Center Display"
              icon={<Monitor className="w-4 h-4" />}
              className="px-4 py-2.5 text-sm bg-white border-emerald-500 font-bold shadow-lg"
            />
          )}
        </div>

        {/* Right Monitor / Hotspot */}
        <div className="flex-1 max-w-47.5 sm:max-w-57.7 flex justify-center transform rotate-1 origin-bottom-left">
          {slots["monitor-right"] ? (
            <ItemVisual item={slots["monitor-right"]} slotId="monitor-right" />
          ) : (
            <SlotHotspot
              slotId="monitor-right"
              label="Add Right Monitor"
              icon={<Monitor className="w-3.5 h-3.5" />}
              className="bg-white/80 border-slate-300 hover:border-emerald-500"
            />
          )}
        </div>
      </div>

      {/* 2. THE DESK SURFACE */}
      <div
        className={`relative w-full rounded-3xl transition-colors duration-300 z-10 p-5 sm:p-7 ${
          is3d ? "border-b-14" : "shadow-2xl border-b-8"
        } ${isOakStudio ? "ring-2 ring-[#C8AC89]/40" : "ring-1 ring-slate-900/10"}`}
        style={{
          ...PRESERVE_3D,
          backgroundColor: selectedFinish.hex,
          borderBottomColor: selectedFinish.border,
          boxShadow: is3d
            ? "0 30px 50px -12px rgba(15,23,42,0.45), 0 10px 18px rgba(15,23,42,0.2)"
            : undefined,
        }}
      >
        {/* Woodgrain & Timber Plank Overlay */}
        <div
          className={`absolute inset-0 rounded-3xl pointer-events-none ${
            isOakStudio
              ? "opacity-35 bg-[radial-gradient(#8c6b45_1px,transparent_1px)] bg-size-[10px_10px]"
              : "opacity-15 bg-[radial-gradient(#000000_1px,transparent_1px)] bg-size-[16px_16px]"
          }`}
        />

        {/* Overhead light falloff: bright at the back edge, darker toward the viewer */}
        {is3d && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(0,0,0,0.14))" }}
          />
        )}

        {/* Content layer lifted 1px off the surface to avoid z-fighting with the desk plane */}
        <div style={is3d ? { ...P3D, transform: "translateZ(1px)" } : undefined}>

        {isOakStudio && (
          <div
            className={`absolute bottom-8 right-6 flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg border font-mono pointer-events-none z-20 ${
              is3d ? "bg-slate-900 text-stone-200 border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.5)]" : "bg-white/40 backdrop-blur-md text-stone-800 border-stone-400/40 shadow-sm"
            }`}
            style={upright("bottom")}
          >
            <div className="flex items-center gap-1.5">
              <Zap className={`w-3 h-3 ${is3d ? "text-amber-400" : "text-amber-600"}`} />
              <span className="text-[10px] font-bold">Qi Wireless</span>
            </div>
            <span className="text-[8px] opacity-75">Charging Surface</span>
          </div>
        )}

        {/* Cable Pass-through Grommet & Finish Switcher */}
        <div className="flex items-center justify-between mb-4 px-2 text-xs relative z-10" style={PRESERVE_3D}>
          {/* Desk Model Info (Left) */}
          <div
            className={`flex items-center gap-2 text-white px-3 py-1 rounded-full text-[11px] font-medium ${
              is3d
                ? "bg-slate-900 shadow-[0_8px_16px_rgba(0,0,0,0.6)] ring-1 ring-white/20"
                : "bg-black/25 backdrop-blur-md shadow-sm"
            }`}
            style={upright("bottom")}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
            <span className="font-semibold">{deskItem?.name || "SmartDesk Dual-Motor Pro"}</span>
            <span className="text-white/70 font-mono">€{deskItem?.monthlyPrice || 42}/mo</span>
          </div>

          {/* Desk Finish Selector (DEAD CENTER OF THE TABLE) */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-white mt-36 px-6 py-1 rounded-full z-20 ${
              is3d
                ? "bg-slate-900/90 shadow-[0_10px_20px_rgba(15,23,42,0.5)] ring-1 ring-white/20 py-1.5"
                : "bg-black/35 backdrop-blur-md shadow-lg border border-white/10"
            }`}
            style={upright("bottom")}
          >
            <span className="text-[10px] text-white/70 font-medium hidden sm:inline">Finish:</span>
            <div className="flex items-center gap-1.5">
              {defaultColors.map((finish) => (
                <button
                  key={finish.name}
                  type="button"
                  onClick={() => setSelectedFinish(finish)}
                  className={`${is3d ? "w-5 h-5 shadow-sm" : "w-4 h-4"} rounded-full transition-transform ${
                    selectedFinish.name === finish.name
                      ? "scale-125 ring-2 ring-white shadow-md"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: finish.hex }}
                  title={finish.name}
                  aria-label={`Select ${finish.name} finish`}
                />
              ))}
            </div>
            <span className="text-[10px] text-white/90 font-medium font-mono hidden md:inline">
              {selectedFinish.name}
            </span>
          </div>

          {/* Right indicator if Oak */}
          {isOakStudio ? (
            <div
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] font-mono ${
                is3d ? "bg-slate-900 text-stone-200 border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.5)]" : "bg-stone-900/10 text-stone-700 border-stone-400/40"
              }`}
              style={upright("bottom")}
            >
              <Zap className={`w-2.5 h-2.5 ${is3d ? "text-amber-400" : "text-amber-600"}`} />
              <span className="hidden sm:inline">Qi Wireless</span>
            </div>
          ) : (
            <div className="w-16 hidden sm:block" />
          )}
        </div>

        {/* Rear Accessories Row (Desk Lamp & Desk Plant) */}
        <div className="flex justify-between items-end mb-6 px-4" style={PRESERVE_3D}>
          {/* Desk Lamp Slot */}
          <Grounded is3d={is3d} kind="stand" className="flex items-center">
            {slots["desk-lamp"] ? (
              <ItemVisual item={slots["desk-lamp"]} slotId="desk-lamp" />
            ) : (
              <SlotHotspot slotId="desk-lamp" label="Add Desk Lamp" />
            )}
          </Grounded>

          {/* Desk Plant Slot */}
          <Grounded is3d={is3d} kind="stand" className="flex items-center">
            {slots["desk-plant"] ? (
              <ItemVisual item={slots["desk-plant"]} slotId="desk-plant" />
            ) : (
              <SlotHotspot slotId="desk-plant" label="Place a Plant" />
            )}
          </Grounded>
        </div>

        {/* Center Input Hardware (Keyboard & Mouse) */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 my-4 relative" style={PRESERVE_3D}>
          {/* Keyboard Slot */}
          <Grounded is3d={is3d} kind="raised" className="flex items-center justify-center">
            {slots["keyboard"] ? (
              <ItemVisual item={slots["keyboard"]} slotId="keyboard" />
            ) : (
              <SlotHotspot slotId="keyboard" label="Add Keyboard" />
            )}
          </Grounded>

          {/* Mouse Slot */}
          <Grounded is3d={is3d} kind="raised" className="flex items-center justify-center">
            {slots["mouse"] ? (
              <ItemVisual item={slots["mouse"]} slotId="mouse" />
            ) : (
              <SlotHotspot slotId="mouse" label="Add Mouse" />
            )}
          </Grounded>

          {/* SmartDesk Digital Height Keypad on Front Right Edge */}
          {!isOakStudio && (
            <div
              className={`absolute -bottom-5 right-2 bg-slate-900 border border-slate-700 px-2 py-1 rounded-md flex items-center gap-1.5 font-mono text-emerald-400 ${
                is3d ? "text-[10px] shadow-[0_8px_14px_rgba(0,0,0,0.6)] ring-1 ring-white/10" : "text-[8px] shadow-lg"
              }`}
              style={upright("bottom")}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>72.5 cm</span>
              <span className="text-slate-400 text-[7px]">▲▼ [1][2][3]</span>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* 3. DESK LEGS (hang vertically from the front edge) */}
      <div
        className="w-11/12 flex justify-between px-12 -mt-1 pointer-events-none"
        style={upright("top")}
      >
        {isOakStudio ? (
          // Solid Oak Scandinavian A-Frame Legs
          <>
            <div className="w-10 sm:w-12 h-36 bg-linear-to-b from-[#EEDDC6] via-[#E5C29F] to-[#C8AC89] rounded-b-xl shadow-2xl flex flex-col justify-end border-x border-[#C8AC89]">
              <div className="w-20 h-3 bg-[#C8AC89] -ml-4 rounded-full shadow-md" />
            </div>
            <div className="w-10 sm:w-12 h-36 bg-linear-to-b from-[#EEDDC6] via-[#E5C29F] to-[#C8AC89] rounded-b-xl shadow-2xl flex flex-col justify-end border-x border-[#C8AC89]">
              <div className="w-20 h-3 bg-[#C8AC89] -ml-4 rounded-full shadow-md" />
            </div>
          </>
        ) : (
          // Motorized Telescopic Steel Lifting Columns
          <>
            <div className="w-10 sm:w-12 h-36 bg-linear-to-r from-slate-800 via-slate-700 to-slate-900 rounded-b shadow-2xl flex flex-col justify-end">
              <div className="w-24 h-3 bg-slate-900 -ml-7 rounded-full shadow-md" />
            </div>
            <div className="w-10 sm:w-12 h-36 bg-linear-to-r from-slate-800 via-slate-700 to-slate-900 rounded-b shadow-2xl flex flex-col justify-end">
              <div className="w-24 h-3 bg-slate-900 -ml-7 rounded-full shadow-md" />
            </div>
          </>
        )}
      </div>

      {/* 4. FOREGROUND: ERGONOMIC CHAIR */}
      <div
        className="relative -mt-24 sm:-mt-28 z-30 flex flex-col items-center"
        style={upright("bottom")}
      >
        {slots["chair"] ? (
          <ItemVisual item={slots["chair"]} slotId="chair" />
        ) : (
          <SlotHotspot
            slotId="chair"
            label="Pick an Ergonomic Chair"
            className="px-5 py-3 text-sm shadow-xl font-bold bg-white text-slate-900 border-emerald-500"
          />
        )}
      </div>
    </div>
  );
};
