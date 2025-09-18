import { TeaserList } from "./teaser-list";
import { ImageTeaser } from "./image-teaser";
import { Accordion } from "./accordion";
import { RichText } from "./rich-text";
import { Blog } from "./blog";
import { HOME_PAGE_QUERYResult } from "@/sanity/types";

const SectionRenderer = ({
  sections,
}: {
  sections: NonNullable<NonNullable<HOME_PAGE_QUERYResult>["sections"]>;
}) => {
  return (Array.isArray(sections) ? sections : []).map((section, idx) => (
    <div key={section._key || idx}>
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
  ));
};

export { SectionRenderer };
