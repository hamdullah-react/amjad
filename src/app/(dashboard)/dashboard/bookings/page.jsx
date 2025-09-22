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
import { Button } from "@/components/ui/button"
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"

export default function BookingsPage() {
  // Sample booking data
  const bookings = [
    {
      id: "BK-2024001",
      customer: {
        name: "Ahmed Ali Hassan",
        email: "ahmed.ali@gmail.com",
        phone: "+971 50 123 4567",
      },
      service: "Residential Moving",
      pickup: {
        address: "Dubai Marina, Tower A",
        date: "2024-03-20",
        time: "09:00 AM"
      },
      delivery: {
        address: "Business Bay, Tower B",
        date: "2024-03-20",
        time: "02:00 PM"
      },
      status: "confirmed",
      amount: "AED 2,500",
      items: "3BR Apartment",
      team: "Team A - 4 movers",
      vehicle: "Truck #05"
    },
    {
      id: "BK-2024002",
      customer: {
        name: "Fatima Al Rashid",
        email: "fatima.r@outlook.com",
        phone: "+971 55 987 6543",
      },
      service: "Office Relocation",
      pickup: {
        address: "DIFC, Gate Avenue",
        date: "2024-03-21",
        time: "08:00 AM"
      },
      delivery: {
        address: "Sheikh Zayed Road, Office Tower",
        date: "2024-03-21",
        time: "12:00 PM"
      },
      status: "pending",
      amount: "AED 8,500",
      items: "50 workstations, Conference rooms",
      team: "Not assigned",
      vehicle: "Not assigned"
    },
    {
      id: "BK-2024003",
      customer: {
        name: "Mohammad Khan",
        email: "m.khan@company.ae",
        phone: "+971 56 234 5678",
      },
      service: "Furniture Storage",
      pickup: {
        address: "Jumeirah Village Circle",
        date: "2024-03-19",
        time: "10:00 AM"
      },
      delivery: {
        address: "Storage Facility - Al Qusais",
        date: "2024-03-19",
        time: "12:00 PM"
      },
      status: "completed",
      amount: "AED 1,200",
      items: "2BR Furniture",
      team: "Team B - 3 movers",
      vehicle: "Van #12"
    },
    {
      id: "BK-2024004",
      customer: {
        name: "Sara Abdullah",
        email: "sara.a@email.com",
        phone: "+971 52 345 6789",
      },
      service: "International Moving",
      pickup: {
        address: "Palm Jumeirah, Villa 23",
        date: "2024-03-22",
        time: "07:00 AM"
      },
      delivery: {
        address: "DXB Airport Cargo",
        date: "2024-03-22",
        time: "11:00 AM"
      },
      status: "confirmed",
      amount: "AED 15,000",
      items: "Full Villa Contents",
      team: "Team C - 6 movers",
      vehicle: "Truck #01, #02"
    },
    {
      id: "BK-2024005",
      customer: {
        name: "Omar Khalid",
        email: "omar.k@gmail.com",
        phone: "+971 54 456 7890",
      },
      service: "Same Day Delivery",
      pickup: {
        address: "Al Barsha, Building 15",
        date: "2024-03-20",
        time: "03:00 PM"
      },
      delivery: {
        address: "Motor City, Villa 45",
        date: "2024-03-20",
        time: "05:00 PM"
      },
      status: "in-progress",
      amount: "AED 500",
      items: "Furniture items",
      team: "Team D - 2 movers",
      vehicle: "Van #08"
    },
    {
      id: "BK-2024006",
      customer: {
        name: "Layla Mahmoud",
        email: "layla.m@hotmail.com",
        phone: "+971 58 567 8901",
      },
      service: "Packing Service",
      pickup: {
        address: "Downtown Dubai, Address Tower",
        date: "2024-03-18",
        time: "11:00 AM"
      },
      delivery: {
        address: "Same location",
        date: "2024-03-18",
        time: "04:00 PM"
      },
      status: "cancelled",
      amount: "AED 800",
      items: "Fragile items, Artwork",
      team: "N/A",
      vehicle: "N/A"
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      'confirmed': { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      'in-progress': { color: 'bg-purple-100 text-purple-800', icon: Clock },
      'completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'cancelled': { color: 'bg-red-100 text-red-800', icon: XCircle }
    }

    const config = statusConfig[status] || statusConfig['pending']
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    )
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Bookings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bookings Management</h1>
            <p className="text-gray-500">Manage all customer bookings and schedules</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings by ID, customer, or service..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total</span>
              <AlertCircle className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold">156</p>
          </div>
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-yellow-700">Pending</span>
              <AlertCircle className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-700">23</p>
          </div>
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-700">Confirmed</span>
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-700">45</p>
          </div>
          <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-700">In Progress</span>
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-700">12</p>
          </div>
          <div className="bg-green-50 rounded-lg border border-green-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-green-700">Completed</span>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-700">76</p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.customer.name}</div>
                        <div className="text-xs text-gray-500">{booking.customer.phone}</div>
                        <div className="text-xs text-gray-500">{booking.customer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.service}</div>
                        <div className="text-xs text-gray-500">{booking.items}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-gray-900">
                          <Calendar className="w-3 h-3" />
                          {booking.pickup.date}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-3 h-3" />
                          {booking.pickup.time}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                          <MapPin className="w-3 h-3" />
                          {booking.pickup.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{booking.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to 6 of 156 results
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}