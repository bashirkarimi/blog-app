import { SectionRenderer } from "./section-renderer";
import { HeroRenderer } from "./hero-renderer";
import type { HOME_PAGE_QUERYResult } from "@/sanity/types";

export interface PageProps {
  data: any;
}

const PageBuilder = ({ data }: PageProps) => {
  const { heros, sections } = data;
  return (
    <main id="main-content">
      <>
        {heros?.map((hero: any) => (
          <HeroRenderer key={hero._key} hero={hero} />
        ))}

        {sections?.map((section: any) => (
          <SectionRenderer key={section._key} sections={section} />
        ))}
      </>
    </main>
  );
};

export { PageBuilder };
