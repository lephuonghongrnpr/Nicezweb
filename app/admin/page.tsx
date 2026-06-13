import { isAdminAuthenticated } from "@/lib/auth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata = {
  title: "Admin — XML FIVEM",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  return authed ? <AdminPanel /> : <AdminLogin />;
}
