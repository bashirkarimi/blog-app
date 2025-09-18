"use client";

import { useState, useCallback, Suspense } from "react";
import { Button } from "./button";
import { PostCard } from "./post-card";
import { Post } from "@/sanity/types";
import { Categories } from "./categories";

interface BlogPostsClientProps {
  initialPosts: Extract<Post, "_weak" | "_type" | "_createdAt" | "_updatedAt" | "_rev" | "_ref">[];
  total: number;
  pageSize: number;
  mode?: string;
}

export function BlogPostsClient({
  initialPosts,
  total,
  pageSize,
  mode = "latest",
}: BlogPostsClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [loading, setLoading] = useState(false);

  const hasMore = posts.length < total;
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log("Selected category in BlogPostsClient:", selectedCategory);

  const categoryCounts = posts
    .flatMap((post) => post?.categories?.map((c) => c.title as string) ?? [])
    .reduce<Record<string, number>>((acc, title) => {
      acc[title] = (acc[title] || 0) + 1;
      return acc;
    }, {});

  const categories = Object.entries(categoryCounts).map(
    ([title, count]) => { return { title, count } }
  );

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        offset: String(posts.length),
        limit: String(pageSize),
        mode,
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
      console.warn(e.message || "Failed to load more posts");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, posts.length, pageSize, mode, ]);

  return (
    <div className="mt-8">
      <Suspense fallback={<div className="py-4">Loading categories...</div>}>
        <Categories
          selectedCategory={selectedCategory}
          categories={categories}
          setSelectedCategory={setSelectedCategory}
        />
      </Suspense>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li key={post._id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <Button
          onClick={loadMore}
          disabled={loading}
          hasMore={hasMore}
          label={loading ? "Loading..." : "Load more"}
        />
      </div>
    </div>
  );
}
