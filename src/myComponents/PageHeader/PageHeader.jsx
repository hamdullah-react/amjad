import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const PageHeader = ({
  title,
  subtitle,
  backgroundImage = '/images/banner-default.jpg',
  breadcrumbs = [],
  height = 'h-[300px] md:h-[400px]'
}) => {
  return (
    <div className={`relative ${height} w-full overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay with gradient - darker for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-blue-900/60 to-orange-900/50"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-6xl mx-auto px-4">
        {/* Breadcrumbs - positioned at top left */}
        {breadcrumbs.length > 0 && (
          <nav className="absolute top-8 left-4">
            <ol className="flex items-center space-x-2 text-sm md:text-base">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <li>
                    <ChevronRight className="w-4 h-4 text-white/60" />
                  </li>
                  <li>
                    {crumb.href ? (
                      <Link href={crumb.href} className="text-white/80 hover:text-white transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white font-medium">{crumb.label}</span>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </nav>
        )}

        {/* Centered content */}
        <div className="h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-3xl">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300">
                {title}
              </span>
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-lg md:text-xl text-white font-medium leading-relaxed drop-shadow-md">
                {subtitle}
              </p>
            )}

            {/* Decorative Line */}
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto shadow-lg"></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PageHeader

