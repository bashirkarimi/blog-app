import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@repo/ui/card";
import { TeaserListModule } from "../..";

const TeaserList = ({ data }: { data: TeaserListModule }) => {
  const items = data.items || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card
          key={item.href || item.title}
          className="overflow-hidden flex flex-col h-full"
        >
          {item.image && (
            <Image
              src={item.image}
              alt={item.title ?? "Image"}
              width={400}
              height={300}
              className="w-full aspect-video object-cover"
            />
          )}
          <CardContent className="flex-1">
            <CardTitle className="font-semibold">{item.title}</CardTitle>
            {item.summary && (
              <CardDescription className="text-sm text-gray-500 mt-1 not-last:mb-2">
                {item.summary}
              </CardDescription>
            )}
            {item.href && (
              <CardFooter>
                <Link
                  className="text-blue-600 inline-block md:mt-auto"
                  href={item.href}
                >
                  Read more →
                </Link>
              </CardFooter>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { TeaserList };
