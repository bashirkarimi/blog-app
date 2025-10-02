import Image from "next/image";
import type { ImageTeaserModule } from "../../types";

const ImageTeaser = ({ data }: { data: ImageTeaserModule }) => {


  return (
    <div className="flex flex-col md:flex-row items-start md:items-center">
      {data?.image && (
        <div className="w-full h-full order-1 md:order-2 md:ml-4 md:w-1/2">
          <div className="relative w-full h-full overflow-hidden rounded-md mb-4 md:mb-0 aspect-video">
            <Image
              src={data.image}
              alt={data?.title ?? "Image"}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      )}

      <div className="p-4 w-full order-2 md:order-1 md:w-1/2 items-stretch">
        <h3 className="font-semibold mb-2">{data.title}</h3>
        {data.description && (
          <p className="text-gray-800">{data.description}</p>
        )}
        {data.href && (
          <a href={data.href} className="text-blue-600 inline-block mt-2">
            Open →
          </a>
        )}
      </div>
    </div>
  );
};

export { ImageTeaser };
