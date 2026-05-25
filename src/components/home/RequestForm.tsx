"use client";

import { useRequestForm } from "@/hooks/useRequestForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ArrowRight } from "lucide-react";

const sourceOptions = ["US", "Europe", "Asia", "No preference"];

export function RequestForm() {
  const { fields, errors, isSubmitting, success, handleChange, handleSubmit } = useRequestForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm font-semibold text-ink dark:text-white">
          Full name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={fields.name}
          onChange={handleChange}
          className={`h-11 border-[#e0e0e0] dark:border-[#333] bg-white dark:bg-[#111] text-ink dark:text-white focus:border-ink dark:focus:border-white focus:ring-0 rounded-none ${errors.name ? "border-red" : ""}`}
        />
        {errors.name && <p className="text-red text-xs">{errors.name}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-sm font-semibold text-ink dark:text-white">
          Phone or WhatsApp
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={fields.phone}
          onChange={handleChange}
          className={`h-11 border-[#e0e0e0] dark:border-[#333] bg-white dark:bg-[#111] text-ink dark:text-white focus:border-ink dark:focus:border-white focus:ring-0 rounded-none ${errors.phone ? "border-red" : ""}`}
        />
        {errors.phone && <p className="text-red text-xs">{errors.phone}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="vehicle" className="text-sm font-semibold text-ink dark:text-white">
          Vehicle wanted
        </Label>
        <Input
          id="vehicle"
          name="vehicle"
          type="text"
          placeholder="Toyota Highlander, BMW X5..."
          required
          value={fields.vehicle}
          onChange={handleChange}
          className={`h-11 border-[#e0e0e0] dark:border-[#333] bg-white dark:bg-[#111] text-ink dark:text-white focus:border-ink dark:focus:border-white focus:ring-0 rounded-none ${errors.vehicle ? "border-red" : ""}`}
        />
        {errors.vehicle && <p className="text-red text-xs">{errors.vehicle}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="source" className="text-sm font-semibold text-ink dark:text-white">
          Preferred source
        </Label>
        <select
          id="source"
          name="source"
          value={fields.source}
          onChange={handleChange}
          className="h-11 w-full px-3 border border-[#e0e0e0] dark:border-[#333] bg-white dark:bg-[#111] text-ink dark:text-white focus:border-ink dark:focus:border-white focus:outline-none"
        >
          {sourceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="budget" className="text-sm font-semibold text-ink dark:text-white">
          Budget range
        </Label>
        <Input
          id="budget"
          name="budget"
          type="text"
          placeholder="Example: GHS 180,000 - 250,000"
          value={fields.budget}
          onChange={handleChange}
          className="h-11 border-[#e0e0e0] dark:border-[#333] bg-white dark:bg-[#111] text-ink dark:text-white focus:border-ink dark:focus:border-white focus:ring-0 rounded-none"
        />
      </div>

      {/* Honeypot */}
      <div className="hidden">
        <input type="text" name="website" value={fields.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-ink dark:bg-white text-white dark:text-ink font-bold hover:bg-charcoal dark:hover:bg-white/90 transition-colors rounded-none disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : (
          <>
            Send request <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>

      {success && (
        <p className="text-green text-sm font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          Thanks! We will follow up shortly.
        </p>
      )}
      {errors.submit && <p className="text-red text-xs">{errors.submit}</p>}
    </form>
  );
}
