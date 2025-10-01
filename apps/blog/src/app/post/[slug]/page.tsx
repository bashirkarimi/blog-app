import { urlFor } from "@/sanity/image";
import { POST_BY_SLUG_QUERY } from "@/sanity/queries";
import { POST_SLUGS_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/live";
import { client } from "@/sanity/client"; // use raw client for build-time SSG
import Image from "next/image";
import { NavigateHome } from "@/components/navigate-home";
import { RichText } from "@/components/rich-text";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const slugs: { slug: string | null }[] = await client.fetch(POST_SLUGS_QUERY);

    return (slugs || [])
      .map((s) => ({ slug: s.slug as string }));
  } catch (err) {
    console.warn(
      "generateStaticParams: failed to fetch slugs, falling back to empty list",
      err
    );
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!post) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <NavigateHome />
        <article className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
          {post?.mainImage && (
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post?.title ?? ""}
              className="w-full max-h-96 object-cover object-center aspect-video"
              width={600}
              height={400}
            />
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 my-2 pt-2 leading-tight">
            {post?.title}
          </h1>
          <div className="text-sm text-gray-500 mb-6">
            <span>By {post?.author?.name}</span>
            <span className="ml-4">
              Published on{" "}
              {post?.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString()
                : ""}
            </span>
            <span className="ml-4">
              Updated on{" "}
              {post?._updatedAt
                ? new Date(post._updatedAt).toLocaleDateString()
                : ""}
            </span>
          </div>
          <div className="prose max-w-[80%] mx-auto mt-10 text-gray-700 leading-relaxed space-y-6">
            <RichText data={post} />
          </div>
        </article>
      </div>
    </div>
  );
}
