'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input, Button, Container } from './ui'
import { HeaderLogo } from './images'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [q, setQ] = useState('')

  async function onSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!q.trim()) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#001221]/90 backdrop-blur border-b border-white/10">
      <Container className="flex items-center gap-4 py-3">
        {/* <Link href="/" className="text-xl font-semibold text-ink">Gompose</Link> */}

        <HeaderLogo />
        <nav className="hidden md:flex items-center gap-4 ml-6 text-white/80">
          <Link className={link(pathname,'/topics')} href="/topics">Topics</Link>
          <Link className={link(pathname,'/blog')} href="/blog">Blog</Link>
          {/* <Link className={link(pathname,'/admin')} href="/admin">Admin</Link> */}
        </nav>
        <form onSubmit={onSearch} className="ml-auto flex items-center gap-2 w-full md:w-auto">
          <Input placeholder="Search docs..." value={q} onChange={e=>setQ(e.target.value)} />
          <Button type="submit">Search</Button>
        </form>
      </Container>
    </header>
  )
}

function link(pathname: string, href: string) {
  const active = pathname?.startsWith(href)
  return active ? 'text-accent' : 'hover:text-white'
}
