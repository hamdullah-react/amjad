import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection by counting users
    const userCount = await prisma.user.count()

    // Test creating a simple record
    const testService = await prisma.service.findFirst()

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        userCount,
        hasServices: testService ? true : false,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Create a test service to verify write operations
    const testService = await prisma.service.create({
      data: {
        title: "Test Moving Service",
        description: "This is a test service to verify database write operations",
        shortDesc: "Test service",
        icon: "truck",
        price: 299.99,
        features: ["Professional team", "Secure packing", "On-time delivery"],
        order: 1,
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Test service created successfully!',
      data: testService
    })
  } catch (error) {
    console.error('Database write error:', error)
    return NextResponse.json({
      success: false,
      message: 'Database write failed',
      error: error.message
    }, { status: 500 })
  }
}