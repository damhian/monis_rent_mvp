"use client";

import React from "react";
import { Coffee, Bike, Smile, Wrench, Layers } from "lucide-react";
import { ZonePod } from "./ZonePod";

export const ZoneContainer: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-28">
      {/* Section Divider & Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Workspace Expansion Modules</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Expansion Zones & Lifestyle Pods
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Extend your setup beyond the desk. Add premium coffee gear, outdoor mobility, acoustic lounge seating, or tool storage to your single monthly subscription.
          </p>
        </div>
      </div>

      {/* 4 Pods Grid matching monis-workspace-sketch.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Coffee Station */}
        <ZonePod
          slotId="coffee-station"
          title="Coffee Station"
          subtitle="Third-wave espresso & brewing"
          icon={Coffee}
          defaultAddLabel="+ Add Coffee Machine"
          accentColor="text-amber-700 bg-amber-50"
        />

        {/* 2. Outdoor Gear */}
        <ZonePod
          slotId="outdoor-gear"
          title="Outdoor Gear"
          subtitle="Surf, commute & active mobility"
          icon={Bike}
          defaultAddLabel="+ Add Surfboard / E-Bike"
          accentColor="text-sky-700 bg-sky-50"
        />

        {/* 3. Relax Zone */}
        <ZonePod
          slotId="relax-zone"
          title="Relax Zone"
          subtitle="Acoustic lounge & decompression"
          icon={Smile}
          defaultAddLabel="+ Add Lounge Beanbag"
          accentColor="text-indigo-700 bg-indigo-50"
        />

        {/* 4. Garage Space */}
        <ZonePod
          slotId="garage-space"
          title="Garage Space"
          subtitle="Modular organizers & tool racks"
          icon={Wrench}
          defaultAddLabel="+ Add Tool Shelf"
          accentColor="text-stone-700 bg-stone-100"
        />
      </div>
    </section>
  );
};
