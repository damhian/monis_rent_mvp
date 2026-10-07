import { create } from "zustand";
import {
  Category,
  CatalogItem,
  RentalDuration,
  SlotId,
  ZoneId,
} from "@/types/workspace";
import { CATALOG_ITEMS, WORKSPACE_PRESETS } from "@/data/catalog";

// Duration discount mapping
export const DURATION_DISCOUNTS: Record<RentalDuration, number> = {
  1: 0,   // 0% discount
  3: 5,   // 5% discount
  6: 10,  // 10% discount
  12: 15, // 15% discount
  24: 20, // 20% discount
};

interface WorkspaceStore {
  // State
  slots: Record<SlotId, CatalogItem | null>;
  selectedZone: ZoneId;
  activeSlotModal: SlotId | null;
  activeCategory: Category;
  rentalDuration: RentalDuration;
  isRentModalOpen: boolean;
  isOrderPlaced: boolean;
  isCatalogOpen: boolean;

  // Actions
  placeItem: (slotId: SlotId, item: CatalogItem) => void;
  removeItem: (slotId: SlotId) => void;
  clearWorkspace: () => void;
  applyPreset: (presetId: string) => void;
  setActiveSlotModal: (slotId: SlotId | null) => void;
  setActiveCategory: (category: Category) => void;
  setSelectedZone: (zone: ZoneId) => void;
  setRentalDuration: (duration: RentalDuration) => void;
  setRentModalOpen: (open: boolean) => void;
  setCatalogOpen: (open: boolean) => void;
  placeOrder: () => void;
  resetOrder: () => void;

  // Selectors / Helpers
  getBaseMonthlyTotal: () => number;
  getDiscountedMonthlyTotal: () => number;
  getTotalRetailValue: () => number;
  getEquippedItemsCount: () => number;
  getItemForSlot: (slotId: SlotId) => CatalogItem | null;
}

const INITIAL_SLOTS: Record<SlotId, CatalogItem | null> = {
  "desk": CATALOG_ITEMS.find((i) => i.id === "desk-smartdesk-pro") || null,
  "chair": CATALOG_ITEMS.find((i) => i.id === "chair-aeron") || null,
  "monitor-center": CATALOG_ITEMS.find((i) => i.id === "monitor-apple-studio") || null,
  "monitor-left": null,
  "monitor-right": null,
  "keyboard": CATALOG_ITEMS.find((i) => i.id === "keyboard-keychron-q3") || null,
  "mouse": CATALOG_ITEMS.find((i) => i.id === "mouse-mx-master-3s") || null,
  "desk-lamp": CATALOG_ITEMS.find((i) => i.id === "lamp-screenbar-halo") || null,
  "desk-plant": CATALOG_ITEMS.find((i) => i.id === "plant-monstera") || null,
  "coffee-station": null,
  "outdoor-gear": null,
  "relax-zone": null,
  "garage-space": null,
};

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  slots: INITIAL_SLOTS,
  selectedZone: "desk",
  activeSlotModal: null,
  activeCategory: "chairs",
  rentalDuration: 12, // Default 12 month subscription
  isRentModalOpen: false,
  isOrderPlaced: false,
  isCatalogOpen: false,

  placeItem: (slotId: SlotId, item: CatalogItem) => {
    set((state) => ({
      slots: {
        ...state.slots,
        [slotId]: item,
      },
      // Keep catalog drawer open so user can continue configuring their setup
      activeSlotModal: null,
      isCatalogOpen: true,
    }));
  },

  removeItem: (slotId: SlotId) => {
    set((state) => ({
      slots: {
        ...state.slots,
        [slotId]: null,
      },
    }));
  },

  clearWorkspace: () => {
    const emptySlots = Object.keys(get().slots).reduce(
      (acc, key) => ({ ...acc, [key]: null }),
      {} as Record<SlotId, CatalogItem | null>
    );
    set({ slots: emptySlots });
  },

  applyPreset: (presetId: string) => {
    const preset = WORKSPACE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const newSlots: Record<SlotId, CatalogItem | null> = {
      "desk": null,
      "chair": null,
      "monitor-center": null,
      "monitor-left": null,
      "monitor-right": null,
      "keyboard": null,
      "mouse": null,
      "desk-lamp": null,
      "desk-plant": null,
      "coffee-station": null,
      "outdoor-gear": null,
      "relax-zone": null,
      "garage-space": null,
    };

    Object.entries(preset.items).forEach(([slotKey, itemId]) => {
      const item = CATALOG_ITEMS.find((i) => i.id === itemId);
      if (item && slotKey in newSlots) {
        newSlots[slotKey as SlotId] = item;
      }
    });

    set({ slots: newSlots });
  },

  setActiveSlotModal: (slotId: SlotId | null) => {
    set({
      activeSlotModal: slotId,
      isCatalogOpen: slotId !== null,
    });
  },

  setActiveCategory: (category: Category) => {
    set({ activeCategory: category });
  },

  setSelectedZone: (zone: ZoneId) => {
    set({ selectedZone: zone });
  },

  setRentalDuration: (duration: RentalDuration) => {
    set({ rentalDuration: duration });
  },

  setRentModalOpen: (open: boolean) => {
    set({ isRentModalOpen: open });
  },

  setCatalogOpen: (open: boolean) => {
    set({ isCatalogOpen: open });
  },

  placeOrder: () => {
    set({ isOrderPlaced: true });
  },

  resetOrder: () => {
    set({
      isOrderPlaced: false,
      isRentModalOpen: false,
    });
  },

  // Computed Values
  getBaseMonthlyTotal: () => {
    const { slots } = get();
    return Object.values(slots).reduce((sum, item) => {
      return item ? sum + item.monthlyPrice : sum;
    }, 0);
  },

  getDiscountedMonthlyTotal: () => {
    const base = get().getBaseMonthlyTotal();
    const discount = DURATION_DISCOUNTS[get().rentalDuration] || 0;
    const discounted = base * (1 - discount / 100);
    return Math.round(discounted * 10) / 10;
  },

  getTotalRetailValue: () => {
    const { slots } = get();
    return Object.values(slots).reduce((sum, item) => {
      return item ? sum + item.retailPrice : sum;
    }, 0);
  },

  getEquippedItemsCount: () => {
    const { slots } = get();
    return Object.values(slots).filter(Boolean).length;
  },

  getItemForSlot: (slotId: SlotId) => {
    return get().slots[slotId] || null;
  },
}));
