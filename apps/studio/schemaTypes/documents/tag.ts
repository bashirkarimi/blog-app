import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 48},
      validation: (r) => r.required(),
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})
