import { defineType, defineField } from "sanity";

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
      name: 'contents',
      title: 'Contents',
      type: 'pageBuilder',
      description: 'Add and arrange content blocks to build the page layout',
      validation: (Rule) => Rule.required().min(1).error('At least one content block is required'),
    }),
    // defineField({
    //   name: 'heros',
    //   title: 'Heros',
    //   type: 'array',
    //   of: [{type: 'string'}],
    //   description: 'List of hero names',
    // }),
    // defineField({
    //   name: 'sections',
    //   title: 'Sections',
    //   type: 'array',
    //   of: [], // You can define different section types here
    //   description: 'Add sections to build the page layout',
    // }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'Main content of the page',
      validation: (Rule) => Rule.required(),
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