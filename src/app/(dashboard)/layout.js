"use client"

import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/dashboardComponents/app-sidebar"
import { DashboardHeader } from "@/dashboardComponents/dashboard-header"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider } from "@/contexts/auth-context"
import AuthGuard from "@/components/auth/auth-guard"
import PageTransition from "@/components/ui/page-transition"
import RouteProgress from "@/components/ui/route-progress"
import ScrollToTop from "@/components/ui/scroll-to-top"

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AuthGuard requireAuth={true}>
          <RouteProgress />
          <ScrollToTop />
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <DashboardHeader />
              <div className="flex-1 overflow-auto">
                <PageTransition>
                  {children}
                </PageTransition>
              </div>
            </main>
          </SidebarProvider>
        </AuthGuard>
      </ThemeProvider>
    </AuthProvider>
  );
}