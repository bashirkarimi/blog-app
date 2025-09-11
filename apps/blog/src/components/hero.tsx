import Image from "next/image";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/image";

const Hero = ({ hero  }: { hero: any }) =>{
  const {title, text, image} = hero;
  return (
    <section className="isolate w-full aspect-[2/1] py-16 relative overflow-hidden">
      <div className="relative flex flex-col justify-center items-center gap-8 h-full z-20">
        {title ? (
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-white text-pretty max-w-3xl">
            {title}
          </h1>
        ) : null}
        <div className="prose-lg lg:prose-xl prose-invert flex items-center">
          {text ? <PortableText value={text} /> : null}
        </div>
      </div>
      <div className="absolute inset-0 bg-pink-500 opacity-50 z-10" />
      {image && image.asset ? (
        <Image
          className="absolute inset-0 object-cover blur-sm"
          src={urlFor(image).url()}
          width={1600}
          height={800}
          alt=""
        />
      ) : null}
    </section>
  );
}

export {Hero};