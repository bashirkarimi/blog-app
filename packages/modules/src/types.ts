import type { PortableTextBlock } from "@portabletext/types";
export interface BaseModule {
  _type: string;
  _key?: string;
  // Section meta fields (added via shared sectionFields schema)
  sectionTitle?: string;
  sectionVariant?: 'default' | 'narrow' | 'fullWidth';
  sectionBackground?: 'none' | 'gray';
}
export interface Link {
  label: string;
  href: string;
  ariaLabel?: string;
  openInNewTab?: boolean;
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
  link?: Link;
}
export interface ImageTeaserModule extends BaseModule {
  _type: "imageTeaser";
  title?: string;
  description?: string;
  image?: string;
  link?: Link;
}

export interface TeaserListModule extends BaseModule {
  _type: "teaserList";
  items?: {
    title?: string;
    summary?: string;
    image?: string;
    link?: Link;
  }[];
}

export interface HeaderModule extends BaseModule {
  _type: "header";
  siteTitle?: string;
  logo?: string;
  headerMenu?: {
    label: string;
    href: string;
  }[];
}

export interface PostCardModule extends BaseModule {
  _type: "postCard";
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  mainImage?: string;
  author?: {
    name?: string;
  };
  categories?: {
    title?: string;
  }[];
  href: string;
}

export interface BlogListModule extends BaseModule {
  _type: "blogList";  
  title?: string;
  limit?: number;
  mode?: "manual" | "auto";
  posts?: PostCardModule[];
}

export type AnyModule =
  | AccordionModule
  | HeroModule
  | ImageTeaserModule
  | TeaserListModule
  | BlogListModule;
