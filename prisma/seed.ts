import { PrismaClient } from "@prisma/client";

function toSlug(str: string){
  return str.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

const prisma = new PrismaClient();

const data = [
  { name:"South Bay Taco Co.", category:"catering", cuisine:"tacos", priceTier:2, minGuests:25, maxGuests:200, leadTimeDays:1, basePrice:800, city:"Torrance", region:"CA", imageUrl:"/demo/tacos.jpg", description:"Authentic taco catering with on-site griddle and salsas.", phone:"555-0101" },
  { name:"BBQ Smoke & Co.", category:"catering", cuisine:"bbq",   priceTier:3, minGuests:50, maxGuests:300, leadTimeDays:7, basePrice:2500, city:"Long Beach", region:"CA", imageUrl:"/demo/bbq.jpg",   description:"Texas-style brisket, ribs, and all the fixings.", phone:"555-0102" },
  { name:"PartyPro Rentals",  category:"party-rentals", cuisine:null as any, priceTier:2, minGuests:0, maxGuests:500, leadTimeDays:2, basePrice:150, city:"Gardena", region:"CA", imageUrl:"/demo/rentals.jpg", description:"Tables, chairs, canopies, heaters, dance floors.", phone:"555-0103" },
  { name:"Gelato Lux Cart",   category:"desserts", cuisine:"gelato", priceTier:3, minGuests:30, maxGuests:150, leadTimeDays:3, basePrice:1200, city:"Manhattan Beach", region:"CA", imageUrl:"/demo/gelato.jpg", description:"Matte-black cart with luxury gelato flavors.", phone:"555-0104" },
];

export async function main(){
  for (const v of data){
    await prisma.vendor.upsert({
      where: { slug: toSlug(v.name) },
      update: {},
      create: { ...v, slug: toSlug(v.name) }
    });
  }
}

main().then(()=>prisma.$disconnect());
