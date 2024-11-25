// app/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    { title: "Dashboard", url: "/dashboard", icon: "Home" },
    { title: "Orders", url: "/orders", icon: "Inbox" },
    { title: "Menu", url: "/menu", icon: "Settings" },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar MenuItems={items} />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}