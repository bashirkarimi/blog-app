import { defineQuery } from "next-sanity";

const expandSections = /* groq */ `
  sections[]{
    ...,
    _type == 'blogList' => {
      ...,
      "posts": select(
        mode == "latest" => *[_type == "post" && defined(slug.current)] | order(_createdAt desc){
          ...,
          "body": body[0],
          "author": author->name,
          "categories": categories[]->title
        },
        mode == "manual" => posts[]->{
          ...,
          "body": body[0],
          "author": author->name,
          "categories": categories[]->title
        }
      )
    },
    _type == 'teaserList' => {
      ...,
      postRefs[]->{
        title, excerpt, mainImage, "slug": slug.current
      }
    },
    _type == 'postsModule' => {
      ...,
      tags[]->{ title, "slug": slug.current }
    }
  }
`;

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type=='homePage' && _id=='homePage'][0]{
    seoTitle,
    heros[],
    ${expandSections}
  }
`);


export const LANDING_PAGE_QUERY = defineQuery(`
  *[_type == 'landingPage' && slug.current == $slug][0]{
    seoTitle,
    title,
    heros[],
    ${expandSections}
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type=='siteSettings' && _id=='siteSettings'][0]{
    siteTitle, logo, defaultSeo, headerMenu->{
      title,
      items[]{label, target->{"_id": _id, title, "slug": slug.current}}
    }
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) 
  && (!defined($category)
  || $category == "" 
  || $category in categories[]->title)]{ 
    ...,
    "body": body[0],
    "author": author->name,
    "categories": categories[]->title
  } | order(_createdAt desc)
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ...,
    "author": author->name,
    "categories": categories[]->title
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const CATEGORIES_IN_POST_QUERY = defineQuery(`
  *[_type == "post" && defined(categories)]{
    "categories": categories[]->title
  } | order(title asc)
`);
