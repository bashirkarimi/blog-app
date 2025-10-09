
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
    <div>
      <BlogItem initialPosts={initialPosts} limit={limit} />
    </div>
  );
};

export { BlogList };
