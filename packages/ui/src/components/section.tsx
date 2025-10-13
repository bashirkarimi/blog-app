import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SectionContentVariant = cva("py-4", {
  variants: {
    variant: {
      default: "",
      narrow: "px-4 md:px-6 lg:px-8 max-w-3xl mx-auto",
    },
    background: {
      none: "",
      gray: "bg-gray-50 dark:bg-gray-900",
    },
  },
  defaultVariants: {
    variant: "default",
    background: "none",
  },
});

const Section = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={twMerge("my-8 md:my-12", className)}
        style={{ contentVisibility: "auto" }}
      >
        {props.children}
      </section>
    );
  }
);
Section.displayName = "Section";

const SectionTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={twMerge("text-2xl font-bold", className)}
      {...props}
    />
  );
});
SectionTitle.displayName = "SectionTitle";

const SectionContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof SectionContentVariant>
>(({ className, variant, background, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(SectionContentVariant({ variant, background }), className)}
      {...props}
    />
  );
});
SectionContent.displayName = "SectionContent";

export { Section, SectionTitle, SectionContent };
