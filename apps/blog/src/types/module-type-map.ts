import type {
  Accordion,
  Hero,
} from "@repo/content-types";
import type { AccordionModule, HeroModule, ImageTeaserModule, TeaserListModule } from "@repo/modules/types";

export interface ModuleTypeMap {
  accordion: { doc: Accordion; mapped: AccordionModule };
  hero: { doc: Hero; mapped: HeroModule };
  // Add new module types here.
}

export type ModuleType = keyof ModuleTypeMap;
export type SanityModuleDoc = ModuleTypeMap[ModuleType]["doc"];
export type InternalModule = ModuleTypeMap[ModuleType]["mapped"];
