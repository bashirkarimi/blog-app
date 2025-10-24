import type { ComponentType } from "react";
import { Section, SectionContent, SectionTitle } from "@repo/ui/section";
import { Accordion } from "../accordion/accordion";
import { TeaserList } from "../teaser-list/teaser-list";
import { ImageTeaser } from "../image-teaser/image-teaser";
import { BlogList } from "../blog-list/blog-list";

// Generic section shape (keeps it app-agnostic; apps can extend).
export type GenericSection = {
  _type: string;
  _key?: string;
  sectionBackground?: string;
  sectionVariant?: string;
  sectionTitle?: string;
  // Allow arbitrary projected fields.
  [key: string]: any;
};

export type SectionComponents = Record<
  string,
  ComponentType<{ data: GenericSection }> | ComponentType<any>
>;

// Default mapping for module components shipped here. Apps can extend (e.g. add richText).
export const defaultSectionComponents: SectionComponents = {
  teaserList: TeaserList,
  imageTeaser: ImageTeaser,
  accordion: Accordion,
  blogList: BlogList,
};

export interface SectionRendererProps<
  S extends GenericSection = GenericSection,
> {
  section: S;
  components?: SectionComponents; // override or extend default mapping
}

/**
 * Generic SectionRenderer moved from blog app to modules package.
 * Apps may supply additional components via `components` prop.
 * Accessibility: preserves semantic <section> + heading structure; relies on @repo/ui primitives.
 */
const SectionRenderer = <S extends GenericSection>({
  section,
  components = defaultSectionComponents,
}: SectionRendererProps<S>) => {
  const Component = components[section._type];
  if (!Component) return null;

  const background = section.sectionBackground as any;
  const variant = section.sectionVariant as any;
  const title = section.sectionTitle;

  return (
    <Section background={background} variant={variant}>
      {title && <SectionTitle>{title}</SectionTitle>}
      <SectionContent variant={variant}>
        <Component data={section} />
      </SectionContent>
    </Section>
  );
};

export { SectionRenderer };
