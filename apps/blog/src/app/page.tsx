import { sanityFetch } from "@/sanity/live";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import { PageBuilder } from "@/components/page-builder";
import { notFound } from "next/navigation";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home(props: HomeProps) {
  const { data: homePage } = await sanityFetch({ query: HOME_PAGE_QUERY });

  if (!homePage) {
    return notFound();
  }

  return <PageBuilder data={homePage} />;
}
