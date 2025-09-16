import {defineField, defineArrayMember} from 'sanity'
import {sectionTypes} from '../objects/sections'

export const sectionsField = defineField({
  name: 'sections',
  title: 'Sections',
  type: 'array',
  of: sectionTypes.map((section) =>
    defineArrayMember({
      type: section.name,
    }),
  ),
  options: {
    insertMenu: {
      views: [
        {
          name: 'grid',
          previewImageUrl: (type) => `/static/sections/${type}.png`,
        },
      ],
    },
  },
})
