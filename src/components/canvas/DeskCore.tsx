"use client";

import React, { useState } from "react";
import { Monitor, Sparkles, SunMedium } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { ItemVisual } from "./ItemVisual";
import { SlotHotspot } from "./SlotHotspot";

export const DeskCore: React.FC = () => {
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

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center select-none pt-4 pb-12">
      {/* 1. TOP TIER: MONITORS & REAR ACCESSORIES */}
      <div className="relative w-full z-20 flex items-end justify-center gap-3 sm:gap-6 -mb-6 sm:-mb-8 px-4">
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
        className="relative w-full rounded-3xl shadow-2xl transition-colors duration-300 border-b-8 z-10 p-5 sm:p-7"
        style={{
          backgroundColor: selectedFinish.hex,
          borderBottomColor: selectedFinish.border,
        }}
      >
        {/* Subtle woodgrain overlay */}
        <div className="absolute inset-0 rounded-3xl opacity-15 bg-[radial-gradient(#000000_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />

        {/* Cable Pass-through Grommet & Finish Switcher */}
        <div className="flex justify-between items-center mb-2 px-2 text-xs">
          {/* Desk Model Info */}
          <div className="flex items-center gap-2 bg-black/20 text-white backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{deskItem?.name || "SmartDesk Dual-Motor Pro"}</span>
            <span className="text-white/70">€{deskItem?.monthlyPrice || 42}/mo</span>
          </div>

          {/* Desk Finish Selector */}
          <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md p-1 rounded-full shadow-inner">
            {defaultColors.map((finish) => (
              <button
                key={finish.name}
                type="button"
                onClick={() => setSelectedFinish(finish)}
                className={`w-4 h-4 rounded-full transition-transform ${
                  selectedFinish.name === finish.name
                    ? "scale-125 ring-2 ring-white shadow"
                    : "opacity-75 hover:opacity-100"
                }`}
                style={{ backgroundColor: finish.hex }}
                title={finish.name}
                aria-label={`Select ${finish.name} finish`}
              />
            ))}
          </div>
        </div>

        {/* Rear Accessories Row (Desk Lamp & Desk Plant) */}
        <div className="flex justify-between items-center mb-6 px-4">
          {/* Desk Lamp Slot */}
          <div className="flex items-center">
            {slots["desk-lamp"] ? (
              <ItemVisual item={slots["desk-lamp"]} slotId="desk-lamp" />
            ) : (
              <SlotHotspot
                slotId="desk-lamp"
                label="Add Lamp"
                icon={<SunMedium className="w-3.5 h-3.5" />}
              />
            )}
          </div>

          {/* Desk Plant Slot */}
          <div className="flex items-center">
            {slots["desk-plant"] ? (
              <ItemVisual item={slots["desk-plant"]} slotId="desk-plant" />
            ) : (
              <SlotHotspot
                slotId="desk-plant"
                label="Place a Plant!"
                icon={<Sparkles className="w-3.5 h-3.5" />}
              />
            )}
          </div>
        </div>

        {/* Felt Desk Pad with Keyboard & Mouse */}
        <div className="max-w-xl mx-auto rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl flex items-center justify-center gap-6 sm:gap-10">
          {/* Keyboard Slot */}
          <div className="flex items-center justify-center">
            {slots["keyboard"] ? (
              <ItemVisual item={slots["keyboard"]} slotId="keyboard" />
            ) : (
              <SlotHotspot slotId="keyboard" label="Add Keyboard" />
            )}
          </div>

          {/* Mouse Slot */}
          <div className="flex items-center justify-center">
            {slots["mouse"] ? (
              <ItemVisual item={slots["mouse"]} slotId="mouse" />
            ) : (
              <SlotHotspot slotId="mouse" label="Add Mouse" />
            )}
          </div>
        </div>
      </div>

      {/* 3. DESK LEGS (Steel T-Frame Structure) */}
      <div className="w-11/12 flex justify-between px-12 -mt-1 pointer-events-none">
        <div className="w-10 sm:w-12 h-36 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 rounded-b shadow-2xl flex flex-col justify-end">
          <div className="w-24 h-3 bg-slate-900 -ml-7 rounded-full shadow-md" />
        </div>
        <div className="w-10 sm:w-12 h-36 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 rounded-b shadow-2xl flex flex-col justify-end">
          <div className="w-24 h-3 bg-slate-900 -ml-7 rounded-full shadow-md" />
        </div>
      </div>

      {/* 4. FOREGROUND: ERGONOMIC CHAIR */}
      <div className="relative -mt-24 sm:-mt-28 z-30 flex flex-col items-center">
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
