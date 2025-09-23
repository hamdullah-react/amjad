'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/theme-context';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Search,
  Menu,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Package,
  MapPin,
  Calendar,
  TrendingUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Set initial time on client side only
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1">
          <SidebarTrigger className="-ml-2" />

          <div className="hidden lg:flex flex-col">
            <h1 className="text-lg font-semibold">Marhaba Movers Dashboard</h1>
            {currentTime && (
              <p className="text-xs text-muted-foreground">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </p>
            )}
          </div>

          {/* Quick Stats - Desktop */}
          <div className="hidden xl:flex items-center gap-4 ml-8">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">12 New Orders</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">+23% Today</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">5 Active Areas</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button - Mobile */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden sm:flex"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">New Booking</span>
                  <Badge variant="secondary" className="text-xs">2 min ago</Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  John Doe booked a move for Dec 25
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Service Area Added</span>
                  <Badge variant="secondary" className="text-xs">1 hour ago</Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  Dubai Marina added to service areas
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">New Review</span>
                  <Badge variant="secondary" className="text-xs">3 hours ago</Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  5-star review from Sarah Johnson
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/avatar.png" alt={user?.user_metadata?.full_name || user?.email || 'Admin'} />
                  <AvatarFallback>
                    {user?.user_metadata?.full_name
                      ? user.user_metadata.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
                      : user?.email?.[0]?.toUpperCase() || 'AD'
                    }
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {user?.user_metadata?.full_name || user?.email || 'Admin User'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user?.user_metadata?.role || 'Administrator'}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Stats Bar */}
      <div className="flex xl:hidden items-center gap-3 px-4 pb-3 overflow-x-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg whitespace-nowrap">
          <Package className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium">12 Orders</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg whitespace-nowrap">
          <TrendingUp className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium">+23%</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg whitespace-nowrap">
          <MapPin className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium">5 Areas</span>
        </div>
      </div>
    </header>
  );
}