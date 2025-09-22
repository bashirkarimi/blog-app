import { Sections } from "@/sanity/types";
import { TeaserList } from "./teaser-list";
import { ImageTeaser } from "./image-teaser";
import { Accordion } from "./accordion";
import { RichText } from "./rich-text";
import { BlogList } from "./blog-list";
import { Section } from "@repo/ui/";
import type { ComponentType } from "react";

type SectionTypeName = Sections[number]["_type"];
type SectionByType<T extends SectionTypeName> = Extract<
  Sections[number],
  { _type: T }
>;

type SectionComponents = {
  [K in SectionTypeName]: ComponentType<{ data: SectionByType<K> }>;
};

export const sections: SectionComponents = {
  teaserList: TeaserList,
  imageTeaser: ImageTeaser,
  accordion: Accordion,
  richText: RichText,
  blogList: BlogList,
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
