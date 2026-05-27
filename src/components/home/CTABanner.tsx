"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export function CTABanner() {
  return (
    <section className="py-20 md:py-28 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(183,31,44,0.15),transparent_50%)]" />
      
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-[700px] mx-auto"
        >
          <h2 className="text-white text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight mb-4">
            Ready to import your next vehicle?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Whether you want something from our inventory or a custom import, 
            we are here to help. Reach out today.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <LinkButton
              href="/#sourcing"
              variant="red"
              size="xl"
              className="group shadow-lg hover:-translate-y-0.5"
            >
              Start Your Request
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LinkButton>
            <LinkButton
              href="https://wa.me/233241234567"
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="xl"
              className="hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </LinkButton>
            <LinkButton
              href="tel:+233241234567"
              variant="glass"
              size="xl"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </LinkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
