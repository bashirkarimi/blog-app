import Image from "next/image";
import type { ImageTeaserModule } from "../../types";

const ImageTeaser = ({ data }: { data: ImageTeaserModule }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {data?.image && (
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-100">
            <Image
              src={data.image}
              alt={data?.title ?? "Image"}
              fill
              className="object-cover object-center"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      )}
      <div className="w-full md:w-1/2 order-2 md:order-1 p-4 md:p-0 flex flex-col">
        <h3 className="font-semibold mb-2">{data.title}</h3>
        {data.description && (
          <p className="text-gray-700 leading-relaxed">{data.description}</p>
        )}
        {data.href && (
          <a href={data.href} className="text-blue-600 inline-block mt-4 font-medium">
            Open →
          </a>
        )}
      </div>
    </div>
  );
};

export { ImageTeaser };
