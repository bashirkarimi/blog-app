import { TeaserList } from "./teaser-list";
import { ImageTeaser } from "./image-teaser";
import { Accordion } from "./accordion";
import { RichText } from "./rich-text";
import { Blog } from "./blog";
import { HOME_PAGE_QUERYResult } from "@/sanity/types";

// import PostsModule from "./PostsModule";

type SearchParams = Record<string, string | string[] | undefined>;

const SectionRenderer = ({
  sections,
  searchParams,
}: {
  sections: NonNullable<NonNullable<HOME_PAGE_QUERYResult>["sections"]>;
  searchParams?: SearchParams;
}) => {
  return (
    <div className="space-y-12">
      {(Array.isArray(sections) ? sections : []).map((section, idx) => (
        <div className="space-y-6" key={section._key || idx}>
          {(() => {
            switch (section._type) {
              case "teaserList":
                return <TeaserList data={section} />;
              case "imageTeaser":
                return <ImageTeaser data={section} />;
              case "accordion":
                return <Accordion data={section} />;
              case "richText":
                return <RichText data={section} />;
              case "blogList":
                return <Blog data={section as any} />;
              // Add other module types here
              // case "postsModule":
              //   return (
              //     <PostsModule
              //       key={m?._key || i}
              //       data={m}
              //       searchParams={searchParams}
              //     />
              //   );
              default:
                return null;
            }
          })()}
        </div>
      ))}
    </div>
  );
};

export { SectionRenderer };
