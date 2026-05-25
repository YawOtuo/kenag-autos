"use server";

import { sendEmail } from "@/lib/resend";

export async function submitRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const vehicle = formData.get("vehicle") as string;
  const source = formData.get("source") as string;
  const budget = formData.get("budget") as string;

  // Honeypot check
  if (formData.get("website")) {
    return { success: false, errors: { honeypot: "Spam detected" } };
  }

  // Validation
  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = "Name is required";
  if (!phone?.trim()) errors.phone = "Phone number is required";
  if (!vehicle?.trim()) errors.vehicle = "Vehicle is required";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const text = `
New Vehicle Request from KENAG Website

Name: ${name}
Phone: ${phone}
Vehicle: ${vehicle}
Source: ${source || "Not specified"}
Budget: ${budget || "Not specified"}
  `.trim();

  const result = await sendEmail({
    to: process.env.CONTACT_EMAIL || "kenag@example.com",
    subject: `Vehicle Request: ${vehicle}`,
    text,
  });

  if (!result.success) {
    return { success: false, errors: { submit: "Failed to send request. Please try again." } };
  }

  return { success: true };
}

export async function registerInterest(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const vehicle = formData.get("vehicle") as string;

  // Honeypot check
  if (formData.get("website")) {
    return { success: false, errors: { honeypot: "Spam detected" } };
  }

  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = "Name is required";
  if (!phone?.trim()) errors.phone = "Phone number is required";
  if (!vehicle?.trim()) errors.vehicle = "Vehicle is required";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const text = `
New Arrival Interest from KENAG Website

Name: ${name}
Phone: ${phone}
Vehicle: ${vehicle}
  `.trim();

  const result = await sendEmail({
    to: process.env.CONTACT_EMAIL || "kenag@example.com",
    subject: `Vehicle Interest: ${vehicle}`,
    text,
  });

  if (!result.success) {
    return { success: false, errors: { submit: "Failed to send interest. Please try again." } };
  }

  return { success: true };
}
