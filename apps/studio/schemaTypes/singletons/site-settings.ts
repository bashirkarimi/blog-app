import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({name: 'logo', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'headerMenu',
      type: 'reference',
      to: [{type: 'menu'}],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'defaultSeo',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'description', type: 'text'},
        {name: 'ogImage', type: 'image', options: {hotspot: true}},
      ],
    }),
  ],
})
