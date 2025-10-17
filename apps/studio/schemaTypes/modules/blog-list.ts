import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'
import {sectionFields} from './partials/section-fields'

export const blogListType = defineType({
  name: 'blogList',
  title: 'Blog List Section',
  type: 'object',
  initialValue: {mode: 'latest', limit: 3, posts: []},
  icon: TextIcon,
  fieldsets: [
    {
      name: 'sectionSettings',
      title: 'Section Settings',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    ...sectionFields,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      options: {
        list: [
          {title: 'Latest (auto)', value: 'latest'},
          {title: 'Manual (select posts)', value: 'manual'},
        ],
      },
      initialValue: 'latest',
      description:
        'Latest mode automatically shows the most recent posts. Manual mode lets you select specific posts to feature.',
    }),
    defineField({
      name: 'limit',
      title: 'Number of posts',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(20),
      hidden: ({parent}) => parent?.mode === 'manual',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      hidden: ({parent}) => parent?.mode === 'latest',
      description: 'Select specific posts when mode is Manual. Hidden when Mode is Latest (auto).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      mode: 'mode',
      posts: 'posts',
    },
    prepare({title, mode, posts}: {title?: string; mode?: string; posts?: any[]}) {
      const subtitle =
        mode === 'latest'
          ? 'Showing latest posts'
          : `Manually selected posts (${posts?.length || 0})`
      return {
        title: title || 'Blog List',
        subtitle,
        media: TextIcon,
      }
    },
  },
})
