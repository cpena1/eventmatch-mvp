import { prisma } from "@/lib/prisma";

export default async function VendorDetail({ params }: { params: { slug: string } }){
  const vendor = await prisma.vendor.findUnique({ where: { slug: params.slug } });
  if (!vendor) return <div>Not found</div>
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {vendor.imageUrl && <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-80 object-cover" />}
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{vendor.name}</h1>
        <p className="text-zinc-400 capitalize">{vendor.category} {vendor.cuisine ? `· ${vendor.cuisine}`: ''} · {vendor.city || vendor.region}</p>
        {vendor.description && <p>{vendor.description}</p>}
        <ul className="text-zinc-300 space-y-1">
          <li>Price tier: {"$".repeat(vendor.priceTier)}</li>
          <li>Guests: {vendor.minGuests}–{vendor.maxGuests || '—'}</li>
          <li>Minimum notice: {vendor.leadTimeDays} day(s)</li>
          {vendor.basePrice && <li>Base price: ${vendor.basePrice}</li>}
        </ul>
        <div className="flex gap-3 pt-2">
          {vendor.phone && <a className="btn-gold" href={`tel:${vendor.phone}`}>Call</a>}
          {vendor.website && <a className="btn-gold" href={vendor.website} target="_blank">Website</a>}
        </div>
      </div>
    </div>
  )
}
