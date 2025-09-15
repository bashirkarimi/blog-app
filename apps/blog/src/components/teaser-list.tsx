import Link from "next/link";

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
        <div key={i} className="rounded border p-4">
          <h3 className="font-semibold">{it.title}</h3>
          {it.summary && (
            <p className="text-sm text-gray-500 mt-1">{it.summary}</p>
          )}
          {it.href && (
            <Link className="text-blue-600 mt-2 inline-block" href={it.href}>
              Read more →
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
