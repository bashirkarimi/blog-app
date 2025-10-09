"use client";

import { useState, useCallback, useMemo } from "react";
import { BlogListModule } from "../../types";
import { CategoryBar } from "@repo/modules/category-bar";
import { PostCard } from "@repo/modules/post-card";
import { Button } from "@repo/ui/button";

interface BlogListProps {
  data?: BlogListModule;
}

const BlogList = ({ data }: BlogListProps) => {
  const initialPosts = data?.posts ?? [];
  const pageSize = Math.max(1, Number(data?.limit ?? 6));

  // Preserve original BlogList behavior: hide entirely if no posts
  if (initialPosts.length === 0) return null;

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(pageSize);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return initialPosts;
    return initialPosts.filter((p) =>
      p.categories?.some((c) => c?.title === selectedCategory)
    );
  }, [initialPosts, selectedCategory]);

  const totalPosts = filteredPosts.length;
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < totalPosts;

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    setVisibleCount((prev) => Math.min(prev + pageSize, totalPosts));
  }, [hasMore, pageSize, totalPosts]);

  const onSelectCategory = useCallback(
    (title: string) => {
      setSelectedCategory(title);
      setVisibleCount(pageSize);
    },
    [pageSize]
  );

  return (
    <div className="mt-8">
      <CategoryBar
        posts={initialPosts}
        selectedCategory={selectedCategory}
        onSelect={onSelectCategory}
      />
      {totalPosts === 0 ? (
        <p className="mt-6 text-center text-sm text-gray-500">No posts.</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export { BlogList };
