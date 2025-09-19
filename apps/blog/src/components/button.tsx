"use client";

import { useTransition } from "react";

interface ButtonProps {
  onClick: () => Promise<void> | void;
  disabled?: boolean;
  hasMore: boolean;
  label?: string;
}

export function Button({
  onClick,
  disabled,
  hasMore,
  label = "Load more",
}: ButtonProps) {
  const [isPending, startTransition] = useTransition();

  if (!hasMore) return null;

  return (
    <button
      onClick={() => startTransition(() => onClick())}
      disabled={disabled || isPending}
      className="mt-8 px-4 py-2 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 hover:cursor-pointer disabled:opacity-50"
      type="button"
      aria-busy={isPending}
    >
      {isPending ? "Loading..." : label}
    </button>
  );
}
