"use client"

import * as React from "react"
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Truck,
  Package,
  MessageSquare,
  FileText,
  Settings,
  TrendingUp,
  MapPin,
  Bell,
  Shield,
  Home,
  Globe,
  Image,
  Layers,
} from "lucide-react"

import { NavMain } from "@/dashboardComponents/nav-main"
import { NavProjects } from "@/dashboardComponents/nav-projects"
import { NavUser } from "@/dashboardComponents/nav-user"
import { TeamSwitcher } from "@/dashboardComponents/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Dashboard data for moving company
const data = {
  user: {
    name: "Admin User",
    email: "admin@marhabamovers.ae",
    avatar: "/images/logo.png",
  },
  teams: [
    {
      name: "Marhaba Movers",
      logo: Home,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    // {
    //   title: "Bookings",
    //   url: "/dashboard/bookings",
    //   icon: CalendarDays,
    //   items: [
    //     {
    //       title: "All Bookings",
    //       url: "/dashboard/bookings",
    //     },
    //     {
    //       title: "Pending",
    //       url: "/dashboard/bookings/pending",
    //     },
    //     {
    //       title: "Confirmed",
    //       url: "/dashboard/bookings/confirmed",
    //     },
    //     {
    //       title: "Completed",
    //       url: "/dashboard/bookings/completed",
    //     },
    //     {
    //       title: "Cancelled",
    //       url: "/dashboard/bookings/cancelled",
    //     },
    //   ],
    // },
    // {
    //   title: "Customers",
    //   url: "/dashboard/customers",
    //   icon: Users,
    //   items: [
    //     {
    //       title: "All Customers",
    //       url: "/dashboard/customers",
    //     },
    //     {
    //       title: "Regular Customers",
    //       url: "/dashboard/customers/regular",
    //     },
    //     {
    //       title: "Corporate Clients",
    //       url: "/dashboard/customers/corporate",
    //     },
    //     {
    //       title: "Add Customer",
    //       url: "/dashboard/customers/add",
    //     },
    //   ],
    // },
    // {
    //   title: "Fleet Management",
    //   url: "/dashboard/fleet",
    //   icon: Truck,
    //   items: [
    //     {
    //       title: "Vehicles",
    //       url: "/dashboard/fleet/vehicles",
    //     },
    //     {
    //       title: "Drivers",
    //       url: "/dashboard/fleet/drivers",
    //     },
    //     {
    //       title: "Maintenance",
    //       url: "/dashboard/fleet/maintenance",
    //     },
    //     {
    //       title: "Schedule",
    //       url: "/dashboard/fleet/schedule",
    //     },
    //   ],
    // },
    // {
    //   title: "Services",
    //   url: "/dashboard/services",
    //   icon: Package,
    //   items: [
    //     {
    //       title: "Service List",
    //       url: "/dashboard/services",
    //     },
    //     {
    //       title: "Pricing",
    //       url: "/dashboard/services/pricing",
    //     },
    //     {
    //       title: "Add Service",
    //       url: "/dashboard/services/add",
    //     },
    //   ],
    // },
    // {
    //   title: "Reports",
    //   url: "/dashboard/reports",
    //   icon: TrendingUp,
    //   items: [
    //     {
    //       title: "Revenue Report",
    //       url: "/dashboard/reports/revenue",
    //     },
    //     {
    //       title: "Booking Analytics",
    //       url: "/dashboard/reports/bookings",
    //     },
    //     {
    //       title: "Customer Analytics",
    //       url: "/dashboard/reports/customers",
    //     },
    //     {
    //       title: "Service Performance",
    //       url: "/dashboard/reports/services",
    //     },
    //   ],
    // },
    // {
    //   title: "Messages",
    //   url: "/dashboard/messages",
    //   icon: MessageSquare,
    //   items: [
    //     {
    //       title: "Contact Forms",
    //       url: "/dashboard/messages/contact",
    //     },
    //     {
    //       title: "Reviews",
    //       url: "/dashboard/messages/reviews",
    //     },
    //     {
    //       title: "Complaints",
    //       url: "/dashboard/messages/complaints",
    //     },
    //   ],
    // },
    {
      title: "Website Content",
      url: "/dashboard/website",
      icon: Globe,
      items: [
        {
          title: "Hero Slider",
          url: "/dashboard/website/hero-slider",
        },
        {
          title: "Welcome Section",
          url: "/dashboard/website/welcome-section",
        },
        {
          title: "About Us Section",
          url: "/dashboard/website/about",
        },
        {
          title: "Services Content",
          url: "/dashboard/website/services",
        },
        {
          title: "Team Members",
          url: "/dashboard/website/team",
        },
        {
          title: "Why Choose Us",
          url: "/dashboard/website/why-choose-us",
        },
        {
          title: "Statistics",
          url: "/dashboard/website/statistics",
        },
        {
          title: "Testimonials",
          url: "/dashboard/website/testimonials",
        },
        {
          title: "FAQ",
          url: "/dashboard/website/faq",
        },
        {
          title: "Blog Posts",
          url: "/dashboard/website/blog",
        },
        {
          title: "Service Areas",
          url: "/dashboard/website/service-areas",
        },
        {
          title: "Gallery",
          url: "/dashboard/website/gallery",
        },
        {
          title: "Contact Info",
          url: "/dashboard/website/contact-info",
        },
        {
          title: "SEO Settings",
          url: "/dashboard/website/seo",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "/dashboard/settings",
    //   icon: Settings,
    //   items: [
    //     {
    //       title: "General",
    //       url: "/dashboard/settings",
    //     },
    //     {
    //       title: "Team Members",
    //       url: "/dashboard/settings/team",
    //     },
    //     {
    //       title: "Service Areas",
    //       url: "/dashboard/settings/areas",
    //     },
    //     {
    //       title: "Notifications",
    //       url: "/dashboard/settings/notifications",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Service Areas",
      url: "/dashboard/areas",
      icon: MapPin,
    },
    {
      name: "Notifications",
      url: "/dashboard/notifications",
      icon: Bell,
    },
    {
      name: "Security",
      url: "/dashboard/security",
      icon: Shield,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
