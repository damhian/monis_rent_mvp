"use client";

import React, { useState } from "react";
import { Check, Plus, Trash2, Monitor, ChevronDown } from "lucide-react";
import { CatalogItem, SlotId } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { cn } from "@/lib/utils";
import { ItemGraphic } from "../canvas/visuals/ItemGraphic";

interface CatalogCardProps {
  item: CatalogItem;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const slots = useWorkspaceStore((s) => s.slots);
  const activeSlotModal = useWorkspaceStore((s) => s.activeSlotModal);
  const placeItem = useWorkspaceStore((s) => s.placeItem);
  const removeItem = useWorkspaceStore((s) => s.removeItem);

  const isMonitorCategory = item.category === "monitors";
  const compatibleSlots = item.slotCompatibility;

  // Which slots currently have THIS specific item equipped?
  const equippedInSlots = compatibleSlots.filter(
    (slotId) => slots[slotId]?.id === item.id
  );
  const isEquippedAnywhere = equippedInSlots.length > 0;

  // When opened via hotspot for a specific slot (e.g. "monitor-left")
  const isEquippedInActiveSlot = activeSlotModal
    ? slots[activeSlotModal]?.id === item.id
    : false;

  // Default primary slot for single-slot items
  const defaultSlot = compatibleSlots[0];
  const isDefaultSlotEquipped = slots[defaultSlot]?.id === item.id;

  // Equip all compatible slots (e.g. 3x of this monitor)
  const handleEquipAll = () => {
    compatibleSlots.forEach((slotId) => {
      placeItem(slotId, item);
    });
  };

  // Unequip all slots holding this item
  const handleUnequipAll = () => {
    equippedInSlots.forEach((slotId) => {
      removeItem(slotId);
    });
  };

