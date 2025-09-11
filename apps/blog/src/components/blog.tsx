import { PostCard } from "./post-card";
const Blog = ({ data }: { data: any }) => {
  return (
    <section
      className="w-full  px-4 py-24 mx-auto sm:px-6 lg:px-8"
      aria-labelledby="blog-title"
    >
      <h2
        id="blog-title"
        className="text-3xl font-bold text-center text-gray-900 sm:text-4xl"
      >
        From the blog
      </h2>
      {data?.length && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((post: any) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) }
    </section>
  );
};

export { Blog };
