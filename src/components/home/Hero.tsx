"use client";

import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { LottieAnimation } from "@/components/shared/LottieAnimation";
import carAnimation from "../../../public/assets/car.json";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] items-center gap-5 sm:gap-8 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h1 className="text-ink text-[clamp(2.25rem,5vw,3.9rem)] font-black leading-[1.06] tracking-tight mb-5">
              Vehicle imports from the US, Europe, and Asia
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-[540px] mb-9">
              KENAG sources reliable used cars through Copart, IAAI, and dealer networks.
              Ready stock in Kumasi or custom orders to your specification.
            </p>
            <div className="flex flex-wrap gap-4">
              <LinkButton
                href="/#inventory"
                variant="red"
                size="lg"
                className="h-12 tracking-wide"
              >
                View inventory
                <ArrowRight className="w-4 h-4" />
              </LinkButton>
              <LinkButton
                href="/#sourcing"
                variant="outline"
                size="lg"
                className="h-12 border-ink/15 bg-white tracking-wide hover:bg-white"
              >
                Request a vehicle
              </LinkButton>
            </div>
          </div>

          <div className="relative order-1 -mx-6 min-h-[260px] sm:-mx-8 sm:min-h-[330px] lg:order-2 lg:mx-0 lg:min-h-[430px]">
            <div className="absolute inset-x-[8%] bottom-[8%] h-3 rounded-full bg-charcoal/10 blur-sm" />
            <div className="relative mx-auto aspect-[400/250] w-screen max-w-none lg:w-full lg:max-w-[660px]">
              <LottieAnimation
                animationData={carAnimation}
                className="h-full w-full"
                aria-label="Animated car illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
