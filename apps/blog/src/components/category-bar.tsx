"use client";

import { CategoryCount } from "./category-filter";

interface CategoryBarProps {
  categories: CategoryCount[];
  selectedCategory: string;
  onSelect: (title: string) => void;
}

const CategoryBar = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryBarProps) => {
  return (
    <div className="py-4" role="navigation" aria-label="Filter by category">
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            type="button"
            onClick={() => onSelect("")}
            aria-pressed={selectedCategory === ""}
            className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
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
                className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
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
                        : "text-gray-600 border border-gray-400"
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
