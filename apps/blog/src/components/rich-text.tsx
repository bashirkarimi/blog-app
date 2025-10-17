import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { RichText as RichTextType } from "@/sanity/types";

const RichText = ({
  data,
}: {
  data?: { body: RichTextType } | Partial<RichTextType> | any;
}) => {
  const customBlockComponents = {
    types: {
      image: ({ value }: { value: any }) => {
        const imgUrl = urlFor(value).url();

        if (!imgUrl) return null;

        let width = 600;
        let height = 400;

        const match = imgUrl.match(/-(\d+)x(\d+)(?=\.)/);
        if (match) {
          width = parseInt(match[1], 10) || width;
          height = parseInt(match[2], 10) || height;
        }

        return (
          <Image
            className="rounded-lg"
            alt={value.altText || "Blog post image"}
            src={imgUrl}
            width={width}
            height={height}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
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
    <PortableText value={data?.body ?? []} components={customBlockComponents} />
  );
};

export { RichText };
