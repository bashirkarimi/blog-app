import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/image";
const PostCard = ({ post }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col h-full">
    <img
      src={urlFor(post.mainImage).url()}
      alt={post.title}
      className="w-full h-48 object-cover object-center"
    />
    <div className="p-6 flex flex-col flex-grow">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 flex-grow">
        {<PortableText value={post.body} />}
      </p>
      <div className="text-sm text-gray-500">
        <span>By {post.author}</span>
        <span className="ml-4">
          Published on {new Date(post.publishedAt).toLocaleDateString()}
        </span>
        <span className="ml-4">
          Updated on {new Date(post._updatedAt).toLocaleDateString()}
        </span>
      </div>
      <a className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150">
        Read more
      </a>
    </div>
  </div>
);

export { PostCard };
