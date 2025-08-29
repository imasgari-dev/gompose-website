import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Container, Card, Pill } from '@/components/ui'

export default async function BlogIndex() {
  const posts = await prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } })
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-4">
        {posts.map(p => (
          <Card key={p.id} className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Link className="text-2xl font-semibold" href={`/blog/${p.slug}`}>{p.title}</Link>
              {Array.isArray(p.tags) && <div className="flex gap-2">{p.tags.map((t: any, i: number) => <Pill key={i}>{String(t)}</Pill>)}</div>}
            </div>
            <p className="text-white/70">{p.excerpt}</p>
          </Card>
        ))}
      </div>
    </Container>
  )
}
