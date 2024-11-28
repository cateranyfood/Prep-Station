// app/layout.tsx
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    { title: "Restaurants", url: "/restaurants", icon: "Home" },
    { title: "Orders", url: "/restaurants/orders", icon: "Inbox" },
    { title: "Settings", url: "/restaurants/settings", icon: "Settings" },
    
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar MenuItems={items}/>
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}

