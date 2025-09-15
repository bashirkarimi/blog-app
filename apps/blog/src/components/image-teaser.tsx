import Image from "next/image";
import { urlFor } from "@/sanity/image";
export const ImageTeaser = ({ data }: { data: any }) => {
  return (
    <div className="rounded border p-4">
      {/* <h3 className="font-semibold mb-2">{data.title}</h3> */}
      {data.image && (
        <div className="h-40 bg-gray-100 mb-2">
          <Image
            src={urlFor(data.image).url()}
            alt={data.title}
            className="w-full h-full object-cover object-center"
            width={600}
            height={400}
          />
        </div>
      )}
      {data.description && (
        <p className="text-sm text-gray-600">{data.description}</p>
      )}
      {data.href && (
        <a href={data.href} className="text-blue-600 inline-block mt-2">
          Open →
        </a>
      )}
    </div>
  );
}
