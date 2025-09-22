
import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";


const Section = forwardRef<
  HTMLSectionElement,
  HTMLAttributes<HTMLSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <section ref={ref} className={twMerge("my-8 md:my-12", className)} {...props} />
  );
});
Section.displayName = "Section";

export { Section };


