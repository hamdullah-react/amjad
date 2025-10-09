'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as transitions from '@/lib/page-transitions'

/**
 * PageTransition component for smooth page navigation animations
 *
 * @param {ReactNode} children - The page content to animate
 * @param {string} variant - The transition variant to use
 *                          Options: 'fadeSlide' (default), 'scaleFade', 'slideRight',
 *                          'slideLeft', 'zoom', 'rotateFade', 'blurFade', 'slideVertical',
 *                          'flip', 'fade', 'bounce'
 */
const PageTransition = ({ children, variant = 'fadeSlide' }) => {
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  // Get the selected transition variant
  const pageVariants = transitions[variant] || transitions.fadeSlide

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial={isFirstRender ? false : 'initial'}
        animate="animate"
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
