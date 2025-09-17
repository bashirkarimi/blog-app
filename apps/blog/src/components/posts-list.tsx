import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { PostsListClient } from "./posts-list-client";

type Tag = { title: string; slug: string };

const PostsList = async ({ data }: { data: any }) => {
  const limit: number = Math.max(Number(data?.limit ?? 6), 1);
  const sort = (data?.sort || "newest") as "newest" | "oldest";
  const orderDir = sort === "oldest" ? "asc" : "desc";
  const moduleKey: string = data?._key || "pm";

  // If author preselected tags, use those as initial active filters
  const preselected =
    data?.tagSource === "selected" && Array.isArray(data?.tags)
      ? (data.tags as any[])
          .map((t) => t?.slug?.current || t?.slug)
          .filter(Boolean)
      : [];

  const initialTagSlugs: string[] = preselected;

  // Initial page (SSR):
  const q = groq`{
    "items": *[_type=='post'
      && (count($tagSlugs) == 0 || count((tags[]->slug.current)[@ in $tagSlugs]) > 0)
    ] | order(_createdAt ${orderDir}) [0...$limit] {
      title, mainImage, ..., "slug": slug.current,
      tags[]->{ title, "slug": slug.current }
    },
    "total": count(*[_type=='post'
      && (count($tagSlugs) == 0 || count((tags[]->slug.current)[@ in $tagSlugs]) > 0)
    ])
  }`;

  const [{ items, total }] = await Promise.all([
    client.fetch(q, { tagSlugs: initialTagSlugs, limit }),
  ]);

  // Tag list for the bar
  const tagsQuery =
    data?.tagSource === "selected"
      ? groq`*[_type=='tag' && slug.current in $sel]{ title, "slug": slug.current } | order(title asc)`
      : groq`*[_type=='tag' && defined(slug.current) && count(*[_type=='post' && references(^._id)]) > 0]
              { title, "slug": slug.current } | order(title asc)`;

  const availableTags: Tag[] = await client.fetch(tagsQuery, {
    sel: initialTagSlugs,
  });

  return (
    <PostsListClient
      id={moduleKey}
      title={data?.title}
      showTags={!!data?.showTags}
      moreLinkMode={data?.moreLinkMode || "client"}
      moreLinkLabel={data?.moreLinkLabel || "Load more posts"}
      moreHref={
        data?.moreHref ||
        (data?.moreLandingPage?.slug?.current
          ? `/${data.moreLandingPage.slug.current}`
          : undefined)
      }
      limit={limit}
      sort={sort}
      initialItems={items}
      total={total}
      initialTags={initialTagSlugs}
      availableTags={availableTags}
    />
  );
};

export { PostsList };
