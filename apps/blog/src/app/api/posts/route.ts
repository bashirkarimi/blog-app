import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { PAGINATED_POSTS_QUERY } from "@/sanity/queries";

// Force dynamic so pagination isn't cached accidentally
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const rawLimit = Number(searchParams.get("limit") ?? 6);
    const rawOffset = Number(searchParams.get("offset") ?? 0);
    const limit = Math.min(Math.max(isNaN(rawLimit) ? 6 : rawLimit, 1), 50);
    const offset = Math.max(isNaN(rawOffset) ? 0 : rawOffset, 0);

    const mode = searchParams.get("mode") ?? "latest";
    const category = searchParams.get("category") ?? "";

    const data = await client.fetch(PAGINATED_POSTS_QUERY, {
      offset,
      limit,
      mode,
      category,
    });

    const posts = Array.isArray(data?.posts) ? data.posts : [];
    const total = typeof data?.total === "number" ? data.total : posts.length;
    const hasMore = offset + posts.length < total;

    return NextResponse.json({
      posts,
      total,
      offset,
      limit,
      hasMore,
      mode,
      category,
    });
  } catch (err: any) {
    console.error("[GET /api/posts] error:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
