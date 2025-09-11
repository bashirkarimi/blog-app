import { SectionRenderer } from "./section-renderer";
import { HeroRenderer } from "./hero-renderer";
export interface PageProps {
  data: any | null;
}
export function PageBuilder({ data }: Readonly<PageProps>) {

  return (
    <main id="main-content">
      {(() => {
        switch (data?._type) {
          case "landingPage": {
            const { heros, sections } = data;
            return (
              <>
                {heros?.map((hero: any) => (
                  <HeroRenderer key={hero._key} hero={hero} />
                ))}

                {sections?.map((section: any) => (
                  <SectionRenderer key={section._key} section={section} />
                ))}
              </>
            );
          }
          case "detailPage": {
            return (
              <>
                <p>Detail Page</p>
              </>
            );
          }
          default:
            return null;
        }
      })()}
    </main>
  );
}
