"use client";
import { ComponentType, useState } from "react";
import { AccordionModule } from "../../types";
import { Button } from "@repo/ui/button";

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
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-0">
      <Button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 font-medium"
      >
        {item.title}
      </Button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-700">
          {(item.content || []).map((block: any, i: number) => (
            <p key={i}>{block?.children?.[0]?.text}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export { Accordion };