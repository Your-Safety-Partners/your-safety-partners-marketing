export const RESEARCHED_INDUSTRY_UIDS = [
  "construction-trades",
  "manufacturing-industrial",
  "warehousing-logistics-transport",
  "food-beverage-agribusiness",
  "multi-site-retail-franchise",
  "professional-services-office-based",
  "community-education-training",
] as const;

const researchedIndustryUIDSet = new Set<string>(RESEARCHED_INDUSTRY_UIDS);

export function isResearchedIndustryUID(uid: string | null | undefined) {
  return typeof uid === "string" && researchedIndustryUIDSet.has(uid);
}

export function sortByResearchedIndustryOrder<T extends { uid?: string | null }>(items: T[]) {
  return [...items].sort((a, b) => {
    const aIndex = RESEARCHED_INDUSTRY_UIDS.indexOf(
      a.uid as (typeof RESEARCHED_INDUSTRY_UIDS)[number],
    );
    const bIndex = RESEARCHED_INDUSTRY_UIDS.indexOf(
      b.uid as (typeof RESEARCHED_INDUSTRY_UIDS)[number],
    );

    return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex)
      - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
  });
}
