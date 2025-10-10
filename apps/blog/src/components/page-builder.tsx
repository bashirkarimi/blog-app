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
  if (!data) return null;

  const { heros = [], sections = [], title } = data;
  const showStandaloneH1 = !!title && heros.length === 0;


  return (
    <main id="main-content">
      {showStandaloneH1 && <h1>{title}</h1>}

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
