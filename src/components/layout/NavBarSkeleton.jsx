import { Skeleton } from '@/components/ui/skeleton'

export default function NavBarSkeleton() {
  return (
    <>
      {/* Top Info Bar Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            {/* Left - Contact Info Skeleton */}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-24 bg-white/20" />
              <Skeleton className="h-4 w-40 bg-white/20 hidden md:block" />
              <Skeleton className="h-4 w-20 bg-white/20" />
            </div>

            {/* Right - Social Icons Skeleton */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-16 bg-white/20 hidden sm:block mr-2" />
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-7 h-7 rounded-full bg-white/20" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Skeleton */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Skeleton */}
            <Skeleton className="h-12 w-36" />

            {/* Desktop Navigation Skeleton */}
            <div className="hidden lg:flex items-center space-x-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-9 w-20 rounded-lg" />
              ))}

              {/* Search Bar Skeleton */}
              <div className="ml-4">
                <Skeleton className="h-10 w-48 rounded-lg" />
              </div>
            </div>

            {/* Mobile Menu Button Skeleton */}
            <div className="lg:hidden">
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}