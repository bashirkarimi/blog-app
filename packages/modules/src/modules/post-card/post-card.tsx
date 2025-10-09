
import Image from "next/image";
import Link from "next/link";
import { PostCardModule } from "../../types";

const PostCard = ({ data, href }: { data: PostCardModule; href: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg  overflow-hidden  flex flex-col h-full">
      {data?.mainImage && (
        <Image
          src={data.mainImage}
          alt={data?.title ?? ""}
          className="w-full h-48 object-cover object-center"
          width={768}
          height={200}
        />
      )}
      <div className="p-6 flex flex-col flex-grow">
        {data?.title && (
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {data.title}
          </h2>
        )}
        <div className="text-gray-600 mb-4 flex-grow">
          {data?.excerpt && <p>{data.excerpt}</p>}
        </div>
        <Link
          className="pt-4 p-1  text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
          href={`/${href}`}
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export { PostCard };
