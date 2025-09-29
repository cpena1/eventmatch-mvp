import { prisma } from "@/lib/prisma";
import { parseQuery } from "@/lib/queryParser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const { q } = await req.json();
  const f = parseQuery(q || "");
  const where: any = { isActive: true };
  if (f.category) where.category = f.category;
  if (f.cuisine) where.cuisine = { contains: f.cuisine, mode: 'insensitive' };
  if (f.city) where.city = { contains: f.city, mode: 'insensitive' };
  if (f.guests) where.minGuests = { lte: f.guests };
  if (typeof f.leadTimeDays === 'number') where.leadTimeDays = { lte: f.leadTimeDays };
  if (f.budget) where.basePrice = { lte: f.budget };
  const vendors = await prisma.vendor.findMany({ where, orderBy: { priceTier: 'asc' } });
  return NextResponse.json({ filters: f, results: vendors });
}
