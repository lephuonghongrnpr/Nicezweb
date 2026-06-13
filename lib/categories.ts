export interface Category {
  id: string;
  name: string;
  shortName: string;
  href: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "general",
    name: "สินค้าทั่วไป",
    shortName: "ทั่วไป",
    href: "/category/general",
  },
  {
    id: "recommended",
    name: "รายการแนะนำสำหรับคุณ",
    shortName: "แนะนำ",
    href: "/category/recommended",
  },
];

export const DEFAULT_CATEGORY_ID = "general";

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export const NAV_ITEMS = [
  { id: "home", label: "หน้าแรก", shortLabel: "หน้าแรก", href: "/" },
  ...CATEGORIES.map((c) => ({
    id: c.id,
    label: c.name,
    shortLabel: c.shortName,
    href: c.href,
  })),
  { id: "admin", label: "Admin", shortLabel: "Admin", href: "/admin" },
] as const;
