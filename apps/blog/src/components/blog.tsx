import { PAGINATED_POSTS_QUERY } from "@/sanity/queries";
import { BlogList } from "@/sanity/types";
import { sanityFetch } from "@/sanity/live";
import { BlogPostsClient } from "./blog-client";

interface BlogProps {
  data?: BlogList;
}

const Blog = async ({ data }: BlogProps) => {
  const limit = Math.max(Number(data?.limit ?? 6), 1);
  const mode = data?.mode ?? "latest";
  const category = ""; // extend later if category filtering added

  let initialItems: any = data?.posts || [];
  let total = initialItems?.length ?? 0;

  // For dynamic (latest) lists always fetch fresh initial slice server-side
  if (mode === "latest") {
    const { data: queryData } = await sanityFetch({
      query: PAGINATED_POSTS_QUERY,
      params: { offset: 0, limit, mode, category },
    });
    initialItems = queryData?.posts ?? [];
    total = queryData?.total ?? initialItems?.length;
  }

  return (
    <section
      className="w-full mx-auto "
      aria-labelledby="blog-title"
    >
      <h2
        id="blog-title"
        className="text-3xl font-bold text-gray-900 sm:text-4xl"
      >
        {data?.title ?? "From the blog"}
      </h2>

      {initialItems && initialItems.length > 0 ? (
        <BlogPostsClient
          initialPosts={initialItems}
          total={total}
          pageSize={limit}
          mode={mode}
          category={category}
        />
      ) : (
        <p className="mt-8 text-gray-500">No posts yet.</p>
      )}
    </section>
  );
};

export { Blog };
