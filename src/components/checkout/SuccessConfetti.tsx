"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Package, RotateCcw, Star } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export const SuccessConfetti: React.FC = () => {
  const isOrderPlaced = useWorkspaceStore((s) => s.isOrderPlaced);
  const resetOrder = useWorkspaceStore((s) => s.resetOrder);
  const rentalDuration = useWorkspaceStore((s) => s.rentalDuration);
  const getDiscountedMonthlyTotal = useWorkspaceStore((s) => s.getDiscountedMonthlyTotal);
  const getEquippedItemsCount = useWorkspaceStore((s) => s.getEquippedItemsCount);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOrderPlaced || shouldReduceMotion) return;

    // Initial burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.5, y: 0.55 },
      colors: ["#10b981", "#34d399", "#6ee7b7", "#0f172a", "#f8fafc", "#fbbf24"],
    });

    // Left cannon
    const leftTimer = setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ["#10b981", "#fbbf24", "#60a5fa"],
      });
    }, 300);

    // Right cannon
    const rightTimer = setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ["#10b981", "#fbbf24", "#f472b6"],
      });
    }, 500);

    return () => {
      clearTimeout(leftTimer);
      clearTimeout(rightTimer);
    };
  }, [isOrderPlaced, shouldReduceMotion]);

  if (!isOrderPlaced) return null;

  const discounted = getDiscountedMonthlyTotal();
  const count = getEquippedItemsCount();

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        onClick={resetOrder}
      />

      {/* Success Card */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Emerald Top Banner */}
        <div className="bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-center">
          <motion.div
            initial={shouldReduceMotion ? {} : { scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4"
          >
            <Check className="w-10 h-10 text-white stroke-3" />
          </motion.div>

          <h2 className="text-2xl font-extrabold text-white">
            You&apos;re All Set! 🎉
          </h2>
          <p className="text-emerald-100 text-sm mt-1 font-medium">
            Your workspace rental is confirmed.
          </p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-5">
          {/* Order Summary Pills */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <Package className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-slate-500 font-medium">Items</p>
              <p className="text-lg font-extrabold text-slate-900">{count}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <Star className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <p className="text-xs text-slate-500 font-medium">Monthly</p>
              <p className="text-lg font-extrabold text-slate-900">€{discounted}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <Check className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-slate-500 font-medium">Term</p>
              <p className="text-lg font-extrabold text-slate-900">{rentalDuration}mo</p>
            </div>
          </div>

          {/* What happens next */}
          <div className="space-y-2.5">
            {[
              "Our team will contact you within 24h to schedule delivery.",
              "Professional assembly & setup included at no extra charge.",
              "You can swap or upgrade any item during your subscription.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-emerald-600 stroke-3" />
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Reset CTA */}
          <button
            type="button"
            onClick={resetOrder}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Design Another Workspace</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
