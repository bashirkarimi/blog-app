import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = [
  {type: 'siteSettings', id: 'siteSettings', title: 'Site Settings'},
  {type: 'homePage', id: 'homePage', title: 'Home Page'},
  {type: 'detailsPage', id: 'detailsPage', title: 'Details Page'},
]
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog App')
    .items([
      ...SINGLETONS.map((def) =>
        S.listItem()
          .title(def.title)
          .child(S.editor().id(def.id).schemaType(def.type).documentId(def.id)),
      ),
      S.divider(),
      S.listItem()
        .title('Landing Pages')
        .schemaType('landingPage')
        .child(S.documentTypeList('landingPage').title('Landing Pages')),
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Authors')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Menus')
        .schemaType('menu')
        .child(S.documentTypeList('menu').title('Menus')),
      S.listItem().title('Tags').schemaType('tag').child(S.documentTypeList('tag').title('Tags')),
    ])
