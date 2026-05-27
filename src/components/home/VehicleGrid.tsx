"use client";

import { useFilteredVehicles } from "@/hooks/useFilteredVehicles";
import { VehicleCard } from "./VehicleCard";
import { GalleryModal } from "./GalleryModal";
import { useGallery } from "@/hooks/useGallery";
import { urlFor } from "@/lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoryOptions = [
  { value: "all", label: "All categories" },
  { value: "sedan", label: "Sedans" },
  { value: "suv", label: "SUVs" },
  { value: "pickup", label: "Pickups" },
] as const;

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "arriving", label: "Arriving" },
  { value: "in-transit", label: "In transit" },
  { value: "clearing", label: "Clearing" },
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
] as const;

export function VehicleGrid() {
  const { filteredVehicles, category, status, setCategory, setStatus, isLoading, error } =
    useFilteredVehicles();
  const gallery = useGallery();

  if (isLoading) {
    return (
      <section id="inventory" className="py-20 md:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="aspect-[4/3] bg-[#f5f5f5] mb-4 animate-shimmer" />
                <div className="space-y-2">
                  <div className="h-5 w-2/3 bg-[#f0f0f0] rounded" />
                  <div className="h-4 w-full bg-[#f0f0f0] rounded" />
                  <div className="h-4 w-1/2 bg-[#f0f0f0] rounded" />
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
      <section id="inventory" className="py-20 md:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 text-center">
          <AlertCircle className="w-8 h-8 text-red mx-auto mb-3" />
          <p className="text-muted">Failed to load vehicles. Please try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="inventory" className="py-20 md:py-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="mb-12">
          <p className="text-red text-sm font-semibold tracking-[0.1em] uppercase mb-3">
            Inventory
          </p>
          <h2 className="text-ink text-3xl md:text-4xl font-black leading-tight mb-4">
            Available & sold vehicles
          </h2>
          <p className="text-muted text-base max-w-[500px]">
            Browse current stock or see recently sold vehicles.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 border-b border-[#eee] pb-4 sm:max-w-[460px] sm:gap-4">
          <label className="space-y-1.5">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">
              Category
            </span>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as typeof category)}
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-[#e0e0e0] bg-white px-2.5 text-ink sm:px-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label className="space-y-1.5">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">
              Status
            </span>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as typeof status)}
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-[#e0e0e0] bg-white px-2.5 text-ink sm:px-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
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
              className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12"
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
