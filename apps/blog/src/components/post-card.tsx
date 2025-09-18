import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import { POSTS_QUERYResult } from "@/sanity/types";
import Link from "next/link";

const PostCard = ({ post }: { post: any }) => (
  <div className="bg-white rounded-xl shadow-lg  overflow-hidden  flex flex-col h-full">
    {post?.mainImage && (
      <Image
        src={urlFor(post.mainImage).url()}
        alt={post?.title ?? ""}
        className="w-full h-48 object-cover object-center"
        width={768}
        height={200}
      />
    )}
    <div className="p-6 flex flex-col flex-grow">
      {post?.title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      )}
      <div className="text-gray-600 mb-4 flex-grow">
        {post?.body && <PortableText value={post.body} />}
      </div>
      <Link
        className="pt-4 p-1  text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
        href={`/post/${post?.slug}`}
      >
        Read more
      </Link>
    </div>
  </div>
);

export { PostCard };
