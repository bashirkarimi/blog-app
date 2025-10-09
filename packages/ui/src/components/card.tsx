import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

const Card = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(
        "rounded-lg border shadow-sm  flex flex-col gap-4  h-full overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(
        "flex flex-col h-full gap-4 p-6 pt-0",
        className
      )}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<"h3">
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={twMerge(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={twMerge("text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardFooter = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("mt-auto", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardTitle, CardDescription, CardContent, CardFooter };
