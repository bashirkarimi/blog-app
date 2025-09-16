import {defineField, defineType} from 'sanity'
import {herosField} from '../arrays/heros'
import {sectionsField} from '../arrays/sections'
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
    herosField,
    sectionsField,
  ],
})
