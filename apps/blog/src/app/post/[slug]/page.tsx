import { urlFor } from "@/sanity/image";
import { POST_BY_SLUG_QUERY } from "@/sanity/queries";
import { POST_SLUGS_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/live";
import { client } from "@/sanity/client"; // use raw client for build-time SSG
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@/components/rich-text";
import { notFound } from "next/navigation";
import { Button } from "@repo/ui/button";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const slugs: { slug: string | null }[] =
      await client.fetch(POST_SLUGS_QUERY);

    return (slugs || []).map((s) => ({ slug: s.slug as string }));
  } catch (err) {
    console.warn(
      "generateStaticParams: failed to fetch slugs, falling back to empty list",
      err,
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
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <Button variant={"outline"} className="mb-4" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <article className="p-8 md:p-12">
          <header className="grid">
            <h1 className="order-2 mt-4">{post?.title}</h1>
            {post?.mainImage && (
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post?.title ?? ""}
                className="aspect-video max-h-96 w-full object-cover object-center"
                width={600}
                height={400}
              />
            )}
            <div className="order-3 mb-6 text-sm text-gray-500">
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
          </header>
          <div className="mx-auto mt-10 w-[var(--layout-max-reading)] space-y-6">
            <RichText data={post} />
          </div>
        </article>
      </div>
    </div>
  );
}
