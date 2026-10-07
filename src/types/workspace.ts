export type Category =
  | 'chairs'
  | 'desks'
  | 'monitors'
  | 'accessories'
  | 'plants'
  | 'coffee'
  | 'outdoor'
  | 'relax'
  | 'garage';

export type SlotId =
  | 'desk'
  | 'chair'
  | 'monitor-center'
  | 'monitor-left'
  | 'monitor-right'
  | 'keyboard'
  | 'mouse'
  | 'desk-lamp'
  | 'desk-plant'
  | 'coffee-station'
  | 'outdoor-gear'
  | 'relax-zone'
  | 'garage-space';

export type ZoneId = 'desk' | 'coffee' | 'outdoor' | 'relax' | 'garage';

export interface ColorOption {
  name: string;
  hex: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  brand: string;
  category: Category;
  slotCompatibility: SlotId[];
  monthlyPrice: number; // in EUR (€)
  retailPrice: number;  // in EUR (€) for value comparison
  dimensions?: string;
  badge?: string;       // e.g. "Staff Pick", "Ergonomic", "Popular", "Eco-Friendly"
  description: string;
  specs?: string[];
  imageUrl?: string;
  icon?: string;
  colorOptions?: ColorOption[];
  defaultColor?: string;
}

export type RentalDuration = 1 | 3 | 6 | 12 | 24; // Months

export interface WorkspacePreset {
  id: string;
  name: string;
  tagline: string;
  description: string;
  items: Partial<Record<SlotId, string>>; // SlotId -> CatalogItem.id
}
