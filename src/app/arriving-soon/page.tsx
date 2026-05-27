"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useVehicles } from "@/hooks/useVehicles";
import { urlFor } from "@/lib/sanity";
import { AlertCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { VehicleCard } from "@/components/home/VehicleCard";
import { GalleryModal } from "@/components/home/GalleryModal";
import { useGallery } from "@/hooks/useGallery";

const ARRIVAL_STATUSES = ["arriving", "in-transit", "clearing"];

export default function ArrivingSoonPage() {
  const { vehicles, isLoading, error } = useVehicles();
  const arrivals = vehicles.filter((v) => ARRIVAL_STATUSES.includes(v.status));
  const gallery = useGallery();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pt-16 pb-12 border-b border-[#eee]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-8">
            <p className="text-red text-sm font-semibold tracking-[0.1em] uppercase mb-3">
              Inbound to Ghana
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-ink text-4xl md:text-5xl font-black leading-tight">
                  Arriving soon
                </h1>
                <p className="text-muted text-base mt-3 max-w-[560px]">
                  Vehicles currently in transit or expected in Ghana. Register interest before they land in Kumasi.
                </p>
              </div>
              <LinkButton
                href="/#sourcing"
                size="lg"
                className="shrink-0"
              >
                Ask about a vehicle
              </LinkButton>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto px-6 md:px-8">
            {isLoading && (
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
            )}

            {error && (
              <div className="text-center py-12">
                <AlertCircle className="w-8 h-8 text-red mx-auto mb-3" />
                <p className="text-muted">Failed to load arrivals. Please try again.</p>
              </div>
            )}

            {!isLoading && !error && arrivals.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted">No arrivals listed yet. Check back soon.</p>
              </div>
            )}

            {!isLoading && !error && arrivals.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12">
                {arrivals.map((vehicle) => (
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
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
      <GalleryModal gallery={gallery} />
    </>
  );
}
