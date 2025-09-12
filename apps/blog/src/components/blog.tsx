import { PostCard } from "./post-card";
import { BlogList } from "@/sanity/types";

interface BlogProps {
  data?: BlogList;
}

const Blog = ({ data }: BlogProps) => {
  return (
    <section
      className="w-full px-4 py-24 mx-auto sm:px-6 lg:px-8"
      aria-labelledby="blog-title"
    >
      <h2
        id="blog-title"
        className="text-3xl font-bold text-gray-900 sm:text-4xl"
      >
        {data?.title ?? "From the blog"}
      </h2>
      {data?.posts && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(data.posts).map((post: any) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export { Blog };
