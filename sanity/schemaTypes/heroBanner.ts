import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroBanner",
  title: "Hero Banner",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "primaryButton",
      title: "Primary Button",
      type: "string",
    }),

    defineField({
      name: "secondaryButton",
      title: "Secondary Button",
      type: "string",
    }),

    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
});