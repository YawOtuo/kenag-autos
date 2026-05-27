"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Choose or request",
    desc: "Select from available imported cars or send the exact model, year, trim, and budget you want.",
  },
  {
    num: "02",
    title: "Review options",
    desc: "We compare listings, auction photos, condition notes, mileage, and landed-cost expectations.",
  },
  {
    num: "03",
    title: "Import to Ghana",
    desc: "After purchase, we help coordinate shipping updates and the steps needed before local delivery.",
  },
  {
    num: "04",
    title: "Handover in Kumasi",
    desc: "Your vehicle is handed over locally with practical guidance for registration and after-sale needs.",
  },
];

export function ProcessSteps() {
  return (
    <section id="process" className="py-20 md:py-24 bg-white border-t border-[#eee]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="mb-14">
          <p className="text-red text-sm font-semibold tracking-[0.1em] uppercase mb-3">
            How it works
          </p>
          <h2 className="text-ink text-3xl md:text-4xl font-black leading-tight">
            From search to handover
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex gap-5"
            >
              <span className="text-red/30 text-5xl font-black leading-none shrink-0">
                {step.num}
              </span>
              <div>
                <h3 className="text-ink text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
