"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kwame Asante",
    role: "Business Owner",
    text: "KENAG made importing my Toyota Highlander seamless. From auction selection to clearing in Tema, they handled everything. The car arrived in perfect condition.",
    rating: 5,
    vehicle: "Toyota Highlander",
  },
  {
    name: "Ama Mensah",
    role: "Teacher",
    text: "I was skeptical about buying a car I hadn't seen, but KENAG sent detailed photos and videos at every stage. My Honda CR-V is exactly what I wanted.",
    rating: 5,
    vehicle: "Honda CR-V",
  },
  {
    name: "Kofi Boateng",
    role: "Contractor",
    text: "Imported a Ford Ranger for my construction business. The transparent pricing meant no surprises. Will definitely use KENAG again for my next vehicle.",
    rating: 5,
    vehicle: "Ford Ranger",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-[#fffaf0]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-black uppercase text-sm tracking-[0.15em] mb-3">
            Testimonials
          </p>
          <h2 className="text-ink text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight">
            What our customers say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl border border-line shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="w-8 h-8 text-red/20 mb-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-ink leading-relaxed mb-6">{t.text}</p>
              <div className="pt-4 border-t border-line">
                <p className="font-bold text-ink">{t.name}</p>
                <p className="text-muted text-sm">{t.role} • {t.vehicle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
