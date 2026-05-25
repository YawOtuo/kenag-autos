"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useVehicles } from "@/hooks/useVehicles";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { AlertCircle } from "lucide-react";

const ARRIVAL_STATUSES = ["arriving", "in-transit", "clearing"];

export default function ArrivingSoonPage() {
  const { vehicles, isLoading, error } = useVehicles();
  const arrivals = vehicles.filter((v) => ARRIVAL_STATUSES.includes(v.status));

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
              <Link
                href="/#sourcing"
                className="inline-flex items-center h-11 px-5 bg-ink text-white text-sm font-bold hover:bg-charcoal transition-colors shrink-0"
              >
                Ask about a vehicle
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto px-6 md:px-8">
            {isLoading && (
              <div className="space-y-10">
                {[1, 2].map((i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-[4/3] bg-[#f5f5f5] animate-shimmer" />
                    <div className="space-y-3 py-2">
                      <div className="h-4 w-20 bg-[#f0f0f0] rounded" />
                      <div className="h-8 w-3/4 bg-[#f0f0f0] rounded" />
                      <div className="h-4 w-full bg-[#f0f0f0] rounded" />
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="h-14 bg-[#f0f0f0] rounded" />
                        <div className="h-14 bg-[#f0f0f0] rounded" />
                        <div className="h-14 bg-[#f0f0f0] rounded" />
                        <div className="h-14 bg-[#f0f0f0] rounded" />
                      </div>
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
              <div className="space-y-10">
                {arrivals.map((vehicle) => (
                  <div
                    key={vehicle._id}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-[#eee] last:border-0"
                  >
                    <div className="relative aspect-[4/3] bg-[#f5f5f5]">
                      <Image
                        src={vehicle.images?.[0] ? urlFor(vehicle.images[0]).width(800).height(600).url() : "/assets/vehicle-suv.png"}
                        alt={vehicle.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="py-2">
                      <StatusBadge status={vehicle.status} />
                      <h3 className="text-ink text-2xl font-bold mt-3 mb-2">
                        {vehicle.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed mb-6">
                        {vehicle.make && vehicle.model && `${vehicle.make} ${vehicle.model}. `}
                        Photos available for exterior, interior, engine, mileage, and VIN.
                      </p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
                        <div>
                          <p className="text-muted text-xs font-semibold uppercase tracking-wider">From</p>
                          <p className="text-ink font-bold">{vehicle.sourceCountry || "US"}</p>
                        </div>
                        <div>
                          <p className="text-muted text-xs font-semibold uppercase tracking-wider">Mileage</p>
                          <p className="text-ink font-bold">{vehicle.mileage || "TBC"}</p>
                        </div>
                        <div>
                          <p className="text-muted text-xs font-semibold uppercase tracking-wider">Arrival</p>
                          <p className="text-ink font-bold">{vehicle.estimatedArrivalDate || "To confirm"}</p>
                        </div>
                        <div>
                          <p className="text-muted text-xs font-semibold uppercase tracking-wider">Status</p>
                          <p className="text-ink font-bold capitalize">{vehicle.status.replace("-", " ")}</p>
                        </div>
                      </div>
                      {vehicle.acceptingInterest && (
                        <Link
                          href="/#sourcing"
                          className="inline-flex items-center h-11 px-5 bg-ink text-white text-sm font-bold hover:bg-charcoal transition-colors"
                        >
                          Register interest
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
