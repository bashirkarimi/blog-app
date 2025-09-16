import {defineField} from 'sanity'
export default defineField({
  name: 'body',
  title: 'Body',
  type: 'blockContent',
  validation: (r) => r.min(1),
})
