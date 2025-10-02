// lib/module-registry.ts
import { urlFor } from "../sanity/image";
import type {
  ModuleTypeMap,
  ModuleType,
  InternalModule,
  SanityModuleDoc,
} from "../types/module-type-map";

type Mapper<K extends ModuleType> = (
  doc: ModuleTypeMap[K]["doc"]
) => ModuleTypeMap[K]["mapped"];

const mappers: { [K in ModuleType]: Mapper<K> } = {
  accordion: (doc) => ({
    _type: "accordion",
    items: (doc.items || []).map((i) => ({
      title: i?.title || "",
      content: (i?.content as any[]) || [],
    })),
  }),
  hero: (doc) => ({
    _type: "hero",
    title: doc.title || "",
    text: (doc.text as any[]) || [],
    image: doc.image ? urlFor(doc.image).width(1600).url() : undefined,
  }),
};

export function mapModule(doc: SanityModuleDoc): InternalModule | null {
  const type = doc._type as ModuleType;
  const fn = (mappers as any)[type];
  return fn ? fn(doc) : null;
}

export function mapModules(raw: SanityModuleDoc[]): InternalModule[] {
  return raw.map((r) => mapModule(r)).filter(Boolean) as InternalModule[];
}

// Optional: runtime assertion helper to ensure completeness.
export function assertAllMappersExhaustive(expected: ModuleType[]) {
  const missing = expected.filter((t) => !(t in mappers));
  if (missing.length) {
    throw new Error(`Missing module mappers for: ${missing.join(", ")}`);
  }
}
