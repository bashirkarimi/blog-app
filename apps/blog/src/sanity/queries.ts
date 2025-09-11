import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    "homePage": homePage->{
      title,
      slug,
      _type,
      "heros": heros[]{
        ...,
      },
      "sections": sections[]{
        ...,
        "posts": posts[]->{
          ...,
          "body": body[0],
          "author": author->name,
          "categories": categories[]->title
        }
      }
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
