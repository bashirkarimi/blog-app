
import { ComponentType } from "react";
import { AccordionModule } from "../../types";
import { PortableText } from "@portabletext/react";

interface AccordionProps {
  data: AccordionModule;
}

const Accordion: ComponentType<AccordionProps> = ({ data }) => {
  return (
    <div className="rounded border">
      {data.items?.map((it: any, i: number) => (
        <Item key={i} item={it} />
      ))}
    </div>
  );
};
function Item({ item }: { item: any }) {
  return (
    <details className="border-b last:border-0" name="accordion-item">
      <summary className="w-full text-left p-4 font-medium hover:cursor-pointer py-2 px-">
        {item.title}
      </summary>
      <div className="px-4 pb-4 text-sm text-gray-700">
        {item.content && <PortableText value={item.content} />}
      </div>
    </details>
  );
}

export { Accordion };
