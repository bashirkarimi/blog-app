import { SectionRenderer } from "./section-renderer";
import { Sections, Heros } from "@/sanity/types";
import { Hero } from "@repo/modules/hero";

export interface PageData {
  title?: string;
  heros?: Heros;
  sections?: Sections;
}

export interface PageProps {
  data: PageData | null | undefined;
}
const PageBuilder = ({ data }: PageProps) => {
  const { heros = [], sections = [], title } = (data || {}) as PageData;

  return (
    <main id="main-content">
      {title && <h1 className={heros?.length > 0 ? "sr-only" : ""}>{title}</h1>}
      {heros.map((hero) => (
        <Hero key={hero._key} data={hero as any} />
      ))}

      {sections.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export { PageBuilder };
