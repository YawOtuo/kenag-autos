"use client";

import { useState } from "react";

type Category = "all" | "sedan" | "suv" | "pickup";
type Status = "all" | "arriving" | "in-transit" | "clearing" | "available" | "reserved" | "sold";

export function useVehicleFilter() {
  const [category, setCategory] = useState<Category>("all");
  const [status, setStatus] = useState<Status>("all");

  const reset = () => {
    setCategory("all");
    setStatus("all");
  };

  return { category, status, setCategory, setStatus, reset };
}
