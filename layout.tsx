import './globals.css'
import Link from 'next/link'

export const metadata = { title: 'EventMatch — MVP', description: 'Find vendors fast' }

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <header className="border-b border-zinc-800">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">Event<span className="text-gold">Match</span></Link>
            <nav className="flex gap-6 text-sm text-zinc-300">
              <Link href="/vendors">Vendors</Link>
              <a href="https://vercel.com" target="_blank" className="opacity-70 hover:opacity-100">Deploy</a>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="container py-10 text-center text-zinc-500">© {new Date().getFullYear()} EventMatch MVP</footer>
      </body>
    </html>
  )
}