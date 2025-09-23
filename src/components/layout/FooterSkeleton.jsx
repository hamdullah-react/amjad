import { Skeleton } from '@/components/ui/skeleton'

export default function FooterSkeleton() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Newsletter Section Skeleton */}
      <div className="relative border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-gray-800 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <Skeleton className="h-8 w-80 mb-2 bg-gray-700" />
                <Skeleton className="h-5 w-64 bg-gray-700" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-auto gap-3">
                <Skeleton className="h-12 w-64 rounded-lg bg-gray-700" />
                <Skeleton className="h-12 w-32 rounded-lg bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content Skeleton */}
      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Company Info Skeleton */}
          <div className="lg:col-span-1">
            <Skeleton className="h-16 w-40 mb-6 bg-gray-800" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-3/4 mb-6 bg-gray-800" />

            {/* Trust Badges Skeleton */}
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-6 w-20 bg-gray-800" />
              <Skeleton className="h-6 w-20 bg-gray-800" />
            </div>

            {/* Social Media Skeleton */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-10 h-10 rounded-lg bg-gray-800" />
              ))}
            </div>
          </div>

          {/* Services Skeleton */}
          <div>
            <Skeleton className="h-6 w-32 mb-6 bg-gray-800" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-4 w-36 bg-gray-800" />
              ))}
            </div>
          </div>

          {/* Quick Links Skeleton */}
          <div>
            <Skeleton className="h-6 w-28 mb-6 bg-gray-800" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-4 w-32 bg-gray-800" />
              ))}
            </div>
          </div>

          {/* Contact Info Skeleton */}
          <div>
            <Skeleton className="h-6 w-32 mb-6 bg-gray-800" />
            <div className="space-y-4">
              {/* Location Skeleton */}
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-lg bg-gray-800" />
                <div>
                  <Skeleton className="h-4 w-20 mb-1 bg-gray-800" />
                  <Skeleton className="h-4 w-40 mb-1 bg-gray-800" />
                  <Skeleton className="h-4 w-36 bg-gray-800" />
                </div>
              </div>

              {/* Phone Skeleton */}
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-lg bg-gray-800" />
                <div>
                  <Skeleton className="h-4 w-16 mb-1 bg-gray-800" />
                  <Skeleton className="h-4 w-32 mb-1 bg-gray-800" />
                  <Skeleton className="h-4 w-28 bg-gray-800" />
                </div>
              </div>

              {/* Email Skeleton */}
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-lg bg-gray-800" />
                <div>
                  <Skeleton className="h-4 w-20 mb-1 bg-gray-800" />
                  <Skeleton className="h-4 w-40 mb-1 bg-gray-800" />
                  <Skeleton className="h-4 w-36 bg-gray-800" />
                </div>
              </div>

              {/* Working Hours Skeleton */}
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-lg bg-gray-800" />
                <div>
                  <Skeleton className="h-4 w-28 mb-1 bg-gray-800" />
                  <Skeleton className="h-4 w-44 mb-1 bg-gray-800" />
                  <Skeleton className="h-4 w-40 bg-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar Skeleton */}
      <div className="relative border-t border-gray-800 bg-black/50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Skeleton className="h-4 w-80 bg-gray-800" />
            <div className="flex flex-wrap gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-4 w-24 bg-gray-800" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}