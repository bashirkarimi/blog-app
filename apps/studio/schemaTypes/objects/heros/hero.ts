import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const heroType = defineType({
  name: 'hero',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: '_type',
    },
    prepare(selection) {
      const {title, media, subtitle} = selection
      return {
        title,
        subtitle: subtitle && `Type: ${subtitle}`,
        media: media ?? TextIcon,
      }
    },
  },
})