  const getSlotLabel = (slotId: SlotId) => {
    if (slotId === "monitor-left") return "Left";
    if (slotId === "monitor-center") return "Center";
    if (slotId === "monitor-right") return "Right";
    return slotId.replace(/-/g, " ");
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-4 rounded-2xl border transition-all duration-200 select-none bg-white",
        isEquippedAnywhere
          ? "border-emerald-400 bg-emerald-50/20 shadow-md ring-1 ring-emerald-400"
          : "border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5"
      )}
    >
      <div>
        {/* Visual Product Showcase Illustration */}
        <div className="w-full h-24 sm:h-28 rounded-xl bg-linear-to-b from-slate-50 to-slate-100/70 border border-slate-100 flex items-center justify-center p-2 mb-2.5 overflow-hidden relative group-hover:bg-slate-100 transition-colors shadow-2xs">
          <ItemGraphic itemId={item.id} item={item} compact />
        </div>

        {/* Header: Brand, Badge & Setup Count */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            {item.brand}
          </span>
          <div className="flex items-center gap-1.5">
            {isMonitorCategory && equippedInSlots.length > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                {equippedInSlots.length === 3
                  ? "3x Triple Setup"
                  : `${equippedInSlots.length}x Equipped`}
              </span>
            )}
            {item.badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                {item.badge}
              </span>
            )}
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
          {item.name}
        </h3>

        {/* Short Description + expand toggle */}
        <div className="mt-1">
          <p
            className={`text-xs text-slate-600 leading-relaxed transition-all duration-300 ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            {item.description}
          </p>

          {/* Expandable Details: full specs + remaining description */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-64 opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}
          >
            {item.specs && item.specs.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {item.specs.map((spec, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Toggle button — stops propagation so it never triggers equip */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsExpanded((v) => !v); }}
            className="mt-1.5 flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer select-none"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
            <span>{isExpanded ? "Less" : "Details"}</span>
          </button>
        </div>

        {/* Specs Pills (collapsed preview — first 2 only) */}
        {!isExpanded && item.specs && item.specs.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.specs.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
              >
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Pricing & Action Controls */}
      {activeSlotModal ? (
        // Specific Slot Target Mode (opened via slot hotspot on canvas)
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-slate-900">€{item.monthlyPrice}</span>
              <span className="text-[11px] font-semibold text-slate-400">/mo</span>
            </div>
            <span className="text-[10px] text-slate-400">
              Retail €{item.retailPrice}
            </span>
          </div>

          {isEquippedInActiveSlot ? (
            <button
              type="button"
              onClick={() => removeItem(activeSlotModal)}
              className="group/btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer bg-emerald-600 hover:bg-rose-600 text-white"
              title="Click to unequip from this slot"
            >
              <span className="flex items-center gap-1.5 group-hover/btn:hidden">
                <Check className="w-3.5 h-3.5" />
                <span>Equipped in {getSlotLabel(activeSlotModal)}</span>
              </span>
              <span className="hidden items-center gap-1.5 group-hover/btn:flex">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Unequip</span>
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => placeItem(activeSlotModal, item)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer bg-slate-900 text-white hover:bg-emerald-600 hover:shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Equip to {getSlotLabel(activeSlotModal)}</span>
            </button>
          )}
        </div>
      ) : isMonitorCategory ? (
        // General Catalog Mode for Monitors: Flexible Position Selector + Triple Setup
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-extrabold text-slate-900">€{item.monthlyPrice}</span>
                <span className="text-[11px] font-semibold text-slate-400">/mo</span>
              </div>
              <span className="text-[10px] text-slate-400">
                Retail €{item.retailPrice}
              </span>
            </div>

            {/* Quick 1-click Triple Rig or Clear All for 3-slot monitors */}
            {compatibleSlots.length >= 3 && (
              <div>
                {equippedInSlots.length === compatibleSlots.length ? (
                  <button
                    type="button"
                    onClick={handleUnequipAll}
                    className="text-[11px] font-bold px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Remove from all monitor positions"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleEquipAll}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Equip this monitor across Left, Center, and Right"
                  >
                    <Monitor className="w-3 h-3" />
                    <span>Triple (3x)</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Individual Slot Toggles: Left | Center | Right */}
          <div className="bg-slate-50 p-1 rounded-xl border border-slate-100 flex items-center gap-1">
            <span className="text-[10px] font-semibold text-slate-400 px-1 uppercase tracking-wider">
              Slot:
            </span>
            {compatibleSlots.map((slotId) => {
              const isEquippedHere = slots[slotId]?.id === item.id;
              const label = getSlotLabel(slotId);

              return (
                <button
                  key={slotId}
                  type="button"
                  onClick={() => {
                    if (isEquippedHere) {
                      removeItem(slotId);
                    } else {
                      placeItem(slotId, item);
                    }
                  }}
                  className={cn(
                    "group/slot flex-1 py-1 px-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer",
                    isEquippedHere
                      ? "bg-emerald-600 hover:bg-rose-600 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200/60 shadow-2xs"
                  )}
                  title={isEquippedHere ? `Click to unequip from ${label}` : `Click to equip in ${label}`}
                >
                  {isEquippedHere ? (
                    <>
                      <Check className="w-3 h-3 group-hover/slot:hidden" />
                      <Trash2 className="w-3 h-3 hidden group-hover/slot:inline" />
                      <span className="group-hover/slot:hidden">{label}</span>
                      <span className="hidden group-hover/slot:inline">Remove</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 text-slate-400 group-hover/slot:text-emerald-600" />
                      <span>{label}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        // General Catalog Mode for Single-Slot Items (Chairs, Desks, Accessories, etc.)
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-slate-900">€{item.monthlyPrice}</span>
              <span className="text-[11px] font-semibold text-slate-400">/mo</span>
            </div>
            <span className="text-[10px] text-slate-400">
              Retail €{item.retailPrice}
            </span>
          </div>

          {isDefaultSlotEquipped ? (
            <button
              type="button"
              onClick={() => removeItem(defaultSlot)}
              className="group/btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer bg-emerald-600 hover:bg-rose-600 text-white"
              title="Click to unequip"
            >
              <span className="flex items-center gap-1.5 group-hover/btn:hidden">
                <Check className="w-3.5 h-3.5" />
                <span>Equipped</span>
              </span>
              <span className="hidden items-center gap-1.5 group-hover/btn:flex">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Unequip</span>
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => placeItem(defaultSlot, item)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer bg-slate-900 text-white hover:bg-emerald-600 hover:shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Equip</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
