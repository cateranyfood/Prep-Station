// app/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    { title: "Restaurants", url: "/restaurants", icon: "Home" },
    { title: "Orders", url: "/orders", icon: "Inbox" },
    { title: "Settings", url: "/settings", icon: "Settings" },
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

{
  /* <SidebarProvider>
  <div className="flex h-screen">
    <AppSidebar MenuItems={items} />
    <main className="flex-1">{children}</main>
  </div>
</SidebarProvider> */
}
