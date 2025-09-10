import {defineType, defineField, defineArrayMember} from 'sanity'
import {heroTypes} from '../objects/heros'
import {sectionTypes} from '../objects/sections'

export const landingPageType = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Main content of the page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: '_type',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : '',
      }
    },
  },
})
