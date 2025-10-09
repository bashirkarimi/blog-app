
import { BlogItem } from "@repo/modules/blog-item";
import { BlogListModule } from "../../types";
interface BlogListProps {
  data?: BlogListModule;
}

const BlogList = ({ data }: BlogListProps) => {
  const limit = Math.max(Number(data?.limit ?? 6), 1);
  const initialPosts = data?.posts ?? [];

  if (initialPosts.length === 0) return null;

  return (
    <section className="w-full mx-auto" aria-labelledby="blog-title">
      <h2
        id="blog-title"
        className="text-3xl font-bold text-gray-900 sm:text-4xl"
      >
        {data?.title ?? "From the blog"}
      </h2>
      <BlogItem initialPosts={initialPosts} limit={limit} />
    </section>
  );
};

export { BlogList };
