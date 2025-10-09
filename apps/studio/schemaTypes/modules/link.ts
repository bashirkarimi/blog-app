import {defineType, defineField} from 'sanity'

export const linkType = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  options: {collapsible: true},
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: r => r.required().min(1).max(120),
    }),
    defineField({
      name: 'linkType',
      title: 'Type',
      type: 'string',
      initialValue: 'internal',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
        ],
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'internal',
      title: 'Internal document',
      type: 'reference',
      to: [
        {type: 'post'},
        {type: 'landingPage'},
      ],
      hidden: ({parent}) => parent?.linkType !== 'internal',
      validation: r => r.custom((val, ctx) => {
        const parent = ctx.parent as {linkType?: string}
        return parent?.linkType === 'internal' && !val ? 'Select a document' : true
      }),
    }),
    defineField({
      name: 'external',
      title: 'External URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: r =>
        r.uri({scheme: ['http', 'https']}).custom((val, ctx) => {
          const parent = ctx.parent as {linkType?: string}
          return parent?.linkType === 'external' && !val ? 'Enter a URL' : true
        }),
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor (optional)',
      type: 'string',
      description: 'No # prefix. Example: faq-section',
      validation: r => r.regex(/^[a-z0-9-]+$/i, {name: 'slug-format'}).warning('Letters, numbers, hyphens only'),
    }),
    defineField({
      name: 'openInNewTab',
      type: 'boolean',
      title: 'Open in new tab',
      initialValue: false,
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'ariaLabel',
      title: 'Accessible label',
      type: 'string',
      description: 'Improves screen reader clarity if label is vague',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
      internalTitle: 'internal.title',
      external: 'external',
    },
    prepare({label, linkType, internalTitle, external}) {
      const subtitle = linkType === 'internal' ? (internalTitle ? `→ ${internalTitle}` : '→ (unlinked)') : external
      return {
        title: label || '(no label)',
        subtitle,
      }
    },
  },
})
