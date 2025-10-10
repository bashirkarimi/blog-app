import { Sections } from "@/sanity/types";
import { TeaserList } from "@repo/modules/teaser-list";
import { ImageTeaser } from "@repo/modules/image-teaser";
import { Accordion } from "@repo/modules/accordion";
import { RichText } from "./rich-text";
import { BlogList } from "@repo/modules/blog-list";
import { Section } from "@repo/ui/section";
import type { ComponentType } from "react";

type SectionTypeName = Sections[number]["_type"];
type SectionByType<T extends SectionTypeName> = Extract<
  Sections[number],
  { _type: T }
>;

type SectionComponents = {
  [K in SectionTypeName]: ComponentType<{ data: SectionByType<K> }>;
};

// Direct component map (mapping layer removed)
export const sections: SectionComponents = {
  teaserList: TeaserList as any,
  imageTeaser: ImageTeaser as any,
  accordion: Accordion as any,
  richText: RichText as any,
  blogList: BlogList as any,
};

const SectionRenderer = ({ section }: { section: Sections[number] }) => {
  const Component = sections[section._type] as ComponentType<{ data: typeof section }>;
  return (
    <Section key={section._key}>
      <Component data={section} />
    </Section>
  );
};

export { SectionRenderer };
