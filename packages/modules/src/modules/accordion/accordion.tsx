import { ComponentType, useState } from "react";
import { AccordionModule } from "../../types";
import { Button } from "@repo/ui/button";

interface AccordionProps {
  data: AccordionModule;
}

const Accordion: ComponentType<AccordionProps> = ({ data }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <div className="space-y-2">
        {data.items?.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="p-0 overflow-hidden border rounded-md">
              <button
                className="w-full px-4 py-3 flex justify-between text-left font-medium"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{it.title}</span>
                <span className="text-sm opacity-60">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <div className="px-4 pb-4 text-sm">{it.body}</div>}
            </div>
          );
        })}
      </div>
      <Button variant="outline" size="sm" onClick={() => setOpen(null)}>
        Collapse all
      </Button>
    </div>
  );
};

export { Accordion };

