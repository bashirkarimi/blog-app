import Image from "next/image";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/image";
import {Hero as HeroType} from "@/sanity/types";

const Hero = ({ hero  }: { hero: HeroType }) =>{
  const {title, text, image} = hero;
  return (
    <section className="isolate w-full aspect-[21/6] py-16 relative overflow-hidden">
      <div className="relative flex flex-col justify-center items-center gap-8 h-full z-20">
        {title && (
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold !text-white text-pretty max-w-3xl">
            {title}
          </h1>
        )}
        <div className="prose-lg lg:prose-xl prose-invert flex items-center text-white">
          {text && <PortableText value={text} />}
        </div>
      </div>
      <div className="absolute inset-0 bg-gray-900 opacity-60 z-10" />
      {image && image.asset && (
        <Image
          className="absolute inset-0 object-cover blur-sm"
          src={urlFor(image).url()}
          width={1600}
          height={800}
          alt=""
        />
      )}
    </section>
  );
}

export {Hero};