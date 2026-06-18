export const MODULE_ROUTES = [
  {
    urlSlug: "forms",
    prismicType: "forms_module",
    legacyPath: "/forms_module",
  },
  {
    urlSlug: "training",
    prismicType: "training_module",
    legacyPath: "/training_module",
  },
  {
    urlSlug: "contractors",
    prismicType: "contractor_module",
    legacyPath: "/contractor_module",
  },
  {
    urlSlug: "policies",
    prismicType: "policies_module",
    legacyPath: "/policies_module",
  },
  {
    urlSlug: "hazards",
    prismicType: "hazard_module",
    legacyPath: "/hazard_module",
  },
  {
    urlSlug: "inspections",
    prismicType: "inspection_module",
    legacyPath: "/inspection_module",
  },
] as const;

export type ModuleUrlSlug = (typeof MODULE_ROUTES)[number]["urlSlug"];
export type ModulePrismicType = (typeof MODULE_ROUTES)[number]["prismicType"];

export function getModulePath(urlSlug: ModuleUrlSlug): string {
  return `/modules/${urlSlug}`;
}

export function getModuleByUrlSlug(urlSlug: string) {
  return MODULE_ROUTES.find((module) => module.urlSlug === urlSlug);
}

export function getModuleHrefFromName(moduleName: string): string {
  const name = moduleName.toLowerCase().trim();

  if (name.includes("polic")) return getModulePath("policies");
  if (name.includes("form")) return getModulePath("forms");
  if (name.includes("inspection")) return getModulePath("inspections");
  if (name.includes("train")) return getModulePath("training");
  if (name.includes("hazard")) return getModulePath("hazards");
  if (name.includes("contractor")) return getModulePath("contractors");

  return "/features";
}

export const MODULE_REDIRECTS = MODULE_ROUTES.map((module) => ({
  source: module.legacyPath,
  destination: getModulePath(module.urlSlug),
  permanent: true,
}));

export const MODULE_SITEMAP_PATHS = MODULE_ROUTES.map((module) =>
  getModulePath(module.urlSlug),
);
