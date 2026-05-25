import Image from "next/image";
import { FadeInUp } from "@/components/shared/FadeInUp";

export function PartsBand() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[minmax(300px,0.95fr)_minmax(280px,1.05fr)] gap-[clamp(24px,5vw,64px)] items-center max-w-[1180px] mx-auto px-4 md:px-0 pb-[clamp(56px,8vw,92px)]">
      <FadeInUp>
        <Image
          src="/assets/spare-parts.png"
          alt="Automotive spare parts and tools"
          width={600}
          height={400}
          className="w-full rounded-lg shadow-[0_18px_48px_rgba(23,23,23,0.16)]"
        />
      </FadeInUp>
      <FadeInUp delay={0.1}>
        <div>
          <p className="text-gold font-black uppercase text-[0.78rem] tracking-[0.08em] mb-3">
            Spare parts support
          </p>
          <h2 className="m-0 text-[clamp(2rem,4vw,3.4rem)] leading-[1.03] tracking-normal font-bold">
            Parts sourcing for common imported vehicles.
          </h2>
          <p className="mt-4 text-warm text-[1.04rem] leading-[1.75]">
            Beyond vehicle sales, KENAG supports customers with spare parts sourcing for popular imported
            models, helping buyers keep their vehicles running after purchase.
          </p>
        </div>
      </FadeInUp>
    </section>
  );
}
