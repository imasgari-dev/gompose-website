import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Container, Card } from '@/components/ui'

export default async function TopicPage({ params }: { params: { topic: string } }) {
  const topic = await prisma.topic.findUnique({
    where: { slug: params.topic },
    include: { sections: { orderBy: { order: 'asc' }, include: { pages: { orderBy: { order: 'asc' } } } } }
  })
  if (!topic) return <Container><p>Topic not found.</p></Container>
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
      <p className="text-white/70 mb-6">{topic.description}</p>
      <div className="grid md:grid-cols-2 gap-6">
        {topic.sections.map(s => (
          <Card key={s.id} className="p-6">
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <ul className="list-disc pl-6 space-y-1 text-white/80">
              {s.pages.filter(p=>p.published).map(p => (
                <li key={p.id}><Link href={`/topics/${topic.slug}/${s.slug}/${p.slug}`}>{p.title}</Link></li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Container>
  )
}
