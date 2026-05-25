"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface Vehicle {
  _id: string;
  title: string;
  status: "arriving" | "in-transit" | "clearing" | "available" | "reserved" | "sold";
  category: "sedan" | "suv" | "pickup";
  year?: number;
  make?: string;
  model?: string;
  trim?: string;
  mileage?: string;
  vin?: string;
  description?: string;
  images?: any[];
  featured?: boolean;
  price?: number;
  priceStatus?: string;
  sourceCountry?: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onImageClick?: () => void;
}

export function VehicleCard({ vehicle, onImageClick }: VehicleCardProps) {
  const isSold = vehicle.status === "sold";
  const imageUrl = vehicle.images?.[0] ? urlFor(vehicle.images[0]).width(800).height(600).url() : "/assets/vehicle-suv.png";
  const hasImages = (vehicle.images?.length ?? 0) > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div
        className={`relative aspect-[4/3] bg-[#f5f5f5] dark:bg-[#1a1a1a] mb-4 ${hasImages ? "cursor-pointer" : ""}`}
        onClick={hasImages ? onImageClick : undefined}
      >
        <Image
          src={imageUrl}
          alt={vehicle.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge status={vehicle.status} />
        </div>
        {isSold && (
          <div className="absolute inset-0 bg-white/70 dark:bg-black/70 flex items-center justify-center">
            <span className="text-ink dark:text-white text-sm font-bold tracking-[0.15em] uppercase">Sold</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-ink dark:text-white text-lg font-bold leading-tight">{vehicle.title}</h3>
          {vehicle.year && (
            <span className="text-muted text-sm shrink-0">{vehicle.year}</span>
          )}
        </div>
        
        <p className="text-muted text-sm leading-relaxed">
          {vehicle.description || `${vehicle.make || ""} ${vehicle.model || ""}`.trim() || vehicle.category}
        </p>

        <div className="flex gap-4 pt-2 text-sm">
          {vehicle.mileage && (
            <span className="text-muted"><span className="text-ink dark:text-white font-semibold">{vehicle.mileage}</span> mi</span>
          )}
          <span className="text-muted capitalize">{vehicle.category}</span>
          {vehicle.sourceCountry && (
            <span className="text-muted">{vehicle.sourceCountry}</span>
          )}
          {vehicle.price && (
            <span className="text-muted font-semibold">${vehicle.price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
