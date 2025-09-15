import {defineField, defineType, defineArrayMember} from 'sanity'
import {heroTypes} from '../objects/heros'
import {sectionTypes} from '../objects/sections'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'detailsPage',
  title: 'Details Page (Post Template)',
  type: 'document',
  icon: DocumentIcon,
  description:
    'Global template for post details pages. The top always renders the Post content. You can add default bottom modules here.',
  fields: [
    defineField({
      name: 'useDefaultHero',
      type: 'boolean',
      initialValue: false,
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
