import {defineType, defineField} from 'sanity'
import {herosField} from '../arrays/heros'
import {sectionsField} from '../arrays/sections'

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
    herosField,
    sectionsField,
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
