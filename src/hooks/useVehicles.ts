"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";

interface Vehicle {
  _id: string;
  title: string;
  slug: { current: string };
  status: "arriving" | "in-transit" | "clearing" | "available" | "reserved" | "sold";
  category: "sedan" | "suv" | "pickup";
  year?: number;
  make?: string;
  model?: string;
  trim?: string;
  mileage?: string;
  vin?: string;
  sourceCountry?: string;
  estimatedArrivalDate?: string;
  price?: number;
  priceStatus?: string;
  description?: string;
  images?: any[];
  featured?: boolean;
  acceptingInterest?: boolean;
  soldDate?: string;
}

const ALL_VEHICLES_QUERY = `*[_type == "vehicle"] | order(year desc) {
  _id, title, slug, status, category, year, make, model, trim, mileage, vin, sourceCountry, estimatedArrivalDate, price, priceStatus, description, images, featured, acceptingInterest, soldDate
}`;

const FEATURED_VEHICLES_QUERY = `*[_type == "vehicle" && featured == true] | order(year desc) {
  _id, title, slug, status, category, year, make, model, trim, mileage, vin, sourceCountry, estimatedArrivalDate, price, priceStatus, description, images, featured, acceptingInterest, soldDate
}`;

export function useVehicles(featuredOnly = false) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        const query = featuredOnly ? FEATURED_VEHICLES_QUERY : ALL_VEHICLES_QUERY;
        const data = await client.fetch<Vehicle[]>(query);
        if (isMounted) {
          setVehicles(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch vehicles"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchVehicles();

    return () => {
      isMounted = false;
    };
  }, [featuredOnly]);

  return { vehicles, isLoading, error };
}
