import {defineType} from 'sanity'
import richTextField from '../arrays/rich-text-field'
import {sectionFields} from './partials/section-fields'

export const richTextType = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fieldsets: [
    {
      name: 'sectionSettings',
      title: 'Section Settings',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [...sectionFields, richTextField],
  preview: {
    prepare: () => ({title: 'Rich Text'}),
  },
})
