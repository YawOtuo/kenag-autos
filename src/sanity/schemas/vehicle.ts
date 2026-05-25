import { defineType, defineField } from "sanity";

export const vehicle = defineType({
  name: "vehicle",
  title: "Vehicle",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Arriving", value: "arriving" },
          { title: "In Transit", value: "in-transit" },
          { title: "Clearing", value: "clearing" },
          { title: "Available", value: "available" },
          { title: "Reserved", value: "reserved" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "arriving",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Sedan", value: "sedan" },
          { title: "SUV", value: "suv" },
          { title: "Pickup", value: "pickup" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "make",
      title: "Make",
      type: "string",
    }),
    defineField({
      name: "model",
      title: "Model",
      type: "string",
    }),
    defineField({
      name: "trim",
      title: "Trim",
      type: "string",
    }),
    defineField({
      name: "mileage",
      title: "Mileage",
      type: "string",
    }),
    defineField({
      name: "vin",
      title: "VIN",
      type: "string",
    }),
    defineField({
      name: "sourceCountry",
      title: "Source Country",
      type: "string",
    }),
    defineField({
      name: "estimatedArrivalDate",
      title: "Estimated Arrival Date",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "priceStatus",
      title: "Price Status",
      type: "string",
      options: {
        list: [
          { title: "Firm", value: "firm" },
          { title: "Negotiable", value: "negotiable" },
          { title: "On Request", value: "on-request" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "acceptingInterest",
      title: "Accepting Interest",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "soldDate",
      title: "Sold Date",
      type: "date",
      hidden: ({ document }) => document?.status !== "sold",
    }),
  ],
});
