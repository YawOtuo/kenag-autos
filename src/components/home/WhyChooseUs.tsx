"use client";

import { motion } from "framer-motion";
import { Gavel, Ship, MapPin, BadgeCheck, Headphones, Wallet } from "lucide-react";

const benefits = [
  {
    icon: Gavel,
    title: "Direct Auction Access",
    desc: "We source directly from Copart, IAAI, and trusted dealers in the US, Europe, and Asia.",
  },
  {
    icon: Ship,
    title: "Full Shipping & Clearing",
    desc: "We handle everything from purchase to port clearing. You just pick up in Kumasi.",
  },
  {
    icon: MapPin,
    title: "Kumasi Handover",
    desc: "Personal vehicle delivery in Kumasi with registration guidance and after-sale support.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Condition",
    desc: "Every vehicle comes with auction photos, VIN reports, and full condition disclosure.",
  },
  {
    icon: Headphones,
    title: "Personal Support",
    desc: "One dedicated contact throughout your import journey. WhatsApp updates at every step.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    desc: "No hidden fees. Clear breakdown of auction price, shipping, duty, and clearing costs.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-black uppercase text-sm tracking-[0.15em] mb-3">
            Why KENAG
          </p>
          <h2 className="text-ink text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight">
            The smarter way to import
          </h2>
          <p className="text-muted text-lg mt-4 max-w-[600px] mx-auto">
            We handle the complexity so you can focus on driving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group p-8 bg-white border border-line rounded-xl hover:shadow-lg hover:shadow-charcoal/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-red/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-red group-hover:text-white transition-colors duration-300">
                <benefit.icon className="w-6 h-6 text-red group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-ink text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
