import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";

const Header = ({ settings }: { settings: any }) => {
  return (
    <header className="container mx-auto">
      <div className="mx-auto l flex items-center  p-4">
        <div className="flex items-center gap-3">
          {settings?.logo && (
            <Image
              src={urlFor(settings.logo).width(64).height(64).url()}
              alt="logo"
              width={64}
              height={64}
              className="rounded"
            />
          )}
          <Link href="/">
            <strong>{settings?.siteTitle ?? "Site"}</strong>
          </Link>
        </div>
        <nav className="flex gap-6 ml-8">
          {settings?.headerMenu?.items?.map((it: any) => (
            <Link key={it?.target?._id} href={`/${it?.target?.slug}`}>
              {it?.label ?? it?.target?.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export { Header };
