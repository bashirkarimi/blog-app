import {defineType, defineField} from 'sanity'

export const postsType = defineType({
  name: 'posts',
  title: 'Posts (Blog List)',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'limit',
      type: 'number',
      initialValue: 6,
      validation: (r) => r.required().min(1).max(50),
    }),
    defineField({
      name: 'sort',
      type: 'string',
      initialValue: 'newest',
      options: {
        list: [
          {title: 'Newest first', value: 'newest'},
          {title: 'Oldest first', value: 'oldest'},
        ],
      },
    }),
    defineField({
      name: 'showTags',
      title: 'Show tag filters',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'tagSource',
      title: 'Tag source',
      type: 'string',
      initialValue: 'all',
      options: {
        list: [
          {title: 'All tags with posts', value: 'all'},
          {title: 'Select tags', value: 'selected'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags (when Select tags)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
      hidden: ({parent}) => parent?.tagSource !== 'selected',
    }),
    defineField({
      name: 'moreLinkMode',
      title: 'Load more behavior',
      type: 'string',
      initialValue: 'client',
      options: {
        list: [
          {title: 'Client-side Load More', value: 'client'},
          {title: 'Link to a page', value: 'link'},
        ],
      },
    }),
    defineField({
      name: 'moreLinkLabel',
      type: 'string',
      initialValue: 'Load more posts',
    }),
    defineField({
      name: 'moreLandingPage',
      title: 'Landing Page (when Link to a page)',
      type: 'reference',
      to: [{type: 'landingPage'}],
      hidden: ({parent}) => parent?.moreLinkMode !== 'link',
    }),
    defineField({
      name: 'moreHref',
      title: 'Custom URL (optional)',
      type: 'string',
      hidden: ({parent}) => parent?.moreLinkMode !== 'link',
    }),
  ],
  preview: {
    select: {title: 'title', limit: 'limit'},
    prepare: ({title, limit}) => ({
      title: title || 'Posts',
      subtitle: `Limit: ${limit ?? 6}`,
    }),
  },
})
