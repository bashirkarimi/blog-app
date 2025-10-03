import { ComponentType } from "react";
import { HeroModule } from "../../types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface HeroProps {
  data: HeroModule;
}

const Hero: ComponentType<HeroProps> = ({ data }) => (
  <div className="relative w-full aspect-[21/6] flex overflow-hidden">
    {data.image && (
      <Image
        className="object-cover object-center select-none"
        src={data.image}
        alt={data.title ?? ""}
        fill
        priority
      />
    )}
    {/* dark overlay */}
    <div className="absolute inset-0 bg-gray-900/60" aria-hidden="true" />
    <div className="relative w-full md:w-1/2 lg:w-1/3 p-8 mt-auto text-white z-10">
      <h2 className="text-4xl font-bold">{data.title}</h2>
      {data.text && (
        <div className="mt-4 prose prose-invert max-w-none">
          <PortableText value={data.text} />
        </div>
      )}
    </div>
  </div>
);

Hero.displayName = "HeroModule";

export { Hero };
