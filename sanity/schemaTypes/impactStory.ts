import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'impactStory',
  title: 'Impact Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
  ],
})