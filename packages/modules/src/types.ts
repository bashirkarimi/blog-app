import type { PortableTextBlock } from "@portabletext/types";
export interface BaseModule {
  _type: string;
  _key?: string;
}
export interface AccordionModule extends BaseModule {
  _type: "accordion";
  items: {
    title: string;
    content: PortableTextBlock[];
  }[];
}
export interface HeroModule extends BaseModule {
  _type: "hero";
  title?: string;
  text?: PortableTextBlock[];
  image?: string;
}
export interface ImageTeaserModule extends BaseModule {
  _type: "imageTeaser";
  title?: string;
  description?: string;
  image?: string;
  href?: string;
}
export type AnyModule = AccordionModule | HeroModule | ImageTeaserModule;
