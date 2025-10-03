import Link from "next/link";
import Image from "next/image";
import { TeaserListModule } from "../..";

const TeaserList = ({ data }: { data: TeaserListModule }) => {
  const items = data.items || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.href || item.title}
          className="rounded-md border overflow-hidden flex flex-col h-full"
        >
          {item.image && (
            <Image
              src={item.image}
              alt={item.title ?? "Image"}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold">{item.title}</h3>
            {item.summary && (
              <p className="text-sm text-gray-500 mt-1 not-last:mb-2">
                {item.summary}
              </p>
            )}
            {item.href && (
              <Link
                className="text-blue-600 inline-block md:mt-auto"
                href={item.href}
              >
                {"Read more →"}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { TeaserList };
