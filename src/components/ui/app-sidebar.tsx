'use client';
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '../../../public/Logo.png';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface MenuItem {
  title: string;
  url: string;
  icon?: any;
}

interface AppSidebarProps {
  MenuItems: MenuItem[];
}

export function AppSidebar({ MenuItems }: AppSidebarProps) {
  console.log('MenuItems:', MenuItems); // Debugging

  const [activeButton, setActiveButton] = useState<string | null>('Restaurants');
  const activeButtonStyle =
    'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] rounded-md';
  const handleButtonClick = (title: string) => {
    setActiveButton(title);
  };

  return (
    <Sidebar className="fixed">
      <SidebarContent>
        <SidebarGroup>
          <Image src={Logo} alt="Logo" className="h-20 object-cover" />
          <SidebarGroupContent>
            <SidebarMenu className="pb-4">
              {MenuItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => handleButtonClick(item.title)}
                  className={activeButton === item.title ? activeButtonStyle : ''}
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-10 w-10 my-4',
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