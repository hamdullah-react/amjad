import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const buildWhereClause = (search, department, status) => {
  const whereClause = {}

  if (search?.trim()) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { position: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ]
  }

  if (department && department !== 'all') {
    whereClause.department = department
  }

  if (status && status !== 'all') {
    whereClause.isActive = status === 'active'
  }

  return whereClause
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const department = searchParams.get('department') || 'all'
    const status = searchParams.get('status') || 'all'
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '100', 10)
    const skip = (page - 1) * limit

    const whereClause = buildWhereClause(search, department, status)

    const [teamMembers, totalCount] = await Promise.all([
      prisma.teamMember.findMany({
        where: whereClause,
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      prisma.teamMember.count({ where: whereClause })
    ])

    return NextResponse.json({
      success: true,
      data: teamMembers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch team members',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}

const validateTeamMemberData = (data) => {
  const errors = []

  if (!data.name?.trim()) errors.push('Name is required')
  if (!data.position?.trim()) errors.push('Position is required')

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format')
  }

  return errors
}

const sanitizeTeamMemberData = (data) => ({
  name: data.name?.trim() || '',
  position: data.position?.trim() || '',
  department: data.department || 'operations',
  email: data.email?.trim() || '',
  phone: data.phone?.trim() || '',
  imageUrl: data.imageUrl?.trim() || '',
  bio: data.bio?.trim() || '',
  socialLinks: {
    linkedin: data.linkedin?.trim() || '',
    twitter: data.twitter?.trim() || ''
  },
  order: typeof data.order === 'number' ? data.order : 0,
  isActive: data.isActive !== undefined ? data.isActive : true
})

export async function POST(request) {
  try {
    const body = await request.json()

    const errors = validateTeamMemberData(body)
    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors
      }, { status: 400 })
    }

    const sanitizedData = sanitizeTeamMemberData(body)

    const existingCount = await prisma.teamMember.count()
    if (sanitizedData.order === 0) {
      sanitizedData.order = existingCount + 1
    }

    const newMember = await prisma.teamMember.create({
      data: sanitizedData
    })

    return NextResponse.json({
      success: true,
      message: 'Team member created successfully',
      data: newMember
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating team member:', error)

    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        message: 'A team member with this email already exists'
      }, { status: 409 })
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to create team member',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}