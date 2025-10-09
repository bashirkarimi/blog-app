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

const PostCard = ({ data, href }: { data: PostCardModule; href: string }) => {
  return (
    <Card className="">
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
          <Link
            className="pt-4 p-1 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
            href={`/${href}`}
          >
            Read more
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export { PostCard };
