import { sanityFetch } from "@/sanity/live";
import { Categories } from "@/components/category-filter";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import { PageBuilder } from "@/components/page-builder";

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });

  // Server-side slice: Sanity typegen can't handle dynamic slices, so
  // slice posts per-section here according to the section.limit value.
  // if (data?.homePage?.sections) {
  //   data.homePage.sections = data.homePage.sections.map((section: any) => {
  //     if (section?._type === 'blogList' && section?.mode === 'latest') {
  //       const limit = Number(section.limit) || 3;
  //       // Ensure posts is an array before slicing
  //       const posts = Array.isArray(section.posts) ? section.posts : [];
  //       return {
  //         ...section,
  //         posts: posts.slice(0, limit),
  //       };
  //     }
  //     return section;
  //   });
  // }

  return data;
}

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home(props: HomeProps) {
  // const searchParams = await props.searchParams;
  // const categoryParam = searchParams?.category;
  // const selectedCategory: string =
  //   Array.isArray(categoryParam) ? (categoryParam[0] ?? "") : (categoryParam ?? "");

  // const { data: posts } = await sanityFetch({
  //   query: POSTS_QUERY,
  //   params: { category: selectedCategory }
  // });

  const siteSettings = await getSiteSettings();
  const homePage = siteSettings ?? null;

  return (
    <div className="container mx-auto">
      {/* <Categories selectedCategory={selectedCategory} /> */}
      <PageBuilder data={homePage} />
    </div>
  );
}
