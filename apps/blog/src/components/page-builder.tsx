import { SectionRenderer } from "./section-renderer";
import { Sections } from "@/sanity/types";  
import { Hero } from "@repo/modules/hero";

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
          <Hero key={hero._key} data={hero} />
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
