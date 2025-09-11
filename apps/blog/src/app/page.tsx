import { sanityFetch } from "@/sanity/live";
import { Categories } from "@/components/categories";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { PageBuilder } from "@/components/page-builder";

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
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
  const homePage = siteSettings?.homePage ?? null;

  return (
    <div className="container mx-auto">
      {/* <Categories selectedCategory={selectedCategory} /> */}
      <PageBuilder data={homePage} />
    </div>
  );
}
