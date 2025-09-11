import { Hero } from "./hero";

const HeroRenderer = ({ hero }: { hero: any }) => {
  switch (hero._type) {
    case "hero":
      if (!hero) return null;
      return <Hero hero={hero} />;
    default:
      return null;
  }
};

export { HeroRenderer };
