"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset } from "@/components/ui/sidebar"
import {
  Users,
  Truck,
  Package,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  // Sample data - in production, this would come from an API
  const stats = [
    {
      title: "Total Revenue",
      value: "AED 125,430",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Total Bookings",
      value: "342",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Active Customers",
      value: "1,245",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Fleet Vehicles",
      value: "28",
      change: "0%",
      trend: "neutral",
      icon: Truck,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ]

  const recentBookings = [
    {
      id: "BK-001",
      customer: "Ahmed Ali",
      service: "Residential Moving",
      date: "2024-03-15",
      time: "09:00 AM",
      status: "confirmed",
      amount: "AED 2,500"
    },
    {
      id: "BK-002",
      customer: "Fatima Hassan",
      service: "Office Relocation",
      date: "2024-03-16",
      time: "02:00 PM",
      status: "pending",
      amount: "AED 5,800"
    },
    {
      id: "BK-003",
      customer: "Mohammad Rahman",
      service: "Furniture Packing",
      date: "2024-03-14",
      time: "10:30 AM",
      status: "completed",
      amount: "AED 1,200"
    },
    {
      id: "BK-004",
      customer: "Sara Abdullah",
      service: "Storage Service",
      date: "2024-03-17",
      time: "11:00 AM",
      status: "confirmed",
      amount: "AED 800"
    },
    {
      id: "BK-005",
      customer: "Khalid Omar",
      service: "International Moving",
      date: "2024-03-13",
      time: "03:30 PM",
      status: "cancelled",
      amount: "AED 12,000"
    }
  ]

  const todaySchedule = [
    {
      time: "08:00 AM",
      customer: "Ali Hassan",
      address: "Dubai Marina",
      driver: "John Smith",
      vehicle: "Truck #05"
    },
    {
      time: "10:00 AM",
      customer: "Noor Ahmed",
      address: "Business Bay",
      driver: "Mike Johnson",
      vehicle: "Van #12"
    },
    {
      time: "02:00 PM",
      customer: "Layla Mahmoud",
      address: "Jumeirah",
      driver: "David Lee",
      vehicle: "Truck #03"
    },
    {
      time: "04:00 PM",
      customer: "Omar Sharif",
      address: "Downtown Dubai",
      driver: "Tom Wilson",
      vehicle: "Van #08"
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-6 pt-0">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of your business</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="flex items-center text-sm">
                    {stat.trend === 'up' ? (
                      <>
                        <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-green-600">{stat.change}</span>
                      </>
                    ) : stat.trend === 'down' ? (
                      <>
                        <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
                        <span className="text-red-600">{stat.change}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">{stat.change}</span>
                    )}
                    <span className="text-muted-foreground ml-2">vs last month</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Bookings */}
          <div className="col-span-full lg:col-span-4 bg-card rounded-lg border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Bookings</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-medium">{booking.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{booking.customer}</p>
                      <p className="text-xs text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{booking.amount}</p>
                      <p className="text-xs text-muted-foreground">{booking.date}</p>
                      <p className="text-xs text-muted-foreground">{booking.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="col-span-full lg:col-span-3 bg-card rounded-lg border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Today's Schedule</h2>
                <Button variant="outline" size="sm">View Calendar</Button>
              </div>
              <div className="space-y-4">
                {todaySchedule.map((schedule, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-blue-600">{schedule.time}</span>
                    </div>
                    <p className="font-medium text-sm">{schedule.customer}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{schedule.address}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{schedule.driver}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        <span>{schedule.vehicle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-xl font-bold">5</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-xl font-bold">8</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-xl font-bold">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Need Support?</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Call us</p>
                <p className="font-medium">+971 568 011 076</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Email us</p>
                <p className="font-medium">admin@marhabamovers.ae</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Visit us</p>
                <p className="font-medium">Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}