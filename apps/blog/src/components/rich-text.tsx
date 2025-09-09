import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { BlockContent } from "@/sanity/types";

interface RichTextProps {
  value: BlockContent;
}
const RichText = ({ value }: RichTextProps) => {
  const customBlockComponents = {
    types: {
      image: ({ value }: { value: any }) => {
        const imgUrl = urlFor(value).height(800).width(600).url();

        return (
          <Image
            className="rounded-lg"
            width={600}
            height={400}
            alt={value.altText || "Blog post image"}
            src={imgUrl}
            sizes="100vw"
            priority={false}
          />
        );
      },
    },

    marks: {
      link: ({ children, value }: { children: any; value?: any }) => {
        const href = value?.href ?? "";
        const rel =
          href && !href.startsWith("/") ? "noreferrer noopener" : undefined;
        return (
          <a href={href} target={href ? "_blank" : undefined} rel={rel}>
            {children}
          </a>
        );
      },
      internalLink: ({ children, value }: { children: any; value?: any }) => {
        const href = value?.href ?? "#";
        return <a href={href}>{children}</a>;
      },
    },
  };
  return (
    <PortableText value={value ?? []} components={customBlockComponents} />
  );
};

export { RichText };
