"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Package, Check, Truck, Zap, Shield } from "lucide-react";
import { useWorkspaceStore, DURATION_DISCOUNTS } from "@/store/useWorkspaceStore";
import { SlotId, CatalogItem, RentalDuration } from "@/types/workspace";

const DURATIONS: { value: RentalDuration; label: string; sublabel: string }[] = [
  { value: 1, label: "1 Month", sublabel: "Pay-as-you-go" },
  { value: 3, label: "3 Months", sublabel: "5% off" },
  { value: 6, label: "6 Months", sublabel: "10% off" },
  { value: 12, label: "12 Months", sublabel: "15% off" },
  { value: 24, label: "24 Months", sublabel: "20% off" },
];

const PERKS = [
  { icon: Truck, text: "Free delivery & professional setup" },
  { icon: Shield, text: "Full insurance & damage protection" },
  { icon: Zap, text: "Swap equipment anytime during term" },
];

export const RentModal: React.FC = () => {
  const isOpen = useWorkspaceStore((s) => s.isRentModalOpen);
  const slots = useWorkspaceStore((s) => s.slots);
  const rentalDuration = useWorkspaceStore((s) => s.rentalDuration);
  const setRentalDuration = useWorkspaceStore((s) => s.setRentalDuration);
  const setRentModalOpen = useWorkspaceStore((s) => s.setRentModalOpen);
  const placeOrder = useWorkspaceStore((s) => s.placeOrder);
  const getBaseMonthlyTotal = useWorkspaceStore((s) => s.getBaseMonthlyTotal);
  const getDiscountedMonthlyTotal = useWorkspaceStore((s) => s.getDiscountedMonthlyTotal);
  const shouldReduceMotion = useReducedMotion();

  const equippedItems = (Object.entries(slots) as [SlotId, CatalogItem | null][]).filter(
    ([_, item]) => item !== null
  ) as [SlotId, CatalogItem][];

  const base = getBaseMonthlyTotal();
  const discounted = getDiscountedMonthlyTotal();
  const discount = DURATION_DISCOUNTS[rentalDuration];
  const totalForTerm = Math.round(discounted * rentalDuration * 10) / 10;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRentModalOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-extrabold text-slate-900">Confirm Your Rental</h2>
                </div>
                <p className="text-sm text-slate-500">Review your setup and choose your subscription term.</p>
              </div>
              <button
                type="button"
                onClick={() => setRentModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors mt-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Duration Selector */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Choose Your Subscription Term
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {DURATIONS.map(({ value, label, sublabel }) => {
                    const isActive = rentalDuration === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRentalDuration(value)}
                        className={`flex flex-col items-center p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                          isActive
                            ? "border-emerald-500 bg-emerald-50 shadow-md"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <span className={`text-xs font-extrabold ${isActive ? "text-emerald-800" : "text-slate-800"}`}>
                          {label.split(" ")[0]}
                        </span>
                        <span className={`text-[10px] font-semibold mt-0.5 ${isActive ? "text-emerald-600" : "text-slate-400"}`}>
                          {sublabel}
                        </span>
                        {isActive && (
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-1.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Itemized Breakdown */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Itemized Breakdown ({equippedItems.length} items)
                </h3>
                <div className="space-y-2">
                  {equippedItems.map(([slotId, item]) => (
                    <div
                      key={slotId}
                      className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-800">{item.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.brand} · {slotId.replace(/-/g, " ").toUpperCase()}</p>
                      </div>
                      <span className="text-sm font-extrabold text-slate-900">€{item.monthlyPrice}<span className="text-[10px] font-medium text-slate-400">/mo</span></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Perks */}
              <div className="grid grid-cols-3 gap-3">
                {PERKS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center text-center p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <Icon className="w-4 h-4 text-emerald-600 mb-1.5" />
                    <p className="text-[10px] font-semibold text-emerald-900 leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Footer: Price + Confirm CTA */}
            <div className="p-6 pt-4 border-t border-slate-100 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Monthly subscription · {rentalDuration} month{rentalDuration > 1 ? "s" : ""} term
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    {discount > 0 && (
                      <span className="text-sm text-slate-400 line-through">€{base}/mo</span>
                    )}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={discounted}
                        initial={shouldReduceMotion ? {} : { y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={shouldReduceMotion ? {} : { y: 8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-3xl font-extrabold text-slate-900"
                      >
                        €{discounted}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-slate-500 font-semibold">/mo</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Total commitment: <span className="font-bold text-slate-700">€{totalForTerm}</span></p>
                </div>

                <button
                  type="button"
                  onClick={placeOrder}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-base shadow-xl shadow-emerald-900/30 transition-all cursor-pointer"
                >
                  <Check className="w-5 h-5" />
                  <span>Confirm Rental</span>
                </button>
              </div>

              {discount > 0 && (
                <p className="text-center text-xs text-emerald-700 bg-emerald-50 rounded-xl py-2 font-semibold">
                  🎉 You&apos;re saving <strong>€{(base * rentalDuration - totalForTerm).toFixed(0)}</strong> over your {rentalDuration}-month term vs pay-monthly!
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
