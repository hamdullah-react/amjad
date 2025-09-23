import { Skeleton } from '@/components/ui/skeleton'

export default function ContactSkeleton() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16">
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="relative text-center max-w-3xl mx-auto mb-12">
            <Skeleton className="h-10 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>

          {/* Contact Cards Skeleton */}
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 md:p-5 shadow-lg border border-gray-100"
              >
                <Skeleton className="w-12 h-12 md:w-14 md:h-14 rounded-full mb-4" />
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-28 mb-3" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section Skeleton */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form Skeleton */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
                <div className="flex items-center mb-8">
                  <Skeleton className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-5 w-64" />
                  </div>
                </div>

                {/* Form Fields Skeleton */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-28 mb-2" />
                      <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                  </div>

                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-32 w-full rounded-lg" />
                  </div>

                  <Skeleton className="h-14 w-full rounded-lg" />
                </div>
              </div>
            </div>

            {/* Map & Additional Info Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              {/* Map Section Skeleton */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-600 to-orange-600">
                  <Skeleton className="h-6 w-32 bg-white/30" />
                </div>
                <Skeleton className="h-[400px] w-full" />
              </div>

              {/* Quick Response Promise Skeleton */}
              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-8 border border-blue-100">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center">
                      <Skeleton className="w-2 h-2 rounded-full mr-3" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section Skeleton */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-96 mx-auto mb-4" />
              <Skeleton className="h-6 w-64 mx-auto" />
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                >
                  <div className="flex items-center">
                    <Skeleton className="w-10 h-10 rounded-full mr-4" />
                    <Skeleton className="h-5 w-full max-w-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}