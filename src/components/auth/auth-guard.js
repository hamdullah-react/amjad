'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

const AuthGuard = ({ children, requireAuth = true, redirectTo = '/auth/login' }) => {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated()) {
        router.push(redirectTo)
      } else if (!requireAuth && isAuthenticated()) {
        // If user is authenticated but accessing auth pages, redirect to dashboard
        router.push('/dashboard')
      }
    }
  }, [user, loading, requireAuth, redirectTo, router, isAuthenticated])

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If auth is required and user is not authenticated, don't render children
  if (requireAuth && !isAuthenticated()) {
    return null
  }

  // If auth is not required and user is authenticated, don't render children
  if (!requireAuth && isAuthenticated()) {
    return null
  }

  return children
}

export default AuthGuard