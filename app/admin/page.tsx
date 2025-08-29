import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [topics, sections, pages, posts] = await Promise.all([
    prisma.topic.count(), prisma.section.count(), prisma.page.count(), prisma.blogPost.count()
  ])
  const tiles = [
    { label: 'Topics', count: topics, href: '/admin/topics' },
    { label: 'Sections', count: sections, href: '/admin/sections' },
    { label: 'Pages', count: pages, href: '/admin/pages' },
    { label: 'Blog Posts', count: posts, href: '/admin/posts' }
  ]
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {tiles.map(t => (
        <Link key={t.label} href={t.href}>
          <Card className="p-6 hover:ring-2 hover:ring-accent transition">
            <div className="text-4xl font-bold">{t.count}</div>
            <div className="text-white/70">{t.label}</div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
