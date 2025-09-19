import { CATEGORIES_WITH_COUNTS_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/live";
import React from "react";

export interface CategoryCount {
  title: string;
  count: number;
}

interface CategoryFilterProps {
  children: (categories: CategoryCount[]) => React.ReactNode;
  /**
   * Optional revalidation (seconds). Remove or adjust for your caching strategy.
   */
  revalidateSeconds?: number;
}

const CategoryFilter = async ({ children }: CategoryFilterProps) => {
  const { data } = await sanityFetch({
    query: CATEGORIES_WITH_COUNTS_QUERY,
    params: {},
  });

  const categories: CategoryCount[] = Array.isArray(data)
    ? data
        .filter((c: any) => c?.title)
        .map((c: any) => ({
          title: c.title as string,
          count: c.count as number,
        }))
    : [];

  return <>{children(categories)}</>;
};

export { CategoryFilter };
