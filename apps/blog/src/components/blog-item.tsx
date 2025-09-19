"use client";

import { useState, useCallback } from "react";
import { CategoryBar } from "./category-bar";
import { PostCard } from "./post-card";
import { POSTS_QUERYResult } from "@/sanity/types";

interface CategoryCount {
  title: string;
  count: number;
}

interface StoreEntry {
  posts: POSTS_QUERYResult[number][];
  total: number;
  loading?: boolean;
  error?: string | null;
}

type StoreMap = Record<string, StoreEntry>;

interface BlogItemProps {
  initialPosts: POSTS_QUERYResult[number][];
  total: number;
  pageSize: number;
  mode?: string;
  categoriesCounts?: CategoryCount[];
}

const BlogItem = ({
  initialPosts,
  total,
  pageSize,
  mode = "latest",
  categoriesCounts = [],
}: BlogItemProps) => {
  const [stores, setStores] = useState<StoreMap>({
    "": { posts: initialPosts, total, loading: false, error: null },
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const key = selectedCategory || "";
  const current = stores[key] || { posts: [], total: 0, loading: false };

  const hasMore = current.posts.length < current.total;
  const isLoading = !!current.loading;

  const patchStore = useCallback((k: string, patch: Partial<StoreEntry>) => {
    setStores((prev) => ({
      ...prev,
      [k]: { ...(prev[k] || { posts: [], total: 0 }), ...patch },
    }));
  }, []);

  const fetchPage = useCallback(
    async (category: string, offset: number) => {
      const k = category || "";
      patchStore(k, { loading: true, error: null });

      try {
        const params = new URLSearchParams({
          offset: String(offset),
          limit: String(pageSize),
          mode,
        });
        if (category) params.set("category", category);

        const res = await fetch(`/api/posts?${params.toString()}`, {
          cache: "no-cache",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const incoming: POSTS_QUERYResult[number][] = Array.isArray(json.posts)
          ? json.posts
          : [];
        const totalForCat =
          typeof json.total === "number"
            ? json.total
            : offset + incoming.length;

        setStores((prev) => {
          const existing = prev[k]?.posts ?? [];
          const existingIds = new Set(existing.map((p) => p._id));
          const merged = [
            ...existing,
            ...incoming.filter((p) => !existingIds.has(p._id)),
          ];
          return {
            ...prev,
            [k]: {
              posts: merged,
              total: totalForCat,
              loading: false,
              error: null,
            },
          };
        });
      } catch (e: unknown) {
        patchStore(k, {
          loading: false,
          error: (e as Error).message || "Failed to load posts",
        });
      }
    },
    [mode, pageSize, patchStore]
  );

  const onSelectCategory = useCallback(
    (cat: string) => {
      setSelectedCategory(cat);
      const k = cat || "";
      if (!stores[k]) {
        setStores((prev) => ({
          ...prev,
          [k]: { posts: [], total: 0, loading: true, error: null },
        }));
        fetchPage(cat, 0);
      }
    },
    [stores, fetchPage]
  );

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    fetchPage(selectedCategory, current.posts.length);
  }, [isLoading, hasMore, fetchPage, selectedCategory, current.posts.length]);

  return (
    <div className="mt-8">
      <CategoryBar
        categories={categoriesCounts}
        selectedCategory={selectedCategory}
        onSelect={onSelectCategory}
      />

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {current.posts.map((post) => (
          <li key={post._id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>

      {current.error && (
        <p className="mt-4 text-center text-sm text-red-600" role="alert">
          {current.error}
        </p>
      )}

      {!isLoading && current.posts.length === 0 && !current.error && (
        <p className="mt-6 text-center text-sm text-gray-500">
          No posts{selectedCategory && ` in “${selectedCategory}”`}.
        </p>
      )}

      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={loadMore}
          disabled={!hasMore || isLoading}
          className="px-4 py-2 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          aria-busy={isLoading}
        >
          {isLoading ? "Loading..." : hasMore ? "Load more" : "No more posts"}
        </button>
      </div>
    </div>
  );
}

export { BlogItem };
