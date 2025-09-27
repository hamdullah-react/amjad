import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function GET() {
  const about = await prisma.aboutUs.findMany();
  return NextResponse.json(about || []);  // ✅ always JSON
}

export async function POST(req) {
  try {
    const body = await req.json();
    const about = await prisma.aboutUs.create({
      data: { data: body },
    });
    return NextResponse.json(about); // ✅ JSON
  } catch (err) {
    console.error("POST /api/about error:", err);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
