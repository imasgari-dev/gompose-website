import Link from 'next/link'
import { Container } from '@/components/ui'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/topics', label: 'Topics' },
    { href: '/admin/sections', label: 'Sections' },
    { href: '/admin/pages', label: 'Pages' },
    { href: '/admin/posts', label: 'Blog Posts' }
  ]
  return (
    <Container>
      <div className="grid lg:grid-cols-[220px,1fr] gap-6">
        <aside className="space-y-2 sticky top-24 h-fit">
          <h2 className="font-semibold">Admin</h2>
          <nav className="grid gap-2">
            {links.map(l => <Link key={l.href} className="px-3 py-2 rounded-xl2 bg-[#0d2333] border border-white/10 hover:border-accent" href={l.href}>{l.label}</Link>)}
          </nav>
        </aside>
        <section>{children}</section>
      </div>
    </Container>
  )
}
