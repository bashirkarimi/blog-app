import Image from "next/image";
import Link from "next/link";
import { HeaderModule } from "../../types";

const Header = ({ data }: { data: HeaderModule }) => {
  return (
    <header className="container mx-auto">
      <div className="mx-auto flex items-center p-4">
        <div className="flex items-center gap-3">
          {data?.logo && (
            <Image
              src={data.logo}
              alt="logo"
              width={64}
              height={64}
              className="rounded"
            />
          )}
          <Link href="/">
            <strong>{data?.siteTitle ?? "Site"}</strong>
          </Link>
        </div>
        <nav className="flex gap-6 ml-8">
          {data?.headerMenu?.map((menu) => (
            <Link key={menu?.href} href={`/${menu?.href}`}>
              {menu?.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export { Header };
