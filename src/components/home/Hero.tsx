"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-charcoal dark:bg-[#0a0a0a] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/kenag-hero.png"
          alt=""
          fill
          className="object-cover object-center opacity-20 dark:opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-[720px]">
          <p className="text-gold text-sm font-semibold tracking-[0.15em] uppercase mb-5">
            Kumasi, Ghana
          </p>
          <h1 className="text-white text-[clamp(2.8rem,6vw,4.8rem)] font-black leading-[1.05] tracking-tight mb-6">
            Vehicle imports from the US, Europe, and Asia
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-[560px] mb-10">
            KENAG sources reliable used cars through Copart, IAAI, and dealer networks. 
            Ready stock in Kumasi or custom orders to your specification.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#inventory"
              className="inline-flex items-center gap-2 h-12 px-6 bg-white text-charcoal text-sm font-bold tracking-wide hover:bg-white/90 transition-colors"
            >
              View inventory
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#sourcing"
              className="inline-flex items-center h-12 px-6 text-white text-sm font-bold tracking-wide border border-white/30 hover:border-white/60 transition-colors"
            >
              Request a vehicle
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
