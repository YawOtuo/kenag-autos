"use client";

import { useFilteredVehicles } from "@/hooks/useFilteredVehicles";
import { VehicleCard } from "./VehicleCard";
import { GalleryModal } from "./GalleryModal";
import { useGallery } from "@/hooks/useGallery";
import { urlFor } from "@/lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function VehicleGrid() {
  const { filteredVehicles, category, status, setCategory, setStatus, isLoading, error } =
    useFilteredVehicles();
  const gallery = useGallery();

  if (isLoading) {
    return (
      <section id="inventory" className="py-20 md:py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <div className="aspect-[4/3] bg-[#f5f5f5] dark:bg-[#1a1a1a] mb-4 animate-shimmer" />
                <div className="space-y-2">
                  <div className="h-5 w-2/3 bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded" />
                  <div className="h-4 w-full bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded" />
                  <div className="h-4 w-1/2 bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="inventory" className="py-20 md:py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 text-center">
          <AlertCircle className="w-8 h-8 text-red mx-auto mb-3" />
          <p className="text-muted">Failed to load vehicles. Please try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="inventory" className="py-20 md:py-24 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="mb-12">
          <p className="text-red text-sm font-semibold tracking-[0.1em] uppercase mb-3">
            Inventory
          </p>
          <h2 className="text-ink dark:text-white text-3xl md:text-4xl font-black leading-tight mb-4">
            Available & sold vehicles
          </h2>
          <p className="text-muted text-base max-w-[500px]">
            Browse current stock or see recently sold vehicles.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-[#eee] dark:border-[#222]">
          <span className="text-muted text-sm mr-3">Filter:</span>
          {(["all", "sedan", "suv", "pickup"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
                category === cat
                  ? "text-ink dark:text-white bg-[#f5f5f5] dark:bg-[#1a1a1a]"
                  : "text-muted hover:text-ink dark:hover:text-white"
              }`}
              type="button"
            >
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1) + "s"}
            </button>
          ))}
          <span className="text-line dark:text-[#333] mx-2">|</span>
          {(["all", "arriving", "in-transit", "clearing", "available", "reserved", "sold"] as const).map((stat) => (
            <button
              key={stat}
              onClick={() => setStatus(stat)}
              className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
                status === stat
                  ? "text-ink dark:text-white bg-[#f5f5f5] dark:bg-[#1a1a1a]"
                  : "text-muted hover:text-ink dark:hover:text-white"
              }`}
              type="button"
            >
              {stat === "all" ? "All" : stat.charAt(0).toUpperCase() + stat.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          {filteredVehicles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted">No vehicles match this filter.</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
            >
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  onImageClick={() => {
                    const images = (vehicle.images || []).map((img) =>
                      urlFor(img).width(1020).height(600).url()
                    );
                    if (images.length > 0) {
                      gallery.open(images, vehicle.title);
                    }
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <GalleryModal gallery={gallery} />
    </section>
  );
}
