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
export type AnyModule = AccordionModule | HeroModule;
