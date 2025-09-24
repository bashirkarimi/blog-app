import { ComponentType } from "react";
import { HeroModule } from "../../types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";


interface HeroProps {
  data: HeroModule;
}

const Hero: ComponentType<HeroProps> = ({ data }) => (
  <div className="text-center">
    <h2 className="text-4xl font-bold">{data.title}</h2>
    {data.text && (
      <div className="mt-4 text-neutral-600 dark:text-neutral-300">
        <PortableText value={data.text} />
      </div>
    )}
    {data.image && (
      <Image
        className="mt-8 mx-auto rounded-lg max-h-72 object-cover"
        src={data.image}
        alt={data.title}
      />
    )}
  </div>
);

Hero.displayName = "HeroModule";

export { Hero };
