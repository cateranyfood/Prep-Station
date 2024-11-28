import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function RestaurantsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { restaurantId: string };
}) {
  const { restaurantId } = params;

  const items = [
    { title: "Dashboard", url: `/${restaurantId}/dashboard`, icon: "circleGauge" },
    { title: "Menu", url: `/${restaurantId}/menu`, icon: "logs" },
    { title: "Orders", url: `/${restaurantId}/orders`, icon: "clockArrowUp" },
    { title: "Restaurants", url: "/restaurants", icon: "arrowLeft" },
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