"use client";

import { useTransition } from "react";

interface LoadMoreButtonProps {
  onClick: () => Promise<void> | void;
  disabled?: boolean;
  hasMore: boolean;
  label?: string;
}

export function LoadMoreButton({
  onClick,
  disabled,
  hasMore,
  label = "Load more",
}: LoadMoreButtonProps) {
  const [isPending, startTransition] = useTransition();

  if (!hasMore) return null;

  return (
    <button
      onClick={() => startTransition(() => onClick())}
      disabled={disabled || isPending}
      className="mt-8 px-4 py-2 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
      type="button"
      aria-busy={isPending}
    >
      {isPending ? "Loading..." : label}
    </button>
  );
}
