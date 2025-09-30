import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="text-center">
          <Skeleton className="w-12 h-12 rounded-full mx-auto mb-3" />
          <Skeleton className="h-8 w-20 mx-auto mb-2" />
          <Skeleton className="h-4 w-16 mx-auto" />
        </div>
      ))}
    </div>
  )
}

export function StorySkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
        <div className="mt-8">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start">
                <Skeleton className="w-20 h-6" />
                <div className="flex-1 ml-4">
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-56 rounded-2xl" />
          </div>
          <div className="space-y-4 pt-8">
            <Skeleton className="h-56 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
        <Skeleton className="absolute -top-4 -right-4 w-32 h-12 rounded-full" />
      </div>
    </div>
  )
}

export function MissionVisionSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="p-8 md:p-10 rounded-3xl">
          <Skeleton className="w-16 h-16 rounded-full mb-6" />
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-4 w-full mb-6" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center">
                <Skeleton className="w-5 h-5 rounded-full mr-3" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

export function ValuesSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="p-4 md:p-5 rounded-xl">
          <Skeleton className="w-14 h-14 rounded-full mb-4" />
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-full" />
        </Card>
      ))}
    </div>
  )
}

export function TeamSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="rounded-2xl overflow-hidden">
          <Skeleton className="h-64 w-full" />
          <div className="p-6">
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex space-x-3">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="w-5 h-5 rounded" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}