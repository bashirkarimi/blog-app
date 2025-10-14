import {defineType, defineField} from 'sanity'
import { sectionFields } from './partials/section-fields';

export const imageTeaserType = defineType({
  name: 'imageTeaser',
  title: 'Image Teaser',
  type: 'object',
  fieldsets: [
    {
      name: 'sectionSettings',
      title: 'Section Settings',
      options: {collapsible: true, collapsed: true}
    }
  ],
  fields: [
    ...sectionFields,
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'link', type: 'link'}),
  ],
  preview: {
    select: {
      title: '_type',
      media: 'image',
      subtitle: 'title',
    },
    prepare({title, subtitle, media}: {title: string; subtitle: string; media: any}) {
      const refinedTitle = title.charAt(0).toUpperCase() + title.slice(1).replace(/([A-Z])/g, ' $1')
      return {
        title: refinedTitle || 'Image Teaser',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
