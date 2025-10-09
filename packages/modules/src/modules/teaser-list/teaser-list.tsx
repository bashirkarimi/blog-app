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
import { Button } from "@repo/ui/button";

const TeaserList = ({ data }: { data: TeaserListModule }) => {
  const items = data.items || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card key={item.href || item.title}>
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
            {item.summary && <CardDescription>{item.summary}</CardDescription>}
            {item.href && (
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={item.href}>Read more</Link>
                </Button>
              </CardFooter>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { TeaserList };
