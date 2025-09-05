import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/image";
import { POST_BY_SLUG_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/live";
import Image from "next/image";
import { NavigateHome } from "@/components/navigate-home";

export default async function Page({ params }) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-3xl">
        <NavigateHome />
        <article className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
          {post?.mainImage && (
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="w-full h-auto object-cover object-center"
              width={600}
              height={400}
            />
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
            {post?.title}
          </h1>
          <div className="text-sm text-gray-500 mb-6">
            <span>By {post?.author}</span>
            <span className="ml-4">
              Published on {new Date(post?.publishedAt).toLocaleDateString()}
            </span>
            <span className="ml-4">
              Updated on {new Date(post?._updatedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
            <PortableText value={post?.body} />
          </div>
        </article>
      </div>
    </div>
  );
}
