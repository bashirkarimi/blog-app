
// Central mapping of module types coming from Sanity (doc) to the
// internal module shape each React component expects (mapped).
// If no transformation is required, just keep them identical.
// Extend this map when adding new modules.
import type {
  AccordionModule,
  HeroModule,
  ImageTeaserModule,
  TeaserListModule,
  BlogListModule,
  PostCardModule,
} from "@repo/modules/types";

export interface ModuleTypeMap {
  accordion: { doc: AccordionModule; mapped: AccordionModule };
  hero: { doc: HeroModule; mapped: HeroModule };
  imageTeaser: { doc: ImageTeaserModule; mapped: ImageTeaserModule };
  teaserList: { doc: TeaserListModule; mapped: TeaserListModule };
  blogList: { doc: BlogListModule; mapped: BlogListModule };
  postCard: { doc: PostCardModule; mapped: PostCardModule };
}

export type ModuleType = keyof ModuleTypeMap;

// Individual convenience unions
export type SanityModuleDoc = ModuleTypeMap[keyof ModuleTypeMap]["doc"];
export type InternalModule = ModuleTypeMap[keyof ModuleTypeMap]["mapped"];
