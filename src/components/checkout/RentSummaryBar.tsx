"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShoppingBag, ChevronUp, Package, Zap } from "lucide-react";
import { useWorkspaceStore, DURATION_DISCOUNTS } from "@/store/useWorkspaceStore";
import { RentalDuration } from "@/types/workspace";

const DURATIONS: { value: RentalDuration; label: string }[] = [
  { value: 1, label: "1 mo" },
  { value: 3, label: "3 mo" },
  { value: 6, label: "6 mo" },
  { value: 12, label: "12 mo" },
  { value: 24, label: "24 mo" },
];

export const RentSummaryBar: React.FC = () => {
  const getEquippedItemsCount = useWorkspaceStore((s) => s.getEquippedItemsCount);
  const getBaseMonthlyTotal = useWorkspaceStore((s) => s.getBaseMonthlyTotal);
  const getDiscountedMonthlyTotal = useWorkspaceStore((s) => s.getDiscountedMonthlyTotal);
  const getTotalRetailValue = useWorkspaceStore((s) => s.getTotalRetailValue);
  const rentalDuration = useWorkspaceStore((s) => s.rentalDuration);
  const setRentalDuration = useWorkspaceStore((s) => s.setRentalDuration);
  const setRentModalOpen = useWorkspaceStore((s) => s.setRentModalOpen);
  const shouldReduceMotion = useReducedMotion();

  const count = getEquippedItemsCount();
  const base = getBaseMonthlyTotal();
  const discounted = getDiscountedMonthlyTotal();
  const retailValue = getTotalRetailValue();
  const discount = DURATION_DISCOUNTS[rentalDuration];
  const savings = Math.round((base - discounted) * 10) / 10;

  if (count === 0) return null;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3"
    >
      <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 shadow-2xl shadow-slate-950/40 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">

        {/* Left: Bag Icon + Item Count */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <div className="p-2.5 rounded-2xl bg-emerald-600/20">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow">
              {count}
            </span>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Your Setup</p>
            <p className="text-xs font-bold text-slate-200">{count} items · Retail €{retailValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Center: Duration Selector */}
        <div className="flex items-center gap-2 flex-1 justify-start sm:justify-center overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {DURATIONS.map(({ value, label }) => {
            const disc = DURATION_DISCOUNTS[value];
            const isActive = rentalDuration === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRentalDuration(value)}
                className={`relative flex flex-col items-center px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg scale-105"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {disc > 0 && (
                  <span className={`text-[9px] font-extrabold leading-none mb-0.5 ${isActive ? "text-emerald-200" : "text-emerald-500"}`}>
                    -{disc}%
                  </span>
                )}
                {label}
              </button>
            );
          })}
        </div>

        {/* Right: Pricing + CTA */}
        <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            {discount > 0 && (
              <div className="flex items-center gap-1 justify-end">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-bold">
                  Save €{savings}/mo with {rentalDuration}m plan
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-1 justify-end">
              {discount > 0 && (
                <span className="text-sm text-slate-500 line-through font-medium">€{base}</span>
              )}
              <AnimatePresence mode="wait">
                <motion.span
                  key={discounted}
                  initial={shouldReduceMotion ? {} : { y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={shouldReduceMotion ? {} : { y: 10, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-2xl font-extrabold text-white"
                >
                  €{discounted}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm text-slate-400 font-semibold">/mo</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRentModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm shadow-xl shadow-emerald-900/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <Package className="w-4 h-4" />
            <span>Rent Your Setup!</span>
            <ChevronUp className="w-4 h-4 opacity-70" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
