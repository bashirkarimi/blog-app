import { ComponentType } from "react";
import { HeroModule } from "../../types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface HeroProps {
  data: HeroModule;
}

const Hero: ComponentType<HeroProps> = ({ data }) => (
  <div className="relative w-full aspect-[21/6] z-0 flex">
    <div className="max-h-content w-full md:w-1/2 lg:w-1/3 relative p-8 mt-auto z-20 text-white">
      <h2 className="text-4xl !text-white font-bold relative z-10">{data.title}</h2>
      {data.text && (
        <div className="mt-4 relative z-10">
          <PortableText value={data.text} />
        </div>
      )}
      <div className="absolute inset-0 bg-gray-900 opacity-60 z-10" />
    </div>
    {data.image && (
      <Image
        className="object-center object-cover"
        src={data.image}
        alt={data.title ?? "Image"}
        fill
      />
    )}
  </div>
);

Hero.displayName = "HeroModule";

export { Hero };
