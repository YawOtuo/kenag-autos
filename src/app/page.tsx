import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { VehicleGrid } from "@/components/home/VehicleGrid";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { SourcingSection } from "@/components/home/SourcingSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <VehicleGrid />
        <ProcessSteps />
        <SourcingSection />
      </main>
      <SiteFooter />
    </>
  );
}
