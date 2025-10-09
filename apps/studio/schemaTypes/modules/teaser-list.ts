import {defineType, defineField} from 'sanity'

export const teaserListType = defineType({
  name: 'teaserList',
  title: 'Teaser List',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teaser',
          fields: [
            {name: 'title', type: 'string', validation: (r) => r.required()},
            {name: 'summary', type: 'text'},
            {name: 'image', type: 'image', options: {hotspot: true}},
            {name: 'link', type: 'url'},
            {name: 'linkLabel', type: 'string'}
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'items.0.title'},
    prepare(selection) {
      const {title} = selection
      return {
        title: title ? `Teaser List: ${title}` : 'Teaser List',
      }
    }
  },
})
