"use client";

import { useState, useCallback } from "react";
import { LoadMoreButton } from "./button";
import { PostCard } from "./post-card";
import { Post } from "@/sanity/types";

interface BlogPostsClientProps {
  initialPosts: Extract<Post, "_weak" | "_type" | "_createdAt" | "_updatedAt" | "_rev" | "_ref">[];
  total: number;
  pageSize: number;
  mode?: string;
  category?: string;
}

export function BlogPostsClient({
  initialPosts,
  total,
  pageSize,
  mode = "latest",
  category = "",
}: BlogPostsClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMore = posts.length < total;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        offset: String(posts.length),
        limit: String(pageSize),
        mode,
        category,
      });
      const res = await fetch(`/api/posts?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const json = await res.json();
      const incoming: Post[] = json?.posts || [];
      if (!Array.isArray(incoming)) {
        throw new Error("Malformed response (posts not array)");
      }
      setPosts((prev) => [...prev, ...incoming]);
    } catch (e: any) {
      setError(e.message || "Failed to load more posts");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, posts.length, pageSize, mode, category]);

  return (
    <div className="mt-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <li key={post._id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>

      {error && (
        <p className="mt-4 text-sm text-red-600 text-center" role="alert">
          {error}
        </p>
      )}

      <div className="flex justify-center">
        <LoadMoreButton
          onClick={loadMore}
          disabled={loading}
          hasMore={hasMore}
          label={loading ? "Loading..." : "Load more"}
        />
      </div>
    </div>
  );
}
