import {defineField, defineType} from 'sanity'
import {ListIcon} from '@sanity/icons'

export const menuType = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          fields: [
            {
              name: 'label',
              type: 'string',
              validation: (r) => r.required(),
            },
            {
              name: 'target',
              title: 'Landing Page',
              type: 'reference',
              to: [{type: 'landingPage'}],
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: {title: 'label', subtitle: 'target.slug.current'},
          },
        },
      ],
    }),
  ],
})
