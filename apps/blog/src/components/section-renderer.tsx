import { BlogList } from "../sanity/types";
import { Blog } from "./blog";

const SectionRenderer = ({ section }: { section: BlogList }) => {
  switch (section._type) {
    case "blogList":
      return <Blog data={section} />;
    default:
      return null;
  }
};

export { SectionRenderer };
