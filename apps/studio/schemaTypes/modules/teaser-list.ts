import {defineType, defineField} from 'sanity'
import {sectionFields} from './partials/section-fields'

export const teaserListType = defineType({
  name: 'teaserList',
  title: 'Teaser List',
  type: 'object',
  fieldsets: [
    {
      name: 'sectionSettings',
      title: 'Section Settings',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    ...sectionFields,
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
            {name: 'link', type: 'link'},
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
    },
  },
})
