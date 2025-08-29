import { prisma } from '@/lib/prisma'
import { Container, Card } from '@/components/ui'
import Link from 'next/link'

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || '').trim()
  let results: any[] = []
  if (q) {
    results = await prisma.page.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } }
        ],
        published: true
      },
      include: { section: { include: { topic: true } } },
      orderBy: { updatedAt: 'desc' }
    })
  }
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-4">Search</h1>
      {!q && <p className="text-white/70">Type a query in the header.</p>}
      <div className="space-y-4">
        {results.map((r) => (
          <Card key={r.id} className="p-4">
            <Link href={`/topics/${r.section.topic.slug}/${r.section.slug}/${r.slug}`} className="text-xl font-semibold">{r.title}</Link>
            <p className="text-white/70">{r.section.topic.title} • {r.section.title}</p>
          </Card>
        ))}
        {q && results.length === 0 && <p>No results for “{q}”.</p>}
      </div>
    </Container>
  )
}
