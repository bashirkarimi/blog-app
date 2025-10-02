import { Sections } from "@/sanity/types";
import { TeaserList } from "./teaser-list";
import { ImageTeaser } from "./image-teaser";
import { Accordion } from "@repo/modules/accordion";
import { RichText } from "./rich-text";
import { BlogList } from "./blog-list";
import { Section } from "@repo/ui/section";
import type { ComponentType } from "react";
import { mapModule } from "@/lib/module-registry";
import type { AccordionModule } from "@repo/modules/types";

type SectionTypeName = Sections[number]["_type"];
type SectionByType<T extends SectionTypeName> = Extract<
  Sections[number],
  { _type: T }
>;

type SectionComponents = {
  [K in SectionTypeName]: ComponentType<{ data: SectionByType<K> }>;
};

// Adapter to satisfy expected prop type shape for accordion
const AccordionSection: ComponentType<{ data: SectionByType<"accordion"> }> = ({
  data,
}) => {
  const mappedData = mapModule(data) as AccordionModule | null;
  return mappedData ? <Accordion data={mappedData} /> : null;
};

export const sections: SectionComponents = {
  teaserList: TeaserList,
  imageTeaser: ImageTeaser,
  accordion: AccordionSection,
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
