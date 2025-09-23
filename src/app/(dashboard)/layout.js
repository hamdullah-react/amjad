import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/dashboardComponents/app-sidebar"
import { DashboardHeader } from "@/dashboardComponents/dashboard-header"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider } from "@/contexts/auth-context"
import AuthGuard from "@/components/auth/auth-guard"

export const metadata = {
  title: "Dashboard | Marhaba Furniture Movers",
  description: "Admin dashboard for Marhaba Furniture Movers & Packers",
};

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AuthGuard requireAuth={true}>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <DashboardHeader />
              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </AuthGuard>
      </ThemeProvider>
    </AuthProvider>
  );
}