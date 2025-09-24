import { Hero } from "@repo/modules";
import type { Hero as HeroType } from "@/sanity/types";

const HeroRenderer = ({ hero }: { hero: HeroType | Record<string, any> | null }) => {
  if (!hero) return null;

  switch (hero._type) {
    case "hero":
      return <Hero data={hero as HeroType} />;
    default:
      return null;
  }
};

export { HeroRenderer };
