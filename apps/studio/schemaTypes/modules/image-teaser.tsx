import {defineType, defineField} from 'sanity'

export const imageTeaserType = defineType({
  name: 'imageTeaser',
  title: 'Image Teaser',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({name: 'href', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
  ],
})
