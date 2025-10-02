import { Hero } from "@repo/modules/hero";
import type { Hero as HeroType } from "@repo/content-types";
import { mapModule } from "@/lib/module-registry";
import type { HeroModule } from "@repo/modules/types";

const HeroRenderer = ({ hero }: { hero: HeroType  }) => {
  if (!hero) return null;

  const mappedData = mapModule(hero) as HeroModule | null;
  return mappedData ? <Hero data={mappedData} /> : null;
};

export { HeroRenderer };
