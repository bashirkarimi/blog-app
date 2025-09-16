import {defineField, defineType} from 'sanity'
import {herosField} from '../arrays/heros'
import {sectionsField} from '../arrays/sections'
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
    herosField,
    sectionsField,
  ],
})
