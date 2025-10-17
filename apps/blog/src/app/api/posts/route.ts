import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { PAGINATED_POSTS_QUERY } from "@/sanity/queries";

// Force dynamic so pagination isn't cached accidentally
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 6, 1),
      50,
    );
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);
    const category = searchParams.get("category") || "";
    const mode = searchParams.get("mode") || "latest";

    const data = await client.fetch(PAGINATED_POSTS_QUERY, {
      offset,
      limit,
      category,
      mode,
    });

    const posts = data?.posts ?? [];
    const total = data?.total ?? posts.length;
    const hasMore = offset + posts.length < total;

    return new Response(
      JSON.stringify({ posts, total, offset, limit, hasMore, category }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (e: unknown) {
    return new Response(
      JSON.stringify({ error: (e as Error).message || "Unknown error" }),
      { status: 500 },
    );
  }
}
