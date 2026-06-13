export interface Category {
  id: string;
  name: string;
  shortName: string;
  href: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "general",
    name: "สินค้าทั่วไป",
    shortName: "ทั่วไป",
    href: "/category/general",
    description: "XML FiveM หลากหลายประเภท",
  },
  {
    id: "recommended",
    name: "รายการแนะนำสำหรับคุณ",
    shortName: "แนะนำ",
    href: "/category/recommended",
    description: "สินค้ายอดนิยม ขายดี",
  },
];

export const DEFAULT_CATEGORY_ID = "general";

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export const MAIN_NAV: NavItem[] = [
  { id: "home", label: "หน้าแรก", href: "/" },
  { id: "products", label: "สินค้าทั้งหมด", href: "/products" },
  { id: "topup", label: "เติมเงิน", href: "/topup" },
  { id: "history", label: "เช็คประวัติการซื้อ", href: "/history" },
  { id: "contact", label: "ติดต่อ", href: "/contact" },
  { id: "discord", label: "เข้าร่วม Discord", href: "/discord", external: true },
];
