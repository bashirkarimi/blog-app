import type { ComponentType } from "react";
import { mapModule } from "./module-registry";
import type { ModuleType } from "@/types/module-type-map";

/**
 * Creates a module adapter that automatically maps Sanity data to module format
 * This eliminates the need for manual adapters for each module type
 */
export function createModuleAdapter<TModule>(
  Component: ComponentType<{ data: TModule }>
) {
  return function ModuleAdapter({ data }: { data: any }) {
    const mappedData = mapModule(data);
    return mappedData ? <Component data={mappedData as TModule} /> : null;
  };
}

/**
 * Type guard to check if a section type is a module that needs mapping
 */
export function isModuleType(type: string): type is ModuleType {
  // This list should match the keys in ModuleTypeMap
  const moduleTypes: ModuleType[] = ["accordion", "hero", "imageTeaser"];
  return moduleTypes.includes(type as ModuleType);
}

/**
 * Generic section wrapper that handles both module and non-module sections
 */
export function createSectionAdapter<TData>(
  Component: ComponentType<{ data: TData }>
) {
  return function SectionAdapter({ data }: { data: any }) {
    // If it's a module type, map it first
    if (data._type && isModuleType(data._type)) {
      const mappedData = mapModule(data);
      return mappedData ? <Component data={mappedData as TData} /> : null;
    }
    
    // Otherwise, pass through directly
    return <Component data={data} />;
  };
}

/**
 * Auto-registration helper for components
 * This creates a registry that automatically detects whether to use mapping or not
 */
export function createComponentRegistry<T extends Record<string, ComponentType<any>>>(
  components: T
): Record<keyof T, ComponentType<any>> {
  const registry = {} as Record<keyof T, ComponentType<any>>;
  
  for (const [key, Component] of Object.entries(components)) {
    if (isModuleType(key)) {
      // Auto-wrap module components
      registry[key as keyof T] = createModuleAdapter(Component);
    } else {
      // Pass through non-module components
      registry[key as keyof T] = Component;
    }
  }
  
  return registry;
}