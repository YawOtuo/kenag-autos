"use client";

import { useState, useCallback } from "react";
import { registerInterest } from "@/app/actions";

interface InterestFormData {
  name: string;
  phone: string;
  vehicle: string;
  website: string; // honeypot
}

export function useInterestForm() {
  const [fields, setFields] = useState<InterestFormData>({
    name: "",
    phone: "",
    vehicle: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

      const result = await registerInterest(formData);

      if (result.success) {
        setSuccess(true);
        setFields({
          name: "",
          phone: "",
          vehicle: "",
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
