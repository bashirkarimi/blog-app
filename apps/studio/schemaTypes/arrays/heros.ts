import {defineField,  defineArrayMember} from 'sanity'
import {heroTypes} from '../objects/heros'

export const herosField = defineField({
  name: 'heros',
  title: 'Heros',
  type: 'array',
  of: heroTypes.map((hero) =>
    defineArrayMember({
      type: hero.name,
    }),
  ),
  options: {
    insertMenu: {
      views: [
        {
          name: 'grid',
          previewImageUrl: (type) => `/static/heros/${type}.png`,
        },
      ],
    },
  },
  validation: (rule) => rule.required().max(1).error('Please add one hero'),
})
