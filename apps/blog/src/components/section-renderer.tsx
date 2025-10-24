import {
  SectionRenderer as BaseSectionRenderer,
  defaultSectionComponents,
} from "@repo/modules/section-renderer";
import { RichText } from "./rich-text";
import { Sections } from "@/sanity/types";

// Extend default module mapping with app-specific RichText component.
const components = { ...defaultSectionComponents, richText: RichText };

const SectionRenderer = ({ section }: { section: Sections[number] }) => (
  <BaseSectionRenderer section={section as any} components={components} />
);

export { SectionRenderer };
