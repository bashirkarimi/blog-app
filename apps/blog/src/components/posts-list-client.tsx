"use client";
import { PortableText } from "next-sanity";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import Link from "next/link";

type Tag = { title: string; slug: string };
type Item = {
  title: string;
  body?: any;
  slug: string;
  mainImage?: any;
  tags?: Tag[];
};

const PostsListClient = (props: {
  id: string;
  title?: string;
  showTags: boolean;
  moreLinkMode: "client" | "link";
  moreLinkLabel: string;
  moreHref?: string;
  limit: number;
  sort: "newest" | "oldest";
  initialItems: Item[];
  total: number;
  initialTags: string[];
  availableTags: Tag[];
}) => {
  const {
    id,
    title,
    showTags,
    moreLinkMode,
    moreLinkLabel,
    moreHref,
    limit,
    sort,
    initialItems,
    total,
    initialTags,
    availableTags,
  } = props;

  const [items, setItems] = useState<Item[]>(initialItems);
  const [activeTags, setActiveTags] = useState<string[]>(initialTags);
  const [hasMore, setHasMore] = useState<boolean>(initialItems.length < total);
  const [pending, startTransition] = useTransition();

  const offsetRef = useRef<number>(initialItems.length);
  const abortRef = useRef<AbortController | null>(null);

  const tagParam = useMemo(
    () => (activeTags.length ? activeTags.join(",") : ""),
    [activeTags]
  );

  const doFetch = useCallback(
    async (nextOffset: number, append: boolean) => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      const sp = new URLSearchParams();
      sp.set("limit", String(limit));
      sp.set("offset", String(nextOffset));
      sp.set("sort", sort);
      if (tagParam) sp.set("tags", tagParam);

      const res = await fetch(`/api/posts?${sp.toString()}`, {
        signal: ac.signal,
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load posts");
      const json = (await res.json()) as {
        items: Item[];
        total: number;
        offset: number;
        limit: number;
        hasMore: boolean;
      };

      setHasMore(json.hasMore);
      offsetRef.current = json.offset + json.items.length;
      setItems((prev) => (append ? [...prev, ...json.items] : json.items));
    },
    [limit, sort, tagParam]
  );

  // When filters change, refetch from 0
  useEffect(() => {
    startTransition(() => doFetch(0, false));
  }, [tagParam, limit, sort, doFetch]);

  const onToggleTag = (slug: string) => {
    setActiveTags((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };
  const onClearTags = () => setActiveTags([]);

  const onLoadMore = () => {
    if (!hasMore || pending) return;
    startTransition(() => doFetch(offsetRef.current, true));
  };

  console.log("item ", items);

  return (
    <div data-posts-module={id} className="space-y-4">
      {title && <h3 className="text-2xl font-semibold">{title}</h3>}

      {showTags && availableTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {availableTags.map((t) => {
            const active = activeTags.includes(t.slug);
            return (
              <button
                key={t.slug}
                onClick={() => onToggleTag(t.slug)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700"
                } ${pending ? "opacity-60 pointer-events-none" : ""}`}
                aria-pressed={active}
              >
                {t.title}
              </button>
            );
          })}
          {activeTags.length > 0 && (
            <button
              onClick={onClearTags}
              className="px-3 py-1 rounded-full text-sm border bg-gray-100"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/post/${p.slug}`}
            className="rounded border p-4 hover:shadow-sm transition"
          >
            <h4 className="font-semibold">{p.title}</h4>
            {p.body && <PortableText value={p.body[0]} />}
            {p.tags?.length ? (
              <div className="mt-2 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <span
                    key={t.slug}
                    className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
                  >
                    {t.title}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>

      {/* Load more */}
      {moreLinkMode === "client" ? (
        <>
          {hasMore ? (
            <div className="text-center">
              <button
                onClick={onLoadMore}
                disabled={pending}
                className="mt-2 inline-flex items-center rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
              >
                {pending ? "Loading…" : moreLinkLabel}
              </button>
              <div className="text-xs text-gray-500 mt-1">
                Showing {items.length}
                {/* of unknown total since filters can change but UX is fine */}
              </div>
            </div>
          ) : (
            <div className="text-center text-sm text-gray-500">
              {items.length
                ? `Showing all ${items.length} post${
                    items.length > 1 ? "s" : ""
                  }`
                : "No posts found"}
            </div>
          )}
        </>
      ) : moreHref ? (
        <div className="text-center">
          <Link
            href={moreHref}
            className="mt-2 inline-block rounded bg-blue-600 px-4 py-2 text-white"
          >
            {moreLinkLabel || "View all posts"}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export { PostsListClient };
