import type {StructureResolver} from 'sanity/structure'
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog App')
    .items([
      // ...all other items
      S.listItem().id('siteSettings').schemaType('siteSettings').title('Site Settings').child(
        // this part opens the siteSettings in editor mode
        S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings'),
      ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['siteSettings'].includes(item.getId()!),
      ),
      S.divider(),
    ])
