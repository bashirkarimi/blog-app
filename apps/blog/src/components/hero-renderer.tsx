import { Hero } from "./hero";
import type { Hero as HeroType } from "@/sanity/types";

const HeroRenderer = ({ hero }: { hero: HeroType | Record<string, any> | null }) => {
  if (!hero) return null;

  switch (hero._type) {
    case "hero":
      return <Hero hero={hero as HeroType} />;
    default:
      return null;
  }
};

export { HeroRenderer };
