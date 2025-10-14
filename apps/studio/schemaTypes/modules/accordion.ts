import {defineType, defineField} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import { sectionFields } from './partials/section-fields'

export const accordionType = defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  icon: BlockElementIcon,
  fieldsets: [
    {
      name: 'sectionSettings',
      title: 'Section Settings',
      options: {collapsible: true, collapsed: true}
    }
  ],
  fields: [
    ...sectionFields,
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', validation: (r) => r.required()},
            {name: 'content', type: 'array', of: [{type: 'block'}]},
          ],
        },
      ],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'items.0.title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title ? `Accordion: ${title}` : 'Accordion',
      }
    },
  },
})
