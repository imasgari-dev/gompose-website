import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card, Container } from '@/components/ui'

export default async function Topics() {
  const topics = await prisma.topic.findMany({ orderBy: { order: 'asc' } })
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">All Topics</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {topics.map(t => (
          <Card key={t.id} className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{t.title}</h2>
            <p className="text-white/70 mb-4">{t.description}</p>
            <Link href={`/topics/${t.slug}`}>Open →</Link>
          </Card>
        ))}
      </div>
    </Container>
  )
}
