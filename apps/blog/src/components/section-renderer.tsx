import { Sections } from "@/sanity/types";
import { TeaserList } from "@repo/modules/teaser-list";
import { ImageTeaser } from "@repo/modules/image-teaser";
import { Accordion } from "@repo/modules/accordion";
import { RichText } from "./rich-text";
import { BlogList } from "@repo/modules/blog-list";
import { Section } from "@repo/ui/section";
import type { ComponentType } from "react";
import { createComponentRegistry } from "@/lib/module-adapter";

type SectionTypeName = Sections[number]["_type"];
type SectionByType<T extends SectionTypeName> = Extract<
  Sections[number],
  { _type: T }
>;

type SectionComponents = {
  [K in SectionTypeName]: ComponentType<{ data: SectionByType<K> }>;
};

// ✨ MAGIC: Automatically handles module vs non-module components!
export const sections = createComponentRegistry({
  teaserList: TeaserList,
  imageTeaser: ImageTeaser,
  accordion: Accordion,
  richText: RichText,
  blogList: BlogList,
}) as SectionComponents;

const SectionRenderer = ({ section }: { section: Sections[number] }) => {
  const Component = sections[section._type] as ComponentType<{ data: typeof section }>;
  return (
    <Section key={section._key}>
      <Component data={section} />
    </Section>
  );
};

export { SectionRenderer };
