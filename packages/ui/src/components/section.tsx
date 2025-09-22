
import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";


const Section = forwardRef<
  HTMLSelectElement,
  HTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  return (
    <section ref={ref} className={twMerge("my-8 md:my-12", className)} {...props} />
  );
});
Section.displayName = "Section";

export { Section };


