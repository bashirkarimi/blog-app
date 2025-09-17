import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "6", 10), 50);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);
    const sort = (searchParams.get("sort") || "newest") as "newest" | "oldest";
    const tagSlugs = (searchParams.get("tags") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const order = sort === "oldest" ? "asc" : "desc";

    const tagFilter = tagSlugs.length
      ? `&& count((tags[]->slug.current)[@ in ${JSON.stringify(tagSlugs)}]) > 0`
      : "";

    const baseFilter = `*[_type=='post' ${tagFilter}]`;

    const itemsQuery = groq`${baseFilter} | order(_createdAt ${order}) [${offset}...${
      offset + limit
    }] {
      title, body, mainImage, "slug": slug.current,
      tags[]->{ title, "slug": slug.current }
    }`;

    const countQuery = groq`count(${baseFilter})`;

    const [items, total] = await Promise.all([
      client.fetch(itemsQuery),
      client.fetch(countQuery),
    ]);

    // Available tags for this filter context (only tags that appear in published posts)
    const tagsQuery = groq`*[_type=='tag' && defined(slug.current) && count(*[_type=='post' && references(^._id)]) > 0]{ title, "slug": slug.current } | order(title asc)`;
    const allTags = await client.fetch(tagsQuery);

    return NextResponse.json({
      items,
      total,
      offset,
      limit,
      hasMore: offset + items.length < total,
      tags: allTags,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
