import PageHeader from "@/myComponents/PageHeader/PageHeader";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header Skeleton */}
      <PageHeader
        title="Loading..."
        subtitle=""
        backgroundImage="/images/IMG-20250910-WA0018.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: 'Loading...', href: null }
        ]}
      />

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Meta Skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex gap-2 mb-8">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 w-14 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Image Skeleton */}
        <div className="h-80 bg-gray-200 rounded-xl animate-pulse mb-8"></div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}