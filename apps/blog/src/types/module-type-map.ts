import type {
  Accordion,
} from "@repo/content-types";
import type { AccordionModule } from "@repo/modules/types";

export interface ModuleTypeMap {
  accordion: { doc: Accordion; mapped: AccordionModule };
  // Add new module types here.
}

export type ModuleType = keyof ModuleTypeMap;
export type SanityModuleDoc = ModuleTypeMap[ModuleType]["doc"];
export type InternalModule = ModuleTypeMap[ModuleType]["mapped"];
