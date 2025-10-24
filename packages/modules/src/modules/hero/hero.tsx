import { ComponentType } from "react";
import { HeroModule } from "../../types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Button } from "@repo/ui/button";
import Link from "next/link";

interface HeroProps {
  data: HeroModule;
}

const Hero: ComponentType<HeroProps> = ({ data }) => (
  <section
    className="grid grid-cols-12 overflow-hidden"
    aria-label={data.title || "Hero section"}
  >
    <div className="relative z-10 col-start-1 col-end-13 row-start-1 mt-auto w-full p-8 text-white backdrop-blur-xs md:col-end-6 md:rounded-tr-xl">
      {data.title && <h2 className="text-astral-50">{data.title}</h2>}
      {data.text && (
        <div className="mt-4">
          <PortableText value={data.text} />
        </div>
      )}
      {data.link && (
        <Button variant="secondary" className="mt-4" asChild>
          <Link
            href={data.link.href}
            {...(data.link.openInNewTab
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={data.link.ariaLabel || data.link.label}
          >
            {data.link.label}
          </Link>
        </Button>
      )}
    </div>
    {data.image && (
      <div className="relative col-start-1 col-end-13 row-start-1 block aspect-video h-full w-full md:aspect-[21/6]">
        <Image
          className="object-cover object-center select-none"
          src={data.image}
          alt={data.title || "Hero image"}
          fill
          priority
          sizes="100vw"
        />
      </div>
    )}
  </section>
);

Hero.displayName = "HeroModule";

export { Hero };
