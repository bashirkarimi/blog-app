import { sanityFetch } from "@/sanity/live";
import { CATEGORIES_IN_POST_QUERY } from "@/sanity/queries";
import Link from "next/link";

const Categories = async ({
  selectedCategory,
}: {
  selectedCategory: string;
}) => {
  const { data: allCategories } = await sanityFetch({
    query: CATEGORIES_IN_POST_QUERY,
  });
  type Cat = { categories: string[] };
  const typedCategories = (allCategories ?? []) as Cat[];

  const counts = typedCategories.reduce(
    (acc: Record<string, number>, c: Cat) => {
      const key = c?.categories?.[0] ?? "";
      if (!key) return acc;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const uniqueCategories = Array.from(
    new Set(typedCategories.map((c) => c.categories[0]))
  ).map((title): { title: string; count: number } => ({
    title,
    count: counts?.[title] || 0,
  }));

  const activeCategory = selectedCategory;

  return (
    <div className="py-8">
      <h2 className="sr-only">Categories</h2>
      <ul className="flex flex-wrap gap-2 mb-8 ">
        <li>
          <a
            href={
              activeCategory === ""
                ? "."
                : `?category=${encodeURIComponent("")}`
            }
            aria-current={activeCategory === "" ? "true" : undefined}
            className={`text-sm font-medium mr-2 px-3 py-1 rounded-full transition-colors ${
              activeCategory === ""
                ? "bg-blue-800 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            All
          </a>
        </li>
        {uniqueCategories.map((category, index) => (
          <li key={index}>
            <Link
              href={
                activeCategory === category.title
                  ? "."
                  : `?category=${encodeURIComponent(category.title)}`
              }
              aria-current={
                activeCategory === category.title ? "true" : undefined
              }
              className={`text-sm font-medium mr-2 px-3 py-1 rounded-full transition-colors ${
                activeCategory === category.title
                  ? "bg-blue-800 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              {category.title}
              {category.count > 1 && (
                <span
                  className={`rounded-full px-1 text-xs ml-1 ${
                    activeCategory === category.title
                      ? "bg-white text-blue-800"
                      : "text-gray-500 border border-gray-500"
                  }`}
                >
                  {category.count}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Categories };
