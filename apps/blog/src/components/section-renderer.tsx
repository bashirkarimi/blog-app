import { Sections } from "@/sanity/types";
import { TeaserList } from "@repo/modules/teaser-list";
import { ImageTeaser } from "@repo/modules/image-teaser";
import { Accordion } from "@repo/modules/accordion";
import { RichText } from "./rich-text";
import { BlogList } from "@repo/modules/blog-list";
import { Section, SectionContent, SectionTitle } from "@repo/ui/section";
import type { ComponentType } from "react";

type SectionTypeName = Sections[number]["_type"]; 

// Until all module components are updated to use exact Sanity-projected shapes,
// keep a permissive prop signature to avoid cascading refactors.
type SectionComponents = {
  [K in SectionTypeName]: ComponentType<{ data: Extract<Sections[number], { _type: K }> }> | ComponentType<any>;
};

export const sections = {
  teaserList: TeaserList,
  imageTeaser: ImageTeaser,
  accordion: Accordion,
  richText: RichText,
  blogList: BlogList,
} as SectionComponents;

const SectionRenderer = ({ section }: { section: Sections[number] }) => {
  const Component = sections[section._type];
  if (!Component) return null;

  return (
    <Section>
      <SectionContent
        variant={section.sectionVariant || 'default'}
        background={section.sectionBackground || 'none'}
      >
        {section.sectionTitle && (
          <SectionTitle>{section.sectionTitle}</SectionTitle>
        )}
        <Component data={section} />
      </SectionContent>
    </Section>
  );
};

export { SectionRenderer };
