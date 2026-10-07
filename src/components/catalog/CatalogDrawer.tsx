"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Search, Sparkles } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { CATALOG_ITEMS } from "@/data/catalog";
import { Category, SlotId } from "@/types/workspace";
import { CategoryTabs } from "./CategoryTabs";
import { CatalogCard } from "./CatalogCard";

// Slot to category mapping for smart opening
const SLOT_CATEGORY_MAP: Partial<Record<SlotId, Category>> = {
  "desk": "desks",
  "chair": "chairs",
  "monitor-center": "monitors",
  "monitor-left": "monitors",
  "monitor-right": "monitors",
  "keyboard": "accessories",
  "mouse": "accessories",
  "desk-lamp": "accessories",
  "desk-plant": "plants",
  "coffee-station": "coffee",
  "outdoor-gear": "outdoor",
  "relax-zone": "relax",
  "garage-space": "garage",
};

// Card stagger variants — Framer Motion for cards entrance
const CARD_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 240, damping: 22 },
  },
};

export const CatalogDrawer: React.FC = () => {
  const isCatalogOpen = useWorkspaceStore((s) => s.isCatalogOpen);
  const activeSlotModal = useWorkspaceStore((s) => s.activeSlotModal);
  const activeCategory = useWorkspaceStore((s) => s.activeCategory);
  const setCatalogOpen = useWorkspaceStore((s) => s.setCatalogOpen);
  const setActiveSlotModal = useWorkspaceStore((s) => s.setActiveSlotModal);
  const setActiveCategory = useWorkspaceStore((s) => s.setActiveCategory);

  const [searchQuery, setSearchQuery] = useState("");

  const isOpen = isCatalogOpen || activeSlotModal !== null;

  // Auto-switch category when opened from a specific slot hotspot
  useEffect(() => {
    if (activeSlotModal && SLOT_CATEGORY_MAP[activeSlotModal]) {
      setActiveCategory(SLOT_CATEGORY_MAP[activeSlotModal]!);
    }
  }, [activeSlotModal, setActiveCategory]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setCatalogOpen(false);
    setActiveSlotModal(null);
  };

  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const matchesCategory = activeSlotModal
        ? item.slotCompatibility.includes(activeSlotModal)
        : item.category === activeCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, activeSlotModal, searchQuery]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex justify-end transition-[visibility] duration-300 ${
        isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none delay-300"
      }`}
    >
      {/* 
        BACKDROP — Pure CSS opacity transition on GPU.
      */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/*
        DRAWER PANEL — Permanent DOM presence, hardware-accelerated transform slide.
        Because this layer stays in the DOM at translate-x-full, opening triggers a 100%
        predictable GPU slide-in with zero blink or mount delay.
      */}
      <div
        style={{ willChange: "transform" }}
        className={`relative w-full max-w-xl bg-white shadow-2xl h-full flex flex-col z-10 border-l border-slate-200 transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <h2 className="text-lg font-bold text-slate-900">
                  {activeSlotModal
                    ? `Select for ${activeSlotModal.replace("-", " ").toUpperCase()}`
                    : "Workspace Equipment Catalog"}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Select equipment to equip your setup instantly.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Close catalog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand, name, or spec..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {!activeSlotModal && <CategoryTabs className="mt-1" />}
        </div>

        {/* Catalog Grid — Stagger animations run when open */}
        <div className="flex-1 overflow-y-auto p-5">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <p className="text-sm font-medium">No items found matching your criteria.</p>
              <p className="text-xs mt-1 text-slate-400">Try changing category or clearing your search.</p>
            </div>
          ) : (
            <motion.div
              key={`${activeCategory}-${isOpen}`}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              variants={CARD_VARIANTS}
            >
              {filteredItems.map((item) => (
                <motion.div key={item.id} variants={ITEM_VARIANTS}>
                  <CatalogCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{filteredItems.length} products available</span>
          <span className="font-medium text-emerald-600">Free delivery &amp; setup included</span>
        </div>
      </div>
    </div>
  );
};
