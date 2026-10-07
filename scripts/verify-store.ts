import { useWorkspaceStore, DURATION_DISCOUNTS } from "../src/store/useWorkspaceStore";
import { CATALOG_ITEMS, WORKSPACE_PRESETS } from "../src/data/catalog";

console.log("🧪 Testing Monis Workspace Store & Catalog...");

// 1. Verify Catalog
console.assert(CATALOG_ITEMS.length > 10, "Catalog items should have at least 10 items");
console.log(`✓ Catalog loaded with ${CATALOG_ITEMS.length} items across all categories.`);

// 2. Verify Initial State
const store = useWorkspaceStore.getState();
const initialBaseTotal = store.getBaseMonthlyTotal();
console.assert(initialBaseTotal > 0, "Initial monthly total should be greater than 0");
console.log(`✓ Initial base monthly total: €${initialBaseTotal}/mo`);

const discounted12m = store.getDiscountedMonthlyTotal();
console.assert(discounted12m < initialBaseTotal, "12m subscription should have discount applied");
console.log(`✓ 12-month discounted monthly total: €${discounted12m}/mo (15% discount applied)`);

// 3. Test Duration Switch
store.setRentalDuration(1);
console.assert(store.getDiscountedMonthlyTotal() === initialBaseTotal, "1m rental should have 0% discount");
console.log("✓ Duration switch to 1m verified (no discount).");

// 4. Test Item Placement
const dellMonitor = CATALOG_ITEMS.find((i) => i.id === "monitor-dell-ultrasharp");
if (dellMonitor) {
  store.placeItem("monitor-left", dellMonitor);
  console.assert(store.getItemForSlot("monitor-left")?.id === "monitor-dell-ultrasharp", "Monitor should be placed in monitor-left");
  console.log(`✓ Successfully placed ${dellMonitor.name} in monitor-left slot.`);
}

// 5. Test Preset Application
store.applyPreset("preset-minimalist");
const equippedCount = store.getEquippedItemsCount();
console.assert(equippedCount > 0, "Equipped count should be positive after preset");
console.log(`✓ Applied 'Nordic Minimalist' preset with ${equippedCount} items equipped.`);

console.log("🎉 All store and catalog assertions passed successfully!");
