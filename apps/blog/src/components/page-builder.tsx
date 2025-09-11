import { SectionRenderer } from "./section-renderer";
import { HeroRenderer } from "./hero-renderer";
import { SITE_SETTINGS_QUERYResult } from "@/sanity/types";
export interface PageProps {
  data: NonNullable<SITE_SETTINGS_QUERYResult>["homePage"];
}
export function PageBuilder({ data }: PageProps) {
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
          // case "detailPage": {
          //   return (
          //     <>
          //       <p>Detail Page</p>
          //     </>
          //   );
          // }
          default:
            return null;
        }
      })()}
    </main>
  );
}
