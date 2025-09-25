import type { AnyModule, AccordionModule, HeroModule } from "@repo/modules/types";
import type { Accordion, Hero } from "@repo/content-types"; // from generated Sanity types

export function mapAccordion(doc: Accordion): AccordionModule {
  return {
    _type: "accordion",
    items: (doc.items || []).map((i) => ({
      title: i?.title || "",
      content: i?.content || [],
    })),
  };
}



export function mapHero(doc: Hero): HeroModule {
  const asset = doc.image?.asset;
  return {
    _type: "hero",
    title: doc.title || "",
    text: doc.text || [],
    image: doc.image,
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
