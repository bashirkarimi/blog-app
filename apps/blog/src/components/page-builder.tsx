import { SectionRenderer } from "./section-renderer";
import { HeroRenderer } from "./hero-renderer";
import { Sections } from "@/sanity/types";  

export interface PageProps {
  data: any;
}

const PageBuilder = ({ data }: PageProps) => {
  const { heros, sections, title } = data;

  return (
    <main id="main-content">
      <>
        {title && (
          <h1 className={heros?.length > 0 ? "sr-only" : ""}>{title}</h1>
        )}
        {heros?.map((hero: any) => (
          <HeroRenderer key={hero._key} hero={hero} />
        ))}

        {sections && (
          sections.map((section: Sections[number]) => (
            <SectionRenderer key={section._key} section={section} />
          ))
        )}
      </>
    </main>
  );
};

export { PageBuilder };
