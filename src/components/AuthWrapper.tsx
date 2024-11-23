// components/AuthWrapper.tsx
'use client';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignIn from "@/components/SignIn";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <SidebarProvider>
          <div className="flex h-screen">
            <AppSidebar/>
            <SidebarTrigger />
            <main className="flex-1">{children}</main>
          </div>
        </SidebarProvider>
      </SignedIn>
    </>
  );
}