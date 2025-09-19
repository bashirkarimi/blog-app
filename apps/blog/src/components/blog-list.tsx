import { PAGINATED_POSTS_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/live";
import type { BlogList } from "@/sanity/types";
import { BlogItem } from "./blog-item";
import { CategoryFilter } from "./category-filter";

interface BlogListProps {
  data?: BlogList;
}

const BlogList = async ({ data }: BlogListProps) => {
  const limit = Math.max(Number(data?.limit ?? 6), 1);
  const mode = data?.mode ?? "latest";

  // Initial unfiltered slice
  const { data: initial } = await sanityFetch({
    query: PAGINATED_POSTS_QUERY,
    params: { offset: 0, limit, category: "", mode },
  });

  const initialPosts = initial?.posts ?? [];
  const total = initial?.total ?? initialPosts.length;

  if (initialPosts.length === 0) {
    return (
      <section className="w-full mx-auto" aria-labelledby="blog-title">
        <h2
          id="blog-title"
          className="text-3xl font-bold text-gray-900 sm:text-4xl"
        >
          {data?.title ?? "From the blog"}
        </h2>
        <p className="mt-8 text-gray-500">No posts yet.</p>
      </section>
    );
  }

  return (
    <section className="w-full mx-auto" aria-labelledby="blog-title">
      <h2
        id="blog-title"
        className="text-3xl font-bold text-gray-900 sm:text-4xl"
      >
        {data?.title ?? "From the blog"}
      </h2>

      <CategoryFilter>
        {(categoriesCounts) => (
          <BlogItem
            initialPosts={initialPosts}
            total={total}
            pageSize={limit}
            mode={mode}
            categoriesCounts={categoriesCounts}
          />
        )}
      </CategoryFilter>
    </section>
  );
};

export { BlogList };
