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
    className="relative flex aspect-[21/6] w-full overflow-hidden"
    aria-label={data.title || "Hero section"}
  >
    {data.image && (
      <Image
        className="object-cover object-center select-none"
        src={data.image}
        alt={data.title || "Hero image"}
        fill
        priority
        sizes="100vw"
      />
    )}
    {/* dark overlay */}
    <div className="absolute inset-0 bg-gray-900/60" aria-hidden="true" />
    <div className="relative z-10 mt-auto w-full bg-gray-900/30 p-8 text-white backdrop-blur-xs md:w-1/2 lg:w-1/3">
      {data.title && <h2 className="text-4xl font-bold">{data.title}</h2>}
      {data.text && (
        <div className="prose prose-invert mt-4 max-w-none">
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
  </section>
);

Hero.displayName = "HeroModule";

export { Hero };
