import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = await params;
  const about = await prisma.aboutUs.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(about || {});  // ✅ JSON
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const about = await prisma.aboutUs.update({
      where: { id: Number(id) },
      data: { data: body },
    });
    return NextResponse.json(about);  // ✅ JSON
  } catch (err) {
    console.error("PUT /api/about error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await prisma.aboutUs.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ success: true }); // ✅ JSON
  } catch (err) {
    console.error("DELETE /api/about error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
