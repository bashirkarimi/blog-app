import type { AnyModule, AccordionModule, HeroModule } from "@repo/modules/types";
import type { Accordion, Hero } from "@repo/content-types"; // from generated Sanity types
import { urlFor } from "../sanity/image";

export function mapAccordion(doc: Accordion): AccordionModule {
  return {
    _type: "accordion",
    items: (doc.items || []).map((i) => ({
      title: i?.title || "",
      content: (i?.content as unknown as any[]) || [],
    })),
  };
}



export function mapHero(doc: Hero): HeroModule {
  const imageUrl = doc.image ? urlFor(doc.image).width(1600).url() : undefined;
  return {
    _type: "hero",
    title: doc.title || "",
    text: (doc.text as unknown as any[]) || [],
    image: imageUrl,
  };
}

export function mapModules(raw: any[]): AnyModule[] {
  return raw
    .map((r) => {
      switch (r._type) {
        case "accordion":
          return mapAccordion(r as Accordion);
        case "hero":
          return mapHero(r as Hero);
        default:
          return null;
      }
    })
    .filter(Boolean) as AnyModule[];
}
