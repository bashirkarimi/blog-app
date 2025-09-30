import { Hero } from "@repo/modules/hero";
import type { Hero as HeroType } from "@repo/content-types";
import { mapHero } from "@/lib/module-mapper";

const HeroRenderer = ({ hero }: { hero: HeroType  }) => {
  if (!hero) return null;

  switch (hero._type) {
    case "hero":
      return <Hero data={mapHero(hero)} />;
    default:
      return null;
  }
};

export { HeroRenderer };
