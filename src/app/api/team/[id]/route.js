import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const deleteImageFromStorage = async (imageUrl) => {
  if (!imageUrl) return { success: true }

  try {
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/storage/v1/object/public/amjad/')

    if (pathParts.length > 1) {
      const filePath = pathParts[1]
      console.log('Deleting image from storage:', filePath)

      const { error } = await supabase.storage
        .from('amjad')
        .remove([filePath])

      if (error) {
        console.error('Error deleting file from storage:', error)
        return { success: false, error }
      }

      console.log('Image deleted from storage successfully')
      return { success: true }
    }
  } catch (error) {
    console.error('Error parsing image URL:', error)
    return { success: false, error }
  }

  return { success: true }
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
    linkedin: data.socialLinks?.linkedin?.trim() || data.linkedin?.trim() || '',
    twitter: data.socialLinks?.twitter?.trim() || data.twitter?.trim() || '',
    facebook: data.socialLinks?.facebook?.trim() || data.facebook?.trim() || '',
    instagram: data.socialLinks?.instagram?.trim() || data.instagram?.trim() || '',
    tiktok: data.socialLinks?.tiktok?.trim() || data.tiktok?.trim() || ''
  },
  order: typeof data.order === 'number' ? data.order : 0,
  isActive: data.isActive !== undefined ? data.isActive : true
})

export async function GET(request, { params }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Team member ID is required'
      }, { status: 400 })
    }

    const member = await prisma.teamMember.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        position: true,
        department: true,
        email: true,
        phone: true,
        imageUrl: true,
        bio: true,
        socialLinks: true,
        order: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!member) {
      return NextResponse.json({
        success: false,
        message: 'Team member not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: member
    })
  } catch (error) {
    console.error('Error fetching team member:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch team member',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Team member ID is required'
      }, { status: 400 })
    }

    const body = await request.json()

    const existingMember = await prisma.teamMember.findUnique({
      where: { id },
      select: {
        id: true,
        imageUrl: true,
        email: true
      }
    })

    if (!existingMember) {
      return NextResponse.json({
        success: false,
        message: 'Team member not found'
      }, { status: 404 })
    }

    const errors = validateTeamMemberData(body)
    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors
      }, { status: 400 })
    }

    const sanitizedData = sanitizeTeamMemberData(body)

    if (existingMember.imageUrl && existingMember.imageUrl !== sanitizedData.imageUrl) {
      await deleteImageFromStorage(existingMember.imageUrl)
    }

    if (sanitizedData.email !== existingMember.email && sanitizedData.email) {
      const emailExists = await prisma.teamMember.findFirst({
        where: {
          email: sanitizedData.email,
          id: { not: id }
        }
      })

      if (emailExists) {
        return NextResponse.json({
          success: false,
          message: 'A team member with this email already exists'
        }, { status: 409 })
      }
    }

    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: sanitizedData,
      select: {
        id: true,
        name: true,
        position: true,
        department: true,
        email: true,
        phone: true,
        imageUrl: true,
        bio: true,
        socialLinks: true,
        order: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Team member updated successfully',
      data: updatedMember
    })
  } catch (error) {
    console.error('Error updating team member:', error)

    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        message: 'A team member with this email already exists'
      }, { status: 409 })
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to update team member',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Team member ID is required'
      }, { status: 400 })
    }

    const existingMember = await prisma.teamMember.findUnique({
      where: { id },
      select: {
        id: true,
        imageUrl: true,
        name: true,
        order: true
      }
    })

    if (!existingMember) {
      return NextResponse.json({
        success: false,
        message: 'Team member not found'
      }, { status: 404 })
    }

    await deleteImageFromStorage(existingMember.imageUrl)

    await prisma.teamMember.delete({
      where: { id }
    })

    const remainingMembers = await prisma.teamMember.findMany({
      where: { order: { gt: existingMember.order || 0 } },
      select: { id: true, order: true }
    })

    if (remainingMembers.length > 0) {
      await Promise.all(
        remainingMembers.map(member =>
          prisma.teamMember.update({
            where: { id: member.id },
            data: { order: member.order - 1 }
          })
        )
      )
    }

    return NextResponse.json({
      success: true,
      message: `Team member "${existingMember.name}" deleted successfully`
    })
  } catch (error) {
    console.error('Error deleting team member:', error)

    if (error.code === 'P2003') {
      return NextResponse.json({
        success: false,
        message: 'Cannot delete team member due to existing references'
      }, { status: 409 })
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to delete team member',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}