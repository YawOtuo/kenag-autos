import { FadeInUp } from "@/components/shared/FadeInUp";

export function IntroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[minmax(260px,0.9fr)_minmax(280px,1.1fr)] gap-[clamp(24px,5vw,68px)] items-start py-[clamp(56px,8vw,92px)] max-w-[1180px] mx-auto px-4 md:px-0">
      <FadeInUp>
        <div>
          <p className="text-gold font-black uppercase text-[0.78rem] tracking-[0.08em] mb-3">What we do</p>
          <h2 className="m-0 text-[clamp(2rem,4vw,3.4rem)] leading-[1.03] tracking-normal font-bold">
            Ready stock and custom orders for Ghanaian buyers.
          </h2>
        </div>
      </FadeInUp>
      <FadeInUp delay={0.1}>
        <p className="m-0 text-warm text-[1.04rem] leading-[1.75]">
          KENAG helps customers buy reliable used cars locally or import the right vehicle from abroad.
          We guide the process from vehicle selection to purchase, shipping updates, clearing coordination,
          and final handover in Kumasi.
        </p>
      </FadeInUp>
    </section>
  );
}
