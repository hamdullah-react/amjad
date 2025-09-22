import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Test if the ServiceArea model is accessible
    const count = await prisma.serviceArea.count();

    return NextResponse.json({
      success: true,
      message: 'ServiceArea model is working!',
      count: count,
      modelExists: true
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error accessing ServiceArea model',
      error: error.message,
      modelExists: false
    });
  }
}