import { POSTS_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/live";
import { PostCard } from "@/components/post-card";
import { Categories } from "@/components/categories";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({
  searchParams,
}: HomeProps) {
  const selectedCategory = Array.isArray(searchParams.category)
    ? searchParams.category[0] || ""
    : searchParams.category ?? "";

  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY,
    params: { category: selectedCategory }
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center"> Blog</h1>
      <Categories selectedCategory={selectedCategory} />
      {posts?.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post as any} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
