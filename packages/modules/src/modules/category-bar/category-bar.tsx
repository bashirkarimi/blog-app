"use client";

import { useMemo } from "react";
import { PostCardModule } from "../../types";

export interface CategoryCount {
  title: string;
  count: number;
}

interface CategoryBarProps {
  posts: PostCardModule[];
  selectedCategory: string; // controlled selection
  onSelect: (title: string) => void; // callback to parent
}

// Derives category list (with counts) from provided posts.
// Filtering of posts happens in parent; this component focuses only on
// computing categories + rendering selection UI.
const CategoryBar = ({
  posts,
  selectedCategory,
  onSelect,
}: CategoryBarProps) => {
  const categories: CategoryCount[] = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((p) => {
      p.categories?.forEach((c) => {
        const title = c?.title?.trim();
        if (!title) return;
        map.set(title, (map.get(title) || 0) + 1);
      });
    });
    return Array.from(map.entries())
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [posts]);

  if (categories.length === 0) return null;

  return (
    <div className="py-4" role="navigation" aria-label="Filter by category">
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            type="button"
            onClick={() => onSelect("")}
            aria-pressed={selectedCategory === ""}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              selectedCategory === ""
                ? "bg-blue-800 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            All
          </button>
        </li>
        {categories.map((cat) => {
          const active = cat.title === selectedCategory;
          return (
            <li key={cat.title}>
              <button
                type="button"
                onClick={() => onSelect(cat.title)}
                aria-pressed={active}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-800 text-white"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}
              >
                {cat.title}
                {cat.count > 1 && (
                  <span
                    className={`ml-1 inline-block rounded-full px-1 text-xs ${
                      active
                        ? "bg-white text-blue-800"
                        : "border border-gray-400 text-gray-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { CategoryBar };
