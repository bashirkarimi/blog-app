"use client";

import { useState, useCallback, useMemo } from "react";
import { PostCard } from "@repo/modules/post-card";
import { PostCardModule } from "../../types";
import { Button } from "@repo/ui/button";
import { CategoryBar } from "@repo/modules/category-bar";

// Keeping CategoryCount for potential future category filter reinstatement
interface CategoryCount {
  title: string;
  count: number;
}

interface BlogItemProps {
  initialPosts: PostCardModule[];
  limit: number; // number of posts to show per "page"
  mode?: string; // preserved for API compatibility (unused now)
  categoriesCounts?: CategoryCount[]; // deprecated, no longer used; kept for backwards compatibility
}

const BlogItem = ({
  initialPosts,
  limit,
}: BlogItemProps) => {
  // Ensure limit is at least 1
  const pageSize = Math.max(1, Number(limit) || 1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return initialPosts;
    return initialPosts.filter((p) =>
      p.categories?.some((c) => c?.title === selectedCategory)
    );
  }, [initialPosts, selectedCategory]);

  const totalPosts = filteredPosts.length;

  // visibleCount tracks how many posts are currently displayed
  const [visibleCount, setVisibleCount] = useState<number>(pageSize);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < totalPosts;

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    setVisibleCount((prev) => Math.min(prev + pageSize, totalPosts));
  }, [hasMore, pageSize, totalPosts]);

  const onSelectCategory = useCallback((title: string) => {
    setSelectedCategory(title);
    // reset pagination when category changes
    setVisibleCount(pageSize);
  }, [pageSize]);

  if (totalPosts === 0) {
    return (
      <div className="mt-8">
        <p className="mt-6 text-center text-sm text-gray-500">No posts.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <CategoryBar posts={initialPosts} selectedCategory={selectedCategory} onSelect={onSelectCategory} />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <li key={post._id}>
            <PostCard data={post} href={`post/${post.slug}`} />
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-8">
        <Button
          onClick={loadMore}
          disabled={!hasMore}
          variant="default"
          aria-disabled={!hasMore}
        >
          {hasMore ? "Load more" : "No more posts"}
        </Button>
      </div>
    </div>
  );
};

export { BlogItem };
