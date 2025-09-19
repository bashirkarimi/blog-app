"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "./button";
import { PostCard } from "./post-card";
import { Post } from "@/sanity/types";
import { Categories } from "./categories";

interface BlogPostsClientProps {
  initialPosts: Post[];
  total: number;
  pageSize: number;
  mode?: string;
  category?: string; // reserved if you later do server-side category fetching
}

export function BlogPostsClient({
  initialPosts,
  total,
  pageSize,
  mode = "latest",
}: BlogPostsClientProps) {
  const [allPosts, setAllPosts] = useState<Post[]>(initialPosts || []);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const hasMore = allPosts.length < total;

  // Derive visible posts (do not overwrite allPosts)
  const visiblePosts = useMemo(() => {
    if (!selectedCategory) return allPosts;
    return allPosts.filter((post) =>
      post.categories?.some((c: any) => c.title as string === selectedCategory)
    );
  }, [allPosts, selectedCategory]);

  // Category counts based on all loaded posts (not filtered) so counts stay stable
  const categories = useMemo(() => {
    const counts = allPosts
      .flatMap((p) => p?.categories?.map((c: any) => c.title as string) || [])
      .reduce<Record<string, number>>((acc, title) => {
        acc[title] = (acc[title] || 0) + 1;
        return acc;
      }, {});
    return Object.entries(counts).map(([title, count]) => ({ title, count }));
  }, [allPosts]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        offset: String(allPosts.length),
        limit: String(pageSize),
        mode,
      });
      const res = await fetch(`/api/posts?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const incoming: Post[] = Array.isArray(json?.posts) ? json.posts : [];

      // Deduplicate by _id (defensive)
      const existing = new Set(allPosts.map((p) => p._id));
      const merged = [
        ...allPosts,
        ...incoming.filter((p) => !existing.has(p._id)),
      ];
      setAllPosts(merged);
    } catch (e) {
      console.warn((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, allPosts, pageSize, mode]);

  return (
    <div className="mt-8">
      <Categories
        selectedCategory={selectedCategory}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
      />

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <li key={post._id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>

      {visiblePosts.length === 0 && (
        <p className="mt-6 text-sm text-center text-gray-500">
          No posts for this category.
        </p>
      )}

      <div className="flex justify-center">
        <Button
          onClick={loadMore}
          disabled={loading || !hasMore}
          hasMore={hasMore}
          label={
            loading ? "Loading..." : hasMore ? "Load more" : "No more posts"
          }
        />
      </div>
    </div>
  );
}
