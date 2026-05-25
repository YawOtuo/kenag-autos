import Link from "next/link";
import { FadeInUp } from "@/components/shared/FadeInUp";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="flex flex-col md:flex-row items-start md:items-center justify-between gap-7 max-w-[1180px] mx-auto mb-[clamp(50px,8vw,86px)] p-[clamp(32px,5vw,48px)] bg-charcoal text-white rounded-lg"
    >
      <FadeInUp>
        <div>
          <p className="text-gold font-black uppercase text-[0.78rem] tracking-[0.08em] mb-3">Visit or enquire</p>
          <h2 className="m-0 text-[clamp(2rem,4vw,3.4rem)] leading-[1.03] tracking-normal font-bold">
            Kumasi, Ghana
          </h2>
          <p className="max-w-[650px] mt-4 text-white/78 text-[1.04rem] leading-[1.75]">
            Speak with KENAG Spare Parts & Motors about available imports, auction requests, and spare parts
            support for your vehicle.
          </p>
        </div>
      </FadeInUp>
      <FadeInUp delay={0.1}>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/#sourcing"
            className="inline-flex items-center justify-center min-h-[46px] px-[18px] bg-red text-white font-black text-[0.94rem] rounded-md shadow-[0_12px_28px_rgba(183,31,44,0.28)] hover:bg-red-dark transition-all duration-200 hover:-translate-y-0.5"
          >
            Start a vehicle request
          </Link>
          <Link
            href="/#inventory"
            className="inline-flex items-center justify-center min-h-[46px] px-[18px] bg-white text-ink font-black text-[0.94rem] rounded-md hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5"
          >
            View common imports
          </Link>
        </div>
      </FadeInUp>
    </section>
  );
}
