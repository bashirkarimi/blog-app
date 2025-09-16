import { PageBuilder } from "@/components/page-builder";
import { LANDING_PAGE_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/live";

export default async function landingPage({ params }: any) {
  const { slug } = await params;
  const { data } = await sanityFetch({ 
    query: LANDING_PAGE_QUERY,
    params: { slug }
  });
  console.log("Landing page data:", data);
  return (
    <div className="container mx-auto">
      <PageBuilder data={data} />
    </div>
  );
}
