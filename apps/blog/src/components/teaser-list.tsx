import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
export const TeaserList = ({ data }: { data: any }) => {
  const items =
    data.mode === "posts"
      ? (data.postRefs || []).map((p: any) => ({
          title: p?.title,
          summary: p?.excerpt,
          href: `/posts/${p?.slug}`,
          image: p?.mainImage,
        }))
      : data.items || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((it: any, i: number) => (
        <div key={i} className="rounded-md border overflow-hidden flex flex-col h-full">
          <Image
            src={urlFor(it.image).url()}
            alt={it.title ?? "Image"}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold">{it.title}</h3>
            {it.summary && (
              <p className="text-sm text-gray-500 mt-1 not-last:mb-2">{it.summary}</p>
            )}
            {it.href && (
              <Link className="text-blue-600 inline-block md:mt-auto" href={it.href}>
                Read more →
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
