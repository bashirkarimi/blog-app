import {defineType, defineField} from 'sanity'

export const teaserListType = defineType({
  name: 'teaserList',
  title: 'Teaser List',
  type: 'object',
  fields: [
    defineField({
      name: 'mode',
      type: 'string',
      options: {list: ['manual', 'posts']},
      initialValue: 'manual',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teaser',
          fields: [
            {name: 'title', type: 'string', validation: (r) => r.required()},
            {name: 'summary', type: 'text'},
            {name: 'image', type: 'image', options: {hotspot: true}},
            {name: 'href', type: 'string'},
          ],
        },
      ],
      hidden: ({parent}) => parent?.mode !== 'manual',
    }),
    defineField({
      name: 'postRefs',
      title: 'Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      hidden: ({parent}) => parent?.mode !== 'posts',
    }),
  ],
})
