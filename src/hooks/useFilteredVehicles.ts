"use client";

import { useMemo } from "react";
import { useVehicles } from "./useVehicles";
import { useVehicleFilter } from "./useVehicleFilter";

export function useFilteredVehicles() {
  const { vehicles, isLoading, error } = useVehicles();
  const { category, status, setCategory, setStatus, reset } = useVehicleFilter();

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchCategory = category === "all" || v.category === category;
      const matchStatus = status === "all" || v.status === status;
      return matchCategory && matchStatus;
    });
  }, [vehicles, category, status]);

  return {
    filteredVehicles,
    category,
    status,
    setCategory,
    setStatus,
    reset,
    isLoading,
    error,
  };
}
