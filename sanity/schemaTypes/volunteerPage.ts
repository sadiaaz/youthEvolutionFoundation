import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'volunteerPage',
  title: 'Volunteer Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'sideImage',
      title: 'Card Side Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'sideTitle',
      title: 'Card Side Title',
      type: 'string',
      initialValue: 'Empowerment Through Service',
    }),
    defineField({
      name: 'sideSubtitle',
      title: 'Card Side Subtitle',
      type: 'string',
      initialValue: 'Unite, Serve, Impact: Your Chance to Give Back',
    }),
  ],
})