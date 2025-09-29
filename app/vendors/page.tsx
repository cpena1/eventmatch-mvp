import { prisma } from "@/lib/prisma";
import VendorCard from "@/components/VendorCard";
import { parseQuery } from "@/lib/queryParser";

function toInt(v: string | string[] | undefined){
  const n = parseInt(Array.isArray(v) ? v[0] : v||''); return isNaN(n) ? undefined : n;
}

export default async function VendorsPage({ searchParams }: { searchParams: Record<string,string|undefined> }){
  const { q, category, cuisine, city } = searchParams;
  const filters = q ? parseQuery(q) : {};
  const where: any = { isActive: true };
  if (category || (filters as any).category) where.category = (category || (filters as any).category);
  if (cuisine || (filters as any).cuisine) where.cuisine = { contains: (cuisine || (filters as any).cuisine)!, mode: 'insensitive' };
  if (city || (filters as any).city) where.city = { contains: (city || (filters as any).city)!, mode: 'insensitive' };
  const guests = toInt(searchParams.guests) || (filters as any).guests; if (guests) where.minGuests = { lte: guests };
  const lead   = toInt(searchParams.leadTimeDays) || (filters as any).leadTimeDays; if (lead !== undefined) where.leadTimeDays = { lte: lead };
  const budget = toInt(searchParams.budget) || (filters as any).budget; if (budget && budget>0) where.basePrice = { lte: budget };
  const vendors = await prisma.vendor.findMany({ where, orderBy: { priceTier: 'asc' } });
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Vendors</h1>
      {q && <div className="text-sm text-zinc-400">Query parsed to: {JSON.stringify(filters)}</div>}
      <div className="grid md:grid-cols-3 gap-6">
        {vendors.map(v => <VendorCard key={v.id} v={v} />)}
        {vendors.length === 0 && <div className="md:col-span-3 text-center text-zinc-400">No matches. Try broadening your filters.</div>}
      </div>
    </div>
  )
}
