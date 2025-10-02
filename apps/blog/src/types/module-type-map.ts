import type { Accordion, Hero, ImageTeaser } from "@repo/content-types";
import type { AccordionModule, HeroModule, ImageTeaserModule } from "@repo/modules/types";

export interface ModuleTypeMap {
  accordion: { doc: Accordion; mapped: AccordionModule };
  hero: { doc: Hero; mapped: HeroModule };
  imageTeaser: { doc: ImageTeaser; mapped: ImageTeaserModule };
  // Add new module types here.
}

export type ModuleType = keyof ModuleTypeMap;
export type SanityModuleDoc = ModuleTypeMap[ModuleType]["doc"];
export type InternalModule = ModuleTypeMap[ModuleType]["mapped"];
