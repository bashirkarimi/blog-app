import type { BlogList } from "@/sanity/types";
import { Blog } from "./blog";

const SectionRenderer = ({ section }: { section: BlogList | Record<string, any> }) => {
  if (!section) return null;

  switch (section._type) {
    case "blogList":
      return <Blog data={section as BlogList} />;
    default:
      return null;
  }
};

export { SectionRenderer };
