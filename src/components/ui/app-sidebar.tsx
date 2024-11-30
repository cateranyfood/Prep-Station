'use client';
import { useState } from "react";
import Image from "next/image";
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Logo from '../../../public/Logo.png';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface MenuItem {
  title: string;
  url: string;
  icon: string; // Icon is now a string (e.g., "Home", "Inbox")
}

interface AppSidebarProps {
  MenuItems: MenuItem[];
  defaultItem?: string; // Optional prop to set the default active item
}

// Icon mapping
const iconMap: Record<string, any> = {
  Home: require("lucide-react").Home,
  Inbox: require("lucide-react").Inbox,
  Settings: require("lucide-react").Settings,
  arrowLeft: require("lucide-react").ArrowLeft,
  circleGauge: require("lucide-react").CircleGauge,
  logs: require("lucide-react").Logs,
  clockArrowUp: require("lucide-react").ClockArrowUp,
  pencil: require("lucide-react").Pencil,
};

export function AppSidebar({ MenuItems, defaultItem }: AppSidebarProps) {
  const [activeButton, setActiveButton] = useState<string>(
    defaultItem || (MenuItems.length > 0 ? MenuItems[0].title : '')
  );

  const activeButtonStyle =
    'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] rounded-md';

  const handleButtonClick = (title: string) => {
    setActiveButton(title); // Set the clicked menu item as active
  };

  return (
    <Sidebar className="fixed">
      <SidebarContent>
        <SidebarGroup>
          <Image src={Logo} alt="Logo" className="h-20 object-cover" />
          <SidebarGroupContent>
            <SidebarMenu className="pb-4">
              {MenuItems.map((item) => {
                const Icon = iconMap[item.icon]; // Get the corresponding icon component
                return (
                  <SidebarMenuItem
                    key={item.title}
                    onClick={() => handleButtonClick(item.title)}
                    className={activeButton === item.title ? activeButtonStyle : ''}
                  >
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center gap-4">
                        {Icon && <Icon />} {/* Render the icon */}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-8 w-8 my-4',
                  },
                }}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}