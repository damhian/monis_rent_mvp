# Implementation Checklist & Execution Roadmap

**Author**: The Mentor & Technical Writer  
**Status**: Ready for Execution  
**Execution Command**: `@execute [Task Name]`  
**Reference Docs**: 
- [architecture.md](file:///d:/Projects/Personal_Project/monis_rent_mvp/docs/architecture.md)
- [ui-ux-guidelines.md](file:///d:/Projects/Personal_Project/monis_rent_mvp/docs/ui-ux-guidelines.md)
- [animation_reference.md](file:///d:/Projects/Personal_Project/monis_rent_mvp/.knowledge/animation_reference.md)
- [monis-workspace-sketch.png](file:///d:/Projects/Personal_Project/monis_rent_mvp/monis-workspace-sketch.png)

---

## 📋 Task Checklist

- [x] **Task 1: Project Initialization & Dependency Scaffolding**
  - Scaffold Next.js 14/15/16 App Router project with TypeScript and Tailwind CSS using Bun.
  - Install dependencies: `zustand`, `framer-motion`, `lucide-react`, `canvas-confetti`, `@types/canvas-confetti`, `clsx`, `tailwind-merge`.
  - Configure Tailwind design tokens, fonts, and clean up template boilerplates.
  - *Verification*: `bun run dev` runs on `http://localhost:3000` with clean compilation.

- [x] **Task 2: Type Definitions, Catalog Dataset & Zustand Store**
  - Create `src/types/workspace.ts` with all item, slot, and zone types.
  - Create `src/data/catalog.ts` with curated inventory (Chairs, Desks, Monitors, Tech, Plants, Coffee, Outdoor, Relax, Garage) with realistic pricing and icons/images.
  - Create `src/store/useWorkspaceStore.ts` with placement, removal, category filtering, zone switching, and pricing recalculation.
  - *Verification*: Unit verify store state transitions and reactive calculations.

- [x] **Task 3: Interactive Workspace Canvas & Desk Core**
  - Build `src/components/canvas/WorkspaceCanvas.tsx` and `DeskCore.tsx` matching the sketch.
  - Implement desk surface with realistic depth and customizable finishes (Oak, Walnut, Dark).
  - Implement slot anchors for Center Monitor, Left/Right Monitors, Chair, Keyboard, Mouse, Desk Lamp, and Desk Plant.
  - Implement active hotspot indicators (`+ Add Monitor!`, `+ Place a Plant!`) with breathing pulse animation.
  - *Verification*: Canvas renders desk with hotspot buttons triggering modal/drawer selectors.

- [x] **Task 4: Equipment Catalog Drawer & Item Placement**
  - Build `src/components/catalog/CatalogDrawer.tsx` and `CategoryTabs.tsx`.
  - Display equipment cards with image, specifications, monthly rental rate, and "Select" action.
  - Integrate spring physics placement animation (`springDropTransition`) per `.knowledge/animation_reference.md`.
  - Allow instant item swapping and removal directly from the canvas.
  - *Verification*: Clicking a hotspot or catalog item drops item onto desk with spring bounce.

- [x] **Task 5: Expansion Zones Pods (Coffee, Outdoor, Relax, Garage)**
  - Implement `src/components/zones/ZoneContainer.tsx` with tabs/cards for all 4 secondary zones from the sketch:
    - **Coffee Station** (Espresso Machine, Grinder, Mug set)
    - **Outdoor Gear** (Surfboard, Urban E-Bike / Motorcycle, Commuter Backpack)
    - **Relax Zone** (Ergonomic Beanbag, Lounge Floor Lamp, Acoustic Panel)
    - **Garage Space** (Tool Organizer, Modular Storage Shelf)
  - Allow adding expansion gear directly into the monthly rental bundle.
  - *Verification*: Expanding a zone renders items and dynamically updates total monthly bundle price.

- [x] **Task 6: Sticky Price Ticker, Rent Modal & Duration Selector**
  - Build `src/components/checkout/RentSummaryBar.tsx` sticking to the bottom with live ticker animation.
  - Build `src/components/checkout/RentModal.tsx` displaying:
    - Itemized breakdown of all rented items
    - Rental term selector (1, 3, 6, 12, 24 months) with dynamic tier discounts (e.g., 10% off for 6m, 20% off for 12m)
    - Shipping/delivery perks (Free Delivery & Setup)
  - *Verification*: Changing duration recalculates discounted monthly price instantly.

- [x] **Task 7: Celebration Animation, Presets & Polish**
  - Integrate `canvas-confetti` when "Confirm Rental" is submitted with celebratory modal.
  - Add quick preset buttons ("Minimalist Setup", "Triple Monitor Dev Rig", "Executive Studio") for 1-click workspace loading.
  - Enforce `prefers-reduced-motion` check across all Framer Motion components per `.knowledge/animation_reference.md`.
  - *Verification*: Presets load instantly, checkout triggers celebration, reduced motion disables bounce.

- [x] **Task 8: Production Build & Full Walkthrough Verification**
  - Run type checks and production build (`bun run build`).
  - Verify zero console errors, full responsiveness across desktop, tablet, and mobile.
  - Document testing steps and run local dev server.
  - *Verification*: Production build succeeds with 0 errors.

---

## 🐛 Bug Tracker

| Bug ID | Description | Root Cause | Fix / Resolution | Status |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-001** | Catalog Drawer blinked/snapped open instead of sliding smoothly | `if (!isMounted) return null` forced unmount; browser painted after `translate-x-0` was already applied, skipping CSS transition | Rendered drawer persistently in DOM with off-screen positioning (`translate-x-full` + `invisible delay-300`); CSS transition runs on GPU compositor thread | **Resolved** |
| **BUG-002** | Clicking "Equip" immediately closed the catalog drawer | `CatalogCard.tsx` and `useWorkspaceStore.placeItem` called `setCatalogOpen(false)` / reset modal state | Removed premature close calls; updated `placeItem` to keep `isCatalogOpen: true` so users can equip multiple items seamlessly | **Resolved** |
| **BUG-003** | Inability to unequip items from inside the catalog drawer | `CatalogCard.tsx` lacked an unequip handler; clicking "Equipped" just re-placed the item | Added dynamic 1-click unequip: hovering "Equipped" transitions to red "Unequip" calling `removeItem()`, with immediate canvas reflection | **Resolved** |
| **BUG-004** | Users could not pick the same monitor brand for multiple slots (e.g. 3x Apple Studio) | Global `isEquipped` boolean and hardcoded `slotCompatibility[0]` restricted selection | Added `[Left] [Center] [Right]` position toggles, slot-aware equip states, and 1-click "Triple (3x)" setup on all monitor cards | **Resolved** |

---

## 🛠️ Testing Protocol

After completing any task, verify locally:
```bash
bun run dev
# Or to validate production bundle:
bun run build
```
