import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
  const vendors = await prisma.vendor.findMany({ where: { isActive: true } });
  return NextResponse.json(vendors);
}
export async function POST(req: NextRequest){
  const body = await req.json();
  const created = await prisma.vendor.create({ data: body });
  return NextResponse.json(created, { status: 201 });
}
