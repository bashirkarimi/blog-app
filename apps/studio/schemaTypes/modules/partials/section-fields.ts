import {defineField} from 'sanity'

export const sectionFields = [
  defineField({
    name: 'sectionTitle',
    title: 'Section Title',
    type: 'string',
    fieldset: 'sectionSettings',
  }),
  defineField({
    name: 'sectionVariant',
    title: 'Section Variant',
    type: 'string',
    options: {
      list: [
        {title: 'Default', value: 'default'},
        {title: 'Narrow', value: 'narrow'},
        {title: 'Full Width', value: 'fullWidth'},
      ],
      layout: 'radio',
    },
    initialValue: 'default',
    fieldset: 'sectionSettings',
  }),
  defineField({
    name: 'sectionBackground',
    title: 'Section Background',
    type: 'string',
    options: {
      list: [
        {title: 'None', value: 'none'},
        {title: 'Gray', value: 'gray'},
      ],
      layout: 'radio',
    },
    initialValue: 'none',
    fieldset: 'sectionSettings',
  }),
]
