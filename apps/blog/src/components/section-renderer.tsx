import { TeaserList } from "./teaser-list";
import { ImageTeaser } from "./image-teaser";
import { Accordion } from "./accordion";
import { RichText } from "./rich-text";
import { Blog } from "./blog";
import { HOME_PAGE_QUERYResult } from "@/sanity/types";

type SearchParams = Record<string, string | string[] | undefined>;

const SectionRenderer = ({
  sections
}: {
  sections: NonNullable<NonNullable<HOME_PAGE_QUERYResult>["sections"]>;
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
