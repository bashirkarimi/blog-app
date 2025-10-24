import Image from "next/image";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import type { ImageTeaserModule } from "../../types";

const ImageTeaser = ({ data }: { data: ImageTeaserModule }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="order-2 flex flex-col gap-4 p-4 md:order-0 md:p-0">
        <h3 className="mb-2 font-semibold">{data.title}</h3>
        {data.description && (
          <p className="leading-relaxed text-gray-700">{data.description}</p>
        )}
        {data.link && (
          <div className="flex gap-4">
            <Button asChild variant="primary">
              <Link
                href={data.link.href}
                target={data.link.openInNewTab ? "_blank" : "_self"}
                aria-label={data.link.ariaLabel}
              >
                {data.link.label}
              </Link>
            </Button>
          </div>
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
