// ...existing code...
import { defineQuery } from "next-sanity";

// Reusable projection for the custom "link" object.
// Computes an href depending on internal vs external, and surfaces authoring metadata.
// Adjust internal path logic (e.g. prefix with "/blog") if your site structure changes.
const LINK_PROJECTION = `
  "href": select(
    linkType == "external" => external,
    linkType == "internal" && defined(internal->slug.current) => '/' + internal->slug.current,
    '/'
  ),
  "label": label,
  "ariaLabel": ariaLabel,
  // only meaningful for external links; coalesce ensures boolean
  "openInNewTab": coalesce(linkType == "external" && openInNewTab, false)
`;

// Slim projection for list views (removed body[0] to reduce payload)
const POST_LIST_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "mainImage": mainImage.asset->url,
  excerpt,
  "author": author->{ _id, name },
  "categories": categories[]->{ _id, title }
`;

// Updated detail projection: spreads all fields (includes rich text field from richTextField import).
// Adds normalized author & categories. Assumes rich text field is named 'body' (adjust if different).
const POST_DETAIL_PROJECTION = `
  ...,
  "author": author->{ _id, name },
  "categories": categories[]->{ _id, title }
`;

// Keep section expansion; only internal projection changed (no excerpt now).
const expandSections = defineQuery(`
  sections[]{
    ...,
    _type == 'blogList' => {
      limit,
      title,
      mode,
      "posts": *[_type == "post" && defined(slug.current)]{
        ${POST_LIST_PROJECTION}
      },
    },
    _type == 'teaserList' => {
      ...,
      items[] {
        ...,
        "image": image.asset->url,
        "link": link{ ${LINK_PROJECTION} }
      }
    },
    _type == 'postsModule' => {
      ...,
      tags[]->{ title, "slug": slug.current }
    },
    _type == 'imageTeaser' => {
      ...,
      "image": image.asset->url,
      "link": link{ ${LINK_PROJECTION} }
    }
  }
`);

// Home & Landing Pages (unchanged aside from projection updates)
export const HOME_PAGE_QUERY = defineQuery(`
  *[_type=='homePage' && _id=='homePage'][0]{
    seoTitle,
    heros[] {
      ...,
      "image": image.asset->url,
      "link": link{ ${LINK_PROJECTION} }
    },
    ${expandSections}
  }
`);

export const LANDING_PAGE_QUERY = defineQuery(`
  *[_type == 'landingPage' && slug.current == $slug][0]{
    seoTitle,
    title,
    heros[] {
      ...,
      "image": image.asset->url,
      "link": link{ ${LINK_PROJECTION} }
    },
    ${expandSections}
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type=='siteSettings' && _id=='siteSettings'][0]{
    siteTitle,
    logo,
    defaultSeo,
    headerMenu->{
      title,
      items[]{label, target->{"_id": _id, title, "slug": slug.current}}
    }
  }
`);

// Legacy (non-paginated) posts query (now uses coalesced published date ordering).
export const POSTS_QUERY = defineQuery(`
  *[_type == "post"
    && defined(slug.current)
    && (!defined($category) || $category == "" || $category in categories[]->title)
  ] | order(coalesce(publishedAt, _createdAt) desc)[0...$limit]{
    ${POST_LIST_PROJECTION}
  }
`);

// (UPDATE) Paginated posts now supports optional $category filtering
export const PAGINATED_POSTS_QUERY = defineQuery(`
{
  "posts": *[_type == "post"
    && defined(slug.current)
    && (!defined($category) || $category == "" || $category in categories[]->title)
  ] | order(coalesce(publishedAt, _createdAt) desc)[$offset...$offset + $limit]{
    ${POST_LIST_PROJECTION}
  },
  "total": count(*[_type == "post"
    && defined(slug.current)
    && (!defined($category) || $category == "" || $category in categories[]->title)
  ])
}
`);

// Single post by slug (full detail)
export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    ${POST_DETAIL_PROJECTION}
  }
`);

// All slugs for static paths
export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`);

// Unique categories
export const UNIQUE_CATEGORIES_QUERY = defineQuery(`
  array::unique(
    *[_type == "post" && count(categories[]->title) > 0].categories[]->title
  ) | order(@ asc)
`);

// (Optional) legacy categories in posts
export const CATEGORIES_IN_POST_QUERY = defineQuery(`
  *[_type == "post" && count(categories[]->title) > 0]{
    "categories": categories[]->title
  }
`);

// (NEW) Categories with authoritative counts
export const CATEGORIES_WITH_COUNTS_QUERY = defineQuery(`
  *[_type == "category"]{
    _id,
    title,
    "count": count(*[_type == "post" && references(^._id) && defined(slug.current)])
  } | order(title asc)
`);
