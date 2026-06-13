import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/site";

export default function DiscordPage() {
  if (siteConfig.contactDiscord) {
    redirect(siteConfig.contactDiscord);
  }
  redirect("/contact");
}
