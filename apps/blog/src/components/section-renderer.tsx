import { Blog } from "./blog";

const SectionRenderer = ({ section }: { section: any }) => {
  switch (section._type) {
    case "blogList":
      return <Blog data={section.posts} />;
    default:
      return null;
  }
};

export { SectionRenderer };
