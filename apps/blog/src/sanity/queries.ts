import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    ...,
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