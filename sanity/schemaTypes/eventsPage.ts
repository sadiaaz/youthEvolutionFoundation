import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'eventsPage',
  title: 'Events Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero Slider Images',
      description: 'Add 1-2 images for the Events page hero slider',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Slide Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { media: 'image', title: 'alt' },
          },
        },
      ],
    }),
  ],
})