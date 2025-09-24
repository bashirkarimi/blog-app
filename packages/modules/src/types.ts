import type { PortableTextBlock } from "@portabletext/types";
import type { StaticImageData } from "next/image";
export interface BaseModule {
  _type: string;
  _key?: string;
}
export interface AccordionModule extends BaseModule {
  _type: "accordion";
  heading?: string;
  items: { title: string; body: string }[];
}
export interface HeroModule extends BaseModule {
  _type: "hero";
  title: string;
  text?: PortableTextBlock[];
  image?: string | StaticImageData;
}
export type AnyModule = AccordionModule | HeroModule;
