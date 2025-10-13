
import { ComponentType } from "react";
import { AccordionModule } from "../../types";
import { PortableText } from "@portabletext/react";

interface AccordionProps {
  data: AccordionModule;
}

const Accordion: ComponentType<AccordionProps> = ({ data }) => {
  return (
    <div className="">
      {data.items?.map((it: any, i: number) => (
        <Item key={i} item={it} />
      ))}
    </div>
  );
};
function Item({ item }: { item: any }) {
  return (
    <details
      className="border-b last:border-0 group peer"
      name="accordion-item"
    >
      <summary className="relative w-full text-left p-4 font-medium hover:cursor-pointer py-2 list-none">
        {item.title}
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform duration-300 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <div className="px-4 pb-4 text-sm text-gray-700">
        {item.content && <PortableText value={item.content} />}
      </div>
    </details>
  );
}

export { Accordion };
