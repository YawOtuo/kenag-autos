import { FadeInUp } from "@/components/shared/FadeInUp";
import { LinkButton } from "@/components/ui/link-button";

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
          <LinkButton
            href="/#sourcing"
            variant="red"
            size="lg"
            className="shadow-[0_12px_28px_rgba(183,31,44,0.28)] hover:-translate-y-0.5"
          >
            Start a vehicle request
          </LinkButton>
          <LinkButton
            href="/#inventory"
            variant="light"
            size="lg"
            className="text-ink hover:-translate-y-0.5"
          >
            View common imports
          </LinkButton>
        </div>
      </FadeInUp>
    </section>
  );
}
