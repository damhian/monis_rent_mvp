"use client";

import React from "react";
import { CatalogItem } from "@/types/workspace";

interface ItemGraphicProps {
  itemId: string;
  item?: CatalogItem;
  className?: string;
  compact?: boolean;
}

export const ItemGraphic: React.FC<ItemGraphicProps> = ({
  itemId,
  item,
  className = "",
  compact = false,
}) => {
  // =========================================================================
  // 1. CHAIRS
  // =========================================================================
  if (itemId === "chair-aeron") {
    // Herman Miller Aeron: Pellicle mesh, horizontal PostureFit SL lumbar pad, graphite frame
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Backrest */}
        <div
          className={`${
            compact ? "w-16 h-16 rounded-2xl" : "w-28 sm:w-32 h-28 sm:h-32 rounded-3xl"
          } bg-linear-to-b from-stone-800 to-stone-900 border-2 border-stone-600 shadow-xl p-2 flex flex-col items-center justify-between relative overflow-hidden`}
        >
          {/* Pellicle 8Z Mesh Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#57534e_1.5px,transparent_1.5px)] bg-size-[5px_5px] opacity-75" />
          {/* PostureFit SL Lumbar Support */}
          <div
            className={`z-10 ${
              compact ? "w-10 h-2 mt-2" : "w-16 h-4 mt-4"
            } rounded-full bg-stone-700/90 border border-stone-500 shadow-inner`}
          />
          <div className="z-10 text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider">
            Aeron
          </div>
        </div>
        {/* Armrests */}
        <div
          className={`absolute ${
            compact ? "top-7 -left-2 w-2 h-7" : "top-12 -left-3 w-4 h-12"
          } rounded-lg bg-stone-800 border border-stone-600 shadow-md`}
        />
        <div
          className={`absolute ${
            compact ? "top-7 -right-2 w-2 h-7" : "top-12 -right-3 w-4 h-12"
          } rounded-lg bg-stone-800 border border-stone-600 shadow-md`}
        />
        {/* Seat Cushion Mesh */}
        <div
          className={`${
            compact ? "w-18 h-6 rounded-xl -mt-1" : "w-32 sm:w-36 h-10 rounded-2xl -mt-2"
          } bg-stone-900 border-t-2 border-stone-600 shadow-xl z-10 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(#57534e_1.5px,transparent_1.5px)] bg-size-[5px_5px] opacity-75" />
        </div>
        {/* Stem & Caster Base */}
        <div className={`${compact ? "w-2 h-3" : "w-3.5 h-6"} bg-stone-600 shadow-inner`} />
        <div className="flex items-center gap-1 -mt-0.5">
          <div className={`${compact ? "w-1.5 h-1.5" : "w-2.5 h-2"} rounded-full bg-stone-800 shadow`} />
          <div className={`${compact ? "w-14 h-1" : "w-28 h-1.5"} bg-stone-600 rounded-full`} />
          <div className={`${compact ? "w-1.5 h-1.5" : "w-2.5 h-2"} rounded-full bg-stone-800 shadow`} />
        </div>
      </div>
    );
  }

  if (itemId === "chair-gesture") {
    // Steelcase Gesture: High contoured wrap-around back, deep onyx fabric, articulated curved arms
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Tall wrap-around backrest */}
        <div
          className={`${
            compact ? "w-15 h-18 rounded-t-2xl" : "w-26 sm:w-30 h-32 sm:h-36 rounded-t-3xl"
          } bg-linear-to-b from-zinc-800 via-zinc-900 to-black border-2 border-zinc-700 shadow-2xl p-2 flex flex-col items-center justify-between relative`}
        >
          {/* Ergonomic spinal contour stitch lines */}
          <div className="w-1/2 h-full flex flex-col justify-around py-2 opacity-30">
            <div className="w-full h-0.5 bg-zinc-400 rounded-full" />
            <div className="w-full h-0.5 bg-zinc-400 rounded-full" />
            <div className="w-full h-0.5 bg-zinc-400 rounded-full" />
          </div>
          <div className="z-10 text-[8px] font-mono text-zinc-400 font-bold uppercase tracking-wider pb-1">
            Gesture 360°
          </div>
        </div>
        {/* 360 Dynamic Articulated Arms */}
        <div
          className={`absolute ${
            compact ? "top-8 -left-3 w-3 h-8 rotate-[-10deg]" : "top-14 -left-4 w-5 h-14 rotate-[-10deg]"
          } rounded-xl bg-zinc-700 border border-zinc-600 shadow-lg`}
        />
        <div
          className={`absolute ${
            compact ? "top-8 -right-3 w-3 h-8 rotate-10" : "top-14 -right-4 w-5 h-14 rotate-10"
          } rounded-xl bg-zinc-700 border border-zinc-600 shadow-lg`}
        />
        {/* Deep Contour Cushion */}
        <div
          className={`${
            compact ? "w-18 h-7 rounded-2xl -mt-2" : "w-32 sm:w-36 h-11 rounded-3xl -mt-3"
          } bg-zinc-950 border-t-2 border-zinc-600 shadow-2xl z-10`}
        />
        {/* Base */}
        <div className={`${compact ? "w-2 h-3" : "w-3.5 h-6"} bg-zinc-700 shadow-inner`} />
        <div className="flex items-center gap-1 -mt-0.5">
          <div className={`${compact ? "w-1.5 h-1.5" : "w-2.5 h-2"} rounded-full bg-zinc-900 shadow`} />
          <div className={`${compact ? "w-14 h-1" : "w-28 h-1.5"} bg-zinc-700 rounded-full`} />
          <div className={`${compact ? "w-1.5 h-1.5" : "w-2.5 h-2"} rounded-full bg-zinc-900 shadow`} />
        </div>
      </div>
    );
  }

  if (itemId === "chair-sayl") {
    // Herman Miller Sayl: Iconic Yves Béhar frameless 3D suspension back with striking diamond web lattice
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Sayl suspension back with striking geometric Y-Tower */}
        <div
          className={`${
            compact ? "w-16 h-17 rounded-t-3xl" : "w-28 sm:w-32 h-30 sm:h-34 rounded-t-3xl"
          } bg-linear-to-b from-slate-100 via-rose-50 to-slate-200 border-2 border-slate-300 shadow-xl p-2 flex flex-col items-center justify-between relative overflow-hidden`}
        >
          {/* Frameless 3D suspension diamond web pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1.5px,transparent_1.5px)] bg-size-[7px_7px] opacity-40" />
          {/* Iconic Y-Tower support spine */}
          <div className="z-10 w-2 h-full bg-rose-600/80 rounded-full shadow-md" />
          <div className="z-10 text-[8px] font-mono text-rose-700 font-bold uppercase tracking-wider pb-0.5">
            Sayl Web
          </div>
        </div>
        {/* Sloping Modern Armrests */}
        <div
          className={`absolute ${
            compact ? "top-7 -left-2 w-2.5 h-8" : "top-13 -left-3.5 w-4 h-13"
          } rounded-xl bg-slate-200 border border-slate-300 shadow-md`}
        />
        <div
          className={`absolute ${
            compact ? "top-7 -right-2 w-2.5 h-8" : "top-13 -right-3.5 w-4 h-13"
          } rounded-xl bg-slate-200 border border-slate-300 shadow-md`}
        />
        {/* Seat Cushion in Slate/Fog White */}
        <div
          className={`${
            compact ? "w-18 h-7 rounded-2xl -mt-2" : "w-32 sm:w-36 h-11 rounded-3xl -mt-3"
          } bg-slate-100 border-t-2 border-rose-400 shadow-xl z-10`}
        />
        {/* White stem & 5-star base */}
        <div className={`${compact ? "w-2 h-3" : "w-3.5 h-6"} bg-slate-300 shadow-inner`} />
        <div className="flex items-center gap-1 -mt-0.5">
          <div className={`${compact ? "w-1.5 h-1.5" : "w-2.5 h-2"} rounded-full bg-slate-400 shadow`} />
          <div className={`${compact ? "w-14 h-1" : "w-28 h-1.5"} bg-slate-300 rounded-full`} />
          <div className={`${compact ? "w-1.5 h-1.5" : "w-2.5 h-2"} rounded-full bg-slate-400 shadow`} />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. MONITORS
  // =========================================================================
  if (itemId === "monitor-apple-studio") {
    // Apple Studio Display 27": Silver aluminum chin, glass reflection, iconic colorful 5K wallpaper
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Display Frame */}
        <div
          className={`${
            compact ? "w-28 h-18 p-1" : "w-46 sm:w-58 h-30 sm:h-38 p-1.5"
          } rounded-xl bg-stone-900 border-2 border-stone-300 shadow-2xl flex flex-col justify-between overflow-hidden`}
        >
          {/* Screen: Apple macOS 5K Studio wallpaper */}
          <div className="w-full h-full rounded-lg bg-linear-to-tr from-rose-500 via-purple-600 to-indigo-500 p-2 flex flex-col justify-between relative overflow-hidden shadow-inner">
            {/* Glass sheen reflex */}
            <div className="absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between text-[8px] font-medium text-white/90 drop-shadow">
              <span>Finder</span>
              <span className="font-mono text-[7px] bg-black/30 px-1 rounded">5K Retina</span>
            </div>

            <div className="flex flex-col items-center my-auto">
              <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[7px] text-white/80 font-mono">
              <span>Studio 27"</span>
              <span>P3 TrueTone</span>
            </div>
          </div>

          {/* Silver Aluminum Chin */}
          <div className="w-full h-2.5 sm:h-3 bg-linear-to-r from-stone-300 via-stone-200 to-stone-300 flex items-center justify-center rounded-b-md mt-0.5">
            {/* Center camera / Apple dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shadow-inner" />
          </div>
        </div>

        {/* Silver Aluminum Stand */}
        <div className={`${compact ? "w-3 h-3" : "w-5 h-5 sm:h-6"} bg-linear-to-b from-stone-300 to-stone-400 shadow-sm`} />
        <div className={`${compact ? "w-12 h-1" : "w-20 h-1.5"} rounded-full bg-stone-300 shadow-md border-t border-white`} />
      </div>
    );
  }

  if (itemId === "monitor-dell-ultrasharp") {
    // Dell UltraSharp 32": 4-sided infinity micro-bezel, Dark Mode IDE code editor with syntax colors
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Micro-bezel Display Frame */}
        <div
          className={`${
            compact ? "w-30 h-19 p-0.5" : "w-50 sm:w-64 h-32 sm:h-40 p-1"
          } rounded-lg bg-zinc-950 border border-zinc-700 shadow-2xl flex flex-col justify-between overflow-hidden`}
        >
          {/* Screen: VS Code / IDE Dark Mode */}
          <div className="w-full h-full rounded-md bg-[#1e1e1e] p-2 flex flex-col justify-between relative overflow-hidden font-mono">
            {/* Window bar */}
            <div className="flex items-center justify-between text-[7px] text-zinc-400 border-b border-zinc-800 pb-1">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-zinc-500 truncate">App.tsx — UltraSharp 32"</span>
            </div>

            {/* Syntax Highlighted Lines */}
            <div className="space-y-1 my-auto">
              <div className="flex gap-1 items-center">
                <div className="h-1 w-6 bg-purple-400 rounded" />
                <div className="h-1 w-12 bg-blue-400 rounded" />
                <div className="h-1 w-8 bg-amber-400 rounded" />
              </div>
              <div className="flex gap-1 items-center pl-2">
                <div className="h-1 w-10 bg-emerald-400 rounded" />
                <div className="h-1 w-14 bg-sky-300 rounded" />
              </div>
              <div className="flex gap-1 items-center pl-2">
                <div className="h-1 w-16 bg-zinc-500 rounded" />
              </div>
              <div className="flex gap-1 items-center">
                <div className="h-1 w-8 bg-purple-400 rounded" />
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="flex justify-between items-center text-[7px] bg-[#007acc] text-white px-1 rounded-sm -mx-1 -mb-1">
              <span>TypeScript · UTF-8</span>
              <span>IPS Black 4K</span>
            </div>
          </div>
        </div>

        {/* Platinum / Dark Grey Stand */}
        <div className={`${compact ? "w-3 h-3" : "w-5 h-5 sm:h-6"} bg-linear-to-b from-zinc-600 to-zinc-700 shadow-sm`} />
        <div className={`${compact ? "w-14 h-1.5" : "w-22 h-2"} rounded-md bg-zinc-700 shadow-md border-t border-zinc-500`} />
      </div>
    );
  }

  if (itemId === "monitor-lg-dualup") {
    // LG DualUp 28" 16:18: TALL square/vertical format with Ergo Arm clamp mount!
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Tall 16:18 Square Display Frame */}
        <div
          className={`${
            compact ? "w-22 h-26 p-1" : "w-36 sm:w-44 h-44 sm:h-54 p-1.5"
          } rounded-xl bg-neutral-900 border-2 border-neutral-700 shadow-2xl flex flex-col justify-between overflow-hidden`}
        >
          {/* Split Screen layout: Top = Docs / Graph, Bottom = Terminal / IDE */}
          <div className="w-full h-full rounded-lg bg-neutral-950 p-1.5 flex flex-col justify-between gap-1 overflow-hidden font-mono">
            {/* Top Half: Documentation / Analytics */}
            <div className="flex-1 rounded bg-neutral-900 border border-neutral-800 p-1.5 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[7px] text-emerald-400">
                <span>16:18 Split 1</span>
                <span>DOCS</span>
              </div>
              <div className="space-y-1">
                <div className="h-1 w-full bg-emerald-500/30 rounded" />
                <div className="h-1 w-3/4 bg-emerald-500/20 rounded" />
                <div className="h-1 w-1/2 bg-emerald-500/20 rounded" />
              </div>
            </div>

            {/* Split Divider */}
            <div className="w-full h-0.5 bg-neutral-700" />

            {/* Bottom Half: Code Terminal */}
            <div className="flex-1 rounded bg-[#0c1017] border border-neutral-800 p-1.5 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[7px] text-sky-400">
                <span>16:18 Split 2</span>
                <span>RUNNING</span>
              </div>
              <div className="space-y-1 font-mono text-[6px] text-neutral-400">
                <div className="h-1 w-4/5 bg-sky-400/30 rounded" />
                <div className="h-1 w-3/5 bg-indigo-400/30 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Ergo Arm Articulated Clamp */}
        <div className={`${compact ? "w-3 h-4" : "w-5 h-7"} bg-linear-to-r from-neutral-700 to-neutral-800 shadow-md`} />
        <div className={`${compact ? "w-8 h-2" : "w-12 h-3"} bg-neutral-800 rounded-sm shadow-lg border-t border-neutral-600 flex items-center justify-center`}>
          <span className="text-[6px] text-neutral-400 font-bold">ERGO CLAMP</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. DESKS
  // =========================================================================
  if (itemId === "desk-smartdesk-pro") {
    // Autonomous SmartDesk Pro: Modern dual-motor sit-stand desk with motorized columns & digital LED handset
    return (
      <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
        {/* Desk Top */}
        <div
          className={`${
            compact ? "h-6 rounded-lg px-2" : "h-10 sm:h-12 rounded-2xl px-4"
          } w-full bg-linear-to-r from-stone-800 via-stone-700 to-stone-800 border-b-4 border-stone-900 shadow-xl flex items-center justify-between text-white`}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono font-bold tracking-wider">SMARTDESK PRO</span>
          </div>
          {/* Digital LED Height Handset */}
          <div className="bg-black/60 px-2 py-0.5 rounded border border-white/10 font-mono text-[8px] text-emerald-400 flex items-center gap-1">
            <span>72.5 cm</span>
            <span className="text-[6px] text-stone-400">▲▼ 1 2 3</span>
          </div>
        </div>

        {/* Dual Motorized Telescopic Legs */}
        <div className="w-full flex justify-between px-6 -mt-0.5">
          <div className={`${compact ? "w-3 h-6" : "w-5 h-12"} bg-linear-to-b from-stone-700 via-stone-800 to-stone-900 shadow-md border-x border-stone-600`} />
          <div className={`${compact ? "w-3 h-6" : "w-5 h-12"} bg-linear-to-b from-stone-700 via-stone-800 to-stone-900 shadow-md border-x border-stone-600`} />
        </div>
      </div>
    );
  }

  if (itemId === "desk-oak-studio") {
    // Nordic Solid Oak Studio Desk: Warm Scandinavian solid white oak planks, beveled chamfered edge, embedded Qi charger
    return (
      <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
        {/* Solid Oak Timber Top */}
        <div
          className={`${
            compact ? "h-6 rounded-lg px-2" : "h-10 sm:h-12 rounded-2xl px-4"
          } w-full bg-linear-to-r from-[#EEDDC6] via-[#F3ECE1] to-[#EEDDC6] border-b-4 border-[#C8AC89] shadow-xl flex items-center justify-between text-stone-800 relative overflow-hidden`}
        >
          {/* Natural Woodgrain Planks */}
          <div className="absolute inset-0 bg-[radial-gradient(#b8976b_1px,transparent_1px)] bg-size-[10px_10px] opacity-25" />
          
          <div className="flex items-center gap-1.5 z-10">
            <span className="text-[9px] font-semibold tracking-wider text-stone-700">SOLID WHITE OAK</span>
          </div>

          {/* Embedded Qi Wireless Dock Icon */}
          <div className="z-10 flex items-center gap-1 bg-stone-900/10 px-2 py-0.5 rounded-full border border-stone-400/40 text-[8px] text-stone-600 font-mono">
            <span>(( ⚡ Qi Charge ))</span>
          </div>
        </div>

        {/* Wooden A-Frame Solid Timber Legs */}
        <div className="w-full flex justify-between px-6 -mt-0.5">
          <div className={`${compact ? "w-3 h-6" : "w-5 h-12"} bg-linear-to-b from-[#EEDDC6] to-[#C8AC89] shadow-md border-x border-[#C8AC89]`} />
          <div className={`${compact ? "w-3 h-6" : "w-5 h-12"} bg-linear-to-b from-[#EEDDC6] to-[#C8AC89] shadow-md border-x border-[#C8AC89]`} />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. ACCESSORIES (Keyboard, Mouse, Lamp, Plant)
  // =========================================================================
  if (itemId === "keyboard-keychron-q3") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-24 h-9 p-1" : "w-36 sm:w-44 h-14 p-1.5"
          } rounded-lg bg-zinc-900 border-2 border-zinc-700 shadow-xl flex flex-col justify-between`}
        >
          {/* Keycaps Grid with Colorful Accents */}
          <div className="grid grid-cols-12 gap-0.5 h-full">
            {Array.from({ length: 36 }).map((_, i) => {
              // Accent keycaps: red Esc, blue Enter, grey alphas
              let color = "bg-zinc-800 border-zinc-700";
              if (i === 0) color = "bg-rose-600 border-rose-500"; // Esc
              if (i === 23) color = "bg-sky-600 border-sky-500"; // Enter
              if (i === 35) color = "bg-amber-600 border-amber-500"; // Knob / key
              return (
                <div
                  key={i}
                  className={`rounded-xs border shadow-[0_1px_0_rgba(0,0,0,0.6)] ${color}`}
                />
              );
            })}
          </div>
          {/* Rotary Knob Indicator on Top Right */}
          <div className="flex justify-between items-center text-[6px] font-mono text-zinc-400 mt-0.5">
            <span>Keychron Q3 Pro (TKL)</span>
            <span className="text-amber-400 font-bold">● Rotary Knob</span>
          </div>
        </div>
      </div>
    );
  }

  if (itemId === "keyboard-apple-magic") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-24 h-8 p-1" : "w-36 sm:w-44 h-12 p-1.5"
          } rounded-lg bg-linear-to-b from-stone-200 to-stone-300 border border-stone-400 shadow-md flex flex-col justify-between`}
        >
          {/* Low profile white chiclet keys */}
          <div className="grid grid-cols-12 gap-0.5 h-full">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xs bg-white border border-stone-300 shadow-[0_1px_0_rgba(0,0,0,0.15)] flex items-center justify-center"
              >
                {i === 11 && <div className="w-1 h-1 rounded-full bg-stone-300" />}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-[6px] font-mono text-stone-600 mt-0.5">
            <span>Magic Keyboard</span>
            <span className="text-stone-700 font-bold">Touch ID</span>
          </div>
        </div>
      </div>
    );
  }

  if (itemId === "keyboard-hhkb-pro") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-22 h-9 p-1" : "w-32 sm:w-40 h-14 p-1.5"
          } rounded-lg bg-[#242426] border-2 border-stone-700 shadow-xl flex flex-col justify-between`}
        >
          {/* 60% Symmetrical Topre layout */}
          <div className="grid grid-cols-10 gap-0.5 h-full">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xs bg-[#303033] border border-stone-700 shadow-[0_1px_0_rgba(0,0,0,0.7)]"
              />
            ))}
          </div>
          <div className="flex justify-between items-center text-[6px] font-mono text-stone-400 mt-0.5 px-0.5">
            <span className="font-bold text-amber-500/90">HHKB Hybrid</span>
            <span>Topre 45g</span>
          </div>
        </div>
      </div>
    );
  }

  if (itemId === "mouse-mx-master-3s") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-6 h-9" : "w-9 h-14"
          } rounded-2xl bg-linear-to-b from-stone-800 via-stone-900 to-black border border-stone-600 shadow-xl flex flex-col items-center justify-between p-1 relative`}
        >
          {/* MagSpeed Metal Scroll Wheel */}
          <div className={`${compact ? "w-1.5 h-2.5" : "w-2 h-4"} rounded-full bg-linear-to-b from-stone-300 to-stone-400 shadow-inner mt-0.5 border border-stone-200`} />
          {/* Thumb Rest Wing */}
          <div className="absolute top-4 -left-1 w-2 h-5 rounded-l-full bg-stone-800 border-l border-stone-600 shadow" />
          <span className="text-[6px] text-stone-500 font-mono">MX 3S</span>
        </div>
      </div>
    );
  }

  if (itemId === "mouse-apple-magic") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-5 h-9" : "w-8 h-13"
          } rounded-full bg-linear-to-b from-stone-900 via-black to-stone-900 border border-stone-500 shadow-lg flex flex-col items-center justify-between p-1 relative overflow-hidden`}
        >
          {/* Glass sheen highlight */}
          <div className="absolute inset-x-0 top-1 h-3 bg-linear-to-b from-white/25 to-transparent rounded-full pointer-events-none" />
          <div className="w-1 h-1 rounded-full bg-stone-600 mt-1" />
          <span className="text-[5px] text-stone-400 font-mono">Magic</span>
        </div>
      </div>
    );
  }

  if (itemId === "mouse-logitech-lift") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* 57-degree tilted vertical ergonomic silhouette */}
        <div
          className={`${
            compact ? "w-6 h-9" : "w-9 h-14"
          } rounded-2xl bg-linear-to-tr from-stone-200 via-stone-100 to-stone-300 border border-stone-400 shadow-xl flex flex-col items-center justify-between p-1 transform rotate-6 relative`}
        >
          {/* Soft rubber ribbed grip */}
          <div className="w-full flex flex-col gap-0.5 py-1 px-0.5 opacity-30">
            <div className="h-0.5 bg-stone-400 rounded-full" />
            <div className="h-0.5 bg-stone-400 rounded-full" />
          </div>
          <div className="w-1.5 h-3 rounded-full bg-stone-400 mb-1" />
          <span className="text-[5px] text-stone-600 font-bold font-mono">57° LIFT</span>
        </div>
      </div>
    );
  }

  if (itemId === "lamp-screenbar-halo") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* BenQ ScreenBar Halo Horizontal Lightbar */}
        <div
          className={`${
            compact ? "w-20 h-1.5" : "w-32 sm:w-40 h-2.5"
          } rounded-full bg-linear-to-r from-amber-300 via-amber-100 to-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.8)] border border-amber-200`}
        />
        {/* Monitor Mount Clip */}
        <div className={`${compact ? "w-1 h-3" : "w-1.5 h-5"} bg-zinc-700 -mt-0.5`} />
        <div className={`${compact ? "w-4 h-1" : "w-6 h-1.5"} rounded-full bg-zinc-800 shadow`} />
      </div>
    );
  }

  if (itemId === "lamp-dyson-solarcycle") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Dyson Articulating 3-point arm */}
        <div className="flex items-center">
          <div className={`${compact ? "w-10 h-1.5" : "w-16 h-2"} bg-stone-800 rounded-full shadow-md`} />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] border border-amber-200" />
        </div>
        {/* Glowing vertical ambient stem */}
        <div className={`${compact ? "w-1 h-10" : "w-1.5 h-16"} bg-linear-to-b from-stone-800 via-amber-200/50 to-stone-800 shadow-[0_0_8px_rgba(251,191,36,0.4)]`} />
        {/* Heavy circular base */}
        <div className={`${compact ? "w-6 h-1.5" : "w-10 h-2"} rounded-full bg-stone-800 shadow-lg border-t border-stone-600`} />
      </div>
    );
  }

  if (itemId === "lamp-artemide-tolomeo") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Cantilever architect shade */}
        <div className="flex flex-col items-center -mb-1">
          <div className={`${compact ? "w-6 h-4" : "w-9 h-6"} rounded-t-full bg-linear-to-b from-stone-300 to-stone-400 border border-stone-400 shadow-md flex items-center justify-center`}>
            <div className="w-2 h-1 bg-amber-200 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          </div>
        </div>
        {/* Spring balanced aluminum double arm */}
        <div className={`${compact ? "w-0.5 h-10 rotate-12" : "w-1 h-16 rotate-12"} bg-stone-400 shadow-sm`} />
        {/* Heavy disc base */}
        <div className={`${compact ? "w-7 h-1.5" : "w-11 h-2"} rounded-full bg-stone-300 border border-stone-400 shadow-md`} />
      </div>
    );
  }

  if (itemId === "plant-monstera") {
    // Overlap math (all values in px):
    //
    // COMPACT  container w-10(40) h-9(36):
    //   Left  w-7(28) at -left-2(-8)  → spans -8…20px
    //   Center w-8(32) at center(20)  → spans 4…36px   → 16px overlap with left ✓
    //   Right w-7(28) at -right-2(-8) → spans 20…48px  → 16px overlap with center ✓
    //   Center bottom: -top-3(-12) + h-11(44) = 32px < h-9(36) → 4px gap only ✓
    //
    // NON-COMPACT container w-14(56) h-12(48):
    //   Left  w-10(40) at -left-3(-12) → spans -12…28px
    //   Center w-12(48) at center(28)  → spans 4…52px  → 24px overlap with left ✓
    //   Right w-10(40) at -right-3(-12)→ spans 28…68px → 24px overlap with center ✓
    //   Center bottom: -top-4(-16) + h-16(64) = 48px = h-12(48) → 0px gap ✓
    if (compact) {
      return (
        <div className={`flex flex-col items-center select-none ${className}`}>
          <div className="relative w-10 h-9 flex justify-center items-end">
            <div className="absolute -top-1 -left-2 w-7 h-9 rounded-full bg-emerald-600 rotate-[-30deg] shadow-sm border border-emerald-500 flex items-center justify-center">
              <div className="w-1 h-3 bg-emerald-800/60 rounded-full" />
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-11 rounded-full bg-emerald-500 shadow-md border border-emerald-400 z-10 flex items-center justify-center">
              <div className="w-1 h-4 bg-emerald-700/60 rounded-full" />
            </div>
            <div className="absolute -top-1 -right-2 w-7 h-9 rounded-full bg-emerald-600 rotate-30 shadow-sm border border-emerald-500 flex items-center justify-center">
              <div className="w-1 h-3 bg-emerald-800/60 rounded-full" />
            </div>
            <div className="w-full h-full" />
          </div>
          <div className="w-7 h-6 rounded-b-xl bg-linear-to-b from-stone-200 to-stone-400 border border-stone-400 shadow-lg flex items-center justify-center">
            <span className="text-[7px] font-bold text-stone-700">Monis</span>
          </div>
        </div>
      );
    }
    // Non-compact — scaled up ~1.5×, same proportional overlap
    return (
      <div className={`flex flex-col items-center select-none ${className}`}>
        <div className="relative w-14 h-12 flex justify-center items-end">
          <div className="absolute -top-1 -left-3 w-10 h-12 rounded-full bg-emerald-600 rotate-[-30deg] shadow-sm border border-emerald-500 flex items-center justify-center">
            <div className="w-1.5 h-5 bg-emerald-800/60 rounded-full" />
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-16 rounded-full bg-emerald-500 shadow-md border border-emerald-400 z-10 flex items-center justify-center">
            <div className="w-1.5 h-6 bg-emerald-700/60 rounded-full" />
          </div>
          <div className="absolute -top-1 -right-3 w-10 h-12 rounded-full bg-emerald-600 rotate-30 shadow-sm border border-emerald-500 flex items-center justify-center">
            <div className="w-1.5 h-5 bg-emerald-800/60 rounded-full" />
          </div>
          <div className="w-full h-full" />
        </div>
        <div className="w-10 h-9 rounded-b-xl bg-linear-to-b from-stone-200 to-stone-400 border border-stone-400 shadow-lg flex items-center justify-center">
          <span className="text-[7px] font-bold text-stone-700">Monis</span>
        </div>
      </div>
    );
  }

  if (itemId === "plant-bonsai-ficus") {
    // Leaf sizing is carefully matched so clouds always overlap ~30% of their width
    // in both compact and non-compact modes — creating a proper canopy, not 3 separate balls.
    //
    // Compact  (w-14 = 56px): side w-6(24px) @ left-1/right-1 → overlap ≈12px with center w-8
    // Non-comp (w-16 = 64px): side w-8(32px) @ left-0/right-0 → overlap ≈16px with center w-10
    const foliageH   = compact ? "h-10" : "h-16";
    const foliageW   = compact ? "w-14" : "w-16";
    const sideLeafW  = compact ? "w-6 h-5" : "w-8 h-7";
    const centLeafW  = compact ? "w-8 h-7" : "w-10 h-9";
    const trunkH     = compact ? "h-5"  : "h-8";
    const trunkW     = compact ? "w-3"  : "w-4";
    const dishW      = compact ? "w-10" : "w-14";
    const dishH      = compact ? "h-3"  : "h-4";
    return (
      <div className={`flex flex-col items-center select-none ${className}`}>
        {/* Foliage zone */}
        <div className={`relative ${foliageW} ${foliageH} flex justify-center items-end`}>
          {/* Left leaf cloud */}
          <div className={`absolute top-1 left-0 ${sideLeafW} rounded-full bg-emerald-700 shadow-sm border border-emerald-600`} />
          {/* Center front leaf cloud (tallest, z on top) */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 ${centLeafW} rounded-full bg-emerald-500 shadow-md border border-emerald-400 z-10`} />
          {/* Right leaf cloud */}
          <div className={`absolute top-1 right-0 ${sideLeafW} rounded-full bg-emerald-700 shadow-sm border border-emerald-600`} />
          {/* Gnarled trunk — in-flow at bottom, leaves overlap it from above */}
          <div className={`relative z-20 ${trunkW} ${trunkH} bg-linear-to-b from-amber-800 via-stone-600 to-stone-700 rounded-t-md shadow-inner`} />
        </div>
        {/* Glazed oval bonsai dish — flush below trunk */}
        <div
          className={`${dishW} ${dishH} rounded-full bg-linear-to-b from-stone-700 to-stone-900 border border-stone-600 shadow-lg flex items-center justify-center`}
        >
          <div className="w-3/4 h-px bg-stone-500 rounded-full" />
        </div>
      </div>
    );
  }

  if (itemId === "plant-snake-plant") {
    // Single container: pot at z-20 at bottom covers blade bases → blades grow FROM the pot.
    // Blades sit at bottom-N so their bases are N px from the bottom.
    // Pot height > N means pot rim covers the bases → plant-in-pot look.
    //
    // COMPACT  (w-10 h-20): pot h-6(24px) at bottom-0, blades at bottom-5(20px) → 4px inside pot ✓
    // NON-COMP (w-12 h-28): pot h-8(32px) at bottom-0, blades at bottom-6(24px) → 8px inside pot ✓
    if (compact) {
      return (
        <div className={`relative w-10 h-20 select-none ${className}`}>
          {/* Left blade */}
          <div className="absolute bottom-5 left-0.5 w-2.5 h-12 bg-emerald-800 border-x-2 border-amber-300 rounded-t-full rotate-[-8deg] shadow-sm" />
          {/* Center blade (tallest) */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-3 h-16 bg-emerald-700 border-x-2 border-amber-300 rounded-t-full shadow-md z-10" />
          {/* Right blade */}
          <div className="absolute bottom-5 right-0.5 w-2.5 h-14 bg-emerald-800 border-x-2 border-amber-300 rounded-t-full rotate-[8deg] shadow-sm" />
          {/* Pot — z-20 covers blade bases so they look rooted inside */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-6 rounded-b-lg bg-linear-to-b from-stone-100 to-stone-200 border border-stone-300 shadow-lg z-20 flex items-center justify-center">
            <span className="text-[5px] font-bold text-stone-500 font-mono tracking-tight">SANSEVIERIA</span>
          </div>
        </div>
      );
    }
    // Non-compact — ~1.5× scale, same overlap ratio
    return (
      <div className={`relative w-12 h-28 select-none ${className}`}>
        {/* Left blade */}
        <div className="absolute bottom-6 left-0 w-3 h-16 bg-emerald-800 border-x-2 border-amber-300 rounded-t-full rotate-[-8deg] shadow-sm" />
        {/* Center blade (tallest) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4 h-22 bg-emerald-700 border-x-2 border-amber-300 rounded-t-full shadow-md z-10" />
        {/* Right blade */}
        <div className="absolute bottom-6 right-0 w-3 h-20 bg-emerald-800 border-x-2 border-amber-300 rounded-t-full rotate-[8deg] shadow-sm" />
        {/* Pot — z-20 covers blade bases */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-8 rounded-b-lg bg-linear-to-b from-stone-100 to-stone-200 border border-stone-300 shadow-lg z-20 flex items-center justify-center">
          <span className="text-[6px] font-bold text-stone-500 font-mono">SANSEVIERIA</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. EXPANSION PODS (Coffee, Outdoor, Relax, Garage)
  // =========================================================================
  if (itemId === "coffee-barista-express") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-20 h-16 p-1" : "w-28 h-24 p-1.5"
          } rounded-xl bg-linear-to-b from-stone-200 via-stone-300 to-stone-400 border border-stone-400 shadow-xl flex flex-col justify-between`}
        >
          {/* Top bean hopper & pressure gauge */}
          <div className="flex justify-between items-center px-1">
            <div className="w-4 h-2 bg-stone-800 rounded-t-sm" />
            {/* Pressure Gauge Dial */}
            <div className="w-4 h-4 rounded-full bg-white border border-stone-500 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-0.5 bg-rose-600 rotate-45" />
            </div>
          </div>
          {/* Portafilter & Drip Tray */}
          <div className="flex items-center gap-1 justify-center my-auto">
            <div className="w-3 h-2 bg-stone-900 rounded-sm" />
            <div className="w-4 h-1 bg-stone-700 rounded-full" />
          </div>
          <div className="w-full h-2 bg-stone-800 rounded-b-sm border-t border-stone-400" />
        </div>
      </div>
    );
  }

  if (itemId === "coffee-fellow-ode") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-16 h-16 p-1" : "w-22 h-24 p-1.5"
          } rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl flex flex-col items-center justify-between`}
        >
          {/* Minimalist Single-Dose Hopper */}
          <div className="w-8 h-2 bg-zinc-800 rounded-t-md" />
          {/* Oversized Front Grind Size Dial */}
          <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center shadow-inner my-auto">
            <div className="w-1 h-3 bg-emerald-400 rounded-full" />
          </div>
          {/* Catch Cup */}
          <div className="w-10 h-5 bg-zinc-800 rounded-md border border-zinc-700" />
        </div>
      </div>
    );
  }

  if (itemId === "outdoor-cowboy-cruiser") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-22 h-14" : "w-32 h-20"
          } rounded-xl bg-zinc-950 border border-zinc-800 p-1.5 shadow-xl flex items-center justify-between relative`}
        >
          {/* Front Wheel */}
          <div className="w-8 h-8 rounded-full border-2 border-zinc-600 flex items-center justify-center shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          </div>
          {/* Sleek Diamond Frame & Battery */}
          <div className="flex-1 h-1 bg-zinc-500 rotate-[-15deg] mx-1 relative">
            <div className="absolute -top-1.5 left-2 px-1 rounded bg-emerald-500/80 text-[5px] text-white font-mono">
              COWBOY
            </div>
          </div>
          {/* Rear Wheel */}
          <div className="w-8 h-8 rounded-full border-2 border-zinc-600 flex items-center justify-center shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          </div>
        </div>
      </div>
    );
  }

  if (itemId === "outdoor-surfboard-fish") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-10 h-20" : "w-14 h-28"
          } rounded-[40%] bg-linear-to-b from-amber-100 via-amber-200 to-amber-300 border-2 border-amber-400 shadow-xl flex flex-col items-center justify-between p-1 relative overflow-hidden`}
        >
          {/* Cedar Stringer down the center */}
          <div className="absolute inset-y-0 w-0.5 bg-amber-800/80" />
          <span className="text-[6px] font-mono text-amber-900 font-bold z-10 pt-2">FISH 5'8"</span>
          {/* Swallowtail cutout at bottom */}
          <div className="w-4 h-2 bg-white rounded-t-full z-10 -mb-1" />
        </div>
      </div>
    );
  }

  if (itemId === "relax-fatboy-beanbag") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-18 h-14" : "w-28 h-22"
          } rounded-[35%] bg-linear-to-br from-indigo-700 via-indigo-800 to-indigo-950 border-2 border-indigo-600 shadow-2xl p-2 flex flex-col items-center justify-center text-white relative`}
        >
          {/* Big iconic oversized Fatboy label */}
          <div className="bg-rose-600 text-white font-black text-[7px] px-1.5 py-0.5 rounded shadow">
            fatboy.
          </div>
          <span className="text-[6px] text-indigo-300 mt-1 font-medium">Stonewashed Cotton</span>
        </div>
      </div>
    );
  }

  if (itemId === "relax-eames-lounge") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-18 h-18 p-1" : "w-26 h-26 p-1.5"
          } rounded-2xl bg-linear-to-b from-[#4A3B32] to-[#2B1F17] border-2 border-[#5C4033] shadow-2xl flex flex-col items-center justify-between relative`}
        >
          {/* Tufted Leather Cushion */}
          <div className="w-full h-1/2 rounded-t-xl bg-zinc-950 border border-zinc-800 p-1 flex items-center justify-around">
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
          </div>
          <span className="text-[7px] text-amber-200/80 font-serif italic">Eames Lounge</span>
          {/* Matching Ottoman */}
          <div className="w-4/5 h-1/3 rounded-md bg-zinc-950 border border-zinc-800 shadow" />
        </div>
      </div>
    );
  }

  if (itemId === "garage-string-shelf") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-20 h-16 p-1" : "w-28 h-24 p-1.5"
          } rounded-lg bg-slate-900 border-2 border-slate-700 shadow-xl flex flex-col justify-around`}
        >
          {/* Wire ladder side rungs */}
          <div className="w-full h-1 bg-white/80 rounded" />
          <div className="flex justify-between px-2 text-[6px] text-slate-400 font-mono">
            <span>TOOL TRAY</span>
            <span>STORAGE</span>
          </div>
          <div className="w-full h-1 bg-white/80 rounded" />
          <div className="w-full h-1 bg-white/80 rounded" />
        </div>
      </div>
    );
  }

  if (itemId === "garage-festool-systainer") {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <div
          className={`${
            compact ? "w-18 h-16 p-1" : "w-26 h-22 p-1.5"
          } rounded-xl bg-stone-200 border-2 border-stone-400 shadow-xl flex flex-col justify-between`}
        >
          {/* Systainer 1 with green T-LOC latch */}
          <div className="w-full h-1/2 rounded-t bg-stone-300 border-b border-stone-400 flex items-center justify-center relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-600 shadow-sm" />
          </div>
          {/* Systainer 2 */}
          <div className="w-full h-1/2 rounded-b bg-stone-300 flex items-center justify-center relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-600 shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  // Fallback generic badge
  return (
    <div className={`w-14 h-14 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-500 ${className}`}>
      {item?.name?.slice(0, 2).toUpperCase() || "EQ"}
    </div>
  );
};
