"use client";

import { useState, useCallback } from "react";
import { submitRequest } from "@/app/actions";

interface RequestFormData {
  name: string;
  phone: string;
  vehicle: string;
  source: string;
  budget: string;
  website: string; // honeypot
}

export function useRequestForm() {
  const [fields, setFields] = useState<RequestFormData>({
    name: "",
    phone: "",
    vehicle: "",
    source: "US",
    budget: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      // Clear error when user types
      if (errors[e.target.name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[e.target.name];
          return next;
        });
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({});

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await submitRequest(formData);

      if (result.success) {
        setSuccess(true);
        setFields({
          name: "",
          phone: "",
          vehicle: "",
          source: "US",
          budget: "",
          website: "",
        });
      } else {
        setErrors(result.errors || {});
      }

      setIsSubmitting(false);
    },
    [fields]
  );

  return { fields, errors, isSubmitting, success, handleChange, handleSubmit, setFields };
}
