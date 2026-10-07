import { WorkspaceCanvas } from "@/components/canvas/WorkspaceCanvas";
import { ZoneContainer } from "@/components/zones/ZoneContainer";
import { CatalogDrawer } from "@/components/catalog/CatalogDrawer";
import { RentSummaryBar } from "@/components/checkout/RentSummaryBar";
import { RentModal } from "@/components/checkout/RentModal";
import { SuccessConfetti } from "@/components/checkout/SuccessConfetti";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. Interactive 2.5D Workspace Canvas */}
      <WorkspaceCanvas />

      {/* 2. Expansion Zones (Coffee, Outdoor, Relax, Garage) */}
      <ZoneContainer />

      {/* 3. Sticky Rent Summary Bar */}
      <RentSummaryBar />

      {/* 4. Rent Confirmation Modal */}
      <RentModal />

      {/* 5. Order Success + Confetti */}
      <SuccessConfetti />

      {/* 6. Equipment Catalog Slide-over Drawer */}
      <CatalogDrawer />
    </main>
  );
}
