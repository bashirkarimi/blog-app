import {defineType, defineField} from 'sanity'

export const richTextType = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {prepare: () => ({title: 'Rich Text'})},
})

