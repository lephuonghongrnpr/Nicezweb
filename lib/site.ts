export const siteConfig = {
  name: "XML FIVEM",
  tagline: "ร้าน XML สำหรับเซิร์ฟเวอร์ FiveM",
  description: "ซื้อ XML คุณภาพสูงสำหรับ FiveM — รถ แมพ ฮูด อาวุธ พร้อมติดตั้ง",
  contactLine: process.env.NEXT_PUBLIC_LINE_URL ?? "",
  contactDiscord: process.env.NEXT_PUBLIC_DISCORD_URL ?? "",
} as const;

export function formatPrice(price: number): string {
  return `฿${price.toLocaleString("th-TH")}`;
}

export function getBuyUrl(productBuyUrl: string | undefined, productName: string): string {
  if (productBuyUrl) return productBuyUrl;
  if (siteConfig.contactLine) {
    const msg = encodeURIComponent(`สนใจซื้อ: ${productName}`);
    return siteConfig.contactLine.includes("?")
      ? `${siteConfig.contactLine}&text=${msg}`
      : `${siteConfig.contactLine}?text=${msg}`;
  }
  return "#";
}
