import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// Content variants affect inner content width only (padding applied by Section wrapper).
const SectionContentVariant = cva("w-full", {
  variants: {
    variant: {
      default: "mx-auto max-w-[var(--layout-max-content)]",
      narrow: "mx-auto max-w-[var(--layout-max-reading)]",
      fullWidth: "w-full", // still constrained by page wrapper (max page variable)
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: "none" | "gray";
  variant?: VariantProps<typeof SectionContentVariant>["variant"];
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { className, background = "none", variant = "default", children, ...props },
    ref,
  ) => {
    const hasBg = background === "gray";
    return (
      <section
        ref={ref}
        className={twMerge(
          "mx-auto w-full max-w-[var(--layout-max)]",
          hasBg ? "bg-gray-100 dark:bg-gray-900" : "",
          className,
        )}
        style={{ contentVisibility: "auto" }}
        {...props}
      >
        <div
          className={twMerge(
            "px-4 py-10 md:px-8 md:py-16",
            hasBg
              ? "mx-auto max-w-[var(--layout-max-panel)]"
              : SectionContentVariant({ variant }),
          )}
        >
          {hasBg ? (
            <div className={SectionContentVariant({ variant })}>{children}</div>
          ) : (
            children
          )}
        </div>
      </section>
    );
  },
);
Section.displayName = "Section";

const SectionTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={twMerge("mb-4 text-2xl font-bold md:mb-10", className)}
      {...props}
    />
  );
});
SectionTitle.displayName = "SectionTitle";

const SectionContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof SectionContentVariant>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(SectionContentVariant({ variant }), className)}
      {...props}
    />
  );
});
SectionContent.displayName = "SectionContent";

export { Section, SectionTitle, SectionContent };
