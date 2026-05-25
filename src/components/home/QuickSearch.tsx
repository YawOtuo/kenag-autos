"use client";

import Link from "next/link";

const quickLinks = [
  { label: "Toyota Camry", query: "Toyota Camry" },
  { label: "Honda CR-V", query: "Honda CR-V" },
  { label: "Mercedes-Benz", query: "Mercedes-Benz" },
  { label: "Pickup Truck", query: "Pickup Truck" },
];

export function QuickSearch() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 border-b border-line bg-[#fffaf0]">
      {quickLinks.map((link, i) => (
        <Link
          key={link.query}
          href={`/#sourcing?vehicle=${encodeURIComponent(link.query)}`}
          className={`py-[18px] text-center font-black border-r border-line hover:bg-white hover:text-red transition-colors ${
            i === quickLinks.length - 1 ? "border-r-0" : ""
          }`}
        >
          {link.label}
        </Link>
      ))}
    </section>
  );
}
