import { Skeleton } from '@/components/ui/skeleton'

export default function HeaderSkeleton() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-gray-100">
      <div className="absolute inset-0">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <Skeleton className="w-20 h-20 rounded-full" />
            </div>

            <Skeleton className="h-5 w-48 mx-auto mb-2" />
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-2" />
            <Skeleton className="h-6 w-full max-w-xl mx-auto mb-8" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <Skeleton className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full" />
      <Skeleton className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="w-3 h-3 rounded-full" />
        ))}
      </div>
    </section>
  )
}