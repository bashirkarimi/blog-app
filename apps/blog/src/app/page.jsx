import { POSTS_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/live";

export default async function Home() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-center"> Blog</h1>
    </div>
  );
}
