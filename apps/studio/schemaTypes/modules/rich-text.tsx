import {defineType} from 'sanity'
import richTextField from '../arrays/rich-text-field'

export const richTextType = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fields: [richTextField],
  preview: {
    prepare: () => ({title: 'Rich Text'}),
  },
})
