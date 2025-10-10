// Module mapping layer removed. Placeholder exports (no-ops) retained
// temporarily to avoid breaking any lingering imports in docs/tests.
export function mapModule(_: any) {
  return _ ?? null;
}
export function mapModules(raw: any[]) {
  return raw as any[];
}
export function assertAllMappersExhaustive() {
  return true;
}
