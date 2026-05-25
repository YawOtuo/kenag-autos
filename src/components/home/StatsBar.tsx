"use client";

import { motion } from "framer-motion";
import { Car, Globe, Users, Shield } from "lucide-react";

const stats = [
  { icon: Car, value: "500+", label: "Vehicles Imported", suffix: "" },
  { icon: Globe, value: "3", label: "Continents Sourced", suffix: "" },
  { icon: Users, value: "1000+", label: "Happy Customers", suffix: "" },
  { icon: Shield, value: "10+", label: "Years Experience", suffix: "+" },
];

export function StatsBar() {
  return (
    <section className="bg-charcoal border-y border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-gold mx-auto mb-3" />
              <p className="text-white text-3xl md:text-4xl font-black">{stat.value}</p>
              <p className="text-white/60 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
