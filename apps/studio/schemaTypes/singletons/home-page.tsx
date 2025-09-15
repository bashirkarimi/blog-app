import {defineField, defineType, defineArrayMember} from 'sanity'
import {heroTypes} from '../objects/heros'
import {sectionTypes} from '../objects/sections'
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'seoTitle',
      type: 'string',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'heros',
      title: 'Heros',
      type: 'array',
      of: heroTypes.map((hero) =>
        defineArrayMember({
          type: hero.name,
        }),
      ),
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (type) => `/static/heroes/${type}.png`,
            },
          ],
        },
      },
      validation: (rule) => rule.required().max(1).error('Please add one hero'),
    }),
    defineField({
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
    }),
  ],
})
