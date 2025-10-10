import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@repo/ui/card";
import { PostCardModule } from "../../types";
import { Button } from "@repo/ui/button";

const PostCard = ({ data, href }: { data: PostCardModule; href: string }) => {
  return (
    <Card>
      {data?.mainImage && (
        <Image
          src={data.mainImage}
          alt={data?.title ?? ""}
          className="w-full aspect-video object-cover object-center"
          width={768}
          height={200}
        />
      )}
      <CardContent>
        {data?.title && <CardTitle>{data.title}</CardTitle>}
        {data?.excerpt && <CardDescription>{data.excerpt}</CardDescription>}
        <CardFooter>
          <Button variant="ghost" size="sm" asChild>
            <Link aria-label={`Read more: ${data.title}`} href={`/${href}`}>Read more</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export { PostCard };
