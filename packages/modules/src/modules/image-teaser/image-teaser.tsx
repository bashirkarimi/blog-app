import Image from "next/image";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import type { ImageTeaserModule } from "../../types";

const ImageTeaser = ({ data }: { data: ImageTeaserModule }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="order-2 md:order-0 p-4 md:p-0 flex flex-col gap-4">
        <h3 className="font-semibold mb-2">{data.title}</h3>
        {data.description && (
          <p className="text-gray-700 leading-relaxed">{data.description}</p>
        )}
        {data.link && (
          <Button asChild variant="default" className="">
            <Link
              href={data.link.href}
              target={data.link.openInNewTab ? "_blank" : "_self"}
              aria-label={data.link.ariaLabel}
            >
              {data.link.label}
            </Link>
          </Button>
        )}
      </div>
      {data?.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-100">
          <Image
            src={data.image}
            alt={data?.title ?? "Image"}
            fill
            className="object-cover object-center"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      )}
    </div>
  );
};

export { ImageTeaser };
