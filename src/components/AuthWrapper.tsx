// components/AuthWrapper.tsx
'use client';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignIn from "@/components/SignIn";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Home, Inbox, Settings } from 'lucide-react';


const items = [
  {
    title: 'Restaurants',
    url: '/restaurants',
    icon: Home,
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: Inbox,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export default async function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <SidebarProvider>
            <AppSidebar MenuItems={items} />
            <SidebarTrigger/>
            <main className="flex-1">{children}</main>
        </SidebarProvider>
      </SignedIn>
    </>
  );
}