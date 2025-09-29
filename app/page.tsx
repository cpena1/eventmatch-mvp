'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home(){
  const [q, setQ] = useState('')
  const router = useRouter()
  return (
    <div className="grid gap-10">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-black">Find what you need. <span className="text-gold">Smarter</span>.</h1>
        <p className="text-zinc-300 max-w-2xl mx-auto">Ask in plain English and we’ll match vendors by guests, budget, lead time, cuisine, and location.</p>
        <div className="mx-auto max-w-2xl flex gap-2">
          <input className="input" placeholder="taco vendor for 100 guests under $1200 in Torrance, 1 day notice" value={q} onChange={e=>setQ(e.target.value)} />
          <button className="btn-gold" onClick={()=>router.push(`/vendors?q=${encodeURIComponent(q)}`)}>Search</button>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        {[{title:'Catering',tag:'catering'},{title:'Party Rentals',tag:'party-rentals'},{title:'Desserts',tag:'desserts'}].map(c=>
          <a key={c.tag} href={`/vendors?category=${c.tag}`} className="card p-6">
            <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
            <p className="text-zinc-300">Browse curated {c.title.toLowerCase()} providers.</p>
          </a>
        )}
      </section>
    </div>
  )
}
