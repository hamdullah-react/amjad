'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const RouteProgress = () => {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Show loading bar
    setIsLoading(true)

    // Hide loading bar after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1, transformOrigin: 'left' }}
          exit={{ scaleX: 1, transformOrigin: 'right' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      )}
    </AnimatePresence>
  )
}

export default RouteProgress
