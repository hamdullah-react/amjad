import { Skeleton } from '@/components/ui/skeleton'

export default function WelcomeSkeleton() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content Skeleton */}
            <div className="space-y-6">
              {/* Title Skeleton */}
              <div>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-10 w-48" />
              </div>

              {/* Divider */}
              <Skeleton className="h-1 w-16 rounded-full" />

              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Features Skeleton */}
              <div className="space-y-4 pt-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex items-start gap-4">
                    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>

            {/* Right Content Skeleton */}
            <div className="lg:pl-8">
              {/* CEO Card Skeleton */}
              <div className="bg-white rounded-2xl shadow-xl p-8 relative">
                {/* Profile Section */}
                <div className="flex items-center mb-6">
                  <Skeleton className="w-20 h-20 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>

                {/* Quote Icon */}
                <Skeleton className="w-8 h-8 mb-4" />

                {/* CEO Message */}
                <div className="space-y-2 mb-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 p-4 rounded-lg">
                      <Skeleton className="h-8 w-20 mb-1" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-100 rounded-full opacity-20 animate-pulse"></div>
              </div>

              {/* Additional Info Cards Skeleton */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[1, 2].map((index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <Skeleton className="w-8 h-8 mb-2" />
                    <Skeleton className="h-6 w-16 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}