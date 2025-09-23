'use client'

import { AuthProvider } from "@/contexts/auth-context"

export default function AuthLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}