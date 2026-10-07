# UI/UX & Motion Guidelines: Monis Rent Workspace Designer

**Author**: The Senior Frontend Engineer & The Technical Writer  
**Status**: Approved  
**Reference**: [animation_reference.md](file:///d:/Projects/Personal_Project/monis_rent_mvp/.knowledge/animation_reference.md) and [monis-workspace-sketch.png](file:///d:/Projects/Personal_Project/monis_rent_mvp/monis-workspace-sketch.png)  

---

## 1. Design Vision & Aesthetic

The Monis Rent Workspace Designer balances **modern European SaaS aesthetics** with **tactile, playful interactivity**. Renting office and lifestyle gear should feel as exciting and intuitive as playing a high-end design simulator.

### Core Visual Tenets:
1. **Airy & Clean**: Generous whitespace, subtle glassmorphism (`backdrop-blur-md`), and crisp rounded borders (`rounded-2xl`, `rounded-3xl`).
2. **Tactile & Responsive**: Every item feels like a real physical object on a desk surface.
3. **Clarity Over Clutter**: Tooltips, callout badges, and hotspot buttons guide the eye without overwhelming the canvas.

---

## 2. Color Palette & Design Tokens

Tailwind colors will reflect the Monis brand identity:

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| **Brand Primary** | `#0F172A` (Slate 900) | Primary typography, dark buttons, deep contrasts |
| **Brand Accent (Emerald)** | `#10B981` (Emerald 500) | "Rent Your Setup!" CTA, active selections, price badges |
| **Brand Accent Hover** | `#059669` (Emerald 600) | Hover state for checkout and positive actions |
| **Canvas Background** | `#F8FAFC` to `#F1F5F9` | Subtle radial gradient providing depth to the desk stage |
| **Desk Surface Tones** | `#F5EBE1` (Birch/Oak) / `#1E293B` (Walnut/Dark) | Realistic customizable desk surface shaders |
| **Muted Text** | `#64748B` (Slate 500) | Subtitles, category tags, monthly frequency labels |
| **Surface Card** | `#FFFFFF` with border `#E2E8F0` | Catalog cards, floating toolbar, drawers |

---

## 3. Motion & Animation Standards (Derived from `.knowledge`)

Per our **Global Animation Reference** ([animation_reference.md](file:///d:/Projects/Personal_Project/monis_rent_mvp/.knowledge/animation_reference.md)), we prioritize **organic, active motion** over stiff linear transitions.

### A. Spring Physics for Placed Items
When an item is dropped or chosen for a slot, it must drop in with a delightful spring physics bounce:
```typescript
export const springDropTransition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 0.8
};

export const itemPlacementVariants = {
  hidden: { scale: 0.7, opacity: 0, y: -20 },
  visible: { scale: 1, opacity: 1, y: 0, transition: springDropTransition },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.15 } }
};
```

### B. Hotspot "+ Add" Buttons
Hotspots (e.g. `+ Add Monitor!`, `+ Place a Plant!`) must invite interaction:
- **Subtle Breathing Pulse**: Slight scale pulse (`scale: [1, 1.05, 1]`) every 3 seconds when empty.
- **Hover Reaction**: Crisp elevation shadow and upward shift (`-translate-y-1`).

### C. Staggered Entry for Catalog Cards
When opening the equipment drawer, cards stagger into view:
```typescript
export const catalogContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};
```

### D. Accessibility & Reduced Motion
In strict accordance with `.knowledge/animation_reference.md`:
- All animations must respect `prefers-reduced-motion`.
- If active, transition springs are replaced by simple `opacity: 1` instant renders.
```typescript
import { useReducedMotion } from 'framer-motion';
// Guard: shouldReduceMotion ? { duration: 0 } : springDropTransition
```

---

## 4. Layout Architecture (Matching the Sketch)

Based on [monis-workspace-sketch.png](file:///d:/Projects/Personal_Project/monis_rent_mvp/monis-workspace-sketch.png):

```
+-------------------------------------------------------------------------------+
| Header: "Design Your Workspace!" - "Create Your Perfect Setup!"               |
| Subtitle + Preset Quick Switches (e.g., "Developer Pro", "Minimalist")        |
+-------------------------------------------------------------------------------+
| Catalog Bar (Top/Slide): [Chairs] [Desks] [Monitors] [Tech] [Accessories]    |
+-------------------------------------------------------------------------------+
|                                                                               |
|                             WORKSPACE CANVAS                                  |
|                                                                               |
|          [Left Monitor]      [Center Monitor]      [Right Monitor]            |
|                \                    |                    /                    |
|           [Desk Lamp]         [Desk Surface]         [Desk Plant]             |
|                                [Keyboard/Mouse]                               |
|                                                                               |
|                                 [Active Chair]                                |
|                                                                               |
+-------------------------------------------------------------------------------+
| Sticky Action Bar: Total Rent €124/mo  |  [ Rent Your Setup! (CTA) ]          |
+-------------------------------------------------------------------------------+
| Expansion Zones:                                                              |
| [ Coffee Station ]  |  [ Outdoor Gear ]  |  [ Relax Zone ]  |  [ Garage ]     |
| + Add Coffee Mach.  |  + Add Surfboard   |  + Add Beanbag   |  + Add Shelf    |
+-------------------------------------------------------------------------------+
```

---

## 5. UI Component Hierarchy & Rules

1. **`WorkspaceCanvas`**:
   - Centered stage, max-width `max-w-6xl`.
   - Perspective container giving the desk and accessories a natural 2.5D depth.
2. **`SlotHotspot`**:
   - Dotted border outline (`border-2 border-dashed border-slate-300`).
   - Clean pill badge with icon (`+ Add Monitor!`).
   - Clicking immediately focuses the appropriate catalog category.
3. **`CatalogDrawer`**:
   - Accessible drawer sliding up from the bottom or popping over the top.
   - Shows item preview, dimensions, brand, monthly price, and instant "Add to Setup" button.
4. **`RentSummaryBar`**:
   - Sticky bar at the bottom with a bold, animated price counter (ticker effect).
   - "Rent Your Setup!" button featuring high-contrast Emerald theme with hover sheen.
5. **`RentModal` & `SuccessConfetti`**:
   - Duration selector tabs (1m, 3m, 6m, 12m) with savings badges (e.g. "-15% for 12 months").
   - Summary breakdown of selected items.
   - On completion, triggers multi-colored celebration confetti via `canvas-confetti`.

---

## 6. Interaction Affordances & Micro-Interactions

### A. Reversible 1-Click Unequip
To minimize friction and prevent user anxiety around permanent actions:
- **Default State**: Equipped items show an emerald pill with `<Check /> Equipped`.
- **Hover Micro-Interaction**: On hover, the button smoothly shifts to rose-red (`bg-rose-600`) displaying `<Trash2 /> Unequip` or `<X /> Remove`.
- **Instant Canvas Reflection**: Clicking immediately detaches the object from the desk slot, transitions the button back to dark slate `+ Equip`, and decrements the sticky ticker.

### B. Multi-Monitor Setup Selector
For monitor cards, users have granular control over workspace geometry:
- **Position Badges**: Displays interactive slot pills: `Slot: [Left] [Center] [Right]`.
- **Visual Feedback**: Active positions highlight in emerald (`bg-emerald-600 text-white`). Hovering over an active position offers a quick removal action.
- **Batch Action**: Cards compatible with triple display rigs feature a **Triple (3x)** button, enabling users to populate an entire three-display battle station with identical monitors in a single tap.

### C. Keyboard & Focus Ergonomics
- **Escape Key (`Esc`)**: Closes any open modal or catalog drawer instantly.
- **Scroll Lock & Pass-Through**: When drawer is open, backdrop click dismisses cleanly without triggering underlying canvas elements.
- **Focus Rings**: High-contrast emerald focus outlines (`focus:ring-2 focus:ring-emerald-500`) on all search bars and interactive elements.

