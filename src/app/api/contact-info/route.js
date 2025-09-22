import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET contact information
export async function GET() {
  try {
    const contactInfo = await prisma.companySettings.findUnique({
      where: { key: 'contact_info' }
    });

    if (!contactInfo) {
      // Return default contact info if not set
      return NextResponse.json({
        success: true,
        data: {
          companyName: 'Marhaba Movers & Packers',
          email: '',
          phone: '',
          alternatePhone: '',
          whatsapp: '',
          address: '',
          city: '',
          emirate: '',
          country: 'UAE',
          postalCode: '',
          googleMapsUrl: '',
          workingHours: {
            monday: '9:00 AM - 6:00 PM',
            tuesday: '9:00 AM - 6:00 PM',
            wednesday: '9:00 AM - 6:00 PM',
            thursday: '9:00 AM - 6:00 PM',
            friday: '9:00 AM - 6:00 PM',
            saturday: '9:00 AM - 6:00 PM',
            sunday: 'Closed'
          },
          socialLinks: {
            facebook: '',
            instagram: '',
            twitter: '',
            linkedin: '',
            youtube: ''
          },
          logos: {
            primary: '',
            dark: '',
            favicon: ''
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: contactInfo.value
    });
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact information' },
      { status: 500 }
    );
  }
}

// POST/PUT contact information
export async function POST(request) {
  try {
    const body = await request.json();

    // Check if contact info exists
    const existing = await prisma.companySettings.findUnique({
      where: { key: 'contact_info' }
    });

    let result;
    if (existing) {
      // Update existing
      result = await prisma.companySettings.update({
        where: { key: 'contact_info' },
        data: {
          value: body,
          description: 'Company contact information and details'
        }
      });
    } else {
      // Create new
      result = await prisma.companySettings.create({
        data: {
          key: 'contact_info',
          value: body,
          description: 'Company contact information and details'
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: result.value,
      message: 'Contact information updated successfully'
    });
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update contact information' },
      { status: 500 }
    );
  }
}